// (C3a) a champion's soldiers. Neutral soldiers are the baseline (config FOOT_TIERS, ARCH_TIERS). An army's soldiers
// take every stat their champion has off the base champion, by the same share (Arjun 17 Nov): Titus has 20% more
// health than the base, so do his men; he swings 14% slower, so do they. Upgrades keep their step over that.
// Spearmen: a champion's footmen carry the spear from the start when his page says `spearmen`.
import { FOOT_TIERS, ARCH_TIERS, THROWER_TIERS, SWORD_TIERS, CAV_TIERS, CHAMP_BASE as B } from '../config.js';
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
  const rows = { foot: FOOT_TIERS, arch: ARCH_TIERS, thrower: THROWER_TIERS, sword: SWORD_TIERS, cav: CAV_TIERS }[kind]; if (!rows) return null; // (C2: and stone throwers) (C2b: swordsmen and cavalry)
  const P = champOf(ti).tiers && champOf(ti).tiers[kind], t0 = rows[tier] || rows[0], o = P && P[tier]; // (C4: a champion's own line: names and changes)
  const t = o ? { ...t0, ...o, dmg: t0.dmg * (o.dmgX || 1), arrow: t0.arrow != null ? t0.arrow * (o.dmgX || 1) : t0.arrow } : t0, k = shares(ti); if (!k) return t;
  return { ...t, hp: t.hp * k.hp, dmg: t.dmg * k.dmg, arrow: t.arrow != null ? t.arrow * k.dmg : t.arrow, cd: t.cd * k.gap, shoot: t.shoot != null ? t.shoot * k.gap : t.shoot,
    spd: t.spd * k.spd, reach: t.reach * k.reach, range: t.range != null ? t.range * k.range : t.range, horse: t.horse != null ? t.horse * k.hp : t.horse }; // (C2b: his cavalry's horses too)
}
export const spearman = u => !!u && u.kind === 'foot' && !u.neutral && (u.tier >= 1 || !!(own(u.ti) && own(u.ti).spearmen));
