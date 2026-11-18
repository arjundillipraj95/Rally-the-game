// BS2 pings: a quick shout from 4 on (SHOUTS) marks a place: tap the minimap for "Attack here!" there, or pick one from
// the quick-chat wheel (Attack: ahead of you; Defend here, Help, On my way: where you stand). Your side sees it for
// PINGS.life s: a pulsing ring on the minimap, a ring and its words on the ground; the feed and a bubble say who.
import { G, bus, colorOf, isEnemyTi } from '../core/state.js';
import { PINGS, SHOUTS, TEAMS } from '../config.js';
import { W, groundY } from '../core/world.js';
import { cam } from '../render/camera.js';
import { floatText, shockwave } from '../render/effects.js';

export const pings = []; // { x, z, k, ti, t }
const COL = { 4: '#ff6a4a', 5: '#6fb7ff', 6: '#ffd36e', 7: '#8be38b' };
bus.on('shownMsg', ({ k, a }) => {
  if (k !== 'callout' || !a || !Number.isFinite(a[2]) || a[1] < PINGS.from) return;
  if (isEnemyTi(a[0], G.myTi)) return; // (your side's only)
  pings.push({ x: a[2], z: a[3], k: a[1], ti: a[0], t: performance.now() }); if (pings.length > 8) pings.shift();
  floatText(a[2], groundY(a[2], a[3]) + 2.5, a[3], SHOUTS[a[1]], COL[a[1]] || '#fff'); shockwave(a[2], a[3], 3, parseInt((COL[a[1]] || '#ffffff').slice(1), 16));
});
// drawn in the minimap's turned frame (render/overlay.js drawMini): k = metres to pixels
export function drawPingsMini(ctx, k) {
  const now = performance.now();
  for (let i = pings.length - 1; i >= 0; i--) {
    const P = pings[i], age = (now - P.t) / 1000; if (age > PINGS.life) { pings.splice(i, 1); continue; }
    const f = (age * 1.4) % 1, c = COL[P.k] || TEAMS[colorOf(P.ti)].css;
    ctx.beginPath(); ctx.arc(P.x * k, P.z * k, 5 + f * 14, 0, Math.PI * 2); ctx.strokeStyle = c; ctx.globalAlpha = 1 - f; ctx.lineWidth = 3; ctx.stroke(); ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(P.x * k, P.z * k, 4, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill();
  }
}
// a tap on the minimap: the world point under it (the same turn and scale drawMini uses)
export function miniToWorld(e) {
  const m = document.getElementById('mini'), r = m.getBoundingClientRect(), S = m.width, k = S / (W.R * 2 + 8), o = S / 2;
  const px = (e.clientX - r.left) / r.width * S - o, py = (e.clientY - r.top) / r.height * S - o, a = -(cam.yaw + Math.PI);
  const x = (px * Math.cos(a) - py * Math.sin(a)) / k, z = (px * Math.sin(a) + py * Math.cos(a)) / k;
  return Number.isFinite(x) ? { x, z } : null;
}
