// The whole game state lives in one plain object. Rules read and write it;
// the renderer and UI only read it. Nothing here depends on three.js or the DOM.
import { MAPS, TIMES, PACE, TARGETS } from '../config.js';

export const G = {
  role: 'solo',          // 'solo' | 'host' | 'client'
  state: 'title',        // 'title' | 'lobby' | 'play' | 'end'
  mode: 'conquest',
  map: MAPS.forum,
  diff: 1,
  time: 10,              // match length in minutes: 5 | 10 | 15 (see TIMES)
  target: null,          // this mode's target (see TARGETS); null: the mode's default
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
  duo: [0, 0, 0, 0], // per castle color: how many extra captains share it (0 solo, 1 Duo, 2 Trio)
};

// Armies 0-3 are the four castles' own army; 4-7 each castle's second captain (Duo), 8-11 its
// third (Trio), real only while G.duo[color] reaches that slot. colorOf maps any of them back to
// its castle/color/alliance. All of a castle's captains muster at its one gate, side by side.
export const ARMIES = 12;
export const colorOf = ti => ti % 4;
export const slotOf = ti => ti >> 2;
export const armyOf = (color, slot) => color + 4 * slot;
export const activeArmies = () => { const out = [0, 1, 2, 3]; for (let s = 1; s <= 2; s++) for (let c = 0; c < 4; c++) if ((G.duo[c] | 0) >= s) out.push(c + 4 * s); return out; };
// which armies a match fields, from each color's extra-captain count
export const activeFrom = duo => Array.from({ length: ARMIES }, (_, i) => i < 4 || (duo[i % 4] | 0) >= (i >> 2) ? 1 : 0);
// how far along the gate a castle's captains stand: the first in the middle, the others either side
export const gateOff = ti => [0, 9, -9][ti >> 2];
export const SLOT_NAME = ['', 'Co-captain', 'Third captain'];

// the numbers for this match's length: time limit, tickets, captures, control target...
// the numbers for this battle (pace from its length, and the target chosen for its mode), worked out
// once per setting (it's read every frame)
let rulesKey = '', rulesNow = null;
export const rules = () => {
  const k = G.time + '|' + G.mode + '|' + G.target; if (k === rulesKey) return rulesNow;
  const t = TIMES.find(x => x[0] === G.time) || TIMES[1], P = PACE[t[0]];
  const r = { name: t[1], gather: P.gather, gold: P.gold }; for (const T of Object.values(TARGETS)) r[T.key] = T.def;
  const T = TARGETS[G.mode]; if (T && T.opts.some(o => o[0] === G.target)) r[T.key] = G.target;
  rulesKey = k; return (rulesNow = r);
};
export const matchTime = () => (TIMES.some(x => x[0] === G.time) ? G.time : 10) * 60;
export const targetFor = mode => { const T = TARGETS[mode]; return T ? T.def : null; };
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
