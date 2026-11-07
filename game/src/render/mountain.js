// The new Crown's mountain: what the shared world builder doesn't already draw. The homes (cottages,
// a banner, the safe ring), the bridges over the chasm, the glacier on the summit with the Crown frozen
// in it, the war chest, a neutral castle's guards and the bandits round their campfires.
import * as THREE from 'three';
import { TEAMS, CROWN2 } from '../config.js';
import { G } from '../core/state.js';
import { groundY, terrainMeshY, mountHomeA, W } from '../core/world.js';
import { stoneTex, woodTex } from './look.js';

let M = null;
const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const shadowy = o => { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };

// the ground's colour by tier, for the world builder's per-vertex pass
const jungleC = new THREE.Color(0x4f7a32), topC = new THREE.Color(0x9cbf62), rockC = new THREE.Color(0x5c5650), paveC = new THREE.Color(0xc9bfa8), townC = new THREE.Color(0xa8916a);
export function mountGround(c, x, z) {
  const R = W.R, K = CROWN2.r, r = Math.hypot(x, z);
  if (r < K.arena * R + 2.5) return c.lerp(paveC, .85);
  if (r < (K.chasm + K.chasmW) * R + 1) return c.lerp(rockC, .8);
  if (r < K.river * R - K.riverW * R - 2) return c.lerp(topC, .5);
  if (r < K.ridge * R - 2) c.lerp(jungleC, .6);
  for (let k = 0; k < 4; k++) { const a = mountHomeA(k), hx = Math.cos(a) * K.home * R, hz = Math.sin(a) * K.home * R, d = Math.hypot(x - hx, z - hz); if (d < 12) c.lerp(townC, .55 * (1 - d / 12)); }
  return c;
}

function figure(body, head, trim) {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.CylinderGeometry(.32, .38, 1.2, 8), body); b.position.y = .9; g.add(b);
  const h = new THREE.Mesh(new THREE.SphereGeometry(.26, 10, 8), head); h.position.y = 1.72; g.add(h);
  const s = new THREE.Mesh(new THREE.BoxGeometry(.08, 1.9, .08), trim); s.position.set(.42, 1.2, .1); g.add(s);
  const l1 = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, .55, 6), body); l1.position.set(-.14, .28, 0); g.add(l1);
  const l2 = l1.clone(); l2.position.x = .14; g.add(l2);
  return shadowy(g);
}

