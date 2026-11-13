// F1a The map drawn in a few batches (the mountain). Once the map is built, every still piece of scenery (a
// wall, a roof, a post, a bridge rail) is folded into one mesh per look per cell of a grid, so the phone draws
// ~20 batches instead of ~1,000 separate pieces. Pieces whose materials differ only in colour share a batch,
// the colour moved into the vertices. Cells keep culling working: a batch off screen is skipped as before.
// Pieces that move, change or hide during a battle are marked live by their builders (keepLive) and stay as
// they are; the builders batch some of those themselves (mergeInto, or instancing), still showing and moving
// them by the same rules. Nothing in the battle changes, and every frame looks the same (store/r_F1a.mjs).
import * as THREE from 'three';
import { BATCH } from '../config.js';

const live = new WeakSet();
// a builder marks a piece (or a whole group) that its update code moves, hides, recolours or reshapes
export const keepLive = (...objs) => { for (const o of objs) if (o) live.add(o); return objs[0]; };

let on = true; try { on = new URLSearchParams(location.search).get('f1') !== '0'; } catch (e) { /* on */ } // (?f1=0: the old, unbatched map, for comparison)
export const batchOn = () => on;
// (dev, ?f1=ab: the old pieces are kept, hidden, beside the batches, so a test can draw the very same frame both ways)
let ab = false; try { ab = !!import.meta.env.DEV && new URLSearchParams(location.search).get('f1') === 'ab'; } catch (e) { /* off */ }
let showOld = false; const pairs = [];
export const abOld = () => showOld;
export const abOn = () => ab;
// whether a builder's new (batched) or old (separate) version of a piece should show now: always the one that exists,
// except in ?f1=ab, where the test picks
export const abShow = isNew => !ab || (isNew ? !showOld : showOld);
if (ab) window.__f1old = flag => { showOld = !!flag; for (const [now, old] of pairs) { for (const o of [].concat(now)) o.visible = !showOld; for (const o of [].concat(old)) o.visible = showOld; } };

const BAKE = new Set(['MeshLambertMaterial', 'MeshPhongMaterial', 'MeshBasicMaterial', 'MeshStandardMaterial']);
const sigOf = (g, bake) => Object.keys(g.attributes).filter(n => !(bake && n === 'color')).sort().map(n => { const a = g.attributes[n]; return n + a.itemSize + (a.normalized ? 'n' : ''); }).join(',');
const usable = o => o.isMesh && !o.isInstancedMesh && !o.isSkinnedMesh && !Array.isArray(o.material) && o.material && !o.material.transparent
  && o.geometry && o.geometry.isBufferGeometry && !Object.keys(o.geometry.morphAttributes).length && !o.morphTargetInfluences
  && Object.values(o.geometry.attributes).every(a => !a.isInterleavedBufferAttribute) && o.onBeforeRender === THREE.Object3D.prototype.onBeforeRender;

const hex = c => (c && c.isColor ? c.getHexString() : '');
const lookOf = (m, anyColour) => [m.type, anyColour ? '' : hex(m.color), hex(m.emissive), hex(m.specular), m.shininess, m.map && m.map.uuid, m.side, m.flatShading, anyColour ? '' : m.vertexColors, m.transparent, m.opacity,
  m.alphaTest, m.fog, m.wireframe, m.depthTest, m.depthWrite, m.blending, m.toneMapped, m.onBeforeCompile !== THREE.Material.prototype.onBeforeCompile ? m.uuid : 0, m.polygonOffset].join('/');
// folds root's still pieces into batches; returns { pieces, batches } (how many went in, how many came out)
export function batchStatic(root) {
  if (!on || !root) return { pieces: 0, batches: 0 };
  root.updateMatrixWorld(true);
  const toRoot = new THREE.Matrix4().copy(root.matrixWorld).invert(), groups = new Map(), m = new THREE.Matrix4(), c = new THREE.Vector3();
  // materials that differ only in colour batch together, the colour moving into the vertices (a white material
  // with vertex colours draws exactly the same); not one a live piece uses: its owner may change it in battle
  const liveMats = new Set(); root.traverse(o => { if (o.material) for (let p = o; p; p = p.parent) if (live.has(p)) { [].concat(o.material).forEach(m => liveMats.add(m)); break; } });
  const bakes = mt => !liveMats.has(mt) && BAKE.has(mt.type) && mt.onBeforeCompile === THREE.Material.prototype.onBeforeCompile;
  const walk = o => {
    if (live.has(o) || !o.visible) return; // (a live piece, or one hidden now: it may show or move later)
    if (o !== root && usable(o)) {
      m.multiplyMatrices(toRoot, o.matrixWorld);
      if (!o.geometry.boundingSphere) o.geometry.computeBoundingSphere();
      c.copy(o.geometry.boundingSphere.center).applyMatrix4(m);
      const cell = Math.floor(c.x / BATCH.cell) + ':' + Math.floor(c.z / BATCH.cell);
      const ca = o.geometry.attributes.color, bake = bakes(o.material) && (!ca || ca.itemSize === 3);
      const key = [bake ? 'bake/' + lookOf(o.material, true) : o.material.uuid, o.castShadow, o.receiveShadow, o.renderOrder, o.frustumCulled, sigOf(o.geometry, bake), cell].join('|');
      let list = groups.get(key); if (!list) groups.set(key, list = []);
      list.push({ o, m: m.clone(), bake });
    }
    for (const ch of o.children.slice()) walk(ch);
  };
  walk(root);
  let pieces = 0, batches = 0; const baked = new Map();
  for (const list of groups.values()) {
    if (list.length < 2) continue;
    const { o: first, bake } = list[0], geo = merge(list);
    let mat = first.material; if (bake) { const k = lookOf(mat, true); mat = baked.get(k); if (!mat) { mat = first.material.clone(); mat.color.set(0xffffff); mat.vertexColors = true; baked.set(k, mat); } }
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = first.castShadow; mesh.receiveShadow = first.receiveShadow; mesh.renderOrder = first.renderOrder; mesh.frustumCulled = first.frustumCulled;
    mesh.name = 'f1batch'; root.add(mesh);
    if (ab) { const old = list.map(x => x.o); for (const o of old) o.visible = false; pairs.push([mesh, old]); }
    else for (const { o } of list) o.parent.remove(o); // (geometry left alone: a live piece may share it)
    pieces += list.length; batches++;
  }
  return { pieces, batches };
}

