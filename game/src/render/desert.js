// Desert Fort's dressing: two oases, market stalls under striped awnings at the foot of the fort,
// pyramids on the horizon, a toppled colossus half-buried on the rim, the bones of something very
// large, and tumbleweeds bowling across the sand. Scenery only (the stalls and oasis palms are solid,
// and set out in the layout).
import * as THREE from 'three';
import { terrainMeshY, mulberry, OASES } from '../core/world.js';
import { stoneTex, woodTex, uvScale } from './look.js';

// ground colour hook: grass round the oases, gravel and pale salt in patches
const green = new THREE.Color(0x9aa55a), salt = new THREE.Color(0xf1e2c0), gravel = new THREE.Color(0xa88a62);
export function desertGround(c, x, z) {
  for (const o of OASES) { const d = Math.hypot(x - o.x, z - o.z); if (d < o.r + 6) c.lerp(green, Math.min(.75, (o.r + 6 - d) / 4)); }
  const r = Math.hypot(x, z); if (r < 28) return;
  const n = Math.sin(x * .09 - 1) * Math.cos(z * .08 + 2) + Math.sin((x - z) * .04) * .6;
  if (n > 1) c.lerp(salt, Math.min(.5, (n - 1) * 1.4)); else if (n < -1.1) c.lerp(gravel, Math.min(.45, (-1.1 - n) * 1.2));
}

