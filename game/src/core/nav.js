// Navigation for walled maps: a walkable grid, straight-line checks and A* paths,
// plus a bucket grid so collision only looks at nearby obstacles. Pure data, no engine code.
import { G } from './state.js';
import { inRiver, inFord, onBridge, arenaGatesOpen, W } from './world.js';

const CS = 1.5, HALF = 122, N = Math.ceil(HALF * 2 / CS), INFL = .55; // cell size, half-extent, cells per side, unit radius
const BS = 6, BN = Math.ceil(HALF * 2 / BS);                         // obstacle buckets
let blocked = new Uint8Array(N * N), buckets = [], blockBuckets = [], gateCells = [], gatesOpen = true;

const ci = x => Math.max(0, Math.min(N - 1, Math.floor((x + HALF) / CS)));
const cx = i => -HALF + (i + .5) * CS;
const bi = x => Math.max(0, Math.min(BN - 1, Math.floor((x + HALF) / BS)));

// Is world point (x,z) inside obstacle o, grown by pad?
export function inside(o, x, z, pad) {
  if (o.box) {
    const dx = x - o.x, dz = z - o.z, c = Math.cos(o.rot), s = Math.sin(o.rot);
    const lx = dx * c - dz * s, lz = dx * s + dz * c;
    return Math.abs(lx) < o.hw + pad && Math.abs(lz) < o.hd + pad;
  }
  const dx = x - o.x, dz = z - o.z, rr = o.r + pad; return dx * dx + dz * dz < rr * rr;
}
const extent = o => o.box ? Math.hypot(o.hw, o.hd) : o.r;

export function buildNav(L) {
  blocked = new Uint8Array(N * N);
  buckets = Array.from({ length: BN * BN }, () => []);
  blockBuckets = Array.from({ length: BN * BN }, () => []);
  gateCells = [];
  const mark = (o, list) => {
    const e = extent(o) + INFL, i0 = ci(o.x - e), i1 = ci(o.x + e), j0 = ci(o.z - e), j1 = ci(o.z + e);
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) if (inside(o, cx(i), cx(j), INFL)) { if (list) list.push(j * N + i); else blocked[j * N + i]++; }
  };
  const bucket = (o, arr) => { const e = extent(o) + 1; for (let j = bi(o.z - e); j <= bi(o.z + e); j++) for (let i = bi(o.x - e); i <= bi(o.x + e); i++) arr[j * BN + i].push(o); };
  for (const o of L.obstacles) {
    bucket(o, buckets);
    if (o.gate) { const list = []; mark(o, list); gateCells.push(...list); }
    else if (o.box || o.r >= .7) mark(o, null); // columns, palms and posts are small enough to slip past
  }
  for (const b of L.blockers) bucket(b, blockBuckets);
  // deep water is not walkable (bridges and the ford are)
  if (L.mapId === 'river') for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const x = cx(i), z = cx(j); if (inRiver(x, z) && !inFord(x, z) && !onBridge(x) && Math.abs(z) < 4.5) blocked[j * N + i]++; }
  // every battlefield is round (the arena's wall, or the hills at the edge): nothing past it
  { const R = (L.round || W.R) - 1; for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) if (Math.hypot(cx(i), cx(j)) > R) blocked[j * N + i]++; }
  gatesOpen = true;
  syncGates();
}

// Timed gates (the Colosseum): shut gates block the grid and stop units.
export function syncGates() {
  const open = G.layout && G.layout.gates.length ? arenaGatesOpen(G.T) : true;
  if (open === gatesOpen) return;
  gatesOpen = open;
  for (const c of gateCells) blocked[c] += open ? -1 : 1;
}
export const gateShut = o => !!o.gate && !gatesOpen;

export const nearObstacles = (x, z) => buckets[bi(z) * BN + bi(x)] || [];
export const nearBlockers = (x, z) => blockBuckets[bi(z) * BN + bi(x)] || [];
const free = (i, j) => i >= 0 && j >= 0 && i < N && j < N && !blocked[j * N + i];
export const walkable = (x, z) => free(ci(x), ci(z));

