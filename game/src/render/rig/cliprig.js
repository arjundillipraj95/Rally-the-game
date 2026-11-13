// F8: the captain on the shared (Mixamo) skeleton, moved by real clips. The painted body, its skin and
// the clips come from one file made by tools/models/prep.mjs. Two clips play at once: one moves the legs
// and hips, one the body above them, so he can strike while he runs. Moves that have no clip are still
// posed in code (rig/captainrig.js): that pose is worked out on that rig's bare bones and carried over,
// bone by bone, and blended in over the clips.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { ANIM } from '../../config.js';
import { NAMES, jointsOf, addGear, bareRig, applyPose, fitArmour, tuckBody, ARMOUR_ARM, teamMaterial } from './captainrig.js';

// the code rig's bones, and the shared skeleton's bone each one drives
const MAP = { hips: 'Hips', spine: 'Spine', chest: 'Spine2', neck: 'Neck', head: 'Head',
  upperArm_R: 'RightArm', foreArm_R: 'RightForeArm', hand_R: 'RightHand', upperArm_L: 'LeftArm', foreArm_L: 'LeftForeArm', hand_L: 'LeftHand',
  thigh_R: 'RightUpLeg', shin_R: 'RightLeg', foot_R: 'RightFoot', thigh_L: 'LeftUpLeg', shin_L: 'LeftLeg', foot_L: 'LeftFoot' };
const CODE_OF = Object.fromEntries(Object.entries(MAP).map(([c, m]) => [m, c]));
const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _e = new THREE.Euler(), _m = new THREE.Matrix4(), _v = new THREE.Vector3(), Z = new THREE.Vector3(0, 0, 1);

// a body file: the skinned body, and its clips cut in two (legs, upper body)
export function loadClipBody(url) {
  return new GLTFLoader().loadAsync(url).then(g => {
    let mesh = null; g.scene.traverse(o => { if (o.isSkinnedMesh && !mesh) mesh = o; });
    if (!mesh) throw new Error(url + ': no skinned body');
    const names = mesh.skeleton.bones.map(b => b.name), clips = {};
    for (const c of g.animations) {
      const lo = [], up = []; for (const t of c.tracks) (ANIM.legs.includes(t.name.split('.')[0]) ? lo : up).push(t);
      const ht = c.tracks.find(t => t.name === 'Hips.quaternion');
      clips[c.name] = { name: c.name, dur: c.duration, lo: new THREE.AnimationClip(c.name + '.lo', c.duration, lo), up: new THREE.AnimationClip(c.name + '.up', c.duration, up), hips: ht.createInterpolant(new Float32Array(4)) };
    }
    mesh.material.metalness = 0; mesh.material.roughness = .8; mesh.geometry.userData.material = mesh.material;
    // (the body's middle, in the space it was modelled in: the file stands him centred, the model is a little off)
    const x0 = _v.setFromMatrixPosition(_m.copy(mesh.skeleton.boneInverses[0]).invert()).x - mesh.skeleton.bones[0].position.x;
    return { scene: g.scene, mesh, geometry: mesh.geometry, material: mesh.material, names, clips, x0 };
  });
}

