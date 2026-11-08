// The new Crown's mountain: what the shared world builder doesn't already draw. The homes (cottages,
// a banner, the safe ring), the bridges over the chasm, the glacier on the summit with the Crown frozen
// in it, the war chest, a neutral castle's guards and the bandits round their campfires.
import * as THREE from 'three';
import { TEAMS, CROWN2, NEUTRAL } from '../config.js';
import { G, ARMIES } from '../core/state.js';
import { groundY, terrainMeshY, mountHomeA, W } from '../core/world.js';
import { stoneTex, woodTex } from './look.js';
import { nightLook } from './scene.js';
import { spark } from './effects.js';
import { c2Garrison } from '../core/sim.js';

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

// A neutral soldier (a castle's guard, a camp's fighter), for the real soldier model (render/soldiers.js draws it
// with the armies' own parts, in grey steel). Only a plain record of what that drawing reads: it is not in
// G.units, so the battle never sees it. Its number, place and facing are the garrison's, nothing else changes.
let figN = 0;
function figure(kind, x, z, face) {
  return { id: 70000 + ++figN, ti: ARMIES, neutral: true, kind, tier: 0, leader: false, human: false, x, z, y: groundY(x, z), vx: 0, vz: 0, vy: 0, face,
    hp: 1, max: 1, swing: 0, swingKind: 0, stun: 0, blockT: 0, blocking: false, aim: false, dead: false, mounted: false, shieldwall: false, jy: 0 };
}

