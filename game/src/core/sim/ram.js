// Battle rules: C3b Ram of Cassius, Titus's special attack 1 (design doc, Titus card and Mount, 17 Nov). A shield-first
// rush along the path shown first (the way he faces, or where aimed): a short wind-up, then the dash. Soldiers in the
// path take a little, are shoved aside and stumble (nobody flies). The first enemy champion ends it: knocked back,
// stunned, and twice as hard into a wall, gate or rock. Walls, gates and rocks stop it (no harm to them). From the saddle it is a longer horse charge and he stays mounted. Numbers on his page (sp1).
// The host runs it; a joined phone runs its own champion's rush (netgame) and stops where the host says.
// C3k (agreed 18 Nov) what it meets: a raised shield from the front stops it dead and he bounces back staggered (the
// holder slides, unhurt); two rams head-on both stop, thrown apart and dazed, splitting the blow (a horse beats feet);
// a testudo is a wall he bounces off; anyone in the air it passes under; FEEL2a (Arjun 26 Nov): soldiers, braced or not,
// never slow or stop him (each takes his knock and is shoved aside), his own men step aside (`part`); a gate takes `gateX` of his blows; a rider is knocked out
// of the saddle (horse unhurt) unless he rides too or the rider is a Raider (then pushed); a champion thrown into
// another champion hurts him too, `chainX` of it, a short stagger, no further chain.
import { G, isEnemy } from '../state.js';
import { groundY, angDiff } from '../world.js';
import { moveHit } from '../../champions/stats.js';
import { hit } from './melee.js';
import { integrate } from './move.js';
import { dismount, gainRally, push } from './army.js';
import { wallInReach, hitWall } from './forts.js';
import { champOf } from '../../champions/index.js';
import { FORT, RALLY } from '../../config.js';
import { shields, coverOf, blockedBy } from './scutum.js';
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
const rush = (u, a, d, own) => ({ men: 0, t: 0, x: u.x, z: u.z, dx: Math.sin(a), dz: Math.cos(a), dist: u.mounted ? d.rideDist : d.dist, v: d.dist / d.dur, gone: 0, hit: new Set(), d, own });
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
    if (!R.own && got < step * .5) gate(u, R);
    if (!R.own && !stop) stop = contacts(u, R);
    if (stop) { finish(u, R); if (R.after) R.after(); }
  }
  if (!u.remote) { u.x = R.x; u.z = R.z; u.y = groundY(u.x, u.z) + (u.jy || 0); }
  return !u.remote;
}
function finish(u, R) {
  u.ram = null; if (u.act && u.act.name === 'ram') u.act = null;
  if (!R.own) fx('fxmsg', { k: 'fxramend', u, q: fmt(R.x, R.z) });
}
// a gate in front of where he stopped takes `gateX` of his blows (walls and rocks: nothing)
function gate(u, R) {
  const w = wallInReach({ x: R.x, z: R.z, r: u.r, reach: u.reach + .6, face: u.face, ti: u.ti }, .6);
  if (!w || (w.cgate == null && w.plazaGate == null && !(w.k >= FORT.segs))) return;
  const a = Object.create(u); a.dmg = u.dmg * R.d.gateX; hitWall(a, w);
  fx('fxmsg', { k: 'fxramgate', u });
}
const inAir = o => (o.eagle && !o.eagle.landed && o.eagle.t > o.eagle.d.crouch) || (o.jy || 0) > .8;
// bounced back off something that held: `recoil` m back, staggered
const recoil = (u, R, m = 1) => { R.after = () => push(u, -R.dx * R.d.recoil * m / .5, -R.dz * R.d.recoil * m / .5, R.d.recoilStun); };
// who he meets this step: true when the rush ends here
function contacts(u, R) {
  const d = R.d, k = 1; // (BAL1: his blow x LEVELS.mult, below)
  const ahead = (o, reach) => { const rx = o.x - R.x, rz = o.z - R.z, f = rx * R.dx + rz * R.dz, s = rx * R.dz - rz * R.dx; return f > -.3 && f < u.r + (o.r || 0) + reach && Math.abs(s) < d.w + (o.r || 0) ? s : null; };
  const faces = o => Math.abs(angDiff(o.face, Math.atan2(R.x - o.x, R.z - o.z))) < 1.1;
  for (const o of G.units) {
    if (o.dead || R.hit.has(o.id) || !isEnemy(u, o) || inAir(o)) continue;
    const s = ahead(o, .4); if (s == null) continue;
    const S = shields.length ? coverOf(o, R.x, R.z) : null;
    if (S) { // (C3c: a raised scutum stops it; C3k: he bounces off, the holder slides back unhurt)
      blockedBy(S, o, u); R.hit.add(o.id); if (!(o.leader || o === S)) continue;
      recoil(u, R); push(o, R.dx * d.slide / .5, R.dz * d.slide / .5, .1); fx('fxmsg', { k: 'fxramclang', u: o, a: u }); sound('heavy', o.x, o.z); return true;
    }
    if (o.leader && o.ram && o.ram.t > o.ram.d.wind && o.ram.dx * R.dx + o.ram.dz * R.dz < -.5) { clash(u, o, R, k); return true; }
    if (o.leader) { champ(u, o, R, k); return true; }
    if (o.testudo && faces(o)) { // a testudo: a wall of shields; the front men give a step
      for (const f of o.testudo.men) if (!f.dead && ahead(f, 1.2) != null) { f.x += R.dx * d.slide; f.z += R.dz * d.slide; }
      recoil(u, R); fx('fxmsg', { k: 'fxramclang', u: o, a: u }); sound('heavy', o.x, o.z); return true;
    }
    // (FEEL2a, Arjun 26 Nov: a special isn't stopped by soldiers: a braced line is knocked aside like any men)
    R.hit.add(o.id); // a soldier: a knock, shoved off the path to his side, a stumble
    hit(u, o, 1, { fixed: moveHit(u, 'sp1', false), stun: d.stumble, kb: .05, unblockable: true, unparryable: true });
    const side = s >= 0 ? 1 : -1; push(o, R.dz * side * d.shove, -R.dx * side * d.shove, d.stumble);
    R.men++; // (FEEL2a: no longer slowed or stopped by men)
  }
  for (const o of G.units) { // FEEL2a: his own men in the path step aside (no harm)
    if (o === u || o.dead || o.leader || o.mounted || isEnemy(u, o) || R.hit.has(o.id)) continue;
    const s = ahead(o, .6); if (s == null) continue;
    R.hit.add(o.id); const side = s >= 0 ? 1 : -1; push(o, R.dz * side * d.part, -R.dx * side * d.part, 0);
  }
  return false;
}
// two rams head-on: both stop, thrown apart, dazed, half the blow each; a horse beats feet
function clash(u, o, R, k) {
  const d = R.d, win = u.mounted && !o.mounted ? u : o.mounted && !u.mounted ? o : null;
  for (const [a, b, sg] of [[u, o, -1], [o, u, 1]]) {
    if (win === a) continue;
    hit(b, a, 1, { fixed: moveHit(b, 'sp1', true) * (win ? 1 : .5), stun: d.clashStun, kb: .05, unblockable: true, unparryable: true });
  }
  R.hit.add(o.id); finish(o, o.ram);
  if (win !== o) push(o, R.dx * d.clashKb / .25, R.dz * d.clashKb / .25, d.clashStun);
  if (win !== u) R.after = () => push(u, -R.dx * d.clashKb / .25, -R.dz * d.clashKb / .25, d.clashStun);
  fx('fxmsg', { k: 'fxramclash', u: o, a: u }); sound('heavy', o.x, o.z);
}
// the first enemy champion: knocked back along the rush, harder into a wall, into another champion: him too
function champ(u, o, R, k) {
  const d = R.d;
  if (o.mounted) { // a rider: out of the saddle (horse unhurt), unless both ride or he's a Raider: then pushed
    if (u.mounted || champOf(o.ti).cls === 'raider') {
      hit(u, o, 1, { fixed: moveHit(u, 'sp1', true), kb: .05, unblockable: true, unparryable: true });
      push(o, R.dx * d.horsePush / .5, R.dz * d.horsePush / .5, 0); R.hit.add(o.id);
      fx('fxmsg', { k: 'fxramhit', u: o, a: u }); sound('heavy', o.x, o.z); return;
    }
    dismount(o, 'off'); gainRally(u, RALLY.unhorse); fx('fxmsg', { k: 'fxunhorse', u: o });
  }
  const c = { x: o.x, z: o.z, r: o.r || .5, ti: o.ti, vx: R.dx * d.kb / .2, vz: R.dz * d.kb / .2, jy: 0 };
  let two = null;
  for (let i = 0; i < 10 && !two; i++) {
    integrate(c, .02, c.z);
    two = G.units.find(p => p !== o && p.leader && !p.dead && isEnemy(u, p) && !inAir(p) && !R.hit.has(p.id) && Math.hypot(p.x - c.x, p.z - c.z) < c.r + (p.r || .5));
  }
  const wall = !two && Math.hypot(c.x - o.x, c.z - o.z) < d.kb * .8;
  hit(u, o, 1, { fixed: moveHit(u, 'sp1', true) * (wall ? d.wall / d.champ : 1), stun: wall ? d.wallStun : d.stun, kb: .05, unblockable: true, unparryable: true });
  if (!o.dead) {
    if (o.remote) push(o, (c.x - o.x) / .25, (c.z - o.z) / .25, wall ? d.wallStun : d.stun);
    else { o.x = c.x; o.z = c.z; o.vx = o.vz = 0; }
  }
  R.hit.add(o.id);
  if (two) { // knocked into another champion: he takes `chainX` of it and a short stagger, pushed on a little
    R.hit.add(two.id);
    hit(u, two, 1, { fixed: moveHit(u, 'sp1', true) * d.chainX, stun: d.chainStun, kb: .05, unblockable: true, unparryable: true });
    if (!two.mounted) push(two, R.dx * d.kb * .5 / .25, R.dz * d.kb * .5 / .25, d.chainStun);
    fx('fxmsg', { k: 'fxramchain', u: two, a: o });
  }
  fx('fxmsg', { k: wall ? 'fxramwall' : 'fxramhit', u: o, a: u }); sound('heavy', o.x, o.z);
}
