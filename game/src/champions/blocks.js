// (C1c) the shared ability blocks every champion's kit is built from (design: dash, cone, circle, projectile,
// buff, summon). A page's run(u, at, B) calls these; numbers stay on the page. Host and solo only.
import { G, isEnemy } from '../core/state.js';
import { hit } from '../core/sim/melee.js';
import { push } from '../core/sim/army.js';
import { throwJavelin } from '../core/sim/missiles.js';
import { startEagle } from '../core/sim/eagle.js';
import { startRam } from '../core/sim/ram.js';
import { raiseScutum } from '../core/sim/scutum.js';
import { startTestudo } from '../core/sim/testudo.js';
import { startPounce, startSpin, startHunt, huntTarget as huntTarget0 } from '../core/sim/sigrun.js'; // (C5)
import { startPierce, startEvade, startVolley, startStorm, awayAim } from '../core/sim/deviShots.js'; // (C4)

const foes = (u, keep) => G.units.filter(o => !o.dead && !o.rest && isEnemy(o, u) && !(o.fog && o.bush >= 0) && keep(o));
// where a tap aims: the nearest enemy champion in range, else the nearest enemy, else straight ahead
// (BS5) your own taps: champions in range first (the default), or simply the nearest foe (Settings)
export const target = { mode: (() => { try { return localStorage.getItem('rally.target') === 'near' ? 'near' : 'champ'; } catch (e) { return 'champ'; } })() };
export function setTarget(v) { target.mode = v === 'near' ? 'near' : 'champ'; try { localStorage.setItem('rally.target', target.mode); } catch (e) {} }
export function autoAim(u, range) {
  let best = null, bd = 1e9; const champ = !((u.isMe || u === G.player) && target.mode === 'near');
  for (const o of foes(u, o => Math.hypot(o.x - u.x, o.z - u.z) < range)) { const d = Math.hypot(o.x - u.x, o.z - u.z) - (o.leader && champ ? 1e3 : 0); if (d < bd) { bd = d; best = o; } }
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
// a shield-first rush along a path: Ram of Cassius (core/sim/ram.js)
export const ram = (u, at, d) => startRam(u, at, d);
// where a press aims: straight ahead for a page that says so (aimFace), else autoAim
// (C5) a move with a reach of its own from the saddle (rideRange); one that a tap aims at simply the nearest enemy (tapNear)
export const rangeOf = (u, d) => (u && u.mounted && d.rideRange ? d.rideRange : d.range);
export const aimOf = (u, d) => d.aimAway ? awayAim(u, d.dist || 5) : d.aimFace ? { x: u.x + Math.sin(u.face) * (d.range || 5), z: u.z + Math.cos(u.face) * (d.range || 5) } : d.tapNear ? Object.assign(autoAimNear(u, rangeOf(u, d)), { tap: true }) : autoAim(u, rangeOf(u, d) || 8);
function autoAimNear(u, r) { let b = null, bd = 1e9; for (const o of foes(u, o => Math.hypot(o.x - u.x, o.z - u.z) < r + (o.r || 0))) { const dd = Math.hypot(o.x - u.x, o.z - u.z); if (dd < bd) { bd = dd; b = o; } } return b ? { x: b.x, z: b.z, u: b } : { x: u.x + Math.sin(u.face) * r, z: u.z + Math.cos(u.face) * r }; }
// a shield raised for a while: Shield of Cassius (core/sim/scutum.js)
export const raise = (u, d) => raiseScutum(u, d);
// an army's shields locked into a marching block: Testudo march (core/sim/testudo.js)
export const testudo = (u, at, d) => startTestudo(u, at, d);
// (C4) Devi's: an arrow through a line, a dash, a planted stream of arrows, her archers' storm (core/sim/deviShots.js)
export const pierce = (u, at, d) => startPierce(u, at, d);
export const evade = (u, at, d) => startEvade(u, at, d);
export const tigerVolley = (u, at, d) => startVolley(u, at, d);
export const storm = (u, at, d) => startStorm(u, at, d);
export const away = (u, dist) => awayAim(u, dist);
// (C5) Sigrun's: a pounce onto one enemy (core/sim/sigrun.js)
export const pounce = (u, at, d) => startPounce(u, at, d);
export const spin = (u, at, d) => startSpin(u, at, d);
export const hunt = (u, at, d) => startHunt(u, at, d);
export const huntTarget = (u, d, at) => huntTarget0(u, d, at);
