// The whole game state lives in one plain object. Rules read and write it;
// the renderer and UI only read it. Nothing here depends on three.js or the DOM.
import { MAPS } from '../config.js';

export const G = {
  role: 'solo',          // 'solo' | 'host' | 'client'
  state: 'title',        // 'title' | 'lobby' | 'play' | 'end'
  mode: 'conquest',
  map: MAPS.forum,
  diff: 1,
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
};

export const isEnemyTi = (a, b) => G.ALLY[a] !== G.ALLY[b];
export const isEnemy = (a, b) => G.ALLY[a.ti] !== G.ALLY[b.ti];
export const isFfa = () => new Set(G.ALLY).size === 4;

// Small event bus: rules announce what happened, presentation decides how it looks and sounds.
const handlers = {};
export const bus = {
  on(type, fn) { (handlers[type] || (handlers[type] = [])).push(fn); },
  emit(type, data) { const hs = handlers[type]; if (hs) for (const f of hs) f(data); },
};
