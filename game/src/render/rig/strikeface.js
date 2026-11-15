// F26 Spear strikes face the target. Animation decides how a move looks, code decides where it points: the spear's
// clips strike side-on (to his right), so the whole captain is turned by the clip's own yaw (ANIM.strikeFace.yaw) and
// the strike lands along his facing. His facing is the rules' (turned to the target on the press, synced to every
// phone); the drawn body turns to it within strikeFace.turn s. His head, and past its limit his chest, look along it.
// Nothing here bends the weapon: the shaft stays as the clip holds it (render/heroes.js aimShaft).
import * as THREE from 'three';
import { ANIM } from '../../config.js';

const SF = ANIM.strikeFace, Y = new THREE.Vector3(0, 1, 0), Z = new THREE.Vector3(0, 0, 1);
const _q = new THREE.Quaternion(), _p = new THREE.Quaternion(), _r = new THREE.Quaternion(), _v = new THREE.Vector3();
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
const ease = k => { k = Math.min(1, Math.max(0, k)); return k * k * (3 - 2 * k); };
const strikeOf = h => (!h.U && h.weapon === 'spear' && h.swClip && SF.yaw[h.swClip] != null && h.swT != null ? h.swClip : null);

// the drawn yaw for this frame (his facing, the turn into a new strike, the clip's own yaw); sets h.sfW, the strike's weight
export function strikeYaw(u, h, T) {
  const clip = strikeOf(h), t = clip ? T - h.swT : -1, end = .38 + ANIM.swingTail;
  if (clip && h.sfN !== h.swN) { h.sfN = h.swN; h.sfFrom = h.sfLast ?? u.face; } // (a new strike: turn from where he was drawn)
  const on = t >= 0 && t < end;
  h.sfW = on ? ease(t / SF.turn) * ease((end - t) / SF.out) : 0;
  const base = on && h.sfFrom != null ? u.face + wrap(h.sfFrom - u.face) * (1 - ease(t / SF.turn)) : u.face;
  let off = 0;
  if (h.sfW > 0) {
    const A = SF.arc[clip], hd = ANIM.swing[clip].hd || ANIM.hitDelay;
    off = SF.yaw[clip] + (A ? (t < hd ? A[0] * (1 - t / hd) : A[1] * Math.min(1, (t - hd) / A[2])) : 0);
  }
  h.sfLast = base;
  return base + off * h.sfW;
}

// the head (and the chest, past the head's limit) turned toward his facing, by the strike's weight; upper body only
const fwdOf = (R, b) => (R.sfFwd ||= {})[b.name] ||= Z.clone().applyQuaternion(R.rest[R.list.indexOf(b)].wq.clone().invert());
const yawOf = (R, b) => { _v.copy(fwdOf(R, b)).applyQuaternion(b.getWorldQuaternion(_q)); return Math.atan2(_v.x, _v.z); };
function turnBone(b, a) {
  b.getWorldQuaternion(_q); b.parent.getWorldQuaternion(_p);
  _q.premultiply(_r.setFromAxisAngle(Y, a)); b.quaternion.copy(_p.invert().multiply(_q)); b.updateMatrixWorld(true);
}
export function lookAlong(R, h, top, face) {
  const w = h.sfW || 0; if (w <= 0 || !R.mx.Head) return;
  top.updateMatrixWorld(true);
  const head = R.mx.Head, chest = R.mx.Spine2, e = wrap(face - yawOf(R, head));
  const c = Math.sign(e) * Math.min(SF.chest, Math.max(0, Math.abs(e) - SF.head));
  if (c && chest) turnBone(chest, c * w);
  const e2 = wrap(face - yawOf(R, head));
  turnBone(head, Math.sign(e2) * Math.min(SF.head, Math.abs(e2)) * w);
}
