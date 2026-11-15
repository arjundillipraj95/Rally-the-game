// F9 Horse charges: what a charging rider does to each man he meets (the rule), and the set-spear look.
// - spearmen on Hold, standing still and facing him: the charge is stopped on the spears ('stop')
// - any other man standing still and facing him: he soaks up the charge, the horse is checked ('slow')
// - a man on the move, off balance, in a ford, or hit from the flank or behind: bowled over ('bowl')
// Numbers in CHARGE (config.js). Used by the host's sim and by every phone's drawing.
import { CHARGE } from '../config.js';
import { angDiff, inFord } from './world.js';
import { isC2 } from './state.js';

const speed = u => Math.hypot(u.vx || 0, u.vz || 0);
export const spearman = o => o.kind === 'foot' && o.tier >= 1;
export const facing = (o, r) => Math.abs(angDiff(o.face, Math.atan2(r.x - o.x, r.z - o.z))) < CHARGE.front;
export const still = o => !o.mounted && !o.routing && !(o.stun > 0) && speed(o) < CHARGE.still && !(isC2() && inFord(o.x, o.z));
export function stance(o, r, onHold) {
  if (!still(o) || !facing(o, r)) return 'bowl';
  return spearman(o) && onHold ? 'stop' : 'slow';
}

// Host, once a tick: spearmen on Hold, still, with an enemy rider coming hard at their front, set their
// spears (`bracing`, sent to every phone and drawn as the planted spear). Captains brace on their own.
export function markBraces(units, onHold, isEnemy) {
  const riders = units.filter(c => c.mounted && !c.dead && speed(c) > CHARGE.setSpd);
  for (const u of units) {
    if (u.dead || !spearman(u)) continue;
    let set = false;
    if (riders.length && still(u) && onHold(u)) for (const c of riders) {
      if (!isEnemy(c, u)) continue;
      const dx = u.x - c.x, dz = u.z - c.z, d = Math.hypot(dx, dz) || .01;
      if (d < CHARGE.setR && (c.vx * dx + c.vz * dz) / d > CHARGE.setSpd * .6 && facing(u, c)) { set = true; break; }
    }
    u.bracing = set;
  }
}
