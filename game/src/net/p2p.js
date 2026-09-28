// Peer-to-peer rooms over PeerJS: the host's browser is the hub, everyone joins with a 4-letter code.
// Exposes a small presence-style API: presence(patch), peers(), onPeers(fn), leave().
import { Peer } from 'peerjs';

export const P2P_PREFIX = 'fourbanners-v1-';
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function newCode() { let c = ''; for (let i = 0; i < 4; i++) c += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]; return c; }
export const p2pAvailable = () => typeof window.RTCPeerConnection === 'function' && /^https?:$/.test(location.protocol);
const peerOpts = () => Object.assign({ debug: 0 }, window.__PEER_OPTS || {});

export function makeP2PRoom(code, host) {
  return new Promise((resolve, reject) => {
    if (typeof window.RTCPeerConnection !== 'function') { reject({ type: 'no-webrtc' }); return; }
    const peers = new Map(), listeners = [], conns = new Map(), seen = new Map();
    let mine = {}, myId = null, hostConn = null, settled = false, lastRelay = 0, relayTimer = null;
    const done = (ok, v) => { if (settled) return; settled = true; clearTimeout(to); ok ? resolve(v) : reject(v); };
    const to = setTimeout(() => { try { peer.destroy(); } catch (e) {} done(false, { type: 'timeout' }); }, 12000);
    const alive = p => p === myId || (performance.now() - (seen.get(p) || 0)) < 6000;
    const snap = () => [...peers.entries()].filter(([p]) => alive(p)).map(([p, pr]) => ({ peer: p, sameTab: p === myId, isMe: p === myId, presence: pr }));
    let notifyT = null;
    const notifyNow = () => { notifyT = null; const sn = snap(); for (const f of listeners) { try { f({ peers: sn }); } catch (e) { console.error(e); } } };
    const notify = () => { if (!notifyT) notifyT = setTimeout(notifyNow, 16); };
    const trim = pr => ({ role: pr.role, nick: pr.nick, want: pr.want, ph: pr.ph, fac: pr.fac, cr: pr.cr });
    function relayRoster() { // host tells every player who is here (players' own fields trimmed to lobby info)
      lastRelay = performance.now(); relayTimer = null;
      const all = {}; for (const [p, pr] of peers) all[p] = p === myId ? pr : trim(pr);
      for (const c of conns.values()) if (c.open) try { c.send({ t: 'all', all }); } catch (e) {}
    }
    function relaySoon() { if (relayTimer) return; const wait = Math.max(0, 250 - (performance.now() - lastRelay)); relayTimer = setTimeout(relayRoster, wait); }
    const peer = host ? new Peer(P2P_PREFIX + code, peerOpts()) : new Peer(peerOpts());
    peer.on('open', id => {
      myId = id; peers.set(id, mine);
      if (host) { done(true, api); return; }
      hostConn = peer.connect(P2P_PREFIX + code, { reliable: true, serialization: 'json' });
      hostConn.on('open', () => { try { hostConn.send({ t: 'p', pr: mine }); } catch (e) {} done(true, api); });
      hostConn.on('data', d => {
        if (!d || typeof d !== 'object') return;
        seen.set(P2P_PREFIX + code, performance.now());
        if (d.t === 'full') { done(false, { type: 'full' }); return; }
        if (d.t === 'all' && d.all && typeof d.all === 'object') {
          for (const k of [...peers.keys()]) if (k !== myId && !(k in d.all)) peers.delete(k);
          for (const [k, v] of Object.entries(d.all)) if (k !== myId && v && typeof v === 'object') { peers.set(k, v); seen.set(k, performance.now()); }
          notify();
        } else if (d.t === 'h' && typeof d.id === 'string' && d.pr && typeof d.pr === 'object') { peers.set(d.id, d.pr); notify(); }
      });
      hostConn.on('close', () => { for (const k of [...peers.keys()]) if (k !== myId) peers.delete(k); notify(); });
      hostConn.on('error', () => {});
    });
    peer.on('connection', c => {
      if (!host) { c.close(); return; }
      if (conns.size >= 7) { c.on('open', () => { try { c.send({ t: 'full' }); } catch (e) {} setTimeout(() => c.close(), 400); }); return; }
      conns.set(c.peer, c); seen.set(c.peer, performance.now());
      c.on('open', () => { relayRoster(); try { c.send({ t: 'h', id: myId, pr: mine }); } catch (e) {} });
      c.on('data', d => {
        if (!d || d.t !== 'p' || !d.pr || typeof d.pr !== 'object') return;
        seen.set(c.peer, performance.now());
        const old = peers.get(c.peer); peers.set(c.peer, d.pr); notify();
        if (!old || old.nick !== d.pr.nick || old.want !== d.pr.want || old.ph !== d.pr.ph || old.role !== d.pr.role || old.fac !== d.pr.fac) relaySoon();
      });
      const gone = () => { if (!conns.has(c.peer)) return; conns.delete(c.peer); peers.delete(c.peer); notify(); relaySoon(); };
      c.on('close', gone); c.on('error', gone);
    });
    peer.on('error', e => {
      if (!settled) { try { peer.destroy(); } catch (_) {} done(false, e); return; }
      if (e && e.type === 'peer-unavailable' && !host) { for (const k of [...peers.keys()]) if (k !== myId) peers.delete(k); notify(); }
    });
    peer.on('disconnected', () => { if (!peer.destroyed) try { peer.reconnect(); } catch (e) {} });
    let lastSent = 0;
    const sendMine = () => {
      lastSent = performance.now();
      if (host) { for (const c of conns.values()) if (c.open) try { c.send({ t: 'h', id: myId, pr: mine }); } catch (e) {} }
      else if (hostConn && hostConn.open) try { hostConn.send({ t: 'p', pr: mine }); } catch (e) {}
    };
    const beat = setInterval(() => {
      if (peer.destroyed) { clearInterval(beat); return; }
      if (performance.now() - lastSent > 1500) sendMine();
      if (host) for (const [p, c] of [...conns]) if (performance.now() - (seen.get(p) || performance.now()) > 8000) { try { c.close(); } catch (e) {} conns.delete(p); peers.delete(p); notify(); relaySoon(); }
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
      onPeers: f => { listeners.push(f); setTimeout(() => f({ peers: snap() }), 0); return () => { const i = listeners.indexOf(f); if (i >= 0) listeners.splice(i, 1); }; },
      leave: async () => { clearInterval(beat); try { peer.destroy(); } catch (e) {} },
    };
  });
}
