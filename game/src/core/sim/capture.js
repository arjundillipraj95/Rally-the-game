// Battle rules: CASTLE4 the capture circle. A castle is taken by standing round its courtyard banner, not by filling it
// with men: the circle opens on a neutral castle once its guards are dead, on a held one once it is open (level 0 or
// a broken gate) and its banner isn't rising. One side fills it (soldiers alone, 1, 2, 3+ champions: CASTLE26.circle.fill s),
// each soldier speeding it up; anyone of another side in it pauses it; an empty circle drains.
import { CASTLE26 } from '../../config.js';
import { G } from '../state.js';
import { allianceOf } from './holds.js';
import { c2Guard, c2Take } from './crown2.js';

const C = () => CASTLE26.circle;
export const circleAt = h => ({ x: h.px ?? h.x, z: h.pz ?? h.z, r: C().r }); // (round the banner)
export function circleOpen(h) {
  if (h.kind !== 'castle' || h.shieldT > G.T) return false;
  if (h.owner < 0) return !c2Guard(h);
  const st = G.cgates && G.cgates[h.id]; return !st || !(st.lv | 0) || !!st.broken;
}
export const inCircle = (u, h) => { const c = circleAt(h); return (u.x - c.x) ** 2 + (u.z - c.z) ** 2 < c.r * c.r; };
// the open circle man u stands in, if any (the camera)
export const circleOf = u => (G.holds || []).find(h => h.kind === 'castle' && circleOpen(h) && inCircle(u, h)) || null;
export function captureTick(h, dt) {
  if (!circleOpen(h)) { h.prog = 0; h.cap = -1; h.contested = false; return; }
  const champs = new Map(), men = new Map(), per = new Map();
  for (const u of G.units) {
    if (u.dead || u.neutral || u.routing || !inCircle(u, h)) continue;
    const a = allianceOf(u.ti); if (a < 0) continue;
    (u.leader ? champs : men).set(a, ((u.leader ? champs : men).get(a) || 0) + 1); per.set(u.ti, (per.get(u.ti) || 0) + 1);
  }
  const sides = new Set([...champs.keys(), ...men.keys()]);
  h.contested = sides.size > 1;
  if (!sides.size) { if (h.prog > 0) { h.prog = Math.max(0, h.prog - dt / C().drain); if (!h.prog) h.cap = -1; } return; }
  if (sides.size > 1) return; // (anyone of another side in it: paused)
  const [a] = sides, n = champs.get(a) || 0; if (a === h.owner) return; // (its own side: nothing; soldiers alone take it, slower: Arjun 16 Nov)
  if (h.cap !== a) { h.cap = a; h.prog = 0; }
  const f = C().fill[Math.min(n, C().fill.length - 1)], boost = 1 + Math.min(C().soldierMax, (men.get(a) || 0) * C().soldier);
  h.prog += dt / f * boost;
  if (h.prog >= 1) c2Take(h, a, per);
}
