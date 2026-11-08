// The map's holdings (the Desert's oasis, the Valley's villages): a broad ring on the ground and a tall
// banner, both in the colour of the side that holds it (pale while nobody does), pulsing gold while
// it's being taken or fought over.
import * as THREE from 'three';
import { TEAMS } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { terrainMeshY } from '../core/world.js';
import { buildCastleFort, updateCastleFort } from './castlefort.js';

let objs = [];
const neutral = new THREE.Color(0xe8e2d0), gold = new THREE.Color(0xffcf3a), tmp = new THREE.Color();
// an alliance's colour as this player sees it: your own colour for your side, else its first castle's
export function sideCss(a) { if (a < 0) return '#e8e2d0'; if (a === G.ALLY[colorOf(G.myTi)]) return TEAMS[colorOf(G.myTi)].css; const i = G.ALLY.findIndex(x => x === a); return TEAMS[Math.max(0, i)].css; }
// The Crown: a chunky gold crown, cased in stone when it rises; spinning over the plaza once free,
// floating over its carrier's head while carried.
let crown = null;
function buildCrown(world) {
  const g = new THREE.Group(), goldM = new THREE.MeshPhongMaterial({ color: 0xffcf3a, shininess: 90, specular: 0xfff2b0, emissive: 0x6a4a00 });
  const band = new THREE.Mesh(new THREE.CylinderGeometry(.62, .55, .42, 20, 1, true), goldM); band.material.side = THREE.DoubleSide; g.add(band);
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, sp = new THREE.Mesh(new THREE.ConeGeometry(.13, .42, 6), goldM); sp.position.set(Math.cos(a) * .6, .4, Math.sin(a) * .6); g.add(sp);
    const gem = new THREE.Mesh(new THREE.SphereGeometry(.08, 8, 6), new THREE.MeshPhongMaterial({ color: k % 2 ? 0xe0352b : 0x3a5cf0, shininess: 120 })); gem.position.set(Math.cos(a) * .62, 0, Math.sin(a) * .62); g.add(gem); }
  const glow = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.8, 32), new THREE.MeshBasicMaterial({ color: 0xffcf3a, transparent: true, opacity: .35, side: THREE.DoubleSide, depthWrite: false }));
  glow.rotation.x = -Math.PI / 2; const glowG = new THREE.Group(); glowG.add(glow);
  const casing = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, 3, 10), new THREE.MeshLambertMaterial({ color: 0x9a9284 })); casing.castShadow = true;
  g.scale.setScalar(1.4);
  const root = new THREE.Group(); root.add(g, glowG, casing); root.visible = false; world.add(root);
  crown = { root, g, glow: glowG, casing };
}
// The plaza's wall (the Crown): stone blocks round the ring and a wooden gate across each gap; down in the
// ground until 9:00, then it rises over a couple of seconds. A broken gate drops into a heap of planks.
let wall = null;
function buildWall(world, P) {
  const stone = new THREE.MeshLambertMaterial({ color: 0xa79f90 }), plank = new THREE.MeshLambertMaterial({ color: 0x7a5a3a });
  const blocks = P.obs.filter(o => o.plazaWall), gates = P.obs.filter(o => o.plazaGate != null);
  const bm = new THREE.InstancedMesh(new THREE.BoxGeometry(1.25, 3.4, .9), stone, blocks.length), gm = new THREE.InstancedMesh(new THREE.BoxGeometry(1.25, 3, .5), plank, gates.length);
  bm.castShadow = gm.castShadow = true; bm.receiveShadow = true;
  const grp = new THREE.Group(); grp.add(bm, gm); grp.visible = false; world.add(grp);
  wall = { grp, bm, gm, blocks, gates, rise: 0, m: new THREE.Matrix4(), q: new THREE.Quaternion(), v: new THREE.Vector3(), sc: new THREE.Vector3(1, 1, 1) };
}
function updateWall(dt) {
  const w = wall, W = G.plazaWall; if (!w || !W) return;
  w.grp.visible = W.up; if (!W.up) { w.rise = 0; return; }
  w.rise = Math.min(1, w.rise + (dt || .016) / 2.2);
  const lift = (1 - Math.pow(1 - w.rise, 3)) * 3.4 - 3.4 + 1.7; // (eased up out of the ground)
  const put = (mesh, list, i, o, y, tilt) => { const a = Math.atan2(o.x, o.z); w.q.setFromEuler(new THREE.Euler(tilt, a, 0)); w.m.compose(w.v.set(o.x, terrainMeshY(o.x, o.z) + y, o.z), w.q, w.sc); mesh.setMatrixAt(i, w.m); };
  w.blocks.forEach((o, i) => put(w.bm, w.blocks, i, o, lift + (i % 2) * .15, 0));
  w.gates.forEach((o, i) => { const down = (W.broken >> o.plazaGate) & 1; put(w.gm, w.gates, i, o, down ? .2 : lift - .2, down ? Math.PI / 2 * .95 : 0); });
  w.bm.instanceMatrix.needsUpdate = w.gm.instanceMatrix.needsUpdate = true;
}
// The Crown's castle walls: grey stone round each yard, a wooden gate across the gateway that falls
// flat when it's broken (and stands again once mended, or when the castle changes hands).
let cwalls = null; const PLANK = new THREE.Color(0x6f5232), IRON = new THREE.Color(0x3a3634);
function buildCastleWalls(world, list) {
  const stone = new THREE.MeshLambertMaterial({ color: 0x9a9384 }), plank = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const blocks = [], gates = []; for (const cw of list) for (const o of cw.obs) (o.cgate != null ? gates : blocks).push(o);
  const bm = new THREE.InstancedMesh(new THREE.BoxGeometry(1.2, 2.6, .8), stone, Math.max(1, blocks.length)), gm = new THREE.InstancedMesh(new THREE.BoxGeometry(1.2, 2.4, .45), plank, Math.max(1, gates.length));
  bm.castShadow = gm.castShadow = true; bm.receiveShadow = true;
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3(1, 1, 1);
  blocks.forEach((o, i) => { const cw = list.find(c => c.obs.includes(o)); e.set(0, Math.atan2(o.x - cw.x, o.z - cw.z), 0); q.setFromEuler(e); m.compose(v.set(o.x, terrainMeshY(o.x, o.z) + 1.2 + (i % 3 === 0 ? .2 : 0), o.z), q, sc); bm.setMatrixAt(i, m); });
  bm.count = blocks.length; world.add(bm); world.add(gm);
  cwalls = { gm, gates, list, sig: '' };
}
function updateCastleWalls() {
  const c = cwalls; if (!c || !G.cgates) return;
  const sig = c.list.map(cw => (G.cgates[cw.hid] ? (G.cgates[cw.hid].broken | 0) + '/' + (G.cgates[cw.hid].lv | 0) : 0) + ':' + (G.holds && G.holds[cw.hid] ? G.holds[cw.hid].owner : -1)).join(',');
  if (sig === c.sig) return; c.sig = sig;
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3(1, 1, 1);
  c.gates.forEach((o, i) => {
    const cw = c.list.find(x => x.hid === o.cgate), st = G.cgates[o.cgate], h = G.holds && G.holds[o.cgate];
    const down = st && ((st.broken >> (o.gi | 0)) & 1), open = !h || h.owner < 0 || h.owner === G.ALLY[colorOf(G.myTi)]; // (an empty castle, or your own side's: the gate stands open, swung back)
    e.set(down ? Math.PI / 2 * .95 : 0, Math.atan2(o.x - cw.x, o.z - cw.z) + (open && !down ? Math.PI / 2 : 0), 0); q.setFromEuler(e);
    const y = terrainMeshY(o.x, o.z) + (down ? .25 : 1.2), off = open && !down ? 1.2 : 0;
    m.compose(v.set(o.x, y, o.z), q, sc); c.gm.setMatrixAt(i, m);
    c.gm.setColorAt(i, (st && st.lv) ? IRON : PLANK); // (fortified: iron-banded, dark)
  });
  c.gm.count = c.gates.length; c.gm.instanceMatrix.needsUpdate = true; if (c.gm.instanceColor) c.gm.instanceColor.needsUpdate = true;
}
export function buildHolds(world, L) {
  cwalls = null; if (G.mode === 'crown' && L.cwalls && L.cwalls.length) { buildCastleWalls(world, L.cwalls); buildCastleFort(world, L); }
  crown = null; wall = null; towerWorld = G.mode === 'crown' ? world : null; towerObjs.clear(); if (G.mode === 'crown') { buildCrown(world); if (L.plazaWall) buildWall(world, L.plazaWall); }
  objs = (L.holds || []).map(h => {
    const grp = new THREE.Group(); world.add(grp);
    const ring = new THREE.Mesh(new THREE.RingGeometry(h.r - .55, h.r, 64), new THREE.MeshBasicMaterial({ color: neutral, transparent: true, opacity: .4, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(h.x, terrainMeshY(h.x, h.z) + .08, h.z); ring.renderOrder = 1; grp.add(ring);
    const px = h.px ?? h.x, pz = h.pz ?? h.z, py = terrainMeshY(px, pz);
    const noPole = h.kind === 'plaza'; // (the plaza has the Crown instead of a banner)
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.12, .14, 6.5, 6), new THREE.MeshLambertMaterial({ color: 0x6a4e34 })); pole.position.set(px, py + 3.25, pz); pole.castShadow = true; grp.add(pole);
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.4, 6, 1), new THREE.MeshLambertMaterial({ color: neutral, side: THREE.DoubleSide })); cloth.position.set(px + 1.1, py + 5.6, pz); cloth.castShadow = true; grp.add(cloth);
    if (noPole) { pole.visible = false; cloth.visible = false; }
    return { grp, ring, cloth, base: cloth.geometry.attributes.position.array.slice() };
  });
}
function updateCrown() {
  const f = G.flag, c = crown; if (!c) return;
  c.root.visible = !!f; if (!f) return;
  const t = G.T;
  if (f.state === 'carried' && f.carrier) { const u = f.carrier; c.root.position.set(u.x, u.y + 3.3, u.z); c.casing.visible = false; c.glow.visible = false; c.g.position.y = Math.sin(t * 3) * .08; }
  else {
    c.root.position.set(f.x, terrainMeshY(f.x, f.z), f.z);
    const cased = f.state === 'cased', k = cased ? 1 - (f.casing || 0) * .75 : 0;
    c.casing.visible = cased; c.casing.scale.set(k, k, k); c.casing.position.y = 1.5 * k;
    c.glow.visible = !cased; c.glow.position.y = .1;
    c.g.position.y = cased ? 3 * k + 1.1 : 1.6 + Math.sin(t * 2.4) * .2;
  }
  c.g.rotation.y = t * 1.4;
}
// watchtowers (the Crown): wooden posts, a deck and a pennant in the builder's colour; they grow up as
// they're built and keel over when hacked down
let towerWorld = null; const towerObjs = new Map();
function makeTower() {
  const g = new THREE.Group(), wood = new THREE.MeshLambertMaterial({ color: 0x7a5a3a }), post = new THREE.CylinderGeometry(.12, .14, 5, 6);
  for (const [x, z] of [[-.8, -.8], [.8, -.8], [-.8, .8], [.8, .8]]) { const p = new THREE.Mesh(post, wood); p.position.set(x, 2.5, z); p.castShadow = true; g.add(p); }
  const deck = new THREE.Mesh(new THREE.BoxGeometry(2.2, .2, 2.2), wood); deck.position.y = 4.1; g.add(deck);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.7, 1.2, 4), new THREE.MeshLambertMaterial({ color: 0xb89650 })); roof.position.y = 5.6; roof.rotation.y = Math.PI / 4; g.add(roof);
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(.9, .55), new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide })); flag.position.set(.45, 6.6, 0); g.add(flag);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 1.4, 4), wood); pole.position.y = 6.4; g.add(pole);
  return { g, flag };
}
function updateTowers() {
  if (!towerWorld) return;
  const seen = new Set();
  for (const w of G.wtowers || []) {
    seen.add(w.id); let o = towerObjs.get(w.id);
    if (!o) { o = makeTower(); towerWorld.add(o.g); towerObjs.set(w.id, o); o.flag.material.color.set(sideCss(w.a)); }
    o.g.position.set(w.x, terrainMeshY(w.x, w.z), w.z); o.g.scale.set(1, Math.max(.05, w.build), 1);
    o.flag.rotation.y = Math.sin(G.T * 3 + w.id) * .3;
  }
  for (const [id, o] of towerObjs) if (!seen.has(id)) { towerWorld.remove(o.g); towerObjs.delete(id); }
}
let lastT = 0;
export function updateHolds() {
  updateCrown(); updateWall(Math.max(0, Math.min(.1, G.T - lastT))); lastT = G.T; updateTowers(); updateCastleWalls(); updateCastleFort();
  const hs = G.holds; if (!hs) return;
  objs.forEach((o, i) => {
    const h = hs[i]; if (!h) return;
    tmp.set(h.owner >= 0 ? sideCss(h.owner) : '#e8e2d0');
    const busy = h.contested || (h.cap >= 0 && h.prog > 0);
    o.cloth.material.color.lerp(tmp, .08);
    o.ring.material.color.lerp(busy ? gold : tmp, .12);
    o.ring.material.opacity = busy ? .45 + Math.sin(G.T * 7) * .2 : h.owner >= 0 ? .5 : .32;
    // the banner ripples
    const p = o.cloth.geometry.attributes.position, b = o.base;
    for (let k = 0; k < p.count; k++) p.array[k * 3 + 2] = b[k * 3 + 2] + Math.sin(G.T * 4 + b[k * 3] * 2.2 + i) * .12 * (b[k * 3] + 1.1) / 2.2;
    p.needsUpdate = true;
  });
}
