// How each map looks (sky, sun, haze, ground), and the textures, drawn in code at load
// so the game downloads no image files. Any of these can be swapped for real texture files later.
import * as THREE from 'three';
import { mulberry } from '../core/world.js';

export const LOOK = {
  dunes:  { g1: 0xe2bd82, g2: 0xd2a468, g3: 0xb98f5c, zenith: 0x3f7ad0, horizon: 0xe6d6b8, sun: 0xfff0d2, sunI: 3.1, sky: 0xd8e6ff, gnd: 0xb08c5c, hemiI: 1.25, fog: [70, 230], sunDir: [.55, .62, .3],  ground: 'sand',  grass: .22, grassCol: [0xa89048, 0xe8d27e] },
  river:  { g1: 0x86a84c, g2: 0x6f9440, zenith: 0x4a82d0, horizon: 0xd9e6ea, sun: 0xfff3dc, sunI: 3.0, sky: 0xd4e4ff, gnd: 0x5d6f40, hemiI: 1.3,  fog: [60, 210], sunDir: [.5, .66, .35],  ground: 'grass', grass: 1,   grassCol: [0x3f6a2a, 0x9cc062] },
  forest: { g1: 0x5f8038, g2: 0x6d8f3e, zenith: 0x5b86b4, horizon: 0xc6d4c2, sun: 0xffeed0, sunI: 2.7, sky: 0xcfdcea, gnd: 0x44582f, hemiI: 1.35, fog: [30, 140], sunDir: [.45, .7, .4],   ground: 'grass', grass: 1.2, grassCol: [0x355a24, 0x86ad52] },
  forum:     { zenith: 0x4a84d2, horizon: 0xe6dccb, sun: 0xfff0d6, sunI: 3.0, sky: 0xd8e4ff, gnd: 0xa8987c, hemiI: 1.25, fog: [70, 230], sunDir: [.5, .64, .35], ground: 'paving', grass: .08, grassCol: [0x6f7a3c, 0xa8b060] },
  colosseum: { zenith: 0x4a80d0, horizon: 0xe8dcc4, sun: 0xfff0d2, sunI: 3.0, sky: 0xd8e4ff, gnd: 0xb08c5c, hemiI: 1.2,  fog: [90, 260], sunDir: [.45, .72, .3], ground: 'sand', grass: 0, grassCol: [0x9a8a4a, 0xd8c47a] },
  desert:    { g1: 0xe2bd82, g2: 0xd2a468, g3: 0xb98f5c, zenith: 0x3a76d0, horizon: 0xe8d6b4, sun: 0xfff0d0, sunI: 3.2, sky: 0xd8e6ff, gnd: 0xb08c5c, hemiI: 1.2, fog: [80, 240], sunDir: [.55, .6, .3], ground: 'sand', grass: .15, grassCol: [0xa89048, 0xe8d27e] },
  wooden:    { g1: 0x88a84e, g2: 0x72944a, zenith: 0x4a82d0, horizon: 0xd6e4e8, sun: 0xfff3dc, sunI: 3.0, sky: 0xd4e4ff, gnd: 0x5d6f40, hemiI: 1.3, fog: [60, 210], sunDir: [.5, .66, .35], ground: 'grass', grass: 1, grassCol: [0x3f6a2a, 0x9cc062] },
  valley:    { g1: 0x92b453, g2: 0x7a9e44, zenith: 0x4380d4, horizon: 0xdbe8ea, sun: 0xfff3dc, sunI: 3.1, sky: 0xd4e4ff, gnd: 0x5d6f40, hemiI: 1.3, fog: [70, 230], sunDir: [.52, .62, .38], ground: 'grass', grass: 1.4, grassCol: [0x4a7a2e, 0xb4d06a] },
  frost:  { g1: 0xd3dde6, g2: 0xbfccd8, g3: 0xa8b6c2, zenith: 0x5f8fcc, horizon: 0xe4ebf1, sun: 0xfff6ea, sunI: 2.3, sky: 0xe6eeff, gnd: 0x9aa6b2, hemiI: 1.1,  fog: [50, 190], sunDir: [.5, .6, .45],   ground: 'snow',  grass: .12, grassCol: [0x7d8a7a, 0xc9d6cf] },
};
export const lookFor = mapId => LOOK[mapId] || LOOK.dunes;

