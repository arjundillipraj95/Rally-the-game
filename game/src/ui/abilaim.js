// C3l drag to aim a special or an ult (agreed 18 Nov, like Unite): press the button and drag, and the move's area shows
// on the ground the way you drag (screen up is the camera's forward); let go to fire it there, slide back onto the
// button to cancel (it turns red), a tap fires it as before (the way you face, or the nearest foe). A dash (the Ram)
// shows a see-through slab from your feet to where it will stop: shorter for a wall, a champion or the soldiers that
// would stop it; a leap (Eagle's fall) a ring where you'll land, as far out as you drag; the shield an arc the way it faces.
import { pounceTarget } from '../core/sim/sigrun.js'; // (FEEL6)
import * as THREE from 'three';
import { G, isEnemy } from '../core/state.js';
import { cam } from '../render/camera.js';
import { SLOTS, slotDef } from '../core/sim/abilities.js';
import { integrate } from '../core/sim/move.js';
import { decal, place, drop, ringTex } from '../render/fxkit.js';

export const aim = { on: false, k: -1, el: null, sx: 0, sy: 0, dx: 0, dy: 0, drag: false, cancel: false, charge: false, full: false };
let onAutoEnd = () => {}; // (FIX9: what lets a drawn shot go by itself)
export const setChargeEnd = fn => { onAutoEnd = fn; };
const DRAG = 14, FULL = 110, AIM_WIDE = 1.5; // (px: past DRAG it's aiming; a FULL px drag reaches the move's whole range)

