// Your standing across battles, kept on this device: total XP, rank, and the crest you wear.
import { RANKS, CRESTS, XP } from '../config.js';

const read = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, String(v)); } catch (e) {} };

export const progress = {
  xp: Math.max(0, +read('rally-xp', '0') || 0),
  crest: Math.max(0, +read('rally-crest', '0') || 0),
};
export function rankOf(xp) { let r = 0; RANKS.forEach((k, i) => { if (xp >= k.xp) r = i; }); return r; }
export const crestUnlocked = i => i <= rankOf(progress.xp);
export function setCrest(i) { if (!crestUnlocked(i) || !CRESTS[i]) return false; progress.crest = i; write('rally-crest', i); return true; }
// How far into the current rank: {rank, into, span} (span 0 at the top rank).
export function rankProgress(xp = progress.xp) {
  const r = rankOf(xp), next = RANKS[r + 1];
  return { rank: r, into: xp - RANKS[r].xp, span: next ? next.xp - RANKS[r].xp : 0 };
}
// Called once when a battle ends. Returns what to show on the results screen.
export function awardMatch({ result, kills, diff }) {
  const before = progress.xp, rb = rankOf(before);
  const raw = XP.base + Math.min(kills, XP.maxKills) * XP.perKill + (result === 'win' ? XP.win : result === 'draw' ? XP.draw : 0);
  const gained = Math.round(raw * (XP.diffMult[diff] ?? 1));
  progress.xp = before + gained; write('rally-xp', progress.xp);
  const ra = rankOf(progress.xp);
  // ranking up puts the newest crest on straight away, so the reward is visible next battle
  if (ra > rb) setCrest(ra);
  return { gained, before, after: progress.xp, rankUp: ra > rb, rank: ra, unlocked: ra > rb ? CRESTS.slice(rb + 1, ra + 1).map(c => c.name) : [] };
}
