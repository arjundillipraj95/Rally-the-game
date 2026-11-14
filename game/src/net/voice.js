// Party voice (V2): friends in your party hear each other on the main screen, while searching, in the lobby and in
// the battle, with no hang-up between them (like a squad in PUBG). It runs on its own phone-to-phone link: a second
// PeerJS peer just for voice, separate from the battle link, so a battle starting or ending never touches it. The
// Hub hands every member's voice id out with the party. Each pair links once: the lower id calls; if no call has
// come in 8 s the other phone calls instead, and a failed call is retried (V1d). Teammates outside your party are
// not heard (an opt-in for them comes later). Every step says on screen what happened, so a real-phone test shows
// where it stops.
import { ON, online } from './online.js';
import { newVoicePeer } from './p2p.js';
import { G, bus } from '../core/state.js';

const KEY = 'rally.mic', JOIN = 'rally.pvoice', MUTED = 'rally.pvmute';
const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
const V = { on: ls.get(KEY) !== 'off', want: ls.get(JOIN) === 'on', stream: null, starting: false, failed: null, peer: null, making: false, vp: null, perr: '',
  calls: new Map(), vpOf: new Map(), dir: new Map(), audio: new Map(), state: new Map(), since: new Map(), sinceVp: new Map(), fail: new Map(), err: new Map(),
  early: new Map(), said: new Set(), muted: new Set((ls.get(MUTED) || '').split(',').filter(Boolean)), timer: null, lvT: null };
// diagnostics: my mic's level; per friend whether sound leaves, arrives, and how the link goes
const D = { ac: null, an: null, buf: null, lv: 0, out: new Map(), inn: new Map(), talk: new Map(), route: new Map(), turned: 0 };
const now = () => performance.now();
const say = (k, t) => { if (V.said.has(k)) return; V.said.add(k); bus.emit('voiceMsg', t); }; // (each message once until voice stops)

// my party friends: {id, nick, vp}; vp is '' until their phone has a voice link
export const partyMates = () => (ON.party && ON.party.members || []).filter(m => ON.me && m.id !== ON.me.id);

function meter() {
  if (D.an || !V.stream) return;
  try { const AC = window.AudioContext || window.webkitAudioContext; D.ac = new AC(); const src = D.ac.createMediaStreamSource(V.stream); D.an = D.ac.createAnalyser(); D.an.fftSize = 512; D.buf = new Uint8Array(D.an.fftSize); src.connect(D.an); if (D.ac.state === 'suspended') D.ac.resume().catch(() => {}); } catch (e) { D.an = null; }
}
function level() { // 0..1 from the mic, 10 times a second
  if (!D.an) return; if (D.ac && D.ac.state === 'suspended') D.ac.resume().catch(() => {});
  D.an.getByteTimeDomainData(D.buf); let m = 0; for (let i = 0; i < D.buf.length; i++) m = Math.max(m, Math.abs(D.buf[i] - 128));
  D.lv = Math.min(1, m / 60); const v = (V.on ? D.lv : 0).toFixed(2);
  for (const id of ['micBtn', 'pvMic']) { const b = document.getElementById(id); if (b) b.style.setProperty('--lv', v); }
}
async function stats() { // once a second: bytes sent to / sound from each friend, whether they're talking, the route
  for (const [id, c] of V.calls) { const pc = c.peerConnection; if (!pc) continue;
    let sent = 0, got = 0, al = 0, pair = null; const cand = new Map();
    try { (await pc.getStats()).forEach(r => {
      if (r.type === 'outbound-rtp' && r.kind === 'audio') sent += r.bytesSent || 0;
      if (r.type === 'inbound-rtp' && r.kind === 'audio') { got += r.totalAudioEnergy || 0; al = Math.max(al, r.audioLevel || 0); }
      if (r.type === 'local-candidate') cand.set(r.id, r.candidateType);
      if (r.type === 'candidate-pair' && (r.selected || (r.nominated && r.state === 'succeeded'))) pair = r; }); } catch (e) {}
    const o = D.out.get(id) || { sent: 0, up: false }, i = D.inn.get(id) || { got: 0, up: false };
    o.up = sent > o.sent + 200; o.sent = sent; i.up = got > i.got + 1e-5; i.got = got; D.out.set(id, o); D.inn.set(id, i);
    D.talk.set(id, al > 0.03 && !V.muted.has(id));
    if (pair) D.route.set(id, cand.get(pair.localCandidateId) === 'relay' ? 'via relay' : 'direct');
  }
}

