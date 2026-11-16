// MAP1: the mountain's layout (the relaunch's; the only one since MAP6), checked in Node from the layout data and the walking grid.
//   counts: 4 bases, 4 nexus, 12 castles (3 per side: left, middle, right), no keeps or villages, 24 camps
//   (per jungle half a buff camp and 2 gold camps; buffs: war drum left, swift right), rivers bridged
//   sealed: each base is reached only through its middle castle (flood fill of the walking grid with that castle's
//   back gate shut: the base can't be reached; open: it can, and every castle, camp and the arena with it)
//   walk times on foot (human captain's speed, quicker on roads): outer castle to the neighbour's 8-10 s,
//   base to the Crown 25-30 s
// Usage: node store/r_MAP1.mjs   (SEED=n to try another seed)
import { G } from '../src/core/state.js';
import { makeLayout, groundSlow, W, mountHomeA } from '../src/core/world.js';
import { buildNav, setPalSeg, walkable, findPath } from '../src/core/nav.js';
import { HUMAN_CAPTAIN, CROWN26 } from '../src/config.js';

let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
G.mode = 'crown'; G.map = { id: 'mount' };
const L = makeLayout('mount', false, false, +(process.env.SEED || 7)); G.layout = L;
buildNav(L);

// ---- counts ----
const castles = L.holds.filter(h => h.kind === 'castle');
ok(L.map26 && W.R === CROWN26.R, `new mountain, one size (R ${W.R})`);
ok(L.peaks.length === 4 && L.homes.every(h => Math.hypot(h.x, h.z) > W.R + 20), 'each base out on its peak, past the rim');
ok(!L.obstacles.some(o => o.country != null), 'no country walls (the cliffs keep the peak)');
ok(L.homes.length === 4 && L.nexus.length === 4, `4 bases, 4 nexus (${L.homes.length}, ${L.nexus.length})`);
ok(castles.length === 12 && L.holds.length === 12, `12 castles, nothing else held (${castles.length} of ${L.holds.length})`);
ok(!L.holds.some(h => h.keep || h.kind === 'village'), 'no keeps or villages');
ok([0, 1, 2, 3].every(c => ['left', 'middle', 'right'].every(s => castles.filter(h => h.side === c && h.slot === s).length === 1)), 'each side: a left, a middle and a right castle');
ok(L.cwalls.length === 12, `12 castle walls (${L.cwalls.length})`);
ok(L.camps.length === 24, `24 camps (${L.camps.length})`);
const halves = {}; for (const k of L.camps) { const key = k.side + k.half; (halves[key] = halves[key] || []).push(k); }
ok(Object.values(halves).length === 8 && Object.values(halves).every(v => v.filter(k => k.kind === 'buff').length === 1 && v.filter(k => k.kind === 'gold').length === 2), 'each jungle half: 1 buff camp, 2 gold camps');
ok(L.camps.filter(k => k.buff === 'drum').every(k => k.half === 'left') && L.camps.filter(k => k.buff === 'swift').every(k => k.half === 'right') && L.camps.filter(k => k.buff).length === 8, 'buffs: war drum left, swift right');
ok(L.river.lines.length === 4 && L.river.bridges.length === 16, `river ring + 4 border rivers, 16 bridges (${L.river.bridges.length})`);

