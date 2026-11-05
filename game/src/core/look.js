// The captain's wardrobe: what your captain (and so your army) wears. It replaces the old factions:
// instead of picking Romans, Greeks or Barbarians whole, each piece is chosen on its own. Looks only;
// every choice plays the same. Your army wears your helmet, armour, shield, emblem and weapon, so a
// side reads as yours across the field; the cape, the face and the crest are the captain's alone.
// Team colour never changes: it stays on the plume, the shield face and the cape.
import { G } from './state.js';

// The catalog. Each slot lists its items; an item's place in the list is what an outfit stores, so new
// items go on the end (an outfit saved today keeps meaning the same thing). An item can carry `lock`:
// { rank: n } (earned by rank), { feat, n, text } (done n times), { season, tier } (the season's free
// track), { pass, tier } (its Gold track) or { shop }: the wardrobe shows how to get it (ui/season.js).
// `army: true` slots are worn by the whole army; the rest by the captain alone.
export const SLOTS = [
  { id: 'helm', name: 'Helmet', army: true, items: [{ name: 'Galea' }, { name: 'Corinthian' }, { name: 'Wild hair' }, { name: 'Gilded galea', lock: { season: 1, tier: 4 } }, { name: 'Headsman hood', lock: { feat: 'exec', n: 50, text: '50 executions' } },
    // (new pieces go on the end, so saved outfits and owned items keep their numbers)
    { name: 'Nasal helm' }, { name: 'Leather cap' }, { name: 'Wolf pelt', lock: { feat: 'duel', n: 15, text: 'Win 15 duels' } }, { name: 'Warden\'s great helm', lock: { feat: 'castle', n: 20, text: 'Take 20 castles' } }, { name: 'Laurel wreath', lock: { feat: 'crown', n: 5, text: 'Carry the Crown 5 times' } }, { name: 'Plumed galea', lock: { season: 1, tier: 12 } }, { name: 'Winged helm', lock: { pass: true, tier: 10 } }, { name: 'Black visor helm', lock: { shop: true, price: '$1.49' } }] },
  { id: 'armour', name: 'Armour', army: true, items: [{ name: 'Steel bands' }, { name: 'Bronze' }, { name: 'Leather & fur' }, { name: 'Black steel', lock: { shop: true, price: '$1.99' } }] },
  { id: 'shield', name: 'Shield', army: true, items: [{ name: 'Tower' }, { name: 'Hoplon' }, { name: 'Wooden round' }] },
  { id: 'emblem', name: 'Emblem', army: true, items: [{ name: 'Eagle' }, { name: 'Sun' }, { name: 'Thunder' }] },
  { id: 'weapon', name: 'Weapon', army: true, items: [{ name: 'Gladius' }, { name: 'Long blade' }, { name: 'Axe' }] },
  { id: 'cape', name: 'Cape', items: [{ name: 'Long cape' }, { name: 'Short cape' }, { name: 'Fur mantle' }, { name: 'Ermine cape', lock: { pass: true, tier: 6 } }] },
  { id: 'face', name: 'Face', items: [{ name: 'Clean' }, { name: 'Bearded' }, { name: 'Big beard' }] },
];
for (const s of SLOTS) s.opts = s.items.map(i => i.name); // (the plain names, for older code)
export const SLOT_IX = Object.fromEntries(SLOTS.map((s, i) => [s.id, i]));
export const DEFAULT_LOOK = SLOTS.map(() => 0);

const okLook = v => Array.isArray(v) && v.length === SLOTS.length && v.every((x, i) => Number.isInteger(x) && x >= 0 && x < SLOTS[i].opts.length);
// An outfit as text: one base-36 character per slot (room for 36 items a slot). A code saved before a
// slot was added is short: the new slots read as their first item.
export const lookCode = v => (okLook(v) ? v : DEFAULT_LOOK).map(x => x.toString(36)).join('');
export const lookFrom = s => {
  const str = String(s || ''); if (!str || str.length > SLOTS.length) return null;
  const v = SLOTS.map((_, i) => i < str.length ? parseInt(str[i], 36) : 0);
  return okLook(v) ? v : null;
};
// an old faction becomes a matching outfit (Romans 0, Greeks 1, Barbarians 2)
export const lookOfFaction = f => { const b = { roman: 0, greek: 1, barbarian: 2 }[f] ?? 0; return [b, b, b, b % 3, b, b === 2 ? 2 : 0, b === 2 ? 1 : 0]; };

// a computer captain: one style at heart, with a piece or two from elsewhere
export function randomLook(seed) {
  let s = (seed >>> 0) || 1; const r = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  const base = (r() * 3) | 0;
  return SLOTS.map(sl => { const fr = sl.items.map((_, i) => i).filter(i => !sl.items[i].lock); return fr[r() < .65 ? base % fr.length : (r() * fr.length) | 0]; }); // (computer captains never wear the earned pieces)
}
// every army in the battle: the players' own picks, computer captains a random outfit from the seed
export function assignLooks(chosen, seed) { return Array.from({ length: 12 }, (_, ti) => chosen[ti] || randomLook(seed * 31 + ti * 7919 + 1)); }
export const lookOf = ti => (G.looks && G.looks[ti]) || DEFAULT_LOOK;
export const slotOf = (ti, id) => lookOf(ti)[SLOT_IX[id]];
