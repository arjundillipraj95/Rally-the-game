// C3d/C3g what Eagle's fall shows, on every phone, from the fxeagle and fxeagleland moments: a glowing gold circle
// where he will land (from the crouch; an inner ring closes in as the landing nears), the eagle's shadow on the
// ground under him and ahead, and the slam: two shockwaves, a burst of sparks and dust, a shake nearby and a beat's
// hold for whoever it hits or made it. Joined phones also play his clip (unit.act).
import { bus, G, isEnemy } from '../core/state.js';
import { champOf } from '../champions/index.js';
import { body } from '../core/body.js';
import { spark, dust, shockwave, pow } from './effects.js';
import { ringTex, eagleTex, decal, place, drop, starburst } from './fxkit.js';
import { impact } from './feel.js';

const live = new Map(); // unit id -> { u, x, z, t0, d, ring, inner, bird }
const flash = []; // (FX1) the slam's ring, blown out and fading
const at = q => String(q || '').split(',').map(Number);
function clear(id) { const L = live.get(id); if (!L) return; drop(L.ring); drop(L.inner); drop(L.bird); live.delete(id); }
const standUp = u => { if (u.act && u.act.name === 'eagle' && !u.eagle) u.act = null; };
bus.on('fxmsg', e => {
  if (!e.u) return;
  if (e.k === 'fxeagle') {
    const [x, z, late] = at(e.q), d = champOf(e.u.ti).ult; if (!d || !Number.isFinite(x)) return; const t0 = G.T - (late ? d.crouch : 0); // (FEEL2c: a lock-on's circle comes as he leaves the ground)
    clear(e.u.id);
    const ring = decal(ringTex, d.r * 2, d.r * 2), inner = decal(ringTex, d.r * 2, d.r * 2, { opacity: .8 }), bird = decal(eagleTex, 4.4, 2.75, { add: false, opacity: 0, color: 0x000000 });
    place(ring, x, z); place(inner, x, z, 0, .14); bird.visible = false;
    live.set(e.u.id, { u: e.u, x, z, t0, d, ring, inner, bird });
    if (e.fromNet && !late) e.u.act = { name: 'eagle', t: G.T }; // (the host's rules set it there; a lock-on's leap began a crouch ago, its act already sent)
  } else if (e.k === 'fxeagleland') {
    const [x, z] = at(e.q); clear(e.u.id);
    shockwave(x, z, 5, 0xffd36e); shockwave(x, z, 3, 0xfff1c2); spark(x, (e.u.y || 0) + .6, z, '#ffd36e', 30);
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; dust(x + Math.sin(a) * 2.2, z + Math.cos(a) * 2.2); }
    { // (FX1) the slam lands: a big flash, the ground ring blown out, and every enemy in it reels (a champion's screen flashes red)
      const d = champOf(e.u.ti).ult, r = (d && d.r) || 4, gy = (e.u.y || 0) + .8; starburst(x, gy + .6, z, 6); shockwave(x, z, r * 1.6, 0xfff1c2);
      const blast = decal(ringTex, r * 2.4, r * 2.4, { opacity: 1 }); place(blast, x, z, 0, .15); flash.push({ m: blast, t0: G.T });
      pow(x, gy + 2.2, z, 'SLAM!', '#ffd36e', 3);
      for (const o of G.units) if (!o.dead && o !== e.u && isEnemy(o, e.u) && Math.hypot(o.x - x, o.z - z) < r + .6) impact(o, e.u, o.leader ? 1.3 : .6);
    }
    const me = G.player, dd = me && !me.dead ? Math.hypot(me.x - x, me.z - z) : 99;
    if (dd < 12) bus.emit('shake', .55);
    if (e.u === me || dd < 4.5) bus.emit('hitstop', .1);
    if (e.fromNet) { bus.emit('sfx', { name: 'heavy', x, z }); setTimeout(() => standUp(e.u), 250); }
  }
});
// every frame (render/overlay.js): the circle pulses and its inner ring closes in; the shadow runs ahead of him
export function drawEagle() {
  for (let i = flash.length - 1; i >= 0; i--) { const F = flash[i], k = (G.T - F.t0) / .5; if (k >= 1 || k < 0) { drop(F.m); flash.splice(i, 1); continue; } F.m.scale.setScalar(1 + k * .6); F.m.material.opacity = 1 - k; }
  if (!live.size) return;
  for (const [id, L] of live) {
    const d = L.d, u = L.u, t = G.T - L.t0, fly = d.crouch + d.air;
    if (t > fly + .6 || u.dead) { clear(id); standUp(u); continue; }
    const k = Math.min(1, Math.max(0, t / fly));
    L.ring.material.opacity = .75 + .25 * Math.sin(G.T * 14);
    L.inner.scale.setScalar(Math.max(.05, 1 - k)); L.inner.material.opacity = .5 + .5 * k;
    if (t > d.crouch) {
      const jy = Math.max(0, u.jy || 0), s = (.9 + .4 * Math.min(1, jy / d.h)) * body.champ, f = u.face || 0;
      L.bird.visible = true; place(L.bird, u.x + Math.sin(f) * 1.2, u.z + Math.cos(f) * 1.2, f, .16); L.bird.scale.set(s, 1, s);
      L.bird.material.opacity = .35 + .3 * Math.min(1, jy / d.h);
    }
  }
}
