// Battle rules: CASTLE7 where and when a fallen champion comes back on the mountain. When: CASTLE26.respawn.clock, the
// wait growing with the match clock (a kill opens a window to take a castle; later, longer). Where: the castle his
// side holds nearest to where he fell, unless it is under attack (an enemy in its turret's range, an alert in the last
// `calm` s, or its circle filling against it); none: his base. He marches out through its lane gate.
import { CASTLE26 } from '../../config.js';
import { G } from '../state.js';
import { allianceOf } from './holds.js';

const R = () => CASTLE26.respawn;
export function respawnTime(T = G.T) {
  const c = R().clock; if (T <= c[0][0]) return c[0][1];
  for (let k = 1; k < c.length; k++) if (T <= c[k][0]) { const [t0, v0] = c[k - 1], [t1, v1] = c[k]; return v0 + (v1 - v0) * (T - t0) / (t1 - t0); }
  return c[c.length - 1][1];
}
export function underAttack(h) {
  if (G.T - (h.alertT ?? -99) < R().calm || (h.cap >= 0 && h.cap !== h.owner && h.prog > 0)) return true;
  return G.units.some(u => !u.dead && !u.neutral && allianceOf(u.ti) >= 0 && allianceOf(u.ti) !== h.owner && Math.hypot(u.x - h.x, u.z - h.z) < CASTLE26.turret.range);
}
// the spot army ti's champion comes back at: { x, z, face, hid }, or null for his base
export function respawnSpot(ti) {
  const a = allianceOf(ti), s = G.teams[ti], at = (s && s.deadAt) || null; if (!G.layout || !G.layout.cwalls) return null;
  let best = null, bd = 1e9;
  for (const cw of G.layout.cwalls) { const h = G.holds[cw.hid]; if (!h || h.owner !== a || underAttack(h)) continue;
    const d = at ? Math.hypot(h.x - at[0], h.z - at[1]) : 0; if (d < bd) { bd = d; best = [cw, h]; } }
  if (!best) return null;
  const [cw, h] = best, g = cw.gates[0], px = h.px ?? h.x, pz = h.pz ?? h.z;
  return { x: px + Math.cos(g) * 2 + (Math.random() - .5), z: pz + Math.sin(g) * 2 + (Math.random() - .5), face: Math.atan2(Math.cos(g), Math.sin(g)), hid: h.id };
}
