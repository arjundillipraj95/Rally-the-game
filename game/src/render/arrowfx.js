// ARCH2 (Arjun 19 Nov): arrows made to be seen on a phone. A longer shaft with an iron head, and behind it a wind
// streak: pale for an archer's, gold and longer for a champion's, orange with a flame at the head and a smoke trail
// for fire arrows. Where one lands: on a man, a spark and a puff of dust; on a building, dust and splinters (and fire,
// if a fire arrow); in the ground, a little dust. Every phone: the flags ride with the arrows (netgame field 11).
import * as THREE from 'three';
import { G, bus } from '../core/state.js';
import { groundY } from '../core/world.js';
import { scene, camera } from './scene.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const MAX = 200;
// (ARCH3, Arjun 19 Nov: "does the arrow look abnormal?") an arrow's own proportions: 0.9 m, thin, a small narrow head
// and three feathers; it grows a little with the camera's distance (seen in a wide shot, not a javelin up close).
// The trail is a soft wisp that fades to nothing; a fire arrow has a flickering flame at its head.
const shaftGeo = (() => { const g = new THREE.CylinderGeometry(.014, .014, .9, 5); g.rotateX(Math.PI / 2); return g; })();
const headGeo = (() => { const g = new THREE.ConeGeometry(.032, .12, 4); g.rotateX(Math.PI / 2); g.translate(0, 0, .51); return g; })();
const fletchGeo = mergeGeometries([0, 1, 2].map(k => { const g = new THREE.BoxGeometry(.003, .055, .17); g.translate(0, .032, -.36); g.rotateZ(k * Math.PI * 2 / 3); return g; }));
const fade = (() => { const c = document.createElement('canvas'); c.width = 4; c.height = 64; const g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 64);
  gr.addColorStop(0, '#fff'); gr.addColorStop(.45, '#555'); gr.addColorStop(1, '#000'); g.fillStyle = gr; g.fillRect(0, 0, 4, 64); return new THREE.CanvasTexture(c); })(); // (bright by the arrow, nothing at the tail)
