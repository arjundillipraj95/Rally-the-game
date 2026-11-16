// Layout building blocks: walls, ring walls, boxes, ridges, solids and the castles' palisades.
import { TEAMS, FORT } from '../../config.js';
import { noCastle } from '../state.js';
import { angDiff } from './util.js';

// ---------- layout helpers ----------
// A wall of circles from (x1,z1) to (x2,z2).
export function wallLine(L, x1, z1, x2, z2, r, h, extra = {}) {
  const len = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.ceil(len / (r * 1.3)));
  const out = [];
  for (let i = 0; i <= n; i++) { const o = Object.assign({ x: x1 + (x2 - x1) * i / n, z: z1 + (z2 - z1) * i / n, r }, extra); out.push(o); L.obstacles.push(o); if (h) L.blockers.push({ x: o.x, z: o.z, r, h, gate: extra.gate }); }
  return out;
}
// A ring wall of circles, leaving gaps where skip(angle) is true.
export function ringWall(L, cx, cz, rad, r, h, skip, extra = {}) {
  const n = Math.ceil(Math.PI * 2 * rad / (r * 1.3));
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2; if (skip && skip(a)) continue;
    const o = Object.assign({ x: cx + Math.cos(a) * rad, z: cz + Math.sin(a) * rad, r }, extra);
    L.obstacles.push(o); if (h) L.blockers.push({ x: o.x, z: o.z, r, h });
  }
}
export function box(L, x, z, hw, hd, rot, h, kind) {
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
export function ridge(L, pts, w, h, kind, H = 5, flank = 7) {
  L.ridges.push({ pts, w, h, kind, H, flank });
  for (let i = 0; i < pts.length - 1; i++) wallLine(L, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], w, h, { ridge: true });
}
// A solid block of rock (a mesa): its outline walls you in, its inside is solid (L.solids, for the
// walking grid and for keeping scenery out), and it stops arrows below its height.
export function solid(L, pts, h, kind) {
  L.solids.push({ pts, h, kind });
  const ring = [...pts, pts[0]];
  for (let i = 0; i < ring.length - 1; i++) wallLine(L, ring[i][0], ring[i][1], ring[i + 1][0], ring[i + 1][1], 1.2, h, { ridge: true });
}
// Every castle's palisade (Fortify): laid out at the start, standing only once bought (or from the
// start on the Wooden Fort). Gates face the middle and one side; sections are numbered from the
// middle-facing gate round, so a breach can knock out one section at a time.
export function palisades(L) {
  L.pal = TEAMS.map((t, c) => {
    if (noCastle(c)) return { c, gates: [], obs: [], blk: [], towers: [] }; // (no castle here this battle)
    const [px, pz] = t.pos, toC = Math.atan2(-pz, -px), gates = [toC, toC + Math.PI / 2], half = FORT.gateW / FORT.r;
    const n = Math.ceil(Math.PI * 2 * FORT.r / 1.04), obs = [], blk = [];
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2; if (gates.some(g => Math.abs(angDiff(a, g)) < half)) continue;
      const k = Math.floor((((a - toC) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2 / FORT.segs));
      const x = px + Math.cos(a) * FORT.r, z = pz + Math.sin(a) * FORT.r;
      const o = { x, z, r: .8, pal: true, c, k, off: true, segKey: c + ':' + k }, b = { x, z, r: .8, h: FORT.h, pal: true, c, k, off: true };
      L.obstacles.push(o); L.blockers.push(b); obs.push(o); blk.push(b);
    }
    // the gates themselves (Fortify's second level): a wall of logs across each gap that opens for the
    // castle's own men and holds against everyone else until it's hacked down (sections segs and segs+1)
    gates.forEach((g, gi) => {
      const m = Math.max(3, Math.round(FORT.gateW * 2 / 1.04));
      for (let j = 0; j <= m; j++) {
        const a = g - half + (j / m) * half * 2, x = px + Math.cos(a) * FORT.r, z = pz + Math.sin(a) * FORT.r, k = FORT.segs + gi;
        const o = { x, z, r: .8, pal: true, door: true, c, k, off: true, segKey: 'door' }, b = { x, z, r: .8, h: FORT.h, pal: true, door: true, c, k, off: true };
        L.obstacles.push(o); L.blockers.push(b); obs.push(o); blk.push(b);
      }
    });
    // the gate towers (Fortify's second level): just outside each gate, on its right
    const towers = gates.map(g => { const a = g - (half + 2.2 / FORT.r); return { x: px + Math.cos(a) * (FORT.r + .2), z: pz + Math.sin(a) * (FORT.r + .2) }; });
    return { c, gates, obs, blk, towers };
  });
}
