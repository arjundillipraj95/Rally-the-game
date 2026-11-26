// Battle rules: C3e Testudo march, Titus's army ult (design doc, Titus card, 17 Nov). From the full horn: his soldiers
// near him lock shields into a block (a moment to form up, everyone heals a share), then march straight ahead to a
// war drum and end with a shout that shoves the enemies in front. Titus is not part of it. While it lasts: nothing
// knocks them about; from the front blows are turned (an ult lands at a share and doesn't break it); arrows do
// nothing (the roof); flanks and back are open; a horse charge into the front stalls. Walls halt the march. Numbers
// on his page (armyUlt). The host runs it; every phone sees it from the fxtestudo moments (render/testudofx.js).
import { body } from '../body.js';
import { G, isEnemy } from '../state.js';
import { angDiff, groundY } from '../world.js';
import { integrate } from './move.js';
import { push } from './army.js';
import { fx, sound } from './util.js';
import { hit } from './melee.js'; // (FEEL2d)

const live = []; // the blocks marching: { ti, t, d, men, fx, fz (front centre), dx, dz, gone, dist, face, cols }
export function startTestudo(u, at, d) {
  const men = G.units.filter(o => !o.dead && o.ti === u.ti && !o.leader && !o.testudo && Math.hypot(o.x - u.x, o.z - u.z) < d.r)
    .sort((a, b) => (a.kind === 'arch') - (b.kind === 'arch')); // (shields on the outside rows first)
  if (!men.length) return false;
  const a = Math.hypot(at.x - u.x, at.z - u.z) > .5 ? Math.atan2(at.x - u.x, at.z - u.z) : u.face, dx = Math.sin(a), dz = Math.cos(a);
  const gap = d.gap * body.soldier, cols = Math.min(men.length, Math.max(3, Math.ceil(Math.sqrt(men.length * 1.5)))), rows = Math.ceil(men.length / cols);
  const cx = men.reduce((s, o) => s + o.x, 0) / men.length, cz = men.reduce((s, o) => s + o.z, 0) / men.length;
  const B = { ti: u.ti, t: 0, d, men, fx: cx + dx * rows * gap / 2, fz: cz + dz * rows * gap / 2, gap, dx, dz, face: a, cols, gone: 0, dist: d.dist, healed: false, lead: u };
  men.forEach((o, i) => { o.testudo = B; o.tSlot = { lat: (i % cols - (cols - 1) / 2) * gap, back: Math.floor(i / cols) * gap }; o.foe = null; o.swing = 0; }); // (SIZE1: gap, wider apart for bigger men)
  live.push(B);
  fx('fxmsg', { k: 'fxtestudo', u, q: [a.toFixed(2), d.form + d.march, ...men.map(o => o.id)].join(',') });
  sound('clang', cx, cz);
  return true;
}
const slotAt = (B, o) => [B.fx - B.dx * o.tSlot.back + B.dz * o.tSlot.lat, B.fz - B.dz * o.tSlot.back - B.dx * o.tSlot.lat];
// every step: the blocks form up, march and end
export function testudoTick(dt) {
  for (let i = live.length - 1; i >= 0; i--) {
    const B = live[i], d = B.d; B.t += dt;
    B.men = B.men.filter(o => !o.dead && o.testudo === B);
    if (!B.men.length) { end(B, i, false); continue; }
    if (B.t >= d.form && !B.healed) { B.healed = true; for (const o of B.men) o.hp = Math.min(o.max, o.hp + o.max * d.heal); sound('clang', B.fx, B.fz); }
    if (B.t >= d.form && B.gone < B.dist) { // the march: the front moves on unless a wall stops it
      const step = Math.min(B.dist / d.march * dt, B.dist - B.gone), pr = { x: B.fx, z: B.fz, r: .5, ti: B.ti, vx: B.dx * step / dt, vz: B.dz * step / dt, jy: 0 };
      integrate(pr, dt, pr.z); const got = (pr.x - B.fx) * B.dx + (pr.z - B.fz) * B.dz;
      if (got < step * .5) B.gone = B.dist; else { B.fx = pr.x; B.fz = pr.z; B.gone += got; }
    }
    const k = B.t < d.form ? Math.min(1, dt * 8) : 1;
    for (const o of B.men) { const [x, z] = slotAt(B, o); o.x += (x - o.x) * k; o.z += (z - o.z) * k; o.y = groundY(o.x, o.z); o.vx = o.vz = 0; o.face = B.face; o.stun = 0; o.swing = 0; }
    for (const [k, at] of (d.beats || []).entries()) if (!(B.beat > k) && B.t >= d.form + d.march * at.t) { B.beat = k + 1; beat(B, at); } // (FEEL2d)
    if (B.t >= d.form + d.march) end(B, i, true);
  }
}
// FEEL2d (Arjun 26 Nov): the march hits as it goes: shove, then a spear stab through the gaps (`stab`: champion,
// soldier), then the end shout, a heavy shove that knocks them down (`down` s). Enemies just in front of the block.
function front(B, each) {
  const half = (B.cols - 1) / 2 * B.gap + .8, lead = B.men[0] || B.lead;
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, lead)) continue;
    const rx = o.x - B.fx, rz = o.z - B.fz, f = rx * B.dx + rz * B.dz, s = rx * B.dz - rz * B.dx;
    if (f > -.3 && f < B.d.shoutR && Math.abs(s) < half) each(o);
  }
}
const shove = (B, o, m, stun) => { if (o.remote || o.mounted) push(o, B.dx * m / .32, B.dz * m / .32, stun); else { o.x += B.dx * m; o.z += B.dz * m; o.stun = Math.max(o.stun || 0, stun); } };
function beat(B, at) {
  const by = B.men.find(o => !o.dead) || B.lead; if (!by) return;
  front(B, o => {
    if (at.k === 'stab') hit(by, o, 1, { fixed: o.leader ? B.d.stab[0] : B.d.stab[1], kb: .05, unblockable: true, unparryable: true });
    else shove(B, o, B.d.shove, .3);
  });
  sound(at.k === 'stab' ? 'swing' : 'clang', B.fx, B.fz);
  if (B.lead) fx('fxmsg', { k: 'fxtestudobeat', u: B.lead, q: at.k });
}
function end(B, i, shout) {
  live.splice(i, 1);
  for (const o of B.men) { if (o.testudo === B) o.testudo = null; }
  if (shout) { // the shout: the enemies just in front are shoved back
    front(B, o => shove(B, o, B.d.shove * B.d.endX, o.leader ? B.d.down[0] : B.d.down[1])); // (FEEL2d: the heavy one: down; every phone draws the fall, render/testudofx.js)
    sound('heavy', B.fx, B.fz);
  }
  if (B.lead) fx('fxmsg', { k: 'fxtestudoend', u: B.lead, q: shout ? '1' : '0' });
}
// what the block does to a blow on one of its men from (ax, az): 1 lands, 0 turned, or the share an ult keeps
export function testudoX(b, ax, az, ult) {
  const B = b.testudo; if (!B) return 1;
  if (Math.abs(angDiff(B.face, Math.atan2(ax - b.x, az - b.z))) > B.d.arc / 2) return 1; // (the flanks and back are open)
  return ult ? B.d.ultX : 0;
}
// a rider at speed into its front: stalled
export const testudoStalls = (o, r) => !!o.testudo && Math.abs(angDiff(o.testudo.face, Math.atan2(r.x - o.x, r.z - o.z))) < o.testudo.d.arc / 2;
