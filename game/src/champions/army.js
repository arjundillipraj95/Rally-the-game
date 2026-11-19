// (C3a) a champion's soldiers. Neutral soldiers are the baseline (config FOOT_TIERS, ARCH_TIERS). An army's soldiers
// take every stat their champion has off the base champion, by the same share (Arjun 17 Nov): Titus has 20% more
// health than the base, so do his men; he swings 14% slower, so do they. Upgrades keep their step over that.
// Spearmen: a champion's footmen carry the spear from the start when his page says `spearmen`.
import { FOOT_TIERS, ARCH_TIERS, THROWER_TIERS, CHAMP_BASE as B } from '../config.js';
import { ARMIES } from '../core/state.js';
import { champOf } from './index.js';

const own = ti => (ti >= 0 && ti < ARMIES ? champOf(ti) : null);
// his shares off the base champion (1: the same)
export function shares(ti) {
  const c = own(ti); if (!c) return null;
  const s = c.stats, r = (v, b) => (v == null ? 1 : v / b);
  return { hp: r(s.hp, B.hp), dmg: r(s.dmg, B.dmg), gap: 1 / r(s.rate, B.rate), spd: r(s.spd, B.spd), reach: c.ranged ? 1 : r(s.reach, B.reach), range: c.ranged ? r(s.reach, B.rangedReach) : 1 };
}
export function unitRow(ti, kind, tier = 0) {
  const rows = kind === 'foot' ? FOOT_TIERS : kind === 'arch' ? ARCH_TIERS : kind === 'thrower' ? THROWER_TIERS : null; if (!rows) return null; // (C2: and stone throwers)
  const t = rows[tier] || rows[0], k = shares(ti); if (!k) return t;
  return { ...t, hp: t.hp * k.hp, dmg: t.dmg * k.dmg, arrow: t.arrow != null ? t.arrow * k.dmg : t.arrow, cd: t.cd * k.gap, shoot: t.shoot != null ? t.shoot * k.gap : t.shoot,
    spd: t.spd * k.spd, reach: t.reach * k.reach, range: t.range != null ? t.range * k.range : t.range };
}
export const spearman = u => !!u && u.kind === 'foot' && !u.neutral && (u.tier >= 1 || !!(own(u.ti) && own(u.ti).spearmen));
