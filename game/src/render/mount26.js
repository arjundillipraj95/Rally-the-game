// MAP2 the relaunch's mountain: what render/mountain.js doesn't already draw. The country walls (stone,
// behind each side's castles and out to the cliff) and each side's nexus (a stand-in banner on a stone plinth, in the
// side's colour; its look comes with the castles step). Merged into as few draws as the batching allows.
import * as THREE from 'three';
import { batchOn, mergeInto } from './batch.js';
import { TEAMS, CROWN2, CROWN26 } from '../config.js';
import { W, mulberry } from '../core/world.js';
import { terrainMeshY } from '../core/world.js';
import { stoneTex, woodTex } from './look.js';

const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const merged = (grp, parts) => { for (const p of parts) { p.castShadow = p.receiveShadow = true; grp.add(p); }
  if (batchOn()) { const one = mergeInto(parts, grp); for (const p of parts) grp.remove(p); for (const m of one) grp.add(m); } };

export function buildMount26(grp, L) {
  const stone = lam(0x9a9384, stoneTex()), cap = lam(0x7d776a, stoneTex()), H = CROWN26.wallH;
  // the country walls: a block of stone and a cap per wall stone the rules placed
  { const parts = [], wallG = new THREE.BoxGeometry(1.25, H + .6, .9), capG = new THREE.BoxGeometry(1.3, .22, 1.1);
    const stones = L.obstacles.filter(o => o.country != null);
    for (const o of stones) {
      const y = terrainMeshY(o.x, o.z), nb = stones.find(p => p !== o && p.country === o.country && Math.hypot(p.x - o.x, p.z - o.z) < 1.6);
      const rot = nb ? -Math.atan2(nb.z - o.z, nb.x - o.x) : -Math.atan2(o.z, o.x) + Math.PI / 2; // (along the wall, toward the next stone)
      const w = new THREE.Mesh(wallG, stone); w.position.set(o.x, y + H / 2 - .3, o.z); w.rotation.y = rot; parts.push(w);
      const c = new THREE.Mesh(capG, cap); c.position.set(o.x, y + H + .1, o.z); c.rotation.y = rot; parts.push(c); }
    merged(grp, parts); }
  // (MAP11) the nexus: a shining crystal in the side's colour, standing on a stepped stone plinth with three small
  // shards leaning round it (the stone the other sides will come to break: its rules come with castles)
  { const parts = [], plinthG = new THREE.CylinderGeometry(2.1, 2.5, .9, 10), stepG = new THREE.CylinderGeometry(1.5, 1.8, .6, 10), crystalG = new THREE.OctahedronGeometry(1.25, 0).scale(1, 2.3, 1), shardG = new THREE.OctahedronGeometry(.45, 0).scale(1, 2.2, 1), flags = [];
    for (const n of L.nexus) { const y = terrainMeshY(n.x, n.z), col = new THREE.Color(TEAMS[n.c].hex);
      const p = new THREE.Mesh(plinthG, stone); p.position.set(n.x, y + .4, n.z); parts.push(p);
      const st = new THREE.Mesh(stepG, cap); st.position.set(n.x, y + 1.1, n.z); parts.push(st);
      const glass = new THREE.MeshPhongMaterial({ color: col.clone().lerp(new THREE.Color(0xffffff), .25), emissive: col, emissiveIntensity: .55, specular: 0xffffff, shininess: 110, flatShading: true, transparent: true, opacity: .92 });
      const c = new THREE.Mesh(crystalG, glass); c.position.set(n.x, y + 4.2, n.z); c.rotation.y = n.a; c.castShadow = true; grp.add(c); flags.push(c);
      for (let k = 0; k < 3; k++) { const b = n.a + k * 2.09 + .5, s = new THREE.Mesh(shardG, glass); s.position.set(n.x + Math.cos(b) * 1.35, y + 2.1, n.z + Math.sin(b) * 1.35); s.rotation.set(Math.cos(b) * .35, b, Math.sin(b) * .35); s.castShadow = true; grp.add(s); flags.push(s); } }
    merged(grp, parts);
    // (MAP14) the bushes, as in League: patches of tall grass, shoulder high, swaying in the wind; tufts packed over
    // each bush's circle, shorter at its edge so the patch reads as one shape. One instanced draw for every bush.
    let bushes = null, sway = null;
    if (L.bushes && L.bushes.length) { const tufts = [];
      for (const b of L.bushes) { const step = .95; for (let gx = -b.r; gx <= b.r; gx += step) for (let gz = -b.r; gz <= b.r; gz += step) {
        const jx = gx + Math.sin(gz * 12.9 + b.id) * .3, jz = gz + Math.cos(gx * 7.7 + b.id) * .3, d = Math.hypot(jx, jz); if (d > b.r) continue;
        tufts.push([b.x + jx, b.z + jz, d > b.r - 1.1 ? .72 : .95 + Math.sin(jx * 3.1 + jz * 2.3) * .12]); } }
      bushes = new THREE.InstancedMesh(tuftGeo(), tuftMat(s => { sway = s; }), tufts.length);
      const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3();
      tufts.forEach(([x, z, k], i) => { e.set(0, i * 2.39, 0); q.setFromEuler(e); m4.compose(v.set(x, terrainMeshY(x, z) - .05, z), q, sc.set(k, k, k)); bushes.setMatrixAt(i, m4); });
      bushes.receiveShadow = true; bushes.castShadow = true; grp.add(bushes); }
    return { flags, bushes, sway, peaks: buildPeaks(grp, L, stone), banks: buildBanks(grp, L) }; }
}
// (MAP13) the rivers' banks: clumps of reeds along both banks and round the spring pools (one instanced draw), and a
// scatter of mossy stones at the water's edge (one draw); none on the bridges
function buildBanks(grp, L) {
  const V = L.river; if (!V) return null;
  const spots = [], stones = [], R = mulberry(4413), off = (V.w + 1.1);
  const clear = (x, z) => !V.bridges.some(b => Math.hypot(b.x - x, b.z - z) < b.len + 2.5);
  for (const P of [V.pts, ...(V.lines || [])]) for (let i = 0; i < P.length - 1; i++) {
    const [ax, az] = P[i], [bx, bz] = P[i + 1], d = Math.hypot(bx - ax, bz - az), nx = -(bz - az) / d, nz = (bx - ax) / d;
    for (let t = 0; t < d; t += 2.2) for (const s of [-1, 1]) { if (R() < .35) continue; const o = off + R() * 1.2, x = ax + (bx - ax) * t / d + nx * o * s, z = az + (bz - az) * t / d + nz * o * s; if (!clear(x, z)) continue;
      spots.push([x, z, .8 + R() * .6]); if (R() < .12) stones.push([x + nx * s * .6, z + nz * s * .6, .5 + R() * .7]); }
  }
  for (const q of V.pools || []) for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2 + R() * .3, o = q.r + 1.3 + R(); spots.push([q.x + Math.cos(a) * o, q.z + Math.sin(a) * o, .9 + R() * .6]); if (k % 4 === 0) stones.push([q.x + Math.cos(a + .2) * (o - .3), q.z + Math.sin(a + .2) * (o - .3), .7 + R() * .6]); }
  // a reed clump: five thin blades leaning out from one root
  const blade = new THREE.ConeGeometry(.07, 1.7, 3, 1).translate(0, .85, 0), parts = [], m4 = new THREE.Matrix4();
  for (let k = 0; k < 5; k++) { const a = k * 1.26, g = blade.clone(); m4.makeRotationFromEuler(new THREE.Euler(Math.sin(a) * .22, 0, Math.cos(a) * .22)); m4.setPosition(Math.cos(a) * .18, 0, Math.sin(a) * .18); g.applyMatrix4(m4); parts.push(g); }
  const clump = mergeGeos(parts), reeds = new THREE.InstancedMesh(clump, lam(0x7d8f45), spots.length), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3();
  spots.forEach(([x, z, s], i) => { e.set(0, i * 2.4, 0); q.setFromEuler(e); m4.compose(v.set(x, terrainMeshY(x, z) - .05, z), q, sc.set(s, s * (.8 + (i % 5) * .1), s)); reeds.setMatrixAt(i, m4); });
  reeds.receiveShadow = true; grp.add(reeds);
  const rockG = new THREE.DodecahedronGeometry(.6, 0), rockM = lam(0x8a8a7a), rocks = stones.map(([x, z, s], i) => { const m = new THREE.Mesh(rockG, rockM); m.position.set(x, terrainMeshY(x, z) + .1, z); m.scale.set(s, s * .6, s * 1.1); m.rotation.y = i; m.castShadow = m.receiveShadow = true; return m; });
  merged(grp, rocks);
  return { reeds: spots.length, rocks: stones.length };
}
// (one geometry from several, positions and normals only)
function mergeGeos(gs) { const pos = [], nor = []; for (const g of gs) { const n = g.toNonIndexed(); pos.push(...n.attributes.position.array); nor.push(...n.attributes.normal.array); }
  const out = new THREE.BufferGeometry(); out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); return out; }
