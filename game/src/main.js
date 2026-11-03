import * as THREE from 'three';
import { walkable } from './core/nav.js';
// Rally! Boots the game, runs the frame loop and wires the rules to the screen.
// fonts ship with the game (no calls to Google's servers): Latin only, just the weights we use
import '@fontsource/bangers/latin-400.css';
import '@fontsource/barlow-semi-condensed/latin-600.css';
import '@fontsource/barlow-semi-condensed/latin-800.css';
import '@fontsource/barlow-semi-condensed/latin-800-italic.css';
import './style.css';
import { TEAMS, MODES, MAPS, PRESETS, RANKS, CRESTS, QUIPS, TIPS, AL_LETTER, TARGETS, DUEL } from './config.js';
import { G, bus, colorOf, rules, matchTime, modeDesc, activeFrom, targetFor, SLOT_NAME } from './core/state.js';
import { rideRelease, orderVolley, challenge, canChallenge, startMatch, mkUnit, newTeams, update, fallStep, endMatch, auraRange, endStep, setOrder, applyFort } from './core/sim.js';
import { makeLayout, gatePos, groundY } from './core/world.js';
import { buildNav, findPath } from './core/nav.js';
import { renderer, scene, camera, resize, applyPixelRatio, applyShadowQuality, followSun } from './render/scene.js';
import { quality, saveSetting, stepDown, LEVELS } from './render/quality.js';
import { buildWorldView, updateWorldView, grassTime } from './render/world.js';
import { drawSoldiers, drawCalls, clearProps } from './render/soldiers.js';
import { banterTick, clearBanter } from './render/banter.js';
import { initFeed, clearFeed, feedTick } from './ui/feed.js';
import { spawnMeadow, updateMeadow, clearMeadow } from './render/meadow.js';
import { buildReport, renderCaptains, renderAwards, myLine, shareText, clearReport } from './ui/report.js';
import { updateSeeThrough } from './render/seethrough.js';
import { drawVolleyAim } from './ui/volleyaim.js';
import { drawHoldAim, drawJavAim, drawRideAim } from './ui/holdaim.js';
import './ui/fighttips.js';
import { duelTagTick, hideDuelTag } from './ui/dueltag.js';
import { spawnCritters, updateCritters, clearCritters } from './render/critters.js';
import { drawHorses, clearHorses } from './render/horses.js';
import { spark, splat, dust, drawAura, floatText, pow, shockwave, castleFx, effectsTick, drawEffects, clearEffects } from './render/effects.js';
import { drawOverlay, clearOverlay, resizeOverlay } from './render/overlay.js';
import { cam, followCamera, orbitCamera, camTarget, CAM_PITCH } from './render/camera.js';
import { initAudio, sfx, buzz, gateS, startCrowd, stopCrowd, audioTick, audioStats, setMuted, musicCue, setMusic, musicEnabled } from './ui/audio.js';
import { portal, portalInit, onPortal } from './portal.js';
import { showMsg, allyNames } from './ui/messages.js';
import { buildHud, showHud, updateHud, banner, fmt } from './ui/hud.js';
import { bindInput, readMove, trayOpen, upOpen, releaseAll, inp } from './ui/input.js';
import { startTutorial, stopTutorial, tutorialTick, bindTutorial } from './ui/tutorial.js';
import { progress, awardMatch, rankProgress, rankOf, crestUnlocked, setCrest } from './ui/progress.js';
import { session, isClient, isHost, prefs } from './net/session.js';
import { allyFor, describeTeams } from './core/teams.js';
import { assignLooks } from './core/look.js';
import { wardrobe } from './ui/wardrobe.js';
import { actions, netHostReadInputs, netHostTick, netHostSend, clientTick, clientHorses, setNetHooks, C } from './net/netgame.js';
import { bindLobby, showLobby, hostLobbyTick, clientLobbyTick, netLeave } from './net/lobby.js';
import { CAPS_TO_WIN, PARRY, CAPKILL_SLOW } from './config.js';

const $ = id => document.getElementById(id);
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
let soloAl = (() => { try { const v = JSON.parse(localStorage.getItem('rally-solo-al')); if (Array.isArray(v) && v.length === 4 && v.every(x => x >= 0 && x < 4)) return v.map(Number); } catch (e) {} return [0, 1, 1, 0]; })();
const saveSoloAl = () => { try { localStorage.setItem('rally-solo-al', JSON.stringify(soloAl)); } catch (e) {} };