// ---- the walking grid: flood fill ----
const CS = 1.5, HALF = Math.ceil((L.ext || W.R) + 6), N = Math.ceil(HALF * 2 / CS), cx = i => -HALF + (i + .5) * CS, ci = x => Math.max(0, Math.min(N - 1, Math.floor((x + HALF) / CS)));
function flood(x, z) {
  const seen = new Uint8Array(N * N), q = []; let s = ci(z) * N + ci(x);
  if (!walkable(x, z)) return seen; seen[s] = 1; q.push(s);
  while (q.length) { const c = q.pop(), i = c % N, j = (c / N) | 0;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const ni = i + di, nj = j + dj; if (ni < 0 || nj < 0 || ni >= N || nj >= N) continue; const k = nj * N + ni; if (seen[k] || !walkable(cx(ni), cx(nj))) continue; seen[k] = 1; q.push(k); } }
  return seen;
}
const at = (seen, x, z) => !!seen[ci(z) * N + ci(x)];
const near = (seen, x, z, r = 3) => { for (let dz = -r; dz <= r; dz += 1.5) for (let dx = -r; dx <= r; dx += 1.5) if (at(seen, x + dx, z + dz)) return true; return false; };
const fieldPt = c => { const b = mountHomeA(c) + Math.PI / 4, d = (CROWN26.r.lane + CROWN26.r.ridge) / 2 * W.R; return [Math.cos(b) * d, Math.sin(b) * d]; };
for (let c = 0; c < 4; c++) {
  const mid = castles.find(h => h.side === c && h.mid), cw = L.cwalls.find(w => w.hid === L.holds.indexOf(mid)), home = L.homes[c];
  const back = 'cg' + cw.hid + ':' + (cw.gates.length - 1);
  setPalSeg(back, true); let seen = flood(...fieldPt(c));
  ok(!near(seen, home.x, home.z), `side ${c}: back gate shut, the base can't be reached from the border field`);
  setPalSeg(back, false); seen = flood(...fieldPt(c));
  ok(near(seen, home.x, home.z), `side ${c}: back gate open, the base is reached`);
  // with every castle gate shut, nothing outside reaches the base at all (no way round a castle)
  const keys = L.cwalls.flatMap(w => w.gates.map((_, gi) => 'cg' + w.hid + ':' + gi));
  keys.forEach(k => setPalSeg(k, true)); seen = flood(home.x, home.z);
  ok(!near(seen, ...fieldPt(c)) && !near(seen, 0, CROWN26.r.lane * W.R * .5), `side ${c}: every castle gate shut, the base is cut off`);
  keys.forEach(k => setPalSeg(k, false));
}
{ const seen = flood(L.homes[0].x, L.homes[0].z);
  ok(castles.every(h => near(seen, h.x + (h.x / Math.hypot(h.x, h.z)) * -12, h.z + (h.z / Math.hypot(h.x, h.z)) * -12)), 'from a base: every castle reached');
  ok(L.camps.every(k => near(seen, k.x, k.z, 5)), 'from a base: every camp reached');
  ok(near(seen, 0, 6) && L.homes.every(h => near(seen, h.x, h.z)), 'from a base: the arena and every other base reached'); }

// ---- walk times ----
const V = HUMAN_CAPTAIN.spd;
function walk(x0, z0, x1, z1) {
  const p = findPath(x0, z0, x1, z1, 400000); if (!p) return null;
  let t = 0, len = 0; for (let i = 0; i < p.length - 1; i++) { const [ax, az] = p[i], [bx, bz] = p[i + 1], d = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.ceil(d / .5));
    for (let k = 0; k < n; k++) { const q = (k + .5) / n; t += d / n / (V * groundSlow(ax + (bx - ax) * q, az + (bz - az) * q)); } len += d; }
  return { t, len };
}
const gateOut = (h, ga, d) => [h.x + Math.cos(ga) * d, h.z + Math.sin(ga) * d];
for (let c = 0; c < 4; c++) {
  const right = castles.find(h => h.side === c && h.slot === 'right'), left = castles.find(h => h.side === (c + 1) % 4 && h.slot === 'left');
  const ra = Math.atan2(right.z, right.x) + Math.PI / 2, la = Math.atan2(left.z, left.x) - Math.PI / 2, d = CROWN26.castleR + 2;
  const w = walk(...gateOut(right, ra, d), ...gateOut(left, la, d));
  ok(w && w.t >= 8 && w.t <= 10, `side ${c}: outer castle to the neighbour's ${w ? w.t.toFixed(1) + ' s (' + w.len.toFixed(0) + ' m)' : 'no path'} (8-10 s)`);
  const h = L.homes[c], b = walk(h.x, h.z, Math.cos(h.a) * 3, Math.sin(h.a) * 3);
  ok(b && b.t >= 25 && b.t <= 30, `side ${c}: base to the Crown ${b ? b.t.toFixed(1) + ' s (' + b.len.toFixed(0) + ' m)' : 'no path'} (25-30 s)`);
}
console.log(fails ? `${fails} FAILED` : 'ALL PASS');
process.exit(fails ? 1 : 0);
