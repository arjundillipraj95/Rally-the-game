// Scenery that steps out of the camera's way. Trees and palms standing between the camera and your
// captain (or right on top of the camera) fade to a sparse dither, so a fight in the woods stays
// visible. Works on instanced meshes: each instance gets its own fade value (1 solid, ~0.15 nearly
// gone) and the fragment shader drops pixels in a fine noise pattern above that value.
import * as THREE from 'three';

const groups = []; // { mesh, anchors: [{x, z, r}], fade: Float32Array, attr }
const MIN = .15;

function patch(mat) {
  if (mat.userData.seeThrough) return;
  mat.userData.seeThrough = true;
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.vertexShader = 'attribute float aFade;\nvarying float vFade;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n  vFade = aFade;');
    sh.fragmentShader = 'varying float vFade;\n' + sh.fragmentShader.replace('#include <clipping_planes_fragment>',
      '#include <clipping_planes_fragment>\n  if (vFade < .999 && fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715)))) > vFade) discard;');
  };
  mat.customProgramCacheKey = () => 'seethrough';
  mat.needsUpdate = true;
}
// anchors[i] is where instance i stands and how wide it is: {x, z, r}
export function seeThrough(mesh, anchors) {
  const fade = new Float32Array(mesh.count || anchors.length).fill(1);
  const attr = new THREE.InstancedBufferAttribute(fade, 1); attr.setUsage(THREE.DynamicDrawUsage);
  mesh.geometry = mesh.geometry.clone(); // the attribute belongs to this mesh only
  mesh.geometry.setAttribute('aFade', attr);
  patch(mesh.material);
  groups.push({ mesh, anchors, fade, attr });
}
export function clearSeeThrough() { groups.length = 0; }

// Each frame: fade what blocks the line from the camera to the target.
export function updateSeeThrough(dt, cam, target) {
  if (!groups.length || !target) return;
  const cx = cam.x, cz = cam.z, dx = target.x - cx, dz = target.z - cz, L2 = dx * dx + dz * dz || 1;
  const k = Math.min(1, dt * 8);
  for (const g of groups) {
    let dirty = false;
    for (let i = 0; i < g.anchors.length; i++) {
      const a = g.anchors[i], ax = a.x - cx, az = a.z - cz;
      const t = (ax * dx + az * dz) / L2; // 0 at the camera, 1 at the captain
      let block = false;
      if (t > -.05 && t < 1.02) { const ex = ax - dx * t, ez = az - dz * t; block = ex * ex + ez * ez < (a.r + .6) * (a.r + .6); }
      if (!block && ax * ax + az * az < (a.r + 1.5) * (a.r + 1.5)) block = true; // camera inside the branches
      const want = block ? MIN : 1, f = g.fade[i];
      if (Math.abs(want - f) > .002) { g.fade[i] = f + (want - f) * k; dirty = true; }
    }
    if (dirty) g.attr.needsUpdate = true;
  }
}
