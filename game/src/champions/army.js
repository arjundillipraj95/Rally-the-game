// (C3a) a champion's soldiers: today's rows for neutral soldiers and for a champion without an army shift (the
// legionary); for one with it, the row on a 100-health man (config SOLDIER), then his shift (% off it). Upgrades
// keep today's step over the base. Spearmen: his footmen carry the spear from the start (`spearmen` on his page).
import { FOOT_TIERS, ARCH_TIERS, SOLDIER } from '../config.js';
import { ARMIES } from '../core/state.js';
import { champOf } from './index.js';

const own = ti => (ti >= 0 && ti < ARMIES && champOf(ti).army ? champOf(ti) : null);
export function unitRow(ti, kind, tier = 0) {
  const rows = kind === 'foot' ? FOOT_TIERS : kind === 'arch' ? ARCH_TIERS : null;
  if (!rows) return null;
  const t = rows[tier] || rows[0], c = own(ti); if (!c) return t;
  const B = SOLDIER[kind], sh = c.army[kind] || {}, p = v => 1 + (v || 0) / 100, r = { ...t };
  r.hp = t.hp / rows[0].hp * B.hp * p(sh.hp); r.spd = t.spd * p(sh.spd);
  if (kind === 'foot') r.dmg = t.dmg / rows[0].dmg * B.dmg * p(sh.dmg);
  else r.arrow = t.arrow / rows[0].arrow * B.dmg * p(sh.dmg);
  return r;
}
export const spearman = u => !!u && u.kind === 'foot' && !u.neutral && (u.tier >= 1 || !!(own(u.ti) && own(u.ti).spearmen));
