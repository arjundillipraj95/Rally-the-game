// PERF1c: in a big crowd, which men are drawn and which as full models (render/soldiers.js asks every frame).
// Full models (a skeleton, 2+ draws each) only for the nearest QUALITY.full[level] men within the near ring;
// everyone else is the light far figure. Captains are always full and not counted. A man drawn full last frame
// ranks QUALITY.fullKeep m nearer, so the edge of the budget doesn't flicker; a corpse keeps the look it fell with.
// When more men are on the field than can be drawn, the nearest are kept (was: list order, so men near you vanished).
import { QUALITY } from '../config.js';
import { quality } from './quality.js';

let stamp = 0;
const pool = [], order = [], fallen = [];
const rank = u => u._cd - (u._full === stamp - 1 ? QUALITY.fullKeep : 0);

// t: the camera's target; near: the full-model ring (m); max: the most men drawn. Returns the men to draw.
export function crowdPlan(lists, t, near, max) {
  stamp++;
  pool.length = 0; order.length = 0; fallen.length = 0;
  for (const units of lists) for (const u of units) {
    if (u.hidden || u.fog) continue;
    const d = t ? Math.hypot(u.x - t.x, u.z - t.z) : 0;
    u._cd = d; order.push(u);
    if (u.kind === 'captain') continue;
    if (u.dead) { if (u._full === stamp - 1) u._full = stamp; else if (d < near) fallen.push(u); continue; } // (CORPSE1: one who fell out of sight is drawn in the new body once you come near)
    if (d < near) pool.push(u);
  }
  const budget = QUALITY.full[quality.level] ?? QUALITY.full.low;
  if (pool.length > budget) { pool.sort((a, b) => rank(a) - rank(b)); pool.length = budget; }
  for (const u of pool) u._full = stamp;
  const cMax = (QUALITY.corpses || {})[quality.level] ?? 8; if (fallen.length > cMax) { fallen.sort((a, b) => a._cd - b._cd); fallen.length = cMax; }
  for (const u of fallen) u._full = stamp;
  if (order.length > max) { order.sort((a, b) => a._cd - b._cd); order.length = max; }
  return order;
}
export const isFull = u => u.kind === 'captain' || u._full === stamp;
export const lastPlan = () => order; // (tests: the men drawn this frame)
