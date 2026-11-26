// A champion's numbers in battle (C1d, C1b): health and blow from his page's shares of an infantryman
// (config UNITS), grown by his level (LEVELS.grow), the same for a player and a computer champion.
import { LEVELS, CHAMP_BASE, CAPTAIN_COMBAT } from '../config.js';
import { G } from '../core/state.js';
import { champOf } from './index.js';

export const levelOf = ti => (G.teams && G.teams[ti] && G.teams[ti].lvl) || 1;
export const growth = (lv, k) => 1 + LEVELS.grow[k] * (lv - 1);
const st = (ti, k) => { const v = champOf(ti).stats[k]; return v == null ? CHAMP_BASE[k] : v; };
// (BAL1, Arjun 26 Nov) each champion grows in his own trait: his page's `levels` (health and blow a share a level; attack
// rate and run speed from level 1's to level 10's); his army grows the same way at its page's `armyGrow` shares
const L = ti => champOf(ti).levels || null;
const grow = (ti, k, lv) => 1 + ((L(ti) && L(ti)[k] != null) ? L(ti)[k] : (LEVELS.grow[k] || 0)) * (lv - 1);
const span = (ti, k, lv) => { const r = L(ti) && L(ti)[k]; return Array.isArray(r) ? r[0] + (r[1] - r[0]) * (Math.min(LEVELS.max, lv) - 1) / (LEVELS.max - 1) : st(ti, k); };
export const champHp = (ti, lv = levelOf(ti)) => st(ti, 'hp') * grow(ti, 'hp', lv);
export const champDmg = (ti, lv = levelOf(ti)) => st(ti, 'dmg') * grow(ti, 'dmg', lv);
export const champRate = (ti, lv = levelOf(ti)) => span(ti, 'rate', lv);
export const champSpd = (ti, lv = levelOf(ti)) => span(ti, 'spd', lv);
export const armyGrow = (ti, k, lv = levelOf(ti)) => 1 + ((champOf(ti).armyGrow || {})[k] || 0) * (lv - 1);
// a move's damage (BAL1): `slot` 'ult' or a special, to a champion or a soldier, `share` of it for one hit of several
export const moveHit = (u, slot, toChamp, share = 1) => champDmg(u.ti) * (slot === 'ult' ? LEVELS.mult.ult : LEVELS.mult.special) * share * (toChamp ? 1 : LEVELS.mult.soldier);
export const champReach = ti => st(ti, 'reach');
export const rideReach = u => (u.leader && u.mounted && champOf(u.ti).mount && champOf(u.ti).mount.reach) || u.reach; // (C5: from the saddle, the mount's own reach when its page says)
// (C1g) his pace: how much longer than the sword combo's own timing his combo runs, so 3 blows take 3/rate s
const S = CAPTAIN_COMBAT.sword, COMBO = 2 * S.cd + S.finisherCd;
export const paceOf = ti => 3 / champRate(ti) / COMBO;
export const blowGap = ti => 1 / champRate(ti); // (a computer champion's blows on foot)
// set a champion's numbers (at birth, on a level-up, when a player takes over or leaves): his health keeps its share
export function applyChamp(u) {
  if (!u || !u.leader) return;
  const max = champHp(u.ti), f = u.max ? u.hp / u.max : 1;
  u.max = max; u.hp = Math.max(u.dead ? 0 : 1, Math.min(max, max * f)); u.dmg = champDmg(u.ti); u.spd = champSpd(u.ti); u.reach = champReach(u.ti);
}
