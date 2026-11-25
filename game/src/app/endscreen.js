// The end of a battle: results, report, moments, rank, crests; the home menu's tabs and tips; the match view.
import { TEAMS, MODES, RANKS, CRESTS, QUIPS, TIPS, FEEL } from '../config.js';
import { G, bus, colorOf, rules, SLOT_NAME } from '../core/state.js';
import { c2Breakdown } from '../core/sim.js';
import { applyPixelRatio, applyShadowQuality } from '../render/scene.js';
import { battleLevel } from '../render/quality.js';
import { buildWorldView } from '../render/world.js';
import { clearProps } from '../render/soldiers.js';
import { clearBanter } from '../render/banter.js';
import { clearFeed } from '../ui/feed.js';
import { clearMeadow } from '../render/meadow.js';
import { buildReport, renderCaptains, renderAwards, myLine, shareText, clearReport } from '../ui/report.js';
import { shareCard } from '../ui/sharecard.js';
import { spawnCritters } from '../render/critters.js';
import { clearHorses } from '../render/horses.js';
import { clearEffects } from '../render/effects.js';
import { clearFeel } from '../render/feel.js';
import { deathReset } from '../ui/death.js';
import { sfx, startCrowd, stopCrowd } from '../ui/audio.js';
import { portal } from '../portal.js';
import { allyNames, glory } from '../ui/messages.js';
import { renderPointsV2 } from '../ui/timeline.js';
import { buildHud, showHud, updateHud, banner } from '../ui/hud.js';
import { trayOpen, upOpen, releaseAll } from '../ui/input.js';
import { stopTutorial } from '../ui/tutorial.js';
import { progress, awardMatch, rankProgress, rankOf, crestUnlocked } from '../ui/progress.js';
import { session, isClient, isHost } from '../net/session.js';
import { pingMedian } from '../net/ping.js';
import { afterBattle, tierOf, season } from '../ui/season.js';
import { netHostSend, C } from '../net/netgame.js';
import { ON, online } from '../net/online.js';
import { endVersus } from '../ui/matchlobby.js';
import { award } from '../ui/crowns.js';
import { $, S, devNoIntro, hideVeil, nickFor } from './state.js';
import { watchdog } from './watchdog.js';

