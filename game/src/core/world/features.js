// Fixed map features and the ground that changes how you move.
import { G } from '../state.js';
import { W } from './size.js';
import { RV, inFord } from './ground.js';

// ---------- ground that changes how you move (big maps) ----------
// Grass Valley: a wheat field fills each pass (long side along the way through); wading it is slow.
export const FIELDS = [0, Math.PI / 2, Math.PI, Math.PI * 1.5].map(a => ({ x: Math.cos(a) * 77.5, z: Math.sin(a) * 77.5, a, hw: 12, hd: 6.5 }));
export function fieldAt(x, z) {
  for (const f of FIELDS) {
    const dx = x - f.x, dz = z - f.z, t = -Math.sin(f.a) * dx + Math.cos(f.a) * dz, n = Math.cos(f.a) * dx + Math.sin(f.a) * dz;
    if (Math.abs(t) < f.hw && Math.abs(n) < f.hd) return { f, t, n };
  }
  return null;
}
// Frost Hill: two frozen ponds fill the passes on the z axis; on the ice nobody can stop or turn quickly.
export const PONDS = [{ x: 0, z: 77.5, r: 8 }, { x: 0, z: -77.5, r: 8 }];
export const onPond = (x, z) => PONDS.some(p => Math.hypot(x - p.x, z - p.z) < p.r + 1.5);
export const onIce = (x, z) => G.map.id === 'frost' && PONDS.some(p => Math.hypot(x - p.x, z - p.z) < p.r);
// speed multiplier for the ground at (x, z)
export const ROAD_SPEED = 1.15;
export function onRoad(x, z) { const R = G.layout && G.layout.roadGrid; if (!R) return false; const cx = Math.round((x + W.R) / 2), cz = Math.round((z + W.R) / 2); return cx >= 0 && cz >= 0 && cx < R.N && cz < R.N && R.g[cz * R.N + cx] === 1; }
export function groundSlow(x, z) {
  const id = G.map.id;
  if (onRoad(x, z) && !(id === 'valley' && fieldAt(x, z))) return ROAD_SPEED; // (the roads are the quick way in)
  if (id === 'river' || RV) { if (inFord(x, z)) return .55; if (id === 'river') return 1; } // (wading the ford)
  if (id === 'valley') return fieldAt(x, z) ? .72 : 1;
  if (id === 'desert') return OASES.some(o => Math.hypot(x - o.x, z - o.z) < o.r) ? .6 : 1;
  return 1;
}

// ---------- fixed map features (the same every match) ----------
// Forum: four temples on raised platforms between neighbouring castles, steps facing the centre.
export const TEMPLES = [[0, 50], [50, 0], [0, -50], [-50, 0]].map(([x, z]) => { const d = Math.hypot(x, z); return { x, z, vx: x / d, vz: z / d, rot: Math.atan2(x / d, z / d) }; });
export const TEMPLE = { hw: 9, front: -6, back: 6, steps: 3, h: 1.8 };
// Desert Fort: a sand-walled fortress on a plateau, ramps up through four gates on the axes.
export const DESERT = { r: 17.5, wall: 18.4, ramp: 25, h: 2.4, lane: 3 };
// Desert Fort's two oases, on the open sand between neighbouring castles
export const OASES = [{ x: 77.5, z: 0, r: 7 }, { x: -77.5, z: 0, r: 7 }]; // (in the two passes on the x axis)
// Grass Valley: four rounded hills between neighbouring castles.
export const VALLEY_HILLS = [[0, 30], [30, 0], [0, -30], [-30, 0]]; // in the middle, each one overlooking the mouths of two lanes
// Colosseum: the arena wall and an inner ring whose four gates open on a timer.
export const ARENA = { r: 86, inner: 24, gateW: 3.4, cycle: 60, open: 40 };
export const arenaGatesOpen = t => (t % ARENA.cycle) < ARENA.open;
