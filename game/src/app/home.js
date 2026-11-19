// The home stage (your captain, the demo battle, the camera, party pedestals, the format's rank),
// the battle's opening, starting a match.
import * as THREE from 'three';
import { walkable, buildNav } from '../core/nav.js';
import { TEAMS, MAPS, FEEL } from '../config.js';
import { G, colorOf, activeFrom } from '../core/state.js';
import { startMatch, mkUnit, newTeams } from '../core/sim.js';
import { makeLayout, gatePos, groundY, W } from '../core/world.js';
import { renderer, scene, camera, followSun } from '../render/scene.js';
import { buildWorldView, updateWorldView } from '../render/world.js';
import { drawSoldiers, clearProps } from '../render/soldiers.js';
import { spawnMeadow, updateMeadow, clearMeadow } from '../render/meadow.js';
import { hideDuelTag } from '../ui/dueltag.js';
import { clearCritters } from '../render/critters.js';
import { drawHorses, clearHorses } from '../render/horses.js';
import { drawEffects, clearEffects } from '../render/effects.js';
import { clearOverlay } from '../render/overlay.js';
import { cam, orbitCamera, CAM_PITCH, introCam } from '../render/camera.js';
import { clearFeel } from '../render/feel.js';
import { deathReset, fadeToBlack, fadeBackIn } from '../ui/death.js';
import { initAudio, sfx } from '../ui/audio.js';
import { bindInput } from '../ui/input.js';
import { startTutorial, bindTutorial } from '../ui/tutorial.js';
import { progress } from '../ui/progress.js';
import { session, prefs } from '../net/session.js';
import { assignLooks, lookFrom } from '../core/look.js';
import { assignChamps, myChamp, champDef, ownedIds } from '../champions/index.js';
import { ROSTER } from '../config.js';
import { actions, setNetHooks } from '../net/netgame.js';
import { bindLobby, showLobby, netLeave } from '../net/lobby.js';
import { ON } from '../net/online.js';
import { crowns, titleOf, FMT_NAME } from '../ui/crowns.js';
import { liveMode } from '../ui/maps.js';
import { $, S, devNoIntro, resetSolo, soloDuo } from './state.js';
import { showTab, tabs, viewForMatch } from './endscreen.js';

// The opening of a computer battle: the camera rises over the whole field, comes in to your captain while
// the count runs 3, 2, 1, and the men are let go on "RUN FOR YOUR LIFE, YOU FOOLS!". The sim waits for it.
const INTRO = { fly: 2.2, from: 4.6, go: 7.0, count: [[4.6, '3'], [5.4, '2'], [6.2, '1'], [7.0, 'RUN FOR YOUR LIFE, YOU FOOLS!']] };
export let intro = null; S.noIntro = false; S.clientIntro = false;
function introText(txt, big) {
  const el = $('introT'); el.textContent = txt; el.classList.toggle('go', !!big); el.hidden = false;
  el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
}
export function startIntro(p) {
  intro = { t: 0, next: 0, a0: Math.atan2(p.x, p.z), p, fp: new THREE.Vector3(), fl: new THREE.Vector3() };
  $('hudWrap').style.visibility = 'hidden';
  introCam.on = (c, tgt) => {
    const I = intro; if (!I) return;
    const yaw = cam.yaw, fx = tgt.x + Math.sin(yaw) * 3, fz = tgt.z + Math.cos(yaw) * 3;
    I.fp.copy(c.position); I.fl.set(fx, tgt.y + 1.6, fz); // (where the follow camera had him)
    const R = W.R * 1.05, a = I.a0 + I.t * .07, H = W.R * .55 + 8;
    const ov = new THREE.Vector3(Math.sin(a) * R, H, Math.cos(a) * R), ovl = new THREE.Vector3(0, groundY(0, 0) + 2, 0);
    c.position.copy(ov); c.lookAt(ovl); // (F7: the flyover stays up over the field; the way down to him is a fade to black, see introTick)
  };
  introText('', false); $('introT').hidden = true; G.introOn = true;
}
export function introTick(dt) {
  const I = intro; I.t += dt;
  while (I.next < INTRO.count.length && I.t >= INTRO.count[I.next][0]) { const [, txt] = INTRO.count[I.next++]; const big = txt.length > 2; introText(txt, big); if (big) { if (!G.c2) sfx.horn(); } else sfx.uiClick(); } // (F7: on the mountain the horn sounds as he marches out)
  if (!I.black && I.t >= INTRO.go - FEEL.march.fade) { I.black = true; fadeToBlack(FEEL.march.fade); } // (F7: after the flyover, to black; the camera goes to him under it)
  if (I.t >= INTRO.go) { intro = null; introCam.on = null; G.introOn = false; fadeBackIn(performance.now()); $('hudWrap').style.visibility = ''; setTimeout(() => { $('introT').hidden = true; }, 1800); }
}
function beginMatch(humans, active) {
  G.crownAward = null;
  if (!session.NET) G.role = 'solo';
  startMatch(humans, active);
  cam.yaw = G.player.face; cam.pitch = CAM_PITCH;
  viewForMatch();
  if (!G.c2) sfx.horn(); // (F7: on the mountain, one horn as he marches out)
  startTutorial();
  if (!S.noIntro && !devNoIntro()) { G.state = 'intro'; startIntro(G.player); } // (the opening: every real battle, solo or hosted; never the warm-up; dev tests skip it unless they ask)
}
setNetHooks({ onMatchStart: viewForMatch, onAbort: msg => netLeave(msg), onLobby: () => showLobby() });
bindLobby({ startMatch: beginMatch, seedDemo, teams: () => S.soloAl.slice(), resetSolo: () => resetSolo() });
bindInput(actions); bindTutorial();

