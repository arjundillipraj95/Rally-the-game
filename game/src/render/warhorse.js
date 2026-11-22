// C3: the war horse (models/horse_war.glb, tools/models/titus/build_horse.py): one skinned body with a bone per leg
// part, in the old horse's frame. Each leg's bones hang from pivots named as the old horse's (leg_<k>, knee_<k>), so
// the gait (heroes.js) swings them as it did the old jointed pieces. A 'seat' marker says where the rider sits; the
// saddle cloth (material *team*) takes the rider's team colour.
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';

const LEG_KEYS = ['frontL', 'frontR', 'backL', 'backR'], _v = new THREE.Vector3();
export function warHorse(sc, scale) {
  const H = new THREE.Group(); H.rotation.x = -Math.PI / 2; H.scale.setScalar(scale); H.add(sc); // (Z-up to Y-up: the horse faces +z)
  const tpl = new THREE.Group(); tpl.add(H); tpl.updateMatrixWorld(true);
  for (const k of LEG_KEYS) {
    const hb = sc.getObjectByName('leg_' + k), kb = sc.getObjectByName('knee_' + k); if (!hb || !kb) continue;
    hb.name = 'bone_leg_' + k; kb.name = 'bone_knee_' + k;
    const piv = new THREE.Group(); piv.name = 'leg_' + k; H.add(piv); piv.position.copy(H.worldToLocal(hb.getWorldPosition(_v))); piv.updateMatrixWorld(true); piv.attach(hb);
    const kn = new THREE.Group(); kn.name = 'knee_' + k; piv.add(kn); kn.position.copy(piv.worldToLocal(kb.getWorldPosition(_v))); kn.updateMatrixWorld(true); kn.attach(kb);
  }
  for (const n of ['head', 'tail']) { // (C5: the wolf's own bones: neck and head, tail; hung from pivots too, so code can move them)
    const b = sc.getObjectByName(n); if (!b || !b.isBone) continue;
    b.name = 'bone_' + n; const piv = new THREE.Group(); piv.name = 'pv_' + n; H.add(piv); piv.position.copy(H.worldToLocal(b.getWorldPosition(_v))); piv.updateMatrixWorld(true); piv.attach(b);
  }
  tpl.traverse(o => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; if (o.material) { o.material.metalness = 0; o.material.roughness = .8; } } });
  tpl.updateMatrixWorld(true);
  const s = sc.getObjectByName('seat'), p = s ? s.getWorldPosition(new THREE.Vector3()) : new THREE.Vector3(0, 2.28 * scale, -.08 * scale);
  return { tpl, seat: { top: p.y, z: p.z } };
}
// a copy for one horse, its saddle cloth in the team's colour (none: as modelled)
export function cloneHorse(tpl, team = null) {
  const c = cloneSkinned(tpl);
  if (team != null) c.traverse(o => { if (o.isMesh && /team/i.test(o.material.name)) { o.material = o.material.clone(); o.material.color.set(team); } });
  return c;
}
