// Batched soldier drawing. Every body part of every soldier is one instance in a shared
// InstancedMesh per part type, so 100+ soldiers cost about 15 draw calls instead of thousands.
// Each soldier has a small skeleton (root, body, legs, arms, spear) posed every frame from the
// same animation rules as the first version.
import * as THREE from 'three';
import { TEAMS } from '../config.js';
import { G, isEnemyTi, isFfa } from '../core/state.js';
import { braced } from '../core/sim.js';
import { scene } from './scene.js';

const MAX_UNITS = 320;

const GEO = {
  leg: new THREE.CylinderGeometry(.15, .13, .7, 7),
  torso: new THREE.CylinderGeometry(.42, .36, .78, 10),
  belt: new THREE.CylinderGeometry(.43, .43, .14, 10),
  head: new THREE.SphereGeometry(.4, 14, 10),
  helm: new THREE.SphereGeometry(.44, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2),
  cone: new THREE.ConeGeometry(.44, .7, 12),
  hood: new THREE.SphereGeometry(.45, 12, 8, 0, Math.PI * 2, 0, Math.PI * .6),
  crest: new THREE.BoxGeometry(.1, .22, .62),
  face: new THREE.PlaneGeometry(.5, .26),
  arm: new THREE.CylinderGeometry(.11, .1, .55, 6),
  blade: new THREE.BoxGeometry(.07, .07, 1.0),
  guard: new THREE.BoxGeometry(.32, .06, .06),
  shaft: new THREE.CylinderGeometry(.04, .04, 3.0, 5),
  tip: new THREE.ConeGeometry(.09, .35, 5),
  bow: new THREE.TorusGeometry(.6, .035, 5, 14, Math.PI),
  quiver: new THREE.CylinderGeometry(.13, .11, .7, 6),
  shield: new THREE.CylinderGeometry(.52, .52, .09, 18),
  boss: new THREE.SphereGeometry(.12, 8, 6),
  shadow: new THREE.CircleGeometry(.62, 14),
  ring: new THREE.RingGeometry(.8, 1.0, 24),
  cape: new THREE.PlaneGeometry(.9, 1.1),
};

const faceTex = (() => {
  const c = document.createElement('canvas'); c.width = 128; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#1b1512';
  x.beginPath(); x.ellipse(40, 26, 7, 9, 0, 0, Math.PI * 2); x.ellipse(88, 26, 7, 9, 0, 0, Math.PI * 2); x.fill();
  x.lineWidth = 7; x.lineCap = 'round'; x.strokeStyle = '#1b1512';
  x.beginPath(); x.moveTo(24, 10); x.lineTo(54, 17); x.moveTo(104, 10); x.lineTo(74, 17); x.stroke();
  x.beginPath(); x.moveTo(64, 48); x.quadraticCurveTo(44, 42, 30, 56); x.quadraticCurveTo(46, 50, 64, 54); x.quadraticCurveTo(82, 50, 98, 56); x.quadraticCurveTo(84, 42, 64, 48); x.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.NoColorSpace; return t;
})();

// Plain materials are white and take their color from each instance (skin, team color, wood...).
export const MAT = {
  plain: new THREE.MeshLambertMaterial({ color: 0xffffff }),
  plain2: new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
  helm: new THREE.MeshPhongMaterial({ color: 0xb8bcc4, shininess: 70, specular: 0x888888 }),
  steel: new THREE.MeshPhongMaterial({ color: 0xd8dce2, shininess: 90, specular: 0xaaaaaa }),
  shadow: new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .28, depthWrite: false }),
  ring: new THREE.MeshBasicMaterial({ color: 0xffcf3a, transparent: true, opacity: .8, side: THREE.DoubleSide, depthWrite: false }),
  ringAlly: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .45, side: THREE.DoubleSide, depthWrite: false }),
  face: new THREE.MeshBasicMaterial({ map: faceTex, transparent: true, depthWrite: false }),
};

const C = {
  skin: new THREE.Color(0xf0dcc8), belt: new THREE.Color(0x5a3b22), wood: new THREE.Color(0x6b4a2e), gold: new THREE.Color(0xffcf3a),
  team: TEAMS.map(t => new THREE.Color(t.hex)), dark: TEAMS.map(t => new THREE.Color(t.hex).multiplyScalar(.7)),
};

