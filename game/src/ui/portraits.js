// MENU1 Champion pictures: public/portraits/<id>.webp (grid tile, 256x200), <id>_face.webp (minimap, 128 square) and
// public/splash/<id>.webp (story art, 16:9: the versus screen behind your army). Baked from each 3D model by
// store/bake_portraits.mjs, or an artist's picture under the same name. A missing file falls back to a silhouette.
import './champs.css';
const BASE = import.meta.env.BASE_URL || './';
export const portraitSrc = id => `${BASE}portraits/${id}.webp`;
export const faceSrc = id => `${BASE}portraits/${id}_face.webp`;
export const splashSrc = id => `${BASE}splash/${id}.webp`;
// an <img> for markup; on a missing file the img hides and its parent's silhouette (CSS) shows
export const portraitImg = (id, cls = '') => `<img class="pimg ${cls}" src="${portraitSrc(id)}" alt="" loading="lazy" draggable="false">`;
addEventListener('error', e => { const t = e.target; if (t && t.classList && t.classList.contains('pimg')) t.hidden = true; }, true);
// faces for canvas drawing (the minimap): loaded once each; null until loaded (or when missing)
const faces = new Map();
export function faceImage(id) {
  let f = faces.get(id);
  if (!f) { f = { img: new Image(), ok: false }; f.img.onload = () => { f.ok = true; }; f.img.src = faceSrc(id); faces.set(id, f); }
  return f.ok ? f.img : null;
}
// whether a splash exists is only known by asking; the versus screen shows it once loaded
export function withSplash(id, cb) { const i = new Image(); i.onload = () => cb(i.src); i.src = splashSrc(id); }
