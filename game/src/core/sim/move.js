// Battle rules: paths, moving, falling.
import { G, bus, isEnemyTi, colorOf } from '../state.js';
import { deepWater, groundY, inRiver, onBridge, clamp, turn, W, onIce } from '../world.js';
import { nearObstacles, gateShut, los, findPath, openGoal, walkable } from '../nav.js';
import { duelBounds } from './duel.js';

// ---------- navigation ----------
// Where to walk next on the way to (gx,gz): straight there when the way is clear,
// otherwise along an A* path around walls, rivers and buildings. Paths are cached per unit
// and the number of new searches per frame is capped so big armies stay cheap.
let pathBudget = 0;
export const setPathBudget = n => { pathBudget = n; }; // (update sets it each step: an imported binding can't be assigned)
function nav(u, gx, gz) {
  const P = u.nav || (u.nav = { next: 0, direct: true, pts: null, i: 0, gx: 1e9, gz: 1e9, repath: 0, skipT: 0 });
  if (G.T >= P.next) { P.next = G.T + .25 + Math.random() * .15; const [ox, oz] = openGoal(gx, gz, u.x, u.z); P.direct = los(u.x, u.z, ox, oz); P.ox = ox; P.oz = oz; }
  if (P.direct) { P.pts = null; return [gx, gz]; }
  const ox = P.ox, oz = P.oz;
  if ((G.T > P.repath || Math.hypot(ox - P.gx, oz - P.gz) > 4) && pathBudget > 0) {
    pathBudget--;
    // pressed into a wall: step out to the path's first open cell before heading on
    P.pts = findPath(u.x, u.z, ox, oz); P.i = walkable(u.x, u.z) ? 1 : 0; P.gx = ox; P.gz = oz;
    P.repath = G.T + (P.pts ? 2 + Math.random() : 1.5 + Math.random()); // a failed search waits before trying again
  }
  if (!P.pts || P.pts.length < 2) return [gx, gz];
  const pts = P.pts;
  while (P.i < pts.length - 1 && Math.hypot(pts[P.i][0] - u.x, pts[P.i][1] - u.z) < (P.i ? 1.3 : .5)) P.i++;
  if (P.i < pts.length - 1 && G.T >= P.skipT) { P.skipT = G.T + .3; if (los(u.x, u.z, pts[P.i + 1][0], pts[P.i + 1][1])) P.i++; }
  const p = pts[Math.min(P.i, pts.length - 1)];
  return P.i >= pts.length - 1 ? [gx, gz] : [p[0], p[1]];
}
export function moveToward(u, gx, gz, spd, dt, stopAt = .3) {
  const dx = gx - u.x, dz = gz - u.z, d = Math.hypot(dx, dz);
  let tvx = 0, tvz = 0;
  if (d > stopAt) { const s = spd * Math.min(1, (d - stopAt) / 1.2 + .2); tvx = dx / d * s; tvz = dz / d * s; }
  const k = (u.stun > 0 ? 1.5 : u.charge > 0 ? 3.2 : u.mounted ? 3.2 : 10) * (onIce(u.x, u.z) ? .18 : 1); // (on ice you slide)
  u.vx += (tvx - u.vx) * Math.min(1, dt * k); u.vz += (tvz - u.vz) * Math.min(1, dt * k);
  return d;
}
export const faceTo = (u, x, z, dt, rate = 9) => { u.face = turn(u.face, Math.atan2(x - u.x, z - u.z), dt * rate); };
export function go(u, gx, gz, spd, dt, stopAt = .3) {
  const [nx, nz] = nav(u, gx, gz), direct = nx === gx && nz === gz;
  moveToward(u, nx, nz, spd, dt, direct ? stopAt : .2);
  if (Math.hypot(nx - u.x, nz - u.z) > .6) faceTo(u, nx, nz, dt, u.mounted ? 4 : 8);
  return Math.hypot(gx - u.x, gz - u.z);
}