// ---------- the calls ----------
function play(id, s) {
  let a = V.audio.get(id);
  if (!a) { a = document.createElement('audio'); a.autoplay = true; a.setAttribute('playsinline', ''); a.style.display = 'none'; document.body.appendChild(a); V.audio.set(id, a); } // (in the page: iPhones play it more reliably)
  a.srcObject = s; a.muted = V.muted.has(id);
  a.play().then(() => say('on', 'Voice on with your party')).catch(() => { // (the browser wants a tap before it plays sound)
    say('tap', 'Tap the screen to hear your party');
    const go = () => { a.play().then(() => say('on', 'Voice on with your party')).catch(() => {}); removeEventListener('pointerdown', go); };
    addEventListener('pointerdown', go);
  });
}
function hang(id) {
  const c = V.calls.get(id); V.calls.delete(id); V.dir.delete(id); V.vpOf.delete(id); D.talk.delete(id);
  if (c) { try { c.close(); } catch (e) {} }
  const a = V.audio.get(id); V.audio.delete(id); if (a) { a.srcObject = null; a.remove(); }
}
const failedCall = id => { V.state.set(id, 'failed'); V.fail.set(id, { n: ((V.fail.get(id) || {}).n || 0) + 1, at: now() }); }; // (retried a few times, 10 s apart)
function attach(call, id, vp, dir) {
  V.calls.set(id, call); V.vpOf.set(id, vp); V.dir.set(id, dir); V.state.set(id, 'calling');
  call.on('stream', s => { if (V.calls.get(id) !== call) return; V.state.set(id, 'sound'); play(id, s); });
  call.on('close', () => { if (V.calls.get(id) === call) hang(id); });
  call.on('error', () => { if (V.calls.get(id) === call) { hang(id); failedCall(id); } });
  // the link itself: 'failed' means no road between the two phones (their networks, and no relay got through)
  const t0 = now();
  const watch = setInterval(() => {
    if (V.calls.get(id) !== call) { clearInterval(watch); return; }
    const pc = call.peerConnection, st = pc ? pc.iceConnectionState : 'new';
    if (st === 'connected' || st === 'completed') { clearInterval(watch); if (V.state.get(id) !== 'sound') V.state.set(id, 'linked'); }
    else if (st === 'failed' || now() - t0 > 12000) { clearInterval(watch); hang(id); failedCall(id); say('nolink', "Voice can't get through to a friend's phone"); }
  }, 500);
}
function link() {
  if (!V.stream || !V.peer || !V.vp || V.peer.disconnected) return;
  const ms = partyMates(), t = now();
  for (const [vp, e] of [...V.early]) { // a call that beat the party news: answer once its caller is a known friend, else drop it after 6 s
    const m = ms.find(x => x.vp === vp);
    if (m) { V.early.delete(vp); accept(e.call, m.id); }
    else if (t - e.at > 6000) { V.early.delete(vp); try { e.call.close(); } catch (x) {} } }
  // a friend who left, or whose phone has a new voice link: hang up (an empty id is the Hub not knowing yet: keep the call)
  for (const id of [...V.calls.keys()]) { const m = ms.find(x => x.id === id); if (!m || (m.vp && m.vp !== V.vpOf.get(id))) hang(id); }
  for (const map of [V.since, V.sinceVp, V.fail, V.err, V.state]) for (const id of [...map.keys()]) if (!ms.some(x => x.id === id)) map.delete(id);
  for (const m of ms) {
    if (!m.vp || V.calls.has(m.id)) continue;
    if (V.sinceVp.get(m.id) !== m.vp) { V.since.set(m.id, t); V.sinceVp.set(m.id, m.vp); V.fail.delete(m.id); V.state.delete(m.id); }
    if (V.state.get(m.id) === 'failed') { const f = V.fail.get(m.id); if (f && f.n < 3 && t - f.at > 10000) { V.state.delete(m.id); V.since.set(m.id, t); } else continue; }
    // the lower id calls; with no call in 8 s the other phone calls instead. __voiceDropUntil: tests only (the lower id never calls)
    if (V.vp < m.vp ? window.__voiceDropUntil > t : t - V.since.get(m.id) < 8000) continue;
    try { const c = V.peer.call(m.vp, V.stream); if (!c) throw new Error('no call object'); V.err.delete(m.id); attach(c, m.id, m.vp, 'out'); }
    catch (e) { V.err.set(m.id, String((e && e.message) || e).slice(0, 40)); }
  }
}
function onCall(call) { // a friend is calling: answer. A caller not yet known as a friend is held a few seconds (the party news can come after the call)
  if (!V.stream) { try { call.close(); } catch (e) {} return; }
  const m = partyMates().find(x => x.vp === call.peer);
  if (!m) { D.turned++; V.early.set(call.peer, { call, at: now() }); return; }
  accept(call, m.id);
}
function accept(call, id) {
  if (V.calls.has(id)) { // both phones called at once: the lower id's call stays
    if (V.dir.get(id) === 'out' && V.vp < call.peer) { try { call.close(); } catch (e) {} return; }
    hang(id);
  }
  try { call.answer(V.stream); } catch (e) {}
  attach(call, id, call.peer, 'in');
}
async function ensurePeer() {
  if (V.peer && !V.peer.destroyed) {
    if (V.peer.disconnected) { try { V.peer.reconnect(); } catch (e) {} }
    else if (V.vp && ON.vp !== V.vp && ON.up) online.voice(V.vp);
    return;
  }
  if (V.making) return; V.making = true;
  try {
    const p = await newVoicePeer(); V.peer = p; V.perr = '';
    p.on('open', id => { if (V.peer !== p) return; V.vp = id; online.voice(id); });
    p.on('call', onCall);
    p.on('error', e => { V.perr = String((e && (e.type || e.message)) || e).slice(0, 30); });
    p.on('close', () => { if (V.peer === p) { V.peer = null; V.vp = null; } });
  } catch (e) { V.perr = String((e && e.message) || e).slice(0, 30); }
  V.making = false;
}

