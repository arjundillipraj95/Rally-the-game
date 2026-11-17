// Battle rules: CASTLE2 a castle's level III, while it is held: the ballista on its keep and the spike ditch round its
// wall (the watchtower's far vision is in bush.js). All three come with the third Fortify and go with the castle.
import { CASTLE26 } from '../../config.js';
import { G, activeArmies } from '../state.js';
import { groundY } from '../world.js';
import { sound } from './util.js';
import { nearestFoe } from './melee.js';
import { makeArrow } from './missiles.js';
import { allianceOf } from './holds.js';
import { die } from './score.js';

// the castles at level III now: [wall, hold]
export function level3() {
  const out = []; for (const cw of (G.layout && G.layout.cwalls) || []) { const st = G.cgates && G.cgates[cw.hid], h = G.holds && G.holds[cw.hid];
    if (st && (st.lv | 0) >= 3 && h && h.owner >= 0) out.push([cw, h, st]); }
  return out;
}
// the castle whose ditch man u stands in, if he is that castle's enemy
export function ditchOf(u) {
  if (!G.cgates || u.dead) return null; const w = CASTLE26.ditch.w;
  for (const cw of (G.layout && G.layout.cwalls) || []) {
    const st = G.cgates[cw.hid]; if (!st || (st.lv | 0) < 3) continue;
    const h = G.holds[cw.hid]; if (!h || h.owner < 0 || allianceOf(u.ti) === h.owner) continue;
    const d = Math.hypot(u.x - cw.x, u.z - cw.z); if (d > cw.r + .4 && d < cw.r + w) return cw;
  }
  return null;
}
export const ditchSlow = u => (ditchOf(u) ? CASTLE26.ditch.slow : 1);
// host: the ballistas shoot and the ditches bite
export function castle3Tick(dt) {
  if (G.role === 'client') return;
  const B = CASTLE26.ballista;
  for (const [cw, h, st] of level3()) {
    st.balT = (st.balT ?? B.every * .5) - dt; if (st.balT > 0) continue;
    const ti = activeArmies().find(i => allianceOf(i) === h.owner); if (ti == null) { st.balT = 1; continue; }
    const [e] = nearestFoe({ x: cw.x, z: cw.z, ti }, B.range); if (!e) { st.balT = .5; continue; }
    st.balT = B.every; bolt(cw, ti, e);
  }
  const D = CASTLE26.ditch;
  for (const u of G.units) { if (u.dead || u.rest || u.inSafe || !ditchOf(u)) continue;
    u.hp -= D.dmg * dt; u.lastHit = G.T; if (u.hp <= 0) { u.cause = 'ditch'; die(u, null, 0); } }
}
// a ballista bolt from the keep's top: flat and fast; shields don't stop it (missiles.js arrowHit)
function bolt(cw, ti, e) {
  const y0 = groundY(cw.x, cw.z) + 8.7, d0 = Math.hypot(e.x - cw.x, e.z - cw.z), lead = d0 / 45;
  const tx = e.x + (e.vx || 0) * lead, tz = e.z + (e.vz || 0) * lead, ux = (tx - cw.x) / (d0 || 1), uz = (tz - cw.z) / (d0 || 1);
  const x0 = cw.x + ux * 3.2, z0 = cw.z + uz * 3.2, d = Math.hypot(tx - x0, tz - z0); // (from the keep's rim: clear of its own stones)
  G.arrows.push(makeArrow({ id: ++G.arrowN, x0, y0, z0, x1: tx, z1: tz, y1: groundY(tx, tz) + 1.1, dur: .12 + d / 45, peak: Math.min(1.5, d * .04), ti, t: 0, shooter: { x: cw.x, z: cw.z, ti, tower: true }, javelin: true, jd: CASTLE26.ballista.dmg, bolt: true }));
  sound('bow', cw.x, cw.z);
}
