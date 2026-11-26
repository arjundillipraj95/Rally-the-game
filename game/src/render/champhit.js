// FEEL1b (Arjun 25 Nov): a champion's basic blow landing on a champion is felt by the one it lands on, on every phone:
// his body rocks away from it; on his own screen a red edge on the side it came from, a shake, a buzz and a kick
// (FX1's impact, FEEL.basic's power: light for a slash, heavy for the shield bash). The bash also staggers him back
// (a slower hit reaction, render/heroes.js). The one who struck keeps his own feel (FEEL.own, the rules).
import { FEEL } from '../config.js';
import { G, bus } from '../core/state.js';
import { reel, stateOf } from './soldiers.js';
import { dust } from './effects.js';
import { hurtEdge } from './feel.js';
import { horseHit } from './heroes.js';
import { cam, camKick } from './camera.js';
import { buzz } from '../ui/audio.js';
import { pow } from './effects.js';

bus.on('fxmsg', d => {
  if (d.k !== 'fxchamp' || !d.u || d.u.dead) return;
  if (d.a && d.a === G.player && performance.now() - (d.u.predAtMs || 0) < FEEL.own.pred.hold) return; // (FEEL4: his phone showed it already)
  const u = d.u, a = d.a, B = FEEL.basic, F = FEEL.special, p = d.heavy ? B.bash : B.slash;
  const ang = a ? Math.atan2(a.x - u.x, a.z - u.z) : u.face || 0;
  const r = d.shove ? B.reel[1] * 2 : B.reel[d.heavy ? 1 : 0]; if (r) reel(u, ang, r); // (every blow already rocks him: soldiers.js; a man only shoved gets a rock of his own)
  if (u.mounted) { const hs = horseHit(u, ang, p); if (hs) bus.emit('sfx', { name: hs, x: u.x, z: u.z }); }
  else if (d.heavy) u.fxBashT = G.T; // (the stagger back)
  if (u !== G.player) return;
  hurtEdge(ang, p); cam.shake = Math.max(cam.shake, F.shake[1] * p); buzz(Math.round(F.buzz[1] * p));
  camKick(-Math.sin(ang) * F.kick * p, -Math.cos(ang) * F.kick * p);
});

// FEEL2b a champion's blow bounced off the Shield of Cassius: he rocks back; on his own phone "CLANG!", a jolt and a buzz
bus.on('fxmsg', d => {
  if (d.k !== 'fxrebound' || !d.u || d.u.dead) return;
  const u = d.u, a = d.a, ang = a ? Math.atan2(a.x - u.x, a.z - u.z) : (u.face || 0);
  reel(u, ang, FEEL.basic.rebound);
  if (u !== G.player) return;
  pow(u.x, (u.y || 0) + 2.6, u.z, 'CLANG!', '#e8d8a8', 1); cam.shake = Math.max(cam.shake, .18); buzz(25);
  camKick(-Math.sin(ang) * .2, -Math.cos(ang) * .2);
});

// FEEL2g her mounted shot: how well she let go, on her phone
bus.on('fxmsg', d => {
  if (d.k !== 'fxdraw' || d.a !== G.player || !d.u) return;
  const W = { perfect: ['PERFECT!', '#ffd23a'], tired: ['TOO LATE', '#c9c2b2'] }[d.q]; if (!W) return;
  pow(d.u.x, (d.u.y || 0) + 3, d.u.z, W[0], W[1], 1); if (d.q === 'perfect') buzz(30);
});

// FEEL4 (Arjun 25 Nov): on a joined phone your own blow's hit is shown on the target at once (flash, rock away from you,
// the hit clip; the bash staggers him back), not when the host's word comes ~400 ms later. The host still decides the
// damage; its word inside FEEL.own.pred.hold ms isn't played a second time (soldiers.js, heroes.js, fxchamp above).
bus.on('predhit', d => {
  const u = d.u, me = d.a; if (!u || u.dead || !me) return;
  const a = stateOf(u), P = FEEL.own.pred, sev = P.sev[d.heavy ? 1 : 0], ang = Math.atan2(me.x - u.x, me.z - u.z);
  a.flash = Math.min(1, Math.max(a.flash || 0, sev));
  if (!(u.fz > 0)) u.fz = FEEL.light.stop[0] + (FEEL.light.stop[1] - FEEL.light.stop[0]) * sev; // (the beat of weight, as the hit itself)
  reel(u, ang, 4 + 9 * sev);
  if (!u.mounted && d.heavy) { a.stumble = .4; dust(u.x, u.z); u.fxBashT = G.T; }
  else if (u.mounted) horseHit(u, ang, sev);
  a.predT = u.predAtMs = performance.now(); u.predImpT = G.T;
});
