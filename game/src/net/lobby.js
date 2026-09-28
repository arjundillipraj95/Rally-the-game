// "Play with friends": host or join by code, pick colors and teams, start the battle.
import { TEAMS, MAPS, PRESETS, AL_LETTER, FACTIONS } from '../config.js';
import { G, colorOf, slotOf } from '../core/state.js';
import { makeP2PRoom, newCode, p2pAvailable } from './p2p.js';
import { session, prefs } from './session.js';
import { allyFor, assignFactions } from '../core/teams.js';
import { myPeer, clientStart, netHostSend } from './netgame.js';
import { initAudio } from '../ui/audio.js';

const $ = id => document.getElementById(id);
let hooks = { startMatch() {}, seedDemo() {}, preset: () => 'ffa', resetSolo() {} };
// want is the desired ARMY seat (0-3 = a color's own army, 4-7 = that color's Duo teammate)
const myPresence = () => ({ role: 'player', nick: session.myNick || 'Captain', ph: 'lobby', want: (session.NET.want ?? -1), fac: prefs.faction });
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
  // a color's slot 1 only exists while that color is Duo; drop anyone left sitting in one that just turned off
  for (const k of Object.keys(NET.seats)) if (NET.seats[k] >= 4 && !L.duo[colorOf(NET.seats[k])]) delete NET.seats[k];
  const taken = () => Object.values(NET.seats);
  for (const p of peers) {
    if (p.sameTab) continue;
    const pr = p.presence || {}; if (pr.role !== 'player') continue;
    const want = pr.want;
    if (typeof want === 'number' && want >= 0 && want < 8 && (want < 4 || L.duo[colorOf(want)])) {
      if (NET.seats[p.peer] === want) continue;
      if (!taken().includes(want)) NET.seats[p.peer] = want;
    } else if (want === -1 && NET.seats[p.peer] !== undefined) delete NET.seats[p.peer];
  }
  NET.room.presence({ role: 'host', ph: 'lobby', nick: session.myNick || 'Host', fac: prefs.faction, mode: L.mode, map: L.map, diff: L.diff, al: L.al.join(''), duo: L.duo.map(d => d ? 1 : 0).join(''), seats: NET.seats, s: null, m: null, res: null }).catch(() => {});
  renderLobby();
}
function lobbyView() {
  const NET = session.NET;
  if (NET.role === 'host') return { mode: NET.lobby.mode, map: NET.lobby.map, diff: NET.lobby.diff, al: NET.lobby.al, duo: NET.lobby.duo, seats: NET.seats, hostNick: session.myNick || 'Host' };
  const hostP = NET.room.peers().find(p => p.presence && p.presence.role === 'host');
  if (!hostP) return null;
  NET.hostPeer = hostP.peer;
  const h = hostP.presence;
  return { mode: h.mode, map: h.map, diff: h.diff, al: String(h.al || '0123').split('').map(Number), duo: String(h.duo || '0000').split('').map(c => c === '1'), seats: h.seats || {}, hostNick: h.nick, ph: h.ph, hostP };
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
  const facOf = peer => { const p = peers.find(x => x.peer === peer); const f = p && p.presence && p.presence.fac; return FACTIONS[f] ? FACTIONS[f].name : ''; };
  const me = myPeer(NET.room);
  const seatOf = ti => Object.keys(v.seats).find(k => v.seats[k] === ti);
  const sig = JSON.stringify([me, v.mode, v.map, v.diff, v.al, v.duo, v.seats, v.hostNick, peers.map(p => [p.peer, p.presence && p.presence.nick, p.presence && p.presence.role, p.presence && p.presence.fac])]);
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
    if (occ && facOf(occ)) { const f = document.createElement('small'); f.textContent = facOf(occ); el.appendChild(f); }
    el.addEventListener('click', () => {
      if (occ && occ !== me) return;
      if (host) { if (!occ) { NET.seats[me] = armyTi; hostLobbyTick(); } }
      else { NET.want = occ === me ? -1 : armyTi; NET.room.presence(myPresence()).catch(() => {}); }
    });
    return el;
  };
  TEAMS.forEach((t, i) => {
    const col = document.createElement('div'); col.className = 'seatcol';
    const main = seatBtn(i, t, null);
    const chip = document.createElement('span'); chip.className = 'alchip'; chip.setAttribute('role', 'button'); chip.textContent = 'Team ' + AL_LETTER[v.al[i]];
    if (host) { chip.tabIndex = 0; chip.addEventListener('click', e => { e.stopPropagation(); NET.lobby.al[i] = (NET.lobby.al[i] + 1) % 4; hostLobbyTick(); }); }
    main.appendChild(chip);
    const tog = document.createElement('span'); tog.className = 'duotog' + (v.duo[i] ? ' on' : ''); tog.setAttribute('role', 'button'); tog.textContent = 'Duo';
    if (host) {
      tog.tabIndex = 0;
      tog.addEventListener('click', e => { e.stopPropagation(); NET.lobby.duo[i] = !NET.lobby.duo[i]; hostLobbyTick(); });
    } else tog.setAttribute('disabled', '');
    main.appendChild(tog);
    col.appendChild(main);
    if (v.duo[i]) col.appendChild(seatBtn(i + 4, t, 'Co-captain'));
    box.appendChild(col);
  });
  const setSeg = (id, val, ro) => { const el = $(id); el.classList.toggle('ro', ro); el.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === String(val)))); };
  const hostSeat = host ? NET.seats[NET.me] : v.seats[NET.hostPeer];
  const presetOf = al => Object.keys(PRESETS).find(k => allyFor(k, colorOf(hostSeat ?? 0)).join('') === al.join('')) || '';
  setSeg('lobbyFaction', prefs.faction, false);
  setSeg('lobbyTeams', presetOf(v.al), !host); setSeg('lobbyMode', v.mode, !host); setSeg('lobbyMap', v.map, !host); setSeg('lobbyDiff', v.diff, !host);
  $('startBtn').hidden = !host;
  const nAl = new Set(v.al).size, nPlayers = Object.keys(v.seats).length;
  $('startBtn').disabled = nAl < 2;
  const mySeat = v.seats[me];
  $('lobbyStatus').textContent = host
    ? (nAl < 2 ? 'Everyone is on one team. Split the teams to start.' : nPlayers < 2 ? 'Share the code. Friends open this page, tap Play with friends and enter it.' : `${nPlayers} players · computer plays the rest`)
    : (mySeat === undefined ? 'Tap a color to take it' : `You are ${TEAMS[colorOf(mySeat)].name}${slotOf(mySeat) ? "'s co-captain" : ''}. Waiting for the host to start…`);
}

