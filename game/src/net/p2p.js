import { ON } from './online.js';
// Peer-to-peer rooms over PeerJS: the host's browser is the hub, everyone joins with a 4-letter code.
// Exposes a small presence-style API: presence(patch), peers(), onPeers(fn), leave().
import { Peer } from 'peerjs';

// Test-only: with window.__lag = { ms, loss, jitter } set (store/lagtest.mjs), incoming messages arrive late or
// not at all, like a far-away phone. Players never set it, so for them this passes messages straight through.
const lagged = f => d => {
  const L = typeof window !== 'undefined' && window.__lag; if (!L) return f(d);
  if (L.loss && Math.random() < L.loss) return;
  setTimeout(() => f(d), (L.ms || 0) + (L.jitter ? Math.random() * L.jitter : 0));
};

export const P2P_PREFIX = 'fourbanners-v1-';
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function newCode() { let c = ''; for (let i = 0; i < 4; i++) c += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]; return c; }
export const p2pAvailable = () => typeof window.RTCPeerConnection === 'function' && /^https?:$/.test(location.protocol);

// How two phones find a way to each other. A direct link is tried first (STUN tells each phone its
// public address). When that's impossible, as it is on most mobile data (carrier NAT) and on strict
// Wi-Fi, the traffic has to go through a relay (TURN). PeerJS's own free relay was shut down (Dec 2023).
// TURN_KEY_URL: a Metered.ca credentials URL (https://<app>.metered.live/api/v1/turn/credentials?apiKey=...)
// for a private relay (free tier: 20 GB a month). Fetched once per page; if it fails, the Open Relay
// Project's public relay (credentials made from its published shared secret: an expiry time signed
// with HMAC-SHA1, the standard TURN REST scheme) is the fallback.
export const TURN_KEY_URL = '';
const STUN = [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun.cloudflare.com:3478'] }];
async function openRelay() {
  if (!(window.crypto && crypto.subtle)) return null;
  const user = `${Math.floor(Date.now() / 1000) + 24 * 3600}:rally`, enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode('openrelayprojectsecret'), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(user)));
  const h = 'staticauth.openrelay.metered.ca';
  return { urls: [`turn:${h}:80`, `turn:${h}:443?transport=tcp`, `turns:${h}:443?transport=tcp`], username: user, credential: btoa(String.fromCharCode(...sig)) };
}
// freeturn.net: a public relay with fixed credentials (best effort, like any free one)
const FREETURN = { urls: ['turn:freeturn.net:3478', 'turn:freeturn.net:3478?transport=tcp', 'turns:freeturn.tel:5349'], username: 'free', credential: 'free' };
let iceCache = null;
export async function iceServers() {
  if (iceCache) return iceCache;
  const list = [...STUN];
  let keyed = false;
  if (TURN_KEY_URL) {
    try {
      const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 4000);
      const r = await fetch(TURN_KEY_URL, { signal: ctl.signal }); clearTimeout(t);
      const extra = await r.json();
      if (Array.isArray(extra)) { const turn = extra.filter(s => /turns?:/.test([].concat(s.urls || s.url).join(' '))); list.push(...turn); keyed = turn.length > 0; }
    } catch (e) {}
  }
  if (!keyed) {
    try { const r = await openRelay(); if (r) list.push(r); } catch (e) {}
    list.push(FREETURN); // (a second public relay, no sign-up: if one's down or overloaded, the other may get through)
  }
  return (iceCache = list);
}
const peerOpts = async () => {
  const o = Object.assign({ debug: 0 }, window.__PEER_OPTS || {});
  if (!(o.config && o.config.iceServers)) o.config = Object.assign({}, o.config, { iceServers: await iceServers() });
  return o;
};

