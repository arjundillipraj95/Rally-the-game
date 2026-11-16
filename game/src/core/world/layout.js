// makeLayout: what stands where on each map, from the seed (every phone builds the same map).
import { TEAMS, CASTLE_R, HOLDS, CENTRES } from '../../config.js';
import { G, noCastle } from '../state.js';
import { mulberry, angDiff, distToLine, inPoly, smooth, angNear, DIAG, AXES } from './util.js';
import { W, SIDES, placeCastles, gatePos } from './size.js';
import { TEMPLES, TEMPLE, DESERT, OASES, ARENA } from './features.js';
import { resetRiver, bakeRiver, bakeRidges } from './ground.js';
import { wallLine, ringWall, box, palisades } from './build.js';
import { mountPlaces } from './mount.js';
import { mount26Places } from './map26.js';
import { MAP26 } from './flag.js';
import { canyons, fieldBounds, carveRoutes, ROUTES } from './terrain.js';


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
  const base = L.ctrlBase || (L.passes.length ? [[0, 0], ...L.passes.map(p => [p.x, p.z])] : [[0, 0], [42, 0], [-42, 0], [0, 42], [0, -42]]); // (big maps: hold the passes)
  return base.map(([x, z], i) => { const [gx, gz] = findClearSpot(L, x, z); return { id: i, letter: CTRL_LETTERS[i], x: gx, z: gz }; });
}

