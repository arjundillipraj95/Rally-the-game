// The game's side of Rally online (see /online): your guest account, friends, party and matchmaking.
// One WebSocket to the online service; it reconnects on its own. Everything here is optional: with no
// service reachable the game plays as before (PLAY against computers, private battles by code).
import { bus } from '../core/state.js';
import { session } from './session.js';

export const ON = { url: null, ws: null, up: false, me: null, friends: [], reqs: [], party: null, lobby: null, start: null, tries: 0 };
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
let helloExtra = () => ({});

// where the service lives: ?online=… (dev), else online.json next to the game (written when it's deployed)
async function findUrl() {
  const q = new URLSearchParams(location.search).get('online'); if (q) return q;
  if (window.__ONLINE_URL) return window.__ONLINE_URL;
  try { const r = await fetch('./online.json', { cache: 'no-store' }); if (r.ok) { const j = await r.json(); if (j && j.url) return j.url; } } catch (e) {}
  return null;
}
export async function startOnline(extra) {
  if (extra) helloExtra = extra;
  ON.url = await findUrl(); if (!ON.url) { bus.emit('online', { k: 'off' }); return; }
  connect();
}
function connect() {
  let ws; try { ws = new WebSocket(ON.url.replace(/^http/, 'ws').replace(/\/$/, '') + '/ws'); } catch (e) { return retry(); }
  ON.ws = ws;
  ws.onopen = () => { ON.tries = 0; send({ t: 'hello', id: store.get('rally-acct'), key: store.get('rally-key'), nick: session.myNick || '', ...helloExtra() }); };
  ws.onmessage = ev => { let m; try { m = JSON.parse(ev.data); } catch (e) { return; } onMsg(m); };
  ws.onclose = () => { const was = ON.up; ON.up = false; ON.ws = null; if (was) bus.emit('online', { k: 'down' }); retry(); };
  ws.onerror = () => { try { ws.close(); } catch (e) {} };
}
function retry() { ON.tries++; setTimeout(connect, Math.min(30e3, 1500 * 2 ** Math.min(5, ON.tries))); }
export function send(m) { if (ON.ws && ON.ws.readyState === 1) { ON.ws.send(JSON.stringify(m)); return true; } return false; }

function onMsg(m) {
  switch (m.t) {
    case 'me': ON.me = m; ON.up = true; store.set('rally-acct', m.id); store.set('rally-key', m.key); break;
    case 'friends': ON.friends = m.list || []; ON.reqs = m.reqs || []; break;
    case 'party': ON.party = m.id ? m : null; break;
    case 'lobby': ON.lobby = m.room ? m : null; break;
    case 'start': ON.lobby = null; ON.start = m; break;
  }
  bus.emit('online', { k: m.t, m });
}
// the calls the home screen makes
export const online = {
  nick: n => send({ t: 'nick', nick: n }), look: l => send({ t: 'look', look: l }),
  addFriend: code => send({ t: 'friendAdd', code }), accept: id => send({ t: 'friendAccept', id }), decline: id => send({ t: 'friendDecline', id }), remove: id => send({ t: 'friendRemove', id }),
  invite: id => send({ t: 'invite', id }), acceptInvite: from => send({ t: 'accept', from }), join: id => send({ t: 'join', id }), leaveParty: () => send({ t: 'partyLeave' }),
  queue: fmt => send({ t: 'queue', fmt }), cancel: () => send({ t: 'cancel' }), battleOver: () => send({ t: 'battleOver' }), crowns: c => send({ t: 'crowns', crowns: c }),
  relay: (to, d) => send({ t: 'relay', to, d }),
};
export const isLeader = () => !ON.party || ON.party.leader === (ON.me && ON.me.id);
