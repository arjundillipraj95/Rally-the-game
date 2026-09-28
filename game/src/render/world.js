// Builds the 3D scenery for a map layout: ground, hills, fences, trees, river, castles, centre fort.
import * as THREE from 'three';
import { TEAMS, CASTLE_R } from '../config.js';
import { G } from '../core/state.js';
import { groundY, terrainMeshY } from '../core/world.js';
import { scene, setSky } from './scene.js';

let world = null;
export let castleObjs = [];
export let fort = null;

const stoneMat = new THREE.MeshLambertMaterial({ color: 0x9a968f });
const stoneDark = new THREE.MeshLambertMaterial({ color: 0x74716b });
const gateMat = new THREE.MeshLambertMaterial({ color: 0x2a211a });
const flagMat = new THREE.MeshLambertMaterial({ color: 0xf6f0e0, side: THREE.DoubleSide });
const flagTrim = new THREE.MeshLambertMaterial({ color: 0xffcf3a, side: THREE.DoubleSide });
const banMats = TEAMS.map(t => new THREE.MeshLambertMaterial({ color: t.hex, side: THREE.DoubleSide }));

function dispose(g) { g.traverse(o => { if (o.geometry) o.geometry.dispose(); }); scene.remove(g); }

export function buildWorldView(L) {
  if (world) dispose(world);
  if (fort) scene.remove(fort.banner);
  world = new THREE.Group(); scene.add(world);
  castleObjs = []; fort = null;
  const M = G.map;
  setSky(M);
  // ground
  const g = new THREE.PlaneGeometry(420, 420, 110, 110); g.rotateX(-Math.PI / 2);
  const pos = g.attributes.position, cols = [];
  const c1 = new THREE.Color(M.g1), c2 = new THREE.Color(M.g2), c3 = new THREE.Color(M.g3), mud = new THREE.Color(0x7a6a4c);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i), r = Math.hypot(x, z);
    pos.setY(i, terrainMeshY(x, z));
    const t = (Math.sin(x * .11 + z * .07) + 1) / 2;
    const c = c1.clone().lerp(c2, t * .8); if (r > 92) c.lerp(c3, Math.min(1, (r - 92) / 40));
    if (M.id === 'river' && Math.abs(z) < 6.5 && Math.hypot(x, z) >= 7.5) c.lerp(mud, .6);
    cols.push(c.r, c.g, c.b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3)); g.computeVertexNormals();
  world.add(new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true })));
  const hillMat = new THREE.MeshLambertMaterial({ color: M.hill });
  for (const h of L.hills) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(h.rad, 10, 6), hillMat);
    m.scale.y = h.sy; m.position.set(Math.cos(h.a) * h.d, -3, Math.sin(h.a) * h.d); world.add(m);
  }
  const mx = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), p3 = new THREE.Vector3();
  if (L.palisades.length) {
    const logs = L.palisades.flatMap(p => p.logs);
    const inst = new THREE.InstancedMesh(new THREE.CylinderGeometry(.32, .36, 3.2, 7), new THREE.MeshLambertMaterial({ color: 0x4a3526 }), logs.length);
    logs.forEach((l, i) => { q.setFromAxisAngle(up, l.rot); sc.set(1, l.sy, 1); mx.compose(p3.set(l.x, 1.5 * l.sy, l.z), q, sc); inst.setMatrixAt(i, mx); });
    world.add(inst);
  }
  if (M.id === 'river') {
    const water = new THREE.Mesh(new THREE.PlaneGeometry(420, 10.4), new THREE.MeshLambertMaterial({ color: 0x3f7fa6, transparent: true, opacity: .82 }));
    water.rotation.x = -Math.PI / 2; water.position.y = -.18; world.add(water);
    const wood = new THREE.MeshLambertMaterial({ color: 0x6b4a2e }), woodD = new THREE.MeshLambertMaterial({ color: 0x4a3320 });
    for (const bx of [-32, 32]) {
      const deck = new THREE.Mesh(new THREE.BoxGeometry(5, .3, 14), wood); deck.position.set(bx, .22, 0); world.add(deck);
      for (const sx of [-2.4, 2.4]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(.18, .9, 14), woodD); rail.position.set(bx + sx, .8, 0); world.add(rail); }
    }
    const stoneM = new THREE.MeshLambertMaterial({ color: 0x9a9b94 });
    for (const s of L.stones) { const st = new THREE.Mesh(new THREE.DodecahedronGeometry(s.s), stoneM); st.position.set(s.x, -.15, s.z); world.add(st); }
  }
  if (L.trees.length) {
    const n = L.trees.length;
    const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(.25, .35, 2.4, 6), new THREE.MeshLambertMaterial({ color: 0x5a3e28 }), n);
    const leaf1 = new THREE.InstancedMesh(new THREE.ConeGeometry(2.1, 4.2, 8), new THREE.MeshLambertMaterial({ color: 0x2f5a34 }), n);
    const leaf2 = new THREE.InstancedMesh(new THREE.ConeGeometry(1.5, 3.2, 8), new THREE.MeshLambertMaterial({ color: 0x3a6a3c }), n);
    L.trees.forEach((t, i) => {
      mx.makeScale(t.s, t.s, t.s); mx.setPosition(t.x, 1.2 * t.s, t.z); trunk.setMatrixAt(i, mx);
      mx.makeScale(t.s, t.s, t.s); mx.setPosition(t.x, 3.6 * t.s, t.z); leaf1.setMatrixAt(i, mx);
      mx.makeScale(t.s, t.s, t.s); mx.setPosition(t.x, 5.4 * t.s, t.z); leaf2.setMatrixAt(i, mx);
    });
    world.add(trunk, leaf1, leaf2);
  }
  const rockMat = new THREE.MeshLambertMaterial({ color: M.rock });
  for (const r of L.rocks) {
    const mm = new THREE.Mesh(new THREE.DodecahedronGeometry(r.r), rockMat);
    mm.position.set(r.x, groundY(r.x, r.z) + r.r * .4, r.z); mm.rotation.set(r.rx, r.ry, 0); world.add(mm);
  }
  TEAMS.forEach((t, i) => castleObjs.push(buildCastle(t, i)));
  if (L.withFort) buildFort(L);
}

