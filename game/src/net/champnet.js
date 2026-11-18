// (C1c) your champion's special attacks and ult from the buttons: fired here (solo, host) or sent to the host (a joined
// phone: a count per slot and where it aimed). Added to the shared actions (net/netgame.js).
import { LEVELS } from '../config.js';
import { G } from '../core/state.js';
import { SLOTS, blocked, cdLeft, slotDef, useAbility } from '../core/sim/abilities.js';
import { aimOf } from '../champions/blocks.js';
import { actions, C } from './netgame.js';
import { isClient } from './session.js';
import { floatText } from '../render/effects.js';

const r2 = v => Math.round(v * 100) / 100;
// can it fire now? if not, says why over your captain (C3l: asked on the press, before any aiming)
actions.abilityReady = k => {
  const p = G.player, slot = SLOTS[k]; if (G.state !== 'play' || !p || p.dead || !slot) return false;
  let why = blocked(G.myTi, slot); if (why === 'down' && isClient()) why = ''; // (a joined phone's own captain is G.player)
  if (why === 'level') floatText(p.x, p.y + 3.2, p.z, `Opens at level ${LEVELS.unlock[slot]}`, '#fff');
  if (why === 'cd') floatText(p.x, p.y + 3.2, p.z, `${Math.ceil(cdLeft(G.myTi, slot))} s`, '#fff');
  return !why;
};
actions.ability = (k, aim) => { // aim: where you dragged (C3l), or nothing for the usual aim
  const p = G.player, slot = SLOTS[k]; if (!actions.abilityReady(k)) return;
  if (isClient()) {
    const d = slotDef(G.myTi, slot), at = aim || aimOf(p, d), s = G.teams[G.myTi];
    C.inp.ab[k]++; C.inp.abAt[k] = [r2(at.x), r2(at.z)]; C.sendNow = true;
    (s.cds || (s.cds = {}))[slot] = d.cd || 0; // (shown at once; the host's count follows)
    return;
  }
  useAbility(G.myTi, slot, aim);
};
