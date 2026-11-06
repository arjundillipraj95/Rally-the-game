// The new captains (test): the generated, painted and rigged 3D captain in place of the built-from-parts
// one, posed every frame from the same game state the old one reads (moving, swinging, guarding, a
// heavy wind-up, a bash, a parry, reeling from a clout). On only with ?models=1 in the address (or
// localStorage 'rally.models' = '1'); off, nothing here runs and the game looks as before.
// Captains only for now: a few skinned meshes are cheap; soldiers (hundreds) need baked instancing.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TEAMS } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { scene } from './scene.js';
import { rigCaptain, addArmour, applyPose, moveAt, mixPose, CLIPS, POSES } from './rig/captainrig.js';

let on = false;
try { on = new URLSearchParams(location.search).get('models') === '1' || localStorage.getItem('rally.models') === '1'; } catch (e) { /* (no storage: off) */ }
export const heroesOn = () => on && !!SRC;

const SCALE = 1.22; // (the old captain stood about 2.4 tall; the model is 1.96)
let SRC = null;
if (on) {
  const L = new GLTFLoader(), first = g => { let m = null; g.scene.traverse(o => { if (o.isMesh && !m) m = o; }); return m; };
  Promise.all(['models/body_plain.glb', 'models/armour_segmented.glb'].map(f => L.loadAsync(f).then(first))).then(([b, a]) => {
    b.material.metalness = 0; b.material.roughness = .8; b.geometry.userData.material = b.material;
    a.material.metalness = .35; a.material.roughness = .45;
    SRC = { body: b.geometry, armour: a.geometry, armourMat: a.material };
  }).catch(e => { console.warn('captain models failed to load', e); on = false; });
}

const live = new Map(); // unit -> { R, weapon, team, run, moveName, moveT, hp }
const KIND = ['forehand', 'backhand', 'overhead', 'thrust', 'spin', 'heavy', 'bash'];
function weaponOf(u) { return u.weapon === 'spear' ? 'spear' : u.weapon === 'jav' ? 'jav' : 'sword'; }
function make(u) {
  const weapon = weaponOf(u), team = TEAMS[colorOf(u.ti)].hex;
  const R = rigCaptain(SRC.body, { team, weapon }); addArmour(R, SRC.armour, SRC.armourMat);
  R.root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
  R.root.scale.setScalar(SCALE); scene.add(R.root);
  return { R, weapon, team, run: 0, moveName: null, moveT: 0, hp: u.hp, blockHitT: -1 };
}
function drop(h) { scene.remove(h.R.root); h.R.root.traverse(o => { if (o.isMesh) o.geometry.dispose(); }); }

// pose and place one captain. a: the old renderer's state for him (lift, sink, yaw, stumble).
// Returns false when this one is left to the old renderer (models not loaded, mounted, dead).
export function drawHero(u, a, dt) {
  if (!heroesOn() || u.kind !== 'captain' || u.mounted || u.dead || u.hidden) return false;
  let h = live.get(u);
  if (h && (h.weapon !== weaponOf(u) || h.team !== TEAMS[colorOf(u.ti)].hex)) { drop(h); live.delete(u); h = null; }
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
    P = name === 'heavy' ? moveAt('heavy', .4 + .6 * t) : moveAt(name, t);
  } else if (u.parryT != null && G.T - u.parryT < .32 && G.T - u.parryT >= 0) P = moveAt('parry', (G.T - u.parryT) / .32);
  else if (blocking) P = G.T - h.blockHitT < .3 ? moveAt('block', (G.T - h.blockHitT) / .3) : POSES.guard;
  else P = mv > .05 ? mixPose(CLIPS.idle(G.T), CLIPS.run(h.run), Math.min(1, mv * 1.6)) : CLIPS.idle(G.T);
  applyPose(R, P);
  R.root.position.set(u.x, (u.y || 0) + (a.lift || 0) - (a.sink || 0) + .998 * SCALE, u.z);
  R.root.rotation.set(0, u.face + (a.yaw || 0), 0);
  R.root.visible = true;
  return true;
}
// after a frame's drawing: captains no longer drawn this way (gone, mounted, dead) are taken down
export function sweepHeroes() {
  if (!on) return;
  for (const [u, h] of live) if (h.seen !== G.T) { if (u.dead || !G.units.includes(u)) { drop(h); live.delete(u); } else h.R.root.visible = false; }
}
