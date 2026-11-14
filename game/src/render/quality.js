// Graphics quality. Low/Medium/High are fixed choices. Auto (the default) climbs and descends a ladder of
// rungs (QUALITY.rungs in config.js): a first guess from the graphics chip and screen size, a 5 s
// measurement, then a steady watch for the whole battle (phones slow down when hot). The rung reached is
// kept per phone for the next battle.
// Low: no real-time shadows, no tall grass, flat sky. Medium: shadows and grass. High: sharper, softer, denser.
import { QUALITY } from '../config.js';

export const LEVELS = {
  low:    { name: 'Low',    near: 14, pixelRatio: 1,    antialias: false, particles: 120, splats: 30, fogScale: .8, shadows: 0,    softShadows: false, shadowRange: 0,  grass: 0,    clouds: false, outlines: false },
  medium: { name: 'Medium', near: 20, pixelRatio: 1.35, antialias: true,  particles: 260, splats: 60, fogScale: 1,  shadows: 1024, softShadows: false, shadowRange: 30, grass: 2600, clouds: true,  outlines: true },
  high:   { name: 'High',   near: 26, pixelRatio: 2,    antialias: true,  particles: 420, splats: 90, fogScale: 1,  shadows: 2048, softShadows: true,  shadowRange: 42, grass: 6000, clouds: true,  outlines: true },
};
const R = QUALITY.rungs, LAST = R.length - 1;
const clampR = r => Math.max(0, Math.min(LAST, r | 0));

function readSetting() { try { return localStorage.getItem('rally-quality') || 'auto'; } catch (e) { return 'auto'; } }
export function saveSetting(v) { try { localStorage.setItem('rally-quality', v); } catch (e) {} }

// ---------- the first guess ----------
// Pure, so a test can feed it chips and screens. px: the screen's real pixels (CSS size x pixel ratio, capped at 2).
export function guessRung({ gpu = '', ua = '', mem = 4, cores = 4, touch = false, px = 0 }) {
  const G = QUALITY.guess;
  let r;
  if (/SwiftShader|llvmpipe|Mali-4|Mali-T|Mali-G(31|5[12])\b|Adreno \(TM\) [3-5]\d\d|PowerVR/i.test(gpu) || mem <= 2 || cores <= 2) r = G.weak;
  else if (!touch) r = G.desktop;
  else if (/Apple/i.test(gpu) || /iPhone|iPad/i.test(ua)) r = G.apple; // (iOS names no chip: the 5 s measurement sorts old from new)
  else if (/Adreno \(TM\) [78]\d\d|Immortalis|Mali-G7[1-9]\d|Mali-G6[1-9]\d|Xclipse/i.test(gpu)) r = G.strong; // (Galaxy S23: Adreno 740)
  else if (/Adreno|Mali|Xclipse|Maleoon/i.test(gpu)) r = G.mid;
  else r = (mem <= 3 || cores <= 4) ? G.weak : G.unknown; // (the browser hides the chip)
  if (touch && px > G.bigPx) r++; // (a big screen: tablets push many more pixels)
  return clampR(r);
}
function device() {
  let gpu = '';
  try {
    const c = document.createElement('canvas'), gl = c.getContext('webgl');
    const ext = gl && gl.getExtension('WEBGL_debug_renderer_info');
    gpu = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : (gl ? String(gl.getParameter(gl.RENDERER)) : '');
  } catch (e) {}
  const nav = typeof navigator !== 'undefined' ? navigator : {}, scr = typeof screen !== 'undefined' ? screen : {};
  const dpr = Math.min(2, (typeof devicePixelRatio !== 'undefined' && devicePixelRatio) || 1);
  const w = Math.max(scr.width || 0, scr.height || 0), h = Math.min(scr.width || 0, scr.height || 0);
  const d = { gpu, ua: nav.userAgent || '', mem: nav.deviceMemory || 4, cores: nav.hardwareConcurrency || 4,
    touch: typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches, px: w * h * dpr * dpr };
  d.key = `${gpu}|${w}x${h}@${dpr}`; // (this phone: the same chip and screen)
  return d;
}

// ---------- kept per phone ----------
function readKept(key) {
  try { localStorage.removeItem('rally-quality-auto'); const k = JSON.parse(localStorage.getItem('rally-quality-auto2') || 'null'); return k && k.k === key && k.r >= 0 && k.r <= LAST ? k.r : null; } catch (e) { return null; }
}
export function keepRung() { try { localStorage.setItem('rally-quality-auto2', JSON.stringify({ k: quality.key, r: quality.rung })); } catch (e) {} }

