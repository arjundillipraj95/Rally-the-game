import './app/load.js';
import { G, bus, colorOf, targetFor, isEnemyTi } from './core/state.js';
import { rideRelease, orderVolley, challenge, canChallenge, mkUnit, update, endMatch, auraRange, endStep, setOrder, applyFort, c2Points, die } from './core/sim.js';
import { gatePos, W } from './core/world.js';
import { findPath } from './core/nav.js';
import { renderer, scene, camera, applyShadowQuality, followSun } from './render/scene.js';
import { ambientTick } from './render/ambient.js';
import { quality } from './render/quality.js';
import { updateWorldView, grassTime } from './render/world.js';
import { drawSoldiers, drawCalls } from './render/soldiers.js';
import { banterTick } from './render/banter.js';
import { initFeed, feedTick } from './ui/feed.js';
import { fogTick, fogGrid, seenAt } from './render/fog.js';
import { updateSeeThrough } from './render/seethrough.js';
import { drawVolleyAim } from './ui/volleyaim.js';
import { drawHoldAim, drawJavAim, drawRideAim } from './ui/holdaim.js';
import { duelTagTick } from './ui/dueltag.js';
import { updateCritters } from './render/critters.js';
import { drawHorses } from './render/horses.js';
import { drawFreeHorses } from './render/heroes.js';
import { drawAura, castleFx, effectsTick, drawEffects } from './render/effects.js';
import { drawOverlay } from './render/overlay.js';
import { cam, followCamera, camTarget } from './render/camera.js';
import { feelTick, feelStats } from './render/feel.js';
import { initDeath, deathTick, deathState } from './ui/death.js';
import { audioTick, audioStats, setMuted } from './ui/audio.js';
import { portal, portalInit } from './portal.js';
import { setNamer } from './ui/messages.js';
import { tlTick, tlPack, ledger } from './ui/timeline.js';
import { bindVoice, voiceState, voiceLevels, voiceCalls } from './net/voice.js';
import { updateHud } from './ui/hud.js';
import { readMove, inp } from './ui/input.js';
import { tutorialTick } from './ui/tutorial.js';
import { session, isClient, isHost, prefs } from './net/session.js';
import { actions, netHostReadInputs, netHostTick, netHostSend, clientTick, clientHorses, C } from './net/netgame.js';
import './net/champnet.js'; // (C1c: the ability buttons' action)
import { hostLobbyTick, clientLobbyTick } from './net/lobby.js';
import { ON, online, startOnline } from './net/online.js';
import { lookCode } from './core/look.js';
import { FEEL } from './config.js';
import { $, S, nickFor, resetSolo } from './app/state.js';
import { onResize, updateQualityNote, watchdog } from './app/watchdog.js';
import './app/fxbus.js';
import { perfS } from './app/endscreen.js';
import { demo, intro, introTick, seedDemo, setHomeView, startIntro } from './app/home.js';
import { toast } from './app/friends.js';
import { pressSeg, renderSoloSeats, renderTargets, updateDesc } from './app/menus.js';

