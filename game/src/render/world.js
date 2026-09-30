// Builds the 3D scenery for a map layout: ground, hills, fences, trees, river, castles, centre fort, tall grass.
import * as THREE from 'three';
import { TEAMS, CASTLE_R, CTRL } from '../config.js';
import { G } from '../core/state.js';
import { groundY, terrainMeshY, mulberry } from '../core/world.js';
import { scene, setLook } from './scene.js';
import { quality } from './quality.js';
import { lookFor, groundTex, stoneTex, woodTex, uvScale } from './look.js';
import { buildFeatures, updateFeatures } from './features.js';
import { seeThrough, clearSeeThrough } from './seethrough.js';
import { inside, nearObstacles } from '../core/nav.js';
import { buildValley, updateValley, clearValley, valleyGround, fieldAt } from './valley.js';
import { buildFrost, updateFrost, clearFrost, frostGround, onPond } from './frost.js';
import { buildDesert, updateDesert, clearDesert, desertGround } from './desert.js';
import { buildForum, forumGround } from './forum.js';

let world = null;
export let castleObjs = [];
export let fort = null;
export let ctrlObjs = [];
const neutCol = 0x9a9a92;

const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const stoneMat = lam(0xd9d3c6, stoneTex());
const stoneDark = lam(0xbdb7ab, stoneTex());
const gateMat = lam(0x3a2c20, woodTex());
const flagMat = new THREE.MeshLambertMaterial({ color: 0xf6f0e0, side: THREE.DoubleSide });
const flagTrim = new THREE.MeshLambertMaterial({ color: 0xffcf3a, side: THREE.DoubleSide });
const banMats = TEAMS.map(t => new THREE.MeshLambertMaterial({ color: t.hex, side: THREE.DoubleSide }));
const logMat = lam(0x6a4b33, woodTex());
const woodMat = lam(0x7a5a3a, woodTex()), woodDark = lam(0x55402a, woodTex());

function dispose(g) { g.traverse(o => { if (o.geometry) o.geometry.dispose(); }); scene.remove(g); }
const shadowy = (o, cast = true) => { o.traverse(m => { if (m.isMesh) { m.castShadow = cast; m.receiveShadow = true; } }); return o; };