// Straight-line check across the grid.
export function los(x0, z0, x1, z1) {
  const d = Math.hypot(x1 - x0, z1 - z0), n = Math.ceil(d / (CS * .5));
  for (let k = 1; k <= n; k++) { const t = k / n; if (!free(ci(x0 + (x1 - x0) * t), ci(z0 + (z1 - z0) * t))) return false; }
  return true;
}
// If the goal sits inside something (a castle, a wall), back off toward (fx,fz) until it's open ground.
export function openGoal(gx, gz, fx, fz) {
  if (walkable(gx, gz)) return [gx, gz];
  const d = Math.hypot(fx - gx, fz - gz) || 1, ux = (fx - gx) / d, uz = (fz - gz) / d;
  for (let s = CS * .5; s < Math.min(d, 16); s += CS * .5) { const x = gx + ux * s, z = gz + uz * s; if (walkable(x, z)) return [x, z]; }
  return [gx, gz];
}

// ---------- A* over the grid (8 directions), capped so a hopeless search stays cheap ----------
const gScore = new Float32Array(N * N), came = new Int32Array(N * N), stamp = new Uint32Array(N * N), closedAt = new Uint32Array(N * N);
let run = 0;
const heap = { a: new Int32Array(N * N), f: new Float32Array(N * N), n: 0 };
function push(c, f) { let i = heap.n++; while (i > 0) { const p = (i - 1) >> 1; if (heap.f[p] <= f) break; heap.a[i] = heap.a[p]; heap.f[i] = heap.f[p]; i = p; } heap.a[i] = c; heap.f[i] = f; }
function pop() {
  const top = heap.a[0], la = heap.a[--heap.n], lf = heap.f[heap.n]; let i = 0;
  while (true) { let c = 2 * i + 1; if (c >= heap.n) break; if (c + 1 < heap.n && heap.f[c + 1] < heap.f[c]) c++; if (heap.f[c] >= lf) break; heap.a[i] = heap.a[c]; heap.f[i] = heap.f[c]; i = c; }
  heap.a[i] = la; heap.f[i] = lf; return top;
}
const DIRS = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414]];
export function findPath(x0, z0, x1, z1, maxNodes = 6000) {
  let si = ci(x0), sj = ci(z0); const ti = ci(x1), tj = ci(z1);
  if (!free(ti, tj)) return null;
  if (!free(si, sj)) { // standing in a blocked cell (pushed against a wall): start from the nearest open cell on our side
    let best = null, bd = 1e9;
    for (let dj = -2; dj <= 2; dj++) for (let di = -2; di <= 2; di++) {
      if (!free(si + di, sj + dj)) continue;
      const d = Math.hypot(cx(si + di) - x0, cx(sj + dj) - z0);
      if (d < bd && los(x0, z0, cx(si + di), cx(sj + dj)) !== null) { bd = d; best = [si + di, sj + dj]; }
    }
    if (!best) return null; [si, sj] = best;
  }
  run++; heap.n = 0;
  const s = sj * N + si, t = tj * N + ti, h = (i, j) => { const dx = Math.abs(i - ti), dz = Math.abs(j - tj); return Math.max(dx, dz) + .414 * Math.min(dx, dz); };
  stamp[s] = run; gScore[s] = 0; came[s] = -1; push(s, h(si, sj));
  let expanded = 0;
  while (heap.n) {
    const c = pop(); if (closedAt[c] === run) continue; closedAt[c] = run;
    if (c === t) break;
    if (++expanded > maxNodes) return null;
    const i = c % N, j = (c / N) | 0;
    for (const [di, dj, w] of DIRS) {
      const ni = i + di, nj = j + dj; if (!free(ni, nj)) continue;
      if (di && dj && (!free(i + di, j) || !free(i, j + dj))) continue; // no cutting corners
      const nc = nj * N + ni, g = gScore[c] + w;
      if (stamp[nc] === run && g >= gScore[nc]) continue;
      stamp[nc] = run; gScore[nc] = g; came[nc] = c; push(nc, g + h(ni, nj));
    }
  }
  if (closedAt[t] !== run) return null;
  const pts = []; for (let c = t; c !== -1; c = came[c]) pts.push([cx(c % N), cx((c / N) | 0)]);
  pts.reverse();
  // string-pull: keep only corners the straight line can't cut
  const out = [pts[0]]; let k = 0;
  while (k < pts.length - 1) { let far = k + 1; while (far + 1 < pts.length && los(pts[k][0], pts[k][1], pts[far + 1][0], pts[far + 1][1])) far++; out.push(pts[far]); k = far; }
  out[out.length - 1] = [x1, z1];
  return out;
}
