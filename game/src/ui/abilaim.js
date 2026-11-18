// C3l drag to aim a special or an ult (agreed 18 Nov, like Unite): press the button and drag, and the move's area shows
// on the ground the way you drag (screen up is the camera's forward); let go to fire it there, slide back onto the
// button to cancel (it turns red), a tap fires it as before (the way you face, or the nearest foe). A dash (the Ram)
// shows a see-through slab from your feet to where it will stop: shorter for a wall, a champion or the soldiers that
// would stop it; a leap (Eagle's fall) a ring where you'll land, as far out as you drag; the shield an arc the way it faces.
import * as THREE from 'three';
import { G, isEnemy } from '../core/state.js';
import { cam } from '../render/camera.js';
import { SLOTS, slotDef } from '../core/sim/abilities.js';
import { integrate } from '../core/sim/move.js';
import { decal, place, drop, ringTex } from '../render/fxkit.js';

export const aim = { on: false, k: -1, el: null, sx: 0, sy: 0, dx: 0, dy: 0, drag: false, cancel: false };
const DRAG = 14, FULL = 110; // (px: past DRAG it's aiming; a FULL px drag reaches the move's whole range)

// the slab: a rounded, see-through glass panel with a bright rim, its far end at +z
const slabTex = (() => {
  const c = document.createElement('canvas'); c.width = 128; c.height = 512; const g = c.getContext('2d');
  const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
  const gr = g.createLinearGradient(0, 512, 0, 0); gr.addColorStop(0, 'rgba(170,200,255,.38)'); gr.addColorStop(1, 'rgba(215,232,255,.62)');
  rr(8, 8, 112, 496, 34); g.fillStyle = gr; g.fill(); g.lineWidth = 9; g.strokeStyle = 'rgba(245,250,255,.95)'; g.stroke();
  rr(24, 24, 80, 464, 22); g.lineWidth = 4; g.strokeStyle = 'rgba(160,200,255,.55)'; g.stroke(); // (an inner rim: the glass's thickness)
  g.fillStyle = 'rgba(255,255,255,.5)'; for (let y = 60; y < 120; y += 30) { g.beginPath(); g.moveTo(40, y + 18); g.lineTo(64, y); g.lineTo(88, y + 18); g.lineTo(80, y + 22); g.lineTo(64, y + 10); g.lineTo(48, y + 22); g.closePath(); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
let slab = null, ring = null;
const clear = () => { drop(slab); drop(ring); slab = ring = null; };

export function aimStart(k, el, e) { Object.assign(aim, { on: true, k, el, sx: e.clientX, sy: e.clientY, dx: 0, dy: 0, drag: false, cancel: false }); }
export function aimMove(e) {
  if (!aim.on) return;
  aim.dx = e.clientX - aim.sx; aim.dy = e.clientY - aim.sy;
  if (Math.hypot(aim.dx, aim.dy) > DRAG) aim.drag = true;
  const r = aim.el.getBoundingClientRect(); aim.cancel = aim.drag && e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
  aim.el.classList.toggle('cancel', aim.cancel);
}
// let go: null to cancel, {} for a tap (the usual aim), or the point aimed at
export function aimEnd() {
  if (!aim.on) return null; aim.on = false; aim.el.classList.remove('cancel'); clear();
  if (aim.cancel) return null;
  return aim.drag ? point() || {} : {};
}
export function aimCancel() { if (aim.on) { aim.on = false; aim.el.classList.remove('cancel'); clear(); } }

// where the drag points, in the world: its direction, and how far out (the drag's length over FULL px, of the range)
function dirOf() {
  const y = cam.yaw, fx = Math.sin(y), fz = Math.cos(y), rx = -Math.cos(y), rz = Math.sin(y), l = Math.hypot(aim.dx, aim.dy) || 1;
  const wx = fx * (-aim.dy / l) + rx * (aim.dx / l), wz = fz * (-aim.dy / l) + rz * (aim.dx / l);
  return { a: Math.atan2(wx, wz), f: Math.min(1, l / FULL) };
}
function point() {
  const p = G.player, d = slotDef(G.myTi, SLOTS[aim.k]); if (!p || !d) return null;
  const { a, f } = dirOf(), far = d.aimFace ? d.range || 5 : Math.max(1.5, (d.range || 8) * f);
  return { x: p.x + Math.sin(a) * far, z: p.z + Math.cos(a) * far };
}
// how far the Ram would get: walls stop it; each enemy soldier in its width shortens it, the `men`th or a champion ends it
function dashLen(p, a, d) {
  const dx = Math.sin(a), dz = Math.cos(a), w = d.w || .7; let dist = p.mounted ? d.rideDist || d.dist : d.dist, gone = 0, men = 0;
  const pr = { x: p.x, z: p.z, r: p.r, ti: p.ti, vx: 0, vz: 0, jy: 0 }, seen = new Set();
  while (gone < dist - .01) {
    const step = Math.min(.25, dist - gone); pr.vx = dx * step / .05; pr.vz = dz * step / .05; const x0 = pr.x, z0 = pr.z;
    integrate(pr, .05, pr.z); const got = (pr.x - x0) * dx + (pr.z - z0) * dz; gone += Math.max(0, got);
    if (got < step * .5) break;
    for (const o of G.units) {
      if (o.dead || seen.has(o) || !isEnemy(p, o)) continue;
      const rx = o.x - pr.x, rz = o.z - pr.z, fw = rx * dx + rz * dz, sd = rx * dz - rz * dx;
      if (fw < -.3 || fw > p.r + (o.r || 0) + .4 || Math.abs(sd) > w + (o.r || 0)) continue;
      if (o.leader) return gone;
      seen.add(o); men++; dist = gone + (dist - gone) * (1 - (d.slow || 0)); if (men >= (d.men || 99)) return gone;
    }
  }
  return gone;
}
// every frame (main.js): the area, while you aim
export function drawAbilAim() {
  const p = G.player;
  if (!aim.on || !aim.drag || aim.cancel || !p || p.dead) { if (slab || ring) clear(); return; }
  const slot = SLOTS[aim.k], d = slotDef(G.myTi, slot); if (!d) return;
  const { a } = dirOf(), op = .95;
  if (slot === 'sp1' && d.aimFace) {
    const len = Math.max(.6, dashLen(p, a, d) + p.r), wd = (d.w || .7) * 2 + .3;
    if (!slab || Math.abs(slab.userData.len - len) > .05) { drop(slab); slab = decal(slabTex, wd, len, { add: false, from: 0, opacity: op }); slab.userData.len = len; }
    place(slab, p.x, p.z, a, .14);
  } else {
    const at = point(); if (!at) return; const r = slot === 'sp2' ? 1.6 : slot === 'armyUlt' ? 3 : d.r || 2;
    if (!ring) ring = decal(ringTex, r * 2, r * 2, { add: false, from: .5, opacity: op, color: 0xdfeaff });
    place(ring, slot === 'sp2' ? p.x + Math.sin(a) * 1.6 : at.x, slot === 'sp2' ? p.z + Math.cos(a) * 1.6 : at.z, a, .14);
  }
}
// (tests) what's on the ground now
export const aimShown = () => ({ slab: slab ? +slab.userData.len.toFixed(2) : 0, ring: !!ring, yaw: +cam.yaw.toFixed(2), a: aim.on && aim.drag ? +dirOf().a.toFixed(2) : null });
window.__aim = { shown: aimShown, cam }; // (tests: this page's own copies)
