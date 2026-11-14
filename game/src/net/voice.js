// Team voice (V1): an open mic to your side, on from the start of an online battle, with a mute button.
// Each teammate's phone calls the others directly (the lower id calls, so each pair links once). Calls need a
// direct link (or a TURN relay); the game's own fallback relay can't carry sound.
// Every step says on screen what happened, so a test on real phones shows where it stops.
import { session } from './session.js';
import { G, bus, colorOf } from '../core/state.js';

const KEY = 'rally.mic';
const V = { on: true, stream: null, calls: new Map(), audio: new Map(), state: new Map(), timer: null, live: false,
  starting: false, failed: null, room: null, asked: false, said: new Set(),
  since: new Map(), fail: new Map(), early: new Map(), err: new Map(), dir: new Map() }; // (V1d: when a teammate was first seen, failed-call count, calls that beat the seats, last call error, who started each call)
try { V.on = localStorage.getItem(KEY) !== 'off'; } catch (e) {}
// diagnostics (a real-phone test shows where voice stops): my mic's level, whether sound is leaving, and per teammate whether it arrives
const D = { ac: null, an: null, buf: null, lv: 0, out: new Map(), inn: new Map(), route: new Map(), turned: 0, why: '' };
function meter() {
  if (D.an || !V.stream) return;
  try { const AC = window.AudioContext || window.webkitAudioContext; D.ac = new AC(); const src = D.ac.createMediaStreamSource(V.stream); D.an = D.ac.createAnalyser(); D.an.fftSize = 512; D.buf = new Uint8Array(D.an.fftSize); src.connect(D.an); if (D.ac.state === 'suspended') D.ac.resume().catch(() => {}); } catch (e) { D.an = null; }
}
function level() { // 0..1 from the mic, 10 times a second
  if (!D.an) return; if (D.ac && D.ac.state === 'suspended') D.ac.resume().catch(() => {});
  D.an.getByteTimeDomainData(D.buf); let m = 0; for (let i = 0; i < D.buf.length; i++) m = Math.max(m, Math.abs(D.buf[i] - 128));
  D.lv = Math.min(1, m / 60); const b = document.getElementById('micBtn'); if (b) b.style.setProperty('--lv', (V.on ? D.lv : 0).toFixed(2));
}
async function stats() { // once a second: bytes sent to / audio energy from each teammate
  for (const [p, c] of V.calls) { const pc = c.peerConnection; if (!pc) continue;
    let sent = 0, got = 0, pair = null; const cand = new Map(); try { (await pc.getStats()).forEach(r => { if (r.type === 'outbound-rtp' && r.kind === 'audio') sent += r.bytesSent || 0; if (r.type === 'inbound-rtp' && r.kind === 'audio') got += r.totalAudioEnergy || 0; if (r.type === 'local-candidate') cand.set(r.id, r.candidateType); if (r.type === 'candidate-pair' && (r.selected || (r.nominated && r.state === 'succeeded'))) pair = r; }); } catch (e) {}
    if (pair) D.route.set(p, cand.get(pair.localCandidateId) === 'relay' ? 'via relay' : 'direct');
    const o = D.out.get(p) || { sent: 0, up: false }, i = D.inn.get(p) || { got: 0, up: false };
    o.up = sent > o.sent + 200; o.sent = sent; i.up = got > i.got + 1e-5; i.got = got; D.out.set(p, o); D.inn.set(p, i); }
}
function paintStat() {
  const el = document.getElementById('voiceStat'); if (!el) return;
  const NET = session.NET; if (!NET || G.state !== 'play') { el.hidden = true; return; }
  const mates = teammates(), rows = [];
  rows.push(V.live ? `Mic: ${V.on ? 'on' : 'muted'} · you ${'▮'.repeat(Math.round((V.on ? D.lv : 0) * 5)).padEnd(5, '▯')}` : `Mic: ${V.failed === 'denied' ? 'blocked: tap the mic' : V.failed === 'no-mic' ? 'none found' : V.starting ? 'asking…' : D.why || 'not started'}`);
  if (V.live) {
    const vc = NET.room.voice, me = vc.me(), sid = x => String(x).slice(-4);
    rows.push(`Signal: ${vc.signal ? (vc.signal() ? 'ok' : 'LOST') : '?'} · you ${sid(me)}${D.turned ? ` · calls turned away ${D.turned}` : ''}`);
    if (!mates.length) rows.push('No teammate phones on your side');
    mates.forEach((p, n) => { const st = V.state.get(p), o = D.out.get(p), i = D.inn.get(p), r = p.startsWith('r-') ? 'relay' : '', mine = me < p, f = V.fail.get(p);
      const w = Math.round((performance.now() - (V.since.get(p) || performance.now())) / 1000), er = V.err.get(p);
      const t = r ? 'on the relay: no sound possible' : !st ? (er ? `can't start the call: ${er}` : mine ? 'calling…' : `waiting for their call ${w}s`) : st === 'failed' || st === 'error' ? `can't link${f ? ` (try ${f.n})` : ''}` : st === 'calling' ? 'linking…' : `${i && i.up ? 'hearing them' : 'linked, silent'} · ${o && o.up ? 'they hear you' : 'sending nothing'}${D.route.get(p) ? ` · ${D.route.get(p)}` : ''}`;
      rows.push(`Mate ${n + 1} ${sid(p)} (${mine ? 'I call' : 'they call'}): ${t}`); });
  }
  el.hidden = false; el.textContent = rows.join('\n');
}
const say = (k, t) => { if (V.said.has(k)) return; V.said.add(k); bus.emit('voiceMsg', t); }; // (each message once a battle)

