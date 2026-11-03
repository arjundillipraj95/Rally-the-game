// The home screen's meadow: life behind your captain while you dress him up. A shepherd in a straw hat
// walks his flock across the valley and keeps having to run after the one sheep that won't behave;
// goats graze, butterflies wander, flowers everywhere. Only on the home screen, never in a battle.
import * as THREE from 'three';
import { groundY, mulberry } from '../core/world.js';
import { scene } from './scene.js';

const lam = c => new THREE.MeshLambertMaterial({ color: c });
const toon = (() => { const d = new Uint8Array([150, 150, 150, 255, 215, 215, 215, 255, 255, 255, 255, 255]); const t = new THREE.DataTexture(d, 3, 1); t.magFilter = t.minFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const tmat = c => new THREE.MeshToonMaterial({ color: c, gradientMap: toon });
const ink = new THREE.MeshBasicMaterial({ color: 0x1b1512, side: THREE.BackSide });
ink.onBeforeCompile = sh => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n  transformed += normalize(normal) * .03;'); };

const root = new THREE.Group(); root.visible = false; scene.add(root);

// ---------- instanced parts: [geometry, material, x, y, z, rx, ry, rz, group (0 body, 1/2 legs, 3 head), outlined] ----------
function rig(parts, max) {
  return parts.map(p => {
    const m = new THREE.InstancedMesh(p[0], p[1], max); m.count = 0; m.frustumCulled = false; root.add(m);
    let o = null; if (false) { o = new THREE.InstancedMesh(p[0], ink, max); o.count = 0; o.frustumCulled = false; root.add(o); }
    return { m, o, p };
  });
}
const wool = tmat(0xf6f1e6), black = tmat(0x2a2422);
const SHEEP = [
  [new THREE.SphereGeometry(.42, 12, 10).scale(1, .82, 1.3), wool, 0, .62, 0, 0, 0, 0, 0, 1],
  [new THREE.SphereGeometry(.2, 8, 6), wool, 0, .9, .38, 0, 0, 0, 0, 0], // (a tuft on the back of the head)
  [new THREE.BoxGeometry(.22, .26, .3), black, 0, .82, .58, -.25, 0, 0, 3, 1],
  [new THREE.BoxGeometry(.18, .05, .08), black, -.15, .9, .5, 0, 0, .4, 3, 0],
  [new THREE.BoxGeometry(.18, .05, .08), black, .15, .9, .5, 0, 0, -.4, 3, 0],
  [new THREE.SphereGeometry(.035, 6, 4), tmat(0xffffff), -.06, .88, .73, 0, 0, 0, 3, 0], // (eyes: a little startled)
  [new THREE.SphereGeometry(.035, 6, 4), tmat(0xffffff), .06, .88, .73, 0, 0, 0, 3, 0],
  [new THREE.BoxGeometry(.08, .36, .08), black, -.16, .18, .3, 0, 0, 0, 1, 0],
  [new THREE.BoxGeometry(.08, .36, .08), black, .16, .18, -.3, 0, 0, 0, 1, 0],
  [new THREE.BoxGeometry(.08, .36, .08), black, .16, .18, .3, 0, 0, 0, 2, 0],
  [new THREE.BoxGeometry(.08, .36, .08), black, -.16, .18, -.3, 0, 0, 0, 2, 0],
];
const white = tmat(0xffffff);
const GOAT = [
  [new THREE.BoxGeometry(.42, .38, .85), white, 0, .62, 0, 0, 0, 0, 0, 1],
  [new THREE.BoxGeometry(.26, .28, .34), white, 0, .9, .5, -.3, 0, 0, 3, 1],
  [new THREE.ConeGeometry(.04, .26, 5), tmat(0x3a3028), -.08, 1.1, .46, -.6, 0, 0, 3, 0],
  [new THREE.ConeGeometry(.04, .26, 5), tmat(0x3a3028), .08, 1.1, .46, -.6, 0, 0, 3, 0],
  [new THREE.BoxGeometry(.06, .14, .06), tmat(0xd8d0c0), 0, .7, .62, 0, 0, 0, 3, 0],
  [new THREE.BoxGeometry(.08, .44, .08), white, -.13, .22, .3, 0, 0, 0, 1, 0],
  [new THREE.BoxGeometry(.08, .44, .08), white, .13, .22, -.3, 0, 0, 0, 1, 0],
  [new THREE.BoxGeometry(.08, .44, .08), white, .13, .22, .3, 0, 0, 0, 2, 0],
  [new THREE.BoxGeometry(.08, .44, .08), white, -.13, .22, -.3, 0, 0, 0, 2, 0],
];
GOAT.forEach(p => { if (p[1] === white) p.tint = true; });
const GOAT_COLS = [0x8a6a4a, 0xf1ece0, 0x3c342e].map(c => new THREE.Color(c));
const MAXS = 14, MAXG = 3;
const sheepRig = rig(SHEEP, MAXS), goatRig = rig(GOAT, MAXG);
for (const r of goatRig) if (r.p.tint) r.m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAXG * 3).fill(1), 3);

