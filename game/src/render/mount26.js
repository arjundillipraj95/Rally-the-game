// MAP2 the relaunch's mountain: what render/mountain.js doesn't already draw. The country walls (stone,
// behind each side's castles and out to the cliff) and each side's nexus (a stand-in banner on a stone plinth, in the
// side's colour; its look comes with the castles step). Merged into as few draws as the batching allows.
import * as THREE from 'three';
import { batchOn, mergeInto } from './batch.js';
import { TEAMS, CROWN2, CROWN26 } from '../config.js';
import { W } from '../core/world.js';
import { terrainMeshY } from '../core/world.js';
import { stoneTex, woodTex } from './look.js';

const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const merged = (grp, parts) => { for (const p of parts) { p.castShadow = p.receiveShadow = true; grp.add(p); }
  if (batchOn()) { const one = mergeInto(parts, grp); for (const p of parts) grp.remove(p); for (const m of one) grp.add(m); } };

export function buildMount26(grp, L) {
  const stone = lam(0x9a9384, stoneTex()), cap = lam(0x7d776a, stoneTex()), wood = lam(0x55402a, woodTex()), H = CROWN26.wallH;
  // the country walls: a block of stone and a cap per wall stone the rules placed
  { const parts = [], wallG = new THREE.BoxGeometry(1.25, H + .6, .9), capG = new THREE.BoxGeometry(1.3, .22, 1.1);
    const stones = L.obstacles.filter(o => o.country != null);
    for (const o of stones) {
      const y = terrainMeshY(o.x, o.z), nb = stones.find(p => p !== o && p.country === o.country && Math.hypot(p.x - o.x, p.z - o.z) < 1.6);
      const rot = nb ? -Math.atan2(nb.z - o.z, nb.x - o.x) : -Math.atan2(o.z, o.x) + Math.PI / 2; // (along the wall, toward the next stone)
      const w = new THREE.Mesh(wallG, stone); w.position.set(o.x, y + H / 2 - .3, o.z); w.rotation.y = rot; parts.push(w);
      const c = new THREE.Mesh(capG, cap); c.position.set(o.x, y + H + .1, o.z); c.rotation.y = rot; parts.push(c); }
    merged(grp, parts); }
  // the nexus: a stone plinth, a pole and the side's banner
  { const parts = [], plinthG = new THREE.CylinderGeometry(2, 2.3, 1.2, 10), poleG = new THREE.CylinderGeometry(.16, .2, 9, 8), flags = [];
    for (const n of L.nexus) { const y = terrainMeshY(n.x, n.z);
      const p = new THREE.Mesh(plinthG, stone); p.position.set(n.x, y + .5, n.z); parts.push(p);
      const pole = new THREE.Mesh(poleG, wood); pole.position.set(n.x, y + 5.4, n.z); parts.push(pole);
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.4), lam(TEAMS[n.c].hex, null, { side: THREE.DoubleSide }));
      flag.position.set(n.x + Math.cos(n.a + Math.PI / 2) * 1.8, y + 8.4, n.z + Math.sin(n.a + Math.PI / 2) * 1.8); flag.rotation.y = -n.a; flag.castShadow = true;
      grp.add(flag); flags.push(flag); }
    merged(grp, parts);
    // (MAP5) the bushes: low leafy clumps filling each bush's circle, every one of them in one draw
    let bushes = null;
    if (L.bushes && L.bushes.length) { const blobs = [];
      for (const b of L.bushes) { const n = Math.round(b.r * 1.9); for (let k = 0; k < n; k++) { const a = k * 2.399 + b.id, d = Math.sqrt((k + .5) / n) * b.r * .85, x = b.x + Math.cos(a) * d, z = b.z + Math.sin(a) * d; blobs.push([x, z, 1 + ((k * 7 + b.id) % 5) * .12]); } }
      const geo = new THREE.IcosahedronGeometry(1.15, 0), mat = lam(0x3f6b2a), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), v = new THREE.Vector3(), e = new THREE.Euler();
      bushes = new THREE.InstancedMesh(geo, mat, blobs.length);
      blobs.forEach(([x, z, k], i) => { e.set(0, i * 1.3, 0); q.setFromEuler(e); m4.compose(v.set(x, terrainMeshY(x, z) + .55 * k, z), q, s.set(1.25 * k, .85 * k, 1.25 * k)); bushes.setMatrixAt(i, m4); });
      bushes.castShadow = true; bushes.receiveShadow = true; grp.add(bushes); }
    return { flags, bushes, peaks: buildPeaks(grp, L, stone) }; }
}
// (MAP7) the peaks' paving: the King's Road in stone from the middle castle's back gate to the nexus, a stone plaza
// round the nexus, the broad brick castle road on to the base, the base's yard paved; low kerbs along the road's edges.
// It follows the ground a hand above it. Two draws for all four peaks (stone, brick).
function buildPeaks(grp, L, stoneM) {
  if (!L.peaks || !L.peaks.length) return null;
  const K = CROWN26.r, R = W.R, brickM = lam(0xb5785a, stoneTex()), stoneP = lam(0xc2b9a7, stoneTex());
  const lift = (x, z) => terrainMeshY(x, z) + .07;
  const strip = (a, r0, r1, hw) => { const n = Math.max(2, Math.ceil((r1 - r0) / 1.5)), m = 6, pos = [], uv = [], idx = [], ux = Math.cos(a), uz = Math.sin(a);
    for (let i = 0; i <= n; i++) for (let j = 0; j <= m; j++) { const t = r0 + (r1 - r0) * i / n, s = -hw + 2 * hw * j / m, x = ux * t - uz * s, z = uz * t + ux * s; pos.push(x, lift(x, z), z); uv.push(s / 3, t / 3); }
    for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { const q = i * (m + 1) + j; idx.push(q, q + 1, q + m + 1, q + 1, q + m + 2, q + m + 1); }
    return geo(pos, uv, idx); };
  const disc = (cx, cz, r) => { const rings = 4, segs = 28, pos = [cx, lift(cx, cz), cz], uv = [cx / 3, cz / 3], idx = [];
    for (let k = 1; k <= rings; k++) for (let s = 0; s < segs; s++) { const a = s / segs * Math.PI * 2, d = r * k / rings, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d; pos.push(x, lift(x, z), z); uv.push(x / 3, z / 3); }
    for (let s = 0; s < segs; s++) { const s1 = (s + 1) % segs; idx.push(0, 1 + s1, 1 + s); }
    for (let k = 1; k < rings; k++) for (let s = 0; s < segs; s++) { const s1 = (s + 1) % segs, a0 = 1 + (k - 1) * segs, a1 = 1 + k * segs; idx.push(a0 + s, a0 + s1, a1 + s, a0 + s1, a1 + s1, a1 + s); }
    return geo(pos, uv, idx); };
  const geo = (pos, uv, idx) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals(); return g; };
  const stones = [], bricks = [], kerbG = new THREE.BoxGeometry(1.4, .35, .5);
  for (const p of L.peaks) {
    const back = K.lane * R + CROWN26.castleR - .5, nx = K.nexus * R, home = K.home * R, yard = CROWN2.yard.r;
    stones.push(new THREE.Mesh(strip(p.a, back, nx - CROWN26.peak.nexus + 1, p.hw - 1), stoneP));
    stones.push(new THREE.Mesh(disc(p.discs[1][0], p.discs[1][1], CROWN26.peak.nexus - 1), stoneP));
    bricks.push(new THREE.Mesh(strip(p.a, nx + CROWN26.peak.nexus - 1.5, home - yard + .5, p.hw - 1), brickM));
    stones.push(new THREE.Mesh(disc(p.discs[0][0], p.discs[0][1], yard - .4), stoneP));
    const ux = Math.cos(p.a), uz = Math.sin(p.a);
    for (const [t0, t1] of [[back + 1, nx - CROWN26.peak.nexus], [nx + CROWN26.peak.nexus, home - yard]]) for (let t = t0; t < t1; t += 1.5) for (const s of [-1, 1]) {
      const sd = s * (p.hw - .6), x = ux * t - uz * sd, z = uz * t + ux * sd, k = new THREE.Mesh(kerbG, stoneM); k.position.set(x, terrainMeshY(x, z) + .15, z); k.rotation.y = -p.a + Math.PI / 2; stones.push(k); }
  }
  for (const m of [...stones, ...bricks]) { m.receiveShadow = true; grp.add(m); }
  if (batchOn()) for (const set of [stones, bricks]) { const one = mergeInto(set, grp); for (const m of set) grp.remove(m); for (const m of one) grp.add(m); }
  return true;
}
// the torch posts on the new mountain: one draw for all of them when batching (there are more bridges to light)
export function mergePosts(grp, posts) { if (!batchOn()) return; const one = mergeInto(posts, grp); for (const p of posts) grp.remove(p); for (const m of one) grp.add(m); }
