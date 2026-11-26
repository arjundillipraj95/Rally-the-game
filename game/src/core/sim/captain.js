// Battle rules: the captain's moves (attack, charge, jump, evade, javelins, bash).
import { STAMINA, DUEL_DIR, TEAMS, CASTLE_REACH, CHARGE, SHIELD, EVADE, WEAPONS, CAPTAIN_COMBAT, STREAK, BASH, RHYTHM, PUSH } from '../../config.js';
import { G, isEnemy } from '../state.js';
import { tryPull } from './pulldown.js'; // (PULL1)
import { spearBlow, spearReach } from '../spearhit.js';
import { groundY, angDiff } from '../world.js';
import { fx, sound, spark } from './util.js';
import { hl } from './match.js';
import { footTier, orderOf, push } from './army.js';
import { aiDmg, nearestEnemyCastle, spendSt, startSweep, startSwing } from './melee.js';
import { duelFoe, execTarget, startExec } from './duel.js';
import { throwJavelin } from './missiles.js';
import { rangedOf, rangedShot } from './ranged.js'; // (RANGE1)
import { die } from './score.js';
import { towerInReach, wallInReach } from './forts.js';
import { c2BreakInReach } from './crown2.js';
import { swiftCd } from './buffs.js';
import { champOf } from '../../champions/index.js';
import { paceOf } from '../../champions/stats.js';
import { wolfRider, wolfStrike } from './sigrun.js'; // (C5)

// Last Man Standing (a test variant of the Crown): the same battle until 9:00; then nobody comes back,
// a ring closes on the plaza (outside it hurts) and the last side with a captain standing wins. If it
// comes down to one captain against one, they're called to the plaza for the Champions' Duel.

