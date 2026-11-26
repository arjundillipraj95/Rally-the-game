// C3c/C3g what Shield of Cassius shows, on every phone, from the fxscutum moments: his shield held up (unit.scutumUp,
// the block pose), a curved golden barrier over his front arc, the zone it covers behind him softly lit on the
// ground, a flash and sparks on the barrier for every blow it stops, and the barrier shattering when it drops.
import { bus, G } from '../core/state.js';
import { champOf } from '../champions/index.js';
import { body } from '../core/body.js';
import { spark } from './effects.js';
import { zoneTex, decal, place, drop, barrier, dropBarrier, FC, setFc } from './fxkit.js';

const live = new Map(); // unit id -> { u, d, until, wall, zone, flash }
// (FX3) on horseback the barrier must cover horse and rider: wider and taller, and its sparks at the rider's height
const RIDE = { r: 1.4, h: 1.35, y: 2.4 };
const hitY = u => (u.y || 0) + (u.mounted ? RIDE.y : 1.2 * body.champ), hitR = u => 1.35 * body.champ * (u.mounted ? RIDE.r : 1);
function off(id, shatter) {
  const L = live.get(id); if (!L) return;
  const u = L.u; u.scutumUp = false;
  if (shatter) for (let i = 0; i < 5; i++) { const a = (u.face || 0) + (i - 2) * .45; spark(u.x + Math.sin(a) * hitR(u), hitY(u), u.z + Math.cos(a) * hitR(u), '#ffe7a3', 4); }
  dropBarrier(L.wall); drop(L.zone); live.delete(id);
}
bus.on('fxmsg', e => { if (e && e.u) setFc(e.u); // (BAL1)
  if (!e.u) return;
  if (e.k === 'fxscutum') {
    const d = champOf(e.u.ti).sp2; if (!d) return; off(e.u.id, false);
    const len = e.u.mounted ? d.rideZone : d.zone;
    const L = { u: e.u, d, until: G.T + d.up + .3, wall: barrier(1.35 * body.champ, 2.3 * body.champ, d.arc), zone: decal(zoneTex, d.zw * 2, len, { from: 0 }), flash: 0 };
    live.set(e.u.id, L); e.u.scutumUp = true;
  } else if (e.k === 'fxscutumoff') off(e.u.id, e.q === 'ult');
  else if (e.k === 'fxblk' && live.size) { // a blow stopped: the barrier of whoever covers that man flashes
    for (const L of live.values()) {
      const u = L.u, dx = e.u.x - u.x, dz = e.u.z - u.z; if (Math.hypot(dx, dz) > (L.d.zone + 1.5)) continue;
      L.flash = 1; const a = e.a ? Math.atan2(e.a.x - u.x, e.a.z - u.z) : u.face || 0;
      spark(u.x + Math.sin(a) * hitR(u), hitY(u), u.z + Math.cos(a) * hitR(u), '#fff1c2', 8);
    }
  }
});
// every frame (render/overlay.js): the barrier and the zone follow him; the barrier breathes and flashes
export function drawScutum(ctx, proj, dt = 1 / 30) {
  if (!live.size) return;
  for (const [id, L] of live) {
    const u = L.u; if (u.dead || G.T > L.until) { off(id, false); continue; }
    const f = u.face || 0, y = u.y || 0;
    L.wall.position.set(u.x, y, u.z); L.wall.rotation.y = f; L.wall.scale.set(u.mounted ? RIDE.r : 1, u.mounted ? RIDE.h : 1, u.mounted ? RIDE.r : 1);
    L.flash = Math.max(0, L.flash - dt * 4);
    L.wall.material.opacity = .2 + .06 * Math.sin(G.T * 6) + .5 * L.flash;
    place(L.zone, u.x, u.z, f + Math.PI, .08); // (the zone runs back from him)
    L.zone.material.opacity = .85;
  }
}
