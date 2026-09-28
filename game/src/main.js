// Rally! Boots the game, runs the frame loop and wires the rules to the screen.
import './style.css';
import { TEAMS, MODES, MAPS, PRESETS } from './config.js';
import { G, bus, colorOf } from './core/state.js';
import { startMatch, mkUnit, newTeams, update, fallStep, endMatch, auraRange } from './core/sim.js';
import { makeLayout, gatePos, groundY } from './core/world.js';
import { buildNav } from './core/nav.js';
import { renderer, scene, camera, resize, applyPixelRatio, applyShadowQuality, followSun } from './render/scene.js';
import { quality, saveSetting, stepDown, LEVELS } from './render/quality.js';
import { buildWorldView, updateWorldView, grassTime } from './render/world.js';
import { drawSoldiers, drawCalls } from './render/soldiers.js';
import { drawHorses, clearHorses } from './render/horses.js';
import { spark, splat, dust, drawAura, floatText, castleFx, effectsTick, drawEffects, clearEffects } from './render/effects.js';
import { drawOverlay, clearOverlay, resizeOverlay } from './render/overlay.js';
import { cam, followCamera, orbitCamera, camTarget, CAM_PITCH } from './render/camera.js';
import { initAudio, sfx, buzz, gateS, startCrowd, stopCrowd } from './ui/audio.js';
import { showMsg, allyNames } from './ui/messages.js';
import { buildHud, showHud, updateHud, banner, fmt } from './ui/hud.js';
import { bindInput, readMove, trayOpen, upOpen, releaseAll, inp } from './ui/input.js';
import { session, isClient, isHost, prefs } from './net/session.js';
import { allyFor, describeTeams, assignFactions } from './core/teams.js';
import { actions, netHostReadInputs, netHostTick, netHostSend, clientTick, clientHorses, setNetHooks, C } from './net/netgame.js';
import { bindLobby, showLobby, hostLobbyTick, clientLobbyTick, netLeave } from './net/lobby.js';
import { CAPS_TO_WIN } from './config.js';

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
let preset = 'ffa';

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
bus.on('hint', text => { const p = G.player; if (p && gateS('mhint', 2500)) floatText(p.x, p.y + 3.4, p.z, text, '#fff'); });
bus.on('respawnMe', L => { cam.yaw = L.face; });
bus.on('hud', () => { if (G.state === 'play') updateHud(C.lastSnapAt); });
bus.on('hostEnd', res => endMatch(res[0], res[1]));
bus.on('end', ({ w, why }) => {
  releaseAll(); trayOpen(false); upOpen(false);
  updateHud(C.lastSnapAt);
  stopCrowd();
  const mine = G.ALLY[colorOf(G.myTi)];
  const result = w < 0 ? 'draw' : w === mine ? 'win' : 'lose';
  const title = result === 'win' ? 'Victory' : result === 'draw' ? 'Draw' : 'Defeat';
  if (result === 'win') { sfx.horn(); banner('Victory!', '', '#ffcf3a'); } else banner(title, '', result === 'draw' ? '#fff' : '#e0352b');
  $('endTitle').innerHTML = `<span>${title}</span>`;
  $('endText').textContent = `${MODES[G.mode].name} on ${G.map.name}. ${endText(w, why)}`;
  $('sKills').textContent = G.kills; $('sSquad').textContent = G.recruited; $('sTime').textContent = fmt(G.T);
  const host = isHost(), client = isClient();
  $('againBtn').hidden = client;
  $('againBtn').textContent = host ? 'Back to lobby' : 'Fight again';
  $('menuBtn').textContent = session.NET ? 'Leave' : 'Menu';
  $('endNote').textContent = client ? 'Waiting for the host to start the next battle…' : '';
  if (host) netHostSend(true);
  setTimeout(() => { if (G.state === 'end') $('ovEnd').hidden = false; }, 1600);
});
function endText(w, why) {
  if (w < 0) return 'Time ran out with no clear winner.';
  const names = allyNames(w), one = names.indexOf('&') < 0;
  if (why === 'castles') return `${names} tore down every enemy castle.`;
  if (why === 'tickets') return `${names} ${one ? 'is' : 'are'} the last side with tickets.`;
  if (why === 'caps') return `${names} carried the banner home ${CAPS_TO_WIN} times.`;
  return `Time is up and ${names} ${one ? 'leads' : 'lead'}.`;
}