// ---------- loop ----------
// A fault in one part of a frame (the rules, sound, the scenery, the HUD) is caught on its own, so the
// rest of the frame still runs and the picture never freezes. The first fault of a match is also shown
// as a small line on screen, so a player's screenshot says exactly what went wrong.
let faultSeed = null;
function fault(where, e) {
  console.error(e); perfS.errs++;
  if (faultSeed === G.seed) return; faultSeed = G.seed; // (once per match)
  const el = document.createElement('div'); el.className = 'faultNote';
  const at = String((e && e.stack) || '').split('\n').find(l => /\.js/.test(l)) || '';
  el.textContent = `⚠ ${where}: ${(e && e.message) || e} ${at.replace(/^\s*at\s*/, '').replace(/https?:\/\/[^/]+\/(.*\/)?/, '').slice(0, 80)}`;
  document.body.appendChild(el); setTimeout(() => el.remove(), 30000);
}
function drawMatch(dt) {
  try { deathTick(performance.now()); } catch (e) { fault('death', e); } // (F5: before the camera, so a respawn's move home is cut under black)
  try { drawScene(dt); } catch (e) { fault('draw', e); }
  try { if (!(import.meta.env.DEV && window.__noRender)) renderer.render(scene, camera); } catch (e) { fault('render', e); } // (dev: network tests skip drawing)
  try { drawOverlay({ joy: inp.joy, nickFor }); } catch (e) { fault('overlay', e); }
  try { duelTagTick(); } catch (e) { fault('duel tag', e); }
}
function drawScene(dt) {
  try { audioTick(dt); } catch (e) { fault('sound', e); } // (sound can never freeze the screen)
  banterTick(dt); updateCritters(dt); fogTick(dt); ambientTick(dt);
  drawSoldiers(G.units, dt); // (F4: the mountain's garrisons and camps are real soldiers, drawn with the armies)
  const horses = (isClient() ? clientHorses() : G.horses.map(h => ({ key: h.id, ti: h.ti, x: h.x, z: h.z, face: h.face, spd: h.spd, state: h.state, t: h.t, fall: h.fall }))).filter(h => !fogGrid() || !isEnemyTi(h.ti, G.myTi) || seenAt(h.x, h.z));
  if (drawFreeHorses(horses, dt)) drawHorses([], dt); else drawHorses(horses, dt); // (the new warhorse when the new models are on)
  updateWorldView(dt, castleFx);
  effectsTick(dt); feelTick(dt);
  drawEffects();
  followCamera(dt);
  if (import.meta.env.DEV && window.__camAt) { const c = window.__camAt; camera.position.set(c[0], c[1], c[2]); camera.lookAt(c[3], c[4], c[5]); } // (dev: fixed shots of the scenery)
  updateSeeThrough(dt, camera.position, camTarget());
  drawAura(G.player, auraRange(G.myTi), grassTime());
  drawVolleyAim(grassTime()); drawHoldAim(grassTime()); drawJavAim(); drawRideAim();
  const tg = camTarget(); followSun(tg ? tg.x : 0, tg ? tg.z : 0, grassTime());
}
initFeed({ nickFor: ti => nickFor(ti) }); setNamer(nickFor); initDeath({ nickFor: ti => nickFor(ti) });
bindVoice(); // (party voice, V2: the main-screen bar and the battle's mic button, once; it runs on its own from then on)
bus.on('voiceMsg', t => { if ($('inviteToast').hidden || $('inviteYes').hidden) toast(t); }); // (never over an invite waiting for an answer)
let hudT = 0, last = performance.now(), fpsAvg = 60;
// frozen while a games-site ad plays
S.paused = false;
function loop(now) {
  if (S.paused) { last = now; requestAnimationFrame(loop); return; }
  const raw = (now - last) / 1000; let dt = Math.min(.05, raw); last = now;
  if (S.hitstop > 0) { S.hitstop -= raw; dt *= .06; }
  let rdt = dt; if (S.slowmo > 0) { S.slowmo -= raw; rdt = dt * FEEL.exec.slow; } // (F7: slow motion for the drawing only)
  if (raw > 0) fpsAvg += (1 / raw - fpsAvg) * .05;
  if (raw > 0 && raw < 1 && G.state === 'play' && !G.warmup) { perfS.n++; perfS.fps += 1 / raw; if (raw > 1 / 30) perfS.slow++; } // (the health report: this phone's frame rate over the battle)
  try {
    if (isClient() && (G.state === 'play' || G.state === 'end')) {
      let live = true; try { live = clientTick(dt); } catch (e) { fault('net', e); }
      if (S.clientIntro && G.player && G.state === 'play') { S.clientIntro = false; startIntro(G.player); }
      if (intro) introTick(dt);
      if (live && (G.state === 'play' || G.state === 'end')) drawMatch(rdt); else demo(dt);
      if (live && G.state === 'play') watchdog.tick(raw); // (F14: joined phones adapt too)
    } else if (G.state === 'intro') {
      if (intro) introTick(dt); // (the opening: the sim waits, the camera tells the story)
      if (isHost() && performance.now() - (session.NET.lastSend || 0) > 400) netHostSend(true); // (hosting: the joined phones still hear from us while everyone waits)
      if (!intro) G.state = 'play';
      drawMatch(rdt);
    } else if (G.state === 'play') {
      if (isHost()) netHostReadInputs();
      try { update(dt, import.meta.env.DEV && window.__moveOverride ? window.__moveOverride() : readMove(dt)); } catch (e) { fault('rules', e); } // (dev-only override for scripted capture)
      if (isHost() && G.state === 'play') netHostTick();
      drawMatch(rdt);
      watchdog.tick(raw);
    } else if (G.state === 'end') {
      endStep(dt);
      drawMatch(rdt);
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
if (import.meta.env.DEV) window.__on = { ON, bus, online }; // (dev: tests fake the online party)
window.__fb = {
  end() { endMatch(G.ALLY[colorOf(G.myTi)], 'time'); },
  get info() {
    const NET = session.NET, p = G.player;
    return { state: G.state, T: Math.round(G.T), MODE: G.mode, map: G.map.id, myTi: G.myTi, al: G.ALLY.join(''), units: G.units.length, horses: G.horses.length, arrows: G.arrows.length,
      net: NET && { role: NET.role, name: NET.name, seats: NET.seats, size: NET.lastSize, hostPeer: NET.hostPeer },
      teams: G.teams.map(s => ({ p: Math.round(s.points), t: s.tickets, c: s.caps, g: Math.round(s.gold), alive: s.alive, h: s.human ? 1 : 0, plan: s.plan && s.plan.kind, lead: s.leader && { m: s.leader.mounted, dead: s.leader.dead } })),
      kinds: ['foot', 'arch'].map(k => G.units.filter(u => !u.dead && u.kind === k).length),
      flag: G.flag && { s: G.flag.state }, player: p && { x: r1(p.x), z: r1(p.z), hp: Math.round(p.hp), mounted: p.mounted, dead: p.dead, id: p.id },
      gfx: { level: quality.level, setting: quality.setting, rung: quality.rung, scale: quality.scale, fps: Math.round(fpsAvg), calls: renderer.info.render.calls, tris: renderer.info.render.triangles, batches: drawCalls() } };
  },
  // drive: also run the player captain with an idle stick (or a given one), so jumps and buffered attacks advance
  step(n, dt = 1 / 30, drive) { const inp = drive ? Object.assign({ wx: 0, wz: 0, mag: 0, block: false, attackHeld: false, camYaw: 0 }, drive === true ? {} : drive) : null; for (let i = 0; i < n && G.state === 'play'; i++) update(dt, inp); },
  ride() { if (G.player) { G.player.lastHit = -9; actions.ride(); } },
  volley(pt) { actions.volley(pt); }, order(o, pt) { actions.order(o, pt); }, rally() { actions.rally(); },
  attack() { actions.attack(); }, duel() { actions.duel(); }, jump() { actions.jump(); }, weapon(w) { actions.weapon(w); }, ability(k) { actions.ability(k); }, upgrade(id) { actions.upgrade(id); },
  fort(c, lv) { G.teams[c].up.fort = lv; applyFort(c); },
  feel: feelStats, death: deathState, nick: ti => nickFor(ti), hitstop: () => S.hitstopN, slowmo: () => S.slowmo, camTarget, camera,
  tlTick, tlPack, ledger, voiceState, voiceLevels, voiceCalls, setOrder, rideRelease, findPath, gatePos, orderVolley, mkUnit, challenge, canChallenge, G, W, c2Points, die, cam, scene, renderer, camera, audio: () => audioStats(),
};
addEventListener('resize', onResize);
G.time = prefs.time; G.target = prefs.tgt[G.mode] ?? targetFor(G.mode); pressSeg('segTime', prefs.time); resetSolo(); renderSoloSeats(); renderTargets();
applyShadowQuality(); onResize(); updateDesc(); updateQualityNote(); setHomeView('home'); seedDemo();
if (!(import.meta.env.DEV && window.__testSheet)) startOnline(() => ({ look: lookCode(prefs.look) })); requestAnimationFrame(loop);
// the games site (if we're on one): its SDK, its mute setting, and our pause during its ads
portalInit({ mute: m => setMuted(m), pause: p => { S.paused = p; } }).then(() => { portal.loadingStart(); requestAnimationFrame(() => portal.loadingStop()); });
