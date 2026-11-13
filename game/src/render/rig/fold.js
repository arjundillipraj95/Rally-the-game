// F1b A man near the camera in a few draws. His gear (helmet, shield, weapon, cape, the archer's hood and quiver)
// was many separate pieces, each its own draw. Here the pieces that look alike in kind (plain painted metal,
// cloth, wood: no texture) are folded into one skinned mesh: each piece hangs, as one rigid part, on whatever
// moves it (a bone, the shield's mount, the cape's hinge), so it moves exactly as before; its colour, roughness,
// metalness and glow go into its vertices. The originals stay where they were, unseen (layer 31), and keep
// driving the folded mesh. His body and armour (textured, skinned) are left as they are: two more draws.
import * as THREE from 'three';
import { merge } from '../batch.js';

const HIDDEN = 31; // (a layer no camera or light draws)
const MATS = new Map(); // one folded material per kind, shared by every man
const KINDS = new Set(['MeshStandardMaterial']);
const kindOf = m => [m.side, m.flatShading, m.transparent, m.opacity, m.alphaTest, m.depthWrite, m.depthTest, m.fog, m.toneMapped, m.wireframe, m.blending].join('/');
const plain = m => KINDS.has(m.type) && !m.map && !m.normalMap && !m.roughnessMap && !m.metalnessMap && !m.emissiveMap && !m.aoMap && !m.alphaMap && !m.bumpMap
  && m.onBeforeCompile === THREE.Material.prototype.onBeforeCompile;

function foldedMaterial(src) {
  const k = kindOf(src); let m = MATS.get(k); if (m) return m;
  m = new THREE.MeshStandardMaterial({ vertexColors: true, side: src.side, flatShading: src.flatShading, transparent: src.transparent, opacity: src.opacity,
    alphaTest: src.alphaTest, depthWrite: src.depthWrite, depthTest: src.depthTest, fog: src.fog, toneMapped: src.toneMapped, blending: src.blending, roughness: 1, metalness: 1 });
  m.onBeforeCompile = sh => {
    sh.vertexShader = 'attribute vec2 rm; attribute vec3 em; varying vec2 vRm; varying vec3 vEm;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n vRm = rm; vEm = em;');
    sh.fragmentShader = 'varying vec2 vRm; varying vec3 vEm;\n' + sh.fragmentShader
      .replace('vec3 totalEmissiveRadiance = emissive;', 'vec3 totalEmissiveRadiance = vEm;')
      .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = vRm.x;')
      .replace('#include <metalnessmap_fragment>', 'float metalnessFactor = vRm.y;');
  };
  m.customProgramCacheKey = () => 'f1b-fold';
  MATS.set(k, m); return m;
}

// fold R's plain gear; movers: objects (besides bones) that move against their parent while he plays
// returns { meshes, pieces } (the folded meshes; the originals, now unseen)
export function foldGear(R, movers) {
  const root = R.root, mov = new Set(movers.filter(Boolean)); root.updateMatrixWorld(true);
  const shown = o => { for (let p = o; p && p !== root; p = p.parent) if (!p.visible) return false; return true; };
  const groups = new Map();
  root.traverse(o => {
    if (!o.isMesh || o.isSkinnedMesh || Array.isArray(o.material) || !plain(o.material) || !shown(o)) return;
    let D = o.parent; while (D !== root && !D.isBone && !mov.has(D)) D = D.parent; // (what moves it: the nearest bone or mover above it)
    const k = kindOf(o.material); if (!groups.has(k)) groups.set(k, []); groups.get(k).push({ o, D });
  });
  const meshes = [], pieces = [];
  for (const list of groups.values()) {
    const bones = [...new Set(list.map(x => x.D))], parts = list.map(({ o, D }) => {
      const src = o.geometry, n = src.attributes.position.count, mt = o.material, g = new THREE.BufferGeometry();
      g.setAttribute('position', src.attributes.position.clone());
      if (src.attributes.normal) g.setAttribute('normal', src.attributes.normal.clone()); if (src.index) g.setIndex(src.index.clone());
      g.groups = src.groups.slice();
      if (!g.attributes.normal) g.computeVertexNormals();
      const vc = mt.vertexColors && src.attributes.color, c = mt.color, col = new Float32Array(n * 3), rm = new Float32Array(n * 2), em = new Float32Array(n * 3), si = new Float32Array(n * 4), sw = new Float32Array(n * 4);
      const e = mt.emissive.clone().multiplyScalar(mt.emissiveIntensity), bi = bones.indexOf(D);
      for (let i = 0; i < n; i++) {
        col[i * 3] = c.r * (vc ? vc.getX(i) : 1); col[i * 3 + 1] = c.g * (vc ? vc.getY(i) : 1); col[i * 3 + 2] = c.b * (vc ? vc.getZ(i) : 1);
        rm[i * 2] = mt.roughness; rm[i * 2 + 1] = mt.metalness; em[i * 3] = e.r; em[i * 3 + 1] = e.g; em[i * 3 + 2] = e.b; si[i * 4] = bi; sw[i * 4] = 1;
      }
      g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.setAttribute('rm', new THREE.BufferAttribute(rm, 2)); g.setAttribute('em', new THREE.BufferAttribute(em, 3));
      g.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4)); g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
      // (the piece as it sits on its mover: everything between them is fixed, so it is baked in)
      return { o: { geometry: g }, m: new THREE.Matrix4().copy(D.matrixWorld).invert().multiply(o.matrixWorld) };
    });
    const geo = merge(parts), mesh = new THREE.SkinnedMesh(geo, foldedMaterial(list[0].o.material));
    mesh.bind(new THREE.Skeleton(bones, bones.map(() => new THREE.Matrix4())), new THREE.Matrix4()); // (each bone's own world matrix places its pieces)
    mesh.castShadow = list.some(x => x.o.castShadow); mesh.receiveShadow = list.some(x => x.o.receiveShadow); mesh.frustumCulled = false; mesh.name = 'f1fold';
    root.add(mesh); meshes.push(mesh);
    for (const { o } of list) { o.layers.set(HIDDEN); pieces.push(o); }
  }
  return { meshes, pieces };
}
// (dev, ?f1=ab) draw the old pieces or the folded ones
export function foldShow(F, old) { for (const m of F.meshes) m.visible = !old; for (const o of F.pieces) o.layers.set(old ? 0 : HIDDEN); }