// ---------- the shepherd: a robe, a straw hat, a white beard and a crook ----------
const shep = new THREE.Group(); root.add(shep);
const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0, outline = true, parent = shep) => {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); parent.add(m);
  return m;
};
const skin = tmat(0xe4bc98);
add(new THREE.CylinderGeometry(.28, .5, 1.25, 12), tmat(0x8a6a3a), 0, .68, 0);                // robe
add(new THREE.CylinderGeometry(.3, .3, .08, 12), tmat(0x5a3a22), 0, 1.02, 0, 0, 0, 0, false);  // rope belt
const head = add(new THREE.SphereGeometry(.3, 12, 10), skin, 0, 1.55, 0);
add(new THREE.SphereGeometry(.24, 10, 8).scale(1, 1.2, .7), tmat(0xf4f1ea), 0, 1.4, .18);       // the beard
add(new THREE.SphereGeometry(.06, 6, 4), tmat(0xc8866a), 0, 1.55, .3, 0, 0, 0, false);           // the nose
add(new THREE.CylinderGeometry(.62, .62, .04, 20), tmat(0xe6c66a), 0, 1.8, 0, .08);               // hat brim
add(new THREE.ConeGeometry(.3, .38, 14), tmat(0xe6c66a), 0, 1.98, 0, .08);                       // hat crown
const armR = new THREE.Group(); armR.position.set(.34, 1.25, 0); shep.add(armR);
add(new THREE.CylinderGeometry(.09, .09, .55, 8), tmat(0x8a6a3a), 0, -.25, .05, -.4, 0, 0, true, armR);
const crook = new THREE.Group(); crook.position.set(0, -.5, .2); armR.add(crook);
add(new THREE.CylinderGeometry(.035, .035, 2.1, 6), tmat(0x6b4a2e), 0, .45, 0, 0, 0, 0, false, crook);
add(new THREE.TorusGeometry(.16, .035, 6, 12, Math.PI * 1.2), tmat(0x6b4a2e), -.16, 1.5, 0, 0, 0, Math.PI * -.1, false, crook);
const armL = new THREE.Group(); armL.position.set(-.34, 1.25, 0); shep.add(armL);
add(new THREE.CylinderGeometry(.09, .09, .55, 8), tmat(0x8a6a3a), 0, -.25, 0, .2, 0, 0, true, armL);

