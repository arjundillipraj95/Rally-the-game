// Hit sparks, floating text, paint splats on the ground and arrows in flight.
// Splats and arrows are batched (one draw call each); sparks and text are drawn on the 2D layer.
import * as THREE from 'three';
import { TEAMS } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { groundY, inRiver, rnd } from '../core/world.js';
import { scene } from './scene.js';
import { quality } from './quality.js';

// (F6) particles are pooled: a spent one goes back on the spare pile and is handed out again, so a fight
// makes no garbage per hit. `parts` holds the live ones (drawn on the 2D layer, render/overlay.js).
export const parts = [];
const spare = [];
function part(x, y, z, vx, vy, vz, life, c, s) {
  const p = spare.pop() || {};
  p.x = x; p.y = y; p.z = z; p.vx = vx; p.vy = vy; p.vz = vz; p.life = life; p.c = c; p.s = s;
  parts.push(p);
}
export let floats = [];

export function spark(x, y, z, c, n) {
  const cap = quality.cfg.particles;
  // a bright, near-instant flash at the point of impact sells the hit before the debris scatters
  if (parts.length < cap) part(x, y, z, 0, rnd(.2, .6), 0, .22, '#fff8e6', 9);
  for (let i = 0; i < n && parts.length < cap; i++) part(x, y, z, rnd(-4, 4), rnd(1, 5), rnd(-4, 4), rnd(.25, .5), c, rnd(2, 4));
}
export function puff(p) { if (parts.length < quality.cfg.particles + 40) part(p.x, p.y, p.z, p.vx, p.vy, p.vz, p.life, p.c, p.s); }
// A weapon's blade tip leaves a brief, near-stationary streak so a fast swing reads as motion,
// not a snap between poses. Cheap: reuses the same particle pool, just near-zero velocity.
export function trail(x, y, z, c) {
  if (parts.length < quality.cfg.particles) part(x, y, z, rnd(-.2, .2), rnd(-.1, .2), rnd(-.2, .2), rnd(.08, .14), c, rnd(2.5, 4));
}
// Dust kicked up by hits and falls, tinted to the ground.
const DUST = { dunes: '#dcc69c', river: '#b7a888', forest: '#a89a7c', frost: '#f4f7fa' };
export function dust(x, z) {
  const c = DUST[G.map.id] || DUST.dunes, y = groundY(x, z) + .3;
  for (let i = 0; i < 3 && parts.length < quality.cfg.particles + 40; i++) part(x + rnd(-.4, .4), y, z + rnd(-.4, .4), rnd(-1, 1), rnd(.8, 1.6), rnd(-1, 1), rnd(.5, .8), c, rnd(5.5, 8));
}
export function floatText(x, y, z, text, color) { floats.push({ x, y, z, text, color, t: 0 }); }
// Comic-book sound words on the big blows near you ("WHACK!", "BONK!"), drawn as a burst on the 2D layer.
export let pows = [];
// Only one on screen at a time, and only the big moments: a new word replaces the old one unless the old one
// is fresh and matters more (pri 3: a captain falls, an execution, a gate; 2: armour, unhorsed; 1: your own timing).
export function pow(x, y, z, text, color = '#ffd23a', pri = 2) {
  const cur = pows[0];
  if (cur && cur.t < .45 && cur.pri > pri) return;
  pows = [{ x, y, z, text, color, t: 0, rot: rnd(-.25, .25), pri }];
}

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
// (F6) a fixed ring of strokes, reused: no matrix or colour is made per swing
const slashes = Array.from({ length: MAX_SLASH }, () => ({ on: false, m: new THREE.Matrix4(), c: new THREE.Color(), t: 0, a: 1 }));
let slashAt = 0, slashLive = 0;
if (import.meta.env.DEV) window.__slashN = () => slashLive;
const SLASH_LIFE = .22, slashC = new THREE.Color(), grow = new THREE.Matrix4();
// m: where the arc sits (world matrix, arc in its local XZ plane); c: tint
export function slash(m, c = '#ffffff', strength = 1) {
  const s = slashes[slashAt]; slashAt = (slashAt + 1) % MAX_SLASH; // (the oldest is overwritten when all are in use)
  if (!s.on) slashLive++;
  s.on = true; s.m.copy(m); s.c.set(c); s.t = 0; s.a = strength;
}
function drawSlashes() {
  let i = 0;
  if (slashLive) for (const s of slashes) {
    if (!s.on) continue;
    const k = s.t / SLASH_LIFE, g = 1 + .18 * k;
    slashMesh.setMatrixAt(i, grow.makeScale(g, 1, g).premultiply(s.m));
    slashMesh.setColorAt(i, slashC.copy(s.c));
    slashAlpha.array[i] = s.a * (k < .1 ? k / .1 : 1 - Math.pow((k - .1) / .9, 1.5));
    i++;
  }
  if (!i && !slashMesh.count) return;
  slashMesh.count = i;
  slashMesh.instanceMatrix.needsUpdate = true; slashMesh.instanceColor.needsUpdate = true; slashAlpha.needsUpdate = true;
}

