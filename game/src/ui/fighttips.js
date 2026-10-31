// One-line tips that teach the captain's fighting moves the first couple of times they matter:
// a heavy blow coming at you, your guard broken, a new weapon in hand. Shown over your captain.
import { G, bus } from '../core/state.js';
import { floatText } from '../render/effects.js';

const TIPS = {
  parry: 'Tap Block as his blade glints!',
  break: "Holding Block won't stop a heavy blow. Tap it as the blade glints!",
  sword: 'Hold Attack for a heavy blow that smashes guards',
  spear: 'Hold Attack to plant the spear: riders who charge you are thrown',
  jav: 'Hold Attack to draw back: a full draw knocks riders off their horses',
  guard: "He's on guard: hold Attack for a heavy blow to smash it",
};
let lastAt = 0; const shown = new Set(); // (each tip at most once a match; the parry ones jump the queue)
const URGENT = new Set(['parry', 'break', 'guard']);
bus.on('msg', m => { if (m && m.k === 'start') shown.clear(); });
export function fightTip(k) {
  const p = G.player, text = TIPS[k]; if (!p || p.dead || !text || G.state !== 'play' || shown.has(k)) return;
  if (!URGENT.has(k) && performance.now() - lastAt < 5000) return;
  shown.add(k);
  let n = 0; try { n = +localStorage.getItem('rally-tip-' + k) || 0; } catch (_) { n = 9; }
  if (n >= 2) return;
  try { localStorage.setItem('rally-tip-' + k, n + 1); } catch (_) {}
  lastAt = performance.now();
  floatText(p.x, p.y + 3.6, p.z, text, '#ffcf3a');
}
bus.on('fighttip', fightTip);

// the sword's held blow: mentioned the first couple of times you're in a fight with a sword in hand
setInterval(() => {
  const p = G.player; if (!p || p.dead || p.mounted || G.state !== 'play' || (p.weapon || 'sword') !== 'sword') return;
  if (G.units.some(o => !o.dead && o.ti !== p.ti && Math.hypot(o.x - p.x, o.z - p.z) < 5 && G.ALLY[o.ti % 4] !== G.ALLY[p.ti % 4])) fightTip('sword');
}, 1500);
