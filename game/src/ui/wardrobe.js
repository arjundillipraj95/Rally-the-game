// The wardrobe screen: a rail of categories on top, a grid of item cards below. Built entirely from the
// catalog (core/look.js SLOTS, and the rank crests), so new items, new slots, shop or season items need
// no new screen: add them to the catalog and they appear, locked items showing how to get them.
import { SLOTS } from '../core/look.js';
import { CRESTS } from '../config.js';
import { owns, lockText as seasonLock } from './season.js';

// a small drawing per category (and per emblem item, which shows its own shape)
const IC = {
  helm: '<path d="M5 15c0-5 3-9 7-9s7 4 7 9v3h-4v-3h-6v3H5z"/><path d="M12 6V3"/>',
  armour: '<path d="M7 4l5 2 5-2 3 4-2 3v9H6v-9L4 8z"/><path d="M9 12h6M9 15h6"/>',
  shield: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/>',
  emblem: '<path d="M12 4l2.4 5 5.6.6-4.2 3.8 1.2 5.6L12 16.2 7 19l1.2-5.6L4 9.6 9.6 9z"/>',
  weapon: '<path d="M14 4l6 0 0 6-9 9-3-3z"/><path d="M8 16l-4 4M6 12l6 6"/>',
  cape: '<path d="M8 4h8l3 16-7-3-7 3z"/>',
  face: '<circle cx="12" cy="12" r="8"/><path d="M9 10h.01M15 10h.01M9 15c2 1.5 4 1.5 6 0"/>',
  crest: '<path d="M12 21v-9"/><path d="M8 12c0-5 2-8 4-9 2 1 4 4 4 9z"/>',
};
const EMB = [ // (emblems past these show the plain star)
  '<path d="M12 7l1.5 2 6-1-1 2.5 2 1-4 1-2.5 0-.5 4-1.5-2-1.5 2-.5-4-2.5 0-4-1 2-1L4.5 8l6 1z"/>',
  '<circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
  '<path d="M13 3L7 13h4l-2 8 7-11h-4z"/>',
];
const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const LOCK = svg('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>');

// opts: { look, crest, crestOpen(i), crestNeed(i), rankName(i), onPick(slot, v), onCrest(i) }
export function wardrobe(el, opts) {
  let cat = SLOTS[0].id;
  const cats = [...SLOTS.filter(s => !s.hidden).map(s => ({ id: s.id, name: s.name, army: s.army })), { id: 'crest', name: 'Crest' }];
  function lockText(lock) {
    if (!lock) return '';
    if (lock.rank != null) return `${opts.rankName(lock.rank)} rank`;
    return seasonLock(lock) || 'Locked';
  }
  function items() {
    if (cat === 'crest') return CRESTS.map((c, i) => ({ name: c.name, on: opts.crest() === i, locked: !opts.crestOpen(i), need: opts.crestNeed(i), swatch: c.css, i }));
    const si = SLOTS.findIndex(s => s.id === cat), sl = SLOTS[si], cur = opts.look()[si];
    return sl.items.map((it, j) => ({ it, name: it.name, on: cur === j, locked: !owns(si, j), need: lockText(it.lock), icon: cat === 'emblem' ? EMB[j] || IC.emblem : IC[cat], i: j, si })).filter(x => !x.it.gone);
  }
  function render() {
    const c = cats.find(x => x.id === cat), sl = SLOTS.find(s => s.id === cat);
    el.querySelector('.wcats').innerHTML = cats.map(x => `<button type="button" role="tab" data-c="${x.id}" aria-selected="${x.id === cat}">${svg(IC[x.id])}<span>${x.name}</span></button>`).join('');
    el.querySelector('.wsub').textContent = cat === 'crest' ? 'Your captain’s plume and trim. New colours come with rank.'
      : sl && sl.army ? `${c.name}: worn by your whole army` : `${c.name}: your captain’s alone`;
    el.querySelector('.witems').innerHTML = items().map(it => `<button type="button" class="witem${it.locked ? ' locked' : ''}" data-i="${it.i}" aria-pressed="${it.on}" ${it.locked ? 'aria-disabled="true"' : ''}>
      <i class="wic"${it.swatch ? ` style="background:${it.swatch}"` : ''}>${it.swatch ? '' : svg(it.icon)}</i><b>${it.name}</b><small>${it.locked ? LOCK + it.need : it.on ? 'Wearing' : ''}</small></button>`).join('');
  }
  el.querySelector('.wcats').addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; cat = b.dataset.c; render(); });
  el.querySelector('.witems').addEventListener('click', e => {
    const b = e.target.closest('.witem'); if (!b || b.getAttribute('aria-disabled') === 'true') return;
    const i = +b.dataset.i;
    if (cat === 'crest') opts.onCrest(i); else opts.onPick(SLOTS.findIndex(s => s.id === cat), i);
    render();
  });
  return { render, show(c) { if (c && cats.some(x => x.id === c)) cat = c; render(); } };
}