const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const M = {
  sandstone: lam(0xd9b886, stoneTex()), sandDark: lam(0xbf9a68, stoneTex()), carved: lam(0xd6b47e, null, { flatShading: true }), carvedDark: lam(0xb8935f, null, { flatShading: true }), wood: lam(0x7a5a3a, woodTex()),
  bone: lam(0xefe6d2), reed: lam(0x6f8a3a), weed: lam(0x9a7a4a, null, { wireframe: true }),
  water: new THREE.MeshPhongMaterial({ color: 0x2f8f9a, specular: 0xcfeff0, shininess: 100, transparent: true, opacity: .88 }),
};
const shadowy = o => { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
let anim = null;

function stripes(a, b) {
  const c = document.createElement('canvas'); c.width = 64; c.height = 8; const x = c.getContext('2d');
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? a : b; x.fillRect(i * 8, 0, 8, 8); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function buildDesert(world, L) {
  const R = mulberry(1717);
  anim = { weeds: [], water: [] };

  // ---- oases ----
  for (const o of OASES) {
    const y = terrainMeshY(o.x, o.z);
    const w = new THREE.Mesh(new THREE.CircleGeometry(o.r, 40), M.water); w.rotation.x = -Math.PI / 2; w.position.set(o.x, y + .08, o.z); world.add(w); anim.water.push(w);
    const reeds = new THREE.InstancedMesh(new THREE.ConeGeometry(.06, 1.4, 4), M.reed, 60), mx = new THREE.Matrix4();
    for (let k = 0; k < 60; k++) { const a = R() * Math.PI * 2, d = o.r - .3 + R() * 1.2, x = o.x + Math.cos(a) * d, z = o.z + Math.sin(a) * d; mx.makeRotationZ((R() - .5) * .4); mx.setPosition(x, y + .6, z); reeds.setMatrixAt(k, mx); }
    world.add(reeds);
  }

  // ---- market stalls: posts, a counter of goods, a striped awning ----
  const awnings = ['#c8362e', '#2f6fb0', '#2f9a4a', '#d9a21c'];
  L.buildings.filter(b => b.kind === 'stall').forEach((b, i) => {
    const g = new THREE.Group(); g.position.set(b.x, terrainMeshY(b.x, b.z), b.z); g.rotation.y = b.rot;
    for (const [px, pz] of [[-1.5, -1], [1.5, -1], [-1.5, 1], [1.5, 1]]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, 2.6, 6), M.wood); p.position.set(px, 1.3, pz); g.add(p); }
    const aw = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.8), lam(0xffffff, stripes(awnings[i % 4], '#f4ecd8'), { side: THREE.DoubleSide }));
    aw.rotation.x = -Math.PI / 2 + .25; aw.position.y = 2.7; g.add(aw);
    const counter = new THREE.Mesh(uvScale(new THREE.BoxGeometry(3, .9, .9), 1, .3), M.wood); counter.position.set(0, .45, .6); g.add(counter);
    const goods = [0xd8762e, 0xc9a23a, 0x8a3a8a, 0x4a9a3a];
    for (let k = 0; k < 6; k++) { const pot = new THREE.Mesh(new THREE.SphereGeometry(.2 + R() * .12, 8, 6), lam(goods[(k + i) % 4])); pot.position.set(-1.1 + k * .44, 1.05, .6); pot.scale.y = .8; g.add(pot); }
    world.add(shadowy(g));
  });

  // ---- pyramids on the southern horizon ----
  for (const [x, z, s] of [[-40, -150, 44], [8, -168, 60], [52, -146, 30]]) {
    const p = new THREE.Mesh(uvScale(new THREE.ConeGeometry(s * .75, s * .72, 4), 6, 4), M.sandstone);
    p.position.set(x, s * .36 - 2, z); p.rotation.y = Math.PI / 4 + .1; world.add(p);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(s * .075, s * .072, 4), lam(0xe8c65a)); cap.position.set(x, s * .72 - s * .036 - 2 + .02, z); cap.rotation.y = p.rotation.y; world.add(cap);
  }

  // ---- a toppled colossus on the north rim: two legs on a plinth, the head face-down in the sand ----
  {
    const x = 0, z = 104, g = new THREE.Group(); g.position.set(x, terrainMeshY(x, z) - .5, z); g.rotation.y = Math.PI; g.scale.setScalar(1.4);
    const plinth = new THREE.Mesh(uvScale(new THREE.BoxGeometry(9, 2.2, 5), 3, .8), M.sandDark); plinth.position.y = 1.1; g.add(plinth);
    for (const s of [-1, 1]) {
      const shin = new THREE.Mesh(new THREE.CylinderGeometry(.75, 1.05, 4.2, 9), M.carved); shin.position.set(s * 2, 4.3, 0); g.add(shin);
      const knee = new THREE.Mesh(new THREE.SphereGeometry(.95, 9, 7), M.carved); knee.position.set(s * 2, 6.5, .15); g.add(knee);
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(1.1, .95, 2.4, 9), M.carved); thigh.position.set(s * 2.1, 7.9, 0); thigh.rotation.z = s * .08; g.add(thigh);
      const brk = new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.12, .5, 9), M.carvedDark); brk.position.set(s * 2.15, 9.2, 0); brk.rotation.set(.25, 0, s * .3); g.add(brk);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(1.7, .9, 3), M.carved); foot.position.set(s * 2, 2.65, .5); g.add(foot);
    }
    // the head, fallen face-up and half sunk in the sand, still wearing its crown
    const head = new THREE.Group(); head.position.set(9, -.2, 5); head.rotation.set(-1.05, .5, .15); g.add(head);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 9), M.carved); skull.scale.set(1, 1.2, .95); head.add(skull);
    const face = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, .6), M.carved); face.position.set(0, -.2, 1.9); head.add(face);
    const nose = new THREE.Mesh(new THREE.BoxGeometry(.55, 1.1, .7), M.carved); nose.position.set(0, -.2, 2.4); head.add(nose);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(2.3, .35, .5), M.carvedDark); brow.position.set(0, .55, 2.25); head.add(brow);
    for (const s of [-1, 1]) { const eye = new THREE.Mesh(new THREE.BoxGeometry(.6, .22, .2), lam(0x6e5638)); eye.position.set(s * .6, .25, 2.22); head.add(eye); }
    const lips = new THREE.Mesh(new THREE.BoxGeometry(1, .22, .3), M.carvedDark); lips.position.set(0, -1.05, 2.25); head.add(lips);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 2.1, 1.6, 10), M.carvedDark); crown.position.y = 2.7; head.add(crown);
    world.add(shadowy(g));
  }

  // ---- the ribs of some great beast, bleaching on the western dunes ----
  {
    const g = new THREE.Group(), x = -82, z = 34; g.position.set(x, terrainMeshY(x, z) - .3, z); g.rotation.y = .7;
    const spine = new THREE.Mesh(new THREE.CylinderGeometry(.22, .18, 11, 8).rotateX(Math.PI / 2), M.bone); spine.position.y = 3.6; g.add(spine);
    for (let k = 0; k < 7; k++) {
      const rib = new THREE.Mesh(new THREE.TorusGeometry(3.2 - Math.abs(k - 3) * .25, .13, 6, 18, Math.PI * .85), M.bone);
      rib.position.set(0, .35, -4.5 + k * 1.5); rib.rotation.set(0, 0, Math.PI * .075); g.add(rib);
    }
    const skull = new THREE.Mesh(new THREE.SphereGeometry(1.1, 10, 8), M.bone); skull.scale.set(1, .75, 1.5); skull.position.set(.4, .8, 7.2); skull.rotation.z = .4; g.add(skull);
    world.add(shadowy(g));
  }

  // ---- tumbleweeds, bowling along on the wind ----
  for (let k = 0; k < 5; k++) {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(.55 + R() * .3, 1), M.weed); world.add(m);
    const side = R() < .5 ? -1 : 1; // (they roll either side of the fort, never through it)
    anim.weeds.push({ m, x: (R() - .5) * 150, z: side * (34 + R() * 45), side, sp: 2.5 + R() * 2, ph: R() * 6, r: .55 });
  }
}

export function updateDesert(dt, t) {
  if (!anim) return;
  for (const w of anim.weeds) {
    w.x += w.sp * dt; w.z += Math.sin(t * .6 + w.ph) * .8 * dt;
    if (w.x > 90) { w.x = -90; w.z = w.side * (34 + Math.random() * 45); }
    if (Math.abs(w.z) < 32) w.z = w.side * 32;
    const hop = Math.abs(Math.sin(t * 3 + w.ph)) * .5;
    w.m.position.set(w.x, terrainMeshY(w.x, w.z) + w.r + hop, w.z);
    w.m.rotation.z -= w.sp * dt / w.r; w.m.rotation.x += dt * .4;
  }
  for (const w of anim.water) w.material.color.setHSL(.51, .52, .38 + Math.sin(t * .8) * .02);
}
export function clearDesert() { anim = null; }