export function buildMount(world, L) {
  if (G.map.id !== 'mount' || !L.mount) { M = null; return; }
  const grp = new THREE.Group(); world.add(grp);
  const stone = lam(0x9a9384, stoneTex()), wood = lam(0x7a5a3a, woodTex()), woodDark = lam(0x55402a, woodTex());
  const plaster = lam(0xf0e6d0), thatch = lam(0xb8954a), skin = lam(0xd9a77a);
  M = { grp, guards: [], camps: [], homes: [], t: 0 };
  // homes: cottages, the colour's banner, a soft ring round the safe ground
  for (const b of L.buildings.filter(b => b.kind === 'cottage')) {
    const g = new THREE.Group(); g.position.set(b.x, terrainMeshY(b.x, b.z) - .1, b.z); g.rotation.y = b.rot;
    const walls = new THREE.Mesh(new THREE.BoxGeometry(b.w, 2.2, b.d), plaster); walls.position.y = 1.1; g.add(walls);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.hypot(b.w, b.d) * .62, 1.8, 4), thatch); roof.rotation.y = Math.PI / 4; roof.scale.set(b.w / b.d, 1, 1); roof.position.y = 3.05; g.add(roof);
    const door = new THREE.Mesh(new THREE.BoxGeometry(.8, 1.5, .12), woodDark); door.position.set(0, .75, b.d / 2 + .02); g.add(door);
    grp.add(shadowy(g));
  }
  for (const h of L.homes) {
    const t = TEAMS[h.c], y = terrainMeshY(h.x, h.z);
    const ring = new THREE.Mesh(new THREE.RingGeometry(h.r - .6, h.r, 64), new THREE.MeshBasicMaterial({ color: t.hex, transparent: true, opacity: .45, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(h.x, y + .12, h.z); grp.add(ring);
    const px = h.x + Math.cos(h.a) * 7, pz = h.z + Math.sin(h.a) * 7, py = terrainMeshY(px, pz); // (behind the town, out of the captain's way)
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.12, .14, 9, 8), woodDark); pole.position.set(px, py + 4.5, pz); grp.add(shadowy(pole));
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2), new THREE.MeshLambertMaterial({ color: t.hex, side: THREE.DoubleSide })); flag.position.set(px + 1.6, py + 7.8, pz); grp.add(flag);
    M.homes.push({ ring, flag, h });
  }
  // bridges over the chasm, one in line with each keep
  const ch = CROWN2.r.chasm * W.R, cw = CROWN2.r.chasmW * W.R, hw = CROWN2.chasmBridgeHw;
  for (let c = 0; c < 4; c++) {
    const a = mountHomeA(c), g = new THREE.Group(), len = cw * 2 + 3;
    const deck = new THREE.Mesh(new THREE.BoxGeometry(len, .4, hw * 2 + .3), stone); g.add(deck);
    for (const s of [-1, 1]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(len, .6, .35), stone); rail.position.set(0, .45, s * (hw + .15)); g.add(rail); }
    const under = new THREE.Mesh(new THREE.BoxGeometry(len * .8, 2.6, hw * 2), stone); under.position.y = -1.6; g.add(under);
    g.position.set(Math.cos(a) * ch, CROWN2.h.top + .05, Math.sin(a) * ch); g.rotation.y = -a; grp.add(shadowy(g));
  }
  // the summit: the glacier with the Crown frozen in it
  { const ice = new THREE.Mesh(new THREE.IcosahedronGeometry(3.4, 1), new THREE.MeshPhongMaterial({ color: 0xbfe6f5, specular: 0xffffff, shininess: 120, transparent: true, opacity: .5, flatShading: true, depthWrite: false }));
    ice.scale.set(1, 1.25, 1); ice.position.set(0, groundY(0, 0) + 3.4, 0); grp.add(ice);
    const gold = new THREE.MeshPhongMaterial({ color: 0xffcf3a, shininess: 90, specular: 0xfff2b0, emissive: 0x6a4a00 });
    const crown = new THREE.Group(), band = new THREE.Mesh(new THREE.CylinderGeometry(.62, .55, .42, 20, 1, true), gold); band.material.side = THREE.DoubleSide; crown.add(band);
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, sp = new THREE.Mesh(new THREE.ConeGeometry(.13, .42, 6), gold); sp.position.set(Math.cos(a) * .6, .4, Math.sin(a) * .6); crown.add(sp); }
    crown.scale.setScalar(2.2); crown.position.set(0, groundY(0, 0) + 3.4, 0); grp.add(crown);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.8, 1.6, 60, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xcff0ff, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
    beam.position.set(0, groundY(0, 0) + 30, 0); grp.add(beam);
    M.glacier = { ice, crown, beam }; }
  // village palisades: a ring of stakes, up once bought
  M.pals = [];
  for (const h of G.holds || []) if (h.kind === 'village') {
    const n = 34, inst = new THREE.InstancedMesh(new THREE.CylinderGeometry(.18, .22, 2.4, 6), wood, n), m4 = new THREE.Matrix4();
    for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, x = h.x + Math.cos(a) * (h.r + .6), z = h.z + Math.sin(a) * (h.r + .6); m4.makeTranslation(x, terrainMeshY(x, z) + 1.1, z); inst.setMatrixAt(k, m4); }
    inst.visible = false; grp.add(shadowy(inst)); M.pals.push({ h, inst });
  }
  // the war chest (hidden until it lands)
  { const g = new THREE.Group(), box = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1, 1.1), wood); box.position.y = .5; g.add(box);
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, 1.6, 12, 1, false, 0, Math.PI), wood); lid.rotation.z = Math.PI / 2; lid.position.y = 1; g.add(lid);
    for (const x of [-.6, .6]) { const band = new THREE.Mesh(new THREE.BoxGeometry(.12, 1.62, 1.16), new THREE.MeshPhongMaterial({ color: 0xffcf3a, emissive: 0x4a3400 })); band.position.set(x, .78, 0); g.add(band); }
    g.visible = false; grp.add(shadowy(g)); M.chest = g; }
  // guards (grey steel) and bandits (brown, red hoods) as figures that drop as their group is cut down
  const guardMat = lam(0x8d939a), banditMat = lam(0x6b5236), hood = lam(0xa8332b), spear = lam(0x5a4632);
  for (const b of (G.c2 && G.c2.breaks) || []) {
    if (b.kind !== 'guard' && b.kind !== 'camp') continue;
    const men = [];
    for (let k = 0; k < b.men; k++) {
      const f = b.kind === 'guard' ? figure(guardMat, guardMat, spear) : figure(banditMat, hood, spear), a = k / b.men * Math.PI * 2 + .4, rr = b.kind === 'guard' ? 1.3 : 1.6;
      const x = b.x + Math.cos(a) * rr, z = b.z + Math.sin(a) * rr; f.position.set(x, groundY(x, z), z); f.rotation.y = Math.atan2(Math.cos(a), Math.sin(a)); grp.add(f); men.push(f);
    }
    if (b.kind === 'camp') { const fire = new THREE.Mesh(new THREE.ConeGeometry(.45, .9, 6), new THREE.MeshBasicMaterial({ color: 0xff8a2a })); fire.position.set(b.x, groundY(b.x, b.z) + .45, b.z); grp.add(fire); M.camps.push({ b, fire }); }
    M.guards.push({ b, men });
  }
}

