// Battle rules: CASTLE8 each side's nexus (the Banner Falls). A breakable stone (G.c2.breaks, kind 'nexus') before its
// base: it can be hit only once its side's middle castle is no longer theirs, never by its own side, and never while
// its side holds the Crown. The side that breaks it scores CASTLE26.nexus.pts; its owners' morale drops and stays low
// for a while. It stays broken all match; nobody is out.
import { CASTLE26 } from '../../config.js';
import { creditObjective } from './credit.js'; // (RATE1)
import { G, activeArmies, colorOf } from '../state.js';
import { say, fx } from './util.js';
import { hl } from './match.js';
import { allianceOf } from './holds.js';
import { shardsOnNexus } from './holding.js';

const N = () => CASTLE26.nexus;
export const nexusBreaks = L => (L.nexus || []).map(n => ({ brk: true, kind: 'nexus', c: n.c, x: n.x, z: n.z, r: n.r, hp: N().hp, max: N().hp }));
// the side holding the Crown (G.c2.crownPts has one key), or -1
export const crownSide = () => { const K = G.c2; if (!K || !K.crownPts) return -1; const k = Object.keys(K.crownPts).find(a => K.crownPts[a]); return k == null ? -1 : +k; };
// can man u's side hit nexus b now?
export function nexusOpen(b, u) {
  const own = G.ALLY[b.c], a = allianceOf(u.ti); if (b.hp <= 0 || a < 0 || a === own || crownSide() === own) return false;
  const mid = (G.holds || []).find(h => h.kind === 'castle' && h.mid && h.side === b.c); return !mid || mid.owner !== own;
}
export function nexusBroken(b, a, ti) {
  const K = G.c2, own = G.ALLY[b.c]; K.nexusPts = K.nexusPts || {}; K.nexusPts[a] = (K.nexusPts[a] || 0) + N().pts;
  for (const i of activeArmies()) if (G.ALLY[colorOf(i)] === own && G.teams[i]) { const s = G.teams[i]; s.morale = Math.max(0, s.morale - N().morale); s.lowT = G.T + N().lowT; }
  if (ti != null && ti >= 0) hl(ti, 'nexus');
  creditObjective(a, b.x, b.z, ti ?? -1); // (RATE1)
  const sh = shardsOnNexus(own, a); // (CASTLE6)
  say('nexusBroken', b.c, a, ti ?? -1, N().pts, sh); fx('netFlush');
}
// (moraleTick) an army whose nexus fell lately can't climb over N().low; the Crown's side never drops under N().crownFloor
export function moraleBounds(s, ti) {
  if (s.lowT > G.T) s.morale = Math.min(s.morale, N().low);
  if (G.c2 && crownSide() === G.ALLY[colorOf(ti)]) s.morale = Math.max(s.morale, N().crownFloor);
}