// ---------- butterflies and flowers ----------
const MAXB = 8;
const wingGeo = new THREE.PlaneGeometry(.22, .16).translate(.11, 0, 0);
const wingMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const wingL = new THREE.InstancedMesh(wingGeo, wingMat, MAXB), wingR = new THREE.InstancedMesh(wingGeo, wingMat, MAXB);
for (const w of [wingL, wingR]) { w.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAXB * 3), 3); w.frustumCulled = false; root.add(w); }
const BUTTER = [0xffd23a, 0xff8ac8, 0x9fe3ff, 0xffffff, 0xff9a3a].map(c => new THREE.Color(c));
const MAXF = 160;
const flowerGeo = new THREE.SphereGeometry(.09, 6, 4), stemGeo = new THREE.CylinderGeometry(.015, .015, .3, 3).translate(0, .15, 0);
const flowers = new THREE.InstancedMesh(flowerGeo, new THREE.MeshLambertMaterial({ color: 0xffffff }), MAXF);
const stems = new THREE.InstancedMesh(stemGeo, new THREE.MeshLambertMaterial({ color: 0x4f7a2a }), MAXF);
flowers.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAXF * 3), 3);
for (const f of [flowers, stems]) { f.frustumCulled = false; root.add(f); }
const PETALS = [0xffffff, 0xffd23a, 0xff6f91, 0xc59bff, 0xff9a3a, 0x8fd0ff].map(c => new THREE.Color(c));

// ---------- the scene's state ----------
let M = null; // { cx, cz, fx, fz, sheep[], goats[], bugs[], shep{}, t }
const m4 = new THREE.Matrix4(), base = new THREE.Matrix4(), q = new THREE.Quaternion(), eu = new THREE.Euler(), v = new THREE.Vector3(), s1 = new THREE.Vector3(1, 1, 1);

// cx, cz: where the captain stands; fx, fz: the way he looks (toward the camera). The flock lives behind him.
export function spawnMeadow(cx, cz, fx, fz, seed = 7) {
  const R = mulberry(seed), bx = -fx, bz = -fz, rx = -bz, rz = bx; // (behind him, and across)
  const at = (back, side) => [cx + bx * back + rx * side, cz + bz * back + rz * side];
  const [hx, hz] = at(17, -6);
  M = { cx, cz, bx, bz, rx, rz, t: 0, herd: { x: hx, z: hz, h: Math.atan2(rx, rz), dir: 1 }, sheep: [], goats: [], bugs: [], stray: null, strayT: 6 };
  for (let i = 0; i < 11; i++) { const a = R() * Math.PI * 2, r = 1 + R() * 3.2; M.sheep.push({ ox: Math.cos(a) * r, oz: Math.sin(a) * r, x: hx, z: hz, h: 0, spd: 0, walk: R() * 6, graze: R() * 3, bob: 0, s: .9 + R() * .25 }); }
  for (const [b, sd, k] of [[7, 6.5, 0], [10, -9, 1], [5, -7.5, 2]]) { const [x, z] = at(b, sd); M.goats.push({ x, z, h: R() * 6, spd: 0, want: 0, walk: 0, t: R() * 5, think: 0, col: GOAT_COLS[k] }); }
  for (let i = 0; i < MAXB; i++) { const [x, z] = at(2 + R() * 10, (R() - .5) * 14); M.bugs.push({ x, z, y: 1 + R() * 1.5, h: R() * 6, t: R() * 9, col: BUTTER[i % BUTTER.length] }); }
  M.shep = { x: hx - rx * 4, z: hz - rz * 4, h: 0, spd: 0, walk: 0 };
  // flowers: thick around the stage, thinning out behind
  let n = 0;
  for (let i = 0; i < MAXF; i++) {
    const back = -3 + Math.pow(R(), 1.6) * 30, side = (R() - .5) * (14 + back * 1.4), [x, z] = at(back, side);
    if (Math.hypot(x - cx, z - cz) < 1.6) continue; // (not under his boots)
    const y = groundY(x, z), s = .7 + R() * .7;
    eu.set(0, R() * 6, 0); q.setFromEuler(eu); m4.compose(v.set(x, y, z), q, v.clone().set(s, s, s)); stems.setMatrixAt(n, m4);
    m4.compose(v.set(x, y + .3 * s, z), q, new THREE.Vector3(s, s * .7, s)); flowers.setMatrixAt(n, m4); flowers.setColorAt(n, PETALS[(R() * PETALS.length) | 0]); n++;
  }
  flowers.count = stems.count = n; flowers.instanceMatrix.needsUpdate = stems.instanceMatrix.needsUpdate = true; flowers.instanceColor.needsUpdate = true;
  root.visible = true;
}
export function clearMeadow() { M = null; root.visible = false; }

