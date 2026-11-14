// The new Crown's mountain: what the shared world builder doesn't already draw. The homes (cottages,
// a banner, the safe ring), the bridges over the chasm, the glacier on the summit with the Crown frozen
// in it, the war chest, a neutral castle's guards and the bandits round their campfires.
import * as THREE from 'three';
import { keepLive, batchOn, abOn, abOld, abShow, mergeInto } from './batch.js';
import { TEAMS, CROWN2, NEUTRAL } from '../config.js';
import { G, ARMIES } from '../core/state.js';
import { groundY, terrainMeshY, mountHomeA, mulberry, W } from '../core/world.js';
import { stoneTex, woodTex } from './look.js';
import { nightLook, dayLook, dayGold, scene, camera, sun, hemi, renderer, lookK, skySunDir } from './scene.js';
import { camTarget } from './camera.js';
import { spark } from './effects.js';
import { waterMaterial } from './water.js';
import { c2Garrison, c2Lake } from '../core/sim.js';

let M = null;
const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const shadowy = o => { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };

// the ground's colour by tier, for the world builder's per-vertex pass
const jungleC = new THREE.Color(0x4f7a32), topC = new THREE.Color(0x9cbf62), rockC = new THREE.Color(0x5c5650), paveC = new THREE.Color(0xc9bfa8), townC = new THREE.Color(0xa8916a), cliffC = new THREE.Color(0x857d72);
export function mountGround(c, x, z) {
  const R = W.R, K = CROWN2.r, r = Math.hypot(x, z);
  if (r > R - .8 && r <= R + 1) return c.lerp(cliffC, .55); // (the lip: a ragged line of rock where the grass ends)
  if (r > R + 1) { const b = Math.sin(r * .55 + Math.sin(Math.atan2(z, x) * 9) * 2.2); return c.lerp(b > .3 ? cliffC : rockC, Math.min(.95, (r - R - 1) / 3)); } // (F10b: past the rim, banded cliff rock)
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


// F10b The summit feeling: past the rim the ground breaks into cliffs (core/world.js terrainMeshY) that fall into a
// sea of clouds below rim level, out to the horizon; a few broad snowy massifs rise out of it, far off and mostly
// below you; birds circle under the rim and snow blows past when you stand near the edge. Four draw calls in all
// (clouds, massifs, birds, snow), the same on every phone. Clouds and massifs take the haze, dusk and night colours.
const CLOUD_Y = -58;
// a massif: rings of jittered points up a broad, shouldered profile (wider than tall), coloured by height
// (dark rock, bluish rock, a big snow cap). All of them go in one geometry.
const MS_Y = [0, .28, .52, .72, .86, .95], MS_R = [1, .8, .58, .38, .2, .08];
function massifGeo(list) {
  const pos = [], col = [], R = mulberry(0x4f10b), c = new THREE.Color(), foot = new THREE.Color(0x4c5866), rock = new THREE.Color(0x7c8a9a), cap = new THREE.Color(0xffffff);
  const tri = (a, b, d) => { for (const v of [a, b, d]) { pos.push(v[0], v[1], v[2]); const f = (v[1] - v[3]) / v[4]; c.copy(foot).lerp(rock, Math.min(1, f * 1.6)); if (f > v[5]) c.lerp(cap, Math.min(1, (f - v[5]) * 7)); col.push(c.r, c.g, c.b); } };
  for (const p of list) {
    const n = p.sides, rings = [];
    for (let k = 0; k < MS_Y.length; k++) { const ring = []; for (let i = 0; i < n; i++) { const a = (i + (R() - .5) * .6) / n * Math.PI * 2, rr = p.rad * MS_R[k] * (.72 + R() * .5); ring.push([p.x + Math.cos(a) * rr * p.sx, p.y0 + p.h * MS_Y[k] * (.9 + R() * .2), p.z + Math.sin(a) * rr, p.y0, p.h, p.snow - R() * .12]); } rings.push(ring); }
    const tip = [p.x + (R() - .5) * p.rad * .15, p.y0 + p.h, p.z, p.y0, p.h, p.snow];
    for (let k = 0; k < rings.length - 1; k++) for (let i = 0; i < n; i++) { const j = (i + 1) % n, a = rings[k][i], b = rings[k][j], d = rings[k + 1][j], e = rings[k + 1][i]; tri(a, d, b); tri(a, e, d); }
    for (let i = 0; i < n; i++) tri(rings[rings.length - 1][i], tip, rings[rings.length - 1][(i + 1) % n]);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); g.computeVertexNormals();
  return g;
}
// far things fog more gently than the battlefield, so the range reads through the haze (a scale on the fog distance)
const softFog = (m, k) => { m.onBeforeCompile = s => { s.fragmentShader = s.fragmentShader.replace('#include <fog_fragment>', `#ifdef USE_FOG\n float fogFactor = smoothstep( fogNear, fogFar, vFogDepth * ${k.toFixed(2)} );\n gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif`); }; return m; };
const cloudU = { lit: { value: new THREE.Color() }, shade: { value: new THREE.Color() }, sunCol: { value: new THREE.Color() }, haze: { value: new THREE.Color() }, sunXZ: { value: new THREE.Vector2(1, 0) }, t: { value: 0 }, near: { value: 150 }, far: { value: 415 } };
const CL = { day: [0xffffff, 0x6d86a8], dusk: [0xffd2a8, 0x8a6d84], night: [0x7f90bc, 0x1e2a4c] }; // (lit tops, shaded hollows)
function buildRim(grp) {
  const R = W.R, rnd = mulberry(0xf10b), list = [];
  // massifs: broad, far, mostly below you; each a main summit with a lower shoulder beside it
  const nm = 7;
  for (let i = 0; i < nm; i++) {
    let a = (i + .2 + rnd() * .6) / nm * Math.PI * 2; const d = R + 220 + rnd() * 60, big = i % 3 === 0, h = big ? 94 + rnd() * 8 : 72 + rnd() * 10; // (tops from about 25 below the rim to a little above it)
    const sa = Math.atan2(.38, .52), off = Math.atan2(Math.sin(a - sa), Math.cos(a - sa)); if (Math.abs(off) < .4) a = sa + Math.sign(off || 1) * .4; // (the low sun's own gap in the range)
    list.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, y0: -98, h, rad: h * (.8 + rnd() * .25), sx: 1.15 + rnd() * .25, sides: 13, snow: .52 });
    const b = a + (rnd() < .5 ? -1 : 1) * (.16 + rnd() * .06), e = d + (rnd() - .5) * 50, h2 = h * (.66 + rnd() * .1);
    list.push({ x: Math.cos(b) * e, z: Math.sin(b) * e, y0: -98, h: h2, rad: h2 * .9, sx: 1.2, sides: 10, snow: .6 });
  }
  const ms = new THREE.Mesh(massifGeo(list), softFog(lam(0xffffff, null, { vertexColors: true, flatShading: true }), .55));
  ms.frustumCulled = false; grp.add(ms);
  // the cloud sea: one disc under the rim that follows the camera, its noise fixed in the world and drifting slowly
  const cl = new THREE.Mesh(new THREE.CircleGeometry(620, 48).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({
    uniforms: cloudU, transparent: true, depthWrite: false, fog: false,
    vertexShader: `varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `
      uniform vec3 lit, shade, sunCol, haze; uniform vec2 sunXZ; uniform float t, near, far; varying vec3 vW;
      float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
      float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<4;i++){ s+=a*vn(p); p=p*2.07+vec2(1.7,9.2); a*=.5; } return s; }
      void main(){
        vec2 p = vW.xz * .011 + vec2(t * .008, t * .003);
        float n = fbm(p + vec2(fbm(p * .35 + 3.1), 0.) * .8), m = fbm(p + sunXZ * .09 + vec2(fbm(p * .35 + 3.1), 0.) * .8);
        float puff = smoothstep(.34, .62, n), litK = clamp(.5 + (n - m) * 8., 0., 1.);
        vec3 v = vW - cameraPosition; float dist = length(v);
        float toward = max(dot(normalize(v.xz), sunXZ), 0.);
        vec3 col = mix(shade, lit, clamp((n - .3) * 2.6, 0., 1.) * (.22 + .78 * litK));
        col += sunCol * (.06 + .4 * pow(toward, 5.)) * puff * litK;
        float f = smoothstep(near, far, dist);
        col = mix(col, haze, f * f * (3. - 2. * f));
        gl_FragColor = vec4(col, mix(.6 + .4 * puff, 1., f));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  }));
  cl.position.y = CLOUD_Y; cl.frustumCulled = false; cl.renderOrder = 2; grp.add(cl);
  // birds: a few dark wings circling below the rim, out ahead of where you stand (one instanced mesh)
  const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, .35, -1.1, .25, -.2, 0, 0, -.25, 0, 0, .35, 0, 0, -.25, 1.1, .25, -.2], 3)); bg.computeVertexNormals();
  const birds = new THREE.InstancedMesh(bg, new THREE.MeshBasicMaterial({ color: 0x2e3036, side: THREE.DoubleSide }), 7);
  birds.frustumCulled = false; grp.add(birds);
  // blown snow: a box of flakes round the camera, seen only near the rim (one draw of points)
  const N = 160, sp = new Float32Array(N * 3), sr = mulberry(0x5e0b);
  for (let i = 0; i < N * 3; i++) sp[i] = sr();
  const sgeo = new THREE.BufferGeometry(); sgeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const snowU = { t: { value: 0 }, ctr: { value: new THREE.Vector3() }, wind: { value: new THREE.Vector2(1, 0) }, op: { value: 0 }, col: { value: new THREE.Color() }, px: { value: 1 } };
  const snow = new THREE.Points(sgeo, new THREE.ShaderMaterial({
    uniforms: snowU, transparent: true, depthWrite: false, fog: false,
    vertexShader: `uniform float t, px; uniform vec3 ctr; uniform vec2 wind; varying float vA;
      void main(){ vec3 b = vec3(44., 16., 44.); vec3 q = position * b + vec3(wind.x, -.12, wind.y) * t * vec3(9., 9., 9.) + vec3(sin(t * 1.3 + position.y * 40.) * 1.5, 0., cos(t * 1.1 + position.x * 40.) * 1.5);
        q = mod(q - ctr + b * .5, b) - b * .5 + ctr; vec4 mv = viewMatrix * vec4(q, 1.);
        vA = 1. - smoothstep(14., 24., length(q.xz - ctr.xz)); gl_PointSize = clamp(90. / -mv.z, 1., 5.) * px; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform float op; uniform vec3 col; varying float vA; void main(){ vec2 d = gl_PointCoord - .5; float a = smoothstep(.5, .1, length(d)) * op * vA; if (a < .02) discard; gl_FragColor = vec4(col, a); }`,
  }));
  snow.frustumCulled = false; snow.renderOrder = 3; grp.add(snow);
  return { cl, birds, snow, snowU, ba: null, t: 0, m4: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), s3: new THREE.Vector3(), p3: new THREE.Vector3() };
}
// each frame: the clouds and snow follow the camera and take the light's colours, the birds wheel ahead of you
const cA = new THREE.Color(), cB = new THREE.Color();
const mix3 = (pal, i, k) => k < .5 ? cA.set(pal.day[i]).lerp(cB.set(pal.dusk[i]), k * 2) : cA.set(pal.dusk[i]).lerp(cB.set(pal.night[i]), (k - .5) * 2);
function updateRim(F, dt) {
  F.t += dt; const R = W.R, k = lookK() + dayGold() * .2, tg = camTarget(); // (F13: the far clouds and peaks warm with the morning and evening sun)
  F.cl.position.x = camera.position.x; F.cl.position.z = camera.position.z;
  cloudU.t.value = F.t; cloudU.haze.value.copy(scene.fog.color); cloudU.sunCol.value.copy(sun.color);
  cloudU.lit.value.copy(mix3(CL, 0, k)); cloudU.shade.value.copy(mix3(CL, 1, k));
  const sd = skySunDir(); cloudU.sunXZ.value.set(sd.x, sd.z).normalize();
  // the birds: two loose flocks circling out past the rim, ahead of the captain (their centre eases round after him)
  const pa = tg ? Math.atan2(tg.z, tg.x) : 0;
  if (F.ba == null) F.ba = pa; else { let d = pa - F.ba; d = Math.atan2(Math.sin(d), Math.cos(d)); F.ba += d * Math.min(1, dt * .6); }
  for (let i = 0; i < 7; i++) {
    const fl = i < 4 ? 0 : 1, ca = F.ba + (fl ? .2 : -.16), cr = R + (fl ? 70 : 52), cx = Math.cos(ca) * cr, cz = Math.sin(ca) * cr;
    const w = F.t * (fl ? .32 : -.27) + i * 1.7, rr = (fl ? 12 : 9) + (i % 3) * 3, y = (fl ? -18 : -12) + Math.sin(F.t * .5 + i) * 1.5 + (i % 2) * 2;
    F.p3.set(cx + Math.cos(w) * rr, y, cz + Math.sin(w) * rr);
    F.e.set(0, -w + (fl ? 0 : Math.PI), (fl ? .25 : -.25)); F.q.setFromEuler(F.e);
    const flap = .35 + .65 * Math.abs(Math.sin(F.t * 5 + i * 2.1)); F.s3.set(1.8, flap * 1.8, 1.8);
    F.m4.compose(F.p3, F.q, F.s3); F.birds.setMatrixAt(i, F.m4);
  }
  F.birds.instanceMatrix.needsUpdate = true;
  // the snow: only near the edge, blowing outward over it
  const tr = tg ? Math.hypot(tg.x, tg.z) : 0, U = F.snow.material.uniforms;
  U.t.value = F.t; U.op.value = .85 * Math.min(1, Math.max(0, (tr - (R - 34)) / 22));
  if (tg) { U.ctr.value.set(tg.x, tg.y + 5, tg.z); U.wind.value.set(tg.x / (tr || 1), tg.z / (tr || 1)); }
  U.col.value.copy(hemi.color).lerp(cA.set(0xffffff), .6 - .3 * k); U.px.value = renderer.getPixelRatio();
}

