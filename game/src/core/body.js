// (SIZE1) the body sizes this phone draws: BODY_SIZE, or a pair being tried on the preview: ?bodyc=1.45&bodys=1.3 is
// kept on the phone until changed; ?bodyc= with nothing after it puts the defaults back.
import { BODY_SIZE } from '../config.js';

const KEY = 'rally.body';
function read() {
  const b = { ...BODY_SIZE };
  try {
    const q = new URLSearchParams(location.search);
    if (q.has('bodyc') || q.has('bodys')) {
      const c = +q.get('bodyc'), s = +q.get('bodys');
      if (c > 0 || s > 0) localStorage.setItem(KEY, JSON.stringify({ champ: c > 0 ? c : b.champ, soldier: s > 0 ? s : b.soldier })); else localStorage.removeItem(KEY);
    }
    const kept = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (kept) { if (kept.champ > .5 && kept.champ < 2) b.champ = kept.champ; if (kept.soldier > .5 && kept.soldier < 2) b.soldier = kept.soldier; }
  } catch (e) { /* (no storage: the defaults) */ }
  return b;
}
export const body = read();
// how much taller than its first size a unit stands: champions by theirs, everyone else by the soldiers'
export const bodyOf = u => (u && u.leader ? body.champ : body.soldier);
