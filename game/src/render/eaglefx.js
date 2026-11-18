// C3d what Eagle's fall shows, on every phone, from the fxeagle and fxeagleland moments: the gold circle where he
// will land (from the crouch, filling as the landing nears), the eagle's shadow on the ground under him and ahead,
// the dust ring of the slam with a thud and a shake nearby. Joined phones also play his clip (unit.act) from the
// moment. Drawn on the overlay canvas (no draw calls).
import { bus, G } from '../core/state.js';
import { groundY } from '../core/world.js';
import { champOf } from '../champions/index.js';
import { FEEL } from '../config.js';

const live = new Map(); // unit id -> { u, x, z, t0, d, land }
const at = q => String(q || '').split(',').map(Number);
bus.on('fxmsg', e => {
  if (!e.u) return;
  if (e.k === 'fxeagle') {
    const [x, z] = at(e.q), d = champOf(e.u.ti).ult; if (!d || !Number.isFinite(x)) return;
    live.set(e.u.id, { u: e.u, x, z, t0: G.T, d, land: null });
    if (e.fromNet) e.u.act = { name: 'eagle', t: G.T }; // (the host's rules set it there)
  } else if (e.k === 'fxeagleland') {
    const [x, z] = at(e.q), L = live.get(e.u.id) || { u: e.u, x, z, t0: G.T - 1, d: champOf(e.u.ti).ult };
    L.x = x; L.z = z; L.land = G.T; live.set(e.u.id, L);
    const me = G.player; if (me && !me.dead && Math.hypot(me.x - x, me.z - z) < 10) bus.emit('shake', FEEL.hurt.shake * 1.6);
    if (e.fromNet) bus.emit('sfx', { name: 'heavy', x, z });
  }
});
// an eagle seen from above, wings spread, beak along +z (m)
const BIRD = [[0, 1.1], [.25, .55], [1.6, .55], [2.2, .15], [1.3, .05], [.35, -.1], [.6, -.9], [0, -.6], [-.6, -.9], [-.35, -.1], [-1.3, .05], [-2.2, .15], [-1.6, .55], [-.25, .55]];
function poly(ctx, proj, pts) {
  ctx.beginPath(); let n = 0;
  for (const [x, z] of pts) { const [sx, sy, ok] = proj(x, groundY(x, z) + .12, z); if (!ok) return false; if (n++) ctx.lineTo(sx, sy); else ctx.moveTo(sx, sy); }
  ctx.closePath(); return true;
}
const ring = (cx, cz, r, n = 48) => Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; return [cx + Math.cos(a) * r, cz + Math.sin(a) * r]; });
export function drawEagle(ctx, proj) {
  if (!live.size) return;
  ctx.save();
  for (const [id, L] of live) {
    const d = L.d, u = L.u, t = G.T - L.t0, fly = d.crouch + d.air;
    if (t > fly + .9 || t < -1 || (L.land != null && G.T - L.land > .7)) { live.delete(id); if (u.act && u.act.name === 'eagle' && !u.eagle) u.act = null; continue; }
    if (t > fly + d.after && u.act && u.act.name === 'eagle' && !u.eagle) u.act = null; // (a joined phone: back on his feet)
    if (L.land == null && t < fly + .15) { // the gold circle, filling as he comes down
      const k = Math.min(1, Math.max(0, t / fly));
      if (poly(ctx, proj, ring(L.x, L.z, d.r))) { ctx.fillStyle = `rgba(255,196,60,${(.12 + .22 * k).toFixed(2)})`; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,206,80,.95)'; ctx.stroke(); }
      if (poly(ctx, proj, ring(L.x, L.z, Math.max(.2, d.r * (1 - k)), 32))) { ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,236,160,.8)'; ctx.stroke(); }
      const jy = Math.max(0, (u.y || 0) - groundY(u.x, u.z));
      if (t > d.crouch && !u.dead) { // the eagle's shadow: under him and ahead, larger the higher he is
        const s = .9 + .4 * Math.min(1, jy / d.h), f = u.face || 0, ox = u.x + Math.sin(f) * 1.2, oz = u.z + Math.cos(f) * 1.2, c = Math.cos(f), sn = Math.sin(f);
        if (poly(ctx, proj, BIRD.map(([x, z]) => [ox + (x * c + z * sn) * s, oz + (-x * sn + z * c) * s]))) { ctx.fillStyle = `rgba(10,6,2,${(.45 + .25 * Math.min(1, jy / d.h)).toFixed(2)})`; ctx.fill(); }
      }
    }
    if (L.land != null) { // the slam's dust ring
      const e = (G.T - L.land) / .7;
      if (poly(ctx, proj, ring(L.x, L.z, 1 + e * (d.r + 1.5)))) { ctx.lineWidth = 8 * (1 - e) + 1; ctx.strokeStyle = `rgba(214,190,140,${(.85 * (1 - e)).toFixed(2)})`; ctx.stroke(); }
    }
  }
  ctx.restore();
}
