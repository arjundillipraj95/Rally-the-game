// The new captains: the generated, painted and rigged 3D captain in place of the built-from-parts
// one, posed every frame from the same game state the old one reads (moving, swinging, guarding, a
// heavy wind-up, a bash, a parry, reeling from a clout). On by default; ?models=0 in the address (or
// localStorage 'rally.models' = '0') turns it off and the game looks as before.
// Captains only for now: a few skinned meshes are cheap; soldiers (hundreds) need baked instancing.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TEAMS, NEUTRAL, ANIM } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { scene } from './scene.js';
import { groundY } from '../core/world.js';
import { rigCaptain, addArmour, applyPose, moveAt, mixPose, CLIPS, POSES, teamMaterial } from './rig/captainrig.js';
import { loadClipBody, rigClip, addClipArmour, play, tick, head, ended } from './rig/cliprig.js';
import { SLOTS, SLOT_IX } from '../core/look.js';
import { canBrace } from '../core/sim.js';
import { batchOn, abOn, abOld } from './batch.js';
import { foldGear, foldShow } from './rig/fold.js';

// the warhorse's leg joints, in its own (Z-up) model space: each leg swings from the top of its upper part
const LEGS = { frontL: [-.34, -.63, 1.2], frontR: [.34, -.63, 1.2], backL: [-.36, .58, 1.2], backR: [.36, .58, 1.2] };
const HORSE_SCALE = .85; // (the raw horse is about 3.2 units long; a man on foot is about 2.4 in game)
// the saddle seat, in the horse's raw model: its top 2.28 up, its middle .08 behind centre (raw +y is backward)
const SEAT_TOP = 2.28 * HORSE_SCALE, SEAT_Z = -.08 * HORSE_SCALE;
// the legs of a rider in the saddle: thighs forward over the horse, shins bent down its flanks
const RIDE = { thigh_L: [-1.25, 0, 0], thigh_R: [-1.25, 0, 0], shin_L: [1.45, 0, 0], shin_R: [1.45, 0, 0] };

let on = false;
try { on = new URLSearchParams(location.search).get('models') !== '0' && localStorage.getItem('rally.models') !== '0'; } catch (e) { /* (no storage: on) */ }
export const heroesOn = () => on && !!SRC;
// F8: captains move by real clips. ?clips=0 (or localStorage 'rally.clips' = '0') puts back the code-posed captain, to compare.
let clipsOn = true;
try { clipsOn = new URLSearchParams(location.search).get('clips') !== '0' && localStorage.getItem('rally.clips') !== '0'; } catch (e) { /* on */ }

const SCALE = 1.22; // (the old captain stood about 2.4 tall; the model is 1.96)
const SOLDIER_SCALE = .8; // (a foot soldier stands about 80% of the captain's height)
let SRC = null;
// the look's choices (core/look.js) become pack pieces: helmet, armour and shield. The weapon stays the
// one you fight with (gameplay), so it is not a look here.
const PACK = { helmet: ['blue_crest', 'gold_ridge', 'red_crest'], shield: ['red_scutum', 'blue_oval', 'blue_kite'] };
// the armour choices: the painted armour in its finishes (C2: 'Burnished iron', once 'Leather & fur', is dark worked iron; 'leather' stays for the archers' jerkin) (the tint multiplies its painted steel)
const ARMOUR_FINISH = { steel: [0xffffff, .35, .45], bronze: [0xe0a458, .55, .38], leather: [0x9a6238, 0, .85], iron: [0xb4a08c, .65, .32], black: [0x3b3e46, .6, .3] };
// C1: a helmet's metal (dome, cheek guards) is the colour of the armour finish the player picked
const HELM_METAL = { steel: 0xc4cad2, bronze: 0xc8903c, iron: 0x8a7664, leather: 0x8a7664, black: 0x3b3e46 };
// C4: 0 = none, 1 = long, 2 = short (the retired mantle and ermine, in an old saved outfit, are worn as the long cape)
const capeOf = L => { if (!L) return 0; const n = pick('cape', L[SLOT_IX.cape]); return /^no /i.test(n) ? 0 : /short/i.test(n) ? 2 : 1; };
const pick = (slot, i) => (SLOTS[SLOT_IX[slot]].items[i] || {}).name || '';
// three Roman helmets, one file each; a retired helmet in a saved outfit is worn as the plain galea
function helmFile(name) { if (/gild/i.test(name)) return 'gold_ridge'; if (/plumed/i.test(name)) return 'blue_crest'; return 'red_crest'; }
function armourFile(name) { if (/bronze/i.test(name)) return 'bronze'; if (/burnish/i.test(name)) return 'iron'; if (/leather|fur/i.test(name)) return 'leather'; if (/black/i.test(name)) return 'black'; return 'steel'; }
function shieldFile(name) { if (/hoplon|oval/i.test(name)) return 'blue_oval'; if (/round|kite/i.test(name)) return 'blue_kite'; return 'red_scutum'; }
if (on) {
  const L = new GLTFLoader(), first = g => { let m = null; g.scene.traverse(o => { if (o.isMesh && !m) m = o; }); return m; };
  const scene$ = f => L.loadAsync(f).then(g => g.scene), mesh$ = f => L.loadAsync(f).then(first);
  Promise.all([
    loadClipBody(ANIM.file), ...['models/soldier.glb', 'models/armour_segmented.glb'].map(mesh$),
    ...PACK.helmet.map(n => scene$(`models/pack/captain_helmet_${n}.glb`)),
    ...PACK.shield.map(n => scene$(`models/pack/captain_shield_${n}.glb`)),
    scene$('models/horse.glb'), mesh$('models/soldier_lod.glb')
  ]).then(all => {
    const [cap, sd, ar, ...rest] = all, b = cap.mesh, helmets = rest.slice(0, 3), shields = rest.slice(3, 6), horse = rest[6], lod = rest[7].geometry;
    { const P = lod.attributes.position; let x0 = 1e9, x1 = -1e9; for (let i = 0; i < P.count; i++) { const y = P.getY(i); if (y > -.2 && y < -.15) { x0 = Math.min(x0, P.getX(i)); x1 = Math.max(x1, P.getX(i)); } } if (x1 > x0) lod.translate(-(x0 + x1) / 2, 0, 0); } // (centred on the waist, as the rig centres the full one)
    sd.material.metalness = 0; sd.material.roughness = .8; sd.geometry.userData.material = sd.material;
    const by = (list, names) => Object.fromEntries(names.map((n, i) => [n, list[i]]));
    SRC = { cap, body: b.geometry, soldier: sd.geometry, soldierMat: sd.material, lod, horse: horseTemplate(horse),
      armours: Object.fromEntries(Object.entries(ARMOUR_FINISH).map(([n, [c, mt, rg]]) => { const m = ar.material.clone(); m.color.set(c); m.metalness = mt; m.roughness = rg; return [n, { geo: ar.geometry, mat: m }]; })),
      helmets: by(helmets, PACK.helmet), shields: by(shields, PACK.shield) };
  }).catch(e => { console.warn('captain models failed to load', e); on = false; });
}

