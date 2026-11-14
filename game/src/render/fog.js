// Fog of war (the Crown): you see what your side can see. Around every man of yours, the places your
// side holds and your side's watchtowers; enemies anywhere else aren't drawn, on the field or the map.
// Only what's shown changes: the battle itself is the same on every phone. Worked out a few times a
// second on a coarse grid, so a crowded field stays cheap. The Crown's carrier can always be seen.
import { G, colorOf } from '../core/state.js';
import { W } from '../core/world.js';
import { CROWN } from '../config.js';

export const FOG = { unit: 20, place: 16, tower: 36 }; // how far each sees, in metres
const CELL = 4;
let N = 0, grid = null, half = 0, t = 0;
const onMount = () => G.map && G.map.id === 'mount';
export const fogOn = () => G.mode === 'crown' && G.state === 'play' && (onMount() || G.T >= CROWN.breakout);
export const fogGrid = () => (fogOn() ? { grid, N, CELL, half } : null);
function mark(x, z, r) {
  const i0 = Math.max(0, Math.floor((x - r + half) / CELL)), i1 = Math.min(N - 1, Math.floor((x + r + half) / CELL));
  const j0 = Math.max(0, Math.floor((z - r + half) / CELL)), j1 = Math.min(N - 1, Math.floor((z + r + half) / CELL)), r2 = (r + CELL * .7) ** 2;
  for (let j = j0; j <= j1; j++) { const cz = j * CELL - half + CELL / 2; for (let i = i0; i <= i1; i++) { const cx = i * CELL - half + CELL / 2; if ((cx - x) ** 2 + (cz - z) ** 2 <= r2) grid[j * N + i] = 1; } }
}
export const seenAt = (x, z) => { if (!grid) return true; const i = Math.floor((x + half) / CELL), j = Math.floor((z + half) / CELL); return i < 0 || j < 0 || i >= N || j >= N || grid[j * N + i] === 1; };
// sets u.fog on every enemy you can't see
export function fogTick(dt) {
  if (!fogOn()) { if (grid) { grid = null; for (const u of G.units) u.fog = false; } return; }
  t -= dt; if (t > 0 && grid) return; t = .2;
  half = W.R + 16; const n = Math.ceil(half * 2 / CELL);
  if (n !== N || !grid) { N = n; grid = new Uint8Array(N * N); } else grid.fill(0);
  const a = G.ALLY[colorOf(G.myTi)];
  for (const u of G.units) if (!u.dead && !u.neutral && G.ALLY[colorOf(u.ti)] === a) mark(u.x, u.z, FOG.unit); // (F4: the neutral men light nobody's way)
  for (const h of G.holds || []) if (h.owner === a) mark(h.x, h.z, h.r + FOG.place);
  for (const w of G.wtowers || []) if (w.a === a && w.build >= 1) mark(w.x, w.z, FOG.tower);
  // the mountain: only the jungle hides anyone; everywhere else is in plain sight
  const J = onMount() && G.layout && G.layout.jungle;
  if (J) for (let j = 0; j < N; j++) { const cz = j * CELL - half + CELL / 2; for (let i = 0; i < N; i++) { const cx = i * CELL - half + CELL / 2, r = Math.hypot(cx, cz); if (r < J.r0 - 1 || r > J.r1 + 1) grid[j * N + i] = 1; } }
  const carrier = G.flag && G.flag.state === 'carried' ? G.flag.carrier : null;
  for (const u of G.units) u.fog = !u.neutral && G.ALLY[colorOf(u.ti)] !== a && u !== carrier && !seenAt(u.x, u.z);
}
