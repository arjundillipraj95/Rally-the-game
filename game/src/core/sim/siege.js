// Battle rules: CASTLE5 a castle's siege as the sides feel it: attacks warn the owners ("under attack", once in a
// while, with the castle so every phone can point at it), and an attack beaten off is a "Held!" with gold for them.
// A siege starts when a plate is knocked off or the circle starts filling against the owner; it is held once no enemy
// has been within the turret's range for CASTLE26.moment.heldAfter s. A capture ends it (crown2.js c2Take).
import { CASTLE26 } from '../../config.js';
import { G } from '../state.js';
import { say, fx } from './util.js';
import { allianceOf, sideArmies } from './holds.js';

const M = () => CASTLE26.moment;
// an attack on castle h by side a (a gate hit, the circle, the turret on a champion): warn its owners
export function attacked(h, a) {
  if (!h || h.owner < 0 || a === h.owner || a < 0) return;
  if (G.T - (h.alertT ?? -99) >= M().alertGap) { h.alertT = G.T; say('castleAttacked', h.owner, h.id, a); fx('netFlush'); }
}
export const siegeOn = (h, a) => { if (h && h.owner >= 0 && a !== h.owner) { h.siege = h.siege ?? G.T; attacked(h, a); } };
export function siegeTick() {
  if (G.role === 'client') return;
  for (const h of G.holds || []) {
    if (h.kind !== 'castle' || h.owner < 0) { h.siege = null; continue; }
    if (h.cap >= 0 && h.cap !== h.owner && h.prog > 0) siegeOn(h, h.cap);
    const near = G.units.some(u => !u.dead && !u.neutral && allianceOf(u.ti) >= 0 && allianceOf(u.ti) !== h.owner && Math.hypot(u.x - h.x, u.z - h.z) < CASTLE26.turret.range);
    if (near) { h.calmT = G.T; continue; }
    if (h.siege != null && G.T - (h.calmT ?? h.siege) >= M().heldAfter) {
      h.siege = null; for (const i of sideArmies(h.owner)) G.teams[i].gold += M().held;
      say('castleHeld', h.owner, h.id, M().held); fx('netFlush');
    }
  }
}
