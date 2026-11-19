// Menus: battle settings, solo setup, the play buttons, warm-up, missions, shop, wardrobe, pause.
import { TEAMS, MODES, MAPS, RANKS, AL_LETTER, TARGETS } from '../config.js';
import { G, rules, matchTime, modeDesc, targetFor, SLOT_NAME } from '../core/state.js';
import { quality, saveSetting } from '../render/quality.js';
import { clearCritters } from '../render/critters.js';
import { setShake, shakeEnabled } from '../render/camera.js';
import { target, setTarget } from '../champions/blocks.js';
import { initAudio, sfx, setMusic, musicEnabled, setVibe, vibeEnabled } from '../ui/audio.js';
import { portal, onPortal } from '../portal.js';
import { initOrient } from '../ui/orient.js';
import { progress, crestUnlocked, setCrest } from '../ui/progress.js';
import { session, isHost, prefs } from '../net/session.js';
import { describeTeams } from '../core/teams.js';
import { SLOTS, lookCode } from '../core/look.js';
import { missions, rollSeason, seasonNow, SEASON, TRACK, tierOf, grantPass, owns, record, resetIn, season, give } from '../ui/season.js';
import { wardrobe } from '../ui/wardrobe.js';
import { showLobby, netLeave } from '../net/lobby.js';
import { ON, online, isLeader } from '../net/online.js';
import { crowns, titleOf, setCrowns } from '../ui/crowns.js';
import { ALL_MAPS, liveMode, focusMenus } from '../ui/maps.js';
import { $, S, hideVeil, resetSolo, saveSoloAl, showVeil, soloDuo } from './state.js';
import { buildCrests, newTip, renderMissSub } from './endscreen.js';
import { homeView, pressFmt, seedDemo, setHomeView, showFmtRank, soloStart } from './home.js';
import { renderFriends, toast } from './friends.js';
import { CHAMP_IDS, champDef, myChamp, setMyChamp } from '../champions/index.js';
import { aimChampPref, setAimChamp } from '../core/sim/ranged.js'; // (RANGE1)
import { setSoundLevel, soundLevel } from '../ui/audio.js';

