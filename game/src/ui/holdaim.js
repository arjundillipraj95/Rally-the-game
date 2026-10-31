// Placing a held line: press the order button and drag, and a bar on the ground shows where your front
// rank will stand, with an arrow for the way it faces (away from your captain). Let go to give the order.
// While your men hold, a faint bar stays on the ground where the line is.
import * as THREE from 'three';
import { G, isEnemyTi } from '../core/state.js';
import { groundY } from '../core/world.js';
import { scene } from '../render/scene.js';
import { screenToGround } from './volleyaim.js';
import { HOLD_W, javTarget, strikeAt, rideQuality } from '../core/sim.js';
import { CAPTAIN_COMBAT, HOLD_ATK, RIDE } from '../config.js';

export const hold = { on: false, moved: false, x: 0, z: 0, face: 0, sx: 0, sy: 0, t0: 0 };
const FINGER_LIFT = 70, SHOW_AFTER = 220; // (ms: a quick tap never flashes the bar)

const mat = op => new THREE.MeshBasicMaterial({ color: 0xffcf3a, transparent: true, opacity: op, depthWrite: false, depthTest: false, side: THREE.DoubleSide });
function marker(op) {
  const g = new THREE.Group();
  const bar = new THREE.Mesh(new THREE.PlaneGeometry(1, .9), mat(op)); bar.rotation.x = -Math.PI / 2; bar.renderOrder = 2; g.add(bar);
  const sh = new THREE.Shape(); sh.moveTo(-1.1, 0); sh.lineTo(1.1, 0); sh.lineTo(0, 1.8); sh.closePath();
  const arrow = new THREE.Mesh(new THREE.ShapeGeometry(sh), mat(op)); arrow.rotation.x = Math.PI / 2; arrow.position.z = .9; arrow.renderOrder = 2; g.add(arrow);
  g.visible = false; scene.add(g);
  return { g, bar };
}
const aimM = marker(.9), liveM = marker(.35);

function footmen() { let n = 0; for (const u of G.units) if (!u.dead && u.ti === G.myTi && u.kind === 'foot') n++; return n; }
const faceFrom = (p, x, z) => Math.hypot(x - p.x, z - p.z) < 4 ? p.face : Math.atan2(x - p.x, z - p.z);

export function holdStart(sx, sy) {
  const p = G.player; if (!p || p.dead || G.state !== 'play') return false;
  Object.assign(hold, { on: true, moved: false, sx, sy, t0: performance.now(), x: p.x + Math.sin(p.face) * 6, z: p.z + Math.cos(p.face) * 6, face: p.face });
  return true;
}
export function holdMove(sx, sy, touch) {
  if (!hold.on) return;
  if (!hold.moved && Math.hypot(sx - hold.sx, sy - hold.sy) < 14) return;
  hold.moved = true;
  const g = screenToGround(sx, sy - (touch ? FINGER_LIFT : 0)), p = G.player; if (!g || !p) return;
  hold.x = g.x; hold.z = g.z; hold.face = faceFrom(p, g.x, g.z);
  // dragged onto enemy men: that's an attack order on their group, not a line
  let best = null, bd = 3.2;
  for (const u of G.units) { if (u.dead || !isEnemyTi(u.ti, G.myTi)) continue; const d = Math.hypot(u.x - g.x, u.z - g.z); if (d < bd) { bd = d; best = u; } }
  hold.focus = best;
}
// the placed line ({x, z, face}), an attack on a group ({x, z, id, focus: true}), or null for a plain tap
export function holdEnd() {
  if (!hold.on) return undefined; hold.on = false;
  if (!hold.moved) return null;
  const f = hold.focus; hold.focus = null;
  return f && !f.dead ? { x: f.x, z: f.z, id: f.id, focus: true } : { x: hold.x, z: hold.z, face: hold.face };
}
export const holdHeldMs = () => hold.on ? performance.now() - hold.t0 : 0;
export function holdCancel() { hold.on = false; }