export function buildWorldView(L) {
  if (world) dispose(world);
  if (fort) scene.remove(fort.banner);
  world = new THREE.Group(); scene.add(world);
  castleObjs = []; fort = null; clearSeeThrough(); clearValley(); clearFrost(); clearDesert();
  const M = G.map, LK = lookFor(M.id);
  setLook(M);
  // ground: map colors per vertex, fine detail from a tiling texture
  const g = new THREE.PlaneGeometry(420, 420, 220, 220); g.rotateX(-Math.PI / 2);
  uvScale(g, 64, 64);
  const pos = g.attributes.position, cols = [];
  const meadowLight = new THREE.Color(0xb6cf62), meadowDark = new THREE.Color(0x5f8a38);
  const c1 = new THREE.Color(LK.g1 ?? M.g1), c2 = new THREE.Color(LK.g2 ?? M.g2), c3 = new THREE.Color(LK.g3 ?? M.g3), mud = new THREE.Color(0x7a6a4c);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i), r = Math.hypot(x, z);
    pos.setY(i, terrainMeshY(x, z));
    const t = (Math.sin(x * .11 + z * .07) + 1) / 2, t2 = (Math.sin(x * .031 - z * .043) + 1) / 2;
    const c = c1.clone().lerp(c2, t * .7 + t2 * .3); if (r > 92) c.lerp(c3, Math.min(1, (r - 92) / 40));
    if (M.id === 'river' && Math.abs(z) < 6.5 && Math.hypot(x, z) >= 7.5) c.lerp(mud, .6);
    if (M.id === 'valley') {
      // meadow: sunny and shady drifts, then the dirt road (with worn wheel ruts) and the wheat fields
      const m = Math.sin(x * .045 + 2) * Math.cos(z * .05 - 1) + Math.sin((x + z) * .02) * .6;
      if (m > .55) c.lerp(meadowLight, Math.min(.5, (m - .55) * 1.2)); else if (m < -.6) c.lerp(meadowDark, Math.min(.45, (-.6 - m) * 1.1));
      const road = Math.abs(x - z) / Math.SQRT2;
      if (road < 2.6 && r < 95) c.lerp(mud, road < .5 || Math.abs(road - 1.5) < .35 ? .8 : .6);
      valleyGround(c, x, z);
    }
    if (M.id === 'frost' && r < 96) frostGround(c, x, z);
    if (M.id === 'desert' && r < 96) desertGround(c, x, z);
    if (M.id === 'forum') forumGround(c, x, z);
    if (M.id === 'wooden' && (Math.abs(x) < 2.6 || Math.abs(z) < 2.6) && r > 8 && r < 80) c.lerp(mud, .45);
    cols.push(c.r, c.g, c.b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3)); g.computeVertexNormals();
  const ground = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true, map: groundTex(LK.ground) }));
  ground.receiveShadow = true; world.add(ground);
  const hillMat = lam(M.hill);
  if (M.id !== 'colosseum') for (const h of L.hills) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(h.rad, 12, 8), hillMat);
    m.scale.y = h.sy; m.position.set(Math.cos(h.a) * h.d, -3, Math.sin(h.a) * h.d); world.add(m);
  }
  const mx = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), p3 = new THREE.Vector3();
  if (L.palisades.length) {
    const logs = L.palisades.flatMap(p => p.logs);
    const geo = uvScale(new THREE.CylinderGeometry(.32, .36, 3.2, 8), 1, 2);
    geo.translate(0, 0, 0);
    const inst = new THREE.InstancedMesh(geo, logMat, logs.length);
    logs.forEach((l, i) => { q.setFromAxisAngle(up, l.rot); sc.set(1, l.sy, 1); mx.compose(p3.set(l.x, 1.5 * l.sy, l.z), q, sc); inst.setMatrixAt(i, mx); });
    const tips = new THREE.InstancedMesh(new THREE.ConeGeometry(.34, .5, 8), logMat, logs.length);
    logs.forEach((l, i) => { q.setFromAxisAngle(up, l.rot); mx.compose(p3.set(l.x, 3.2 * l.sy + .22, l.z), q, sc.set(1, 1, 1)); tips.setMatrixAt(i, mx); });
    world.add(shadowy(inst), shadowy(tips));
  }
  if (M.id === 'river') {
    const water = new THREE.Mesh(new THREE.PlaneGeometry(420, 10.4), new THREE.MeshPhongMaterial({ color: 0x3a7aa3, specular: 0x9fc6de, shininess: 80, transparent: true, opacity: .84 }));
    water.rotation.x = -Math.PI / 2; water.position.y = -.18; water.receiveShadow = true; world.add(water);
    for (const bx of [-32, 32]) {
      const deck = new THREE.Mesh(uvScale(new THREE.BoxGeometry(5, .3, 14), 2, 5), woodMat); deck.position.set(bx, .22, 0); world.add(shadowy(deck));
      for (const sx of [-2.4, 2.4]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(.18, .9, 14), woodDark); rail.position.set(bx + sx, .8, 0); world.add(shadowy(rail)); }
    }
    const stoneM = lam(0x9a9b94, stoneTex());
    for (const s of L.stones) { const st = new THREE.Mesh(new THREE.DodecahedronGeometry(s.s), stoneM); st.position.set(s.x, -.15, s.z); world.add(shadowy(st)); }
  }
  // Grass Valley: most trees are broad oaks, the rest pines
  const isOak = t => M.id === 'valley' && ((Math.abs(t.x * 13 + t.z * 7) | 0) % 5) < 3;
  const oaks = L.trees.filter(isOak);
  if (oaks.length) {
    const n = oaks.length, cols = [0x4f7f33, 0x5d8c3a, 0x6b9640, 0x46742e].map(c => new THREE.Color(c));
    const trunk = new THREE.InstancedMesh(uvScale(new THREE.CylinderGeometry(.3, .45, 3, 7), 1, 2), lam(0x5a3e28, woodTex()), n);
    const crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(2.2, 1), lam(0xffffff, null, { flatShading: true }), n);
    const crown2 = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1.5, 1), lam(0xffffff, null, { flatShading: true }), n);
    oaks.forEach((t, i) => {
      const gy = terrainMeshY(t.x, t.z) - .1, s = t.s, rot = (t.x * 3.1 + t.z) % 6.28, col = cols[(Math.abs(t.x * 7 - t.z * 3) | 0) % cols.length];
      mx.makeScale(s, s, s); mx.setPosition(t.x, gy + 1.5 * s, t.z); trunk.setMatrixAt(i, mx);
      mx.makeRotationY(rot).scale(sc.set(s * 1.1, s * .85, s * 1.1)); mx.setPosition(t.x, gy + 4 * s, t.z); crown.setMatrixAt(i, mx); crown.setColorAt(i, col);
      mx.makeRotationY(rot).scale(sc.set(s, s * .9, s)); mx.setPosition(t.x + Math.cos(rot) * 1.1 * s, gy + 5.2 * s, t.z + Math.sin(rot) * 1.1 * s); crown2.setMatrixAt(i, mx); crown2.setColorAt(i, col.clone().multiplyScalar(1.12));
    });
    world.add(shadowy(trunk), shadowy(crown), shadowy(crown2));
    const anchors = oaks.map(t => ({ x: t.x, z: t.z, r: 2.3 * t.s }));
    for (const m of [trunk, crown, crown2]) seeThrough(m, anchors);
  }
  const pines = L.trees.filter(t => !isOak(t));
  if (pines.length) {
    const n = pines.length;
    const trunk = new THREE.InstancedMesh(uvScale(new THREE.CylinderGeometry(.25, .35, 2.4, 7), 1, 2), lam(0x5a3e28, woodTex()), n);
    const snowy = M.id === 'frost';
    const leaf1 = new THREE.InstancedMesh(new THREE.ConeGeometry(2.1, 4.2, 9), lam(snowy ? 0x2a4a3c : 0x2c5530), n);
    const leaf2 = new THREE.InstancedMesh(new THREE.ConeGeometry(1.5, 3.2, 9), lam(snowy ? 0xeef4f8 : 0x376a3a), n); // (Frost Hill: a cap of snow on top)
    pines.forEach((t, i) => {
      const gy = terrainMeshY(t.x, t.z) - .1;
      mx.makeScale(t.s, t.s, t.s); mx.setPosition(t.x, gy + 1.2 * t.s, t.z); trunk.setMatrixAt(i, mx);
      mx.makeScale(t.s, t.s, t.s); mx.setPosition(t.x, gy + 3.6 * t.s, t.z); leaf1.setMatrixAt(i, mx);
      mx.makeScale(t.s, t.s, t.s); mx.setPosition(t.x, gy + 5.4 * t.s, t.z); leaf2.setMatrixAt(i, mx);
    });
    world.add(shadowy(trunk), shadowy(leaf1), shadowy(leaf2));
    const anchors = pines.map(t => ({ x: t.x, z: t.z, r: 2 * t.s }));
    for (const m of [trunk, leaf1, leaf2]) seeThrough(m, anchors);
  }
  const mossy = M.id === 'valley', rockMat = mossy ? lam(0xffffff, stoneTex(), { vertexColors: true }) : lam(M.rock, stoneTex());
  const rockCol = new THREE.Color(0xb3ad9e), moss = new THREE.Color(0x6e913f);
  for (const r of L.rocks) {
    const geo = new THREE.DodecahedronGeometry(r.r);
    if (mossy) { // moss on the upward faces, weathered stone below
      const n = geo.attributes.normal, p = geo.attributes.position, cs = [], c = new THREE.Color();
      for (let i = 0; i < n.count; i++) { const up = n.getY(i) + Math.sin(p.getX(i) * 3 + p.getZ(i) * 2) * .15; c.copy(rockCol).lerp(moss, up > .45 ? Math.min(1, (up - .45) * 3) : 0); c.multiplyScalar(.92 + ((i * 37) % 10) / 60); cs.push(c.r, c.g, c.b); }
      geo.setAttribute('color', new THREE.Float32BufferAttribute(cs, 3));
    }
    const mm = new THREE.Mesh(geo, rockMat);
    mm.position.set(r.x, terrainMeshY(r.x, r.z) + r.r * (r.big ? .55 : .4), r.z); mm.rotation.set(r.rx, r.ry, 0); if (r.big) mm.scale.set(1, 1.35, 1); world.add(shadowy(mm));
  }
  TEAMS.forEach((t, i) => castleObjs.push(buildCastle(t, i)));
  if (L.withFort) buildFort(L);
  ctrlObjs = L.ctrlSpots && L.ctrlSpots.length ? buildControlPoints(L) : [];
  buildFeatures(L, world);
  if (M.id === 'valley') buildValley(world);
  if (M.id === 'frost') buildFrost(world);
  if (M.id === 'desert') buildDesert(world, L);
  if (M.id === 'forum') buildForum(world, L);
  buildGrass(L, LK);
}