export function buildMount(world, L) {
  if (G.map.id !== 'mount' || !L.mount) { M = null; return; }
  const grp = new THREE.Group(); world.add(grp);
  const stone = lam(0x9a9384, stoneTex()), wood = lam(0x7a5a3a, woodTex()), woodDark = lam(0x55402a, woodTex());
  const plaster = lam(0xf0e6d0), thatch = lam(0xb8954a), skin = lam(0xd9a77a);
  M = { grp, guards: [], camps: [], homes: [], live: [], t: 0 }; // (live: the neutral soldiers standing now, for drawSoldiers)
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
    const px = h.x + Math.cos(h.a) * 3, pz = h.z + Math.sin(h.a) * 3, py = terrainMeshY(px, pz); // (behind the town, out of the captain's way)
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.12, .14, 9, 8), woodDark); pole.position.set(px, py + 4.5, pz); grp.add(shadowy(pole));
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2), new THREE.MeshLambertMaterial({ color: t.hex, side: THREE.DoubleSide })); flag.position.set(px + 1.6, py + 7.8, pz); grp.add(flag);
    M.homes.push({ ring, flag, h });
  }
  // bridges over the chasm, one in line with each keep
  const ch = CROWN2.r.chasm * W.R, cw = CROWN2.r.chasmW * W.R, hw = CROWN2.chasmBridgeHw;
  for (let c = 0; c < 4; c++) {
    const a = mountHomeA(c), g = new THREE.Group(), len = cw * 2 + 3;
    const deck = new THREE.Mesh(new THREE.BoxGeometry(len, .4, hw * 2 + .3), stone); g.add(deck);
    for (const s of [-1, 1]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(len + 3.2, 1.1, .35), stone); rail.position.set(0, .7, s * (hw + .3)); g.add(rail);
      for (let k = -3; k <= 3; k++) { const post = new THREE.Mesh(new THREE.BoxGeometry(.5, 1.5, .5), stone); post.position.set(k * (len + 3.2) / 6, .75, s * (hw + .3)); g.add(post); } } // (railed, end to end and into the walls)
    const under = new THREE.Mesh(new THREE.BoxGeometry(len * .8, 2.6, hw * 2), stone); under.position.y = -1.6; g.add(under);
    g.position.set(Math.cos(a) * ch, CROWN2.h.top + .05, Math.sin(a) * ch); g.rotation.y = -a; grp.add(shadowy(g));
  }
  // the summit: the glacier with the Crown frozen in it
  { const gy = groundY(0, 0), ice = new THREE.Group(), iceMat = new THREE.MeshPhongMaterial({ color: 0xbfe6f5, specular: 0xffffff, shininess: 120, transparent: true, opacity: .62, flatShading: true, depthWrite: false, emissive: 0x000000 });
    // grown up out of the summit: a tall crystal round the Crown and a ring of shards about it, all standing on
    // the ground, as wide as the swing reaches (so a blade lands on ice, not on air); the shards break off as it's hacked
    const shard = (r, h, x, z, tilt, rot) => { const g = new THREE.CylinderGeometry(r * .25, r, h, 5); g.translate(0, h / 2, 0); const m = new THREE.Mesh(g, iceMat);
      m.position.set(x, 0, z); m.rotation.set(Math.sin(rot) * tilt, rot, Math.cos(rot) * tilt); ice.add(m); return m; };
    const core = shard(1.5, 6.2, 0, 0, 0, .3), shards = [];
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + .2, d = 1.45 + (k % 3) * .25; shards.push(shard(.65 + (k % 2) * .2, 2.4 + ((k * 7) % 5) * .45, Math.cos(a) * d, Math.sin(a) * d, .35, a)); }
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.7, .5, 10), iceMat); base.position.y = .2; ice.add(base);
    ice.position.set(0, gy - .1, 0); grp.add(ice);
    const gold = new THREE.MeshPhongMaterial({ color: 0xffcf3a, shininess: 90, specular: 0xfff2b0, emissive: 0x6a4a00 });
    const crown = new THREE.Group(), band = new THREE.Mesh(new THREE.CylinderGeometry(.62, .55, .42, 20, 1, true), gold); band.material.side = THREE.DoubleSide; crown.add(band);
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, sp = new THREE.Mesh(new THREE.ConeGeometry(.13, .42, 6), gold); sp.position.set(Math.cos(a) * .6, .4, Math.sin(a) * .6); crown.add(sp); }
    crown.scale.setScalar(1.8); crown.position.set(0, gy + 2.6, 0); grp.add(crown);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.8, 1.6, 60, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xcff0ff, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
    beam.position.set(0, gy + 30, 0); grp.add(beam);
    M.glacier = { ice, crown, beam, core, shards, mat: iceMat, lastHp: null, flash: 0 }; }
  // village palisades: a ring of stakes, up once bought
  M.pals = [];
  for (const h of G.holds || []) if (h.kind === 'village') {
    const n = 34, inst = new THREE.InstancedMesh(new THREE.CylinderGeometry(.18, .22, 2.4, 6), wood, n), m4 = new THREE.Matrix4();
    for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, x = h.x + Math.cos(a) * (h.r + .6), z = h.z + Math.sin(a) * (h.r + .6); m4.makeTranslation(x, terrainMeshY(x, z) + 1.1, z); inst.setMatrixAt(k, m4); }
    inst.visible = false; grp.add(shadowy(inst)); M.pals.push({ h, inst });
  }
  // torches for the night: a warm glow (a sprite, not a light: cheap on phones) by every castle and keep
  // gate, at both ends of every bridge over the river and the chasm, and round the arena
  { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,230,160,1)'); gr.addColorStop(.25, 'rgba(255,150,50,.75)'); gr.addColorStop(1, 'rgba(255,90,20,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    const mat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 });
    const spots = [];
    for (const cw of L.cwalls) for (const ga of cw.gates.slice(0, 2)) for (const s2 of [-1, 1]) { const a = ga + s2 * .32; spots.push([cw.x + Math.cos(a) * (cw.r + .3), cw.z + Math.sin(a) * (cw.r + .3)]); }
    for (const b of L.river.bridges) for (const s2 of [-1, 1]) spots.push([b.x + Math.cos(b.a) * s2 * (b.len + 1.2) - Math.sin(b.a) * (b.hw + .4), b.z + Math.sin(b.a) * s2 * (b.len + 1.2) + Math.cos(b.a) * (b.hw + .4)]);
    for (let k = 0; k < 4; k++) { const a = mountHomeA(k); for (const d of [ch - cw - 1, ch + cw + 1]) for (const s2 of [-1, 1]) spots.push([Math.cos(a) * d - Math.sin(a) * s2 * (hw + .5), Math.sin(a) * d + Math.cos(a) * s2 * (hw + .5)]); }
    for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2 + .2, d = L.arena.r + .9; spots.push([Math.cos(a) * d, Math.sin(a) * d]); }
    M.torches = spots.map(([x2, z2], i) => { const sp = new THREE.Sprite(mat); sp.position.set(x2, groundY(x2, z2) + 3, z2); sp.scale.setScalar(2.4); sp.userData.ph = i * 1.7; grp.add(sp);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(.07, .09, 2.6, 5), woodDark); post.position.set(x2, groundY(x2, z2) + 1.3, z2); grp.add(post); return sp; });
    M.torchMat = mat; }
  // the war chest (hidden until it lands)
  { const g = new THREE.Group(), box = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1, 1.1), wood); box.position.y = .5; g.add(box);
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, 1.6, 12, 1, false, 0, Math.PI), wood); lid.rotation.z = Math.PI / 2; lid.position.y = 1; g.add(lid);
    for (const x of [-.6, .6]) { const band = new THREE.Mesh(new THREE.BoxGeometry(.12, 1.62, 1.16), new THREE.MeshPhongMaterial({ color: 0xffcf3a, emissive: 0x4a3400 })); band.position.set(x, .78, 0); g.add(band); }
    g.visible = false; grp.add(shadowy(g)); M.chest = g; }
  // guards and bandits alike (M1): a squad each, 3 footmen in front and 2 archers (bows) behind, dropping one by
  // one as they're cut down. They are drawn by render/soldiers.js with the real soldier model in neutral grey
  // steel (see `figure`), under one grey banner each; the banner's pole and cloth are shared by all of them.
  const poleGeo = new THREE.CylinderGeometry(.06, .07, NEUTRAL.h, 6), clothGeo = new THREE.PlaneGeometry(NEUTRAL.w, NEUTRAL.ch);
  const poleMat = lam(NEUTRAL.pole), clothMat = lam(NEUTRAL.cloth, null, { side: THREE.DoubleSide });
  for (const b of (G.c2 && G.c2.breaks) || []) {
    if (b.kind !== 'guard' && b.kind !== 'camp') continue;
    const men = [], nf = b.foot ?? b.men, na = b.arch ?? 0;
    for (let k = 0; k < nf + na; k++) {
      const archer = k >= nf;
      const a = archer ? (k - nf) / Math.max(1, na) * Math.PI * 2 + 1.2 : k / nf * Math.PI * 2 + .4, rr = archer ? 2.5 : 1.3;
      const x = b.x + Math.cos(a) * rr, z = b.z + Math.sin(a) * rr; // (facing out from the post)
      men.push({ u: figure(archer ? 'arch' : 'foot', x, z, Math.atan2(Math.cos(a), Math.sin(a))), archer, i: archer ? k - nf : k });
    }
    // the banner stands between two footmen, clear of a camp's fire in the middle
    const ba = .4 + Math.PI / Math.max(1, nf), bx = b.x + Math.cos(ba) * NEUTRAL.off, bz = b.z + Math.sin(ba) * NEUTRAL.off;
    const banner = new THREE.Group(); banner.position.set(bx, groundY(bx, bz), bz);
    const pole = new THREE.Mesh(poleGeo, poleMat); pole.position.y = NEUTRAL.h / 2; banner.add(pole);
    const flap = new THREE.Group(); flap.position.y = NEUTRAL.h - NEUTRAL.ch / 2 - .15; banner.add(flap); // (the cloth swings about the pole)
    const cloth = new THREE.Mesh(clothGeo, clothMat); cloth.position.x = NEUTRAL.w / 2; flap.add(cloth);
    grp.add(shadowy(banner));
    if (b.kind === 'camp') { const fire = new THREE.Mesh(new THREE.ConeGeometry(.45, .9, 6), new THREE.MeshBasicMaterial({ color: 0xff8a2a })); fire.position.set(b.x, groundY(b.x, b.z) + .45, b.z); grp.add(fire); M.camps.push({ b, fire }); }
    M.guards.push({ b, men, banner, flap, seen: 0 });
    for (const m of men) M.live.push(m.u);
  }
}

