// Team voice (V1): an open mic to your side, on from the start of an online battle, with a mute button.
// Each teammate's phone calls the others directly (the lower id calls, so each pair links once). Calls need a
// direct link (or a TURN relay); the game's own fallback relay can't carry sound.
// Every step says on screen what happened, so a test on real phones shows where it stops.
import { session } from './session.js';
import { G, bus, colorOf } from '../core/state.js';

const KEY = 'rally.mic';
const V = { on: true, stream: null, calls: new Map(), audio: new Map(), state: new Map(), timer: null, live: false,
  starting: false, failed: null, room: null, asked: false, said: new Set() };
try { V.on = localStorage.getItem(KEY) !== 'off'; } catch (e) {}
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
  const c = V.calls.get(p); V.calls.delete(p);
  if (c) { try { c.close(); } catch (e) {} }
  const a = V.audio.get(p); V.audio.delete(p); if (a) { a.srcObject = null; a.remove(); }
}
function attach(call, p) {
  V.calls.set(p, call); V.state.set(p, 'calling');
  call.on('stream', s => { V.state.set(p, 'sound'); play(p, s); });
  call.on('close', () => { if (V.calls.get(p) === call) hang(p); });
  call.on('error', () => { if (V.calls.get(p) === call) { V.state.set(p, 'error'); hang(p); } });
  // the link itself: 'failed' means no road between the two phones (their networks, or no relay got through)
  const t0 = performance.now();
  const watch = setInterval(() => {
    if (V.calls.get(p) !== call) { clearInterval(watch); return; }
    const pc = call.peerConnection, st = pc ? pc.iceConnectionState : 'new';
    if (st !== 'connected' && st !== 'completed' && performance.now() - t0 > 12000) { clearInterval(watch); V.state.set(p, 'failed'); hang(p); say('nolink', "Voice can't get through to a teammate's phone"); return; }
    if (st === 'connected' || st === 'completed') { clearInterval(watch); if (V.state.get(p) !== 'sound') V.state.set(p, 'linked'); }
    else if (st === 'failed') { clearInterval(watch); V.state.set(p, 'failed'); hang(p);
      say('nolink', session.NET.room.voice.relayed() ? "Voice can't get through: your network blocks direct links" : "Voice can't get through to a teammate's phone"); }
  }, 500);
}
function link() {
  if (!V.stream) return;
  const room = session.NET && session.NET.room; if (!room || !room.voice) return;
  const me = room.voice.me(), mates = teammates();
  if (!mates.length) return;
  // a phone on the game's relay ('r-' names, or me on it) can't take a call: the relay carries game data, not sound
  const off = mates.filter(p => p.startsWith('r-') || me.startsWith('r-'));
  if (off.length) say('relay', "Voice can't reach your team: your phones are linked through the relay");
  for (const p of mates) if (!off.includes(p) && !V.calls.has(p) && me < p && V.state.get(p) !== 'failed') { try { attach(room.voice.call(p, V.stream), p); } catch (e) {} }
  for (const p of [...V.calls.keys()]) if (!mates.includes(p)) hang(p);
}
function onCall(call) { // a teammate is calling: answer; anyone else is turned away
  if (!V.stream || !teammates().includes(call.peer)) { try { call.close(); } catch (e) {} return; }
  if (V.calls.has(call.peer)) hang(call.peer);
  try { call.answer(V.stream); } catch (e) {}
  attach(call, call.peer);
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
  if (V.live || V.starting || !room || !room.voice) return;
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
  setTrack(); V.timer = setInterval(link, 1000); link(); paint();
  setTimeout(() => { if (V.live && !teammates().length) say('alone', 'Voice: no teammates on your side to talk to'); }, 6000);
}
export function stopVoice() {
  V.asked = false; clearInterval(V.timer); V.timer = null;
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
