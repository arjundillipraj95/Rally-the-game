// The new captains: the generated, painted and rigged 3D captain in place of the built-from-parts
// one, posed every frame from the same game state the old one reads (moving, swinging, guarding, a
// heavy wind-up, a bash, a parry, reeling from a clout). On by default; ?models=0 in the address (or
// localStorage 'rally.models' = '0') turns it off and the game looks as before.
// Captains only for now: a few skinned meshes are cheap; soldiers (hundreds) need baked instancing.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TEAMS } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { scene } from './scene.js';
import { rigCaptain, addArmour, applyPose, moveAt, mixPose, CLIPS, POSES } from './rig/captainrig.js';

// the warhorse's leg joints, in its own (Z-up) model space: each leg swings from the top of its upper part
const LEGS = { frontL: [-.34, -.63, 1.2], frontR: [.34, -.63, 1.2], backL: [-.36, .58, 1.2], backR: [.36, .58, 1.2] };
const HORSE_SCALE = .75; // (the raw horse is about 3.2 units long; a man on foot is about 2.4 in game)
const SEAT = 1.0; // (the rider's root height on the saddle, in world units)

let on = false;
try { on = new URLSearchParams(location.search).get('models') !== '0' && localStorage.getItem('rally.models') !== '0'; } catch (e) { /* (no storage: on) */ }
export const heroesOn = () => on && !!SRC;

const SCALE = 1.22; // (the old captain stood about 2.4 tall; the model is 1.96)
const SOLDIER_SCALE = .8; // (a foot soldier stands about 80% of the captain's height)
let SRC = null;
if (on) {
  const L = new GLTFLoader(), first = g => { let m = null; g.scene.traverse(o => { if (o.isMesh && !m) m = o; }); return m; };
  Promise.all([...['models/body_plain.glb', 'models/armour_segmented.glb', 'models/soldier.glb'].map(f => L.loadAsync(f).then(first)), L.loadAsync('models/pack/captain_shield_red_scutum.glb').then(g => g.scene), L.loadAsync('models/horse.glb').then(g => g.scene)]).then(([b, a, sd, shield, horse]) => {
    sd.material.metalness = 0; sd.material.roughness = .8; sd.geometry.userData.material = sd.material;
    b.material.metalness = 0; b.material.roughness = .8; b.geometry.userData.material = b.material;
    a.material.metalness = .35; a.material.roughness = .45;
    SRC = { body: b.geometry, armour: a.geometry, armourMat: a.material, soldier: sd.geometry, pack: { shield }, horse: horseTemplate(horse) }; // (the equipment pack's scutum, in team colour)
  }).catch(e => { console.warn('captain models failed to load', e); on = false; });
}

// the warhorse, built once: its legs are regrouped under joints so they can swing; each rider gets a copy
function horseTemplate(sc) {
  const H = new THREE.Group(); H.rotation.x = -Math.PI / 2; H.scale.setScalar(HORSE_SCALE); // (Z-up to Y-up: the horse faces +z)
  const pivots = {}, body = new THREE.Group(); H.add(body);
  for (const k of Object.keys(LEGS)) { const p = new THREE.Group(); p.name = 'leg_' + k; p.position.set(...LEGS[k]); H.add(p); pivots[k] = p; }
  const meshes = []; sc.traverse(o => { if (o.isMesh) meshes.push(o); });
  for (const m of meshes) {
    const k = Object.keys(LEGS).find(k => m.name.startsWith(k + '_'));
    if (k) { m.position.set(-LEGS[k][0], -LEGS[k][1], -LEGS[k][2]); pivots[k].add(m); } else body.add(m);
  }
  const tpl = new THREE.Group(); tpl.add(H); return tpl;
}
const live = new Map(); // unit -> { R, weapon, team, run, moveName, moveT, hp, sc, U, legs }
const KIND = ['forehand', 'backhand', 'overhead', 'thrust', 'spin', 'heavy', 'bash'];
function weaponOf(u) { return u.kind === 'arch' ? 'bow' : u.weapon === 'spear' ? 'spear' : u.weapon === 'jav' ? 'jav' : 'sword'; }
function make(u) {
  const weapon = weaponOf(u), team = TEAMS[colorOf(u.ti)].hex, soldier = u.kind !== 'captain';
  const R = soldier ? rigCaptain(SRC.soldier, { body: 'soldier', team, weapon, pack: u.kind === 'arch' ? { noShield: true } : { shield: SRC.pack.shield } })
    : rigCaptain(SRC.body, { team, weapon, pack: SRC.pack });
  if (!soldier) addArmour(R, SRC.armour, SRC.armourMat);
  R.root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
  const sc = soldier ? SCALE * SOLDIER_SCALE : SCALE;
  R.root.scale.setScalar(sc);
  const h = { R, weapon, team, run: 0, moveName: null, moveT: 0, hp: u.hp, blockHitT: -1, sc, mounted: !!u.mounted, U: null, legs: null };
  if (u.mounted) { // on the warhorse: the rider sits on the saddle, and the unit moves as one
    const hc = SRC.horse.clone(true), U = new THREE.Group();
    U.add(hc); U.add(R.root); R.root.position.set(0, SEAT, 0);
    h.U = U; h.legs = {}; for (const k of Object.keys(LEGS)) h.legs[k] = hc.getObjectByName('leg_' + k);
    scene.add(U);
  } else scene.add(R.root);
  return h;
}
function drop(h) {
  scene.remove(h.U || h.R.root);
  h.R.root.traverse(o => { if (o.isMesh) o.geometry.dispose(); }); // (the horse's geometry is shared: only the rider's is freed)
}

