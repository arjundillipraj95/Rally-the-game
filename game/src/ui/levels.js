// AUD1 the sound bars' values (Music, Effects, Team voice), kept per phone, and whether a teammate is talking.
// Read by ui/audio.js (music and effects), net/voice.js (teammates' voices) and ui/soundbars.js (the sliders).
import { BARS } from '../config/sound.js';
const KEY = { music: 'rally-bar-music', fx: 'rally-bar-fx', voice: 'rally-bar-voice' };
const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* none */ } } };
const clamp = v => Math.min(1, Math.max(0, v));
// phones that chose before the bars existed: Sound Low/High and Music Off carry over (Medium is the new default)
function start(k) {
  const v = parseFloat(ls.get(KEY[k]));
  if (Number.isFinite(v)) return clamp(v);
  if (k === 'fx') { const o = ls.get('rally-vol'); if (o === 'low') return .2; if (o === 'high') return .6; }
  if (k === 'music' && ls.get('rally-music') === 'off') return 0;
  return BARS[k].def;
}
export const LV = { music: start('music'), fx: start('fx'), voice: start('voice'), talking: false };
const subs = new Set();
export const onLevels = f => { subs.add(f); };
const emit = kind => subs.forEach(f => f(kind));
export function setBar(k, v) { if (!(k in KEY)) return; LV[k] = clamp(+v || 0); ls.set(KEY[k], String(LV[k])); emit('bar'); }
export function setTalking(on) { on = !!on; if (LV.talking === on) return; LV.talking = on; emit('talk'); }
