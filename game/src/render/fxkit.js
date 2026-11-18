// (C3g) the abilities' 3D pieces on the ground and in the air: soft glowing decals drawn from small canvas textures
// (a path, a ring, a zone, an eagle's shadow), and a curved see-through barrier. Additive, never writing depth, drawn
// over the ground so slopes don't swallow them. Shared by ramfx, scutumfx, eaglefx and testudofx.
import * as THREE from 'three';
import { scene } from './scene.js';
import { groundY } from '../core/world.js';

function tex(w, h, paint) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; paint(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
// a path along +y of the texture (its far end at the top): bright edges, chevrons, fading away
export const pathTex = tex(64, 256, (g, w, h) => {
  const gr = g.createLinearGradient(0, h, 0, 0); gr.addColorStop(0, 'rgba(255,214,110,.55)'); gr.addColorStop(1, 'rgba(255,214,110,.12)');
  g.fillStyle = gr; g.fillRect(6, 0, w - 12, h);
  g.fillStyle = 'rgba(255,240,190,.95)'; g.fillRect(4, 0, 4, h); g.fillRect(w - 8, 0, 4, h);
  g.strokeStyle = 'rgba(255,250,225,.9)'; g.lineWidth = 6;
  for (let y = h - 40; y > 10; y -= 48) { g.beginPath(); g.moveTo(14, y + 14); g.lineTo(w / 2, y - 6); g.lineTo(w - 14, y + 14); g.stroke(); }
});
// a ring with a soft inner glow
export const ringTex = tex(256, 256, (g, w) => {
  const r = w / 2, gr = g.createRadialGradient(r, r, r * .2, r, r, r);
  gr.addColorStop(0, 'rgba(255,210,90,.05)'); gr.addColorStop(.8, 'rgba(255,210,90,.28)'); gr.addColorStop(.93, 'rgba(255,236,170,1)'); gr.addColorStop(1, 'rgba(255,236,170,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(r, r, r, 0, Math.PI * 2); g.fill();
});
// a soft round glow
export const glowTex = tex(128, 128, (g, w) => {
  const r = w / 2, gr = g.createRadialGradient(r, r, 0, r, r, r); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, w, w);
});
// the zone behind a raised shield: brightest at his back (bottom of the texture), fading away
export const zoneTex = tex(64, 128, (g, w, h) => {
  const gr = g.createLinearGradient(0, h, 0, 0); gr.addColorStop(0, 'rgba(170,215,255,.55)'); gr.addColorStop(1, 'rgba(170,215,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(210,235,255,.5)'; g.fillRect(0, 0, 2, h); g.fillRect(w - 2, 0, 2, h);
});
// an eagle seen from above, wings spread, head at the top
export const eagleTex = tex(256, 160, (g) => {
  const P = [[128, 8], [142, 50], [228, 52], [256, 78], [200, 86], [148, 90], [162, 150], [128, 132], [94, 150], [108, 90], [56, 86], [0, 78], [28, 52], [114, 50]];
  g.fillStyle = 'rgba(0,0,0,1)'; g.beginPath(); P.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fill();
});
// a flat decal: w wide (x), l long (along its facing), pivot at its near edge (from: 0) or its middle (from: .5)
export function decal(t, w, l, { color = 0xffffff, add = true, from = .5, opacity = 1 } = {}) {
  const geo = new THREE.PlaneGeometry(w, l); geo.rotateX(-Math.PI / 2); geo.translate(0, 0, -(l * (.5 - from))); // (its +z the far end)
  geo.scale(1, 1, -1);
  const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: t, color, transparent: true, opacity, depthWrite: false, depthTest: false, blending: add ? THREE.AdditiveBlending : THREE.NormalBlending, side: THREE.DoubleSide }));
  m.renderOrder = 3; m.frustumCulled = false; scene.add(m); return m;
}
export function place(m, x, z, face = 0, lift = .12) { m.position.set(x, groundY(x, z) + lift, z); m.rotation.y = face; }
export function drop(m) { if (!m) return; scene.remove(m); m.geometry.dispose(); m.material.dispose(); }
// a curved barrier: an arc of `arc` rad round its holder at r m, h m tall, facing +z
export function barrier(r, h, arc, color = 0xffd36e) {
  const geo = new THREE.CylinderGeometry(r, r, h, 24, 1, true, -arc / 2, arc); geo.translate(0, h / 2, 0);
  const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .25, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  const rim = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), new THREE.LineBasicMaterial({ color: 0xfff1c2, transparent: true, opacity: .8, blending: THREE.AdditiveBlending, depthWrite: false }));
  m.add(rim); m.renderOrder = 3; m.frustumCulled = false; scene.add(m); return m;
}
export function dropBarrier(m) { if (!m) return; scene.remove(m); m.geometry.dispose(); m.material.dispose(); const r = m.children[0]; if (r) { r.geometry.dispose(); r.material.dispose(); } }
