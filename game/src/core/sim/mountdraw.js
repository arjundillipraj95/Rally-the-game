// FEEL2g (Arjun 26 Nov): a ranged champion on her mount (Devi on her horse) shoots by drawing the bow. A tap: a quick,
// weaker shot at whatever the bow finds. Held: she draws; the aim narrows as the draw fills and turns gold at full draw
// for `gold` s. Let go on gold: 'perfect' (more damage, a longer reach, and the one hit is slowed); early: a normal shot;
// held past gold: her arm tires and the shot is weak. The faster she rides, the longer the draw takes to fill, so a
// perfect shot at a full gallop is the hardest. Numbers in RANGED.draw. Her own phone draws the aim (ui/drawaim.js).
import { RANGED } from '../../config.js';
import { G } from '../state.js';
import { fx } from './util.js';
import { blowGap } from '../../champions/stats.js';
import { loose, rangedTarget, rangeOf } from './ranged.js';

const D = RANGED.draw;
// how long the draw takes to fill at her pace
export const drawFull = p => D.full * (1 + D.gallopK * Math.min(1.5, Math.hypot(p.vx || 0, p.vz || 0) / D.refSpd));
// what a release after t s of drawing is: 'tap' | 'early' | 'perfect' | 'tired'
export function drawQuality(p, t) {
  if (t < D.tap) return 'tap';
  const full = drawFull(p), s = p.remote ? D.remote : 0;
  return t < full - s ? 'early' : t <= full + D.gold + s ? 'perfect' : 'tired';
}
// each step while she is mounted (the host, for her and for a joined player): true when it handled the press
export function mountedDraw(p, held, dt) {
  if (!p.mounted) { p.drawT = 0; return false; }
  if (held) { p.drawT = (p.drawT || 0) + dt; return true; }
  const t = p.drawT || 0; p.drawT = 0;
  if (t <= 0 || p.cd > 0 || p.stun > 0 || p.tvolley || p.pierce) return true;
  const q = drawQuality(p, t), perfect = q === 'perfect';
  const tg = rangedTarget(p, rangeOf(p) * (perfect ? D.rangeX : 1)); if (!tg) return true;
  p.face = Math.atan2(tg.x - p.x, tg.z - p.z);
  loose(p, tg, q === 'tap' ? D.tapX : perfect ? D.perfectX : q === 'tired' ? D.tiredX : 1);
  if (perfect && !tg.bld) { tg.slowUntil = G.T + D.slow[1]; tg.slowK = 1 - D.slow[0]; }
  p.cd = blowGap(p.ti) * (q === 'tap' ? D.tapCd : 1); p.swing = .38; p.swingKind = 8; p.lastSwingT = G.T; p.firingT = G.T + p.cd + RANGED.hold;
  if (p.human) fx('fxmsg', { k: 'fxdraw', u: tg.bld ? p : tg, a: p, q });
  return true;
}