// ---------- textures ----------
const cache = {};
function canvasTex(key, size, draw, srgb = true) {
  if (cache[key]) return cache[key];
  const c = document.createElement('canvas'); c.width = c.height = size;
  const x = c.getContext('2d'); draw(x, size, mulberry(key.length * 7919 + size));
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  return (cache[key] = t);
}
// Tileable value noise, sampled on a torus so edges wrap.
function noiseField(size, cells, R) {
  const g = []; for (let i = 0; i < cells * cells; i++) g.push(R());
  const at = (i, j) => g[((j + cells) % cells) * cells + ((i + cells) % cells)];
  const s = t => t * t * (3 - 2 * t);
  return (x, y) => {
    const fx = x / size * cells, fy = y / size * cells, i = Math.floor(fx), j = Math.floor(fy), u = s(fx - i), v = s(fy - j);
    return (at(i, j) * (1 - u) + at(i + 1, j) * u) * (1 - v) + (at(i, j + 1) * (1 - u) + at(i + 1, j + 1) * u) * v;
  };
}
function paintNoise(x, S, R, base, amp, layers) {
  const img = x.createImageData(S, S), d = img.data;
  const fs = layers.map(([cells, w]) => [noiseField(S, cells, R), w]);
  for (let yy = 0; yy < S; yy++) for (let xx = 0; xx < S; xx++) {
    let n = 0; for (const [f, w] of fs) n += (f(xx, yy) - .5) * w;
    const v = Math.max(0, Math.min(255, (base + n * amp) * 255)), i = (yy * S + xx) * 4;
    d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
  }
  x.putImageData(img, 0, 0);
}
// Ground detail maps are near-white so the map's own colors (painted per vertex) show through.
export const groundTex = kind => canvasTex('ground-' + kind, 256, (x, S, R) => {
  if (kind === 'sand') {
    paintNoise(x, S, R, .86, .5, [[4, .6], [16, .5], [64, .35]]);
    x.globalAlpha = .07; x.strokeStyle = '#000'; x.lineWidth = 3;
    for (let k = 0; k < 14; k++) { const y0 = k * S / 14 + R() * 6; x.beginPath(); for (let xx = -10; xx <= S + 10; xx += 8) x.lineTo(xx, y0 + Math.sin(xx / S * Math.PI * 4 + k) * 5); x.stroke(); }
    x.globalAlpha = .25; for (let k = 0; k < 900; k++) { x.fillStyle = R() < .5 ? '#fff' : '#6b5a40'; x.fillRect(R() * S, R() * S, 1, 1); }
  } else if (kind === 'paving') {
    paintNoise(x, S, R, .86, .3, [[8, .5], [32, .4]]);
    const n = 6, w = S / n;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const off = (r % 2) * w / 2;
      x.globalAlpha = .06 + R() * .1; x.fillStyle = R() < .5 ? '#000' : '#fff'; x.fillRect(c * w + off + 2, r * w + 2, w - 4, w - 4);
      x.globalAlpha = .35; x.strokeStyle = '#5a5246'; x.lineWidth = 2; x.strokeRect(c * w + off + 1, r * w + 1, w - 2, w - 2); x.strokeRect(c * w + off - S + 1, r * w + 1, w - 2, w - 2);
    }
  } else if (kind === 'snow') {
    paintNoise(x, S, R, .95, .25, [[4, .6], [16, .4], [64, .2]]);
    x.globalAlpha = .5; for (let k = 0; k < 400; k++) { x.fillStyle = '#fff'; x.fillRect(R() * S, R() * S, 1, 1); }
  } else { // grass
    paintNoise(x, S, R, .82, .55, [[4, .7], [16, .5], [64, .3]]);
    x.lineWidth = 1.2;
    for (let k = 0; k < 2600; k++) {
      const px = R() * S, py = R() * S, h = 3 + R() * 6, a = (R() - .5) * .9;
      x.globalAlpha = .18 + R() * .2; x.strokeStyle = R() < .5 ? '#1c2a10' : '#ffffff';
      x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.sin(a) * h, py - Math.cos(a) * h); x.stroke();
    }
  }
  x.globalAlpha = 1;
});
export const stoneTex = () => canvasTex('stone', 256, (x, S, R) => {
  paintNoise(x, S, R, .8, .35, [[8, .5], [32, .5]]);
  const rows = 8, h = S / rows;
  for (let r = 0; r < rows; r++) {
    const off = (r % 2) * .5, n = 4;
    for (let c = -1; c < n; c++) {
      const w = S / n, x0 = (c + off) * w + (R() - .5) * 6;
      x.globalAlpha = .12 + R() * .12; x.fillStyle = R() < .5 ? '#000' : '#fff'; x.fillRect(x0 + 2, r * h + 2, w - 4, h - 4);
      x.globalAlpha = .3; x.strokeStyle = '#3a3733'; x.lineWidth = 2; x.strokeRect(x0 + 1, r * h + 1, w - 2, h - 2);
    }
  }
  x.globalAlpha = 1;
});
export const woodTex = () => canvasTex('wood', 128, (x, S, R) => {
  paintNoise(x, S, R, .8, .3, [[4, .4]]);
  for (let k = 0; k < 90; k++) { const px = R() * S; x.globalAlpha = .08 + R() * .15; x.fillStyle = R() < .6 ? '#000' : '#fff'; x.fillRect(px, 0, 1 + R() * 2, S); }
  x.globalAlpha = 1;
});
export function uvScale(geo, su, sv) { const uv = geo.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv); return geo; }
