// Loading the 3D figures and making one for a unit: the captains', champions' and soldiers' bodies, their
// gear and looks, the war horse under a rider. On by default; ?models=0 in the address (or localStorage
// 'rally.models' = '0') turns it off and the game looks as before. (SPLIT2: from heroes.js; posing is there.)
import { body } from '../core/body.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TEAMS, NEUTRAL, ANIM } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { scene } from './scene.js';
import { rigCaptain, addArmour } from './rig/captainrig.js';
import { loadClipBody, hipClips, rigClip, addClipArmour } from './rig/cliprig.js';
import { SLOTS, SLOT_IX } from '../core/look.js';
import { batchOn } from './batch.js';
import { foldGear } from './rig/fold.js';
import { spearman } from '../champions/army.js';
import { champOf, CHAMPS } from '../champions/index.js';
import { warHorse, cloneHorse } from './warhorse.js';
import { tierLook, archerQuiver } from './rig/tierlook.js';
import { loadChampGear, champGear, champHorse, horseNamed, archerBow } from './rig/champgear.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { legsOf } from './herohorse.js';

export const HORSE_SCALE = .85 * body.champ; // (the raw horse is about 3.2 units long; a man on foot is about 2.4 in game; SIZE1: with his champion)
// the legs of a rider in the saddle: thighs forward over the horse, shins bent down its flanks
export const RIDE = { thigh_L: [-1.25, 0, 0], thigh_R: [-1.25, 0, 0], shin_L: [1.45, 0, 0], shin_R: [1.45, 0, 0] };

export let on = false;
try { on = new URLSearchParams(location.search).get('models') !== '0' && localStorage.getItem('rally.models') !== '0'; } catch (e) { /* (no storage: on) */ }
export const heroesOn = () => on && !!SRC;
// F8: captains move by real clips. ?clips=0 (or localStorage 'rally.clips' = '0') puts back the code-posed captain, to compare.
export let clipsOn = true;
try { clipsOn = new URLSearchParams(location.search).get('clips') !== '0' && localStorage.getItem('rally.clips') !== '0'; } catch (e) { /* on */ }

