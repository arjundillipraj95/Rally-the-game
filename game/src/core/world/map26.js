// MAP the relaunch's mountain (?map26=1). Each side is a country: a safe base out on the rim, its nexus, and three
// castles in one clump on the lane ring (left, middle, right). The only way into a base is through its middle
// castle (a wall runs round the country behind the castles, out to the cliff). Between countries a border field
// with the lane road through it. From each middle castle the King's Road runs straight up to the summit; the
// jungle inside the ring is split by it, one half to each outer castle, bounded by rivers (the ring toward the
// summit and one along each border), bridged. Every side the same, turned. The summit (chasm, arena) as before.
import { CROWN2, CROWN26 } from '../../config.js';
import { W } from './size.js';
import { mulberry, angDiff, distToLine, P } from './util.js';
import { ringWall, ridge, wallLine } from './build.js';
import { mountHomeA, mountCastle } from './mount.js';

const NAMES = ['Greywater', 'Highmoor', 'Ravenhold', 'Thornwall', 'Oakhelm', 'Stonebridge', 'Redcliff', 'Wolfden', 'Ashford', 'Kingsmere', 'Frostgate', 'Emberfell'];
const SLOT = { '-1': 'left', 0: 'middle', 1: 'right' };

export function mount26Places(L, box, trees) {
  const R = W.R, K = CROWN26.r, C = CROWN26, Q = Math.PI / 2, th = C.castleA, cR = C.castleR;
  const RND = mulberry(26026), rr = (a, b) => a + RND() * (b - a);
  L.holds.length = 0; L.cwalls = []; L.homes = []; L.camps = []; L.nexus = []; L.borders = []; L.countryWalls = []; L.mount = { R, v26: true };
  const ring = d => { const pts = []; for (let k = 0; k <= 96; k++) pts.push(P(k / 96 * Math.PI * 2, d)); return pts; };
  const laneR = K.lane * R, ridgeR = K.ridge * R, riverR = K.river * R, rw = K.riverW * R, ch = K.chasm * R, cw = K.chasmW * R;
  const topR = ((K.chasm + K.chasmW) + (K.river - K.riverW)) / 2 * R; // (a ring road round the summit, between the chasm and the river)
  L.roads.push(ring(laneR), ring(topR));
  for (let c = 0; c < 4; c++) {
    const a = mountHomeA(c);
    // the King's Road: base, nexus, through the middle castle, straight up to the arena gate
    L.roads.push([P(a, K.home * R - 6), P(a, K.arena * R)]);
    // each outer castle's road down into its jungle half, to its bridge over the river ring
    for (const s of [-1, 1]) L.roads.push([P(a + s * th, laneR), P(a + s * th, ridgeR - 4), P(a + s * C.bridgeA, riverR)]);
  }
  for (let c = 0; c < 4; c++) {
    const a = mountHomeA(c);
    // the base: a walled yard on the rim, untakeable, open only toward its nexus
    const [hx, hz] = P(a, K.home * R); L.homes[c] = { c, x: hx, z: hz, a, r: CROWN2.safeR };
    for (let k = 0; k < 6; k++) { const b = a + (k - 2.5) * .5, bx = hx + Math.cos(b) * 7.5, bz = hz + Math.sin(b) * 7.5; box(L, bx, bz, 1.7, 1.4, -b + Math.PI / 2, 3.2, 'cottage').keep = true; }
    { const Y = CROWN2.yard, front = a + Math.PI;
      ringWall(L, hx, hz, Y.r, .7, Y.h, b => Math.abs(angDiff(b, front)) * Y.r < Y.open / 2 || Math.hypot(hx + Math.cos(b) * Y.r, hz + Math.sin(b) * Y.r) > R - 1.2, { yard: c, keep: true }); }
    // the nexus (the Banner Falls), between the base and the middle castle: placed only, its rules come with castles
    { const [x, z] = P(a, K.nexus * R); L.nexus.push({ c, x, z, r: 2.2, a });
      L.obstacles.push({ x, z, r: 1.4, keep: true, nexus: c }); L.blockers.push({ x, z, r: 1.4, h: 6 }); }
    // the three castles: lane gates both ways and one toward the summit; the middle one also a small back gate to its nexus
    for (const k of [-1, 0, 1]) {
      const ca = a + k * th, [x, z] = P(ca, laneR), tan = ca + Q;
      const h = { x, z, kind: 'castle', name: `Castle ${NAMES[c * 3 + k + 1]}`, r: 8.5, px: x - Math.cos(ca) * 4, pz: z - Math.sin(ca) * 4, towerA0: ca + Math.PI / 4, lane: true, side: c, slot: SLOT[k], mid: k === 0 };
      L.holds.push(h);
      mountCastle(L, h, k === 0 ? [ca + Math.PI, tan, tan + Math.PI, ca] : [tan, tan + Math.PI, ca + Math.PI], cR, k === 0 ? [0] : [0]);
    }
    // the country wall: behind the castles from the left one to the right, then out to the cliff at both ends,
    // so the base is reached only through the middle castle
    { const wr = laneR + cR - 1, cs = L.holds.slice(-3), pts = [], n = Math.ceil(2 * th * wr / 1.1);
      for (let i = 0; i <= n; i++) { const b = a - th + 2 * th * i / n, x = Math.cos(b) * wr, z = Math.sin(b) * wr;
        if (cs.some(h => Math.hypot(h.x - x, h.z - z) < cR + .6)) continue;
        const o = { x, z, r: .9, keep: true, country: c }; L.obstacles.push(o); L.blockers.push({ x, z, r: .9, h: C.wallH }); pts.push([x, z]); }
      const ends = [-1, 1].map(s => { const b = a + s * th; return [P(b, laneR + cR - .3), P(b, R + 2)]; });
      for (const [p0, p1] of ends) wallLine(L, p0[0], p0[1], p1[0], p1[1], .9, C.wallH, { keep: true, country: c });
      L.countryWalls.push({ c, arc: pts, ends }); }
    // the jungle's camps: in each half a buff camp (left: war drum, right: swift) and two gold camps
    for (const s of [-1, 1]) for (const [da, rf, kind] of C.camps) {
      const ca = a + s * da, [x, z] = P(ca, rf * R), cp = { id: L.camps.length, x, z, a: ca, kind, side: c, half: s < 0 ? 'left' : 'right' };
      if (kind === 'buff') cp.buff = C.buff[cp.half];
      L.camps.push(cp);
      for (let k = 0; k < 3; k++) { const b = ca + k * 2.1; box(L, x + Math.cos(b) * 3.4, z + Math.sin(b) * 3.4, 1.1, 1.1, -b, 2, 'hut').keep = true; }
    }
    // the border field toward the next side (clockwise): open ground on the lane tier, the lane road through it
    { const b = a + Math.PI / 4, [x, z] = P(b, laneR); (L.fields = L.fields || []).push({ x, z, a: b }); }
  }
  // the ridge: the lip of the jungle tier, broken only at the King's Roads and the outer castles' roads (never at a border)
  { const gap = 6 / ridgeR, cuts = []; for (let c = 0; c < 4; c++) { const a = mountHomeA(c); cuts.push(a - th, a, a + th); }
    cuts.sort((p, q) => p - q);
    for (let i = 0; i < cuts.length; i++) { const a0 = cuts[i] + gap, a1 = (i + 1 < cuts.length ? cuts[i + 1] : cuts[0] + Math.PI * 2) - gap, n = Math.max(4, Math.ceil((a1 - a0) * ridgeR / 5)), pts = [];
      for (let k = 0; k <= n; k++) pts.push(P(a0 + (a1 - a0) * k / n, ridgeR)); ridge(L, pts, 1.8, 4, 'rock', 2.2, 4); } }
  // the rivers: the ring toward the summit (bridged at every King's Road and below each outer castle) and one down
  // each border from the ridge to the ring (bridged halfway), joining the neighbouring jungles. Deep: only the bridges cross.
  { const bridges = [], lines = [];
    for (let c = 0; c < 4; c++) { const a = mountHomeA(c);
      for (const da of [0, -C.bridgeA, C.bridgeA]) { const ba = a + da, [x, z] = P(ba, riverR); bridges.push({ x, z, a: ba, hw: CROWN2.bridgeHw, len: rw + 2.5, big: false }); }
      const b = a + Math.PI / 4, pts = []; for (let k = 0; k <= 8; k++) pts.push(P(b, riverR + (ridgeR - riverR) * k / 8)); lines.push(pts);
      const [x, z] = P(b, (riverR + ridgeR) / 2); bridges.push({ x, z, a: b + Q, hw: C.border.bridgeHw, len: rw + 2.5, big: false, border: true });
      L.borders.push({ a: b, pts }); }
    L.river = { pts: ring(riverR), lines, w: rw, bridges, fords: [], ring: true }; }
  // the chasm round the summit: impassable but for a bridge on each King's Road
  { for (const [d, gp] of [[ch - cw * .5, CROWN2.chasmBridgeHw + 1.9], [ch + cw + .5, CROWN2.chasmBridgeHw + .9]]) ringWall(L, 0, 0, d, 1.6, 0, a => [0, 1, 2, 3].some(c => Math.abs(angDiff(a, mountHomeA(c))) * d < gp), { chasm: true });
    for (let c = 0; c < 4; c++) { const a = mountHomeA(c), ux = Math.cos(a), uz = Math.sin(a), off = CROWN2.chasmBridgeHw + .35;
      for (let d = ch - cw - 1.6; d <= ch + cw + 1.6; d += .6) for (const s of [-1, 1]) L.obstacles.push({ x: ux * d - uz * s * off, z: uz * d + ux * s * off, r: .4, keep: true, rail: true }); }
    L.chasm = { r: ch, w: cw }; }
  // the arena wall: a gate on each King's Road (opened and shut by the battle's phases)
  { const W0 = K.arena * R, gates = [0, 1, 2, 3].map(mountHomeA), half = CROWN2.arenaGateW / 2 / W0, pw = { r: W0, gates, obs: [], blk: [] }, n = Math.ceil(Math.PI * 2 * W0 / 1.1);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, gi = gates.findIndex(g => Math.abs(angDiff(a, g)) < half), x = Math.cos(a) * W0, z = Math.sin(a) * W0;
      const o = gi < 0 ? { x, z, r: .9, pal: true, off: false, c: -1, k: -1, plazaWall: true, segKey: 'pw' } : { x, z, r: .9, pal: true, off: false, c: -1, k: gi, plazaGate: gi, segKey: 'pg' + gi };
      const b = { x, z, r: .9, h: 3.4, pal: true, off: false, c: -1, k: o.k, plaza: true };
      L.obstacles.push(o); L.blockers.push(b); pw.obs.push(o); pw.blk.push(b);
    }
    L.plazaWall = pw; L.arena = { r: W0 }; }
  // the jungle: one half's stand of trees, mirrored into the other half and turned to every side, clear of the
  // roads, the places, the camps, the rivers and the bridges
  const j0 = riverR + rw + 4, j1 = ridgeR - 5, half = []; for (let i = 0; i < 40; i++) half.push([rr(.05, Math.PI / 4 - .05), rr(j0, j1), rr(.95, 1.4)]);
  const busy = (x, z) => L.holds.some(h => Math.hypot(h.x - x, h.z - z) < 14) || L.camps.some(k => Math.hypot(k.x - x, k.z - z) < 7) || L.roads.some(p => distToLine(p, x, z) < 4)
    || L.borders.some(b => distToLine(b.pts, x, z) < rw + 3) || L.river.bridges.some(b => Math.hypot(b.x - x, b.z - z) < b.len + 4);
  for (let c = 0; c < 4; c++) for (const s of [-1, 1]) for (const [da, d, sz] of half) { const [x, z] = P(mountHomeA(c) + s * da, d); if (!busy(x, z)) trees(x, z, sz); }
  L.jungle = { r0: riverR + rw + 2, r1: ridgeR - 2 };
  // the border fields and the rim: a few trees and rocks, clear of the bases, the castles, the walls and the lane road
  const rim = []; for (let i = 0; i < 10; i++) rim.push([rr(-.22, .22), rr(laneR + 14, R - 4), rr(1, 1.5)]);
  const nearWall = (x, z) => L.countryWalls.some(w => w.arc.some(([px, pz]) => Math.hypot(px - x, pz - z) < 4) || w.ends.some(e => distToLine(e, x, z) < 4));
  for (let c = 0; c < 4; c++) for (const [da, d, sz] of rim) { const [x, z] = P(mountHomeA(c) + Math.PI / 4 + da, d); if (!busy(x, z) && !nearWall(x, z) && L.homes.every(h => Math.hypot(h.x - x, h.z - z) > 20)) trees(x, z, sz); }
}
