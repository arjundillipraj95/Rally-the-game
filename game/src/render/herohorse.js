// The war horse's legs and gaits, and the horses with no rider on them. (SPLIT2: from heroes.js)
import { TEAMS, FEEL } from '../config.js';
import { colorOf } from '../core/state.js';
import { scene } from './scene.js';
import { groundY } from '../core/world.js';
import { cloneHorse } from './warhorse.js';
import { on, SRC } from './heroload.js';

// the war horse's legs (render/warhorse.js hangs each leg's bones from pivots by these names)
const LEGS = { frontL: 1, frontR: 1, backL: 1, backR: 1 };
export const legsOf = hc => ({ hip: Object.fromEntries(Object.keys(LEGS).map(k => [k, hc.getObjectByName('leg_' + k)])), knee: Object.fromEntries(Object.keys(LEGS).map(k => [k, hc.getObjectByName('knee_' + k)])), body: hc.children[0], gp: 0, vs: 0, acc: 0, pitch: 0 });
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
export function gait(L, sp, dt) {
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
    if (!m) { const hc = cloneHorse(SRC.horse, h.ti != null && TEAMS[colorOf(h.ti)] ? TEAMS[colorOf(h.ti)].hex : null); scene.add(hc); m = { root: hc, legs: legsOf(hc), run: 0 }; freeH.set(h.key, m); }
    const sp = h.spd || 0; m.run += dt * (.55 + sp * .12);
    const down = h.state === 'dead' ? Math.min(1, (h.t || 0) * 2.5) : 0; // (a fallen horse rolls onto its side)
    const [bob, pitch] = gait(m.legs, down ? 0 : sp, dt);
    m.root.position.set(h.x, groundY(h.x, h.z) + bob, h.z);
    m.root.rotation.order = 'YXZ'; m.root.rotation.set(down ? 0 : pitch, h.face || 0, (h.fall || 1) * down * Math.PI / 2);
  }
  for (const [k, m] of freeH) if (!seen.has(k)) { scene.remove(m.root); freeH.delete(k); }
  return true;
}

// (FX2) a champion's horse taking a hit: rel is the blow's angle from its facing. It tosses its head and steps away
// from the blow; a heavy one (power FEEL.horse.rearAt or more) makes it rear, the rider staying on
export function buck(L, rel, power) {
  const H = FEEL.horse, B = L.bk || (L.bk = { rp: 0, rv: 0, sp: 0, sv: 0, yp: 0, yv: 0 });
  B.rv -= (power >= H.rearAt ? H.rear : H.toss) * power;
  B.sv -= Math.sin(rel) * H.side * power; B.yv -= Math.sin(rel) * H.twist * power;
  return power >= H.rearAt;
}
// each frame: its rear (pitch, nose up -), step aside (m, to its right +) and twist (rad), springing back
export function buckPose(L, dt) {
  const B = L.bk; if (!B) return null; const H = FEEL.horse, t = Math.min(dt, .05);
  B.rv += (-H.rearK[0] * B.rp - H.rearK[1] * B.rv) * t; B.rp = Math.max(-H.rearMax, B.rp + B.rv * t);
  for (const [p, v] of [['sp', 'sv'], ['yp', 'yv']]) { B[v] += (-H.sideK[0] * B[p] - H.sideK[1] * B[v]) * t; B[p] += B[v] * t; }
  if (Math.abs(B.rp) + Math.abs(B.sp) + Math.abs(B.yp) + Math.abs(B.rv) + Math.abs(B.sv) < 1e-3) { L.bk = null; return null; }
  return B;
}