// F1a the torches' glow in one draw: camera-facing squares drawn exactly as the sprites were (same size,
// texture, fog and flicker), one per torch, the flicker's phase per torch
function torchBatch(spots, map) {
  const n = spots.length, inst = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { map: { value: null }, opacity: { value: 0 }, t: { value: 0 } }]),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: true,
    vertexShader: `attribute float ph; uniform float t; varying vec2 vUv;
      #include <fog_pars_vertex>
      void main(){ vUv = uv; vec4 mvPosition = modelViewMatrix * vec4(instanceMatrix[3].xyz, 1.);
        mvPosition.xy += position.xy * (2.2 + sin(t * 11. + ph) * .25 + sin(t * 7.3 + ph * 2.) * .15);
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: `uniform sampler2D map; uniform float opacity; varying vec2 vUv;
      #include <fog_pars_fragment>
      void main(){ vec4 c = texture2D(map, vUv); gl_FragColor = vec4(c.rgb, c.a * opacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,
  }), n);
  inst.material.uniforms.map.value = map;
  const ph = new Float32Array(n), m4 = new THREE.Matrix4();
  spots.forEach(([x, z], i) => { m4.makeTranslation(x, groundY(x, z) + 3, z); inst.setMatrixAt(i, m4); ph[i] = i * 1.7; });
  inst.geometry.setAttribute('ph', new THREE.InstancedBufferAttribute(ph, 1));
  inst.frustumCulled = false; inst.visible = false;
  return keepLive(inst);
}

