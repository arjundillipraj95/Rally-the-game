// (C1g) a champion page against the design's hard limits: every stat inside its floor and ceiling, and the budget,
// every plus paid by a minus (health, damage per second, foot, horse; ranged reach counts CHAMP_LIMITS.ranged).
// Returns the problems, none when the page is fair. Used by store/r_C1g.mjs; no game logic reads it.
import { CHAMP_BASE as B, CHAMP_LIMITS as L } from '../config/champs.js';

const inside = (v, [lo, hi]) => v >= lo - 1e-9 && v <= hi + 1e-9;

// the page's pluses and minuses against the base, as fractions (+.2 = 20% more)
export function budgetOf(def) {
  const s = def.stats, m = def.mount || {};
  const parts = {
    hp: s.hp / B.hp - 1,
    dps: (s.dmg * s.rate) / (B.dmg * B.rate) - 1,
    spd: s.spd / B.spd - 1,
    horse: (m.spd || B.horse) / B.horse - 1,
    ranged: def.ranged ? L.ranged : 0,
  };
  return { parts, total: Object.values(parts).reduce((a, b) => a + b, 0) };
}

export function checkChamp(def) {
  const s = def.stats, m = def.mount || {}, bad = [];
  const want = (k, v, lim) => { if (!inside(v, lim)) bad.push(`${k} ${+v.toFixed(2)} outside ${lim[0]}-${lim[1]}`); };
  want('health', s.hp, L.hp); want('damage', s.dmg, L.dmg); want('rate', s.rate, L.rate);
  want('damage per second', s.dmg * s.rate, L.dps);
  want('reach', s.reach, def.ranged ? L.rangedReach : L.reach);
  want('speed', s.spd, L.spd); want('horse', m.spd || B.horse, L.horse);
  const { total } = budgetOf(def);
  if (Math.abs(total) > L.budget + 1e-9) bad.push(`budget ${(total * 100).toFixed(1)}% (allowed +-${L.budget * 100}%)`);
  return bad;
}
