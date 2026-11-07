// "Play with friends": host or join by code, pick colors and teams, start the battle.
import { TEAMS, MAPS, PRESETS, AL_LETTER, FACTIONS, TARGETS } from '../config.js';
import { G, colorOf, slotOf, activeFrom, ARMIES, SLOT_NAME, targetFor, duoStr, duoParse } from '../core/state.js';
import { makeP2PRoom as rawRoom, newCode, p2pAvailable } from './p2p.js';
import { progress } from '../ui/progress.js';
// A brief hiccup reaching the connection server shouldn't end the attempt: try once more before
// reporting it. Definite answers (code taken, no such battle, battle full) come back immediately.
const FINAL = new Set(['unavailable-id', 'peer-unavailable', 'full', 'no-webrtc', 'timeout']);
async function makeP2PRoom(code, host, onStage) {
  try { return await rawRoom(code, host, onStage); }
  catch (e) { if (e && (FINAL.has(e.type) || e.type === 'ice-failed')) throw e; await new Promise(r => setTimeout(r, 800)); return rawRoom(code, host, onStage); }
}
import { session, prefs } from './session.js';
import { allyFor } from '../core/teams.js';
import { assignLooks, lookCode, lookFrom } from '../core/look.js';
import { myPeer, clientStart, netHostSend } from './netgame.js';
import { initAudio, stopCrowd } from '../ui/audio.js';

const $ = id => document.getElementById(id);
let hooks = { startMatch() {}, seedDemo() {}, preset: () => 'ffa', resetSolo() {} };
// want is the desired ARMY seat (0-3 = a color's own army, 4-7 its Duo teammate, 8-11 its Trio third);
// -2 (just arrived) lets the host seat you in the first free color, -1 means you stood up
const myPresence = () => ({ role: 'player', nick: session.myNick || 'Captain', ph: 'lobby', want: (session.NET.want ?? -2), lk: lookCode(prefs.look), cr: progress.crest });
let busy = false;

export function openBrowse() {
  ['ovTitle', 'ovLobby', 'ovEnd'].forEach(id => $(id).hidden = true); $('ovBrowse').hidden = false;
  $('nick').value = session.myNick; $('netNote').textContent = '';
  const ok = p2pAvailable();
  $('hostBtn').disabled = !ok; $('joinBtn').disabled = !ok;
  if (!ok) $('netNote').textContent = !/^https?:$/.test(location.protocol)
    ? 'Multiplayer only works when the game is opened from its website.'
    : 'Multiplayer could not start in this browser. Open the game\'s website link in Safari or Chrome.';
}
function saveNick() { session.myNick = ($('nick').value || '').trim().slice(0, 16); try { localStorage.setItem('fb-nick', session.myNick); } catch (e) {} }

