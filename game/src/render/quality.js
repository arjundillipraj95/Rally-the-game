// Graphics quality: picks a level for the device, and steps down if the game runs slowly.
export const LEVELS = {
  low:    { name: 'Low',    pixelRatio: 1,    antialias: false, particles: 120, splats: 30, fogScale: .8 },
  medium: { name: 'Medium', pixelRatio: 1.35, antialias: true,  particles: 260, splats: 60, fogScale: 1 },
  high:   { name: 'High',   pixelRatio: 2,    antialias: true,  particles: 420, splats: 90, fogScale: 1 },
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

export const quality = {
  setting: readSetting(),
  detected: detectLevel(),
  level: 'medium',
  stepped: false,
  get cfg() { return LEVELS[this.level]; },
};
quality.level = quality.setting === 'auto' ? quality.detected : quality.setting;

// Returns the lower level, or null when already at the bottom.
export function stepDown() {
  const i = ORDER.indexOf(quality.level);
  if (i <= 0) return null;
  quality.level = ORDER[i - 1]; quality.stepped = true;
  return quality.level;
}
