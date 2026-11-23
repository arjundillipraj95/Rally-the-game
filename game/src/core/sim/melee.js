// Battle rules: who is near (grid), stamina, sword swings, clashes and the blow landing.
import { pursuitHit } from './cavalry.js'; // (C2b)
import { takenX } from './eagle.js';
import { shields, coverOf, dropScutum, blockedBy } from './scutum.js';
import { testudoX } from './testudo.js';
import { STAMINA, DUEL_DIR, FEEL, NEUTRAL, CROWN, TEAMS, STATS, DIFF, CASTLE_REACH, HOLD, PARRY, HEAVY, SHIELD, BACKSTAB, EXEC, EVADE, GUARD, MORALE, RALLY, CAPTAIN_COMBAT, STREAK, BASH, LAST, VCHARGE } from '../../config.js';
import { COUNTER } from '../../config.js';
import { G, isEnemy, isEnemyTi, colorOf, rules } from '../state.js';
import { inSpear } from '../spearhit.js';
import { groundY, rnd, angDiff } from '../world.js';
import { fx, sound, spark } from './util.js';
import { hl } from './match.js';
import { hiddenFrom } from './bush.js';
import { drumDmg } from './buffs.js';
import { champHit } from './turret.js'; // (CASTLE3)
import { auraBonus, behind, gainRally, horseDamage, push, routing } from './army.js';
import { CC, breach, c2Hit, destroyCastle, die, duelFoe, hitTower, hitWall, lastStand, parry, soak } from './step.js'; // (later files: through the entry, so files still load in the old order)
import { inflDmg, inflTaken } from '../../champions/influence.js';
import { spearman } from '../../champions/army.js';
import { blowGap, rideReach } from '../../champions/stats.js';

// ---------- combat ----------
// A spatial grid of the living, rebuilt every step (8 m cells): the big battles have hundreds of men,
// and asking "who's near me?" of every one of them, for every one of them, was most of a step's cost.
const GC = 8; let grid = null, gridT = -1; // (F4: a sleeping garrison's men at their spots aren't in it: nobody's target, and their post wakes first)
export function buildGrid() {
  grid = new Map(); gridT = G.T;
  for (const u of G.units) { if (u.dead || u.rest) continue; const k = (Math.floor(u.x / GC) + 64) * 256 + (Math.floor(u.z / GC) + 64); let a = grid.get(k); if (!a) grid.set(k, a = []); a.push(u); }
}
export const gridOk = () => grid && gridT === G.T && G.role !== 'client';
// every living unit in the cells within r of (x, z)
export function eachNear(x, z, r, fn) {
  const i0 = Math.floor((x - r) / GC) + 64, i1 = Math.floor((x + r) / GC) + 64, j0 = Math.floor((z - r) / GC) + 64, j1 = Math.floor((z + r) / GC) + 64;
  for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) { const a = grid.get(i * 256 + j); if (a) for (let k = 0; k < a.length; k++) fn(a[k]); }
}
// "He's mine!": a soldier of a captain who has claimed an enemy captain leaves that captain alone
const spared = (u, o) => { if (o.neutral && !o.post.awake && !u.neutral) return true; if (u.leader || !o.leader) return false; // (F4: a sleeping post is nobody's target; it wakes when a man comes close)
  const m = G.teams[u.ti] && G.teams[u.ti].mine; return !!m && m.id === o.id && G.T < m.until; };
