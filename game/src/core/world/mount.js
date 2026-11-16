// The Crown's mountain: heights and places (homes, lane castles, keeps, villages, camps, river, chasm, arena).
import { CROWN, CROWN2, CROWN26 } from '../../config.js';
import { MAP26 } from './flag.js';
import { W } from './size.js';
import { mulberry, angDiff, distToLine } from './util.js';
import { ringWall, ridge } from './build.js';

// ---------- the Crown: the places worth holding, laid out afresh every match from the seed ----------
// ---------- the new Crown: the mountain ----------
// Terraces round the summit: the lanes (lowest), the jungle a step up behind the ridge, the top ring
// above the river, the arena on the summit behind its chasm. Every quarter the same, turned.
const sstep = (a, b, t) => { const k = Math.min(1, Math.max(0, (t - a) / (b - a))); return k * k * (3 - 2 * k); };
export const mountK = () => MAP26 ? CROWN26.r : CROWN2.r; // (the radii of the mountain being played)
export const mountHomeA = c => -Math.PI / 2 + c * Math.PI / 2; // (where each colour's home stands, as an angle: x = cos, z = sin)
export function mountY(x, z) {
  const R = W.R, r = Math.hypot(x, z), K = mountK(), H = CROWN2.h;
  if (r > K.ridge * R + 5) return H.lane;
  const rin = K.river * R - K.riverW * R - 1.5; // (the river runs level on the jungle tier; its inner bank climbs to the top ring)
  if (r > rin) return H.lane + (H.jungle - H.lane) * sstep(K.ridge * R + 5, K.ridge * R - 5, r);
  const ch = K.chasm * R, cw = K.chasmW * R;
  if (r > ch + cw) return H.jungle + (H.top - H.jungle) * sstep(rin, rin - 7, r);
  if (r > ch - cw) { // the chasm, but for the four bridges over it
    const a = Math.atan2(z, x), off = Math.min(...[0, 1, 2, 3].map(c => Math.abs(angDiff(a, mountHomeA(c))))) * r;
    if (off < CROWN2.chasmBridgeHw + .5) return H.top + .25;
    const d = Math.min(r - (ch - cw), (ch + cw) - r); return H.top - Math.min(1, d / 1.2) * (H.top - H.chasm);
  }
  return H.top + .15;
}
const CASTLE_NAMES2 = ['Greywater', 'Highmoor', 'Ravenhold', 'Thornwall', 'Oakhelm', 'Stonebridge', 'Redcliff', 'Wolfden'];
const KEEP_NAMES2 = ['the Eagle Keep', 'the Stag Keep', 'the Bear Keep', 'the Wolf Keep'];
const VILLAGE_NAMES2 = ['Millbrook', 'Applecross', 'Honeydale', 'Bramblewick'];
// a castle on the mountain: the crown castles' keep, towers and curtain wall (gates at the angles given,
// the first the wide one), in the same shape the Crown's castle code already knows
export function mountCastle(L, h, gates, R0, wide = [0]) {
  const { x, z } = h;
  L.towers.push({ x, z, r: 2.6, h: h.keepTower ? 11 : 8, kind: 'keep' }); L.obstacles.push({ x, z, r: 2.9, keep: true }); L.blockers.push({ x, z, r: 2.9, h: 9 });
  for (let t = 0; t < 4; t++) { const b = (h.towerA0 || 0) + t * Math.PI / 2, tx = x + Math.cos(b) * (R0 - 1.6), tz = z + Math.sin(b) * (R0 - 1.6); L.towers.push({ x: tx, z: tz, r: 1, h: 5, kind: 'keep', small: true }); L.obstacles.push({ x: tx, z: tz, r: 1.2, keep: true }); }
  const halfs = gates.map((_, k) => (wide.includes(k) ? CROWN.cgateW : CROWN.cgateSmall) / 2 / R0), n = Math.ceil(Math.PI * 2 * R0 / 1.1);
  const cw = { hid: L.holds.indexOf(h), x, z, r: R0, gate: gates[0], gates, obs: [], blk: [] };
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2, wx = x + Math.cos(a) * R0, wz = z + Math.sin(a) * R0, gi = gates.findIndex((ga, k) => Math.abs(angDiff(a, ga)) < halfs[k]), isGate = gi >= 0;
    const o = isGate ? { x: wx, z: wz, r: .9, pal: true, c: -1, k: -1, cgate: cw.hid, gi, segKey: 'cg' + cw.hid + ':' + gi } : { x: wx, z: wz, r: .9, keep: true, cwall: true };
    const b = { x: wx, z: wz, r: .9, h: 2.8, cgate: isGate ? cw.hid : undefined, gi };
    L.obstacles.push(o); L.blockers.push(b); cw.obs.push(o); cw.blk.push(b);
  }
  L.cwalls.push(cw);
}
export function mountPlaces(L, box, trees) {
  const R = W.R, K = CROWN2.r, P = (a, d) => [Math.cos(a) * d, Math.sin(a) * d], Q = Math.PI / 2;
  const RND = mulberry(90210), r = (a, b) => a + RND() * (b - a);
  L.holds.length = 0; L.cwalls = []; L.homes = []; L.camps = []; L.mount = { R };
  const castleR = 10.5, keepR = 9;
  // the roads: the lane ring, the keep ring, each home's road up to its keep, each field's road up through the jungle
  const ring = d => { const pts = []; for (let k = 0; k <= 96; k++) pts.push(P(k / 96 * Math.PI * 2, d)); return pts; };
  L.roads.push(ring(K.lane * R), ring(K.keep * R));
  for (let c = 0; c < 4; c++) {
    const a = mountHomeA(c);
    L.roads.push([P(a, K.home * R - 4), P(a, K.arena * R)]);
    L.roads.push([P(a + Math.PI / 4, K.lane * R), P(a + Math.PI / 4, K.top * R - 2)]);
  }
  for (let c = 0; c < 4; c++) {
    const a = mountHomeA(c);
    // home: a walled town on the rim, untakeable; its safe ground round it
    const [hx, hz] = P(a, K.home * R); L.homes[c] = { c, x: hx, z: hz, a, r: CROWN2.safeR };
    for (let k = 0; k < 6; k++) { const b = a + (k - 2.5) * .5, [bx, bz] = [hx + Math.cos(b) * 7.5, hz + Math.sin(b) * 7.5]; /* (behind the town, toward the rim: the way up stays open) */ box(L, bx, bz, 1.7, 1.4, -b + Math.PI / 2, 3.2, 'cottage').keep = true; }
    // (F7) the courtyard: a wall round the cottages, open at the front toward the keep, and only where the field is
    { const Y = CROWN2.yard, front = a + Math.PI;
      ringWall(L, hx, hz, Y.r, .7, Y.h, b => Math.abs(angDiff(b, front)) * Y.r < Y.open / 2 || Math.hypot(hx + Math.cos(b) * Y.r, hz + Math.sin(b) * Y.r) > R - 1.2, { yard: c, keep: true }); }
    // the two lane castles of this home (one toward each neighbour)
    for (const sgn of [1, -1]) {
      const ca = a + sgn * CROWN2.castleA[0], [x, z] = P(ca, K.lane * R), tan = ca + sgn * Q; // (tan: along the lane, away from home)
      const h = { x, z, kind: 'castle', name: `Castle ${CASTLE_NAMES2[c * 2 + (sgn > 0 ? 0 : 1)]}`, r: 8.5, px: x - Math.cos(ca) * 4, pz: z - Math.sin(ca) * 4, towerA0: ca + Math.PI / 4, lane: true };
      L.holds.push(h); mountCastle(L, h, [tan, tan + Math.PI, ca + Math.PI], castleR);
    }
    // the keep, straight up from home on the top ring
    { const [x, z] = P(a, K.keep * R), h = { x, z, kind: 'castle', keep: true, keepTower: true, name: KEEP_NAMES2[c], r: 7.5, px: x + Math.cos(a) * 3.5, pz: z + Math.sin(a) * 3.5, towerA0: a + Math.PI / 4 };
      // (a wide gate at the back too, straight at the summit: hold the keep and it's one run, keep, bridge, arena gate, glacier)
      L.holds.push(h); mountCastle(L, h, [a, a + Q, a - Q, a + Math.PI], keepR, [0, 3]); }
    // the jungle village on the diagonal, above the open field
    { const va = a + Math.PI / 4, [x, z] = P(va, K.village * R), ux = Math.cos(va), uz = Math.sin(va);
      L.holds.push({ x, z, kind: 'village', name: VILLAGE_NAMES2[c], r: 9, px: x + ux * 6, pz: z + uz * 6 });
      for (const [dx, dz] of [[-5.6, -7.4], [5.6, -7.4], [-5.6, 7.4], [5.6, 7.4]]) box(L, x + ux * dx - uz * dz, z + uz * dx + ux * dz, 1.7, 1.4, -va + (dz > 0 ? Math.PI : 0), 3, 'cottage').keep = true; }
    // two bandit camps in this quarter of the jungle
    for (const ca of CROWN2.campA) { const [x, z] = P(a + ca, K.camp * R); L.camps.push({ id: L.camps.length, x, z, a: a + ca });
      for (let k = 0; k < 3; k++) { const b = a + ca + k * 2.1; box(L, x + Math.cos(b) * 3.4, z + Math.sin(b) * 3.4, 1.1, 1.1, -b, 2, 'hut').keep = true; } }
    L.fields = L.fields || []; L.fields.push({ x: P(a + Math.PI / 4, K.lane * R)[0], z: P(a + Math.PI / 4, K.lane * R)[1] });
  }
  // the ridge: the lip of the jungle tier, broken by a ramp at every home's road and every field's
  const gap = 8 / (K.ridge * R);
  for (let c = 0; c < 4; c++) { const a = mountHomeA(c);
    for (const [a0, a1] of [[a + gap, a + Math.PI / 4 - gap], [a + Math.PI / 4 + gap, a + Q - gap]]) { const pts = []; for (let k = 0; k <= 14; k++) pts.push(P(a0 + (a1 - a0) * k / 14, K.ridge * R)); ridge(L, pts, 1.8, 4, 'rock', 2.2, 4); } }
  // the river: one ring of meltwater, wadeable anywhere (slowly), eight narrow bridges
  { const pts = ring(K.river * R), w = K.riverW * R, bridges = [], fords = [];
    for (let c = 0; c < 4; c++) for (const da of [0, Math.PI / 4]) { const ba = mountHomeA(c) + da, [x, z] = P(ba, K.river * R); bridges.push({ x, z, a: ba, hw: CROWN2.bridgeHw, len: w + 2.5, big: false }); }
    for (let k = 0; k < 48; k++) { const [x, z] = P(k / 48 * Math.PI * 2, K.river * R); fords.push({ x, z, r: 9, a: k / 48 * Math.PI * 2 }); }
    L.river = { pts, w, bridges, fords, ring: true }; }
  // the chasm round the summit: impassable but for a bridge in line with each keep
  { const ch = K.chasm * R, cw = K.chasmW * R;
    // the inner wall down in the pit; the outer one right on the lip, so nobody waiting for a bridge stands on the slope (each
    // leaves just the bridge's width, rails and all)
    for (const [d, gap] of [[ch - cw * .5, CROWN2.chasmBridgeHw + 1.9], [ch + cw + .5, CROWN2.chasmBridgeHw + .9]]) ringWall(L, 0, 0, d, 1.6, 0, a => [0, 1, 2, 3].some(c => Math.abs(angDiff(a, mountHomeA(c))) * d < gap), { chasm: true });
    // each bridge railed both sides, end to end and into the walls: nobody shoved off the side
    for (let c = 0; c < 4; c++) { const a = mountHomeA(c), ux = Math.cos(a), uz = Math.sin(a), off = CROWN2.chasmBridgeHw + .35;
      for (let d = ch - cw - 1.6; d <= ch + cw + 1.6; d += .6) for (const s of [-1, 1]) L.obstacles.push({ x: ux * d - uz * s * off, z: uz * d + ux * s * off, r: .4, keep: true, rail: true }); }
    L.chasm = { r: ch, w: cw }; }
  // the arena wall: stone all round, a gate facing each keep (opened and shut by the battle's phases)
  { const W0 = K.arena * R, gates = [0, 1, 2, 3].map(mountHomeA), half = CROWN2.arenaGateW / 2 / W0, pw = { r: W0, gates, obs: [], blk: [] }, n = Math.ceil(Math.PI * 2 * W0 / 1.1);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, gi = gates.findIndex(g => Math.abs(angDiff(a, g)) < half), x = Math.cos(a) * W0, z = Math.sin(a) * W0;
      const o = gi < 0 ? { x, z, r: .9, pal: true, off: false, c: -1, k: -1, plazaWall: true, segKey: 'pw' } : { x, z, r: .9, pal: true, off: false, c: -1, k: gi, plazaGate: gi, segKey: 'pg' + gi };
      const b = { x, z, r: .9, h: 3.4, pal: true, off: false, c: -1, k: o.k, plaza: true };
      L.obstacles.push(o); L.blockers.push(b); pw.obs.push(o); pw.blk.push(b);
    }
    L.plazaWall = pw; L.arena = { r: W0 }; }
  // the jungle: the same stand of trees in every quarter, clear of the roads, the places and the camps
  const base = []; for (let i = 0; i < 70; i++) base.push([r(.06, Q - .06), r(K.river * R + K.riverW * R + 4, K.ridge * R - 6), r(.95, 1.4)]);
  const busy = (x, z) => L.holds.some(h => Math.hypot(h.x - x, h.z - z) < 13) || L.camps.some(k => Math.hypot(k.x - x, k.z - z) < 7) || L.roads.some(p => distToLine(p, x, z) < 4);
  for (let c = 0; c < 4; c++) for (const [da, d, sz] of base) { const [x, z] = P(mountHomeA(c) + da, d); if (!busy(x, z)) trees(x, z, sz); }
  L.jungle = { r0: K.river * R + K.riverW * R + 2, r1: K.ridge * R - 2 };
  // out on the rim: a few trees and rocks behind the lanes, clear of the homes, castles and the lane road
  const rim = []; for (let i = 0; i < 18; i++) rim.push([r(.05, Q - .05), r(K.lane * R + 6, R - 3), r(1, 1.5)]);
  for (let c = 0; c < 4; c++) for (const [da, d, sz] of rim) { const [x, z] = P(mountHomeA(c) + da, d); if (!busy(x, z) && L.homes.every(h => Math.hypot(h.x - x, h.z - z) > 20)) trees(x, z, sz); }
  for (let i = 0; i < 60; i++) { r(0, 6.28); r(R + 6, R + 40); r(1, 1.6); } // (F10b: no trees down the cliff any more; the draws are kept so the rest of the layout stays put)
}
