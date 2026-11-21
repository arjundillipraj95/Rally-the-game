// C3e/C3g what Testudo march shows, on every phone, from the fxtestudo moments: its men's shields up (unit.scutumUp,
// the block pose), a glowing path to where it marches with a ring at its end, a gold flash as the shields lock, and on
// every war drum beat a pulse rolling out under the block; the shout at the end rolls out a bigger one.
import { bus, G, isEnemy } from '../core/state.js';
import { champOf } from '../champions/index.js';
import { musicCue } from '../ui/audio.js';
import { spark, shockwave, pow } from './effects.js';
import { pathTex, ringTex, decal, place, drop, starburst } from './fxkit.js';
import { impact } from './feel.js';
import { groundY } from '../core/world.js';

const live = new Map(); // champion id -> { men, a, t0, dur, x, z, d, beat, path, end, locked }
function clear(id) { const L = live.get(id); if (!L) return; for (const o of L.men) o.scutumUp = false; drop(L.path); drop(L.end); live.delete(id); }
const mid = men => { const n = men.length || 1; return [men.reduce((s, o) => s + o.x, 0) / n, men.reduce((s, o) => s + o.z, 0) / n]; };
bus.on('fxmsg', e => {
  if (!e.u) return;
  if (e.k === 'fxtestudo') {
    const [a, dur, ...ids] = String(e.q || '').split(',').map(Number), d = champOf(e.u.ti).armyUlt; if (!d || !Number.isFinite(a)) return;
    clear(e.u.id);
    const men = ids.map(id => G.units.find(o => o.id === id)).filter(Boolean); for (const o of men) o.scutumUp = true;
    const [cx, cz] = mid(men), path = decal(pathTex, 3.2, d.dist, { from: 0, opacity: .7 }), end = decal(ringTex, 3, 3, { opacity: .9 });
    place(path, cx, cz, a, .09); place(end, cx + Math.sin(a) * d.dist, cz + Math.cos(a) * d.dist, 0, .1);
    live.set(e.u.id, { men, a, t0: G.T, dur, x: cx, z: cz, d, beat: 0, path, end, locked: false });
  } else if (e.k === 'fxtestudoend') {
    const L = live.get(e.u.id);
    if (L && e.q === '1') { const [x, z] = mid(L.men.filter(o => !o.dead)), fx = x + Math.sin(L.a) * 1.5, fz = z + Math.cos(L.a) * 1.5;
      shockwave(fx, fz, 4, 0xffd36e); shockwave(fx, fz, 6.5, 0xfff1c2); starburst(fx, groundY(fx, fz) + 1.4, fz, 4.5); pow(fx, groundY(fx, fz) + 3, fz, 'SHOVE!', '#ffd36e', 3); // (FX1)
      for (const o of G.units) if (!o.dead && isEnemy(o, e.u)) { const rx = o.x - fx, rz = o.z - fz, f = rx * Math.sin(L.a) + rz * Math.cos(L.a); if (f > -1 && f < 5 && Math.hypot(rx, rz) < 6) impact(o, e.u, o.leader ? 1 : .5); } }
    clear(e.u.id);
  }
});
// every frame (render/overlay.js)
export function drawTestudo() {
  if (!live.size) return;
  for (const [id, L] of live) {
    const t = G.T - L.t0; if (t > L.dur + 1) { clear(id); continue; }
    if (!L.locked && t >= L.d.form) { L.locked = true; for (const o of L.men) if (!o.dead) spark(o.x, (o.y || 0) + 1.6, o.z, '#ffd36e', 2); } // (shields lock: a glint along the block)
    if (t > L.d.form && t - L.d.form >= L.beat * .5) { // a drum beat every half second: a pulse under the block
      L.beat++; musicCue('drum'); const [x, z] = mid(L.men.filter(o => !o.dead)); shockwave(x, z, 2.2, 0xffe7a3);
    }
    L.path.material.opacity = .45 + .2 * Math.sin(G.T * 8); L.end.material.opacity = .6 + .4 * Math.sin(G.T * 10);
  }
}
