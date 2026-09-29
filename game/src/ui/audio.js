// Battle audio. Recorded CC0 sounds (steel, blows, swings, the bow, falls; see public/sfx/CREDITS.txt)
// for everything a recording exists for, with synthesis only where none does: brass war horns, war
// drums, and the distant roar of battle. Every sound is placed left/right by where it happened
// relative to the camera, dulled and sent further into a shared outdoor reverb with distance, and
// the whole mix runs through a limiter so a big melee never clips.
import { G } from '../core/state.js';
import { clamp } from '../core/world.js';
import { cam, camTarget } from '../render/camera.js';

let ac = null, out = null, verb = null, nb = null;
const lastS = {}, bufs = {};
// sample banks: name -> number of variants (public/sfx/<name><n>.mp3)
const BANK = { swing: 6, hit: 8, heavy: 5, clang: 12, wall: 5, thud: 5, fall: 4, bow: 1, draw: 5, cloth: 4, coins: 2, step: 5 };

export function initAudio() {
  if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
  try {
    ac = new (window.AudioContext || window.webkitAudioContext)();
    nb = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate); const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    // limiter -> speakers; a short outdoor reverb shared by everything
    const lim = ac.createDynamicsCompressor();
    lim.threshold.value = -10; lim.knee.value = 6; lim.ratio.value = 12; lim.attack.value = .003; lim.release.value = .2;
    out = ac.createGain(); out.gain.value = .9; out.connect(lim).connect(ac.destination);
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
}
export const audioReady = () => !!ac && Object.keys(bufs).length > 0;
// for automated checks: what loaded, how many sounds are playing right now, the battle's heat
export const audioStats = () => ({ state: ac && ac.state, banks: Object.fromEntries(Object.entries(bufs).map(([k, v]) => [k, v.length])), voices, heat: +(amb.heat || 0).toFixed(2), near: amb.near || 0, far: amb.far || 0 });
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
}
export function stopCrowd() {
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
    for (const u of G.units) { if (u.dead || !(u.swing > 0 || (u.fd != null && u.fd < 2.5))) continue; const d = Math.hypot(u.x - L.x, u.z - L.z); if (d < 20) near++; else far++; }
    amb.near = near; amb.far = far;
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
  // war drums: a slow beat, quickening and louder as the fighting heats up
  if (amb.drumT <= 0) {
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
  hit(x, z) {
    if (!gateS('hi', 40)) return;
    if (!play('hit', x, z, { vol: .8, jit: .1, send: .18 })) noise(.12, 380, 1, .4, 'lowpass', 0, at(x, z));
    if (Math.random() < .35) play('cloth', x, z, { vol: .25, delay: .02 });
  },
  clang(x, z) { // steel on a shield or armour: a recorded strike with a thin ring on top
    if (!gateS('cl', 45)) return;
    if (!play('clang', x, z, { vol: .7, jit: .1, send: .3 })) noise(.08, 3400, 7, .22, 'bandpass', 0, at(x, z));
    const pl = at(x, z); tone(2200 + Math.random() * 900, .35, .025, 'sine', 0, 0, pl, .4); tone(3700 + Math.random() * 700, .22, .014, 'sine', 0, 0, pl, .4);
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
  crumble() { for (let i = 0; i < 4; i++) play('wall', null, null, { vol: .8, rate: .55 + i * .08, delay: i * .12 }); noise(1.6, 260, .7, .7, 'lowpass', 60); },
  cheer() { if (!gateS('ch', 400)) return; noise(1.6, 700, .8, .18, 'bandpass', 1400, undefined, 0, .4); noise(1.9, 480, .6, .14, 'bandpass', 900, undefined, .1, .4); },
  // comedy: a slide whistle for anyone sent flying, and the thump when they come down
  whee(x, z) {
    if (!ac || !gateS('wh', 140)) return; const pl = place(x, z); if (pl.v < .08) return;
    const t = ac.currentTime, o = ac.createOscillator(), up = .28 + Math.random() * .1, f0 = 520 + Math.random() * 160;
    o.type = 'sine'; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f0 * 3.1, t + up); o.frequency.exponentialRampToValueAtTime(f0 * .8, t + up + .5);
    const vib = ac.createOscillator(), vg = ac.createGain(); vib.frequency.value = 7; vg.gain.value = 18; vib.connect(vg).connect(o.frequency);
    const gn = route(o, 1, pl, .15); gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(.09 * pl.v, t + .04); gn.gain.setValueAtTime(.09 * pl.v, t + up + .3); gn.gain.exponentialRampToValueAtTime(.0001, t + up + .55);
    o.start(t); o.stop(t + up + .6); vib.start(t); vib.stop(t + up + .6);
  },
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
  thump(x, z) { if (gateS('tp', 70)) play('fall', x, z, { vol: .7, rate: .85 }); },
  uiClick() { if (gateS('ui', 45)) tone(620, .04, .04, 'triangle', 480); },
};
export function buzz(ms) { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} }
