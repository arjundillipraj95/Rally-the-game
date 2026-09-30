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

// ---------- fixed map features (the same every match) ----------
// Forum: four temples on raised platforms between neighbouring castles, steps facing the centre.
export const TEMPLES = [[0, 50], [50, 0], [0, -50], [-50, 0]].map(([x, z]) => { const d = Math.hypot(x, z); return { x, z, vx: x / d, vz: z / d, rot: Math.atan2(x / d, z / d) }; });
export const TEMPLE = { hw: 9, front: -6, back: 6, steps: 3, h: 1.8 };
// Desert Fort: a sand-walled fortress on a plateau, ramps up through four gates on the axes.
export const DESERT = { r: 17.5, wall: 18.4, ramp: 25, h: 2.4, lane: 3 };
// Grass Valley: four rounded hills between neighbouring castles.
export const VALLEY_HILLS = [[0, 46], [46, 0], [0, -46], [-46, 0]];
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
export function groundY(x, z) {
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
  if (r > 92) y += (r - 92) * .25 + Math.max(0, n) * ((r - 92) * .18);
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
  const base = [[0, 0], [42, 0], [-42, 0], [0, 42], [0, -42]];
  return base.map(([x, z], i) => { const [gx, gz] = findClearSpot(L, x, z); return { id: i, letter: CTRL_LETTERS[i], x: gx, z: gz }; });
}

export function makeLayout(mapId, withFort, withCtrl, seed) {
  const R = mulberry(seed | 0), r = (a, b) => a + R() * (b - a);
  const L = { mapId, withFort, hills: [], palisades: [], rocks: [], trees: [], stones: [], obstacles: [], blockers: [], fortSegments: [],
    buildings: [], columns: [], towers: [], rings: [], gates: [], palms: [], huts: [], statues: [] };
  const nearCastle = (x, z, pad) => TEAMS.some(t => Math.hypot(t.pos[0] - x, t.pos[1] - z) < 20 + pad);
  const clearOf = (x, z, pad = 0) => !nearCastle(x, z, pad) && Math.hypot(x, z) > (withFort ? 12 : 8) + pad && !(mapId === 'river' && Math.abs(z) < 9);
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + r(-.1, .1); L.hills.push({ a, d: r(150, 185), rad: r(18, 34), sy: r(.35, .6) }); }
  const scatterRocks = (n, ok = clearOf) => {
    for (let i = 0; i < n; i++) {
      const x = r(-80, 80), z = r(-80, 80), rad = r(.6, 1.7), rx = r(0, 3), ry = r(0, 3);
      if (!ok(x, z)) continue;
      L.rocks.push({ x, z, r: rad, rx, ry });
      if (rad > 1.1) L.obstacles.push({ x, z, r: rad * .9 });
    }
  };
  const trees = (x, z, s) => { L.trees.push({ x, z, s }); if (Math.hypot(x, z) < 90) { L.obstacles.push({ x, z, r: .7 * s }); L.blockers.push({ x, z, r: 1.4 * s, h: 7 }); } };

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
    for (let i = 0; i < 40; i++) { const a = r(0, 6.28), d = r(95, 130); L.trees.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, s: r(1, 1.6) }); }
    scatterRocks(10);
  }
  if (mapId === 'frost') scatterRocks(20);

  if (mapId === 'forum') {
    // temples: platform with steps at the front, the cella on the back half, columns across the front
    for (const t of TEMPLES) {
      const at = (u, v) => [t.x + u * t.vz + v * t.vx, t.z - u * t.vx + v * t.vz];
      const [cx, cz] = at(0, 3); box(L, cx, cz, 6, 3, t.rot, 6.5);
      for (const side of [-1, 1]) { const [sx, sz] = at(side * (TEMPLE.hw + .45), -1.5); box(L, sx, sz, .45, 7.5, t.rot, 0); }
      const [bx, bz] = at(0, TEMPLE.back + .45); box(L, bx, bz, TEMPLE.hw + .9, .45, t.rot, 0);
      for (let u = -7.5; u <= 7.5; u += 3) { const [px, pz] = at(u, -4.8); L.obstacles.push({ x: px, z: pz, r: .55 }); L.blockers.push({ x: px, z: pz, r: .55, h: 6 }); L.columns.push({ x: px, z: pz, y: TEMPLE.h, h: 5.2, r: .45 }); }
    }
    // city blocks make streets on the way from each castle to the forum
    const blocks = [[26, 26, 6, 6], [47, 20, 5, 4], [20, 47, 4, 5], [33, 8, 4, 3.5], [8, 33, 3.5, 4]];
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
    // palms, tents and rocks outside
    for (let i = 0; i < 40; i++) { const x = r(-80, 80), z = r(-80, 80); if (!clearOf(x, z, 2) || Math.hypot(x, z) < 30) continue; L.palms.push({ x, z, s: r(.9, 1.3), lean: r(-.25, .25), rot: r(0, 6.28) }); L.obstacles.push({ x, z, r: .5 }); }
    for (let i = 0; i < 10; i++) { const x = r(-70, 70), z = r(-70, 70); if (!clearOf(x, z, 3) || Math.hypot(x, z) < 32) continue; box(L, x, z, 1.8, 1.4, r(0, 3), 2.4, 'tent'); }
    scatterRocks(12, (x, z) => clearOf(x, z) && Math.hypot(x, z) > 28);
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
    for (let i = 0; i < 40; i++) { const a = r(0, 6.28), d = r(95, 130); L.trees.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, s: r(1, 1.6) }); }
  }

  if (mapId === 'valley') {
    // a ring of rocky outcrops around the middle with eight passes (the choke points)
    const passes = [...AXES, ...DIAG], rr = 31;
    const n = Math.ceil(Math.PI * 2 * rr / 2.6);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2; if (angNear(a, passes, 4.2 / rr)) continue;
      const d = rr + r(-1.5, 1.5), x = Math.cos(a) * d, z = Math.sin(a) * d, rad = r(1.6, 2.6);
      L.rocks.push({ x, z, r: rad, rx: r(0, 3), ry: r(0, 3), big: true }); L.obstacles.push({ x, z, r: rad * .95 }); L.blockers.push({ x, z, r: rad, h: rad * 1.6 });
    }
    for (let c = 0; c < 10; c++) { const cx = r(-80, 80), cz = r(-80, 80); if (!clearOf(cx, cz, 6) || Math.abs(Math.hypot(cx, cz) - rr) < 8) continue; for (let i = 0; i < 4; i++) { const x = cx + r(-4, 4), z = cz + r(-4, 4); if (clearOf(x, z, 4)) trees(x, z, r(.8, 1.2)); } }
    for (let i = 0; i < 40; i++) { const a = r(0, 6.28), d = r(95, 130); L.trees.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, s: r(1, 1.6) }); }
    scatterRocks(14, (x, z) => clearOf(x, z) && Math.abs(Math.hypot(x, z) - rr) > 6);
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
  L.ctrlSpots = withCtrl ? makeCtrlSpots(L) : [];
  return L;
}
