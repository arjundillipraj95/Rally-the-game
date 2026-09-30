// Aiming a volley: hold the Volley button (or V) and a target ring appears on the ground; slide your
// finger (or move the mouse) to put it where you want the arrows and javelins to fall, and let go.
// A quick tap still fires the old way, each man at his own nearest target.
import * as THREE from 'three';
import { JAVELIN } from '../config.js';
import { G, isEnemyTi } from '../core/state.js';
import { groundY } from '../core/world.js';
import { scene, camera, view } from '../render/scene.js';

export const aim = { on: false, moved: false, x: 0, z: 0, ok: false, sx: 0, sy: 0 };
const FINGER_LIFT = 70; // on touch, aim a little above the fingertip so the ring isn't under your thumb

// the ring: a bright rim with a faint fill, drawn over the ground
// (drawn over everything, like a map marker, so a hillside or a crowd never hides it)
const ringMat = new THREE.MeshBasicMaterial({ color: 0xffcf3a, transparent: true, opacity: .9, depthWrite: false, depthTest: false, side: THREE.DoubleSide });
const fillMat = new THREE.MeshBasicMaterial({ color: 0xffcf3a, transparent: true, opacity: .22, depthWrite: false, depthTest: false, side: THREE.DoubleSide });
const ring = new THREE.Group();
const rim = new THREE.Mesh(new THREE.RingGeometry(2.3, 2.85, 48), ringMat), fill = new THREE.Mesh(new THREE.CircleGeometry(2.45, 48), fillMat);
const tick = new THREE.Mesh(new THREE.RingGeometry(.25, .42, 20), ringMat);
for (const m of [rim, fill, tick]) { m.rotation.x = -Math.PI / 2; m.renderOrder = 2; ring.add(m); }
ring.visible = false; scene.add(ring);

// Where a point on the screen lands on the ground (null if it's the sky)
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), P = new THREE.Vector3();
export function screenToGround(sx, sy) {
  ndc.set(sx / view.W * 2 - 1, -(sy / view.H) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const o = ray.ray.origin, d = ray.ray.direction;
  let prev = 0;
  for (let t = 1; t < 160; t += .75) {
    P.copy(d).multiplyScalar(t).add(o);
    if (P.y <= groundY(P.x, P.z)) { // step back to the crossing for a steady ring
      for (let k = 0; k < 6; k++) { const m = (prev + t) / 2; P.copy(d).multiplyScalar(m).add(o); if (P.y <= groundY(P.x, P.z)) t = m; else prev = m; }
      P.copy(d).multiplyScalar(t).add(o);
      return { x: P.x, z: P.z };
    }
    prev = t;
  }
  return null;
}

// can anyone in my army reach this spot?
function reachable(x, z) {
  for (const u of G.units) {
    if (u.dead || u.ti !== G.myTi) continue;
    const d = Math.hypot(x - u.x, z - u.z);
    if (u.kind === 'arch' && d <= (u.range || 22) * 1.1) return true;
    if (u.kind === 'foot' && u.tier >= 1 && d <= JAVELIN.range * 1.2) return true;
  }
  return false;
}
// the ring starts on the nearest enemy in front of you (or a little ahead)
function autoPoint(p) {
  let best = null, bs = 1e9;
  for (const o of G.units) {
    if (o.dead || !isEnemyTi(o.ti, G.myTi)) continue;
    const d = Math.hypot(o.x - p.x, o.z - p.z); if (d > 30) continue;
    const ahead = Math.cos(Math.atan2(o.x - p.x, o.z - p.z) - p.face), s = d - ahead * 8;
    if (s < bs) { bs = s; best = o; }
  }
  return best ? { x: best.x, z: best.z } : { x: p.x + Math.sin(p.face) * 14, z: p.z + Math.cos(p.face) * 14 };
}

export function aimStart(sx, sy) {
  const p = G.player, me = G.teams[G.myTi];
  if (!p || p.dead || G.state !== 'play' || !me || me.volleyCd > 0) return false;
  const a = autoPoint(p);
  Object.assign(aim, { on: true, moved: false, x: a.x, z: a.z, sx, sy });
  aim.ok = reachable(aim.x, aim.z);
  return true;
}
export function aimMove(sx, sy, touch, force) {
  if (!aim.on) return;
  if (!force && !aim.moved && Math.hypot(sx - aim.sx, sy - aim.sy) < 14) return;
  aim.moved = true;
  const g = screenToGround(sx, sy - (touch ? FINGER_LIFT : 0)); if (!g) return;
  aim.x = g.x; aim.z = g.z; aim.ok = reachable(g.x, g.z);
}
// returns the aimed point, or null for an unaimed (tap) volley
export function aimEnd() { if (!aim.on) return undefined; aim.on = false; return aim.moved ? { x: aim.x, z: aim.z, ok: aim.ok } : null; }
export function aimCancel() { aim.on = false; }

export function drawVolleyAim(t) {
  ring.visible = aim.on && G.state === 'play';
  if (!ring.visible) return;
  ring.position.set(aim.x, groundY(aim.x, aim.z) + .12, aim.z);
  const c = aim.ok ? 0xffcf3a : 0x9a9a9a;
  ringMat.color.setHex(c); fillMat.color.setHex(c);
  const pulse = 1 + .04 * Math.sin(t * 9);
  rim.scale.setScalar(pulse);
}