function buildControlPoints(L) {
  return L.ctrlSpots.map(s => {
    const grp = new THREE.Group(); grp.position.set(s.x, groundY(s.x, s.z), s.z); world.add(grp);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, 3.2, 6), gateMat); pole.position.y = 1.6; grp.add(pole);
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.3, .9), new THREE.MeshLambertMaterial({ color: neutCol, side: THREE.DoubleSide })); cloth.position.set(.65, 2.6, 0); grp.add(cloth);
    const ring = new THREE.Mesh(new THREE.RingGeometry(CTRL.radius - .3, CTRL.radius, 40), new THREE.MeshBasicMaterial({ color: neutCol, transparent: true, opacity: .35, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = .05; grp.add(ring);
    shadowy(grp);
    return { id: s.id, grp, cloth, ring };
  });
}

function buildCastle(t, i) {
  const grp = new THREE.Group(), S = 7;
  const add = (geo, mat, x, y, z, ry = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.y = ry; grp.add(m); return m; };
  const wallGeo = uvScale(new THREE.BoxGeometry(S * 2, 4, 1.2), 14 / 3, 4 / 3);
  add(wallGeo, stoneMat, 0, 2, -S); add(wallGeo, stoneMat, -S, 2, 0, Math.PI / 2); add(wallGeo, stoneMat, S, 2, 0, Math.PI / 2);
  const half = uvScale(new THREE.BoxGeometry(S - 1.8, 4, 1.2), (S - 1.8) / 3, 4 / 3);
  add(half, stoneMat, -(S + 1.8) / 2, 2, S); add(half, stoneMat, (S + 1.8) / 2, 2, S);
  add(uvScale(new THREE.BoxGeometry(3.6, 1.2, 1.3), 1.2, .4), stoneMat, 0, 3.4, S);
  add(uvScale(new THREE.BoxGeometry(3.4, 2.8, .3), 2, 1), gateMat, 0, 1.4, S - .3);
  const cren = new THREE.InstancedMesh(new THREE.BoxGeometry(.8, .8, 1.3), stoneMat, 64);
  const mx = new THREE.Matrix4(); let n = 0;
  for (let k = -6; k <= 6; k += 1.5) for (const [x, z, ry] of [[k, -S, 0], [k, S, 0], [-S, k, 1], [S, k, 1]]) { if (n >= 64) break; mx.makeRotationY(ry ? Math.PI / 2 : 0); mx.setPosition(x, 4.4, z); cren.setMatrixAt(n++, mx); }
  cren.count = n; grp.add(cren);
  const towerGeo = uvScale(new THREE.CylinderGeometry(1.9, 2.1, 6.2, 12), 4, 2);
  const roofGeo = new THREE.ConeGeometry(2.4, 2.6, 12), roofMat = lam(0x7a3b2a);
  for (const [x, z] of [[-S, -S], [S, -S], [-S, S], [S, S]]) { add(towerGeo, stoneDark, x, 3.1, z); add(roofGeo, roofMat, x, 7.5, z); }
  add(uvScale(new THREE.BoxGeometry(5, 7.5, 5), 5 / 3, 7.5 / 3), stoneDark, 0, 3.75, -1.5);
  add(new THREE.ConeGeometry(4, 2.6, 4), roofMat, 0, 8.8, -1.5, Math.PI / 4);
  const banGeo = new THREE.PlaneGeometry(1.3, 3);
  for (const x of [-4.6, -2.6, 2.6, 4.6]) add(banGeo, banMats[i], x, 2.4, S + .62);
  add(new THREE.CylinderGeometry(.08, .08, 4, 6), gateMat, 0, 11.4, -1.5);
  const flag = add(new THREE.PlaneGeometry(2.6, 1.6), banMats[i], 1.3, 12.5, -1.5);
  grp.position.set(t.pos[0], 0, t.pos[1]);
  grp.rotation.y = Math.atan2(-t.pos[0], -t.pos[1]);
  world.add(shadowy(grp));
  return { grp, flag, fell: false };
}