// folds meshes into one mesh per material (and shadow flags), placed in `space` (an object they all sit under,
// or the world); returns the new meshes, not yet added anywhere
export function mergeInto(meshes, space) {
  const inv = new THREE.Matrix4(); if (space) { space.updateMatrixWorld(true); inv.copy(space.matrixWorld).invert(); }
  const groups = new Map();
  for (const o of meshes) {
    o.updateWorldMatrix(true, false);
    const key = [o.material.uuid, o.castShadow, o.receiveShadow, o.renderOrder, sigOf(o.geometry)].join('|');
    let list = groups.get(key); if (!list) groups.set(key, list = []);
    list.push({ o, m: new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld) });
  }
  return [...groups.values()].map(list => { const f = list[0].o, mesh = new THREE.Mesh(merge(list), f.material);
    mesh.castShadow = f.castShadow; mesh.receiveShadow = f.receiveShadow; mesh.renderOrder = f.renderOrder; return mesh; });
}

// one indexed geometry from many pieces, each moved into the batch's space (mirrored pieces keep their faces outward)
// (list: [{ o: { geometry }, m: Matrix4 }]; attributes the matrix doesn't know, e.g. colours, are carried as they are)
export function merge(list) {
  const parts = list.map(({ o, m, bake }) => {
    const g = o.geometry.clone(); g.applyMatrix4(m);
    if (bake) { const n = g.attributes.position.count, old = o.material.vertexColors && g.attributes.color, c = o.material.color, a = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { a[i * 3] = c.r * (old ? old.getX(i) : 1); a[i * 3 + 1] = c.g * (old ? old.getY(i) : 1); a[i * 3 + 2] = c.b * (old ? old.getZ(i) : 1); }
      g.setAttribute('color', new THREE.BufferAttribute(a, 3)); }
    if (!g.index) { const n = g.attributes.position.count, ix = new Uint32Array(n); for (let i = 0; i < n; i++) ix[i] = i; g.setIndex(new THREE.BufferAttribute(ix, 1)); }
    const groups = g.groups; let ix = Array.from(g.index.array);
    if (groups.length) { // (a geometry split into groups draws only its groups' ranges)
      const keep = []; for (const gr of groups) for (let i = gr.start; i < Math.min(ix.length, gr.start + gr.count); i++) keep.push(ix[i]); ix = keep;
    }
    if (m.determinant() < 0) for (let i = 0; i < ix.length; i += 3) { const t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    return { g, ix };
  });
  const out = new THREE.BufferGeometry(), names = Object.keys(parts[0].g.attributes);
  let nv = 0, ni = 0; for (const p of parts) { nv += p.g.attributes.position.count; ni += p.ix.length; }
  for (const n of names) {
    const a0 = parts[0].g.attributes[n], arr = new a0.array.constructor(nv * a0.itemSize); let off = 0;
    for (const p of parts) { const a = p.g.attributes[n]; arr.set(a.array.subarray(0, a.count * a.itemSize), off); off += a.count * a.itemSize; }
    out.setAttribute(n, new THREE.BufferAttribute(arr, a0.itemSize, a0.normalized));
  }
  const idx = nv > 65535 ? new Uint32Array(ni) : new Uint16Array(ni); let base = 0, o = 0;
  for (const p of parts) { for (const i of p.ix) idx[o++] = i + base; base += p.g.attributes.position.count; p.g.dispose(); }
  out.setIndex(new THREE.BufferAttribute(idx, 1));
  out.computeBoundingSphere(); out.computeBoundingBox();
  return out;
}