// ---------- (F17b) blade ribbons: the swoosh traced by the real blade, from where its edge starts to its point ----------
// Each frame of a swing, the blade's base and tip are sampled (render/soldiers.js, from the clip skeleton); the last few
// make a ribbon, smoothed through the samples, bright at the point and fading at the old end. A few, reused.
const RIB = 10, RIB_N = 10, RIB_SUB = 3, RIB_LIFE = .26, RIB_V = (RIB_N - 1) * RIB_SUB + 1;
const ribMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, depthTest: false, side: THREE.DoubleSide, vertexColors: true });
ribMat.onBeforeCompile = sh => {
  sh.vertexShader = 'attribute float aA;\nvarying float vA;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvA = aA;');
  sh.fragmentShader = 'varying float vA;\n' + sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.a *= vA;');
};
ribMat.customProgramCacheKey = () => 'ribbon';
const ribIdx = []; for (let i = 0; i < RIB_V - 1; i++) { const b = i * 2; ribIdx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2); }
const ribbons = Array.from({ length: RIB }, () => {
  const g = new THREE.BufferGeometry(), pos = new Float32Array(RIB_V * 6), al = new Float32Array(RIB_V * 2), col = new Float32Array(RIB_V * 6);
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aA', new THREE.BufferAttribute(al, 1)); g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.setIndex(ribIdx);
  const m = new THREE.Mesh(g, ribMat); m.frustumCulled = false; m.visible = false; m.renderOrder = 5; scene.add(m);
  return { key: null, pts: [], mesh: m, c: new THREE.Color(), a: 1 };
});
// key: whose blade; base, tip: world points this frame; c: tint; strength: how bright
export function bladeTrail(key, base, tip, c = '#fff6d8', strength = 1) {
  let r = ribbons.find(r => r.key === key) || ribbons.find(r => !r.pts.length) || ribbons.reduce((o, r) => (r.pts[0] ? r.pts[r.pts.length - 1].age : 9) > (o.pts[0] ? o.pts[o.pts.length - 1].age : 9) ? r : o);
  if (r.key !== key) { r.key = key; r.pts.length = 0; }
  const last = r.pts[r.pts.length - 1];
  if (last && Math.hypot(last.t[0] - tip.x, last.t[1] - tip.y, last.t[2] - tip.z) < .02) { last.age = 0; return; } // (a blade at rest leaves nothing)
  r.pts.push({ b: [base.x, base.y, base.z], t: [tip.x, tip.y, tip.z], age: 0 }); if (r.pts.length > RIB_N) r.pts.shift();
  r.c.set(c); r.a = strength;
}
if (import.meta.env.DEV) window.__rib = () => ribbons.map(r => ({ key: r.key, n: r.pts.length, vis: r.mesh.visible, dr: r.mesh.geometry.drawRange.count }));
const cr = (p0, p1, p2, p3, t, k) => { const t2 = t * t, t3 = t2 * t; return .5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3); };
function ribbonsTick(dt) {
  for (const r of ribbons) {
    for (const p of r.pts) p.age += dt;
    while (r.pts.length && r.pts[0].age > RIB_LIFE) r.pts.shift();
    const n = r.pts.length; r.mesh.visible = n >= 2; if (n < 2) { if (!n) r.key = null; continue; }
    const g = r.mesh.geometry, P = g.attributes.position.array, A = g.attributes.aA.array, C = g.attributes.color.array; let v = 0;
    for (let i = 0; i < n - 1; i++) {
      const p0 = r.pts[Math.max(0, i - 1)], p1 = r.pts[i], p2 = r.pts[i + 1], p3 = r.pts[Math.min(n - 1, i + 2)];
      for (let s = 0; s < RIB_SUB || (i === n - 2 && s === RIB_SUB); s++) {
        const t = s / RIB_SUB, age = p1.age + (p2.age - p1.age) * t, k = Math.max(0, 1 - age / RIB_LIFE), along = (i + t) / (n - 1);
        for (let k3 = 0; k3 < 3; k3++) { P[v * 6 + k3] = cr(p0.b, p1.b, p2.b, p3.b, t, k3); P[v * 6 + 3 + k3] = cr(p0.t, p1.t, p2.t, p3.t, t, k3); }
        const a = r.a * k * Math.min(1, along * 2.5); A[v * 2] = a * .45; A[v * 2 + 1] = a;
        C[v * 6] = C[v * 6 + 3] = r.c.r; C[v * 6 + 1] = C[v * 6 + 4] = r.c.g; C[v * 6 + 2] = C[v * 6 + 5] = r.c.b;
        v++;
      }
    }
    g.setDrawRange(0, Math.max(0, v - 1) * 6);
    g.attributes.position.needsUpdate = true; g.attributes.aA.needsUpdate = true; g.attributes.color.needsUpdate = true;
  }
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
  wavesTick(dt); ribbonsTick(dt);
  { let n = 0; // (the live ones are kept in order at the front; the spent go back on the spare pile)
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.vy -= (p.s > 5 ? -.5 : 9) * dt; p.life -= dt;
      if (p.life > 0 && p.y > -1) parts[n++] = p; else spare.push(p);
    }
    parts.length = n; }
  for (const f of floats) { f.t += dt; f.y += dt * 1.2; }
  floats = floats.filter(f => f.t < 1.3);
  for (const p of pows) p.t += dt;
  pows = pows.filter(p => p.t < .75);
  if (slashLive) for (const sl of slashes) if (sl.on) { sl.t += dt; if (sl.t >= SLASH_LIFE) { sl.on = false; slashLive--; } }
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

export function clearEffects() { while (parts.length) spare.push(parts.pop()); floats = []; decals = []; pows = []; for (const sl of slashes) sl.on = false; slashLive = 0; for (const r of ribbons) { r.pts.length = 0; r.key = null; r.mesh.visible = false; } for (const w of waves) scene.remove(w.m); waves = []; }
// a ring rolling out across the ground (the rally horn)
let waves = [];
export function shockwave(x, z, r, color) {
  const m = new THREE.Mesh(new THREE.RingGeometry(.9, 1, 64), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .8, depthWrite: false, depthTest: false, side: THREE.DoubleSide }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, groundY(x, z) + .2, z); m.renderOrder = 2; scene.add(m); waves.push({ m, r, t: 0 });
}
export function wavesTick(dt) {
  for (const w of waves) { w.t += dt; const k = Math.min(1, w.t / .7); w.m.scale.setScalar(1 + k * w.r); w.m.material.opacity = .8 * (1 - k); }
  for (const w of waves) if (w.t >= .7) { scene.remove(w.m); w.m.geometry.dispose(); w.m.material.dispose(); }
  waves = waves.filter(w => w.t < .7);
}

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
