// Battle audio. Recorded CC0 sounds (steel, blows, swings, the bow, falls; see public/sfx/CREDITS.txt)
// for everything a recording exists for, with synthesis only where none does: brass war horns, war
// drums, and the distant roar of battle. Every sound is placed left/right by where it happened
// relative to the camera, dulled and sent further into a shared outdoor reverb with distance, and
// the whole mix runs through a limiter so a big melee never clips.
import { G, isEnemyTi } from '../core/state.js';
import { clamp } from '../core/world.js';
import { cam, camTarget } from '../render/camera.js';

let ac = null, out = null, verb = null, nb = null;
const lastS = {}, bufs = {};
// sample banks: name -> number of variants (public/sfx/<name><n>.mp3)
const BANK = { swing: 6, hit: 8, heavy: 5, clang: 12, wall: 5, thud: 5, fall: 4, bow: 1, draw: 5, cloth: 4, coins: 2, step: 5, scream: 6, grunt: 6 };

export function initAudio() {
  if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
  try {
    ac = new (window.AudioContext || window.webkitAudioContext)();
    nb = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate); const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    // limiter -> speakers; a short outdoor reverb shared by everything
    const lim = ac.createDynamicsCompressor();
    lim.threshold.value = -10; lim.knee.value = 6; lim.ratio.value = 12; lim.attack.value = .003; lim.release.value = .2;
    out = ac.createGain(); out.gain.value = muted ? 0 : .9; out.connect(lim).connect(ac.destination);
    verb = ac.createConvolver(); verb.buffer = impulse(1.7, 3.2); const vg = ac.createGain(); vg.gain.value = .55; verb.connect(vg).connect(out);
    loadBank();
  } catch (e) { ac = null; }
}
// A field-battle space: a quick early slap then a soft, dark tail (no cathedral).
function impulse(sec, decay) {
  const len = Math.floor(ac.sampleRate * sec), b = ac.createBuffer(2, len, ac.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c); let lp = 0;
    for (let i = 0; i < len; i++) {
      const t = i / len, early = i < ac.sampleRate * .03 ? .6 : 1;
      lp += ((Math.random() * 2 - 1) - lp) * (.5 - .42 * t); // darker as it decays
      d[i] = lp * Math.pow(1 - t, decay) * early;
    }
  }
  return b;
}
function loadBank() {
  const decode = ab => new Promise((res, rej) => { const p = ac.decodeAudioData(ab, res, rej); if (p && p.then) p.then(res, rej); });
  for (const [k, n] of Object.entries(BANK)) for (let i = 1; i <= n; i++) {
    fetch(`sfx/${k}${i}.mp3`).then(r => r.ok ? r.arrayBuffer() : Promise.reject()).then(decode).then(b => { (bufs[k] = bufs[k] || []).push(b); }).catch(() => {});
  }
  for (const k of MUS_FILES) fetch(`sfx/mus/${k}.mp3`).then(r => r.ok ? r.arrayBuffer() : Promise.reject()).then(decode).then(b => { mb[k] = b; }).catch(() => {});
}
// The score's instruments: single notes and hits from a recorded orchestra (VSCO 2 CE, CC0), keyed by name.
// Each pitched one has the note it sounds (Hz); other notes play it faster or slower.
const MUS_FILES = ['horn_d', 'horn_a', 'horn_c', 'cello_d', 'cello_a', 'viola_d', 'viola_a', 'harp_d', 'harp_f', 'harp_a', 'pizz_d', 'pizz_a', 'timp1', 'timp2', 'bd1', 'bd2', 'beat1', 'beat2', 'frame1', 'frame2', 'gong'];
const mb = {};
const PITCHED = {
  horn: [['horn_d', 146.83], ['horn_a', 220], ['horn_c', 261.63]],
  cello: [['cello_d', 146.83], ['cello_a', 220]],
  viola: [['viola_d', 293.66], ['viola_a', 440]],
  harp: [['harp_d', 293.66, 1], ['harp_f', 349.23, 1], ['harp_a', 440, 2]], // (the A was recorded softer)
  pizz: [['pizz_d', 146.83], ['pizz_a', 110]],
};
const musReady = () => !!(mb.horn_d && mb.cello_d && mb.bd1 && mb.pizz_d);
// Silence everything (the games site's mute setting, or while an ad plays).
let muted = false;
export function setMuted(m) { muted = !!m; if (out && ac) out.gain.setTargetAtTime(muted ? 0 : .9, ac.currentTime, .05); }
// for automated checks: what loaded, how many sounds are playing right now, the battle's heat
export const audioStats = () => ({ music: { on: musicOn, level: M.level, want: M.want, move: +M.move.toFixed(2), hurt: +M.hurt.toFixed(2), night: M.night, rec: musReady(), samples: Object.keys(mb).length, drone: !!M.drone, bar: M.bar, beat: M.beat, next: ac && +M.next.toFixed(2), now: ac && +ac.currentTime.toFixed(2) }, state: ac && ac.state, muted, banks: Object.fromEntries(Object.entries(bufs).map(([k, v]) => [k, v.length])), voices, heat: +(amb.heat || 0).toFixed(2), near: amb.near || 0, far: amb.far || 0 });
export function gateS(n, ms) { const t = performance.now(); if (lastS[n] && t - lastS[n] < ms) return false; lastS[n] = t; return true; }

