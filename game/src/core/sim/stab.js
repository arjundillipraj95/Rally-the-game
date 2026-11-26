// FEEL2b (Arjun 26 Nov): behind the Shield of Cassius his Attack is a short gladius stab over the top of the shield,
// the legionary's blow: only at what is in front of the shield, weaker and quicker than a slash (sp2.stab on his page).
// The shield stays up; he keeps facing his front.
import { G } from '../state.js';
import { angDiff } from '../world.js';
import { champOf } from '../../champions/index.js';
import { paceOf } from '../../champions/stats.js';
import { startSwing } from './melee.js';
import { softAim } from './captain.js';

export function scutumStab(p) {
  const S = champOf(p.ti).sp2 && champOf(p.ti).sp2.stab; if (!S || !p || p.dead || p.mounted) return false;
  if (p.cd > 0 || p.stun > 0) { p.atkBuf = .4; return true; }
  p.atkBuf = 0;
  const tg = softAim(p, S.reach + 1);
  const ok = tg && Math.abs(angDiff(p.face, Math.atan2(tg.x - p.x, tg.z - p.z))) < S.arc ? tg : null;
  if (!startSwing(p, ok)) return true;
  Object.assign(p.pending, { mult: S.mult, reachB: S.reachB, kb: .3, stab: true });
  p.cd = S.cd * paceOf(p.ti); p.swingKind = 3; p.combo = 0; p.lastSwingT = G.T; p.stabT = G.T;
  return true;
}
