// Terrain heights and map layouts. A layout is plain data (what stands where),
// generated from a seed so every phone in an online match builds the same map.
// Obstacles are circles {x,z,r} or boxes {box,x,z,hw,hd,rot}; `blockers` stop arrows below height h.
import { TEAMS, CASTLE_R } from '../config.js';
import { G } from './state.js';

export function mulberry(a) {
  return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
export const rnd = (a, b) => a + Math.random() * (b - a);
export const angDiff = (a, b) => { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
export const turn = (a, b, m) => a + clamp(angDiff(a, b), -m, m);

// ---------- battlefield size ----------
// The featured maps are larger than the rest (castles further out), and carved into routes by ridges.
// W holds the live size for the map being played; every edge and rim distance reads it.
const BIG = new Set(['valley', 'frost', 'desert', 'forum']);
TEAMS.forEach(t => { t.pos0 = t.pos.slice(); });
export const W = { R: 91, S: 1 };
export function sizeWorld(mapId) {
  W.S = BIG.has(mapId) ? 1.3 : 1; W.R = Math.round(91 * W.S);
  TEAMS.forEach(t => { t.pos[0] = t.pos0[0] * W.S; t.pos[1] = t.pos0[1] * W.S; });
}
export const isBig = id => BIG.has(id);

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

// Local frame of a feature whose front faces the centre: u across it, v away from the centre.
const toLocal = (f, x, z) => { const dx = x - f.x, dz = z - f.z; return [dx * f.vz - dz * f.vx, dx * f.vx + dz * f.vz]; };

export function hill(x, z) { return 7 * Math.exp(-(x * x + z * z) / (2 * 20 * 20)); }
export function onBridge(x) { return Math.abs(x + 32) < 2.4 || Math.abs(x - 32) < 2.4; }
export function inRiver(x, z) { return G.map.id === 'river' && Math.abs(z) < 5 && Math.hypot(x, z) >= 7; }
export function inFord(x, z) { return inRiver(x, z) && Math.abs(x) < 14; }
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
function bakeRidges(L) {
  if (!L.ridges.length) { RH = null; FLATS = []; return; }
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
    const t = Math.min(1, Math.max(0, (Math.hypot(dx, dz) - f.r) / 5)); y = f.y + (y - f.y) * t * t * (3 - 2 * t);
  }
  return y;
}
function groundBase(x, z) {
  switch (G.map.id) {
    case 'frost': return hill(x, z);
    case 'river': return (Math.abs(z) < 5.5 && Math.hypot(x, z) >= 7) ? (onBridge(x) ? .38 : -.45) : 0;
    case 'forum': return templeY(x, z);
    case 'desert': return desertY(x, z) + desertDunes(x, z);
    case 'valley': return valleyY(x, z);
  }
  return 0;
}
// Height of the rendered ground mesh (adds the riverbed and the dunes outside the arena).
export function terrainMeshY(x, z) {
  const r = Math.hypot(x, z);
  const n = Math.sin(x * .07) * Math.cos(z * .05) + Math.sin(x * .023 + z * .031) * 1.4;
  let y = G.map.id === 'river' ? 0 : groundY(x, z);
  if (G.map.id === 'river') { const az = Math.abs(z); if (az < 7 && Math.hypot(x, z) >= 7.5) y = az < 5 ? -.95 : -.95 * (7 - az) / 2; }
  const e = W.R + 1; if (r > e) y += (r - e) * .25 + Math.max(0, n) * ((r - e) * .18);
  return y;
}

export function gatePos(t, spread = 0, extra = 0) {
  const d = Math.hypot(t.pos[0], t.pos[1]), ux = -t.pos[0] / d, uz = -t.pos[1] / d;
  return [t.pos[0] + ux * (CASTLE_R + 2.5 + extra) + uz * spread, t.pos[1] + uz * (CASTLE_R + 2.5 + extra) - ux * spread];
}

// ---------- layout helpers ----------
// A wall of circles from (x1,z1) to (x2,z2).
function wallLine(L, x1, z1, x2, z2, r, h, extra = {}) {
  const len = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.ceil(len / (r * 1.3)));
  const out = [];
  for (let i = 0; i <= n; i++) { const o = Object.assign({ x: x1 + (x2 - x1) * i / n, z: z1 + (z2 - z1) * i / n, r }, extra); out.push(o); L.obstacles.push(o); if (h) L.blockers.push({ x: o.x, z: o.z, r, h, gate: extra.gate }); }
  return out;
}
// A ring wall of circles, leaving gaps where skip(angle) is true.
function ringWall(L, cx, cz, rad, r, h, skip, extra = {}) {
  const n = Math.ceil(Math.PI * 2 * rad / (r * 1.3));
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2; if (skip && skip(a)) continue;
    const o = Object.assign({ x: cx + Math.cos(a) * rad, z: cz + Math.sin(a) * rad, r }, extra);
    L.obstacles.push(o); if (h) L.blockers.push({ x: o.x, z: o.z, r, h });
  }
}
// A solid box (buildings); also blocks arrows below its height.
function box(L, x, z, hw, hd, rot, h, kind) {
  const b = { box: true, x, z, hw, hd, rot }; L.obstacles.push(b);
  if (h) { // cover the box with arrow blockers
    const c = Math.cos(rot), s = Math.sin(rot), rr = Math.min(hw, hd);
    for (let a = -hw + rr; a <= hw - rr + .01; a += rr) for (let b2 = -hd + rr; b2 <= hd - rr + .01; b2 += rr) L.blockers.push({ x: x + a * c + b2 * s, z: z - a * s + b2 * c, r: rr * 1.2, h });
  }
  if (kind) L.buildings.push({ x, z, w: hw * 2, d: hd * 2, rot, h, kind });
  return b;
}
// A ridge: an impassable, arrow-stopping line of rock (or trees, or walls) along a polyline.
// The ground rises into it from `flank` metres out to a crest of height H; the core (w either side of
// the line) can't be walked, but the slopes can: archers who climb them shoot farther.
function ridge(L, pts, w, h, kind, H = 5, flank = 7) {
  L.ridges.push({ pts, w, h, kind, H, flank });
  for (let i = 0; i < pts.length - 1; i++) wallLine(L, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], w, h, { ridge: true });
}
// polar point at angle a (radians, 0 = +x axis) and distance d
const P = (a, d) => [Math.cos(a) * d, Math.sin(a) * d];
// Distance from (x,z) to a polyline.
export function distToLine(pts, x, z) {
  let best = 1e9;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1], dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz || 1;
    const t = clamp(((x - ax) * dx + (z - az) * dz) / l2, 0, 1), px = ax + dx * t - x, pz = az + dz * t - z;
    const d = px * px + pz * pz; if (d < best) best = d;
  }
  return Math.sqrt(best);
}
// Smooths a coarse polyline (Chaikin) so roads and ridges curve.
function smooth(pts, n = 2) {
  for (let k = 0; k < n; k++) {
    const o = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) { const [ax, az] = pts[i], [bx, bz] = pts[i + 1]; o.push([ax * .75 + bx * .25, az * .75 + bz * .25], [ax * .25 + bx * .75, az * .25 + bz * .75]); }
    o.push(pts[pts.length - 1]); pts = o;
  }
  return pts;
}
// The big maps' shared shape. Each castle's corner is closed toward the middle by a curved ridge,
// so the way in is by one of two lanes round its ends; ridges along the axes wall the corners off
// from each other, with one pass each on the outside (to a neighbour) and open ground in the middle.
// Roads trace the routes so they read from the saddle.
export const ROUTES = { axIn: 44, axOut0: 69, axOut1: 86, pass: 77.5, arcR: 60, arcSpan: .5 };
function carveRoutes(L, R, opt = {}) {
  const w = opt.w || 3, h = opt.h || 3, H = opt.H || 6.5, wob = (a, d) => { const k = (R() - .5) * 2.4; return P(a + k / d, d + (R() - .5) * 2); };
  const kindA = opt.axis || 'rock', kindB = opt.arc || kindA, line = opt.line || ((pts, w, h, kind, H, fl) => ridge(L, pts, w, h, kind, H, fl));
  for (const a of AXES) {
    const inner = [], outer = [], a0 = opt.axIn || ROUTES.axIn;
    for (let d = a0; d <= ROUTES.axOut0 + .1; d += (ROUTES.axOut0 - a0) / 4) inner.push(wob(a, d));
    for (let d = ROUTES.axOut1; d <= W.R + 8; d += 8) outer.push(wob(a, d));
    line(inner, w, h, kindA, H, 9, 'axis'); line(outer, w, h, kindA, H, 9, 'axis');
    L.passes.push({ a, x: Math.cos(a) * ROUTES.pass, z: Math.sin(a) * ROUTES.pass });
  }
  for (const a of DIAG) {
    const pts = []; for (let k = -4; k <= 4; k++) pts.push(wob(a + k / 4 * ROUTES.arcSpan, ROUTES.arcR + Math.abs(k) * .6));
    line(smooth(pts, 1), w * 1.15, opt.arcH || h * 1.1, kindB, H * 1.15, 10, 'arc');
    // roads: from the gate round each end of the arc into the middle, and out through the passes
    const jit = pts => pts.map(([x, z], i) => i === 0 || i === pts.length - 1 ? [x, z] : [x + (R() - .5) * 5, z + (R() - .5) * 5]);
    for (const s of [-1, 1]) {
      L.roads.push(smooth(jit([P(a, 90), P(a, 80), P(a + s * .4, 71), P(a + s * .64, 58), P(a + s * .55, 44), P(a + s * .25, 26), P(a + s * .08, 12)]), 3));
      L.roads.push(smooth(jit([P(a + s * .4, 71), P(a + s * .55, 76), P(a + s * Math.PI / 4, ROUTES.pass)]), 3));
    }
  }
}
const angNear = (a, targets, w) => targets.some(t => Math.abs(angDiff(a, t)) < w);
const DIAG = [Math.PI / 4, 3 * Math.PI / 4, -3 * Math.PI / 4, -Math.PI / 4], AXES = [0, Math.PI / 2, Math.PI, -Math.PI / 2];

