// CASTLE3 what a castle's turret shows you: near an enemy castle that shoots (level I and up), its range as a circle on
// the ground, fading in over CASTLE26.turret.ring m; red, with a line from the walls to you, while it is shooting you.
// Drawn on the overlay canvas (no draw calls); joined phones know whom it shoots from the snapshot (st.tg).
import { CASTLE26 } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { groundY } from '../core/world.js';

export function drawTurretRange(ctx, proj) {
  const me = G.player, L = G.layout; if (!me || me.dead || !L || !L.cwalls || !G.cgates || !G.holds) return;
  const T = CASTLE26.turret, myA = G.ALLY[colorOf(me.ti)];
  for (const cw of L.cwalls) {
    const st = G.cgates[cw.hid], h = G.holds[cw.hid]; if (!st || !(st.lv | 0) || !h || h.owner < 0 || h.owner === myA) continue;
    const d = Math.hypot(me.x - cw.x, me.z - cw.z); if (d > T.range + T.ring) continue;
    const onMe = st.tg === me.id && G.T - (st.tgT ?? -99) < 2, k = Math.min(1, (T.range + T.ring - d) / T.ring);
    ctx.save(); ctx.lineWidth = onMe ? 3 : 2; ctx.strokeStyle = onMe ? 'rgba(226,58,46,.9)' : `rgba(255,240,210,${(.55 * k).toFixed(2)})`; ctx.setLineDash(onMe ? [] : [10, 8]);
    ctx.beginPath(); let pen = false;
    for (let i = 0; i <= 64; i++) { const a = i / 64 * Math.PI * 2, x = cw.x + Math.cos(a) * T.range, z = cw.z + Math.sin(a) * T.range, [sx, sy, ok] = proj(x, groundY(x, z) + .15, z);
      if (!ok) { pen = false; continue; } if (pen) ctx.lineTo(sx, sy); else { ctx.moveTo(sx, sy); pen = true; } }
    ctx.stroke();
    if (onMe) { const [ax, ay, a1] = proj(cw.x, groundY(cw.x, cw.z) + 8, cw.z), [bx, by, b1] = proj(me.x, (me.y || groundY(me.x, me.z)) + 1.4, me.z);
      if (a1 && b1) { ctx.setLineDash([]); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); } }
    ctx.restore();
  }
}
