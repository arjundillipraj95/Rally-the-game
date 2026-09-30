// The Forum's dressing: an aqueduct striding along the northern horizon, cypress trees, washing
// strung between the houses, awnings, amphorae and potted plants in the streets. Scenery only.
import * as THREE from 'three';
import { terrainMeshY, mulberry, W } from '../core/world.js';
import { stoneTex, uvScale } from './look.js';

// ground colour hook: pale marble in the forum square, warm cobbles in the streets, dusty beyond
const square = new THREE.Color(0xf1ebde), street = new THREE.Color(0xc9ab84), dust = new THREE.Color(0xcdb690);
export function forumGround(c, x, z) {
  const r = Math.hypot(x, z);
  if (r < 17.5) c.lerp(square, .6);
  else if (r > W.R - 2) c.lerp(dust, Math.min(.6, (r - W.R + 2) / 12));
  else c.lerp(street, .12); // (the roads, painted after, trace the streets)
}

const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const M = {
  brick: lam(0xc9a27a, stoneTex()), brickDark: lam(0xa9825c, stoneTex()), cypress: lam(0x2f4a2c, null, { flatShading: true }), trunk: lam(0x5a4030),
  terracotta: lam(0xb8643a), pot: lam(0xa0522d), leaf: lam(0x4f7a34, null, { flatShading: true }), rope: lam(0x6a5a44), cloth: lam(0xffffff, null, { side: THREE.DoubleSide }),
};
const shadowy = o => { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const mx = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3();
const put = (inst, i, x, y, z, ry, sx, sy, sz) => { e.set(0, ry, 0); q.setFromEuler(e); mx.compose(v.set(x, y, z), q, s.set(sx, sy, sz)); inst.setMatrixAt(i, mx); };

function stripes(a, b) {
  const c = document.createElement('canvas'); c.width = 64; c.height = 8; const x = c.getContext('2d');
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? a : b; x.fillRect(i * 8, 0, 8, 8); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function buildForum(world, L) {
  const R = mulberry(3131);
  const houses = L.buildings.filter(b => b.kind === 'house');

  // ---- the aqueduct: two tiers of arches running across the northern skyline ----
  {
    const Z = 112 * W.S, top = 17, span = 7, piers = [], upper = [], lintels = [];
    for (let x = -126 * W.S; x <= 126 * W.S; x += span) {
      const gy = terrainMeshY(x, Z) - 1, h = top - gy - 7; if (h < 1) continue;
      piers.push([x, gy + h / 2, h]); upper.push([x, top - 3.5]); lintels.push(x);
    }
    const pi = new THREE.InstancedMesh(uvScale(new THREE.BoxGeometry(1.8, 1, 2.2), 1, 3), M.brick, piers.length);
    piers.forEach(([x, y, h], i) => put(pi, i, x, y, Z, 0, 1, h, 1));
    const ui = new THREE.InstancedMesh(uvScale(new THREE.BoxGeometry(1.3, 7, 1.8), .5, 2), M.brick, upper.length);
    upper.forEach(([x, y], i) => put(ui, i, x, y, Z, 0, 1, 1, 1));
    // arches: half-rings between the piers, on each tier
    const arch = new THREE.TorusGeometry(span / 2 - .6, .55, 6, 12, Math.PI);
    const ai = new THREE.InstancedMesh(arch, M.brickDark, lintels.length * 2);
    lintels.forEach((x, i) => { put(ai, i * 2, x + span / 2, top - 7.2, Z, 0, 1, 1, 1.8); put(ai, i * 2 + 1, x + span / 2, top - 1.2, Z, 0, 1, .8, 1.5); });
    const channel = new THREE.Mesh(uvScale(new THREE.BoxGeometry(252 * W.S, 1.4, 2.6), 60, 1), M.brickDark); channel.position.set(0, top + .7, Z);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(252 * W.S, .7, 2.4), M.brick); deck.position.set(0, top - 7 + .35 + 0, Z);
    world.add(shadowy(pi), shadowy(ui), shadowy(ai), shadowy(channel), shadowy(deck));
  }

  // ---- cypresses: an avenue round the edge of the city, and a few by the temples ----
  const cyp = [];
  for (let k = 0; k < 44; k++) { const a = k / 44 * Math.PI * 2 + R() * .05, d = (96 + R() * 6) * W.S; cyp.push([Math.cos(a) * d, Math.sin(a) * d, 1 + R() * .5]); }
  for (const [tx, tz] of [[0, 50], [50, 0], [0, -50], [-50, 0]]) for (const sd of [-1, 1]) {
    const px = tz ? sd * 12.5 : tx * 1.14, pz = tx ? sd * 12.5 : tz * 1.14; cyp.push([px, pz, .9 + R() * .3]);
  }
  const ct = new THREE.InstancedMesh(new THREE.CylinderGeometry(.18, .25, 1.4, 6), M.trunk, cyp.length);
  const cf = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), M.cypress, cyp.length);
  cyp.forEach(([x, z, sc], i) => { const y = terrainMeshY(x, z); put(ct, i, x, y + .7 * sc, z, 0, sc, sc, sc); put(cf, i, x, y + 4.2 * sc, z, R() * 6, 1.05 * sc, 3.6 * sc, 1.05 * sc); });
  world.add(shadowy(ct), shadowy(cf));

  // ---- life along the streets: amphorae, potted plants, awnings, washing lines ----
  const amph = [], pots = [];
  for (const b of houses) for (const [fx, fz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
    if (R() < .45) continue;
    const t = (R() - .5) * .7, x = b.x + fx * (b.w / 2 + .45) + (fz ? t * b.w : 0), z = b.z + fz * (b.d / 2 + .45) + (fx ? t * b.d : 0);
    (R() < .55 ? amph : pots).push([x, z, R()]);
  }
  const ab = new THREE.InstancedMesh(new THREE.SphereGeometry(.34, 10, 8), M.terracotta, amph.length * 2);
  amph.forEach(([x, z, k], i) => { put(ab, i * 2, x, .5, z, 0, 1, 1.45, 1); put(ab, i * 2 + 1, x + .5, .45, z + (k - .5), 0, .85, 1.3, .85); });
  const pb = new THREE.InstancedMesh(new THREE.CylinderGeometry(.34, .26, .6, 10), M.pot, pots.length);
  const pl = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.55, 0), M.leaf, pots.length);
  pots.forEach(([x, z], i) => { put(pb, i, x, .3, z, 0, 1, 1, 1); put(pl, i, x, .95, z, i, 1, 1.1, 1); });
  world.add(shadowy(ab), shadowy(pb), shadowy(pl));

  // striped awnings over some doors
  const aw = ['#b8392e', '#2f6fb0', '#d9a21c', '#3f8a4a'].map(c => lam(0xffffff, stripes(c, '#f4ecd8'), { side: THREE.DoubleSide }));
  for (const b of houses) {
    if (R() < .5) continue;
    const [fx, fz] = [[0, 1], [0, -1], [1, 0], [-1, 0]][(R() * 4) | 0];
    const m = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.4), aw[(R() * aw.length) | 0]);
    m.position.set(b.x + fx * (b.w / 2 + .6), 2.5, b.z + fz * (b.d / 2 + .6));
    m.rotation.set(0, fx ? Math.PI / 2 * fx : fz < 0 ? Math.PI : 0, 0); m.rotateX(-Math.PI / 2 + .45);
    m.castShadow = true; world.add(m);
  }

  // washing strung across the streets between facing houses, high above the fighting
  const colors = [0xf4efe4, 0xc9362e, 0x2f5fb0, 0xe0b040, 0x8a5aa0].map(c => new THREE.Color(c));
  // pairs of houses that face each other across a street (overlapping along one axis, a street's width apart on the other)
  const lines = [];
  for (let i = 0; i < houses.length; i++) for (let j = i + 1; j < houses.length; j++) {
    const a = houses[i], b = houses[j];
    const gx = Math.abs(a.x - b.x) - (a.w + b.w) / 2, gz = Math.abs(a.z - b.z) - (a.d + b.d) / 2;
    let p = null;
    if (gx < -1.5 && gz > 3 && gz < 12) { const x = (Math.max(a.x - a.w / 2, b.x - b.w / 2) + Math.min(a.x + a.w / 2, b.x + b.w / 2)) / 2, s2 = Math.sign(b.z - a.z); p = [x, a.z + s2 * a.d / 2, x, b.z - s2 * b.d / 2]; }
    if (gz < -1.5 && gx > 3 && gx < 12) { const z = (Math.max(a.z - a.d / 2, b.z - b.d / 2) + Math.min(a.z + a.d / 2, b.z + b.d / 2)) / 2, s2 = Math.sign(b.x - a.x); p = [a.x + s2 * a.w / 2, z, b.x - s2 * b.w / 2, z]; }
    if (p && R() < .8) lines.push([p, Math.min(a.h, b.h) - .7]);
  }
  const clothes = [];
  for (const [[x0, z0, x1, z1], y] of lines.slice(0, 16)) {
    const dx = x1 - x0, dz = z1 - z0, len = Math.hypot(dx, dz);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, len, 4).rotateZ(Math.PI / 2), M.rope);
    rope.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); rope.rotation.y = -Math.atan2(dz, dx); world.add(rope);
    for (let k = 1; k < 6; k++) { const t = k / 6 + (R() - .5) * .05; if (R() < .2) continue; clothes.push([x0 + dx * t, y - .5, z0 + dz * t, -Math.atan2(dz, dx), colors[(R() * colors.length) | 0], .6 + R() * .5]); }
  }
  const ci = new THREE.InstancedMesh(new THREE.PlaneGeometry(.8, .9), M.cloth, Math.max(1, clothes.length));
  clothes.forEach(([x, y, z, ry, col, w], i) => { put(ci, i, x, y, z, ry, w, 1, 1); ci.setColorAt(i, col); });
  ci.count = clothes.length; world.add(ci);
}