// the slab: a rounded, see-through glass panel with a bright gold rim, its far end at +z (the canvas's top). RAM2: wider
// and easier to read: gold chevrons all the way along pointing the way he goes, and a bar across where he stops.
const slabTex = (() => {
  const c = document.createElement('canvas'); c.width = 128; c.height = 512; const g = c.getContext('2d');
  const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
  const gr = g.createLinearGradient(0, 512, 0, 0); gr.addColorStop(0, 'rgba(255,236,190,.22)'); gr.addColorStop(1, 'rgba(255,226,150,.5)');
  rr(8, 8, 112, 496, 30); g.fillStyle = gr; g.fill(); g.lineWidth = 10; g.strokeStyle = 'rgba(255,207,58,.98)'; g.stroke();
  rr(22, 22, 84, 468, 20); g.lineWidth = 3; g.strokeStyle = 'rgba(255,245,215,.6)'; g.stroke(); // (an inner rim: the glass's thickness)
  g.fillStyle = 'rgba(255,214,90,.9)'; for (let y = 90; y < 470; y += 64) { g.beginPath(); g.moveTo(30, y + 30); g.lineTo(64, y); g.lineTo(98, y + 30); g.lineTo(86, y + 38); g.lineTo(64, y + 18); g.lineTo(42, y + 38); g.closePath(); g.fill(); }
  g.fillStyle = 'rgba(255,240,200,1)'; rr(18, 22, 92, 16, 8); g.fill(); // (where he stops)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
// (ARCH2) a shot's line, as Spirit Shackle shows it: a narrow gold lane with a bright core and an arrowhead at its end
const lineTex = (() => {
  const c = document.createElement('canvas'); c.width = 64; c.height = 512; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 512, 0, 0); gr.addColorStop(0, 'rgba(255,214,110,.55)'); gr.addColorStop(1, 'rgba(255,214,110,.2)');
  g.fillStyle = gr; g.fillRect(10, 40, 44, 472); g.fillStyle = 'rgba(255,248,220,.95)'; g.fillRect(28, 40, 8, 472); // (the lane, its bright core)
  g.fillStyle = 'rgba(255,236,170,1)'; g.beginPath(); g.moveTo(32, 0); g.lineTo(62, 46); g.lineTo(2, 46); g.closePath(); g.fill(); // (the head)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
let slab = null, ring = null;
const clear = () => { drop(slab); drop(ring); slab = ring = null; };

export function aimStart(k, el, e, charge = false) { Object.assign(aim, { on: true, k, el, sx: e.clientX, sy: e.clientY, dx: 0, dy: 0, drag: false, cancel: false, charge, full: false }); }
// (FIX9) the way the drag aims, or null before it's a drag
export const dragAngle = () => (aim.on && aim.drag && !aim.cancel ? dirOf().a : null);
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
  const { a, f } = dirOf(), R = p.mounted && d.rideRange ? d.rideRange : d.range, far = d.aimFace ? R || 5 : Math.max(1.5, (R || 8) * f); // (C5: from the saddle, its own reach)
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
// (FIX9) a Piercing shot being drawn: its line grows with the draw, dim until full, then bright and pulsing (a buzz);
// held past full by `hold` s it goes by itself; her own phone's draw ends when the host's does
function chargeLine(p) {
  const D = p && p.pdraw;
  if (!D || p.dead || p.stun > 0 || (G.role !== 'client' && !p.pierce && performance.now() - D.T0 > 300)) { clear(); onAutoEnd(); return; }
  const d = D.d, t = (performance.now() - D.T0) / 1000, c = Math.min(1, t / d.charge);
  if (t >= d.charge + d.hold) { clear(); onAutoEnd(); return; }
  if (c >= 1 && !aim.full) { aim.full = true; try { navigator.vibrate && navigator.vibrate(25); } catch (e) { /* none */ } }
  if (aim.cancel) { if (slab) clear(); return; }
  const len = d.len[0] + (d.len[1] - d.len[0]) * c, wd = (d.w || .6) * 2 + .5;
  if (!slab || Math.abs(slab.userData.len - len) > .25) { drop(slab); slab = decal(lineTex, wd * (c >= 1 ? 1.25 : 1), len, { add: false, from: 0, opacity: .9 }); slab.userData.len = len; slab.userData.t0 = performance.now(); }
  if (slab.material) { slab.material.opacity = c >= 1 ? .75 + .25 * Math.sin(performance.now() / 70) : .55 + .3 * c; if (slab.material.color) slab.material.color.setRGB(1, c >= 1 ? 1 : .75 + .2 * c, c >= 1 ? 1 : .55 + .2 * c); }
  place(slab, p.x, p.z, Math.atan2(D.ax, D.az), .14);
}
// every frame (main.js): the area, while you aim
export function drawAbilAim() {
  const p = G.player;
  if (aim.on && aim.charge) { chargeLine(p); return; }
  if (!aim.on || !aim.drag || aim.cancel || !p || p.dead) { if (slab || ring) clear(); return; }
  const slot = SLOTS[aim.k], d = slotDef(G.myTi, slot); if (!d) return;
  const { a } = dirOf(), op = .95;
  if (slot === 'sp1' && d.aimFace) {
    const len = Math.max(.6, dashLen(p, a, d) + p.r), wd = ((d.w || .7) * 2 + .3) * AIM_WIDE; // (RAM2: half as wide again: his shoulders and shield)
    if (!slab || Math.abs(slab.userData.len - len) > .05) { const t0 = slab ? slab.userData.t0 : performance.now(); drop(slab); slab = decal(slabTex, wd, len, { add: false, from: 0, opacity: op }); slab.userData.len = len; slab.userData.t0 = t0; }
    if (slab.material) slab.material.opacity = op * Math.min(1, (performance.now() - slab.userData.t0) / 150); // (RAM2: fades in over 0.15 s)
    place(slab, p.x, p.z, a, .14);
  } else if (slot === 'sp1' && d.pick) { // (FEEL6: Pounce, as Glaceon's pick: a line from her to the one it will land on, a ring on him)
    const at = point(); if (!at) return; const tg = pounceTarget(p, at, d, false), x = tg ? tg.x : at.x, z = tg ? tg.z : at.z, len = Math.max(.6, Math.hypot(x - p.x, z - p.z));
    if (!slab || Math.abs(slab.userData.len - len) > .05) { drop(slab); slab = decal(lineTex, 1.1, len, { add: false, from: 0, opacity: tg ? op : .45, color: 0xff7a5a }); slab.userData.len = len; slab.userData.t0 = performance.now(); }
    place(slab, p.x, p.z, Math.atan2(x - p.x, z - p.z), .14);
    if (!ring) ring = decal(ringTex, 2.4, 2.4, { add: false, from: .5, opacity: op, color: 0xff5a4a });
    ring.material.opacity = tg ? op : .35; place(ring, x, z, 0, .15);
  } else if (d.len && !d.r) { // (ARCH2: a shot down a line: Piercing shot, Tiger's volley)
    const len = d.len, wd = (d.w || .6) * 2 + .5;
    if (!slab || Math.abs(slab.userData.len - len) > .05) { drop(slab); slab = decal(lineTex, wd, len, { add: false, from: 0, opacity: op }); slab.userData.len = len; slab.userData.t0 = performance.now(); }
    place(slab, p.x, p.z, a, .14);
  } else {
    const at = point(); if (!at) return; const r = d.aimAway ? 1 : slot === 'sp2' ? 1.6 : slot === 'armyUlt' ? d.r || 3 : d.r || 2;
    if (!ring) ring = decal(ringTex, r * 2, r * 2, { add: false, from: .5, opacity: op, color: 0xdfeaff });
    const k = d.aimAway ? d.dist || 5 : 1.6; // (ARCH2: a dodge's ring where she lands)
    place(ring, slot === 'sp2' ? p.x + Math.sin(a) * k : at.x, slot === 'sp2' ? p.z + Math.cos(a) * k : at.z, a, .14);
  }
}
// (tests) what's on the ground now
export const aimShown = () => ({ slab: slab ? +slab.userData.len.toFixed(2) : 0, ring: !!ring, yaw: +cam.yaw.toFixed(2), a: aim.on && aim.drag ? +dirOf().a.toFixed(2) : null });
window.__aim = { shown: aimShown, cam }; // (tests: this page's own copies)
