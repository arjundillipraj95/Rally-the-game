// Team voice (V1): an open mic to your own team, on from the start of a battle, with a mute button.
// Each teammate's phone calls the others directly (the lower id calls, so each pair links once). A phone on the
// relay can't carry a voice call, so voice is quiet for that player; the game itself still plays.
import { session } from './session.js';
import { G, bus, colorOf } from '../core/state.js';

const KEY = 'rally.mic';
const V = { on: true, stream: null, calls: new Map(), audio: new Map(), timer: null, live: false, starting: false, failed: null, room: null, asked: false };
try { V.on = localStorage.getItem(KEY) !== 'off'; } catch (e) {}

export const micOn = () => V.on;
export const voiceState = () => ({ live: V.live, on: V.on, failed: V.failed, calls: [...V.calls.keys()], heard: [...V.audio.values()].filter(a => a.srcObject && a.srcObject.getAudioTracks().some(t => t.readyState === 'live')).length });

// the phones on my side (their seats come from the host's presence, as the names do)
function teammates() {
  const NET = session.NET; if (!NET || !NET.room || !NET.room.voice) return [];
  const peers = NET.room.peers();
  const seats = NET.role === 'host' ? NET.seats : ((peers.find(p => p.peer === NET.hostPeer) || {}).presence || {}).seats || {};
  const me = NET.room.voice.me();
  // same side, not same seat: a Duo or Trio partner sits in seat 4-11 of the same colour, and in team modes
  // other colours can be on your side too
  const side = ti => G.ALLY[colorOf(ti)];
  return Object.keys(seats).filter(p => p !== me && p !== 'me' && typeof seats[p] === 'number' && side(seats[p]) === side(G.myTi));
}

function play(p, s) {
  let a = V.audio.get(p);
  if (!a) { a = new Audio(); a.autoplay = true; a.setAttribute('playsinline', ''); V.audio.set(p, a); }
  a.srcObject = s; a.play().catch(() => { const go = () => { a.play().catch(() => {}); removeEventListener('pointerdown', go); }; addEventListener('pointerdown', go); });
}
function hang(p) {
  const c = V.calls.get(p); V.calls.delete(p);
  if (c) { try { c.close(); } catch (e) {} }
  const a = V.audio.get(p); V.audio.delete(p); if (a) a.srcObject = null;
}
function attach(call, p) {
  V.calls.set(p, call);
  call.on('stream', s => { play(p, s); bus.emit('voiceMsg', 'Voice on with your team'); });
  call.on('close', () => { if (V.calls.get(p) === call) hang(p); });
  call.on('error', () => { if (V.calls.get(p) === call) { hang(p); bus.emit('voiceMsg', "Voice: can't reach a teammate's phone"); } });
}
function link() {
  if (!V.stream) return;
  const room = session.NET && session.NET.room; if (!room || !room.voice) return;
  const me = room.voice.me(), mates = teammates();
  for (const p of mates) if (!V.calls.has(p) && me < p) { try { attach(room.voice.call(p, V.stream), p); } catch (e) {} }
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
  b.title = V.failed === 'denied' ? 'Microphone blocked: allow it in the browser settings' : V.failed ? 'No microphone' : V.on ? 'Mic on (tap to mute)' : 'Muted (tap to unmute)';
}
export function setMic(v) { V.on = !!v; try { localStorage.setItem(KEY, V.on ? 'on' : 'off'); } catch (e) {} setTrack(); paint(); }

// at the start of a battle: ask for the mic once, then call the team
export async function startVoice() {
  const room = session.NET && session.NET.room;
  if (V.live || V.starting || !room || !room.voice) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { V.failed = 'no-mic'; paint(); return; }
  V.starting = true;
  try { V.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }); }
  catch (e) { V.failed = e && e.name === 'NotAllowedError' ? 'denied' : 'no-mic'; V.starting = false; paint(); bus.emit('voiceMsg', V.failed === 'denied' ? 'Microphone blocked: allow it for this site' : 'No microphone found'); return; }
  V.starting = false; V.live = true; V.failed = null;
  if (V.room !== room) { V.room = room; room.voice.onCall(onCall); }
  setTrack(); V.timer = setInterval(link, 1000); link(); paint();
}
export function stopVoice() {
  V.asked = false; clearInterval(V.timer); V.timer = null;
  for (const p of [...V.calls.keys()]) hang(p);
  if (V.stream) V.stream.getTracks().forEach(t => { try { t.stop(); } catch (e) {} });
  V.stream = null; V.live = false; V.starting = false; paint();
}
export function bindVoice() {
  const b = document.getElementById('micBtn'); if (!b) return;
  b.addEventListener('click', e => { e.stopPropagation(); setMic(!V.on); });
  paint();
}
// every phone, host or joined, starts it once when its battle is on (the joined phones don't start from the same place)
export function voiceBattle(G) {
  if (V.asked || !session.NET || G.state !== 'play') return;
  V.asked = true; startVoice();
}
