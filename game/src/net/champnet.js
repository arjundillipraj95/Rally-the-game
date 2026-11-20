// (C1c) your champion's special attacks and ult from the buttons: fired here (solo, host) or sent to the host (a joined
// phone: a count per slot and where it aimed). Added to the shared actions (net/netgame.js).
import { LEVELS } from '../config.js';
import { G } from '../core/state.js';
import { SLOTS, blocked, cdLeft, slotDef, useAbility } from '../core/sim/abilities.js';
import { aimOf } from '../champions/blocks.js';
import { actions, C } from './netgame.js';
import { isClient } from './session.js';
import { floatText } from '../render/effects.js';
import { pierceInput } from '../core/sim/deviShots.js';

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
// (FIX9) a special drawn while held (Piercing shot): drawn on the press toward its usual aim, aimed by the drag, loosed on
// the let-go (or put away: slid back onto the button). Her own phone keeps `pdraw` (her slow walk, the line); the host
// draws it (a joined phone sends its thumb: pc = [held 1 / let go 0 / put away 2, aim x, aim z]).
actions.chargeOf = k => { const d = slotDef(G.myTi, SLOTS[k]); return !!(d && d.charge); };
const sendPc = (h, D) => { C.inp.pc = [h, r2(D.ax), r2(D.az)]; C.sendNow = true; };
actions.chargeStart = k => {
  const p = G.player, slot = SLOTS[k]; if (!actions.abilityReady(k)) return false;
  const d = slotDef(G.myTi, slot), at = aimOf(p, d), a = Math.atan2(at.x - p.x, at.z - p.z);
  p.pdraw = { ax: Math.sin(a), az: Math.cos(a), d, T0: performance.now() };
  if (isClient()) { sendPc(1, p.pdraw); C.inp.ab[k]++; C.inp.abAt[k] = [r2(at.x), r2(at.z)]; const s = G.teams[G.myTi]; (s.cds || (s.cds = {}))[slot] = d.cd || 0; }
  else useAbility(G.myTi, slot, at);
  return true;
};
actions.chargeAim = a => {
  const p = G.player, D = p && p.pdraw; if (!D) return; D.ax = Math.sin(a); D.az = Math.cos(a);
  if (isClient()) { C.inp.pc = [1, r2(D.ax), r2(D.az)]; } else pierceInput(p, 1, D.ax, D.az);
};
actions.chargeEnd = cancel => {
  const p = G.player, D = p && p.pdraw; if (!D) return; p.pdraw = null;
  if (isClient()) { sendPc(cancel ? 2 : 0, D); if (cancel) { const s = G.teams[G.myTi]; (s.cds || (s.cds = {})).sp1 = D.d.cancelCd; } }
  else pierceInput(p, cancel ? 2 : 0, D.ax, D.az);
};
