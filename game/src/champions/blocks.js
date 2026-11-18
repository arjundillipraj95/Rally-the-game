// (C1c) the shared ability blocks every champion's kit is built from (design: dash, cone, circle, projectile,
// buff, summon). A page's run(u, at, B) calls these; numbers stay on the page. Host and solo only.
import { G, isEnemy } from '../core/state.js';
import { hit } from '../core/sim/melee.js';
import { push } from '../core/sim/army.js';
import { throwJavelin } from '../core/sim/missiles.js';
import { startEagle } from '../core/sim/eagle.js';

const foes = (u, keep) => G.units.filter(o => !o.dead && !o.rest && isEnemy(o, u) && !(o.fog && o.bush >= 0) && keep(o));
// where a tap aims: the nearest enemy champion in range, else the nearest enemy, else straight ahead
export function autoAim(u, range) {
  let best = null, bd = 1e9;
  for (const o of foes(u, o => Math.hypot(o.x - u.x, o.z - u.z) < range)) { const d = Math.hypot(o.x - u.x, o.z - u.z) - (o.leader ? 1e3 : 0); if (d < bd) { bd = d; best = o; } }
  return best ? { x: best.x, z: best.z, u: best } : { x: u.x + Math.sin(u.face) * range, z: u.z + Math.cos(u.face) * range };
}
// enemies in a circle round (x, z)
export const circle = (u, x, z, r) => foes(u, o => Math.hypot(o.x - x, o.z - z) < r + (o.r || 0));
// enemies in a cone in front of u: r m, half-angle `half` rad
export const cone = (u, r, half) => foes(u, o => { const d = Math.hypot(o.x - u.x, o.z - u.z), a = Math.atan2(o.x - u.x, o.z - u.z) - u.face;
  return d < r + (o.r || 0) && Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < half; });
// enemies along a line from u toward his facing: len m, half-width w
export const line = (u, len, w) => foes(u, o => { const dx = o.x - u.x, dz = o.z - u.z, f = dx * Math.sin(u.face) + dz * Math.cos(u.face), s = dx * Math.cos(u.face) - dz * Math.sin(u.face);
  return f > -.5 && f < len && Math.abs(s) < w + (o.r || 0); });
// a dash toward his facing: dist m in dur s (his feet don't brake meanwhile)
export function dash(u, dist, dur) { u.vx = Math.sin(u.face) * dist / dur; u.vz = Math.cos(u.face) * dist / dur; u.dashT = dur; }
// a blow from u on o through the usual rules (blocks, backstabs, counters): mult of his blow, extra (kb, stun...)
export const strike = (u, o, mult = 1, extra) => hit(u, o, mult, extra);
// a shove: k m/s away from (x, z), stunned s
export function shove(o, x, z, k, s) { const a = Math.atan2(o.x - x, o.z - z); push(o, Math.sin(a) * k, Math.cos(a) * k, s); }
// a thrown or shot missile at a target (the javelin path: flat damage)
export const projectile = (u, tg, dmg) => throwJavelin(u, tg, dmg);
// a timed effect on a unit: buff(u, 'shieldUp', 4) ... buffOn(u, 'shieldUp')
export const buff = (u, key, t) => { (u.fxT || (u.fxT = {}))[key] = G.T + t; };
export const buffOn = (u, key) => !!(u && u.fxT && u.fxT[key] > G.T);
// his own soldiers within r of him
export const ownMen = (u, r) => G.units.filter(o => !o.dead && o.ti === u.ti && !o.leader && Math.hypot(o.x - u.x, o.z - u.z) < r);
// a leap onto a spot: Eagle's fall (core/sim/eagle.js), the page's ult its numbers
export const leap = (u, at, d) => startEagle(u, at, d);
