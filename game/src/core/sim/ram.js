// Battle rules: C3b Ram of Cassius, Titus's special attack 1 (design doc, Titus card and Mount, 17 Nov). A shield-first
// rush along the path shown first (the way he faces, or where aimed): a short wind-up, then the dash. Soldiers in the
// path take a little, are shoved aside and stumble (nobody flies). The first enemy champion ends it: knocked back,
// stunned, and twice as hard into a wall, gate or rock. Walls, gates and rocks stop it (no harm to them); a braced
// spear line stops it too, but it lands on the front spearmen and breaks their brace (from the saddle the spears hit
// the horse instead). From the saddle it is a longer horse charge and he stays mounted. Numbers on his page (sp1).
// The host runs it; a joined phone runs its own champion's rush (netgame) and stops where the host says.
import { G, isEnemy } from '../state.js';
import { groundY, angDiff } from '../world.js';
import { levelOf } from '../../champions/stats.js';
import { hit } from './melee.js';
import { integrate } from './move.js';
import { braced, horseDamage, push } from './army.js';
import { fx, sound } from './util.js';

const fmt = (...v) => v.map(n => n.toFixed(2)).join(',');
export function startRam(u, at, d) {
  const a = Math.hypot(at.x - u.x, at.z - u.z) > .2 ? Math.atan2(at.x - u.x, at.z - u.z) : u.face;
  u.face = a; u.ram = rush(u, a, d, false);
  if (!u.mounted) u.act = { name: 'ram', t: G.T };
  u.vx = u.vz = 0; u.swing = 0; u.pending = null;
  fx('fxmsg', { k: 'fxram', u, q: fmt(u.x, u.z, a, u.ram.dist) });
  sound('jump', u.x, u.z);
}
const rush = (u, a, d, own) => ({ t: 0, x: u.x, z: u.z, dx: Math.sin(a), dz: Math.cos(a), dist: u.mounted ? d.rideDist : d.dist, v: d.dist / d.dur, gone: 0, hit: new Set(), d, own });
// a joined phone's own champion: the same rush from where it stands (the host's hits, its own walls)
export function flyRam(u, q, d) {
  const [, , a] = String(q).split(',').map(Number); if (!Number.isFinite(a) || !d) return;
  u.face = a; u.ram = rush(u, a, d, true);
}
// the host says where it ended (a champion or a spear line in the way)
export function endRam(u, q) { const [x, z] = String(q).split(',').map(Number); if (!Number.isFinite(x)) return; u.ram = null; if (Math.hypot(u.x - x, u.z - z) < 3) { u.x = x; u.z = z; } }
// each step while he rushes: true when it moved him (the caller skips his usual movement)
export function ramStep(u, dt) {
  const R = u.ram, d = R.d; R.t += dt; u.vx = u.vz = 0;
  if (R.t > d.wind) {
    const step = Math.min(R.v * dt, R.dist - R.gone), pr = { x: R.x, z: R.z, r: u.r, ti: u.ti, vx: R.dx * step / dt, vz: R.dz * step / dt, jy: 0 };
    integrate(pr, dt, pr.z);
    const got = (pr.x - R.x) * R.dx + (pr.z - R.z) * R.dz; R.x = pr.x; R.z = pr.z; R.gone += Math.max(0, got);
    let stop = got < step * .5 || R.gone >= R.dist - .01; // (a wall, a gate, a rock; or the end of the path)
    if (!R.own && !stop) stop = contacts(u, R);
    if (stop) finish(u, R);
  }
  if (!u.remote) { u.x = R.x; u.z = R.z; u.y = groundY(u.x, u.z) + (u.jy || 0); }
  return !u.remote;
}
function finish(u, R) {
  u.ram = null; if (u.act && u.act.name === 'ram') u.act = null;
  if (!R.own) fx('fxmsg', { k: 'fxramend', u, q: fmt(R.x, R.z) });
}
// who he meets this step: true when the rush ends here
function contacts(u, R) {
  const d = R.d, k = 1 + d.lvlUp * Math.max(0, levelOf(u.ti) - 3);
  const ahead = (o, reach) => { const rx = o.x - R.x, rz = o.z - R.z, f = rx * R.dx + rz * R.dz, s = rx * R.dz - rz * R.dx; return f > -.3 && f < u.r + (o.r || 0) + reach && Math.abs(s) < d.w + (o.r || 0) ? s : null; };
  const faces = o => Math.abs(angDiff(o.face, Math.atan2(R.x - o.x, R.z - o.z))) < 1.1;
  for (const o of G.units) {
    if (o.dead || R.hit.has(o.id) || !isEnemy(u, o)) continue;
    const s = ahead(o, .4); if (s == null) continue;
    if (o.leader) { champ(u, o, R, k); return true; }
    if (o.kind === 'foot' && braced(o) && faces(o)) { // a braced spear line: it stops here, and lands on the front of it
      for (const f of G.units) if (!f.dead && isEnemy(u, f) && f.kind === 'foot' && braced(f) && faces(f) && ahead(f, 1.2) != null) {
        R.hit.add(f.id); hit(u, f, 1, { fixed: d.soldier * k, stun: d.stumble, kb: .05, unblockable: true, unparryable: true });
        if (u.mounted) horseDamage(u, f.dmg * d.horseX);
      }
      fx('fxmsg', { k: 'fxrambrace', u }); return true;
    }
    R.hit.add(o.id); // a soldier: a knock, shoved off the path to his side, a stumble
    hit(u, o, 1, { fixed: d.soldier * k, stun: d.stumble, kb: .05, unblockable: true, unparryable: true });
    const side = s >= 0 ? 1 : -1; push(o, R.dz * side * d.shove, -R.dx * side * d.shove, d.stumble);
  }
  return false;
}
// the first enemy champion: knocked back along the rush, harder into a wall
function champ(u, o, R, k) {
  const d = R.d, c = { x: o.x, z: o.z, r: o.r || .5, ti: o.ti, vx: R.dx * d.kb / .2, vz: R.dz * d.kb / .2, jy: 0 };
  for (let i = 0; i < 10; i++) integrate(c, .02, c.z);
  const wall = !o.mounted && Math.hypot(c.x - o.x, c.z - o.z) < d.kb * .8;
  hit(u, o, 1, { fixed: (wall ? d.wall : d.champ) * k, stun: wall ? d.wallStun : d.stun, kb: .05, unblockable: true, unparryable: true });
  if (!o.mounted && !o.dead) {
    if (o.remote) push(o, (c.x - o.x) / .25, (c.z - o.z) / .25, wall ? d.wallStun : d.stun);
    else { o.x = c.x; o.z = c.z; o.vx = o.vz = 0; }
  }
  R.hit.add(o.id);
  fx('fxmsg', { k: wall ? 'fxramwall' : 'fxramhit', u: o, a: u }); sound('heavy', o.x, o.z);
}
