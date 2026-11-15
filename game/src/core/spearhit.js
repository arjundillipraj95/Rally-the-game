// F25 The spear hits where it looks: the hit area of each of the captain's spear blows is where the spear you see
// reaches at the frame the blow lands (numbers in CAPTAIN_COMBAT.spear.area, measured on the clips by store/r_F25.mjs).
// poke and thrust: along the shaft's line, out to the tip; sweep: the arc it has crossed, out to the tip.
// Used by the host's rules and by a joined phone's own hit spark.
import { CAPTAIN_COMBAT } from '../config.js';
import { angDiff } from './world.js';

const A = CAPTAIN_COMBAT.spear.area;
// which blow a press is (combo step 0, 1, 2)
export const spearBlow = combo => (combo === 2 ? 'thrust' : combo === 1 ? 'sweep' : 'poke');
// how far off a man (his centre) can stand and still be inside this blow's area, straight ahead
export const spearReach = (blow, o) => A[blow] + (o ? o.r : .5);
export function inSpear(u, o, blow) {
  const dx = o.x - u.x, dz = o.z - u.z, fx = Math.sin(u.face), fz = Math.cos(u.face);
  if (blow === 'sweep') {
    const d = Math.hypot(dx, dz), a = angDiff(u.face, Math.atan2(dx, dz)), m = Math.asin(Math.min(1, o.r / Math.max(d, o.r))); // (his body's width, seen from here)
    return d - o.r <= A.sweep && a >= A.arc[0] - m && a <= A.arc[1] + m;
  }
  const along = dx * fx + dz * fz, lat = dx * fz - dz * fx;
  return along > 0 && along - o.r <= A[blow] && Math.abs(lat) <= o.r + A.width;
}
