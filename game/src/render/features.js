// 3D pieces for the map features in a layout: temples, houses, columns and statues (Forum),
// the arena, its stands, crowd and timed gates (Colosseum), the sand fortress and palms (Desert Fort),
// palisade rings, watchtowers and huts (Wooden Fort). Repeated pieces are instanced.
import * as THREE from 'three';
import { seeThrough } from './seethrough.js';
import { TEAMS } from '../config.js';
import { G } from '../core/state.js';
import { TEMPLES, TEMPLE, DESERT, ARENA, arenaGatesOpen, terrainMeshY, groundY, mulberry, angDiff } from '../core/world.js';
import { stoneTex, woodTex, uvScale } from './look.js';
import { quality } from './quality.js';

const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const M = {
  marble: lam(0xf2ede2, stoneTex()), marbleDark: lam(0xd8d0c0, stoneTex()), polished: lam(0xf4f0e8), polishedDark: lam(0xddd5c6), plaster: lam(0xeadfc6), roof: lam(0xb4553a),
  sand: lam(0xe0bf8c, stoneTex()), sandDark: lam(0xc9a672, stoneTex()), wood: lam(0x7a5a3a, woodTex()), log: lam(0x6a4b33, woodTex()),
  thatch: lam(0xb89650), dark: lam(0x2a2018), bronze: new THREE.MeshPhongMaterial({ color: 0xc8903c, shininess: 60, specular: 0x665533 }),
  palmTrunk: lam(0x8a6a44, woodTex()), palmLeaf: lam(0x4a7430, null, { side: THREE.DoubleSide }), iron: lam(0x3a3a3e),
};
const shadowy = (o, cast = true) => { o.traverse(m => { if (m.isMesh) { m.castShadow = cast; m.receiveShadow = true; } }); return o; };
const mx = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s3 = new THREE.Vector3();
const place = (inst, i, x, y, z, rx, ry, rz, sx, sy, sz) => { e.set(rx, ry, rz); q.setFromEuler(e); mx.compose(v.set(x, y, z), q, s3.set(sx, sy, sz)); inst.setMatrixAt(i, mx); };
function instanced(geo, mat, items, fn) { const m = new THREE.InstancedMesh(geo, mat, Math.max(1, items.length)); items.forEach((it, i) => fn(m, i, it)); m.count = items.length; return m; }

let anim = { gates: [], crowdU: null };

// A triangular prism for temple roofs: width along x, depth along z, peak up.
function prism(w, h, d) {
  const g = new THREE.BufferGeometry(), x = w / 2, z = d / 2;
  const P = [-x, 0, z, x, 0, z, 0, h, z, -x, 0, -z, 0, h, -z, x, 0, -z];
  const idx = [0, 1, 2, 5, 3, 4, 0, 2, 4, 0, 4, 3, 1, 5, 4, 1, 4, 2, 0, 3, 5, 0, 5, 1];
  g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setIndex(idx); g.computeVertexNormals();
  return g.toNonIndexed();
}

