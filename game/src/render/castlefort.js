// Fortify you can see: each Crown castle changes as its gates are upgraded. Level I: timber posts and a
// lintel over the main gate, and a wooden hoarding (a covered walk) round the wall top. Level II: a
// timber gallery round each of the four corner towers, which shoot from then on. Level III: an iron
// portcullis in the main gate (lifted when it's broken) and murder holes over it. The pieces are built
// once per castle and shown or hidden as its level changes.
import * as THREE from 'three';
import { G } from '../core/state.js';
import { terrainMeshY } from '../core/world.js';

let forts = [];
const WOOD = new THREE.MeshLambertMaterial({ color: 0x6f5232 }), IRON = new THREE.MeshLambertMaterial({ color: 0x3a3634 }), DARK = new THREE.MeshLambertMaterial({ color: 0x141210 });
const box = (w, h, d, m, x, y, z) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); return b; };

export function buildCastleFort(world, L) {
  forts = [];
  for (const cw of (L && L.cwalls) || []) {
    const h = L.holds[cw.hid], R0 = cw.r, g = cw.gates[0], cy = terrainMeshY(cw.x, cw.z);
    // the main gate: posts and a lintel (level I), a portcullis and murder holes (level III)
    const gate = new THREE.Group(), gx = cw.x + Math.cos(g) * R0, gz = cw.z + Math.sin(g) * R0;
    gate.position.set(gx, terrainMeshY(gx, gz), gz); gate.rotation.y = Math.PI / 2 - g; // (local x runs along the wall, local z out through the gate)
    const tag = (o, lv, portc) => { o.userData = { lv, portc: !!portc }; gate.add(o); };
    for (const px of [-3.6, 3.6]) tag(box(.5, 3.4, .5, WOOD, px, 1.7, 0), 1);
    tag(box(7.7, .45, .5, WOOD, 0, 3.3, 0), 1);
    for (let i = 0; i < 5; i++) tag(box(.14, 2.6, .14, IRON, -2.8 + i * 1.4, 1.5, 0), 3, true);
    for (const y of [.6, 1.5, 2.4]) tag(box(6, .14, .14, IRON, 0, y, 0), 3, true);
    for (const x of [-2, 0, 2]) tag(box(.8, .6, .9, DARK, x, 2.9, 0), 3);
    world.add(gate);
    // the hoarding round the wall top (level I) and a timber gallery round each corner tower (level II)
    const hoard = new THREE.Mesh(new THREE.CylinderGeometry(R0 + .4, R0 + .4, .5, 56, 1, true), new THREE.MeshLambertMaterial({ color: 0x6f5232, side: THREE.DoubleSide }));
    hoard.position.set(cw.x, cy + 3.0, cw.z); hoard.userData = { lv: 1 }; world.add(hoard);
    const parts = [gate, hoard], towers = [];
    for (let k = 0; k < 4; k++) {
      const b = h.towerA0 + k * Math.PI / 2, tx = cw.x + Math.cos(b) * 9.5, tz = cw.z + Math.sin(b) * 9.5;
      const gal = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, .3, 16), WOOD); gal.position.set(tx, terrainMeshY(tx, tz) + 3.4, tz); gal.userData = { lv: 2 }; world.add(gal);
      parts.push(gal);
    }
    forts.push({ hid: cw.hid, parts, gate });
  }
}

// show each castle's pieces for its current level; the portcullis lifts when the main gate is broken
export function updateCastleFort() {
  if (!forts.length || !G.cgates) return;
  for (const f of forts) {
    const st = G.cgates[f.hid], lv = (st && st.lv) | 0, down = !!(st && (st.broken & 1));
    for (const p of f.parts) if (p !== f.gate) p.visible = lv >= p.userData.lv;
    for (const c of f.gate.children) c.visible = lv >= c.userData.lv && !(c.userData.portc && down);
  }
}
