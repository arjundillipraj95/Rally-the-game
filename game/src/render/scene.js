import * as THREE from 'three';
import { quality } from './quality.js';
import { lookFor } from './look.js';
import { DAY } from '../config.js';
import { WATER } from './water.js';

// Filmic, color-managed rendering with a sun that casts real shadows around the camera.
export const canvas = document.getElementById('gl');
export const renderer = new THREE.WebGLRenderer({ canvas, antialias: quality.cfg.antialias, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
export const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xdcd6c6, 70, 190);
export const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 420);

export const hemi = new THREE.HemisphereLight(0xd8e6ff, 0xb08c5c, 1.25); scene.add(hemi);
export const sun = new THREE.DirectionalLight(0xfff0d2, 3); scene.add(sun, sun.target);
const sunDir = new THREE.Vector3(.55, .62, .3).normalize();

// ---------- sky dome: gradient, sun glow and drifting clouds ----------
const skyU = {
  zenith: { value: new THREE.Color() }, horizon: { value: new THREE.Color() }, sunCol: { value: new THREE.Color() },
  sunDir: { value: sunDir.clone() }, time: { value: 0 }, clouds: { value: 1 }, grad: { value: .45 },
};
const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 16), new THREE.ShaderMaterial({
  uniforms: skyU, side: THREE.BackSide, depthWrite: false, fog: false,
  vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); gl_Position.z = gl_Position.w; }`,
  fragmentShader: `
    uniform vec3 zenith, horizon, sunCol, sunDir; uniform float time, clouds, grad; varying vec3 vDir;
    float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<4;i++){ s+=a*vn(p); p*=2.03; a*=.5; } return s; }
    void main(){
      vec3 d = normalize(vDir); float h = max(d.y, 0.);
      vec3 col = mix(horizon, zenith, pow(h, grad));
      float sd = max(dot(d, normalize(sunDir)), 0.);
      col += sunCol * (pow(sd, 900.) * 6. + pow(sd, 12.) * .35);
      if (clouds > .5 && d.y > 0.) {
        vec2 uv = d.xz / (d.y + .18) * 1.6 + vec2(time * .012, time * .004);
        float n = fbm(uv);
        float c = smoothstep(.5, .78, n) * smoothstep(.0, .22, d.y);
        vec3 cc = mix(horizon, vec3(1.), .75) * (.85 + .25 * sd);
        col = mix(col, cc, c * .85);
      }
      gl_FragColor = vec4(col, 1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
}));
sky.renderOrder = -10; sky.frustumCulled = false;
scene.add(sky);

export const view = { W: 0, H: 0, DPR: 1 };
export function applyPixelRatio() { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality.cfg.pixelRatio) * (quality.scale || 1)); }
export function resize() {
  view.W = innerWidth; view.H = innerHeight; view.DPR = Math.min(window.devicePixelRatio || 1, 2);
  applyPixelRatio();
  renderer.setSize(view.W, view.H, false);
  camera.aspect = view.W / view.H; camera.fov = view.W < view.H ? 78 : 60; camera.updateProjectionMatrix();
}

// Shadows on or off, and how sharp, per quality level. Returns true if shadows are on.
export function applyShadowQuality() {
  const q = quality.cfg, on = q.shadows > 0;
  const changed = renderer.shadowMap.enabled !== on;
  renderer.shadowMap.enabled = on;
  renderer.shadowMap.type = q.softShadows ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
  sun.castShadow = on;
  if (on) {
    const s = sun.shadow, r = q.shadowRange;
    s.mapSize.set(q.shadows, q.shadows);
    s.camera.left = -r; s.camera.right = r; s.camera.top = r; s.camera.bottom = -r; s.camera.near = 1; s.camera.far = 260;
    s.camera.updateProjectionMatrix();
    s.bias = -.0006; s.normalBias = .04;
    if (s.map) { s.map.dispose(); s.map = null; }
  }
  if (changed) scene.traverse(o => { if (o.material) [].concat(o.material).forEach(m => m.needsUpdate = true); });
  skyU.clouds.value = q.clouds ? 1 : 0;
  return on;
}
export const shadowsOn = () => renderer.shadowMap.enabled;

