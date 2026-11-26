// CAM1 a see-through hole for the high camera: castle towers, walls, keeps and hillsides between the camera and your
// champion are cut away in a soft dithered tube, so he is never hidden. Only the world's scenery is cut (never people),
// and only above his feet (the ground he stands on stays). The tree fade (seethrough.js) still works alongside.
import * as THREE from 'three';
import { HOLE } from '../config/cam.js';
import { groundY } from '../core/world.js';

const U = { uHoleA: { value: new THREE.Vector3() }, uHoleB: { value: new THREE.Vector3() }, uHoleR: { value: 0 }, uHoleY: { value: 0 } };
const done = new WeakSet();
export const holeStats = { mats: 0, on: false };

function patch(mat) {
  if (done.has(mat) || mat.isShaderMaterial || mat.isPointsMaterial || mat.isSpriteMaterial || mat.transparent) return;
  done.add(mat); holeStats.mats++;
  const prev = mat.onBeforeCompile, prevKey = mat.customProgramCacheKey && mat.customProgramCacheKey.bind(mat);
  mat.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    Object.assign(sh.uniforms, U);
    sh.vertexShader = 'varying vec3 vHoleW;\n' + sh.vertexShader.replace('#include <project_vertex>', `#include <project_vertex>
  { vec4 hw = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    hw = instanceMatrix * hw;
  #endif
    vHoleW = (modelMatrix * hw).xyz; }`);
    sh.fragmentShader = 'varying vec3 vHoleW;\nuniform vec3 uHoleA;\nuniform vec3 uHoleB;\nuniform float uHoleR;\nuniform float uHoleY;\n' +
      sh.fragmentShader.replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>
  if (uHoleR > 0.0 && vHoleW.y > uHoleY) {
    vec3 ab = uHoleB - uHoleA; float t = clamp(dot(vHoleW - uHoleA, ab) / dot(ab, ab), 0.0, 1.0);
    float d = length(vHoleW - (uHoleA + ab * t)), r = uHoleR * smoothstep(0.1, 0.3, t) * (1.0 - smoothstep(0.97, 1.0, t));
    float keep = smoothstep(r * 0.55, r, d); // (0 in the middle of the tube, 1 at its edge)
    if (keep < 0.999 && fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) > max(keep, ${HOLE.min.toFixed(2)})) discard;
  }`);
  };
  mat.customProgramCacheKey = () => (prevKey ? prevKey() : '') + '|camhole';
  mat.needsUpdate = true;
}
// every scenery mesh in the world group (called after the world is built, and now and then for pieces added later)
export function holeWorld(group) {
  if (!group) return;
  group.traverse(o => { if (!o.isMesh || o.isSkinnedMesh || o.userData.noHole) return; for (const m of Array.isArray(o.material) ? o.material : [o.material]) if (m) patch(m); });
}
// each frame (fixed camera only): the tube from the camera to his chest
let scanT = 0;
export function camHoleTick(dt, on, cam, tgt, group) {
  if ((scanT -= dt) <= 0) { scanT = 1; holeWorld(group); }
  holeStats.on = !!(on && tgt && !tgt.dead);
  if (!holeStats.on) { U.uHoleR.value = 0; return; }
  const y = Math.max(tgt.y || 0, groundY(tgt.x, tgt.z) || 0);
  U.uHoleA.value.copy(cam); U.uHoleB.value.set(tgt.x, y + HOLE.chest + (tgt.mounted ? .8 : 0), tgt.z);
  U.uHoleR.value = HOLE.r; U.uHoleY.value = y + HOLE.feet;
}
