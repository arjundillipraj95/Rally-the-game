// FEEL1 (Arjun 25 Nov): a sword combo blow's clip fills the time to his next blow, so the body follows through
// instead of snapping at 1.5x and standing idle; the blow still lands when the rules say. And the shield bash is
// driven with the body: he leans and turns his shield shoulder into it (the rules step him in, BASH.step).
import { ANIM, CAPTAIN_COMBAT } from '../../config.js';
import { paceOf } from '../../champions/stats.js';

const F = ANIM.flow, clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = k => { k = clamp(k, 0, 1); return k * k * (3 - 2 * k); };

// at a blow's start: the clip's speed after it lands (after) and how long the blow is held (end, s from its start)
export function swingFlow(u, h, clip, dur) {
  const S = ANIM.swing[clip], k = u.swingKind | 0, end0 = .38 + ANIM.swingTail;
  h.swAfter = S && S.after; h.swEnd = end0; h.swHold = null;
  if (!S || !dur || h.weapon !== 'sword' || u.mounted || h.U || !F.kinds.includes(k)) return;
  const C = CAPTAIN_COMBAT.sword, hd = S.hd || ANIM.hitDelay;
  const gap = (k === 6 ? (u.combo === 2 ? C.finisherCd : F.bashGap) : C.cd) * paceOf(u.ti); // (to his next blow)
  h.swAfter = clamp((dur - S.hit) / Math.max(.05, gap - hd), F.min, F.max);
  h.swEnd = Math.max(end0, hd + (dur - S.hit) / h.swAfter - F.out); // (let go just before the clip ends: the idle blends in)
  const H = F.hold[clip]; if (H) { h.swHold = H.clip; h.swEnd = clamp(gap - H.free, H.min, H.max); } // (a short clip, e.g. the bash on the block clip: then held, shield up, to near his next blow)
}

// after the clips are posed: the shield bash's body (lean forward, shield shoulder driven round), weighted in up to
// the moment it lands, held, then eased out
export function bashBody(R, h, T) {
  if (h.swClip !== 'shieldBash' || h.swT == null || h.U || !R.mx || !R.mx.Spine) return;
  const B = F.bash, S = ANIM.swing.shieldBash, hd = S.hd || ANIM.hitDelay, t = T - h.swT, end = h.swEnd || .68;
  if (t < 0 || t > end) return;
  const w = ease(t / hd) * (t < hd + B.hold ? 1 : 1 - ease((t - hd - B.hold) / Math.max(.05, end - hd - B.hold)));
  R.mx.Spine.rotateX(B.lean * w);
  if (R.mx.Spine2) R.mx.Spine2.rotateY(B.twist * w);
  if (R.mx.Hips) R.mx.Hips.rotateX(B.hips * w);
}