// the warhorse, built once: its legs are regrouped under joints so they can swing; each rider gets a copy
function horseTemplate(sc) {
  const H = new THREE.Group(); H.rotation.x = -Math.PI / 2; H.scale.setScalar(HORSE_SCALE); // (Z-up to Y-up: the horse faces +z)
  const pivots = {}, body = new THREE.Group(); H.add(body);
  for (const k of Object.keys(LEGS)) { const p = new THREE.Group(); p.name = 'leg_' + k; p.position.set(...LEGS[k]); H.add(p); pivots[k] = p; }
  const meshes = []; sc.traverse(o => { if (o.isMesh) meshes.push(o); });
  // each leg: the upper part swings from the shoulder or hip; the rest (leg, sock, hoof) from a knee at
  // the top of the lower leg, so it can fold as the hoof lifts
  const knees = {};
  for (const k of Object.keys(LEGS)) {
    const low = meshes.find(m => m.name === k + '_leg'); if (!low) continue;
    low.geometry.computeBoundingBox(); const b = low.geometry.boundingBox, at = [(b.min.x + b.max.x) / 2, (b.min.y + b.max.y) / 2, b.max.z - .04];
    const kn = new THREE.Group(); kn.name = 'knee_' + k; kn.position.set(at[0] - LEGS[k][0], at[1] - LEGS[k][1], at[2] - LEGS[k][2]); pivots[k].add(kn); knees[k] = { g: kn, at };
  }
  for (const m of meshes) {
    const k = Object.keys(LEGS).find(k => m.name.startsWith(k + '_'));
    if (k && knees[k] && !m.name.endsWith('_upper')) { const a = knees[k].at; m.position.set(-a[0], -a[1], -a[2]); knees[k].g.add(m); }
    else if (k) { m.position.set(-LEGS[k][0], -LEGS[k][1], -LEGS[k][2]); pivots[k].add(m); } else body.add(m);
  }
  const tpl = new THREE.Group(); tpl.add(H); return tpl;
}
let FRAME = 0; // (frames drawn: what was drawn this frame stays up, the rest is taken down)
const live = new Map(); // unit -> { R, weapon, team, run, moveName, moveT, hp, sc, U, legs }
const KIND = ['forehand', 'backhand', 'overhead', 'thrust', 'spin', 'heavy', 'bash'];
// the Arms upgrade (tier 1+) puts a spear in the hand of a footman, and of a captain who has not picked one
function weaponOf(u) { if (u.kind === 'arch') return 'bow'; if (u.weapon) return u.weapon === 'spear' ? 'spear' : u.weapon === 'jav' ? 'jav' : 'sword'; return u.tier >= 1 ? 'spear' : 'sword'; }
// the look chosen for this unit's team (the wardrobe): helmet, armour and shield come from it
const lookOf = u => (G.looks && G.looks[u.ti]) || null;
// the colour an army's cloth, shield face and hood are tinted to: its team's, or the neutral grey (M1: the mountain's garrisons and camps)
const hexOf = u => u.neutral ? NEUTRAL.hex : TEAMS[colorOf(u.ti)].hex;
const keyOf = u => { const L = lookOf(u); return [hexOf(u), u.kind, u.tier | 0, L ? [L[SLOT_IX.helm], L[SLOT_IX.armour], L[SLOT_IX.shield], L[SLOT_IX.cape]].join('.') : ''].join('|'); };
function make(u) {
  const weapon = weaponOf(u), team = hexOf(u), soldier = u.kind !== 'captain', L = lookOf(u);
  const shieldName = L ? pick('shield', L[SLOT_IX.shield]) : '', shield = SRC.shields[shieldFile(shieldName)];
  const R = soldier ? rigCaptain(SRC.soldier, { body: 'soldier', team, weapon, pack: u.kind === 'arch' ? { noShield: true } : { shield } })
    : (clipsOn ? rigClip : rigCaptain)(clipsOn ? SRC.cap : SRC.body, { team, weapon, pack: { shield, helmet: L ? SRC.helmets[helmFile(pick('helm', L[SLOT_IX.helm]))] || null : SRC.helmets.red_crest, cape: capeOf(L), helmetMetal: HELM_METAL[armourFile(L ? pick('armour', L[SLOT_IX.armour]) : '')] } });
  if (!soldier) { const a = SRC.armours[armourFile(L ? pick('armour', L[SLOT_IX.armour]) : '')]; (R.clip ? addClipArmour : addArmour)(R, a.geo, a.mat); }
  else if ((u.kind === 'foot' && u.tier >= 2) || u.neutral) { const a = SRC.armours[armourFile(L ? pick('armour', L[SLOT_IX.armour]) : '')]; addArmour(R, a.geo, a.mat); } // (the Armour upgrade: your army's armour over the tunic; the mountain's neutral soldiers always wear the steel, M1)
  if (u.kind === 'arch') archerGear(R, team, u.tier | 0);
  R.root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
  const sc = soldier ? SCALE * SOLDIER_SCALE : SCALE;
  R.root.scale.setScalar(sc);
  const fold = batchOn() ? foldGear(R, [R.shield, R.cape]) : null; // (F1b: his gear in one or two draws; ?f1=0 the old pieces)
  const h = { R, fold, weapon, team, key: keyOf(u), run: 0, moveName: null, moveT: 0, hp: u.hp, blockHitT: -1, sc, mounted: !!u.mounted, U: null, legs: null };
  if (u.mounted) { // on the warhorse: the rider sits on the saddle, and the unit moves as one
    const hc = SRC.horse.clone(true), U = new THREE.Group();
    U.add(hc); U.add(R.root); R.root.position.set(0, SEAT_TOP + (.38 + .04) * sc, SEAT_Z); // (his hips, .38 below his root, on the seat)
    h.U = U; h.legs = legsOf(hc);
    scene.add(U);
  } else scene.add(R.root);
  return h;
}
// the archer, told apart from a footman at a glance: a soft hood in his army's colour over the helmet
// with its tip falling forward, and a quiver of white-fletched arrows across his back. Training adds a
// leather jerkin; Marksman a tall white feather in the hood.
const ARCH = { hood: null, tip: null, quiver: null, fletch: null, plume: null, leather: null };
function archerGear(R, team, tier) {
  if (!ARCH.hood) {
    ARCH.hood = new THREE.SphereGeometry(.3, 18, 10, 0, Math.PI * 2, 0, Math.PI * .58);
    ARCH.tip = new THREE.ConeGeometry(.13, .34, 10); ARCH.tip.translate(0, .17, 0);
    ARCH.quiver = new THREE.CylinderGeometry(.075, .06, .52, 10); ARCH.fletch = new THREE.ConeGeometry(.05, .12, 6);
    ARCH.plume = new THREE.ConeGeometry(.035, .42, 6); ARCH.plume.translate(0, .21, 0);
    ARCH.wood = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: .85 }); ARCH.white = new THREE.MeshStandardMaterial({ color: 0xf4f0e6, roughness: .9 });
  }
  const cloth = new THREE.MeshStandardMaterial({ color: team, roughness: .9 }), head = R.bones.head, chest = R.bones.chest;
  const hood = new THREE.Mesh(ARCH.hood, cloth); hood.position.set(0, .29, -.04); hood.scale.set(1.3, 1.22, 1.36); hood.rotation.x = -.22; head.add(hood);
  const tip = new THREE.Mesh(ARCH.tip, cloth); tip.position.set(0, .25, -.02); tip.rotation.x = 1.25; hood.add(tip); // (the Phrygian point, flopped forward)
  const q = new THREE.Group(); q.position.set(.06, .02, -.2); q.rotation.set(-.15, 0, -.45); chest.add(q); // (across the back, top over his right shoulder)
  q.add(new THREE.Mesh(ARCH.quiver, ARCH.wood));
  for (let i = 0; i < 4; i++) { const f = new THREE.Mesh(ARCH.fletch, ARCH.white); f.position.set((i % 2 - .5) * .06, .31 + (i >> 1) * .03, (i >> 1) * .05 - .025); q.add(f); }
  if (tier >= 1) addArmour(R, SRC.armours.leather.geo, SRC.armours.leather.mat);
  if (tier >= 2) { const p = new THREE.Mesh(ARCH.plume, ARCH.white); p.position.set(.12, .12, -.05); p.rotation.set(-.35, 0, -.3); hood.add(p); }
}
const legsOf = hc => ({ hip: Object.fromEntries(Object.keys(LEGS).map(k => [k, hc.getObjectByName('leg_' + k)])), knee: Object.fromEntries(Object.keys(LEGS).map(k => [k, hc.getObjectByName('knee_' + k)])), body: hc.children[0], gp: 0, vs: 0, acc: 0, pitch: 0 });
// the horse's gaits, by speed: a four-beat walk, a two-beat trot in diagonal pairs, and the gallop (hind
// pair, then front pair, a moment with all four off the ground). Per gait: distance covered per stride,
// how far each leg swings, the share of the stride a hoof is down, the body's rise and rock, and when
// each leg's hoof strikes the ground (share of the stride).
const GAITS = [
  { v: 0, stride: 2.0, amp: .3, stance: .65, bob: .025, bobN: 2, rock: .015, at: { backL: 0, frontL: .25, backR: .5, frontR: .75 } },
  { v: 4, stride: 3.0, amp: .45, stance: .5, bob: .07, bobN: 2, rock: .02, at: { frontL: 0, backR: 0, frontR: .5, backL: .5 } },
  { v: 9, stride: 5.5, amp: .72, stance: .38, bob: .13, bobN: 1, rock: .075, at: { backL: 0, backR: .1, frontL: .42, frontR: .52 } },
];
const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
// one leg through its stride: down, swept from front to back as the body passes over; then up, the knee
// folding, and swung forward for the next strike. Returns [hip angle, knee fold] (+: back).
function legAt(ph, g, front) {
  if (ph < g.stance) return [g.amp * (-1 + 2 * ph / g.stance), 0];
  const s = (ph - g.stance) / (1 - g.stance);
  return [g.amp * (1 - 2 * sstep(0, 1, s)), Math.sin(Math.PI * s) * (front ? 1.25 : .9) * Math.min(1, g.amp * 1.8)];
}
// move a horse's legs and body for its speed this frame; returns the body's rise and pitch (nose down +)
function gait(L, sp, dt) {
  const prev = L.vs; L.vs += (sp - L.vs) * Math.min(1, dt * 4); // (the gait follows the speed a little behind, so it shifts gear, not snaps)
  L.acc += ((L.vs - prev) / Math.max(dt, 1e-3) - L.acc) * Math.min(1, dt * 5);
  const v = L.vs, w2 = sstep(6.5, 9.5, v), w1 = sstep(2, 4, v) * (1 - w2), w0 = 1 - w1 - w2, W = [w0, w1, w2];
  const stride = W.reduce((s, w, i) => s + w * GAITS[i].stride, 0) * (1 + w2 * Math.max(0, v - 9) * .05), still = Math.min(1, v / .6);
  L.gp = (L.gp + dt * sp / stride) % 1;
  for (const k in L.hip) {
    let hip = 0, knee = 0; const front = k[0] === 'f';
    GAITS.forEach((g, i) => { if (W[i] < .001) return; const [a, b] = legAt(((L.gp - g.at[k]) % 1 + 1) % 1, g, front); hip += W[i] * a; knee += W[i] * b; });
    if (L.hip[k]) L.hip[k].rotation.x = hip * still;
    if (L.knee[k]) L.knee[k].rotation.x = (front ? 1 : -.7) * knee * still; // (the foreleg's knee folds back; the hind hock the other way)
  }
  let bob = 0, rock = 0;
  GAITS.forEach((g, i) => { bob += W[i] * g.bob * Math.abs(Math.sin(Math.PI * g.bobN * L.gp)); rock += W[i] * g.rock * Math.sin(Math.PI * 2 * L.gp + .6); });
  L.pitch += (Math.max(-.12, Math.min(.12, -L.acc * .012)) - L.pitch) * Math.min(1, dt * 3); // (gathers and leans in as it picks up speed, sits back as it pulls up)
  return [bob * still, rock * still + L.pitch];
}
// the horses without a rider on them (galloping in when called, leaving, fallen): the new warhorse too.
// Ridden ones are drawn with their rider (drawHero). Returns false when the old horses should be drawn.
const freeH = new Map();
export function drawFreeHorses(list, dt) {
  if (!on) return false;
  if (!SRC) return true; // (still loading: no horse rather than the old one)
  const seen = new Set();
  for (const h of list) {
    if (h.state === 'ridden') continue;
    seen.add(h.key);
    let m = freeH.get(h.key);
    if (!m) { const hc = SRC.horse.clone(true); hc.traverse(o => { if (o.isMesh) o.castShadow = true; }); scene.add(hc); m = { root: hc, legs: legsOf(hc), run: 0 }; freeH.set(h.key, m); }
    const sp = h.spd || 0; m.run += dt * (.55 + sp * .12);
    const down = h.state === 'dead' ? Math.min(1, (h.t || 0) * 2.5) : 0; // (a fallen horse rolls onto its side)
    const [bob, pitch] = gait(m.legs, down ? 0 : sp, dt);
    m.root.position.set(h.x, groundY(h.x, h.z) + bob, h.z);
    m.root.rotation.order = 'YXZ'; m.root.rotation.set(down ? 0 : pitch, h.face || 0, (h.fall || 1) * down * Math.PI / 2);
  }
  for (const [k, m] of freeH) if (!seen.has(k)) { scene.remove(m.root); freeH.delete(k); }
  return true;
}
// distant soldiers and archers: one batch per team of the low-detail new soldier, standing (no
// skeleton), with a stride bob and a lean when moving. Hundreds cost a few draw calls.
const FAR_MAX = 600, far = new Map(); let farReset = true, farDrawn = false;
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _e = new THREE.Euler();
function farBatch(hex) {
  let b = far.get(hex);
  if (!b) { b = new THREE.InstancedMesh(SRC.lod, teamMaterial(SRC.soldierMat, hex, .26), FAR_MAX); b.count = 0; b.frustumCulled = false; b.castShadow = true; scene.add(b); far.set(hex, b); }
  return b;
}
// a distant archer's hood: a rounded cap in his army's colour with its point, over the helmet (as up close)
let HOOD_GEO = null; const HOOD_AT = new THREE.Matrix4().makeTranslation(0, .6, -.04), _m2 = new THREE.Matrix4();
function farHoodBatch(hex) {
  let b = far.get(hex + 'h');
  if (!b) {
    if (!HOOD_GEO) { HOOD_GEO = new THREE.SphereGeometry(.43, 10, 6, 0, Math.PI * 2, 0, Math.PI * .55); const t = new THREE.ConeGeometry(.17, .42, 8); t.translate(0, .55, .04); HOOD_GEO = mergeTwo(HOOD_GEO, t); }
    b = new THREE.InstancedMesh(HOOD_GEO, new THREE.MeshStandardMaterial({ color: hex, roughness: .9 }), FAR_MAX); b.count = 0; b.frustumCulled = false; b.castShadow = true; scene.add(b); far.set(hex + 'h', b);
  }
  return b;
}
const mergeTwo = (a, b) => { const g = new THREE.BufferGeometry(), A = a.toNonIndexed(), B = b.toNonIndexed(); for (const k of ['position', 'normal']) { const x = A.attributes[k].array, y = B.attributes[k].array, z = new Float32Array(x.length + y.length); z.set(x); z.set(y, x.length); g.setAttribute(k, new THREE.BufferAttribute(z, 3)); } return g; };
let FAR_ON = true; try { FAR_ON = new URLSearchParams(location.search).get('far') !== '0'; } catch (e) { /* on */ } // (?far=0: the old figures far off, for comparison)
export function drawFar(u, a) {
  if (!FAR_ON) return false;
  if (u.dead || u.hidden || u.mounted || (u.kind !== 'foot' && u.kind !== 'arch')) return false;
  if (on && !SRC) return true; // (still loading: hidden rather than the old figure)
  if (!heroesOn()) return false;
  if (farReset) { for (const b of far.values()) b.count = 0; farReset = false; }
  const b = farBatch(hexOf(u)); if (b.count >= FAR_MAX) return false;
  const sc = SCALE * SOLDIER_SCALE, sp = Math.hypot(u.vx || 0, u.vz || 0), moving = sp > .3;
  const bob = moving ? Math.abs(Math.sin(G.T * 9 + (u.id || 0) * 1.7)) * .08 : 0;
  _p.set(u.x, (u.y || 0) + (a.lift || 0) - (a.sink || 0) + .998 * sc + bob, u.z);
  _e.set(moving ? .12 : 0, u.face + (a.yaw || 0), 0, 'YXZ'); _q.setFromEuler(_e); _s.setScalar(sc);
  b.setMatrixAt(b.count++, _m.compose(_p, _q, _s)); farDrawn = true;
  if (u.kind === 'arch') { const hb = farHoodBatch(hexOf(u)); if (hb.count < FAR_MAX) hb.setMatrixAt(hb.count++, _m2.multiplyMatrices(_m, HOOD_AT)); }
  return true;
}
// a man going down: knocked over (or launched, tumbling, limbs flailing) and lying where he fell. The body
// turns about his feet, as the old figure's did, so he lands flat on the ground, not floating at the waist.
const LIMP = { ...POSES.rest, spine: [-.15, 0, 0], neck: [-.3, 0, 0], upperArm_R: [-.6, 0, .55], upperArm_L: [-.6, 0, -.55], foreArm_R: [0, .3, 0], foreArm_L: [0, -.3, 0], thigh_R: [-.25, 0, -.12], thigh_L: [.15, 0, .12], shin_R: [.4, 0, 0], shin_L: [.2, 0, 0] };
const _qf = new THREE.Quaternion(), _ef = new THREE.Euler(), _vf = new THREE.Vector3();
function drawFallen(u, a, h, dt) {
  const R = h.R, r = a.rag, air = r && (r.flip || r.cart);
  let P = LIMP;
  if (air) { const f = r.fl || 0; P = { ...LIMP, upperArm_R: [Math.sin(f) * 1.2, 0, Math.cos(f * .7) * .8], upperArm_L: [Math.sin(f + 2) * 1.2, 0, -Math.cos(f * .7 + 1) * .8], thigh_R: [Math.sin(f + 1) * .9, 0, -.2], thigh_L: [Math.sin(f + 3.5) * .9, 0, .2], shin_R: [.6, 0, 0], shin_L: [.6, 0, 0] }; }
  const top = h.U || R.root;
  if (R.clip && !h.U && !air && h.fell !== 'code') { // F8: a captain cut down where he stands plays his death (launched or ridden down: the code's tumble, below)
    if (!h.fell) { h.fell = 'clip'; const back = u.hitAng != null && Math.cos(u.hitAng - u.face) < 0; h.an = { key: 'death', steps: [back ? ANIM.death.back : ANIM.death.front] }; } // (struck from behind, he pitches forward)
    for (const part of ['lo', 'up']) play(R, part, h.an.steps[0], 'death', { fade: ANIM.fast, loop: false }).act.timeScale = ANIM.death.rate;
    tick(R, dt, { code: false });
    top.rotation.set(0, u.face + (a.yaw || 0), 0);
    top.position.set(u.x, (u.y || 0) + (a.lift || 0) * .4 - (a.sink || 0) + .998 * h.sc, u.z);
    top.visible = true;
    return true;
  }
  h.fell = 'code';
  h.cur = settle(h.cur, P, 1 - Math.exp(-(air ? 30 : 12) * Math.min(dt, .1)));
  if (R.clip) { R.cw = 1; tick(R, dt, { P: h.cur, code: true }); } else applyPose(R, h.cur);
  _ef.set(a.bodyRX || 0, u.face + (a.yaw || 0), a.bodyRZ || 0, 'YXZ'); _qf.setFromEuler(_ef);
  _vf.set(0, .998 * h.sc, 0).applyQuaternion(_qf);
  top.quaternion.copy(_qf);
  top.position.set(u.x + _vf.x, (u.y || 0) + (a.lift || 0) * .4 - (a.sink || 0) + _vf.y + .12 * h.sc, u.z + _vf.z);
  top.visible = true;
  return true;
}
// riders charging this frame (cached per frame), and whether one is bearing down on a man: an enemy, close,
// coming at him fast
let chFrame = -1, chList = [];
function chargeAt(u) {
  if (!canBrace(u)) return false; // (running, or in a blow, or idle: he's bowled over, no brace)
  if (chFrame !== FRAME) { chFrame = FRAME; chList = G.units.filter(c => c.mounted && !c.dead && (c.charge > 0 || Math.hypot(c.vx || 0, c.vz || 0) > 9)); }
  for (const c of chList) {
    if (G.ALLY[c.ti % 4] === G.ALLY[u.ti % 4]) continue;
    const dx = u.x - c.x, dz = u.z - c.z, d = Math.hypot(dx, dz); if (d > 10 || d < .5) continue;
    if (((c.vx || 0) * dx + (c.vz || 0) * dz) / d > 5) return true;
  }
  return false;
}
// the reel from a blow (the springs the old figure used, kicked by each hit): rocked back from the front,
// thrown forward from behind, knocked sideways from a flank, twisted round; his feet stay where they are
function reeled(P, a) {
  const st = a.stag || 0, sr = a.stagR || 0, sy = a.stagY || 0;
  if (Math.abs(st) + Math.abs(sr) + Math.abs(sy) < .005) return P;
  const add = (k, x, y, z) => { const v = P[k] || [0, 0, 0]; return [v[0] + x, v[1] + y, v[2] + z]; };
  return { ...P, spine: add('spine', st * .45, 0, sr * .45), chest: add('chest', st * .3, sy * .6, sr * .25), neck: add('neck', st * .2, 0, sr * .15), hips: add('hips', 0, sy * .5, 0), hipsY: (P.hipsY || 0) - Math.abs(st) * .08 };
}
const EV_T = .42; // (how long an evade's body move lasts on screen)
// ease the pose he's in toward the one wanted (k of the way this frame): every bone, the hip height, and
// where his gear points. Angles go the short way round, so the spin's full turn doesn't unwind.
const GEAR = { blade: [-.15, .75, .65], face: [.3, 0, 1], up: [0, 1, 0] };
const wrap = d => d - Math.round(d / (Math.PI * 2)) * Math.PI * 2;
function settle(cur, P, k) {
  const want = k2 => P[k2] || (k2 === 'pole' ? P.blade || GEAR.blade : GEAR[k2]) || [0, 0, 0];
  if (!cur) { cur = {}; for (const key in P) cur[key] = Array.isArray(P[key]) ? P[key].slice() : P[key]; }
  for (const key of new Set([...Object.keys(cur), ...Object.keys(P)])) {
    if (key === 'hipsY') { cur.hipsY = (cur.hipsY || 0) + ((P.hipsY || 0) - (cur.hipsY || 0)) * k; continue; }
    const w = want(key), c = cur[key] || (key in GEAR || key === 'pole' ? w.slice() : [0, 0, 0]), gear = key in GEAR || key === 'pole';
    for (let i = 0; i < 3; i++) { const d = gear ? w[i] - c[i] : wrap(w[i] - c[i]); c[i] = gear ? c[i] + d * k : wrap(c[i] + d * k); }
    cur[key] = c;
  }
  return cur;
}
function drop(h) {
  scene.remove(h.U || h.R.root);
  h.R.root.traverse(o => { if (o.isMesh) o.geometry.dispose(); }); // (the horse's geometry is shared: only the rider's is freed)
}