// ---------- where a sound is, from the listener ----------
function listener() { const t = camTarget(); return t ? { x: t.x, z: t.z } : null; }
// {v: loudness 0..1, pan: -1..1, far: 0..1}
function place(x, z) {
  const L = listener(); if (!L || x == null) return { v: 1, pan: 0, far: 0 };
  const dx = x - L.x, dz = z - L.z, d = Math.hypot(dx, dz);
  const y = cam.yaw, pan = d < .5 ? 0 : clamp((dx * -Math.cos(y) + dz * Math.sin(y)) / d, -1, 1) * clamp(d / 6, 0, 1) * .75;
  return { v: clamp(1.15 - d / 45, 0, 1), pan, far: clamp(d / 45, 0, 1) };
}
// Routes a source: gain -> (distance dulling) -> pan -> dry out + reverb send.
function route(src, gain, pl, send = .22) {
  const g = ac.createGain(); g.gain.value = gain;
  const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 16000 - 13500 * pl.far; lp.Q.value = .5;
  let node = src.connect(g).connect(lp);
  if (ac.createStereoPanner) { const p = ac.createStereoPanner(); p.pan.value = pl.pan; node = node.connect(p); }
  node.connect(out);
  const s = ac.createGain(); s.gain.value = send + .45 * pl.far; node.connect(s).connect(verb);
  return g;
}
let voices = 0;
// Plays a random variant of a sample bank. Returns false if nothing was played (not loaded yet).
function play(bank, x, z, { vol = 1, rate = 1, jit = .08, delay = 0, send, min = .05 } = {}) {
  if (!ac || voices > 28) return false;
  const list = bufs[bank]; if (!list || !list.length) return false;
  const pl = place(x, z); if (pl.v < min) return true;
  const s = ac.createBufferSource(); s.buffer = list[(Math.random() * list.length) | 0];
  s.playbackRate.value = rate * (1 + (Math.random() * 2 - 1) * jit);
  route(s, vol * pl.v, pl, send);
  voices++; s.onended = () => { voices--; };
  s.start(ac.currentTime + delay);
  return true;
}

// ---------- synthesis for what no recording covers ----------
function noise(dur, f, q, g, type = 'bandpass', to, pl = { v: 1, pan: 0, far: 0 }, delay = 0, send = .2) {
  if (!ac) return; const t = ac.currentTime + delay, s = ac.createBufferSource(), fl = ac.createBiquadFilter();
  s.buffer = nb; fl.type = type; fl.frequency.setValueAtTime(f, t); if (to) fl.frequency.exponentialRampToValueAtTime(to, t + dur); fl.Q.value = q;
  s.connect(fl); const gn = route(fl, 1, pl, send);
  gn.gain.setValueAtTime(Math.max(.0011, g * pl.v), t); gn.gain.exponentialRampToValueAtTime(.001, t + dur);
  s.start(t, Math.random() * 1.2); s.stop(t + dur);
}
function tone(f, dur, g, type = 'sine', to, delay = 0, pl = { v: 1, pan: 0, far: 0 }, send = .2) {
  if (!ac) return; const t = ac.currentTime + delay, o = ac.createOscillator();
  o.type = type; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  const gn = route(o, 1, pl, send);
  gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(Math.max(.0002, g * pl.v), t + .01); gn.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.start(t); o.stop(t + dur + .02);
}
// A war drum: a pitched-down body thump plus the skin's slap.
function drum(g = 1, delay = 0, pitch = 1, pl) {
  tone(78 * pitch, .55, .55 * g, 'sine', 42 * pitch, delay, pl, .35);
  tone(160 * pitch, .12, .12 * g, 'triangle', 90 * pitch, delay, pl, .35);
  noise(.07, 1200, .9, .25 * g, 'bandpass', 400, pl, delay, .35);
}
// Brass: detuned saws through a filter that opens as the note swells, vibrato settling in.
function brass(f, dur, g = .12, delay = 0) {
  if (!ac) return; const t = ac.currentTime + delay;
  const fl = ac.createBiquadFilter(); fl.type = 'lowpass'; fl.Q.value = 2;
  fl.frequency.setValueAtTime(f * 1.5, t); fl.frequency.linearRampToValueAtTime(f * 6, t + .18); fl.frequency.linearRampToValueAtTime(f * 4, t + dur);
  const gn = route(fl, 1, { v: 1, pan: 0, far: 0 }, .5);
  gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(g, t + .09); gn.gain.setValueAtTime(g, t + dur - .25); gn.gain.exponentialRampToValueAtTime(.0001, t + dur);
  const lfo = ac.createOscillator(), lg = ac.createGain(); lfo.frequency.value = 5.2; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * .012, t + .4); lfo.connect(lg);
  for (const det of [-7, 0, 6]) {
    const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(f * .97, t); o.frequency.exponentialRampToValueAtTime(f, t + .07); o.detune.value = det;
    lg.connect(o.frequency); o.connect(fl); o.start(t); o.stop(t + dur + .05);
  }
  lfo.start(t); lfo.stop(t + dur + .05);
}