// Control mode's five capture points: a cross pattern (centre + one toward each axis), nudged
// off any obstacle the procedural layout dropped on top of them.
const CTRL_LETTERS = ['A', 'B', 'C', 'D', 'E'];
function clearSpot(L, x, z, pad) {
  return !L.obstacles.some(o => o.box
    ? Math.abs((x - o.x) * Math.cos(o.rot) - (z - o.z) * Math.sin(o.rot)) < o.hw + pad && Math.abs((x - o.x) * Math.sin(o.rot) + (z - o.z) * Math.cos(o.rot)) < o.hd + pad
    : Math.hypot(x - o.x, z - o.z) < o.r + pad);
}
function findClearSpot(L, x, z) {
  if (clearSpot(L, x, z, 3)) return [x, z];
  for (let rad = 3; rad <= 18; rad += 3) for (let a = 0; a < 10; a++) {
    const ang = a / 10 * Math.PI * 2, nx = x + Math.cos(ang) * rad, nz = z + Math.sin(ang) * rad;
    if (clearSpot(L, nx, nz, 3)) return [nx, nz];
  }
  return [x, z];
}
function makeCtrlSpots(L) {
  const base = L.passes.length ? [[0, 0], ...L.passes.map(p => [p.x, p.z])] : [[0, 0], [42, 0], [-42, 0], [0, 42], [0, -42]]; // (big maps: hold the passes)
  return base.map(([x, z], i) => { const [gx, gz] = findClearSpot(L, x, z); return { id: i, letter: CTRL_LETTERS[i], x: gx, z: gz }; });
}

