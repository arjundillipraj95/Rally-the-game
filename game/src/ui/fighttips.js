// One-line tips that teach the captain's fighting moves the first couple of times they matter:
// a heavy blow coming at you, your guard broken, a new weapon in hand. Shown over your captain.
import { G, bus, isEnemyTi } from '../core/state.js';
import { floatText } from '../render/effects.js';

const TIPS = {
  parry: 'Tap Block as his blade glints!',
  break: "Holding Block won't stop a heavy blow. Tap it as the blade glints!",
  sword: 'Press as the ring closes on you: three on the beat is a rhythm finisher',
  spear: 'Three thrusts in a row: the third lunges through the whole line',
  shield: 'Shield knocked aside: strike now! (Block then Attack bashes it open too)',
  evade: 'Jump + stick to evade: at him, to the side, or back',
  counter: 'Attack right after an evade to strike back',
  jav: 'Hold Attack to draw back: a full draw knocks riders off their horses',
  guard: "He's on guard: tap Block then Attack to bash it aside",
  ride: 'Hold Attack as you ride at someone. Let go when the ring turns gold',
  rider: 'A rider is coming! Tap Block as his weapon glints, or plant a spear',
  horn: 'Your rally horn is full! Press and hold the Order button to sound it',
  attack: 'Drag the Order button onto enemies to send your men at them',
  vcharge: 'Volley landed! Order Charge now: they hit harder',
  push: 'Shieldwall: press Attack to heave the whole wall forward',
  armour: 'Your armour is gone. Buy it again from Upgrades',
  duelDir: 'Duel: the red arrow shows where his blow comes from. Hold Block and push the stick toward it',
  tired: 'Winded! Ease off a moment and your stamina comes back',
};
let lastAt = 0; const shown = new Set(); // (each tip at most once a match; the parry ones jump the queue)
const URGENT = new Set(['parry', 'break', 'guard', 'rider', 'horn', 'vcharge', 'duelDir', 'tired']);
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
  const p = G.player; if (!p || p.dead || G.state !== 'play') return;
  const T = G.teams[G.myTi]; if (T && T.rally >= 100) fightTip('horn');
  if (T && T.order === 'hold') fightTip('attack');
  if (p.mounted) { if ((p.weapon || 'sword') !== 'jav') fightTip('ride'); return; }
  if (G.units.some(o => !o.dead && o.leader && o !== p && Math.hypot(o.x - p.x, o.z - p.z) < 6 && isEnemyTi(o.ti, p.ti))) fightTip('evade');
  if ((p.weapon || 'sword') !== 'sword') return;
  if (G.units.some(o => !o.dead && o.ti !== p.ti && Math.hypot(o.x - p.x, o.z - p.z) < 5 && isEnemyTi(o.ti, p.ti))) fightTip('sword');
}, 1500);