// ---------- presentation listens to the rules ----------
bus.on('msg', m => showMsg(m.k, m.a));
bus.on('spark', d => spark(d.x, d.y, d.z, d.c, d.n));
bus.on('splat', d => { splat(d.x, d.z, d.s, d.ti); dust(d.x, d.z); });
bus.on('float', d => floatText(d.x, d.y, d.z, d.text, d.color));
bus.on('sfx', d => { const f = sfx[d.name]; if (f) f(d.x, d.z); });
bus.on('shake', v => { cam.shake = v; });
// hit-stop: the world freezes for a few frames when your blow lands, so it reads as weight
let hitstop = 0;
bus.on('hitstop', t => { hitstop = Math.max(hitstop, t); });
bus.on('buzz', ms => buzz(ms));
// the big moments of a fight: a parry, a guard smashed open, a rider skewered or knocked off his horse.
// (On the host these come straight from the rules; on a joining player's phone, with the next snapshot.)
const FIGHT_POW = { fxgate: ['', ''], fxridedown: ['', ''], fxarmour: ['', ''], fxpush: ['', ''], fxrhythm: ['', ''], fxvland: ['', ''], fxvcharge: ['', ''], fxbreach: ['', ''], fxdisarm: ['DISARMED!', '#ff8a3a'], fxbash: ['BASH!', '#ffffff'], fxstreak: ['RAMPAGE!', '#ffd23a'], fxduelask: ['', ''], fxduel: ['', ''], fxduelwin: ['', ''], fxdueldraw: ['', ''], fxduelbreak: ['', ''], fxduelno: ['', ''], fxevade: ['EVADED!', '#9fe3ff'], fxback: ['BACKSTAB!', '#ff8a3a'], fxexec: ['EXECUTED!', '#ff3b2e'], fxexecgo: ['', ''], fxcapkill: ['CAPTAIN SLAIN!', '#ffd23a'], fxrally: ['RALLY!', '#ffd23a'], fxrout: ['', ''], fxride: ['', ''], fxjoust: ['JOUSTED!', '#ffd23a'], fxparry: ['PARRY!', '#ffffff'], fxbreak: ['GUARD BROKEN!', '#ff8a3a'], fximpale: ['SKEWERED!', '#ffd23a'], fxunhorse: ['UNHORSED!', '#ffd23a'], fxint: ['STAGGERED!', '#ffd23a'] };
bus.on('fxmsg', d => {
  const u = d.u, me = G.player;
  if (d.k === 'fxopen') { if (u && d.a === me) bus.emit('fighttip', 'shield'); return; } // (your blow knocked his shield aside)
  if (!u || !FIGHT_POW[d.k]) return;
  const near = me && Math.hypot(u.x - me.x, u.z - me.z) < (d.k === 'fxbreach' ? 1e9 : d.k === 'fxrally' || d.k === 'fxrout' || d.k === 'fxcapkill' ? 40 : 22), mine = u === me;
  if (!near && !mine && d.a !== me) return;
  if (d.k === 'fxrally') { // a captain sounds the rally: a ring of gold rolls out from him, and the horn
    pow(u.x, u.y + 3.4, u.z, 'RALLY!', '#ffd23a', 3); shockwave(u.x, u.z, 18, '#ffd23a'); sfx.horn(); if (near || mine) cam.shake = Math.max(cam.shake, .35); if (mine) { buzz(80); musicCue('rally'); }
    return;
  }
  if (d.k === 'fxcapkill') { // a captain cut down by a captain: both of them in slow motion, a drum like thunder
    if (!near && d.a !== me && !mine) return;
    u.slowT = Math.max(u.slowT || 0, CAPKILL_SLOW); if (d.a) d.a.slowT = Math.max(d.a.slowT || 0, CAPKILL_SLOW);
    pow(u.x, u.y + 3.4, u.z, mine ? 'YOU FELL!' : 'CAPTAIN SLAIN!', mine ? '#e0352b' : '#ffd23a', 3); sfx.heavy(u.x, u.z); musicCue(mine ? 'fell' : d.a === me ? 'slain' : 'capdown');
    cam.shake = Math.max(cam.shake, .5); if (d.a === me) buzz(90);
    return;
  }
  if (d.k === 'fxrout') { // an army breaks
    if (near) { pow(u.x, u.y + 3.4, u.z, 'ROUT!', '#e0352b', 3); sfx.heavy(u.x, u.z); }
    const ti = d.ti ?? u.ti; musicCue(ti === G.myTi ? 'routMine' : G.ALLY[ti % 4] !== G.ALLY[G.myTi % 4] ? 'routEnemy' : 'capdown');
    return;
  }
  if (d.k === 'fxbreach') { // a castle's walls give: a burst of dust and fire at it, seen from across the field
    const c = colorOf(d.ti ?? u.ti), [x, z] = TEAMS[c].pos;
    pow(x, groundY(x, z) + 9, z, 'BREACH!', '#e0352b', 3); shockwave(x, z, 26, '#e0352b');
    if (me && Math.hypot(x - me.x, z - me.z) < 60) cam.shake = Math.max(cam.shake, .5);
    return;
  }
  if (d.k === 'fxgate') { // a castle's gate hacked down
    if (!near && !mine) return;
    pow(u.x, u.y + 3.6, u.z, 'GATE BROKEN!', '#ff8a3a', 3); dust(u.x, u.z); sfx.crumble(); cam.shake = Math.max(cam.shake, .4);
    return;
  }
  if (d.k === 'fxridedown') { // a beaten captain ridden down at full gallop
    if (!near && !mine && d.a !== me) return;
    pow(u.x, u.y + 3.4, u.z, 'RIDDEN DOWN!', '#ff3b2e', 3); shockwave(u.x, u.z, 14, '#ff3b2e'); sfx.heavy(u.x, u.z); sfx.trample(u.x, u.z);
    u.slowT = Math.max(u.slowT || 0, .7); if (d.a) d.a.slowT = Math.max(d.a.slowT || 0, .7);
    musicCue(mine ? 'fell' : d.a === me ? 'slain' : 'capdown'); cam.shake = Math.max(cam.shake, .6); if (d.a === me || mine) buzz(120);
    return;
  }
  if (d.k === 'fxarmour') { pow(u.x, u.y + 3.1, u.z, 'ARMOUR BROKEN!', '#c9d2dc', 2); spark(u.x, u.y + 1.8, u.z, '#c9d2dc', 18); sfx.guardbreak(u.x, u.z); if (mine) { buzz([60, 30, 60]); cam.shake = Math.max(cam.shake, .4); bus.emit('fighttip', 'armour'); } return; }
  if (d.k === 'fxpush') { const f = u.face; if (mine) pow(u.x + Math.sin(f) * 3, u.y + 2.6, u.z + Math.cos(f) * 3, 'PUSH!', '#ffffff', 1); if (d.heavy) { dust(u.x + Math.sin(f) * 3, u.z + Math.cos(f) * 3); cam.shake = Math.max(cam.shake, mine ? .4 : .2); } if (mine) buzz(d.heavy ? [40, 20, 60] : 20); return; }
  if (d.k === 'fxrhythm') { if (mine) pow(u.x, u.y + 3.3, u.z, 'RHYTHM!', '#ffd23a', 1); sfx.heavy(u.x, u.z); if (mine) { buzz([30, 20, 30, 20, 60]); cam.shake = Math.max(cam.shake, .4); } return; }
  if (d.k === 'fxvland') { if (mine) bus.emit('fighttip', 'vcharge'); return; } // (your volley's landed: the moment to charge)
  if (d.k === 'fxvcharge') { pow(u.x, u.y + 3.4, u.z, 'VOLLEY & CHARGE!', '#ffd23a', 2); shockwave(u.x, u.z, 12, '#ffd23a'); sfx.charge && sfx.charge(u.x, u.z); if (mine) { buzz([40, 30, 60]); cam.shake = Math.max(cam.shake, .35); } return; }
  if (d.k === 'fxdisarm') { // a perfect parry: his blade knocked from his hand
    if (!near && !mine && d.a !== me) return;
    pow(u.x, u.y + 3.1, u.z, 'DISARMED!', '#ff8a3a', 3); sfx.parry(u.x, u.z); sfx.heavy(u.x, u.z);
    if (mine) { buzz([40, 30, 40]); if (G.role === 'client') C.localCd = Math.max(C.localCd || 0, PARRY.disarm); }
    if (d.a === me) { buzz(50); cam.shake = Math.max(cam.shake, .35); }
    return;
  }
  if (d.k === 'fxbash') { // the shield bash: a thud, and his guard flung open (heavy: it was up)
    if (!near && !mine && d.a !== me) return;
    if (d.heavy && (mine || d.a === me)) pow(u.x, u.y + 2.9, u.z, 'GUARD OPEN!', '#ff8a3a', 1); sfx.guardbreak(u.x, u.z);
    if (d.a === me) { buzz(35); cam.shake = Math.max(cam.shake, .25); bus.emit('hitstop', .06); }
    return;
  }
  if (d.k === 'fxstreak') { // the streak's whirlwind
    if (!near && !mine) return;
    pow(u.x, u.y + 3.4, u.z, 'RAMPAGE!', '#ffd23a', 3); shockwave(u.x, u.z, 8, '#ffd23a'); sfx.heavy(u.x, u.z);
    if (mine) { buzz([50, 30, 80]); cam.shake = Math.max(cam.shake, .45); }
    return;
  }
  if (d.k.startsWith('fxduel')) { // the duel: called out, on, won, drawn, broken, refused
    const inIt = mine || d.a === me;
    if (!near && !inIt) return;
    if (d.k === 'fxduelask') { const a = d.a || u; pow(a.x, a.y + 3.2, a.z, 'I CHALLENGE YOU!', '#ffd23a', 3); sfx.windup(a.x, a.z); if (mine) buzz([40, 40, 40]); }
    else if (d.k === 'fxduel') { const a = d.a || u, mx = (a.x + u.x) / 2, mz = (a.z + u.z) / 2; pow(mx, u.y + 3.4, mz, 'DUEL!', '#ffd23a', 3); shockwave(mx, mz, DUEL.ring + 1, '#ffd23a'); sfx.horn(); if (inIt) { buzz(80); cam.shake = Math.max(cam.shake, .4); musicCue('rally'); } }
    else if (d.k === 'fxduelwin') { pow(u.x, u.y + 3.4, u.z, mine ? 'DUEL WON!' : 'VICTOR!', '#ffd23a', 3); shockwave(u.x, u.z, 16, '#ffd23a'); sfx.cheer(); if (mine) buzz([60, 40, 90]); }
    else if (d.k === 'fxdueldraw') pow(u.x, u.y + 3.2, u.z, 'DRAW', '#ffffff', 3);
    else if (d.k === 'fxduelbreak') { pow(u.x, u.y + 3.2, u.z, 'DISHONOUR!', '#e0352b', 3); sfx.heavy(u.x, u.z); }
    else if (d.k === 'fxduelno') pow(u.x, u.y + 3.2, u.z, 'REFUSED!', '#c9c2b2', 2);
    return;
  }
  if (d.k === 'fxexecgo') { // an execution begins: a drum, the camera closes in (render/camera.js reads the pose flags)
    if (near || mine || d.a === me) { sfx.windup(u.x, u.z); if (d.a === me) buzz(40); }
    return;
  }
  if (d.k === 'fxexec') { // ...and the blow falls
    if (!near && !mine && d.a !== me) return;
    pow(u.x, u.y + 3.4, u.z, { spear: 'RUN THROUGH!', jav: 'PINNED!' }[d.q] || 'EXECUTED!', '#ff3b2e', 3); shockwave(u.x, u.z, 14, '#ff3b2e'); sfx.heavy(u.x, u.z);
    if (d.q === 'spear') sfx.trample(u.x, u.z); if (d.q === 'jav') sfx.thud(u.x, u.z);
    musicCue(mine ? 'fell' : d.a === me ? 'slain' : 'capdown'); cam.shake = Math.max(cam.shake, .6); if (d.a === me || mine) buzz(120);
    return;
  }
  if (d.k === 'fxback' && d.a === me) sfx.heavy(u.x, u.z); // (a backstab of yours: a heavier thud under the word)
  if (d.k === 'fxevade') { if (!mine && d.a !== me) return; if (mine) { buzz(20); bus.emit('fighttip', 'counter'); } }
  if (d.k === 'fxride') { // your ride-by blow: how well you timed it
    if (d.a !== me) return;
    const R = { perfect: ['PERFECT!', '#ffd23a'], good: ['HIT!', '#ffffff'], graze: ['TOO LATE', '#c9c2b2'], miss: ['TOO EARLY', '#c9c2b2'] }[d.q] || ['', ''];
    const at = d.q === 'miss' || u === me ? me : u; if (d.q === 'perfect' || d.q === 'miss' || d.q === 'graze') pow(at.x, at.y + 3.1, at.z, R[0], R[1], 1);
    if (d.q === 'perfect') { sfx.heavy(u.x, u.z); buzz(40); }
    return;
  }
  // the rest are small beats: a word only for the big ones (a rider brought down), or for your own parry / guard break
  const [txt, col] = FIGHT_POW[d.k], big = d.k === 'fxjoust' || d.k === 'fximpale' || d.k === 'fxunhorse';
  if (big) pow(u.x, u.y + 2.9, u.z, txt, col, 2);
  else if (txt && (d.k === 'fxparry' || d.k === 'fxbreak' || d.k === 'fxback') && (mine || d.a === me)) pow(u.x, u.y + 2.9, u.z, txt, col, 1);
  if (d.k === 'fxjoust') { sfx.heavy(u.x, u.z); cam.shake = Math.max(cam.shake, .45); if (d.a === me) buzz(60); }
  if (d.k === 'fxparry') {
    spark(u.x + Math.sin(u.face) * .8, u.y + 1.6, u.z + Math.cos(u.face) * .8, '#ffffff', 16); sfx.parry(u.x, u.z);
    // the two men in it move in slow motion for a beat (the rules slow them on the host; this slows how they're drawn everywhere)
    const t = PARRY.slowT * (d.heavy ? 1.2 : 1); u.slowT = Math.max(u.slowT || 0, t); if (d.a) d.a.slowT = Math.max(d.a.slowT || 0, t);
    if (mine || d.a === me) { buzz(30); cam.shake = Math.max(cam.shake, .3); }
    if (d.byAI && d.a === me) bus.emit('fighttip', 'guard');
  }
  if (d.k === 'fxbreak') { sfx.guardbreak(u.x, u.z); if (mine) { buzz(60); cam.shake = Math.max(cam.shake, .45); bus.emit('fighttip', 'break'); } }
  if (d.k === 'fximpale' || d.k === 'fxunhorse') { sfx.heavy(u.x, u.z); cam.shake = Math.max(cam.shake, .35); }
});
bus.on('hint', text => { const p = G.player; if (p && gateS('mhint', 2500)) floatText(p.x, p.y + 3.4, p.z, text, '#fff'); });
bus.on('respawnMe', L => { cam.yaw = L.face; });
bus.on('hud', () => { if (G.state === 'play') updateHud(C.lastSnapAt); });
bus.on('hostEnd', res => endMatch(res[0], res[1]));
bus.on('end', ({ w, why }) => {
  releaseAll(); trayOpen(false); upOpen(false); stopTutorial();
  portal.gameplayStop();
  updateHud(C.lastSnapAt);
  stopCrowd();
  const mine = G.ALLY[colorOf(G.myTi)];
  const result = w < 0 ? 'draw' : w === mine ? 'win' : 'lose';
  const title = result === 'win' ? 'Victory' : result === 'draw' ? 'Draw' : 'Defeat';
  if (result === 'win') { sfx.horn(); banner('Victory!', '', '#ffcf3a'); portal.happytime(); } else banner(title, '', result === 'draw' ? '#fff' : '#e0352b');
  $('endTitle').innerHTML = `<span>${title}</span>`;
  $('endText').textContent = `${MODES[G.mode].name} on ${G.map.name}. ${endText(w, why)}`;
  const qs = QUIPS[result]; $('endQuip').textContent = qs[(Math.random() * qs.length) | 0];
  const T0 = G.teams[G.myTi] || {}, capK = Math.max(G.kills | 0, T0.capK | 0), menK = T0.menK | 0, falls = T0.falls | 0, lost = T0.lost | 0;
  $('sKills').textContent = capK; $('sArmyK').textContent = menK; $('sTotalK').textContent = capK + menK; $('sFalls').textContent = falls; $('sLost').textContent = lost;
  $('endQuip').textContent = tallyQuip({ capK, menK, falls, lost, result }) || $('endQuip').textContent;
  showMoments((G.teams[G.myTi] && G.teams[G.myTi].hl) || {}); showSideMoments();
  // the battle report (on a joined phone the tally arrives with the host's last snapshot: built again when it lands)
  const report = () => { const rep = buildReport(w, nickFor); lastRep = { rep, title };
    const m = myLine(rep); $('myRate').hidden = !m; if (m) { $('myRateN').textContent = m.me.rating.toFixed(1); $('myRateT').textContent = `${m.text}${m.me.mvp ? ' · MVP' : ''}`; }
    renderCaptains($('endCaps'), rep); renderAwards($('endAw'), rep); };
  report(); if (isClient()) setTimeout(() => { if (G.state === 'end') report(); }, 1200);
  endTab('you');
  showRank(G.awarded ? null : awardMatch({ result, kills: G.kills, diff: G.diff })); G.awarded = true;
  const host = isHost(), client = isClient();
  $('againBtn').hidden = client;
  $('againBtn').textContent = host ? 'Back to lobby' : 'Fight again';
  $('menuBtn').textContent = session.NET ? 'Leave' : 'Menu';
  $('endNote').textContent = client ? 'Waiting for the host to start the next battle…' : '';
  if (host) netHostSend(true);
  setTimeout(() => { if (G.state === 'end') $('ovEnd').hidden = false; }, 1600);
});
let lastRep = null;
function endTab(t) {
  document.querySelectorAll('.etabs [data-t]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.t === t)));
  $('endYou').hidden = t !== 'you'; $('endCaps').hidden = t !== 'caps'; $('endAw').hidden = t !== 'aw';
}
document.querySelectorAll('.etabs [data-t]').forEach(b => b.addEventListener('click', () => endTab(b.dataset.t)));
$('shareBtn').addEventListener('click', async () => {
  if (!lastRep) return;
  const text = shareText(lastRep.rep, lastRep.title), url = location.origin + location.pathname;
  try { if (navigator.share) { await navigator.share({ text, url }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank', 'noopener');
});
// The note under the result, from how the battle went for you (the first that fits, else the usual quip).
function tallyQuip({ capK, menK, falls, lost, result }) {
  const tot = capK + menK, pick = a => a[(Math.random() * a.length) | 0];
  if (tot === 0) return pick(['Not a single kill. A pacifist, or just very lost?', 'Zero kills. The enemy would like to thank you for your cooperation.']);
  if (falls === 0 && capK >= 10) return pick([`${capK} kills and not one fall. The bards are already arguing over what rhymes with that.`, `Untouched, with ${capK} to your name. Someone check that captain for witchcraft.`]);
  if (falls >= 4) return pick([`You fell ${falls} times. The healers have started charging you rent.`, `${falls} falls. At this point the ground knows you by name.`]);
  if (capK >= 20) return pick([`${capK} by your own hand. Someone take that sword off you.`, `${capK} kills yourself. Your men are wondering what they're for.`]);
  if (menK >= 15 && menK >= capK * 3) return pick([`Your men took ${menK}. You mostly did the pointing.`, `${menK} kills by your army, ${capK} by you. Delegation: a fine art.`]);
  if (capK > menK && menK < 5) return pick(['You did the fighting. Your army mostly did the watching.', `You took ${capK}, your army ${menK}. Someone tell them the battle's over here.`]);
  if (lost >= 2 * tot && lost >= 10) return pick([`${lost} men lost for ${tot} taken. The recruiters are not pleased.`, `You spent ${lost} men like loose change.`]);
  if (result === 'win' && falls === 0) return 'A win without a scratch. Insufferable at dinner tonight, surely.';
  return null;
}
// Results screen: your moments of the match, the biggest first (up to four).
function showMoments(h) {
  const n = (k, one, many) => h[k] ? (h[k] === 1 ? one : many.replace('#', h[k])) : null;
  const lines = [
    n('duel', 'Won a duel', 'Won # duels'),
    n('exec', 'Executed a captain', 'Executed # captains'),
    n('ridedown', 'Rode down a beaten captain', 'Rode down # beaten captains'),
    n('rampage', 'Went on a rampage', 'Went on # rampages'),
    n('castle', 'Brought down a castle', 'Brought down # castles'),
    n('chest', 'Took the war chest', 'Took the war chest'),
    n('capkill', 'Cut down an enemy captain', 'Cut down # enemy captains'),
    n('disarm', 'Disarmed a captain with a perfect parry', 'Disarmed # captains with perfect parries'),
    h.streak >= 5 ? `Landed ${h.streak} blows in a row` : null,
    n('bash', 'Bashed a guard open', 'Bashed # guards open'),
    n('rhythm', 'Landed a rhythm finisher', 'Landed # rhythm finishers'),
    n('push', 'Heaved the shield wall into them', 'Heaved the shield wall into them # times'),
    n('vcharge', 'Charged in hard on a volley', 'Charged in hard on # volleys'),
    n('parry', 'Parried a blow', 'Parried # blows'),
  ].filter(Boolean).slice(0, 3);
  const ul = $('endMoments'); ul.innerHTML = '';
  for (const t of lines) { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); }
  ul.hidden = !lines.length;
}
// Results screen: your side's moments (when there's more than you on it), totals with who did them.
function showSideMoments() {
  const ul = $('endSide'); ul.innerHTML = '';
  const side = G.teams.map((s, i) => i).filter(i => G.teams[i].active && G.ALLY[colorOf(i)] === G.ALLY[colorOf(G.myTi)]);
  if (side.length < 2) { $('endSideWrap').hidden = true; return; }
  const who = i => i === G.myTi ? 'you' : nickFor(i) || (TEAMS[colorOf(i)].name + (i >= 4 ? ' ' + SLOT_NAME[i >> 2].toLowerCase() : ''));
  const sum = k => side.reduce((n, i) => n + ((G.teams[i].hl || {})[k] || 0), 0);
  const by = k => side.filter(i => (G.teams[i].hl || {})[k]).map(i => { const n = G.teams[i].hl[k]; return who(i) + (n > 1 ? ' ×' + n : ''); }).join(', ');
  const line = (k, one, many) => { const n = sum(k); return n ? (n === 1 ? one : many.replace('#', n)) + ' (' + by(k) + ')' : null; };
  let best = null; for (const i of side) { const v = (G.teams[i].hl || {}).streak || 0; if (v >= 5 && (!best || v > best.v)) best = { i, v }; }
  const lines = [
    line('castle', 'Brought down a castle', 'Brought down # castles'),
    sum('chest') ? 'Took the war chest' : null,
    line('duel', 'Won a duel', 'Won # duels'),
    line('exec', 'Executed a captain', 'Executed # captains'),
    line('capkill', 'Cut down an enemy captain', 'Cut down # enemy captains'),
    line('rampage', 'Went on a rampage', 'Went on # rampages'),
    best ? `Longest streak: ${best.v} blows (${who(best.i)})` : null,
  ].filter(Boolean).slice(0, 3); // (three of yours, three of your side's: it has to fit a phone on its side)
  for (const t of lines) { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); }
  $('endSideWrap').hidden = !lines.length;
}
// Results screen: XP gained, the bar filling toward the next rank, and any crest it unlocked.
function showRank(aw) {
  const pr = rankProgress(), bar = $('xpBar');
  $('rankName').textContent = RANKS[pr.rank].name; $('rankNameJoke').textContent = RANKS[pr.rank].joke;
  $('xpGain').textContent = aw ? `+${aw.gained} XP` : '';
  const pct = x => { const q = rankProgress(x); return q.span ? Math.min(100, q.into / q.span * 100) : 100; };
  bar.style.transition = 'none'; bar.style.width = (aw && !aw.rankUp ? pct(aw.before) : 0) + '%';
  requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = ''; bar.style.width = pct(progress.xp) + '%'; }));
  const note = $('rankNote'), next = RANKS[pr.rank + 1];
  note.classList.toggle('up', !!(aw && aw.rankUp));
  note.textContent = aw && aw.rankUp ? `Rank up! New crest: ${aw.unlocked.join(', ')}` : next ? `${next.xp - progress.xp} XP to ${next.name} (unlocks the ${CRESTS[pr.rank + 1].name} crest)` : 'Top rank reached';
  buildCrests();
}
// Menu: your rank and the crest picker (locked crests name the rank that unlocks them).
const LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
function buildCrests() {
  const r = rankOf(progress.xp), next = RANKS[r + 1];
  $('rankLine').textContent = `Rank: ${RANKS[r].name}`; $('hRank').innerHTML = `${RANKS[r].name}<span>${next ? `${progress.xp} / ${next.xp} XP` : `${progress.xp} XP`}</span>`; $('rankJoke').textContent = RANKS[r].joke;
  $('rankNext').textContent = next ? `${progress.xp} / ${next.xp} XP` : `${progress.xp} XP`;
  if ($('segCrest')) $('segCrest').innerHTML = CRESTS.map((c, i) => {
    const open = crestUnlocked(i);
    const label = open ? `${c.name} crest` : `${c.name} crest, unlocks at ${RANKS[i].name}`;
    return `<button type="button" data-v="${i}" aria-pressed="${i === progress.crest}" aria-disabled="${!open}" aria-label="${label}" title="${label}" style="background:${c.css}">${open ? '' : LOCK}</button>`;
  }).join('');
  const nc = CRESTS[r + 1];
  if ($('crestNote')) $('crestNote').textContent = `Crest: ${CRESTS[progress.crest].name}` + (nc ? ` · ${RANKS[r + 1].name} unlocks ${nc.name}` : '');
}
buildCrests();
// a fresh tip every time the menu shows
function newTip() { $('tip').textContent = 'Tip: ' + TIPS[(Math.random() * TIPS.length) | 0]; }
newTip();
// Home menu tabs: one panel at a time, the play buttons always in reach.
const tabs = [...document.querySelectorAll('#ovTitle .tabs button')];
function showTab(id) {
  tabs.forEach(t => { const on = t.dataset.tab === id; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; $(t.dataset.tab).hidden = !on; });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => showTab(t.dataset.tab));
  t.addEventListener('keydown', e => { // arrow keys move between tabs
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
    const n = tabs[(i + d + tabs.length) % tabs.length]; showTab(n.dataset.tab); n.focus(); e.preventDefault();
  });
});
showTab('tabBattle');
function endText(w, why) {
  if (w < 0) return 'Time ran out with no clear winner.';
  const names = allyNames(w), one = names.indexOf('&') < 0;
  if (why === 'castles') return `${names} tore down every enemy castle.`;
  if (why === 'tickets') return `${names} ${one ? 'is' : 'are'} the last side with tickets.`;
  if (why === 'caps') return `${names} carried the banner home ${rules().caps} times.`;
  return `Time is up and ${names} ${one ? 'leads' : 'lead'}.`;
}