// one captain: a copy of the body with his own skeleton, his gear on it, and a mixer
export function rigClip(S, { weapon = 'sword', team = null, pack = null } = {}) {
  const inner = cloneSkinned(S.scene); let mesh = null; inner.traverse(o => { if (o.isSkinnedMesh && !mesh) mesh = o; });
  mesh.geometry = mesh.geometry.clone(); // (his own: the armour tucks the body in under it)
  mesh.material = team != null && S.material.map ? teamMaterial(S.material, team, .23) : S.material.clone();
  const list = mesh.skeleton.bones, mx = Object.fromEntries(list.map(b => [b.name, b]));
  const root = new THREE.Group(); root.add(inner); root.updateMatrixWorld(true);
  // as he stands in the file (the T-pose): each bone's turn of its own and in the world, and who it hangs from
  const rest = list.map(b => ({ q: b.quaternion.clone(), wq: b.getWorldQuaternion(new THREE.Quaternion()), parent: list.indexOf(b.parent), code: CODE_OF[b.name] || null }));
  const hips = mx.Hips, hipsRest = hips.position.clone();
  // sockets: where the code rig's hand, head and chest bones sit and point, hung on this skeleton's bones, so the same gear fits
  const J = jointsOf('captain'), sock = {};
  for (const n of ['hand_R', 'hand_L', 'head', 'chest', 'foreArm_L']) {
    const s = new THREE.Object3D(), b = mx[MAP[n]]; s.name = 'sock_' + n;
    _m.copy(b.matrixWorld).invert().multiply(new THREE.Matrix4().makeTranslation(J[n][0], J[n][1], J[n][2])).decompose(s.position, s.quaternion, s.scale);
    b.add(s); sock[n] = s;
  }
  // the shield: gripped in the fist for the code's poses (which turn the wrist to face it); for the clips it
  // is strapped along the forearm, facing out from the back of the hand, as the clips were made
  const gear = addGear(sock, { body: 'captain', weapon, team, pack }), shield = gear.shield;
  let shaft = null;
  if (ANIM.shaftGrip[weapon] != null) { // F17: a spear or javelin lies along the forearm, point out past the fist (the clips hold it so); a sword stays across the fist
    const hs = sock.hand_R, v = mx.RightHand.getWorldPosition(new THREE.Vector3()).sub(mx.RightForeArm.getWorldPosition(new THREE.Vector3()));
    v.applyQuaternion(hs.getWorldQuaternion(new THREE.Quaternion()).invert()).normalize();
    const piv = new THREE.Object3D(); piv.name = 'shaft';
    piv.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), v).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -ANIM.shaftGrip[weapon]));
    for (const c of [...hs.children]) piv.add(c);
    hs.add(piv); shaft = piv;
  }
  // the weapon's point and where its blade starts, marked in the frame it is held in: the swoosh follows them (render/soldiers.js)
  const wf = shaft || sock.hand_R, blade = {};
  { root.updateMatrixWorld(true); const box = new THREE.Box3(), inv = new THREE.Matrix4().copy(wf.matrixWorld).invert(), b = new THREE.Box3();
    wf.traverse(o => { if (o.isMesh) { o.geometry.computeBoundingBox(); box.union(b.copy(o.geometry.boundingBox).applyMatrix4(_m.multiplyMatrices(inv, o.matrixWorld))); } });
    const z1 = isFinite(box.max.z) ? box.max.z : 1;
    for (const [k, z] of [['tip', z1], ['base', shaft ? Math.max(z1 - .7, z1 * .5) : z1 * .12]]) { const o = new THREE.Object3D(); o.name = 'blade_' + k; o.position.set(0, 0, z); wf.add(o); blade[k] = o; } }
  sock.foreArm_L.updateMatrix(); sock.hand_L.updateMatrix();
  const mount = shield && { code: [shield.position.clone(), shield.quaternion.clone()], hand: mx.LeftHand, p: new THREE.Vector3(), q: new THREE.Quaternion(),
    clip: sock.foreArm_L.matrix.clone().multiply(new THREE.Matrix4().makeBasis(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 1, 0)).setPosition(...ANIM.shield.at)), inv: sock.hand_L.matrix.clone().invert() };
  const mixer = new THREE.AnimationMixer(inner);
  return { clip: true, S, root, inner, mesh, shield, cape: gear.cape, mount, shaft, shaftQ0: shaft && shaft.quaternion.clone(), blade, bones: sock, mx, list, rest, hips, hipsRest, weapon, mixer, shadow: bareRig(weapon),
    lo: { list: [], key: null, fade: ANIM.fade, part: 'lo' }, up: { list: [], key: null, fade: ANIM.fade, part: 'up' },
    cw: 0, cq: list.map(() => new THREE.Quaternion()), cy: 0, dq: list.map(() => new THREE.Quaternion()), wq: list.map(() => new THREE.Quaternion()) };
}

// the armour over him: skinned by the code rig's regions, bound with the arms at the shoulder guards' angle
export function addClipArmour(R, srcGeo, material) {
  const geo = fitArmour(srcGeo), si = geo.attributes.skinIndex, ix = NAMES.map(n => R.list.indexOf(R.mx[MAP[n]]));
  for (let i = 0; i < si.array.length; i++) si.array[i] = ix[si.array[i]];
  const mesh = new THREE.SkinnedMesh(geo, material); R.inner.add(mesh);
  const keep = R.list.map(b => b.quaternion.clone()), keepP = R.hips.position.clone();
  R.list.forEach((b, i) => b.quaternion.copy(R.rest[i].q)); R.hips.position.copy(R.hipsRest); R.root.updateMatrixWorld(true);
  for (const [n, a] of [['RightArm', ARMOUR_ARM], ['LeftArm', -ARMOUR_ARM]]) { // (turned down about the way he faces, as the code rig's arms are)
    const b = R.mx[n], i = R.list.indexOf(b);
    b.quaternion.copy(R.rest[R.rest[i].parent].wq).invert().multiply(_q.setFromAxisAngle(Z, a)).multiply(R.rest[i].wq);
  }
  R.root.updateMatrixWorld(true);
  mesh.bind(new THREE.Skeleton(R.list), mesh.matrixWorld);
  R.list.forEach((b, i) => b.quaternion.copy(keep[i])); R.hips.position.copy(keepP); R.root.updateMatrixWorld(true);
  tuckBody(R.mesh.geometry, undefined, R.S.x0);
  R.armour = mesh; return mesh;
}