// ---------- part list ----------
const e = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));
const isCap = k => k === 'captain', isFootLike = k => k === 'foot' || k === 'captain';
const PARTS = [
  // bone, geometry, material, local transform, which kinds, color
  { bone: 'root', geo: 'shadow', mat: 'shadow', m: e(0, .03, 0, -Math.PI / 2) },
  { bone: 'root', geo: 'ring', mat: 'ring', m: e(0, .05, 0, -Math.PI / 2), when: (u, r) => r === 'me' },
  { bone: 'root', geo: 'ring', mat: 'ringAlly', m: e(0, .05, 0, -Math.PI / 2), when: (u, r) => r === 'ally' },
  { bone: 'legL', geo: 'leg', mat: 'plain', m: e(0, -.35, 0), col: u => C.dark[u.ti] },
  { bone: 'legR', geo: 'leg', mat: 'plain', m: e(0, -.35, 0), col: u => C.dark[u.ti] },
  { bone: 'body', geo: 'torso', mat: 'plain', m: e(0, 1.08, 0), col: u => u.kind === 'arch' ? C.dark[u.ti] : C.skin },
  { bone: 'body', geo: 'belt', mat: 'plain', m: e(0, .76, 0), col: u => C.team[u.ti] },
  { bone: 'body', geo: 'head', mat: 'plain', m: e(0, 1.78, 0), col: () => C.skin },
  { bone: 'body', geo: 'face', mat: 'face', m: e(0, 1.73, .39) },
  { bone: 'body', geo: 'hood', mat: 'plain', m: e(0, 1.82, -.02), kinds: k => k === 'arch', col: u => C.team[u.ti] },
  { bone: 'body', geo: 'quiver', mat: 'plain', m: e(.2, 1.25, -.42, 0, 0, .4), kinds: k => k === 'arch', col: () => C.belt },
  { bone: 'body', geo: 'cone', mat: 'helm', m: e(0, 2.12, 0), kinds: k => k === 'spear' },
  { bone: 'body', geo: 'belt', mat: 'plain', m: e(0, 1.9, 0, 0, 0, 0, 1.02, .7, 1.02), kinds: k => k === 'spear', col: u => C.team[u.ti] },
  { bone: 'body', geo: 'helm', mat: 'helm', m: e(0, 1.86, 0), kinds: isFootLike },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.36, 0), kinds: k => k === 'foot', col: u => C.team[u.ti] },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.36, 0, 0, 0, 0, 1.3, 1.6, 1.4), kinds: isCap, col: () => C.gold },
  { bone: 'body', geo: 'cape', mat: 'plain2', m: e(0, 1.02, -.44, .12), kinds: isCap, col: u => C.team[u.ti] },
  { bone: 'sArm', geo: 'arm', mat: 'plain', m: e(0, -.22, 0), col: () => C.skin },
  { bone: 'wArm', geo: 'arm', mat: 'plain', m: e(0, -.22, 0), col: () => C.skin },
  { bone: 'sArm', geo: 'shield', mat: 'plain', m: e(0, -.3, .34, Math.PI / 2), kinds: isFootLike, col: u => C.team[u.ti] },
  { bone: 'sArm', geo: 'boss', mat: 'steel', m: e(0, -.3, .4), kinds: isFootLike },
  { bone: 'wArm', geo: 'guard', mat: 'plain', m: e(0, -.5, .12), kinds: isFootLike, col: () => C.belt },
  { bone: 'wArm', geo: 'blade', mat: 'steel', m: e(0, -.5, .6), kinds: isFootLike },
  { bone: 'spear', geo: 'shaft', mat: 'plain', m: e(0, 0, .6, Math.PI / 2), kinds: k => k === 'spear', col: () => C.wood },
  { bone: 'spear', geo: 'tip', mat: 'steel', m: e(0, 0, 2.2, Math.PI / 2), kinds: k => k === 'spear' },
  { bone: 'sArm', geo: 'bow', mat: 'plain', m: e(0, -.48, .2, 0, Math.PI / 2, Math.PI / 2), kinds: k => k === 'arch', col: () => C.wood },
];

