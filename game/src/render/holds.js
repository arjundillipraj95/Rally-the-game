// The map's holdings (the Desert's oasis, the Valley's villages): a broad ring on the ground and a tall
// banner, both in the colour of the side that holds it (pale while nobody does), pulsing gold while
// it's being taken or fought over.
import * as THREE from 'three';
import { TEAMS } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { terrainMeshY } from '../core/world.js';

let objs = [];
const neutral = new THREE.Color(0xe8e2d0), gold = new THREE.Color(0xffcf3a), tmp = new THREE.Color();
// an alliance's colour as this player sees it: your own colour for your side, else its first castle's
export function sideCss(a) { if (a < 0) return '#e8e2d0'; if (a === G.ALLY[colorOf(G.myTi)]) return TEAMS[colorOf(G.myTi)].css; const i = G.ALLY.findIndex(x => x === a); return TEAMS[Math.max(0, i)].css; }
export function buildHolds(world, L) {
  objs = (L.holds || []).map(h => {
    const grp = new THREE.Group(); world.add(grp);
    const ring = new THREE.Mesh(new THREE.RingGeometry(h.r - .55, h.r, 64), new THREE.MeshBasicMaterial({ color: neutral, transparent: true, opacity: .4, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(h.x, terrainMeshY(h.x, h.z) + .08, h.z); ring.renderOrder = 1; grp.add(ring);
    const px = h.px ?? h.x, pz = h.pz ?? h.z, py = terrainMeshY(px, pz);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.12, .14, 6.5, 6), new THREE.MeshLambertMaterial({ color: 0x6a4e34 })); pole.position.set(px, py + 3.25, pz); pole.castShadow = true; grp.add(pole);
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.4, 6, 1), new THREE.MeshLambertMaterial({ color: neutral, side: THREE.DoubleSide })); cloth.position.set(px + 1.1, py + 5.6, pz); cloth.castShadow = true; grp.add(cloth);
    return { grp, ring, cloth, base: cloth.geometry.attributes.position.array.slice() };
  });
}
export function updateHolds() {
  const hs = G.holds; if (!hs) return;
  objs.forEach((o, i) => {
    const h = hs[i]; if (!h) return;
    tmp.set(h.owner >= 0 ? sideCss(h.owner) : '#e8e2d0');
    const busy = h.contested || (h.cap >= 0 && h.prog > 0);
    o.cloth.material.color.lerp(tmp, .08);
    o.ring.material.color.lerp(busy ? gold : tmp, .12);
    o.ring.material.opacity = busy ? .45 + Math.sin(G.T * 7) * .2 : h.owner >= 0 ? .5 : .32;
    // the banner ripples
    const p = o.cloth.geometry.attributes.position, b = o.base;
    for (let k = 0; k < p.count; k++) p.array[k * 3 + 2] = b[k * 3 + 2] + Math.sin(G.T * 4 + b[k * 3] * 2.2 + i) * .12 * (b[k * 3] + 1.1) / 2.2;
    p.needsUpdate = true;
  });
}
export function clearHolds() { objs = []; }
