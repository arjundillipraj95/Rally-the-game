// (C1e) a champion's influence on his army: the one way he changes his soldiers, from his page's `influence`:
// { r: m from him (none: wherever they are), front: less damage taken from the front, arrows too, dmg: more damage
// dealt, hp: more (or less) health, spd: faster }. Replaces the old aura on the mountain.
import { G } from '../core/state.js';
import { champOf } from './index.js';

const inf = ti => champOf(ti).influence;
// is soldier u under his champion's influence now (in range of him, alive, when it has a range)
export function under(u) {
  if (!u || u.leader || u.neutral || !G.teams[u.ti]) return null;
  const I = inf(u.ti); if (!I) return null;
  if (I.r) { const L = G.teams[u.ti].leader; if (!L || L.dead || (L.x - u.x) ** 2 + (L.z - u.z) ** 2 > I.r * I.r) return null; }
  return I;
}
export const inflDmg = a => { const I = under(a); return I && I.dmg ? 1 + I.dmg : 1; };
export const inflTaken = (b, frontal) => { const I = under(b); return I && I.front && frontal ? 1 - I.front : 1; };
export const inflSpd = u => { const I = under(u); return I && I.spd ? 1 + I.spd : 1; };
// at birth: a soldier's health (no range: it is how his men are trained)
export const inflHp = ti => { const I = inf(ti); return I && I.hp ? 1 + I.hp : 1; };
