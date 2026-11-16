// MAP the relaunch's mountain (the only one since MAP6). Each side is a country: a safe base out on the rim, its nexus, and three
// castles in one clump on the lane ring (left, middle, right). The only way into a base is through its middle
// castle (a wall runs round the country behind the castles, out to the cliff). Between countries a border field
// with the lane road through it. From each middle castle the King's Road runs straight up to the summit; the
// jungle inside the ring is split by it, one half to each outer castle, bounded by rivers (the ring toward the
// summit and one along each border), bridged. Every side the same, turned. The summit (chasm, arena) as before.
import { CROWN2, CROWN26 } from '../../config.js';
import { W } from './size.js';
import { mulberry, angDiff, distToLine, P } from './util.js';
import { ringWall, ridge } from './build.js';
import { mountHomeA, mountCastle } from './mount.js';

const NAMES = ['Greywater', 'Highmoor', 'Ravenhold', 'Thornwall', 'Oakhelm', 'Stonebridge', 'Redcliff', 'Wolfden', 'Ashford', 'Kingsmere', 'Frostgate', 'Emberfell'];
const SLOT = { '-1': 'left', 0: 'middle', 1: 'right' };

// (MAP7) how far (x, z) lies outside its nearest peak (negative: on it), m
export function peakSd(L, x, z) {
  let d = 1e9;
  for (const p of L.peaks || []) {
    const ux = Math.cos(p.a), uz = Math.sin(p.a), t = x * ux + z * uz, s = Math.abs(-x * uz + z * ux);
    d = Math.min(d, Math.max(p.r0 - t, t - p.r1, s - p.hw));
    for (const [cx, cz, r] of p.discs) d = Math.min(d, Math.hypot(x - cx, z - cz) - r);
  }
  return d;
}
export function mount26Places(L, box, trees) {
  const R = W.R, K = CROWN26.r, C = CROWN26, Q = Math.PI / 2, th = C.castleA, cR = C.castleR;
  const RND = mulberry(26026), rr = (a, b) => a + RND() * (b - a);
  L.holds.length = 0; L.cwalls = []; L.homes = []; L.camps = []; L.nexus = []; L.borders = []; L.peaks = []; L.mount = { R, v26: true }; L.ext = CROWN26.r.home * R + CROWN26.peak.base + 2; // (MAP7: the world reaches out to the peaks)
  const ring = d => { const pts = []; for (let k = 0; k <= 96; k++) pts.push(P(k / 96 * Math.PI * 2, d)); return pts; };
  const laneR = K.lane * R, ridgeR = K.ridge * R, riverR = K.river * R, rw = K.riverW * R, ch = K.chasm * R, cw = K.chasmW * R;
  const topR = ((K.chasm + K.chasmW) + (K.river - K.riverW)) / 2 * R; // (a ring road round the summit, between the chasm and the river)
  L.roads.push(ring(laneR), ring(topR));
  for (let c = 0; c < 4; c++) {
    const a = mountHomeA(c);
    // the King's Road: base, nexus, through the middle castle, straight up to the arena gate
    L.roads.push([P(a, K.home * R - 6), P(a, K.arena * R)]);
    // (MAP8) a track from the border field's lane road in through the ridge's opening, to where the two jungles meet
    L.roads.push([P(a + Math.PI / 4, laneR), P(a + Math.PI / 4, ridgeR - C.border.short + 4)]);
  }
  for (let c = 0; c < 4; c++) {
    const a = mountHomeA(c);
    // (MAP7) the peak: out past the rim, over the clouds, the side's base and nexus on one rock joined to the mountain
    // only at its middle castle's back: a broad brick road (three armies abreast) base to nexus, the King's Road on to
    // the castle. Cliffs all round, nothing else to cross.
    L.peaks.push({ c, a, r0: laneR, r1: K.home * R, hw: C.peak.hw, discs: [[...P(a, K.home * R), C.peak.base], [...P(a, K.nexus * R), C.peak.nexus]] });
    // the base: a walled yard on the peak, untakeable, open only toward its nexus
    const [hx, hz] = P(a, K.home * R); L.homes[c] = { c, x: hx, z: hz, a, r: CROWN2.safeR };
    for (let k = 0; k < 6; k++) { const b = a + (k - 2.5) * .5, bx = hx + Math.cos(b) * 7.5, bz = hz + Math.sin(b) * 7.5; box(L, bx, bz, 1.7, 1.4, -b + Math.PI / 2, 3.2, 'cottage').keep = true; }
    { const Y = CROWN2.yard, front = a + Math.PI;
      ringWall(L, hx, hz, Y.r, .7, Y.h, b => Math.abs(angDiff(b, front)) * Y.r < Y.open / 2, { yard: c, keep: true }); }
    // the nexus (the Banner Falls), between the base and the middle castle: placed only, its rules come with castles
    { const [x, z] = P(a, K.nexus * R); L.nexus.push({ c, x, z, r: 2.2, a });
      L.obstacles.push({ x, z, r: 1.4, keep: true, nexus: c }); L.blockers.push({ x, z, r: 1.4, h: 6 }); }
    // the three castles: lane gates both ways and one toward the summit; the middle one also a broad back gate to its peak
    for (const k of [-1, 0, 1]) {
      const ca = a + k * th, [x, z] = P(ca, laneR), tan = ca + Q;
      const h = { x, z, kind: 'castle', name: `Castle ${NAMES[c * 3 + k + 1]}`, r: 8.5, px: x - Math.cos(ca) * 4, pz: z - Math.sin(ca) * 4, towerA0: ca + Math.PI / 4, lane: true, side: c, slot: SLOT[k], mid: k === 0 };
      L.holds.push(h);
      mountCastle(L, h, k === 0 ? [ca + Math.PI, tan, tan + Math.PI, ca] : [tan, tan + Math.PI, ca + Math.PI], cR, k === 0 ? [0, 3] : [0]);
    }
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
  // (MAP8) the ridge: the lip of the jungle tier, open only at the King's Roads and in the middle of each border field
  { const gap = 6 / ridgeR, cuts = []; for (let c = 0; c < 4; c++) { const a = mountHomeA(c); cuts.push([a, gap], [a + Math.PI / 4, C.border.open / ridgeR]); }
    cuts.sort((p, q) => p[0] - q[0]);
    for (let i = 0; i < cuts.length; i++) { const a0 = cuts[i][0] + cuts[i][1], nx = cuts[(i + 1) % cuts.length], a1 = (i + 1 < cuts.length ? nx[0] : nx[0] + Math.PI * 2) - nx[1], n = Math.max(4, Math.ceil((a1 - a0) * ridgeR / 5)), pts = [];
      for (let k = 0; k <= n; k++) pts.push(P(a0 + (a1 - a0) * k / n, ridgeR)); ridge(L, pts, 1.8, 4, 'rock', 2.2, 4); } }
  // the rivers: the ring toward the summit (bridged at every King's Road and on each side of it) and one down each
  // border from the ring, ending short of the ridge (MAP8): past its end the two jungles meet below the border field's
  // opening, so both sides can come out to flank. Deep: only the bridges cross.
  { const bridges = [], lines = [];
    for (let c = 0; c < 4; c++) { const a = mountHomeA(c);
      for (const da of [0, -C.bridgeA, C.bridgeA]) { const ba = a + da, [x, z] = P(ba, riverR); bridges.push({ x, z, a: ba, hw: CROWN2.bridgeHw, len: rw + 2.5, big: false }); }
      const b = a + Math.PI / 4, pts = []; for (let k = 0; k <= 8; k++) pts.push(P(b, riverR + (ridgeR - C.border.short - riverR) * k / 8)); lines.push(pts);
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
  // (MAP5) the bushes: one half's set mirrored into the other and turned to every side, clear of the roads, the
  // castles, the camps, the rivers and the bridges; walkable, they only hide (core/sim/bush.js)
  L.bushes = [];
  { const Bc = C.bush, spots = [], clearB = (x, z, r) => !L.roads.some(p => distToLine(p, x, z) < r + 3) && !L.camps.some(k => Math.hypot(k.x - x, k.z - z) < r + 7)
      && !L.borders.some(b => distToLine(b.pts, x, z) < rw + r + 2) && !L.river.bridges.some(b => Math.hypot(b.x - x, b.z - z) < b.len + r + 3) && Math.hypot(x, z) > riverR + rw + r + 2 && Math.hypot(x, z) < ridgeR - r - 4;
    for (let tries = 0; tries < 3000 && spots.length < Bc.n; tries++) { const da = rr(.04, Math.PI / 4 - .04), d = rr(riverR, ridgeR), r = rr(Bc.r[0], Bc.r[1]);
      if (![0, 1, 2, 3].every(c => [-1, 1].every(s => { const [x, z] = P(mountHomeA(c) + s * da, d); return clearB(x, z, r); }))) continue;
      if (spots.some(([a2, d2, r2]) => Math.hypot(Math.cos(da) * d - Math.cos(a2) * d2, Math.sin(da) * d - Math.sin(a2) * d2) < r + r2 + 4)) continue;
      spots.push([da, d, r]); }
    for (let c = 0; c < 4; c++) for (const s of [-1, 1]) for (const [da, d, r] of spots) { const [x, z] = P(mountHomeA(c) + s * da, d); L.bushes.push({ id: L.bushes.length, x, z, r, side: c }); } }
  const j0 = riverR + rw + 4, j1 = ridgeR - 5, half = []; for (let i = 0; i < 40; i++) half.push([rr(.05, Math.PI / 4 - .05), rr(j0, j1), rr(.95, 1.4)]);
  const busy = (x, z) => L.holds.some(h => Math.hypot(h.x - x, h.z - z) < 14) || L.camps.some(k => Math.hypot(k.x - x, k.z - z) < 7) || L.roads.some(p => distToLine(p, x, z) < 4)
    || L.borders.some(b => distToLine(b.pts, x, z) < rw + 3) || L.river.bridges.some(b => Math.hypot(b.x - x, b.z - z) < b.len + 4) || (L.bushes || []).some(b => Math.hypot(b.x - x, b.z - z) < b.r + 1.5);
  for (let c = 0; c < 4; c++) for (const s of [-1, 1]) for (const [da, d, sz] of half) { const [x, z] = P(mountHomeA(c) + s * da, d); if (!busy(x, z)) trees(x, z, sz); }
  L.jungle = { r0: riverR + rw + 2, r1: ridgeR - 2 };
}