// ---------- match start ----------
function viewForMatch() {
  clearMeadow();
  buildWorldView(G.layout);
  clearEffects(); clearHorses(); clearProps(); clearBanter(); clearFeed(); clearReport(); spawnCritters(G.seed);
  buildHud(); showHud(); trayOpen(false); upOpen(false);
  portal.gameplayStart();
  requestAnimationFrame(() => requestAnimationFrame(hideVeil));
  watchdog.reset();
  startCrowd(G.map.id);
}
function beginMatch(humans, active) {
  if (!session.NET) G.role = 'solo';
  startMatch(humans, active);
  cam.yaw = G.player.face; cam.pitch = CAM_PITCH;
  viewForMatch();
  sfx.horn();
  startTutorial();
}
setNetHooks({ onMatchStart: viewForMatch, onAbort: msg => netLeave(msg), onLobby: () => showLobby() });
bindLobby({ startMatch: beginMatch, seedDemo, teams: () => soloAl.slice(), resetSolo: () => resetSolo() });
bindInput(actions); bindTutorial();

// ---------- the home stage: your captain before his castle, his men behind him ----------
// The camera stands in front of him; with a sheet open (the wardrobe, the battle setup) it slides so
// he stays in view beside it. Two "+" places stand either side of him for friends.
let soloMap = G.map; // the map picked for Battle the computer
let demoT = 0, homeCap = null, homeView = 'home'; // 'home' | 'sheet' | 'ward'
const homeV = { sx: 0, k: 0 }; // (the camera's eased slide)
function seedDemo() {
  G.map = MAPS.valley; // (the home is always out in the green valley; the battle's map is kept in soloMap)
  G.layout = makeLayout(G.map.id, false, false, 7); buildNav(G.layout);
  G.units = []; G.horses = []; G.arrows = []; G.flag = null; G.player = null; G.uid = 0; clearCritters();
  G.teams = newTeams([0, 0, 0, 0]);
  G.looks = assignLooks({ [G.myTi]: prefs.look }, 7);
  G.crests = []; G.crests[G.myTi] = progress.crest;
  buildWorldView(G.layout); clearEffects(); clearHorses(); clearProps();
  // out in the meadow in front of his castle, looking back at it (the camera stands between): behind him,
  // the open valley, the flock and the shepherd
  const t = TEAMS[colorOf(G.myTi)];
  // a clear patch of meadow: nothing in the way within a few metres (hedges, walls, trees)
  let sp0 = 0, ex0 = 15;
  search: for (const ex of [15, 18, 12, 21, 24]) for (const sp of [0, 6, -6, 12, -12]) {
    const [x, z] = gatePos(t, sp, ex); let ok = true;
    for (let a = 0; a < 16 && ok; a++) for (const r of [2, 4, 6, 8]) if (!walkable(x + Math.cos(a / 16 * Math.PI * 2) * r, z + Math.sin(a / 16 * Math.PI * 2) * r)) { ok = false; break; }
    if (ok) { sp0 = sp; ex0 = ex; break search; }
  }
  const [cx, cz] = gatePos(t, sp0, ex0); homeCap = mkUnit(G.myTi, cx, cz, 'captain'); homeCap.demo = true;
  const d = Math.hypot(cx, cz) || 1, lx = cx / d, lz = cz / d; // (the way he looks: back toward his castle and the camera)
  homeCap.face = Math.atan2(lx, lz); homeCap.y = groundY(cx, cz);
  // his men, two ranks behind him
  [[-2.4, -4.2, 'foot'], [0, -4.6, 'foot'], [2.4, -4.2, 'foot'], [-3.4, -2.2, 'arch'], [3.4, -2.2, 'arch']].forEach(([sp, ex, k]) => {
    const [x, z] = gatePos(t, sp0 + sp, ex0 - ex); const u = mkUnit(G.myTi, x, z, k); u.face = homeCap.face; u.demo = true;
  });
  spawnMeadow(cx, cz, lx, lz);
}
const _v = new THREE.Vector3();
function homeCamera(dt) {
  const c = homeCap; if (!c) { orbitCamera(demoT); return; }
  const d = Math.hypot(c.x, c.z) || 1, fx = c.x / d, fz = c.z / d, rx = -fz, rz = fx; // (from him toward the camera, and sideways)
  const wide = innerWidth / Math.max(1, innerHeight) > 1.5;
  const want = homeView === 'home' ? -.7 : homeView === 'ward' ? (wide ? 1.7 : 1.3) : (wide ? -4.4 : -2.4); // (beside the sheet: right of the wardrobe, left of the setup)
  homeV.sx += (want - homeV.sx) * Math.min(1, dt * 5);
  // the captain turns to face you, swaying a little in the wardrobe so the cape shows
  const sway = homeView === 'ward' ? Math.sin(demoT * .7) * .75 : Math.sin(demoT * .3) * .12;
  c.face = Math.atan2(fx, fz) + sway; c.vx = c.vz = 0;
  const gy = groundY(c.x, c.z), dist = homeView === 'ward' ? 5.2 : 6.4, ty = gy + (homeView === 'ward' ? 1.3 : 1.45);
  const tx = c.x + rx * homeV.sx, tz = c.z + rz * homeV.sx;
  camera.position.set(tx + fx * dist, ty + 1.15, tz + fz * dist);
  camera.lookAt(tx, ty, tz);
  // the "+" places beside him, on screen where they stand in the world
  for (const [id, side] of [['pedL', 1], ['pedR', -1]]) {
    const el = $(id); if (!el) continue;
    if (homeView !== 'home') { el.hidden = true; continue; }
    _v.set(c.x + rx * side * 2.5, gy + 1.15, c.z + rz * side * 2.5).project(camera);
    const px = (_v.x + 1) / 2 * innerWidth, py = (1 - _v.y) / 2 * innerHeight, pr = $('home').querySelector('.hplay').getBoundingClientRect();
    el.hidden = _v.z > 1 || (px > pr.left - 36 && py > pr.top - 36); // (not under the Play panel on a small screen)
    el.style.left = px + 'px'; el.style.top = py + 'px';
  }
}
function demo(dt) {
  demoT += dt;
  drawSoldiers(G.units, dt); updateMeadow(dt);
  drawHorses([], dt);
  drawEffects();
  updateWorldView(dt, () => {});
  homeCamera(dt); hideDuelTag();
  followSun(homeCap ? homeCap.x : 0, homeCap ? homeCap.z : 0, demoT);
  renderer.render(scene, camera);
  clearOverlay();
}
// which of the home's layers shows: the stage alone, a sheet over it, or the wardrobe
function setHomeView(v, tabsShown) {
  if (import.meta.env.DEV && window.__testSheet && v === 'home') { v = 'sheet'; tabsShown = ['tabBattle']; } // (dev: older tests drive the setup sheet)
  homeView = v;
  $('home').hidden = v !== 'home'; $('homeSheet').hidden = v !== 'sheet'; $('ward').hidden = v !== 'ward';
  $('ovTitle').classList.toggle('homing', v !== 'sheet'); $('ovTitle').classList.toggle('sheet', v === 'sheet');
  if (v === 'sheet') {
    tabs.forEach(t => { t.hidden = !tabsShown.includes(t.dataset.tab); });
    showTab(tabsShown[0]);
    $('goBtn').hidden = !tabsShown.includes('tabBattle'); $('mpBtn').hidden = !(import.meta.env.DEV && window.__testSheet);
    $('ovTitle').scrollTop = 0;
  }
}