// ---------- start / stop ----------
// asks for the mic, then joins the party's voice. From the "Join voice" tap, then by itself in every party after that
export async function startVoice(fromTap) {
  if (V.stream || V.starting) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { V.failed = 'no-mic'; paintAll(); say('nomic', 'Voice needs a microphone this browser can use'); return; }
  V.starting = true; paintAll();
  try { V.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }); }
  catch (e) {
    V.failed = e && e.name === 'NotAllowedError' ? 'denied' : 'no-mic'; V.starting = false; paintAll();
    bus.emit('voiceMsg', V.failed === 'denied' ? (fromTap ? "Microphone blocked: allow it in the browser's site settings, then tap Join voice" : 'Tap Join voice to talk to your party') : 'No microphone found');
    return;
  }
  V.starting = false; V.failed = null; V.want = true; ls.set(JOIN, 'on');
  if (fromTap) { V.on = true; ls.set(KEY, 'on'); for (const a of V.audio.values()) a.play().catch(() => {}); }
  // a stream that ends by itself (the system took the mic, a permission change): ask again on the next tick
  V.stream.getAudioTracks().forEach(t => { t.onended = () => { if (V.stream) { stopVoice(true); say('ended', 'Your mic stopped: tap Join voice'); } }; });
  setTrack(); meter(); clearInterval(V.lvT); V.lvT = setInterval(level, 100);
  await ensurePeer(); link(); paintAll();
}
// stops the mic and every call. keepWant: a mic that ended by itself waits for a tap rather than restarting
export function stopVoice(keepWant) {
  clearInterval(V.lvT); V.lvT = null; try { if (D.ac) D.ac.close(); } catch (e) {} D.ac = D.an = null; D.lv = 0;
  for (const id of [...V.calls.keys()]) hang(id);
  for (const e of V.early.values()) { try { e.call.close(); } catch (x) {} } V.early.clear();
  if (V.stream) V.stream.getTracks().forEach(t => { t.onended = null; try { t.stop(); } catch (e) {} });
  V.stream = null; V.starting = false;
  if (V.peer) { const p = V.peer; V.peer = null; try { p.destroy(); } catch (e) {} } V.vp = null;
  if (ON.vp) online.voice('');
  for (const m of [V.state, V.since, V.sinceVp, V.fail, V.err, D.out, D.inn, D.talk, D.route]) m.clear(); D.turned = 0; V.said.clear();
  if (keepWant === true) V.failed = 'ended';
  paintAll();
}
function tick() {
  const ms = partyMates();
  if (!ms.length) { if (V.stream || V.peer) stopVoice(); if (V.failed === 'ended') V.failed = null; paintAll(); return; }
  if (!V.stream && !V.starting && V.want && !V.failed) startVoice(false);
  if (V.stream) { ensurePeer(); link(); stats().then(paintAll); } else paintAll();
}