// (MAP7) the peaks' paving: the King's Road in stone from the middle castle's back gate to the nexus, a stone plaza
// round the nexus, the broad brick castle road on to the base, the base's yard paved; low kerbs along the road's edges.
// It follows the ground a hand above it. Two draws for all four peaks (stone, brick).
function buildPeaks(grp, L, stoneM) {
  if (!L.peaks || !L.peaks.length) return null;
  const K = CROWN26.r, R = W.R, brickM = lam(0xb5785a, stoneTex(), { name: 'peakBrick' }), stoneP = lam(0xc2b9a7, stoneTex());
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
  const stones = [], bricks = [], wallG = new THREE.BoxGeometry(1.55, .55, .6), postG = new THREE.BoxGeometry(.8, 1.05, .8), capG = new THREE.BoxGeometry(1.0, .16, 1.0);
  for (const p of L.peaks) {
    const back = K.lane * R + CROWN26.castleR - .5, nx = K.nexus * R, home = K.home * R, yard = CROWN2.yard.r;
    stones.push(new THREE.Mesh(strip(p.a, back, nx - CROWN26.peak.nexus + 1, p.hw - 1), stoneP));
    stones.push(new THREE.Mesh(disc(p.discs[1][0], p.discs[1][1], CROWN26.peak.nexus - 1), stoneP));
    bricks.push(new THREE.Mesh(strip(p.a, nx + CROWN26.peak.nexus - 1.5, home - yard + .5, p.hw - 1), brickM));
    stones.push(new THREE.Mesh(disc(p.discs[0][0], p.discs[0][1], yard - .4), stoneP));
    const ux = Math.cos(p.a), uz = Math.sin(p.a);
    // a low stone parapet along both edges, at the road's own height (the ground falls away past it), a post every 4.5 m
    for (const [t0, t1] of [[back + 1, nx - CROWN26.peak.nexus], [nx + CROWN26.peak.nexus, home - yard]]) for (let t = t0, i = 0; t < t1; t += 1.5, i++) for (const s of [-1, 1]) {
      const sd = s * (p.hw - .55), x = ux * t - uz * sd, z = uz * t + ux * sd, y = lift(ux * t, uz * t), post = i % 3 === 0;
      const k = new THREE.Mesh(post ? postG : wallG, stoneM); k.position.set(x, y + (post ? .5 : .25), z); k.rotation.y = -p.a + Math.PI / 2; stones.push(k);
      if (post) { const c = new THREE.Mesh(capG, stoneM); c.position.set(x, y + 1.08, z); c.rotation.y = k.rotation.y; stones.push(c); } }
  }
  // (MAP11) the King's Road paved on the mountain too: from the middle castle's front gate down through the ridge's
  // opening to the river's bridge, and from the river on to the chasm's bridge (the bridges carry it over the water)
  { const rw = K.riverW * R, ch = (K.chasm + K.chasmW) * R;
    for (const p of L.peaks) for (const [r1, r0] of [[K.lane * R - CROWN26.castleR + .5, K.river * R + rw + 2.6], [K.river * R - rw - 2.6, ch + 1.6]]) stones.push(new THREE.Mesh(strip(p.a, r0, r1, 3.2), stoneP)); }
  // (MAP11) a pair of standing stones at each of the ridge's openings (each King's Road, each border field), so a way
  // into the jungle reads from the lane
  { const pillarG = new THREE.CylinderGeometry(.85, 1.15, 4.2, 7), capP = new THREE.CylinderGeometry(1.05, .9, .5, 7), rr = K.ridge * R;
    for (const p of L.peaks) for (const [b, half] of [[p.a, 6], [p.a + Math.PI / 4, CROWN26.border.open]]) for (const s of [-1, 1]) {
      const a = b + s * (half + 1.6) / rr, x = Math.cos(a) * (rr + 1.2), z = Math.sin(a) * (rr + 1.2), y = terrainMeshY(x, z);
      const m = new THREE.Mesh(pillarG, stoneM); m.position.set(x, y + 2, z); m.rotation.y = a * 3; m.castShadow = true; stones.push(m);
      const c = new THREE.Mesh(capP, stoneM); c.position.set(x, y + 4.3, z); stones.push(c); } }
  // (MAP11) each buff camp flies its buff's banner: the war drum's red, swift's sky blue
  { const poleG = new THREE.CylinderGeometry(.09, .12, 5.4, 6), flagG = new THREE.PlaneGeometry(1.5, 2.1), woodM = lam(0x5a4129, woodTex());
    const cloth = { drum: lam(0xb3261e, null, { side: THREE.DoubleSide }), swift: lam(0x5aa9e6, null, { side: THREE.DoubleSide }) };
    for (const k of L.camps) if (k.buff) { const a = k.a + 1.05, x = k.x + Math.cos(a) * 3.9, z = k.z + Math.sin(a) * 3.9, y = terrainMeshY(x, z);
      const pole = new THREE.Mesh(poleG, woodM); pole.position.set(x, y + 2.7, z); pole.castShadow = true; bricks.push(pole);
      const f = new THREE.Mesh(flagG, cloth[k.buff]); f.position.set(x + Math.cos(k.a) * .78, y + 4.3, z + Math.sin(k.a) * .78); f.rotation.y = -k.a; f.castShadow = true; bricks.push(f); } }
  for (const m of [...stones, ...bricks]) { m.receiveShadow = true; grp.add(m); }
  if (batchOn()) for (const set of [stones, bricks]) { const one = mergeInto(set, grp); for (const m of set) grp.remove(m); for (const m of one) grp.add(m); }
  return true;
}
// the torch posts on the new mountain: one draw for all of them when batching (there are more bridges to light)
export function mergePosts(grp, posts) { if (!batchOn()) return; const one = mergeInto(posts, grp); for (const p of posts) grp.remove(p); for (const m of one) grp.add(m); }