export function showLobby() {
  const NET = session.NET;
  if (G.state !== 'lobby') hooks.seedDemo();
  NET.lobbySig = null;
  G.state = 'lobby';
  ['ovTitle', 'ovBrowse', 'ovEnd'].forEach(id => $(id).hidden = true); $('hudWrap').hidden = true; $('ovLobby').hidden = false;
  if (NET.role === 'host') hostLobbyTick();
  else NET.room.presence(myPresence()).catch(() => {});
  renderLobby();
}
export function hostLobbyTick() {
  const NET = session.NET;
  if (!NET || NET.role !== 'host') return;
  const peers = NET.room.peers(), present = new Set(peers.map(p => p.peer));
  const me = myPeer(NET.room); if (me && NET.me !== me) { const t = NET.seats[NET.me]; delete NET.seats[NET.me]; NET.me = me; NET.seats[me] = t === undefined ? 0 : t; }
  for (const k of Object.keys(NET.seats)) if (!present.has(k) && k !== NET.me) delete NET.seats[k];
  const L = NET.lobby;
  // a color's extra seats only exist while it is Duo/Trio; drop anyone left sitting in one that just went away
  for (const k of Object.keys(NET.seats)) if (slotOf(NET.seats[k]) > (L.duo[colorOf(NET.seats[k])] | 0)) delete NET.seats[k];
  const taken = () => Object.values(NET.seats);
  for (const p of peers) {
    if (p.sameTab) continue;
    const pr = p.presence || {}; if (pr.role !== 'player') continue;
    const want = pr.want;
    if (typeof want === 'number' && want >= 0 && want < ARMIES && slotOf(want) <= (L.duo[colorOf(want)] | 0)) {
      if (NET.seats[p.peer] === want) continue;
      if (!taken().includes(want)) NET.seats[p.peer] = want;
    } else if (want === -1 && NET.seats[p.peer] !== undefined) delete NET.seats[p.peer];
    else if (want === -2 && NET.seats[p.peer] === undefined) { // a new arrival: give them a free color straight away (nobody gets left out by not tapping one)
      const free = [0, 1, 2, 3].find(t => !taken().includes(t)); if (free !== undefined) NET.seats[p.peer] = free;
    }
  }
  NET.room.presence({ role: 'host', ph: 'lobby', nick: session.myNick || 'Host', lk: lookCode(prefs.look), mode: L.mode, map: L.map, diff: L.diff, time: L.time, tgt: L.tgt, al: L.al.join(''), duo: duoStr(L.duo), seats: NET.seats, s: null, m: null, res: null }).catch(() => {});
  renderLobby();
}
function lobbyView() {
  const NET = session.NET;
  if (NET.role === 'host') return { mode: NET.lobby.mode, map: NET.lobby.map, diff: NET.lobby.diff, time: NET.lobby.time, tgt: NET.lobby.tgt, al: NET.lobby.al, duo: NET.lobby.duo, seats: NET.seats, hostNick: session.myNick || 'Host' };
  const hostP = NET.room.peers().find(p => p.presence && p.presence.role === 'host');
  if (!hostP) return null;
  NET.hostPeer = hostP.peer;
  const h = hostP.presence;
  return { mode: h.mode, map: h.map, diff: h.diff, time: [5, 10, 15].includes(+h.time) ? +h.time : 10, tgt: h.tgt == null ? null : +h.tgt, al: String(h.al || '0123').split('').map(Number), duo: duoParse(h.duo), seats: h.seats || {}, hostNick: h.nick, ph: h.ph, hostP };
}
export function renderLobby() {
  const NET = session.NET;
  if (!NET || $('ovLobby').hidden) return;
  const v = lobbyView(), host = NET.role === 'host';
  if (!v) { $('lobbyStatus').textContent = 'Connecting to the host…'; $('codeTxt').textContent = NET.name || ''; $('seats').innerHTML = ''; NET.lobbySig = null; return; }
  $('lobbyTitle').textContent = host ? 'Your battle' : `${String(v.hostNick || 'Host').slice(0, 16)}'s battle`;
  $('codeTxt').textContent = NET.name || ''; $('copyBtn').hidden = !host;
  const peers = NET.room.peers();
  const nickOf = peer => { const p = peers.find(x => x.peer === peer); return p && p.presence && p.presence.nick ? String(p.presence.nick).slice(0, 16) : 'Player'; };
  const me = myPeer(NET.room);
  const seatOf = ti => Object.keys(v.seats).find(k => v.seats[k] === ti);
  const sig = JSON.stringify([me, v.mode, v.map, v.diff, v.time, v.tgt, v.al, v.duo, v.seats, v.hostNick, NET.room.pending ? NET.room.pending() : 0, peers.map(p => [p.peer, p.presence && p.presence.nick, p.presence && p.presence.role, p.presence && p.presence.fac])]);
  if (sig === NET.lobbySig) return; NET.lobbySig = sig;
  const box = $('seats'); box.innerHTML = '';
  const seatBtn = (armyTi, t, label) => {
    const occ = seatOf(armyTi);
    const el = document.createElement('button'); el.type = 'button';
    el.className = 'seat' + (label ? ' slot2' : '') + (occ === me ? ' mine' : '') + (occ && occ !== me ? ' taken' : '');
    el.style.background = t.css;
    const b = document.createElement('b'); b.textContent = label || t.name;
    const s = document.createElement('span'); s.textContent = occ ? (occ === me ? 'You' : nickOf(occ)) + (peers.find(p => p.peer === occ && p.presence && p.presence.role === 'host') ? ' · host' : '') : 'Computer';
    el.append(b, s);
    el.addEventListener('click', () => {
      if (occ && occ !== me) return;
      if (host) { if (!occ) { if ((NET.lobby.duo[colorOf(armyTi)] | 0) < 0) NET.lobby.duo[colorOf(armyTi)] = 0; NET.seats[me] = armyTi; hostLobbyTick(); } } // (sitting in a colour that was out brings it back in)
      else if (occ !== me) { NET.want = armyTi; NET.room.presence(myPresence()).catch(() => {}); } // (tapping your own color keeps you there)
    });
    return el;
  };
  TEAMS.forEach((t, i) => {
    const col = document.createElement('div'); col.className = 'seatcol';
    const main = seatBtn(i, t, null);
    const chip = document.createElement('span'); chip.className = 'alchip'; chip.setAttribute('role', 'button'); chip.textContent = 'Team ' + AL_LETTER[v.al[i]];
    if (host) { chip.tabIndex = 0; chip.addEventListener('click', e => { e.stopPropagation(); NET.lobby.al[i] = (NET.lobby.al[i] + 1) % 4; hostLobbyTick(); }); }
    main.appendChild(chip);
    // (off it reads Duo, dimmed: tap once for Duo, again for Trio, again for Out: not in this battle, then back)
    const out = (v.duo[i] | 0) < 0;
    const tog = document.createElement('span'); tog.className = 'duotog' + ((v.duo[i] | 0) > 0 ? ' on' : '') + (out ? ' outt' : ''); tog.setAttribute('role', 'button'); tog.textContent = out ? 'Out' : ['Duo', 'Duo', 'Trio'][v.duo[i] | 0];
    if (out) { main.classList.add('outseat'); const s = main.querySelector('span'); if (s) s.textContent = 'Not in this battle'; }
    if (host) {
      tog.tabIndex = 0;
      tog.addEventListener('click', e => {
        e.stopPropagation(); const d = NET.lobby.duo, cur = d[i] | 0;
        const taken = Object.values(NET.seats).some(ti => colorOf(ti) === i), inN = d.filter(x => (x | 0) >= 0).length;
        d[i] = cur === 2 ? (taken || inN <= 2 ? 0 : -1) : cur + 1; // (a colour someone's sitting in, or the last two castles, can't go out)
        hostLobbyTick();
      });
    } else tog.setAttribute('disabled', '');
    main.appendChild(tog);
    col.appendChild(main);
    for (let s = 1; s <= (v.duo[i] | 0); s++) col.appendChild(seatBtn(i + 4 * s, t, SLOT_NAME[s]));
    box.appendChild(col);
  });
  const setSeg = (id, val, ro) => { const el = $(id); el.classList.toggle('ro', ro); el.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === String(val)))); };
  const hostSeat = host ? NET.seats[NET.me] : v.seats[NET.hostPeer];
  const presetOf = al => Object.keys(PRESETS).find(k => allyFor(k, colorOf(hostSeat ?? 0)).join('') === al.join('')) || '';
  setSeg('lobbyTeams', presetOf(v.al), !host); setSeg('lobbyMode', v.mode, !host); setSeg('lobbyMap', v.map, !host); setSeg('lobbyDiff', v.diff, !host); setSeg('lobbyTime', v.time, !host);
  { // the mode's own target (tickets, captures...), for the mode the host picked
    const T = TARGETS[v.mode] || TARGETS.conquest, cur = v.tgt ?? T.def; $('lobbyTargetLabel').textContent = T.label;
    const want = T.opts.map(o => o[0]).join(); if ($('lobbyTarget').dataset.opts !== want) { $('lobbyTarget').dataset.opts = want; $('lobbyTarget').innerHTML = T.opts.map(([x, n]) => `<button type="button" data-v="${x}">${n}</button>`).join(''); }
    setSeg('lobbyTarget', cur, !host);
  }
  $('startBtn').hidden = !host;
  const nAl = new Set(v.al.filter((_, i) => (v.duo[i] | 0) >= 0)).size, nPlayers = Object.keys(v.seats).length;
  $('startBtn').disabled = nAl < 2;
  const mySeat = v.seats[me];
  $('lobbyStatus').textContent = host
    ? ((NET.room.pending && NET.room.pending() ? `${NET.room.pending()} joining… · ` : '') + (nAl < 2 ? 'Everyone is on one team. Split the teams to start.' : nPlayers < 2 ? 'Share the code. Friends open this page, tap Play with friends and enter it.' : `${nPlayers} players · computer plays the rest`))
    : (mySeat === undefined ? 'Tap a color to take it' : `You are ${TEAMS[colorOf(mySeat)].name}${slotOf(mySeat) ? "'s " + SLOT_NAME[slotOf(mySeat)].toLowerCase() : ''}. Waiting for the host to start…`);
}