// ---------- the controls ----------
function setTrack() { if (V.stream) V.stream.getAudioTracks().forEach(t => { t.enabled = V.on; }); }
export const micOn = () => V.on;
export function setMic(v) { V.on = !!v; ls.set(KEY, V.on ? 'on' : 'off'); setTrack(); paintAll(); }
export function muteFriend(id, v) {
  if (v) V.muted.add(id); else V.muted.delete(id); ls.set(MUTED, [...V.muted].join(','));
  const a = V.audio.get(id); if (a) a.muted = v; paintAll();
}
const tap = () => { if (!V.stream) { V.failed = null; startVoice(true); } else setMic(!V.on); };

const sid = x => String(x || '').slice(-4);
function friendLine(m) { // one friend's state, in words
  const st = V.state.get(m.id), o = D.out.get(m.id), i = D.inn.get(m.id), mine = V.vp && m.vp && V.vp < m.vp, f = V.fail.get(m.id), er = V.err.get(m.id);
  const w = Math.round((now() - (V.since.get(m.id) || now())) / 1000);
  const t = !m.vp ? 'not in voice yet' : !st ? (er ? `can't start the call: ${er}` : mine ? 'calling…' : `waiting for their call ${w}s`)
    : st === 'failed' ? `can't link${f ? ` (try ${f.n})` : ''}` : st === 'calling' ? 'linking…'
    : `${i && i.up ? 'hearing them' : 'linked, silent'} · ${o && o.up ? 'they hear you' : 'sending nothing'}${D.route.get(m.id) ? ` · ${D.route.get(m.id)}` : ''}`;
  return `${m.nick} ${sid(m.vp)}${m.vp ? ` (${mine ? 'I call' : 'they call'})` : ''}: ${t}${V.muted.has(m.id) ? ' · muted by you' : ''}`;
}
function statText() {
  const ms = partyMates(), rows = [];
  rows.push(V.stream ? `Mic: ${V.on ? 'on' : 'muted'} · you ${'▮'.repeat(Math.round((V.on ? D.lv : 0) * 5)).padEnd(5, '▯')}` : `Mic: ${V.failed === 'denied' ? 'blocked: tap Join voice' : V.failed === 'no-mic' ? 'none found' : V.failed === 'ended' ? 'stopped: tap Join voice' : V.starting ? 'asking…' : 'off: tap Join voice'}`);
  if (V.stream) {
    rows.push(`Voice link: ${!V.peer ? 'starting' : V.peer.disconnected ? 'LOST' : V.vp ? 'ok' : 'connecting'} · you ${sid(V.vp)}${V.perr ? ` · ${V.perr}` : ''}${D.turned ? ` · calls held ${D.turned}` : ''}`);
    ms.forEach(m => rows.push(friendLine(m)));
  }
  return rows.join('\n');
}
// the party bar on the main screen: Join voice, then the mic and a chip per friend (glows while they talk, tap to mute)
let barSig = '';
function paintBar() {
  const bar = document.getElementById('pvBar'); if (!bar) return;
  const ms = partyMates(), show = ms.length > 0 && G.state !== 'play';
  bar.hidden = !show; if (!show) { barSig = ''; return; }
  const sig = (V.stream ? 'L' : 'J' + (V.failed || '') + (V.starting ? 's' : '')) + '|' + ms.map(m => m.id + m.nick).join(',');
  if (sig !== barSig) {
    barSig = sig;
    const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    bar.innerHTML = (V.stream ? '<button type="button" id="pvMic" class="pvMic" aria-label="Your mic"><i></i></button>'
      : `<button type="button" id="pvJoin" class="go pvJoin">${V.starting ? 'Asking for the mic…' : V.failed === 'denied' ? 'Mic blocked: tap to try' : 'Join voice'}</button>`)
      + ms.map(m => `<button type="button" class="pvf" data-pvf="${esc(m.id)}"><span>${esc(m.nick)}</span></button>`).join('')
      + '<pre id="pvStat"></pre>';
  }
  const mic = document.getElementById('pvMic'); if (mic) { mic.classList.toggle('off', !V.on); mic.title = V.on ? 'Mic on (tap to mute)' : 'Muted (tap to unmute)'; }
  bar.querySelectorAll('[data-pvf]').forEach(b => { const id = b.dataset.pvf, m = ms.find(x => x.id === id);
    b.classList.toggle('talk', !!D.talk.get(id)); b.classList.toggle('muted', V.muted.has(id)); b.classList.toggle('linked', V.state.get(id) === 'sound');
    b.title = m ? friendLine(m) : ''; });
  const st = document.getElementById('pvStat'); if (st) st.textContent = statText();
}
function paintBattle() {
  const b = document.getElementById('micBtn'), el = document.getElementById('voiceStat');
  const show = G.state === 'play' && partyMates().length > 0;
  if (b) { b.hidden = !show; b.classList.toggle('off', !V.on || !V.stream); b.classList.toggle('ask', !V.stream);
    b.title = !V.stream ? 'Tap to join your party\'s voice' : V.on ? 'Mic on (tap to mute)' : 'Muted (tap to unmute)'; }
  if (el) { el.hidden = !show; if (show) el.textContent = statText(); }
}
function paintAll() { paintBar(); paintBattle(); }

