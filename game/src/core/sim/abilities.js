// Battle rules: C1c a champion's ability slots: special attack 1 and 2, the champion ult, the army ult. Each is on
// his page (champions/), opens at its level (LEVELS.unlock) and recharges on its own clock, kept by his army (it
// runs while he is down). The army ult fires from the rally horn when it is full (army.js rallyCry); the others
// from their buttons, a joined phone's presses and the bots. From the saddle a special drops him to his feet first,
// unless it is a mounted one (def.mounted). Locked in a duel: a duel is the basic attack's.
import { LEVELS } from '../../config.js';
import { G } from '../state.js';
import { champOf } from '../../champions/index.js';
import { levelOf } from '../../champions/stats.js';
import * as B from '../../champions/blocks.js';
import { dismount, rallyCry } from './army.js';
import { say } from './util.js';
import { dropScutum } from './scutum.js';

export const SLOTS = ['sp1', 'sp2', 'ult', 'armyUlt'];
export const slotDef = (ti, slot) => champOf(ti)[slot] || null;
const cds = ti => { const s = G.teams[ti]; return s ? (s.cds || (s.cds = { sp1: 0, sp2: 0, ult: 0, armyUlt: 0 })) : null; };
export const cdLeft = (ti, slot) => { const c = cds(ti); return c ? Math.max(0, c[slot] || 0) : 0; };
export const unlocked = (ti, slot) => levelOf(ti) >= LEVELS.unlock[slot];
// why a slot can't fire now ('' when it can): none, level, cd, down, busy
export function blocked(ti, slot) {
  const d = slotDef(ti, slot), s = G.teams[ti], u = s && s.leader;
  if (!d) return 'none'; if (!unlocked(ti, slot)) return 'level'; { const v = u || (ti === G.myTi ? G.player : null); if (d.toggle && v && v.scutum && !v.dead) return ''; } if (slot !== 'armyUlt' && cdLeft(ti, slot) > 0) return 'cd'; // (C3c: tap again drops it)
  if (!u || u.dead) return 'down';
  if (u.eagle || u.pounce || u.spin || u.ram || u.stun > 0 || u.carrying || u.duelId || u.execT > 0 || u.execV || u.flood || (u.mounted && d.needFoot)) return 'busy';
  return '';
}
// fire a slot (host and solo): aim is { x, z } on the ground, or none (his facing / the nearest foe in range)
export function useAbility(ti, slot, aim) {
  if (G.role === 'client' || blocked(ti, slot)) return false;
  const d = slotDef(ti, slot), u = G.teams[ti].leader;
  if (d.toggle && u.scutum) { dropScutum(u, 'tap'); return true; } // (C3c: tapped again)
  if (u.scutum) dropScutum(u, 'other'); // (another ability: the shield comes down first)
  if (u.mounted && !d.mounted) dismount(u, false);
  const at = aim && Number.isFinite(aim.x) ? aim : B.aimOf(u, d);
  u.face = Math.atan2(at.x - u.x, at.z - u.z);
  d.run(u, at, B);
  if (slot !== 'armyUlt') cds(ti)[slot] = (d.cd || 0) + (d.toggle ? d.up || 0 : 0); // (C3c: a raised shield's recharge counts from when it drops)
  u.atkT = G.T; // (MAP5: seen once he strikes)
  say('ability', ti, SLOTS.indexOf(slot)); // (every phone: its sound and name)
  return true;
}
// the army ult, from a full horn (army.js rallyCry): true when his champion has one and fired it
export function useArmyUlt(ti, at) { return !!slotDef(ti, 'armyUlt') && unlocked(ti, 'armyUlt') && useAbility(ti, 'armyUlt', at); }
export function abilityTick(dt) {
  if (G.role === 'client') return;
  G.teams.forEach((s, ti) => { if (!s.active || !s.cds) return; for (const k of SLOTS) if (s.cds[k] > 0) s.cds[k] -= dt; });
}
// a computer champion: each slot that is ready, when its page says this is the moment (def.ai), else when an enemy
// champion is within its range, or three enemies
export function aiAbilities(u, foe, fd) {
  if (!foe || G.role === 'client') return false;
  { const s = G.teams[u.ti], d = slotDef(u.ti, 'armyUlt'); // (C3e: his army ult from a full horn, when its page says so)
    if (d && (s.rally || 0) >= 100 && unlocked(u.ti, 'armyUlt') && Math.random() < .3 && (!d.ai || d.ai(u, foe, fd, B)) && rallyCry(u.ti)) return true; }
  for (const slot of ['ult', 'sp2', 'sp1']) {
    if (blocked(u.ti, slot)) continue;
    const d = slotDef(u.ti, slot), want = d.ai ? d.ai(u, foe, fd, B) : foe.leader ? fd < (d.range || 6) : B.circle(u, u.x, u.z, d.range || 6).length >= 3;
    if (want && Math.random() < .5 && useAbility(u.ti, slot, want.x != null ? want : { x: foe.x, z: foe.z })) return true; // (a page's ai may name its own aim: { x, z })
  }
  return false;
}
