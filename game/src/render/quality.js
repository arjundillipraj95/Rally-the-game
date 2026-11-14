// Graphics quality: picks a level for the device, and steps down if the game runs slowly.
// Low: no real-time shadows, no tall grass, flat sky. Medium: shadows and grass. High: sharper, softer, denser.
export const LEVELS = {
  low:    { name: 'Low',    near: 14, pixelRatio: 1,    antialias: false, particles: 120, splats: 30, fogScale: .8, shadows: 0,    softShadows: false, shadowRange: 0,  grass: 0,    clouds: false },
  medium: { name: 'Medium', near: 20, pixelRatio: 1.35, antialias: true,  particles: 260, splats: 60, fogScale: 1,  shadows: 1024, softShadows: false, shadowRange: 30, grass: 2600, clouds: true },
  high:   { name: 'High',   near: 26, pixelRatio: 2,    antialias: true,  particles: 420, splats: 90, fogScale: 1,  shadows: 2048, softShadows: true,  shadowRange: 42, grass: 6000, clouds: true },
};
const ORDER = ['low', 'medium', 'high'];

function readSetting() { try { return localStorage.getItem('rally-quality') || 'auto'; } catch (e) { return 'auto'; } }
export function saveSetting(v) { try { localStorage.setItem('rally-quality', v); } catch (e) {} }

export function detectLevel() {
  let gpu = '';
  try {
    const c = document.createElement('canvas'), gl = c.getContext('webgl');
    const ext = gl && gl.getExtension('WEBGL_debug_renderer_info');
    gpu = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : '';
  } catch (e) {}
  const cores = navigator.hardwareConcurrency || 4, mem = navigator.deviceMemory || 4;
  const touch = matchMedia('(pointer: coarse)').matches;
  if (/SwiftShader|llvmpipe|Mali-4|Mali-T|Adreno \(TM\) [3-5]\d\d|PowerVR/i.test(gpu) || mem <= 2 || cores <= 2) return 'low';
  if (touch) return (mem <= 3 || cores <= 4) ? 'low' : 'medium';
  return 'high';
}

// F14: on Auto, the level the last battle settled on is kept for the next one (never above detected).
function readAuto() { try { return localStorage.getItem('rally-quality-auto') || ''; } catch (e) { return ''; } }
export function saveAuto(v) { try { localStorage.setItem('rally-quality-auto', v); } catch (e) {} }

export const quality = {
  setting: readSetting(),
  detected: detectLevel(),
  level: 'medium',
  scale: 1,        // F14: render scale under Low, 0.7..1 (pixel ratio multiplier)
  stepped: false,
  get cfg() { return LEVELS[this.level]; },
};
{
  const a = readAuto();
  quality.level = quality.setting !== 'auto' ? quality.setting
    : (ORDER.includes(a) && ORDER.indexOf(a) <= ORDER.indexOf(quality.detected)) ? a : quality.detected;
}

// Returns the lower level, or null when already at the bottom.
export function stepDown() {
  const i = ORDER.indexOf(quality.level);
  if (i <= 0) return null;
  quality.level = ORDER[i - 1]; quality.stepped = true;
  return quality.level;
}

// F14: the adapting rule, kept pure so a test can feed it frame rates. st = { level, scale, ceil, ups,
// banned: { level: until s } , t }; returns { level, scale, change: 'down'|'up'|null }.
export function adaptStep(st, fps, A) {
  const i = ORDER.indexOf(st.level);
  if (fps < A.down) {
    st.ups = 0;
    if (i > 0) { st.banned[st.level] = st.t + A.ban; st.level = ORDER[i - 1]; return 'down'; }
    const s = Math.max(A.scaleMin, +(st.scale - A.scaleStep).toFixed(2));
    if (s < st.scale) { st.scale = s; return 'down'; }
    return null;
  }
  if (fps > A.up) {
    if (++st.ups < A.upN) return null;
    st.ups = 0;
    if (st.scale < 1) { st.scale = Math.min(1, +(st.scale + A.scaleStep).toFixed(2)); return 'up'; }
    const n = ORDER[i + 1];
    if (n && ORDER.indexOf(n) <= ORDER.indexOf(st.ceil) && !((st.banned[n] || 0) > st.t)) { st.level = n; return 'up'; }
    return null;
  }
  st.ups = 0; return null;
}