export function makeLayout(mapId, withFort, withCtrl, seed) {
  sizeWorld(mapId);
  const R = mulberry(seed | 0), r = (a, b) => a + R() * (b - a), S = W.S;
  const L = { mapId, withFort, ridges: [], roads: [], passes: [], flats: [], hills: [], palisades: [], rocks: [], trees: [], stones: [], obstacles: [], blockers: [], fortSegments: [],
    buildings: [], columns: [], towers: [], rings: [], gates: [], palms: [], huts: [], statues: [] };
  const nearCastle = (x, z, pad) => TEAMS.some(t => Math.hypot(t.pos[0] - x, t.pos[1] - z) < 20 + pad);
  const clearOf = (x, z, pad = 0) => !nearCastle(x, z, pad) && Math.hypot(x, z) > (withFort ? 12 : 8) + pad && !(mapId === 'river' && Math.abs(z) < 9);
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + r(-.1, .1); L.hills.push({ a, d: r(150, 185) * S, rad: r(18, 34) * S, sy: r(.35, .6) }); }
  const scatterRocks = (n, ok = clearOf) => {
    for (let i = 0; i < n; i++) {
      const x = r(-80, 80), z = r(-80, 80), rad = r(.6, 1.7), rx = r(0, 3), ry = r(0, 3);
      if (!ok(x, z)) continue;
      L.rocks.push({ x, z, r: rad, rx, ry });
      if (rad > 1.1) L.obstacles.push({ x, z, r: rad * .9 });
    }
  };
  const trees = (x, z, s) => { L.trees.push({ x, z, s }); if (Math.hypot(x, z) < W.R - 1) { L.obstacles.push({ x, z, r: .7 * s }); L.blockers.push({ x, z, r: 1.4 * s, h: 7 }); } };

  // big maps: somewhere for cover that keeps off the roads, the ridges and the passes
  const onRoad = (x, z, pad) => L.roads.some(p => distToLine(p, x, z) < pad);
  const nearRidge = (x, z, pad) => L.ridges.some(g => distToLine(g.pts, x, z) < g.w + pad);
  const ok = (x, z, pad = 0) => clearOf(x, z, pad) && !onRoad(x, z, 5 + pad) && !nearRidge(x, z, 2 + pad) && !L.passes.some(p => Math.hypot(x - p.x, z - p.z) < 14) && Math.hypot(x, z) < W.R - 4;
  const copses = (n, size, sz = [.8, 1.25]) => { for (let c = 0; c < n; c++) { const cx = r(-110, 110), cz = r(-110, 110); if (!ok(cx, cz, 2)) continue; const k = size[0] + (R() * (size[1] - size[0] + 1) | 0); for (let i = 0; i < k; i++) { const x = cx + r(-5, 5), z = cz + r(-5, 5); if (ok(x, z, 0)) trees(x, z, r(sz[0], sz[1])); } } };
  const bigRocks = (n, pred = () => true) => { for (let i = 0; i < n; i++) { const x = r(-110, 110), z = r(-110, 110), rad = r(.6, 1.7); if (!ok(x, z) || !pred(x, z)) continue; L.rocks.push({ x, z, r: rad, rx: r(0, 3), ry: r(0, 3) }); if (rad > 1.1) L.obstacles.push({ x, z, r: rad * .9 }); } };

  if (mapId === 'dunes') {
    const spots = [[-18, 6, .4], [16, -8, -.3], [0, 24, 1.57], [0, -26, 1.57], [-30, -8, .9], [30, 10, .9], [-8, -40, 0], [10, 40, 0]];
    for (const [x, z, a] of spots) {
      const logs = [];
      for (let i = 0; i < 9; i++) {
        const off = (i - 4) * .66, px = x + Math.cos(a) * off, pz = z - Math.sin(a) * off;
        logs.push({ x: px, z: pz, rot: r(0, 3), sy: r(.85, 1.1) });
        if (i % 2 === 0) L.obstacles.push({ x: px, z: pz, r: .75 });
      }
      L.palisades.push({ x, z, a, logs });
    }
    scatterRocks(20);
  }
  if (mapId === 'river') {
    for (let i = 0; i < 22; i++) { const x = r(-14, 14), z = r(-4.5, 4.5), s = r(.25, .5); if (Math.hypot(x, z) < 7.5) continue; L.stones.push({ x, z, s }); }
    scatterRocks(20);
  }
  if (mapId === 'forest') {
    for (let c = 0; c < 16; c++) {
      let cx, cz, tries = 0; do { cx = r(-82, 82); cz = r(-82, 82); tries++; } while (!clearOf(cx, cz, 4) && tries < 40);
      const n = 5 + Math.floor(R() * 6);
      for (let i = 0; i < n; i++) { const x = cx + r(-6, 6), z = cz + r(-6, 6), s = r(.85, 1.35); if (clearOf(x, z)) trees(x, z, s); }
    }
    for (let i = 0; i < 40; i++) { const a = r(0, 6.28), d = r(95, 130) * S; L.trees.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, s: r(1, 1.6) }); }
    scatterRocks(10);
  }
  if (mapId === 'frost') {
    // snowy crags along the axes; the arcs in front of each corner are ridges thick with pines
    carveRoutes(L, R, { axis: 'snow', arc: 'pines', arcH: 7 });
    for (const s2 of [-1, 1]) L.flats.push({ x: 0, z: s2 * ROUTES.pass, r: 9 }); // (the frozen ponds)
    for (const g of L.ridges) if (g.kind === 'pines') for (let i = 0; i < g.pts.length - 1; i++) {
      const [ax, az] = g.pts[i], [bx, bz] = g.pts[i + 1], len = Math.hypot(bx - ax, bz - az), nx = -(bz - az) / len, nz = (bx - ax) / len;
      for (let t = 0; t < len; t += 2.3) for (const o of [-1.6, 0, 1.6]) { if (o && R() < .35) continue; const q = t / len, j = r(-.5, .5); L.trees.push({ x: ax + (bx - ax) * q + nx * (o + j), z: az + (bz - az) * q + nz * (o + j), s: r(1.05, 1.45) }); }
    }
    copses(34, [3, 5], [.85, 1.3]);
    bigRocks(22);
    for (let i = 0; i < 60; i++) { const a = r(0, 6.28), d = r(96, 135) * S; L.trees.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, s: r(1, 1.7) }); }
  }


  if (mapId === 'forum') {
    // temples: platform with steps at the front, the cella on the back half, columns across the front
    for (const t of TEMPLES) {
      const at = (u, v) => [t.x + u * t.vz + v * t.vx, t.z - u * t.vx + v * t.vz];
      const [cx, cz] = at(0, 3); box(L, cx, cz, 6, 3, t.rot, 6.5);
      for (const side of [-1, 1]) { const [sx, sz] = at(side * (TEMPLE.hw + .45), -1.5); box(L, sx, sz, .45, 7.5, t.rot, 0); }
      const [bx, bz] = at(0, TEMPLE.back + .45); box(L, bx, bz, TEMPLE.hw + .9, .45, t.rot, 0);
      for (let u = -7.5; u <= 7.5; u += 3) { const [px, pz] = at(u, -4.8); L.obstacles.push({ x: px, z: pz, r: .55 }); L.blockers.push({ x: px, z: pz, r: .55, h: 6 }); L.columns.push({ x: px, z: pz, y: TEMPLE.h, h: 5.2, r: .45 }); }
    }
    // the city: rows of houses, stepping along the same lines as the other big maps' ridges, wall off
    // the corners; the streets between them are the lanes, and the gaps in the rows are the passes
    const CS = 5.5, hgt = (x, z) => 5 + ((Math.abs(x * 7 + z * 3) | 0) % 3);
    const houseLine = (pts, w) => {
      L.ridges.push({ pts, w, h: 0, kind: 'houses', H: 0, flank: 0 });
      let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; for (const [x, z] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z); }
      for (let j = Math.floor((z0 - w) / CS); j <= Math.ceil((z1 + w) / CS); j++) {
        let run = [];
        const flush = () => { if (!run.length) return; const i0 = run[0], i1 = run[run.length - 1], x = (i0 + i1 + 1) / 2 * CS, z = (j + .5) * CS; if (Math.hypot(x, z) < W.R + 6 && !nearCastle(x, z, -6)) box(L, x, z, (i1 - i0 + 1) * CS / 2, CS / 2, 0, hgt(x, z), 'house'); run = []; };
        for (let i = Math.floor((x0 - w) / CS); i <= Math.ceil((x1 + w) / CS); i++) {
          const cx = (i + .5) * CS, cz = (j + .5) * CS;
          if (distToLine(pts, cx, cz) < w + CS * .35) { run.push(i); if (run.length === 3) flush(); } else flush();
        }
        flush();
      }
    };
    carveRoutes(L, R, { line: (pts, w) => houseLine(pts, w * .9), axIn: 59 });
    // insulae in each corner: side streets and cover off the main roads
    for (let k = 0; k < 70; k++) {
      const i = Math.round(r(-20, 20)), j = Math.round(r(-20, 20)), wN = 1 + (R() < .5 ? 1 : 0), dN = 1 + (R() < .35 ? 1 : 0);
      const x = (i + wN / 2) * CS, z = (j + dN / 2) * CS, hw = wN * CS / 2, hd = dN * CS / 2;
      if (!ok(x, z, 2 + Math.max(hw, hd)) || Math.hypot(x, z) < 22 || !clearSpot(L, x, z, 4)) continue;
      box(L, x, z, hw, hd, 0, hgt(x, z), 'house');
    }
    // a few more blocks in the middle, making side streets round the forum square
    const blocks = [[26, 26, 6, 6], [33, 8, 4, 3.5], [8, 33, 3.5, 4]];
    for (const [bx, bz, hw, hd] of blocks) for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      const x = bx * sx, z = bz * sz, h = 5 + ((Math.abs(x * 7 + z * 3) | 0) % 3);
      box(L, x, z, hw, hd, 0, h, 'house');
    }
    // colonnade around the forum square, open on the axes and diagonals
    for (let a = 0; a < Math.PI * 2 - .01; a += 2.6 / 17) {
      if (angNear(a, [...AXES, ...DIAG], .22)) continue;
      const x = Math.cos(a) * 17, z = Math.sin(a) * 17;
      L.obstacles.push({ x, z, r: .5 }); L.columns.push({ x, z, y: 0, h: 4.6, r: .42 });
    }
    for (const [x, z] of [[11, 0], [-11, 0], [0, 11], [0, -11]]) if (!withFort) { L.obstacles.push({ x, z, r: .9 }); L.statues.push({ x, z }); }
  }

  if (mapId === 'colosseum') {
    // inner ring with four gates facing the castles; the gates open and close on a timer
    ringWall(L, 0, 0, ARENA.inner, 1.2, 4.5, a => angNear(a, DIAG, ARENA.gateW / ARENA.inner));
    L.rings.push({ r: ARENA.inner, h: 4.5, gaps: DIAG, gapW: ARENA.gateW / ARENA.inner });
    DIAG.forEach((a, id) => {
      const cx = Math.cos(a) * ARENA.inner, cz = Math.sin(a) * ARENA.inner, tx = -Math.sin(a), tz = Math.cos(a);
      const gate = { id, x: cx, z: cz, rot: Math.atan2(Math.cos(a), Math.sin(a)) + Math.PI / 2, w: ARENA.gateW * 2 };
      gate.obs = wallLine(L, cx - tx * ARENA.gateW, cz - tz * ARENA.gateW, cx + tx * ARENA.gateW, cz + tz * ARENA.gateW, .9, 4, { gate: id + 1 });
      L.gates.push(gate);
    });
    for (const a of AXES) for (const d of [44, 64]) { const x = Math.cos(a) * d, z = Math.sin(a) * d; L.obstacles.push({ x, z, r: 1.3 }); L.blockers.push({ x, z, r: 1.3, h: 7 }); L.statues.push({ x, z, big: true }); }
    L.round = ARENA.r;
  }

  if (mapId === 'desert') {
    ringWall(L, 0, 0, DESERT.wall, 1.1, 4.2, a => angNear(a, AXES, (DESERT.lane + .4) / DESERT.wall) || angNear(a, DIAG, 3 / DESERT.wall));
    L.rings.push({ r: DESERT.wall, h: 4.2, gaps: AXES, gapW: (DESERT.lane + .4) / DESERT.wall, towersAt: DIAG });
    for (const a of DIAG) { const x = Math.cos(a) * DESERT.wall, z = Math.sin(a) * DESERT.wall; L.obstacles.push({ x, z, r: 2.6 }); L.blockers.push({ x, z, r: 2.6, h: 7 }); L.towers.push({ x, z, r: 2.4, h: 7.5, kind: 'sand' }); }
    // sandstone mesas carve the sands into routes; the oases sit in two of the passes
    carveRoutes(L, R, { axis: 'sand', arc: 'sand', H: 7 });
    for (const o of OASES) L.flats.push({ x: o.x, z: o.z, r: o.r + 1.5 });
    const nearOasis = (x, z, pad) => OASES.some(o => Math.hypot(x - o.x, z - o.z) < o.r + pad);
    // palms round the oases, leaving the way through the pass open along it
    for (const o of OASES) for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2 + r(-.2, .2); if (Math.abs(Math.sin(a)) > .75) continue; const d = o.r + r(1, 2.5), x = o.x + Math.cos(a) * d, z = o.z + Math.sin(a) * d; L.palms.push({ x, z, s: r(1, 1.35), lean: r(-.3, .3), rot: r(0, 6.28) }); L.obstacles.push({ x, z, r: .5 }); }
    // market stalls at the foot of the fort, between the ramps
    for (const a of DIAG) { const x = Math.cos(a) * 29, z = Math.sin(a) * 29; box(L, x, z, 1.6, 1.1, -a + Math.PI / 2, 2.6, 'stall'); }
    for (let i = 0; i < 60; i++) { const x = r(-110, 110), z = r(-110, 110); if (!ok(x, z, 1) || Math.hypot(x, z) < 30 || nearOasis(x, z, 3)) continue; L.palms.push({ x, z, s: r(.9, 1.3), lean: r(-.25, .25), rot: r(0, 6.28) }); L.obstacles.push({ x, z, r: .5 }); }
    for (let i = 0; i < 24; i++) { const x = r(-110, 110), z = r(-110, 110); if (!ok(x, z, 3) || Math.hypot(x, z) < 32 || nearOasis(x, z, 5)) continue; box(L, x, z, 1.8, 1.4, r(0, 3), 2.4, 'tent'); }
    bigRocks(16, (x, z) => Math.hypot(x, z) > 28);

  }

  if (mapId === 'wooden') {
    // each castle sits inside a palisade ring with two gates: one toward the centre, one toward a neighbour
    TEAMS.forEach(t => {
      const toC = Math.atan2(-t.pos[1], -t.pos[0]), side = toC + Math.PI / 2;
      ringWall(L, t.pos[0], t.pos[1], 22, .8, 3.4, a => angNear(a, [toC, side], 3.4 / 22));
      L.rings.push({ x: t.pos[0], z: t.pos[1], r: 22, h: 3.4, gaps: [toC, side], gapW: 3.4 / 22, kind: 'logs' });
      for (const g of [toC, side]) for (const s of [-1, 1]) { const a = g + s * 3.9 / 22, x = t.pos[0] + Math.cos(a) * 22, z = t.pos[1] + Math.sin(a) * 22; L.towers.push({ x, z, r: 1.1, h: 6, kind: 'wood', small: true }); }
    });
    for (const a of AXES) { const x = Math.cos(a) * 33, z = Math.sin(a) * 33; L.obstacles.push({ x, z, r: 1.8 }); L.blockers.push({ x, z, r: 1.8, h: 4 }); L.towers.push({ x, z, r: 1.6, h: 8, kind: 'wood' }); }
    // hamlets of huts between the forts
    for (const a of AXES) for (let k = 0; k < 4; k++) {
      const d = 56 + r(-6, 8), off = r(-14, 14), x = Math.cos(a) * d - Math.sin(a) * off, z = Math.sin(a) * d + Math.cos(a) * off;
      if (nearCastle(x, z, 6) || Math.abs(x) > 82 || Math.abs(z) > 82) continue;
      box(L, x, z, 2.2, 1.8, r(0, 3), 3.5, 'hut');
    }
    for (let c = 0; c < 8; c++) { const cx = r(-80, 80), cz = r(-80, 80); if (!clearOf(cx, cz, 8) || Math.hypot(cx, cz) < 38) continue; for (let i = 0; i < 5; i++) { const x = cx + r(-5, 5), z = cz + r(-5, 5); if (clearOf(x, z, 4)) trees(x, z, r(.9, 1.3)); } }
    for (let i = 0; i < 40; i++) { const a = r(0, 6.28), d = r(95, 130) * S; L.trees.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, s: r(1, 1.6) }); }
  }

  if (mapId === 'valley') {
    carveRoutes(L, R);
    // copses of oak in each corner, tucked against the ridges (cover beside the lanes, never in them)
    copses(60, [3, 6]);
    // a ring of old standing stones in the middle: cover to fight round, never a wall
    if (!withFort) for (let k = 0; k < 9; k++) {
      if (k % 3 === 1) continue;
      const a = k / 9 * Math.PI * 2 + .2, x = Math.cos(a) * 9, z = Math.sin(a) * 9;
      L.stones2 = L.stones2 || []; L.stones2.push({ x, z, a, h: r(2.6, 3.6) });
      L.obstacles.push({ x, z, r: .9 }); L.blockers.push({ x, z, r: .9, h: 3.2 });
    }
    for (let i = 0; i < 50; i++) { const a = r(0, 6.28), d = r(95, 130) * S; L.trees.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, s: r(1, 1.6) }); }
    bigRocks(26);
  }

  for (const t of TEAMS) L.obstacles.push({ x: t.pos[0], z: t.pos[1], r: CASTLE_R, castle: true });
  if (withFort) {
    for (let i = 0; i < 12; i++) {
      if (i % 3 === 0) continue; // four gates
      const a = i / 12 * Math.PI * 2, x = Math.cos(a) * 6, z = Math.sin(a) * 6;
      L.fortSegments.push({ a, x, z });
      L.obstacles.push({ x, z, r: 1.3 });
    }
  }
  bakeRidges(L);
  L.ctrlSpots = withCtrl ? makeCtrlSpots(L) : [];
  return L;
}