// One InstancedMesh per (geometry, material) pair.
const batches = new Map();
for (const p of PARTS) {
  const key = p.geo + '|' + p.mat;
  let b = batches.get(key);
  if (!b) {
    b = { perUnit: 0, n: 0, mesh: null, geo: p.geo, mat: p.mat };
    batches.set(key, b);
  }
  b.perUnit++;
  p.batch = b;
}
for (const b of batches.values()) {
  const m = new THREE.InstancedMesh(GEO[b.geo], MAT[b.mat], b.perUnit * MAX_UNITS);
  m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  if (b.mat === 'plain' || b.mat === 'plain2') { m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(b.perUnit * MAX_UNITS * 3), 3); m.instanceColor.setUsage(THREE.DynamicDrawUsage); }
  m.frustumCulled = false; m.count = 0;
  if (b.mat === 'shadow' || b.mat.startsWith('ring')) m.renderOrder = 1;
  scene.add(m); b.mesh = m;
}
export const drawCalls = () => [...batches.values()].filter(b => b.mesh.count > 0).length;

// ---------- per-unit animation state ----------
const anim = new WeakMap();
function stateOf(u) {
  let a = anim.get(u);
  if (!a) {
    a = { walk: Math.random() * 6, bodyY: 0, bodyRX: 0, legL: [0, 0, 0], legR: [0, 0, 0], sArmX: 0, sArmPX: .5, wArmX: 0, wArmZ: 0, spearRX: 0, spearZ: 0 };
    anim.set(u, a);
  }
  return a;
}
export const ringFor = u => {
  if (u.kind !== 'captain') return null;
  if (u.ti === G.myTi) return 'me';
  if (!isFfa() && !isEnemyTi(u.ti, G.myTi)) return 'ally';
  return null;
};

// Advances one soldier's pose (same rules as the first version's animUnits).
function pose(u, dt) {
  const a = stateOf(u);
  if (u.dead) {
    const k = Math.min(1, u.deadT / .45);
    a.bodyY = 0; a.legL[0] = a.legL[1] = a.legL[2] = 0; a.legR[0] = a.legR[1] = a.legR[2] = 0;
    a.bodyRX = -k * Math.PI / 2 * .95 * (u.fallDir || 1);
    a.wArmX = -1.2; a.sArmX = -.8;
    a.sink = u.deadT > 10 ? Math.min(1.5, (u.deadT - 10) * .4) : 0;
    return a;
  }
  a.sink = 0;
  const sp = Math.hypot(u.vx, u.vz);
  if (u.mounted) {
    a.bodyY = 1.02 + .03 * Math.sin(a.walk * 2);
    a.legL[0] = -.9; a.legL[1] = 0; a.legL[2] = .55; a.legR[0] = -.9; a.legR[1] = 0; a.legR[2] = -.55;
    a.bodyRX = 0;
    a.walk += dt * sp * .9;
  } else {
    a.walk += dt * sp * 2.2;
    const sw = Math.sin(a.walk) * Math.min(1, sp / 3) * .7;
    a.legL[0] = sw; a.legL[1] = a.legL[2] = 0; a.legR[0] = -sw; a.legR[1] = a.legR[2] = 0;
    a.bodyY = Math.abs(Math.cos(a.walk)) * Math.min(1, sp / 3) * .08;
    a.bodyRX = u.stun > 0 ? -.25 : Math.min(.15, sp * .02);
  }
  const t = u.swing > 0 ? 1 - u.swing / .38 : -1;
  if (u.kind === 'spear') {
    const lowered = braced(u) || u.swing > 0;
    a.wArmX += ((lowered ? -1.45 : -.35) - a.wArmX) * Math.min(1, dt * 10);
    a.spearRX = lowered ? 1.45 : -.2;
    a.spearZ = t >= 0 ? Math.sin(t * Math.PI) * .8 : 0;
    a.sArmX += (-.6 - a.sArmX) * Math.min(1, dt * 8);
  } else if (u.kind === 'arch') {
    a.sArmX += ((u.aim ? -1.5 : -.3) - a.sArmX) * Math.min(1, dt * 10);
    a.wArmX += ((u.aim ? (t >= 0 ? -1.2 : -1.5) : -.35) - a.wArmX) * Math.min(1, dt * 12);
  } else {
    if (t >= 0) {
      a.wArmX = t < .35 ? -.35 - 2.65 * (t / .35) : -3.0 + 2.2 * Math.min(1, (t - .35) / .3);
      a.wArmZ = u.mounted ? -.9 : -.3;
    } else { a.wArmX += (-.35 - a.wArmX) * Math.min(1, dt * 10); a.wArmZ = 0; }
    const blocking = ((u.human && u.blocking) || u.blockT > 0) && !u.mounted;
    a.sArmX += ((blocking ? -1.35 : u.carrying ? -.1 : -.35) - a.sArmX) * Math.min(1, dt * 14);
    a.sArmPX = blocking ? .28 : .5;
  }
  return a;
}

