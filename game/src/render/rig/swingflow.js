// FEEL1 (Arjun 25 Nov): a sword combo blow's clip fills the time to his next blow, so the body follows through
// instead of snapping at 1.5x and standing idle; the blow still lands when the rules say. And the shield bash is
// driven with the body: he leans and turns his shield shoulder into it (the rules step him in, BASH.step).
import { ANIM, CAPTAIN_COMBAT } from '../../config.js';
import { paceOf } from '../../champions/stats.js';
import * as THREE from 'three';

const F = ANIM.flow, clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = k => { k = clamp(k, 0, 1); return k * k * (3 - 2 * k); };

// at a blow's start: the clip's speed after it lands (after) and how long the blow is held (end, s from its start)
export function swingFlow(u, h, clip, dur) {
  const S = ANIM.swing[clip], k = u.swingKind | 0, end0 = .38 + ANIM.swingTail;
  h.swAfter = S && S.after; h.swEnd = end0; h.swHold = null;
  if (!S || !dur || h.weapon !== 'sword' || u.mounted || h.U || !F.kinds.includes(k)) return;
  const C = CAPTAIN_COMBAT.sword, hd = S.hd || ANIM.hitDelay;
  const gap = (k === 6 ? (u.combo === 2 ? C.finisherCd : F.bashGap) : C.cd) * paceOf(u.ti); // (to his next blow)
  h.swAfter = clamp((dur - S.hit) / Math.max(.05, gap - hd), F.min, F.max);
  h.swEnd = Math.max(end0, hd + (dur - S.hit) / h.swAfter - F.out); // (let go just before the clip ends: the idle blends in)
  const H = F.hold[clip]; if (H) { h.swHold = H.clip; h.swEnd = clamp(gap - H.free, H.min, H.max); } // (a short clip, e.g. the bash on the block clip: then held, shield up, to near his next blow)
}

// FEEL2b the gladius stab over the shield: the shield held (block clip), the sword arm driven straight out ahead over
// its top and drawn back: each arm bone turned, in the world, toward the point he stabs at, by the stab's weight
// (ANIM.flow.stab: `reach` m ahead, `up` m above his shoulder; peak at `hit` s, back by `dur` s)
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _t = new THREE.Vector3(), _q = new THREE.Quaternion(), _p = new THREE.Quaternion(), _w = new THREE.Quaternion();
function aim(bone, child, target, w) {
  bone.updateMatrixWorld(true); bone.getWorldPosition(_a); child.updateMatrixWorld(true); child.getWorldPosition(_b);
  const from = _b.sub(_a).normalize(), to = _t.copy(target).sub(_a).normalize();
  _q.setFromUnitVectors(from, to); _w.identity().slerp(_q, w); // (the turn wanted, in the world, by the weight)
  bone.getWorldQuaternion(_p); _p.premultiply(_w); bone.parent.getWorldQuaternion(_q).invert(); bone.quaternion.copy(_q.multiply(_p));
}
const _goal = new THREE.Vector3();
export function stabArm(R, h, T, u, top) {
  if (h.swClip !== 'blockIdle' || h.swT == null || !u.scutumUp || !R.mx || !R.mx.RightArm || !R.mx.RightForeArm || !R.mx.RightHand) return;
  const S = F.stab, t = T - h.swT; if (t < 0 || t > S.dur) return;
  const w = t < S.hit ? ease(t / S.hit) : 1 - ease((t - S.hit) / (S.dur - S.hit));
  if (R.mx.Spine2) { R.mx.Spine2.rotateY(S.chest * w); }
  top.updateMatrixWorld(true); R.mx.RightArm.getWorldPosition(_goal);
  const f = u.face; _goal.x += Math.sin(f) * S.reach; _goal.z += Math.cos(f) * S.reach; _goal.y += S.up;
  aim(R.mx.RightArm, R.mx.RightForeArm, _goal, w);
  aim(R.mx.RightForeArm, R.mx.RightHand, _goal, w);
  if (R.blade && R.blade.tip) { _goal.y -= S.up; _goal.x += Math.sin(f) * 2; _goal.z += Math.cos(f) * 2; aim(R.mx.RightHand, R.blade.tip, _goal, w); } // (the blade's point along the stab)
}

// after the clips are posed: the shield bash's body (lean forward, shield shoulder driven round), weighted in up to
// the moment it lands, held, then eased out
export function bashBody(R, h, T) {
  if (h.swClip !== 'shieldBash' || h.swT == null || h.U || !R.mx || !R.mx.Spine) return;
  const B = F.bash, S = ANIM.swing.shieldBash, hd = S.hd || ANIM.hitDelay, t = T - h.swT, end = h.swEnd || .68;
  if (t < 0 || t > end) return;
  const w = ease(t / hd) * (t < hd + B.hold ? 1 : 1 - ease((t - hd - B.hold) / Math.max(.05, end - hd - B.hold)));
  R.mx.Spine.rotateX(B.lean * w);
  if (R.mx.Spine2) R.mx.Spine2.rotateY(B.twist * w);
  if (R.mx.Hips) R.mx.Hips.rotateX(B.hips * w);
}
