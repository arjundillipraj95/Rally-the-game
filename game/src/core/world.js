// Terrain heights and map layouts. A layout is plain data (what stands where),
// generated from a seed so every phone in an online match builds the same map.
import { TEAMS, CASTLE_R } from '../config.js';
import { G } from './state.js';

export function mulberry(a) {
  return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
export const rnd = (a, b) => a + Math.random() * (b - a);
export const angDiff = (a, b) => { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
export const turn = (a, b, m) => a + clamp(angDiff(a, b), -m, m);

export function hill(x, z) { return 7 * Math.exp(-(x * x + z * z) / (2 * 20 * 20)); }
export function onBridge(x) { return Math.abs(x + 32) < 2.4 || Math.abs(x - 32) < 2.4; }
export function inRiver(x, z) { return G.map.id === 'river' && Math.abs(z) < 5 && Math.hypot(x, z) >= 7; }
export function inFord(x, z) { return inRiver(x, z) && Math.abs(x) < 14; }
export function groundY(x, z) {
  if (G.map.id === 'frost') return hill(x, z);
  if (G.map.id === 'river' && Math.abs(z) < 5.5 && Math.hypot(x, z) >= 7) return onBridge(x) ? .38 : -.45;
  return 0;
}
// Height of the rendered ground mesh (adds the riverbed and the dunes outside the arena).
export function terrainMeshY(x, z) {
  const r = Math.hypot(x, z);
  const n = Math.sin(x * .07) * Math.cos(z * .05) + Math.sin(x * .023 + z * .031) * 1.4;
  let y = 0;
  if (G.map.id === 'frost') y = hill(x, z);
  if (G.map.id === 'river') { const az = Math.abs(z); if (az < 7 && Math.hypot(x, z) >= 7.5) y = az < 5 ? -.95 : -.95 * (7 - az) / 2; }
  if (r > 92) y += (r - 92) * .25 + Math.max(0, n) * ((r - 92) * .18);
  return y;
}

export function gatePos(t, spread = 0, extra = 0) {
  const d = Math.hypot(t.pos[0], t.pos[1]), ux = -t.pos[0] / d, uz = -t.pos[1] / d;
  return [t.pos[0] + ux * (CASTLE_R + 2.5 + extra) + uz * spread, t.pos[1] + uz * (CASTLE_R + 2.5 + extra) - ux * spread];
}

export function makeLayout(mapId, withFort, seed) {
  const R = mulberry(seed | 0), r = (a, b) => a + R() * (b - a);
  const L = { mapId, withFort, hills: [], palisades: [], rocks: [], trees: [], stones: [], obstacles: [], treeColliders: [], fortSegments: [] };
  const clearOf = (x, z, pad = 0) => !TEAMS.some(t => Math.hypot(t.pos[0] - x, t.pos[1] - z) < 20 + pad) && Math.hypot(x, z) > (withFort ? 12 : 8) + pad && !(mapId === 'river' && Math.abs(z) < 9);
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + r(-.1, .1); L.hills.push({ a, d: r(150, 185), rad: r(18, 34), sy: r(.35, .6) }); }
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
  }
  if (mapId === 'river') {
    for (let i = 0; i < 22; i++) { const x = r(-14, 14), z = r(-4.5, 4.5), s = r(.25, .5); if (Math.hypot(x, z) < 7.5) continue; L.stones.push({ x, z, s }); }
  }
  if (mapId === 'forest') {
    for (let c = 0; c < 16; c++) {
      let cx, cz, tries = 0; do { cx = r(-82, 82); cz = r(-82, 82); tries++; } while (!clearOf(cx, cz, 4) && tries < 40);
      const n = 5 + Math.floor(R() * 6);
      for (let i = 0; i < n; i++) { const x = cx + r(-6, 6), z = cz + r(-6, 6), s = r(.85, 1.35); if (clearOf(x, z)) L.trees.push({ x, z, s }); }
    }
    for (let i = 0; i < 40; i++) { const a = r(0, 6.28), d = r(95, 130); L.trees.push({ x: Math.cos(a) * d, z: Math.sin(a) * d, s: r(1, 1.6) }); }
    for (const t of L.trees) if (Math.hypot(t.x, t.z) < 90) { L.obstacles.push({ x: t.x, z: t.z, r: .7 * t.s }); L.treeColliders.push({ x: t.x, z: t.z, r: 1.4 * t.s }); }
  }
  for (let i = 0; i < (mapId === 'forest' ? 10 : 20); i++) {
    const x = r(-80, 80), z = r(-80, 80), rad = r(.6, 1.7), rx = r(0, 3), ry = r(0, 3);
    if (!clearOf(x, z)) continue;
    L.rocks.push({ x, z, r: rad, rx, ry });
    if (rad > 1.1) L.obstacles.push({ x, z, r: rad * .9 });
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
  return L;
}
