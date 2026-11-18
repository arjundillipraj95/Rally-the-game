// C3b what Ram of Cassius shows, on every phone, from the fxram moments: his path on the ground through the wind-up
// and the rush (the area shown first), a "Wall slam!" or "Braced!" word where it ends hard, and his clip on joined
// phones (unit.act). Drawn on the overlay canvas (no draw calls).
import { bus, G } from '../core/state.js';
import { groundY } from '../core/world.js';
import { champOf } from '../champions/index.js';
import { floatText } from './effects.js';

const live = new Map(); // unit id -> { u, x, z, a, len, t0, d, end }
bus.on('fxmsg', e => {
  if (!e.u) return;
  if (e.k === 'fxram') {
    const [x, z, a, len] = String(e.q || '').split(',').map(Number), d = champOf(e.u.ti).sp1; if (!d || !Number.isFinite(a)) return;
    live.set(e.u.id, { u: e.u, x, z, a, len, t0: G.T, d, end: null });
    if (e.fromNet && !e.u.mounted) e.u.act = { name: 'ram', t: G.T };
  } else if (e.k === 'fxramend') { const L = live.get(e.u.id); if (L) L.end = G.T; if (e.fromNet && e.u.act && e.u.act.name === 'ram') e.u.act = null; }
  else if (e.k === 'fxramwall') floatText(e.u.x, (e.u.y || 0) + 2.6, e.u.z, 'Wall slam!', '#ffcf3a');
  else if (e.k === 'fxrambrace') floatText(e.u.x, (e.u.y || 0) + 2.6, e.u.z, 'Braced!', '#fff3b0');
});
export function drawRam(ctx, proj) {
  if (!live.size) return;
  ctx.save();
  for (const [id, L] of live) {
    const t = G.T - L.t0, d = L.d, out = L.end != null ? G.T - L.end : t - d.wind - d.dur * L.len / d.dist;
    if (out > .25 || t < -1) { live.delete(id); continue; }
    const k = out > 0 ? 1 - out / .25 : 1, sx = Math.sin(L.a), sz = Math.cos(L.a), w = d.w + .3;
    const pts = [[-w, 0], [w, 0], [w, L.len], [-w, L.len]].map(([s, f]) => [L.x + sz * s + sx * f, L.z - sx * s + sz * f]);
    ctx.beginPath(); let ok = true;
    pts.forEach(([x, z], i) => { const [px, py, on] = proj(x, groundY(x, z) + .12, z); if (!on) ok = false; if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); });
    if (!ok) continue;
    ctx.closePath(); ctx.fillStyle = `rgba(255,214,120,${(.22 * k).toFixed(2)})`; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = `rgba(255,226,150,${(.85 * k).toFixed(2)})`; ctx.stroke();
  }
  ctx.restore();
}
