import * as THREE from 'three';
import { quality } from './quality.js';
import { lookFor } from './look.js';

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
  sunDir: { value: sunDir.clone() }, time: { value: 0 }, clouds: { value: 1 },
};
const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 16), new THREE.ShaderMaterial({
  uniforms: skyU, side: THREE.BackSide, depthWrite: false, fog: false,
  vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); gl_Position.z = gl_Position.w; }`,
  fragmentShader: `
    uniform vec3 zenith, horizon, sunCol, sunDir; uniform float time, clouds; varying vec3 vDir;
    float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<4;i++){ s+=a*vn(p); p*=2.03; a*=.5; } return s; }
    void main(){
      vec3 d = normalize(vDir); float h = max(d.y, 0.);
      vec3 col = mix(horizon, zenith, pow(h, .45));
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
export function applyPixelRatio() { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality.cfg.pixelRatio)); }
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
  skyU.time.value = t;
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

export function setLook(map) {
  const L = lookFor(map.id);
  skyU.zenith.value.set(L.zenith); skyU.horizon.value.set(L.horizon); skyU.sunCol.value.set(L.sun);
  sunDir.set(...L.sunDir).normalize(); skyU.sunDir.value.copy(sunDir);
  scene.fog.color.set(L.horizon);
  scene.fog.near = L.fog[0] * quality.cfg.fogScale; scene.fog.far = L.fog[1] * quality.cfg.fogScale;
  hemi.color.set(L.sky); hemi.groundColor.set(L.gnd); hemi.intensity = L.hemiI;
  sun.color.set(L.sun); sun.intensity = L.sunI;
}
