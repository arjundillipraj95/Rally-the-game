// The generated captain, rigged in code: a skeleton placed from his proportions (measured off the
// model: 1.96 tall, facing +z, T-pose, arms at shoulder height y≈0, head from y≈0.3 up, skirt to
// y≈-0.6, short legs and sandals below), skin weights worked out by region and then smoothed across
// the surface so joints bend instead of creasing. His right hand (the sword) is on -x.
import * as THREE from 'three';

// joint positions (model space, after centring x on the torso)
const J = {
  hips: [0, -.38, 0], spine: [0, -.2, 0], chest: [0, 0, 0], neck: [0, .24, 0], head: [0, .32, 0],
  upperArm_R: [-.24, 0, 0], foreArm_R: [-.45, 0, 0], hand_R: [-.63, 0, 0],
  upperArm_L: [.24, 0, 0], foreArm_L: [.45, 0, 0], hand_L: [.63, 0, 0],
  thigh_R: [-.14, -.42, 0], shin_R: [-.17, -.66, 0], foot_R: [-.19, -.9, .02],
  thigh_L: [.14, -.42, 0], shin_L: [.17, -.66, 0], foot_L: [.19, -.9, .02],
};
const PARENT = {
  spine: 'hips', chest: 'spine', neck: 'chest', head: 'neck',
  upperArm_R: 'chest', foreArm_R: 'upperArm_R', hand_R: 'foreArm_R',
  upperArm_L: 'chest', foreArm_L: 'upperArm_L', hand_L: 'foreArm_L',
  thigh_R: 'hips', shin_R: 'thigh_R', foot_R: 'shin_R',
  thigh_L: 'hips', shin_L: 'thigh_L', foot_L: 'shin_L',
};
const NAMES = Object.keys(J);
const sm = t => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };

// the raw weights for one vertex, by region: {bone: weight}
function rawWeights(x, y) {
  const ax = Math.abs(x), S = x < 0 ? '_R' : '_L', w = {};
  const add = (b, v) => { if (v > 0) w[b] = (w[b] || 0) + v; };
  if (ax > .25 && y > -.17 && y < .2) { // the arm, out along x
    const t = ax;
    if (t < .33) { const s = sm((t - .22) / .11); add('chest', 1 - s); add('upperArm' + S, s); }
    else if (t < .40) add('upperArm' + S, 1);
    else if (t < .50) { const s = sm((t - .40) / .10); add('upperArm' + S, 1 - s); add('foreArm' + S, s); }
    else if (t < .58) add('foreArm' + S, 1);
    else if (t < .66) { const s = sm((t - .58) / .08); add('foreArm' + S, 1 - s); add('hand' + S, s); }
    else add('hand' + S, 1);
  } else if (y > .18) { // neck and head
    if (y < .27) { const s = sm((y - .16) / .1); add('chest', 1 - s); add('neck', s); }
    else { const s = sm((y - .26) / .08); add('neck', 1 - s); add('head', s); }
  } else if (y > -.3) { // the torso; the shoulder pads lean toward the arm
    const s = sm((y + .25) / .25); add('spine', 1 - s); add('chest', s);
    if (ax > .17 && y > -.05) { const k = sm((ax - .17) / .1) * .45; for (const b in w) w[b] *= 1 - k; add('upperArm' + S, k); }
  } else if (y > -.62) { // hips and skirt: lower down, the skirt follows the legs more
    const lw = sm((-.33 - y) / .29) * .6, c = sm(ax / .06);
    add('hips', 1 - lw);
    if (c > .99) add('thigh' + S, lw); else { add('thigh' + S, lw * (.5 + .5 * c)); add('thigh' + (S === '_R' ? '_L' : '_R'), lw * (.5 - .5 * c)); }
  } else { // the legs
    if (y > -.74) { const s = sm((-.62 - y) / .1); add('thigh' + S, 1 - s); add('shin' + S, s); }
    else { const s = sm((-.8 - y) / .1); add('shin' + S, 1 - s); add('foot' + S, s); }
  }
  return w;
}

