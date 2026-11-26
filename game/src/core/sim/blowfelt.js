// FEEL1b (Arjun 25 Nov): a champion's basic blow is felt by the one it lands on. A melee blow from a champion that
// takes health off another champion is a moment on every phone ('fxchamp', heavy = the shield bash: see
// render/champhit.js). The shield bash also shoves the enemy soldiers in front of him back a step (BASH.shove).
import { BASH } from '../../config.js';
import { G, isEnemy } from '../state.js';
import { fx } from './util.js';
import { push } from './army.js';

export function blowFelt(u, tg, hp0) {
  if (!u || !u.leader || u.mounted) return;
  const bash = (u.swingKind | 0) === 6;
  if (tg && tg.hp < hp0 && !tg.dead && (tg.leader || bash)) fx('fxmsg', { k: 'fxchamp', u: tg, a: u, heavy: bash }); // (a soldier only for the bash: his stagger)
  if (!bash) return;
  const S = BASH.shove, fx0 = Math.sin(u.face), fz0 = Math.cos(u.face);
  for (const o of G.units) {
    if (o.dead || o.leader || o === tg || !isEnemy(o, u) || o.mounted) continue;
    const dx = o.x - u.x, dz = o.z - u.z, d = Math.hypot(dx, dz);
    if (d > S.r || d < .01 || (dx * fx0 + dz * fz0) / d < S.cos) continue;
    push(o, dx / d * S.kb, dz / d * S.kb, S.stun); fx('fxmsg', { k: 'fxchamp', u: o, a: u, heavy: true, shove: true }); // (FEEL1: he staggers back too)
  }
}