// ---------- menus ----------
function seg(id, cb) {
  $(id).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $(id).querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    cb(b.dataset.v);
  });
}
function updateDesc() {
  const tdesc = describeTeams(G.ALLY, G.myTi, soloDuo.map(d => d < 0));
  $('desc').innerHTML = `<strong>${MODES[G.mode].name} · ${rules().name}, about ${Math.round(matchTime() / 60)} min.</strong> ${modeDesc(MODES[G.mode])}<br><strong>${soloMap.name}.</strong> ${soloMap.desc} <strong>Teams:</strong> ${tdesc}`;
}
function updateQualityNote() {
  const lvl = LEVELS[quality.level].name;
  $('qualityNote').textContent = quality.stepped ? `Lowered to ${lvl} to keep the game smooth.` : quality.setting === 'auto' ? `Auto picked ${lvl} for this device.` : '';
  $('segQuality').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === quality.setting)));
}
seg('segMode', v => { G.mode = v; G.target = prefs.tgt[v] ?? targetFor(v); renderTargets(); updateDesc(); });
seg('segMap', v => { soloMap = MAPS[v]; updateDesc(); });
// Teams, as in the multiplayer lobby: tap a colour to be it, its letter chip cycles its team, its
// Duo chip adds a computer co-captain (tap again for a third: Trio). Remembered between visits.
const soloDuo = [0, 0, 0, 0];
function renderSoloSeats() {
  const box = $('soloSeats'); box.innerHTML = '';
  TEAMS.forEach((t, i) => {
    const col = document.createElement('div'); col.className = 'seatcol';
    const seat = (label, who, extra) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'seat' + (extra ? ' slot2' : '') + (who === 'You' ? ' mine' : ''); b.style.background = t.css;
      const n = document.createElement('b'); n.textContent = label; const s = document.createElement('span'); s.textContent = who; b.append(n, s); return b; };
    const main = seat(t.name, i === prefs.color ? 'You' : 'Computer');
    main.addEventListener('click', () => { if (prefs.color === i) return; if (soloDuo[i] < 0) soloDuo[i] = 0; prefs.color = i; prefs.save(); resetSolo(); renderSoloSeats(); updateDesc(); seedDemo(); });
    const chip = document.createElement('span'); chip.className = 'alchip'; chip.setAttribute('role', 'button'); chip.tabIndex = 0; chip.textContent = 'Team ' + AL_LETTER[soloAl[i]]; chip.title = 'Tap to change team';
    chip.addEventListener('click', e => { e.stopPropagation(); soloAl[i] = (soloAl[i] + 1) % 4; saveSoloAl(); resetSolo(); renderSoloSeats(); updateDesc(); });
    // the chip cycles: Duo, Trio, Out (not in this battle: a 2- or 3-castle battle), and back. Never your own colour out.
    const out = soloDuo[i] < 0;
    const tog = document.createElement('span'); tog.className = 'duotog' + (soloDuo[i] > 0 ? ' on' : '') + (out ? ' outt' : ''); tog.setAttribute('role', 'button'); tog.tabIndex = 0; tog.textContent = out ? 'Out' : ['Duo', 'Duo', 'Trio'][soloDuo[i]];
    tog.addEventListener('click', e => { e.stopPropagation(); soloDuo[i] = soloDuo[i] === 2 ? (i === prefs.color || soloDuo.filter(d => d >= 0).length <= 2 ? 0 : -1) : soloDuo[i] + 1; renderSoloSeats(); updateDesc(); });
    if (out) { main.classList.add('outseat'); main.querySelector('span').textContent = 'Not in this battle'; }
    main.append(chip, tog); col.appendChild(main);
    for (let s = 1; s <= soloDuo[i]; s++) col.appendChild(seat(SLOT_NAME[s], 'Computer', true));
    box.appendChild(col);
  });
  const sides = new Set(soloAl.filter((_, i) => soloDuo[i] >= 0)).size;
  $('goBtn').disabled = sides < 2; // (everyone on one team: nobody to fight)
}
// each mode's target (tickets, captures...), shown for the mode picked
function renderTargets() {
  const T = TARGETS[G.mode]; $('targetLabel').textContent = T.label;
  $('segTarget').innerHTML = T.opts.map(([v, n]) => `<button type="button" data-v="${v}" aria-pressed="${v === (G.target ?? T.def)}">${n}</button>`).join('');
}
seg('segTime', v => { G.time = +v; prefs.time = +v; prefs.save(); updateDesc(); });
seg('segTarget', v => { G.target = +v; prefs.tgt[G.mode] = +v; prefs.save(); updateDesc(); });
function resetSolo() { G.role = 'solo'; G.myTi = prefs.color; G.ALLY = soloAl.slice(); }
function soloStart(o = {}) {
  initAudio(); session.NET = null; resetSolo();
  if (o.al) G.ALLY = o.al.slice();
  G.map = o.map || soloMap; clearMeadow();
  G.seed = (Math.random() * 1e9) | 0;
  G.looks = assignLooks({ [G.myTi]: prefs.look }, G.seed);
  const active = activeFrom(o.duo || soloDuo);
  G.crests = []; G.crests[G.myTi] = progress.crest;
  beginMatch(TEAMS.map((_, i) => i === G.myTi ? 1 : 0), active);
}
const pressSeg = (id, v) => $(id).querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === String(v))));
seg('segDiff', v => { G.diff = +v; });
seg('segMusic', v => { setMusic(v === 'on'); pressSeg('segMusic', v); });
pressSeg('segMusic', musicEnabled() ? 'on' : 'off');
seg('segQuality', v => {
  if (v === quality.setting) return;
  saveSetting(v);
  location.reload(); // antialiasing can only change with a fresh page
});
// On phones, starting a battle takes the game full screen and sideways, so the browser's own bars
// don't eat a quarter of the view. It needs a tap to be allowed, so it hangs off the start buttons.
// (Android browsers honour this; iPhone Safari doesn't allow it, where "Add to Home Screen" does the job.)
const coarse = matchMedia('(pointer: coarse)').matches;
function goFullscreen() {
  if (!coarse || document.fullscreenElement || onPortal()) return; // the games site provides its own fullscreen
  const el = document.documentElement, req = el.requestFullscreen || el.webkitRequestFullscreen;
  if (!req) return;
  try {
    const p = req.call(el, { navigationUI: 'hide' });
    if (p && p.then) p.then(() => { try { screen.orientation.lock('landscape').catch(() => {}); } catch (e) {} }).catch(() => {});
  } catch (e) {}
}
['goBtn', 'quickBtn', 'againBtn', 'hostBtn', 'joinBtn', 'startBtn'].forEach(id => { const b = $(id); if (b) b.addEventListener('click', goFullscreen); });
// Building a battlefield takes a moment on a slow phone. Show "Mustering the troops" the instant a
// start button is touched (a tap spans a frame or two before it becomes a click, so this gets drawn
// before the work begins), and lift it once the battle's first frame is on screen.
let veilT = 0;
function showVeil() { $('veil').hidden = false; clearTimeout(veilT); veilT = setTimeout(hideVeil, 5000); }
function hideVeil() { clearTimeout(veilT); $('veil').hidden = true; }
['goBtn', 'quickBtn', 'startBtn'].forEach(id => { const b = $(id); if (b) b.addEventListener('pointerdown', showVeil); });
$('againBtn').addEventListener('pointerdown', () => { if (!isHost()) showVeil(); }); // a host's "again" goes to the lobby, not a battle
$('goBtn').addEventListener('click', () => { lastStart = () => soloStart(); soloStart(); });
// One tap to a fight: Quick (5 min), a random map and mode; keeps your army, colour, teams and
// difficulty. The menu shows what was picked, so "Fight again" repeats it.
$('quickBtn').addEventListener('click', () => {
  const pick = a => a[(Math.random() * a.length) | 0];
  const mode = pick(Object.keys(MODES)), map = pick(['forum', 'valley', 'desert', 'frost']); // the four featured maps
  G.mode = mode; soloMap = MAPS[map]; G.time = 5; G.target = targetFor(mode);
  pressSeg('segMode', mode); pressSeg('segMap', map); pressSeg('segTime', 5); renderTargets();
  updateDesc(); lastStart = () => soloStart(); soloStart();
});
// ---------- the home: Play, the sheets, the wardrobe ----------
// PLAY: the Crown's format (Solo / Duo / Trio a side). Online matchmaking isn't open yet, so for now
// it's a free-for-all against computer captains in that format: conquest, a featured map, 10 minutes.
let playFmt = (() => { try { return Math.min(2, Math.max(0, +localStorage.getItem('rally-fmt') || 0)); } catch (e) { return 0; } })();
const pressFmt = () => $('segFmt').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.v === playFmt)));
pressFmt();
$('segFmt').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; playFmt = +b.dataset.v; try { localStorage.setItem('rally-fmt', String(playFmt)); } catch (er) {} pressFmt(); });
let lastStart = () => soloStart();
function playStart() {
  const pick = a => a[(Math.random() * a.length) | 0];
  G.mode = 'conquest'; G.time = 10; G.target = targetFor('conquest');
  soloStart({ al: [0, 1, 2, 3], duo: [playFmt, playFmt, playFmt, playFmt], map: MAPS[pick(['forum', 'valley', 'desert', 'frost'])] });
  lastStart = playStart;
}
$('playBtn').addEventListener('pointerdown', showVeil);
$('playBtn').addEventListener('click', () => { goFullscreen(); playStart(); });
$('cpuBtn').addEventListener('click', () => setHomeView('sheet', ['tabBattle']));
$('setBtn').addEventListener('click', () => setHomeView('sheet', ['tabSettings', 'tabHelp']));
$('sheetBack').addEventListener('click', () => setHomeView('home'));
// a friend: for now that's a private battle (a code to share)
for (const id of ['privBtn', 'pedL', 'pedR']) $(id).addEventListener('click', () => { initAudio(); $('mpBtn').click(); });
// the wardrobe: built from the catalog; the stage shows each change at once
const ward = wardrobe($('ward'), {
  look: () => prefs.look, crest: () => progress.crest,
  crestOpen: i => crestUnlocked(i), crestNeed: i => `${RANKS[i].name} rank`, rankName: i => (RANKS[i] || RANKS[RANKS.length - 1]).name,
  onPick: (si, v) => { prefs.look = prefs.look.slice(); prefs.look[si] = v; prefs.save(); if (G.looks) G.looks[G.myTi] = prefs.look; sfx.draw && sfx.draw(); },
  onCrest: i => { if (setCrest(i)) { buildCrests(); if (G.crests) G.crests[G.myTi] = progress.crest; } },
});
$('wardBtn').addEventListener('click', () => { ward.show(); setHomeView('ward'); });
$('wardDone').addEventListener('click', () => setHomeView('home'));
document.addEventListener('keydown', e => { if (e.code === 'Escape' && G.state === 'title' && homeView !== 'home') setHomeView('home'); });
// between battles is the one place a games-site ad may play (off during a Basic Launch; see portal.js)
$('againBtn').addEventListener('click', () => {
  initAudio();
  if (isHost()) { portal.midgameAd(() => showLobby()); return; }
  portal.midgameAd(() => lastStart());
});
// ---------- in battle: the menu button (back to the battle, or leave it) ----------
// Solo, the battle stops while the panel is open. Online it can't: the battle goes on (and a joiner's
// captain stands still); leaving hands a joiner's army to the computer, and ends it for everyone if
// it's the host who goes (the joiners are told at once, see netgame.js).
function openPause() {
  if (G.state !== 'play') return;
  const NET = session.NET, host = NET && NET.role === 'host', others = host ? Object.keys(NET.seats).filter(k => k !== NET.me).length : 0;
  $('pauseNote').textContent = !NET ? 'Leaving now ends this battle (it won\u2019t count as a win).'
    : host ? (others ? `You\u2019re the host: leaving ends the battle for ${others === 1 ? 'the other player' : 'all ' + others + ' other players'}.` : 'You\u2019re the host: leaving ends the battle.')
    : 'The battle goes on without you: a computer captain takes over your army.';
  $('ovPause').querySelector('h2').textContent = NET ? 'Battle menu' : 'Battle paused';
  if (!NET) paused = true;
  $('ovPause').hidden = false;
}
function closePause() { $('ovPause').hidden = true; paused = false; }
$('pauseBtn').addEventListener('click', e => { e.stopPropagation(); openPause(); });
$('resumeBtn').addEventListener('click', closePause);
$('quitBtn').addEventListener('click', async () => {
  closePause(); portal.gameplayStop();
  if (session.NET) {
    if (session.NET.role === 'host') { try { await session.NET.room.presence({ ph: 'gone' }); } catch (e) {} await new Promise(r => setTimeout(r, 300)); } // (tell the joiners first)
    netLeave(); return;
  }
  G.state = 'title'; resetSolo(); newTip(); clearCritters(); $('ovEnd').hidden = true; $('hudWrap').hidden = true; $('ovTitle').hidden = false; setHomeView('home'); seedDemo();
});
document.addEventListener('keydown', e => { if (e.code === 'Escape' && G.state === 'play') { if ($('ovPause').hidden) openPause(); else closePause(); } });
$('menuBtn').addEventListener('click', () => {
  if (session.NET) { portal.gameplayStop(); netLeave(); return; }
  portal.midgameAd(() => { G.state = 'title'; resetSolo(); newTip(); clearCritters(); $('ovEnd').hidden = true; $('hudWrap').hidden = true; $('ovTitle').hidden = false; setHomeView('home'); seedDemo(); });
});