// (MAP14) one tuft of tall grass: six blades leaning out from the root, dark at the foot and light at the tip
function tuftGeo() {
  const pos = [], col = [], dark = new THREE.Color(0x1f4a1a), light = new THREE.Color(0x74b83e);
  for (let k = 0; k < 6; k++) { const a = k * 1.05 + (k % 2) * .4, h = 1.75 + (k % 3) * .22, w = .2, lean = .35 + (k % 2) * .15, cx = Math.cos(a), cz = Math.sin(a);
    const b1 = [-cz * w, 0, cx * w], b2 = [cz * w, 0, -cx * w], tip = [cx * lean, h, cz * lean];
    for (const p of [b1, b2, tip]) pos.push(...p);
    col.push(dark.r, dark.g, dark.b, dark.r, dark.g, dark.b, light.r, light.g, light.b); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); g.computeVertexNormals(); return g;
}
// the grass's material: its tips sway with the wind (a time uniform the mountain's update moves)
function tuftMat(got) {
  const m = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  m.onBeforeCompile = sh => { sh.uniforms.uSway = { value: 0 }; got(sh.uniforms.uSway);
    sh.vertexShader = 'uniform float uSway;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      #ifdef USE_INSTANCING
      float ph = instanceMatrix[3].x * .21 + instanceMatrix[3].z * .17;
      #else
      float ph = 0.;
      #endif
      float k = position.y * position.y * .07;
      transformed.x += sin(uSway * 1.7 + ph) * k; transformed.z += cos(uSway * 1.3 + ph * 1.3) * k * .7;`); };
  return m;
}
