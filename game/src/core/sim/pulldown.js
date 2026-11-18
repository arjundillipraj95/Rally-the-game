// PULL1 the pull down (agreed 18 Nov): any champion on foot can drag a passing enemy rider out of the saddle. As a
// rider comes by within reach at speed, a ring closes on him (render/pullfx.js); press Attack as it closes: on the
// beat ('perfect') or near it ('good') he's pulled off, the horse bolts unhurt, he takes a blow and is down a moment.
// A Raider only comes off on the beat. Early or late, it's a normal swing. Computer captains catch it now and then.
// Numbers in PULL (config.js).
import { PULL, RALLY } from '../../config.js';
import { G, isEnemy } from '../state.js';
import { champOf } from '../../champions/index.js';
import { dismount, gainRally } from './army.js';
import { hit } from './melee.js';
import { fx, sound } from './util.js';

// the nearest enemy rider passing him: s from now to the beat (<0: past it) and how close he comes
export function pullTiming(p, look = PULL.good) {
  let best = null;
  for (const o of G.units) {
    if (o.dead || !o.mounted || !o.leader || !isEnemy(p, o)) continue;
    const rx = o.x - p.x, rz = o.z - p.z; if (rx * rx + rz * rz > 400) continue;
    const vx = o.vx || 0, vz = o.vz || 0, v2 = vx * vx + vz * vz; if (v2 < PULL.spd * PULL.spd) continue;
    const t = -(rx * vx + rz * vz) / v2, near = Math.hypot(rx + vx * t, rz + vz * t);
    if (near > PULL.reach + (o.r || .9) || t - PULL.lead < -look || t - PULL.lead > Math.max(look, PULL.show)) continue;
    if (!best || Math.abs(t) < Math.abs(best.t)) best = { o, t: t - PULL.lead, near }; // (t: from the beat)
  }
  return best;
}
// 'perfect', 'good' or '' for Attack pressed now (a joined phone's press arrives late: a little slack)
export function pullQuality(p, T) {
  if (!T) return ''; const s = p.remote ? PULL.remote : 0, a = Math.abs(T.t);
  return a <= PULL.perfect + s ? 'perfect' : a <= PULL.good + s ? 'good' : '';
}
// Attack pressed on foot: true when it pulled a rider down (instead of the swing)
export function tryPull(p) {
  if (!p || p.mounted || p.dead) return false;
  const T = pullTiming(p), q = pullQuality(p, T); if (!q) return false;
  const o = T.o; if (q === 'good' && champOf(o.ti).cls === 'raider') return false;
  p.face = Math.atan2(o.x - p.x, o.z - p.z); p.swing = .38; p.swingKind = 0; p.cd = PULL.cd; p.lastSwingT = G.T;
  dismount(o, 'off'); o.vx *= .2; o.vz *= .2;
  hit(p, o, PULL.mult, { stun: PULL.stun, kb: .05, unparryable: true, unblockable: true });
  gainRally(p, RALLY.unhorse); fx('fxmsg', { k: 'fxpull', u: o, a: p, q }); sound('heavy', o.x, o.z);
  return true;
}
// a computer captain on foot: tries once a pass, catches it `ai` of the time (by difficulty)
export function aiPull(u) {
  const T = pullTiming(u); if (!T || Math.abs(T.t) > PULL.perfect || u.cd > 0 || u.stun > 0) return false;
  if (u.pullTry === T.o.id + ':' + Math.round(G.T)) return false; u.pullTry = T.o.id + ':' + Math.round(G.T);
  return Math.random() < PULL.ai[G.diff | 0] && tryPull(u);
}
