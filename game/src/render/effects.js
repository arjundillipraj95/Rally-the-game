// Hit sparks, floating text, paint splats on the ground and arrows in flight.
// Splats and arrows are batched (one draw call each); sparks and text are drawn on the 2D layer.
import * as THREE from 'three';
import { TEAMS } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { groundY, inRiver, rnd } from '../core/world.js';
import { scene } from './scene.js';
import { quality } from './quality.js';

export let parts = [];
export let floats = [];

export function spark(x, y, z, c, n) {
  const cap = quality.cfg.particles;
  for (let i = 0; i < n && parts.length < cap; i++) parts.push({ x, y, z, vx: rnd(-4, 4), vy: rnd(1, 5), vz: rnd(-4, 4), life: rnd(.25, .5), c, s: rnd(2, 4) });
}
export function puff(p) { if (parts.length < quality.cfg.particles + 40) parts.push(p); }
// Dust kicked up by hits and falls, tinted to the ground.
const DUST = { dunes: '#dcc69c', river: '#b7a888', forest: '#a89a7c', frost: '#f4f7fa' };
export function dust(x, z) {
  const c = DUST[G.map.id] || DUST.dunes, y = groundY(x, z) + .3;
  for (let i = 0; i < 3; i++) puff({ x: x + rnd(-.4, .4), y, z: z + rnd(-.4, .4), vx: rnd(-1, 1), vy: rnd(.8, 1.6), vz: rnd(-1, 1), life: rnd(.5, .8), c, s: rnd(5.5, 8) });
}
export function floatText(x, y, z, text, color) { floats.push({ x, y, z, text, color, t: 0 }); }

// Smoke from a failing castle, rubble when it falls.
export function castleFx(kind, pos) {
  if (kind === 'smoke') puff({ x: pos[0] + rnd(-6, 6), y: rnd(3, 6), z: pos[1] + rnd(-6, 6), vx: rnd(-.4, .4), vy: rnd(1.5, 3), vz: rnd(-.4, .4), life: rnd(1.2, 2), c: '#5b5550', s: rnd(5, 9) });
  else for (let k = 0; k < 30; k++) puff({ x: pos[0] + rnd(-8, 8), y: rnd(0, 6), z: pos[1] + rnd(-8, 8), vx: rnd(-3, 3), vy: rnd(1, 5), vz: rnd(-3, 3), life: rnd(1, 2.2), c: '#bdb3a2', s: rnd(3, 7) });
}

// ---------- splats: instanced planes, tinted per team, each with its own fade ----------
const MAX_SPLATS = 90;
const splatTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#ffffff';
  for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(32 + rnd(-14, 14), 32 + rnd(-14, 14), rnd(4, 12), 0, Math.PI * 2); x.fill(); }
  for (let i = 0; i < 8; i++) { x.beginPath(); x.arc(32 + rnd(-28, 28), 32 + rnd(-28, 28), rnd(1.5, 3.5), 0, Math.PI * 2); x.fill(); }
  return new THREE.CanvasTexture(c);
})();
const splatMat = new THREE.MeshBasicMaterial({ map: splatTex, transparent: true, depthWrite: false });
splatMat.onBeforeCompile = sh => {
  sh.vertexShader = 'attribute float aAlpha;\nvarying float vAlpha;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvAlpha = aAlpha;');
  sh.fragmentShader = 'varying float vAlpha;\n' + sh.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.a *= vAlpha;');
};
const splatGeo = new THREE.PlaneGeometry(1, 1);
const alphaAttr = new THREE.InstancedBufferAttribute(new Float32Array(MAX_SPLATS), 1);
splatGeo.setAttribute('aAlpha', alphaAttr);
const splatMesh = new THREE.InstancedMesh(splatGeo, splatMat, MAX_SPLATS);
splatMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX_SPLATS * 3), 3);
splatMesh.frustumCulled = false; splatMesh.count = 0;
scene.add(splatMesh);
let decals = [], slot = 0;
const splatCols = TEAMS.map(t => new THREE.Color(t.hex).multiplyScalar(.85));
const mx = new THREE.Matrix4(), q = new THREE.Quaternion(), eu = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3();

