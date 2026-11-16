// The app's shared bits: $ for elements, S (values several app files change), first page setup,
// the solo team picks, the veil, captains' names, the dev no-intro switch.
import { G, botName } from '../core/state.js';
import { sfx } from '../ui/audio.js';
import { session, prefs } from '../net/session.js';

export const S = {}; // (SPLIT) values several app files change: pause, hit-stop and slow motion, the solo picks, the intro, the battle format
export const $ = id => document.getElementById(id);
{ const nj = $('nojs'); if (nj) nj.remove(); }
// a soft click on any menu/lobby button tap, never the in-battle HUD buttons (those have their own sfx)
document.addEventListener('pointerdown', e => {
  const b = e.target.closest && e.target.closest('.overlay button, .overlay .seat, .overlay .duotog, .overlay .alchip');
  if (b) sfx.uiClick();
}, true);
// stop iOS pinch and double-tap zoom
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('gesturechange', e => e.preventDefault());
let lastTouchEnd = 0;
document.addEventListener('touchend', e => { const n = Date.now(); if (n - lastTouchEnd < 300 && !(e.target.closest && e.target.closest('input'))) e.preventDefault(); lastTouchEnd = n; }, { passive: false });

const params = new URLSearchParams(location.search);
if (params.get('stress') === '1') G.fullSquads = true; // every team starts with a full squad of 20
// the home page's team setup, as in the multiplayer lobby: each colour's team, and its Duo/Trio
S.soloAl = (() => { try { const v = JSON.parse(localStorage.getItem('rally-solo-al')); if (Array.isArray(v) && v.length === 4 && v.every(x => x >= 0 && x < 4)) return v.map(Number); } catch (e) {} return [0, 1, 1, 0]; })();
export const saveSoloAl = () => { try { localStorage.setItem('rally-solo-al', JSON.stringify(S.soloAl)); } catch (e) {} };
export const devNoIntro = () => import.meta.env.DEV && window.__testSheet !== undefined && !window.__keepIntro;
// Teams, as in the multiplayer lobby: tap a colour to be it, its letter chip cycles its team, its
// Duo chip adds a computer co-captain (tap again for a third: Trio). Remembered between visits.
export const soloDuo = [0, 0, 0, 0];
export function resetSolo() { G.role = 'solo'; G.myTi = prefs.color; G.ALLY = S.soloAl.slice(); }
// Building a battlefield takes a moment on a slow phone. Show "Mustering the troops" the instant a
// start button is touched (a tap spans a frame or two before it becomes a click, so this gets drawn
// before the work begins), and lift it once the battle's first frame is on screen.
let veilT = 0;
export function showVeil() { $('veil').hidden = false; clearTimeout(veilT); veilT = setTimeout(hideVeil, 5000); }
export function hideVeil() { clearTimeout(veilT); $('veil').hidden = true; }
export function nickFor(ti) { const n = playerNick(ti); if (n) return n; const t = G.teams && G.teams[ti]; return t && !t.human && t.active !== false ? botName(ti) : null; } // (players by their nickname, computer captains by theirs)
function playerNick(ti) {
  const NET = session.NET; if (!NET) return null;
  const peers = NET.room.peers();
  const seats = NET.role === 'host' ? NET.seats : ((peers.find(p => p.peer === NET.hostPeer) || {}).presence || {}).seats || {};
  const peer = Object.keys(seats).find(k => seats[k] === ti); if (!peer) return null;
  const p = peers.find(x => x.peer === peer) || (peer === 'me' && NET.role === 'client' ? peers.find(x => x.peer === NET.hostPeer) : null); // (an older host's own seat, kept under a stand-in name)
  return p && p.presence && p.presence.nick ? String(p.presence.nick).slice(0, 16) : null;
}
