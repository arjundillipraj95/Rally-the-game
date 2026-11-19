// (C2) drawing the stone throwers, their stones and the fire pots' flames. Each thrower is the onager model
// (models/onager.glb: the base, and the arm on its axle) turned the way it faces, a ring in its side's colour on the
// ground under it; the arm swings up as it throws (u.throwT) and winds back down over the reload. A broken one tips
// and sinks. A stone in the air: a dark ball on its arc, and a ring where it will land that tightens as it comes (every
// side sees it: that's the answer, walk out). A fire pot: flickering flame patches on the ground.
// C2b: two crewmen at the back of each (the soldier's far figure, team cloth): leaning on the winch as the arm comes
// down, stepping back as it lets go; a slam and whoosh when it throws, timber creaks while it winds, fires crackle.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STONE, TEAMS } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { groundY } from '../core/world.js';
import { scene } from './scene.js';
import { sfx } from '../ui/audio.js';
import { SRC, SCALE, SOLDIER_SCALE } from './heroload.js';
import { NEUTRAL } from '../config.js';

let proto = null;
new GLTFLoader().loadAsync('models/onager.glb').then(g => { proto = g.scene; }).catch(() => { /* drawn as soon as it loads */ });
const rigs = new Map(); // unit id -> { root, arm, ring }
const ringGeo = new THREE.RingGeometry(1.7, 2.1, 28).rotateX(-Math.PI / 2);
function rigFor(u) {
  let r = rigs.get(u.id); if (r) return r;
  const root = proto.clone(true); let arm = null;
  root.traverse(o => { if (o.name === 'onager_arm') arm = o; if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: u.neutral ? 0x9a9a9a : TEAMS[colorOf(u.ti)].hex, transparent: true, opacity: .55, depthWrite: false }));
  scene.add(root); scene.add(ring);
  r = { root, arm, ring }; rigs.set(u.id, r); return r;
}
// the arm: up in a quarter second when it throws, back down over most of the reload
function armAngle(u) {
  const t = G.T - (u.throwT ?? -9), up = .25, down = Math.max(1, (u.shootBase || STONE.flight) * .7);
  if (t < 0 || t > up + down) return 0;
  return t < up ? 1.22 * (t / up) : 1.22 * (1 - (t - up) / down);
}
// stones and markers: a few instanced meshes
const MAXS = 32;
const ballMesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.35, 1), new THREE.MeshLambertMaterial({ color: 0x5b5148 }), MAXS);
const markMesh = new THREE.InstancedMesh(new THREE.RingGeometry(.86, 1, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xd8432b, transparent: true, opacity: .7, depthWrite: false }), MAXS);
const fireMesh = new THREE.InstancedMesh(new THREE.CircleGeometry(1, 12).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xff7a1f, transparent: true, opacity: .55, depthWrite: false, blending: THREE.AdditiveBlending }), MAXS * 3);
// (C4) an arrow storm's mark: a red ring on the ground, pulsing for its warning, steady while it rains
const stormMesh = new THREE.InstancedMesh(new THREE.RingGeometry(.93, 1, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xe0281e, transparent: true, opacity: .75, depthWrite: false }), 8);
for (const m of [ballMesh, markMesh, fireMesh, stormMesh]) { m.frustumCulled = false; m.count = 0; scene.add(m); }
const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), S = new THREE.Vector3();
// C2b: the crew, one batch per army colour; where they stand behind the arm (m, in the onager's frame) and how they lean
const CREW = { at: [[-1.05, -1.9], [1.05, -1.9]], wind: .45, back: -.25, max: 64 }, crews = new Map();
function crewBatch(hex) {
  let b = crews.get(hex); if (b) return b; const L = SRC && SRC.spearLod; if (!L) return null;
  b = new THREE.InstancedMesh(L.geo, L.mats(hex), CREW.max); b.count = 0; b.frustumCulled = false; b.castShadow = true; scene.add(b); crews.set(hex, b); return b;
}
const E = new THREE.Euler();
export const crewDrawn = () => [...crews.values()].reduce((s, b) => s + b.count, 0); // (tests)
function drawCrew(u, r) {
  const hex = u.neutral ? NEUTRAL.hex : TEAMS[colorOf(u.ti)].hex, b = crewBatch(hex); if (!b || b.count >= CREW.max - 1) return;
  const t = G.T - (u.throwT ?? -9), down = Math.max(1, (u.shootBase || STONE.flight) * .7), sc = SCALE * SOLDIER_SCALE;
  const winding = t > .25 && t < .25 + down, lean = t >= 0 && t < .5 ? CREW.back * Math.sin(Math.PI * t / .5) : winding ? CREW.wind * (.8 + .2 * Math.sin(G.T * 6 + u.id)) : 0;
  const sn = Math.sin(u.face), cs = Math.cos(u.face);
  CREW.at.forEach(([lx, lz], i) => {
    const x = u.x + cs * lx + sn * lz, z = u.z - sn * lx + cs * lz;
    V.set(x, groundY(x, z) + .998 * sc - Math.abs(lean) * .15, z); E.set(lean, u.face + (i ? -.25 : .25), 0, 'YXZ'); Q.setFromEuler(E); S.setScalar(sc);
    M.compose(V, Q, S); b.setMatrixAt(b.count++, M);
  });
  // its sounds, from what the drawing shows (every phone): the throw, then creaks as the arm winds down
  if (r.lastThrow !== u.throwT) { if (r.lastThrow !== undefined && t < .3) sfx.throwRelease(u.x, u.z); r.lastThrow = u.throwT; }
  if (winding && G.T > (r.creakT || 0)) { r.creakT = G.T + .45 + Math.random() * .4; sfx.creak(u.x, u.z); }
}
export function drawThrowers() {
  const seen = new Set(); for (const b of crews.values()) b.count = 0;
  if (proto) for (const u of G.units) {
    if (u.kind !== 'thrower' || u.fog) continue;
    const gone = u.dead ? u.deadT || 0 : 0; if (gone > 4) continue; // (deadT: seconds since it broke)
    seen.add(u.id); const r = rigFor(u), y = groundY(u.x, u.z);
    r.root.position.set(u.x, y - Math.min(1.2, gone * .4), u.z); r.root.rotation.set(u.dead ? Math.min(.35, gone * .3) : 0, u.face, 0, 'YXZ');
    if (r.arm) r.arm.rotation.x = u.dead ? .2 : armAngle(u);
    r.ring.position.set(u.x, y + .06, u.z); r.ring.visible = !u.dead;
    if (!u.dead) drawCrew(u, r);
  }
  for (const b of crews.values()) b.instanceMatrix.needsUpdate = true;
  for (const [id, r] of rigs) if (!seen.has(id)) { scene.remove(r.root); scene.remove(r.ring); r.ring.material.dispose(); rigs.delete(id); }
  // stones on their arcs, and where each lands
  let n = 0;
  for (const st of G.stones) {
    if (n >= MAXS) break;
    const t = Math.min(1, st.t), gy1 = groundY(st.x1, st.z1), y0 = st.y0 ?? gy1 + 2.6;
    V.set(st.x0 + (st.x1 - st.x0) * t, y0 + (gy1 + .3 - y0) * t + 4 * STONE.peak * t * (1 - t), st.z0 + (st.z1 - st.z0) * t);
    M.compose(V, Q.identity(), S.set(1, 1, 1)); ballMesh.setMatrixAt(n, M);
    const k = STONE.area * (1.25 - .25 * t); V.set(st.x1, gy1 + .08, st.z1); M.compose(V, Q, S.set(k, 1, k)); markMesh.setMatrixAt(n, M);
    n++;
  }
  ballMesh.count = markMesh.count = n; ballMesh.instanceMatrix.needsUpdate = markMesh.instanceMatrix.needsUpdate = true;
  // fire pots: three flickering patches each
  let f = 0;
  for (const fi of G.fires) for (let k = 0; k < 3 && f < MAXS * 3; k++, f++) {
    const a = k * 2.1 + fi.id, d = k ? fi.r * .45 : 0, s = (fi.r * (k ? .55 : .8)) * (.85 + .15 * Math.sin(G.T * 9 + k * 2 + fi.id));
    const x = fi.x + Math.cos(a) * d, z = fi.z + Math.sin(a) * d;
    V.set(x, groundY(x, z) + .1 + k * .01, z); M.compose(V, Q.identity(), S.set(s, 1, s)); fireMesh.setMatrixAt(f, M);
  }
  fireMesh.count = f; fireMesh.instanceMatrix.needsUpdate = true;
  for (const fi of G.fires) if (Math.random() < .12) sfx.crackle(fi.x, fi.z); // (C2b: the pots crackle; the nearest are loudest)
  let w = 0;
  for (const st of G.storms || []) { if (w >= 8) break;
    const age = G.T - st.T0, k = st.r * (age < st.warn ? 1 + .06 * Math.sin(G.T * 14) : 1);
    V.set(st.x, groundY(st.x, st.z) + .1, st.z); M.compose(V, Q.identity(), S.set(k, 1, k)); stormMesh.setMatrixAt(w++, M); }
  stormMesh.count = w; stormMesh.instanceMatrix.needsUpdate = true;
}
