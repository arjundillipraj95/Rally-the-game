// A champion's numbers in battle (C1d, C1b): health and blow from his page's shares of an infantryman
// (config UNITS), grown by his level (LEVELS.grow), the same for a player and a computer champion.
import { LEVELS, CHAMP_BASE, CAPTAIN_COMBAT } from '../config.js';
import { G } from '../core/state.js';
import { champOf } from './index.js';

export const levelOf = ti => (G.teams && G.teams[ti] && G.teams[ti].lvl) || 1;
export const growth = (lv, k) => 1 + LEVELS.grow[k] * (lv - 1);
const st = (ti, k) => { const v = champOf(ti).stats[k]; return v == null ? CHAMP_BASE[k] : v; };
export const champHp = (ti, lv = levelOf(ti)) => st(ti, 'hp') * growth(lv, 'hp');
export const champDmg = (ti, lv = levelOf(ti)) => st(ti, 'dmg') * growth(lv, 'dmg');
export const champSpd = ti => st(ti, 'spd');
export const champReach = ti => st(ti, 'reach');
export const rideReach = u => (u.leader && u.mounted && champOf(u.ti).mount && champOf(u.ti).mount.reach) || u.reach; // (C5: from the saddle, the mount's own reach when its page says)
// (C1g) his pace: how much longer than the sword combo's own timing his combo runs, so 3 blows take 3/rate s
const S = CAPTAIN_COMBAT.sword, COMBO = 2 * S.cd + S.finisherCd;
export const paceOf = ti => 3 / st(ti, 'rate') / COMBO;
export const blowGap = ti => 1 / st(ti, 'rate'); // (a computer champion's blows on foot)
// set a champion's numbers (at birth, on a level-up, when a player takes over or leaves): his health keeps its share
export function applyChamp(u) {
  if (!u || !u.leader) return;
  const max = champHp(u.ti), f = u.max ? u.hp / u.max : 1;
  u.max = max; u.hp = Math.max(u.dead ? 0 : 1, Math.min(max, max * f)); u.dmg = champDmg(u.ti); u.spd = champSpd(u.ti); u.reach = champReach(u.ti);
}
