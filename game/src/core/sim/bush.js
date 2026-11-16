// Battle rules: MAP5 the mountain's bushes. Inside a bush a man is hidden from the other sides until
// he attacks (seen for CROWN26.bush.reveal s after his last blow, shot or throw) or one of theirs stands in the same
// bush. Hidden means not drawn on their phones (render/fog.js) and not picked as a foe by anyone's men or computer
// captains (melee.js nearestFoe). The Crown's carrier is never hidden. Nothing here runs without bushes in the layout.
import { CROWN26 } from '../../config.js';
import { G, colorOf, NEUTRAL_TI } from '../state.js';

const sideOf = ti => ti >= NEUTRAL_TI ? -1 : G.ALLY[colorOf(ti)];
// every frame: which bush each man stands in (u.bush, -1 for none) and which sides are in each bush (bits)
export function bushTick() {
  const B = G.layout && G.layout.bushes; if (!B) return;
  if (!G.bushOcc || G.bushOcc.length !== B.length) G.bushOcc = new Uint8Array(B.length); else G.bushOcc.fill(0);
  const J = G.layout.bushR || [G.layout.jungle.r0, G.layout.jungle.r1]; // (MAP10: the jungle and the inner ring)
  for (const u of G.units) {
    u.bush = -1; if (u.dead) continue;
    const r = Math.hypot(u.x, u.z); if (r < J[0] - 1 || r > J[1] + 1) continue;
    for (let i = 0; i < B.length; i++) { const b = B[i], dx = u.x - b.x, dz = u.z - b.z; if (dx * dx + dz * dz < b.r * b.r) { u.bush = i; const a = sideOf(u.ti); if (a >= 0) G.bushOcc[i] |= 1 << a; break; } }
  }
}
// is man o hidden from side a (an alliance; -1: the neutral men)?
export const bushHid = (o, a) => o.bush >= 0 && !!G.bushOcc && !(a >= 0 && (G.bushOcc[o.bush] & (1 << a))) && !(G.T - (o.atkT ?? -99) < CROWN26.bush.reveal) && !(o.swing > 0) && !o.carrying;
// for the foe search: hidden from the side of man u
export const hiddenFrom = (o, u) => bushHid(o, sideOf(u.ti));