export function makeLayout(mapId, withFort, withCtrl, seed) {
  resetRiver(); // (last battle's river, gone until this layout's is baked)
  placeCastles(mapId, seed);
  const R = mulberry(seed | 0), r = (a, b) => a + R() * (b - a), S = W.S;
  const L = { mapId, withFort, ridges: [], roads: [], passes: [], flats: [], hills: [], palisades: [], rocks: [], trees: [], stones: [], obstacles: [], blockers: [], fortSegments: [],
    buildings: [], columns: [], towers: [], rings: [], gates: [], palms: [], huts: [], statues: [], holds: [], solids: [], fences: [] };
  palisades(L);
  const nearCastle = (x, z, pad) => TEAMS.some(t => Math.hypot(t.pos[0] - x, t.pos[1] - z) < 25 + pad); // (clear of the palisade ring too)
  const clearOf = (x, z, pad = 0) => !nearCastle(x, z, pad) && Math.hypot(x, z) > (withFort ? 12 : 8) + pad && !(mapId === 'river' && Math.abs(z) < 9);
  if (mapId !== 'mount') for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + r(-.1, .1); L.hills.push({ a, d: r(150, 185) * S, rad: r(18, 34) * S, sy: r(.35, .6) }); }
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
  const nearRidge = (x, z, pad) => L.ridges.some(g => distToLine(g.pts, x, z) < g.w + pad) || L.solids.some(s => inPoly(s.pts, x, z) || distToLine([...s.pts, s.pts[0]], x, z) < 1.5 + pad)
    || L.fences.some(f => distToLine([[f.ax, f.az], [f.bx, f.bz]], x, z) < 1 + pad);
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
    // the Via: a straight street from each castle's gate to the forum square, through the row of houses in front of it
    const onVia = (x, z, pad = 0) => DIAG.some(a => { const ux = Math.cos(a), uz = Math.sin(a), t = x * ux + z * uz; return t > 8 && Math.abs(-x * uz + z * ux) < 5.5 + pad; });
    const houseLine = (pts, w) => {
      L.ridges.push({ pts, w, h: 0, kind: 'houses', H: 0, flank: 0 });
      let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; for (const [x, z] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z); }
      for (let j = Math.floor((z0 - w) / CS); j <= Math.ceil((z1 + w) / CS); j++) {
        let run = [];
        const flush = () => { if (!run.length) return; const i0 = run[0], i1 = run[run.length - 1], x = (i0 + i1 + 1) / 2 * CS, z = (j + .5) * CS; if (Math.hypot(x, z) < W.R + 6 && !nearCastle(x, z, -6)) box(L, x, z, (i1 - i0 + 1) * CS / 2, CS / 2, 0, hgt(x, z), 'house'); run = []; };
        for (let i = Math.floor((x0 - w) / CS); i <= Math.ceil((x1 + w) / CS); i++) {
          const cx = (i + .5) * CS, cz = (j + .5) * CS;
          if (distToLine(pts, cx, cz) < w + CS * .35 && !onVia(cx, cz, CS * .5)) { run.push(i); if (run.length === 3) flush(); } else flush();
        }
        flush();
      }
    };
    carveRoutes(L, R, { line: (pts, w) => houseLine(pts, w * .9), axIn: 59 });
    for (const a of DIAG) L.roads.push([[Math.cos(a) * 92, Math.sin(a) * 92], [Math.cos(a) * 52, Math.sin(a) * 52], [Math.cos(a) * 14, Math.sin(a) * 14]]); // (paved, so it reads, and quick going)
    // insulae in each corner: side streets and cover off the main roads
    for (let k = 0; k < 70; k++) {
      const i = Math.round(r(-20, 20)), j = Math.round(r(-20, 20)), wN = 1 + (R() < .5 ? 1 : 0), dN = 1 + (R() < .35 ? 1 : 0);
      const x = (i + wN / 2) * CS, z = (j + dN / 2) * CS, hw = wN * CS / 2, hd = dN * CS / 2;
      if (!ok(x, z, 2 + Math.max(hw, hd)) || Math.hypot(x, z) < 22 || !clearSpot(L, x, z, 4) || onVia(x, z, Math.max(hw, hd))) continue;
      box(L, x, z, hw, hd, 0, hgt(x, z), 'house');
    }
    // a few more blocks in the middle, making side streets round the forum square
    const blocks = [[33, 8, 4, 3.5], [8, 33, 3.5, 4]]; // (the corner blocks on the diagonals gave way to the Via)
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
    // sandstone mesas: a maze of canyons between the castles and the fort; the oases sit at junctions
    canyons(L, R);
    for (const o of OASES) L.flats.push({ x: o.x, z: o.z, r: o.r + 1.5, dip: .5, dipR: o.r });
    const nearOasis = (x, z, pad) => OASES.some(o => Math.hypot(x - o.x, z - o.z) < o.r + pad);
    // palms round the oases, leaving the way through the pass open along it
    for (const o of OASES) for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2 + r(-.2, .2); if (Math.abs(Math.sin(a)) > .75) continue; const d = o.r + r(1, 2.5), x = o.x + Math.cos(a) * d, z = o.z + Math.sin(a) * d; L.palms.push({ x, z, s: r(1, 1.35), lean: r(-.3, .3), rot: r(0, 6.28) }); L.obstacles.push({ x, z, r: .5 }); }
    // market stalls at the foot of the fort, between the ramps
    for (const a of DIAG) { const x = Math.cos(a) * 29, z = Math.sin(a) * 29; box(L, x, z, 1.6, 1.1, -a + Math.PI / 2, 2.6, 'stall'); }
    for (let i = 0; i < 60; i++) { const x = r(-110, 110), z = r(-110, 110); if (!ok(x, z, 1) || Math.hypot(x, z) < 30 || nearOasis(x, z, 3)) continue; L.palms.push({ x, z, s: r(.9, 1.3), lean: r(-.25, .25), rot: r(0, 6.28) }); L.obstacles.push({ x, z, r: .5 }); }
    for (let i = 0; i < 24; i++) { const x = r(-110, 110), z = r(-110, 110); if (!ok(x, z, 3) || Math.hypot(x, z) < 32 || nearOasis(x, z, 5)) continue; box(L, x, z, 1.8, 1.4, r(0, 3), 2.4, 'tent'); }
    bigRocks(16, (x, z) => Math.hypot(x, z) > 28);
    // the prize: a spring in the old fort, palms round it. Whoever holds it heals and grows rich
    L.holds.push({ x: 0, z: 0, kind: 'oasis', r: HOLDS.oasis.r, px: 4.8, pz: 0 });
    for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2 + .3, d = r(7.5, 9.5); const x = Math.cos(a) * d, z = Math.sin(a) * d; L.palms.push({ x, z, s: r(1.05, 1.35), lean: r(-.2, .2), rot: r(0, 6.28), spring: true }); L.obstacles.push({ x, z, r: .45 }); }
  }

  if (mapId === 'wooden') {
    // each castle starts inside its palisade (Fortify's first level, already built; see palisades()),
    // two gates: one toward the centre, one toward a neighbour, each flanked by watchtowers
    L.fortStart = 1;
    TEAMS.forEach((t, c) => {
      if (noCastle(c)) return;
      const toC = Math.atan2(-t.pos[1], -t.pos[0]), side = toC + Math.PI / 2;
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
    fieldBounds(L, R);
    // farm tracks: from each gate to the middle and out to the villages (they read from the saddle)
    for (const t of TEAMS) {
      if (noCastle(TEAMS.indexOf(t))) continue;
      const [gx, gz] = gatePos(t, 0, 4), jit = () => (R() - .5) * 8; L.roads.push(smooth([[gx, gz], [gx * .6 + jit(), gz * .6 + jit()], [gx * .25 + jit(), gz * .25 + jit()], [0, 0]], 3));
      const a = SIDES.flanks.slice().sort((p, q) => Math.abs(angDiff(Math.atan2(t.pos[1], t.pos[0]), p)) - Math.abs(angDiff(Math.atan2(t.pos[1], t.pos[0]), q)))[0], vx = Math.cos(a) * 77.5, vz = Math.sin(a) * 77.5;
      L.roads.push(smooth([[gx, gz], [(gx + vx) / 2 + jit(), (gz + vz) / 2 + jit()], [vx, vz]], 3)); // (and out to the nearer village)
    }
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
    // a village in each pass on the x axis (between enemy castles in 2v2): hold it and it sends you men.
    // Its cottages stand at the corners of the wheat field, leaving the way through open
    if (G.mode !== 'crown') for (const a of SIDES.flanks) {
      const ux = Math.cos(a), uz = Math.sin(a), cx = ux * ROUTES.pass, cz = uz * ROUTES.pass; // (u: out from the middle; the lane through runs across it)
      L.holds.push({ x: cx, z: cz, kind: 'village', r: HOLDS.village.r, px: cx + ux * 7.3, pz: cz + uz * 7.3 });
      for (const [dx, dz] of [[-6.6, -8.8], [6.6, -8.8], [-6.6, 8.8], [6.6, 8.8]]) { const t = dz + r(-.6, .6); box(L, cx + ux * dx - uz * t, cz + uz * dx + ux * t, 1.9, 1.5, -a + r(-.15, .15) + (dz > 0 ? Math.PI : 0), 3.2, 'cottage'); }
    }
  }

  // the prize in the middle (desert has its oasis; capture-the-fort and control have their own middles)
  if (G.mode === 'crown') (MAP26 ? mount26Places : mountPlaces)(L, box, trees);
  if (G.mode === 'crown' && MAP26) L.map26 = true;
  const C = G.mode === 'crown' ? null : CENTRES[mapId];
  if (C && !withFort && !withCtrl) L.holds.unshift({ x: 0, z: 0, kind: C[0], name: C[1], r: HOLDS[C[0]].r, px: 4.8, pz: 0, centre: true });
  for (const h of L.holds) { if (!h.name) h.name = h.kind === 'oasis' ? 'the Oasis' : 'a village'; if (!h.x && !h.z) h.centre = true; }
  TEAMS.forEach((t, c) => { if (!noCastle(c)) L.obstacles.push({ x: t.pos[0], z: t.pos[1], r: CASTLE_R, castle: true }); });
  if (withFort) {
    for (let i = 0; i < 12; i++) {
      if (i % 3 === 0) continue; // four gates
      const a = i / 12 * Math.PI * 2, x = Math.cos(a) * 6, z = Math.sin(a) * 6;
      L.fortSegments.push({ a, x, z });
      L.obstacles.push({ x, z, r: 1.3 });
    }
  }
  bakeRiver(L); bakeRidges(L);
  // the roads: a coarse grid of where they run (2 m cells), so the going on them can be quicker
  if (L.roads.length) {
    const N = Math.ceil(W.R * 2 / 2) + 1, g = new Uint8Array(N * N);
    for (const p of L.roads) for (let i = 0; i < p.length - 1; i++) {
      const [ax, az] = p[i], [bx, bz] = p[i + 1], n = Math.ceil(Math.hypot(bx - ax, bz - az) / .7);
      for (let k = 0; k <= n; k++) { const x = ax + (bx - ax) * k / n, z = az + (bz - az) * k / n; for (const [ox, oz] of [[0, 0], [1.2, 0], [-1.2, 0], [0, 1.2], [0, -1.2]]) { const cx = Math.round((x + ox + W.R) / 2), cz = Math.round((z + oz + W.R) / 2); if (cx >= 0 && cz >= 0 && cx < N && cz < N) g[cz * N + cx] = 1; } }
    }
    L.roadGrid = { N, g };
  }
  L.ctrlSpots = withCtrl ? makeCtrlSpots(L) : [];
  return L;
}
