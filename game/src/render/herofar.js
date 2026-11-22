// Distant soldiers and archers, drawn in batches. (SPLIT2: from heroes.js)
import * as THREE from 'three';
import { G } from '../core/state.js';
import { scene } from './scene.js';
import { teamMaterial } from './rig/captainrig.js';
import { on, SRC, heroesOn, hexOf, SCALE, SOLDIER_SCALE } from './heroload.js';

// distant soldiers and archers: one batch per team of the low-detail new soldier, standing (no
// skeleton), with a stride bob and a lean when moving. Hundreds cost a few draw calls.
const FAR_MAX = 600, far = new Map(); let farReset = true, farDrawn = false;
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _e = new THREE.Euler();
function farBatch(hex, kind) {
  const L = kind === 'foot' ? SRC.spearLod : kind === 'arch' ? SRC.archLod : kind === 'sword' ? SRC.swordLod : null, key = hex + (L ? kind : ''); let b = far.get(key);
  if (!b) { b = new THREE.InstancedMesh(L ? L.geo : SRC.lod, L ? L.mats(hex) : teamMaterial(SRC.soldierMat, hex, .26), FAR_MAX); b.count = 0; b.frustumCulled = false; b.castShadow = true; scene.add(b); far.set(key, b); }
  return b;
}
// a distant archer's hood: a rounded cap in his army's colour with its point, over the helmet (as up close)
let HOOD_GEO = null; const HOOD_AT = new THREE.Matrix4().makeTranslation(0, .6, -.04), _m2 = new THREE.Matrix4();
function farHoodBatch(hex) {
  let b = far.get(hex + 'h');
  if (!b) {
    if (!HOOD_GEO) { HOOD_GEO = new THREE.SphereGeometry(.43, 10, 6, 0, Math.PI * 2, 0, Math.PI * .55); const t = new THREE.ConeGeometry(.17, .42, 8); t.translate(0, .55, .04); HOOD_GEO = mergeTwo(HOOD_GEO, t); }
    b = new THREE.InstancedMesh(HOOD_GEO, new THREE.MeshStandardMaterial({ color: hex, roughness: .9 }), FAR_MAX); b.count = 0; b.frustumCulled = false; b.castShadow = true; scene.add(b); far.set(hex + 'h', b);
  }
  return b;
}
const mergeTwo = (a, b) => { const g = new THREE.BufferGeometry(), A = a.toNonIndexed(), B = b.toNonIndexed(); for (const k of ['position', 'normal']) { const x = A.attributes[k].array, y = B.attributes[k].array, z = new Float32Array(x.length + y.length); z.set(x); z.set(y, x.length); g.setAttribute(k, new THREE.BufferAttribute(z, 3)); } return g; };
let FAR_ON = true; try { FAR_ON = new URLSearchParams(location.search).get('far') !== '0'; } catch (e) { /* on */ } // (?far=0: the old figures far off, for comparison)
export function drawFar(u, a) {
  if (!FAR_ON) return false;
  if (u.dead || u.hidden || u.mounted || (u.kind !== 'foot' && u.kind !== 'arch' && u.kind !== 'sword')) return false; // (C2b: swordsmen too)
  if (on && !SRC) return true; // (still loading: hidden rather than the old figure)
  if (!heroesOn()) return false;
  if (farReset) { for (const b of far.values()) b.count = 0; farReset = false; }
  const b = farBatch(hexOf(u), u.kind); if (b.count >= FAR_MAX) return false;
  const sc = SCALE * SOLDIER_SCALE, sp = Math.hypot(u.vx || 0, u.vz || 0), moving = sp > .3;
  const bob = moving ? Math.abs(Math.sin(G.T * 9 + (u.id || 0) * 1.7)) * .08 : 0;
  _p.set(u.x, (u.y || 0) + (a.lift || 0) - (a.sink || 0) + .998 * sc + bob, u.z);
  _e.set(moving ? .12 : 0, u.face + (a.yaw || 0), 0, 'YXZ'); _q.setFromEuler(_e); _s.setScalar(sc);
  b.setMatrixAt(b.count++, _m.compose(_p, _q, _s)); farDrawn = true;
  if (u.kind === 'arch' && !SRC.archLod) { const hb = farHoodBatch(hexOf(u)); if (hb.count < FAR_MAX) hb.setMatrixAt(hb.count++, _m2.multiplyMatrices(_m, HOOD_AT)); }
  return true;
}
// after a frame's drawing: the batches sent for this frame, refilled from the next
export function sweepFar() {
  if (farDrawn) { for (const b of far.values()) b.instanceMatrix.needsUpdate = true; } else for (const b of far.values()) b.count = 0;
  farDrawn = false; farReset = true;
}
