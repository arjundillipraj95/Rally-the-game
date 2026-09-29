// The whole game state lives in one plain object. Rules read and write it;
// the renderer and UI only read it. Nothing here depends on three.js or the DOM.
import { MAPS, LENGTHS } from '../config.js';

export const G = {
  role: 'solo',          // 'solo' | 'host' | 'client'
  state: 'title',        // 'title' | 'lobby' | 'play' | 'end'
  mode: 'conquest',
  map: MAPS.forum,
  diff: 1,
  len: 'quick',          // match length: 'quick' | 'standard' (see LENGTHS)
  preset: 'ffa',
  ALLY: [0, 1, 2, 3],
  myTi: 0,
  factions: ['roman', 'roman', 'roman', 'roman'],
  seed: 1,
  T: 0,
  units: [],
  horses: [],
  arrows: [],
  teams: [],
  flag: null,
  bounty: -1,
  player: null,
  layout: null,
  kills: 0,
  recruited: 0,
  uid: 0,
  arrowN: 0,
  horseN: 0,
  endInfo: null,
  squadCap: 20,
  duo: [false, false, false, false], // per castle color: does it field a second, independent army?
};

// Armies 0-3 are the four castles' own army; 4-7 are each castle's Duo teammate army
// (only real when G.duo[color] is true). colorOf maps either back to its castle/color/alliance.
export const colorOf = ti => ti % 4;
export const slotOf = ti => ti < 4 ? 0 : 1;
export const armyOf = (color, slot) => slot ? color + 4 : color;
export const activeArmies = () => { const out = [0, 1, 2, 3]; for (let c = 0; c < 4; c++) if (G.duo[c]) out.push(c + 4); return out; };

// the numbers for this match's length: time limit, tickets, captures, control target...
export const rules = () => LENGTHS[G.len] || LENGTHS.quick;
export const matchTime = () => rules().time[G.mode] || 600;
export const modeDesc = m => (m.desc || '').replace('{tickets}', rules().tickets).replace('{caps}', rules().caps).replace('{win}', rules().win);
export const isEnemyTi = (a, b) => G.ALLY[colorOf(a)] !== G.ALLY[colorOf(b)];
export const isEnemy = (a, b) => G.ALLY[colorOf(a.ti)] !== G.ALLY[colorOf(b.ti)];
export const isFfa = () => new Set(G.ALLY).size === 4;

// Small event bus: rules announce what happened, presentation decides how it looks and sounds.
const handlers = {};
export const bus = {
  on(type, fn) { (handlers[type] || (handlers[type] = [])).push(fn); },
  emit(type, data) { const hs = handlers[type]; if (hs) for (const f of hs) f(data); },
};