function pose(rigs, i, x, y, z, h, scale, legSwing, headDip, col) {
  eu.set(0, h, 0); q.setFromEuler(eu); base.compose(v.set(x, y, z), q, s1.set(scale, scale, scale));
  for (const r of rigs) {
    const p = r.p, g = p[8];
    eu.set(p[5] + (g === 1 ? legSwing : g === 2 ? -legSwing : 0) + (g === 3 ? headDip * .5 : 0), p[6], p[7]); q.setFromEuler(eu);
    m4.compose(v.set(p[2], p[3] - (g === 3 ? headDip * .28 : 0), p[4] + (g === 3 ? headDip * .08 : 0)), q, s1.set(1, 1, 1));
    m4.premultiply(base);
    r.m.setMatrixAt(i, m4); if (r.o) r.o.setMatrixAt(i, m4);
    if (col && r.m.instanceColor && r.p.tint) r.m.setColorAt(i, col);
  }
}
const finish = (rigs, n) => { for (const r of rigs) { r.m.count = n; r.m.instanceMatrix.needsUpdate = true; if (r.m.instanceColor) r.m.instanceColor.needsUpdate = true; if (r.o) { r.o.count = n; r.o.instanceMatrix.needsUpdate = true; } } };
const turn = (h, want, k) => { let d = want - h; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return h + d * k; };

