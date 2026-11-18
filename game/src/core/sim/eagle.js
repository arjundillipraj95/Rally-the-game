// Battle rules: C3d Eagle's fall, Titus's ult (design doc, Titus card, 17 Nov). A leap onto a spot marked when he
// jumps (the gold circle every phone draws, so anyone in it can get out): a crouch, an arc, a shield-first slam.
// Nothing stops it once begun; in the air he takes less. On landing: a champion's quarter to enemy champions within
// the circle (more a level from 7), less to soldiers, who go down; his allies there take less for a while. The
// numbers are on his page (champions/titus.js, ult). The host runs the rules; a joined phone flies its own champion
// (netgame) and every phone draws it from the fxeagle moment (render/eaglefx.js).
import { G, isEnemy } from '../state.js';
import { groundY } from '../world.js';
import { levelOf } from '../../champions/stats.js';
import { hit } from './melee.js';
import { fx, sound } from './util.js';

// begin the leap toward `at` (no further than the page's range); d: the page's ult
export function startEagle(u, at, d) {
  const dx = at.x - u.x, dz = at.z - u.z, dd = Math.hypot(dx, dz), k = dd > d.range ? d.range / dd : 1;
  const x = u.x + dx * k, z = u.z + dz * k;
  u.eagle = { t: 0, x0: u.x, z0: u.z, x, z, d, landed: false };
  u.act = { name: 'eagle', t: G.T }; u.vx = u.vz = 0; u.swing = 0; u.pending = null; u.jvy = 0;
  if (dd > .1) u.face = Math.atan2(dx, dz);
  fx('fxmsg', { k: 'fxeagle', u, q: `${x.toFixed(2)},${z.toFixed(2)}` });
  sound('jump', u.x, u.z);
}
// a joined phone's own champion flies the same arc (its phone moves it; the host lands it)
export function flyEagle(u, q, d) {
  const [x, z] = String(q).split(',').map(Number); if (!Number.isFinite(x) || !d) return;
  u.eagle = { t: 0, x0: u.x, z0: u.z, x, z, d, landed: true, own: true };
  if (Math.hypot(x - u.x, z - u.z) > .1) u.face = Math.atan2(x - u.x, z - u.z);
}
// each step while he is in it: true when it moved him (the caller skips his usual movement)
export function eagleStep(u, dt) {
  const E = u.eagle, d = E.d; E.t += dt;
  u.stun = 0; u.vx = u.vz = 0; u.pending = null; // (nothing stops it)
  const s = Math.min(1, Math.max(0, (E.t - d.crouch) / d.air));
  if (!u.remote) { u.x = E.x0 + (E.x - E.x0) * s; u.z = E.z0 + (E.z - E.z0) * s; u.jy = 4 * d.h * s * (1 - s); u.y = groundY(u.x, u.z) + u.jy; }
  if (!E.landed && E.t >= d.crouch + d.air) { E.landed = true; land(u, E); }
  if (E.t >= d.crouch + d.air + d.after) { u.eagle = null; u.jy = 0; if (u.act && u.act.name === 'eagle') u.act = null; }
  return !u.remote;
}
function land(u, E) {
  const d = E.d, champ = d.champ * (1 + d.lvlUp * Math.max(0, levelOf(u.ti) - 7));
  for (const o of G.units) {
    if (o.dead || o === u || Math.hypot(o.x - E.x, o.z - E.z) > d.r + (o.r || 0)) continue;
    if (isEnemy(u, o)) hit(u, o, 1, { fixed: o.leader ? champ : d.soldier, unblockable: true, unparryable: true, stun: o.leader ? .22 : d.down, kb: 1.3 });
    else guard(o, d); // (his side's men and champions)
  }
  guard(u, d);
  fx('fxmsg', { k: 'fxeagleland', u, q: `${E.x.toFixed(2)},${E.z.toFixed(2)}` });
  sound('heavy', E.x, E.z);
}
const guard = (o, d) => { (o.fxT || (o.fxT = {})).eagleGuard = G.T + d.guardT; o.eagleGuardK = d.guard; };
// what a blow or arrow does to b, by his Eagle's fall: less in the air, less shield-up after a landing nearby
export function takenX(b) {
  let k = 1; const E = b.eagle;
  if (E && !E.own && E.t > E.d.crouch && E.t < E.d.crouch + E.d.air) k *= E.d.airTaken;
  if (b.fxT && b.fxT.eagleGuard > G.T) k *= 1 - (b.eagleGuardK || 0);
  return k;
}
