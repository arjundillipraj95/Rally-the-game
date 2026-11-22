// The champions (C1): one page each in this folder, listed here. G.champs[ti] is each army's champion id, the same
// on every phone (the host sends it). Yours is the setting (localStorage 'rally-champ') or ?champ=; computers pick
// (assignChamps, BOT1), or ?botchamp= (tests).
import { CHAMP, ROSTER, ROSTER_FREE_WEEK } from '../config.js';
import { G, ARMIES, colorOf } from '../core/state.js';
import legionary from './legionary.js';
import titus from './titus.js';
import devi from './devi.js';
import sigrun from './sigrun.js';

export const CHAMPS = { legionary, titus, devi, sigrun }; // (wire codes: a champion's place here, so new ones go last)
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
// (MENU2/4) the roster, what you own, your main and backup. Your main is myChamp(): the home screen, the lobby's
// first highlight, training and bot games. Owned: a free champion whose page exists, or one in ROSTER_OWNED / bought.
const ls = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); } catch (e) { /* none */ } } };
export const rosterOf = id => ROSTER.find(r => r.id === id) || (CHAMPS[id] ? { id, name: CHAMPS[id].name, culture: CHAMPS[id].origin, cls: CHAMPS[id].cls, launch: 'free' } : null);
export const playable = id => !!(CHAMPS[id] && rosterOf(id)); // (his page is in: he can be played)
export const freeWeek = id => ROSTER_FREE_WEEK.includes(id);
export function owned(id) { if (!playable(id)) return false; const r = rosterOf(id); return r.launch === 'free' || (ls.get('rally-owned') || '').split(',').includes(id); }
export const ownedIds = () => ROSTER.map(r => r.id).filter(owned);
export const myBackup = () => { const b = okId(ls.get('rally-backup')); return b && owned(b) && b !== myChamp() ? b : null; };
let onPick = null; export const onMainChange = f => { onPick = f; }; // (the home stage redraws; the online service keeps it on the account)
export function setMain(id) { if (!owned(id)) return false; if (myBackup() === id) ls.set('rally-backup', myChamp()); setMyChamp(id); if (onPick) onPick(); return true; }
export function setBackup(id) { if (id && (!owned(id) || id === myChamp())) return false; ls.set('rally-backup', id || null); if (onPick) onPick(); return true; }
// the account's choice wins when you sign in (another phone may have changed it)
export function fromAccount(main, backup) { if (okId(main) && owned(main)) setMyChamp(main); if (backup !== undefined) ls.set('rally-backup', okId(backup) && owned(backup) ? backup : null); }
export const botChamp = () => okId(q('botchamp')) || null;
// (BOT1, Arjun 21 Nov) a computer army picks like a player would: first a class its team (colorOf) still lacks, then a
// champion its team doesn't have yet, else any, at random among the playable ones. (C5) One champion a team: a
// computer never takes one its team already has while another is free. ?botchamp= forces one (tests).
const pool = () => CHAMP_IDS.filter(id => playable(id) && id !== 'legionary');
function botPick(team, rnd) {
  const have = team.filter(Boolean), all = pool(), P = all.filter(id => !have.includes(id)).length ? all.filter(id => !have.includes(id)) : all; if (!P.length) return CHAMP.def;
  const cls = new Set(have.map(id => CHAMPS[id].cls));
  const score = id => (cls.has(CHAMPS[id].cls) ? 0 : 2) + (have.includes(id) ? 0 : 1);
  const best = Math.max(...P.map(score)), top = P.filter(id => score(id) === best);
  return top[Math.floor(rnd() * top.length)];
}
// every army's champion: chosen[ti] where a player chose one, a computer's pick elsewhere (the host's, sent to all)
export function assignChamps(chosen = {}, rnd = Math.random) {
  const f = botChamp(), c = Array.from({ length: ARMIES }, (_, i) => okId(chosen[i]) || f);
  const open = c.map((id, i) => (id ? -1 : i)).filter(i => i >= 0);
  for (let k = open.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [open[k], open[j]] = [open[j], open[k]]; } // (in a random order)
  for (const i of open) c[i] = botPick(c.filter((id, j) => j !== i && colorOf(j) === colorOf(i)), rnd);
  G.champs = c; return G.champs;
}
// on the wire: one character an army, its place in CHAMP_IDS (base 36)
export const champCode = () => (G.champs || []).map(id => Math.max(0, CHAMP_IDS.indexOf(id)).toString(36)).join('');
export function champsFrom(code) { const a = String(code || ''); G.champs = Array.from({ length: ARMIES }, (_, i) => CHAMP_IDS[parseInt(a[i] || 'z', 36)] || CHAMP.def); }