// ---------- menus ----------
function seg(id, cb) {
  $(id).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $(id).querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    cb(b.dataset.v);
  });
}
export function updateDesc() {
  const tdesc = describeTeams(G.ALLY, G.myTi, soloDuo.map(d => d < 0));
  $('desc').innerHTML = `<strong>${MODES[G.mode].name} · ${rules().name}, about ${Math.round(matchTime() / 60)} min.</strong> ${modeDesc(MODES[G.mode])}<br><strong>${S.soloMap.name}.</strong> ${S.soloMap.desc} <strong>Teams:</strong> ${tdesc}`;
}
seg('segMode', v => { G.mode = v; G.target = prefs.tgt[G.mode] ?? targetFor(G.mode); renderTargets(); updateDesc(); });
seg('segMap', v => { S.soloMap = MAPS[v]; updateDesc(); });
export function renderSoloSeats() {
  const box = $('soloSeats'); box.innerHTML = '';
  TEAMS.forEach((t, i) => {
    const col = document.createElement('div'); col.className = 'seatcol';
    const seat = (label, who, extra) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'seat' + (extra ? ' slot2' : '') + (who === 'You' ? ' mine' : ''); b.style.background = t.css;
      const n = document.createElement('b'); n.textContent = label; const s = document.createElement('span'); s.textContent = who; b.append(n, s); return b; };
    const main = seat(t.name, i === prefs.color ? 'You' : 'Computer');
    main.addEventListener('click', () => { if (prefs.color === i) return; if (soloDuo[i] < 0) soloDuo[i] = 0; prefs.color = i; prefs.save(); resetSolo(); renderSoloSeats(); updateDesc(); seedDemo(); });
    const chip = document.createElement('span'); chip.className = 'alchip'; chip.setAttribute('role', 'button'); chip.tabIndex = 0; chip.textContent = 'Team ' + AL_LETTER[S.soloAl[i]]; chip.title = 'Tap to change team';
    chip.addEventListener('click', e => { e.stopPropagation(); S.soloAl[i] = (S.soloAl[i] + 1) % 4; saveSoloAl(); resetSolo(); renderSoloSeats(); updateDesc(); });
    // the chip cycles: Duo, Trio, Out (not in this battle: a 2- or 3-castle battle), and back. Never your own colour out.
    const out = soloDuo[i] < 0;
    const tog = document.createElement('span'); tog.className = 'duotog' + (soloDuo[i] > 0 ? ' on' : '') + (out ? ' outt' : ''); tog.setAttribute('role', 'button'); tog.tabIndex = 0; tog.textContent = out ? 'Out' : ['Duo', 'Duo', 'Trio'][soloDuo[i]];
    tog.addEventListener('click', e => { e.stopPropagation(); soloDuo[i] = soloDuo[i] === 2 ? (i === prefs.color || soloDuo.filter(d => d >= 0).length <= 2 ? 0 : -1) : soloDuo[i] + 1; renderSoloSeats(); updateDesc(); });
    if (out) { main.classList.add('outseat'); main.querySelector('span').textContent = 'Not in this battle'; }
    main.append(chip, tog); col.appendChild(main);
    for (let s = 1; s <= soloDuo[i]; s++) col.appendChild(seat(SLOT_NAME[s], 'Computer', true));
    box.appendChild(col);
  });
  const sides = new Set(S.soloAl.filter((_, i) => soloDuo[i] >= 0)).size;
  $('goBtn').disabled = sides < 2; // (everyone on one team: nobody to fight)
}
// each mode's target (tickets, captures...), shown for the mode picked
export function renderTargets() {
  const tg = $('segTime').closest('.grp'); if (tg) tg.hidden = G.mode === 'crown'; // (F13: the Crown is always 10:00: no length to pick)
  const T = TARGETS[G.mode], grp = $('segTarget').closest('.grp'); if (grp) grp.hidden = !T; if (!T) return; // (the Crown has no target to pick)
  $('targetLabel').textContent = T.label;
  $('segTarget').innerHTML = T.opts.map(([v, n]) => `<button type="button" data-v="${v}" aria-pressed="${v === (G.target ?? T.def)}">${n}</button>`).join('');
}
seg('segTime', v => { G.time = +v; prefs.time = +v; prefs.save(); updateDesc(); });
seg('segTarget', v => { G.target = +v; prefs.tgt[G.mode] = +v; prefs.save(); updateDesc(); });
export const pressSeg = (id, v) => $(id).querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === String(v))));
if (!ALL_MAPS) { focusMenus($); G.mode = 'crown'; G.target = targetFor('crown'); S.soloMap = MAPS.mount; pressSeg('segMode', 'crown'); renderTargets(); updateDesc(); } // (CL2: the Mountain is the live map)
seg('segDiff', v => { G.diff = +v; });
// (C1a) your champion, until the lobby's pick (S1-12): one button each
$('segChamp').innerHTML = CHAMP_IDS.map(id => `<button type="button" data-v="${id}" aria-pressed="false">${champDef(id).name}</button>`).join('');
seg('segChamp', v => { setMyChamp(v); pressSeg('segChamp', v); });
pressSeg('segChamp', myChamp());
// (RANGE1) a ranged champion's Targeting: the nearest enemy (default) or champions first
seg('segAim', v => { setAimChamp(v === 'champ'); pressSeg('segAim', v); });
pressSeg('segAim', aimChampPref() ? 'champ' : 'near');
// (FIX2) how loud the game is
seg('segVol', v => { setSoundLevel(v); pressSeg('segVol', v); });
pressSeg('segVol', soundLevel());
seg('segMusic', v => { setMusic(v === 'on'); pressSeg('segMusic', v); });
pressSeg('segMusic', musicEnabled() ? 'on' : 'off');
seg('segVibe', v => { setVibe(v === 'on'); pressSeg('segVibe', v); });
pressSeg('segVibe', vibeEnabled() ? 'on' : 'off');
seg('segTarget', v => { setTarget(v); pressSeg('segTarget', v); }); pressSeg('segTarget', target.mode); // (BS5)
seg('segShake', v => { setShake(v === 'on'); pressSeg('segShake', v); });
pressSeg('segShake', shakeEnabled() ? 'on' : 'off');
seg('segQuality', v => {
  if (v === quality.setting) return;
  saveSetting(v);
  location.reload(); // antialiasing can only change with a fresh page
});
// On phones, starting a battle takes the game full screen and sideways, so the browser's own bars
// don't eat a quarter of the view. It needs a tap to be allowed, so it hangs off the start buttons.
// (Android browsers honour this; iPhone Safari doesn't allow it, where "Add to Home Screen" does the job.)
const coarse = matchMedia('(pointer: coarse)').matches;
function goFullscreen() { /* (F15: now every tap does this; see ui/orient.js) */ }
initOrient({ G, onPortal, coarse });
['goBtn', 'quickBtn', 'againBtn', 'hostBtn', 'joinBtn', 'startBtn'].forEach(id => { const b = $(id); if (b) b.addEventListener('click', goFullscreen); });
['goBtn', 'quickBtn', 'startBtn'].forEach(id => { const b = $(id); if (b) b.addEventListener('pointerdown', showVeil); });
$('againBtn').addEventListener('pointerdown', () => { if (!isHost()) showVeil(); }); // a host's "again" goes to the lobby, not a battle
$('goBtn').addEventListener('click', () => { lastStart = () => soloStart(); soloStart(); });
// ("Fight again" after a Battle the computer battle: its own settings, not a Crown's)
// One tap to a fight: Quick (5 min), a random map and mode; keeps your army, colour, teams and
// difficulty. The menu shows what was picked, so "Fight again" repeats it.
$('quickBtn').addEventListener('click', () => {
  const pick = a => a[(Math.random() * a.length) | 0];
  const mode = liveMode(pick(Object.keys(MODES))), map = pick(['forum', 'valley', 'desert', 'frost']); // the four featured maps (CL2: the Crown only, unless ?maps=all)
  G.mode = mode; S.soloMap = MAPS[map]; G.time = 5; G.target = targetFor(mode);
  pressSeg('segMode', mode); pressSeg('segMap', map); pressSeg('segTime', 5); renderTargets();
  updateDesc(); lastStart = () => soloStart(); soloStart();
});
// ---------- the home: Play, the sheets, the wardrobe ----------
// PLAY: the Crown, in its format (Solo / Duo / Trio a side). Online matchmaking isn't open yet, so for
// now it's against computer captains: four sides, ten minutes, the places laid out afresh every time.
S.playFmt = (() => { try { return Math.min(2, Math.max(0, +localStorage.getItem('rally-fmt') || 0)); } catch (e) { return 0; } })();
pressFmt();
$('segFmt').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; S.playFmt = +b.dataset.v; try { localStorage.setItem('rally-fmt', String(S.playFmt)); } catch (er) {} pressFmt(); });
// ---------- missions, the season and the shop ----------
const itemOf = r => SLOTS.find(s => s.id === r.slot).items[r.item].name;
const slotIx = id => SLOTS.findIndex(s => s.id === id);
function renderMissions() {
  const S = season(), now = seasonNow(), t = tierOf(S.stars), into = S.stars - t * SEASON.tierStars;
  $('seasonT').textContent = `Season ${S.n}`; $('tierN').textContent = `Tier ${t}`; $('seasonLeft').textContent = `${now.daysLeft} days left`;
  $('tierFill').style.width = (t >= SEASON.tiers ? 100 : into / SEASON.tierStars * 100) + '%'; $('tierStars').textContent = t >= SEASON.tiers ? 'Top tier' : `${into}/${SEASON.tierStars} stars`;
  $('missReset').textContent = `new ones in ${resetIn()}`;
  $('missList').innerHTML = missions().map(m => `<div class="frow mrow${m.done ? ' done' : ''}"><b>${m.text}</b><em>${m.done ? 'Done' : `${m.prog}/${m.n}`}</em></div>`).join('');
  const rows = [...Object.entries(TRACK.free).map(([k, r]) => ['free', +k, r]), ...Object.entries(TRACK.gold).map(([k, r]) => ['gold', +k, r])].sort((a, b) => a[1] - b[1]);
  $('trackList').innerHTML = rows.map(([tr, k, r]) => { const have = owns(slotIx(r.slot), r.item); return `<div class="frow trow${have ? ' have' : ''}"><span class="tg${tr === 'gold' ? ' gold' : ''}">${tr === 'gold' ? 'Gold' : 'Free'} · tier ${k}</span><b>${itemOf(r)}</b><em>${have ? 'Yours' : tr === 'gold' && !S.pass ? 'Gold track' : `Tier ${k}`}</em></div>`; }).join('');
  $('passBtn').disabled = S.pass; $('passBtn').textContent = S.pass ? 'Gold track: yours' : 'Get the Gold track';
  const rec = record(); $('seasonRec').textContent = rec.length ? 'Your record: ' + rec.map(x => `Season ${x.season}: ${x.titles.join(' / ')}`).join(' · ') : '';
}
function renderShop() {
  const rows = []; SLOTS.forEach((sl, si) => sl.items.forEach((it, j) => { if (it.lock && it.lock.shop && !it.gone) rows.push({ si, j, sl, it }); }));
  $('shopList').innerHTML = rows.map(({ si, j, sl, it }) => `<div class="frow trow${owns(si, j) ? ' have' : ''}"><span class="tg">${sl.name}</span><b>${it.name}</b>${owns(si, j) ? '<em>Yours</em>' : `<div class="btns"><button type="button" class="go alt" data-buy="${sl.id}:${j}">${it.lock.price || 'Buy'}</button></div>`}</div>`).join('');
}
$('missBtn').addEventListener('click', () => { renderMissions(); setHomeView('missions'); });
$('missDone').addEventListener('click', () => setHomeView('home'));
$('shopBtn').addEventListener('click', () => { renderShop(); setHomeView('shop'); });
$('shopDone').addEventListener('click', () => setHomeView('home'));
const notOpen = () => toast('Buying opens when Rally launches. Nothing is charged.');
$('passBtn').addEventListener('click', () => portal.buy('season-pass', ok => { if (!ok) return notOpen(); const got = grantPass(); renderMissions(); toast(got.length ? `Gold track! Unlocked: ${got.join(', ')}` : 'Gold track! Its rewards come as you climb'); }));
$('shopList').addEventListener('click', e => { const b = e.target.closest('[data-buy]'); if (!b) return; const [slot, j] = b.dataset.buy.split(':'); portal.buy('look-' + slot + '-' + j, ok => { if (!ok) return notOpen(); give(slot, +j); renderShop(); ward.render(); toast('Yours: wear it from the wardrobe'); }); });
{ const prev = rollSeason({ crowns, setCrowns, titleOf }); if (prev) setTimeout(() => toast(`Season ${seasonNow().n} has begun! Your crowns were halved for a fresh climb`), 1500); renderMissSub(); showFmtRank(); }
let lastStart = () => soloStart();
function playStart() {
  const pick = a => a[(Math.random() * a.length) | 0];
  if (!S.soloPick) S.soloPick = { mode: G.mode, time: G.time, target: G.target };
  G.mode = 'crown'; G.time = 10; G.target = null;
  soloStart({ al: [0, 1, 2, 3], duo: [S.playFmt, S.playFmt, S.playFmt, S.playFmt], map: MAPS.mount });
  lastStart = playStart;
}
$('playBtn').addEventListener('pointerdown', showVeil);
$('playBtn').addEventListener('click', () => {
  goFullscreen();
  if (ON.up) { if (!isLeader()) { toast('Your party leader starts the search'); return; } hideVeil(); online.queue(S.playFmt); return; } // (online: find a battle)
  playStart();
});
$('cpuBtn').addEventListener('click', () => setHomeView('sheet', ['tabBattle']));
$('setBtn').addEventListener('click', () => setHomeView('sheet', ['tabSettings', 'tabHelp']));
$('sheetBack').addEventListener('click', () => setHomeView('home'));
// a friend: for now that's a private battle (a code to share)
$('privBtn').addEventListener('click', () => { initAudio(); $('mpBtn').click(); });
for (const id of ['pedL', 'pedR']) $(id).addEventListener('click', () => { initAudio(); if (ON.url) { renderFriends(); setHomeView('friends'); } else $('mpBtn').click(); }); // (online: invite a friend into that place)
// the wardrobe: built from the catalog; the stage shows each change at once
const ward = wardrobe($('ward'), {
  look: () => prefs.look, crest: () => progress.crest,
  crestOpen: i => crestUnlocked(i), crestNeed: i => `${RANKS[i].name} rank`, rankName: i => (RANKS[i] || RANKS[RANKS.length - 1]).name,
  onPick: (si, v) => { prefs.look = prefs.look.slice(); prefs.look[si] = v; prefs.save(); if (G.looks) G.looks[G.myTi] = prefs.look; sfx.draw && sfx.draw(); online.look(lookCode(prefs.look)); },
  onCrest: i => { if (setCrest(i)) { buildCrests(); if (G.crests) G.crests[G.myTi] = progress.crest; } },
});
void ward; // (MENU3: the closet is no longer on the home; champions with their own body don't wear its pieces. Kept for later skins.)
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
  if (!NET) S.paused = true;
  $('ovPause').hidden = false;
}
function closePause() { $('ovPause').hidden = true; S.paused = false; }
$('pauseBtn').addEventListener('click', e => { e.stopPropagation(); openPause(); });
$('resumeBtn').addEventListener('click', closePause);
$('quitBtn').addEventListener('click', async () => {
  closePause(); portal.gameplayStop();
  if (session.NET && session.NET.match && G.state === 'play') online.quit(); // (leaving a matchmade battle early)
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