export function splat(x, z, s, ti) {
  if (inRiver(x, z)) return;
  const cap = quality.cfg.splats;
  if (decals.length >= cap) decals.shift();
  decals.push({ x, z, s, rot: rnd(0, 6), t: 0, c: splatCols[ti == null ? 1 : colorOf(ti)], lift: (slot++ % MAX_SPLATS) * .0004 });
}

// ---------- arrows ----------
const MAX_ARROWS = 160;
const arrowGeo = (() => { const g = new THREE.CylinderGeometry(.03, .03, .9, 4); g.rotateX(Math.PI / 2); return g; })();
const arrowMesh = new THREE.InstancedMesh(arrowGeo, new THREE.MeshLambertMaterial({ color: 0x3a2a1c }), MAX_ARROWS);
arrowMesh.frustumCulled = false; arrowMesh.count = 0; scene.add(arrowMesh);
const o3 = new THREE.Object3D();

export function effectsTick(dt) {
  for (const p of parts) { p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.vy -= (p.s > 5 ? -.5 : 9) * dt; p.life -= dt; }
  parts = parts.filter(p => p.life > 0 && p.y > -1);
  for (const f of floats) { f.t += dt; f.y += dt * 1.2; }
  floats = floats.filter(f => f.t < 1.3);
  for (const d of decals) d.t += dt;
  decals = decals.filter(d => d.t < 30);
}

export function drawEffects() {
  // splats
  decals.forEach((d, i) => {
    eu.set(-Math.PI / 2, 0, d.rot); q.setFromEuler(eu);
    mx.compose(v.set(d.x, groundY(d.x, d.z) + .04 + d.lift, d.z), q, sc.set(d.s, d.s, d.s));
    splatMesh.setMatrixAt(i, mx); splatMesh.setColorAt(i, d.c);
    alphaAttr.array[i] = d.t > 25 ? Math.max(0, .85 - (d.t - 25) / 5) : .85;
  });
  splatMesh.count = decals.length;
  splatMesh.instanceMatrix.needsUpdate = true; splatMesh.instanceColor.needsUpdate = true; alphaAttr.needsUpdate = true;
  // arrows
  let n = 0;
  for (const a of G.arrows) {
    if (n >= MAX_ARROWS) break;
    const dx = a.x - a.px, dy = a.y - a.py, dz = a.z - a.pz;
    o3.position.set(a.x, a.y, a.z);
    if (dx || dy || dz) { o3.lookAt(a.x + dx + 1e-4, a.y + dy, a.z + dz); a.q = (a.q || new THREE.Quaternion()).copy(o3.quaternion); }
    else if (a.q) o3.quaternion.copy(a.q);
    o3.updateMatrix(); arrowMesh.setMatrixAt(n++, o3.matrix);
  }
  arrowMesh.count = n; arrowMesh.instanceMatrix.needsUpdate = true;
}

export function clearEffects() { parts = []; floats = []; decals = []; }

// ---------- the captain's aura: a faint ring on the ground around your captain ----------
const auraMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .22, depthWrite: false, side: THREE.DoubleSide });
const auraRing = new THREE.Mesh(new THREE.RingGeometry(.93, 1, 72), auraMat);
auraRing.rotation.x = -Math.PI / 2; auraRing.renderOrder = 1; auraRing.visible = false;
scene.add(auraRing);
export function drawAura(p, radius, t) {
  auraRing.visible = !!(p && !p.dead && G.state === 'play');
  if (!auraRing.visible) return;
  auraRing.position.set(p.x, groundY(p.x, p.z) + .07, p.z);
  auraRing.scale.setScalar(radius);
  auraMat.color.set(TEAMS[colorOf(p.ti)].hex);
  auraMat.opacity = .16 + .08 * Math.sin(t * 2.4);
}
