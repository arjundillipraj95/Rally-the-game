// ARCH2 (Arjun 19 Nov): archers and buildings, for every army. Ordered at a building (Attack on a gate, a wall, a
// nexus, the chest), they walk to bow range and shoot it. On their own, they shoot men; with no man in bow range, the
// nearest enemy building in it. An arrow on a building does ARCH_BLD.k of the arrow, ARCH_BLD.fire once the archers
// shoot fire arrows (FIX6). The arrow lands on its building (missiles.js, a.bld), as a champion's does.
import { ARCH_BLD } from '../../config.js';
import { G } from '../state.js';
import { groundY, angDiff } from '../world.js';
import { sound } from './util.js';
import { makeArrow } from './missiles.js';
import { bowRange, speedOf } from './army.js';
import { structureInRange, wallInRange } from './ranged.js';
import { faceTo, go, moveToward } from './move.js';

// a shot's share of the archer's blow (u.dmg, his dagger): his arrow times k (FIX6)
const per = u => (u && u.arrow && u.dmg ? u.arrow / u.dmg : 1);
export const bldK = u => per(u) * (u && u.fireArrows ? ARCH_BLD.fire : ARCH_BLD.k);
export const chestK = u => (u && u.fireArrows ? ARCH_BLD.fireChest : ARCH_BLD.chest);
// the building at (x, z), as seen by u's side
const bldAt = (u, x, z) => { const q = { x, z, ti: u.ti, r: 0, reach: 0, kind: u.kind }, w = wallInRange(q, 4, -99); return w ? { bld: w, x: w.x, z: w.z, r: w.r || 1 } : structureInRange(q, 4); };
// one arrow onto a building, lobbed like an archer's
function shootBld(u, tg) {
  const d = Math.hypot(tg.x - u.x, tg.z - u.z), y0 = (u.y || 0) + 1.6;
  const a = makeArrow({ id: ++G.arrowN, x0: u.x, y0, z0: u.z, x1: tg.x, z1: tg.z, y1: groundY(tg.x, tg.z) + 1.4, dur: .25 + d / 28,
    peak: Math.min(6, d * .16), ti: u.ti, t: 0, shooter: u });
  a.bld = tg.bld; a.bk = bldK(u); a.bkC = chestK(u); if (u.fireArrows) a.fire = true;
  G.arrows.push(a); u.atkT = G.T; u.swing = .38; sound('bow', u.x, u.z);
}
// aim at it and loose when the bow is ready
function loose(u, tg, dt) {
  u.aim = true; faceTo(u, tg.x, tg.z, dt, 8);
  if (u.shootCd <= 0 && u.stun <= 0 && Math.abs(angDiff(u.face, Math.atan2(tg.x - u.x, tg.z - u.z))) < .3) { shootBld(u, tg); u.shootCd = u.shootBase * (.85 + Math.random() * .35); }
}
// ordered at a building: true while this archer is busy with it (soldier.js stops there)
export function archerFocus(u, s, dt) {
  const f = s.focus; if (!f || f.id) return false;
  if (!u.fbT || G.T > u.fbT) { u.fbT = G.T + ARCH_BLD.scan; u.fb = bldAt(u, f.x, f.z); }
  const tg = u.fb; if (!tg) return false;
  const range = bowRange(u, tg), d = Math.hypot(tg.x - u.x, tg.z - u.z) - (tg.r || 1);
  if (d > range) { go(u, tg.x, tg.z, speedOf(u), dt, range * .8); return true; }
  moveToward(u, u.x, u.z, 0, dt); loose(u, tg, dt); return true;
}
// on his own, no man in bow range: the nearest enemy building in it (he keeps his place in the line)
export function archerIdle(u, dt) {
  if (!u.ibT || G.T > u.ibT) { u.ibT = G.T + ARCH_BLD.scan; u.ib = structureInRange(u, bowRange(u, null)); }
  const tg = u.ib; if (!tg) return false;
  loose(u, tg, dt); return true;
}
