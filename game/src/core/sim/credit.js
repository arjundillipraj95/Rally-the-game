// Battle rules: RATE1 credit for the match rating (design, 15 Nov). Kill assists: an enemy champion who falls to your
// side, and whom you struck in the last RATING.assistT s. Cover: striking an enemy champion who is on one of your
// teammates (he struck that teammate in the last RATING.coverT s). Objective assists: within RATING.objR m when your side
// takes a castle, the Sceptre or a nexus, or breaks the Crown free, without being the one who took it.
import { RATING } from '../../config.js';
import { G, colorOf } from '../state.js';

const sideOf = ti => G.ALLY[colorOf(ti)];
// champion a struck enemy champion b (called from turret.js champHit, which every champion-on-champion blow passes through)
export function creditHit(a, b) {
  (b.hitBy || (b.hitBy = {}))[a.ti] = G.T;
  if (b.champHitT > G.T - RATING.coverT && b.champHitTi != null && b.champHitTi !== a.ti && sideOf(b.champHitTi) === sideOf(a.ti)) {
    const s = G.teams[a.ti]; if (s) s.cover = (s.cover | 0) + 1;
  }
}
// champion u fell: everyone on the killer's side who struck him lately, other than the killer, gets an assist
export function creditKill(u, killer) {
  const by = u.hitBy; u.hitBy = null;
  if (!by || !killer || sideOf(killer.ti) === sideOf(u.ti)) return;
  for (const k in by) { const ti = +k; if (ti === killer.ti || G.T - by[k] > RATING.assistT || sideOf(ti) !== sideOf(killer.ti)) continue;
    const s = G.teams[ti]; if (s) s.assists = (s.assists | 0) + 1; }
}
// side a took an objective at x, z (by: the army that took it, or -1)
export function creditObjective(a, x, z, by = -1) {
  G.teams.forEach((s, ti) => { if (!s || !s.active || ti === by || sideOf(ti) !== a) return; const L = s.leader;
    if (L && !L.dead && Math.hypot(L.x - x, L.z - z) <= RATING.objR) s.objA = (s.objA | 0) + 1; });
}