// the pose the code gives a man for what he is doing this frame. rate: how fast he moves into it; roll:
// the side evade's turn; tag: 'loco' (standing or moving), 'block', 'swing', or 'code' for every other move
function pickPose(u, a, h, dt, sp, mv, blocking) {
  let P, rate = 16, roll = 0, tag = 'code'; // (rate: how fast he moves into the pose; roll: the side evade's turn)
  if (u.execA || u.execV) h.exT = (h.exT || 0) + dt; else h.exT = 0;
  const ev = u.evade && !h.U && G.T - u.evade.t < EV_T ? (G.T - u.evade.t) / EV_T : -1;
  if (ev >= 0 && h.evT !== u.evade.t) { h.evT = u.evade.t; const dx = Math.sin(u.face) * (u.vz || 0) - Math.cos(u.face) * (u.vx || 0); h.evDir = dx > 0 ? -1 : 1; } // (which way the roll turns: the way he's going)
  if (u.execV) { P = POSES.kneel; rate = 10; }
  else if (u.execA && !h.U) { P = moveAt(h.weapon === 'spear' ? 'exec_spear' : h.weapon === 'jav' ? 'exec_jav' : 'exec_sword', Math.min(1, h.exT / 1.3)); rate = 26; }
  else if (ev >= 0) { // the evades: into the move fast, held, then out of it
    const k = ev < .22 ? ev / .22 : ev < .7 ? 1 : 1 - (ev - .7) / .3, kind = u.evade.kind;
    P = mixPose(CLIPS.idle(G.T), kind === 'pounce' ? POSES.evPounce : kind === 'back' ? POSES.evBack : POSES.evRoll, Math.min(1, k * 1.3)); rate = 30;
    if (kind === 'side') { const r = Math.min(1, Math.max(0, (ev - .06) / .62)); roll = h.evDir * Math.PI * 2 * r * r * (3 - 2 * r); } // (a full turn, eased in and out)
  }
  else if (a.stumble > 0) { P = moveAt('stagger', Math.min(1, 1 - a.stumble / .4) * .7); rate = 30; }
  else if (u.windup > 0) P = moveAt('heavy', .4); // (wound up, weapon high, the glint coming)
  else if (u.swing > 0) {
    tag = 'swing';
    const t = 1 - u.swing / .38, k = u.swingKind | 0;
    let name = KIND[k] || 'forehand';
    if (h.weapon === 'spear') name = k === 5 ? 'lunge' : k === 6 ? 'bash' : (k === 1 || k === 2) ? 'thrustHigh' : 'thrust'; // (the spear: a low stab, an overhand stab, the skewer)
    else if (h.weapon === 'jav') name = k === 6 ? 'bash' : 'throw'; // (javelins are thrown)
    if (h.weapon === 'bow') name = null; // (the archer looses: the bow held up)
    P = name === null ? POSES.guard : name === 'heavy' ? moveAt('heavy', .4 + .6 * t) : moveAt(name, t); rate = 34;
  } else if (u.parryT != null && G.T - u.parryT < .32 && G.T - u.parryT >= 0) { P = moveAt('parry', (G.T - u.parryT) / .32); rate = 34; }
  else if (u.heavyCharge > 0 && h.weapon === 'sword') { // the held heavy blow: raised and trembling, deeper the longer it's held
    P = moveAt('heavy', .25 + .15 * Math.min(1, u.heavyCharge)); P = Object.assign({}, P, { upperArm_R: P.upperArm_R.map((v, i) => i === 2 ? v + Math.sin(G.T * 40) * .03 * u.heavyCharge : v) }); rate = 20;
  }
  else if (u.bracing) { P = POSES.brace; rate = 18; }
  else if (u.javDraw > 0) { P = mixPose(POSES.rest, POSES.javDraw, Math.min(1, .55 + .45 * u.javDraw)); rate = 20; }
  else if (blocking) { tag = 'block'; P = G.T - h.blockHitT < .3 ? moveAt('block', (G.T - h.blockHitT) / .3) : POSES.guard; rate = G.T - h.blockHitT < .3 ? 30 : 18; }
  else if (u.kind !== 'captain' && !u.mounted && chargeAt(u)) { P = u.kind === 'arch' ? mixPose(POSES.rest, POSES.evBack, .8) : h.weapon === 'spear' ? POSES.brace : POSES.guard; rate = 14; } // (a rider bearing down on him: shield up and crouched, spear set, an archer shrinking back)
  else if (a.cheerT > 0) { P = mixPose(CLIPS.idle(G.T), POSES.cheer, Math.min(1, Math.sin(Math.PI * Math.min(1, a.cheerT / .9)) * 1.6)); }
  else { tag = 'loco'; P = mv > .05 ? mixPose(CLIPS.idle(G.T), CLIPS.run(h.run, Math.min(1, .45 + sp / 9)), Math.min(1, mv * 1.6)) : CLIPS.idle(G.T); }
  return { P, rate, roll, tag };
}

