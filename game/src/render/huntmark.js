// FEEL6 (Arjun 26 Nov) The Hunt is predictable: while an enemy Sigrun who has her ult is on the field, every champion
// under its `below` share of health shows a red mark over his head on every phone (three claw slashes in a red ring,
// pulsing), so he can run or be shielded.
import { LEVELS } from '../config.js';
import { G, isEnemy } from '../core/state.js';
import { champOf } from '../champions/index.js';

function hunters() {
  const out = []; if (!G.teams) return out;
  for (let i = 0; i < G.teams.length; i++) { const s = G.teams[i], L = s && s.leader, c = L && champOf(i); if (L && !L.dead && c && c.id === 'sigrun' && (s.lvl || 1) >= LEVELS.unlock.ult) out.push(L); }
  return out;
}
// render/overlay.js, every frame
export function drawHuntMarks(ctx, proj) {
  const H = hunters(); if (!H.length) return;
  const below = (champOf(H[0].ti).ult || {}).below || .2, t = performance.now() / 1000;
  ctx.save();
  for (const u of G.units) {
    if (!u.leader || u.dead || !(u.hp < u.max * below) || !H.some(h => isEnemy(h, u))) continue;
    const [x, y, ok] = proj(u.x, (u.y || 0) + (u.mounted ? 3.6 : 2.9), u.z); if (!ok) continue;
    const r = 11 + 1.5 * Math.sin(t * 8);
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.beginPath(); ctx.arc(x, y, r + 1, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#ff3b30'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 2.6; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(x - 5 + k * 4.5, y - 6); ctx.lineTo(x - 1 + k * 4.5, y + 6); ctx.stroke(); }
  }
  ctx.restore();
}