export const SCALE = 1.22 * body.champ; // (the old captain stood about 2.4 tall; the model is 1.96; SIZE1: drawn bigger on the same map)
export const SOLDIER_SCALE = .8 * body.soldier / body.champ; // (a foot soldier stood about 80% of the captain's height; SIZE1: the two grow apart)
export let SRC = null;
// the look's choices (core/look.js) become pack pieces: helmet, armour and shield. The weapon stays the
// one you fight with (gameplay), so it is not a look here.
const PACK = { helmet: ['blue_crest', 'gold_ridge', 'red_crest'], shield: ['red_scutum', 'blue_oval', 'blue_kite'] };
const CHAMP_SHIELDS = ['scutum_titus', 'gladius_titus', 'roundshield_sigrun', 'axe_sigrun'], CHAMP_MODELS = ['titus', 'spearman', 'archer', 'devi', 'archer_chola', 'swordsman_viking', 'ulfhednar']; // (C2b: the Viking swordsman, his round shield and axe) // (his own pieces: shields and swords) // (C3: a champion's own shield, from his page's look; models/<name>.glb)
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
  const gear$ = loadChampGear(CHAMPS, warHorse, HORSE_SCALE); // (C4i: bows, arrows and horses of their own; ARCH2: waited for)
  Promise.all([gear$,
    loadClipBody(ANIM.file), ...['models/soldier.glb', 'models/armour_segmented.glb'].map(mesh$),
    ...PACK.helmet.map(n => scene$(`models/pack/captain_helmet_${n}.glb`)),
    ...PACK.shield.map(n => scene$(`models/pack/captain_shield_${n}.glb`)),
    scene$('models/horse_war.glb'), mesh$('models/soldier_lod.glb'), ...CHAMP_SHIELDS.map(n => scene$(`models/${n}.glb`)), ...CHAMP_MODELS.map(n => loadClipBody(`models/${n}_anim.glb`)), scene$('models/spearman_lod.glb'), scene$('models/archer_lod.glb'), scene$('models/swordsman_viking_lod.glb')
  ]).then(all => {
    const [, cap, sd, ar, ...rest] = all, b = cap.mesh, helmets = rest.slice(0, 3), shields = rest.slice(3, 6), horse = rest[6], lod = rest[7].geometry, champShields = rest.slice(8, 8 + CHAMP_SHIELDS.length), champModels = rest.slice(8 + CHAMP_SHIELDS.length, 8 + CHAMP_SHIELDS.length + CHAMP_MODELS.length), spearLod = farFigure(rest[8 + CHAMP_SHIELDS.length + CHAMP_MODELS.length]), archLod = farFigure(rest[9 + CHAMP_SHIELDS.length + CHAMP_MODELS.length]), swordLod = farFigure(rest[10 + CHAMP_SHIELDS.length + CHAMP_MODELS.length]);
    { const P = lod.attributes.position; let x0 = 1e9, x1 = -1e9; for (let i = 0; i < P.count; i++) { const y = P.getY(i); if (y > -.2 && y < -.15) { x0 = Math.min(x0, P.getX(i)); x1 = Math.max(x1, P.getX(i)); } } if (x1 > x0) lod.translate(-(x0 + x1) / 2, 0, 0); } // (centred on the waist, as the rig centres the full one)
    sd.material.metalness = 0; sd.material.roughness = .8; sd.geometry.userData.material = sd.material;
    const by = (list, names) => Object.fromEntries(names.map((n, i) => [n, list[i]]));
    SRC = { cap, body: b.geometry, soldier: sd.geometry, soldierMat: sd.material, lod, ...(w => ({ horse: w.tpl, seat: w.seat }))(warHorse(horse, HORSE_SCALE)), // (C3: the war horse)
      armours: Object.fromEntries(Object.entries(ARMOUR_FINISH).map(([n, [c, mt, rg]]) => { const m = ar.material.clone(); m.color.set(c); m.metalness = mt; m.roughness = rg; return [n, { geo: ar.geometry, mat: m }]; })),
      helmets: by(helmets, PACK.helmet), shields: by(shields, PACK.shield), champShields: by(champShields, CHAMP_SHIELDS),
      models: by(champModels.map(m => ({ ...m, clips: hipClips(cap, m), own: true, ref: cap })), CHAMP_MODELS), spearLod, archLod, swordLod };
 // (C3: his own body plays the captain's clips; the spearman's far figure)
  }).catch(e => { console.warn('captain models failed to load', e); on = false; });
}
// (C3) a far figure from its file: its parts in one geometry (one draw per material), the team cloth tinted
function farFigure(sc) {
  const parts = []; sc.updateMatrixWorld(true); sc.traverse(o => { if (o.isMesh) parts.push(o); });
  const geo = mergeGeometries(parts.map(o => o.geometry.clone().applyMatrix4(o.matrixWorld)), true);
  geo.computeBoundingBox(); geo.translate(0, -.998 - geo.boundingBox.min.y, 0); // (feet on the ground, where the old figure's were)
  return { geo, mats: hex => parts.map(o => { const m = o.material.clone(); m.metalness = 0; m.roughness = .85; if (/team/i.test(m.name)) m.color.set(hex); return m; }) };
}