// ---------- the relay fallback ----------
// When two phones can't link up directly and no TURN relay gets through (common between countries,
// and on mobile data), the room's messages go through public MQTT message brokers over secure
// WebSockets instead. No sign-up, works on nearly any network; a little more lag. The host listens on
// every broker; a joiner uses the first one that gets an answer from the host. Topics:
// rallygame/v1/<code>/h (to the host, {f: joiner id, d}) and rallygame/v1/<code>/c/<joiner id> (to a joiner).
// (Eclipse's is on the standard secure port 443, which gets through where Safari's privacy relay or a
// strict network blocks the others' unusual ports)
const BROKERS = ['wss://mqtt.eclipseprojects.io:443/mqtt', 'wss://broker.emqx.io:8084/mqtt', 'wss://broker.hivemq.com:8884/mqtt', 'wss://test.mosquitto.org:8081/mqtt'];
// our own relay (the online service) goes first when it's there; the public brokers stay as a fallback
const brokers = () => window.__MQTT_URLS || (ON.url ? ['rally+' + ON.url.replace(/^http/, 'ws').replace(/\/$/, '') + '/ws', ...BROKERS] : BROKERS);
// an MQTT-like client over the online service's relay (connect / subscribe / publish / message / end)
function rallyRelay(url) {
  const ev = {}, emit = (k, ...a) => { for (const f of ev[k] || []) try { f(...a); } catch (e) {} };
  let ws = null; const send = m => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(m)); };
  const c = { connected: false, on(k, f) { (ev[k] || (ev[k] = [])).push(f); if (k === 'connect' && c.connected) setTimeout(f, 0); return c; }, // (late listeners still hear we're up)
    subscribe(t, o, cb) { send({ t: 'sub', topic: t }); if (cb) cb(); }, publish(t, str) { send({ t: 'pub', topic: t, d: str }); }, end() { try { ws.close(); } catch (e) {} } };
  try { ws = new WebSocket(url); } catch (e) { setTimeout(() => emit('error', e), 0); return c; }
  ws.onopen = () => { c.connected = true; emit('connect'); };
  ws.onmessage = e => { let m; try { m = JSON.parse(e.data); } catch (er) { return; } if (m.t === 'msg') emit('message', m.topic, { toString: () => m.d }); };
  ws.onerror = () => emit('error'); ws.onclose = () => { c.connected = false; };
  return c;
}
const connectTo = async url => url.startsWith('rally+') ? rallyRelay(url.slice(6)) : (await mqttLib()).connect(url, mqttOpts());
const rtopic = code => `rallygame/v1/${code}`;
async function mqttLib() { const m = await import('mqtt'); return m.default || m; }
const mqttOpts = () => ({ clientId: 'rally' + Math.random().toString(36).slice(2, 12), connectTimeout: 8000, reconnectPeriod: 3000, keepalive: 30, clean: true });
// a stand-in for a PeerJS DataConnection, carried over a broker
function fakeConn(peerId, sendFn) {
  const ev = {};
  const c = { peer: peerId, open: true, relay: true, peerConnection: null,
    on(k, f) { (ev[k] || (ev[k] = [])).push(f); return c; },
    emit(k, v) { for (const f of ev[k] || []) { try { f(v); } catch (e) { console.error(e); } } },
    send: d => sendFn(d),
    close() { if (!c.open) return; c.open = false; c.emit('close'); } };
  return c;
}
// host: hands each joiner that turns up on a broker to onConn, as if they'd connected directly
async function hostRelay(code, onConn) {
  const T = rtopic(code), clients = [], fakes = new Map();
  for (const url of brokers()) {
    let cl; try { cl = await connectTo(url); } catch (e) { continue; }
    cl.on('connect', () => cl.subscribe(T + '/h', { qos: 0 }));
    cl.on('error', () => {});
    cl.on('message', (_, buf) => {
      let m; try { m = JSON.parse(buf.toString()); } catch (e) { return; }
      if (!m || typeof m.f !== 'string' || !/^r-[a-z0-9]{6,16}$/.test(m.f) || !m.d || typeof m.d !== 'object') return;
      let c = fakes.get(m.f);
      if (m.d.t === 'bye') { if (c) { fakes.delete(m.f); c.close(); } return; }
      if (!c || !c.open) {
        const id = m.f;
        c = fakeConn(id, d => { try { c.cl.publish(T + '/c/' + id, JSON.stringify(d)); } catch (e) {} });
        c.on('close', () => { if (fakes.get(id) === c) fakes.delete(id); });
        fakes.set(id, c); c.cl = cl; onConn(c); c.emit('open');
      }
      c.cl = cl; // (answer on whichever broker they last spoke on)
      c.emit('data', m.d);
    });
    clients.push(cl);
  }
  return { end() { for (const c of [...fakes.values()]) c.close(); for (const cl of clients) try { cl.end(true); } catch (e) {} } };
}
// joiner: says hello on every broker until the host answers on one; resolves with the link to the host
async function joinRelay(code, myId, hello, waitMs = 20000) {
  const T = rtopic(code), cls = [], made = [];
  for (const url of brokers()) { try { made.push(await connectTo(url)); } catch (e) {} }
  return new Promise((resolve, reject) => {
    let picked = null;
    const fin = () => { clearInterval(hi); clearTimeout(to); for (const cl of cls) if (cl !== picked) try { cl.end(true); } catch (e) {} };
    const to = setTimeout(() => { fin(); reject({ type: 'relay-failed' }); }, waitMs);
    const say = (cl, d) => { try { cl.publish(T + '/h', JSON.stringify({ f: myId, d })); } catch (e) {} };
    const hi = setInterval(() => { for (const cl of cls) if (cl.connected) say(cl, hello()); }, 1000);
    for (const cl of made) {
      cls.push(cl);
      cl.on('error', () => {});
      cl.on('connect', () => { cl.subscribe(T + '/c/' + myId, { qos: 0 }, () => say(cl, hello())); });
      cl.on('message', (_, buf) => {
        let d; try { d = JSON.parse(buf.toString()); } catch (e) { return; }
        if (!d || typeof d !== 'object') return;
        if (!picked) {
          picked = cl; fin();
          const c = fakeConn('host', x => say(cl, x));
          c.end = () => { try { say(cl, { t: 'bye' }); } catch (e) {} setTimeout(() => { try { cl.end(true); } catch (e) {} }, 200); };
          c.link = cl; resolve(c); setTimeout(() => c.emit('data', d), 0); return;
        }
        if (cl === picked && picked.fake) picked.fake.emit('data', d);
      });
    }
  }).then(c => { c.link.fake = c; return c; });
}