// ---------- the music: a war score that follows the battle ----------
// Three levels, chosen from what's happening round your captain and changed only on the bar line:
// calm (a soft string pad and a few harp notes, no drums), approach (enemies close: plucked bass and a
// steady beat), clash (fighting all round: war drums with fills, horn calls). It follows you too: on the
// move a hand drum comes in and the tempo lifts; badly hurt, the music sinks away behind a heartbeat.
// On top, short stingers for the big moments. Recorded orchestra notes (VSCO 2 CE, CC0) played by this
// engine, with the old synthesis as a fallback until they load. D minor, on its own bus.
const N = { Bb1: 58.27, C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98, A2: 110, Bb2: 116.54, C3: 130.81, D3: 146.83, F3: 174.61, A3: 220, Bb3: 233.08, D4: 293.66, F4: 349.23, Fs4: 369.99, A4: 440, D5: 587.33 };
const BASS = [['D2', 'D2', 'F2', 'D2', 'D2', 'D2', 'A2', 'G2'], ['Bb1', 'Bb1', 'D2', 'Bb1', 'C2', 'C2', 'G2', 'C2']];
const BPM = [74, 92, 112];
let mus = null, musicOn = true;
const M = { level: 0, want: 0, next: 0, beat: 0, bar: 0, drone: null, calmT: 0, clashCueT: 0, move: 0, hurt: 0, night: false, heartT: 0 };
try { musicOn = localStorage.getItem('rally-music') !== 'off'; } catch (e) {}
export const musicEnabled = () => musicOn;
export function setMusic(on) {
  musicOn = !!on; try { localStorage.setItem('rally-music', on ? 'on' : 'off'); } catch (e) {}
  if (mus && ac) mus.gain.setTargetAtTime(on ? .5 : 0, ac.currentTime, .3);
  if (M.droneOut && ac) M.droneOut.gain.setTargetAtTime(on ? .5 : 0, ac.currentTime, .3);
}
// music bus: everything -> mix (fades) -> dark (a low-pass: night, and far away when you're hurt) -> on/off
let mix = null, dark = null;
function mOut() {
  if (!mus) {
    mus = ac.createGain(); mus.gain.value = musicOn ? .5 : 0; mus.connect(out); const s = ac.createGain(); s.gain.value = .25; mus.connect(s).connect(verb);
    dark = ac.createBiquadFilter(); dark.type = 'lowpass'; dark.frequency.value = 12000; dark.Q.value = .5; dark.connect(mus);
    mix = ac.createGain(); mix.gain.value = 1; mix.connect(dark);
  }
  return mix;
}
// a recorded note or hit at time t: name or a family (picks the nearest recorded note, folded into its octave)
function msamp(fam, f, t, dur, g, { attack = .006, rel = .25, dest } = {}) {
  let buf, rate = 1, trim = 1;
  if (PITCHED[fam]) {
    let best = null, bc = 99;
    for (const [k, base, tr] of PITCHED[fam]) { if (!mb[k]) continue; let r = f / base; while (r > 1.42) r /= 2; while (r < .7) r *= 2; const c = Math.abs(Math.log2(r)); if (c < bc) { bc = c; best = [k, r, tr || 1]; } }
    if (!best) return false; [buf, rate, trim] = [mb[best[0]], best[1], best[2]];
  } else { buf = mb[fam]; rate = f || 1; if (!buf) return false; }
  const s = ac.createBufferSource(), gn = ac.createGain(); s.buffer = buf; s.playbackRate.value = rate;
  const end = Math.min(dur, buf.duration / rate);
  gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(Math.max(.0002, g * trim), t + attack);
  gn.gain.setValueAtTime(Math.max(.0002, g * trim), t + Math.max(attack, end - rel)); gn.gain.exponentialRampToValueAtTime(.0001, t + end);
  s.connect(gn).connect(dest || mOut()); s.start(t); s.stop(t + end + .02);
  return true;
}
// a pitched note at time t (s, audio clock) through a low-pass that opens a little on the attack
function mnote(f, t, dur, g, type = 'sawtooth', cut = 1400) {
  const o = ac.createOscillator(), fl = ac.createBiquadFilter(), gn = ac.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); fl.type = 'lowpass'; fl.Q.value = 1.5;
  fl.frequency.setValueAtTime(cut * .6, t); fl.frequency.linearRampToValueAtTime(cut, t + .05); fl.frequency.linearRampToValueAtTime(cut * .5, t + dur);
  gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(g, t + .015); gn.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(fl).connect(gn).connect(mOut()); o.start(t); o.stop(t + dur + .03);
}
// a horn: three detuned saws swelling in, a touch of vibrato
function mhorn(f, t, dur, g = .07) {
  if (musReady() && msamp('horn', f, t, dur + .3, g * 5.5, { attack: .07, rel: .35 })) return;
  const fl = ac.createBiquadFilter(), gn = ac.createGain(); fl.type = 'lowpass'; fl.Q.value = 2;
  fl.frequency.setValueAtTime(f * 1.5, t); fl.frequency.linearRampToValueAtTime(f * 5, t + .15); fl.frequency.linearRampToValueAtTime(f * 3, t + dur);
  gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(g, t + .08); gn.gain.setValueAtTime(g, t + Math.max(.1, dur - .2)); gn.gain.exponentialRampToValueAtTime(.0001, t + dur);
  fl.connect(gn).connect(mOut());
  for (const det of [-6, 0, 5]) { const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(f * .98, t); o.frequency.exponentialRampToValueAtTime(f, t + .06); o.detune.value = det; o.connect(fl); o.start(t); o.stop(t + dur + .05); }
}
// a war drum at time t: the body's thump and the skin's slap
function mdrum(t, g = .5, pitch = 1) {
  if (!(g > 0)) return; // (a silent beat: no hit at all; a zero target would make the browser throw)
  if (musReady()) { // a big low hit is a timpani under the bass drum; a high one (fills) a hand drum
    if (pitch >= 1.25) { msamp(Math.random() < .5 ? 'frame1' : 'frame2', .9 + (pitch - 1.25) * .6, t, .6, g * 1.6); return; }
    msamp(g > .55 ? 'bd1' : 'bd2', pitch, t, 1.4, g * 1.7);
    if (g > .45) msamp(Math.random() < .5 ? 'timp1' : 'timp2', pitch * 1.02, t, 2.2, g * 1.5);
    return;
  }
  const o = ac.createOscillator(), gn = ac.createGain(); o.type = 'sine';
  o.frequency.setValueAtTime(82 * pitch, t); o.frequency.exponentialRampToValueAtTime(44 * pitch, t + .35);
  gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(g, t + .008); gn.gain.exponentialRampToValueAtTime(.0001, t + .5);
  o.connect(gn).connect(mOut()); o.start(t); o.stop(t + .55);
  const s = ac.createBufferSource(), fl = ac.createBiquadFilter(), ng = ac.createGain(); s.buffer = nb; fl.type = 'bandpass'; fl.frequency.value = 900 * pitch; fl.Q.value = .9;
  ng.gain.setValueAtTime(g * .35, t); ng.gain.exponentialRampToValueAtTime(.0001, t + .08); s.connect(fl).connect(ng).connect(mOut()); s.start(t, Math.random()); s.stop(t + .1);
}
function droneStart() {
  const t = ac.currentTime, fl = ac.createBiquadFilter(), gn = ac.createGain(); fl.type = 'lowpass'; fl.frequency.value = 300; fl.Q.value = .7;
  gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(.05, t + 3);
  const dg = ac.createGain(); dg.gain.value = musicOn ? .5 : 0; M.droneOut = dg; fl.connect(gn).connect(dg).connect(out); // (straight out, not through the reverb: it never stops)
  const os = [[N.D2, -5, 'sawtooth'], [N.D2, 5, 'sawtooth'], [N.A2, 0, 'sawtooth'], [N.D2 / 2, 0, 'sine']].map(([f, det, type]) => { const o = ac.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = det; o.connect(fl); o.start(t); return o; });
  M.drone = { fl, gn, os };
}
export function musicStart() {
  if (!ac) return; musicStop();
  Object.assign(M, { level: 0, want: 0, beat: 0, bar: 0, calmT: 0, clashCueT: 0, next: ac.currentTime + .4 });
  droneStart();
  // the battle begins: a horn call over the drums
  const t = ac.currentTime + .3; mdrum(t, .6); mdrum(t + .45, .5); mhorn(N.D4, t + .1, .5); mhorn(N.A4, t + .6, 1.2);
}
export function musicStop() {
  if (!ac || !M.drone) return; const t = ac.currentTime, d = M.drone; M.drone = null;
  d.gn.gain.cancelScheduledValues(t); d.gn.gain.setValueAtTime(d.gn.gain.value, t); d.gn.gain.exponentialRampToValueAtTime(.0001, t + 1.2);
  for (const o of d.os) o.stop(t + 1.3);
}
const tempo = () => BPM[M.level] + (M.level < 2 ? 10 * M.move : 4 * M.move); // (on the move the music moves with you)
function beat(t) {
  const b = M.beat % 4, lv = M.level, spb = 60 / tempo(), bass = BASS[M.bar % 2], rec = musReady();
  if (b === 0) {
    M.level = M.want;
    if (M.drone) { M.drone.fl.frequency.setTargetAtTime([300, 520, 900][M.level], t, 1.5); if (rec) M.drone.gn.gain.setTargetAtTime(.012, t, 2); } // (with the orchestra loaded the synth drone is only a low floor)
  }
  if (rec) {
    // the bed under everything: low strings, held, re-bowed every bar so it never gaps
    if (b === 0) { const root = bass[0] === 'Bb1' ? N.Bb2 : N.D3, g = lv === 0 ? .13 : lv === 1 ? .1 : .08; msamp('cello', root, t, spb * 4 + 1.4, g, { attack: .9, rel: 1.2 }); if (lv === 0 || M.night) msamp('viola', bass[0] === 'Bb1' ? N.F4 : N.A4, t + .2, spb * 4 + 1.2, g * .7, { attack: 1.1, rel: 1.2 }); }
    if (lv === 0) { // calm: now and then a harp note, never a pattern you notice
      if ((b === 0 || b === 2) && Math.random() < .45) msamp('harp', [N.D4, N.F4, N.A4, N.D5][(Math.random() * 4) | 0], t + (Math.random() < .3 ? spb / 2 : 0), 2.6, .16);
      if (M.move > .35) { msamp('frame2', 1, t, .5, .1 + .18 * M.move); if (M.move > .7) msamp('frame1', 1.1, t + spb / 2, .5, .08 + .1 * M.move); } // walking: a hand drum keeps your pace
    }
  } else {
    if (lv === 0) { if (b === 0) mdrum(t, .32); if (b === 2) mdrum(t, .2, 1.1); }
  }
  if (lv >= 1) {
    const night = M.night && lv === 1 ? .6 : 1; // (night: the drums held low)
    mdrum(t, night * (b === 0 ? (lv === 2 ? .75 : .5) : b === 2 ? (lv === 2 ? .65 : .38) : lv === 2 ? .42 : 0), b % 2 ? 1.15 : 1);
    for (const e of [0, 1]) {
      const n = N[bass[b * 2 + e]];
      if (rec) msamp('pizz', n, t + e * spb / 2, spb * .9, lv === 2 ? .5 : .38, { rel: .15 });
      else { mnote(n, t + e * spb / 2, spb * .45, lv === 2 ? .09 : .06, 'sawtooth', lv === 2 ? 900 : 650); if (lv === 2) mnote(n * 2, t + e * spb / 2, spb * .4, .035, 'square', 1200); }
    }
    if (rec && lv === 1 && M.move > .35 && b % 2 === 1) msamp('frame2', 1, t + spb / 2, .5, .15 * M.move);
  }
  if (lv === 2) {
    if (b === 3) { mdrum(t + spb / 2, .45, 1.3); mdrum(t + spb * .75, .35, 1.4); } // a fill into the next bar
    if (b === 0 && M.bar % 4 === 0) { mhorn(N.D4, t, spb * .9); mhorn(N.F4, t + spb, spb * .9); mhorn(N.A4, t + spb * 2, spb * 1.8); } // the horn call
    if (b === 0 && M.bar % 4 === 2) { for (const f of [N.Bb3, N.D4, N.F4]) mhorn(f, t, spb * 1.4, .045); } // and its answer
  }
  M.beat++; if (M.beat % 4 === 0) M.bar++;
}
// Badly hurt: your heartbeat, faster the closer you are to falling. Not on the music bus, so it plays with the music off.
function heart(dt) {
  if (M.hurt <= 0 || !mb.beat1) return;
  M.heartT -= dt; if (M.heartT > 0) return;
  const bpm = 72 + 58 * M.hurt; M.heartT = 60 / bpm;
  const t = ac.currentTime + .02, g = .35 + .45 * M.hurt;
  const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 220; lp.connect(out);
  msamp('beat1', .8, t, .5, g, { dest: lp }); msamp('beat2', .85, t + .22, .5, g * .7, { dest: lp });
}
function musicTick(dt, heat, enemiesNear, move = 0, hp = 1) {
  if (!ac || !M.drone) return;
  M.calmT -= dt; M.clashCueT -= dt;
  M.night = !!(G.c2 && G.T >= 480);
  const hot = heat > .22, want = hot ? 2 : enemiesNear >= 3 || M.night ? 1 : 0; // (the mountain's night: the drums never quite stop)
  if (want === 2) M.calmT = 6;
  M.want = want === 2 || M.calmT > 0 ? 2 : want; // (the clash music holds on a few seconds after the fighting thins)
  if (M.want === 2 && M.level < 2 && M.clashCueT <= 0) { musicCue('clash'); M.clashCueT = 25; }
  M.move += (clamp(move, 0, 1) - M.move) * Math.min(1, dt * 1.5); // (eased, so a stop and a start don't jerk the music)
  const hurt = hp > 0 && hp < .35 ? (.35 - hp) / .35 * .7 + .3 : 0; M.hurt += (hurt - M.hurt) * Math.min(1, dt * 2);
  if (M.hurt < .02) M.hurt = 0;
  heart(dt);
  if (dark && (M.darkT = (M.darkT || 0) - dt) <= 0) { M.darkT = .25; const t = ac.currentTime; dark.frequency.setTargetAtTime(M.hurt > 0 ? 450 + 900 * (1 - M.hurt) : M.night ? 2600 : 12000, t, .4); mix.gain.setTargetAtTime(1 - .55 * M.hurt, t, .4); }
  const now = ac.currentTime; if (M.next < now - .5) M.next = now + .05;
  while (M.next < now + .2) { beat(M.next); M.next += 60 / tempo(); }
}
// the big moments
export function musicCue(kind) {
  if (!ac || !musicOn) return; const t = ac.currentTime + .03;
  switch (kind) {
    case 'clash': mdrum(t, .9, .9); mhorn(N.D4, t, .6, .06); mhorn(N.A4, t, .6, .05); break;
    case 'routEnemy': mdrum(t, .7); mhorn(N.D4, t, .25); mhorn(N.A4, t + .25, .25); mhorn(N.D5, t + .5, 1.1); break;
    case 'routMine': mdrum(t, .6, .8); mhorn(N.A3, t, .45, .06); mhorn(N.F3, t + .45, .45, .06); mhorn(N.D3, t + .9, 1.3, .06); break;
    case 'slain': msamp('gong', 1, t, 4.5, .35, { rel: 2 }); mdrum(t, 1, .85); mdrum(t + .3, .7); for (const f of [N.D4, N.Fs4, N.A4]) mhorn(f, t + .3, 1.6, .05); break;
    case 'capdown': mdrum(t, .8, .9); mhorn(N.D4, t + .1, .9, .05); mhorn(N.A4, t + .1, .9, .04); break;
    case 'fell': mdrum(t, .8, .75); mhorn(N.D3, t + .1, .6, .06); mhorn(N.A2, t + .7, 1.4, .06); break;
    case 'night': msamp('gong', .8, t, 5, .4, { rel: 2.5 }); mdrum(t, 1, .7); mdrum(t + .5, .8, .7); mhorn(N.D3, t + .2, 1.6, .07); mhorn(N.A3, t + 1.1, 2.2, .06); break; // (the mountain: the Crown awakens)
    case 'rally': for (let k = 0; k < 7; k++) mdrum(t + k * .07, .3 + k * .07, 1 + k * .05); break;
  }
}

