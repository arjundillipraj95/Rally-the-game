// CASTLE4 the capture circle on the ground (overlay canvas, no draw calls): an open circle near the camera shows its
// edge; while a side fills it, the bar runs round the edge in that side's colour; paused (contested), it blinks.
import { G } from '../core/state.js';
import { groundY } from '../core/world.js';
import { circleAt, circleOpen } from '../core/sim/capture.js';
import { sideCss } from './holds.js';
import { camera } from './scene.js';

export function drawCaptureCircles(ctx, proj) {
  if (!G.c2 || !G.holds) return;
  for (const h of G.holds) {
    if (h.kind !== 'castle' || !circleOpen(h)) continue;
    const c = circleAt(h); if (Math.hypot(c.x - camera.position.x, c.z - camera.position.z) > 60) continue;
    const ring = (a0, a1, n) => { ctx.beginPath(); let pen = false; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n, x = c.x + Math.sin(a) * c.r, z = c.z - Math.cos(a) * c.r, [sx, sy, ok] = proj(x, groundY(x, z) + .12, z);
      if (!ok) { pen = false; continue; } if (pen) ctx.lineTo(sx, sy); else { ctx.moveTo(sx, sy); pen = true; } } ctx.stroke(); };
    ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,240,210,.55)'; ctx.setLineDash([8, 6]); ring(0, Math.PI * 2, 48); ctx.setLineDash([]);
    if (h.cap >= 0 && h.prog > 0 && !(h.contested && (performance.now() / 250 | 0) % 2)) { ctx.lineWidth = 6; ctx.strokeStyle = sideCss(h.cap); ring(0, Math.PI * 2 * Math.min(1, h.prog), Math.max(4, Math.round(48 * h.prog))); }
    ctx.restore();
  }
}
