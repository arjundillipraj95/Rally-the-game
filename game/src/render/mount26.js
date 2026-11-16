// MAP2 the relaunch's mountain (?map26=1): what render/mountain.js doesn't already draw. The country walls (stone,
// behind each side's castles and out to the cliff) and each side's nexus (a stand-in banner on a stone plinth, in the
// side's colour; its look comes with the castles step). Merged into as few draws as the batching allows.
import * as THREE from 'three';
import { batchOn, mergeInto } from './batch.js';
import { TEAMS, CROWN26 } from '../config.js';
import { terrainMeshY } from '../core/world.js';
import { stoneTex, woodTex } from './look.js';

const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial(Object.assign({ color, map: map || null }, extra));
const merged = (grp, parts) => { for (const p of parts) { p.castShadow = p.receiveShadow = true; grp.add(p); }
  if (batchOn()) { const one = mergeInto(parts, grp); for (const p of parts) grp.remove(p); for (const m of one) grp.add(m); } };

export function buildMount26(grp, L) {
  const stone = lam(0x9a9384, stoneTex()), cap = lam(0x7d776a, stoneTex()), wood = lam(0x55402a, woodTex()), H = CROWN26.wallH;
  // the country walls: a block of stone and a cap per wall stone the rules placed
  { const parts = [], wallG = new THREE.BoxGeometry(1.25, H + .6, .9), capG = new THREE.BoxGeometry(1.3, .22, 1.1);
    const stones = L.obstacles.filter(o => o.country != null);
    for (const o of stones) {
      const y = terrainMeshY(o.x, o.z), nb = stones.find(p => p !== o && p.country === o.country && Math.hypot(p.x - o.x, p.z - o.z) < 1.6);
      const rot = nb ? -Math.atan2(nb.z - o.z, nb.x - o.x) : -Math.atan2(o.z, o.x) + Math.PI / 2; // (along the wall, toward the next stone)
      const w = new THREE.Mesh(wallG, stone); w.position.set(o.x, y + H / 2 - .3, o.z); w.rotation.y = rot; parts.push(w);
      const c = new THREE.Mesh(capG, cap); c.position.set(o.x, y + H + .1, o.z); c.rotation.y = rot; parts.push(c); }
    merged(grp, parts); }
  // the nexus: a stone plinth, a pole and the side's banner
  { const parts = [], plinthG = new THREE.CylinderGeometry(2, 2.3, 1.2, 10), poleG = new THREE.CylinderGeometry(.16, .2, 9, 8), flags = [];
    for (const n of L.nexus) { const y = terrainMeshY(n.x, n.z);
      const p = new THREE.Mesh(plinthG, stone); p.position.set(n.x, y + .5, n.z); parts.push(p);
      const pole = new THREE.Mesh(poleG, wood); pole.position.set(n.x, y + 5.4, n.z); parts.push(pole);
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.4), lam(TEAMS[n.c].hex, null, { side: THREE.DoubleSide }));
      flag.position.set(n.x + Math.cos(n.a + Math.PI / 2) * 1.8, y + 8.4, n.z + Math.sin(n.a + Math.PI / 2) * 1.8); flag.rotation.y = -n.a; flag.castShadow = true;
      grp.add(flag); flags.push(flag); }
    merged(grp, parts); return { flags }; }
}
// the torch posts on the new mountain: one draw for all of them when batching (there are more bridges to light)
export function mergePosts(grp, posts) { if (!batchOn()) return; const one = mergeInto(posts, grp); for (const p of posts) grp.remove(p); for (const m of one) grp.add(m); }