export const micOn = () => V.on;
export const voiceState = () => ({ live: V.live, on: V.on, failed: V.failed, calls: [...V.calls.keys()], links: Object.fromEntries(V.state),
  heard: [...V.audio.values()].filter(a => a.srcObject && a.srcObject.getAudioTracks().some(t => t.readyState === 'live')).length });

// the phones on my side (seats come from the host's presence, as the names do). Same side, not same seat: a Duo
// or Trio partner sits in seat 4-11 of the same colour, and in team modes other colours can be on your side too
function teammates() {
  const NET = session.NET; if (!NET || !NET.room || !NET.room.voice) return [];
  const peers = NET.room.peers();
  const seats = NET.role === 'host' ? NET.seats : ((peers.find(p => p.peer === NET.hostPeer) || {}).presence || {}).seats || {};
  const me = NET.room.voice.me(), side = ti => G.ALLY[colorOf(ti)];
  return Object.keys(seats).filter(p => p !== me && p !== 'me' && typeof seats[p] === 'number' && side(seats[p]) === side(G.myTi));
}

function play(p, s) {
  let a = V.audio.get(p);
  if (!a) { a = document.createElement('audio'); a.autoplay = true; a.setAttribute('playsinline', ''); a.style.display = 'none'; document.body.appendChild(a); V.audio.set(p, a); } // (in the page: iPhones play it more reliably)
  a.srcObject = s;
  a.play().then(() => say('on', 'Voice on with your team')).catch(() => { // (the browser wants a tap before it plays sound)
    say('tap', 'Tap the screen to hear your team');
    const go = () => { a.play().then(() => say('on', 'Voice on with your team')).catch(() => {}); removeEventListener('pointerdown', go); };
    addEventListener('pointerdown', go);
  });
}
function hang(p) {
  const c = V.calls.get(p); V.calls.delete(p); V.dir.delete(p);
  if (c) { try { c.close(); } catch (e) {} }
  const a = V.audio.get(p); V.audio.delete(p); if (a) { a.srcObject = null; a.remove(); }
}
const failedCall = p => { V.state.set(p, 'failed'); V.fail.set(p, { n: ((V.fail.get(p) || {}).n || 0) + 1, at: performance.now() }); }; // (retried a few times, 10 s apart)
function attach(call, p, dir) {
  V.calls.set(p, call); V.dir.set(p, dir); V.state.set(p, 'calling');
  call.on('stream', s => { V.state.set(p, 'sound'); play(p, s); });
  call.on('close', () => { if (V.calls.get(p) === call) hang(p); });
  call.on('error', () => { if (V.calls.get(p) === call) { hang(p); failedCall(p); } });
  // the link itself: 'failed' means no road between the two phones (their networks, or no relay got through)
  const t0 = performance.now();
  const watch = setInterval(() => {
    if (V.calls.get(p) !== call) { clearInterval(watch); return; }
    const pc = call.peerConnection, st = pc ? pc.iceConnectionState : 'new';
    if (st !== 'connected' && st !== 'completed' && performance.now() - t0 > 12000) { clearInterval(watch); hang(p); failedCall(p); say('nolink', "Voice can't get through to a teammate's phone"); return; }
    if (st === 'connected' || st === 'completed') { clearInterval(watch); if (V.state.get(p) !== 'sound') V.state.set(p, 'linked'); }
    else if (st === 'failed') { clearInterval(watch); hang(p); failedCall(p);
      say('nolink', session.NET.room.voice.relayed() ? "Voice can't get through: your network blocks direct links" : "Voice can't get through to a teammate's phone"); }
  }, 500);
}
function link() {
  if (!V.stream) return;
  const room = session.NET && session.NET.room; if (!room || !room.voice) return;
  const me = room.voice.me(), mates = teammates();
  for (const [p, e] of [...V.early]) { // a call that beat the seats: answer once the caller is known as a teammate, else drop it after 6 s
    if (mates.includes(p)) { V.early.delete(p); accept(e.call); }
    else if (performance.now() - e.at > 6000) { V.early.delete(p); try { e.call.close(); } catch (x) {} } }
  for (const m of [V.since, V.fail, V.err, V.state]) for (const p of [...m.keys()]) if (!mates.includes(p)) m.delete(p);
  if (!mates.length) return;
  // a phone on the game's relay ('r-' names, or me on it) can't take a call: the relay carries game data, not sound
  const off = mates.filter(p => p.startsWith('r-') || me.startsWith('r-'));
  if (off.length) say('relay', "Voice can't reach your team: your phones are linked through the relay");
  for (const p of mates) {
    if (off.includes(p)) continue;
    if (!V.since.has(p)) V.since.set(p, performance.now());
    if (V.calls.has(p)) continue;
    if (V.state.get(p) === 'failed') { const f = V.fail.get(p); if (f && f.n < 3 && performance.now() - f.at > 10000) { V.state.delete(p); V.since.set(p, performance.now()); } else continue; }
    // the lower id calls; if no call has come in 8 s the other phone calls instead (one direction can be dropped). __voiceDropUntil: tests only
    if (me < p ? window.__voiceDropUntil > performance.now() : performance.now() - V.since.get(p) < 8000) continue;
    try { const c = room.voice.call(p, V.stream); if (!c) throw new Error('no call object'); V.err.delete(p); attach(c, p, 'out'); } catch (e) { V.err.set(p, String((e && e.message) || e).slice(0, 40)); }
  }
  for (const p of [...V.calls.keys()]) if (!mates.includes(p)) hang(p);
}
function onCall(call) { // a teammate is calling: answer. A caller we don't know as a teammate yet is held a few seconds (seats can arrive after the call), then turned away
  if (!V.stream) { try { call.close(); } catch (e) {} return; }
  if (!teammates().includes(call.peer)) { D.turned++; V.early.set(call.peer, { call, at: performance.now() }); return; }
  accept(call);
}
function accept(call) {
  const p = call.peer, me = session.NET.room.voice.me();
  // both phones called at once: the lower id's call stays
  if (V.calls.has(p)) { if (V.dir.get(p) === 'out' && p > me) { try { call.close(); } catch (e) {} return; } hang(p); }
  try { call.answer(V.stream); } catch (e) {}
  attach(call, p, 'in');
}
function setTrack() { if (V.stream) V.stream.getAudioTracks().forEach(t => { t.enabled = V.on; }); }
function paint() {
  const b = document.getElementById('micBtn'); if (!b) return;
  b.hidden = !(V.live || V.failed);
  b.classList.toggle('off', !V.on || !!V.failed);
  b.classList.toggle('ask', !!V.failed);
  b.title = V.failed === 'denied' ? 'Microphone blocked: tap to ask again' : V.failed ? 'No microphone' : V.on ? 'Mic on (tap to mute)' : 'Muted (tap to unmute)';
}
export function setMic(v) { V.on = !!v; try { localStorage.setItem(KEY, V.on ? 'on' : 'off'); } catch (e) {} setTrack(); paint(); }

