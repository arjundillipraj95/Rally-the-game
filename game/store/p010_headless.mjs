// P0.10 proof: one Crown battle on the mountain, run in plain Node with no renderer, no DOM, no
// browser. Imports only the game's core (sim, state, world, nav, config), steps it for 10 game
// minutes at a fixed 30 Hz and prints the CPU time per simulated second, plus the real snapshot size
// (the host's own encodeSnap, lifted from net/netgame.js as text so nothing in the game changes).
// Run from game/:  node store/p010_headless.mjs            (Trio: 12 captains, all computer)
//                  DUO=0 node store/p010_headless.mjs      (4 captains)   MIN=10 HZ=30 SEED=7
import { readFileSync } from 'node:fs';
import { G, activeFrom } from '../src/core/state.js';
import { startMatch, update } from '../src/core/sim.js';
import { MAPS, UPGRADES, KINDS } from '../src/config.js';
import { clamp } from '../src/core/world.js';

const duo = +(process.env.DUO ?? 2), MIN = +(process.env.MIN || 10), HZ = +(process.env.HZ || 30), dt = 1 / HZ;
G.role = 'solo'; G.mode = 'crown'; G.map = MAPS.mount; G.time = 10; G.diff = 1; G.myTi = 0; G.ALLY = [0, 1, 2, 3];
G.seed = +(process.env.SEED || 7); G.looks = []; G.crests = [];
startMatch(Array(12).fill(0), activeFrom([duo, duo, duo, duo])); // (every captain a computer one: the worst case for CPU, since the AI thinks for all)

// the host's snapshot encoder, taken verbatim from net/netgame.js
const src = readFileSync(new URL('../src/net/netgame.js', import.meta.url), 'utf8');
const body = src.slice(src.indexOf('function encodeSnap()'), src.indexOf('\n}\n', src.indexOf('function encodeSnap()')) + 2);
const r1 = v => Math.round(v * 10) / 10, r2 = v => Math.round(v * 100) / 100, b36 = n => Math.max(0, Math.round(n)).toString(36);
const encX = x => b36((x + 100) * 10), encF = f => b36(((f % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2) * 72 % 72);
const encodeSnap = new Function('G', 'UPGRADES', 'KINDS', 'clamp', 'b36', 'encX', 'encF', 'r1', 'r2', body + '\nreturn encodeSnap;')(G, UPGRADES, KINDS, clamp, b36, encX, encF, r1, r2);
const seats = Object.fromEntries(Array.from({ length: 4 * (duo + 1) }, (_, i) => ['peer-' + Math.random().toString(36).slice(2, 12), i]));
const packet = () => JSON.stringify({ role: 'host', ph: 'play', seed: G.seed, mode: G.mode, map: G.map.id, diff: G.diff, time: G.time, tgt: G.target, al: G.ALLY.join(''), duo: '2222', seats, nick: 'Host', lk: Array(12).fill('a1b2c3').join(','), cr: '000000000000', n: 1, s: encodeSnap(), m: Array.from({ length: 8 }, (_, i) => [i, 'fxhit', 123, 0, 456, 1, '']), ht: 1 }).length;

const steps = Math.round(MIN * 60 * HZ), sizes = [], perMin = [];
let units = 0, peakUnits = 0, done = 0;
const c0 = process.cpuUsage(), w0 = performance.now();
let cm = process.cpuUsage();
for (let i = 0; i < steps && G.state === 'play'; i++) {
  update(dt, null); done++;
  if (i % HZ === 0) { sizes.push(packet()); const n = G.units.filter(u => !u.dead).length; units += n; peakUnits = Math.max(peakUnits, n); }
  if ((i + 1) % (60 * HZ) === 0) { const c = process.cpuUsage(cm); perMin.push(((c.user + c.system) / 1000 / 60).toFixed(1)); cm = process.cpuUsage(); }
}
const c = process.cpuUsage(c0), wall = performance.now() - w0, simS = done * dt, cpuMs = (c.user + c.system) / 1000;
sizes.sort((a, b) => a - b);
const q = p => sizes[Math.min(sizes.length - 1, Math.floor(p * sizes.length))];
console.log(JSON.stringify({
  captains: 4 * (duo + 1), hz: HZ, simulatedS: Math.round(simS), endedBy: G.state === 'end' ? (G.endInfo && G.endInfo.why) : 'time limit of the run',
  cpuMs: Math.round(cpuMs), wallMs: Math.round(wall), cpuMsPerSimS: +(cpuMs / simS).toFixed(1), cpuMsPerTick: +(cpuMs / done).toFixed(2), cpuMsPerSimSByMinute: perMin.join(' '),
  unitsAvg: Math.round(units / sizes.length), unitsPeak: peakUnits, snapBytes: { p50: q(.5), p90: q(.9), max: sizes[sizes.length - 1] }, heapMB: Math.round(process.memoryUsage().heapUsed / 1e6),
}));
