// Friends, invites, the online search, the warm-up while searching, matchmade starts.
import { TEAMS, MAPS } from '../config.js';
import { G, bus } from '../core/state.js';
import { initAudio } from '../ui/audio.js';
import { session } from '../net/session.js';
import { matchHost, matchJoin } from '../net/lobby.js';
import { ON, online, isLeader } from '../net/online.js';
import { mlRender, mlHide, mlOpen, showVersus, hideVersus } from '../ui/matchlobby.js';
import { mergeCrowns } from '../ui/crowns.js';
import { $, S, resetSolo } from './state.js';
import { homeView, partyOthers, placeParty, seedDemo, setHomeView, showFmtRank, soloStart } from './home.js';

function fmtClock(ms) { const s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
let toastT = 0;
export function toast(text, invite) {
  $('inviteT').textContent = text; $('inviteYes').hidden = $('inviteNo').hidden = !invite; $('inviteToast').hidden = false;
  clearTimeout(toastT); toastT = setTimeout(() => { $('inviteToast').hidden = true; }, invite ? 15000 : 3500);
}
const whereText = f => !f.online ? 'Offline' : f.where === 'battle' ? `In a battle${f.since ? ' · ' + fmtClock(f.since) : ''}` : f.where === 'lobby' ? `Searching ${['Solo', 'Duo', 'Trio'][f.fmt | 0]}` : f.party > 1 ? `In a party of ${f.party}` : 'At home';
export function renderFriends() {
  $('fCode').textContent = ON.me ? ON.me.id : (ON.url ? 'connecting…' : 'offline');
  if (!ON.url) $('fNote').textContent = 'Friends and online battles open once the online service is switched on. Private battles by code work now.';
  if (document.activeElement !== $('fNick')) $('fNick').value = session.myNick || (ON.me && ON.me.nick) || '';
  const inParty = id => partyOthers().some(m => m.id === id);
  $('fReqs').innerHTML = ON.reqs.map(r => `<div class="frow req"><i class="on"></i><div><b>${esc(r.nick)}</b><small>wants to be friends</small></div><div class="btns"><button type="button" class="go" data-acc="${r.id}">Accept</button><button type="button" class="go ghost" data-dec="${r.id}">No</button></div></div>`).join('');
  const pm = partyOthers(), lead = ON.party && ON.me && ON.party.leader === ON.me.id; // (F23: your party, with Remove for the leader and Leave for everyone)
  $('fParty').innerHTML = pm.length ? `<p class="fhead">Your party${lead ? ' · you lead' : ''}<button type="button" class="go ghost" data-pleave>Leave party</button></p>` + pm.map(m => `<div class="frow"><i class="on"></i><div><b>${esc(m.nick)}</b><small>${m.leader ? 'Party leader' : 'In your party'}</small></div><div class="btns">${lead ? `<button type="button" class="go ghost" data-kick="${esc(m.id)}">Remove</button>` : ''}</div></div>`).join('') : '';
  $('fList').innerHTML = ON.friends.length ? ON.friends.slice().sort((a, b) => b.online - a.online).map(f => `<div class="frow"><i class="${f.online ? 'on' : ''}"></i><div><b>${esc(f.nick)}</b><small>${inParty(f.id) ? 'In your party' : whereText(f)}</small></div><div class="btns">${
    f.online && !inParty(f.id) ? `<button type="button" class="go alt" data-inv="${f.id}">Invite</button>` : ''}${
    f.online && !inParty(f.id) && (f.where !== 'home' || f.party > 1) ? `<button type="button" class="go" data-join="${f.id}">Join</button>` : ''}</div></div>`).join('')
    : '<p class="wsub">No friends yet. Share your code, or add a friend\'s.</p>';
  const on = ON.friends.filter(f => f.online).length;
  $('friendsSub').innerHTML = !ON.url ? 'Play together' : !ON.up ? 'Connecting…' : on ? `${on} online<span class="dot"></span>` : 'Play together';
  if (partyOthers().length && ON.up) $('playSub').textContent = isLeader() ? `The Crown · your party of ${partyOthers().length + 1}` : 'Your party leader starts the search';
  else $('playSub').textContent = ON.up ? 'The Crown · online' : 'The Crown · 12 players, computers fill in';
}
const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function renderSearch() {
  const L = ON.lobby, box = $('searchBox');
  box.hidden = !L; $('playBtn').hidden = !!L;
  if (!L) { renderSearch.seen = null; mlHide(); $('searchLobby').hidden = true; if (G.warmup) warmupStop(true); return; }
  if (!G.warmup && G.state === 'title') warmupStart();
  const v2 = L.v === 2; $('searchLobby').hidden = !v2; // (F2: the lobby is a pop-up over the warm-up; an older service has none)
  const cap = [1, 2, 3][L.fmt], filled = L.sides.flat().filter(Boolean).length, total = cap * 4, me = ON.me && ON.me.id;
  const mineX = L.sides.flat().find(x => x && x.id === me);
  $('searchT').textContent = v2 ? `${['Solo', 'Duo', 'Trio'][L.fmt]} · ${filled}/${total}${mineX && mineX.ready ? ' · Ready' : ''}` : filled === total ? 'Full: starting now' : `Finding players · ${['Solo', 'Duo', 'Trio'][L.fmt]} · ${filled}/${total}`;
  if (v2) mlRender(L);
  // a small flash as someone takes a seat (the seat list stays out of the way while you warm up)
  const ids = L.sides.flat().filter(x => x && x.id !== me), seen = renderSearch.seen || new Set();
  for (const x of ids) if (!seen.has(x.id) && renderSearch.seen) toast(`${x.nick} joined Army ${'ABCD'[L.sides.findIndex(sd => sd.includes(x))]}`);
  renderSearch.seen = new Set(ids.map(x => x.id));
  // the lobby: four armies, a seat per captain of each; players by name (yours marked), open seats waiting
  $('searchSides').innerHTML = L.sides.map((sd, c) => `<div class="lobSide" style="--c:${TEAMS[c].css}"><h4>Army ${'ABCD'[c]}</h4>` +
    Array.from({ length: cap }, (_, k) => { const x = sd[k]; return x ? `<p class="lobSlot${x.id === me ? ' me' : ''}"><b>${esc(x.nick)}</b>${x.id === me ? '<em>you</em>' : ''}</p>` : `<p class="lobSlot open">Open seat</p>`; }).join('') + '</div>').join('');
  $('searchNote').textContent = filled === total ? 'Full: starting now' : 'Starts when all seats are filled, or when the clock runs out. Empty seats are played by computer captains.';
  L.at = performance.now();
}
setInterval(() => { const L = ON.lobby; if (L && L.at != null) $('searchClock').textContent = fmtClock(L.endsIn - (performance.now() - L.at)); }, 250);
bus.on('online', ({ k, m }) => {
  if (k === 'me') { const merged = mergeCrowns(m.crowns); if (merged.some((n, i) => n > ((m.crowns || [])[i] | 0))) online.crowns(merged); showFmtRank(); }
  if (k === 'me' || k === 'friends' || k === 'party' || k === 'off' || k === 'down') { renderFriends(); if (k === 'party') placeParty(); }
  if (k === 'lobby') renderSearch();
  if (k === 'note') { $('fNote').textContent = m.msg; if (homeView !== 'friends') toast(m.msg); }
  if (k === 'invite') { toast(`${m.nick} invites you to their party`, true); $('inviteYes').onclick = () => { online.acceptInvite(m.from); $('inviteToast').hidden = true; }; }
  if (k === 'kicked') toast(m.msg);
  if (k === 'removed') { renderFriends(); toast(`${m.by} removed you from the party`); }
  if (k === 'start') startMatchmade(m);
});
$('inviteNo').addEventListener('click', () => { $('inviteToast').hidden = true; });
$('friendsBtn').addEventListener('click', () => { renderFriends(); setHomeView('friends'); });
$('friendsDone').addEventListener('click', () => setHomeView('home'));
$('fNick').addEventListener('change', () => { session.myNick = ($('fNick').value || '').trim().slice(0, 16); try { localStorage.setItem('fb-nick', session.myNick); } catch (e) {} online.nick(session.myNick); });
$('fCopy').addEventListener('click', () => { if (ON.me) navigator.clipboard && navigator.clipboard.writeText(ON.me.id).then(() => toast('Your code is copied: send it to a friend')).catch(() => {}); });
$('fAddBtn').addEventListener('click', () => { const c = ($('fAddCode').value || '').trim(); if (c) { online.addFriend(c); $('fAddCode').value = ''; } });
$('fAddCode').addEventListener('keydown', e => { if (e.key === 'Enter') $('fAddBtn').click(); });
$('friendsPanel').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.acc) online.accept(b.dataset.acc); else if (b.dataset.dec) online.decline(b.dataset.dec);
  else if (b.dataset.inv) online.invite(b.dataset.inv); else if (b.dataset.join) online.join(b.dataset.join);
  else if (b.dataset.kick) online.kick(b.dataset.kick); else if ('pleave' in b.dataset) online.leaveParty();
});
$('searchCancel').addEventListener('click', () => online.cancel());
$('searchLobby').addEventListener('click', () => mlOpen());
// the service paired us up: host it, or join it, in the seat it gave us
async function startMatchmade(m) {
  if (!ON.me) return;
  if (G.warmup) warmupStop(false);
  renderSearch(); initAudio();
  const mine = m.seats[ON.me.id]; if (mine == null) return;
  const vsUntil = m.vs && !m.late ? showVersus(m) : 0; // (F2: 10 s of every army before the battle loads; the phones link up meanwhile)
  $('playBtn').hidden = false;
  if (m.host === ON.me.id) { if (!(await matchHost(m.code, m.fmt, mine, Object.keys(m.seats).length, t => toast(t), vsUntil))) hideVersus(); }
  else if (!(await matchJoin(m.code, mine, st => { if (st === 'fail') toast("Couldn't link up with the battle's host"); }))) hideVersus();
}
bus.on('end', () => { if (session.NET && session.NET.match) online.battleOver(); });
// The warm-up camp: while the search runs you're not staring at a clock. A little free-for-all in the
// Colosseum against computer captains: nothing counts, you're straight back up when you fall, and it
// ends the moment the battle is found (or the search is called off).
function warmupStart() {
  const keep = { mode: G.mode, time: G.time, target: G.target, squadCap: G.squadCap };
  G.mode = 'dm'; G.time = 15; G.target = null; G.squadCap = 0; // (captains only: no men to start with, and nothing to recruit into)
  S.noIntro = true; try { soloStart({ al: [0, 1, 2, 3], duo: [0, 0, 0, 0], map: MAPS.colosseum }); } finally { S.noIntro = false; } // (the warm-up: straight in, no opening)
  Object.assign(G, keep, { mode: 'dm', squadCap: 0 }); G.warmup = keep;
  document.body.appendChild($('searchBox')); $('searchBox').classList.add('warm');
  toast('Warm-up: nothing counts here. Your battle starts when it\'s found');
}
function warmupStop(home) {
  const keep = G.warmup; if (!keep) return;
  G.warmup = null; Object.assign(G, keep); session.NET = null;
  resetSolo(); G.state = 'title'; $('hudWrap').hidden = true;
  $('searchBox').classList.remove('warm'); $('playBtn').after($('searchBox'));
  seedDemo(); if (home) { $('ovTitle').hidden = false; setHomeView('home'); }
}
