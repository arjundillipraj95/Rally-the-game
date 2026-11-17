// (C3a) the guardrails: a champion page in plain numbers must sit inside every floor and ceiling and on budget, and
// its army shift inside its limits (config BASE, SOLDIER). Returns what is wrong; an empty list passes.
import { BASE, SOLDIER } from '../config.js';

const pc = (v, b) => (v / b - 1) * 100;
export function budgetOf(c) {
  const s = c.stats, ranged = !!s.range;
  return pc(s.hp, BASE.hp[0]) + pc(s.dmg * s.rate, BASE.dps[0]) + pc(s.spd, BASE.spd[0]) + pc(c.mount.mps, BASE.horse[0]) + (ranged ? BASE.ranged : 0);
}
export function check(c) {
  if (!c.plain) return [];
  const s = c.stats, bad = [], at = { hp: s.hp, dmg: s.dmg, rate: s.rate, dps: s.dmg * s.rate, spd: s.spd, horse: c.mount.mps };
  if (s.range) at.range = s.range; else at.reach = s.reach;
  for (const k in at) { const [, lo, hi] = BASE[k]; if (!(at[k] >= lo - 1e-9 && at[k] <= hi + 1e-9)) bad.push(`${k} ${at[k]} outside ${lo}-${hi}`); }
  const b = budgetOf(c); if (Math.abs(b) > BASE.budget) bad.push(`budget ${b.toFixed(1)} beyond ±${BASE.budget}`);
  let sum = 0;
  for (const kind in c.army || {}) for (const k in c.army[kind]) { const v = c.army[kind][k]; sum += v; if (Math.abs(v) > SOLDIER.shift) bad.push(`army ${kind}.${k} ${v}% beyond ±${SOLDIER.shift}`); }
  if (Math.abs(sum) > SOLDIER.budget) bad.push(`army budget ${sum} beyond ±${SOLDIER.budget}`);
  return bad;
}
