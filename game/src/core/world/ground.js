// Ground heights: every map's terrain, the Crown's river and the ridges, baked into grids.
import { G } from '../state.js';
import { W } from './size.js';
import { distToLine } from './util.js';
import { TEMPLES, TEMPLE, DESERT, VALLEY_HILLS } from './features.js';
import { mountY } from './mount.js';

// Local frame of a feature whose front faces the centre: u across it, v away from the centre.
const toLocal = (f, x, z) => { const dx = x - f.x, dz = z - f.z; return [dx * f.vz - dz * f.vx, dx * f.vx + dz * f.vz]; };

export function hill(x, z) { return 7 * Math.exp(-(x * x + z * z) / (2 * 20 * 20)); }
export function onBridge(x, z) { if (RV && z != null) return riverCode(x, z) === 3; return Math.abs(x + 32) < 2.4 || Math.abs(x - 32) < 2.4; }
export function inRiver(x, z) { if (RV) { const c = riverCode(x, z); return c === 1 || c === 2; } return G.map.id === 'river' && Math.abs(z) < 5 && Math.hypot(x, z) >= 7; }
export function inFord(x, z) { if (RV) return riverCode(x, z) === 2; return inRiver(x, z) && Math.abs(x) < 14; }
// ---------- the Crown's river: a winding course laid out afresh every match ----------
// Baked into a 1 m grid when the layout is made: 0 land, 1 deep water (nobody crosses), 2 the ford
// (wade, slowly), 3 a bridge. `dep` is how far the ground drops into the riverbed there.
export let RV = null;
export function resetRiver() { RV = null; }
export const riverCode = (x, z) => { if (!RV) return 0; const i = Math.round((x + RV.half) / RV.cs), j = Math.round((z + RV.half) / RV.cs); return i < 0 || j < 0 || i >= RV.n || j >= RV.n ? 0 : RV.code[j * RV.n + i]; };
export const deepWater = (x, z) => riverCode(x, z) === 1;
function riverDep(x, z) {
  if (!RV) return 0;
  const fx = (x + RV.half) / RV.cs, fz = (z + RV.half) / RV.cs, i = Math.floor(fx), j = Math.floor(fz), n = RV.n;
  if (i < 0 || j < 0 || i >= n - 1 || j >= n - 1) return 0;
  const tx = fx - i, tz = fz - j, g = RV.dep, k = j * n + i;
  return (g[k] * (1 - tx) + g[k + 1] * tx) * (1 - tz) + (g[k + n] * (1 - tx) + g[k + n + 1] * tx) * tz;
}
export function bakeRiver(L) {
  const V = L.river; if (!V) { RV = null; return; }
  const cs = 1, half = W.R + 20, n = Math.ceil(half * 2 / cs) + 1, code = new Uint8Array(n * n), dep = new Float32Array(n * n), dist = new Float32Array(n * n).fill(1e9);
  const reach = V.w + 2.5;
  for (let s = 0; s < V.pts.length - 1; s++) {
    const [ax, az] = V.pts[s], [bx, bz] = V.pts[s + 1];
    const i0 = Math.max(0, Math.floor((Math.min(ax, bx) - reach + half) / cs)), i1 = Math.min(n - 1, Math.ceil((Math.max(ax, bx) + reach + half) / cs));
    const j0 = Math.max(0, Math.floor((Math.min(az, bz) - reach + half) / cs)), j1 = Math.min(n - 1, Math.ceil((Math.max(az, bz) + reach + half) / cs));
    const dx = bx - ax, dz = bz - az, L2 = dx * dx + dz * dz || 1;
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      const x = -half + i * cs, z = -half + j * cs, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / L2));
      const d = Math.hypot(x - ax - dx * t, z - az - dz * t), k = j * n + i; if (d < dist[k]) dist[k] = d;
    }
  }
  for (let k = 0; k < n * n; k++) {
    const d = dist[k]; if (d >= reach) continue;
    const x = -half + (k % n) * cs, z = -half + Math.floor(k / n) * cs;
    let c = d < V.w ? 1 : 0, depth = d < V.w ? 1.2 * (1 - (d / V.w) ** 2) + .25 : .25 * (1 - (d - V.w) / 2.5);
    if (c && V.fords.some(f => Math.hypot(x - f.x, z - f.z) < f.r)) { c = 2; depth = Math.min(depth, .5); }
    for (const b of V.bridges) { const lx = (x - b.x) * Math.cos(b.a) + (z - b.z) * Math.sin(b.a), lz = -(x - b.x) * Math.sin(b.a) + (z - b.z) * Math.cos(b.a); if (Math.abs(lz) < b.hw && Math.abs(lx) < b.len) { if (c) c = 3; depth = Math.min(depth, Math.max(0, (Math.abs(lx) - b.len + 3) * .1)); } }
    code[k] = c; dep[k] = depth;
  }
  RV = { cs, half, n, code, dep };
}
function templeY(x, z) {
  for (const t of TEMPLES) {
    if (Math.abs(x - t.x) > 13 || Math.abs(z - t.z) > 13) continue;
    const [u, v] = toLocal(t, x, z); if (Math.abs(u) > TEMPLE.hw) continue;
    if (v >= TEMPLE.front && v <= TEMPLE.back) return TEMPLE.h;
    if (v >= TEMPLE.front - TEMPLE.steps && v < TEMPLE.front) return TEMPLE.h * (v - (TEMPLE.front - TEMPLE.steps)) / TEMPLE.steps;
  }
  return 0;
}
function desertY(x, z) {
  const ax = Math.abs(x), az = Math.abs(z); if (ax > DESERT.ramp || az > DESERT.ramp) return 0;
  const r = Math.hypot(x, z);
  if (r < DESERT.r) return DESERT.h;
  if (r < DESERT.ramp && Math.min(ax, az) < DESERT.lane) return DESERT.h * (DESERT.ramp - r) / (DESERT.ramp - DESERT.r);
  return 0;
}
function valleyY(x, z) { let y = 0; for (const [hx, hz] of VALLEY_HILLS) { const dx = x - hx, dz = z - hz; if (Math.abs(dx) < 30 && Math.abs(dz) < 30) y += 4.5 * Math.exp(-(dx * dx + dz * dz) / (2 * 9.5 * 9.5)); } return y; }