// ---- the two layers of clips
// put a clip on a layer ('lo' or 'up'). key: what set it off (the same key again changes nothing).
export function play(R, part, name, key, { fade = ANIM.fade, loop = true, at = 0 } = {}) {
  const L = R[part]; if (L.key === key) return L.list[0];
  const C = R.S.clips[name], act = R.mixer.clipAction(C[part]), was = L.list.findIndex(e => e.act === act);
  let w = L.list.length ? 0 : 1; if (was >= 0) { w = L.list[was].w; L.list.splice(was, 1); } // (the same clip again: it starts over, keeping its share)
  act.reset(); act.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity); act.clampWhenFinished = true; act.time = at; act.setEffectiveWeight(w); act.play();
  const e = { act, name, w, C, loop }; L.list.unshift(e); L.key = key; L.fade = fade;
  return e;
}
// the shares of a layer's clips: the newest grows to all of it, the older ones shrink in step; together always 1
function blend(L, dt) {
  const h = L.list[0]; if (!h) return;
  h.w = L.list.length === 1 || L.fade <= 0 ? 1 : Math.min(1, h.w + dt / L.fade);
  let old = 0; for (let i = 1; i < L.list.length; i++) old += L.list[i].w;
  for (let i = L.list.length - 1; i >= 1; i--) { const e = L.list[i]; e.w = old > 1e-6 ? e.w / old * (1 - h.w) : 0; if (e.w < .002) { e.act.stop(); L.list.splice(i, 1); } }
  let tot = 0; for (const e of L.list) tot += e.w; for (const e of L.list) { e.w /= tot; e.act.setEffectiveWeight(e.w); }
}
export const head = (R, part) => R[part].list[0] || null;
export const ended = e => !e.loop && e.act.time >= e.C.dur - 1e-3;

// a pose from the code rig, carried onto this skeleton: each bone turned from the T-pose as the code rig's is
function carry(R, P) {
  applyPose(R.shadow, P); R.shadow.root.updateMatrixWorld(true);
  for (let i = 0; i < R.list.length; i++) {
    const r = R.rest[i], w = R.wq[i];
    if (r.code) R.shadow.bones[r.code].getWorldQuaternion(w); else if (r.parent >= 0) w.copy(R.dq[r.parent]); else w.identity();
    R.dq[i].copy(w); w.multiply(r.wq);
    if (r.parent >= 0) R.cq[i].copy(R.wq[r.parent]).invert().multiply(w); else R.cq[i].copy(w);
  }
  R.cy = P.hipsY || 0;
}

// one frame. want: { P: a code pose or null, code: is it wanted, ride: legs to the saddle, reel: the old
// figure's springs (stag, stagR, stagY) }. The layers' clips have been chosen with play() before this.
export function tick(R, dt, want) {
  blend(R.lo, dt); blend(R.up, dt);
  R.mixer.update(dt);
  const lo = R.lo.list[0], spine = R.mx.Spine;
  // the upper body's clip was made over its own hips: over other legs, the spine makes up the difference
  let k = 0, lead = null; for (const e of R.up.list) if (lo && e.name !== lo.name) { k += e.w; if (!lead || e.w > lead.w) lead = e; }
  if (lead && k > .001) { const h = lead.C.hips.evaluate(Math.min(lead.act.time, lead.C.dur)); _q.copy(R.hips.quaternion).invert().multiply(_q2.fromArray(h)).multiply(spine.quaternion); spine.quaternion.slerp(_q, Math.min(1, k)); }
  // a move posed in code, blended in over the clips (and a rider's legs, always)
  R.cw += ((want.code ? 1 : 0) - R.cw) * (ANIM.code > 0 ? Math.min(1, dt / ANIM.code * 3) : 1); if (!want.code && R.cw < .01) R.cw = 0;
  const P = want.P || R.lastP;
  if (P && (R.cw > 0 || want.ride)) {
    carry(R, P); R.lastP = P;
    for (let i = 0; i < R.list.length; i++) { const leg = want.ride && ANIM.legs.includes(R.list[i].name), w = leg ? 1 : R.cw; if (w > 0) R.list[i].quaternion.slerp(R.cq[i], w); }
    const w = want.ride ? 1 : R.cw; R.hips.position.lerp(_v.copy(R.hipsRest).setY(R.hipsRest.y + R.cy), w);
  }
  if (!want.code && R.cw === 0) R.lastP = null;
  const M = R.mount;
  if (M) { // the shield: on the forearm for the clips, in the fist for a code pose, and between the two as one blends into the other
    M.hand.updateMatrix(); _m.copy(M.hand.matrix).invert().premultiply(M.inv).multiply(M.clip).decompose(M.p, M.q, _v);
    R.shield.position.lerpVectors(M.p, M.code[0], R.cw); R.shield.quaternion.slerpQuaternions(M.q, M.code[1], R.cw);
  }
  const a = want.reel; // the reel from a blow, on top of whatever he is doing
  if (a) {
    const st = a.stag || 0, sr = a.stagR || 0, sy = a.stagY || 0;
    if (Math.abs(st) + Math.abs(sr) + Math.abs(sy) >= .005) {
      spine.quaternion.multiply(_q.setFromEuler(_e.set(st * .45, 0, sr * .45)));
      R.mx.Spine2.quaternion.multiply(_q.setFromEuler(_e.set(st * .3, sy * .6, sr * .25)));
      R.mx.Neck.quaternion.multiply(_q.setFromEuler(_e.set(st * .2, 0, sr * .15)));
      R.hips.quaternion.premultiply(_q.setFromEuler(_e.set(0, sy * .5, 0))); R.hips.position.y -= Math.abs(st) * .08;
    }
  }
}
