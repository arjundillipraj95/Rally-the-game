// Battle rules: CASTLE3 a castle shoots like a League turret. One target a castle (st.tg), picked by turretTarget:
// an enemy champion who has just hit a champion of the castle's side inside its range (aggro), else the man it is
// already shooting (it sticks), else the nearest enemy soldier, else the nearest enemy champion. Shots on the same
// champion ramp up volley by volley. Turret shots don't miss on a shield and don't roll for the head (missiles.js).
import { CASTLE26 } from '../../config.js';
import { G } from '../state.js';
import { makeArrow } from './missiles.js';
import { allianceOf } from './holds.js';
import { bushHid } from './bush.js';
import { groundY } from '../world.js';
import { sound } from './util.js';

const T = () => CASTLE26.turret;
const inRange = (cw, u) => Math.hypot(u.x - cw.x, u.z - cw.z) < T().range;
// can the castle (held by alliance a) shoot man u?
const shootable = (cw, a, u) => !u.dead && !u.neutral && !u.inSafe && !u.rest && allianceOf(u.ti) !== a && allianceOf(u.ti) >= 0 && inRange(cw, u) && !bushHid(u, a);
export function turretTarget(cw, h, st) {
  const a = h.owner, now = G.T; let aggro = null, soldier = null, champ = null, ds = 1e9, dc = 1e9, da = 1e9;
  for (const u of G.units) { if (!shootable(cw, a, u)) continue; const d = Math.hypot(u.x - cw.x, u.z - cw.z);
    if (u.leader) { if (now - (u.champHitT ?? -99) < T().aggro && u.champHitA === a && d < da) { da = d; aggro = u; } if (d < dc) { dc = d; champ = u; } }
    else if (d < ds) { ds = d; soldier = u; } }
  if (aggro) return aggro;
  const cur = st.tg != null && G.units.find(u => u.id === st.tg); if (cur && shootable(cw, a, cur)) return cur;
  return soldier || champ;
}
// one volley's damage on man e (a champion: ramps while it stays on him) and the bookkeeping
export function volleyOn(st, e) {
  if (e.id !== st.tg) st.rampN = 0; else if (e.leader) st.rampN = (st.rampN | 0) + 1;
  st.tg = e.id; st.tgT = G.T;
  return e.leader ? 1 + Math.min(T().rampMax, T().rampStep * (st.rampN | 0)) : 1;
}
// a turret's missile from (x, y, z): an arrow (the wall archers) or a bolt (the ballista)
export function turretShot(x, y, z, ti, e, dmg, bolt = false, cw = null) {
  const d = Math.hypot(e.x - x, e.z - z), sp = bolt ? 45 : 32, lead = d / sp, tx = e.x + (e.vx || 0) * lead, tz = e.z + (e.vz || 0) * lead;
  G.arrows.push(makeArrow({ id: ++G.arrowN, x0: x, y0: y, z0: z, x1: tx, z1: tz, y1: groundY(tx, tz) + 1.1, dur: .12 + d / sp, peak: Math.min(bolt ? 1.5 : 3, d * (bolt ? .04 : .1)), ti, t: 0,
    shooter: { x, z, ti, tower: true }, turret: true, javelin: bolt, bolt, jd: dmg, plunge: true, home: cw ? { x: cw.x, z: cw.z, r2: (cw.r + 1.2) ** 2 } : null }));
  sound('bow', x, z);
}
// (for the hit code) a champion's blow or arrow on a champion: the turrets of the victim's side take note
export function champHit(a, b) { if (a && b && a.leader && b.leader && a.ti !== b.ti) { a.champHitT = G.T; a.champHitA = allianceOf(b.ti); } }