// the rolling dunes outside the Desert Fort's plateau: part of the ground everyone stands on
function desertDunes(x, z) {
  const r = Math.hypot(x, z); if (r <= 30) return 0;
  const n = Math.sin(x * .07) * Math.cos(z * .05) + Math.sin(x * .023 + z * .031) * 1.4;
  return Math.max(0, n) * Math.min(1, (r - 30) / 20) * 1.2;
}
// Ridge heights on the big maps, baked into a 1 m grid when the layout is made (groundY runs for
// every unit every frame, so it reads the grid rather than walking the ridge lines).
let RH = null;
export function ridgeH(x, z) {
  if (!RH) return 0;
  const fx = (x + RH.half) / RH.cs, fz = (z + RH.half) / RH.cs, i = Math.floor(fx), j = Math.floor(fz);
  if (i < 0 || j < 0 || i >= RH.n - 1 || j >= RH.n - 1) return 0;
  const tx = fx - i, tz = fz - j, g = RH.g, n = RH.n, k = j * n + i;
  return (g[k] * (1 - tx) + g[k + 1] * tx) * (1 - tz) + (g[k + n] * (1 - tx) + g[k + n + 1] * tx) * tz;
}
export function bakeRidges(L) {
  if (!L.ridges.length) { RH = null; FLATS = []; for (const f of L.flats) FLATS.push(Object.assign({ y: groundBase(f.x, f.z) }, f)); return; } // (no ridges, but still the basins)
  const cs = 1, half = W.R + 14, n = Math.ceil(half * 2 / cs) + 1, g = new Float32Array(n * n);
  for (const r of L.ridges) {
    if (!r.H) continue;
    const reach = r.w + r.flank; let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (const [x, z] of r.pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z); }
    const i0 = Math.max(0, Math.floor((x0 - reach + half) / cs)), i1 = Math.min(n - 1, Math.ceil((x1 + reach + half) / cs));
    const j0 = Math.max(0, Math.floor((z0 - reach + half) / cs)), j1 = Math.min(n - 1, Math.ceil((z1 + reach + half) / cs));
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      const x = -half + i * cs, z = -half + j * cs, d = distToLine(r.pts, x, z); if (d >= reach) continue;
      const c = Math.cos(Math.PI / 2 * d / reach), h = r.H * c * c * (.78 + .22 * Math.sin(x * .11 + 1) * Math.cos(z * .09 - 2) + .15 * Math.sin((x + z) * .23));
      if (h > g[j * n + i]) g[j * n + i] = h;
    }
  }
  RH = { g, n, half, cs };
  FLATS = []; for (const f of L.flats) FLATS.push(Object.assign({ y: groundBase(f.x, f.z) }, f)); // (after RH, so their level is the bare ground's)
}
// level basins (oases, ponds): the ground eases down to one height across them
let FLATS = [];
export function groundY(x, z) {
  let y = groundBase(x, z) + ridgeH(x, z);
  for (const f of FLATS) {
    const dx = x - f.x, dz = z - f.z; if (Math.abs(dx) > f.r + 5 || Math.abs(dz) > f.r + 5) continue;
    const d = Math.hypot(dx, dz), t = Math.min(1, Math.max(0, (d - f.r) / 5)); y = f.y + (y - f.y) * t * t * (3 - 2 * t);
    if (f.dip && d < f.dipR) { const k = Math.min(1, (f.dipR - d) / 1.5); y -= f.dip * k * k * (3 - 2 * k); } // (knee-deep water)
  }
  return y;
}
function groundBase(x, z) {
  switch (G.map.id) {
    case 'frost': return hill(x, z);
    case 'river': return (Math.abs(z) < 5.5 && Math.hypot(x, z) >= 7) ? (onBridge(x) ? .38 : -.45) : 0;
    case 'forum': return templeY(x, z);
    case 'desert': return desertY(x, z) + desertDunes(x, z);
    case 'valley': return valleyY(x, z) - (RV ? riverDep(x, z) : 0);
    case 'mount': return mountY(x, z) - (RV ? riverDep(x, z) : 0);
  }
  return 0;
}
// Height of the rendered ground mesh (adds the riverbed and the dunes outside the arena).
// past the mountain's rim the ground breaks off into a steep, craggy drop (into the cloud sea, render/mountain.js)
function mountCliff(x, z, d, n) {
  const crag = Math.sin(x * .23 + z * .11) * Math.cos(z * .19 - x * .08), ledge = Math.max(0, Math.sin(Math.hypot(x, z) * .9 + crag * 2)) * 1.6;
  return -d * (d < 2.5 ? .9 : 1.75) + (d < 2.5 ? 0 : 1.6) + crag * Math.min(5, d * .25) + ledge * Math.min(1, d / 6) + Math.max(0, n) * 2;
}
export function terrainMeshY(x, z) {
  const r = Math.hypot(x, z);
  const n = Math.sin(x * .07) * Math.cos(z * .05) + Math.sin(x * .023 + z * .031) * 1.4;
  let y = G.map.id === 'river' ? 0 : groundY(x, z);
  if (G.map.id === 'river') { const az = Math.abs(z); if (az < 7 && Math.hypot(x, z) >= 7.5) y = az < 5 ? -.95 : -.95 * (7 - az) / 2; }
  const e = W.R + 1; if (r > e) y += G.map.id === 'mount' ? mountCliff(x, z, r - e, n) : (r - e) * .25 + Math.max(0, n) * ((r - e) * .18);
  return y;
}