function place(m, x, z, face, t) {
  const n = Math.max(1, Math.min(HOLD_W, footmen()));
  m.g.visible = true; m.g.position.set(x, groundY(x, z) + .12, z); m.g.rotation.y = face;
  m.bar.scale.x = (n - 1) * 1.3 + 1.4;
  if (t != null) m.g.scale.setScalar(1 + .04 * Math.sin(t * 9));
}
// the attack order: a red ring round the group under your finger, and a fainter one on the group your men are after
const fMat = op => new THREE.MeshBasicMaterial({ color: 0xff4a3a, transparent: true, opacity: op, depthWrite: false, depthTest: false, side: THREE.DoubleSide });
const fAim = new THREE.Mesh(new THREE.RingGeometry(3.1, 3.6, 40), fMat(.9)), fLive = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.5, 40), fMat(.4));
for (const m of [fAim, fLive]) { m.rotation.x = -Math.PI / 2; m.renderOrder = 2; m.visible = false; scene.add(m); }
export function drawHoldAim(t) {
  const me = G.teams[G.myTi], rallyFull = me && me.rally >= 100;
  const showAim = hold.on && G.state === 'play' && (hold.moved || (!rallyFull && performance.now() - hold.t0 > SHOW_AFTER)); // (horn full: a still press is the rally, so no bar)
  aimM.g.visible = false; liveM.g.visible = false; fAim.visible = false; fLive.visible = false;
  if (showAim && hold.focus && !hold.focus.dead) { fAim.visible = true; fAim.position.set(hold.focus.x, groundY(hold.focus.x, hold.focus.z) + .15, hold.focus.z); fAim.scale.setScalar(1 + .05 * Math.sin(t * 9)); }
  else if (showAim) place(aimM, hold.x, hold.z, hold.face, t);
  if (!showAim && G.state === 'play' && me && me.order === 'hold' && me.holdPt && G.player && !G.player.dead) place(liveM, me.holdPt.x, me.holdPt.z, me.holdPt.face);
  if (G.state === 'play' && me && me.order === 'focus' && me.focus) { fLive.visible = true; fLive.position.set(me.focus.x, groundY(me.focus.x, me.focus.z) + .12, me.focus.z); }
}

// a javelin being drawn back: a ring on whoever it will fly at, widening with the draw and turning
// gold once the throw is hard enough to knock a rider off his horse
const jRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .85, depthWrite: false, depthTest: false, side: THREE.DoubleSide });
const jRing = new THREE.Mesh(new THREE.RingGeometry(.8, 1.05, 32), jRingMat); jRing.rotation.x = -Math.PI / 2; jRing.renderOrder = 2; jRing.visible = false; scene.add(jRing);
export function drawJavAim() {
  const p = G.player; jRing.visible = false;
  if (!p || p.dead || G.state !== 'play' || !(p.javDraw > 0) || (p.javAmmo || 0) < 1) return;
  const t = javTarget(p, CAPTAIN_COMBAT.jav.range + HOLD_ATK.javRange * p.javDraw);
  jRing.visible = true; jRing.position.set(t.x, groundY(t.x, t.z) + .15, t.z); jRing.scale.setScalar(.8 + .6 * p.javDraw);
  jRingMat.color.setHex(p.javDraw >= HOLD_ATK.unhorse ? 0xffd23a : 0xffffff);
}

// riding at someone with Attack held: a fixed ring round him, and a second ring closing in as you come;
// they meet at the strike distance, where both turn gold. Let go then.
const rMat = () => new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .9, depthWrite: false, depthTest: false, side: THREE.DoubleSide });
const rInner = new THREE.Mesh(new THREE.RingGeometry(.95, 1.2, 40), rMat()), rOuter = new THREE.Mesh(new THREE.RingGeometry(.95, 1.12, 40), rMat());
for (const m of [rInner, rOuter]) { m.rotation.x = -Math.PI / 2; m.renderOrder = 3; m.visible = false; scene.add(m); }
export function drawRideAim() {
  const p = G.player, tg = p && p.rideTg; rInner.visible = rOuter.visible = false;
  if (!p || p.dead || !p.mounted || !p.rideReady || !tg || tg.dead || G.state !== 'play') return;
  const d = Math.hypot(tg.x - p.x, tg.z - p.z), gap = d - strikeAt(p, tg), q = rideQuality(p, tg);
  const y = groundY(tg.x, tg.z) + .2;
  rInner.visible = rOuter.visible = true; rInner.position.set(tg.x, y, tg.z); rOuter.position.set(tg.x, y, tg.z);
  rOuter.scale.setScalar(1 + Math.max(0, gap) * .45);
  const col = q === 'perfect' ? 0xffd23a : q === 'good' ? 0xffffff : q === 'graze' ? 0xff6a4a : 0xb8b8b8;
  rInner.material.color.setHex(col); rOuter.material.color.setHex(col);
}
