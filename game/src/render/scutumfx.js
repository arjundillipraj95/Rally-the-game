// C3c what Shield of Cassius shows, on every phone, from the fxscutum moments: his shield held up (unit.scutumUp, the
// block pose) and the zone it covers behind him, shaded, with its front arc. Drawn on the overlay canvas.
import { bus, G } from '../core/state.js';
import { groundY } from '../core/world.js';
import { champOf } from '../champions/index.js';

const live = new Map(); // unit id -> { u, d, until }
bus.on('fxmsg', e => {
  if (!e.u) return;
  if (e.k === 'fxscutum') { const d = champOf(e.u.ti).sp2; if (!d) return; live.set(e.u.id, { u: e.u, d, until: G.T + d.up + .3 }); e.u.scutumUp = true; }
  else if (e.k === 'fxscutumoff') { live.delete(e.u.id); e.u.scutumUp = false; }
});
function shape(ctx, proj, pts) {
  ctx.beginPath(); let n = 0;
  for (const [x, z] of pts) { const [sx, sy, ok] = proj(x, groundY(x, z) + .1, z); if (!ok) return false; if (n++) ctx.lineTo(sx, sy); else ctx.moveTo(sx, sy); }
  ctx.closePath(); return true;
}
export function drawScutum(ctx, proj) {
  if (!live.size) return;
  ctx.save();
  for (const [id, L] of live) {
    const u = L.u; if (u.dead || G.T > L.until) { live.delete(id); u.scutumUp = false; continue; }
    const d = L.d, f = u.face || 0, sx = Math.sin(f), sz = Math.cos(f), len = u.mounted ? d.rideZone : d.zone, w = d.zw;
    const at = (s, b) => [u.x + sz * s + sx * b, u.z - sx * s + sz * b];
    if (shape(ctx, proj, [at(-w, .4), at(w, .4), at(w, -len), at(-w, -len)])) { ctx.fillStyle = 'rgba(150,200,255,.18)'; ctx.fill(); ctx.setLineDash([6, 6]); ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(190,225,255,.6)'; ctx.stroke(); ctx.setLineDash([]); }
    const arc = []; for (let i = 0; i <= 16; i++) { const a = f - d.arc / 2 + d.arc * i / 16; arc.push([u.x + Math.sin(a) * 1.6, u.z + Math.cos(a) * 1.6]); }
    ctx.beginPath(); let n = 0; for (const [x, z] of arc) { const [px, py, ok] = proj(x, groundY(x, z) + .1, z); if (!ok) { n = -1; break; } if (n++) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
    if (n > 0) { ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,226,150,.85)'; ctx.stroke(); }
  }
  ctx.restore();
}
