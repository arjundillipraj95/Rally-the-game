// C3e what Testudo march shows, on every phone, from the fxtestudo moments: its men's shields up (unit.scutumUp, the
// block pose), the march's line and end on the ground, and a war drum beat while it marches. Overlay canvas.
import { bus, G } from '../core/state.js';
import { groundY } from '../core/world.js';
import { champOf } from '../champions/index.js';
import { musicCue } from '../ui/audio.js';

const live = new Map(); // champion id -> { men, a, t0, dur, x, z, d, beat }
bus.on('fxmsg', e => {
  if (!e.u) return;
  if (e.k === 'fxtestudo') {
    const [a, dur, ...ids] = String(e.q || '').split(',').map(Number), d = champOf(e.u.ti).armyUlt; if (!d || !Number.isFinite(a)) return;
    const men = ids.map(id => G.units.find(o => o.id === id)).filter(Boolean); for (const o of men) o.scutumUp = true;
    const cx = men.reduce((s, o) => s + o.x, 0) / (men.length || 1), cz = men.reduce((s, o) => s + o.z, 0) / (men.length || 1);
    live.set(e.u.id, { men, a, t0: G.T, dur, x: cx, z: cz, d, beat: 0 });
  } else if (e.k === 'fxtestudoend') { const L = live.get(e.u.id); if (L) { for (const o of L.men) o.scutumUp = false; live.delete(e.u.id); } }
});
export function drawTestudo(ctx, proj) {
  if (!live.size) return;
  ctx.save();
  for (const [id, L] of live) {
    const t = G.T - L.t0; if (t > L.dur + 1) { for (const o of L.men) o.scutumUp = false; live.delete(id); continue; }
    if (t > L.d.form && t - L.d.form >= L.beat * .5) { L.beat++; musicCue('drum'); } // (a beat every half second)
    const sx = Math.sin(L.a), sz = Math.cos(L.a), ex = L.x + sx * L.d.dist, ez = L.z + sz * L.d.dist;
    const [ax, ay, a1] = proj(L.x, groundY(L.x, L.z) + .1, L.z), [bx, by, b1] = proj(ex, groundY(ex, ez) + .1, ez);
    if (a1 && b1) { ctx.setLineDash([10, 8]); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,226,150,.7)'; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,214,120,.85)'; ctx.beginPath(); ctx.arc(bx, by, 6, 0, Math.PI * 2); ctx.fill(); }
  }
  ctx.restore();
}
