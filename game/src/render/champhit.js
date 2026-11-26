// FEEL1b (Arjun 25 Nov): a champion's basic blow landing on a champion is felt by the one it lands on, on every phone:
// his body rocks away from it; on his own screen a red edge on the side it came from, a shake, a buzz and a kick
// (FX1's impact, FEEL.basic's power: light for a slash, heavy for the shield bash). The bash also staggers him back
// (a slower hit reaction, render/heroes.js). The one who struck keeps his own feel (FEEL.own, the rules).
import { FEEL } from '../config.js';
import { G, bus } from '../core/state.js';
import { reel } from './soldiers.js';
import { hurtEdge } from './feel.js';
import { horseHit } from './heroes.js';
import { cam, camKick } from './camera.js';
import { buzz } from '../ui/audio.js';

bus.on('fxmsg', d => {
  if (d.k !== 'fxchamp' || !d.u || d.u.dead) return;
  const u = d.u, a = d.a, B = FEEL.basic, F = FEEL.special, p = d.heavy ? B.bash : B.slash;
  const ang = a ? Math.atan2(a.x - u.x, a.z - u.z) : u.face || 0;
  const r = d.shove ? B.reel[1] * 2 : B.reel[d.heavy ? 1 : 0]; if (r) reel(u, ang, r); // (every blow already rocks him: soldiers.js; a man only shoved gets a rock of his own)
  if (u.mounted) { const hs = horseHit(u, ang, p); if (hs) bus.emit('sfx', { name: hs, x: u.x, z: u.z }); }
  else if (d.heavy) u.fxBashT = G.T; // (the stagger back)
  if (u !== G.player) return;
  hurtEdge(ang, p); cam.shake = Math.max(cam.shake, F.shake[1] * p); buzz(Math.round(F.buzz[1] * p));
  camKick(-Math.sin(ang) * F.kick * p, -Math.cos(ang) * F.kick * p);
});
