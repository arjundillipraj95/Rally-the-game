// Battle rules: formations and soldiers' thinking.
import { body } from '../body.js';
import { CROWN2, TEAMS, CASTLE_REACH, JAVELIN, HEAVY } from '../../config.js';
import { G, isEnemy, isEnemyTi, colorOf, activeArmies, gateOff } from '../state.js';
import { gatePos, rnd, angDiff, turn } from '../world.js';
import { homeAt, squadOf } from './match.js';
import { bowRange, orderOf, speedOf } from './army.js';
import { nearestEnemyCastle, nearestFoe, startSwing } from './melee.js';
import { guardRing } from './duel.js';
import { startHeavy } from './guard.js';
import { shoot, throwJavelin } from './missiles.js';
import { c2GateA } from './crown2.js';
import { faceTo, go, moveToward } from './move.js';
import { champOf } from '../../champions/index.js';

function slotPos(anchor, front, idx, isArch, meleeN) {
  const W = 5, row = Math.floor(idx / W), lat = (idx % W - 2) * 1.45;
  const back = isArch ? (front ? 2.0 + row * 1.5 : 1.8 + Math.ceil(meleeN / W) * 1.5 + row * 1.5) : (front ? -(2.2 + row * 1.5) : 1.8 + row * 1.5);
  const f = anchor.face, fx = Math.sin(f), fz = Math.cos(f), rx = Math.cos(f), rz = -Math.sin(f);
  return [anchor.x - fx * back + rx * lat, anchor.z - fz * back + rz * lat];
}
// (C3c) behind a raised Shield of Cassius: four across in the zone behind him, facing his way; archers shoot from there,
// footmen strike what reaches them
function shelter(u, L, dt, range) {
  const S = L.scutum, f = S.face, i = u.slot || 0, k = body.soldier, row = Math.floor(i / 4), lat = (i % 4 - 1.5) * 1.1 * k, back = (1.3 + row * 1.1) * k, fx = Math.sin(f), fz = Math.cos(f); // (SIZE1: k, room for bigger men)
  const gx = L.x - fx * back + fz * lat, gz = L.z - fz * back - fx * lat, foe = u.foe, fd = u.fd;
  const d = go(u, gx, gz, speedOf(u) * 1.15, dt, .2);
  if (u.kind === 'arch' && foe && fd <= range && d < 1.5) { u.aim = true; faceTo(u, foe.x, foe.z, dt, 8); if (u.shootCd <= 0 && u.stun <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { shoot(u, foe); u.shootCd = u.shootBase * rnd(.85, 1.2); } return; }
  if (foe && fd < u.r + foe.r + u.reach) { faceTo(u, foe.x, foe.z, dt); startSwing(u, foe); return; }
  if (d < 1) u.face = turn(u.face, f, dt * 6);
}
// A held line: footmen shoulder to shoulder across the spot, seven to a rank, archers two paces behind.
export const HOLD_W = 7;
export function holdPos(a, idx, isArch, meleeN, archN = HOLD_W) {
  const rows = Math.ceil(meleeN / HOLD_W), row = Math.floor(idx / HOLD_W), inRow = Math.max(1, Math.min(HOLD_W, (isArch ? archN : meleeN) - row * HOLD_W));
  const lat = (idx % HOLD_W - (inRow - 1) / 2) * 1.3, back = isArch ? rows * 1.35 + 1.6 + row * 1.5 : row * 1.35;
  const f = a.face, fx = Math.sin(f), fz = Math.cos(f), rx = Math.cos(f), rz = -Math.sin(f);
  return [a.x - fx * back + rx * lat, a.z - fz * back + rz * lat];
}
// Shieldwall: a tight forward-facing line (9 wide) just ahead of a human captain (behind a
// computer one), rather than a deep huddled block — footmen up front, archers a rank behind.
function shieldwallPos(anchor, front, idx) {
  const perRow = 9, row = Math.floor(idx / perRow), lat = (idx % perRow - (perRow - 1) / 2) * .95;
  const back = front ? -(1.6 + row * 1.1) : 1.6 + row * 1.1;
  const f = anchor.face, fx = Math.sin(f), fz = Math.cos(f), rx = Math.cos(f), rz = -Math.sin(f);
  return [anchor.x - fx * back + rx * lat, anchor.z - fz * back + rz * lat];
}
// Holding a line: nobody chases. Footmen strike whatever reaches them, stepping at most a pace out
// of their place; archers shoot from theirs. A footman standing in his place braces (see hit()).
function holdPlace(u, H, dt, range) {
  const [gx, gz] = holdPos(H, u.slot || 0, u.kind === 'arch', u.meleeN || 0, u.archN || 0), off = Math.hypot(gx - u.x, gz - u.z);
  const foe = u.foe, fd = u.fd, reach = foe ? u.r + foe.r + u.reach : 0;
  if (u.kind === 'arch') {
    if (foe && fd < reach) { startSwing(u, foe); faceTo(u, foe.x, foe.z, dt); moveToward(u, u.x, u.z, 0, dt); return; }
    if (foe && fd <= range && off < 2.5) {
      u.aim = true; moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 8);
      if (u.shootCd <= 0 && u.stun <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { shoot(u, foe); u.shootCd = u.shootBase * rnd(.85, 1.2); }
      return;
    }
  } else if (foe && fd < reach + 1.4 && Math.hypot(foe.x - gx, foe.z - gz) < 4.5) {
    if (off < 1.3 && fd > reach * .8) moveToward(u, foe.x, foe.z, speedOf(u) * .6, dt, reach * .7); else moveToward(u, gx, gz, speedOf(u), dt, .15);
    faceTo(u, foe.x, foe.z, dt); if (fd < reach) startSwing(u, foe);
    u.holding = off < 1.6; return;
  } else if (u.javelin && u.javCd <= 0 && foe && fd < JAVELIN.range && fd > reach + .3 && !foe.mounted && off < 1.2) {
    moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 8);
    if (Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) throwJavelin(u, foe);
    u.holding = true; return;
  }
  const d = go(u, gx, gz, speedOf(u) * (off > 6 ? 1.15 : 1), dt, .15);
  if (d < 1) u.face = turn(u.face, H.face, dt * 6);
  u.holding = u.kind === 'foot' && d < 1.6;
}
export function thinkSoldier(u, dt) {
  if (u.testudo) return; // (C3e: locked in the testudo, the block moves him)
  if (u.windup > 0) { moveToward(u, u.x, u.z, 0, dt); return; }
  const s = G.teams[u.ti], L = s.leader, leaderUp = L && !L.dead;
  // a broken army runs for home, weapons forgotten
  u.routing = s.routT > 0;
  if (u.routing) { u.aim = false; u.holding = false; const [gx, gz] = G.crown ? (u.runTo || (u.runTo = homeAt(u.ti, 6))) : gatePos(TEAMS[colorOf(u.ti)], gateOff(u.ti), 6); go(u, gx, gz, speedOf(u), dt, 2); return; }
  if (u.guardOf) { guardRing(u, u.guardOf, dt); return; }
  // (CASTLE10) following a champion who is hacking at a gate or a nexus: the footmen join him at it (and soak its arrows)
  { const sg = s.siegeAt; if (sg && u.kind === 'foot' && G.T - sg.T < 2.5 && orderOf(u.ti) === 'follow' && !(u.fd < 3)) {
    if (Math.hypot(sg.x - u.x, sg.z - u.z) > (sg.r || 0) + 1.6) { go(u, sg.x, sg.z, speedOf(u), dt, (sg.r || 0) + 1); return; } u.face = Math.atan2(sg.x - u.x, sg.z - u.z); } }
  // ordered at one enemy group: go for the men around it
  if (orderOf(u.ti) === 'focus' && s.focus) {
    let best = null, bd = 1e9;
    for (const o of G.units) { if (o.dead || !isEnemy(o, u) || Math.hypot(o.x - s.focus.x, o.z - s.focus.z) > 9) continue; const d = Math.hypot(o.x - u.x, o.z - u.z); if (d < bd) { bd = d; best = o; } }
    if (best) { u.foe = best; u.fd = bd; } else if (Math.hypot(s.focus.x - u.x, s.focus.z - u.z) > (s.focus.id ? 3 : 1.6)) { go(u, s.focus.x, s.focus.z, speedOf(u), dt, s.focus.id ? 2 : 1); return; } // (ORD1: a gate, nexus or chest (id 0): right up to it)
    else if (!s.focus.id) u.face = Math.atan2(s.focus.x - u.x, s.focus.z - u.z); // (facing it: the strike rules in step.js do the rest)
  }
  const myOrder = orderOf(u.ti);
  if (myOrder === 'shieldwall' && leaderUp) {
    u.aim = false;
    const foe = u.foe;
    if (foe && u.fd < u.r + foe.r + u.reach) { faceTo(u, foe.x, foe.z, dt); startSwing(u, foe); }
    const [gx, gz] = shieldwallPos(L, !!L.human, u.tslot || 0);
    const d = go(u, gx, gz, speedOf(u) * (Math.hypot(gx - u.x, gz - u.z) > 5 ? 1.5 : 1), dt, .15);
    if (d < 1 && !(foe && u.fd < 3)) u.face = turn(u.face, L.face, dt * 6);
    return;
  }
  const range = u.kind === 'arch' ? bowRange(u, u.foe) : 0; // archers on high ground shoot farther
  u.aim = false; u.holding = false;
  if (u.kind === 'foot' && u.tier >= 1 && myOrder !== 'charge') {
    const [rider, rd] = nearestFoe(u, 9, o => o.mounted);
    if (rider) { moveToward(u, u.x, u.z, 0, dt); faceTo(u, rider.x, rider.z, dt, 10); if (rd < u.r + rider.r + u.reach) startSwing(u, rider); u.holding = myOrder === 'hold'; return; }
  }
  if (myOrder === 'hold' && s.holdPt) { holdPlace(u, s.holdPt, dt, range); return; }
  if (myOrder === 'follow' && leaderUp && L.scutum) { shelter(u, L, dt, range); return; } // (C3c: in behind his raised scutum)
  const engage = myOrder === 'charge' || myOrder === 'focus' ? 45 : u.kind === 'arch' ? range : myOrder === 'hold' ? 8 : 10;
  // a duel between captains: leave it to them. Pick another man, or stand back and watch.
  if (u.foe && u.foe.duel && u.kind !== 'arch') {
    const [alt, ad] = nearestFoe(u, 10, o => !o.duel);
    if (alt) { u.foe = alt; u.fd = ad; }
    else { const D = u.foe.duel, dd = Math.hypot(u.x - D.x, u.z - D.z); if (dd < 5.5) { const k = 5.5 / Math.max(dd, .1); go(u, D.x + (u.x - D.x) * k, D.z + (u.z - D.z) * k, speedOf(u), dt, .3); } else moveToward(u, u.x, u.z, 0, dt); faceTo(u, D.x, D.z, dt, 4); return; }
  }
  const foe = u.foe, fd = u.fd;
  const leash = myOrder === 'follow' && leaderUp && foe && Math.hypot(foe.x - L.x, foe.z - L.z) > 18;
  if (myOrder === 'focus' && u.kind === 'arch' && foe && fd > range) { go(u, foe.x, foe.z, speedOf(u), dt, range * .8); return; } // (archers close to bow range of the group)
  if (foe && fd < engage && !leash) {
    if (u.kind === 'arch') {
      if (fd < u.r + foe.r + u.reach) { startSwing(u, foe); faceTo(u, foe.x, foe.z, dt); moveToward(u, u.x, u.z, 0, dt); }
      else if (fd < 5.5) { moveToward(u, u.x - (foe.x - u.x), u.z - (foe.z - u.z), u.spd, dt); faceTo(u, foe.x, foe.z, dt, 6); }
      else if (fd <= range) {
        u.aim = true; moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 8);
        if (u.shootCd <= 0 && u.stun <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { shoot(u, foe); u.shootCd = u.shootBase * rnd(.85, 1.2); }
      } else go(u, foe.x, foe.z, speedOf(u), dt, range * .8);
    } else if (u.javelin && u.javCd <= 0 && fd > u.r + foe.r + u.reach + .3 && fd < JAVELIN.range && !foe.mounted) {
      moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 8);
      if (Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) throwJavelin(u, foe);
    } else {
      go(u, foe.x, foe.z, speedOf(u), dt, u.r + foe.r + u.reach * .7); faceTo(u, foe.x, foe.z, dt);
      // a veteran facing an enemy captain on foot sometimes winds up a heavy blow instead
      if (foe.human && !foe.mounted && u.tier >= 2 && u.cd <= 0 && fd < u.r + foe.r + u.reach + .4 && Math.random() < HEAVY.vetChance && startHeavy(u, foe, HEAVY.windup[1] + .1)) return;
      if (fd < u.r + foe.r + u.reach) startSwing(u, foe);
    }
    return;
  }
  const [ci, cd] = nearestEnemyCastle(u);
  if (myOrder === 'charge') {
    if (G.mode === 'conquest' && ci >= 0) {
      const tp = TEAMS[ci].pos; go(u, tp[0], tp[1], u.spd, dt, CASTLE_REACH - 1);
      if (cd < CASTLE_REACH) { faceTo(u, tp[0], tp[1], dt, 6); startSwing(u, { castle: ci }); }
    } else if (G.mode === 'ctf') {
      const f = G.flag, tgt = f.state === 'carried' && isEnemy(f.carrier, u) ? f.carrier : f;
      go(u, tgt.x, tgt.z, u.spd, dt, 1);
    } else { const [f2] = nearestFoe(u, 300); if (f2) go(u, f2.x, f2.z, u.spd, dt, 1); else go(u, 0, 0, u.spd, dt, 4); }
    return;
  }
  if (G.mode === 'conquest' && ci >= 0 && cd < CASTLE_REACH && myOrder === 'follow' && leaderUp && !L.mounted && Math.hypot(L.x - TEAMS[ci].pos[0], L.z - TEAMS[ci].pos[1]) < CASTLE_REACH + 6) {
    faceTo(u, TEAMS[ci].pos[0], TEAMS[ci].pos[1], dt, 6); moveToward(u, u.x, u.z, 0, dt); startSwing(u, { castle: ci }); return;
  }
  let anchor = myOrder === 'hold' && s.holdPt ? s.holdPt : leaderUp ? L : null;
  if (anchor === L && G.c2 && G.T >= CROWN2.night && G.layout.chasm) { // (F7c: the Crown's fight is the captains'; his men wait over the bridge from his gate)
    const ar = G.layout.arena.r, Ch = G.layout.chasm, w = Ch.r + Ch.w + CROWN2.lake.wait;
    if (Math.hypot(L.x, L.z) < ar + 1) { const a = c2GateA(L.x, L.z); anchor = { x: Math.cos(a) * w, z: Math.sin(a) * w, face: Math.atan2(-Math.cos(a), -Math.sin(a)), human: L.human, isFront: L.isFront }; } }
  if (anchor) {
    const [gx, gz] = slotPos(anchor, anchor.isFront || !!anchor.human, u.slot || 0, u.kind === 'arch', u.meleeN || 0);
    const d = go(u, gx, gz, speedOf(u) * (Math.hypot(gx - u.x, gz - u.z) > 6 ? 1.15 : 1), dt);
    if (d < 1) u.face = turn(u.face, anchor.face, dt * 6);
  } else { const [gx, gz] = G.crown ? (u.runTo || (u.runTo = homeAt(u.ti, 2))) : gatePos(TEAMS[colorOf(u.ti)], gateOff(u.ti), 2); go(u, gx, gz, u.spd, dt, 3); }
}
export function aiPick(ti) { const k = aiPick0(ti), ok = champOf(ti).recruits; return ok.includes(k) ? k : ok[Math.floor(Math.random() * ok.length)]; } // (C1e: his champion's soldiers)
function aiPick0(ti) {
  const r = Math.random();
  if (G.diff === 2) {
    const foes = activeArmies().filter(i => G.teams[i].human && isEnemyTi(i, ti));
    const sq = foes.flatMap(i => squadOf(i)), c = k => sq.filter(u => u.kind === k).length;
    const f = c('foot'), a = c('arch');
    return a >= f ? (r < .7 ? 'foot' : 'arch') : (r < .35 ? 'arch' : 'foot');
  }
  return r < .65 ? 'foot' : 'arch';
}