// the Arms upgrade (tier 1+) puts a spear in the hand of a footman, and of a captain who has not picked one
export function weaponOf(u) { if (u.kind === 'arch') return 'bow'; if (u.weapon) return u.weapon === 'spear' ? 'spear' : u.weapon === 'jav' ? 'jav' : 'sword'; return u.tier >= 1 || spearman(u) ? 'spear' : 'sword'; } // (C3a: spearmen)
// the look chosen for this unit's team (the wardrobe): helmet, armour and shield come from it
const lookOf = u => (G.looks && G.looks[u.ti]) || null;
// the colour an army's cloth, shield face and hood are tinted to: its team's, or the neutral grey (M1: the mountain's garrisons and camps)
export const hexOf = u => u.neutral ? NEUTRAL.hex : TEAMS[colorOf(u.ti)].hex;
export const keyOf = u => { const L = lookOf(u); return [hexOf(u), u.kind, u.leader || u.kind === 'arch' || u.kind === 'sword' || u.kind === 'cav' ? champOf(u.ti).id : '', u.tier | 0, L ? [L[SLOT_IX.helm], L[SLOT_IX.armour], L[SLOT_IX.shield], L[SLOT_IX.cape]].join('.') : ''].join('|'); };
export function make(u) {
  const weapon = weaponOf(u), team = hexOf(u), soldier = u.kind !== 'captain', L = lookOf(u);
  const shieldName = L ? pick('shield', L[SLOT_IX.shield]) : '', shield = SRC.shields[shieldFile(shieldName)];
  const cl = !soldier && champOf(u.ti).look, shieldRaw = cl && cl.shield ? SRC.champShields[cl.shield] || null : null, swordRaw = cl && cl.sword ? SRC.champShields[cl.sword] || null : null; // (C3: his own shield and sword)
  const own = clipsOn && cl && cl.model ? SRC.models[cl.model] : null; // (C3: his own body, helmet and cloak in it)
  const swl = (u.kind === 'sword' || u.kind === 'cav') && (champOf(u.ti).look || {}), sw = swl && (SRC.models[(u.tier | 0) >= 2 && swl.swordTop || swl.swordsman || 'swordsman_viking'] || SRC.models.swordsman_viking); // (C2b: his champion's swordsman; the last tier its own look)
  const sp = u.kind === 'foot' && SRC.models.spearman, ab = u.kind === 'arch' && ((cla => cla && SRC.models[cla])(champOf(u.ti).look && champOf(u.ti).look.archer) || SRC.models.archer), abOwn = ab && ab !== SRC.models.archer; // (C3: the soldiers' new bodies, on the shared skeleton and clips)
  const R = sw ? rigClip(sw, { team, weapon: 'sword', pack: { shieldRaw: SRC.champShields[swl.soldierShield || 'roundshield_sigrun'] || null, swordRaw: SRC.champShields[swl.soldierWeapon || 'axe_sigrun'] || null, noHelmet: true } }) // (C2b: his helmet or hood is in his body)
    : sp ? rigClip(SRC.models.spearman, { team, weapon, pack: { shield, noHelmet: true, small: true, cape: (u.tier | 0) >= 2 ? 2 : 0 } }) // (C3h: the Triarius's short cloak)
    : ab ? rigClip(ab, { team, weapon, pack: { noShield: true, noHelmet: true } }) // (his quiver and helmet are in his body)
    : soldier ? rigCaptain(SRC.soldier, { body: 'soldier', team, weapon, pack: u.kind === 'arch' ? { noShield: true } : { shield } })
    : own ? rigClip(own, { team, weapon, pack: cl && cl.bow ? { noShield: true, noHelmet: true } : { shield, shieldRaw, swordRaw, noHelmet: true } }) // (ARCH2: a bow champion carries no shield)
    : (clipsOn ? rigClip : rigCaptain)(clipsOn ? SRC.cap : SRC.body, { team, weapon, pack: { shield, shieldRaw, helmet: L ? SRC.helmets[helmFile(pick('helm', L[SLOT_IX.helm]))] || null : SRC.helmets.red_crest, cape: capeOf(L), helmetMetal: HELM_METAL[armourFile(L ? pick('armour', L[SLOT_IX.armour]) : '')] } });
  if (!soldier && !own) { const a = SRC.armours[armourFile(L ? pick('armour', L[SLOT_IX.armour]) : '')]; (R.clip ? addClipArmour : addArmour)(R, a.geo, a.mat); }
  else if (!sp && !ab && ((u.kind === 'foot' && u.tier >= 2) || u.neutral)) { const a = SRC.armours[armourFile(L ? pick('armour', L[SLOT_IX.armour]) : '')]; addArmour(R, a.geo, a.mat); } // (the Armour upgrade: your army's armour over the tunic; the mountain's neutral soldiers always wear the steel, M1)
  if (u.kind === 'arch' && !ab) archerGear(R, team, u.tier | 0);
  if (sp || ab) tierLook(R, u.kind, u.tier | 0); // (C3h: an upgraded soldier's colours and clothes)
  if (ab && !abOwn) archerQuiver(R); // (Q1; her own archers carry theirs in the body)
  const bowman = !!ab && archerBow(R); // (ARCH2: every clip archer: the bow in the left fist, the bow clips)
  const cg = own ? champGear(R, cl) : null; // (C4i: her bow and arrows, her clip names)
  R.root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
  const sc = soldier ? SCALE * SOLDIER_SCALE : SCALE;
  R.root.scale.setScalar(sc);
  const fold = batchOn() ? foldGear(R, [R.shield, R.cape, R.slide]) : null; // (F17c: the spear's slide joint moves too: aimed and slid in his grip) // (F1b: his gear in one or two draws; ?f1=0 the old pieces)
  const h = { R, cg, bowman, cl: own ? cl : null, fold, weapon, team, key: keyOf(u), run: 0, moveName: null, moveT: 0, hp: u.hp, blockHitT: -1, sc, mounted: !!u.mounted, U: null, legs: null };
  if (u.mounted) { // on the warhorse: the rider sits on the saddle, and the unit moves as one
    const H = (!soldier && champHorse(cl)) || (soldier && swl && horseNamed(swl.cavHorse || 'horse_fjord')) || { tpl: SRC.horse, seat: SRC.seat }, // (C2b: his cavalry's horse)
      hc = cloneHorse(H.tpl, team), U = new THREE.Group();
    U.add(hc); U.add(R.root); R.root.position.set(0, H.seat.top + (.38 + .04) * sc, H.seat.z); // (his hips, .38 below his root, on the seat)
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