// ---- F8: a captain on real clips. Which clip plays on his legs and which on his upper body, from what
// he is doing; moves with no clip keep the code's pose (blended in over the clips). Returns how far his
// body is turned from the way he faces (the 180 turn: the clip steps, this turns him).
const wrapA = d => d - Math.round(d / (Math.PI * 2)) * Math.PI * 2, clampN = (v, a, b) => Math.max(a, Math.min(b, v));
function locoClip(u, h, sp) {
  const L = ANIM.loco; if (h.U || sp < L.idleBelow) { h.side = false; return ['idle', 1]; }
  const sn = Math.sin(u.face), cs = Math.cos(u.face), f = (u.vx || 0) * sn + (u.vz || 0) * cs, s = (u.vx || 0) * cs - (u.vz || 0) * sn;
  h.fast = sp > L.runAbove * (h.fast ? .85 : 1); h.side = Math.abs(s) > Math.abs(f) * (h.side ? 1 / L.side : L.side); // (each holds until clearly the other, so he doesn't flicker between them)
  const name = h.side ? (s > 0 ? (h.fast ? 'strafeRunL' : 'strafeL') : (h.fast ? 'strafeRunR' : 'strafeR')) : f >= 0 ? (h.fast ? 'run' : 'walk') : (h.fast ? 'runBack' : 'walkBack');
  const C = SRC.cap.clips[name];
  return [name, clampN(sp / (L.stride[name] * h.sc / C.dur), L.rate[0], L.rate[1])]; // (his feet keep time with the ground)
}
function clipHero(u, a, h, dt, sp, blocking, hurt, P, rate, tag) {
  const R = h.R, T = G.T, C = SRC.cap.clips, kind = u.swingKind | 0;
  // what has just happened
  if (u.swing > (h.swPrev || 0) + .05) { // a blow begun: the sword's combo, thrust and boosted blows have clips
    h.swN = (h.swN || 0) + 1; h.swT = T;
    const boosted = (u.evade && T - u.evade.t < ANIM.boostWithin) || (u.pending && u.pending.leap);
    h.swClip = h.weapon === 'sword' && kind < ANIM.swingKind.length ? (boosted ? ANIM.boost : ANIM.swingKind[kind]) : null;
  }
  h.swPrev = u.swing || 0;
  if (blocking && !h.wasBlocking) h.blkN = (h.blkN || 0) + 1; h.wasBlocking = blocking;
  if (hurt && !blocking && !(a.stumble > 0)) { h.impN = (h.impN || 0) + 1; h.impT = T; }
  const d = h.face == null ? 0 : wrapA(u.face - h.face); h.face = u.face;
  const code = !(tag === 'loco' || tag === 'block' || (tag === 'swing' && h.swClip));
  if (Math.abs(d) > ANIM.turn.min && sp < ANIM.turn.maxSpeed && tag === 'loco' && !h.U) h.turn = { d, key: 'turn' + T };
  if (h.turn && (code || tag !== 'loco')) h.turn = null;
  // the move his clips should show, most pressing first
  const X = u.act && ANIM.acts[u.act.name] ? u.act : null, xKey = X ? X.name + X.t : null;
  if (h.xHeld && (!X || !X.hold || xKey !== h.xHeld.key)) { const then = ANIM.acts[h.xHeld.name].then; if (then) h.xAfter = { name: then, key: then + T, steps: ANIM.acts[then].steps, legs: ANIM.acts[then].legs }; h.xHeld = null; }
  const imp = ANIM.impact, bh = ANIM.blockHit;
  let W = null;
  if (code) W = null;
  else if (h.turn) W = { key: h.turn.key, steps: [ANIM.turn.clip], legs: true, rate: ANIM.turn.rate, fade: ANIM.fast, turn: true };
  else if (h.swClip && h.swT != null && T - h.swT < .38 + ANIM.swingTail) W = { key: 'sw' + h.swN, steps: [h.swClip], swing: ANIM.swing[h.swClip], fade: ANIM.fast };
  else if (blocking && T - h.blockHitT >= 0 && T - h.blockHitT < C[bh.clip].dur / bh.rate) W = { key: 'bh' + h.blockHitT, steps: [bh.clip], rate: bh.rate, fade: ANIM.fast };
  else if (blocking) W = { key: 'blk' + h.blkN, steps: ANIM.block, hold: true };
  else if (h.impT != null && T - h.impT < C[imp.clips[h.impN % imp.clips.length]].dur / imp.rate) W = { key: 'imp' + h.impN, steps: [imp.clips[h.impN % imp.clips.length]], rate: imp.rate, fade: ANIM.fast };
  else if (X && (X.hold || h.xDone !== xKey)) { W = { key: xKey, steps: ANIM.acts[X.name].steps, legs: ANIM.acts[X.name].legs, hold: !!X.hold, act: true }; if (X.hold) h.xHeld = { name: X.name, key: xKey }; }
  else if (h.xAfter) W = h.xAfter;
  if (W && !(h.an && h.an.key === W.key)) h.an = { ...W, i: 0 }; else if (!W) h.an = null;
  const an = h.an, [loco, lrate] = locoClip(u, h, sp);
  if (an) { // step through the move's clips; a finished move lets go
    const e = head(R, 'up'), last = an.i >= an.steps.length - 1;
    if (e && e.name === an.steps[an.i] && R.up.key === an.key + ':' + an.i && ended(e)) {
      if (!last) an.i++;
      else if (!an.hold) { if (an.act) h.xDone = an.key; if (an === h.xAfter || (h.xAfter && an.key === h.xAfter.key)) h.xAfter = null; if (an.turn) h.turn = null; h.an = null; }
    }
  }
  let turn = 0;
  if (h.an) {
    const name = an.steps[an.i], loops = !!an.hold && an.i === an.steps.length - 1, full = an.legs || loco === 'idle', key = an.key + ':' + an.i;
    const S = an.swing, e = play(R, 'up', name, key, { fade: an.i ? ANIM.fast : an.fade || ANIM.fade, loop: loops, at: S ? Math.max(0, S.hit - S.lead) : 0 }); // (a blow is entered a little before it lands, so it lands when the rules say it does)
    e.act.timeScale = S ? (e.act.time < S.hit ? S.lead / ANIM.hitDelay : S.after) : an.rate || 1;
    if (full) { const l = play(R, 'lo', name, key, { fade: an.i ? ANIM.fast : an.fade || ANIM.fade, loop: loops, at: e.act.time }); l.act.timeScale = e.act.timeScale; l.act.time = e.act.time; }
    else play(R, 'lo', loco, 'L' + loco).act.timeScale = lrate;
    if (an.turn) { const k = clampN(e.act.time / e.C.dur, 0, 1); turn = -h.turn.d * (1 - k * k * (3 - 2 * k)); }
  } else {
    const l = play(R, 'lo', loco, 'L' + loco), e = play(R, 'up', loco, 'L' + loco, { fade: code ? ANIM.fade : ANIM.out });
    l.act.timeScale = e.act.timeScale = lrate; e.act.time = l.act.time; // (one clip, head to toe)
  }
  if (code) { if (!h.coded) h.cur = null; h.cur = settle(h.cur, P, 1 - Math.exp(-rate * Math.min(dt, .1))); } // (a code pose is eased toward as before; the blend from the clips eases it in)
  h.coded = code;
  tick(R, dt, { P: code ? h.cur : h.U ? P : null, code, ride: !!h.U, reel: a });
  return turn;
}

