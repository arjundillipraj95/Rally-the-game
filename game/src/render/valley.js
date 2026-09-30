// Grass Valley's dressing: wheat fields, wildflowers, a windmill and an old watchtower on the rim,
// a farmstead with hay bales, dry-stone walls framing the battlefield, and birds wheeling overhead.
// All of it is scenery only: nothing here blocks soldiers or arrows.
import * as THREE from 'three';
import { terrainMeshY, mulberry, W, FIELDS, fieldAt } from '../core/world.js';
import { quality } from './quality.js';
import { stoneTex, woodTex, uvScale } from './look.js';

export { FIELDS, fieldAt };
// ground colour hook: golden stubble in the fields, with furrows
const wheat = new THREE.Color(0xcfae5a), wheatDark = new THREE.Color(0xa88a3e);
export function valleyGround(c, x, z) {
  const hit = fieldAt(x, z); if (!hit) return;
  const edge = Math.min(hit.f.hw - Math.abs(hit.t), hit.f.hd - Math.abs(hit.n));
  c.lerp(Math.sin(hit.n * 2.4) > 0 ? wheat : wheatDark, Math.min(1, edge / 1.2) * .85);
}

const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const M = {
  stone: lam(0xcfc6b4, stoneTex()), stoneDark: lam(0xa89f8e, stoneTex()), wood: lam(0x7a5a3a, woodTex()), woodDark: lam(0x5a4028, woodTex()),
  sail: lam(0xf1e8d4, null, { side: THREE.DoubleSide }), thatch: lam(0xb8955a), roof: lam(0x9a4a32), plaster: lam(0xece2c8),
  hay: lam(0xd9b85e), ivy: lam(0x4f7a34), bird: new THREE.MeshBasicMaterial({ color: 0x2a2622, side: THREE.DoubleSide }),
};
const shadowy = o => { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
let anim = null;

export function buildValley(world, L) {
  const R = mulberry(4242);
  anim = { sails: null, birds: [] };
  const face = (x, z) => Math.atan2(-x, -z); // turned to look at the middle of the field

  // ---- the windmill on the south rim ----
  {
    const x = Math.sin(-.2) * W.R * 1.08, z = -Math.cos(-.2) * W.R * 1.08, g = new THREE.Group(), y = terrainMeshY(x, z) - .3;
    g.position.set(x, y, z); g.rotation.y = face(x, z); g.scale.setScalar(1.35);
    const tower = new THREE.Mesh(uvScale(new THREE.CylinderGeometry(2.1, 2.8, 9, 14), 4, 3), M.stone); tower.position.y = 4.5; g.add(tower);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(2.7, 3, 14), M.thatch); cap.position.y = 10.4; g.add(cap);
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.9, .3), M.woodDark); door.position.set(0, .95, 2.65); g.add(door);
    for (const [yy, ry] of [[5.2, 0], [7.2, 1.2]]) { const w = new THREE.Mesh(new THREE.BoxGeometry(.6, .8, .3), M.woodDark); w.position.set(Math.sin(ry) * 2.35, yy, Math.cos(ry) * 2.35); w.rotation.y = ry; g.add(w); }
    const hub = new THREE.Group(); hub.position.set(0, 8.6, 2.6); g.add(hub);
    hub.add(new THREE.Mesh(new THREE.CylinderGeometry(.35, .35, .8, 10).rotateX(Math.PI / 2), M.woodDark));
    for (let k = 0; k < 4; k++) {
      const arm = new THREE.Group(); arm.rotation.z = k * Math.PI / 2; hub.add(arm);
      const spar = new THREE.Mesh(new THREE.BoxGeometry(.22, 7.2, .18), M.wood); spar.position.y = 3.6; arm.add(spar);
      const sail = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 5.6), M.sail); sail.position.set(.85, 4.1, .1); arm.add(sail);
      for (let r = 0; r < 5; r++) { const rung = new THREE.Mesh(new THREE.BoxGeometry(1.6, .07, .07), M.wood); rung.position.set(.85, 1.6 + r * 1.2, .14); arm.add(rung); }
    }
    anim.sails = hub;
    world.add(shadowy(g));
  }

  // ---- an old watchtower, half fallen, on the north rim ----
  {
    const x = Math.sin(.2) * W.R * 1.08, z = Math.cos(.2) * W.R * 1.08, g = new THREE.Group(), y = terrainMeshY(x, z) - .4;
    g.position.set(x, y, z); g.rotation.y = face(x, z); g.scale.setScalar(1.3);
    const body = new THREE.Mesh(uvScale(new THREE.CylinderGeometry(3, 3.4, 8, 12, 1, true), 5, 3), M.stoneDark); body.position.y = 4; g.add(body);
    const inner = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 7.8, 12, 1, true), lam(0x6d665a, null, { side: THREE.BackSide })); inner.position.y = 4; g.add(inner);
    for (let k = 0; k < 12; k++) { // broken, uneven top
      const a = k / 12 * Math.PI * 2, h = 1 + R() * 3.2 * (k > 3 && k < 9 ? 1 : .3), b = new THREE.Mesh(uvScale(new THREE.BoxGeometry(1.5, h, .8), .5, h / 3), M.stoneDark);
      b.position.set(Math.sin(a) * 3.05, 8 + h / 2, Math.cos(a) * 3.05); b.rotation.y = a; g.add(b);
    }
    const arch = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.4, .5), lam(0x2a2420)); arch.position.set(0, 1.2, 3.25); g.add(arch);
    for (let k = 0; k < 7; k++) { const s = .5 + R() * .9, rb = new THREE.Mesh(new THREE.DodecahedronGeometry(s), M.stoneDark); rb.position.set((R() - .5) * 9, s * .4, 2 + R() * 4); rb.rotation.set(R() * 3, R() * 3, 0); g.add(rb); }
    for (let k = 0; k < 9; k++) { const iv = new THREE.Mesh(new THREE.IcosahedronGeometry(.6 + R() * .5, 0), M.ivy); const a = R() * Math.PI * 2; iv.position.set(Math.sin(a) * 3.2, 1 + R() * 6, Math.cos(a) * 3.2); iv.scale.set(1, 1.6, .5); iv.rotation.y = a; g.add(iv); }
    const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, 3.5, 6), M.woodDark); flagPole.position.set(1.5, 11.5, 1.5); g.add(flagPole);
    world.add(shadowy(g));
  }

  // ---- a farmstead near the windmill: house, barn, hay bales, a cart ----
  const building = (x, z, w, d, h, wallM, roofM, ry) => {
    const g = new THREE.Group(); g.position.set(x, terrainMeshY(x, z) - .2, z); g.rotation.y = ry;
    const walls = new THREE.Mesh(uvScale(new THREE.BoxGeometry(w, h, d), w / 3, h / 3), wallM); walls.position.y = h / 2; g.add(walls);
    const sh = new THREE.Shape(); sh.moveTo(-d / 2 - .4, 0); sh.lineTo(d / 2 + .4, 0); sh.lineTo(0, d * .55); sh.closePath();
    const rg = new THREE.ExtrudeGeometry(sh, { depth: w + .6, bevelEnabled: false }); rg.translate(0, 0, -(w + .6) / 2); rg.rotateY(Math.PI / 2);
    const roof = new THREE.Mesh(rg, roofM); roof.position.y = h; g.add(roof);
    const door = new THREE.Mesh(new THREE.BoxGeometry(1, 1.7, .1), M.woodDark); door.position.set(0, .85, d / 2 + .05); g.add(door);
    world.add(shadowy(g));
  };
  const S = W.R / 91;
  building(-40 * S, -97 * S, 7, 5, 3.4, M.plaster, M.roof, .35);
  building(-26 * S, -100 * S, 9, 6, 4.2, M.wood, M.thatch, .12);
  building(97 * S, 22 * S, 6, 4.5, 3.2, M.plaster, M.roof, Math.PI / 2 + .3);
  building(-97 * S, -22 * S, 6, 4.5, 3.2, M.plaster, M.thatch, -Math.PI / 2 + .2);
  // hay bales around the fields (round ones lying on their sides)
  const baleGeo = new THREE.CylinderGeometry(.8, .8, 1.2, 12).rotateZ(Math.PI / 2), bales = [];
  for (const f of FIELDS) for (let k = 0; k < 5; k++) {
    const t = (R() - .5) * f.hw * 2.2, n = (R() < .5 ? -1 : 1) * (f.hd + 1.5 + R() * 2);
    bales.push([f.x - Math.sin(f.a) * t + Math.cos(f.a) * n, f.z + Math.cos(f.a) * t + Math.sin(f.a) * n, R() * 3]);
  }
  const bi = new THREE.InstancedMesh(baleGeo, M.hay, bales.length), mx = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
  bales.forEach(([x, z, r], i) => { e.set(0, r, 0); q.setFromEuler(e); mx.compose(v.set(x, terrainMeshY(x, z) + .72, z), q, s); bi.setMatrixAt(i, mx); });
  world.add(shadowy(bi));

  // ---- dry-stone walls along the rim, framing the field (gaps where the castles sit) ----
  const wallGeo = uvScale(new THREE.BoxGeometry(5.6, 1.1, .9), 2, .4), cap = new THREE.BoxGeometry(5.8, .25, 1.05), walls = [];
  for (let a = 0; a < Math.PI * 2; a += 6.2 / (W.R + 3)) {
    const nearCastle = [1, 3, 5, 7].some(k => Math.abs(((a - k * Math.PI / 4 + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < .2);
    const nearLandmark = [0, 2, 4, 6].some(k => Math.abs(((a - k * Math.PI / 4 + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < .13);
    if (nearCastle || nearLandmark || R() < .12) continue;
    walls.push([Math.cos(a) * (W.R + 3), Math.sin(a) * (W.R + 3), -a + Math.PI / 2]);
  }
  const wi = new THREE.InstancedMesh(wallGeo, M.stoneDark, walls.length), ci = new THREE.InstancedMesh(cap, M.stone, walls.length);
  walls.forEach(([x, z, r], i) => {
    const y = terrainMeshY(x, z); e.set(0, r, (R() - .5) * .06); q.setFromEuler(e);
    mx.compose(v.set(x, y + .45, z), q, s); wi.setMatrixAt(i, mx);
    mx.compose(v.set(x, y + 1.05, z), q, s); ci.setMatrixAt(i, mx);
  });
  world.add(shadowy(wi), shadowy(ci));

  // ---- wildflowers in drifts across the meadow ----
  const nFl = Math.round(quality.cfg.grass * .5);
  if (nFl) {
    const cols = [0xfff4b0, 0xffd21f, 0xffd21f, 0xe0402c, 0xffffff, 0xf07ab0].map(c => new THREE.Color(c));
    // each bloom a little five-petalled disc, tipped at a random angle so the field sparkles from any view
    const petal = new THREE.CircleGeometry(.13, 5); petal.rotateX(-Math.PI / 2);
    const fl = new THREE.InstancedMesh(petal, lam(0xffffff, null, { side: THREE.DoubleSide }), nFl);
    let k = 0;
    for (let p = 0; p < 600 && k < nFl; p++) {
      const cx = (R() - .5) * W.R * 2, cz = (R() - .5) * W.R * 2; if (Math.hypot(cx, cz) > W.R - 3 || fieldAt(cx, cz)) continue;
      const col = cols[(R() * cols.length) | 0], n = 6 + (R() * 12 | 0);
      for (let j = 0; j < n && k < nFl; j++) {
        const x = cx + (R() - .5) * 5, z = cz + (R() - .5) * 5, sc = .8 + R() * .6;
        e.set((R() - .5) * 1.4, R() * 6.28, (R() - .5) * 1.4); q.setFromEuler(e);
        mx.compose(v.set(x, terrainMeshY(x, z) + .3 + R() * .2, z), q, s.set(sc, sc, sc)); fl.setMatrixAt(k, mx); fl.setColorAt(k, col); k++;
      }
    }
    fl.count = k; fl.frustumCulled = false; world.add(fl);
  }

  // ---- standing stones in the middle, leaning a little with age ----
  for (const st of (L && L.stones2) || []) {
    const g = new THREE.Mesh(uvScale(new THREE.BoxGeometry(1.5, st.h, .8), .6, st.h / 2.5), M.stoneDark);
    g.position.set(st.x, terrainMeshY(st.x, st.z) + st.h / 2 - .2, st.z); g.rotation.set((R() - .5) * .12, -st.a, (R() - .5) * .15); world.add(shadowy(g));
  }

  // ---- birds wheeling high over the valley ----
  const wing = new THREE.BufferGeometry();
  wing.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, .25, 0, 0, -.2, -1.1, .25, 0, 0, 0, .25, 0, 0, -.2, 1.1, .25, 0], 3));
  for (let k = 0; k < 7; k++) {
    const b = new THREE.Mesh(wing, M.bird); b.scale.setScalar(1.3);
    anim.birds.push({ m: b, r: 22 + R() * 30, h: 26 + R() * 12, sp: .12 + R() * .08, ph: R() * 6.28, cx: (R() - .5) * 40, cz: (R() - .5) * 40, fl: R() * 6 });
    world.add(b);
  }
}

export function updateValley(dt, t) {
  if (!anim) return;
  if (anim.sails) anim.sails.rotation.z -= dt * .6;
  for (const b of anim.birds) {
    const a = b.ph + t * b.sp, x = b.cx + Math.cos(a) * b.r, z = b.cz + Math.sin(a) * b.r;
    b.m.position.set(x, b.h + Math.sin(t * .7 + b.ph) * 1.5, z);
    b.m.rotation.set(0, -a, 0); // flying along the circle
    b.m.scale.y = 1.3 * Math.sin(t * 7 + b.fl); // flap
  }
}
export function clearValley() { anim = null; }
