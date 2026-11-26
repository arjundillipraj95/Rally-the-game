// PULL1 what the pull down shows: a ring closing on an enemy rider coming past you (on foot, alive), white as it
// closes, gold in the window where Attack pulls him off (a Raider: only on the beat); and the moment itself:
// "PULLED DOWN!", sparks, a shake and a held beat when it's yours.
import { bus, G } from '../core/state.js';
import { PULL } from '../config.js';
import { champOf } from '../champions/index.js';
import { pullTiming } from '../core/sim/pulldown.js';
import { body } from '../core/body.js';
import { spark, shockwave, pow, dust } from './effects.js';
import { ringTex, decal, place, drop } from './fxkit.js';

let ring = null;
export function drawPull() {
  const p = G.player, T = p && !p.dead && !p.mounted && G.state === 'play' ? pullTiming(p, PULL.good) : null;
  if (!T || T.t < -PULL.good) { if (ring) { drop(ring); ring = null; } return; }
  const o = T.o, raider = champOf(o.ti).cls === 'raider', win = Math.abs(T.t) <= (raider ? PULL.perfect : PULL.good);
  const r = (o.r || .9) + .4 + Math.max(0, T.t) / PULL.show * 3.2;
  if (!ring) ring = decal(ringTex, 2, 2, { add: true, from: .5, color: 0xffd36e }); // (a cue, not a move: stays gold)
  ring.scale.set(r, 1, r); ring.material.color.setHex(win ? 0xffc53a : 0xffffff); ring.material.opacity = win ? 1 : .7;
  place(ring, o.x, o.z, 0, .16);
}
bus.on('fxmsg', e => {
  if (e.k !== 'fxpull' || !e.u) return;
  const u = e.u, y = (u.y || 0) + 1.4 * body.champ;
  spark(u.x, y, u.z, '#ffc53a', e.q === 'perfect' ? 28 : 18); shockwave(u.x, u.z, 3.5, 0xffc53a);
  for (let i = 0; i < 6; i++) dust(u.x + (Math.random() - .5) * 1.5, u.z + (Math.random() - .5) * 1.5);
  pow(u.x, y + 1.3, u.z, 'PULLED DOWN!', '#ffc53a', 3);
  const me = G.player; if (me && Math.hypot(me.x - u.x, me.z - u.z) < 14) bus.emit('shake', .4);
  if (e.a === G.player || u === G.player) bus.emit('hitstop', .1);
  if (!u.mounted) u.act = { name: 'knockdown', t: G.T, down: PULL.stun }; // (FALL1: down as long as the rules keep him down)
});