let storyPts = null; bus.on('story', () => { if (G.state === 'end' && storyPts) storyPts(); });
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
  try { sendReports(w, why); } catch (e) { console.error(e); }
  // the battle report (on a joined phone the tally arrives with the host's last snapshot: built again when it lands)
  const report = () => { const rep = buildReport(w, nickFor); lastRep = { rep, title };
    const m = myLine(rep); $('myRate').hidden = !m; if (m) { $('myRateN').textContent = m.me.rating.toFixed(1); $('myRateT').textContent = `${m.text}${m.me.mvp ? ' · MVP' : ''}`; }
    // an online Crown battle moves your crowns for its format
    if (m && session.NET && session.NET.match && G.mode === 'crown') {
      if (!G.crownAward) { G.crownAward = award(Math.max(0, Math.min(2, S.playFmt | 0)), result, m.me.rating); online.crowns(G.crownAward.all); }
      const A = G.crownAward; $('myRateT').textContent += ` · ${A.delta >= 0 ? '+' : ''}${A.delta} crowns${A.up ? ` · now ${A.up}!` : ''}`;
    }
    renderCaptains($('endCaps'), rep); renderAwards($('endAw'), rep); };
  report(); if (isClient()) setTimeout(() => { if (G.state === 'end') report(); }, 1200);
  const pts = () => { if (!G.c2) return; renderPointsV2($('endPts'), w); };
  $('ptsTab').hidden = !G.c2; pts(); if (isClient()) setTimeout(() => { if (G.state === 'end') pts(); }, 1200);
  storyPts = pts; // (the host's record of the battle lands a moment later: the Points tab is drawn again from it)
  endTab(G.c2 ? 'pts' : 'you');
  showRank(G.awarded ? null : awardMatch({ result, kills: G.kills, diff: G.diff })); G.awarded = true;
  // missions and the season (on a joined phone, once the host's tally has landed)
  $('endSeason').hidden = true;
  if (!G.seasoned) { G.seasoned = true; setTimeout(() => { if (G.state !== 'end') return;
    const r = afterBattle({ result, moments: (G.teams[G.myTi] && G.teams[G.myTi].hl) || {} });
    $('endSeason').textContent = [`+${r.stars} season stars`, ...r.done.map(t => `Mission done: ${t}`), r.tierUp ? `Tier ${r.tierUp}!` : '', ...r.got.map(n => `Unlocked: ${n}`)].filter(Boolean).join(' · ');
    $('endSeason').hidden = false; renderMissSub(); }, isClient() ? 1300 : 0); }
  const host = isHost(), client = isClient();
  $('againBtn').hidden = client;
  $('againBtn').textContent = host ? 'Back to lobby' : 'Fight again';
  $('menuBtn').textContent = session.NET ? 'Leave' : 'Menu';
  $('endNote').textContent = client ? 'Waiting for the host to start the next battle…' : '';
  if (host) netHostSend(true);
  setTimeout(() => { if (G.state !== 'end') return; const o = $('ovEnd'); o.style.setProperty('--fade', FEEL.end.fade + 's'); o.hidden = false; o.classList.remove('endFade'); void o.offsetWidth; o.classList.add('endFade'); }, FEEL.end.hold * 1000); // (F7h: hold on the final moment, then fade)
});
let lastRep = null;
function endTab(t) {
  document.querySelectorAll('.etabs [data-t]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.t === t)));
  $('endYou').hidden = t !== 'you'; $('endPts').hidden = t !== 'pts'; $('endCaps').hidden = t !== 'caps'; $('endAw').hidden = t !== 'aw';
}
document.querySelectorAll('.etabs [data-t]').forEach(b => b.addEventListener('click', () => endTab(b.dataset.t)));
$('shareBtn').addEventListener('click', async () => {
  if (!lastRep) return;
  const text = shareText(lastRep.rep, lastRep.title), url = location.origin + location.pathname;
  // the picture card where the phone can share files (WhatsApp takes it with the text as its caption)
  try { const blob = await shareCard(lastRep.rep, lastRep.title), file = blob && new File([blob], 'rally.png', { type: 'image/png' });
    if (import.meta.env.DEV) window.__card = blob;
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text: text + ' ' + url }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  try { if (navigator.share) { await navigator.share({ text, url }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank', 'noopener');
});
// The admin numbers (only while signed in to the online service; never the warm-up): every phone sends its
// health (frame rate, link, errors); the phone that ran the battle (solo, or the host) sends its summary.
export const perfS = { n: 0, fps: 0, slow: 0, errs: 0 };
// a short name for the phone and its browser, e.g. "Android 14 · Chrome" (for the admin's Phones panel)
function phoneType(ua) {
  const a = ua.match(/Android (\d+)/), i = ua.match(/iPhone|iPad/);
  const os = a ? `Android ${a[1]}` : i ? i[0] : /Windows/.test(ua) ? 'Windows' : /Mac OS X/.test(ua) ? 'Mac' : /CrOS/.test(ua) ? 'ChromeOS' : /Linux/.test(ua) ? 'Linux' : '?';
  const br = /Edg[A-Z]?\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : '?';
  return `${os} · ${br}`;
}
function sendReports(w, why) {
  if (G.warmup || !ON.me || G.reported === G.seed) return; G.reported = G.seed;
  const ua = navigator.userAgent, dev = phoneType(ua);
  online.perf({ client: isClient(), mobile: /Android|iPhone|iPad|Mobile/i.test(ua), relay: !!ON.relayed, ping: isClient() ? pingMedian(session.NET) || 0 : 0, fps: perfS.n ? perfS.fps / perfS.n : 0, slow: perfS.n ? perfS.slow / perfS.n * 100 : 0, errs: perfS.errs, dev });
  if (isClient()) return;
  const act = G.teams.map((t, i) => i).filter(i => G.teams[i] && G.teams[i].active), cols = a => [0, 1, 2, 3].filter(c => G.ALLY[c] === a && act.some(i => colorOf(i) === c)).join('');
  const sides = [...new Set(act.map(i => G.ALLY[colorOf(i)]))].map(a => { const b = G.c2 ? c2Breakdown(a) : null; return b ? { c: cols(a), pts: b.total, cas: b.castles, vil: b.villages, chest: b.chest, crown: b.crown, caps: b.caps } : { c: cols(a), pts: 0 }; });
  const seats = (ON.start && ON.start.seats) || {}, idOf = i => i === G.myTi ? ON.me.id : (Object.keys(seats).find(k => seats[k] === i) || '');
  online.report({ fmt: Math.max(0, ...(G.duo || [0]).map(n => n | 0)), mode: G.mode, map: G.map.id, humans: act.filter(i => G.teams[i].human).length, bots: act.filter(i => !G.teams[i].human).length,
    len: G.T, endk: why, win: w < 0 ? '' : cols(w), sides, players: act.map(i => [idOf(i), colorOf(i), G.teams[i].human ? 1 : 0]),
    chestT: glory.chest ? glory.chest.T : 0, chestBy: glory.chest ? cols(glory.chest.a) : '', crownT: glory.crown ? glory.crown.T : 0, crownBy: glory.crown ? cols(glory.crown.a) : '',
    capDeaths: (G.deaths && G.deaths.cap) || {}, menDeaths: (G.deaths && G.deaths.men) || {}, clearT: (G.c2 && G.c2.clearT) || 0, diff: typeof G.diff === 'number' ? G.diff : 0 });
}
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
    n('chest', 'Took the Sceptre', 'Took the Sceptre'),
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
    sum('chest') ? 'Took the Sceptre' : null,
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
export function buildCrests() {
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
export function newTip() { $('tip').textContent = 'Tip: ' + TIPS[(Math.random() * TIPS.length) | 0]; }
newTip();
// Home menu tabs: one panel at a time, the play buttons always in reach.
export const tabs = [...document.querySelectorAll('#ovTitle .tabs button')];
export function showTab(id) {
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
  if (why === 'crown') return `${names} ${one ? 'holds' : 'hold'} the Crown at the final trumpet.`;
  if (why === 'crown2') return `The glacier broke and the battle ended: ${names} ${one ? 'wins' : 'win'} on points.`;
  if (why === 'points2') return `Time is up: ${names} ${one ? 'wins' : 'win'} on points.`;
  if (why === 'places') return `Nobody held the Crown: ${names} held the most of the land.`;
  if (why === 'tickets') return `${names} ${one ? 'is' : 'are'} the last side with tickets.`;
  if (why === 'caps') return `${names} carried the banner home ${rules().caps} times.`;
  return `Time is up and ${names} ${one ? 'leads' : 'lead'}.`;
}

// ---------- match start ----------
export function viewForMatch() {
  endVersus(); // (F2)
  battleLevel(); applyShadowQuality(); applyPixelRatio(); // (F14: what is built once follows the rung reached)
  clearMeadow();
  buildWorldView(G.layout);
  clearEffects(); clearFeel(); deathReset(); clearHorses(); clearProps(); clearBanter(); clearFeed(); clearReport(); spawnCritters(G.seed);
  buildHud(); showHud(); trayOpen(false); upOpen(false);
  portal.gameplayStart();
  requestAnimationFrame(() => requestAnimationFrame(hideVeil));
  watchdog.reset();
  startCrowd(G.map.id); Object.assign(perfS, { n: 0, fps: 0, slow: 0, errs: 0 });
  if (isClient() && !devNoIntro()) { S.clientIntro = true; G.introOn = true; } // (a joined phone plays the opening as well, once its captain is known)
}
export function renderMissSub() { const S = season(); $('missSub').textContent = S ? `Season ${S.n} · tier ${tierOf(S.stars)}` : 'Season 1'; }
