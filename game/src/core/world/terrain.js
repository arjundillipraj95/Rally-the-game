// The big maps' country: the Desert's canyons, the Valley's field bounds, the shared routes and ridges.
import { TEAMS } from '../../config.js';
import { W, SIDES } from './size.js';
import { P, smooth, DIAG, AXES } from './util.js';
import { solid, wallLine, ridge } from './build.js';

// The Desert's canyon country: sandstone mesas scattered so the gaps between them make a maze of
// winding canyons (some running on, some ending blind), placed a quarter at a time and turned to the
// other three quarters so every castle faces the same maze. Kept clear: the bowl round the fort, each
// castle's yard, the two oases (each sits in a canyon junction), and the edge.
export function canyons(L, R) {
  const r = (a, b) => a + R() * (b - a), keep = [];
  const clear = (x, z, rad) => Math.hypot(x, z) < 37 + rad || Math.hypot(x, z) > W.R - 3 - rad * .4
    || TEAMS.some(t => Math.hypot(t.pos[0] - x, t.pos[1] - z) < 27 + rad)
    || SIDES.mids.some(a => Math.hypot(Math.cos(a) * 77.5 - x, Math.sin(a) * 77.5 - z) < 11 + rad);
  // (over the whole ring now the castles stand where the teams put them, not in four turned corners)
  for (let tries = 0; tries < 6000 && keep.length < 64; tries++) {
    const a = r(0, Math.PI * 2), d = r(40, W.R - 4), x = Math.cos(a) * d, z = Math.sin(a) * d, rad = r(8, 14.5);
    if (clear(x, z, rad * .8)) continue;
    const gap = 5.5; // (the narrowest canyon: room for a few men abreast)
    if (keep.some(m => Math.hypot(m.x - x, m.z - z) < m.rad + rad + gap)) continue;
    keep.push({ x, z, rad, h: r(4.4, 6.2), n: 9 + Math.floor(R() * 3), stretch: r(.7, 1.45), tilt: r(0, Math.PI), wob: Array.from({ length: 12 }, () => r(.78, 1.12)) });
  }
  for (const m of keep) {
    const pts = []; for (let i = 0; i < m.n; i++) { const a = i / m.n * Math.PI * 2, rr = m.rad * m.wob[i], lx = Math.cos(a) * rr * m.stretch, lz = Math.sin(a) * rr / m.stretch; pts.push([m.x + lx * Math.cos(m.tilt) - lz * Math.sin(m.tilt), m.z + lx * Math.sin(m.tilt) + lz * Math.cos(m.tilt)]); }
    solid(L, pts, m.h, 'mesa');
  }
  L.ctrlBase = [[0, 0], ...SIDES.mids.map(a => [Math.cos(a) * 77.5, Math.sin(a) * 77.5])]; // (Control mode: the fort and the four canyon junctions)
}
// Grass Valley's open country: no ridges, just fields bounded here and there by dry-stone walls and
// hedgerows (short runs with gaps: they shape a fight without walling anyone in), so any direction is
// a way through. A quarter at a time, turned to the other three for fairness.
export function fieldBounds(L, R) {
  const r = (a, b) => a + R() * (b - a), segs = [];
  const clear = (x, z, pad) => TEAMS.some(t => Math.hypot(t.pos[0] - x, t.pos[1] - z) < 24 + pad) || Math.hypot(x, z) < 15 + pad || Math.hypot(x, z) > W.R - 8
    || SIDES.mids.some((a, i) => Math.hypot(Math.cos(a) * 77.5 - x, Math.sin(a) * 77.5 - z) < (SIDES.flanks.includes(a) ? 15 : 6) + pad);
  for (let tries = 0; tries < 2500 && segs.length < 44; tries++) { // (over the whole field: the castles stand where the teams put them)
    const a = r(0, Math.PI * 2), d = r(22, W.R - 12), x = Math.cos(a) * d, z = Math.sin(a) * d, len = r(9, 17);
    const ang = (R() < .5 ? 0 : Math.PI / 2) + r(-.25, .25), dx = Math.cos(ang) * len / 2, dz = Math.sin(ang) * len / 2;
    if (clear(x, z, len / 2) || clear(x + dx, z + dz, 1) || clear(x - dx, z - dz, 1)) continue;
    if (segs.some(s => Math.hypot(s.x - x, s.z - z) < (s.len + len) / 2 + 6)) continue;
    segs.push({ x, z, len, dx, dz, kind: R() < .5 ? 'wall' : 'hedge' });
  }
  for (const s of segs) {
    const ax = s.x - s.dx, az = s.z - s.dz, bx = s.x + s.dx, bz = s.z + s.dz;
    L.fences.push({ ax, az, bx, bz, kind: s.kind });
    wallLine(L, ax, az, bx, bz, .75, s.kind === 'hedge' ? 2 : 1.1, { fence: true }); // (a hedge stops arrows; a low wall only the flat ones)
  }
}
// The big maps' shared shape. Each castle's corner is closed toward the middle by a curved ridge,
// so the way in is by one of two lanes round its ends; ridges along the axes wall the corners off
// from each other, with one pass each on the outside (to a neighbour) and open ground in the middle.
// Roads trace the routes so they read from the saddle.
export const ROUTES = { axIn: 44, axOut0: 69, axOut1: 86, pass: 77.5, arcR: 60, arcSpan: .5 };
export function carveRoutes(L, R, opt = {}) {
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