// ---------- the home stage: your captain before his castle, his men behind him ----------
// The camera stands in front of him; with a sheet open (the wardrobe, the battle setup) it slides so
// he stays in view beside it. Two "+" places stand either side of him for friends.
S.soloMap = G.map; // the map picked for Battle the computer
S.soloPick = null; // (its mode, length and target, put back when a Crown battle has borrowed G)
export let demoT = 0, homeCap = null, homeView = 'home'; // 'home' | 'sheet' | 'ward' | 'champs' (MENU2)
let champSx = -2.2, champYaw = 0; // (MENU2: the camera's slide that puts him in the Champions screen's window; his turn there)
// (MENU2/3) which champion stands on your stage: your main, or the one the Champions screen shows
export function previewChamp(id) { (G.champs || (G.champs = []))[G.myTi] = id; }
export const homeTurn = d => { champYaw += d; };
const homeV = { sx: 0, k: 0 }; // (the camera's eased slide)
export function seedDemo() {
  if (S.soloPick) { G.mode = S.soloPick.mode; G.time = S.soloPick.time; G.target = S.soloPick.target; S.soloPick = null; }
  G.map = MAPS.valley; // (the home is always out in the green valley; the battle's map is kept in soloMap)
  G.layout = makeLayout(G.map.id, false, false, 7); buildNav(G.layout);
  G.units = []; G.horses = []; G.arrows = []; G.flag = null; G.player = null; G.uid = 0; clearCritters();
  G.teams = newTeams([0, 0, 0, 0]);
  G.looks = assignLooks({ [G.myTi]: prefs.look }, 7);
  G.crests = []; G.crests[G.myTi] = progress.crest;
  G.champs = []; G.champs[G.myTi] = myChamp(); // (MENU3: your main on the stage)
  buildWorldView(G.layout); clearEffects(); clearFeel(); deathReset(); clearHorses(); clearProps();
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
  // (kept clear of the two party places, 2.5 to each side of him: the rank close behind, the archers out wide)
  [[-1.3, -4.4, 'foot'], [0, -4.9, 'foot'], [1.3, -4.4, 'foot'], [-6.4, -4, 'arch'], [6.4, -4, 'arch']].forEach(([sp, ex, k]) => {
    const [x, z] = gatePos(t, sp0 + sp, ex0 - ex); const u = mkUnit(G.myTi, x, z, k); u.face = homeCap.face; u.demo = true;
  });
  spawnMeadow(cx, cz, lx, lz);
  partyFigs = []; setTimeout(placeParty, 0);
}
const _v = new THREE.Vector3();
function homeCamera(dt) {
  const c = homeCap; if (!c) { orbitCamera(demoT); return; }
  const d = Math.hypot(c.x, c.z) || 1, fx = c.x / d, fz = c.z / d, rx = -fz, rz = fx; // (from him toward the camera, and sideways)
  const wide = innerWidth / Math.max(1, innerHeight) > 1.5;
  const want = homeView === 'champs' ? champSx : homeView === 'home' ? -2.2 : homeView === 'ward' || homeView === 'friends' ? (wide ? 1.7 : 1.3) : (wide ? -4.4 : -2.4); // (beside the sheet: right of the wardrobe, left of the setup)
  homeV.sx += (want - homeV.sx) * Math.min(1, dt * 5);
  // the captain turns to face you, swaying a little in the wardrobe so the cape shows
  const sway = homeView === 'ward' || homeView === 'friends' || homeView === 'champs' ? Math.sin(demoT * .7) * .75 : Math.sin(demoT * .3) * .12;
  c.face = Math.atan2(fx, fz) + (homeView === 'champs' ? champYaw : sway); c.vx = c.vz = 0;
  if (homeView !== 'champs') champYaw *= Math.max(0, 1 - dt * 4); // (turned back to face you after)
  const gy = groundY(c.x, c.z), dist = homeView === 'champs' ? 6.2 : homeView === 'ward' || homeView === 'friends' ? 5.2 : 6.4, ty = gy + (homeView === 'ward' || homeView === 'friends' ? 1.3 : 1.45);
  const tx = c.x + rx * homeV.sx, tz = c.z + rz * homeV.sx;
  camera.position.set(tx + fx * dist, ty + 1.15, tz + fz * dist);
  camera.lookAt(tx, ty, tz);
  if (homeView === 'champs') { // (MENU2: slide until he stands in the middle of the screen's model window)
    const m = $('csModel'), r = m && m.getBoundingClientRect();
    if (r && r.width) { camera.updateMatrixWorld(); _v.set(c.x, gy + 1.2, c.z).project(camera); const px = (_v.x + 1) / 2 * innerWidth; champSx -= (px - (r.left + r.width / 2)) / innerWidth * 6 * Math.min(1, dt * 6); champSx = Math.max(-9, Math.min(9, champSx)); }
  }
  // the "+" places beside him, one on each side (as in a game lobby), on screen where they stand in the
  // world. On a narrow screen both come in closer, evenly, so the right one stays clear of the Play panel.
  const pr = $('home').querySelector('.hplay').getBoundingClientRect();
  const under = (side, off) => { _v.set(c.x + rx * side * off, gy + 1.15, c.z + rz * side * off).project(camera); const px = (_v.x + 1) / 2 * innerWidth, py = (1 - _v.y) / 2 * innerHeight; return px > pr.left - 36 && py > pr.top - 36; };
  const mr = $('home').querySelector('.hleft').getBoundingClientRect();
  const overMenu = off => { _v.set(c.x + rx * off, gy + 1.15, c.z + rz * off).project(camera); return (_v.x + 1) / 2 * innerWidth < mr.right + 40; }; // (the left place, clear of the menu buttons)
  const off = [2.5, 2.2, 1.9, 1.7, 1.5].find(o => !under(-1, o) && !overMenu(o)) || 1.5;
  if (off !== pedOff) { pedOff = off; placeParty(); }
  { // (MENU3) your champion: a tap on him opens his card; his name under him
    const hc = $('homeChamp'); _v.set(c.x, gy, c.z).project(camera); const px = (_v.x + 1) / 2 * innerWidth, feet = (1 - _v.y) / 2 * innerHeight;
    hc.hidden = homeView !== 'home' || _v.z > 1;
    if (!hc.hidden) { _v.set(c.x, gy + 2.7, c.z).project(camera); const head = (1 - _v.y) / 2 * innerHeight; hc.style.left = px + 'px'; hc.style.top = head + 'px'; hc.style.height = Math.max(40, feet - head) + 'px'; }
  }
  for (const [id, k] of [['pedL', 0], ['pedR', 1]]) {
    const el = $(id); if (!el) continue;
    if (homeView !== 'home') { el.hidden = true; continue; }
    const pm = partyOthers()[k];
    if (!pm && S.playFmt < k + 1) { el.hidden = true; continue; } // (a "+" only for the places the chosen mode needs: duo one, trio two)
    el.classList.toggle('taken', !!pm); el.querySelector('span').textContent = pm ? pm.nick : '+';
    el.setAttribute('aria-label', pm ? `${pm.nick}, in your party` : 'Play with a friend');
    const [side, off] = pedSpot(k);
    _v.set(c.x + rx * side * off, gy + (pm ? 3 : 1.15), c.z + rz * side * off).project(camera);
    const px = (_v.x + 1) / 2 * innerWidth, py = (1 - _v.y) / 2 * innerHeight;
    el.hidden = _v.z > 1 || (px > pr.left - 36 && py > pr.top - 36); // (never under the Play panel)
    el.style.left = px + 'px'; el.style.top = py + 'px';
  }
}
// where party place k stands beside your captain: [side, distance] (left, then right)
let pedOff = 2.5;
const pedSpot = k => [k === 0 ? 1 : -1, pedOff];
// ---------- online: the party on your stage, friends, invites, the search ----------
export const partyOthers = () => (ON.party && ON.party.members || []).filter(m => !ON.me || m.id !== ON.me.id);
let partyFigs = [];
export function placeParty() { // party members' captains on the pedestals beside yours, in their own outfits
  for (const u of partyFigs) { const i = G.units.indexOf(u); if (i >= 0) G.units.splice(i, 1); } partyFigs = [];
  homeInfo();
  const c = homeCap; if (!c || G.state !== 'title') return;
  const d = Math.hypot(c.x, c.z) || 1, rx = -c.z / d, rz = c.x / d;
  partyOthers().slice(0, 2).forEach((m, k) => {
    const [side, off] = pedSpot(k), ti = G.myTi + 4 * (k + 1), u = mkUnit(ti, c.x + rx * side * off, c.z + rz * side * off, 'captain');
    (G.champs || (G.champs = []))[ti] = m.ch || myChamp(); // (MENU3: each friend in their own main)
    u.demo = true; u.face = c.face; G.looks[ti] = lookFrom(m.look) || G.looks[ti]; partyFigs.push(u);
  });
}
// (MENU3) the home's words: your champion's name, Champions' count, the party's format and the "2 × Titus" note
let partyN = -1;
export function homeInfo() {
  const me = myChamp(), name = champDef(me).name.split(' ')[0];
  $('homeChampName').innerHTML = `${name} <span aria-hidden="true">★</span>`;
  $('champsSub').textContent = `${ROSTER.length} · ${ownedIds().length} owned`;
  const others = partyOthers(), n = others.length;
  if (n !== partyN) { if (partyN >= 0 || n) { S.playFmt = Math.min(2, n); pressFmt(); } partyN = n; } // (Solo / Duo / Trio follow who is in your party)
  const same = others.filter(m => (m.ch || '') === me), note = $('twoNote');
  note.hidden = !same.length; if (same.length) note.textContent = `${same.length + 1} × ${name}: ${same.length > 1 ? 'two of you pick' : 'one of you picks'} another in the lobby`;
}
export function demo(dt) {
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
export function setHomeView(v, tabsShown) {
  if (import.meta.env.DEV && window.__testSheet && v === 'home') { v = 'sheet'; tabsShown = ['tabBattle']; } // (dev: older tests drive the setup sheet)
  homeView = v;
  $('home').hidden = v !== 'home'; $('homeSheet').hidden = v !== 'sheet'; $('ward').hidden = v !== 'ward'; $('friendsPanel').hidden = v !== 'friends'; $('missPanel').hidden = v !== 'missions'; $('shopPanel').hidden = v !== 'shop'; if ($('champScreen')) $('champScreen').hidden = v !== 'champs';
  $('ovTitle').classList.toggle('homing', v !== 'sheet'); $('ovTitle').classList.toggle('sheet', v === 'sheet');
  if (v === 'sheet') {
    tabs.forEach(t => { t.hidden = !tabsShown.includes(t.dataset.tab); });
    showTab(tabsShown[0]);
    $('goBtn').hidden = !tabsShown.includes('tabBattle'); $('mpBtn').hidden = !(import.meta.env.DEV && window.__testSheet);
    $('ovTitle').scrollTop = 0;
  }
}
export function soloStart(o = {}) {
  initAudio(); session.NET = null; resetSolo();
  if (o.al) G.ALLY = o.al.slice();
  if (!o.map) G.mode = liveMode(G.mode); // (CL2: a hidden mode or map falls back to the Crown; the warm-up names its own)
  G.map = G.mode === 'crown' ? MAPS.mount : (o.map || S.soloMap); clearMeadow(); // (the Crown is always the mountain)
  if (G.map.id === 'mount') G.time = 10; // (the mountain's phases are set to the minute)
  G.seed = (Math.random() * 1e9) | 0;
  G.looks = assignLooks({ [G.myTi]: prefs.look }, G.seed);
  assignChamps({ [G.myTi]: myChamp() }); // (C1a)
  const active = activeFrom(o.duo || soloDuo);
  G.crests = []; G.crests[G.myTi] = progress.crest;
  beginMatch(TEAMS.map((_, i) => i === G.myTi ? 1 : 0), active);
}
export const pressFmt = () => { $('segFmt').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.v === S.playFmt))); showFmtRank(); };
export function showFmtRank() { const n = crowns()[S.playFmt], t = titleOf(n); $('fmtRank').innerHTML = `${FMT_NAME[S.playFmt]} · <b>${t.name}</b> · ${n} crowns${t.next ? `<span> · ${t.toNext} to ${t.next}</span>` : ''}`; }
