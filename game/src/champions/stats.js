// A champion's numbers in battle (C1d, C1b): health and blow from his page's shares of an infantryman
// (config UNITS), grown by his level (LEVELS.grow), the same for a player and a computer champion.
import { UNITS, LEVELS } from '../config.js';
import { G } from '../core/state.js';
import { champOf } from './index.js';

export const levelOf = ti => (G.teams && G.teams[ti] && G.teams[ti].lvl) || 1;
export const growth = (lv, k) => 1 + LEVELS.grow[k] * (lv - 1);
export const champHp = (ti, lv = levelOf(ti)) => UNITS.inf * champOf(ti).stats.hp * growth(lv, 'hp');
export const champDmg = (ti, lv = levelOf(ti)) => UNITS.inf * champOf(ti).stats.hit * growth(lv, 'dmg');
export const champSpd = ti => champOf(ti).stats.spd;
// set a champion's numbers (at birth, on a level-up, when a player takes over or leaves): his health keeps its share
export function applyChamp(u) {
  if (!u || !u.leader) return;
  const max = champHp(u.ti), f = u.max ? u.hp / u.max : 1;
  u.max = max; u.hp = Math.max(u.dead ? 0 : 1, Math.min(max, max * f)); u.dmg = champDmg(u.ti); u.spd = champSpd(u.ti);
}