export async function netLeave(msg) {
  stopCrowd();
  const n = session.NET; session.NET = null;
  if (n) { try { n.unsub && n.unsub(); } catch (e) {} try { await n.room.leave(); } catch (e) {} }
  hooks.resetSolo();
  G.state = 'title'; $('hudWrap').hidden = true; ['ovLobby', 'ovEnd', 'ovBrowse'].forEach(id => $(id).hidden = true);
  hooks.seedDemo();
  if (msg) { openBrowse(); $('netNote').textContent = msg; } else $('ovTitle').hidden = false;
}

// clients: watch the host in the lobby for the start
export function clientLobbyTick() {
  const NET = session.NET;
  if (!NET || NET.role !== 'client') return;
  const v = lobbyView();
  if (!v) { if (!NET.hostGoneAt) NET.hostGoneAt = performance.now(); if (performance.now() - NET.hostGoneAt > 6000) netLeave('That battle is no longer open.'); return; }
  NET.hostGoneAt = 0;
  if (v.ph === 'play' && v.hostP.presence.seed) {
    const seat = v.seats[myPeer(NET.room)];
    if (seat === undefined) { if (!NET.toldLate) { NET.toldLate = true; $('lobbyStatus').textContent = 'The battle started without you. Wait here for the next one.'; } return; }
    NET.toldLate = false;
    if (G.state === 'lobby') { G.myTi = seat; clientStart(v.hostP.presence); }
  }
}