const streakGeo = (() => { const g = new THREE.CylinderGeometry(.03, .002, 1, 6, 1, true); g.rotateX(Math.PI / 2); g.translate(0, 0, -.5); return g; })(); // (1 long, from its origin back: set at the feathers, scaled per arrow)
const flameGeo = (() => { const g = new THREE.ConeGeometry(.05, .26, 6); g.rotateX(-Math.PI / 2); g.translate(0, 0, .38); return g; })(); // (licking back from the head)
const mk = (geo, mat) => { const m = new THREE.InstancedMesh(geo, mat, MAX); m.frustumCulled = false; m.count = 0; scene.add(m); return m; };
const shaft = mk(shaftGeo, new THREE.MeshLambertMaterial({ color: 0xffffff }));
const head = mk(headGeo, new THREE.MeshLambertMaterial({ color: 0x3a3a40 }));
const fletch = mk(fletchGeo, new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
const streak = mk(streakGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: .7, alphaMap: fade, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
const flame = mk(flameGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: .9, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
for (const m of [streak, shaft, fletch, flame]) m.setColorAt(0, new THREE.Color());
const o3 = new THREE.Object3D(), col = new THREE.Color(), cv = new THREE.Vector3();
const LOOK = { // trail colour and length (m), by what kind of arrow
  plain: [0xeee8d8, 1.8], champ: [0xffc23a, 3], fire: [0xff7a1a, 2.2] };
const SHAFT = { plain: 0x6b4c2e, champ: 0xd9a92e, fire: 0x5b3a22 }, FLETCH = { plain: 0xe9e2d0, champ: 0xffd76a, fire: 0x9a2a1a };
export const arrowStats = { drawn: 0, landed: 0, hits: 0, calls: 0 }; // (tests)
if (import.meta.env.DEV) window.__arrowStats = arrowStats; // (and drawArrows below: store/look.mjs)

const kindOf = a => (a.fire ? 'fire' : a.champ ? 'champ' : 'plain');
// where it came down: on a man, a building or the ground
function land(a) {
  a.fxDone = true; arrowStats.landed++;
  const x = a.x, z = a.z, y = Math.max(a.y, groundY(x, z) + .3), fire = !!a.fire;
  let man = a.tg && !a.tg.dead ? a.tg : null;
  if (!man && !a.bld) { let bd = 1.3; for (const o of G.units) { if (o.dead || o.ti === a.ti) continue; const d = Math.hypot(o.x - x, o.z - z); if (d < bd) { bd = d; man = o; } } }
  if (a.bld) {
    bus.emit('spark', { x, y: y + .6, z, c: '#cdbb9a', n: a.champ ? 10 : 6 }); bus.emit('spark', { x, y: y + .6, z, c: '#6b4a2a', n: 4 });
    if (fire) { bus.emit('spark', { x, y: y + .7, z, c: '#ff7a1a', n: 8 }); bus.emit('spark', { x, y: y + 1.2, z, c: '#3b3631', n: 5 }); }
  } else if (man) {
    arrowStats.hits++; const my = (man.y || 0) + 1.2;
    bus.emit('spark', { x: man.x, y: my, z: man.z, c: a.champ ? '#ffd76a' : '#f2e4c0', n: a.champ ? 9 : 5 }); bus.emit('spark', { x: man.x, y: my - .7, z: man.z, c: '#cdbb9a', n: 3 });
    if (fire) { bus.emit('spark', { x: man.x, y: my, z: man.z, c: '#ff7a1a', n: man.kind === 'thrower' ? 14 : 7 }); bus.emit('spark', { x: man.x, y: my + .6, z: man.z, c: '#3b3631', n: man.kind === 'thrower' ? 8 : 3 }); }
  } else bus.emit('spark', { x, y: groundY(x, z) + .15, z, c: '#cdbb9a', n: 3 });
}
let prev = [], frame = 0;
export function drawArrows() {
  let n = 0; frame++; arrowStats.calls++;
  const now = [];
  for (const a of G.arrows) {
    if (a.bolt) continue; // (FIX4: bolts are drawn by render/bolts.js)
    a.seenF = frame; now.push(a);
    if (!a.fxDone && (a.done || a.stuck || a.t >= 1)) land(a);
    if (a.done || n >= MAX) continue;
    const dx = a.x - (a.px ?? a.x), dy = a.y - (a.py ?? a.y), dz = a.z - (a.pz ?? a.z);
    const kind = kindOf(a), big = Math.min(2.2, Math.max(1, camera.position.distanceTo(cv.set(a.x, a.y, a.z)) / 12)); // (grows with the camera's distance)
    o3.position.set(a.x, a.y, a.z); o3.scale.setScalar(big);
    if (dx || dy || dz) { o3.lookAt(a.x + dx + 1e-4, a.y + dy, a.z + dz); a.q = (a.q || new THREE.Quaternion()).copy(o3.quaternion); } else if (a.q) o3.quaternion.copy(a.q);
    o3.updateMatrix(); shaft.setMatrixAt(n, o3.matrix); head.setMatrixAt(n, o3.matrix); fletch.setMatrixAt(n, o3.matrix);
    shaft.setColorAt(n, col.setHex(SHAFT[kind])); fletch.setColorAt(n, col.setHex(FLETCH[kind]));
    const [c, len] = LOOK[kind], k = a.stuck ? 0 : 1, w = (a.champ ? 1.3 : 1) * big;
    o3.translateZ(-.42 * big); o3.scale.set(w * k, w * k, len * k); o3.updateMatrix(); streak.setMatrixAt(n, o3.matrix); streak.setColorAt(n, col.setHex(c)); o3.position.set(a.x, a.y, a.z);
    const fl = a.fire && !a.stuck ? big : 0, flick = 1 + .3 * Math.sin(G.T * 37 + a.id * 3) + .15 * Math.sin(G.T * 61 + a.id);
    o3.scale.set(fl * (1.1 - .1 * flick), fl * (1.1 - .1 * flick), fl * flick); o3.updateMatrix(); flame.setMatrixAt(n, o3.matrix); flame.setColorAt(n, col.setHex(Math.sin(G.T * 23 + a.id) > 0 ? 0xff8a1a : 0xffb02e));
    if (a.fire && !a.stuck && (a.smokeT == null || G.T - a.smokeT > .07)) { a.smokeT = G.T; bus.emit('spark', { x: a.x, y: a.y, z: a.z, c: '#4a443d', n: 1 }); } // (a smoke trail)
    n++;
  }
  for (const a of prev) if (a.seenF !== frame && !a.fxDone) land(a);
  prev = now;
  arrowStats.drawn = Math.max(arrowStats.drawn, n);
  for (const m of [shaft, head, fletch, streak, flame]) { m.count = n; m.visible = n > 0; m.instanceMatrix.needsUpdate = true; }
  if (n) for (const m of [streak, shaft, fletch, flame]) m.instanceColor.needsUpdate = true;
}
if (import.meta.env.DEV) window.__drawArrows = drawArrows;