// skin weights per vertex from a region function, smoothed over the surface
function skinWeights(geo, weightFn) {
  const pos = geo.attributes.position, nV = pos.count;
  // weights per vertex, as dense rows, then smoothed over the mesh's neighbours
  // (texture seams split vertices; weights are worked out per welded point so both sides of a seam bend alike)
  const key = i => `${Math.round(pos.getX(i) * 1e4)},${Math.round(pos.getY(i) * 1e4)},${Math.round(pos.getZ(i) * 1e4)}`;
  const weld = new Int32Array(nV), first = new Map(); let nP = 0; const pIdx = [];
  for (let i = 0; i < nV; i++) { const k = key(i); if (!first.has(k)) { first.set(k, nP++); pIdx.push(i); } weld[i] = first.get(k); }
  const B = NAMES.length, Wt = new Float32Array(nP * B);
  for (let p = 0; p < nP; p++) { const i = pIdx[p], w = weightFn(pos.getX(i), pos.getY(i), pos.getZ(i)); for (const b in w) Wt[p * B + NAMES.indexOf(b)] = w[b]; }
  const idx = geo.index.array, nb = Array.from({ length: nP }, () => new Set());
  for (let f = 0; f < idx.length; f += 3) { const a = weld[idx[f]], b = weld[idx[f + 1]], c = weld[idx[f + 2]]; nb[a].add(b).add(c); nb[b].add(a).add(c); nb[c].add(a).add(b); }
  const tmp = new Float32Array(nP * B);
  for (let it = 0; it < 4; it++) {
    for (let i = 0; i < nP; i++) { const N = nb[i]; for (let k = 0; k < B; k++) { let s = 0; for (const j of N) s += Wt[j * B + k]; tmp[i * B + k] = .5 * Wt[i * B + k] + .5 * (N.size ? s / N.size : Wt[i * B + k]); } }
    Wt.set(tmp);
  }
  const sIdx = new Uint16Array(nV * 4), sW = new Float32Array(nV * 4);
  for (let i = 0; i < nV; i++) {
    const p = weld[i], row = []; for (let k = 0; k < B; k++) if (Wt[p * B + k] > .001) row.push([k, Wt[p * B + k]]);
    row.sort((a, b) => b[1] - a[1]); const top = row.slice(0, 4), tot = top.reduce((s, r) => s + r[1], 0) || 1;
    top.forEach(([k, v], j) => { sIdx[i * 4 + j] = k; sW[i * 4 + j] = v / tot; });
  }
  geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(sIdx, 4));
  geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sW, 4));
}

export function rigCaptain(srcGeo, { gear = true, show = false } = {}) {
  const geo = srcGeo.clone(); geo.computeBoundingBox();
  // centre x on the torso (measured at the waist), keep y and z
  const pos = geo.attributes.position, nV = pos.count;
  let xmin = 1e9, xmax = -1e9; for (let i = 0; i < nV; i++) { const y = pos.getY(i); if (y > -.2 && y < -.15) { const x = pos.getX(i); xmin = Math.min(xmin, x); xmax = Math.max(xmax, x); } }
  const x0 = (xmin + xmax) / 2; geo.translate(-x0, 0, 0); if (!geo.attributes.normal) geo.computeVertexNormals();
  skinWeights(geo, rawWeights);
  // the skeleton
  const bones = {}; for (const n of NAMES) { bones[n] = new THREE.Bone(); bones[n].name = n; }
  for (const n of NAMES) {
    const p = J[n], par = PARENT[n];
    if (par) { const q = J[par]; bones[n].position.set(p[0] - q[0], p[1] - q[1], p[2] - q[2]); bones[par].add(bones[n]); }
    else bones[n].position.set(...p);
  }
  const mat = geo.attributes.color ? new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .75 }) : new THREE.MeshStandardMaterial({ color: 0xe8e2d8, roughness: .7 });
  const mesh = new THREE.SkinnedMesh(geo, srcGeo.userData.material || mat);
  mesh.add(bones.hips); mesh.bind(new THREE.Skeleton(NAMES.map(n => bones[n])));
  const root = new THREE.Group(); root.add(mesh);
  if (show) root.add(new THREE.SkeletonHelper(mesh));
  if (gear) {
    // a sword in the right fist (blade forward along +z), a shield on the left forearm, a helmet on the head
    const steel = new THREE.MeshStandardMaterial({ color: 0xd8dde2, metalness: .6, roughness: .3 }), gold = new THREE.MeshStandardMaterial({ color: 0xe0b040, metalness: .5, roughness: .4 }), leather = new THREE.MeshStandardMaterial({ color: 0x5a3a20 });
    const sw = new THREE.Group(); sw.position.set(-.08, 0, 0);
    sw.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(.05, .05, .2), leather), {}));
    const guard = new THREE.Mesh(new THREE.BoxGeometry(.06, .3, .05), gold); guard.position.z = .12; sw.add(guard);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(.1, .03, .75), steel); blade.position.z = .5; sw.add(blade);
    bones.hand_R.add(sw);
    // the shield: gripped in the left fist, its face along the hand's +z, its long side along +y.
    // Which way both point is set per pose (see aimGear): the wrist turns to match.
    const sh = new THREE.Group(); sh.position.set(.09, 0, .08); bones.hand_L.add(sh);
    sh.add(new THREE.Mesh(new THREE.BoxGeometry(.5, .7, .06), new THREE.MeshStandardMaterial({ color: 0x2f62c8, roughness: .6 })));
    const boss = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 8), gold); boss.position.z = .04; sh.add(boss);
    // the helmet: a cap over the hair, its rim just above the brows (placeholder until the real one)
    const helm = new THREE.Mesh(new THREE.SphereGeometry(.37, 24, 14, 0, Math.PI * 2, 0, Math.PI * .5), steel); helm.position.set(0, .32, -.02); helm.scale.set(1.02, 1.0, 1.1); bones.head.add(helm);
    const crest = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x2f62c8 })); crest.scale.set(.05, .2, .28); crest.position.set(0, .68, -.03); bones.head.add(crest);
  }
  return { root, mesh, bones, x0 };
}

