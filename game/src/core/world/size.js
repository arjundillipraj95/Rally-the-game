// How big the battlefield is and where the castles stand.
import { TEAMS, CASTLE_R, CROWN26 } from '../../config.js';
import { G, noCastle } from '../state.js';
import { mulberry, angDiff } from './util.js';
import { FIELDS, OASES } from './features.js';

// ---------- battlefield size ----------
// The featured maps are larger than the rest (castles further out), and carved into routes by ridges.
// W holds the live size for the map being played; every edge and rim distance reads it.
const BIG = new Set(['valley', 'frost', 'desert', 'forum']);
TEAMS.forEach(t => { t.pos0 = t.pos.slice(); });
export const W = { R: 91, S: 1 };
export function sizeWorld(mapId) {
  if (mapId === 'mount') { W.R = CROWN26.R; W.S = W.R / 91; } // (MAP: one size for every battle)
  else { W.S = BIG.has(mapId) ? 1.3 : 1; W.R = Math.round(91 * W.S); }
  TEAMS.forEach(t => { t.pos[0] = t.pos0[0] * W.S; t.pos[1] = t.pos0[1] * W.S; });
}

// ---------- where the castles stand (Age of Empires style) ----------
// Allies start side by side and the sides apart (opposite in 2v2; the lone castle facing the three in
// 3v1; every castle on its own in a free-for-all), on a ring round the middle. Each match the whole
// layout turns to a new angle and each castle is nudged a little, so no opening is ever the same.
// Who stands where follows the match seed and the teams, so every phone works out the same thing.
// Frost, Forum and the Colosseum are built round their four corners and keep them (for now).
const CORNERED = new Set(['frost', 'forum', 'colosseum']);
export const SIDES = { flanks: [0, Math.PI], mids: [] }; // flanks: the two places where the sides meet (between enemies), as angles
export function placeCastles(mapId, seed) {
  sizeWorld(mapId);
  const ang = TEAMS.map(t => Math.atan2(t.pos[1], t.pos[0])), al = G.ALLY && G.ALLY.length === 4 ? G.ALLY : [0, 1, 2, 3];
  const inC = [0, 1, 2, 3].filter(c => !noCastle(c)); // (a 2- or 3-castle battle: the others aren't there)
  if (CORNERED.has(mapId) && inC.length === 2 && Math.hypot(TEAMS[inC[0]].pos[0] + TEAMS[inC[1]].pos[0], TEAMS[inC[0]].pos[1] + TEAMS[inC[1]].pos[1]) > 1) {
    // two castles on a cornered map: across the middle from each other (the second takes the corner opposite the first)
    const o = [0, 1, 2, 3].find(c => Math.hypot(TEAMS[c].pos[0] + TEAMS[inC[0]].pos[0], TEAMS[c].pos[1] + TEAMS[inC[0]].pos[1]) < 1);
    TEAMS[inC[1]].pos[0] = TEAMS[o].pos[0]; TEAMS[inC[1]].pos[1] = TEAMS[o].pos[1]; ang[inC[1]] = Math.atan2(TEAMS[o].pos[1], TEAMS[o].pos[0]);
  }
  if (!CORNERED.has(mapId)) {
    const R = mulberry(((seed | 0) ^ 0x5bd1) + 3), rad0 = Math.hypot(56, 56) * W.S * (inC.length === 2 ? .8 : inC.length === 3 ? .9 : 1); // (fewer castles: closer in)
    const groups = []; for (const i of inC) { const g = groups.find(g => al[g[0]] === al[i]); if (g) g.push(i); else groups.push([i]); }
    for (let k = groups.length - 1; k > 0; k--) { const j = Math.floor(R() * (k + 1)); [groups[k], groups[j]] = [groups[j], groups[k]]; } // (which side sits where)
    const n = groups.length;
    let phi = R() * Math.PI * 2;
    if (mapId === 'river') { phi = n === 4 ? Math.PI / 4 : (R() < .5 ? 1 : -1) * Math.PI / 2; groups.sort((a, b) => b.length - a.length); } // (the river always runs between the sides: the biggest side on one bank)
    groups.forEach((g, k) => {
      const c = phi + k * Math.PI * 2 / n, sp = g.length === 2 ? 1.12 : .96; // (a pair ~64 degrees apart, three abreast ~55)
      g.forEach((i, j) => {
        const a = n === inC.length ? c + (R() - .5) * .14 : c + (j - (g.length - 1) / 2) * sp + (R() - .5) * .1, d = rad0 * (.96 + R() * .06);
        TEAMS[i].pos[0] = Math.cos(a) * d; TEAMS[i].pos[1] = Math.sin(a) * d; ang[i] = a;
      });
    });
  }
  // the gaps between neighbouring castles: the widest gaps between enemies are where the sides meet
  for (const c of [0, 1, 2, 3]) if (noCastle(c)) { TEAMS[c].pos[0] = 0; TEAMS[c].pos[1] = 4000 + 100 * c; } // (out of this battle: far off the map, and never built)
  const TAU = Math.PI * 2, s = inC.map(i => ({ a: ((ang[i] % TAU) + TAU) % TAU, i })).sort((x, y) => x.a - y.a);
  const mids = s.length < 2 ? [0, 1, 2, 3].map(k => ({ a: k * Math.PI / 2 + (seed % 7) * .4 + Math.PI / 4, gap: Math.PI / 2, foes: 1 })) // (no castles, the Crown: four fields round the middle)
    : s.map((p, k) => { const q = s[(k + 1) % s.length]; let gap = q.a - p.a; if (gap <= 0) gap += TAU; return { a: p.a + gap / 2, gap, foes: al[p.i] !== al[q.i] ? 1 : 0 }; });
  mids.sort((x, y) => (y.foes - x.foes) || (y.gap - x.gap));
  const f0 = mids[0], f1 = mids.slice(1).sort((x, y) => Math.abs(angDiff(y.a, f0.a)) - Math.abs(angDiff(x.a, f0.a)))[0];
  SIDES.flanks = [f0.a, f1.a]; SIDES.mids = mids.map(m => m.a);
  // the Valley's wheat fields and the Desert's oases lie where the sides meet
  const P2 = (a, d) => [Math.cos(a) * d, Math.sin(a) * d];
  FIELDS.length = 0; for (const a of SIDES.mids) { const [x, z] = P2(a, 77.5); FIELDS.push({ x, z, a, hw: 12, hd: 6.5 }); }
  OASES.length = 0; for (const a of SIDES.flanks) { const [x, z] = P2(a, 77.5); OASES.push({ x, z, r: 7 }); }
}

export function gatePos(t, spread = 0, extra = 0) {
  const d = Math.hypot(t.pos[0], t.pos[1]), ux = -t.pos[0] / d, uz = -t.pos[1] / d;
  return [t.pos[0] + ux * (CASTLE_R + 2.5 + extra) + uz * spread, t.pos[1] + uz * (CASTLE_R + 2.5 + extra) - ux * spread];
}
