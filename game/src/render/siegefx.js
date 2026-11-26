// CASTLE11 (Arjun 26 Nov) a broken gate silences its castle's ballista and the archers on the towers beside it, on
// every phone: the moment it breaks a crack, splinters and "BALLISTA DOWN!" near you; while it stays broken a red cross
// over the keep with smoke rising from it, and a cross over each silent tower. Repair (or a capture) clears them.
import { CASTLE26 } from '../config.js';
import { G, bus } from '../core/state.js';
import { groundY } from '../core/world.js';
import { gateBroken, towerSilent } from '../core/sim.js';
import { pow, puff } from './effects.js';

const live = (cw) => { const st = G.cgates && G.cgates[cw.hid], h = G.holds && G.holds[cw.hid]; return st && (st.lv | 0) >= 1 && h && h.owner >= 0 ? [st, h] : null; };
const onMsg = m => {
  if (!m || m.k !== 'castleGate' || !G.c2 || !G.layout.cwalls) return;
  const cw = G.layout.cwalls.find(c => c.hid === m.a[2]), L = cw && live(cw); if (!L || (L[0].lv | 0) < 3) return;
  const y = groundY(cw.x, cw.z) + 8.7;
  bus.emit('spark', { x: cw.x, y, z: cw.z, c: '#a3825a', n: 16 }); bus.emit('sfx', { name: 'heavy', x: cw.x, z: cw.z });
  const me = G.player; if (me && !me.dead && Math.hypot(me.x - cw.x, me.z - cw.z) < 45) pow(cw.x, y + 1.5, cw.z, 'BALLISTA DOWN!', '#ff8a3a', 1);
};
bus.on('msg', onMsg); bus.on('msgIn', onMsg);

let smokeT = 0;
function cross(ctx, x, y, r) {
  ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x + r, y + r); ctx.moveTo(x + r, y - r); ctx.lineTo(x - r, y + r);
  ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = '#e23a2e'; ctx.stroke();
}
// render/overlay.js, every frame
export function drawSilenced(ctx, proj, dt = 1 / 30) {
  if (!G.c2 || !G.layout || !G.layout.cwalls) return;
  smokeT -= dt; const smoke = smokeT <= 0; if (smoke) smokeT = .25;
  ctx.save();
  for (const cw of G.layout.cwalls) {
    const L = live(cw); if (!L) continue; const [st, h] = L, lv = Math.min(st.lv | 0, CASTLE26.archers.length - 1);
    if ((st.lv | 0) >= 3 && gateBroken(cw, st)) {
      const y = groundY(cw.x, cw.z) + 9.4, [sx, sy, ok] = proj(cw.x, y, cw.z);
      if (ok) cross(ctx, sx, sy, 9);
      if (smoke) puff({ x: cw.x + (Math.random() - .5), y, z: cw.z + (Math.random() - .5), vx: 0, vy: 1.6, vz: 0, life: 1.6, c: '#4a4440', s: 1.4 });
    }
    for (let k = 0; k < CASTLE26.archers[lv]; k++) { const b = h.towerA0 + k * Math.PI / 2, x = h.x + Math.cos(b) * 9.5, z = h.z + Math.sin(b) * 9.5;
      if (!towerSilent(cw, st, x, z)) continue; const [sx, sy, ok] = proj(x, groundY(x, z) + 7, z); if (ok) cross(ctx, sx, sy, 6); }
  }
  ctx.restore();
}
