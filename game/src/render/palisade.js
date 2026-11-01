// Fortify, drawn: each castle's palisade of sharpened logs (standing once bought, a section at a time
// knocked flat when it's breached, with a burst of dust and splinters) and its gate towers (the second
// level): a raised platform on four posts under a little roof. The Wooden Fort draws its own towers.
import * as THREE from 'three';
import { FORT } from '../config.js';
import { G } from '../core/state.js';
import { terrainMeshY, mulberry } from '../core/world.js';
import { woodTex, uvScale } from './look.js';
import { dust, spark } from './effects.js';

const logMat = new THREE.MeshLambertMaterial({ color: 0x6a4b33, map: woodTex() }), roofMat = new THREE.MeshLambertMaterial({ color: 0x8a5a32 });
let P = null; // { logs, tips, items: [[i, c, k]], sig: [], towers: [[group per tower] per castle] }
const mx = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3();
export function buildPalisades(world, L) {
  P = null; if (!L.pal) return;
  const R = mulberry(31), items = [];
  for (const p of L.pal) for (const o of p.obs) items.push({ o, sy: .9 + R() * .25, rot: R() * 3 });
  const logs = new THREE.InstancedMesh(uvScale(new THREE.CylinderGeometry(.32, .36, 1, 7), 1, 2), logMat, Math.max(1, items.length));
  const tips = new THREE.InstancedMesh(new THREE.ConeGeometry(.34, .55, 7), logMat, Math.max(1, items.length));
  for (const m of [logs, tips]) { m.castShadow = true; m.receiveShadow = true; m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); world.add(m); }
  mx.compose(v.set(0, -50, 0), q.identity(), s.set(.001, .001, .001)); for (let i = 0; i < items.length; i++) { logs.setMatrixAt(i, mx); tips.setMatrixAt(i, mx); } // (nothing stands until it's built)
  // gate towers (not on the Wooden Fort, which has its own watchtowers at every gate)
  const towers = L.pal.map(p => L.fortStart ? [] : p.towers.map(t => {
    const g = new THREE.Group(), y = terrainMeshY(t.x, t.z);
    for (const [px, pz] of [[-.9, -.9], [.9, -.9], [-.9, .9], [.9, .9]]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(.16, .2, 5, 6), logMat); post.position.set(px, 2.5, pz); g.add(post); }
    const deck = new THREE.Mesh(new THREE.BoxGeometry(2.6, .3, 2.6), logMat); deck.position.y = 4.4; g.add(deck);
    for (const [px, pz, w, d] of [[0, -1.25, 2.6, .15], [0, 1.25, 2.6, .15], [-1.25, 0, .15, 2.6], [1.25, 0, .15, 2.6]]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(w, .7, d), logMat); rail.position.set(px, 4.9, pz); g.add(rail); }
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.2, 1.5, 4), roofMat); roof.position.y = 6.4; roof.rotation.y = Math.PI / 4; g.add(roof);
    g.position.set(t.x, y, t.z); g.visible = false; g.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); world.add(g); return g;
  }));
  P = { logs, tips, items, sig: [], towers, L };
  updatePalisades(true);
}
// re-lays the logs whenever a castle's palisade goes up or loses a section (cheap the rest of the time)
export function updatePalisades(force) {
  if (!P || !G.forts) return;
  let dirty = false;
  for (let c = 0; c < 4; c++) {
    const lv = (G.teams[c] && G.teams[c].up && G.teams[c].up.fort) || 0, f = G.forts[c]; if (!f) continue;
    const sig = lv + ':' + f.broken; if (!force && sig === P.sig[c]) continue;
    // a section that has just gone down: dust and splinters where it stood
    const was = P.sig[c] ? +P.sig[c].split(':')[1] : 0, fresh = f.broken & ~was;
    if (fresh && !force) for (const it of P.items) if (it.o.c === c && ((fresh >> it.o.k) & 1) && Math.random() < .35) { dust(it.o.x, it.o.z); spark(it.o.x, terrainMeshY(it.o.x, it.o.z) + 1.5, it.o.z, '#8a6a46', 3); }
    P.sig[c] = sig; dirty = true;
    for (const t of P.towers[c] || []) t.visible = lv >= 2;
  }
  if (!dirty) return;
  P.items.forEach((it, i) => {
    const o = it.o, up = !o.off, y = terrainMeshY(o.x, o.z), h = FORT.h * it.sy;
    if (up) {
      e.set(0, it.rot, 0); q.setFromEuler(e); mx.compose(v.set(o.x, y + h / 2, o.z), q, s.set(1, h, 1)); P.logs.setMatrixAt(i, mx);
      mx.compose(v.set(o.x, y + h + .27, o.z), q, s.set(1, 1, 1)); P.tips.setMatrixAt(i, mx);
    } else if ((G.forts[o.c].broken >> o.k) & 1 && ((G.teams[o.c].up.fort) || 0) >= 1) { // broken: logs lying flat, every other one
      e.set(Math.PI / 2, it.rot * 2, 0); q.setFromEuler(e); mx.compose(v.set(o.x, y + .3, o.z), q, s.set(1, i % 2 ? h : .001, 1)); P.logs.setMatrixAt(i, mx);
      mx.compose(v.set(o.x, y - 5, o.z), q, s.set(.001, .001, .001)); P.tips.setMatrixAt(i, mx);
    } else { mx.compose(v.set(o.x, y - 5, o.z), q.identity(), s.set(.001, .001, .001)); P.logs.setMatrixAt(i, mx); P.tips.setMatrixAt(i, mx); }
  });
  P.logs.instanceMatrix.needsUpdate = true; P.tips.instanceMatrix.needsUpdate = true;
}
