// The new captains: the generated, painted and rigged 3D captain in place of the built-from-parts
// one, posed every frame from the same game state the old one reads (moving, swinging, guarding, a
// heavy wind-up, a bash, a parry, reeling from a clout). On by default; ?models=0 in the address (or
// localStorage 'rally.models' = '0') turns it off and the game looks as before.
// Captains only for now: a few skinned meshes are cheap; soldiers (hundreds) need baked instancing.
// SPLIT2: loading and making a figure are in heroload.js, horses in herohorse.js, distant figures in herofar.js.
import * as THREE from 'three';
import { ANIM, EXEC, FEEL } from '../config.js';
import { G } from '../core/state.js';
import { scene } from './scene.js';
import { applyPose, moveAt, mixPose, CLIPS, POSES } from './rig/captainrig.js';
import { rigClip, addClipArmour, play, tick, loadClipBody, head, ended } from './rig/cliprig.js';
import { still, facing } from '../core/charge.js';
import { abOn, abOld } from './batch.js';
import { foldShow } from './rig/fold.js';
import { strikeYaw, lookAlong } from './rig/strikeface.js';
import { aimShaft } from './rig/shaft.js';
import { duelLook, champSwing } from './rig/champgear.js';
import { skyShot } from './devifx.js';
import { on, SRC, heroesOn, make, weaponOf, keyOf, RIDE } from './heroload.js';
import { gait } from './herohorse.js';
import { sweepFar } from './herofar.js';
export { heroesOn } from './heroload.js';
export { drawFreeHorses } from './herohorse.js';
export { drawFar } from './herofar.js';

