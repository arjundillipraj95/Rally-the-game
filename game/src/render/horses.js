// Horses: only a handful exist at once, so each is its own small model.
// The renderer takes a list of horse poses and keeps one model per key.
import * as THREE from 'three';
import { TEAMS } from '../config.js';
import { groundY } from '../core/world.js';
import { scene, shadowsOn } from './scene.js';

const GEO = {
  torso: new THREE.SphereGeometry(1, 14, 10),
  neck: new THREE.CylinderGeometry(.2, .3, 1.0, 8),
  head: new THREE.BoxGeometry(.32, .36, .78),
  leg: new THREE.CylinderGeometry(.1, .08, 1.0, 6),
  hoof: new THREE.BoxGeometry(.16, .12, .2),
  tail: new THREE.CylinderGeometry(.06, .14, .9, 6),
  cloth: new THREE.BoxGeometry(.95, .08, .85),
  mane: new THREE.BoxGeometry(.08, .3, .9),
  shadow: new THREE.CircleGeometry(.62, 14),
};
const COATS = [0x7a4a2a, 0x3b2a20, 0xcfc4b0].map(c => new THREE.MeshLambertMaterial({ color: c }));
const maneMat = new THREE.MeshLambertMaterial({ color: 0x221812 });
const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .28, depthWrite: false });
const clothMats = TEAMS.map(t => new THREE.MeshLambertMaterial({ color: t.hex }));

function build(ti, coatI) {
  const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
  const coat = COATS[coatI % COATS.length];
  const mk = (geo, mat, parent, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); parent.add(m); return m; };
  const sh = mk(GEO.shadow, shadowMat, root, 0, .03, 0); sh.rotation.x = -Math.PI / 2; sh.scale.set(1.2, 2.2, 1);
  mk(GEO.torso, coat, body, 0, 1.35, 0).scale.set(.55, .6, 1.15);
  mk(GEO.neck, coat, body, 0, 1.85, .95).rotation.x = .65;
  mk(GEO.head, coat, body, 0, 2.25, 1.35).rotation.x = .55;
  mk(GEO.mane, maneMat, body, 0, 2.05, .8).rotation.x = .65;
  mk(GEO.tail, maneMat, body, 0, 1.35, -1.2).rotation.x = -.7;
  mk(GEO.cloth, clothMats[ti], body, 0, 1.95, -.05);
  const legs = [];
  for (const [x, z] of [[-.28, .72], [.28, .72], [-.28, -.72], [.28, -.72]]) {
    const p = new THREE.Group(); p.position.set(x, 1.05, z); body.add(p);
    mk(GEO.leg, coat, p, 0, -.5, 0); mk(GEO.hoof, maneMat, p, 0, -1.0, .03); legs.push(p);
  }
  body.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  scene.add(root);
  return { root, body, legs, sh, walk: 0 };
}

const models = new Map();
// list: [{key, ti, x, z, face, spd, state:'coming'|'ridden'|'leaving'|'dead', t, fall}]
export function drawHorses(list, dt) {
  const seen = new Set();
  for (const h of list) {
    seen.add(h.key);
    let m = models.get(h.key);
    if (!m) { m = build(h.ti, Math.abs(h.key * 7919) % 3); models.set(h.key, m); }
    m.root.position.set(h.x, groundY(h.x, h.z), h.z); m.root.rotation.y = h.face;
    m.root.visible = true; m.sh.visible = !shadowsOn();
    if (h.state === 'dead') {
      m.body.rotation.z = Math.min(1, h.t / .5) * Math.PI / 2 * .9 * (h.fall || 1);
      if (h.t > 6) m.root.position.y -= (h.t - 6) * .6;
      continue;
    }
    m.walk += dt * h.spd * 1.1;
    const a = Math.min(1, h.spd / 4) * .8;
    m.legs[0].rotation.x = m.legs[3].rotation.x = Math.sin(m.walk) * a;
    m.legs[1].rotation.x = m.legs[2].rotation.x = Math.sin(m.walk + Math.PI) * a;
    m.body.position.y = Math.abs(Math.sin(m.walk)) * .12 * Math.min(1, h.spd / 4);
    if (h.state === 'leaving') m.root.visible = h.t < 2.6;
  }
  for (const [k, m] of models) if (!seen.has(k)) { scene.remove(m.root); models.delete(k); }
}
export function clearHorses() { for (const m of models.values()) scene.remove(m.root); models.clear(); }
