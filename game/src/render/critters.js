// Chickens and goats. Pure scenery with opinions: chickens peck about and panic when soldiers come
// near (and burst into feathers if a horse or a flying body gets too close); goats amble, and only
// trot off when someone is practically on top of them. Worked out on each device, never sent online.
import * as THREE from 'three';
import { G, bus } from '../core/state.js';
import { groundY, mulberry, W } from '../core/world.js';
import { walkable } from '../core/nav.js';
import { scene } from './scene.js';
import { spark } from './effects.js';

const lam = c => new THREE.MeshLambertMaterial({ color: c });
const white = new THREE.MeshLambertMaterial({ color: 0xffffff });
const MAXC = 14, MAXG = 6;
// part list: [geometry, material, x, y, z, rx, ry, rz, which (0 body, 1 left legs, 2 right legs, 3 head)]
const CHICKEN = [
  [new THREE.SphereGeometry(.2, 10, 8), white, 0, .28, 0, 0, 0, 0, 0],
  [new THREE.SphereGeometry(.12, 8, 6), white, 0, .46, .15, 0, 0, 0, 3],
  [new THREE.BoxGeometry(.03, .08, .1), lam(0xd8342c), 0, .58, .15, 0, 0, 0, 3],
  [new THREE.ConeGeometry(.04, .09, 5), lam(0xf0a020), 0, .45, .28, Math.PI / 2, 0, 0, 3],
  [new THREE.BoxGeometry(.14, .12, .02), white, 0, .34, -.2, .5, 0, 0, 0], // tail
  [new THREE.CylinderGeometry(.015, .015, .16, 4), lam(0xf0a020), -.07, .08, 0, 0, 0, 0, 1],
  [new THREE.CylinderGeometry(.015, .015, .16, 4), lam(0xf0a020), .07, .08, 0, 0, 0, 0, 2],
];
const GOAT = [
  [new THREE.BoxGeometry(.42, .38, .85), white, 0, .62, 0, 0, 0, 0, 0],
  [new THREE.BoxGeometry(.26, .28, .34), white, 0, .9, .5, -.3, 0, 0, 3],
  [new THREE.ConeGeometry(.04, .26, 5), lam(0x3a3028), -.08, 1.1, .46, -.6, 0, 0, 3],
  [new THREE.ConeGeometry(.04, .26, 5), lam(0x3a3028), .08, 1.1, .46, -.6, 0, 0, 3],
  [new THREE.BoxGeometry(.06, .14, .06), lam(0xd8d0c0), 0, .7, .62, 0, 0, 0, 3], // beard
  [new THREE.BoxGeometry(.08, .44, .08), white, -.13, .22, .3, 0, 0, 0, 1],
  [new THREE.BoxGeometry(.08, .44, .08), white, .13, .22, -.3, 0, 0, 0, 1],
  [new THREE.BoxGeometry(.08, .44, .08), white, .13, .22, .3, 0, 0, 0, 2],
  [new THREE.BoxGeometry(.08, .44, .08), white, -.13, .22, -.3, 0, 0, 0, 2],
];
const GOAT_COLS = [0xf1ece0, 0x8a6a4a, 0x3c342e, 0xd9c7a4].map(c => new THREE.Color(c));

function meshes(parts, max) {
  return parts.map(p => {
    const m = new THREE.InstancedMesh(p[0], p[1], max); m.count = 0; m.castShadow = true; m.frustumCulled = false;
    if (p[1] === white) m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(max * 3).fill(1), 3);
    scene.add(m); return m;
  });
}
const chickMesh = meshes(CHICKEN, MAXC), goatMesh = meshes(GOAT, MAXG);
let critters = [];
if (import.meta.env.DEV) window.__critters = () => critters; // dev-only, for tests

// Scatter a few flocks and goats on open ground (none in the Colosseum's arena).
export function spawnCritters(seed) {
  critters = [];
  if (!G.map || G.map.id === 'colosseum') return;
  const R = mulberry((seed | 0) + 99), spot = (r0, r1) => {
    for (let k = 0; k < 40; k++) { const a = R() * Math.PI * 2, r = r0 + R() * (r1 - r0), x = Math.cos(a) * r, z = Math.sin(a) * r; if (walkable(x, z)) return [x, z]; }
    return null;
  };
  for (let f = 0; f < 4; f++) {
    const c = spot(14, 70); if (!c) continue;
    const n = 2 + Math.floor(R() * 3);
    for (let i = 0; i < n && critters.filter(k => k.kind === 'chicken').length < MAXC; i++) critters.push(make('chicken', c[0] + (R() - .5) * 3, c[1] + (R() - .5) * 3, R));
  }
  for (let g = 0; g < 4; g++) { const c = spot(20, 72); if (c) critters.push(make('goat', c[0], c[1], R)); }
}
function make(kind, x, z, R) {
  return { kind, x, z, y: groundY(x, z), h: R() * Math.PI * 2, spd: 0, want: 0, t: R() * 3, think: 0, scare: 0, walk: R() * 6, peck: 0, hop: 0, cluckT: 0,
    col: kind === 'goat' ? GOAT_COLS[Math.floor(R() * GOAT_COLS.length)] : null };
}