// armour regions: the shoulder guards ride the upper arms; the cuirass the chest and spine; the belt
// and the hanging strips the hips, the strips' lower ends partly following the legs (like the skirt)
function armourWeights(x, y) {
  const ax = Math.abs(x), S = x < 0 ? '_R' : '_L', w = {};
  const add = (b, v) => { if (v > 0) w[b] = (w[b] || 0) + v; };
  const arm = y > -.2 ? sm((ax - .23) / .07) : 0;
  if (y > -.05) { add('chest', 1 - arm); add('upperArm' + S, arm); }
  else if (y > -.27) { const s = sm((y + .27) / .22); add('spine', (1 - s) * (1 - arm)); add('chest', s * (1 - arm)); add('upperArm' + S, arm); }
  else { const lw = sm((-.36 - y) / .2) * .5; add('hips', 1 - lw); add('thigh' + S, lw); }
  return w;
}
// fit a generated armour (its own scale, centred on itself) over the body, and skin it to the same
// skeleton. fit: scale per axis and where its neck rim and belt land. Its shoulder guards were made for
// arms hanging at `armAngle` below level, so that's the pose it's bound in: they follow the arms from there.
export function addArmour(R, srcGeo, material, { s = [.5, .4375, .48], src = { yNeck: .82, yBelt: -.3, zMid: .03 }, dst = { yNeck: .23, yBelt: -.29, zMid: .018 }, armAngle = .75 } = {}) {
  const geo = srcGeo.clone(), pos = geo.attributes.position;
  const sy = (dst.yNeck - dst.yBelt) / (src.yNeck - src.yBelt);
  let xmin = 1e9, xmax = -1e9; for (let i = 0; i < pos.count; i++) { const x = pos.getX(i); xmin = Math.min(xmin, x); xmax = Math.max(xmax, x); }
  const ax0 = (xmin + xmax) / 2;
  for (let i = 0; i < pos.count; i++) pos.setXYZ(i, (pos.getX(i) - ax0) * s[0], (pos.getY(i) - src.yBelt) * sy + dst.yBelt, (pos.getZ(i) - src.zMid) * s[2] + dst.zMid);
  geo.computeVertexNormals(); geo.computeBoundingSphere();
  skinWeights(geo, armourWeights);
  const mesh = new THREE.SkinnedMesh(geo, material); R.root.add(mesh);
  // bind with the arms at the guards' angle, then back to whatever pose they were in
  const keep = Object.fromEntries(Object.entries(R.bones).map(([n, b]) => [n, b.quaternion.clone()]));
  for (const b of Object.values(R.bones)) b.quaternion.identity();
  R.bones.upperArm_R.rotation.set(0, 0, armAngle); R.bones.upperArm_L.rotation.set(0, 0, -armAngle);
  R.root.updateMatrixWorld(true);
  mesh.bind(new THREE.Skeleton(NAMES.map(n => R.bones[n])), mesh.matrixWorld);
  for (const [n, q] of Object.entries(keep)) R.bones[n].quaternion.copy(q);
  R.root.updateMatrixWorld(true);
  // tuck the body in under the armour (unseen there), so the tunic never pokes through the chest plate
  const bp = R.mesh.geometry.attributes.position;
  for (let i = 0; i < bp.count; i++) {
    const x = bp.getX(i), y = bp.getY(i), z = bp.getZ(i);
    const ax = Math.abs(x);
    if (y < -.32 || y > .22 || ax > .52) continue;
    if (ax <= .3) { // the chest and back: in toward the spine, full under the plate, easing out at the collar
      const k = .8 + .2 * sm((y - .15) / .07);
      bp.setXYZ(i, x * k, y, dst.zMid + (z - dst.zMid) * k);
    } else if (y > -.12) { // the shoulder and upper arm under the guard: in toward the arm's line
      const k = .82 + .18 * sm((ax - .44) / .08);
      bp.setXYZ(i, x, y * k, z * k);
    }
  }
  bp.needsUpdate = true; R.mesh.geometry.computeBoundingSphere();
  R.armour = mesh; return mesh;
}