// Keeps the sun's shadow box centred on what the camera looks at, snapped to shadow texels so edges don't shimmer.
const tmp = new THREE.Vector3();
export function followSun(x, z, t) {
  skyU.time.value = t; WATER.time.value = t;
  sky.position.copy(camera.position);
  if (!sun.castShadow) { sun.position.set(x, 0, z).addScaledVector(sunDir, 150); sun.target.position.set(x, 0, z); return; }
  const r = quality.cfg.shadowRange, step = (2 * r) / quality.cfg.shadows;
  // snap in the light's own frame: project the centre onto the sun's right/up axes
  const right = tmp.set(sunDir.z, 0, -sunDir.x).normalize();
  const along = x * right.x + z * right.z, sx = Math.round(along / step) * step - along;
  const cx = x + right.x * sx, cz = z + right.z * sx;
  sun.target.position.set(cx, 0, cz);
  sun.position.set(cx, 0, cz).addScaledVector(sunDir, 150);
}

// The mountain's dusk and night (k: 0 day, .5 sunset, 1 night): sky, haze, sun and fill light ease
// from the map's own colours to orange, then to a cold moonlit blue. The fill stays bright enough
// that armies and their colours read clearly: it's a look, not a handicap.
let BASE = null, DAYP = null; const DUSK = { zenith: 0x4a5a8a, horizon: 0xe8945a, sun: 0xffa060, sky: 0xd8b49a }, NIGHT = { zenith: 0x0a1430, horizon: 0x2c3c62, sun: 0xa8c0ff, sky: 0x8fa3d0, gnd: 0x3a3a46 };
const ca = new THREE.Color(), cb = new THREE.Color();
const mix3 = (day, dusk, night, k) => k < .5 ? ca.set(day).lerp(cb.set(dusk), k * 2) : ca.set(dusk).lerp(cb.set(night), (k - .5) * 2);
const GOLD = { sun: 0xffc27a, horizon: 0xf2c79a, zenith: 0x5f86c4, sky: 0xf0dcc0 }, eZ = new THREE.Color(), eH = new THREE.Color(), eS = new THREE.Color(), eK = new THREE.Color();
export function nightLook(k) {
  if (!BASE) return; k = Math.max(0, Math.min(1, k)); if (BASE.k === k) return; BASE.k = k;
  const d = DAYP || { gold: 0, sunI: 1, hemiI: 1, mist: 1 }, g = d.gold; // (F13: the day's own light stands in for the map's, until dusk)
  const zen = g ? eZ.set(BASE.zenith).lerp(cb.set(GOLD.zenith), g * .25) : eZ.set(BASE.zenith), hor = g ? eH.set(BASE.horizon).lerp(cb.set(GOLD.horizon), g * .55) : eH.set(BASE.horizon);
  const sn = g ? eS.set(BASE.sun).lerp(cb.set(GOLD.sun), g * .8) : eS.set(BASE.sun), sk = g ? eK.set(BASE.sky).lerp(cb.set(GOLD.sky), g * .4) : eK.set(BASE.sky);
  skyU.zenith.value.copy(mix3(zen, DUSK.zenith, NIGHT.zenith, k)); skyU.horizon.value.copy(mix3(hor, DUSK.horizon, NIGHT.horizon, k));
  skyU.sunCol.value.copy(mix3(sn, DUSK.sun, NIGHT.sun, k)); scene.fog.color.copy(mix3(hor, DUSK.horizon, NIGHT.horizon, k));
  sun.color.copy(mix3(sn, DUSK.sun, NIGHT.sun, k)); sun.intensity = BASE.sunI * d.sunI * (1 - .5 * k);
  hemi.color.copy(mix3(sk, DUSK.sky, NIGHT.sky, k)); hemi.groundColor.copy(ca.set(BASE.gnd).lerp(cb.set(NIGHT.gnd), k)); hemi.intensity = BASE.hemiI * d.hemiI * (1 + .1 * k); // (moonlight: the fill stays up so armies read)
  scene.fog.near = BASE.fogN * d.mist; scene.fog.far = BASE.fogF * d.mist;
}
// F13: the sun's place at match time T (seconds) from the DAY table: smooth between keyframes, the map's own light from 7:30 on.
// Call before nightLook each frame (it forces nightLook to re-mix). The same T on every phone gives the same sun.
const _sp = new THREE.Vector3(), ss = x => x * x * (3 - 2 * x);
function swing(out, base, el, az) { // base direction, swung round by az degrees and set to el degrees high (null: as base)
  const len = Math.hypot(base[0], base[1], base[2]) || 1, e = el == null ? Math.asin(base[1] / len) : el * Math.PI / 180, a = Math.atan2(base[2], base[0]) + az * Math.PI / 180;
  return out.set(Math.cos(e) * Math.cos(a), Math.sin(e), Math.cos(e) * Math.sin(a));
}
export function dayLook(T) {
  if (!BASE) return;
  if (T >= DAY[DAY.length - 1].t) { if (DAYP) { DAYP = null; BASE.k = -1; sunDir.set(...BASE.sunDir).normalize(); skyU.sunDir.value.set(...(BASE.sunSky || BASE.sunDir)).normalize(); } return; }
  let i = 0; while (i < DAY.length - 2 && T >= DAY[i + 1].t) i++;
  const A = DAY[i], B = DAY[i + 1], u = ss(Math.max(0, Math.min(1, (T - A.t) / (B.t - A.t))));
  const baseEl = x => Math.asin(x[1] / (Math.hypot(x[0], x[1], x[2]) || 1)) * 180 / Math.PI;
  const lerp = (a, b) => a + (b - a) * u, pick = (v, base) => v == null ? base : v;
  const sd = BASE.sunDir, sk = BASE.sunSky || BASE.sunDir, az = lerp(A.az, B.az);
  DAYP = { gold: lerp(A.gold, B.gold), sunI: lerp(A.sunI, B.sunI), hemiI: lerp(A.hemiI, B.hemiI), mist: lerp(A.mist, B.mist) };
  sunDir.copy(swing(_sp, sd, lerp(pick(A.el, baseEl(sd)), pick(B.el, baseEl(sd))), az));
  skyU.sunDir.value.copy(swing(_sp, sk, lerp(pick(A.sky, baseEl(sk)), pick(B.sky, baseEl(sk))), az));
  BASE.k = -1; // (forces nightLook to mix the new light in)
}
export const dayGold = () => (DAYP ? DAYP.gold : 0);
export const lookK = () => (BASE ? Math.max(0, BASE.k) : 0); // (0 day, .5 sunset, 1 night)
export const skySunDir = () => skyU.sunDir.value;
export function setLook(map) {
  const L = lookFor(map.id); BASE = { ...L, k: 0, fogN: L.fog[0] * quality.cfg.fogScale, fogF: L.fog[1] * quality.cfg.fogScale }; DAYP = null;
  skyU.zenith.value.set(L.zenith); skyU.horizon.value.set(L.horizon); skyU.sunCol.value.set(L.sun); skyU.grad.value = L.skyGrad || .45; // (skyGrad: lower, the blue comes down nearer the horizon)
  sunDir.set(...L.sunDir).normalize(); skyU.sunDir.value.set(...(L.sunSky || L.sunDir)).normalize(); // (sunSky: where the sun's disc shows, if lower than the light)
  scene.fog.color.set(L.horizon);
  scene.fog.near = L.fog[0] * quality.cfg.fogScale; scene.fog.far = L.fog[1] * quality.cfg.fogScale;
  hemi.color.set(L.sky); hemi.groundColor.set(L.gnd); hemi.intensity = L.hemiI;
  sun.color.set(L.sun); sun.intensity = L.sunI;
}
