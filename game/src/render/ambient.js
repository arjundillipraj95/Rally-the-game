// F19 The living world: drifting motes in the air around the camera (warm dust in the open, embers that
// rise near the Crown's summit, and pale flecks at night), and a few faint shafts of sunlight that lean
// with the sun and are strongest in the golden hours. One draw call each; all of it off on Low.
import * as THREE from 'three';
import { scene, camera, dayGold, lookK, skySunDir } from './scene.js';
import { camTarget } from './camera.js';
import { quality } from './quality.js';
import { AMBIENT as A } from '../config.js';
import { G } from '../core/state.js';

let motes = null, shafts = null, t = 0;
const rnd = (a, b) => a + Math.random() * (b - a);

function dotTex() {
  const c = document.createElement('canvas'); c.width = c.height = 32; const x = c.getContext('2d');
  const g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.4, 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 32, 32); const t = new THREE.CanvasTexture(c); return t;
}
function shaftTex() { // soft at the edges and the ends
  const c = document.createElement('canvas'); c.width = 32; c.height = 128; const x = c.getContext('2d'), d = x.createImageData(32, 128);
  for (let j = 0; j < 128; j++) for (let i = 0; i < 32; i++) { const u = Math.sin(Math.PI * i / 31), v = Math.sin(Math.PI * j / 127) ** .7, a = u * u * v * 255; const k = (j * 32 + i) * 4; d.data[k] = d.data[k + 1] = d.data[k + 2] = 255; d.data[k + 3] = a; }
  x.putImageData(d, 0, 0); return new THREE.CanvasTexture(c);
}

function build() {
  const n = A.motes[quality.level] || 0;
  if (n) {
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), vel = new Float32Array(n * 3);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const m = new THREE.PointsMaterial({ size: A.size, map: dotTex(), vertexColors: true, transparent: true, opacity: A.op, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true, fog: true });
    const p = new THREE.Points(g, m); p.frustumCulled = false; p.renderOrder = 3; scene.add(p);
    motes = { p, pos, col, vel, n, seeded: false };
  }
  if (A.shafts[quality.level]) {
    const k = A.shafts[quality.level], geo = new THREE.PlaneGeometry(1, 1), mat = new THREE.MeshBasicMaterial({ map: shaftTex(), color: 0xfff1c8, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false });
    const list = [];
    for (let i = 0; i < k; i++) { const m = new THREE.Mesh(geo, mat); m.renderOrder = 3; m.frustumCulled = false; scene.add(m); list.push({ m, ox: rnd(-A.shaftR, A.shaftR), f: rnd(A.shaftAhead[0], A.shaftAhead[1]), w: rnd(A.shaftW[0], A.shaftW[1]), ph: rnd(0, 6.28) }); }
    shafts = { list, mat };
  }
}

function seed(i, T, any) { // a mote somewhere in the box round the camera (any: anywhere in it; else at an edge it drifts in from)
  const M = motes, B = A.box, k = i * 3;
  M.pos[k] = T.x + rnd(-B[0], B[0]); M.pos[k + 1] = T.y + (any ? rnd(0, B[1]) : rnd(0, B[1] * .3)); M.pos[k + 2] = T.z + rnd(-B[2], B[2]);
}

export function ambientTick(dt) {
  if (!build.done) { if (quality.level === 'low') return; build(); build.done = true; }
  const T = camTarget(), on = (G.state === 'play' || G.state === 'end' || G.state === 'intro') && quality.level !== 'low';
  if (motes) motes.p.visible = !!T && on;
  if (shafts) shafts.list.forEach(s => { s.m.visible = !!T && on; });
  if (!T || !on) return;
  t += dt;
  const night = lookK(), crownR = Math.hypot(T.x, T.z) < A.crownR && G.map && G.map.id === 'mount';
  if (motes) {
    const M = motes, B = A.box, c = new THREE.Color();
    if (!M.seeded) { for (let i = 0; i < M.n; i++) seed(i, T, true); M.seeded = true; }
    for (let i = 0; i < M.n; i++) {
      const k = i * 3; let x = M.pos[k], y = M.pos[k + 1], z = M.pos[k + 2];
      const ember = crownR && i % 3 === 0;
      const vy = ember ? A.emberRise : Math.sin(t * .7 + i) * .12, sx = Math.sin(t * .31 + i * 1.7) * A.drift, sz = Math.cos(t * .27 + i * 2.3) * A.drift;
      x += (sx + A.wind[0]) * dt; y += vy * dt; z += (sz + A.wind[1]) * dt;
      if (Math.abs(x - T.x) > B[0] || Math.abs(z - T.z) > B[2] || y - T.y > B[1] || y < T.y - 1) { seed(i, T, false); continue; }
      M.pos[k] = x; M.pos[k + 1] = y; M.pos[k + 2] = z;
      if (ember) c.setHex(0xff9a3a); else if (night > .6) c.setHex(0x9fb6e8); else c.setHex(0xffe6b0);
      const tw = .55 + .45 * Math.sin(t * 2.3 + i * 4.1); // (each one glints in and out)
      M.col[k] = c.r * tw; M.col[k + 1] = c.g * tw; M.col[k + 2] = c.b * tw;
    }
    M.p.geometry.attributes.position.needsUpdate = true; M.p.geometry.attributes.color.needsUpdate = true;
  }
  if (shafts) {
    const s = skySunDir(), up = Math.max(.15, s.y), gold = dayGold();
    const strength = (1 - night) * (A.shaftDay + gold * A.shaftGold);
    shafts.mat.opacity = strength;
    const ax = new THREE.Vector3(s.x * .6, up, s.z * .6).normalize(), zc = new THREE.Vector3(), xc = new THREE.Vector3(), mx = new THREE.Matrix4();
    let fx = T.x - camera.position.x, fz = T.z - camera.position.z; const fl = Math.hypot(fx, fz) || 1; fx /= fl; fz /= fl; // (ahead of the camera, so they stand in view)
    for (const sh of shafts.list) { // (each shaft leans toward the sun and turns about its own length to face the camera)
      const m = sh.m, h = A.shaftH, drift = Math.sin(t * .05 + sh.ph) * 3;
      const bx = T.x + fx * sh.f - fz * (sh.ox + drift), bz = T.z + fz * sh.f + fx * (sh.ox + drift);
      m.position.set(bx + ax.x * h * .3, T.y + ax.y * h * .3, bz + ax.z * h * .3);
      zc.subVectors(camera.position, m.position); zc.addScaledVector(ax, -zc.dot(ax)).normalize(); xc.crossVectors(ax, zc);
      mx.makeBasis(xc, ax, zc); m.quaternion.setFromRotationMatrix(mx); m.scale.set(sh.w, h, 1);
    }
  }
}
if (import.meta.env.DEV) window.__amb = () => ({ motes: motes && { n: motes.n, vis: motes.p.visible, p0: [...motes.pos.slice(0, 3)].map(v => +v.toFixed(1)) }, shafts: shafts && { n: shafts.list.length, op: +shafts.mat.opacity.toFixed(3), vis: shafts.list[0].m.visible } });
