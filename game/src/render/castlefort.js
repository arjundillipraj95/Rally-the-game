// Fortify you can see: each Crown castle changes as its gates are upgraded. Level I: timber posts and a
// lintel over the main gate, and a wooden hoarding (a covered walk) round the wall top. Level II: a
// timber gallery round each of the four corner towers, which shoot from then on. Level III: an iron
// portcullis in the main gate (lifted when it's broken) and murder holes over it. The pieces are built
// once per castle and shown or hidden as its level changes.
import * as THREE from 'three';
import { keepLive, batchOn, abOn, abShow, mergeInto } from './batch.js';
import { G } from '../core/state.js';
import { terrainMeshY } from '../core/world.js';

let forts = [];
const WOOD = new THREE.MeshLambertMaterial({ color: 0x6f5232, side: THREE.DoubleSide }), // (two-sided for the open hoarding; a closed box looks the same either way, and they then draw together)
  IRON = new THREE.MeshLambertMaterial({ color: 0x3a3634 }), DARK = new THREE.MeshLambertMaterial({ color: 0x141210 });
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
    const hoard = new THREE.Mesh(new THREE.CylinderGeometry(R0 + .4, R0 + .4, .5, 56, 1, true), WOOD);
    hoard.position.set(cw.x, cy + 3.0, cw.z); hoard.userData = { lv: 1 }; world.add(hoard);
    const parts = [gate, hoard], towers = [];
    for (let k = 0; k < 4; k++) {
      const b = h.towerA0 + k * Math.PI / 2, tx = cw.x + Math.cos(b) * 9.5, tz = cw.z + Math.sin(b) * 9.5;
      const gal = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, .3, 16), WOOD); gal.position.set(tx, terrainMeshY(tx, tz) + 3.4, tz); gal.userData = { lv: 2 }; world.add(gal);
      parts.push(gal);
    }
    level3(parts, world, cw, h, cy); // (CASTLE2)
    keepLive(...parts); // (each piece shows by the castle's level)
    // F1a: the pieces that show together (by level, and the portcullis) drawn as one mesh per material
    const merged = [];
    if (batchOn()) {
      const tiers = new Map(), put = (o, lv, portc) => { const k = lv + (portc ? 'p' : ''); if (!tiers.has(k)) tiers.set(k, []); tiers.get(k).push(o); };
      for (const c of gate.children) put(c, c.userData.lv, c.userData.portc);
      for (const p of parts) if (p !== gate) put(p, p.userData.lv, false);
      for (const [k, list] of tiers) for (const m of mergeInto(list, world)) { m.userData = { lv: parseInt(k, 10), portc: k.endsWith('p') }; world.add(keepLive(m)); merged.push(m); }
      if (!abOn()) { for (const p of parts) world.remove(p); parts.length = 0; }
    }
    forts.push({ hid: cw.hid, parts, gate, merged });
  }
}

// show each castle's pieces for its current level; the portcullis lifts when the main gate is broken
export function updateCastleFort() {
  if (!forts.length || !G.cgates) return;
  for (const f of forts) {
    const st = G.cgates[f.hid], lv = (st && st.lv) | 0, down = !!(st && (st.broken & 1));
    for (const p of f.parts) if (p !== f.gate) p.visible = abShow(false) && lv >= p.userData.lv;
    if (f.parts.length) for (const c of f.gate.children) c.visible = abShow(false) && lv >= c.userData.lv && !(c.userData.portc && down);
    for (const m of f.merged) m.visible = abShow(true) && lv >= m.userData.lv && !(m.userData.portc && down);
  }
}

// (CASTLE2) level III: a ballista on the keep, a timber watchtower over the first corner tower, a ring of stakes
// (the spike ditch) just outside the wall. Each piece is tagged level 3, so it merges with that level's others.
function level3(parts, world, cw, h, cy) {
  const put = o => { o.userData = { lv: 3 }; world.add(o); parts.push(o); };
  const ky = terrainMeshY(cw.x, cw.z) + 8.2, fa = cw.gates[0]; // (the keep's top; the ballista faces the lane gate)
  const bal = new THREE.Group(); bal.position.set(cw.x, ky, cw.z); bal.rotation.y = Math.PI / 2 - fa;
  bal.add(box(.5, .4, 2.4, WOOD, 0, .2, .2)); bal.add(box(2.6, .18, .25, WOOD, 0, .5, 1)); bal.add(box(.1, .1, 2.2, DARK, 0, .5, .3));
  for (const c of [...bal.children]) { const m = c.clone(); m.applyMatrix4(new THREE.Matrix4().compose(bal.position, new THREE.Quaternion().setFromEuler(bal.rotation), new THREE.Vector3(1, 1, 1))); put(m); }
  const b = h.towerA0, tx = cw.x + Math.cos(b) * 9.5, tz = cw.z + Math.sin(b) * 9.5, ty = terrainMeshY(tx, tz) + 5;
  for (const [dx, dz] of [[-.9, -.9], [.9, -.9], [-.9, .9], [.9, .9]]) put(box(.25, 5, .25, WOOD, tx + dx, ty + 2.5, tz + dz));
  put(box(2.4, .25, 2.4, WOOD, tx, ty + 4.2, tz)); put(box(2.8, .2, 2.8, DARK, tx, ty + 5.4, tz));
  const R = cw.r + 1.8, n = Math.round(Math.PI * 2 * R / 1.4);
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, x = cw.x + Math.cos(a) * R, z = cw.z + Math.sin(a) * R, st = box(.16, 1.3, .16, WOOD, x, terrainMeshY(x, z) + .45, z);
    st.rotation.set(Math.sin(a) * .55, 0, -Math.cos(a) * .55); put(st); } // (leaning out, at the attackers)
}