function buildCastle(t, i) {
  const grp = new THREE.Group(), S = 7;
  const add = (geo, mat, x, y, z, ry = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.y = ry; grp.add(m); return m; };
  const wallGeo = new THREE.BoxGeometry(S * 2, 4, 1.2);
  add(wallGeo, stoneMat, 0, 2, -S); add(wallGeo, stoneMat, -S, 2, 0, Math.PI / 2); add(wallGeo, stoneMat, S, 2, 0, Math.PI / 2);
  const half = new THREE.BoxGeometry(S - 1.8, 4, 1.2);
  add(half, stoneMat, -(S + 1.8) / 2, 2, S); add(half, stoneMat, (S + 1.8) / 2, 2, S);
  add(new THREE.BoxGeometry(3.6, 1.2, 1.3), stoneMat, 0, 3.4, S);
  add(new THREE.BoxGeometry(3.4, 2.8, .3), gateMat, 0, 1.4, S - .3);
  const cren = new THREE.InstancedMesh(new THREE.BoxGeometry(.8, .8, 1.3), stoneMat, 64);
  const mx = new THREE.Matrix4(); let n = 0;
  for (let k = -6; k <= 6; k += 1.5) for (const [x, z, ry] of [[k, -S, 0], [k, S, 0], [-S, k, 1], [S, k, 1]]) { if (n >= 64) break; mx.makeRotationY(ry ? Math.PI / 2 : 0); mx.setPosition(x, 4.4, z); cren.setMatrixAt(n++, mx); }
  cren.count = n; grp.add(cren);
  const towerGeo = new THREE.CylinderGeometry(1.9, 2.1, 6.2, 10);
  for (const [x, z] of [[-S, -S], [S, -S], [-S, S], [S, S]]) add(towerGeo, stoneDark, x, 3.1, z);
  add(new THREE.BoxGeometry(5, 7.5, 5), stoneDark, 0, 3.75, -1.5);
  const banGeo = new THREE.PlaneGeometry(1.3, 3);
  for (const x of [-4.6, -2.6, 2.6, 4.6]) add(banGeo, banMats[i], x, 2.4, S + .62);
  add(new THREE.CylinderGeometry(.08, .08, 4, 6), gateMat, 0, 9.5, -1.5);
  const flag = add(new THREE.PlaneGeometry(2.6, 1.6), banMats[i], 1.3, 10.6, -1.5);
  grp.position.set(t.pos[0], 0, t.pos[1]);
  grp.rotation.y = Math.atan2(-t.pos[0], -t.pos[1]);
  world.add(grp);
  return { grp, flag, fell: false };
}

function buildFort(L) {
  const grp = new THREE.Group(); grp.position.y = groundY(0, 0); world.add(grp);
  const seg = new THREE.BoxGeometry(2.9, 2.2, .9);
  for (const s of L.fortSegments) { const m = new THREE.Mesh(seg, stoneMat); m.position.set(s.x, 1.1, s.z); m.rotation.y = -s.a + Math.PI / 2; grp.add(m); }
  for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + Math.PI / 12, m = new THREE.Mesh(new THREE.CylinderGeometry(.5, .6, 3, 8), stoneDark); m.position.set(Math.cos(a) * 6.4, 1.5, Math.sin(a) * 6.4); grp.add(m); }
  const banner = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, 3.4, 6), gateMat); pole.position.y = 1.7; banner.add(pole);
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.1), flagMat); cloth.position.set(.8, 2.8, 0); banner.add(cloth);
  const trim = new THREE.Mesh(new THREE.PlaneGeometry(1.6, .18), flagTrim); trim.position.set(.8, 2.2, .01); banner.add(trim);
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.3, 1.6, 28), new THREE.MeshBasicMaterial({ color: 0xffcf3a, transparent: true, opacity: .6, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = .06; banner.add(ring);
  scene.add(banner);
  fort = { banner, ring, cloth };
}

// Castles sink as they weaken; the banner sits in the fort or on its carrier's back.
export function updateWorldView(dt, fxHook) {
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
export { CASTLE_R };
