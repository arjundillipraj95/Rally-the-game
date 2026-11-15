// How a captain's spear or javelin is held on the clip skeleton (moved out of render/heroes.js in F26).
import * as THREE from 'three';
import { ANIM } from '../../config.js';
import { G } from '../../core/state.js';

// F17c how a spear or javelin is held (Arjun: "holding, upright; fighting, it hits forward"): upright at his side, butt near
// the ground, while he stands, walks or runs; level in the leap and the throw, and braced behind the shield; mounted, a lance
// couched. F26: in the spear's strikes, as the clip holds it (the body turns, not the weapon: render/rig/strikeface.js).
// The way it points is eased in the world (not in his hand, which the clips swing fast); it slides in his grip to rest on its butt.
// A code pose (blended in by R.cw) keeps its own hold.
const _hp = new THREE.Vector3(), _dir = new THREE.Vector3(), _pq = new THREE.Quaternion(), _aq = new THREE.Quaternion(), _ws = new THREE.Vector3(), FWD = new THREE.Vector3(0, 0, 1);
function shaftMode(u, h) {
  if (h.U) return 'couch';
  if (h.swClip && h.swT != null && G.T - h.swT < .38 + ANIM.swingTail) return ANIM.strikeFace.yaw[h.swClip] != null ? 'clip' : ANIM.shaftAim.level.includes(h.swClip) ? 'level' : 'upright';
  if ((u.human && u.blocking) || u.blockT > 0) return 'level';
  return 'upright';
}
export function aimShaft(u, h, R, dt) {
  const A = ANIM.shaftAim, top = h.U || R.root; top.updateMatrixWorld(true);
  const hs = R.shaft.parent; hs.getWorldPosition(_hp);
  const fx = Math.sin(u.face), fz = Math.cos(u.face), mode = shaftMode(u, h);
  if (mode === 'couch') _dir.set(fx, -A.rideDip, fz);
  else if (mode === 'level') _dir.set(fx, -A.dip, fz);
  else if (mode === 'clip') _dir.copy(FWD).applyQuaternion(hs.getWorldQuaternion(_pq).multiply(R.shaftQ0)); // (F26: along his forearm, as the clip holds it)
  else _dir.set(fx * Math.sin(A.lean), Math.cos(A.lean), fz * Math.sin(A.lean));
  _dir.normalize();
  h.shClipT = mode === 'clip' ? (h.shClipT || 0) + (dt || 0) : 0;
  const k = h.shClipT >= ANIM.fast ? 1 : 1 - Math.exp(-A.ease * Math.min(dt || 0, .1)); // (F26: into the clip's hold within ANIM.fast s, then held exactly)
  if (!h.shDir || !dt) h.shDir = _dir.clone(); else h.shDir.lerp(_dir, k).normalize();
  // the grip: upright, slid down till the butt is near the ground; otherwise held where it was made to be held
  hs.getWorldScale(_ws); const ws = _ws.z || 1;
  const want = mode === 'upright' && h.shDir.y > .5 ? Math.min(0, ((u.y || 0) + A.ground - _hp.y) / h.shDir.y / ws - R.butt) : 0;
  h.shSlide = h.shSlide == null || !dt ? want : h.shSlide + (want - h.shSlide) * (1 - Math.exp(-A.slideEase * Math.min(dt, .1)));
  R.slide.position.z = h.shSlide * (1 - (R.cw || 0));
  hs.getWorldQuaternion(_pq).invert();
  _aq.setFromUnitVectors(FWD, h.shDir).premultiply(_pq);
  R.shaft.quaternion.slerpQuaternions(_aq, R.shaftQ0, R.cw || 0);
  R.shaft.updateMatrixWorld(true);
}