export function updateMeadow(dt) {
  if (!M) return;
  M.t += dt;
  // the flock drifts back and forth across the valley behind him
  const H = M.herd, span = 9;
  const off = (H.x - M.cx) * M.rx + (H.z - M.cz) * M.rz;
  if (off > span) H.dir = -1; else if (off < -span) H.dir = 1;
  H.x += M.rx * H.dir * .45 * dt; H.z += M.rz * H.dir * .45 * dt;
  // now and then one sheep makes a break for it, and the shepherd has to go and fetch it
  M.strayT -= dt;
  if (!M.stray && M.strayT <= 0) { const s = M.sheep[(Math.random() * M.sheep.length) | 0]; M.stray = s; s.run = 3.2; s.runH = Math.random() * Math.PI * 2; }
  let ns = 0;
  for (const s of M.sheep) {
    let tx = H.x + s.ox, tz = H.z + s.oz, want;
    if (s === M.stray && s.run > 0) { s.run -= dt; tx = s.x + Math.sin(s.runH) * 5; tz = s.z + Math.cos(s.runH) * 5; want = 3.4; }
    else {
      const d = Math.hypot(tx - s.x, tz - s.z); want = d > .6 ? Math.min(2.6, d * .8) : 0;
      if (s === M.stray && Math.hypot(M.shep.x - s.x, M.shep.z - s.z) < 1.6) { M.stray = null; M.strayT = 9 + Math.random() * 8; } // (caught: back he goes)
      if (s === M.stray) want = 0; // (he stands there looking pleased with himself until the shepherd arrives)
    }
    s.spd += (want - s.spd) * Math.min(1, dt * 3);
    if (s.spd > .05) { s.h = turn(s.h, Math.atan2(tx - s.x, tz - s.z), Math.min(1, dt * 5)); s.x += Math.sin(s.h) * s.spd * dt; s.z += Math.cos(s.h) * s.spd * dt; }
    s.walk += dt * s.spd * 6; s.graze += dt;
    const y = groundY(s.x, s.z) + (s.spd > 2 ? Math.abs(Math.sin(s.walk)) * .12 : 0);
    pose(sheepRig, ns++, s.x, y, s.z, s.h, s.s, Math.sin(s.walk) * Math.min(1, s.spd) * .7, s.spd < .2 ? .8 + Math.sin(s.graze * 1.4) * .2 : 0);
  }
  finish(sheepRig, ns);
  // the shepherd: behind the flock, or running after the runaway, waving his crook
  const P = M.shep, chase = M.stray;
  const tx = chase ? chase.x - Math.sin(chase.h) * .8 : H.x - M.rx * H.dir * 5, tz = chase ? chase.z - Math.cos(chase.h) * .8 : H.z - M.rz * H.dir * 5;
  const d = Math.hypot(tx - P.x, tz - P.z), want = d > .5 ? Math.min(chase ? 3.6 : 1.4, d) : 0;
  P.spd += (want - P.spd) * Math.min(1, dt * 3);
  if (P.spd > .05) { P.h = turn(P.h, Math.atan2(tx - P.x, tz - P.z), Math.min(1, dt * 4)); P.x += Math.sin(P.h) * P.spd * dt; P.z += Math.cos(P.h) * P.spd * dt; }
  P.walk += dt * P.spd * 5;
  shep.position.set(P.x, groundY(P.x, P.z) + Math.abs(Math.sin(P.walk)) * .06 * Math.min(1, P.spd), P.z); shep.rotation.y = P.h;
  armR.rotation.x = chase ? -1.2 + Math.sin(M.t * 9) * .5 : Math.sin(P.walk) * .2; // (the crook waved in the air while he runs)
  armL.rotation.x = -Math.sin(P.walk) * .3;
  head.rotation.y = chase ? 0 : Math.sin(M.t * .5) * .4;
  // goats: graze, wander a step or two
  let ng = 0;
  for (const g of M.goats) {
    g.think -= dt; if (g.think <= 0) { g.think = 1.5 + Math.random() * 3; g.want = Math.random() < .35 ? .7 : 0; g.h += (Math.random() - .5) * 1.4; }
    g.spd += (g.want - g.spd) * Math.min(1, dt * 3); g.x += Math.sin(g.h) * g.spd * dt; g.z += Math.cos(g.h) * g.spd * dt; g.walk += dt * g.spd * 5; g.t += dt;
    pose(goatRig, ng++, g.x, groundY(g.x, g.z), g.z, g.h, 1.15, Math.sin(g.walk) * Math.min(1, g.spd) * .6, g.spd < .2 ? .7 + Math.sin(g.t * 1.3) * .15 : 0, g.col);
  }
  finish(goatRig, ng);
  // butterflies: a lazy zigzag, wings flapping
  let nb = 0;
  for (const b of M.bugs) {
    b.t += dt; b.h += Math.sin(b.t * 1.7 + nb) * dt * 1.6;
    const pull = Math.hypot(b.x - M.cx, b.z - M.cz) > 12 ? Math.atan2(M.cx - b.x, M.cz - b.z) : null; if (pull != null) b.h = turn(b.h, pull, dt);
    b.x += Math.sin(b.h) * .9 * dt; b.z += Math.cos(b.h) * .9 * dt; b.y = groundY(b.x, b.z) + 1 + Math.sin(b.t * 1.3) * .5 + .6;
    const flap = Math.sin(b.t * 22) * .9;
    eu.set(0, b.h, 0); q.setFromEuler(eu); base.compose(v.set(b.x, b.y, b.z), q, s1.set(1, 1, 1));
    eu.set(0, 0, flap + .3); q.setFromEuler(eu); m4.compose(v.set(0, 0, 0), q, s1.set(1, 1, 1)).premultiply(base); wingR.setMatrixAt(nb, m4);
    eu.set(0, Math.PI, flap + .3); q.setFromEuler(eu); m4.compose(v.set(0, 0, 0), q, s1.set(1, 1, 1)).premultiply(base); wingL.setMatrixAt(nb, m4);
    wingL.setColorAt(nb, b.col); wingR.setColorAt(nb, b.col); nb++;
  }
  for (const w of [wingL, wingR]) { w.count = nb; w.instanceMatrix.needsUpdate = true; w.instanceColor.needsUpdate = true; }
}
