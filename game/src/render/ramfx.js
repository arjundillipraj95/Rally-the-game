// C3b/C3g what Ram of Cassius shows, on every phone, from the fxram moments: a glowing path on the ground through the
// wind-up and the rush (the area shown first), dust at his feet and a streak behind him as he goes, and the impact:
// a flash, sparks and a shockwave on the champion he meets (a bigger one, with debris, "WALL SLAM!" and a shake, into
// a wall), "BRACED!" on a spear line. Joined phones also play his clip (unit.act).
import { bus, G } from '../core/state.js';
import { champOf } from '../champions/index.js';
import { body } from '../core/body.js';
import { spark, puff, trail, dust, shockwave, pow } from './effects.js';
import { pathTex, decal, place, drop } from './fxkit.js';

const live = new Map(); // unit id -> { u, x, z, a, len, t0, d, end, m, dustT }
bus.on('fxmsg', e => {
  if (!e.u) return;
  if (e.k === 'fxram') {
    const [x, z, a, len] = String(e.q || '').split(',').map(Number), d = champOf(e.u.ti).sp1; if (!d || !Number.isFinite(a)) return;
    const old = live.get(e.u.id); if (old) drop(old.m);
    const m = decal(pathTex, (d.w + .35) * 2, len, { from: 0, color: 0xffffff }); place(m, x, z, a, .1);
    live.set(e.u.id, { u: e.u, x, z, a, len, t0: G.T, d, end: null, m, dustT: 0 });
    if (e.fromNet && !e.u.mounted) e.u.act = { name: 'ram', t: G.T };
    spark(x + Math.sin(a) * .6, (e.u.y || 0) + 1.3 * body.champ, z + Math.cos(a) * .6, '#ffe7a3', 6); // (the scutum catches the light as he sets)
  } else if (e.k === 'fxramend') { const L = live.get(e.u.id); if (L) L.end = G.T; if (e.fromNet && e.u.act && e.u.act.name === 'ram') e.u.act = null; }
  else if (e.k === 'fxramhit' || e.k === 'fxramwall') {
    const u = e.u, wall = e.k === 'fxramwall', y = (u.y || 0) + 1.1 * body.champ;
    spark(u.x, y, u.z, '#ffd36e', wall ? 26 : 16); shockwave(u.x, u.z, wall ? 5 : 3, 0xffd36e);
    if (wall) { shockwave(u.x, u.z, 3, 0xfff1c2); for (let i = 0; i < 8; i++) dust(u.x + (Math.random() - .5) * 1.6, u.z + (Math.random() - .5) * 1.6); }
    pow(u.x, y + 1.2, u.z, wall ? 'WALL SLAM!' : 'BASH!', '#ffd36e', wall ? 3 : 2);
    const me = G.player, near = me && Math.hypot(me.x - u.x, me.z - u.z) < 12;
    if (near) bus.emit('shake', wall ? .5 : .28);
    if (e.a && e.a === G.player || u === G.player) bus.emit('hitstop', wall ? .12 : .07); // (your own ram, or rammed yourself: the world holds a beat)
  } else if (e.k === 'fxrambrace') { const u = e.u; spark(u.x + Math.sin(u.face) * 1.2, (u.y || 0) + 1.4, u.z + Math.cos(u.face) * 1.2, '#fff3b0', 14); pow(u.x, (u.y || 0) + 3, u.z, 'BRACED!', '#fff3b0', 2); }
});
// every frame (render/overlay.js): the path fades in, holds through the rush, fades out; dust and a streak while he goes
export function drawRam() {
  if (!live.size) return;
  for (const [id, L] of live) {
    const t = G.T - L.t0, d = L.d, run = t - d.wind, out = L.end != null ? G.T - L.end : run - d.dur * L.len / d.dist;
    if (out > .3 || t < -1) { drop(L.m); live.delete(id); continue; }
    L.m.material.opacity = out > 0 ? 1 - out / .3 : Math.min(1, .35 + t * 5);
    const u = L.u;
    if (run > 0 && out <= 0 && !u.dead) { // the rush: dust at his feet, a golden streak at his shoulders
      const fx = Math.sin(L.a), fz = Math.cos(L.a), y = (u.y || 0);
      trail(u.x - fx * .4, y + 1.2 * body.champ, u.z - fz * .4, '#ffd36e'); trail(u.x - fx * .9, y + .9 * body.champ, u.z - fz * .9, '#fff1c2');
      if (G.T - L.dustT > .05) { L.dustT = G.T; puff({ x: u.x - fx * .5, y: y + .15, z: u.z - fz * .5, vx: -fx * 2 + (Math.random() - .5), vy: .8, vz: -fz * 2 + (Math.random() - .5), life: .45, c: '#cdb58a', s: 6 }); }
    }
  }
}