export function buildFeatures(L, world) {
  anim = { gates: [], crowdU: null };
  const id = L.mapId;
  // ---------- columns (temples and the colonnade) ----------
  if (L.columns.length) {
    // fluted shafts of polished marble: every other edge of the cylinder pressed in a touch
    const shaft = new THREE.CylinderGeometry(1, 1.08, 1, 24, 1); { const p = shaft.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i), a = Math.atan2(z, x), k = Math.round(a / (Math.PI * 2) * 24) % 2 ? .9 : 1; if (Math.hypot(x, z) > .5) { p.setX(i, x * k); p.setZ(i, z * k); } } shaft.computeVertexNormals(); }
    world.add(shadowy(instanced(shaft, M.polished, L.columns, (m, i, c) => place(m, i, c.x, c.y + c.h / 2, c.z, 0, 0, 0, c.r, c.h, c.r))));
    const capital = new THREE.CylinderGeometry(.62, .45, 1, 16);
    world.add(shadowy(instanced(capital, M.polishedDark, L.columns, (m, i, c) => place(m, i, c.x, c.y + c.h - .05, c.z, 0, 0, 0, c.r * 2.4, .45, c.r * 2.4))));
    world.add(shadowy(instanced(new THREE.BoxGeometry(1, 1, 1), M.polishedDark, L.columns, (m, i, c) => place(m, i, c.x, c.y + c.h + .3, c.z, 0, 0, 0, c.r * 2.7, .3, c.r * 2.7))));
    world.add(shadowy(instanced(new THREE.CylinderGeometry(.6, .66, 1, 16), M.polishedDark, L.columns, (m, i, c) => place(m, i, c.x, c.y + .15, c.z, 0, 0, 0, c.r * 2.4, .3, c.r * 2.4))));
  }
  // ---------- statues on pedestals ----------
  for (const st of L.statues) {
    const g = new THREE.Group(), k = st.big ? 1.6 : 1;
    const sm = st.big ? M.bronze : M.polished;
    const ped = new THREE.Mesh(new THREE.BoxGeometry(1.6 * k, 1.4 * k, 1.6 * k), M.polishedDark); ped.position.y = .7 * k; g.add(ped);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(1.8 * k, .2 * k, 1.8 * k), M.polishedDark); cap.position.y = 1.5 * k; g.add(cap);
    const robe = new THREE.Mesh(new THREE.CylinderGeometry(.34 * k, .62 * k, 1.9 * k, 12), sm); robe.position.y = 2.55 * k; g.add(robe);
    const chest = new THREE.Mesh(new THREE.SphereGeometry(.42 * k, 12, 8), sm); chest.scale.set(1, .9, .8); chest.position.y = 3.45 * k; g.add(chest);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.27 * k, 12, 9), sm); head.position.y = 4.05 * k; g.add(head);
    const wreath = new THREE.Mesh(new THREE.TorusGeometry(.25 * k, .05 * k, 5, 12).rotateX(Math.PI / 2), st.big ? M.bronze : lam(0xc8b04a)); wreath.position.y = 4.15 * k; g.add(wreath);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(.08 * k, .09 * k, 1.2 * k, 8), sm); arm.position.set(.5 * k, 4.1 * k, .1 * k); arm.rotation.set(.2, 0, -.35); g.add(arm);
    const drape = new THREE.Mesh(new THREE.BoxGeometry(.2 * k, 1.3 * k, .5 * k), sm); drape.position.set(-.45 * k, 3 * k, 0); drape.rotation.z = .12; g.add(drape);
    g.position.set(st.x, groundY(st.x, st.z), st.z); g.rotation.y = Math.atan2(-st.x, -st.z);
    world.add(shadowy(g));
  }
  // ---------- houses, tents and huts ----------
  const houses = L.buildings.filter(b => b.kind === 'house'), tents = L.buildings.filter(b => b.kind === 'tent'), huts = L.buildings.filter(b => b.kind === 'hut');
  if (houses.length) {
    const tints = [0xf2e8d2, 0xe8c9a0, 0xe7b48f, 0xf0dcae, 0xdcae8c, 0xefe2c8].map(c => new THREE.Color(c));
    world.add(shadowy(instanced(new THREE.BoxGeometry(1, 1, 1), lam(0xffffff), houses, (m, i, b) => { place(m, i, b.x, b.h / 2, b.z, 0, b.rot, 0, b.w, b.h, b.d); m.setColorAt(i, tints[(Math.abs(b.x * 3 + b.z * 7) | 0) % tints.length]); })));
    world.add(shadowy(instanced(new THREE.BoxGeometry(1, 1, 1), lam(0xa89274, stoneTex()), houses, (m, i, b) => place(m, i, b.x, .45, b.z, 0, b.rot, 0, b.w + .12, .9, b.d + .12))));
    world.add(shadowy(instanced(new THREE.BoxGeometry(1, 1, 1), M.polishedDark, houses, (m, i, b) => place(m, i, b.x, b.h - .1, b.z, 0, b.rot, 0, b.w + .35, .25, b.d + .35))));
    const doors = []; for (const b of houses) for (const [fx, fz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) if ((Math.abs(b.x + fx * 5 + b.z * 3 + fz * 11) | 0) % 3 !== 0) doors.push({ x: b.x + fx * (b.w / 2 + .03), z: b.z + fz * (b.d / 2 + .03), ry: fx ? Math.PI / 2 : 0 });
    world.add(instanced(new THREE.PlaneGeometry(1.1, 2), lam(0x4a2e1c, woodTex()), doors, (m, i, h) => place(m, i, h.x, 1, h.z, 0, h.ry, 0, 1, 1, 1)));
    const shut = []; for (const b of houses) for (const [fx, fz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) for (const t of [-.28, .28]) for (const sd of [-1, 1]) {
      const ox = fz ? t * b.w + sd * .62 : 0, oz = fx ? t * b.d + sd * .62 : 0;
      shut.push({ x: b.x + fx * (b.w / 2 + .04) + ox, z: b.z + fz * (b.d / 2 + .04) + oz, y: b.h * .62, ry: fx ? Math.PI / 2 : 0 });
    }
    world.add(instanced(new THREE.PlaneGeometry(.34, 1.25), lam(0x4f6a3a, woodTex(), { side: THREE.DoubleSide }), shut, (m, i, h) => place(m, i, h.x, h.y, h.z, 0, h.ry, 0, 1, 1, 1)));
    const roofGeo = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4); roofGeo.rotateY(Math.PI / 4); roofGeo.translate(0, .5, 0);
    world.add(shadowy(instanced(roofGeo, M.roof, houses, (m, i, b) => place(m, i, b.x, b.h, b.z, 0, b.rot, 0, b.w * 1.12, 2.2, b.d * 1.12))));
    // dark doors and windows along the street sides
    const holes = []; for (const b of houses) for (const [fx, fz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) for (const t of [-.28, .28]) holes.push({ x: b.x + fx * (b.w / 2 + .02) + (fz ? t * b.w : 0), z: b.z + fz * (b.d / 2 + .02) + (fx ? t * b.d : 0), y: b.h * .62, ry: fx ? Math.PI / 2 : 0 });
    world.add(instanced(new THREE.PlaneGeometry(.9, 1.2), M.dark, holes, (m, i, h) => place(m, i, h.x, h.y, h.z, 0, h.ry, 0, 1, 1, 1)));
  }
  if (tents.length) {
    const g = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4); g.rotateY(Math.PI / 4); g.translate(0, .5, 0);
    const cloth = [0xe8dcc0, 0xb8563a, 0xd9b36a, 0x8a5a3a];
    const inst = instanced(g, lam(0xffffff, null, { side: THREE.DoubleSide }), tents, (m, i, b) => { place(m, i, b.x, groundY(b.x, b.z), b.z, 0, b.rot, 0, b.w * 1.1, b.h, b.d * 1.1); m.setColorAt(i, new THREE.Color(cloth[i % cloth.length])); });
    world.add(shadowy(inst));
  }
  if (huts.length) {
    world.add(shadowy(instanced(uvScale(new THREE.CylinderGeometry(1, 1, 1, 10), 3, 1), M.log, huts, (m, i, b) => place(m, i, b.x, 1.1, b.z, 0, b.rot, 0, b.w / 2, 2.2, b.d / 2))));
    world.add(shadowy(instanced(new THREE.ConeGeometry(1, 1, 10), M.thatch, huts, (m, i, b) => place(m, i, b.x, 3.2, b.z, 0, b.rot, 0, b.w / 2 + .5, 2.2, b.d / 2 + .5))));
  }
  // ---------- towers ----------
  for (const t of L.towers) {
    const g = new THREE.Group(), y0 = terrainMeshY(t.x, t.z);
    if (t.kind === 'sand') {
      const body = new THREE.Mesh(uvScale(new THREE.CylinderGeometry(t.r, t.r * 1.12, t.h, 14), 4, 2), M.sand); body.position.y = t.h / 2; g.add(body);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(t.r * 1.18, t.r * 1.18, .8, 14), M.sandDark); top.position.y = t.h + .4; g.add(top);
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, c = new THREE.Mesh(new THREE.BoxGeometry(.7, .7, .5), M.sandDark); c.position.set(Math.cos(a) * t.r * 1.05, t.h + 1.15, Math.sin(a) * t.r * 1.05); c.rotation.y = -a; g.add(c); }
    } else { // wooden watchtower: four posts, a platform, a railing and a roof
      const w = t.small ? .9 : 1.5, post = new THREE.CylinderGeometry(.14, .16, t.h, 6);
      for (const [px, pz] of [[-w, -w], [w, -w], [-w, w], [w, w]]) { const p = new THREE.Mesh(post, M.log); p.position.set(px, t.h / 2, pz); g.add(p); }
      const deck = new THREE.Mesh(new THREE.BoxGeometry(w * 2 + .8, .25, w * 2 + .8), M.wood); deck.position.y = t.h - 1.4; g.add(deck);
      for (const [rx, rz, ry] of [[0, w + .35, 0], [0, -w - .35, 0], [w + .35, 0, Math.PI / 2], [-w - .35, 0, Math.PI / 2]]) { const r = new THREE.Mesh(new THREE.BoxGeometry(w * 2 + .8, .5, .12), M.wood); r.position.set(rx, t.h - 1, rz); r.rotation.y = ry; g.add(r); }
      const roof = new THREE.Mesh(new THREE.ConeGeometry(w * 1.9, 1.6, 4), M.thatch); roof.position.y = t.h + .7; roof.rotation.y = Math.PI / 4; g.add(roof);
    }
    g.position.set(t.x, y0, t.z); world.add(shadowy(g));
  }
  // ---------- ring walls ----------
  for (const r of L.rings) {
    const cx = r.x || 0, cz = r.z || 0, skip = a => r.gaps.some(t => Math.abs(angDiff(a, t)) < r.gapW) || (r.towersAt || []).some(t => Math.abs(angDiff(a, t)) < 2.8 / r.r);
    if (r.kind === 'logs') {
      const logs = []; const n = Math.ceil(Math.PI * 2 * r.r / .68), R = mulberry(Math.round(cx + cz) + 7);
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; if (!skip(a)) logs.push({ x: cx + Math.cos(a) * r.r, z: cz + Math.sin(a) * r.r, sy: .9 + R() * .25, rot: R() * 3 }); }
      world.add(shadowy(instanced(uvScale(new THREE.CylinderGeometry(.32, .36, 1, 7), 1, 2), M.log, logs, (m, i, l) => place(m, i, l.x, terrainMeshY(l.x, l.z) + r.h * l.sy / 2, l.z, 0, l.rot, 0, 1, r.h * l.sy, 1))));
      world.add(shadowy(instanced(new THREE.ConeGeometry(.34, .55, 7), M.log, logs, (m, i, l) => place(m, i, l.x, terrainMeshY(l.x, l.z) + r.h * l.sy + .27, l.z, 0, l.rot, 0, 1, 1, 1))));
      continue;
    }
    const mat = id === 'desert' ? M.sand : M.marbleDark, cap = id === 'desert' ? M.sandDark : M.marble;
    const segs = [], n = Math.ceil(Math.PI * 2 * r.r / 1.8);
    for (let i = 0; i < n; i++) { const a = (i + .5) / n * Math.PI * 2; if (!skip(a)) segs.push({ a, x: cx + Math.cos(a) * r.r, z: cz + Math.sin(a) * r.r }); }
    const len = Math.PI * 2 * r.r / n + .05;
    world.add(shadowy(instanced(uvScale(new THREE.BoxGeometry(1, 1, 1), .8, 1.4), mat, segs, (m, i, sg) => place(m, i, sg.x, r.h / 2, sg.z, 0, -sg.a, 0, 1.8, r.h, len))));
    world.add(shadowy(instanced(new THREE.BoxGeometry(1, 1, 1), cap, segs.filter((_, k) => k % 2 === 0), (m, i, sg) => place(m, i, sg.x, r.h + .35, sg.z, 0, -sg.a, 0, 1.9, .7, len * .55))));
    // gatehouses: two pillars and a lintel over each gap
    for (const g0 of r.gaps) {
      const half = r.gapW * r.r + .9;
      for (const sd of [-1, 1]) { const a = g0 + sd * half / r.r, p = new THREE.Mesh(new THREE.BoxGeometry(2.2, r.h + 1.6, 2.2), cap); p.position.set(cx + Math.cos(a) * r.r, (r.h + 1.6) / 2, cz + Math.sin(a) * r.r); p.rotation.y = -a; world.add(shadowy(p)); }
      const lin = new THREE.Mesh(new THREE.BoxGeometry(1.6, .9, half * 2 + 2), cap); lin.position.set(cx + Math.cos(g0) * r.r, r.h + 1.2, cz + Math.sin(g0) * r.r); lin.rotation.y = -g0; world.add(shadowy(lin));
    }
  }
  // ---------- Forum temples ----------
  if (id === 'forum') for (const t of TEMPLES) {
    const g = new THREE.Group(), H = TEMPLE.h, d = TEMPLE.back - TEMPLE.front, w = TEMPLE.hw * 2;
    const plat = new THREE.Mesh(uvScale(new THREE.BoxGeometry(w, H, d), 6, 1), M.marbleDark); plat.position.set(0, H / 2, (TEMPLE.back + TEMPLE.front) / 2); g.add(plat);
    for (let k = 0; k < 3; k++) { const st = new THREE.Mesh(new THREE.BoxGeometry(w - 1, H * (k + 1) / 3, 1), M.marble); st.position.set(0, H * (k + 1) / 6, TEMPLE.front - 2.5 + k); g.add(st); }
    const ch = 5.2, cella = new THREE.Mesh(uvScale(new THREE.BoxGeometry(12, ch, 6), 4, 2), M.marble); cella.position.set(0, H + ch / 2, 3); g.add(cella);
    const door = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.6), M.dark); door.position.set(0, H + 1.8, -.02); door.rotation.y = Math.PI; g.add(door);
    const ent = new THREE.Mesh(new THREE.BoxGeometry(w + .4, .7, d + .4), M.marble); ent.position.set(0, H + ch + .35, (TEMPLE.back + TEMPLE.front) / 2); g.add(ent);
    const roof = new THREE.Mesh(prism(w + .8, 2.4, d + .8), M.roof); roof.position.set(0, H + ch + .7, (TEMPLE.back + TEMPLE.front) / 2); g.add(roof);
    const ped = new THREE.Mesh(prism(w + .4, 2.2, .3), M.marble); ped.position.set(0, H + ch + .7, TEMPLE.front - .15); g.add(ped);
    g.position.set(t.x, 0, t.z); g.rotation.y = t.rot;
    world.add(shadowy(g));
  }
  // ---------- Desert Fort ramps ----------
  if (id === 'desert') for (const a of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
    const run = DESERT.ramp - DESERT.r, len = Math.hypot(run, DESERT.h), g = new THREE.Group();
    const ramp = new THREE.Mesh(uvScale(new THREE.BoxGeometry(DESERT.lane * 2, .5, len), 2, 3), M.sandDark);
    ramp.rotation.x = Math.atan2(DESERT.h, run); ramp.position.set(0, DESERT.h / 2 - .22, DESERT.r + run / 2); g.add(ramp);
    g.rotation.y = Math.atan2(Math.cos(a), Math.sin(a)); world.add(shadowy(g));
  }
  // ---------- palms ----------
  if (L.palms.length) {
    const segs = [], leaves = [];
    for (const p of L.palms) {
      const y0 = terrainMeshY(p.x, p.z), n = 5, h = 1.3 * p.s;
      let x = p.x, z = p.z, y = y0;
      for (let k = 0; k < n; k++) { const bend = p.lean * (k + 1) / n; segs.push({ x: x + Math.sin(p.rot) * bend * .5, y: y + h / 2, z: z + Math.cos(p.rot) * bend * .5, rx: bend * Math.cos(p.rot), rz: -bend * Math.sin(p.rot), s: p.s * (1 - k * .08) }); x += Math.sin(p.rot) * bend * h; z += Math.cos(p.rot) * bend * h; y += h * .97; }
      for (let k = 0; k < 7; k++) leaves.push({ x, y: y + .1, z, ry: k / 7 * Math.PI * 2 + p.rot, s: p.s });
    }
    const trunks = instanced(uvScale(new THREE.CylinderGeometry(.2, .26, 1.35, 7), 1, 2), M.palmTrunk, segs, (m, i, sg) => place(m, i, sg.x, sg.y, sg.z, sg.rx, 0, sg.rz, sg.s, sg.s, sg.s));
    const leafGeo = new THREE.BoxGeometry(.55, .05, 2.2); leafGeo.translate(0, 0, 1.1);
    const fronds = instanced(leafGeo, M.palmLeaf, leaves, (m, i, l) => place(m, i, l.x, l.y, l.z, .45, l.ry, 0, l.s, l.s, l.s));
    world.add(shadowy(trunks), shadowy(fronds));
    // palms step out of the camera's way too (anchored where each trunk or frond cluster stands)
    seeThrough(trunks, segs.map(sg => ({ x: sg.x, z: sg.z, r: 1.6 * sg.s }))); seeThrough(fronds, leaves.map(l => ({ x: l.x, z: l.z, r: 2.4 * l.s })));
  }
  // ---------- Colosseum: arena wall, stands, crowd, banners, timed gates ----------
  if (id === 'colosseum') {
    const R0 = ARENA.r + 2.5;
    const archTex = (() => {
      const c = document.createElement('canvas'); c.width = 128; c.height = 64; const x = c.getContext('2d');
      x.fillStyle = '#d8ccb4'; x.fillRect(0, 0, 128, 64); x.fillStyle = '#6a5a48';
      for (const cx0 of [32, 96]) { x.beginPath(); x.moveTo(cx0 - 14, 64); x.lineTo(cx0 - 14, 30); x.arc(cx0, 30, 14, Math.PI, 0); x.lineTo(cx0 + 14, 64); x.fill(); }
      x.fillStyle = '#b8aa92'; x.fillRect(0, 8, 128, 5);
      const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.repeat.set(40, 1); t.colorSpace = THREE.SRGBColorSpace; return t;
    })();
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(R0, R0, 7, 120, 1, true), lam(0xffffff, archTex, { side: THREE.BackSide })); wall.position.y = 3.5; wall.receiveShadow = true; world.add(wall);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(R0 + .6, R0 + .6, .8, 120, 1, true), lam(0xe8dcc4, null, { side: THREE.BackSide })); rim.position.y = 7.2; world.add(rim);
    const stands = new THREE.Mesh(new THREE.CylinderGeometry(R0 + 30, R0 + 1, 18, 120, 1, true), lam(0xc9bca2, stoneTex(), { side: THREE.BackSide })); stands.position.y = 7 + 9; world.add(stands);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(R0 + 31, R0 + 31, 6, 120, 1, true), lam(0xffffff, archTex, { side: THREE.BackSide })); top.position.y = 28; world.add(top);
    // team banners hanging from the rim
    const bans = []; for (let k = 0; k < 24; k++) bans.push({ a: k / 24 * Math.PI * 2, ti: k % 4 });
    const bmat = lam(0xffffff, null, { side: THREE.DoubleSide });
    world.add(instanced(new THREE.PlaneGeometry(2.2, 4), bmat, bans, (m, i, b) => { place(m, i, Math.cos(b.a) * (R0 - .15), 4.8, Math.sin(b.a) * (R0 - .15), 0, -b.a - Math.PI / 2, 0, 1, 1, 1); m.setColorAt(i, new THREE.Color(TEAMS[b.ti].hex)); }));
    // the crowd: small figures on the stands that bob and cheer
    const n = quality.level === 'high' ? 3200 : quality.level === 'medium' ? 1600 : 500, Rr = mulberry(42), people = [];
    for (let k = 0; k < n; k++) { const t = Rr(), rr = R0 + 2 + t * 27, a = Rr() * Math.PI * 2; people.push({ x: Math.cos(a) * rr, z: Math.sin(a) * rr, y: 7 + t * 18 + .5, a }); }
    const U = { time: { value: 0 } }; anim.crowdU = U;
    const pm = new THREE.MeshLambertMaterial({ color: 0xffffff });
    pm.onBeforeCompile = sh => { sh.uniforms.time = U.time; sh.vertexShader = 'uniform float time;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      #ifdef USE_INSTANCING
        float ph = instanceMatrix[3][0] * 1.7 + instanceMatrix[3][2] * 2.3;
        transformed.y += max(0., sin(time * 7. + ph)) * .35 * step(.35, fract(ph * .13));
      #endif`); };
    const tunic = [0xe8dcc0, 0xb8563a, 0x6a7fa0, 0xd9b36a, 0x7a9a5a, 0x9a6a9a, 0xc9c0b0].map(c => new THREE.Color(c));
    const crowd = instanced(new THREE.BoxGeometry(.55, 1, .4), pm, people, (m, i, p) => { place(m, i, p.x, p.y, p.z, 0, -p.a, 0, 1, 1, 1); m.setColorAt(i, tunic[i % tunic.length]); });
    crowd.frustumCulled = false; world.add(crowd);
    const heads = instanced(new THREE.SphereGeometry(.22, 6, 5), pm, people, (m, i, p) => { place(m, i, p.x, p.y + .7, p.z, 0, 0, 0, 1, 1, 1); m.setColorAt(i, new THREE.Color(0xe0b894)); });
    heads.frustumCulled = false; world.add(heads);
    // portcullis gates on the inner ring
    const barsTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); x.fillStyle = '#2e2e32'; for (let k = 0; k < 64; k += 12) { x.fillRect(k, 0, 4, 64); x.fillRect(0, k, 64, 3); } const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; })();
    const gm = new THREE.MeshLambertMaterial({ map: barsTex, transparent: true, alphaTest: .5, side: THREE.DoubleSide });
    barsTex.repeat.set(2, 1.5);
    for (const gt of L.gates) {
      const a = Math.atan2(gt.z, gt.x), mesh = new THREE.Mesh(new THREE.PlaneGeometry(gt.w + .4, 4.4), gm);
      mesh.position.set(gt.x, 2.2, gt.z); mesh.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a)); // bars run along the ring
      mesh.castShadow = true; world.add(mesh); anim.gates.push({ mesh, y: 2.2 });
    }
  }
}

export function updateFeatures(dt, t) {
  if (anim.crowdU) anim.crowdU.time.value = t;
  if (anim.gates.length) {
    const open = arenaGatesOpen(G.T);
    for (const g of anim.gates) { const want = open ? 6.3 : 2.2; g.y += (want - g.y) * Math.min(1, dt * 4); g.mesh.position.y = g.y; }
  }
}
