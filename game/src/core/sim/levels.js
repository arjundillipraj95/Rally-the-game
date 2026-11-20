// Battle rules: C1b a champion's level, 1-10, from XP earned in the match (LEVELS, XPGAIN). His army's kills and his
// own count for him; camps, castles and the Sceptre pay the side's champions; a trickle while he stands near a fight
// for a castle or in the arena. Each level grows his health and blow (champions/stats.js); levels 3, 5 and 7 open his
// special attacks and ults (core/sim/abilities.js reads lvl). Kept through death.
import { LEVELS, XPGAIN } from '../../config.js';
import { G } from '../state.js';
import { applyChamp, levelOf } from '../../champions/stats.js';
import { say } from './util.js';

// (FIX10) a champion behind the average level earns more
function catchUp(s) {
  let n = 0, sum = 0; for (const t of G.teams) if (t && t.active) { n++; sum += t.lvl || 1; }
  const behind = n ? sum / n - (s.lvl || 1) : 0;
  return behind > 0 ? Math.min(XPGAIN.catchMax, 1 + XPGAIN.catchUp * behind) : 1;
}
export const xpToNext = lv => (lv >= LEVELS.max ? Infinity : LEVELS.next[lv - 1]);
export function gainXp(ti, n, src = 'other') {
  const s = G.teams && G.teams[ti]; if (!s || !s.active || !(n > 0) || G.role === 'client') return;
  s.lvl = s.lvl || 1; n *= catchUp(s);
  s.xp = (s.xp || 0) + n; s.xpAll = (s.xpAll || 0) + n; const by = s.xpBy || (s.xpBy = {}); by[src] = (by[src] || 0) + n; // (where it came from: results and tests)
  let up = false;
  while (s.lvl < LEVELS.max && s.xp >= xpToNext(s.lvl)) { s.xp -= xpToNext(s.lvl); s.lvl++; up = true; (s.lvlAt || (s.lvlAt = []))[s.lvl] = Math.round(G.T); }
  if (s.lvl >= LEVELS.max) s.xp = 0;
  if (!up) return;
  const L = s.leader; if (L && !L.dead) applyChamp(L); // (his health keeps its share)
  say('levelUp', ti, s.lvl); // (every phone: the moment for his own player, ui/level.js)
}
// a unit cut down by army ti (his men or himself): a soldier, or a champion (more for one above you)
export function xpForKill(ti, u) {
  if (u.leader) gainXp(ti, XPGAIN.champ + XPGAIN.champAbove * Math.max(0, levelOf(u.ti) - levelOf(ti)), 'champ');
  else gainXp(ti, u.boss ? XPGAIN.buffCamp : XPGAIN.soldier, u.boss ? 'buffCamp' : 'soldier');
}
export const xpForCamp = ti => gainXp(ti, XPGAIN.camp, 'camp');
// a castle taken by side a: its 100 shared by the side's champions near it (at least the taker)
export function xpForCastle(h, a, by, sideArmies) {
  const near = sideArmies(a).filter(i => { const L = G.teams[i].leader; return L && !L.dead && Math.hypot(L.x - h.x, L.z - h.z) < XPGAIN.shareR; });
  if (!near.includes(by)) near.push(by);
  for (const i of near) gainXp(i, XPGAIN.castle / near.length, 'castle');
}
export const xpForSceptre = (a, sideArmies) => { for (const i of sideArmies(a)) gainXp(i, XPGAIN.sceptre, 'sceptre'); };
// the trickle: each second, a champion near a castle under attack (underAttack) or in the arena; and (FIX10) the idle XP
export function xpTick(dt, underAttack) {
  if (!G.c2 || G.role === 'client') return;
  const arena = G.layout && G.layout.arena;
  G.teams.forEach((s, i) => {
    const L = s.leader; if (!s.active || !L || L.dead) return;
    const near = (arena && Math.hypot(L.x - (arena.x || 0), L.z - (arena.z || 0)) < (arena.r || 0) + XPGAIN.nearR)
      || (G.holds || []).some(h => h.kind === 'castle' && Math.hypot(L.x - h.x, L.z - h.z) < XPGAIN.nearR && underAttack(h));
    if (near) gainXp(i, XPGAIN.trickle * dt, 'trickle');
    gainXp(i, XPGAIN.idle * dt, 'idle'); // (FIX10: a little all the time)
  });
}