function buildFort(L) {
  const grp = new THREE.Group(); grp.position.y = groundY(0, 0); world.add(grp);
  const seg = uvScale(new THREE.BoxGeometry(2.9, 2.2, .9), 1, .75);
  for (const s of L.fortSegments) { const m = new THREE.Mesh(seg, stoneMat); m.position.set(s.x, 1.1, s.z); m.rotation.y = -s.a + Math.PI / 2; grp.add(m); }
  for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + Math.PI / 12, m = new THREE.Mesh(new THREE.CylinderGeometry(.5, .6, 3, 8), stoneDark); m.position.set(Math.cos(a) * 6.4, 1.5, Math.sin(a) * 6.4); grp.add(m); }
  shadowy(grp);
  const banner = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, 3.4, 6), gateMat); pole.position.y = 1.7; banner.add(pole);
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.1), flagMat); cloth.position.set(.8, 2.8, 0); banner.add(cloth);
  const trim = new THREE.Mesh(new THREE.PlaneGeometry(1.6, .18), flagTrim); trim.position.set(.8, 2.2, .01); banner.add(trim);
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.3, 1.6, 28), new THREE.MeshBasicMaterial({ color: 0xffcf3a, transparent: true, opacity: .6, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = .06; banner.add(ring);
  pole.castShadow = cloth.castShadow = true;
  scene.add(banner);
  fort = { banner, ring, cloth };
}

// ---------- tall grass: instanced tufts that sway in the wind ----------
const grassU = { time: { value: 0 } };
const tuftGeo = (() => {
  const P = [], C = [], R = mulberry(3);
  for (let b = 0; b < 6; b++) {
    const a = R() * Math.PI * 2, r = R() * .22, h = .55 + R() * .5, w = .07, lean = (R() - .5) * .5;
    const bx = Math.cos(a) * r, bz = Math.sin(a) * r, dx = Math.cos(a + 1.57) * w, dz = Math.sin(a + 1.57) * w;
    const tx = bx + Math.cos(a) * lean, tz = bz + Math.sin(a) * lean;
    P.push(bx - dx, 0, bz - dz, bx + dx, 0, bz + dz, tx, h, tz,  bx + dx, 0, bz + dz, bx - dx, 0, bz - dz, tx, h, tz); // both faces
    C.push(.5, .5, .5, .5, .5, .5, 1, 1, 1, .5, .5, .5, .5, .5, .5, 1, 1, 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(C, 3));
  g.computeVertexNormals();
  return g;
})();
const grassMat = new THREE.MeshLambertMaterial({ vertexColors: true });
grassMat.onBeforeCompile = sh => {
  sh.uniforms.time = grassU.time;
  sh.vertexShader = 'uniform float time;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
    #ifdef USE_INSTANCING
      vec2 ip = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
    #else
      vec2 ip = vec2(0.);
    #endif
    float sway = sin(time * 1.7 + ip.x * .35 + ip.y * .22) * .5 + sin(time * 3.1 + ip.x * .9) * .18;
    transformed.x += sway * .16 * position.y * position.y;
    transformed.z += sway * .08 * position.y * position.y;`);
  // grass normals point up so tufts light like the ground they stand on
  sh.vertexShader = sh.vertexShader.replace('#include <beginnormal_vertex>', 'vec3 objectNormal = vec3(0., 1., 0.);');
};
function buildGrass(L, LK) {
  const n = Math.round(quality.cfg.grass * LK.grass);
  if (!n) return;
  const nWheat = G.map.id === 'valley' ? Math.min(3200, Math.round(n * .9)) : 0; // Grass Valley: standing wheat in the fields
  const R = mulberry((G.seed | 0) + 11), inst = new THREE.InstancedMesh(tuftGeo, grassMat, n + nWheat);
  const c1 = new THREE.Color(LK.grassCol[0]), c2 = new THREE.Color(LK.grassCol[1]), col = new THREE.Color();
  const mx = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3();
  const blocked = (x, z) => TEAMS.some(t => Math.hypot(t.pos[0] - x, t.pos[1] - z) < CASTLE_R + 1.5) || (L.withFort && Math.hypot(x, z) < 7.5)
    || (G.map.id === 'river' && Math.abs(z) < 6 && Math.hypot(x, z) >= 7) || nearObstacles(x, z).some(o => !o.castle && inside(o, x, z, .3)) || (L.round && Math.hypot(x, z) > L.round - 1);
  const patch = (x, z) => Math.sin(x * .09 + 1.3) * Math.cos(z * .08 - .7) + Math.sin(x * .031 - z * .027) * .8;
  let k = 0, tries = 0;
  while (k < n && tries < n * 6) {
    tries++;
    const x = (R() - .5) * 220, z = (R() - .5) * 220;
    if (patch(x, z) < -.2 + R() * .6 || blocked(x, z) || (nWheat && fieldAt(x, z)) || (G.map.id === 'frost' && onPond(x, z))) continue;
    const sz = .75 + R() * .7;
    e.set(0, R() * 6.28, 0); q.setFromEuler(e);
    mx.compose(v.set(x, terrainMeshY(x, z), z), q, s.set(sz, sz * (.8 + R() * .5), sz));
    inst.setMatrixAt(k, mx); inst.setColorAt(k, col.copy(c1).lerp(c2, R()));
    k++;
  }
  if (nWheat) {
    const w1 = new THREE.Color(0xb8923e), w2 = new THREE.Color(0xf2d98a);
    for (let j = 0, t = 0; j < nWheat && t < nWheat * 4; t++) {
      const x = (R() - .5) * 200, z = (R() - .5) * 200, f = fieldAt(x, z);
      if (!f || Math.abs(f.n) > f.f.hd - .4 || Math.abs(f.t) > f.f.hw - .4) continue;
      const sz = .95 + R() * .35;
      e.set(0, R() * 6.28, 0); q.setFromEuler(e);
      mx.compose(v.set(x, terrainMeshY(x, z), z), q, s.set(sz, sz * (1.5 + R() * .4), sz));
      inst.setMatrixAt(k, mx); inst.setColorAt(k, col.copy(w1).lerp(w2, R()));
      k++; j++;
    }
  }
  inst.count = k; inst.receiveShadow = true; inst.frustumCulled = false;
  world.add(inst);
}

// Castles sink as they weaken; the banner sits in the fort or on its carrier's back; grass sways.
export function updateWorldView(dt, fxHook) {
  grassU.time.value += dt;
  updateFeatures(dt, grassU.time.value);
  updateValley(dt, grassU.time.value);
  updateFrost(dt, grassU.time.value);
  updateDesert(dt, grassU.time.value);
  updateControlPoints();
  TEAMS.forEach((t, i) => {
    const s = G.teams[i], co = castleObjs[i]; if (!co || !s) return;
    const want = G.mode !== 'conquest' ? 1 : s.alive ? 1 - (1 - s.points / 100) * .12 : .28;
    co.grp.scale.y += (want - co.grp.scale.y) * Math.min(1, dt * 3);
    co.flag.visible = G.mode !== 'conquest' || s.alive;
    if (G.mode === 'conquest' && s.alive && s.points < 35 && Math.random() < dt * 6) fxHook('smoke', t.pos);
    if (G.mode === 'conquest' && !s.alive && !co.fell) { co.fell = true; fxHook('rubble', t.pos); }
  });
  const f = G.flag; if (!f || !fort) return;
  const b = fort.banner;
  if (f.state === 'carried' && f.carrier) {
    const c = f.carrier;
    b.position.set(c.x - Math.sin(c.face) * .45, c.y + .9, c.z - Math.cos(c.face) * .45); b.rotation.y = c.face + Math.PI / 2; b.scale.setScalar(.8);
    fort.ring.visible = false;
  } else {
    b.position.set(f.x, groundY(f.x, f.z), f.z); b.rotation.y = G.T * .6; b.scale.setScalar(1); fort.ring.visible = true;
  }
  fort.cloth.rotation.y = Math.sin(G.T * 3) * .25;
}
const ctrlCol = { own: [], neut: new THREE.Color(neutCol) };
function updateControlPoints() {
  const cps = G.ctrlPoints; if (!cps || !ctrlObjs.length) return;
  for (const o of ctrlObjs) {
    const p = cps[o.id]; if (!p) continue;
    const col = p.owner >= 0 ? (ctrlCol.own[p.owner] || (ctrlCol.own[p.owner] = new THREE.Color(TEAMS[p.owner % 4].hex))) : ctrlCol.neut;
    // (owner is a team index which may be >=4 in Duo modes; TEAMS only has 4 entries, hence % 4 here and in overlay.js's colorOf)
    o.cloth.material.color.lerp(col, .1);
    o.cloth.rotation.y = Math.sin(G.T * 2.4 + o.id) * .2;
    const contested = p.capturer != null && p.capturer !== p.owner && p.prog > 0;
    o.ring.material.color.lerp(contested ? new THREE.Color(0xffcf3a) : col, .1);
    o.ring.material.opacity = contested ? .35 + Math.sin(G.T * 6) * .2 : .35;
  }
}
export const grassTime = () => grassU.time.value;
