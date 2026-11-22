// Battle rules: Sigrun's (C5; card docs/tickets/C5.md). Her basic hits on the wolf (claw, claw, bite), her Pounce,
// Spin and the Hunt; her riders' boar's snout. Numbers are on her page (champions/sigrun.js). Host and solo; every
// phone draws them from the unit's state and the 'fxwolf' / 'fxsig*' moments (render/sigrunfx.js).
import { CAPTAIN_COMBAT as CC } from '../../config.js';
import { G } from '../state.js';
import { champOf } from '../../champions/index.js';
import { paceOf } from '../../champions/stats.js';
import { startSwing } from './melee.js';
import { softAim } from './captain.js';
import { fx } from './util.js';

// a champion riding a wolf (her page's mount.kind)
export const wolfRider = p => !!(p && p.leader && p.mounted && (champOf(p.ti).mount || {}).kind === 'wolf');
// (C5b) a press on the wolf: claw, claw, bite at her rate, on what is close ahead; the wolf strikes, she leans into it,
// and they ride on at `pace` meanwhile (no dead stop). The bite is the boosted third (x1.5) and slows its mark.
export function wolfStrike(p) {
  if (!p || p.dead || p.cd > 0 || p.stun > 0) return false;
  const W = champOf(p.ti).wolfHits, S = CC.sword, k = paceOf(p.ti);
  const combo = G.T - p.lastSwingT < S.window * k ? (p.combo + 1) % 3 : 0, fin = combo === 2, best = softAim(p, W.aim);
  if (!startSwing(p, best)) return false;
  Object.assign(p.pending, { t: W.t, mult: fin ? S.finisherMult : S.mult, kb: fin ? .6 : .2, slow: fin ? [W.slow, W.slowT] : null });
  if (best) p.face = Math.atan2(best.x - p.x, best.z - p.z);
  p.cd = (fin ? S.finisherCd : S.cd) * k; p.combo = combo; p.swingKind = combo === 2 ? 4 : combo; p.lastSwingT = G.T;
  p.wolfPaceT = G.T + W.paceT; // (army.js speedOf: ridden on at her strike pace)
  const m = fin ? 'bite' : combo ? 'clawL' : 'clawR';
  fx('fxmsg', { k: 'fxwolf', u: p, q: m }); // (every phone: the wolf's strike and its sound)
  return true;
}