let FRAME = 0; // (frames drawn: what was drawn this frame stays up, the rest is taken down)
const live = new Map(); // unit -> { R, weapon, team, run, moveName, moveT, hp, sc, U, legs }
if (import.meta.env.DEV) window.__live = live; // (dev: tests look at a figure's bones)
const KIND = ['forehand', 'backhand', 'overhead', 'thrust', 'spin', 'heavy', 'bash'];
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
    const late = !h.fell && (u.deadT || 0) > 1.5; // (CORPSE1: first drawn after he fell: already lying, not falling again)
    if (!h.fell) { h.fell = 'clip'; const back = u.hitAng != null && Math.cos(u.hitAng - u.face) < 0; h.an = { key: 'death', steps: [back ? ANIM.death.back : ANIM.death.front] }; } // (struck from behind, he pitches forward)
    for (const part of ['lo', 'up']) { const e = play(R, part, h.an.steps[0], 'death', { fade: late ? 0 : ANIM.fast, loop: false }); e.act.timeScale = ANIM.death.rate; if (late) e.act.time = e.C.dur - 1e-3; }
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
  if (!still(u)) return false; // (F9: on the move or off balance: he's bowled over, no brace)
  if (chFrame !== FRAME) { chFrame = FRAME; chList = G.units.filter(c => c.mounted && !c.dead && (c.charge > 0 || Math.hypot(c.vx || 0, c.vz || 0) > 9)); }
  for (const c of chList) {
    if (G.ALLY[c.ti % 4] === G.ALLY[u.ti % 4]) continue;
    const dx = u.x - c.x, dz = u.z - c.z, d = Math.hypot(dx, dz); if (d > 10 || d < .5) continue;
    if (((c.vx || 0) * dx + (c.vz || 0) * dz) / d > 5 && facing(u, c)) return true; // (F9: from the flank he's bowled over: no brace)
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
  if (u.chasmT > 0 || u.chasmAt) { // (F7 "300": over the chasm's edge, arms and legs windmilling; slow while he teeters at the rim)
    const Ch = FEEL.chasm, e = u.chasmAt ? performance.now() / 1000 - u.chasmAt : Ch.fall - u.chasmT;
    const f = h.flail = (h.flail || 0) + dt * 11 * (e < Ch.teeter ? Ch.slow : 1);
    P = { ...LIMP, spine: [e < Ch.teeter ? -.35 : .2, 0, Math.sin(f * .5) * .2], upperArm_R: [Math.sin(f) * 1.4, 0, 1.6 + Math.cos(f * .7) * .6], upperArm_L: [Math.sin(f + 2) * 1.4, 0, -1.6 - Math.cos(f * .7 + 1) * .6],
      thigh_R: [Math.sin(f + 1) * .9, 0, -.2], thigh_L: [Math.sin(f + 3.5) * .9, 0, .2], shin_R: [.6, 0, 0], shin_L: [.6, 0, 0] }; rate = 30; }
  else if (u.execV) { P = POSES.kneel; rate = 10; }
  else if (u.execA && !h.U && h.exT < EXEC.slide) { P = CLIPS.run(h.run, .8); tag = 'loco'; } // (F7: two quick steps into place first)
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
  if (h.cg) duelLook(R, h.cg, h.cl, !!u.duelId); // (C4g: daggers in a duel)
  // what has just happened
  if (u.swing > (h.swPrev || 0) + .05) { // a blow begun: the sword's combo, thrust and boosted blows have clips
    h.swN = (h.swN || 0) + 1; h.swT = T - Math.max(0, .38 - u.swing); // (F25: from the moment the rules began it, so it lands on their frame)
    const boosted = (u.evade && T - u.evade.t < ANIM.boostWithin) || (u.pending && u.pending.leap);
    const set = h.weapon === 'sword' ? ANIM.swingKind : ANIM.weaponSwing[h.weapon]; // (F17: spear and javelins have clips too)
    h.swClip = set && kind < set.length ? (boosted && h.weapon === 'sword' && kind < 2 ? ANIM.boost : h.weapon === 'spear' && kind === 3 && u.combo === 1 ? ANIM.spearSweep : set[kind]) : null; if (h.cl) h.swClip = champSwing(h.cl, kind, !!u.duelId, h.swClip); if (h.bowman) h.swClip = 'bowRecoil'; // (ARCH2: a clip archer looses with the bow clips) // (F17c: the spear's second press, the sweep)
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
  if (h.xHeld && (!X || !X.hold || xKey !== h.xHeld.key)) { const then = ANIM.acts[h.xHeld.name].then; if (then) h.xAfter = { name: then, key: then + T, steps: ANIM.acts[then].steps, legs: ANIM.acts[then].legs, rate: ANIM.acts[then].rate, cut: ANIM.acts[then].cut }; h.xHeld = null; }
  if (h.an && /^(knockdown|getUp)/.test(h.an.key) && (sp > 1.5 || u.swing > 0 || blocking)) { if (X && X.name === 'knockdown') h.xDone = xKey; h.an = null; h.xAfter = null; } // (FALL1: up and moving or fighting: the knockdown lets go at once)
  const imp = ANIM.impact, bh = ANIM.blockHit;
  let W = null;
  if (code) W = null;
  else if (h.turn) W = { key: h.turn.key, steps: [ANIM.turn.clip], legs: true, rate: ANIM.turn.rate, fade: ANIM.fast, turn: true };
  else if (h.swClip && h.swT != null && T - h.swT < .38 + ANIM.swingTail) W = { key: 'sw' + h.swN, steps: [ANIM.clipOf[h.swClip] || h.swClip], swing: ANIM.swing[h.swClip], fade: ANIM.fast, legs: ANIM.swingLegs.includes(h.swClip) };
  else if (blocking && T - h.blockHitT >= 0 && T - h.blockHitT < C[bh.clip].dur / bh.rate) W = { key: 'bh' + h.blockHitT, steps: [bh.clip], rate: bh.rate, fade: ANIM.fast };
  else if (blocking) W = { key: 'blk' + h.blkN, steps: ANIM.block, hold: true };
  else if (h.impT != null && T - h.impT < C[imp.clips[h.impN % imp.clips.length]].dur / imp.rate) W = { key: 'imp' + h.impN, steps: [imp.clips[h.impN % imp.clips.length]], rate: imp.rate, fade: ANIM.fast };
  else if (X && (X.hold || h.xDone !== xKey)) { W = { key: xKey, steps: ANIM.acts[X.name].steps, legs: ANIM.acts[X.name].legs, hold: !!(X.hold || ANIM.acts[X.name].hold), act: true, name: X.name, rate: ANIM.acts[X.name].rate, cut: ANIM.acts[X.name].cut, down: X.down, t0: X.t }; if (X.hold) h.xHeld = { name: X.name, key: xKey }; }
  else if (h.xAfter) W = h.xAfter;
  h.sky = !!h.bowman && !code && skyShot(u); // (ARCH2: loosing into the Arrow storm: drawn, leaning back to the sky)
  if (!W && !code && (h.bowman || (h.cl && h.cl.bow)) && !u.duelId && !u.mounted && (h.sky || u.aim || u.firingT > T)) W = { key: 'aim', steps: ['bowOverdraw'], hold: true, fade: ANIM.fast }; // (ARCH2: drawn and aimed between shots)
  if (W && !(h.an && h.an.key === W.key)) h.an = { ...W, i: 0 }; else if (!W) h.an = null;
  const an = h.an, [loco, lrate] = locoClip(u, h, sp);
  if (an) { // step through the move's clips; a finished move lets go
    const e = head(R, 'up'), last = an.i >= an.steps.length - 1;
    const cutAt = an.cut && e && e.act.time >= e.C.dur * an.cut, lying = an.down && G.T < an.t0 + an.down; // (FALL1: a cut clip ends at its cut, or once he's no longer down)
    if (e && e.name === an.steps[an.i] && R.up.key === an.key + ':' + an.i && (ended(e) || (cutAt && !lying))) {
      if (!last) an.i++;
      else if (!an.hold) { if (an.act) h.xDone = an.key; const nx = an.act && ANIM.acts[an.name] && ANIM.acts[an.name].then; if (nx) { const A = ANIM.acts[nx]; h.xAfter = { name: nx, key: nx + T, steps: A.steps, legs: A.legs, rate: A.rate, cut: A.cut }; } if (an === h.xAfter || (h.xAfter && an.key === h.xAfter.key)) h.xAfter = null; if (an.turn) h.turn = null; h.an = null; } // (FALL1: a move's follow-on, e.g. the get-up)
    }
  }
  let turn = 0;
  if (h.an) {
    const name = an.steps[an.i], loops = !!an.hold && an.i === an.steps.length - 1, full = an.legs || (loco === 'idle' && !h.sky), key = an.key + ':' + an.i;
    const S = an.swing, e = play(R, 'up', name, key, { fade: an.i ? ANIM.fast : an.fade || ANIM.fade, loop: loops, at: S ? Math.max(0, S.hit - S.lead) : 0 }); // (a blow is entered a little before it lands, so it lands when the rules say it does)
    e.act.timeScale = S ? (e.act.time < S.hit ? S.lead / (S.hd || ANIM.hitDelay) : S.after) : an.rate || 1; // (F25 hd: this blow's own landing time)
    if (an.cut && e.act.time >= e.C.dur * an.cut) e.act.timeScale = 0; // (FALL1: held at the cut: lying there while the rules keep him down)
    if (full) { const l = play(R, 'lo', name, key, { fade: an.i ? ANIM.fast : an.fade || ANIM.fade, loop: loops, at: e.act.time }); l.act.timeScale = e.act.timeScale; l.act.time = e.act.time; }
    else { const lg = h.sky && loco === 'idle' ? ANIM.skyLegs : loco; play(R, 'lo', lg, 'L' + lg).act.timeScale = lg === loco ? lrate : 1; } // (ARCH4: low on his knees under the storm)
    if (an.turn) { const k = clampN(e.act.time / e.C.dur, 0, 1); turn = -h.turn.d * (1 - k * k * (3 - 2 * k)); }
  } else {
    const l = play(R, 'lo', loco, 'L' + loco), e = play(R, 'up', loco, 'L' + loco, { fade: code ? ANIM.fade : ANIM.out, loop: true });
    l.act.timeScale = lrate; e.act.timeScale = lrate; e.act.time = l.act.time; // (one clip, head to toe; F17c: a spear is held upright in it, render aimShaft)
  }
  if (code) { if (!h.coded) h.cur = null; h.cur = settle(h.cur, P, 1 - Math.exp(-rate * Math.min(dt, .1))); } // (a code pose is eased toward as before; the blend from the clips eases it in)
  h.coded = code;
  tick(R, dt, { P: code ? h.cur : h.U ? P : null, code, ride: !!h.U, reel: a });
  if (h.sky) { h.skyK = Math.min(1, (h.skyK || 0) + dt * 3); } else if (h.skyK) h.skyK = Math.max(0, h.skyK - dt * 3);
  if (h.skyK && R.mx) { R.mx.Spine.rotateX(ANIM.skyLean[0] * h.skyK); R.mx.Spine2.rotateX(ANIM.skyLean[1] * h.skyK); } // (eased in and out)
  return turn;
}

// pose and place one captain. a: the old renderer's state for him (lift, sink, yaw, stumble).
// Returns false when this one is left to the old renderer (models not loaded, mounted, dead).
export function drawHero(u, a, dt) {
  // while the new models load, the old captain stays hidden (no flash of the old one)
  if (on && !SRC) return !u.dead && (u.kind === 'captain' || u.kind === 'foot' || u.kind === 'arch');
  if (!heroesOn() || (u.kind !== 'captain' && u.kind !== 'foot' && u.kind !== 'arch') || u.hidden) return false;
  if (u.dead && !a.rag) return false; // (the fallen: drawn as they go down, lie there and sink (CORPSE1: to the end, never the old figure))
  let h = live.get(u);
  if (h && (h.weapon !== weaponOf(u) || h.key !== keyOf(u) || h.mounted !== !!u.mounted)) { drop(h); live.delete(u); h = null; }
  if (!h) { h = make(u); live.set(u, h); }
  if (h.fold && abOn()) foldShow(h.fold, abOld()); // (dev, ?f1=ab: the test draws one frame both ways)
  h.seen = FRAME; // (drawn this frame: by a frame count, since the game clock stands still on the home screen)
  const R = h.R, sp = u.execA && !h.U && (h.exT || 0) < EXEC.slide ? ANIM.loco.runAbove * 1.3 : Math.hypot(u.vx || 0, u.vz || 0), mv = Math.min(1, sp / 4); // (F7: the executioner's two steps)
  h.run += dt * sp / (2.0 * h.sc * 1.5); // (the stride keeps time with the ground: one stride (two steps) per 2 m at his size, so his feet don't skate)
  if (u.dead) return drawFallen(u, a, h, dt);
  const blocking = (u.human && u.blocking) || u.blockT > 0 || !!u.scutumUp, hurt = u.hp < h.hp - ANIM.impact.minDmg;
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
  top.rotation.set(0, (R.clip ? strikeYaw(u, h, G.T) : u.face) + (a.yaw || 0) + turn, 0); // (F26: a spear strike turns him so the clip's strike lands along his facing)
  if (u.ram && !h.U && R.clip) { top.rotation.order = 'YXZ'; h.lean = (h.lean || 0) + ((ANIM.acts.ram.lean || 0) - (h.lean || 0)) * Math.min(1, dt * 18); top.rotation.x = h.lean; } else h.lean = 0; // (RAM2: leaning into the charge)
  if (roll) { R.root.rotateZ(roll); R.root.position.y -= .25 * Math.sin(Math.abs(roll) / 2) * h.sc; } // (the side roll: a full turn about his forward axis, tucked low)
  if (R.cape) { const k = R.cape.userData, want = k.base + Math.min(.55, sp * .07) + Math.sin(FRAME * .09 + u.id) * .03 * mv; k.a = k.a === undefined ? want : k.a + (want - k.a) * Math.min(1, dt * 6); R.cape.rotation.x = k.a; } // (C4: lifts behind him as he runs, eased)
  top.visible = true;
  if (h.legs) { const [bob, pitch] = gait(h.legs, sp, dt); top.position.y += bob; top.rotation.order = 'YXZ'; top.rotation.x = pitch; } // (the horse walks, trots or gallops for its speed, the rider going with it)
  if (R.clip) lookAlong(R, h, top, u.face + (a.yaw || 0)); // (F26: his head, then his chest, toward the target)
  if (R.shaft) aimShaft(u, h, R, dt);
  return true;
}
// which blow his clips are playing (null between blows), for the swoosh
export const heroScale = u => { const h = live.get(u); return h ? h.R.root.scale.x : 0; }; // (SIZE1: the size a unit is drawn at: tests read it)
export const heroBlow = u => { const h = live.get(u); return h && h.swClip && h.swT != null && G.T - h.swT < .38 + ANIM.swingTail ? h.swClip : null; };
// where his weapon's blade is in the world this frame (base, tip): false if he isn't drawn on the clip skeleton
export function heroBlade(u, base, tip) {
  const h = live.get(u); if (!h || !h.R.clip || !h.R.blade || h.seen !== FRAME) return false;
  if (!h.R.shaft) (h.U || h.R.root).updateMatrixWorld(true); // (a shaft's frame was brought up to date when it was aimed)
  h.R.blade.base.getWorldPosition(base); h.R.blade.tip.getWorldPosition(tip); return true;
}
if (import.meta.env.DEV) window.__f8 = { live, src: () => SRC, THREE, rigClip, addClipArmour, play, tick, loadClipBody, ANIM }; // (dev: tests read the captains' clips and bones)
// after a frame's drawing: captains no longer drawn this way (gone, mounted, dead) are taken down
export function sweepHeroes() {
  if (!on) return;
  sweepFar();
  for (const [u, h] of live) if (h.seen !== FRAME) { if (u.dead || !G.units.includes(u)) { drop(h); live.delete(u); } else (h.U || h.R.root).visible = false; }
  FRAME++;
}