export async function netLeave(msg) {
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
    const NET = session.NET = { role: 'host', room: gr, name: code, seats: {}, msgs: [], msgN: 0, snapN: 0, inp: {}, lobby: { mode: G.mode, map: G.map.id, diff: G.diff, al: allyFor(hooks.preset(), prefs.color), duo: [false, false, false, false] } };
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
    let gr;
    try { gr = await makeP2PRoom(code, false); }
    catch (e) {
      busy = false;
      const t = e && e.type;
      $('netNote').textContent = t === 'peer-unavailable' ? `No battle found with code ${code}. Check the code with your host.`
        : t === 'full' ? 'That battle already has eight players.'
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
    else if (key === 'diff') NET.lobby.diff = +b.dataset.v;
    else NET.lobby[key] = b.dataset.v;
    hostLobbyTick();
  });
  $('lobbyFaction').addEventListener('click', e => {
    const b = e.target.closest('button'), NET = session.NET; if (!b || !NET) return;
    prefs.faction = b.dataset.v; prefs.save();
    if (NET.role === 'host') hostLobbyTick(); else { NET.lobbySig = null; NET.room.presence(myPresence()).catch(() => {}); renderLobby(); }
  });
  lobbySeg('lobbyTeams', 'al'); lobbySeg('lobbyMode', 'mode'); lobbySeg('lobbyMap', 'map'); lobbySeg('lobbyDiff', 'diff');
  $('startBtn').addEventListener('click', () => {
    const NET = session.NET; if (!NET || NET.role !== 'host') return;
    initAudio();
    const L = NET.lobby;
    G.mode = L.mode; G.map = MAPS[L.map]; G.diff = L.diff; G.ALLY = [...L.al];
    G.myTi = NET.seats[NET.me] ?? 0;
    G.seed = (Math.random() * 1e9) | 0;
    NET.msgs = []; NET.msgN = 0; NET.inp = {}; NET.snapN = 0;
    const humans = [0, 0, 0, 0, 0, 0, 0, 0], chosen = [null, null, null, null], peers = NET.room.peers();
    const active = [1, 1, 1, 1, ...L.duo.map(d => d ? 1 : 0)];
    for (const [peer, ti] of Object.entries(NET.seats)) {
      humans[ti] = 1;
      const pr = (peers.find(p => p.peer === peer) || {}).presence || {};
      chosen[colorOf(ti)] = peer === NET.me ? prefs.faction : (FACTIONS[pr.fac] ? pr.fac : null);
    }
    G.factions = assignFactions(chosen, G.seed);
    hooks.startMatch(humans, active);
    netHostSend(true);
  });
  $('leaveBtn').addEventListener('click', () => netLeave());
}