export function buildMount(world, L) {
  if (G.map.id !== 'mount' || !L.mount) { M = null; return; }
  const grp = new THREE.Group(); world.add(grp);
  const stone = lam(0x9a9384, stoneTex()), wood = lam(0x7a5a3a, woodTex()), woodDark = lam(0x55402a, woodTex());
  const plaster = lam(0xf0e6d0), thatch = lam(0xb8954a), skin = lam(0xd9a77a);
  M = { grp, guards: [], camps: [], homes: [], live: [], t: 0, rim: buildRim(grp) }; // (live: the neutral soldiers standing now, for drawSoldiers)
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
    M.homes.push({ ring, flag, h }); keepLive(flag);
  }
  // (F7) the courtyard walls: one stone block per wall stone the rules placed, a cap along the top, a post either side
  // of the open front; all of it merged into one draw (two with the caps) when batching is on
  { const Y = CROWN2.yard, parts = [], cap = lam(0x7d776a, stoneTex());
    for (const o of L.obstacles) { if (o.yard == null) continue;
      const h = L.homes[o.yard], b = Math.atan2(o.z - h.z, o.x - h.x), len = Math.PI * 2 * Y.r / Math.ceil(Math.PI * 2 * Y.r / (.7 * 1.3)) + .12, y = terrainMeshY(o.x, o.z);
      const w = new THREE.Mesh(new THREE.BoxGeometry(len, Y.h + .6, .7), stone); w.position.set(o.x, y + Y.h / 2 - .3, o.z); w.rotation.y = -b - Math.PI / 2; parts.push(w);
      const c = new THREE.Mesh(new THREE.BoxGeometry(len, .22, .9), cap); c.position.set(o.x, y + Y.h + .1, o.z); c.rotation.y = w.rotation.y; parts.push(c); }
    for (const h of L.homes) for (const s of [-1, 1]) {
      const b = h.a + Math.PI + s * (Y.open / 2 + .5) / Y.r, x = h.x + Math.cos(b) * Y.r, z = h.z + Math.sin(b) * Y.r; if (Math.hypot(x, z) > W.R - 1.2) continue;
      const p = new THREE.Mesh(new THREE.BoxGeometry(1.2, Y.post + .6, 1.2), stone); p.position.set(x, terrainMeshY(x, z) + Y.post / 2 - .3, z); p.rotation.y = -b; parts.push(p); }
    for (const p of parts) { p.castShadow = p.receiveShadow = true; grp.add(p); }
    if (batchOn()) { const one = mergeInto(parts, grp); for (const p of parts) grp.remove(p); for (const m of one) grp.add(m); } }
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
    keepLive(ice, crown, beam); M.glacier = { ice, crown, beam, core, shards, mat: iceMat, lastHp: null, flash: 0 }; }
  // F7 the summit's lake: the water (a disc: the whole arena, or the pool welling up round the glacier, or the
  // flood rushing out from it), its glowing edge, and the four rock causeways from the gates to the glacier,
  // the first ground to show as it drains
  { const ar = L.arena.r, Lk = CROWN2.lake, fy = terrainMeshY(ar * .6, ar * .2);
    const water = new THREE.Mesh(new THREE.CircleGeometry(1, 72), waterMaterial({ opacity: .86, foam: 1 }));
    water.rotation.x = -Math.PI / 2; grp.add(water); // (it writes depth: the glacier above it shows, men below the surface don't)
    const edge = new THREE.Mesh(new THREE.RingGeometry(.9, 1.03, 72), new THREE.MeshBasicMaterial({ color: 0xbff4ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    edge.rotation.x = -Math.PI / 2; edge.renderOrder = 3; grp.add(edge);
    const rock = lam(0x6f675c, stoneTex());
    for (let c = 0; c < 4; c++) { const a = mountHomeA(c), r0 = 3, r1 = ar - .3, mid = (r0 + r1) / 2, m = new THREE.Mesh(new THREE.BoxGeometry(r1 - r0, Lk.causeH * 2, Lk.causeW), rock);
      m.position.set(Math.cos(a) * mid, fy, Math.sin(a) * mid); m.rotation.y = -a; m.receiveShadow = true; grp.add(m); }
    keepLive(water, edge); M.lake = { water, edge, fy, ar }; }
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
    const postGeo = new THREE.CylinderGeometry(.07, .09, 2.6, 5);
    for (const [x2, z2] of spots) { const post = new THREE.Mesh(postGeo, woodDark); post.position.set(x2, groundY(x2, z2) + 1.3, z2); grp.add(post); }
    if (batchOn()) { M.torchGlow = torchBatch(spots, mat.map); grp.add(M.torchGlow); } // (F1a: every glow in one draw, hidden while unlit)
    if (!batchOn() || abOn()) M.torches = spots.map(([x2, z2], i) => { const sp = new THREE.Sprite(mat); sp.position.set(x2, groundY(x2, z2) + 3, z2); sp.scale.setScalar(2.4); sp.userData.ph = i * 1.7; grp.add(sp); return sp; });
    M.torchMat = mat; }
  // the war chest (hidden until it lands)
  { const g = new THREE.Group(), box = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1, 1.1), wood); box.position.y = .5; g.add(box);
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, 1.6, 12, 1, false, 0, Math.PI), wood); lid.rotation.z = Math.PI / 2; lid.position.y = 1; g.add(lid);
    for (const x of [-.6, .6]) { const band = new THREE.Mesh(new THREE.BoxGeometry(.12, 1.62, 1.16), new THREE.MeshPhongMaterial({ color: 0xffcf3a, emissive: 0x4a3400 })); band.position.set(x, .78, 0); g.add(band); }
    g.visible = false; grp.add(shadowy(g)); keepLive(g); M.chest = g; }
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
    if (b.kind === 'camp') { const fire = new THREE.Mesh(new THREE.ConeGeometry(.45, .9, 6), new THREE.MeshBasicMaterial({ color: 0xff8a2a })); fire.position.set(b.x, groundY(b.x, b.z) + .45, b.z); grp.add(fire); M.camps.push({ b, fire }); keepLive(fire); }
    keepLive(banner); M.guards.push({ b, men, banner, flap, seen: 0 });
    for (const m of men) M.live.push(m.u);
  }
  // F1a every garrison's banner (pole, cloth) and every camp's fire in one draw each
  if (batchOn()) {
    const inst = (geo, mat, n, cast) => { const m = new THREE.InstancedMesh(geo, mat, Math.max(1, n)); for (let i = 0; i < Math.max(1, n); i++) m.setMatrixAt(i, ZERO); m.castShadow = cast; m.receiveShadow = cast; m.frustumCulled = false; grp.add(keepLive(m)); return m; };
    M.gb = { poles: inst(poleGeo, poleMat, M.guards.length, true), cloths: inst(clothGeo, clothMat, M.guards.length, true), fires: inst(M.camps.length ? M.camps[0].fire.geometry : new THREE.ConeGeometry(.45, .9, 6), M.camps.length ? M.camps[0].fire.material : new THREE.MeshBasicMaterial(), M.camps.length, false) };
    if (!abOn()) { for (const g of M.guards) grp.remove(g.banner); for (const c of M.camps) grp.remove(c.fire); }
  }
  // F1a the Crown on the glacier: its band and points share one material, so one mesh
  if (batchOn()) { const cr = M.glacier.crown, parts = cr.children.slice(), one = mergeInto(parts, cr); for (const m of one) cr.add(m); M.glacier.crownOne = one; M.glacier.crownParts = parts; if (!abOn()) for (const p of parts) cr.remove(p); }
}
// F1a the batched banners and fires follow the same rules as the separate ones (a zero-size instance is a hidden one)
const ZERO = new THREE.Matrix4().makeScale(0, 0, 0), gm = new THREE.Matrix4(), gq = new THREE.Quaternion(), gv = new THREE.Vector3(), gs = new THREE.Vector3(), gY = new THREE.Vector3(0, 1, 0);
function updateGuardBatch() {
  const B = M.gb; if (!B) return;
  M.guards.forEach((g, i) => {
    const show = g.banner.userData.on, bp = g.banner.position;
    if (!show) { B.poles.setMatrixAt(i, ZERO); B.cloths.setMatrixAt(i, ZERO); return; }
    const pole = g.banner.children[0], cloth = g.flap.children[0];
    gm.makeTranslation(bp.x + pole.position.x, bp.y + pole.position.y, bp.z + pole.position.z); B.poles.setMatrixAt(i, gm);
    gq.setFromAxisAngle(gY, g.flap.rotation.y); gv.set(cloth.position.x, 0, 0).applyQuaternion(gq);
    gm.compose(gs.set(bp.x + gv.x, bp.y + g.flap.position.y + gv.y, bp.z + gv.z), gq, gv.set(1, 1, 1)); B.cloths.setMatrixAt(i, gm);
  });
  M.camps.forEach(({ fire }, i) => { if (!fire.userData.on) { B.fires.setMatrixAt(i, ZERO); return; } gm.compose(fire.position, fire.quaternion, fire.scale); B.fires.setMatrixAt(i, gm); });
  for (const m of [B.poles, B.cloths, B.fires]) { m.instanceMatrix.needsUpdate = true; m.visible = abShow(true); }
}