// ---------- match start ----------
function viewForMatch() {
  buildWorldView(G.layout);
  clearEffects(); clearHorses();
  buildHud(); showHud(); trayOpen(false); upOpen(false);
  watchdog.reset();
  startCrowd(G.map.id);
}
function beginMatch(humans, active) {
  if (!session.NET) G.role = 'solo';
  startMatch(humans, active);
  cam.yaw = G.player.face; cam.pitch = CAM_PITCH;
  viewForMatch();
  sfx.horn();
}
setNetHooks({ onMatchStart: viewForMatch, onAbort: msg => netLeave(msg), onLobby: () => showLobby() });
bindLobby({ startMatch: beginMatch, seedDemo, preset: () => preset, resetSolo: () => resetSolo() });
bindInput(actions);

// ---------- title scene ----------
let demoT = 0, demoRider = null;
function seedDemo() {
  G.layout = makeLayout(G.map.id, false, false, 7); buildNav(G.layout);
  G.units = []; G.horses = []; G.arrows = []; G.flag = null; G.player = null; G.uid = 0;
  G.teams = newTeams([0, 0, 0, 0]);
  G.factions = assignFactions(TEAMS.map((_, i) => i === G.myTi ? prefs.faction : null), 7);
  buildWorldView(G.layout); clearEffects(); clearHorses();
  const kinds = ['foot', 'foot', 'arch', 'foot', 'arch'];
  TEAMS.forEach((t, i) => kinds.forEach((k, n) => { const [x, z] = gatePos(t, (n - 2) * 1.5); const u = mkUnit(i, x * .5, z * .5, k); u.face = Math.atan2(-u.x, -u.z); u.demo = true; }));
  const c = mkUnit(G.myTi, 0, 22, 'captain'); c.demo = true;
  const h = { id: 1, x: 0, z: 22, face: 0, state: 'ridden', rider: c, t: 0, spd: 9, ti: G.myTi };
  G.horses.push(h); c.mounted = true; c.horse = h; demoRider = c;
}
function demo(dt) {
  demoT += dt;
  if (demoRider && demoRider.horse) {
    const a = demoT * .35, r = demoRider; r.x = Math.cos(a) * 22; r.z = Math.sin(a) * 22; r.y = groundY(r.x, r.z);
    r.face = Math.atan2(-Math.sin(a), Math.cos(a)); r.vx = -Math.sin(a) * 8; r.vz = Math.cos(a) * 8;
    const h = r.horse; h.x = r.x; h.z = r.z; h.face = r.face; h.spd = 8;
  }
  drawSoldiers(G.units, dt);
  drawHorses(G.horses.map(h => ({ key: h.id, ti: h.ti, x: h.x, z: h.z, face: h.face, spd: h.spd, state: h.state, t: h.t, fall: h.fall })), dt);
  drawEffects();
  updateWorldView(dt, () => {});
  orbitCamera(demoT);
  followSun(0, 0, demoT);
  renderer.render(scene, camera);
  clearOverlay();
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
  const tdesc = describeTeams(G.ALLY, G.myTi);
  $('desc').innerHTML = `<strong>${MODES[G.mode].name}.</strong> ${MODES[G.mode].desc}<br><strong>${G.map.name}.</strong> ${G.map.desc} <strong>Teams:</strong> ${tdesc}`;
}
function updateQualityNote() {
  const lvl = LEVELS[quality.level].name;
  $('qualityNote').textContent = quality.stepped ? `Lowered to ${lvl} to keep the game smooth.` : quality.setting === 'auto' ? `Auto picked ${lvl} for this device.` : '';
  $('segQuality').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === quality.setting)));
}
seg('segMode', v => { G.mode = v; updateDesc(); });
seg('segMap', v => { G.map = MAPS[v]; updateDesc(); seedDemo(); });
seg('segTeams', v => { preset = v; G.ALLY = allyFor(v, G.myTi); updateDesc(); });
seg('segFaction', v => { prefs.faction = v; prefs.save(); seedDemo(); });
seg('segColor', v => { prefs.color = +v; prefs.save(); resetSolo(); updateDesc(); seedDemo(); });
// Duo for solo/vs-computer play: each color can get a second, computer-run army sharing its castle.
// Unlike the multiplayer lobby's Duo toggle, these are independent on/off chips, not a single-select segment.
const soloDuo = [false, false, false, false];
$('segDuo').querySelectorAll('button').forEach((b, i) => {
  b.addEventListener('click', () => { soloDuo[i] = !soloDuo[i]; b.setAttribute('aria-pressed', String(soloDuo[i])); });
});
function resetSolo() { G.role = 'solo'; G.myTi = prefs.color; G.ALLY = allyFor(preset, G.myTi); }
function soloStart() {
  initAudio(); session.NET = null; resetSolo();
  G.seed = (Math.random() * 1e9) | 0;
  G.factions = assignFactions(TEAMS.map((_, i) => i === G.myTi ? prefs.faction : null), G.seed);
  const active = [1, 1, 1, 1, ...soloDuo.map(d => d ? 1 : 0)];
  beginMatch(TEAMS.map((_, i) => i === G.myTi ? 1 : 0), active);
}
const pressSeg = (id, v) => $(id).querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === String(v))));
seg('segDiff', v => { G.diff = +v; });
seg('segQuality', v => {
  if (v === quality.setting) return;
  saveSetting(v);
  location.reload(); // antialiasing can only change with a fresh page
});
$('goBtn').addEventListener('click', soloStart);
$('againBtn').addEventListener('click', () => {
  initAudio();
  if (isHost()) { showLobby(); return; }
  soloStart();
});
$('menuBtn').addEventListener('click', () => {
  if (session.NET) { netLeave(); return; }
  G.state = 'title'; resetSolo(); $('ovEnd').hidden = true; $('hudWrap').hidden = true; $('ovTitle').hidden = false; seedDemo();
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
function drawMatch(dt) {
  drawSoldiers(G.units, dt);
  const horses = isClient() ? clientHorses() : G.horses.map(h => ({ key: h.id, ti: h.ti, x: h.x, z: h.z, face: h.face, spd: h.spd, state: h.state, t: h.t, fall: h.fall }));
  drawHorses(horses, dt);
  updateWorldView(dt, castleFx);
  effectsTick(dt);
  drawEffects();
  followCamera(dt);
  drawAura(G.player, auraRange(G.myTi), grassTime());
  const tg = camTarget(); followSun(tg ? tg.x : 0, tg ? tg.z : 0, grassTime());
  renderer.render(scene, camera);
  drawOverlay({ joy: inp.joy, nickFor });
}
function nickFor(ti) {
  const NET = session.NET; if (!NET) return null;
  const peers = NET.room.peers();
  const seats = NET.role === 'host' ? NET.seats : ((peers.find(p => p.peer === NET.hostPeer) || {}).presence || {}).seats || {};
  const peer = Object.keys(seats).find(k => seats[k] === ti); if (!peer) return null;
  const p = peers.find(x => x.peer === peer); return p && p.presence && p.presence.nick ? String(p.presence.nick).slice(0, 16) : null;
}
let hudT = 0, last = performance.now(), fpsAvg = 60;
function loop(now) {
  const raw = (now - last) / 1000; let dt = Math.min(.05, raw); last = now;
  if (hitstop > 0) { hitstop -= raw; dt *= .06; }
  if (raw > 0) fpsAvg += (1 / raw - fpsAvg) * .05;
  try {
    if (isClient() && (G.state === 'play' || G.state === 'end')) {
      if (clientTick(dt) && (G.state === 'play' || G.state === 'end')) drawMatch(dt); else demo(dt);
    } else if (G.state === 'play') {
      if (isHost()) netHostReadInputs();
      update(dt, readMove(dt));
      if (isHost() && G.state === 'play') netHostTick();
      drawMatch(dt);
      watchdog.tick(raw);
    } else if (G.state === 'end') {
      for (const u of G.units) if (u.dead) fallStep(u, dt);
      drawMatch(dt);
      if (isHost() && now - (session.NET.lastSend || 0) > 500) netHostSend(true);
    } else {
      demo(dt);
      if (G.state === 'lobby') {
        if (isClient()) clientLobbyTick();
        else if (isHost() && now - (session.NET.lastLobby || 0) > 700) { session.NET.lastLobby = now; hostLobbyTick(); }
      }
    }
    if (G.state === 'play') { hudT -= dt; if (hudT <= 0) { hudT = .1; updateHud(C.lastSnapAt); } }
  } catch (err) { console.error(err); }
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
  volley() { actions.volley(); },
  attack() { actions.attack(); }, jump() { actions.jump(); }, weapon(w) { actions.weapon(w); },
  G, cam,
};

function onResize() { resize(); resizeOverlay(); }
addEventListener('resize', onResize);
pressSeg('segFaction', prefs.faction); pressSeg('segColor', prefs.color); resetSolo();
applyShadowQuality(); onResize(); updateDesc(); updateQualityNote(); seedDemo(); requestAnimationFrame(loop);