// ---------- bones ----------
const M = { root: new THREE.Matrix4(), body: new THREE.Matrix4(), legL: new THREE.Matrix4(), legR: new THREE.Matrix4(), sArm: new THREE.Matrix4(), wArm: new THREE.Matrix4(), spear: new THREE.Matrix4() };
const tmp = new THREE.Matrix4(), out = new THREE.Matrix4(), eu = new THREE.Euler(), qq = new THREE.Quaternion(), vp = new THREE.Vector3(), vs = new THREE.Vector3();
function local(x, y, z, rx, ry, rz) { eu.set(rx, ry, rz); qq.setFromEuler(eu); return tmp.compose(vp.set(x, y, z), qq, vs.set(1, 1, 1)); }
function bones(u, a) {
  const s = u.kind === 'captain' ? 1.18 : 1;
  eu.set(0, u.face, 0); qq.setFromEuler(eu);
  M.root.compose(vp.set(u.x, u.y - (a.sink || 0), u.z), qq, vs.set(s, s, s));
  M.body.multiplyMatrices(M.root, local(0, a.bodyY, 0, a.bodyRX, 0, 0));
  M.legL.multiplyMatrices(M.body, local(-.18, .7, 0, a.legL[0], a.legL[1], a.legL[2]));
  M.legR.multiplyMatrices(M.body, local(.18, .7, 0, a.legR[0], a.legR[1], a.legR[2]));
  M.sArm.multiplyMatrices(M.body, local(a.sArmPX, 1.3, .05, a.sArmX, 0, 0));
  M.wArm.multiplyMatrices(M.body, local(-.5, 1.3, .05, a.wArmX, 0, a.wArmZ));
  if (u.kind === 'spear') M.spear.multiplyMatrices(M.wArm, local(0, -.48, a.spearZ, a.spearRX, 0, 0));
}

// Poses and draws every soldier in the list.
export function drawSoldiers(units, dt) {
  for (const b of batches.values()) b.n = 0;
  let drawn = 0;
  for (const u of units) {
    if (u.hidden) continue;
    if (drawn >= MAX_UNITS) break;
    drawn++;
    const a = pose(u, dt);
    bones(u, a);
    const ring = ringFor(u);
    for (const p of PARTS) {
      if (p.kinds && !p.kinds(u.kind)) continue;
      if (p.when && !p.when(u, ring)) continue;
      const b = p.batch, i = b.n++;
      out.multiplyMatrices(M[p.bone], p.m);
      b.mesh.setMatrixAt(i, out);
      if (p.col) b.mesh.setColorAt(i, p.col(u));
    }
  }
  for (const b of batches.values()) {
    b.mesh.count = b.n;
    if (!b.n) continue;
    // upload only the instances in use, not the whole buffer
    const im = b.mesh.instanceMatrix; im.clearUpdateRanges(); im.addUpdateRange(0, b.n * 16); im.needsUpdate = true;
    const ic = b.mesh.instanceColor; if (ic) { ic.clearUpdateRanges(); ic.addUpdateRange(0, b.n * 3); ic.needsUpdate = true; }
  }
}
