// FEEL2g her draw on horseback, on her own phone: a wedge on the ground toward what the bow will shoot, narrowing as the
// draw fills; gold while a release is 'perfect' (let go now), dull red once her arm tires. Rules: core/sim/mountdraw.js.
import * as THREE from 'three';
import { G } from '../core/state.js';
import { groundY } from '../core/world.js';
import { scene } from '../render/scene.js';
import { RANGED } from '../config.js';
import { rangedOf, rangedTarget, rangeOf } from '../core/sim/ranged.js';
import { drawFull, drawQuality } from '../core/sim/mountdraw.js';

const D = RANGED.draw, W = RANGED.drawAim;
const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: W.opacity, depthWrite: false, depthTest: false, side: THREE.DoubleSide });
const geo = new THREE.CircleGeometry(1, 24, -Math.PI / 2 - .5, 1); geo.rotateX(-Math.PI / 2); // (a unit wedge, opening along +z; scaled each frame)
const wedge = new THREE.Mesh(geo, mat); wedge.renderOrder = 3; wedge.visible = false; scene.add(wedge);
export function drawDrawAim() {
  const p = G.player; wedge.visible = false;
  if (!p || p.dead || !p.mounted || !rangedOf(p) || !(p.drawT > D.tap) || G.state !== 'play') return;
  const R = rangeOf(p), tg = rangedTarget(p, R * D.rangeX), q = drawQuality(p, p.drawT), k = Math.min(1, p.drawT / drawFull(p));
  const a = tg ? Math.atan2(tg.x - p.x, tg.z - p.z) : p.face, half = W.wide + (W.narrow - W.wide) * k;
  const g = wedge.geometry; if (g.userData.half !== half) { g.dispose(); const n = new THREE.CircleGeometry(1, 24, -Math.PI / 2 - half, half * 2); n.rotateX(-Math.PI / 2); n.userData.half = half; wedge.geometry = n; }
  wedge.visible = true; wedge.position.set(p.x, groundY(p.x, p.z) + .18, p.z); wedge.rotation.y = a; wedge.scale.setScalar(R * (q === 'perfect' ? D.rangeX : 1));
  mat.color.setHex(q === 'perfect' ? 0xffd23a : q === 'tired' ? 0xb05a4a : 0xffffff);
  mat.opacity = q === 'perfect' ? W.opacity + .15 * Math.sin(performance.now() / 45) : W.opacity;
}