// the neutral soldiers standing now, for drawSoldiers to draw beside the armies (null off the mountain)
export const neutralFigs = () => (M && G.map.id === 'mount' ? M.live : null);
if (import.meta.env.DEV) window.__neutralFigs = neutralFigs; // (dev: tests count the neutral soldiers)

export function updateMount(dt) {
  if (M && M.rim) updateRim(M.rim, dt);
  if (!M || !G.c2) return;
  M.t += dt; const K = G.c2, T = G.T;
  M.live.length = 0;
  for (const g of M.guards) {
    const { b, men } = g, [nf, na] = c2Garrison(b);
    const fresh = b.swingT && b.swingT !== g.seen && T - b.swingT < .35; if (fresh) g.seen = b.swingT; // (the garrison struck: its footmen swing)
    g.banner.userData.on = nf + na > 0; g.banner.visible = abShow(false) && g.banner.userData.on; g.flap.rotation.y = Math.sin(M.t * 1.6 + b.x) * .3;
    for (const { u, archer, i } of men) {
      if (i >= (archer ? na : nf)) continue; // (cut down: gone)
      if (!archer) { if (fresh) u.swing = .38; else if (u.swing > 0) u.swing = Math.max(0, u.swing - dt); }
      M.live.push(u);
    }
  }
  for (const { b, fire } of M.camps) { fire.userData.on = b.hp > 0; fire.visible = abShow(false) && fire.userData.on; fire.scale.y = .8 + Math.sin(M.t * 9 + b.x) * .2; }
  updateGuardBatch();
  for (const p of M.pals) p.inst.visible = !!p.h.fort;
  // dusk from 7:30, night at 8:00: the sky darkens, the torches come up and flicker
  const nk = T < CROWN2.dusk ? 0 : T < CROWN2.night ? (T - CROWN2.dusk) / (CROWN2.night - CROWN2.dusk) * .5 : Math.min(1, .5 + (T - CROWN2.night) / 8 * .5);
  dayLook(T); nightLook(nk); // (F13: the day's sun first, then dusk and night as before)
  if (M.torchGlow) { const U = M.torchGlow.material.uniforms; U.opacity.value = Math.min(1, Math.max(0, (nk - .2) * 2)); U.t.value = M.t; M.torchGlow.visible = U.opacity.value > 0 && !abOld(); }
  if (M.torches) { if (M.torchGlow) for (const t of M.torches) t.visible = abOld(); M.torchMat.opacity = Math.min(1, Math.max(0, (nk - .2) * 2)); if (M.torchMat.opacity > 0) for (const t of M.torches) t.scale.setScalar(2.2 + Math.sin(M.t * 11 + t.userData.ph) * .25 + Math.sin(M.t * 7.3 + t.userData.ph * 2) * .15); }
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
    if (g.crownOne) { for (const m of g.crownOne) m.visible = abShow(true); for (const p of g.crownParts) p.visible = abShow(false); }
    g.crown.rotation.y += dt * (gl.hp > 0 ? .3 : 2.4); g.crown.position.y = groundY(0, 0) + (gl.hp > 0 ? 2.6 : 4.2 + Math.sin(M.t * 2) * .3);
    const night = T >= CROWN2.night ? 1 : T >= CROWN2.dusk ? (T - CROWN2.dusk) / (CROWN2.night - CROWN2.dusk) * .5 : 0;
    g.beam.material.opacity = night * (.22 + (T >= CROWN2.crack ? Math.sin(M.t * 8) * .1 : 0));
  }
  if (M.lake) { // (F7: the lake's level, the countdown's pool and the flood's front, from the clock: the same on every phone)
    const Wl = c2Lake(T), Lk = CROWN2.lake, { water, edge, fy, ar } = M.lake;
    let rad = ar - .25, y = fy - .3 + (Lk.depth + .3) * Wl.level, glow = 0;
    if (Wl.count >= 0) { const p = 1 - Wl.count / Lk.count; rad = 2.6 + (Lk.pool - 2.6) * p; y = fy + .05 + .5 * p; glow = .55 + .35 * Math.sin(M.t * (5 + p * 9)); }
    else if (Wl.front > 0) { rad = Math.min(Wl.front, ar - .25); y = fy + Lk.depth; glow = Wl.front < ar ? 1 : 0; }
    water.material.userData.rush.value = Wl.front > 0 ? 1 : Wl.count >= 0 ? .35 : 0; // (the flood: faster, whiter; the welling pool: livelier)
    water.visible = Wl.level > .01 || Wl.count >= 0; water.scale.setScalar(rad); water.position.set(0, y, 0);
    edge.visible = glow > 0; edge.scale.setScalar(rad); edge.position.set(0, y + .03, 0); edge.material.opacity = glow;
  }
  const ch = K.breaks.find(b => b.kind === 'chest');
  if (M.chest) { M.chest.visible = !!ch && ch.hp > 0; if (ch && ch.hp > 0) { M.chest.position.set(ch.x, groundY(ch.x, ch.z), ch.z); if (ch.hitT && T - ch.hitT < .12) M.chest.rotation.y = Math.sin(M.t * 60) * .05; } }
}