// ---------- physics ----------
export function integrate(u, dt, pz) {
  const ox = u.x, oz = u.z;
  u.x += u.vx * dt; u.z += u.vz * dt;
  for (const o of nearObstacles(u.x, u.z)) {
    if (o.gate && !gateShut(o)) continue;
    if (o.fence && u.vaultT > 0) continue; // (a pounce goes over a low wall or a hedge)
    if (o.off) continue; // (a palisade section not built yet, or broken down)
    if (o.door && !isEnemyTi(o.c, u.ti)) continue; // (a castle's gate opens for its own)
    if (o.cgate != null && G.holds[o.cgate] && G.holds[o.cgate].owner === G.ALLY[colorOf(u.ti)]) continue; // (the Crown: a castle's gate opens for the side that holds it)
    const dx = u.x - o.x, dz = u.z - o.z;
    if (o.box) {
      const c = Math.cos(o.rot), s = Math.sin(o.rot), lx = dx * c - dz * s, lz = dx * s + dz * c;
      const px = o.hw + u.r - Math.abs(lx), pz = o.hd + u.r - Math.abs(lz);
      if (px <= 0 || pz <= 0) continue;
      let nx = lx, nz = lz; if (px < pz) nx = Math.sign(lx || 1) * (o.hw + u.r); else nz = Math.sign(lz || 1) * (o.hd + u.r);
      u.x = o.x + nx * c + nz * s; u.z = o.z - nx * s + nz * c;
      continue;
    }
    const min = o.r + u.r;
    if (Math.abs(dx) > min || Math.abs(dz) > min) continue;
    const d = Math.hypot(dx, dz);
    if (d < min && d > 0) { u.x = o.x + dx / d * min; u.z = o.z + dz / d * min; }
  }
  // every battlefield is round: just inside where the ground starts rising into the hills at the edge
  { const d = Math.hypot(u.x, u.z), m = (G.layout.round || W.R) - u.r; if (d > m) { u.x *= m / d; u.z *= m / d; } }
  if (G.layout.river && deepWater(u.x, u.z)) { // (the Crown's river: deep water turns you back; slide along the bank)
    if (!deepWater(ox, u.z)) u.x = ox; else if (!deepWater(u.x, oz)) u.z = oz;
    else if (!deepWater(ox, oz)) { u.x = ox; u.z = oz; }
    else for (let r = 1.5; r < 9; r += 1.5) { let k = 0; for (; k < 8; k++) { const a = k / 8 * Math.PI * 2, x = u.x + Math.cos(a) * r, z = u.z + Math.sin(a) * r; if (!deepWater(x, z)) { u.x = x; u.z = z; break; } } if (k < 8) break; } // (knocked in: out onto the nearest bank)
  }
  if (G.map.id === 'river') {
    if (inRiver(u.x, u.z) && !onBridge(u.x) && Math.abs(u.x) >= 14) u.z = (pz >= 0 ? 1 : -1) * 5.05;
    if (Math.abs(u.z) < 5 && onBridge(u.x) && Math.abs(u.x) > 20) { const bx = u.x < 0 ? -32 : 32; u.x = clamp(u.x, bx - 2.1, bx + 2.1); }
  }
  if (G.duels && G.duels.length) duelBounds(u);
  u.x = clamp(u.x, -W.R + 3, W.R - 3); u.z = clamp(u.z, -W.R + 3, W.R - 3);
  u.y = groundY(u.x, u.z) + (u.jy || 0);
}
// After the whistle: the winners stay put (the renderer has them celebrating) and everyone else
// legs it away from the nearest winner. Runs on the solo/host game; clients follow its snapshots.
export function endStep(dt) {
  const w = G.endInfo ? G.endInfo.w : -1;
  for (const u of G.units) {
    if (u.dead) { fallStep(u, dt); continue; }
    if (u.remote) continue;
    const lose = w >= 0 && G.ALLY[colorOf(u.ti)] !== w;
    if (lose) {
      let best = null, bd = 1e9;
      for (const o of G.units) { if (o.dead || G.ALLY[colorOf(o.ti)] !== w) continue; const d = Math.hypot(o.x - u.x, o.z - u.z); if (d < bd) { bd = d; best = o; } }
      const dx = best ? u.x - best.x : u.x, dz = best ? u.z - best.z : u.z, d = Math.hypot(dx, dz) || 1;
      moveToward(u, u.x + dx / d * 4, u.z + dz / d * 4, u.spd * 1.15, dt); faceTo(u, u.x + dx, u.z + dz, dt, 8);
    } else moveToward(u, u.x, u.z, 0, dt);
    integrate(u, dt, u.z);
  }
}
export function fallStep(u, dt) {
  if (u.fz > 0) { u.fz -= dt; return; } // (F6: cut down, he hangs there for the beat of the blow, then falls)
  u.deadT += dt;
  u.x += u.vx * dt; u.z += u.vz * dt; u.vy -= 18 * dt;
  const gy = groundY(u.x, u.z), ny = u.y + u.vy * dt;
  if (u.chasmGone && ny <= gy) { u.y = gy - 3; u.deadT = 1e3; return; } // (F7: the chasm's floor: no body left lying there)
  if (ny <= gy && u.vy < -5) { u.vy = -u.vy * .38; u.y = gy; u.bounces = (u.bounces || 0) + 1; if (u.launch) bus.emit('sfx', { name: 'thump', x: u.x, z: u.z }); }
  else if (ny <= gy) { u.y = gy; u.vy = 0; } // (F5: down and at rest. Before, the fall speed kept building on the ground and he hopped 10 cm every half second)
  else u.y = ny;
  const air = u.y > gy + .05, f = Math.pow(air ? .7 : .03, dt); u.vx *= f; u.vz *= f;
}