// pose and place one captain. a: the old renderer's state for him (lift, sink, yaw, stumble).
// Returns false when this one is left to the old renderer (models not loaded, mounted, dead).
export function drawHero(u, a, dt) {
  // while the new models load, the old captain stays hidden (no flash of the old one)
  if (on && !SRC) return !u.dead && (u.kind === 'captain' || u.kind === 'foot' || u.kind === 'arch');
  if (!heroesOn() || (u.kind !== 'captain' && u.kind !== 'foot' && u.kind !== 'arch') || u.hidden) return false;
  if (u.dead && (!a.rag || (u.deadT || 0) > 14)) return false; // (the fallen: drawn as they go down and lie there; the sinking last moments are left to the old figure's fade)
  let h = live.get(u);
  if (h && (h.weapon !== weaponOf(u) || h.key !== keyOf(u) || h.mounted !== !!u.mounted)) { drop(h); live.delete(u); h = null; }
  if (!h) { h = make(u); live.set(u, h); }
  if (h.fold && abOn()) foldShow(h.fold, abOld()); // (dev, ?f1=ab: the test draws one frame both ways)
  h.seen = FRAME; // (drawn this frame: by a frame count, since the game clock stands still on the home screen)
  const R = h.R, sp = Math.hypot(u.vx || 0, u.vz || 0), mv = Math.min(1, sp / 4);
  h.run += dt * sp / (2.0 * h.sc * 1.5); // (the stride keeps time with the ground: one stride (two steps) per 2 m at his size, so his feet don't skate)
  if (u.dead) return drawFallen(u, a, h, dt);
  const blocking = (u.human && u.blocking) || u.blockT > 0, hurt = u.hp < h.hp - ANIM.impact.minDmg;
  if (blocking && u.hp < h.hp - .5) h.blockHitT = G.T; // (a blow taken on the shield: it jolts)
  h.hp = u.hp;
  let { P, rate, roll, tag } = pickPose(u, a, h, dt, sp, mv, blocking);
  const top = h.U || R.root; // (mounted: the horse and rider move together, their feet on the ground)
  if (h.U) P = Object.assign({}, P, RIDE); // (mounted: his legs go over the saddle whatever he is doing)
  let turn = 0;
  if (R.clip) turn = clipHero(u, a, h, dt, sp, blocking, hurt, P, rate, tag);
  else {
    h.cur = settle(h.cur, P, 1 - Math.exp(-rate * Math.min(dt, .1))); // (eased into each pose, never snapped)
    applyPose(R, reeled(h.cur, a));
  }
  // the blow landing: a white flash through him (his own body's material only: the gear is shared)
  const fl = Math.max(0, Math.min(1, a.flash || 0)); if (R.mesh.material.emissive && fl !== h.fl) { h.fl = fl; R.mesh.material.emissive.setScalar(fl * .55); }
  top.position.set(u.x, (u.y || 0) + (a.lift || 0) - (a.sink || 0) + (h.U ? 0 : .998 * h.sc), u.z);
  top.rotation.set(0, u.face + (a.yaw || 0) + turn, 0);
  if (roll) { R.root.rotateZ(roll); R.root.position.y -= .25 * Math.sin(Math.abs(roll) / 2) * h.sc; } // (the side roll: a full turn about his forward axis, tucked low)
  if (R.cape) { const k = R.cape.userData, want = k.base + Math.min(.55, sp * .07) + Math.sin(FRAME * .09 + u.id) * .03 * mv; k.a = k.a === undefined ? want : k.a + (want - k.a) * Math.min(1, dt * 6); R.cape.rotation.x = k.a; } // (C4: lifts behind him as he runs, eased)
  top.visible = true;
  if (h.legs) { const [bob, pitch] = gait(h.legs, sp, dt); top.position.y += bob; top.rotation.order = 'YXZ'; top.rotation.x = pitch; } // (the horse walks, trots or gallops for its speed, the rider going with it)
  return true;
}
if (import.meta.env.DEV) window.__f8 = { live, src: () => SRC, THREE, rigClip, addClipArmour, play, tick, loadClipBody, ANIM }; // (dev: tests read the captains' clips and bones)
// after a frame's drawing: captains no longer drawn this way (gone, mounted, dead) are taken down
export function sweepHeroes() {
  if (!on) return;
  if (farDrawn) { for (const b of far.values()) b.instanceMatrix.needsUpdate = true; } else for (const b of far.values()) b.count = 0;
  farDrawn = false; farReset = true; // (the distant batches: sent for this frame, refilled from the next)
  for (const [u, h] of live) if (h.seen !== FRAME) { if (u.dead || !G.units.includes(u)) { drop(h); live.delete(u); } else (h.U || h.R.root).visible = false; }
  FRAME++;
}