export function updateMount(dt) {
  if (!M || !G.c2) return;
  M.t += dt; const K = G.c2, T = G.T;
  for (const { b, men } of M.guards) {
    const alive = b.hp <= 0 ? 0 : Math.ceil(b.hp / b.max * b.men), swing = b.swingT && T - b.swingT < .35;
    men.forEach((f, k) => { f.visible = k < alive; if (f.visible) f.children[2].rotation.x = swing && k === 0 ? -.9 : Math.sin(M.t * 2 + k) * .08; });
  }
  for (const { b, fire } of M.camps) { fire.visible = b.hp > 0; fire.scale.y = .8 + Math.sin(M.t * 9 + b.x) * .2; }
  for (const p of M.pals) p.inst.visible = !!p.h.fort;
  for (const { flag } of M.homes) flag.rotation.y = Math.sin(M.t * 1.6) * .25;
  // the glacier: whole, cracking as captains hack at it, gone once broken (the Crown rises and spins)
  const gl = K.breaks.find(b => b.kind === 'glacier'), g = M.glacier;
  if (gl && g) {
    const k = gl.hp / gl.max; g.ice.visible = gl.hp > 0; g.ice.scale.set(.6 + .4 * k, (.6 + .4 * k) * 1.25, .6 + .4 * k);
    if (gl.hitT && T - gl.hitT < .15) g.ice.rotation.y += .05;
    g.crown.rotation.y += dt * (gl.hp > 0 ? .3 : 2.4); g.crown.position.y = groundY(0, 0) + (gl.hp > 0 ? 3.4 : 4.2 + Math.sin(M.t * 2) * .3);
    const night = T >= CROWN2.night ? 1 : T >= CROWN2.dusk ? (T - CROWN2.dusk) / (CROWN2.night - CROWN2.dusk) * .5 : 0;
    g.beam.material.opacity = night * (.22 + (T >= CROWN2.crack ? Math.sin(M.t * 8) * .1 : 0));
  }
  const ch = K.breaks.find(b => b.kind === 'chest');
  if (M.chest) { M.chest.visible = !!ch && ch.hp > 0; if (ch && ch.hp > 0) { M.chest.position.set(ch.x, groundY(ch.x, ch.z), ch.z); if (ch.hitT && T - ch.hitT < .12) M.chest.rotation.y = Math.sin(M.t * 60) * .05; } }
}
