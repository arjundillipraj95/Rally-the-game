// (C3h) an upgraded soldier's look, on the new spearman and archer bodies (design doc, Titus card, 18 Nov: each tier a
// new armour colour and one change of clothes on the same body). Spearmen: tier 1 (Princeps) darker steel and a red
// crest, tier 2 (Triarius) bronze armour and greaves and a short cloak (the cloak comes in the rig's pack). Archers:
// tier 1 a leather cap, tier 2 a bronze helmet. The steel is found in the picture (grey and not too dark), the cap and
// helmet are the steel above the neck; the team cloth is its own material and is left alone.
import * as THREE from 'three';

const NECK = .55; // (archers: the body as modelled, above this height is the head and helmet)
const LOOK = { // per kind and tier: the colour the steel becomes (multiplied by its own lightness), and where
  foot: [null, { col: [.42, .45, .52], all: true }, { col: [1.05, .66, .3], all: true }],
  arch: [null, { col: [.72, .5, .3], head: true }, { col: [1.05, .66, .3], head: true }],
};
const cache = new Map();
function tierMaterial(src, kind, tier) {
  const L = LOOK[kind] && LOOK[kind][tier]; if (!L) return src;
  const key = src.uuid + kind + tier; if (cache.has(key)) return cache.get(key);
  const m = src.clone(), col = new THREE.Vector3(...L.col);
  m.onBeforeCompile = sh => {
    sh.uniforms.uTier = { value: col };
    sh.vertexShader = 'varying float vTierY;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n  vTierY = position.y;');
    sh.fragmentShader = 'uniform vec3 uTier;\nvarying float vTierY;\n' + sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
      {
        vec3 c = pow(max(diffuseColor.rgb, vec3(0.)), vec3(1. / 2.2)); float hi = max(c.r, max(c.g, c.b)), lo = min(c.r, min(c.g, c.b)), sat = (hi - lo) / max(hi, .001), lum = dot(c, vec3(.333));
        float k = (1. - smoothstep(.24, .34, sat)) * smoothstep(.36, .48, lum) * step(c.r, c.b + .06)${L.head ? ` * smoothstep(${(NECK - .03).toFixed(2)}, ${NECK.toFixed(2)}, vTierY)` : ''};
        diffuseColor.rgb = mix(diffuseColor.rgb, pow(uTier * (lum * 1.25), vec3(2.2)), k); // (judged in picture colours: the steel is the pale grey-blue, not the warm leather or the blue cloth)
      }`);
  };
  m.customProgramCacheKey = () => 'tier' + kind + tier;
  cache.set(key, m); return m;
}
const crestGeo = (() => { const g = new THREE.CylinderGeometry(.17, .17, .045, 16, 1, false, -Math.PI / 2, Math.PI); g.rotateZ(Math.PI / 2); return g; })(); // (a half disc, front to back)
const crestMat = new THREE.MeshStandardMaterial({ color: 0xb3241b, roughness: .9 });
// (Q1) an archer's quiver, bigger than the one in his model so it reads at a distance: a leather tube across his back,
// a dozen white-fletched arrows out of the top (on the chest socket: +y up the spine, -z his back)
const quiverGeo = new THREE.CylinderGeometry(.1, .085, .62, 12), quiverMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: .85 });
const fletchGeo = new THREE.ConeGeometry(.035, .13, 5), fletchMat = new THREE.MeshStandardMaterial({ color: 0xf2efe6, roughness: .7 });
export function archerQuiver(R) {
  if (!R.bones || !R.bones.chest) return;
  const q = new THREE.Group(); q.position.set(.1, .02, -.2); q.rotation.z = -.45; q.rotation.x = -.12;
  const t = new THREE.Mesh(quiverGeo, quiverMat); t.castShadow = true; q.add(t);
  for (let i = 0; i < 9; i++) { const f = new THREE.Mesh(fletchGeo, fletchMat), a = i * 2.4, r = .045 * Math.sqrt(i / 9 + .1); f.position.set(Math.cos(a) * r, .38 + (i % 3) * .03, Math.sin(a) * r); q.add(f); }
  R.bones.chest.add(q);
}
// dress one rigged soldier (R from rigClip) for his kind and tier
export function tierLook(R, kind, tier) {
  if (!tier) return;
  R.root.traverse(o => { if (o.isSkinnedMesh && !/team/i.test(o.material.name)) o.material = tierMaterial(o.material, kind, tier); });
  if (kind === 'foot' && R.bones && R.bones.head) { const c = new THREE.Mesh(crestGeo, crestMat); c.position.set(0, .27, -.02); c.castShadow = true; R.bones.head.add(c); }
}
