// (C1b) a champion's level over his head, Unite-style: a small dark disc with the number at the left end of his
// health bar (team-coloured rim); your own also gets a thin XP bar under his health.
import { TEAMS } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { xpToNext } from '../core/sim/levels.js';

export function drawLevel(ctx, x, y, ti, big) {
  const s = G.teams[ti]; if (!s) return;
  const lv = s.lvl || 1, r = big ? 8 : 6.5;
  ctx.fillStyle = 'rgba(10,10,14,.85)'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = ti === G.myTi ? '#ffcf3a' : TEAMS[colorOf(ti)].css; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = `800 ${big ? 10 : 9}px "Barlow Semi Condensed", sans-serif`; ctx.fillText(String(lv), x, y + (big ? 3.5 : 3));
}
export function xpShare(ti) { const s = G.teams[ti]; if (!s) return 0; const n = xpToNext(s.lvl || 1); return n === Infinity ? 1 : Math.min(1, (s.xp || 0) / n); }
