// C5 build (Arjun 23 Nov): an order to attack a gate, wall or watchtower (a building focus) makes a melee soldier walk up
// and hit only that building, as archers already shoot only it (archsiege.js archerFocus). Men near him still come first.
import { G } from '../state.js';
import { speedOf } from './army.js';
import { startSwing } from './melee.js';
import { go, moveToward } from './move.js';
import { wallInRange } from './ranged.js';
import { structureInRange } from './ranged.js';
import { c2BreakInReach } from './crown2.js';
import { towerInReach, wallInReach } from './forts.js';

// the building the focus point is on (a gate or wall first, else a watchtower): the same finder archers use
const bldAt = (u, x, z) => { const q = { x, z, ti: u.ti, r: 0, reach: 0, kind: u.kind }, w = wallInRange(q, 4, -99); return w ? { bld: w, x: w.x, z: w.z, r: w.r || 1 } : structureInRange(q, 4); };

// soldiers who hit structures when nobody is close: footmen, swordsmen, riders, archers (step.js uses this too)
export const hitsBuildings = u => !u.leader && (u.kind === 'foot' || u.kind === 'sword' || u.kind === 'cav' || u.kind === 'arch');

// a melee soldier's blow on the nexus or the chest, in reach (the crown2 breaks)
export const breakNear = u => (G.c2 ? c2BreakInReach(u) : null);

// true when this melee soldier is on a building focus (he's handled); false otherwise
export function meleeFocus(u, s, dt) {
  const f = s.focus; if (!f || f.id) return false;
  if (!u.mfT || G.T > u.mfT) { u.mfT = G.T + .5; u.mf = bldAt(u, f.x, f.z); }
  if (!u.mf && G.c2) { const b = G.c2.breaks.find(k => !k.post && k.hp > 0 && Math.hypot(k.x - f.x, k.z - f.z) < (k.r || 1) + 4); if (b) { // (C5: the nexus or the chest)
    const d = Math.hypot(b.x - u.x, b.z - u.z) - (b.r || 1); if (d > 1.7) { go(u, b.x, b.z, speedOf(u), dt, 1.2); return true; }
    u.face = Math.atan2(b.x - u.x, b.z - u.z); moveToward(u, u.x, u.z, 0, dt); if (u.cd <= 0) startSwing(u, { brk: b }); return true; } }
  const tg = u.mf; if (!tg || !tg.bld) return false;
  const d = Math.hypot(tg.x - u.x, tg.z - u.z) - (tg.r || 1);
  if (d > 1.7) { go(u, tg.x, tg.z, speedOf(u), dt, 1.2); return true; }
  u.face = Math.atan2(tg.x - u.x, tg.z - u.z); moveToward(u, u.x, u.z, 0, dt);
  if (u.cd <= 0) startSwing(u, tg.bld.pal ? { wall: tg.bld } : { tower: tg.bld });
  return true;
}

// a horseback champion's strike with no man close (C5 build): the gate, wall, watchtower, nexus or chest in reach, or null
export function structureSwing(u) {
  const w = wallInReach(u, 2.2); if (w) return { wall: w };
  const t = towerInReach(u); if (t) return { tower: t };
  const b = breakNear(u); if (b) return { brk: b };
  return null;
}