export function bindVoice() {
  const b = document.getElementById('micBtn'); if (b) b.addEventListener('click', e => { e.stopPropagation(); tap(); });
  const bar = document.getElementById('pvBar');
  if (bar) bar.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return; e.stopPropagation();
    if (t.id === 'pvJoin' || t.id === 'pvMic') tap();
    else if (t.dataset.pvf) muteFriend(t.dataset.pvf, !V.muted.has(t.dataset.pvf));
  });
  bus.on('online', ({ k }) => { if (k === 'party' || k === 'me') tick(); });
  clearInterval(V.timer); V.timer = setInterval(tick, 1000);
  paintAll();
}

// for the tests: state, and per friend the sound energy received so far (from the call's own statistics, so it counts
// what arrived over the network) and whether this phone is actually playing it
export const voiceState = () => ({ live: !!V.stream, on: V.on, failed: V.failed, vp: V.vp, calls: [...V.calls.keys()], links: Object.fromEntries(V.state),
  heard: [...V.audio.values()].filter(a => a.srcObject && a.srcObject.getAudioTracks().some(t => t.readyState === 'live')).length });
export const voiceCalls = () => new Map(V.calls); // (tests: the call objects themselves, to prove none was replaced)
export async function voiceLevels() {
  const out = {};
  for (const [id, c] of V.calls) {
    const pc = c.peerConnection, a = V.audio.get(id); if (!pc) continue; let e = 0;
    (await pc.getStats()).forEach(r => { if (r.type === 'inbound-rtp' && r.kind === 'audio') e += r.totalAudioEnergy || 0; });
    out[id] = { energy: e, playing: !!a && !a.paused, muted: !!a && a.muted };
  }
  return out;
}
