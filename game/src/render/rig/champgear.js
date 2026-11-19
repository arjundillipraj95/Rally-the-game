// C4i: a champion's own hand pieces, horse and clip names, from his page's look (champions/<id>.js):
// Devi's bow in her left fist and an arrow in her right (the sword hidden); in a duel the bow goes on her
// back and she holds an arrow in each hand like daggers (C4g). Her clips are the captain's file's, renamed
// per champion (look.clips for walking, look.swings for her shots, look.duel for the dagger blows).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const GEAR = {}; // name -> loaded scene (bows, arrows)
const HORSES = {}; // name -> { tpl, seat }
let started = null;
// load every champion's own pieces once the captain models are in (horses through warHorse, at the war horse's scale)
export function loadChampGear(champs, warHorse, scale) {
  if (started) return started;
  const L = new GLTFLoader(), all = [];
  for (const c of Object.values(champs)) {
    const k = c.look || {};
    for (const n of [k.bow, k.arrow, 'bow_devi']) if (n && !(n in GEAR)) { GEAR[n] = null; all.push(L.loadAsync(`models/${n}.glb`).then(g => { GEAR[n] = g.scene; }).catch(() => {})); }
    if (k.horse && !(k.horse in HORSES)) { HORSES[k.horse] = null; all.push(L.loadAsync(`models/${k.horse}.glb`).then(g => { HORSES[k.horse] = warHorse(g.scene, scale); }).catch(() => {})); }
  }
  return (started = Promise.all(all)); // (the figures wait for these: a bow is in the hand from the first one made)
}
// his own horse, if it has loaded (else the war horse)
export const champHorse = cl => (cl && cl.horse && HORSES[cl.horse]) || null;

// ARCH2: the grips, measured at full draw in the bow clips (store/_probe.mjs): the bow upright with its belly toward the
// mark, its grip in the left fist; the arrow from the right fingers toward the bow. The same for her archers (one rig).
const BOW_Q = new THREE.Quaternion(.4338, -.4689, -.3885, .6641), ARROW_Q = new THREE.Quaternion(.4702, -.5393, -.3777, .5878);
function holdBow(hand, o) { o.quaternion.copy(BOW_Q); o.position.set(0, .075, .02); hand.add(o); }
function holdArrow(hand, o) { o.quaternion.copy(ARROW_Q); o.position.set(0, .07, 0); hand.add(o); }
// a clip-rig archer (any army's): her bow in the left fist, the code's bow (made for the code poses) hidden, the bow clips
export const BOW_CLIPS = { idle: 'bowIdle', walk: 'bowWalkF', walkBack: 'bowWalkB', strafeL: 'bowWalkL', strafeR: 'bowWalkR', run: 'bowRun', runBack: 'bowWalkB', strafeRunL: 'bowWalkL', strafeRunR: 'bowWalkR' };
export function archerBow(R) {
  if (!R.clip) return false;
  const hr = R.bones.hand_R; for (const c of hr.children) if (!c.isBone) c.visible = false;
  const b = piece('bow_devi'); if (!b) return false; holdBow(R.bones.hand_L, b); R.cmap = Object.assign({}, BOW_CLIPS); return true;
}
const piece = n => { const s = GEAR[n]; if (!s) return null; const o = s.clone(true); o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.frustumCulled = false; } }); return o; };
// her bow and arrows on the clip rig's sockets (the hands' +z along the fingers, as the sword is held)
export function champGear(R, cl) {
  if (!cl || !R.clip) return null;
  if (cl.clips) R.cmap = Object.assign({}, cl.clips);
  if (!cl.bow) return null;
  const hr = R.bones.hand_R, hl = R.bones.hand_L, chest = R.bones.chest;
  for (const c of hr.children) if (!c.isBone) c.visible = false; // (the sword: hidden; she draws arrows)
  const g = { bow: piece(cl.bow), back: piece(cl.bow), arrow: piece(cl.arrow), arrow2: piece(cl.arrow), duel: null, cmap: R.cmap };
  if (g.bow) holdBow(hl, g.bow);
  if (g.arrow) holdArrow(hr, g.arrow);
  if (g.back) { g.back.rotation.set(0, 0, Math.PI * .72); g.back.position.set(.05, .05, -.22); g.back.visible = false; chest.add(g.back); } // (across her back, by the quiver)
  if (g.arrow2) { g.arrow2.rotation.x = Math.PI / 2; g.arrow2.position.set(.05, 0, -.1); g.arrow2.visible = false; hl.add(g.arrow2); }
  return g;
}
// in a duel: the bow on her back, an arrow in each fist, the dagger clips; out of it, back to the bow
export function duelLook(R, g, cl, on) {
  if (!g || g.duel === on) return; g.duel = on;
  if (g.bow) g.bow.visible = !on; if (g.back) g.back.visible = on; if (g.arrow2) g.arrow2.visible = on;
  R.cmap = on ? {} : g.cmap; // (in a duel she moves as the captain does, no bow held)
}
// the clip a blow plays: her own for this kind (a dagger one in a duel), else the rig's
export function champSwing(cl, kind, inDuel, fallback) {
  const m = cl && (inDuel ? cl.duel : cl.swings);
  return m && m[kind] ? m[kind] : fallback;
}