// ---------- the sound of the battle around you ----------
// A low wind, a distant roar that swells with how many men are fighting, far-off steel ringing out,
// and war drums that quicken as the fighting nears. Driven by audioTick() each frame.
let bed = null, amb = { t: 0, drumT: 0, clashT: 0, heat: 0, arena: false };
function loop(f, q, type, g) {
  const s = ac.createBufferSource(); s.buffer = nb; s.loop = true; s.loopStart = Math.random(); s.loopEnd = 2;
  const fl = ac.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
  const gn = ac.createGain(); gn.gain.value = 0;
  s.connect(fl).connect(gn).connect(out); s.start();
  return { s, gn, fl, g };
}
export function startCrowd(mapId) {
  if (!ac) return;
  stopCrowd();
  amb = { t: 0, drumT: 1.5, clashT: 0, heat: 0, arena: mapId === 'colosseum' };
  bed = { wind: loop(380, .4, 'lowpass', .05), roar: loop(amb.arena ? 520 : 330, .8, 'bandpass', amb.arena ? .16 : .1) };
  const t = ac.currentTime;
  bed.wind.gn.gain.linearRampToValueAtTime(bed.wind.g, t + 2);
  bed.roar.gn.gain.linearRampToValueAtTime(bed.roar.g * .4, t + 2);
  musicStart();
}
export function stopCrowd() {
  musicStop();
  if (!bed || !ac) { bed = null; return; }
  const t = ac.currentTime;
  for (const l of Object.values(bed)) { try { l.gn.gain.cancelScheduledValues(t); l.gn.gain.setValueAtTime(l.gn.gain.value, t); l.gn.gain.linearRampToValueAtTime(0, t + .8); l.s.stop(t + .85); } catch (e) {} }
  bed = null;
}
export function audioTick(dt) {
  if (!ac || !bed || G.state !== 'play') return;
  amb.t -= dt; amb.drumT -= dt; amb.clashT -= dt;
  const L = listener();
  if (amb.t <= 0 && L) { // how hot is the battle, near and far (sampled, not every frame)
    amb.t = .5; let near = 0, far = 0;
    let foes = 0; const me = G.player;
    for (const u of G.units) { if (u.dead) continue; const d = Math.hypot(u.x - L.x, u.z - L.z); if (me && d < 45 && isEnemyTi(u.ti, me.ti) && !(u.neutral && !(u.swing > 0 || u.aim) && Math.hypot(u.x - u.px, u.z - u.pz) < 1)) foes++; /* (F4: a garrison standing quietly at its post isn't a fight) */ if (!(u.swing > 0 || (u.fd != null && u.fd < 2.5))) continue; if (d < 20) near++; else far++; }
    amb.near = near; amb.far = far; amb.foes = foes;
    const heat = clamp((near * 1.5 + far) / 40, 0, 1);
    amb.heat += (heat - amb.heat) * .35;
    const t = ac.currentTime;
    bed.roar.gn.gain.setTargetAtTime(bed.roar.g * (.35 + .9 * amb.heat), t, .6);
    bed.roar.fl.frequency.setTargetAtTime((amb.arena ? 520 : 300) + 280 * amb.heat, t, .6);
  }
  // distant steel: muffled clashes from the fights you can't see, as many as there are
  if (amb.clashT <= 0) {
    amb.clashT = .12 + Math.random() * (amb.far > 6 ? .25 : .9);
    if ((amb.far || 0) > 0) {
      const a = Math.random() * Math.PI * 2, r = 30 + Math.random() * 30, T = camTarget();
      if (T) play(Math.random() < .6 ? 'clang' : 'hit', T.x + Math.cos(a) * r, T.z + Math.sin(a) * r, { vol: .35, rate: .85, jit: .12, min: 0 });
    }
  }
  const me = G.player; let move = 0, hp = 1; // how fast you're going (of your own top speed), and how hurt you are
  if (me && !me.dead && dt > 0) { if (amb.px != null) move = Math.hypot(me.x - amb.px, me.z - amb.pz) / dt / (me.spd || 6); amb.px = me.x; amb.pz = me.z; hp = me.max ? me.hp / me.max : 1; } else amb.px = null;
  try { musicTick(dt, Math.min(1, (amb.near || 0) / 8), amb.foes || 0, move > 3 ? 0 : move, hp); } catch (e) { console.error(e); } // (the music follows the fighting round you, not across the field; a music fault must never stop the picture)
  // war drums: a slow beat, quickening and louder as the fighting heats up (only with the music off: the score has its own)
  if (amb.drumT <= 0 && !musicOn) {
    const h = amb.heat, beat = 60 / (70 + 60 * h);
    const pl = { v: .5 + .5 * h, pan: (Math.random() - .5) * .3, far: .5 };
    drum(.55, 0, 1, pl); drum(.4, beat * .5, 1.12, pl);
    if (h > .35) drum(.35, beat * .75, 1.2, pl);
    amb.drumT = beat * 2;
  }
}

