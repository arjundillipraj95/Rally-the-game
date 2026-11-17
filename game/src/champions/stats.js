// A champion's numbers in battle (C1d, C1b): health and blow from his page, grown by his level (LEVELS.grow), the
// same for a player and a computer champion. A page in plain numbers (`plain`, C3a) gives them as players see them;
// an older page as shares of an infantryman (config UNITS). Reach and the wait between blows come from the page when
// it has them (C3a), else today's captain's (config STATS.captain).
import { UNITS, LEVELS, STATS, CAPTAIN_TIERS } from '../config.js';
import { G } from '../core/state.js';
import { champOf } from './index.js';

export const levelOf = ti => (G.teams && G.teams[ti] && G.teams[ti].lvl) || 1;
export const growth = (lv, k) => 1 + LEVELS.grow[k] * (lv - 1);
const S = ti => champOf(ti).stats, plain = ti => !!champOf(ti).plain;
export const champHp = (ti, lv = levelOf(ti)) => (plain(ti) ? S(ti).hp : UNITS.inf * S(ti).hp) * growth(lv, 'hp');
export const champDmg = (ti, lv = levelOf(ti)) => (plain(ti) ? S(ti).dmg : UNITS.inf * S(ti).hit) * growth(lv, 'dmg');
export const champSpd = ti => S(ti).spd;
export const champReach = ti => S(ti).reach ?? STATS.captain.reach;
export const champCd = ti => (S(ti).rate ? 1 / S(ti).rate : STATS.captain.cd);
// (C3a) the wait after combo blow i (0-2), when his page sets the beats; null: today's sword timing
export function comboCd(ti, i) {
  const c = champOf(ti).combo; if (!c || !S(ti).rate) return null;
  const sum = c.beat.reduce((a, b) => a + b, 0);
  return c.beat[i] * c.beat.length / (sum * S(ti).rate);
}
// set a champion's numbers (at birth, on a level-up, when a player takes over or leaves): his health keeps its share
export function applyChamp(u) {
  if (!u || !u.leader) return;
  const max = champHp(u.ti), f = u.max ? u.hp / u.max : 1, cb = CAPTAIN_TIERS[u.tier | 0] || CAPTAIN_TIERS[0];
  u.max = max; u.hp = Math.max(u.dead ? 0 : 1, Math.min(max, max * f)); u.dmg = champDmg(u.ti); u.spd = champSpd(u.ti);
  u.reach = champReach(u.ti) + cb.reachB;
}