// poses: bone -> [x, y, z] rotation (radians, in the parent's frame); and where the gear points, in
// the character's frame (+z forward, +y up, -x his right): blade (the sword's direction), face (the way
// the shield's front faces) and up (the shield's long side). The wrists turn to match.
export const POSES = {
  tpose: {},
  rest: { upperArm_R: [0, 0, 1.25], upperArm_L: [0, 0, -1.25], foreArm_R: [0, .5, 0], foreArm_L: [0, -.5, 0], blade: [-.15, .75, .65], face: [.35, 0, 1], up: [0, 1, 0] },
  windup: { chest: [0, .45, 0], spine: [-.05, .15, 0], upperArm_R: [0, -.6, -.35], foreArm_R: [0, 1.7, 0], upperArm_L: [0, -.9, 1.0], foreArm_L: [0, -.6, 0], thigh_R: [.25, 0, 0], thigh_L: [-.35, 0, 0], shin_L: [.4, 0, 0], blade: [-.35, .55, -.75], face: [.2, 0, 1], up: [0, 1, 0] },
  strike: { chest: [0, -.5, 0], spine: [.15, -.2, 0], hips: [0, -.15, 0], upperArm_R: [0, 1.1, .3], foreArm_R: [0, .15, 0], upperArm_L: [0, -.3, -1.1], thigh_R: [-.6, 0, 0], shin_R: [.5, 0, 0], thigh_L: [.35, 0, 0], blade: [.9, .05, .45], face: [.5, 0, .9], up: [0, 1, 0] },
  thrust: { spine: [.2, 0, 0], upperArm_R: [0, 1.45, .1], foreArm_R: [0, 0, 0], upperArm_L: [0, -.8, -.9], foreArm_L: [0, -.6, 0], thigh_R: [-.7, 0, 0], shin_R: [.6, 0, 0], thigh_L: [.4, 0, 0], blade: [0, .03, 1], face: [.3, 0, 1], up: [0, 1, 0] },
  overhead: { spine: [-.15, 0, 0], upperArm_R: [0, -.3, -1.35], foreArm_R: [0, 1.6, 0], upperArm_L: [0, -.6, .8], foreArm_L: [0, -.5, 0], blade: [0, .45, -.9], face: [.2, 0, 1], up: [0, 1, 0] },
  block: { upperArm_L: [0, -1.25, .2], foreArm_L: [0, -.9, 0], upperArm_R: [0, .2, 1.0], foreArm_R: [0, .6, 0], spine: [.1, 0, 0], blade: [-.3, .7, .65], face: [0, 0, 1], up: [0, 1, 0] },
  walk: { upperArm_R: [0, 0, 1.2], upperArm_L: [0, 0, -1.2], thigh_R: [-.6, 0, 0], shin_R: [.7, 0, 0], thigh_L: [.45, 0, 0], shin_L: [.3, 0, 0], foot_L: [-.3, 0, 0], blade: [-.15, .75, .65], face: [.35, 0, 1], up: [0, 1, 0] },
};
const _qp = new THREE.Quaternion(), _qm = new THREE.Quaternion(), _qd = new THREE.Quaternion(), _m = new THREE.Matrix4(), _x = new THREE.Vector3(), _y = new THREE.Vector3(), _z = new THREE.Vector3();
// turn a bone so its frame matches a wanted orientation, given in the character's frame
function aimBone(R, bone, qChar) {
  R.mesh.getWorldQuaternion(_qm); _qd.copy(_qm).multiply(qChar);
  bone.parent.getWorldQuaternion(_qp); bone.quaternion.copy(_qp.invert().multiply(_qd)); bone.updateMatrixWorld(true);
}
// the wrists: the sword hand so the blade (its +z) points along `blade`; the shield hand so the shield's
// front (+z) faces `face` with its long side (+y) toward `up`
export function aimGear(R, P) {
  R.root.updateMatrixWorld(true);
  const blade = _z.fromArray(P.blade || [-.15, .75, .65]).normalize();
  aimBone(R, R.bones.hand_R, new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), blade));
  _z.fromArray(P.face || [.3, 0, 1]).normalize(); _y.fromArray(P.up || [0, 1, 0]); _y.addScaledVector(_z, -_y.dot(_z)).normalize(); _x.crossVectors(_y, _z);
  aimBone(R, R.bones.hand_L, new THREE.Quaternion().setFromRotationMatrix(_m.makeBasis(_x, _y, _z)));
}
export function applyPose(R, P) {
  for (const n in R.bones) { const r = P[n] || [0, 0, 0]; R.bones[n].rotation.set(r[0], r[1], r[2]); }
  aimGear(R, P);
}