// ---------- the effects the game asks for (x,z = where it happened) ----------
const at = (x, z) => place(x, z);
export const sfx = {
  swing(x, z) { if (gateS('sw', 45)) play('swing', x, z, { vol: .45, rate: 1.05, jit: .12, send: .12 }) || noise(.14, 1800, 1, .12, 'bandpass', 600, at(x, z)); },
  // a blow landing on a body: the punch, a heavier impact under it and a low thump for weight; up close,
  // now and then a comic touch on top (a pained grunt, or a hollow "bonk" off a helmet)
  hit(x, z) {
    if (!gateS('hi', 40)) return;
    const pl = at(x, z);
    if (!play('hit', x, z, { vol: .6, jit: .1, send: .18 })) noise(.12, 380, 1, .4, 'lowpass', 0, pl);
    play('heavy', x, z, { vol: .38, rate: 1.2, jit: .08, send: .15 });
    tone(120, .16, .3, 'sine', 50, 0, pl, .2);
    if (Math.random() < .35) play('cloth', x, z, { vol: .25, delay: .02 });
    if (pl.v > .75) {
      const r = Math.random();
      if (r < .3 && gateS('gr', 260)) play('grunt', x, z, { vol: .5, rate: 1, jit: .12, delay: .04, send: .15 });
      else if (r > .86 && gateS('bk2', 700)) sfx.bonk(x, z);
    }
  },
  // steel on a wooden shield: a solid knock with a short bite of metal (no ringing bells)
  clang(x, z) {
    if (!gateS('cl', 45)) return;
    const pl = at(x, z);
    if (!play('thud', x, z, { vol: .75, rate: .8, jit: .1, send: .2 })) noise(.08, 700, 2, .3, 'bandpass', 0, pl);
    play('clang', x, z, { vol: .32, rate: .82, jit: .1, send: .22 });
    tone(190, .1, .18, 'triangle', 110, 0, pl, .2);
  },
  // ---- F6 hit feel. Placeholders built from the recordings we have plus synthesis; the real sounds wanted are
  // listed in docs/tickets/F6.md ----
  // two swords meeting edge to edge: a bright strike, and the blades ringing after it
  clash(x, z) {
    if (!gateS('cs', 90)) return;
    const pl = at(x, z);
    play('clang', x, z, { vol: 1, rate: 1.3, jit: .04, send: .35 }); play('clang', x, z, { vol: .6, rate: .95, delay: .02, send: .35 });
    noise(.05, 5200, 1.2, .3, 'highpass', 0, pl);
    tone(2140, .5, .07, 'triangle', 2090, 0, pl, .4); tone(3215, .38, .045, 'sine', 3160, 0, pl, .4); tone(160, .14, .3, 'sine', 70, 0, pl, .2);
  },
  // a blow stopped dead on a shield: a deep wooden thud under the knock
  shield(x, z) {
    if (!gateS('sd', 70)) return;
    const pl = at(x, z);
    if (!play('thud', x, z, { vol: .95, rate: .62, jit: .06, send: .25 })) noise(.1, 420, 1.5, .4, 'lowpass', 0, pl);
    tone(105, .16, .38, 'sine', 55, 0, pl, .2);
  },
  // a captain's blade going clean through: a low, wide whoosh and a heavy landing
  cut(x, z) {
    if (!gateS('ct', 90)) return;
    const pl = at(x, z);
    if (!play('swing', x, z, { vol: .8, rate: .68, jit: .05, send: .2 })) noise(.2, 1100, 1, .2, 'bandpass', 300, pl);
    play('heavy', x, z, { vol: .7, rate: .9, delay: .03, send: .2 });
  },
  // the soldier's comic yelp as he goes: a short squeak up and away
  yelp(x, z) {
    if (!gateS('yp', 160)) return;
    const pl = at(x, z);
    if (pl.v < .15) return;
    tone(520, .09, .16, 'triangle', 980, .03, pl, .25); tone(980, .16, .13, 'triangle', 420, .12, pl, .25);
  },
  // the cartoon layer: a hollow wood-block "bonk" with a quick pitch drop
  bonk(x, z) {
    if (!ac) return; const pl = at(x, z); if (pl.v < .2) return;
    tone(720, .16, .22, 'sine', 330, 0, pl, .15); tone(1450, .06, .08, 'triangle', 700, 0, pl, .15);
    noise(.02, 2400, 3, .12, 'bandpass', 0, pl, 0, .1);
  },
  // a helmet knocked clean off: a bright little bell
  ding(x, z) {
    if (!ac || !gateS('dg', 150)) return; const pl = at(x, z); if (pl.v < .2) return;
    tone(1568, .7, .09, 'sine', 0, 0, pl, .3); tone(2350, .5, .045, 'sine', 0, 0, pl, .3); tone(3136, .3, .02, 'sine', 0, 0, pl, .3);
  },
  // an enemy hauling up a heavy blow: a grunt and a slow, rising swish (the warning)
  windup(x, z) {
    if (!ac || !gateS('wu', 200)) return; const pl = at(x, z); if (pl.v < .15) return;
    play('grunt', x, z, { vol: .6, rate: .85, jit: .08, send: .15 });
    noise(.5, 500, 1.5, .1, 'bandpass', 1600, pl, .05, .15);
  },
  // the glint as the blow starts down: a sharp metallic "ting" (the cue to parry)
  glint(x, z) {
    if (!ac || !gateS('gl', 120)) return; const pl = at(x, z); if (pl.v < .15) return;
    tone(2637, .22, .1, 'triangle', 0, 0, pl, .2); tone(3951, .14, .05, 'sine', 0, 0, pl, .2);
  },
  // a parry: steel ringing off steel, big and bright, with a low punch under it
  parry(x, z) {
    if (!ac || !gateS('pa', 90)) return; const pl = at(x, z);
    play('clang', x, z, { vol: .9, rate: 1.15, jit: .05, send: .35 }); play('clang', x, z, { vol: .5, rate: .7, delay: .03, send: .35 });
    tone(1760, .55, .12, 'triangle', 0, 0, pl, .35); tone(2640, .4, .06, 'sine', 0, .01, pl, .35); tone(110, .25, .35, 'sine', 50, 0, pl, .2);
  },
  // a guard smashed open: wood cracking and a heavy thump
  guardbreak(x, z) {
    if (!ac || !gateS('gb', 120)) return; const pl = at(x, z);
    play('heavy', x, z, { vol: 1, rate: .8, send: .25 }); play('thud', x, z, { vol: .8, rate: .6, delay: .02 });
    noise(.12, 1200, 1, .35, 'highpass', 0, pl, 0, .2);
  },
  heavy(x, z) { if (!gateS('hv', 80)) return; play('heavy', x, z, { vol: 1, jit: .06, send: .25 }); tone(85, .28, .35, 'sine', 38, 0, at(x, z), .3); },
  die(x, z) { if (!gateS('di', 90)) return; play('fall', x, z, { vol: .75, delay: .18, rate: .9 }); play('cloth', x, z, { vol: .3, delay: .1 }); },
  wall(x, z) { if (gateS('wa', 100)) play('wall', x, z, { vol: .75, rate: .85, send: .35 }) || noise(.2, 500, 1.2, .3, 'lowpass', 0, at(x, z)); },
  bow(x, z) { if (gateS('bo', 60)) play('bow', x, z, { vol: .5, jit: .12, send: .15 }) || noise(.25, 2600, 2, .06, 'bandpass', 900, at(x, z)); },
  thud(x, z) { if (gateS('th', 60)) play('thud', x, z, { vol: .45, jit: .15 }) || noise(.07, 900, 1.5, .15, 'bandpass', 0, at(x, z)); },
  hoof(x, z) { if (gateS('ho', 85)) play('step', x, z, { vol: .55, rate: .6, jit: .1 }) || noise(.05, 260, 2, .25, 'bandpass', 0, at(x, z)); },
  trample(x, z) { if (!gateS('tr', 90)) return; play('heavy', x, z, { vol: .8, rate: .75 }); play('fall', x, z, { vol: .5, delay: .08 }); },
  // a horse arriving: a burst of hoofbeats rather than a synthesized whinny
  neigh() { for (let i = 0; i < 6; i++) play('step', null, null, { vol: .5 - i * .05, rate: .55, jit: .1, delay: i * .11 + (i % 2) * .04 }); },
  draw() { if (gateS('dr', 120)) play('draw', null, null, { vol: .55, send: .15 }) || tone(700, .12, .05, 'triangle', 1300); },
  jump(x, z) { if (gateS('jp', 120)) play('cloth', x, z, { vol: .45, rate: 1.1 }); },
  land(x, z) { if (gateS('ld', 120)) play('step', x, z, { vol: .6, rate: .8 }); },
  coin() { if (gateS('co', 60)) play('coins', null, null, { vol: .45, jit: .05, send: .1 }) || tone(1300, .08, .08, 'square'); },
  // the battle horn: a war drum roll, then a long low call and its fifth
  horn() { const pl = { v: .9, pan: 0, far: .3 }; drum(.8, 0, 1, pl); drum(.6, .22, 1.1, pl); drum(.9, .44, .95, pl); brass(98, 1.9, .1, .55); brass(147, 1.6, .06, .8); },
  order() { if (gateS('or', 150)) { brass(196, .32, .07); brass(262, .42, .05, .16); } },
  capture() { brass(262, .35, .08); brass(330, .35, .07, .3); brass(392, .9, .09, .6); },
  rush() { noise(2.6, 380, .6, .6, 'lowpass', 90); noise(1.8, 1400, .5, .22, 'bandpass', 500, undefined, .15); }, // (F7a: the lake rushes out)
  crumble() { for (let i = 0; i < 4; i++) play('wall', null, null, { vol: .8, rate: .55 + i * .08, delay: i * .12 }); noise(1.6, 260, .7, .7, 'lowpass', 60); },
  cheer() { if (!gateS('ch', 400)) return; noise(1.6, 700, .8, .18, 'bandpass', 1400, undefined, 0, .4); noise(1.9, 480, .6, .14, 'bandpass', 900, undefined, .1, .4); },
  // anyone sent flying lets out a scream on the way up ("Aaah!", "Aarrgh!"): six voiced variants, each
  // pitched a little differently so no two soldiers sound alike (rendered by scripts/screams.py)
  scream(x, z) { if (gateS('sc', 110)) play('scream', x, z, { vol: .6, rate: 1, jit: .14, send: .28 }); },
  helmClank(x, z) { if (gateS('hc', 60)) play('clang', x, z, { vol: .3, rate: 1.5, jit: .15, send: .15 }); },
  // the farmyard: a startled chicken's bawk and a goat's complaint
  bawk(x, z) {
    if (!ac || !gateS('bk', 350)) return; const pl = place(x, z); if (pl.v < .1) return;
    [[0, 820, 1250], [.11, 1150, 700], [.2, 980, 620]].forEach(([d, a, b]) => tone(a, .09, .06, 'square', b, d, pl, .12));
  },
  bleat(x, z) {
    if (!ac || !gateS('bl', 900)) return; const pl = place(x, z); if (pl.v < .1) return;
    const t = ac.currentTime, o = ac.createOscillator(), bp = ac.createBiquadFilter(), lfo = ac.createOscillator(), lg = ac.createGain();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(420, t); o.frequency.linearRampToValueAtTime(360, t + .6);
    lfo.frequency.value = 22; lg.gain.value = 26; lfo.connect(lg).connect(o.frequency);
    bp.type = 'bandpass'; bp.frequency.value = 1300; bp.Q.value = 2.5; o.connect(bp);
    const gn = route(bp, 1, pl, .2); gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(.12 * pl.v, t + .05); gn.gain.exponentialRampToValueAtTime(.0001, t + .65);
    o.start(t); o.stop(t + .7); lfo.start(t); lfo.stop(t + .7);
  },
  // the horse charge: a quick horn call over a burst of galloping hooves
  charge(x, z) {
    if (!gateS('cg', 400)) return;
    brass(220, .3, .08); brass(294, .55, .09, .18);
    for (let i = 0; i < 8; i++) play('step', x, z, { vol: .6 - i * .04, rate: .6, jit: .1, delay: i * .09 + (i % 2) * .035 });
  },
  thump(x, z) { if (gateS('tp', 70)) play('fall', x, z, { vol: .7, rate: .85 }); },
  uiClick() { if (gateS('ui', 45)) tone(620, .04, .04, 'triangle', 480); },
};
// The phone's vibration (Android; iPhones have none for websites). A setting, on unless switched off.
let vibeOn = true; try { vibeOn = localStorage.getItem('rally-vibe') !== 'off'; } catch (e) {}
export const vibeEnabled = () => vibeOn;
export function setVibe(on) { vibeOn = !!on; try { localStorage.setItem('rally-vibe', on ? 'on' : 'off'); } catch (e) {} if (on) buzz(30); }
export function buzz(ms) { if (!vibeOn) return; try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} }
