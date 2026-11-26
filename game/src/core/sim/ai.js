// Battle rules: computer captains.
import { circleAt } from './capture.js'; // (CASTLE4)
import { CROWN26, TEAMS, CASTLE_REACH, HEAVY, GUARD, CTRL, RANGED } from '../../config.js';
import { rangedOf, rangeOf } from './ranged.js'; // (RANGE1)
import { G, isEnemy, isEnemyTi, colorOf, gateOff, rules } from '../state.js';
import { spearReach } from '../spearhit.js';
import { gatePos, rnd, angDiff, W, mountK, mountHomeA } from '../world.js';
import { champWeapon, homeAt, squadOf } from './match.js';
import { dismount, spearNear, speedOf, summonHorse } from './army.js';
import { nearestFoe, startSwing } from './melee.js';
import { aiRide, startHeavy } from './guard.js';
import { insidePlaza, plazaGateFor } from './forts.js';
import { allianceOf, holdPlan, leadingSide } from './holds.js';
import { c2Guard } from './crown2.js';
import { captainAttack, captainJump } from './captain.js';
import { faceTo, go, moveToward } from './move.js';
import { champOf } from '../../champions/index.js';
import { aiAbilities } from './abilities.js';
import { aiPull } from './pulldown.js';

// ---------- AI ----------
function planLeader(u, s) {
  const t = TEAMS[colorOf(u.ti)], squadN = squadOf(u.ti).length;
  if (u.huntT > G.T && s.plan && s.plan.kind === 'hunt' && s.plan.target && !s.plan.target.dead) return; // (AI1: on guard: keep hunting)
  if (G.mode === 'conquest') {
    const threat = G.units.some(o => !o.dead && isEnemy(o, u) && Math.hypot(o.x - t.pos[0], o.z - t.pos[1]) < 22);
    // gather a real army at home before marching out (keeps the big clashes big)
    const gather = Math.round((s.plan && s.plan.kind === 'castle' ? 4 : 11) * rules().gather);
    if (G.teams[colorOf(u.ti)].alive && (threat || squadN < gather)) { s.plan = { kind: 'defend' }; return; }
    { const hp = holdPlan(u, s); if (hp) { s.plan = hp; return; } } // (the map's prize, if it has one)
    let target = s.plan && s.plan.kind === 'castle' && G.teams[s.plan.ti].alive && Math.random() > .08 ? s.plan.ti : null;
    if (target == null) {
      const opts = [0, 1, 2, 3].filter(c => isEnemyTi(c, u.ti) && G.teams[c].alive)
        .sort((a, b) => Math.hypot(TEAMS[a].pos[0] - u.x, TEAMS[a].pos[1] - u.z) - Math.hypot(TEAMS[b].pos[0] - u.x, TEAMS[b].pos[1] - u.z));
      if (opts.length) target = opts[Math.random() < .7 ? 0 : Math.min(1, opts.length - 1)];
      // the side that's running away with it draws everyone's eye
      const lead = leadingSide(); if (lead != null && lead !== allianceOf(u.ti) && Math.random() < .45) { const lc = opts.find(c => G.ALLY[c] === lead); if (lc != null) target = lc; }
    }
    s.plan = target == null ? { kind: 'defend' } : { kind: 'castle', ti: target };
  } else if (G.mode === 'crown') {
    const f = G.flag;
    if (f) { // the Crown is up: everyone wants it
      if (u.carrying) { s.plan = { kind: 'home' }; return; }
      if (f.state === 'carried') { s.plan = { kind: isEnemy(f.carrier, u) ? 'hunt' : 'escort', target: f.carrier }; return; }
      s.plan = { kind: 'banner' }; return;
    }
    const hp = holdPlan(u, s); s.plan = hp || { kind: 'defend' };
  } else if (G.mode === 'dm') {
    const gather = Math.round((s.plan && s.plan.kind === 'hunt' ? 3 : 9) * rules().gather);
    if (squadN < gather && s.tickets > 0 && !G.warmup) { s.plan = { kind: 'defend' }; return; } // (the warm-up: captains only, nobody to gather, so straight at each other)
    { const hp = holdPlan(u, s); if (hp) { s.plan = hp; return; } }
    const [cap] = nearestFoe(u, 400, o => o.leader), [any] = nearestFoe(u, 400);
    const bl = G.bounty >= 0 && isEnemyTi(G.bounty, u.ti) && Math.random() < .65 ? G.teams[G.bounty].leader : null;
    s.plan = { kind: 'hunt', target: (bl && !bl.dead) ? bl : (cap || any) };
  } else if (G.mode === 'ctrl') {
    const gather = Math.round((s.plan && s.plan.kind === 'point' ? 4 : 9) * rules().gather);
    if (squadN < gather) { s.plan = { kind: 'defend' }; return; }
    const mine = s.plan && s.plan.kind === 'point' ? G.ctrlPoints[s.plan.id] : null;
    // stick with the point already being pushed unless it's ours now or someone else has since taken it over
    if (mine && mine.owner !== u.ti && Math.random() > .1) return;
    const opts = G.ctrlPoints.filter(p => p.owner !== u.ti).sort((a, b) => Math.hypot(a.x - u.x, a.z - u.z) - Math.hypot(b.x - u.x, b.z - u.z));
    s.plan = opts.length ? { kind: 'point', id: opts[0].id } : { kind: 'defend' };
  } else {
    const f = G.flag;
    if (u.carrying) s.plan = { kind: 'home' };
    else if (f.state === 'carried') s.plan = { kind: isEnemy(f.carrier, u) ? 'hunt' : 'escort', target: f.carrier };
    else s.plan = { kind: 'banner' };
  }
}
// The mountain: a trip between tiers goes by the nearest ramp, bridge or chasm bridge, so each leg of
// it is short enough for the pathfinder (a straight search from the rim to the summit gives up).
function c2Route(u, g) {
  if (!g || !G.c2) return g;
  const R = W.R, K = mountK(), rw = K.riverW * R, cw = K.chasmW * R;
  const tier = r => r > K.ridge * R ? 0 : r > K.river * R - rw ? 1 : r > K.arena * R ? 2 : 3;
  const ru = Math.hypot(u.x, u.z), rg = Math.hypot(g.x, g.z), tu = tier(ru), tg = tier(rg); if (tu === tg) return g;
  const inward = tg > tu, b = inward ? tu : tu - 1; // (the boundary to cross next)
  const au = Math.atan2(u.z, u.x), ag = Math.atan2(g.z, g.x);
  const cands = m26Cross(b); // (MAP3: the mountain's own ramps and bridges)
  let best = 0, bc = 1e9; for (const a of cands) { const c = Math.abs(angDiff(au, a)) * ru + Math.abs(angDiff(a, ag)) * rg * .5; if (c < bc) { bc = c; best = a; } }
  const sides = [[K.ridge * R + 6, K.ridge * R - 6], [K.river * R + rw + 3, K.river * R - rw - 6], [K.chasm * R + cw + 2, K.arena * R - 2]][b], d = inward ? sides[1] : sides[0];
  return { x: Math.cos(best) * d, z: Math.sin(best) * d, stop: 1.5 };
}
// the mountain's ways between tiers, as angles: the ridge's openings (each King's Road and each border field's middle),
// the river ring's bridges (each King's Road and one below each outer castle), the chasm's bridges (the King's Roads)
function m26Cross(b) { const o = b === 0 ? [0, Math.PI / 4] : b === 1 ? [-CROWN26.bridgeA, 0, CROWN26.bridgeA] : [0]; return [0, 1, 2, 3].flatMap(c => o.map(d => mountHomeA(c) + d)); }
function planGoal(u, s) { return G.c2 ? c2Route(u, planGoal0(u, s)) : planGoal0(u, s); }
function planGoal0(u, s) {
  const p = s.plan; if (!p) return null;
  const t = TEAMS[colorOf(u.ti)];
  switch (p.kind) {
    case 'defend': { const [gx, gz] = s.homeSpot || (s.homeSpot = homeAt(u.ti, 1)); return { x: gx, z: gz, stop: 1.5 }; }
    case 'castle': return { x: TEAMS[p.ti].pos[0], z: TEAMS[p.ti].pos[1], stop: CASTLE_REACH - .8, castle: p.ti };
    case 'hunt': case 'escort': return p.target && !p.target.dead ? { x: p.target.x, z: p.target.z, stop: p.kind === 'escort' ? 3 : 1.5 } : null;
    case 'home': { const [gx, gz] = s.homeSpot || (s.homeSpot = homeAt(u.ti)); return { x: gx, z: gz, stop: .5 }; }
    case 'banner': {
      const g = !insidePlaza(u) && plazaGateFor(u.x, u.z);
      if (g) { const d = Math.hypot(g.x, g.z) || 1; return { x: g.x * (1 + 1.6 / d), z: g.z * (1 + 1.6 / d), stop: .8, gate: g }; } // (the wall's up and whole: break a gate)
      return { x: G.flag.x, z: G.flag.z, stop: G.flag.state === 'cased' ? rnd(3, 7) : .2 };
    }
    case 'point': { const pt = G.ctrlPoints && G.ctrlPoints[p.id]; return pt ? { x: pt.x, z: pt.z, stop: CTRL.radius * .6 } : null; }
    case 'hold': { const h = G.holds && G.holds[p.id]; if (!h) return null;
      const gd = G.c2 && h.owner < 0 && c2Guard(h); if (gd) return { x: gd.x, z: gd.z, stop: 1.2 }; // (the mountain: its guards first)
      if (h.kind === 'castle' && G.c2) { const c = circleAt(h); return { x: c.x, z: c.z, stop: c.r * .5 }; } // (CASTLE4: the banner's circle)
      return { x: h.x, z: h.z, stop: h.r * .35 }; }
    case 'spot': return { x: p.x, z: p.z, stop: p.stop || 1.5 };
  }
  return null;
}
function aiHorse(u, dist) {
  if (u.carrying) { if (u.mounted) dismount(u, false); return; }
  if (!u.mounted && !u.summon && dist > 30 && !(u.foe && u.fd < 14)) summonHorse(u);
  const pk = G.teams[u.ti].plan && G.teams[u.ti].plan.kind;
  if (u.mounted && (dist < (pk === 'hunt' ? 6 : 12) || spearNear(u, G.diff === 2 ? 11 : 7))) dismount(u, false);
}
// Computer captains fight with the player's moveset, more of it the higher the difficulty:
// Recruit keeps the plain swing; Soldier switches weapons and throws javelins, with a slower
// rhythm and the odd leap; Warlord chains full-speed combos and leaps into any cluster of men.
// A computer captain's guard: in spells, shield raised, pressing in without attacking. Decided every
// GUARD.dur seconds while fighting another captain, so it takes up about GUARD.share of the fight.
function aiGuard(u, foe, fd, dt) {
  if (!u.duelId) { u.guardT = 0; return false; } // (FEEL3: computers guard only in a duel)
  if (!(u.guardT > 0) && !(u.guardCd > 0)) { u.guardCd = GUARD.dur; if (foe.leader && !foe.mounted && fd < 7 && Math.random() < GUARD.share[G.diff]) u.guardT = GUARD.dur * (.8 + Math.random() * .5); }
  if (!(u.guardT > 0)) return false;
  if (foe.stun > .2 || foe.dead || foe.mounted) { u.guardT = 0; return false; } // (an opening: take it)
  u.blockT = Math.max(u.blockT, .15); faceTo(u, foe.x, foe.z, dt, 8);
  go(u, foe.x, foe.z, speedOf(u) * .45, dt, u.r + foe.r + u.reach * .7);
  return true;
}
// wind up a heavy blow in a captain's face and he may cut in before it lands
function aiPunish(u, foe, fd) {
  if (!(foe.heavyCharge > 0) && !(foe.ahT > .25 && (foe.weapon || 'sword') === 'sword')) { u.punishRoll = null; return false; }
  if (u.punishRoll == null) u.punishRoll = Math.random() < GUARD.punish[G.diff];
  if (!u.punishRoll || u.cd > 0 || u.stun > 0 || fd > u.r + foe.r + u.reach + .5) return false;
  u.guardT = 0; captainAttack(u); return true;
}
// (RANGE1) a computer ranged champion: her specials first; she keeps RANGED.keep m from a melee champion (backing off,
// still shooting), closes to RANGED.close of her range, and shoots whatever is nearest in range
function aiRanged(u, foe, fd, dt) {
  if (aiAbilities(u, foe, fd)) return;
  const R = rangeOf(u), keep = foe.leader && !rangedOf(foe) ? RANGED.keep : 0;
  if (keep && fd < keep) { const a = Math.atan2(u.x - foe.x, u.z - foe.z); go(u, u.x + Math.sin(a) * 4, u.z + Math.cos(a) * 4, speedOf(u), dt, .2); }
  else if (fd > R * RANGED.close) go(u, foe.x, foe.z, speedOf(u), dt, R * RANGED.close);
  else moveToward(u, u.x, u.z, 0, dt);
  faceTo(u, foe.x, foe.z, dt, 12);
  if (u.cd <= 0 && u.stun <= 0) captainAttack(u);
}
function aiCaptainFight(u, foe, fd, dt) {
  const war = G.diff >= 2;
  if (u.windup > 0) { moveToward(u, u.x, u.z, 0, dt); return; }
  if (!u.mounted && aiPull(u)) return; // (PULL1)
  if (rangedOf(u) && !u.duelId) { aiRanged(u, foe, fd, dt); return; } // (RANGE1)
  if (aiPunish(u, foe, fd)) return;
  if (aiGuard(u, foe, fd, dt)) return;
  if (aiAbilities(u, foe, fd)) return; // (C1c: his special attacks and ult)
  if (!u.weapon) u.weapon = champWeapon(u.ti, 'sword');
  u.wpnT = (u.wpnT || 0) - dt; u.leapT = (u.leapT || 0) - dt;
  if (u.wpnT <= 0) { // re-think the weapon now and then, like a person would
    u.wpnT = war ? rnd(.8, 1.4) : rnd(1.6, 2.6);
    const riders = foe.mounted || G.units.some(o => !o.dead && o.mounted && isEnemy(o, u) && Math.hypot(o.x - u.x, o.z - u.z) < 12);
    const w = riders ? 'spear' : fd > 4.5 && u.javAmmo >= 1 ? 'jav' : war || Math.random() < .5 ? 'sword' : 'spear';
    if (w !== u.weapon && champOf(u.ti).weapons.includes(w)) { u.weapon = w; u.combo = 0; u.cd = Math.max(u.cd, .25); } // (C1a: only his champion's weapons)
  }
  if (u.weapon === 'jav') {
    if (u.javAmmo < 1 || fd < 3) { u.weapon = champWeapon(u.ti, 'sword'); u.wpnT = rnd(.6, 1.2); }
    else {
      moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 10);
      if (u.cd <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { captainAttack(u); if (!war) u.cd += .5; }
      return;
    }
  }
  const reach = u.weapon === 'spear' ? spearReach('poke', foe) : u.r + foe.r + u.reach; // (F25: the spear, to where its tip reaches)
  go(u, foe.x, foe.z, speedOf(u), dt, reach * .7); faceTo(u, foe.x, foe.z, dt);
  // leap slam: into a group of men in front of him
  if (u.jy > 0) { if (u.jvy < 2 && u.cd <= 0) captainAttack(u); return; }
  if (u.leapT <= 0 && fd < 3.4 && u.jumpCd <= 0 && u.stun <= 0) {
    u.leapT = war ? rnd(2.5, 4) : rnd(7, 11);
    const n = G.units.filter(o => !o.dead && isEnemy(o, u) && Math.hypot(o.x - u.x, o.z - u.z) < 3.6 && Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) < 1.2).length;
    if (n >= 2 && (war || Math.random() < .5) && captainJump(u)) return;
  }
  if (fd < reach + .4 && u.cd <= 0 && u.stun <= 0 && !foe.mounted && Math.random() < HEAVY.chance[G.diff] && startHeavy(u, foe, HEAVY.windup[G.diff])) return;
  if (fd < reach && u.cd <= 0 && u.stun <= 0) { captainAttack(u); if (!war) u.cd += .2; }
}
// Computer captains hold a line too: across the front of the gate when defending with enemies
// close, and on a control point they own when an enemy army comes for it. (Not on Recruit.)
function aiHold(u, s) {
  s.aiHold = false;
  if (G.diff < 1 || squadOf(u.ti).length < 5) return;
  const p = s.plan; let spot = null;
  if (p && p.kind === 'defend') spot = G.crown ? (G.teams[u.ti].homeSpot || homeAt(u.ti, 3)) : gatePos(TEAMS[colorOf(u.ti)], gateOff(u.ti), 3);
  else if (p && p.kind === 'point') { const pt = G.ctrlPoints && G.ctrlPoints[p.id]; if (pt && pt.owner === u.ti) spot = [pt.x, pt.z]; }
  else if (p && p.kind === 'hold') { const h = G.holds && G.holds[p.id]; if (h && h.owner === allianceOf(u.ti)) spot = [h.x, h.z]; }
  if (!spot || Math.hypot(u.x - spot[0], u.z - spot[1]) > 10) return;
  const [f] = nearestFoe({ x: spot[0], z: spot[1], ti: u.ti }, 34, o => !o.dead);
  if (!f) return;
  const face = Math.atan2(f.x - spot[0], f.z - spot[1]);
  s.aiHold = true; s.holdPt = { x: spot[0] + Math.sin(face) * 2, z: spot[1] + Math.cos(face) * 2, face };
}
export function thinkLeader(u, s, dt) {
  s.thinkT -= dt;
  if (s.thinkT <= 0 || !s.plan) { s.thinkT = rnd(1.2, 2.4); planLeader(u, s); aiHold(u, s); }
  const foe = u.foe, fd = u.fd;
  const rg = rangedOf(u) && !u.duelId; // (RANGE1: a ranged champion fights from her range, on foot)
  if (foe && (u.duelId || (fd < (rg ? rangeOf(u) : u.mounted ? 12 : 10) && !u.carrying && !(s.plan && s.plan.kind === 'escort' && fd > 5)))) {
    if (rg) { if (u.mounted) dismount(u, false); else aiRanged(u, foe, fd, dt); }
    else if (u.mounted) {
      if (spearNear(u, 7)) dismount(u, false);
      const inv = 1 / Math.max(fd, .1);
      go(u, foe.x + (foe.x - u.x) * inv * 4, foe.z + (foe.z - u.z) * inv * 4, speedOf(u), dt, .1);
      aiRide(u, foe, fd);
    } else if (G.diff >= 1) aiCaptainFight(u, foe, fd, dt);
    else if (u.windup > 0) moveToward(u, u.x, u.z, 0, dt);
    else if (aiGuard(u, foe, fd, dt)) {}
    else {
      go(u, foe.x, foe.z, speedOf(u), dt, u.r + foe.r + u.reach * .6); faceTo(u, foe.x, foe.z, dt);
      if (fd < u.r + foe.r + u.reach + .4 && u.cd <= 0 && !foe.mounted && Math.random() < HEAVY.chance[0] && startHeavy(u, foe, HEAVY.windup[0])) return;
      if (fd < u.r + foe.r + u.reach) startSwing(u, foe);
    }
    return;
  }
  const g = planGoal(u, s);
  if (!g) { moveToward(u, u.x, u.z, 0, dt); s.thinkT = Math.min(s.thinkT, .3); return; }
  aiHorse(u, Math.hypot(g.x - u.x, g.z - u.z));
  const d = go(u, g.x, g.z, speedOf(u), dt, g.stop);
  if (g.castle != null) { if (d < CASTLE_REACH && !u.mounted) { faceTo(u, g.x, g.z, dt, 6); startSwing(u, { castle: g.castle }); } }
  else if (s.plan.kind === 'defend' && d < 2) faceTo(u, 0, 0, dt, 3);
}
