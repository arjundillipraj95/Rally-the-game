// The captain's three weapons, built in code from the weapons sheet: the gladius (a broad faceted
// blade, an eight-sided gold guard, a leather-wrapped grip, a gold ball pommel), the spear (a leaf
// head on a gold collar, leather wraps at the top and the hand, a gold ball butt) and the javelin
// (thinner, a narrow head, pale cord wraps, a gold cap). Each comes back as a group with its grip at
// the origin and its point along +z, ready to hang on the hand bone. Sizes are in the captain's model
// units (he is 1.96 tall): the gladius is about 0.7 long, the spear 2.2 (taller than him), the
// javelin 1.75.
import * as THREE from 'three';

const MATS = {};
function mats() {
  if (MATS.steel) return MATS;
  MATS.steel = new THREE.MeshStandardMaterial({ color: 0xc9ced6, metalness: .75, roughness: .28, flatShading: true });
  MATS.gold = new THREE.MeshStandardMaterial({ color: 0xe2a336, metalness: .65, roughness: .32 });
  MATS.leather = new THREE.MeshStandardMaterial({ color: 0x5c3a22, roughness: .85 });
  MATS.wood = new THREE.MeshStandardMaterial({ color: 0x8e4f2a, roughness: .7 });
  MATS.cord = new THREE.MeshStandardMaterial({ color: 0xd9b27e, roughness: .9 });
  return MATS;
}
// a turned part: a profile of [radius, height] points spun round the y axis
function lathe(pts, mat, segs = 16, phi = 0) {
  return new THREE.Mesh(new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), segs, phi), mat);
}
// a wrapped stretch (leather or cord): ridges, one per turn
function wrap(y0, y1, r, turns, mat) {
  const pts = [[r * .9, y0]], n = turns * 4;
  for (let i = 0; i <= n; i++) pts.push([r * (i % 4 === 1 || i % 4 === 2 ? 1.12 : 1), y0 + (y1 - y0) * i / n]);
  pts.push([r * .9, y1]);
  return lathe(pts, mat, 14);
}
const ball = (r, y, mat) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat); m.position.y = y; return m; };
const ring = (r, y0, y1, mat, segs = 16) => lathe([[0, y0], [r, y0], [r, y1], [0, y1]], mat, segs);

export function makeWeapon(kind) {
  const M = mats(), g = new THREE.Group(); // (built along +y, turned to +z at the end)
  if (kind === 'sword' || kind === 'gladius') {
    g.add(ball(.048, -.115, M.gold), ball(.014, -.165, M.gold));
    g.add(ring(.032, -.08, -.06, M.gold));
    g.add(wrap(-.06, .06, .026, 4, M.leather));
    const guard = ring(.062, .06, .1, M.gold, 8); guard.scale.z = .62; guard.rotation.y = Math.PI / 8; g.add(guard);
    // the blade: six-sided, so it has a raised middle and two bevelled edges, then a long point
    const blade = lathe([[0, .1], [.058, .1], [.06, .3], [.056, .44], [0, .6]], M.steel, 6, Math.PI / 2); blade.scale.z = .3; g.add(blade);
  } else if (kind === 'spear') {
    g.add(ball(.046, -.84, M.gold), ring(.033, -.82, -.77, M.gold));
    g.add(ring(.022, -.77, 1.0, M.wood, 12));
    g.add(wrap(-.5, -.42, .024, 3, M.leather)); g.add(wrap(-.08, .1, .024, 5, M.leather)); g.add(wrap(.8, 1.0, .025, 6, M.leather));
    g.add(ring(.036, 1.0, 1.07, M.gold));
    // the head: four-sided, a broad leaf narrowing to a long point
    const head = lathe([[.014, 1.06], [.062, 1.15], [.068, 1.19], [0, 1.38]], M.steel, 4); head.scale.z = .5; g.add(head);
  } else { // javelin
    g.add(ring(.022, -.66, -.6, M.gold), ball(.016, -.67, M.gold));
    g.add(ring(.015, -.6, .86, M.wood, 10));
    g.add(wrap(-.6, -.46, .017, 5, M.cord)); g.add(wrap(-.06, .08, .017, 4, M.cord)); g.add(wrap(.72, .86, .017, 5, M.cord));
    g.add(ring(.024, .86, .91, M.gold));
    const head = lathe([[.009, .9], [.04, .97], [.042, 1.0], [0, 1.09]], M.steel, 4); head.scale.z = .55; g.add(head);
  }
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  const out = new THREE.Group(); g.rotation.x = Math.PI / 2; out.add(g); // (+y → +z: the point forward)
  out.userData.kind = kind;
  return out;
}