// ---------- captain actions ----------
export function softAim(p, range = 3.4) {
  let best = null, bs = 1e9;
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, p) || !duelFoe(p, o)) continue;
    const d = Math.hypot(o.x - p.x, o.z - p.z); if (d > range) continue;
    const front = Math.abs(angDiff(o.face, Math.atan2(p.x - o.x, p.z - o.z))) < 1.1;
    const score = d + Math.abs(angDiff(p.face, Math.atan2(o.x - p.x, o.z - p.z))) * 1.5 + (o.blockT > 0 && front && !o.leader ? 1.6 : 0); // (a man with his shield down is the better target)
    if (score < bs) { bs = score; best = o; }
  }
  return best;
}
export const CC = CAPTAIN_COMBAT;
export const javMax = ti => CC.jav.ammo + footTier(ti);
export const airborne = p => (p.jy || 0) > .25;
export const aimRange = p => (p.weapon === 'spear' ? CC.spear.aim : CC.sword.aim);
// The horse charge: a couple of seconds at full gallop that sends everyone in front flying.
export function captainCharge(p) {
  if (!p || p.dead || !p.mounted || p.carrying || (p.chargeCd || 0) > 0) return false;
  p.charge = CHARGE.dur; p.chargeCd = CHARGE.cd * swiftCd(p.ti); p.chargeHit = new Set(); p.gallop = 1;
  sound('charge', p.x, p.z); fx('shout', { u: p, kind: 'charge' });
  if (p.isMe) fx('shake', .35);
  return true;
}
export function chargeTimers(u, dt) {
  if (u.charge > 0) { u.charge -= dt; if (!u.mounted) u.charge = 0; }
  if (u.chargeCd > 0) u.chargeCd -= dt;
}
export function captainJump(p) {
  if (!p || p.dead || p.eagle || p.mounted || p.stun > 0 || p.jy > 0 || p.jvy > 0 || p.jumpCd > 0 || p.carrying) return false;
  p.jvy = CC.jump.v; p.jy = .001; sound('jump', p.x, p.z);
  return true;
}
// Advances a captain's jump wherever that captain is driven (solo/host, or a client's own phone).
export function stepJump(p, dt) {
  if (p.jumpCd > 0) p.jumpCd -= dt;
  if (p.eagle || p.ram) return; // (C3d, C3b: his leap or his rush carries him)
  if (!(p.jy > 0) && !(p.jvy > 0)) return;
  p.jvy -= CC.jump.g * dt; p.jy += p.jvy * dt;
  if (p.jy <= 0) { p.jy = 0; p.jvy = 0; p.jumpCd = CC.jump.cd; sound('land', p.x, p.z); spark(p.x, groundY(p.x, p.z) + .1, p.z, '#c9b28a', 4); }
}
// ---------- the evade ----------
// The way to judge the stick: the enemy you're squaring up to (else the way you face).
function evadeRef(p) { const f = softAim(p, 8); return f ? Math.atan2(f.x - p.x, f.z - p.z) : p.face; }
export function evadeKind(p, wx, wz, mag) {
  if (!(mag > .3)) return 'back';
  const d = angDiff(evadeRef(p), Math.atan2(wx, wz));
  return Math.abs(d) < Math.PI / 4 ? 'pounce' : Math.abs(d) > Math.PI * 3 / 4 ? 'back' : d > 0 ? 'left' : 'right';
}
// Starts an evade of the given kind ('pounce', 'left', 'right', 'back'): the burst of movement, the
// hop, the untouchable moment, the cooldown. Run where the captain is driven (solo/host, or a
// joiner's own phone); remote: the host marking a joiner's evade (no movement: their phone moves them).
export function captainEvade(p, kind, remote = false) {
  if (!p || p.dead || p.mounted || p.carrying || p.execT > 0 || p.execA || p.execV) return false;
  if (!remote && (p.stun > 0 || (p.evadeCd || 0) > 0)) return false;
  if ((p.st ?? STAMINA.max) < STAMINA.evade) { if (p.isMe || (G.role === 'client' && p === G.player)) fx('fxmsg', { k: 'fxtired', u: p }); return false; } // (winded: no evade)
  spendSt(p, STAMINA.evade);
  const ref = evadeRef(p), side = kind === 'left' ? 1 : kind === 'right' ? -1 : 0, E = EVADE[side ? 'side' : kind];
  if (!E) return false;
  p.evade = { kind: side ? 'side' : kind, t: G.T };
  p.iframeT = EVADE.iframe + (remote ? EVADE.remote : 0);
  p.evadeN = G.T - (p.lastEvadeT ?? -9) < EVADE.chain ? (p.evadeN || 0) + 1 : 1; p.lastEvadeT = G.T;
  p.evadeCd = (p.evadeN >= 2 ? EVADE.tired : EVADE.cd) * swiftCd(p.ti); // (twice in quick succession and he's winded)
  p.pending = null; p.heavyCharge = 0; p.windup = 0; p.blocking = false;
  if (kind === 'pounce') p.vaultT = E.dash + .2; // (clears a low wall or a hedge)
  if (!remote) {
    const a = kind === 'pounce' ? ref : kind === 'back' ? ref + Math.PI : ref + side * Math.PI / 2;
    p.vx = Math.sin(a) * E.v; p.vz = Math.cos(a) * E.v; p.dashT = E.dash; p.face = ref;
    p.jvy = E.hop; p.jy = Math.max(p.jy || 0, .001);
  }
  sound('jump', p.x, p.z); spark(p.x, groundY(p.x, p.z) + .1, p.z, '#c9b28a', 6);
  return true;
}
// a computer captain sees a captain's blow coming his way: now and then he gets out of it, and a
// hardened one comes straight back with the follow-up
function aiEvade(u, from) {
  if (!u || u.human || u.dead || u.mounted || u.stun > 0 || (u.evadeCd || 0) > 0 || u.execT > 0 || u.execReady) return;
  if (Math.random() > EVADE.ai[G.diff]) return;
  const kinds = ['left', 'right', 'back'], k = kinds[Math.floor(Math.random() * 3)];
  u.dashT = 0; if (!captainEvade(u, k)) return;
  if (G.diff >= 1 && Math.random() < (G.diff === 2 ? .8 : .45)) u.evadeFollowT = .2 + Math.random() * .12;
}
// No argument: cycle sword -> spear -> javelins. The choice sticks through respawns.
export function switchWeapon(p, w) {
  if (!p || p.dead) return null;
  const ws = champOf(p.ti).weapons; // (C1a: only his champion's weapons)
  const next = ws.includes(w) ? w : ws[(ws.indexOf(p.weapon || ws[0]) + 1) % ws.length];
  p.weapon = next; p.combo = 0; p.cd = Math.max(p.cd, .12);
  if (G.teams[p.ti]) G.teams[p.ti].weapon = next;
  return next;
}
// Where a captain's javelin goes: the best enemy in a cone ahead (led a little), else straight ahead.
export function javTarget(p, range = CC.jav.range) {
  let best = null, bs = 1e9;
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, p)) continue;
    const d = Math.hypot(o.x - p.x, o.z - p.z); if (d > range || d < 1.2) continue;
    const ad = Math.abs(angDiff(p.face, Math.atan2(o.x - p.x, o.z - p.z))); if (ad > .6) continue;
    const sc = d + ad * 10; if (sc < bs) { bs = sc; best = o; }
  }
  if (!best) return { x: p.x + Math.sin(p.face) * 12, z: p.z + Math.cos(p.face) * 12, foe: null };
  const lead = (.18 + Math.hypot(best.x - p.x, best.z - p.z) / 22) * .8;
  return { x: best.x + best.vx * lead, z: best.z + best.vz * lead, foe: best };
}
function throwCaptainJav(p) {
  if ((p.javAmmo || 0) < 1) return false;
  const t = javTarget(p);
  p.face = Math.atan2(t.x - p.x, t.z - p.z);
  throwJavelin(p, t, CC.jav.dmg);
  p.javAmmo--; if (p.javRegen <= 0) p.javRegen = CC.jav.regen;
  p.cd = CC.jav.cd * swiftCd(p.ti); p.swing = .38; p.swingKind = 4;
  return true;
}
function leapSlam(p) {
  p.leaps = (p.leaps || 0) + 1;
  p.swing = .38; p.cd = CC.leap.cd * swiftCd(p.ti); p.pending = { t: .1, leap: true }; p.swingKind = 2;
  p.jvy = Math.min(p.jvy, -9);
  p.vx += Math.sin(p.face) * 3; p.vz += Math.cos(p.face) * 3;
  sound('swing', p.x, p.z);
}
// The player captain's Attack: what it does depends on the weapon in hand and whether you're in the
// air. Presses that land during a cooldown are buffered briefly instead of being dropped.
export function captainAttack(p) {
  if (p && (p.eagle || p.ram || p.scutum)) return; // (C3d, C3b: in his leap or his rush; C3c: shield raised)
  const had = p && p.pending; captainAttack0(p);
  if (p && p.pending && p.pending !== had && p.pending.side != null && !p.pending.heavy) p.pending.t = Math.max(p.pending.t, DUEL_DIR.tell);
}
function captainAttack0(p) {
  if (!p || p.dead || p.carrying || p.spin) return; // (C5d: no basic hits in her spin)
  if (p.cd > 0 || p.stun > 0) { p.atkBuf = .4; return; }
  p.atkBuf = 0;
  if (tryPull(p)) return; // (PULL1: a rider going by, on the beat: pulled down)
  if (rangedOf(p) && !p.duelId) { // (RANGE1: a ranged champion shoots; in a duel she fights close, C4g)
    const v = p.human && !p.mounted ? execTarget(p) : null; // (a beaten captain in reach: finish him, as a melee champion does)
    if (v) startExec(p, v); else rangedShot(p);
    return;
  }
  const wpn = p.weapon || 'sword';
  if (p.mounted) {
    if (wolfRider(p)) { wolfStrike(p); return; } // (C5b: on her wolf a press strikes: claw, claw, bite)
    if (p.human) return; // (a captain on horseback strikes when Attack is let go: a tap swipes, a hold times a ride-by)
    if (wpn === 'jav' && throwCaptainJav(p)) return;
    startSweep(p);
    if (p.pending && wpn === 'spear') { p.pending.mult = 1.3; p.pending.reachB = .8; }
    return;
  }
  if (airborne(p)) { leapSlam(p); return; }
  if (p.human) { const v = execTarget(p); if (v) { startExec(p, v); return; } } // (a beaten captain: finish him)
  if (wpn === 'jav') {
    if (p.human && (p.javAmmo || 0) >= 1) return; // (a captain on foot throws when Attack is let go: a tap throws, a hold draws it back)
    if (throwCaptainJav(p)) return;
    p.weapon = champOf(p.ti).weapons.includes('sword') ? 'sword' : champOf(p.ti).weapons[0]; if (G.teams[p.ti]) G.teams[p.ti].weapon = p.weapon;
    if (p.isMe) fx('float', { x: p.x, y: p.y + 3.2, z: p.z, text: 'Out of javelins', color: '#fff' });
  }
  if (p.human && orderOf(p.ti) === 'shieldwall' && !softAim(p, 2.2) && wallPush(p)) return; // (behind the wall, nobody in reach: the wall heaves)
  if (p.human && (p.streak || 0) >= STREAK.n && G.T - (p.streakT ?? -9) <= STREAK.gap) { streakFinisher(p); return; }
  // straight out of an evade: its follow-up
  const ev = p.evade && G.T - p.evade.t < (EVADE[p.evade.kind] ? EVADE[p.evade.kind].dash : .2) + EVADE.follow ? p.evade.kind : null;
  if (ev) p.evade = null;
  if (ev === 'pounce') { leapSlam(p); p.leapStrike = true; return; } // (the pounce: down on him from the air)
  const spear = p.weapon === 'spear', S = CC.sword, k = paceOf(p.ti); // (C1g: his pace stretches the combo to his rate)
  const sCombo = spear ? (G.T - p.lastSwingT < CC.spear.window * k && p.swingKind >= 3 ? (p.combo + 1) % 3 : 0) : 0, skewer = sCombo === 2, SK = CC.spear.skewer, sweep = spear && sCombo === 1, SW = CC.spear.sweep;
  const best = softAim(p, spear ? (skewer ? SK.aim : sweep ? SW.aim : CC.spear.aim) : S.aim);
  if (p.isMe && G.capStats) { G.capStats.press++; if (!best) G.capStats.noTarget++; }
  let target = best;
  // on the summit: facing the glacier (or the chest) with it in reach, you hit that, whoever's about
  if (G.c2 && p.human) { const w = c2BreakInReach(p); if (w && (w.kind === 'glacier' || w.kind === 'chest') && Math.abs(angDiff(Math.atan2(w.x - p.x, w.z - p.z), p.face)) < 1.1) { target = { tower: w }; p.face = Math.atan2(w.x - p.x, w.z - p.z); } }
  if (!target) { const w = wallInReach(p, 1.5); if (w) { target = { wall: w }; p.face = Math.atan2(w.x - p.x, w.z - p.z); } } // (an enemy palisade: hack at it)
  if (!best && !target && ((G.wtowers && G.wtowers.length) || G.c2)) { const w = towerInReach(p); if (w) { target = { tower: w }; p.face = Math.atan2(w.x - p.x, w.z - p.z); } } // (an enemy watchtower)
  if (!best && !target) {
    const [ci, cd] = nearestEnemyCastle(p);
    if (ci >= 0 && cd < CASTLE_REACH + .6) { target = { castle: ci }; p.face = Math.atan2(TEAMS[ci].pos[0] - p.x, TEAMS[ci].pos[1] - p.z); }
  }
  if (!startSwing(p, target)) return;
  p.pending.t = .12;
  if (best && target === best) {
    const ang = Math.atan2(best.x - p.x, best.z - p.z), d = Math.hypot(best.x - p.x, best.z - p.z);
    p.face = ang;
    // step into a target at the edge of reach, so a press always connects
    const edge = spear ? spearReach(spearBlow(sCombo), best) - .2 : p.r + best.r + p.reach - .2; // (F25: the spear, to where its tip reaches)
    if (d > edge && !skewer) { p.vx += Math.sin(ang) * 4; p.vz += Math.cos(ang) * 4; }
  }
  if (spear && skewer) { // the third thrust: a running lunge, the spear level, through everyone in the line
    Object.assign(p.pending, { t: SK.t, mult: SK.mult, reachB: SK.reachB, pierce: SK.pierce, pierceN: SK.pierceN, line: SK.line, kb: SK.kb, stun: SK.stun, shove: true });
    p.vx = Math.sin(p.face) * SK.lunge; p.vz = Math.cos(p.face) * SK.lunge; p.dashT = SK.dash; // (a moment where his feet don't brake: the lunge carries)
    p.cd = SK.cd * k; p.combo = 2; p.swingKind = 5; p.pending.spear = 'thrust';
  } else if (sweep) { // the second blow: a sweep, struck like a sword swing (F17d)
    Object.assign(p.pending, { mult: SW.mult, kb: SW.kb, spear: 'sweep', t: CC.spear.t });
    p.vx += Math.sin(p.face) * SW.step; p.vz += Math.cos(p.face) * SW.step; // (a half-step into it)
    p.cd = CC.spear.cd2 * k; p.combo = 1; p.swingKind = 3;
  } else if (spear) {
    Object.assign(p.pending, { mult: CC.spear.mult, reachB: CC.spear.reachB, pierce: CC.spear.pierce, pierceN: CC.spear.pierceN, kb: CC.spear.kb, stun: CC.spear.stun, shove: true, spear: 'poke', t: CC.spear.t });
    p.vx += Math.sin(p.face) * CC.spear.lunge; p.vz += Math.cos(p.face) * CC.spear.lunge; // (the whole body goes into the thrust)
    p.cd = (sCombo === 1 ? CC.spear.cd2 : CC.spear.cd) * k; p.combo = sCombo; p.swingKind = 3;
  } else {
    const combo = G.T - p.lastSwingT < S.window * k ? (p.combo + 1) % 3 : 0, fin = combo === 2;
    // the rhythm: presses on the beat (a joiner's phone judges its own, network hiccups aside)
    const onBeat = Math.abs(G.T - p.lastSwingT - RHYTHM.at * k) <= RHYTHM.w * k;
    p.beats = combo === 0 ? 0 : p.remote && p.rbIn != null ? p.rbIn : onBeat ? (p.beats || 0) + 1 : 0; p.rbIn = null;
    Object.assign(p.pending, { mult: fin ? S.finisherMult : S.mult, cleave: fin, spin: fin, kb: fin ? 1.25 : .25 }); // light hits keep him in reach, the finisher spins and launches
    const tb = champOf(p.ti).combo; // (C3a: a champion whose third blow is the shield bash: his boosted hit, like every champion's third; it staggers, no more)
    if (fin && tb && tb.chop) { Object.assign(p.pending, { mult: S.finisherMult, cleave: true, spin: false, arc: tb.chop.arc / 2, cleaveX: 1, cleaveN: tb.chop.n, kb: tb.chop.kb, reachB: tb.chop.reachB }); fx('fxmsg', { k: 'fxchop', u: p }); } // (C5b: her overhead chop, the whole arc in front)
    else if (fin && tb && tb.bash) { Object.assign(p.pending, { mult: S.finisherMult, cleave: false, spin: false, kb: BASH.kb, stun: tb.stun, reachB: .3 }); sound('thud', p.x, p.z); }
    else if (fin && p.human && p.beats >= 2) { // on the beat all the way: the rhythm finisher
      Object.assign(p.pending, { mult: S.finisherMult * RHYTHM.mult, kb: 1.25 * RHYTHM.kb, stun: RHYTHM.stun });
      fx('fxmsg', { k: 'fxrhythm', u: p }); hl(p.ti, 'rhythm'); if (p.remote) fx('netFlush');
    }
    const stp = fin ? (tb && tb.bash ? BASH.step : 0) : S.step; // (FEEL1: the bash steps him in behind the shield)
    if (stp) { p.vx += Math.sin(p.face) * stp; p.vz += Math.cos(p.face) * stp; } // (a half-step into each blow)
    p.cd = (fin ? S.finisherCd : S.cd) * k; p.combo = combo; p.swingKind = fin ? (tb && tb.bash ? 6 : tb && tb.chop ? 5 : 4) : combo; // (4: the spin; 6: the shield bash; 5: the overhead chop)
  }
  if ((ev === 'side' || ev === 'back') && p.pending) {
    if (ev === 'side') { Object.assign(p.pending, { mult: (p.pending.mult || 1) * EVADE.flank.mult, stun: Math.max(p.pending.stun || 0, EVADE.flank.stun) }); p.swingKind = spear ? 3 : 1; } // the flank cut: hard enough to break a wind-up; from behind, a backstab too
    else { Object.assign(p.pending, { mult: (p.pending.mult || 1) * EVADE.counter.mult, reachB: (p.pending.reachB || 0) + EVADE.counter.reachB }); if (!spear) p.swingKind = 0; } // the counter-lunge: point first
    p.combo = 0;
    // either way he drives back in to arm's length, so the answer to an evade always lands
    if (best) { const d = Math.hypot(best.x - p.x, best.z - p.z), gap = Math.max(0, d - (p.r + best.r + p.reach - .2)), v = Math.min(16, gap / EVADE.counter.dash + 2);
      p.vx = Math.sin(p.face) * v; p.vz = Math.cos(p.face) * v; p.dashT = EVADE.counter.dash; }
  }
  if (best && best.leader && !best.human && p.pending) aiEvade(best, p); // (he may see it coming)
  p.lastSwingT = G.T;
}
// The shield wall's push (PUSH): the wall steps into them as one, and the men in front of it reel back.
export function wallPush(p) {
  const s = G.teams[p.ti]; if (!s || (s.pushCd || 0) > G.T) return false;
  const wall = G.units.filter(u => !u.dead && u.ti === p.ti && u.kind === 'foot' && u.shieldwall && u.stun <= 0);
  if (wall.length < 3) return false;
  s.pushCd = G.T + PUSH.cd;
  const f = p.face, fx0 = Math.sin(f), fz0 = Math.cos(f), hit = new Set();
  for (const w of wall) {
    w.vx += fx0 * PUSH.step; w.vz += fz0 * PUSH.step; w.blockT = Math.max(w.blockT, .4); w.swing = .3;
    for (const o of G.units) {
      if (o.dead || hit.has(o) || !isEnemy(o, w) || o.mounted || o.leader && o.duelId) continue;
      const dx = o.x - w.x, dz = o.z - w.z, d = Math.hypot(dx, dz); if (d > w.r + o.r + PUSH.reach) continue;
      if (dx * fx0 + dz * fz0 < 0) continue; // (only what's in front of the wall)
      hit.add(o);
      o.guardUp = false; o.gT = SHIELD.open; o.blockT = 0; o.guardT = 0; if (o.windup > 0) { o.windup = 0; o.glint = false; }
      o.hp -= w.dmg * PUSH.mult * aiDmg(w.ti); o.lastHit = G.T;
      push(o, fx0 * PUSH.kb, fz0 * PUSH.kb, PUSH.stun);
      if (o.hp <= 0) die(o, w, f, 0);
    }
  }
  p.cd = .5; p.swing = .38; p.swingKind = 6; p.blockT = .3;
  sound('clang', p.x, p.z); sound('trample', p.x + fx0 * 2, p.z + fz0 * 2);
  fx('fxmsg', { k: 'fxpush', u: p, heavy: hit.size > 0 }); hl(p.ti, 'push', hit.size ? 1 : 0);
  if (p.remote) fx('netFlush');
  return true;
}
// The streak's payoff: a whirlwind all the way round, harder than the spin, that no guard stops.
function streakFinisher(p) {
  const best = softAim(p, 4); if (best) p.face = Math.atan2(best.x - p.x, best.z - p.z);
  if (!startSwing(p, best)) return;
  Object.assign(p.pending, { t: .14, mult: STREAK.mult, cleave: true, spin: true, kb: STREAK.kb, stun: STREAK.stun, streak: true });
  p.cd = .9; p.combo = 0; p.swingKind = 4; p.streak = 0; p.lastSwingT = G.T; hl(p.ti, 'rampage');
  fx('fxmsg', { k: 'fxstreak', u: p });
  if (p.remote) fx('netFlush');
}
// The shield bash (BASH): Block tapped, then Attack. If that Block press turned a blow, it's the riposte instead.
export function captainBash(p) {
  if (!p || p.dead || p.mounted || p.carrying || airborne(p)) return false;
  if (p.ripN > 0 && p.riposteT > G.T) return false; // (a parry just now: the riposte)
  if ((p.bashCd || 0) > G.T || p.cd > 0 || p.stun > 0 || (p.st ?? STAMINA.max) < STAMINA.bash) return false;
  const v = softAim(p, BASH.reach + 1); if (!v) return false;
  p.face = Math.atan2(v.x - p.x, v.z - p.z);
  if (!startSwing(p, v)) return false;
  spendSt(p, STAMINA.bash - STAMINA.light);
  Object.assign(p.pending, { t: .1, mult: BASH.mult, kb: BASH.kb, bash: true, reachB: .3 });
  p.vx += Math.sin(p.face) * 5; p.vz += Math.cos(p.face) * 5; // (shoulder behind the shield)
  p.cd = .55; p.bashCd = G.T + BASH.cd; p.blockT = .3; p.swingKind = 6; p.combo = 0; p.lastSwingT = G.T;
  sound('thud', p.x, p.z);
  return true;
}
