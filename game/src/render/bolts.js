// (FIX4) a castle's ballista bolt, made to be seen and felt (Arjun 17 Nov): a 2.2 m iron-headed shaft with a pale streak
// behind it, a deep twang when it looses, and where it lands a burst of dust and splinters and a heavy slam; close to
// you the camera jolts, and if it was you, harder. Every phone (the bolt flag rides with the arrows).
import * as THREE from 'three';
import { G, bus } from '../core/state.js';
import { groundY } from '../core/world.js';
import { scene } from './scene.js';
import { cam } from './camera.js';
import { sfx, buzz } from '../ui/audio.js';

const MAX = 16;
const shaftGeo = (() => { const g = new THREE.CylinderGeometry(.075, .075, 2.2, 6); g.rotateX(Math.PI / 2); return g; })();
const headGeo = (() => { const g = new THREE.ConeGeometry(.17, .5, 6); g.rotateX(Math.PI / 2); g.translate(0, 0, 1.3); return g; })();
const streakGeo = (() => { const g = new THREE.CylinderGeometry(.11, .02, 4, 6, 1, true); g.rotateX(Math.PI / 2); g.translate(0, 0, -3); return g; })();
const mk = (geo, mat) => { const m = new THREE.InstancedMesh(geo, mat, MAX); m.frustumCulled = false; m.count = 0; scene.add(m); return m; };
const shaft = mk(shaftGeo, new THREE.MeshLambertMaterial({ color: 0x5a3a20 }));
const head = mk(headGeo, new THREE.MeshLambertMaterial({ color: 0x2b2b30, emissive: 0x3a2a10 }));
const streak = mk(streakGeo, new THREE.MeshBasicMaterial({ color: 0xfff1c8, transparent: true, opacity: .45, depthWrite: false, blending: THREE.AdditiveBlending }));
const o3 = new THREE.Object3D();
export const boltStats = { drawn: 0, landed: 0, shots: 0 }; // (tests)

bus.on('boltShot', a => { if (a) { boltStats.shots++; sfx.bolt(a.x0, a.z0); } });
function land(a) {
  a.fxDone = true; boltStats.landed++; const y = groundY(a.x, a.z) + .4;
  bus.emit('spark', { x: a.x, y, z: a.z, c: '#d9c7a3', n: 14 }); bus.emit('spark', { x: a.x, y: y + .4, z: a.z, c: '#6b4a2a', n: 6 });
  sfx.boltHit(a.x, a.z);
  const p = G.player; if (!p || p.dead) return; const d = Math.hypot(p.x - a.x, p.z - a.z);
  if (d < 2) { cam.shake = Math.max(cam.shake, .7); buzz(60); } else if (d < 9) cam.shake = Math.max(cam.shake, .25 * (1 - d / 9) + .1);
}
export function drawBolts() {
  let n = 0;
  for (const a of G.arrows) {
    if (!a.bolt) continue;
    if (!a.fxDone && (a.done || a.stuck || a.t >= a.dur)) land(a);
    if (a.done || n >= MAX) continue;
    const dx = a.x - (a.px ?? a.x), dy = a.y - (a.py ?? a.y), dz = a.z - (a.pz ?? a.z);
    o3.position.set(a.x, a.y, a.z);
    if (dx || dy || dz) { o3.lookAt(a.x + dx + 1e-4, a.y + dy, a.z + dz); a.q = (a.q || new THREE.Quaternion()).copy(o3.quaternion); } else if (a.q) o3.quaternion.copy(a.q);
    o3.updateMatrix(); shaft.setMatrixAt(n, o3.matrix); head.setMatrixAt(n, o3.matrix);
    if (!a.stuck) streak.setMatrixAt(n, o3.matrix); else { o3.scale.set(0, 0, 0); o3.updateMatrix(); streak.setMatrixAt(n, o3.matrix); o3.scale.set(1, 1, 1); }
    n++;
  }
  boltStats.drawn = Math.max(boltStats.drawn, n);
  for (const m of [shaft, head, streak]) { m.count = n; m.visible = n > 0; m.instanceMatrix.needsUpdate = true; } // (none in flight: no draw calls)
}
