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
import { groundY } from '../core/world.js';
import { rigCaptain, addArmour, applyPose, moveAt, mixPose, CLIPS, POSES, teamMaterial } from './rig/captainrig.js';
import { SLOTS, SLOT_IX } from '../core/look.js';

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

const SCALE = 1.22; // (the old captain stood about 2.4 tall; the model is 1.96)
const SOLDIER_SCALE = .8; // (a foot soldier stands about 80% of the captain's height)
let SRC = null;
// the look's choices (core/look.js) become pack pieces: helmet, armour and shield. The weapon stays the
// one you fight with (gameplay), so it is not a look here.
const PACK = { helmet: ['blue_crest', 'gold_ridge', 'red_crest'], shield: ['red_scutum', 'blue_oval', 'blue_kite'] };
// the armour choices: the painted armour in four finishes (the tint multiplies its painted steel)
const ARMOUR_FINISH = { steel: [0xffffff, .35, .45], bronze: [0xe0a458, .55, .38], leather: [0x9a6238, 0, .85], black: [0x3b3e46, .6, .3] };
const pick = (slot, i) => (SLOTS[SLOT_IX[slot]].items[i] || {}).name || '';
function helmFile(name) { if (/wild hair/i.test(name)) return null; if (/gild|gold|corinth/i.test(name)) return 'gold_ridge'; if (/great|wolf|warden/i.test(name)) return 'red_crest'; return 'blue_crest'; }
function armourFile(name) { if (/bronze/i.test(name)) return 'bronze'; if (/leather|fur/i.test(name)) return 'leather'; if (/black/i.test(name)) return 'black'; return 'steel'; }
function shieldFile(name) { if (/hoplon|oval/i.test(name)) return 'blue_oval'; if (/round|kite/i.test(name)) return 'blue_kite'; return 'red_scutum'; }
if (on) {
  const L = new GLTFLoader(), first = g => { let m = null; g.scene.traverse(o => { if (o.isMesh && !m) m = o; }); return m; };
  const scene$ = f => L.loadAsync(f).then(g => g.scene), mesh$ = f => L.loadAsync(f).then(first);
  Promise.all([
    ...['models/body_plain.glb', 'models/soldier.glb', 'models/armour_segmented.glb'].map(mesh$),
    ...PACK.helmet.map(n => scene$(`models/pack/captain_helmet_${n}.glb`)),
    ...PACK.shield.map(n => scene$(`models/pack/captain_shield_${n}.glb`)),
    scene$('models/horse.glb'), mesh$('models/soldier_lod.glb')
  ]).then(all => {
    const [b, sd, ar, ...rest] = all, helmets = rest.slice(0, 3), shields = rest.slice(3, 6), horse = rest[6], lod = rest[7].geometry;
    { const P = lod.attributes.position; let x0 = 1e9, x1 = -1e9; for (let i = 0; i < P.count; i++) { const y = P.getY(i); if (y > -.2 && y < -.15) { x0 = Math.min(x0, P.getX(i)); x1 = Math.max(x1, P.getX(i)); } } if (x1 > x0) lod.translate(-(x0 + x1) / 2, 0, 0); } // (centred on the waist, as the rig centres the full one)
    sd.material.metalness = 0; sd.material.roughness = .8; sd.geometry.userData.material = sd.material;
    b.material.metalness = 0; b.material.roughness = .8; b.geometry.userData.material = b.material;
    const by = (list, names) => Object.fromEntries(names.map((n, i) => [n, list[i]]));
    SRC = { body: b.geometry, soldier: sd.geometry, soldierMat: sd.material, lod, horse: horseTemplate(horse),
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
const live = new Map(); // unit -> { R, weapon, team, run, moveName, moveT, hp, sc, U, legs }
const KIND = ['forehand', 'backhand', 'overhead', 'thrust', 'spin', 'heavy', 'bash'];
// the Arms upgrade (tier 1+) puts a spear in the hand of a footman, and of a captain who has not picked one
function weaponOf(u) { if (u.kind === 'arch') return 'bow'; if (u.weapon) return u.weapon === 'spear' ? 'spear' : u.weapon === 'jav' ? 'jav' : 'sword'; return u.tier >= 1 ? 'spear' : 'sword'; }
// the look chosen for this unit's team (the wardrobe): helmet, armour and shield come from it
const lookOf = u => (G.looks && G.looks[u.ti]) || null;
const keyOf = u => { const L = lookOf(u); return [TEAMS[colorOf(u.ti)].hex, u.kind, u.tier | 0, L ? [L[SLOT_IX.helm], L[SLOT_IX.armour], L[SLOT_IX.shield]].join('.') : ''].join('|'); };
function make(u) {
  const weapon = weaponOf(u), team = TEAMS[colorOf(u.ti)].hex, soldier = u.kind !== 'captain', L = lookOf(u);
  const shieldName = L ? pick('shield', L[SLOT_IX.shield]) : '', shield = SRC.shields[shieldFile(shieldName)];
  const R = soldier ? rigCaptain(SRC.soldier, { body: 'soldier', team, weapon, pack: u.kind === 'arch' ? { noShield: true } : { shield } })
    : rigCaptain(SRC.body, { team, weapon, pack: { shield, helmet: L ? SRC.helmets[helmFile(pick('helm', L[SLOT_IX.helm]))] || null : SRC.helmets.blue_crest } });
  if (!soldier) { const a = SRC.armours[armourFile(L ? pick('armour', L[SLOT_IX.armour]) : '')]; addArmour(R, a.geo, a.mat); }
  else if (u.kind === 'foot' && u.tier >= 2) { const a = SRC.armours[armourFile(L ? pick('armour', L[SLOT_IX.armour]) : '')]; addArmour(R, a.geo, a.mat); } // (the Armour upgrade: your army's armour over the tunic)
  R.root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
  const sc = soldier ? SCALE * SOLDIER_SCALE : SCALE;
  R.root.scale.setScalar(sc);
  const h = { R, weapon, team, key: keyOf(u), run: 0, moveName: null, moveT: 0, hp: u.hp, blockHitT: -1, sc, mounted: !!u.mounted, U: null, legs: null };
  if (u.mounted) { // on the warhorse: the rider sits on the saddle, and the unit moves as one
    const hc = SRC.horse.clone(true), U = new THREE.Group();
    U.add(hc); U.add(R.root); R.root.position.set(0, SEAT_TOP + (.38 + .04) * sc, SEAT_Z); // (his hips, .38 below his root, on the seat)
    h.U = U; h.legs = legsOf(hc);
    scene.add(U);
  } else scene.add(R.root);
  return h;
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
let FAR_ON = false; try { FAR_ON = new URLSearchParams(location.search).get('far') === '1'; } catch (e) { /* off */ } // (on test only until it's checked: ?far=1)
export function drawFar(u, a) {
  if (!FAR_ON) return false;
  if (u.dead || u.hidden || u.mounted || (u.kind !== 'foot' && u.kind !== 'arch')) return false;
  if (on && !SRC) return true; // (still loading: hidden rather than the old figure)
  if (!heroesOn()) return false;
  if (farReset) { for (const b of far.values()) b.count = 0; farReset = false; }
  const b = farBatch(TEAMS[colorOf(u.ti)].hex); if (b.count >= FAR_MAX) return false;
  const sc = SCALE * SOLDIER_SCALE, sp = Math.hypot(u.vx || 0, u.vz || 0), moving = sp > .3;
  const bob = moving ? Math.abs(Math.sin(G.T * 9 + (u.id || 0) * 1.7)) * .08 : 0;
  _p.set(u.x, (u.y || 0) + (a.lift || 0) - (a.sink || 0) + .998 * sc + bob, u.z);
  _e.set(moving ? .12 : 0, u.face + (a.yaw || 0), 0, 'YXZ'); _q.setFromEuler(_e); _s.setScalar(sc);
  b.setMatrixAt(b.count++, _m.compose(_p, _q, _s)); farDrawn = true;
  return true;
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

// pose and place one captain. a: the old renderer's state for him (lift, sink, yaw, stumble).
// Returns false when this one is left to the old renderer (models not loaded, mounted, dead).
export function drawHero(u, a, dt) {
  // while the new models load, the old captain stays hidden (no flash of the old one)
  if (on && !SRC) return !u.dead && (u.kind === 'captain' || u.kind === 'foot' || u.kind === 'arch');
  if (!heroesOn() || (u.kind !== 'captain' && u.kind !== 'foot' && u.kind !== 'arch') || u.dead || u.hidden) return false;
  let h = live.get(u);
  if (h && (h.weapon !== weaponOf(u) || h.key !== keyOf(u) || h.mounted !== !!u.mounted)) { drop(h); live.delete(u); h = null; }
  if (!h) { h = make(u); live.set(u, h); }
  h.seen = G.T;
  const R = h.R, sp = Math.hypot(u.vx || 0, u.vz || 0), mv = Math.min(1, sp / 4);
  h.run += dt * (.55 + sp * .12); // (the stride keeps time with his speed)
  const blocking = (u.human && u.blocking) || u.blockT > 0;
  if (blocking && u.hp < h.hp - .5) h.blockHitT = G.T; // (a blow taken on the shield: it jolts)
  h.hp = u.hp;
  let P, rate = 16, roll = 0; // (rate: how fast he moves into the pose; roll: the side evade's turn)
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
  else if (blocking) { P = G.T - h.blockHitT < .3 ? moveAt('block', (G.T - h.blockHitT) / .3) : POSES.guard; rate = G.T - h.blockHitT < .3 ? 30 : 18; }
  else if (a.cheerT > 0) { P = mixPose(CLIPS.idle(G.T), POSES.cheer, Math.min(1, Math.sin(Math.PI * Math.min(1, a.cheerT / .9)) * 1.6)); }
  else P = mv > .05 ? mixPose(CLIPS.idle(G.T), CLIPS.run(h.run), Math.min(1, mv * 1.6)) : CLIPS.idle(G.T);
  const top = h.U || R.root; // (mounted: the horse and rider move together, their feet on the ground)
  if (h.U) P = Object.assign({}, P, RIDE); // (mounted: his legs go over the saddle whatever he is doing)
  h.cur = settle(h.cur, P, 1 - Math.exp(-rate * Math.min(dt, .1))); // (eased into each pose, never snapped)
  applyPose(R, h.cur);
  top.position.set(u.x, (u.y || 0) + (a.lift || 0) - (a.sink || 0) + (h.U ? 0 : .998 * h.sc), u.z);
  top.rotation.set(0, u.face + (a.yaw || 0), 0);
  if (roll) { R.root.rotateZ(roll); R.root.position.y -= .25 * Math.sin(Math.abs(roll) / 2) * h.sc; } // (the side roll: a full turn about his forward axis, tucked low)
  top.visible = true;
  if (h.legs) { const [bob, pitch] = gait(h.legs, sp, dt); top.position.y += bob; top.rotation.order = 'YXZ'; top.rotation.x = pitch; } // (the horse walks, trots or gallops for its speed, the rider going with it)
  return true;
}
// after a frame's drawing: captains no longer drawn this way (gone, mounted, dead) are taken down
export function sweepHeroes() {
  if (!on) return;
  if (farDrawn) { for (const b of far.values()) b.instanceMatrix.needsUpdate = true; } else for (const b of far.values()) b.count = 0;
  farDrawn = false; farReset = true; // (the distant batches: sent for this frame, refilled from the next)
  for (const [u, h] of live) if (h.seen !== G.T) { if (u.dead || !G.units.includes(u)) { drop(h); live.delete(u); } else (h.U || h.R.root).visible = false; }
}
