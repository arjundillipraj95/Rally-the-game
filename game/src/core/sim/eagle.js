// Battle rules: C3d Eagle's fall, Titus's ult (design doc, Titus card, 17 Nov). A leap onto a spot marked when he
// jumps (the gold circle every phone draws, so anyone in it can get out; FEEL2c: aimed at a champion, it follows him
// through the crouch, then is set as Titus leaves the ground; from the saddle he springs off first): a crouch, an arc, a shield-first slam.
// Nothing stops it once begun; in the air he takes less. On landing: a champion's quarter to enemy champions within
// the circle (more a level from 7), less to soldiers, who go down; his allies there take less for a while. The
// numbers are on his page (champions/titus.js, ult). The host runs the rules; a joined phone flies its own champion
// (netgame) and every phone draws it from the fxeagle moment (render/eaglefx.js).
import { G, isEnemy } from '../state.js';
import { groundY } from '../world.js';
import { levelOf } from '../../champions/stats.js';
import { hit } from './melee.js';
import { fx, sound } from './util.js';
import { dismount } from './army.js'; // (FEEL2c)

// begin the leap toward `at` (no further than the page's range); d: the page's ult
export function startEagle(u, at, d) {
  if (u.mounted) dismount(u, false); // (FEEL2c: from the saddle he springs off; the horse goes as when he gets down)
  const [x, z] = spot(u.x, u.z, at.x, at.z, d);
  const tg = at.u && at.u.leader && !at.u.dead && isEnemy(u, at.u) ? at.u : lockAt(u, at.x, at.z, d.lockR); // (FEEL2c: locked on a champion: tapped, or aimed at (a joined phone sends only the spot))
  u.eagle = { t: 0, x0: u.x, z0: u.z, x, z, d, landed: false, tg };
  u.act = { name: 'eagle', t: G.T }; u.vx = u.vz = 0; u.swing = 0; u.pending = null; u.jvy = 0;
  if (Math.hypot(x - u.x, z - u.z) > .1) u.face = Math.atan2(x - u.x, z - u.z);
  if (!tg) fx('fxmsg', { k: 'fxeagle', u, q: `${x.toFixed(2)},${z.toFixed(2)}` }); // (locked on: the circle is set when he leaves the ground)
  sound('jump', u.x, u.z);
}
const lockAt = (u, x, z, r) => { let b = null, bd = r || 0; for (const o of G.units) { if (o.dead || !o.leader || !isEnemy(u, o)) continue; const dd = Math.hypot(o.x - x, o.z - z); if (dd < bd) { bd = dd; b = o; } } return b; };
const spot = (x0, z0, x, z, d) => { const dx = x - x0, dz = z - z0, dd = Math.hypot(dx, dz), k = dd > d.range ? d.range / dd : 1; return [x0 + dx * k, z0 + dz * k]; };
// a joined phone's own champion flies the same arc (its phone moves it; the host lands it)
export function flyEagle(u, q, d) {
  const [x, z, late] = String(q).split(',').map(Number); if (!Number.isFinite(x) || !d) return;
  u.eagle = { t: late ? d.crouch : 0, x0: u.x, z0: u.z, x, z, d, landed: true, own: true }; // (FEEL2c: a lock-on's circle comes as he leaves the ground)
  if (Math.hypot(x - u.x, z - u.z) > .1) u.face = Math.atan2(x - u.x, z - u.z);
}
// each step while he is in it: true when it moved him (the caller skips his usual movement)
export function eagleStep(u, dt) {
  const E = u.eagle, d = E.d; E.t += dt;
  if (E.tg && !E.own) { // FEEL2c: through the crouch the landing follows the champion he locked on; then it is set
    if (!E.tg.dead) { [E.x, E.z] = spot(E.x0, E.z0, E.tg.x, E.tg.z, d); u.face = Math.atan2(E.x - E.x0, E.z - E.z0); }
    if (E.t >= d.crouch || E.tg.dead) { E.tg = null; fx('fxmsg', { k: 'fxeagle', u, q: `${E.x.toFixed(2)},${E.z.toFixed(2)},1` }); }
  }
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
    if (isEnemy(u, o)) hit(u, o, 1, { fixed: o.leader ? champ : d.soldier, ult: true, unblockable: true, unparryable: true, stun: o.leader ? .22 : d.down, kb: 1.3 });
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
