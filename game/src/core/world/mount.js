// The Crown's mountain: its heights (tiers, chasm), its radii (CROWN26) and the castle builder; the places are in map26.js.
import { CROWN, CROWN2, CROWN26 } from '../../config.js';
import { W } from './size.js';
import { angDiff } from './util.js';

// ---------- the Crown: the places worth holding, laid out afresh every match from the seed ----------
// ---------- the new Crown: the mountain ----------
// Terraces round the summit: the lanes (lowest), the jungle a step up behind the ridge, the top ring
// above the river, the arena on the summit behind its chasm. Every quarter the same, turned.
const sstep = (a, b, t) => { const k = Math.min(1, Math.max(0, (t - a) / (b - a))); return k * k * (3 - 2 * k); };
export const mountK = () => CROWN26.r; // (the mountain's radii, as fractions of W.R)
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