// the neutral soldiers standing now, for drawSoldiers to draw beside the armies (null off the mountain)
export const neutralFigs = () => (M && G.map.id === 'mount' ? M.live : null);
if (import.meta.env.DEV) window.__neutralFigs = neutralFigs; // (dev: tests count the neutral soldiers)

export function updateMount(dt) {
  if (!M || !G.c2) return;
  M.t += dt; const K = G.c2, T = G.T;
  M.live.length = 0;
  for (const g of M.guards) {
    const { b, men } = g, [nf, na] = c2Garrison(b);
    const fresh = b.swingT && b.swingT !== g.seen && T - b.swingT < .35; if (fresh) g.seen = b.swingT; // (the garrison struck: its footmen swing)
    g.banner.visible = nf + na > 0; g.flap.rotation.y = Math.sin(M.t * 1.6 + b.x) * .3;
    for (const { u, archer, i } of men) {
      if (i >= (archer ? na : nf)) continue; // (cut down: gone)
      if (!archer) { if (fresh) u.swing = .38; else if (u.swing > 0) u.swing = Math.max(0, u.swing - dt); }
      M.live.push(u);
    }
  }
  for (const { b, fire } of M.camps) { fire.visible = b.hp > 0; fire.scale.y = .8 + Math.sin(M.t * 9 + b.x) * .2; }
  for (const p of M.pals) p.inst.visible = !!p.h.fort;
  // dusk from 7:30, night at 8:00: the sky darkens, the torches come up and flicker
  const nk = T < CROWN2.dusk ? 0 : T < CROWN2.night ? (T - CROWN2.dusk) / (CROWN2.night - CROWN2.dusk) * .5 : Math.min(1, .5 + (T - CROWN2.night) / 8 * .5);
  nightLook(nk);
  if (M.torchMat) { M.torchMat.opacity = Math.min(1, Math.max(0, (nk - .2) * 2)); if (M.torchMat.opacity > 0) for (const t of M.torches) t.scale.setScalar(2.2 + Math.sin(M.t * 11 + t.userData.ph) * .25 + Math.sin(M.t * 7.3 + t.userData.ph * 2) * .15); }
  for (const { flag } of M.homes) flag.rotation.y = Math.sin(M.t * 1.6) * .25;
  // the glacier: whole, cracking as captains hack at it, gone once broken (the Crown rises and spins)
  const gl = K.breaks.find(b => b.kind === 'glacier'), g = M.glacier;
  if (gl && g) {
    const k = gl.hp / gl.max; g.ice.visible = gl.hp > 0;
    // every blow that lands: the ice flashes, shivers and throws chips off the face toward whoever struck it
    if (g.lastHp != null && gl.hp < g.lastHp && gl.hp > 0) { g.flash = .14;
      let by = G.player && !G.player.dead && Math.hypot(G.player.x, G.player.z) < 6 ? G.player : null;
      if (!by) { let bd = 7; for (const u of G.units) if (!u.dead && u.leader) { const d = Math.hypot(u.x - gl.x, u.z - gl.z); if (d < bd) { bd = d; by = u; } } }
      const a = by ? Math.atan2(by.z - gl.z, by.x - gl.x) : Math.random() * 6.28, fx2 = gl.x + Math.cos(a) * 2.1, fz2 = gl.z + Math.sin(a) * 2.1;
      spark(fx2, groundY(fx2, fz2) + 1.6, fz2, '#e8f8ff', 10); spark(fx2, groundY(fx2, fz2) + 1.2, fz2, '#9fd6ef', 6); }
    g.lastHp = gl.hp;
    g.flash = Math.max(0, g.flash - dt); g.mat.emissive.setRGB(g.flash * 3, g.flash * 4, g.flash * 5);
    g.ice.position.x = g.flash > 0 ? Math.sin(M.t * 90) * .08 : 0;
    const left = Math.ceil(k * g.shards.length); g.shards.forEach((m, i) => { m.visible = i < left; });
    g.core.scale.set(.7 + .3 * k, .55 + .45 * k, .7 + .3 * k);
    g.crown.rotation.y += dt * (gl.hp > 0 ? .3 : 2.4); g.crown.position.y = groundY(0, 0) + (gl.hp > 0 ? 2.6 : 4.2 + Math.sin(M.t * 2) * .3);
    const night = T >= CROWN2.night ? 1 : T >= CROWN2.dusk ? (T - CROWN2.dusk) / (CROWN2.night - CROWN2.dusk) * .5 : 0;
    g.beam.material.opacity = night * (.22 + (T >= CROWN2.crack ? Math.sin(M.t * 8) * .1 : 0));
  }
  const ch = K.breaks.find(b => b.kind === 'chest');
  if (M.chest) { M.chest.visible = !!ch && ch.hp > 0; if (ch && ch.hp > 0) { M.chest.position.set(ch.x, groundY(ch.x, ch.z), ch.z); if (ch.hitT && T - ch.hitT < .12) M.chest.rotation.y = Math.sin(M.t * 60) * .05; } }
}
