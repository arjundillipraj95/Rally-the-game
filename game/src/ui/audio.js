// Sound effects made on the fly with WebAudio (no sound files yet).
import { G } from '../core/state.js';
import { clamp } from '../core/world.js';

let ac = null, nb = null, cb = null;
const lastS = {};
export function initAudio() {
  if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
  try {
    ac = new (window.AudioContext || window.webkitAudioContext)();
    nb = ac.createBuffer(1, ac.sampleRate * .6, ac.sampleRate); const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  } catch (e) { ac = null; }
}
export function gateS(n, ms) { const t = performance.now(); if (lastS[n] && t - lastS[n] < ms) return false; lastS[n] = t; return true; }
function noise(dur, f, q, g, type = 'bandpass', to, vol = 1) {
  if (!ac) return; const t = ac.currentTime, s = ac.createBufferSource(), fl = ac.createBiquadFilter(), gn = ac.createGain();
  s.buffer = nb; fl.type = type; fl.frequency.setValueAtTime(f, t); if (to) fl.frequency.exponentialRampToValueAtTime(to, t + dur); fl.Q.value = q;
  gn.gain.setValueAtTime(Math.max(.0011, g * vol), t); gn.gain.exponentialRampToValueAtTime(.001, t + dur); s.connect(fl).connect(gn).connect(ac.destination); s.start(t); s.stop(t + dur);
}
function tone(f, dur, g, type = 'sine', to, delay = 0) {
  if (!ac) return; const t = ac.currentTime + delay, o = ac.createOscillator(), gn = ac.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(Math.max(.0002, g), t + .02); gn.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(gn).connect(ac.destination); o.start(t); o.stop(t + dur);
}
function vol(x, z) { const p = G.player; if (!p || x == null) return 1; const d = Math.hypot(x - p.x, z - p.z); return clamp(1.2 - d / 40, 0, 1); }

// ---------- ambient crowd bed (loops through the match; louder and brighter in the Colosseum) ----------
function crowdBuffer() {
  if (cb) return cb;
  const len = Math.floor(ac.sampleRate * 4);
  cb = ac.createBuffer(1, len, ac.sampleRate);
  const d = cb.getChannelData(0);
  let v = 0;
  for (let i = 0; i < len; i++) { v += (Math.random() * 2 - 1) * .05; v *= .992; d[i] = v; }
  return cb;
}
let crowdSrc = null, crowdGain = null;
export function startCrowd(mapId) {
  if (!ac) return;
  stopCrowd();
  const arena = mapId === 'colosseum';
  const src = ac.createBufferSource(); src.buffer = crowdBuffer(); src.loop = true;
  const fl = ac.createBiquadFilter(); fl.type = 'bandpass'; fl.frequency.value = arena ? 480 : 260; fl.Q.value = .7;
  const gn = ac.createGain(); gn.gain.setValueAtTime(0, ac.currentTime);
  src.connect(fl).connect(gn).connect(ac.destination);
  try { src.start(); } catch (e) { return; }
  gn.gain.linearRampToValueAtTime(arena ? .1 : .04, ac.currentTime + 1.4);
  crowdSrc = src; crowdGain = gn;
}
export function stopCrowd() {
  if (crowdGain) { try { crowdGain.gain.cancelScheduledValues(ac.currentTime); crowdGain.gain.linearRampToValueAtTime(0, ac.currentTime + .6); } catch (e) {} }
  if (crowdSrc) { const s = crowdSrc; try { s.stop(ac.currentTime + .65); } catch (e) {} }
  crowdSrc = null; crowdGain = null;
}
export const sfx = {
  swing(x, z) { const v = vol(x, z); if (v > .1 && gateS('sw', 60)) noise(.14, 1800, 1, .12, 'bandpass', 600, v); },
  clang(x, z) { const v = vol(x, z); if (v > .1 && gateS('cl', 60)) { noise(.08, 3400, 7, .22, 'bandpass', 0, v); tone(1500 + Math.random() * 600, .14, .07 * v, 'triangle'); } },
  heavy(x, z) { const v = vol(x, z); if (v > .1 && gateS('hv', 90)) { tone(95, .22, .3 * v, 'sine', 40); noise(.16, 700, 1, .5, 'lowpass', 150, v); } },
  hit(x, z) { const v = vol(x, z); if (v > .1 && gateS('hi', 50)) { noise(.12, 380, 1, .4, 'lowpass', 0, v); tone(130, .1, .15 * v, 'triangle', 60); } },
  die(x, z) { const v = vol(x, z); if (v > .15 && gateS('di', 140)) tone(260, .35, .08 * v, 'sawtooth', 110); },
  wall(x, z) { const v = vol(x, z); if (v > .1 && gateS('wa', 120)) noise(.2, 500, 1.2, .3, 'lowpass', 0, v); },
  bow(x, z) { const v = vol(x, z); if (v > .1 && gateS('bo', 80)) { tone(220, .12, .06 * v, 'triangle', 140); noise(.25, 2600, 2, .06, 'bandpass', 900, v); } },
  thud(x, z) { const v = vol(x, z); if (v > .1 && gateS('th', 80)) noise(.07, 900, 1.5, .15, 'bandpass', 0, v); },
  hoof(x, z) { const v = vol(x, z); if (v > .1 && gateS('ho', 95)) noise(.05, 260, 2, .25, 'bandpass', 0, v); },
  neigh() { tone(700, .45, .07, 'sawtooth', 1100); tone(900, .4, .05, 'sawtooth', 500, .2); },
  trample(x, z) { const v = vol(x, z); if (v > .1 && gateS('tr', 90)) noise(.2, 200, 1, .5, 'lowpass', 0, v); },
  coin() { if (gateS('co', 50)) { tone(1300, .08, .08, 'square'); tone(1750, .12, .07, 'square', 0, .07); } },
  horn() { tone(196, .9, .14, 'sawtooth', 200); tone(294, .9, .08, 'sawtooth', 296); },
  order() { tone(392, .12, .1, 'square'); tone(523, .18, .1, 'square', 0, .1); },
  crumble() { noise(1.2, 300, .7, .6, 'lowpass', 80); },
  capture() { tone(523, .2, .12, 'square'); tone(659, .2, .12, 'square', 0, .18); tone(784, .4, .12, 'square', 0, .36); },
  cheer() { if (!gateS('ch', 400)) return; noise(1.4, 700, .8, .16, 'bandpass', 1400); noise(1.7, 500, .6, .12, 'bandpass', 900, .8); },
  uiClick() { if (gateS('ui', 45)) tone(700, .045, .045, 'square', 500); },
};
export function buzz(ms) { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} }