// asks for the mic, then calls the team. At the start of a battle, and again from a tap on the mic button if that
// first ask failed (Android's Chrome can refuse an ask that didn't come from a tap)
export async function startVoice(fromTap) {
  const room = session.NET && session.NET.room;
  if (V.live || V.starting) return;
  if (!room || !room.voice) { D.why = 'no voice link in this battle'; paintStat(); return; }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { V.failed = 'no-mic'; paint(); say('nomic', 'Voice needs a microphone this browser can use'); return; }
  V.starting = true;
  try { V.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }); }
  catch (e) {
    V.failed = e && e.name === 'NotAllowedError' ? 'denied' : 'no-mic'; V.starting = false; paint();
    if (fromTap) bus.emit('voiceMsg', V.failed === 'denied' ? 'Microphone blocked: allow it in the browser\'s site settings, then tap the mic' : 'No microphone found');
    else say('ask', 'Tap the mic to turn voice on');
    return;
  }
  V.starting = false; V.live = true; V.failed = null; V.on = fromTap ? true : V.on;
  if (V.room !== room) { V.room = room; room.voice.onCall(onCall); }
  setTrack(); meter(); V.timer = setInterval(() => { link(); stats().then(paintStat); }, 1000); V.lvT = setInterval(level, 100); link(); paint(); paintStat();
  setTimeout(() => { if (V.live && !teammates().length) say('alone', 'Voice: no teammates on your side to talk to'); }, 6000);
}
export function stopVoice() {
  V.asked = false; clearInterval(V.timer); V.timer = null; clearInterval(V.lvT); V.lvT = null; try { if (D.ac) D.ac.close(); } catch (e) {} D.ac = D.an = null; D.out.clear(); D.inn.clear(); D.route.clear(); D.turned = 0; D.lv = 0; D.why = '';
  for (const e of V.early.values()) { try { e.call.close(); } catch (x) {} } V.early.clear(); V.since.clear(); V.fail.clear(); V.err.clear(); V.dir.clear();
  { const el = document.getElementById('voiceStat'); if (el) el.hidden = true; }
  for (const p of [...V.calls.keys()]) hang(p);
  if (V.stream) V.stream.getTracks().forEach(t => { try { t.stop(); } catch (e) {} });
  V.stream = null; V.live = false; V.starting = false; V.failed = null; V.state.clear(); V.said.clear(); paint();
}
export function bindVoice() {
  const b = document.getElementById('micBtn'); if (!b) return;
  b.addEventListener('click', e => { e.stopPropagation(); if (!V.live) startVoice(true); else setMic(!V.on); });
  paint();
}
// every phone, host or joined, starts it once when its battle is on
export function voiceBattle(G) {
  if (V.asked || !session.NET || G.state !== 'play') return;
  V.asked = true; startVoice(false);
}
// for the tests: for each teammate, the sound energy received so far (from the call's own statistics, so it counts
// what arrived over the network) and whether this phone is actually playing it
export async function voiceLevels() {
  const out = {};
  for (const [p, c] of V.calls) {
    const pc = c.peerConnection, a = V.audio.get(p); if (!pc) continue; let e = 0;
    (await pc.getStats()).forEach(r => { if (r.type === 'inbound-rtp' && r.kind === 'audio') e += r.totalAudioEnergy || 0; });
    out[p] = { energy: e, playing: !!a && !a.paused };
  }
  return out;
}