// pose and place one captain. a: the old renderer's state for him (lift, sink, yaw, stumble).
// Returns false when this one is left to the old renderer (models not loaded, mounted, dead).
export function drawHero(u, a, dt) {
  if (!heroesOn() || (u.kind !== 'captain' && u.kind !== 'foot' && u.kind !== 'arch') || u.dead || u.hidden) return false;
  let h = live.get(u);
  if (h && (h.weapon !== weaponOf(u) || h.team !== TEAMS[colorOf(u.ti)].hex || h.mounted !== !!u.mounted)) { drop(h); live.delete(u); h = null; }
  if (!h) { h = make(u); live.set(u, h); }
  h.seen = G.T;
  const R = h.R, sp = Math.hypot(u.vx || 0, u.vz || 0), mv = Math.min(1, sp / 4);
  h.run += dt * (.55 + sp * .12); // (the stride keeps time with his speed)
  const blocking = (u.human && u.blocking) || u.blockT > 0;
  if (blocking && u.hp < h.hp - .5) h.blockHitT = G.T; // (a blow taken on the shield: it jolts)
  h.hp = u.hp;
  let P;
  if (a.stumble > 0) P = moveAt('stagger', Math.min(1, 1 - a.stumble / .4) * .7);
  else if (u.windup > 0) P = moveAt('heavy', .4); // (wound up, weapon high, the glint coming)
  else if (u.swing > 0) {
    const t = 1 - u.swing / .38, k = u.swingKind | 0;
    let name = KIND[k] || 'forehand';
    if (h.weapon !== 'sword' && k <= 2) name = 'thrust'; // (spear and javelin: they stab)
    if (h.weapon === 'bow') name = null; // (the archer looses: the bow held up)
    P = name === null ? POSES.guard : name === 'heavy' ? moveAt('heavy', .4 + .6 * t) : moveAt(name, t);
  } else if (u.parryT != null && G.T - u.parryT < .32 && G.T - u.parryT >= 0) P = moveAt('parry', (G.T - u.parryT) / .32);
  else if (blocking) P = G.T - h.blockHitT < .3 ? moveAt('block', (G.T - h.blockHitT) / .3) : POSES.guard;
  else P = mv > .05 ? mixPose(CLIPS.idle(G.T), CLIPS.run(h.run), Math.min(1, mv * 1.6)) : CLIPS.idle(G.T);
  applyPose(R, P);
  const top = h.U || R.root; // (mounted: the horse and rider move together, their feet on the ground)
  top.position.set(u.x, (u.y || 0) + (a.lift || 0) - (a.sink || 0) + (h.U ? 0 : .998 * h.sc), u.z);
  top.rotation.set(0, u.face + (a.yaw || 0), 0);
  top.visible = true;
  if (h.legs) { // the horse's legs swing in a trot, in diagonal pairs, and stand still when he does
    const amp = mv * .5, ph = h.run * 5;
    for (const k of Object.keys(h.legs)) h.legs[k].rotation.x = amp * Math.sin(ph + ((k === 'frontL' || k === 'backR') ? 0 : Math.PI)) ;
  }
  return true;
}
// after a frame's drawing: captains no longer drawn this way (gone, mounted, dead) are taken down
export function sweepHeroes() {
  if (!on) return;
  for (const [u, h] of live) if (h.seen !== G.T) { if (u.dead || !G.units.includes(u)) { drop(h); live.delete(u); } else (h.U || h.R.root).visible = false; }
}