// onStage (optional) hears how far a join has got: 'server' (reaching the matchmaking server),
// 'host' (linking up with the host's phone), 'slow' (still trying after a while).
export async function makeP2PRoom(code, host, onStage = () => {}) {
  const opts = await peerOpts();
  return new Promise((resolve, reject) => {
    if (typeof window.RTCPeerConnection !== 'function') { reject({ type: 'no-webrtc' }); return; }
    const peers = new Map(), listeners = [], conns = new Map(), seen = new Map();
    let mine = {}, myId = null, hostConn = null, settled = false, lastRelay = 0, relayTimer = null, pongFn = null;
    const done = (ok, v) => { if (settled) return; settled = true; clearTimeout(to); clearTimeout(slowT); ok ? resolve(v) : reject(v); };
    // a link through a relay on a slow mobile connection can take a while: allow 25 s before giving up
    let stage = 'server';
    const to = setTimeout(() => { if (!host) { fallback({ type: 'timeout', stage }); return; } try { peer.destroy(); } catch (e) {} done(false, { type: 'timeout', stage }); }, 25000);
    const slowT = setTimeout(() => { if (!settled) onStage('slow'); }, 9000);
    onStage('server');
    const alive = p => p === myId || (performance.now() - (seen.get(p) || 0)) < 6000;
    const snap = () => [...peers.entries()].filter(([p]) => alive(p)).map(([p, pr]) => ({ peer: p, sameTab: p === myId, isMe: p === myId, presence: pr }));
    let notifyT = null;
    const notifyNow = () => { notifyT = null; const sn = snap(); for (const f of listeners) { try { f({ peers: sn }); } catch (e) { console.error(e); } } };
    const notify = () => { if (!notifyT) notifyT = setTimeout(notifyNow, 16); };
    const trim = pr => ({ role: pr.role, nick: pr.nick, want: pr.want, ph: pr.ph, lk: pr.lk, cr: pr.cr });
    function relayRoster() { // host tells every player who is here (players' own fields trimmed to lobby info)
      lastRelay = performance.now(); relayTimer = null;
      const all = {}; for (const [p, pr] of peers) all[p] = p === myId ? pr : trim(pr);
      for (const c of conns.values()) if (c.open) try { c.send({ t: 'all', all }); } catch (e) {}
    }
    function relaySoon() { if (relayTimer) return; const wait = Math.max(0, 250 - (performance.now() - lastRelay)); relayTimer = setTimeout(relayRoster, wait); }
    const peer = host ? new Peer(P2P_PREFIX + code, opts) : new Peer(opts);
    const pending = new Set(); // (host: phones that have found us but aren't linked up yet)
    peer.on('open', id => {
      myId = id; peers.set(id, mine);
      if (host) { done(true, api); hostRelay(code, onConn).then(r => { relayHost = r; if (left) r.end(); }).catch(() => {}); return; }
      stage = 'host'; onStage('host');
      if (window.__FORCE_RELAY) { fallback({ type: 'ice-failed', stage }); return; } // (tests: as if the direct link had failed)
      hostConn = peer.connect(P2P_PREFIX + code, { reliable: true, serialization: 'json' });
      // every route tried and none worked: on to the relay rather than waiting out the clock
      const watch = setInterval(() => {
        const pc = hostConn.peerConnection; if (settled || relaying || !pc) { if (settled || relaying) clearInterval(watch); return; }
        if (pc.iceConnectionState === 'failed') { clearInterval(watch); fallback({ type: 'ice-failed', stage }); }
      }, 500);
      hostConn.on('open', () => { if (relaying) { try { hostConn.close(); } catch (e) {} return; } try { hostConn.send({ t: 'p', pr: mine }); } catch (e) {} done(true, api); });
      wireHost(hostConn);
    });
    function wireHost(hc) {
      hc.on('data', lagged(d => {
        if (!d || typeof d !== 'object') return;
        seen.set(P2P_PREFIX + code, performance.now());
        if (d.t === 'full') { done(false, { type: 'full' }); return; }
        if (d.t === 'pong') { if (pongFn) pongFn(d.n); return; } // (the host's answer to our ping)
        if (d.t === 'all' && d.all && typeof d.all === 'object') {
          for (const k of [...peers.keys()]) if (k !== myId && !(k in d.all)) peers.delete(k);
          for (const [k, v] of Object.entries(d.all)) if (k !== myId && v && typeof v === 'object') { peers.set(k, v); seen.set(k, performance.now()); }
          notify();
        } else if (d.t === 'h' && typeof d.id === 'string' && d.pr && typeof d.pr === 'object') { peers.set(d.id, d.pr); notify(); }
      }));
      hc.on('close', () => { if (hc !== hostConn) return; for (const k of [...peers.keys()]) if (k !== myId) peers.delete(k); notify(); });
      hc.on('error', () => {});
    }
    // the direct link can't be made: carry on through the relay (and only then give up)
    let relaying = false;
    async function fallback(why) {
      if (settled || relaying || host) return;
      relaying = true; clearTimeout(to); onStage('relay'); ON.relayed = true; // (for the health report)
      try { peer.destroy(); } catch (e) {}
      const rid = 'r-' + Math.random().toString(36).slice(2, 12);
      if (myId) peers.delete(myId); myId = rid; peers.set(myId, mine);
      try {
        const c = await joinRelay(code, rid, () => ({ t: 'p', pr: mine }));
        if (settled) { c.end(); return; }
        hostConn = c; wireHost(c); seen.set(P2P_PREFIX + code, performance.now()); done(true, api);
      } catch (e) { done(false, why); }
    }
    let relayHost = null;
    const onConn = c => {
      if (!host) { c.close(); return; }
      if (conns.size >= 7) { c.on('open', () => { try { c.send({ t: 'full' }); } catch (e) {} setTimeout(() => c.close(), 400); }); return; }
      conns.set(c.peer, c); seen.set(c.peer, performance.now());
      pending.add(c.peer); notify(); setTimeout(() => { if (pending.delete(c.peer)) notify(); }, 30000);
      c.on('open', () => { pending.delete(c.peer); relayRoster(); try { c.send({ t: 'h', id: myId, pr: mine }); } catch (e) {} });
      c.on('data', lagged(d => {
        if (d && d.t === 'ping') { try { c.send({ t: 'pong', n: d.n }); } catch (e) {} return; } // (answer at once: a joiner's ping)
        if (!d || d.t !== 'p' || !d.pr || typeof d.pr !== 'object') return;
        seen.set(c.peer, performance.now());
        const old = peers.get(c.peer); peers.set(c.peer, d.pr); notify();
        if (!old || old.nick !== d.pr.nick || old.want !== d.pr.want || old.ph !== d.pr.ph || old.role !== d.pr.role || old.lk !== d.pr.lk) relaySoon();
      }));
      const gone = () => { pending.delete(c.peer); if (conns.get(c.peer) !== c) return; conns.delete(c.peer); peers.delete(c.peer); notify(); relaySoon(); };
      c.on('close', gone); c.on('error', gone);
    };
    peer.on('connection', onConn);
    peer.on('error', e => {
      if (relaying) return;
      if (!settled) { if (!host && e && e.type !== 'unavailable-id') { fallback(e); return; } try { peer.destroy(); } catch (_) {} done(false, e); return; }
      if (e && e.type === 'peer-unavailable' && !host) { for (const k of [...peers.keys()]) if (k !== myId) peers.delete(k); notify(); }
    });
    peer.on('disconnected', () => { if (!peer.destroyed && !relaying) try { peer.reconnect(); } catch (e) {} });
    let lastSent = 0;
    const sendMine = () => {
      lastSent = performance.now();
      if (host) { for (const c of conns.values()) if (c.open) try { c.send({ t: 'h', id: myId, pr: mine }); } catch (e) {} }
      else if (hostConn && hostConn.open) try { hostConn.send({ t: 'p', pr: mine }); } catch (e) {}
    };
    let left = false;
    const beat = setInterval(() => {
      if (left || (peer.destroyed && !relaying)) { clearInterval(beat); return; }
      if (performance.now() - lastSent > 1500) sendMine();
      if (host) for (const [p, c] of [...conns]) if (!pending.has(p) && performance.now() - (seen.get(p) || performance.now()) > 8000) { try { c.close(); } catch (e) {} conns.delete(p); peers.delete(p); notify(); relaySoon(); }
      notify();
    }, 1000);
    const api = {
      name: code,
      presence: async patch => {
        for (const k in patch) { if (patch[k] === null) delete mine[k]; else mine[k] = patch[k]; }
        peers.set(myId, mine);
        sendMine();
      },
      peers: snap,
      pending: () => pending.size, // (host: how many are still linking up)
      onPeers: f => { listeners.push(f); setTimeout(() => f({ peers: snap() }), 0); return () => { const i = listeners.indexOf(f); if (i >= 0) listeners.splice(i, 1); }; },
      leave: async () => { left = true; clearInterval(beat); try { peer.destroy(); } catch (e) {} if (relayHost) relayHost.end(); if (hostConn && hostConn.relay && hostConn.end) hostConn.end(); },
      relayed: () => !!relaying, // (a joiner on the relay)
      // ping (P0.3): a joiner asks the host to answer at once; the answer comes back with the same stamp
      ping: n => { if (hostConn && hostConn.open) try { hostConn.send({ t: 'ping', n }); } catch (e) {} },
      onPong: f => { pongFn = f; },
    };
  });
}
