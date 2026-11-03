// The captain's wardrobe: what your captain (and so your army) wears. It replaces the old factions:
// instead of picking Romans, Greeks or Barbarians whole, each piece is chosen on its own. Looks only;
// every choice plays the same. Your army wears your helmet, armour, shield, emblem and weapon, so a
// side reads as yours across the field; the cape, the face and the crest are the captain's alone.
// Team colour never changes: it stays on the plume, the shield face and the cape.
import { G } from './state.js';

export const SLOTS = [
  { id: 'helm', name: 'Helmet', opts: ['Galea', 'Corinthian', 'Wild hair'] },
  { id: 'armour', name: 'Armour', opts: ['Steel bands', 'Bronze', 'Leather & fur'] },
  { id: 'shield', name: 'Shield', opts: ['Tower', 'Hoplon', 'Wooden round'] },
  { id: 'emblem', name: 'Emblem', opts: ['Eagle', 'Sun', 'Thunder'] },
  { id: 'weapon', name: 'Weapon', opts: ['Gladius', 'Long blade', 'Axe'] },
  { id: 'cape', name: 'Cape', opts: ['Long cape', 'Short cape', 'Fur mantle'] },
  { id: 'face', name: 'Face', opts: ['Clean', 'Bearded', 'Big beard'] },
];
export const SLOT_IX = Object.fromEntries(SLOTS.map((s, i) => [s.id, i]));
export const DEFAULT_LOOK = [0, 0, 0, 0, 0, 0, 0];

const okLook = v => Array.isArray(v) && v.length === SLOTS.length && v.every((x, i) => Number.isInteger(x) && x >= 0 && x < SLOTS[i].opts.length);
export const lookCode = v => (okLook(v) ? v : DEFAULT_LOOK).join('');
export const lookFrom = s => { const v = String(s || '').split('').map(Number); return okLook(v) ? v : null; };
// an old faction becomes a matching outfit (Romans 0, Greeks 1, Barbarians 2)
export const lookOfFaction = f => { const b = { roman: 0, greek: 1, barbarian: 2 }[f] ?? 0; return [b, b, b, b % 3, b, b === 2 ? 2 : 0, b === 2 ? 1 : 0]; };

// a computer captain: one style at heart, with a piece or two from elsewhere
export function randomLook(seed) {
  let s = (seed >>> 0) || 1; const r = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  const base = (r() * 3) | 0;
  return SLOTS.map(sl => r() < .65 ? base % sl.opts.length : (r() * sl.opts.length) | 0);
}
// every army in the battle: the players' own picks, computer captains a random outfit from the seed
export function assignLooks(chosen, seed) { return Array.from({ length: 12 }, (_, ti) => chosen[ti] || randomLook(seed * 31 + ti * 7919 + 1)); }
export const lookOf = ti => (G.looks && G.looks[ti]) || DEFAULT_LOOK;
export const slotOf = (ti, id) => lookOf(ti)[SLOT_IX[id]];
