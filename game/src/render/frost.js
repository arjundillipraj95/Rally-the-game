// Frost Hill's dressing: falling snow, two frozen ponds with snowmen standing guard, log cabins with
// smoking chimneys on the rim, and bare rock showing through the snow. Scenery only.
import * as THREE from 'three';
import { terrainMeshY, mulberry, W, ROUTES, PONDS, onPond } from '../core/world.js';
import { camera } from './scene.js';
import { quality } from './quality.js';
import { woodTex, stoneTex, uvScale } from './look.js';

export { PONDS, onPond };
// ground colour hook: blue shade on the hill's far side from the sun, bare rock and earth in patches
const shade = new THREE.Color(0xaebfd6), rock = new THREE.Color(0x8b8a86), earth = new THREE.Color(0x9a8c7a), ice = new THREE.Color(0xd8ecf6);
export function frostGround(c, x, z) {
  const r = Math.hypot(x, z);
  if (r < 45) { const facing = (x * .5 + z * .45) / (r + 1); if (facing < -.1) c.lerp(shade, Math.min(.5, (-facing - .1) * Math.min(1, r / 12) * .9)); }
  const n = Math.sin(x * .13 + 1) * Math.cos(z * .11 - 2) + Math.sin(x * .05 - z * .07) * .7;
  if (n > 1.05) c.lerp(Math.sin(x * .3) > 0 ? rock : earth, Math.min(.55, (n - 1.05) * 1.6));
  for (const p of PONDS) { const d = Math.hypot(x - p.x, z - p.z); if (d < p.r + 2) c.lerp(ice, Math.min(.8, (p.r + 2 - d) / 2)); }
}

