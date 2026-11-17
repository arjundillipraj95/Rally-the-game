// The champions (C1): one page each in this folder, listed here. G.champs[ti] is each army's champion id, the same
// on every phone (the host sends it). Yours is the setting (localStorage 'rally-champ') or ?champ=; bots play
// CHAMP.bot, or ?botchamp= (tests).
import { CHAMP } from '../config.js';
import { G, ARMIES } from '../core/state.js';
import legionary from './legionary.js';
import titus from './titus.js';

export const CHAMPS = { legionary, titus };
// (tests) extra champions a test page sets up before the game loads: window.__champs = [{ id, ... }], dev only
try { if (import.meta.env.DEV && typeof window !== 'undefined' && Array.isArray(window.__champs)) for (const d of window.__champs) CHAMPS[d.id] = d; } catch (e) { /* none */ }
export const CHAMP_IDS = Object.keys(CHAMPS);
export const champDef = id => CHAMPS[id] || CHAMPS[CHAMP.def];
export const champOf = ti => champDef(G.champs && G.champs[ti]);
const okId = id => (id && CHAMPS[id] ? id : null);
const q = k => { try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; } };

export function myChamp() {
  let s = null; try { s = localStorage.getItem('rally-champ'); } catch (e) { /* none */ }
  return okId(q('champ')) || okId(s) || CHAMP.def;
}
export function setMyChamp(id) { if (!okId(id)) return; try { localStorage.setItem('rally-champ', id); } catch (e) { /* none */ } }
export const botChamp = () => okId(q('botchamp')) || CHAMP.bot;
// every army's champion: chosen[ti] where a player chose one, the bots' champion elsewhere
export function assignChamps(chosen = {}) {
  const b = botChamp(); G.champs = Array.from({ length: ARMIES }, (_, i) => okId(chosen[i]) || b); return G.champs;
}
// on the wire: one character an army, its place in CHAMP_IDS (base 36)
export const champCode = () => (G.champs || []).map(id => Math.max(0, CHAMP_IDS.indexOf(id)).toString(36)).join('');
export function champsFrom(code) { const a = String(code || ''); G.champs = Array.from({ length: ARMIES }, (_, i) => CHAMP_IDS[parseInt(a[i] || 'z', 36)] || CHAMP.def); }
