// Battle rules: the Crown's neutral garrisons and camps.
import { CROWN2, CROWN26, LAUNCH, NEUTRAL, STATS, RALLY } from '../../config.js';
import { giveBuff } from './buffs.js';
import { G, NEUTRAL_TI } from '../state.js';
import { rnd, angDiff, turn } from '../world.js';
import { fx, sound } from './util.js';
import { hl, mkUnit } from './match.js';
import { gainRally, speedOf } from './army.js';
import { eachNear, gridOk, nearestFoe, startSwing } from './melee.js';
import { shoot } from './missiles.js';
import { faceTo, go, integrate, moveToward } from './step.js'; // (later files: through the entry, so files still load in the old order)

// ---------- (F4) the mountain's neutral soldiers: a castle's guards and a jungle camp's bandits ----------
// Each post is 3 footmen and 2 archers, real soldiers (ti NEUTRAL_TI, grey) standing at their spots facing out. A man of
// an army coming within `ambush` m, or a blow or arrow on one of them, wakes the whole post: footmen go for the nearest
// foe inside the leash, archers shoot from their spots. Nobody inside the leash for `calm` s and they walk back and
// heal to full at their spots. A joined phone makes the same men (same ids) and is told who lives and where the
// awake ones are (net/netgame.js).
const NEU_ID = 900000;
const postQ = b => b.kind === 'guard' ? CROWN2.guards : CROWN2.camp;
export function c2Post(o, Q) {
  const boss = Q.boss || 0, men = Q.foot + Q.arch + boss, hp = Q.foot * STATS.foot.hp + Q.arch * STATS.arch.hp + boss * CROWN26.boss.hp; // (CAMP1: a buff camp's mini captain)
  return Object.assign(o, { brk: true, post: true, foot: Q.foot, arch: Q.arch, boss, men, units: [], n: men,
    awake: false, calmT: 0, scanT: 0, back: 0, hp, max: hp });
}
// a man's spot at his post: footmen on the inner ring, archers on the outer, facing out
export function c2Spot(b, k) {
  if (b.boss && k === b.foot + b.arch) return [b.x, b.z, 0]; // (the mini captain stands in the middle)
  const N = NEUTRAL, archer = k >= b.foot, a = archer ? (k - b.foot) / Math.max(1, b.arch) * Math.PI * 2 + 1.2 : k / b.foot * Math.PI * 2 + .4, rr = archer ? N.ringA : N.ringF;
  return [b.x + Math.cos(a) * rr, b.z + Math.sin(a) * rr, Math.atan2(Math.cos(a), Math.sin(a))];
}
export const c2ManId = (b, k) => NEU_ID + b.pi * 8 + k;
export function c2Man(b, k, mk = null) {
  const [x, z, f] = c2Spot(b, k), boss = b.boss && k === b.foot + b.arch, kind = k < b.foot || boss ? 'foot' : 'arch', id = c2ManId(b, k);
  const u = mk ? mk(id, kind, NEUTRAL_TI, x, z) : mkUnit(NEUTRAL_TI, x, z, kind);
  integrate(u, 0, u.z); // (a spot inside a wall or a camp's gear: the nearest clear ground is his spot; the same on every phone)
  if (boss) { u.boss = true; u.hp = u.max = CROWN26.boss.hp; u.dmg = CROWN26.boss.dmg; }
  u.id = id; u.neutral = true; u.post = b; u.pk = k; u.px = u.x; u.pz = u.z; u.pface = f; u.face = f; u.tface = f; u.cd = rnd(0, .6); u.rest = true;
  b.units[k] = u; return u;
}
// an army's man (not at home) within r m of the post
function c2Passer(b, r) {
  let hit = false; const see = o => { if (hit || o.dead || o.neutral || o.inSafe || o.hidden) return; if ((o.x - b.x) ** 2 + (o.z - b.z) ** 2 < r * r) hit = true; };
  if (gridOk()) eachNear(b.x, b.z, r, see); else for (const o of G.units) see(o);
  return hit;
}
function c2Wake(b) { b.awake = true; b.calmT = 0; for (const u of b.units) if (u && !u.dead) { u.rt = 0; u.rest = false; } }
export function c2PostTick(b, dt) {
  const Q = postQ(b), T = G.T; let n = 0, hp = 0, hit = false;
  for (const u of b.units) if (u && !u.dead) { n++; hp += u.hp; if (T - u.lastHit < .5) hit = true; }
  b.n = n; b.hp = hp;
  if (!n) { b.awake = false; if (b.kind === 'camp' && b.back && T >= b.back) c2Restock(b); return; }
  if (!b.awake) {
    if (hit) { c2Wake(b); return; } if ((b.scanT -= dt) > 0) return; b.scanT = NEUTRAL.scan;
    for (const u of b.units) if (u && !u.dead && u.rest && (u.x - u.px) ** 2 + (u.z - u.pz) ** 2 > NEUTRAL.home ** 2) u.rest = false; // (shoved off his spot: he walks back)
    if (c2Passer(b, Q.ambush)) c2Wake(b); return;
  }
  if (hit || c2Passer(b, Math.max(Q.leash, Q.archR))) b.calmT = 0;
  else if ((b.calmT += dt) >= Q.calm) { b.awake = false; b.scanT = NEUTRAL.scan; for (const u of b.units) if (u) { u.foe = null; u.fd = 1e9; u.aim = false; } }
}
// a cleared camp's men come back
function c2Restock(b) {
  G.units = G.units.filter(u => !(u.neutral && u.post === b));
  for (let k = 0; k < b.men; k++) c2Man(b, k);
  b.back = 0; b.n = b.men; b.scanT = 0; b.awake = false;
}
// the last man of a post cut down: a camp pays its gold to the army that did it, and fills again in time
function c2PostCleared(b, killer) {
  if (b.kind === 'camp') { b.back = G.T + CROWN2.camp.back; if (killer && G.teams[killer.ti]) G.teams[killer.ti].gold += CROWN2.camp.gold; }
  if (killer) hl(killer.ti, 'hold');
}
// a neutral soldier's death: the fall, the gold (if any) for the man, and his post's tally; no morale, no results line
export function dieNeutral(u, killer, ang, launch) {
  if (u.dead) return;
  u.dead = true; u.deadT = 0; u.foe = null;
  if (launch) { const f = rnd(LAUNCH.push[0], LAUNCH.push[1]); u.vx += Math.sin(ang) * f; u.vz += Math.cos(ang) * f; u.vy = rnd(LAUNCH.up[0], LAUNCH.up[1]); u.launch = true; sound('scream', u.x, u.z); }
  else { u.vx += Math.sin(ang) * 6; u.vz += Math.cos(ang) * 6; u.vy = rnd(3, 6); }
  u.fallDir = Math.random() < .5 ? 1 : -1;
  fx('splat', { x: u.x, z: u.z, s: rnd(1, 1.5), ti: u.ti }); sound('die', u.x, u.z);
  const b = u.post, Q = postQ(b);
  if (killer && G.teams[killer.ti]) { G.teams[killer.ti].gold += Q.manGold; gainRally(killer, RALLY.kill); }
  if (u.boss && killer && G.teams[killer.ti] && b.buff) { giveBuff(killer.ti, b.buff); hl(killer.ti, 'hold'); } // (CAMP1: the camp's buff to his killer's side)
  b.n = b.units.filter(m => m && !m.dead).length;
  if (!b.n) c2PostCleared(b, killer);
}
// a neutral soldier's mind: at his spot while the post sleeps (whole again once there); awake, footmen fight inside the
// leash and archers shoot from their spots
export function thinkNeutral(u, dt) {
  const b = u.post, Q = postQ(b); u.aim = false;
  const back = () => { const d = go(u, u.px, u.pz, speedOf(u), dt, .15); if (d < NEUTRAL.home) { u.face = turn(u.face, u.pface, dt * 6); if (!b.awake) { u.hp = u.max; if (Math.abs(angDiff(u.face, u.pface)) < .05) { u.rest = true; u.vx = u.vz = 0; } } } };
  if (!b.awake) { back(); return; }
  const foe = u.foe && !u.foe.dead ? u.foe : null, fd = foe ? Math.hypot(foe.x - u.x, foe.z - u.z) : 1e9;
  if (u.kind === 'arch') {
    if (foe && fd < u.r + foe.r + u.reach) { faceTo(u, foe.x, foe.z, dt); moveToward(u, u.x, u.z, 0, dt); startSwing(u, foe); return; }
    if (foe && fd <= Q.archR) {
      if (Math.hypot(u.px - u.x, u.pz - u.z) > 1.5) go(u, u.px, u.pz, speedOf(u), dt, .3); else moveToward(u, u.x, u.z, 0, dt);
      u.aim = true; faceTo(u, foe.x, foe.z, dt, 8);
      if (u.shootCd <= 0 && u.stun <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { shoot(u, foe); u.shootCd = u.shootBase * rnd(.85, 1.2); }
      return;
    }
    back(); return;
  }
  if (!foe) { back(); return; }
  go(u, foe.x, foe.z, speedOf(u), dt, u.r + foe.r + u.reach * .7); faceTo(u, foe.x, foe.z, dt);
  if (fd < u.r + foe.r + u.reach) startSwing(u, foe);
  const dx = u.x - b.x, dz = u.z - b.z, dd = Math.hypot(dx, dz), lim = Q.leash + 1.5; // (never past the leash)
  if (dd > lim) { u.x = b.x + dx / dd * lim; u.z = b.z + dz / dd * lim; u.vx = u.vz = 0; }
}
// a neutral man picks his foe: an army's man inside his post's leash (archers: their range), none while it sleeps
export function neutralFoe(u) {
  const b = u.post, Q = postQ(b); if (!b.awake) return [null, 1e9];
  const r = u.kind === 'arch' ? Math.max(Q.leash, Q.archR) : Q.leash;
  return nearestFoe(u, r + 8, o => !o.inSafe && (o.x - b.x) ** 2 + (o.z - b.z) ** 2 < r * r);
}