const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const M = {
  snow: lam(0xf6f9fc), coal: lam(0x222326), carrot: lam(0xe8752a), stick: lam(0x5a3e28), scarf: lam(0xc8362e), hat: lam(0x2a2a30),
  log: lam(0x6e4e34, woodTex()), roof: lam(0xf2f6fa), stone: lam(0x8c8a86, stoneTex()), window: lam(0xffd98a, null, { emissive: 0x6a4a10 }),
};
const shadowy = o => { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
let anim = null;

// a canvas of hairline cracks for the ice
function iceTex() {
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), R = mulberry(77);
  const g = x.createRadialGradient(128, 128, 20, 128, 128, 128); g.addColorStop(0, '#bfe0f0'); g.addColorStop(1, '#e6f3f8');
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  x.strokeStyle = 'rgba(255,255,255,.75)'; x.lineWidth = 1.2;
  for (let k = 0; k < 14; k++) { let px = 128 + (R() - .5) * 60, py = 128 + (R() - .5) * 60; x.beginPath(); x.moveTo(px, py); for (let s = 0; s < 6; s++) { px += (R() - .5) * 70; py += (R() - .5) * 70; x.lineTo(px, py); } x.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function buildFrost(world) {
  const R = mulberry(911);
  anim = { snow: null, smoke: [], chimneys: [] };

  // ---- frozen ponds ----
  const iceMat = new THREE.MeshPhongMaterial({ map: iceTex(), shininess: 90, specular: 0xffffff, transparent: true, opacity: .95 });
  for (const p of PONDS) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(p.r, 40), iceMat); m.rotation.x = -Math.PI / 2;
    m.position.set(p.x, terrainMeshY(p.x, p.z) + .06, p.z); m.receiveShadow = true; world.add(m);
    // snow banked round the edge
    const bank = new THREE.Mesh(new THREE.TorusGeometry(p.r + .2, .45, 6, 40), M.snow); bank.rotation.x = -Math.PI / 2; bank.scale.z = .5;
    bank.position.set(p.x, terrainMeshY(p.x, p.z) + .05, p.z); world.add(bank);
  }

  // ---- snowmen by the ponds (they've seen things) ----
  const snowman = (x, z, ry, tilt) => {
    const g = new THREE.Group(); g.position.set(x, terrainMeshY(x, z), z); g.rotation.set(0, ry, tilt);
    const ball = (r, y) => { const b = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), M.snow); b.position.y = y; g.add(b); return b; };
    ball(.75, .65); ball(.55, 1.72); ball(.38, 2.5);
    for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(.05, 6, 4), M.coal); e.position.set(s * .13, 2.6, .34); g.add(e); }
    const nose = new THREE.Mesh(new THREE.ConeGeometry(.07, .4, 8).rotateX(Math.PI / 2), M.carrot); nose.position.set(0, 2.5, .5); g.add(nose);
    for (let k = 0; k < 3; k++) { const b = new THREE.Mesh(new THREE.SphereGeometry(.05, 6, 4), M.coal); b.position.set(0, 1.55 + k * .2, .53 - Math.abs(k - 1) * .03); g.add(b); }
    for (const s of [-1, 1]) { const arm = new THREE.Mesh(new THREE.CylinderGeometry(.03, .04, 1.1, 5), M.stick); arm.position.set(s * .85, 1.95, 0); arm.rotation.z = s * -1.0; g.add(arm); }
    const scarf = new THREE.Mesh(new THREE.TorusGeometry(.4, .08, 6, 16).rotateX(Math.PI / 2), M.scarf); scarf.position.y = 2.18; g.add(scarf);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(.42, .42, .05, 14), M.hat); brim.position.y = 2.82; g.add(brim);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(.27, .29, .45, 14), M.hat); crown.position.y = 3.05; g.add(crown);
    world.add(shadowy(g));
  };
  const pz = ROUTES.pass;
  snowman(10.5, pz + 1, Math.PI + .3, 0); snowman(-11, pz - 3, Math.PI - .4, .12);
  snowman(-10, -pz - 1, .2, 0); snowman(11.5, -pz + 3, -.3, -.1);

  // ---- log cabins on the east and west rim, chimneys smoking ----
  const cabin = (x, z, ry) => {
    const g = new THREE.Group(); g.position.set(x, terrainMeshY(x, z) - .2, z); g.rotation.y = ry;
    const w = 7, d = 5, h = 3;
    for (let k = 0; k < 6; k++) for (const [lx, lz, len, rot] of [[0, d / 2, w, 0], [0, -d / 2, w, 0], [w / 2, 0, d, Math.PI / 2], [-w / 2, 0, d, Math.PI / 2]]) {
      const log = new THREE.Mesh(uvScale(new THREE.CylinderGeometry(.27, .27, len + .5, 7).rotateZ(Math.PI / 2), 1, len / 2), M.log);
      log.rotation.y = rot; log.position.set(lx, .27 + k * .5, lz); g.add(log);
    }
    const sh = new THREE.Shape(); sh.moveTo(-d / 2 - .6, 0); sh.lineTo(d / 2 + .6, 0); sh.lineTo(0, 2.1); sh.closePath();
    const rg = new THREE.ExtrudeGeometry(sh, { depth: w + 1, bevelEnabled: false }); rg.translate(0, 0, -(w + 1) / 2); rg.rotateY(Math.PI / 2);
    const roof = new THREE.Mesh(rg, M.roof); roof.position.y = h; g.add(roof);
    const door = new THREE.Mesh(new THREE.BoxGeometry(1, 1.8, .12), lam(0x3e2a1a)); door.position.set(-1.2, .9, d / 2 + .3); g.add(door);
    const win = new THREE.Mesh(new THREE.BoxGeometry(.9, .7, .1), M.window); win.position.set(1.4, 1.6, d / 2 + .3); g.add(win);
    const chim = new THREE.Mesh(uvScale(new THREE.BoxGeometry(.9, 3, .9), .5, 1), M.stone); chim.position.set(2.2, h + 1.2, -.8); g.add(chim);
    world.add(shadowy(g));
    g.updateMatrixWorld(true); anim.chimneys.push(new THREE.Vector3(2.2, h + 2.8, -.8).applyMatrix4(g.matrixWorld));
  };
  const cr = W.R + 5; cabin(-Math.cos(.24) * cr, Math.sin(.24) * cr, Math.PI / 2 + .1); cabin(Math.cos(.24) * cr, -Math.sin(.24) * cr, -Math.PI / 2 + .15);
  const puffMat = new THREE.MeshLambertMaterial({ color: 0xcfd4da, transparent: true, opacity: .55, depthWrite: false });
  for (let k = 0; k < 16; k++) { const p = new THREE.Mesh(new THREE.IcosahedronGeometry(.6, 1), puffMat.clone()); p.userData = { c: k % 2, t: k / 8 * 4 }; world.add(p); anim.smoke.push(p); }

  // ---- falling snow: a box of flakes that travels with the camera ----
  const n = Math.round(700 + quality.cfg.grass * .15);
  const pos = new Float32Array(n * 3), seed = new Float32Array(n);
  for (let i = 0; i < n; i++) { pos[i * 3] = (R() - .5) * 60; pos[i * 3 + 1] = R() * 30; pos[i * 3 + 2] = (R() - .5) * 60; seed[i] = R(); }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
  const snowU = { time: { value: 0 }, cam: { value: new THREE.Vector3() } };
  const mat = new THREE.ShaderMaterial({
    uniforms: snowU, transparent: true, depthWrite: false,
    vertexShader: `uniform float time; uniform vec3 cam; attribute float seed; varying float vA;
      void main() {
        vec3 p = position; p.y = mod(p.y - time * (1.1 + seed * .9), 30.);
        p.x += sin(time * .7 + seed * 20.) * 1.2; p.z += cos(time * .5 + seed * 13.) * 1.2;
        vec3 w = vec3(cam.x + mod(p.x - cam.x + 30., 60.) - 30., cam.y - 8. + p.y, cam.z + mod(p.z - cam.z + 30., 60.) - 30.);
        vec4 mv = modelViewMatrix * vec4(w, 1.); gl_Position = projectionMatrix * mv;
        gl_PointSize = min(5., (1.2 + seed * 1.6) * (30. / -mv.z)); vA = clamp((-mv.z - 3.) / 8., 0., 1.) * .85;
      }`,
    fragmentShader: `varying float vA; void main() { vec2 d = gl_PointCoord - .5; if (dot(d, d) > .25) discard; gl_FragColor = vec4(1., 1., 1., vA); }`,
  });
  const pts = new THREE.Points(geo, mat); pts.frustumCulled = false; world.add(pts);
  anim.snow = snowU;
}

export function updateFrost(dt, t) {
  if (!anim) return;
  anim.snow.time.value = t; anim.snow.cam.value.copy(camera.position);
  for (const p of anim.smoke) {
    const d = p.userData, c = anim.chimneys[d.c]; if (!c) continue;
    d.t = (d.t + dt) % 4; const k = d.t / 4;
    p.position.set(c.x + k * 2.5 + Math.sin(d.t * 2) * .3, c.y + k * 6, c.z + k * 1.2);
    p.scale.setScalar(.5 + k * 1.8); p.material.opacity = .55 * (1 - k);
  }
}
export function clearFrost() { anim = null; }