// ---------- frame-rate watchdog: steps graphics down if the first seconds of a battle run slowly ----------
const watchdog = {
  t: 0, frames: 0, steps: 0,
  reset() { this.t = 0; this.frames = 0; },
  tick(rawDt) {
    if (quality.setting !== 'auto' || this.steps >= 2 || this.t > 8) return;
    this.t += rawDt; this.frames++;
    if (this.t < 8) return;
    const fps = this.frames / this.t;
    if (fps < 30 && stepDown()) { this.steps++; applyShadowQuality(); applyPixelRatio(); onResize(); updateQualityNote(); this.reset(); }
  },
};

// ---------- loop ----------
// A fault in one part of a frame (the rules, sound, the scenery, the HUD) is caught on its own, so the
// rest of the frame still runs and the picture never freezes. The first fault of a match is also shown
// as a small line on screen, so a player's screenshot says exactly what went wrong.
let faultSeed = null;
function fault(where, e) {
  console.error(e);
  if (faultSeed === G.seed) return; faultSeed = G.seed; // (once per match)
  const el = document.createElement('div'); el.className = 'faultNote';
  const at = String((e && e.stack) || '').split('\n').find(l => /\.js/.test(l)) || '';
  el.textContent = `⚠ ${where}: ${(e && e.message) || e} ${at.replace(/^\s*at\s*/, '').replace(/https?:\/\/[^/]+\/(.*\/)?/, '').slice(0, 80)}`;
  document.body.appendChild(el); setTimeout(() => el.remove(), 30000);
}
function drawMatch(dt) {
  try { drawScene(dt); } catch (e) { fault('draw', e); }
  try { if (!(import.meta.env.DEV && window.__noRender)) renderer.render(scene, camera); } catch (e) { fault('render', e); } // (dev: network tests skip drawing)
  try { drawOverlay({ joy: inp.joy, nickFor }); } catch (e) { fault('overlay', e); }
  try { duelTagTick(); } catch (e) { fault('duel tag', e); }
}
function drawScene(dt) {
  try { audioTick(dt); } catch (e) { fault('sound', e); } // (sound can never freeze the screen)
  banterTick(dt); updateCritters(dt);
  drawSoldiers(G.units, dt);
  const horses = isClient() ? clientHorses() : G.horses.map(h => ({ key: h.id, ti: h.ti, x: h.x, z: h.z, face: h.face, spd: h.spd, state: h.state, t: h.t, fall: h.fall }));
  drawHorses(horses, dt);
  updateWorldView(dt, castleFx);
  effectsTick(dt);
  drawEffects();
  followCamera(dt);
  if (import.meta.env.DEV && window.__camAt) { const c = window.__camAt; camera.position.set(c[0], c[1], c[2]); camera.lookAt(c[3], c[4], c[5]); } // (dev: fixed shots of the scenery)
  updateSeeThrough(dt, camera.position, camTarget());
  drawAura(G.player, auraRange(G.myTi), grassTime());
  drawVolleyAim(grassTime()); drawHoldAim(grassTime()); drawJavAim(); drawRideAim();
  const tg = camTarget(); followSun(tg ? tg.x : 0, tg ? tg.z : 0, grassTime());
}
initFeed({ nickFor: ti => nickFor(ti) });
function nickFor(ti) {
  const NET = session.NET; if (!NET) return null;
  const peers = NET.room.peers();
  const seats = NET.role === 'host' ? NET.seats : ((peers.find(p => p.peer === NET.hostPeer) || {}).presence || {}).seats || {};
  const peer = Object.keys(seats).find(k => seats[k] === ti); if (!peer) return null;
  const p = peers.find(x => x.peer === peer); return p && p.presence && p.presence.nick ? String(p.presence.nick).slice(0, 16) : null;
}
let hudT = 0, last = performance.now(), fpsAvg = 60;
// frozen while a games-site ad plays
let paused = false;
function loop(now) {
  if (paused) { last = now; requestAnimationFrame(loop); return; }
  const raw = (now - last) / 1000; let dt = Math.min(.05, raw); last = now;
  if (hitstop > 0) { hitstop -= raw; dt *= .06; }
  if (raw > 0) fpsAvg += (1 / raw - fpsAvg) * .05;
  try {
    if (isClient() && (G.state === 'play' || G.state === 'end')) {
      let live = true; try { live = clientTick(dt); } catch (e) { fault('net', e); }
      if (live && (G.state === 'play' || G.state === 'end')) drawMatch(dt); else demo(dt);
    } else if (G.state === 'play') {
      if (isHost()) netHostReadInputs();
      try { update(dt, import.meta.env.DEV && window.__moveOverride ? window.__moveOverride() : readMove(dt)); } catch (e) { fault('rules', e); } // (dev-only override for scripted capture)
      if (isHost() && G.state === 'play') netHostTick();
      drawMatch(dt);
      watchdog.tick(raw);
    } else if (G.state === 'end') {
      endStep(dt);
      drawMatch(dt);
      if (isHost() && now - (session.NET.lastSend || 0) > 500) netHostSend(true);
    } else {
      demo(dt);
      if (G.state === 'lobby') {
        if (isClient()) clientLobbyTick();
        else if (isHost() && now - (session.NET.lastLobby || 0) > 700) { session.NET.lastLobby = now; hostLobbyTick(); }
      }
    }
    if (G.state === 'play') { hudT -= dt; if (hudT <= 0) { hudT = .1; try { updateHud(C.lastSnapAt); tutorialTick(.1); feedTick(); } catch (e) { fault('hud', e); } } }
  } catch (err) { fault('frame', err); }
  requestAnimationFrame(loop);
}