export function nearestFoe(u, maxD, filter) {
  let best = null, bd = maxD * maxD;
  const ds = G.duels && G.duels.length > 0, bz = !!G.bushOcc; // (MAP5: men hidden in a bush are not picked)
  if (maxD <= 72 && gridOk()) {
    eachNear(u.x, u.z, maxD, o => { if (o.dead || !isEnemy(o, u) || (filter && !filter(o)) || (ds && !duelFoe(u, o)) || spared(u, o) || (bz && hiddenFrom(o, u))) return; const dx = o.x - u.x, dz = o.z - u.z, d = dx * dx + dz * dz; if (d < bd) { bd = d; best = o; } });
    return [best, Math.sqrt(bd)];
  }
  for (const o of G.units) { if (o.dead || !isEnemy(o, u) || (filter && !filter(o)) || (ds && !duelFoe(u, o)) || spared(u, o) || (bz && hiddenFrom(o, u))) continue; const dx = o.x - u.x, dz = o.z - u.z, d = dx * dx + dz * dz; if (d < bd) { bd = d; best = o; } }
  return [best, Math.sqrt(bd)];
}
export function nearestEnemyCastle(u) {
  if (G.mode !== 'conquest') return [-1, 1e9];
  let best = -1, bd = 1e9;
  for (let c = 0; c < 4; c++) { if (!isEnemyTi(c, u.ti) || !G.teams[c].alive) continue; const d = Math.hypot(TEAMS[c].pos[0] - u.x, TEAMS[c].pos[1] - u.z); if (d < bd) { bd = d; best = c; } }
  return [best, bd];
}
export const aiDmg = ti => G.teams[ti] && G.teams[ti].human ? 1 : DIFF[G.diff].dmg;
// ---------- stamina (captains; see STAMINA) ----------
export const winded = u => !!u && u.leader && (u.st ?? STAMINA.max) < STAMINA.low;
export function spendSt(u, n) { // (false: he hadn't enough, and spends what he had)
  if (!u.leader) return true;
  const had = u.st ?? STAMINA.max; u.st = Math.max(0, had - n); u.stT = G.T; return had >= n;
}
export function staminaTick(dt) {
  for (const s of G.teams) { const L = s.leader; if (!L || L.dead) continue;
    if (L.st == null) L.st = STAMINA.max;
    if (G.T - (L.stT ?? -9) < STAMINA.delay) continue;
    L.st = Math.min(STAMINA.max, L.st + STAMINA.regen * dt * (L.blocking || L.guardT > 0 ? STAMINA.blockRegen : 1)); }
}
// ---------- duels: blows from a side (see DUEL_DIR) ----------
export const duelFoeOf = u => { if (!u || !u.duelId) return null; const d = (G.duels || []).find(x => x.id === u.duelId && x.state === 'on'); return d ? (d.a === u ? d.b : d.a) : null; };
// which way a stick (wx, wz, mag) points across the line to his man: -1 or 1, or 0 (neither)
export function sideToward(u, foe, wx, wz, mag) {
  if (!foe || !(mag > .35)) return 0;
  const th = Math.atan2(foe.x - u.x, foe.z - u.z), lat = wx * Math.cos(th) - wz * Math.sin(th);
  return Math.abs(lat) > DUEL_DIR.lat ? Math.sign(lat) : 0;
}
// a captain's blow in a duel: which side it comes from (his stick; a computer captain picks), shown before it lands
function duelTell(u) {
  if (!u.leader || !u.pending || u.pending.side != null) return;
  const foe = duelFoeOf(u); if (!foe) return;
  const side = u.human ? (u.stickSide | 0) : [-1, 0, 1][(Math.random() * 3) | 0];
  u.pending.side = side; u.pending.t = Math.max(u.pending.t, DUEL_DIR.tell);
  u.swingSide = side; u.sideT = G.T; u.sideN = ((u.sideN | 0) + 1) % 36;
}
// the defender's guard turns a blow from `side` only if his stick points toward it (or neither way, for overhead)
const guardMatches = (b, side) => (b.stickSide | 0) === -side;
export function startSwing(u, target) {
  if (u.cd > 0 || u.stun > 0 || u.dead || u.carrying || u.guardUp) return false;
  u.atkT = G.T; // (MAP5: a man who attacks is seen, bush or no bush)
  u.swing = .38; u.cd = (u.leader ? (u.mounted ? .8 : blowGap(u.ti)) : (u.gap || STATS[u.kind].cd)) * rnd(.9, 1.15) * (u.execReady ? EXEC.beatenCd : 1); // (a beaten captain swings slowly)
  u.pending = { t: .15, target };
  if (u.leader && !spendSt(u, STAMINA.light)) u.pending.tired = true; // (winded: a softer blow)
  duelTell(u);
  sound('swing', u.x, u.z);
  return true;
}
export function startSweep(u) {
  if (u.cd > 0 || u.stun > 0 || u.dead) return;
  u.swing = .38; u.cd = .8; u.pending = { t: .15, sweep: true }; sound('swing', u.x, u.z);
}
// A footman facing a captain: shield up for part of each cycle, down (and swinging) for the rest.
// The raised shield shows on every phone (it's the block pose), so what you see is what you get.
export function shieldTick(u, dt) {
  if (u.leader || u.kind !== 'foot' || u.mounted || u.disarrayT > G.T) { u.guardUp = false; return; } // (C5f: out of formation: no guard)
  let cap = false;
  for (const s of G.teams) { const L = s.leader; if (L && !L.dead && isEnemy(L, u) && Math.hypot(L.x - u.x, L.z - u.z) < SHIELD.r) { cap = true; break; } }
  if (!cap || u.stun > 0) { u.guardUp = false; if (!cap) u.gT = rnd(0, .8); return; }
  u.gT = (u.gT || 0) - dt;
  if (u.gT <= 0) {
    const P = rnd(...SHIELD.cycle), share = Math.min(.85, SHIELD.share[u.tier | 0] + (u.shieldwall ? SHIELD.wall : 0) + (u.holding ? SHIELD.held : 0));
    u.guardUp = !u.guardUp; u.gT = P * (u.guardUp ? share : 1 - share);
  }
  if (u.guardUp) u.blockT = Math.max(u.blockT, .1);
}
export function resolveSwing(u) {
  const pend = u.pending; let tg = pend.target; u.pending = null;
  const mult = (pend.mult || 1) * (pend.tired ? STAMINA.tiredMult : 1);
  if (pend.leap) { resolveLeap(u); return; }
  if (pend.sweep) {
    const m = mult * .8 * (1 + Math.hypot(u.vx, u.vz) / 12);
    for (const o of G.units) {
      if (o.dead || !isEnemy(o, u)) continue;
      if (Math.hypot(o.x - u.x, o.z - u.z) > 3.1 + (pend.reachB || 0)) continue;
      if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > 1.25) continue;
      hit(u, o, m);
    }
    return;
  }
  if (tg && tg.wall) { hitWall(u, tg.wall); return; }
  if (tg && tg.tower) { hitTower(u, tg.tower); return; }
  if (tg && tg.brk) { c2Hit(u, tg.brk); return; } // (C5: a soldier's blow on the nexus or the chest)
  if (tg && tg.castle !== undefined) {
    const s = G.teams[tg.castle];
    if (!s.alive || u.mounted || !isEnemyTi(tg.castle, u.ti)) return;
    if (Math.hypot(TEAMS[tg.castle].pos[0] - u.x, TEAMS[tg.castle].pos[1] - u.z) > CASTLE_REACH + .8) return;
    s.points -= (u.human ? 1.3 : u.leader ? .7 : u.kind === 'arch' ? .08 : .2) * rules().castle;
    if (s.points < LAST.at && !s.breached && s.points > 0) breach(tg.castle, u);
    sound('wall', u.x, u.z); spark(u.x + Math.sin(u.face) * 1.2, 1.4, u.z + Math.cos(u.face) * 1.2, '#cfc8b8', 5);
    if (s.points <= 0) destroyCastle(tg.castle, u.ti);
    return;
  }
  const reach = rideReach(u) + (pend.reachB || 0), ex = pend.kb || pend.heavy || pend.stun || pend.bash ? { kb: pend.kb || 1, heavy: !!pend.heavy, stun: pend.stun, shove: pend.shove, bash: pend.bash, unblockable: pend.streak, unparryable: pend.streak || pend.bash, streak: pend.streak } : undefined;
  const exS = pend.side != null ? Object.assign({}, ex, { side: pend.side }) : ex; // (a duel blow carries its side)
  let landed = false;
  const slack = u.human ? .9 : .5; // (a player's blow at a man who has just stepped back still connects)
  const SP = pend.spear, inS = o => !o.dead && isEnemy(o, u) && inSpear(u, o, SP); // (F25: a spear blow strikes where the spear you see reaches)
  if (SP && tg && tg.x != null && !inS(tg)) { let bd = 1e9, nb = null; for (const o of G.units) { if (o === tg || !inS(o)) continue; const d = Math.hypot(o.x - u.x, o.z - u.z); if (d < bd) { bd = d; nb = o; } } if (nb) pend.target = tg = nb; } // (he stepped out of it: whoever the spear meets instead)
  if (tg && !tg.dead && (SP ? inS(tg) : Math.hypot(tg.x - u.x, tg.z - u.z) <= u.r + tg.r + reach + slack)) { if (clash(u, tg, pend)) return; hit(u, tg, mult, exS); landed = true; if (pend.slow && !tg.dead) { tg.slowUntil = G.T + pend.slow[1]; tg.slowK = 1 - pend.slow[0]; } } // (C5b: the wolf's bite slows)
  else if (u.isMe && G.capStats && tg && tg.castle === undefined) G.capStats.outOfReach++;
  // sword finisher: the heavy third hit also catches up to two more men beside the target
  if (pend.cleave) {
    let n = 0;
    for (const o of G.units) {
      if (o === tg || o.dead || !isEnemy(o, u)) continue;
      if (Math.hypot(o.x - u.x, o.z - u.z) > u.r + o.r + reach + .3) continue;
      if (!pend.spin && Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > (pend.arc || 1.1)) continue; // (the spin cuts all the way round)
      hit(u, o, mult * (pend.cleaveX || .8), ex); if (++n >= (pend.cleaveN || (pend.streak ? STREAK.cleaveN : pend.spin ? CC.sword.spinN : 2))) break; // (C5b: her chop, all of them at full)
    }
  }
  // spear thrust: runs through to the man standing right behind the target
  let pn = 0;
  if (pend.pierce && landed) {
    for (const o of G.units) {
      if (o === tg || o.dead || !isEnemy(o, u)) continue;
      if (SP) { if (!inS(o)) continue; } // (F25: through the men the spear you see reaches)
      else if (Math.hypot(o.x - u.x, o.z - u.z) > u.r + o.r + reach + (pend.line ? 1.2 : 2.4) || Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > (pend.line || .4)) continue;
      hit(u, o, mult * pend.pierce, ex); if (++pn >= (pend.pierceN || 1)) break;
    }
  }
}
// Two captains' blades meet (F6): each on foot and swinging a plain blow at the other, face to face. Neither blow
// lands: both men are driven back a step and held a moment. Every phone plays it from the 'fxclash' moment.
function clash(a, b, pend) {
  const C = FEEL.clash, bp = b.pending;
  if (!a.leader || !b.leader || a.mounted || b.mounted || !bp || bp.target !== a || bp.t > C.win) return false;
  if (pend.heavy || pend.bash || pend.streak || bp.heavy || bp.bash || bp.streak || bp.leap || bp.sweep) return false; // (the big blows go through)
  if (a.ripN > 0 && a.riposteT > G.T) return false; // (so does a riposte)
  if (b.iframeT > 0 || a.execT > 0 || b.execT > 0 || b.stun > 0) return false;
  if (G.crown && G.T < CROWN.breakout) return false;
  if ((a.duelId || b.duelId) && a.duelId !== b.duelId) return false;
  const ang = Math.atan2(b.x - a.x, b.z - a.z);
  if (Math.abs(angDiff(a.face, ang)) > C.arc || Math.abs(angDiff(b.face, ang + Math.PI)) > C.arc) return false;
  b.pending = null; b.windup = 0; b.glint = false;
  a.cd = Math.max(a.cd, C.cd); b.cd = Math.max(b.cd, C.cd);
  push(a, -Math.sin(ang) * C.push, -Math.cos(ang) * C.push, C.stun); push(b, Math.sin(ang) * C.push, Math.cos(ang) * C.push, C.stun);
  fx('fxmsg', { k: 'fxclash', u: b, a });
  if (a.remote || b.remote) fx('netFlush');
  return true;
}
// Leap slam: an attack from mid-air comes down on everyone in a wide arc in front, can't be
// blocked, and staggers whoever it hits. The crowd-breaker; the sword combo is the duelling tool.
function resolveLeap(u) {
  const L = CAPTAIN_COMBAT.leap;
  const fx0 = u.x + Math.sin(u.face) * 1.2, fz0 = u.z + Math.cos(u.face) * 1.2;
  spark(fx0, groundY(fx0, fz0) + .2, fz0, '#c9b28a', 14); sound('trample', fx0, fz0);
  if (u.isMe) { fx('shake', .45); fx('buzz', 40); }
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, u)) continue;
    if (Math.hypot(o.x - u.x, o.z - u.z) > L.range + o.r) continue;
    if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > L.arc) continue;
    hit(u, o, L.mult * (u.leapStrike ? 1.2 : 1), { stun: L.stun + (u.leapStrike ? .25 : 0), kb: u.leapStrike ? 1.8 : 1.3, unblockable: true });
  }
  u.leapStrike = false;
}
export function hit(a, b, mult = 1, extra) {
  if (!isEnemy(a, b) || b.execT > 0 || a.execT > 0) return;
  if (G.crown && G.T < CROWN.breakout) return; // (the break-out: nobody gets hurt before the trumpet) // (an execution plays out untouched)
  if ((a.duelId || b.duelId) && a.duelId !== b.duelId) return; // (a duel: the two of them, and nobody else)
  if (b.iframeT > 0) { // (evaded: the blow passes through where he was)
    if (b.leader && a.leader && !b.evadedAt) { b.evadedAt = G.T; gainRally(b, EVADE.rally); fx('fxmsg', { k: 'fxevade', u: b, a }); }
    return;
  }
  let shieldX = 1; // (C3c: the Shield of Cassius: blocked from its front, or an ult breaks it and lands at a share)
  const S = shields.length ? coverOf(b, a.x, a.z) : null;
  if (S) { if (!(extra && extra.ult)) { blockedBy(S, b, a); return; } shieldX = S.scutum.d.ultX; dropScutum(S, 'ult'); }
  if (b.testudo) { const tx = testudoX(b, a.x, a.z, extra && extra.ult); if (!tx) { blockedBy(null, b, a); return; } shieldX *= tx; } // (C3e: the testudo's front)
  // a riposte: the couple of blows after a parry land harder and can't be blocked
  if (a.ripN > 0 && a.riposteT > G.T) { a.ripN--; mult *= PARRY.riposteMult; extra = Object.assign({}, extra, { unblockable: true }); }
  let heavy = !!(extra && extra.heavy);
  // a captain's blow from behind: harder, and he reels (enemy captains too: circle him)
  const back = a.leader && !a.mounted && behind(b, a) && !(extra && extra.fixed != null); // (C3d: a set amount, wherever it comes from)
  if (back) { mult *= BACKSTAB.mult; extra = Object.assign({}, extra, { stun: Math.max((extra && extra.stun) || 0, BACKSTAB.stun), unparryable: true }); if (a.human || b.human) fx('fxmsg', { k: 'fxback', u: b, a }); }
  // a captain's Block tapped just before the blow lands turns it aside
  if (a.isMe && G.capStats) G.capStats.blows++;
  if (b.human && !b.mounted && b.stun <= 0 && !b.carrying && G.T - (b.parryT ?? -9) <= (heavy || (extra && extra.shown) ? PARRY.window : PARRY.light) + (b.remote ? PARRY.remote : 0)
    && Math.abs(angDiff(b.face, Math.atan2(a.x - b.x, a.z - b.z))) < 1.5 && !(extra && extra.unparryable)) { parry(b, a, heavy, false, G.T - b.parryT <= PARRY.perfect + (b.remote ? PARRY.remote * .4 : 0)); return; }
  // a computer captain on guard turns most light blows from another captain aside
  // a duel: a light blow from a side is turned only by a guard to that side (a computer captain reads it, or not)
  const dside = extra && extra.side != null && a.duelId && a.duelId === b.duelId && a.leader && b.leader && !heavy && !extra.bash ? extra.side : null;
  const readOk = dside == null || (b.human ? guardMatches(b, dside) : Math.random() < DUEL_DIR.read[G.diff]);
  const onGuard = !b.human && b.guardT > 0 && b.stun <= 0 && !b.mounted && readOk && Math.abs(angDiff(b.face, Math.atan2(a.x - b.x, a.z - b.z))) < 1.2;
  if (onGuard && a.leader && !heavy && !(extra && (extra.unblockable || extra.unparryable)) && Math.random() < GUARD.parry && spendSt(b, STAMINA.block)) { if (a.isMe && G.capStats) G.capStats.parried++; parry(b, a, false, true); return; }
  if (b.heavyCharge > 0 || b.ahT > 0) b.chargeBrokeT = G.T; // (hit while winding up a heavy blow: it's lost)
  let dmg = a.dmg * rnd(.8, 1.2) * mult * aiDmg(a.ti);
  if (!a.leader && a.aura) dmg *= 1 + auraBonus(a.ti);
  if (a.y - b.y > .8) dmg *= 1.2; // fighting downhill
  if (!b.leader && !back && (behind(b, a) || routing(b.ti))) dmg *= MORALE.flankX; // (C1d: once, not on top of a champion's backstab) // caught from the side or behind, or running
  if (a.rallyT > 0) dmg *= RALLY.dmg;
  dmg *= drumDmg(a.ti); // (CAMP1: the war drum)
  dmg *= inflDmg(a) * inflTaken(b, Math.abs(angDiff(b.face, Math.atan2(a.x - b.x, a.z - b.z))) < 1.1); // (C1e: the champions' influence)
  if (!a.leader && G.teams[a.ti] && G.teams[a.ti].vcT > G.T) dmg *= VCHARGE.dmg; // (charging in behind a volley)
  dmg = pursuitHit(a, b, dmg, behind(b, a)); // (C2b: a swordsman's Pursuit)
  if (G.mode === 'conquest' && G.teams[colorOf(a.ti)].breached && lastStand(a)) dmg *= LAST.dmg; // (backs to the wall)
  if (extra && extra.fixed != null) dmg = extra.fixed; // (C3d: an ult's set damage)
  dmg *= takenX(b) * shieldX; // (C3d: Eagle's fall in the air, and shield-up after it; C3c)
  b.lastHit = G.T;
  const spearedHorse = spearman(a) || (a.leader && a.weapon === 'spear');
  if (a.mounted && b.kind === 'arch') dmg *= COUNTER.mult; // (C1d the counter rule: cavalry on archers)
  if (b.mounted) { horseDamage(b, dmg * (spearedHorse ? COUNTER.mult : 1)); return; } // (C1d: a mounted champion's horse takes every blow; spears 120%)
  let kb = (a.leader ? (a.mounted ? 10 : 8) : 5) * (extra && extra.kb || 1) * (!a.leader && G.teams[a.ti] && G.teams[a.ti].vcT > G.T ? VCHARGE.kb : 1);
  const frontal = Math.abs(angDiff(b.face, Math.atan2(a.x - b.x, a.z - b.z))) < 1.1;
  const held = frontal && b.holding && !b.human; // a footman standing his place in a held line
  let blocked = onGuard && !(extra && extra.unblockable); // (C3b: an unblockable blow went through a computer captain's guard at a quarter)
  if (frontal && b.stun <= 0 && !b.mounted && !b.carrying && !(extra && extra.unblockable)) {
    if (b.human) blocked = b.blocking && readOk;
    else if (a.leader && b.kind === 'foot') blocked = !!b.guardUp; // (against a captain: exactly when his shield is up)
    else if (a.leader && b.leader) blocked = onGuard; // (a captain against a captain: only his guard, which shows, stops a blow)
    else if (Math.random() < (b.block || 0) + (b.aura ? auraBonus(b.ti) : 0) + (b.shieldwall && b.kind === 'foot' ? .3 : 0) + (held ? .15 : 0)) { blocked = true; b.blockT = .45; }
  }
  if (held) { dmg *= HOLD.dmg; kb *= HOLD.kb; }
  // a heavy blow smashes through a guard: no block, and the blocker is knocked off balance
  let broke = false;
  if (heavy && frontal && (blocked || (b.human && b.blocking))) { blocked = false; broke = true; dmg *= HEAVY.guardDmg; }
  // a blow taken on a captain's guard costs him stamina; with none left, the guard gives way
  else if (blocked && b.leader && !(extra && extra.bash) && !spendSt(b, STAMINA.block)) { blocked = false; broke = true; dmg *= HEAVY.guardDmg; }
  // guarded the wrong side in a duel: it lands, and he's caught off balance
  if (dside != null && b.human && b.blocking && !readOk && frontal) { b.stun = Math.max(b.stun, DUEL_DIR.wrongStun); fx('fxmsg', { k: 'fxwrong', u: b, a }); }
  if (extra && extra.bash) { // the shield bash: through any guard, and knocks it aside
    const guard = frontal && (blocked || b.guardUp || (b.human && b.blocking) || b.guardT > 0 || b.blockT > 0);
    blocked = false; b.guardUp = false; b.gT = SHIELD.open; b.guardT = 0; b.guardCd = Math.max(b.guardCd || 0, 1.2); b.blockT = 0;
    extra = Object.assign({}, extra, { stun: Math.min(guard ? BASH.open : BASH.stun, extra.stunMax ?? 9) }); // (C3a: a champion's cap)
    if (b.windup > 0) { b.windup = 0; b.glint = false; }
    fx('fxmsg', { k: 'fxbash', u: b, a, heavy: guard }); if (guard) hl(a.ti, 'bash');
  }
  // a heavy blow (or any big hit) knocks a man out of his own wind-up
  if (b.windup > 0 && (heavy || mult >= 1.35 || (extra && extra.unblockable))) { b.windup = 0; b.glint = false; b.stun = Math.max(b.stun, .5); fx('fxmsg', { k: 'fxint', u: b }); }
  const hx = (a.x + b.x) / 2, hz = (a.z + b.z) / 2, hy = (a.y + b.y) / 2 + 1.2;
  b.hitAng = Math.atan2(a.x - b.x, a.z - b.z); b.hitT = G.T; // (where the blow came from: he reels away from it)
  const shove = !!(extra && extra.shove);
  if (blocked) {
    dmg *= b.human ? .12 : shove ? CC.spear.shieldDmg : .25; kb *= shove ? 1 : FEEL.block.kb; // (a spear thrust into a shield still drives him back)
    // a captain's sword on a raised shield knocks it aside: he's open for a moment, the next blow lands
    if (a.leader && b.guardUp && !shove && !b.human) { b.guardUp = false; b.gT = SHIELD.open; b.stun = Math.max(b.stun, SHIELD.openStun); b.blockT = 0; fx('fxmsg', { k: 'fxopen', u: b, a }); }
    spark(hx, hy, hz, '#fff3b0', 7); sound('clang', hx, hz); b.blockT = Math.max(b.blockT, .2);
    if (a.leader || b.leader) fx('fxmsg', { k: 'fxblk', u: b, a }); // (F6: a blow on a shield with a captain in it is a moment on every phone)
    if (b.isMe) fx('buzz', FEEL.hurt.blockBuzz);
  } else {
    spark(hx, hy, hz, b.neutral ? NEUTRAL.css : TEAMS[colorOf(b.ti)].css, 6); sound('hit', hx, hz);
    if (Math.random() < .4) fx('splat', { x: b.x + rnd(-.4, .4), z: b.z + rnd(-.4, .4), s: rnd(.6, 1.1), ti: b.ti });
    if (b.isMe) { fx('shake', FEEL.hurt.shake); fx('buzz', FEEL.hurt.buzz); }
  }
  if (b.leader && b.armour > 0 && !blocked && dmg > 0) dmg = soak(b, dmg, heavy || broke || back || !!(extra && extra.unblockable));
  b.hp -= dmg; if (!blocked && dmg > 0) champHit(a, b); // (CASTLE3: turret aggro)
  b.hurt = { by: a.id, dmg, T: G.T }; // (the last blow taken: tests read it)
  if (!blocked && dmg > 0) { // the streak: a player captain's blows that land, broken when he's hit
    if (a.human && a.leader && !(extra && extra.streak) && a.streakBlow !== a.lastSwingT) { // (one per blow that lands, however many it cuts; not the whirlwind's own)
      a.streakBlow = a.lastSwingT; a.streak = G.T - (a.streakT ?? -9) > STREAK.gap ? 1 : (a.streak || 0) + 1; a.streakT = G.T; hl(a.ti, 'streak', a.streak);
    }
    if (b.human && b.leader) b.streak = 0;
  }
  if (a.isMe && G.capStats) { G.capStats[blocked ? 'blocked' : 'landed']++; G.capStats.dmg += dmg; if (b.hp <= 0 && !b.dead) G.capStats.kills++; }
  if (b.human && b.remote && !blocked) b.lastBlow = { a, dmg, heavy, t: G.T }; // (their parry press may still be on its way)
  if (broke) { gainRally(a, RALLY.guardBreak); b.stun = Math.max(b.stun, onGuard ? GUARD.broken : HEAVY.guardBreak); if (onGuard) { b.guardT = 0; b.guardCd = 2; } fx('fxmsg', { k: 'fxbreak', u: b }); }
  if (a.remote || b.remote) fx('netFlush');
  if (a.isMe) { // your own blows: a beat of hit-stop, longer for heavy hits and kills, and a deeper thud
    const heavy = !blocked && (mult >= 1.35 || b.hp <= 0), O = FEEL.own, kind = blocked ? 'blocked' : heavy ? 'heavy' : shove ? 'shove' : 'hit';
    fx('hitstop', O.stop[kind]);
    if (!blocked) fx('shake', O.shake[kind]);
    if (O.buzz[kind]) fx('buzz', O.buzz[kind]); // (F6: you feel your own blow land)
    if (heavy) sound('heavy', hx, hz);
  }
  const ang = Math.atan2(b.x - a.x, b.z - a.z);
  push(b, Math.sin(ang) * kb, Math.cos(ang) * kb, blocked ? (shove ? .25 : 0) : broke ? HEAVY.guardBreak : (extra && extra.stun) || .22);
  // heavy blows, slams and captains' finishers launch the body; now and then any captain's kill does
  if (b.hp <= 0) {
    const was = b.dead; die(b, a, ang, mult >= 1.35 || (extra && extra.unblockable) || (a.leader && Math.random() < .18) ? 1 : 0);
    if (!was && b.dead && a.leader && !b.leader) fx('fxmsg', { k: 'fxcut', u: b, a, heavy: !!b.launch }); // (F6: a captain cuts a soldier down)
  }
}
