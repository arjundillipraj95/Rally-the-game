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
  // a bright, near-instant flash at the point of impact sells the hit before the debris scatters
  if (parts.length < cap) parts.push({ x, y, z, vx: 0, vy: rnd(.2, .6), vz: 0, life: .22, c: '#fff8e6', s: 9 });
  for (let i = 0; i < n && parts.length < cap; i++) parts.push({ x, y, z, vx: rnd(-4, 4), vy: rnd(1, 5), vz: rnd(-4, 4), life: rnd(.25, .5), c, s: rnd(2, 4) });
}
export function puff(p) { if (parts.length < quality.cfg.particles + 40) parts.push(p); }
// A weapon's blade tip leaves a brief, near-stationary streak so a fast swing reads as motion,
// not a snap between poses. Cheap: reuses the same particle pool, just near-zero velocity.
export function trail(x, y, z, c) {
  if (parts.length < quality.cfg.particles) parts.push({ x, y, z, vx: rnd(-.2, .2), vy: rnd(-.1, .2), vz: rnd(-.2, .2), life: rnd(.08, .14), c, s: rnd(2.5, 4) });
}
// Dust kicked up by hits and falls, tinted to the ground.
const DUST = { dunes: '#dcc69c', river: '#b7a888', forest: '#a89a7c', frost: '#f4f7fa' };
export function dust(x, z) {
  const c = DUST[G.map.id] || DUST.dunes, y = groundY(x, z) + .3;
  for (let i = 0; i < 3; i++) puff({ x: x + rnd(-.4, .4), y, z: z + rnd(-.4, .4), vx: rnd(-1, 1), vy: rnd(.8, 1.6), vz: rnd(-1, 1), life: rnd(.5, .8), c, s: rnd(5.5, 8) });
}
export function floatText(x, y, z, text, color) { floats.push({ x, y, z, text, color, t: 0 }); }
// Comic-book sound words on the big blows near you ("WHACK!", "BONK!"), drawn as a burst on the 2D layer.
export let pows = [];
export function pow(x, y, z, text, color = '#ffd23a') { if (pows.length < 4) pows.push({ x, y, z, text, color, t: 0, rot: rnd(-.25, .25) }); }

// ---------- swing arcs: a crescent swoosh through the path of each blade stroke ----------
const MAX_SLASH = 24;
// a flat arc in the XZ plane, sweeping from the left (trailing edge, uv.x 0) to the right (leading edge)
const slashGeo = (() => {
  const seg = 18, pos = [], uv = [], idx = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg, a = -1.3 + 2.6 * t;
    for (const [r, v] of [[.3, 0], [1, 1]]) { pos.push(Math.sin(a) * r, 0, Math.cos(a) * r); uv.push(t, v); }
    if (i < seg) { const b = i * 2; idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2); }
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('aSl', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
  return g;
})();
const slashAlpha = new THREE.InstancedBufferAttribute(new Float32Array(MAX_SLASH), 1);
slashGeo.setAttribute('aAlpha', slashAlpha);
// drawn over everything, like a comic swoosh, so the stroke still reads through a crowd
// (a white stroke with a thin ink edge, solid at the leading end and thinning away behind it)
const slashMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, depthTest: false, side: THREE.DoubleSide });
slashMat.onBeforeCompile = sh => {
  sh.vertexShader = 'attribute float aAlpha;\nattribute vec2 aSl;\nvarying float vAlpha;\nvarying vec2 vSl;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvAlpha = aAlpha; vSl = aSl;');
  sh.fragmentShader = 'varying float vAlpha;\nvarying vec2 vSl;\n' + sh.fragmentShader.replace('#include <map_fragment>',
    '#include <map_fragment>\nfloat slRim = smoothstep(.74, .84, vSl.y) * (1. - smoothstep(.96, 1., vSl.y)), slBody = smoothstep(0., .3, vSl.y) * (1. - smoothstep(.8, .86, vSl.y));\n' +
    'diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.11, .08, .07), slRim);\ndiffuseColor.a *= vAlpha * smoothstep(0., .6, vSl.x) * max(slBody * .92, slRim);');
};
slashMat.customProgramCacheKey = () => 'slash';
const slashMesh = new THREE.InstancedMesh(slashGeo, slashMat, MAX_SLASH);
slashMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX_SLASH * 3), 3);
slashMesh.frustumCulled = false; slashMesh.count = 0; slashMesh.renderOrder = 5;
scene.add(slashMesh);
let slashes = [];
if (import.meta.env.DEV) window.__slashN = () => slashes.length;
const SLASH_LIFE = .22, slashC = new THREE.Color(), grow = new THREE.Matrix4();
// m: where the arc sits (world matrix, arc in its local XZ plane); c: tint
export function slash(m, c = '#ffffff', strength = 1) {
  if (slashes.length >= MAX_SLASH) slashes.shift();
  slashes.push({ m: m.clone(), c: new THREE.Color(c), t: 0, a: strength });
}
function drawSlashes() {
  slashes.forEach((s, i) => {
    const k = s.t / SLASH_LIFE, g = 1 + .18 * k;
    slashMesh.setMatrixAt(i, grow.makeScale(g, 1, g).premultiply(s.m));
    slashMesh.setColorAt(i, slashC.copy(s.c));
    slashAlpha.array[i] = s.a * (k < .1 ? k / .1 : 1 - Math.pow((k - .1) / .9, 1.5));
  });
  slashMesh.count = slashes.length;
  slashMesh.instanceMatrix.needsUpdate = true; slashMesh.instanceColor.needsUpdate = true; slashAlpha.needsUpdate = true;
}

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
  for (const p of pows) p.t += dt;
  pows = pows.filter(p => p.t < .75);
  for (const sl of slashes) sl.t += dt;
  slashes = slashes.filter(sl => sl.t < SLASH_LIFE);
  for (const d of decals) d.t += dt;
  decals = decals.filter(d => d.t < 30);
}

export function drawEffects() {
  drawSlashes();
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

export function clearEffects() { parts = []; floats = []; decals = []; pows = []; slashes = []; }

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