// ---------- the live state ----------
let cache = null;
export const quality = {
  setting: readSetting(),
  level: 'medium', // (what is built at a battle's start: grass, crowd, particle caps; antialias at page load)
  rung: -1,        // (Auto: the rung now; -1 on a fixed choice)
  guess: 0, key: '',
  scale: 1,        // (mid-fight: the resolution held lower while a visible step waits for calm)
  stepped: false,
  get cfg() {
    if (cache) return cache;
    const L = LEVELS[this.level];
    if (this.rung < 0) return (cache = { ...L, far: L.clouds });
    const r = R[this.rung], S = LEVELS[r.sh];
    return (cache = { ...L, pixelRatio: r.pr, shadows: S.shadows, softShadows: S.softShadows, shadowRange: S.shadowRange, clouds: !!r.far, far: !!r.far, near: r.near, outlines: !!r.ol });
  },
};
export function setRung(r) { quality.rung = clampR(r); cache = null; }
export function setScale(s) { quality.scale = s; }
// A battle starts: what is built once follows the rung (the grass, the crowd); on a fixed choice nothing moves.
export function battleLevel() { if (quality.rung >= 0) { quality.level = R[quality.rung].lv; cache = null; } quality.scale = 1; }
{
  const d = device(); quality.guess = guessRung(d); quality.key = d.key;
  if (quality.setting === 'auto') { const k = readKept(d.key); setRung(k ?? quality.guess); battleLevel(); }
  else { quality.level = LEVELS[quality.setting] ? quality.setting : 'medium'; }
}

// ---------- a fight near the camera (the visible steps wait until it calms down) ----------
export const fight = { seen: false };
export function markFight() { fight.seen = true; }

// ---------- the adapting rule ----------
// Pure, so a test can feed it windows. st = { rung, t, last, ups, banned: { rung: until s }, probed, want, scale };
// w = { fps, dur, capped, calm }. Moves st and returns 'down' | 'up' | 'scale' | null.
const VIS = ['sh', 'far', 'near', 'ol'];
export const resOnly = (a, b) => VIS.every(k => R[a][k] === R[b][k]);
export function adaptState(rung) { return { rung, t: 0, last: -1e9, ups: 0, banned: {}, probed: false, want: null, scale: 1 }; }
function move(st, to, Q) {
  for (let r = to - 1; r >= st.rung; r--) st.banned[r] = st.t + Q.ban; // (falling: don't climb straight back)
  st.rung = to; st.last = st.t; st.ups = 0;
  if (st.want == null || st.want <= to) { st.want = null; st.scale = 1; }
}
function step(st, to, w, Q, dir) {
  to = clampR(to); if (to === st.rung) return null;
  let r = to;
  if (!w.calm) { const d = Math.sign(to - st.rung); r = st.rung; while (r !== to && resOnly(r, r + d)) r += d; } // (mid-fight: resolution steps only)
  let out = null;
  if (r !== to && dir === 'down') st.want = to;
  if (r !== st.rung) { move(st, r, Q); out = dir; }
  if (st.want != null && st.scale === 1) { st.scale = Q.fightScale; out = out || 'scale'; }
  return out;
}
export function adaptStep(st, w, Q = QUALITY) {
  if (st.want != null && w.calm) { const to = st.want; st.want = null; move(st, Math.max(to, st.rung), Q); st.scale = 1; return 'down'; }
  if (w.capped) { st.ups = 0; st.probed = true; return null; } // (held at 30 by the browser: not the game's doing)
  if (!st.probed) {
    st.probed = true;
    if (w.fps < Q.down) return step(st, st.rung + Math.ceil((Q.down - w.fps) / Q.probeStep), w, Q, 'down');
    if (w.fps >= Q.probeUp && w.calm) return step(st, st.rung - 1, w, Q, 'up');
    return null;
  }
  if (st.t - st.last < Q.cool) return null;
  if (w.fps < Q.down) { st.ups = 0; return st.want != null ? null : step(st, st.rung + 1, w, Q, 'down'); }
  if (w.fps < Q.up) { st.ups = 0; return null; }
  st.ups += w.dur;
  if (st.ups < Q.upAfter || st.rung === 0 || (st.banned[st.rung - 1] || 0) > st.t) return null;
  return step(st, st.rung - 1, w, Q, 'up'); // (a visible climb mid-fight just waits: ups are kept)
}