const m4 = new THREE.Matrix4(), root = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s1 = new THREE.Vector3(1, 1, 1);
const partM = [];
// drawn a size up (chunky chickens are funnier, and you can actually see them from the camera)
const BIG_CHICK = new THREE.Vector3(1.7, 1.7, 1.7), BIG_GOAT = new THREE.Vector3(1.15, 1.15, 1.15);
// head parts dip down and forward to peck or graze (a sphere spinning in place wouldn't show it)
function localM(p, legSwing, hb, chick) {
  const head = p[8] === 3, rx = p[5] + (p[8] === 1 ? legSwing : p[8] === 2 ? -legSwing : 0) + (head ? hb * .5 : 0);
  e.set(rx, p[6], p[7]); q.setFromEuler(e);
  return m4.compose(v.set(p[2], p[3] - (head ? hb * (chick ? .16 : .3) : 0), p[4] + (head ? hb * (chick ? .07 : .08) : 0)), q, s1);
}
export function updateCritters(dt) {
  if (!critters.length) { for (const m of chickMesh) m.count = 0; for (const m of goatMesh) m.count = 0; return; }
  let nc = 0, ng = 0;
  for (const c of critters) {
    const chick = c.kind === 'chicken', scareR = chick ? 5 : 2.6;
    c.think -= dt; c.cluckT -= dt;
    if (c.think <= 0) {
      c.think = .25 + Math.random() * .2;
      // who's close? run from them; a horse or a flying body right on top means feathers
      let nx = 0, nz = 0, n = 0, close = 1e9, splat = false;
      for (const u of G.units) {
        const dx = c.x - u.x, dz = c.z - u.z; if (Math.abs(dx) > scareR || Math.abs(dz) > scareR) continue;
        const d = Math.hypot(dx, dz); if (d > scareR) continue;
        nx += dx / (d || 1); nz += dz / (d || 1); n++; close = Math.min(close, d);
        if (chick && d < 1.4 && (u.mounted || (u.dead && u.launch && u.y - groundY(u.x, u.z) > .3))) splat = true;
      }
      if (n) {
        if (!c.scare && c.cluckT <= 0) { bus.emit('sfx', { name: chick ? 'bawk' : 'bleat', x: c.x, z: c.z }); c.cluckT = 2 + Math.random() * 2; }
        c.scare = 1.2; c.h = Math.atan2(nx, nz) + (Math.random() - .5) * .9; c.want = chick ? 5.5 : 2.4;
      } else if (c.scare <= 0) {
        // idle: wander, stop to peck/graze, wander again
        if (Math.random() < .08) { c.want = Math.random() < .5 ? 0 : chick ? 1 : .6; c.h += (Math.random() - .5) * 1.6; }
      }
      if (splat && c.cluckT < 1.5) { spark(c.x, c.y + .3, c.z, '#ffffff', 12); bus.emit('sfx', { name: 'bawk', x: c.x, z: c.z }); c.cluckT = 2; c.hop = .5; }
    }
    if (c.scare > 0) c.scare -= dt;
    c.spd += (c.want - c.spd) * Math.min(1, dt * (c.scare > 0 ? 8 : 3));
    const nx = c.x + Math.sin(c.h) * c.spd * dt, nz = c.z + Math.cos(c.h) * c.spd * dt;
    if (walkable(nx, nz) && Math.hypot(nx, nz) < W.R - 5) { c.x = nx; c.z = nz; } else { c.h += Math.PI * (.5 + Math.random()); }
    c.walk += dt * c.spd * (chick ? 9 : 5);
    if (c.hop > 0) c.hop -= dt;
    c.y = groundY(c.x, c.z) + (chick && c.scare > 0 ? Math.abs(Math.sin(c.walk * .6)) * .14 : 0) + (c.hop > 0 ? Math.sin(c.hop / .5 * Math.PI) * .6 : 0);
    const legSwing = Math.sin(c.walk) * Math.min(1, c.spd) * .6;
    const headBob = c.spd < .2 ? (chick ? Math.max(0, Math.sin(c.t += dt * 3) * 1.1) : .7 + Math.sin((c.t += dt) * 1.3) * .15) : Math.sin(c.walk * 2) * .12; // pecking / grazing
    e.set(0, c.h, 0); q.setFromEuler(e); root.compose(v.set(c.x, c.y, c.z), q, chick ? BIG_CHICK : BIG_GOAT);
    const parts = chick ? CHICKEN : GOAT, ms = chick ? chickMesh : goatMesh, i = chick ? nc++ : ng++;
    parts.forEach((p, k) => {
      partM[k] = partM[k] || new THREE.Matrix4();
      partM[k].multiplyMatrices(root, localM(p, legSwing, p[8] === 3 ? headBob : 0, chick));
      ms[k].setMatrixAt(i, partM[k]);
      if (ms[k].instanceColor && c.col) ms[k].setColorAt(i, c.col);
    });
  }
  for (const m of chickMesh) { m.count = nc; m.instanceMatrix.needsUpdate = true; }
  for (const m of goatMesh) { m.count = ng; m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
}
export function clearCritters() { critters = []; updateCritters(0); }
