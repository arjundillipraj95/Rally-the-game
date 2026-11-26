// Battle rules: CASTLE9 computer champions and the new castles (the mountain). They fortify a castle of theirs they stand
// in (straight away, before anything else they'd buy), make the trip to fortify one nearby when it is low and they can
// pay, count an attack alert as a castle in danger, go for an enemy nexus once it is open, and don't walk into a
// fortified castle's arrows without soldiers to soak them.
import { CASTLE26 } from '../../config.js';
import { G, colorOf } from '../state.js';
import { allianceOf } from './holds.js';
import { castleHere, needsRepair } from './forts.js';
import { upgradeCost, buyUpgrade } from './army.js';
import { squadOf } from './match.js';
import { nexusOpen } from './nexus.js';
import { circleAt } from './capture.js';
import { underAttack } from './respawn.js';

const A = () => CASTLE26.ai;
// (step.js, every few seconds a bot thinks of buying) fortify the castle he stands in first
export function botFortify(i, s) {
  if (!G.c2 || !s.leader || s.leader.dead || !castleHere(i)) return false;
  const c = upgradeCost(i, 'fort'); if (c == null || s.gold < c) return false;
  return buyUpgrade(i, 'fort');
}
// (holds.js holdPlan) a plan the new castles call for, or null: an open enemy nexus near, a castle of his to fortify
export function castlePlan(u, s) {
  if (!G.c2) return null; const a = allianceOf(u.ti), d = (x, z) => Math.hypot(x - u.x, z - u.z);
  for (const b of G.c2.breaks) if (b.kind === 'nexus' && nexusOpen(b, u) && d(b.x, b.z) < A().nexusR && squadOf(u.ti).length >= A().minMen) return { kind: 'spot', x: b.x, z: b.z, stop: b.r + 1, nexus: b.c };
  const lv = h => (G.cgates[h.id] && G.cgates[h.id].lv) | 0;
  const cwOf = h => G.layout.cwalls.find(c => c.hid === h.id), mend = h => lv(h) >= 3 && cwOf(h) && needsRepair(cwOf(h), G.cgates[h.id]); // (CASTLE11: Repair at III)
  const mine = (G.holds || []).filter(h => h.kind === 'castle' && h.owner === a && (lv(h) < 3 || mend(h)) && d(h.x, h.z) < A().fortR && !underAttack(h));
  for (const h of mine.sort((p, q) => lv(p) - lv(q))) { const c = lv(h) < 3 ? CASTLE26.fortCost[lv(h)] : CASTLE26.repair.cost; if (c != null && s.gold >= c + A().fortSpare) { const ci = circleAt(h); return { kind: 'spot', x: ci.x, z: ci.z, stop: 2, fort: h.id }; } }
  return null;
}
// (holds.js) a castle worth defending: its circle filling, contested, or an alert lately
export const castleThreat = h => h.contested || h.cap >= 0 || (G.c2 && G.T - (h.alertT ?? -99) < A().alertT);
// (holds.js) a fortified enemy castle is a target only with soldiers to soak its arrows
export const castleReady = (u, h) => !G.c2 || h.kind !== 'castle' || h.owner < 0 || !((G.cgates[h.id] && G.cgates[h.id].lv) | 0) || squadOf(u.ti).length >= A().minMen;
