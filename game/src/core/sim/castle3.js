// Battle rules: CASTLE2 a castle's level III, while it is held: the ballista on its keep and the spike ditch round its
// wall (the watchtower's far vision is in bush.js). All three come with the third Fortify and go with the castle.
import { CASTLE26 } from '../../config.js';
import { G, activeArmies } from '../state.js';
import { groundY } from '../world.js';
import { turretTarget, turretShot, volleyOn } from './turret.js';
import { allianceOf } from './holds.js';
import { die } from './score.js';
import { gateBroken } from './forts.js';

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
    if (gateBroken(cw, st)) { st.balT = B.every * .5; continue; } // (CASTLE11: a gate broken: the ballista is down)
    st.balT = (st.balT ?? B.every * .5) - dt; if (st.balT > 0) continue;
    const ti = activeArmies().find(i => allianceOf(i) === h.owner); if (ti == null) { st.balT = 1; continue; }
    const e = turretTarget(cw, h, st); if (!e) { st.balT = .5; continue; } // (CASTLE3: the castle's one target)
    st.balT = B.every; const m = volleyOn(st, e), x = cw.x + (e.x - cw.x) / (Math.hypot(e.x - cw.x, e.z - cw.z) || 1) * 3.2, z = cw.z + (e.z - cw.z) / (Math.hypot(e.x - cw.x, e.z - cw.z) || 1) * 3.2;
    turretShot(x, groundY(cw.x, cw.z) + 8.7, z, ti, e, (e.leader ? B.champ : B.dmg) * m, true, cw); // (from the keep's rim: clear of its own stones)
  }
  const D = CASTLE26.ditch;
  for (const u of G.units) { if (u.dead || u.rest || u.inSafe || !ditchOf(u)) continue;
    u.hp -= D.dmg * dt; u.lastHit = G.T; if (u.hp <= 0) { u.cause = 'ditch'; die(u, null, 0); } }
}