export function bindLobby(h) {
  hooks = Object.assign(hooks, h);
  $('nick').addEventListener('change', saveNick);
  $('browseBack').addEventListener('click', () => { saveNick(); $('ovBrowse').hidden = true; $('ovTitle').hidden = false; });
  $('mpBtn').addEventListener('click', () => { initAudio(); openBrowse(); });
  $('codeIn').addEventListener('input', e => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
  $('codeIn').addEventListener('keydown', e => { if (e.key === 'Enter') $('joinBtn').click(); });
  $('copyBtn').addEventListener('click', () => {
    const code = session.NET && session.NET.name; if (!code) return;
    const done = () => { $('copyBtn').textContent = 'Copied'; setTimeout(() => $('copyBtn').textContent = 'Copy', 1500); };
    try { navigator.clipboard.writeText(code).then(done, () => {}); } catch (e) {}
  });
  $('hostBtn').addEventListener('click', async () => {
    if (busy) return; busy = true; saveNick();
    $('netNote').textContent = 'Opening a battle…';
    let gr = null, code = null;
    for (let tries = 0; tries < 4 && !gr; tries++) {
      code = newCode();
      try { gr = await makeP2PRoom(code, true); }
      catch (e) { if (!(e && e.type === 'unavailable-id')) { $('netNote').textContent = 'Could not reach the multiplayer server. Check your connection and try again.'; busy = false; return; } }
    }
    busy = false;
    if (!gr) { $('netNote').textContent = 'Could not open a battle. Try again.'; return; }
    $('netNote').textContent = '';
    const NET = session.NET = { role: 'host', room: gr, name: code, seats: {}, msgs: [], msgN: 0, snapN: 0, inp: {}, lobby: { mode: G.mode, map: G.map.id, diff: G.diff, time: G.time, tgt: G.target, al: hooks.teams(), duo: [0, 0, 0, 0] } };
    const me = myPeer(gr) || 'me';
    NET.me = me; NET.seats[me] = prefs.color; G.myTi = prefs.color; G.role = 'host';
    NET.unsub = gr.onPeers(() => { if (G.state === 'lobby') hostLobbyTick(); });
    showLobby();
  });
  $('joinBtn').addEventListener('click', async () => {
    const code = ($('codeIn').value || '').trim().toUpperCase();
    if (code.length !== 4) { $('netNote').textContent = 'Battle codes are 4 letters or numbers.'; return; }
    if (busy) return; busy = true; saveNick();
    $('netNote').textContent = `Joining ${code}…`;
    const stages = { server: `Joining ${code}: finding the battle…`, host: `Joining ${code}: linking up with the host's phone…`, slow: `Still linking up. On mobile data this can take up to 20 seconds…`, relay: `No direct link: connecting ${code} through the relay…` };
    let gr;
    try { gr = await makeP2PRoom(code, false, st => { if (stages[st]) $('netNote').textContent = stages[st]; }); }
    catch (e) {
      busy = false;
      const t = e && e.type;
      $('netNote').textContent = t === 'peer-unavailable' ? `No battle found with code ${code}. Check the code with your host.`
        : t === 'full' ? 'That battle already has eight players.'
        : (t === 'ice-failed' || (t === 'timeout' && e.stage === 'host')) ? "Found the battle but couldn't link up with the host's phone, directly or through the relay. Keep the host's game open on screen (a phone in the background drops off), then try again."
        : t === 'timeout' ? "Couldn't reach the battle server. Check your internet connection and try again."
        : 'Could not connect. Check your internet connection and try again.';
      return;
    }
    busy = false; $('netNote').textContent = '';
    const NET = session.NET = { role: 'client', room: gr, name: code, seats: {}, hostPeer: null };
    G.role = 'client';
    NET.unsub = gr.onPeers(() => { if (G.state === 'lobby') renderLobby(); });
    gr.presence(myPresence()).catch(() => {});
    showLobby();
  });
  const lobbySeg = (id, key) => $(id).addEventListener('click', e => {
    const b = e.target.closest('button'), NET = session.NET; if (!b || !NET || NET.role !== 'host') return;
    if (key === 'al') NET.lobby.al = allyFor(b.dataset.v, colorOf(NET.seats[NET.me] ?? 0));
    else if (key === 'diff' || key === 'time' || key === 'tgt') NET.lobby[key] = +b.dataset.v;
    else if (key === 'mode') { NET.lobby.mode = b.dataset.v; NET.lobby.tgt = prefs.tgt[b.dataset.v] ?? targetFor(b.dataset.v); }
    else NET.lobby[key] = b.dataset.v;
    hostLobbyTick();
  });
  lobbySeg('lobbyTeams', 'al'); lobbySeg('lobbyMode', 'mode'); lobbySeg('lobbyMap', 'map'); lobbySeg('lobbyDiff', 'diff'); lobbySeg('lobbyTime', 'time'); lobbySeg('lobbyTarget', 'tgt');
  $('startBtn').addEventListener('click', () => hostStart());
  $('leaveBtn').addEventListener('click', () => netLeave());
}
// the host starts the battle (the Start button, or a matchmade battle once everyone's linked up)
export function hostStart() {
    const NET = session.NET; if (!NET || NET.role !== 'host') return;
    initAudio();
    const L = NET.lobby;
    G.mode = L.mode; G.map = MAPS[L.map]; G.diff = L.diff; G.time = L.time || 10; G.target = L.tgt ?? targetFor(L.mode); G.ALLY = [...L.al];
    G.myTi = NET.seats[NET.me] ?? 0; G.lms = false;
    G.seed = (Math.random() * 1e9) | 0;
    NET.msgs = []; NET.msgN = 0; NET.inp = {}; NET.snapN = 0;
    const humans = new Array(ARMIES).fill(0), chosen = [], peers = NET.room.peers();
    G.crests = [];
    const active = activeFrom(L.duo);
    for (const [peer, ti] of Object.entries(NET.seats)) {
      humans[ti] = 1;
      const pr = (peers.find(p => p.peer === peer) || {}).presence || {};
      chosen[ti] = peer === NET.me ? prefs.look : lookFrom(pr.lk);
      G.crests[ti] = peer === NET.me ? progress.crest : Math.min(7, Math.max(0, pr.cr | 0));
    }
    G.looks = assignLooks(chosen, G.seed);
    hooks.startMatch(humans, active);
    netHostSend(true);
}

// ---------- matchmade battles (the online service paired us up) ----------
// The service picked the host, a battle code and everyone's seat. The host opens the battle with that
// code and starts it the moment every expected player is linked up (or after a short wait: anyone who
// can't link up has their side played by the computer). Everyone else joins and asks for their seat.
const MATCH_WAIT = 25e3;
export async function matchHost(code, fmt, myTi, expect, onNote = () => {}) {
  if (busy) return false; busy = true;
  let gr = null; try { gr = await makeP2PRoom(code, true); } catch (e) { busy = false; onNote('Could not open the battle. Try again.'); return false; }
  busy = false;
  const NET = session.NET = { role: 'host', room: gr, name: code, seats: {}, msgs: [], msgN: 0, snapN: 0, inp: {}, match: true,
    lobby: { mode: 'crown', map: 'mount', diff: G.diff, time: 10, tgt: null, al: [0, 1, 2, 3], duo: [fmt, fmt, fmt, fmt] } };
  const me = myPeer(gr) || 'me'; NET.me = me; NET.seats[me] = myTi; G.myTi = myTi; G.role = 'host';
  const t0 = performance.now();
  NET.unsub = gr.onPeers(() => { if (G.state === 'lobby') { hostLobbyTick(); check(); } });
  const check = () => { if (G.state !== 'lobby' || !session.NET || !session.NET.match) return; const n = Object.keys(NET.seats).length; if (n >= expect || performance.now() - t0 > MATCH_WAIT) { clearInterval(iv); hostStart(); } };
  const iv = setInterval(check, 1000);
  showLobby(); $('lobbyStatus').textContent = 'Linking up with everyone… the battle starts by itself';
  return true;
}
export async function matchJoin(code, ti, onNote = () => {}) {
  if (busy) return false; busy = true;
  let gr = null;
  for (let k = 0; k < 6 && !gr; k++) { // (the host may still be opening it)
    try { gr = await makeP2PRoom(code, false, st => onNote(st)); }
    catch (e) { if (e && e.type !== 'peer-unavailable') { busy = false; onNote('fail'); return false; } await new Promise(r => setTimeout(r, 1500)); }
  }
  busy = false; if (!gr) { onNote('fail'); return false; }
  const NET = session.NET = { role: 'client', room: gr, name: code, seats: {}, hostPeer: null, want: ti, match: true };
  G.role = 'client';
  NET.unsub = gr.onPeers(() => { if (G.state === 'lobby') renderLobby(); });
  gr.presence(myPresence()).catch(() => {});
  showLobby(); $('lobbyStatus').textContent = 'Linked up: the battle starts in a moment';
  return true;
}
