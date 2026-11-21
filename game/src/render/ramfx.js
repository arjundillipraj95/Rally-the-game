// C3b/C3g what Ram of Cassius shows, on every phone, from the fxram moments: a glowing path on the ground through the
// wind-up and the rush (the area shown first), dust at his feet and a streak behind him as he goes, and the impact:
// a flash, sparks and a shockwave on the champion he meets (a bigger one, with debris, "WALL SLAM!" and a shake, into
// a wall), "BRACED!" on a spear line. Joined phones also play his clip (unit.act).
// C3k the hit's weight: the one he hits skids back in a dust trail (into a wall: down, then up); rammed yourself, your
// screen shakes and its edges flash red; "CLANG!" off a shield or a testudo, "CLASH!" head-on, a second "BASH!" on a
// champion knocked into another, splinters off a gate.
import { bus, G } from '../core/state.js';
import { champOf } from '../champions/index.js';
import { body } from '../core/body.js';
import { spark, puff, trail, dust, shockwave, pow } from './effects.js';
import { pathTex, decal, place, drop, starburst, drawBursts } from './fxkit.js';
import { reel } from './soldiers.js';
import { horseHit } from './heroes.js';

const skids = []; // { u, dx, dz, t0 }: a champion sliding back from the hit, kicking up dust
let edge = null; // your own screen's red edge, when you're the one rammed
function hurtEdge() {
  if (!edge) { edge = document.createElement('div'); edge.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:40;opacity:0;transition:opacity .45s ease-out;box-shadow:inset 0 0 90px 30px rgba(210,30,20,.75)'; document.body.appendChild(edge); }
  edge.style.transition = 'none'; edge.style.opacity = '1'; void edge.offsetWidth; edge.style.transition = 'opacity .45s ease-out'; edge.style.opacity = '0';
  try { navigator.vibrate && navigator.vibrate(60); } catch (e) {}
}
const near = (u, r = 12) => G.player && Math.hypot(G.player.x - u.x, G.player.z - u.z) < r;
const mine = e => (e.a && e.a === G.player) || e.u === G.player;
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
    { // (RAM2: the shield meets him: a gold starburst where they touch, wood and grit flying on through)
      const A = e.a || u, l = Math.hypot(u.x - A.x, u.z - A.z) || 1, dx = (u.x - A.x) / l, dz = (u.z - A.z) / l;
      starburst(u.x - dx * .45, y + .15, u.z - dz * .45, wall ? 4 : 3);
      for (let i = 0; i < (wall ? 18 : 12); i++) { const s = 3 + Math.random() * 5, side = (Math.random() - .5) * 4;
        puff({ x: u.x - dx * .4, y: y + (Math.random() - .3) * .6, z: u.z - dz * .4, vx: dx * s + dz * side, vy: 1.5 + Math.random() * 3.5, vz: dz * s - dx * side, life: .55 + Math.random() * .35, c: Math.random() < .6 ? '#6b4a2b' : '#b59a72', s: 4 + Math.random() * 4 }); }
    }
    if (wall) { shockwave(u.x, u.z, 3, 0xfff1c2); for (let i = 0; i < 8; i++) dust(u.x + (Math.random() - .5) * 1.6, u.z + (Math.random() - .5) * 1.6); }
    pow(u.x, y + 1.2, u.z, wall ? 'WALL SLAM!' : 'BASH!', '#ffd36e', wall ? 3 : 2);
    const me = G.player, near = me && Math.hypot(me.x - u.x, me.z - u.z) < 12;
    if (near) bus.emit('shake', wall ? .5 : .28);
    if (e.a && e.a === G.player || u === G.player) bus.emit('hitstop', wall ? .12 : .07); // (your own ram, or rammed yourself: the world holds a beat)
    if (u === G.player) hurtEdge();
    if (e.a) reel(u, Math.atan2(e.a.x - u.x, e.a.z - u.z), wall ? 9 : 7); // (FX1: his body rocks from the side it came)
    if (e.a && u.mounted && horseHit(u, Math.atan2(e.a.x - u.x, e.a.z - u.z), wall ? 1.6 : 1.3)) bus.emit('sfx', { name: 'neigh', x: u.x, z: u.z }); // (FX2: rammed in the saddle, his horse rears)
    if (e.a) { const l = Math.hypot(u.x - e.a.x, u.z - e.a.z) || 1; skids.push({ u, dx: (u.x - e.a.x) / l, dz: (u.z - e.a.z) / l, t0: G.T }); }
    if (wall && !u.mounted) u.act = { name: 'knockdown', t: G.T, down: (e.a && champOf(e.a.ti).sp1 && champOf(e.a.ti).sp1.wallStun) || 1 }; // (FALL1: down as long as the wall slam's stun)
  } else if (e.k === 'fxramclang' || e.k === 'fxramclash') { // off a shield or a testudo; or two rams head-on
    const u = e.u, a = e.a || u, x = (u.x + a.x) / 2, z = (u.z + a.z) / 2, y = (u.y || 0) + 1.3 * body.champ, clash = e.k === 'fxramclash';
    spark(x, y, z, clash ? '#ffd36e' : '#dfefff', clash ? 30 : 22); shockwave(x, z, clash ? 4.5 : 3, clash ? 0xffd36e : 0xdfefff);
    pow(x, y + 1.2, z, clash ? 'CLASH!' : 'CLANG!', clash ? '#ffd36e' : '#dfefff', clash ? 3 : 2);
    if (near(u)) bus.emit('shake', clash ? .5 : .35);
    if (mine(e)) bus.emit('hitstop', clash ? .12 : .09);
    if (u === G.player && clash) hurtEdge();
  } else if (e.k === 'fxramchain') { const u = e.u, y = (u.y || 0) + 1.1 * body.champ;
    spark(u.x, y, u.z, '#ffd36e', 14); shockwave(u.x, u.z, 2.5, 0xffd36e); pow(u.x, y + 1.2, u.z, 'BASH!', '#ffd36e', 2);
    if (u === G.player) { hurtEdge(); bus.emit('hitstop', .07); }
  } else if (e.k === 'fxramgate') { const u = e.u, fx = Math.sin(u.face), fz = Math.cos(u.face), x = u.x + fx * 1.4, z = u.z + fz * 1.4, y = (u.y || 0) + 1.3;
    spark(x, y, z, '#a3825a', 20); for (let i = 0; i < 6; i++) dust(x + (Math.random() - .5) * 1.4, z + (Math.random() - .5) * 1.4);
    pow(x, y + 1.4, z, 'RAM!', '#e8c88a', 2); if (near(u)) bus.emit('shake', .35); if (u === G.player) bus.emit('hitstop', .08);
  } else if (e.k === 'fxrambrace') { const u = e.u; spark(u.x + Math.sin(u.face) * 1.2, (u.y || 0) + 1.4, u.z + Math.cos(u.face) * 1.2, '#fff3b0', 14); pow(u.x, (u.y || 0) + 3, u.z, 'BRACED!', '#fff3b0', 2); }
});
// every frame (render/overlay.js): the path fades in, holds through the rush, fades out; dust and a streak while he goes
export function drawRam() {
  drawBursts();
  for (let i = skids.length - 1; i >= 0; i--) { const S = skids[i], t = G.T - S.t0; // the slide back: dust off his heels
    if (t > .35 || S.u.dead) { skids.splice(i, 1); continue; }
    puff({ x: S.u.x - S.dx * .3, y: (S.u.y || 0) + .1, z: S.u.z - S.dz * .3, vx: -S.dx * 1.5 + (Math.random() - .5), vy: .6, vz: -S.dz * 1.5 + (Math.random() - .5), life: .5, c: '#cdb58a', s: 7 });
  }
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
