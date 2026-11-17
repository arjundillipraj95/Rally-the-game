// CASTLE5 a castle's moments on every phone, from the announcements (core/sim/siege.js, crown2.js c2Take):
// taken: the old banner tears (shreds), dust bursts at its gates, horn and sting, one of the taker's men calls it,
// a beat of camera if you're near; held: a cheer and a call from the defenders; under attack: for its owners an
// arrow at the screen's edge (or a pulsing mark over it) for a few seconds.
import { G, bus, colorOf } from '../core/state.js';
import { groundY } from '../core/world.js';
import { view } from './scene.js';
import { say as callOut } from './banter.js';

const alerts = new Map(); // castle id -> until (ms)
const hold = id => G.holds && G.holds[id];
const caller = (a, h) => G.units.filter(u => !u.dead && !u.leader && !u.neutral && G.ALLY[colorOf(u.ti)] === a && Math.hypot(u.x - h.x, u.z - h.z) < 25).sort((p, q) => Math.hypot(p.x - h.x, p.z - h.z) - Math.hypot(q.x - h.x, q.z - h.z))[0];
bus.on('msg', m => {
  if (!m || !G.c2) return;
  if (m.k === 'holdTaken' && m.a[1] === 'castle') {
    const h = hold(m.a[2]); if (!h) return; const px = h.px ?? h.x, pz = h.pz ?? h.z, cw = G.layout.cwalls.find(c => c.hid === h.id);
    bus.emit('spark', { x: px, y: groundY(px, pz) + 5.6, z: pz, c: '#efe9d8', n: 18 }); // (the old banner, torn)
    if (cw) for (const g of cw.gates) { const x = cw.x + Math.cos(g) * cw.r, z = cw.z + Math.sin(g) * cw.r; bus.emit('spark', { x, y: groundY(x, z) + 1, z, c: '#a3825a', n: 14 }); }
    bus.emit('sfx', { name: 'horn', x: px, z: pz }); bus.emit('sfx', { name: 'capture', x: px, z: pz });
    const u = caller(m.a[0], h); if (u) callOut(u, 'taken', true);
    const me = G.player; if (me && !me.dead && Math.hypot(me.x - h.x, me.z - h.z) < 45) bus.emit('camBeat', { x: h.x, z: h.z });
    alerts.delete(h.id);
  } else if (m.k === 'castleHeld') {
    const h = hold(m.a[1]); if (!h) return; bus.emit('sfx', { name: 'cheer', x: h.x, z: h.z });
    const u = caller(m.a[0], h); if (u) callOut(u, 'held', true); alerts.delete(h.id);
  } else if (m.k === 'castleAttacked' && m.a[0] === G.ALLY[colorOf(G.myTi)]) alerts.set(m.a[1], performance.now() + 6000);
});
export function drawCastleAlerts(ctx, proj) {
  const now = performance.now(); if (!alerts.size) return;
  for (const [id, until] of alerts) {
    if (now > until) { alerts.delete(id); continue; } const h = hold(id); if (!h) continue;
    const pulse = .6 + .4 * Math.sin(now / 130), W = view.W, H = view.H;
    let [sx, sy, ok] = proj(h.x, groundY(h.x, h.z) + 9, h.z);
    ctx.save(); ctx.fillStyle = `rgba(226,58,46,${pulse.toFixed(2)})`; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = 3;
    if (ok && sx > 30 && sx < W - 30 && sy > 30 && sy < H - 30) { ctx.font = '900 30px Bangers, Impact, sans-serif'; ctx.textAlign = 'center'; ctx.strokeText('!', sx, sy); ctx.fillText('!', sx, sy); }
    else { if (!ok) { sx = W - sx; sy = H - sy; } const a = Math.atan2(sy - H / 2, sx - W / 2), r = Math.min(W, H) / 2 - 34, x = W / 2 + Math.cos(a) * r * (W / Math.min(W, H)) * .92, y = H / 2 + Math.sin(a) * r;
      ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(-10, -13); ctx.lineTo(-4, 0); ctx.lineTo(-10, 13); ctx.closePath(); ctx.stroke(); ctx.fill(); }
    ctx.restore();
  }
}
// (CASTLE8) the nexus: its crystal gone once broken (with a burst, once); a health bar over it for a while after a blow
const nexusDone = new Set();
export function drawNexus(ctx, proj) {
  const K = G.c2; if (!K || !G.layout || !G.layout.nexus) return;
  for (const b of K.breaks) { if (b.kind !== 'nexus') continue; const n = G.layout.nexus.find(x => x.c === b.c);
    if (b.hp <= 0) { if (n && n.mesh && n.mesh.visible) { n.mesh.visible = false; if (!nexusDone.has(b.c)) { nexusDone.add(b.c); bus.emit('spark', { x: b.x, y: groundY(b.x, b.z) + 4, z: b.z, c: '#ffffff', n: 30 }); bus.emit('sfx', { name: 'crumble', x: b.x, z: b.z }); } } continue; }
    if (!(G.T - (b.hitT ?? -99) < 6)) continue; const [sx, sy, ok] = proj(b.x, groundY(b.x, b.z) + 7.5, b.z); if (!ok) continue;
    const w = 70, p = Math.max(0, b.hp / b.max); ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(sx - w / 2 - 2, sy - 2, w + 4, 11);
    ctx.fillStyle = G.ALLY[b.c] === G.ALLY[colorOf(G.myTi)] ? '#5fd35a' : '#e2483d'; ctx.fillRect(sx - w / 2, sy, w * p, 7); }
}
