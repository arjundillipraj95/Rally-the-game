// (C5) Sigrun's great grey wolf, drawn by code on the horse's rig (models/wolf_sigrun.glb: the horse's leg bones plus
// its own head and tail, hung from pivots by render/warhorse.js). Its gait is the horse's with the wolf's table
// (config/wolf.js); here: its head and tail as it goes, its strikes (claw, bite, pounce, shake, howl) moving its legs,
// head and tail, and its flinch when hit (yelp, snarl). Drawing only, on every phone.
import { G } from '../core/state.js';
import { WOLF_POSE as P, WOLF_MOVES as M, FEEL_WOLF as F } from '../config/wolf.js';

const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const bump = (x, a, b, c) => (x < a ? 0 : x < b ? ss(a, b, x) : 1 - ss(b, c, x)); // (up from a to b, down by c)
// the wolf's own pivots in a copy of its model (none: not a wolf)
export function wolfRig(hc) {
  const head = hc.getObjectByName('pv_head'), tail = hc.getObjectByName('pv_tail');
  return head || tail ? { head, tail, mv: null, j: { p: 0, v: 0, y: 0, yv: 0 }, gp: 0 } : null;
}
// start a strike (name in WOLF_MOVES), from now
export function wolfMove(W, name) { if (W && M[name]) W.mv = { name, t0: G.T }; }
// hit: the head jerks away from the blow (rel: its angle from the wolf's facing)
export function wolfHit(W, rel, power) { if (!W) return; W.j.v -= F.headJerk * power * 10; W.j.yv -= Math.sin(rel) * F.headJerk * power * 12; }
// how far through a strike it is (0..1), or -1
export const wolfAt = W => (W && W.mv ? (G.T - W.mv.t0) / M[W.mv.name].t : -1);
// each frame, after the gait: head, tail and any strike over the legs. legs: herohorse legsOf; sp m/s. Returns the
// body's extra [rise, pitch] for a strike (the pounce's spring, the howl's sit)
export function wolfPose(W, legs, sp, dt) {
  if (!W) return [0, 0];
  const gal = ss(6, 10, sp), t = Math.min(dt, .05), j = W.j;
  j.v += (-F.headK[0] * j.p - F.headK[1] * j.v) * t; j.p += j.v * t; j.yv += (-F.headK[0] * j.y - F.headK[1] * j.yv) * t; j.y += j.yv * t; // (the hit's jerk springs back)
  const nod = Math.sin(legs.gp * Math.PI * 2) * P.nod * Math.min(1, sp / 4);
  let hp = gal * P.gallopDip + nod + j.p, hy = j.y, tp = gal * P.tailLift, ty = Math.sin(G.T * (2 + sp * .4)) * (sp > .5 ? P.tailSway * (1 - gal * .6) : P.idleSway), rise = 0, pitch = 0;
  let k = wolfAt(W);
  if (k >= 1) { W.mv = null; k = -1; }
  if (k >= 0) {
    const L = legs.hip, K = legs.knee, n = W.mv.name;
    if (n === 'clawR' || n === 'clawL') { // a forepaw up and forward, then raked down through the blow
      const leg = n === 'clawR' ? 'frontR' : 'frontL', up = bump(k, 0, .35, .8), rake = ss(.35, .55, k) * (1 - ss(.7, 1, k));
      if (L[leg]) L[leg].rotation.x = -1.35 * up + .45 * rake; if (K[leg]) K[leg].rotation.x = 1.1 * up * (1 - rake);
      hp += .12 * up - .1 * rake; hy += (n === 'clawR' ? -.15 : .15) * up; pitch -= .08 * up; // (leaning back to raise it, into it to rake)
    } else if (n === 'bite') { // the head drawn back, then snapped forward and down
      const back = bump(k, 0, .4, .5), snap = bump(k, .4, .55, 1);
      hp += -.35 * back + .5 * snap; pitch += .1 * snap - .05 * back; tp += .2 * back;
    } else if (n === 'pounce') { // crouched, then up and over: forelegs reaching, hind legs trailing
      const crouch = bump(k, 0, .25, .4), fly = ss(.25, .45, k) * (1 - ss(.85, 1, k));
      for (const f of ['frontL', 'frontR']) { if (L[f]) L[f].rotation.x = .4 * crouch - 1.2 * fly; if (K[f]) K[f].rotation.x = .9 * crouch; }
      for (const b of ['backL', 'backR']) { if (L[b]) L[b].rotation.x = -.5 * crouch + 1.1 * fly; if (K[b]) K[b].rotation.x = -.9 * crouch; }
      rise -= .25 * crouch; pitch += .12 * crouch - .3 * fly; hp += -.25 * fly; tp += .4 * fly;
    } else if (n === 'shake') { // jaws clamped: one hard shake, side to side
      hy += Math.sin(k * Math.PI * 3) * .55 * (1 - k); hp += .35; pitch += .08;
    } else if (n === 'howl') { // sat back on its haunches, head thrown up
      const up = bump(k, 0, .15, 1);
      hp -= 1.1 * up; pitch -= .3 * up; rise -= .1 * up; tp -= .3 * up;
      for (const b of ['backL', 'backR']) { if (L[b]) L[b].rotation.x = -.7 * up; if (K[b]) K[b].rotation.x = -1.1 * up; }
    }
  }
  if (W.head) { W.head.rotation.x = hp; W.head.rotation.y = hy; }
  if (W.tail) { W.tail.rotation.x = tp; W.tail.rotation.y = ty; }
  return [rise, pitch];
}