// read-only hook for automated play-testing
const r1 = v => Math.round(v * 10) / 10;
window.__fb = {
  end() { endMatch(G.ALLY[colorOf(G.myTi)], 'time'); },
  get info() {
    const NET = session.NET, p = G.player;
    return { state: G.state, T: Math.round(G.T), MODE: G.mode, map: G.map.id, myTi: G.myTi, al: G.ALLY.join(''), units: G.units.length, horses: G.horses.length, arrows: G.arrows.length,
      net: NET && { role: NET.role, seats: NET.seats, size: NET.lastSize, hostPeer: NET.hostPeer },
      teams: G.teams.map(s => ({ p: Math.round(s.points), t: s.tickets, c: s.caps, g: Math.round(s.gold), alive: s.alive, h: s.human ? 1 : 0, plan: s.plan && s.plan.kind, lead: s.leader && { m: s.leader.mounted, dead: s.leader.dead } })),
      kinds: ['foot', 'arch'].map(k => G.units.filter(u => !u.dead && u.kind === k).length),
      flag: G.flag && { s: G.flag.state }, player: p && { x: r1(p.x), z: r1(p.z), hp: Math.round(p.hp), mounted: p.mounted, dead: p.dead, id: p.id },
      gfx: { level: quality.level, setting: quality.setting, fps: Math.round(fpsAvg), calls: renderer.info.render.calls, tris: renderer.info.render.triangles, batches: drawCalls() } };
  },
  // drive: also run the player captain with an idle stick (or a given one), so jumps and buffered attacks advance
  step(n, dt = 1 / 30, drive) { const inp = drive ? Object.assign({ wx: 0, wz: 0, mag: 0, block: false, attackHeld: false, camYaw: 0 }, drive === true ? {} : drive) : null; for (let i = 0; i < n && G.state === 'play'; i++) update(dt, inp); },
  ride() { if (G.player) { G.player.lastHit = -9; actions.ride(); } },
  volley(pt) { actions.volley(pt); }, order(o, pt) { actions.order(o, pt); }, rally() { actions.rally(); },
  attack() { actions.attack(); }, duel() { actions.duel(); }, jump() { actions.jump(); }, weapon(w) { actions.weapon(w); }, upgrade(id) { actions.upgrade(id); },
  fort(c, lv) { G.teams[c].up.fort = lv; applyFort(c); },
  setOrder, rideRelease, findPath, gatePos, orderVolley, mkUnit, challenge, canChallenge, G, cam, scene, renderer, audio: () => audioStats(),
};

function onResize() { resize(); resizeOverlay(); }
addEventListener('resize', onResize);
G.time = prefs.time; G.target = prefs.tgt[G.mode] ?? targetFor(G.mode); pressSeg('segTime', prefs.time); resetSolo(); renderSoloSeats(); renderTargets();
applyShadowQuality(); onResize(); updateDesc(); updateQualityNote(); setHomeView('home'); seedDemo(); requestAnimationFrame(loop);
// the games site (if we're on one): its SDK, its mute setting, and our pause during its ads
portalInit({ mute: m => setMuted(m), pause: p => { paused = p; } }).then(() => { portal.loadingStart(); requestAnimationFrame(() => portal.loadingStop()); });
