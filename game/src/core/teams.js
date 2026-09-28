// Team setups and faction choices. Pure data, no engine code.
import { FACTION_IDS, TEAMS } from '../config.js';
import { mulberry } from './world.js';

// Castles sit on a square: Blue-Yellow and Red-Green are neighbours, Blue-Red and Green-Yellow are opposite.
const PARTNER = [3, 2, 1, 0], OPPOSITE = [1, 0, 3, 2];

// Team setup seen from the player's color: in 2v2 and 2v1v1 you side with your neighbour,
// in 3v1 you and both neighbours face the castle opposite you. With Blue this matches the classic presets.
export function allyFor(preset, me) {
  const al = [0, 1, 2, 3];
  if (preset === '2v2') { const p = PARTNER[me]; for (let i = 0; i < 4; i++) al[i] = (i === me || i === p) ? 0 : 1; }
  else if (preset === '2v1v1') { const p = PARTNER[me]; let n = 1; for (let i = 0; i < 4; i++) al[i] = (i === me || i === p) ? 0 : n++; }
  else if (preset === '3v1') { const o = OPPOSITE[me]; for (let i = 0; i < 4; i++) al[i] = i === o ? 1 : 0; }
  return al;
}

// "You (Red) and Green against Blue and Yellow."
export function describeTeams(al, me) {
  const name = i => i === me ? `you (${TEAMS[i].name})` : TEAMS[i].name;
  const groups = [...new Set(al)].map(a => TEAMS.map((_, i) => i).filter(i => al[i] === a));
  if (groups.length === 4) return `Every team for itself. You are ${TEAMS[me].name}.`;
  const list = xs => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1];
  const join = g => list(g.map(name));
  const mine = groups.find(g => g.includes(me)), rest = groups.filter(g => g !== mine);
  const txt = `${join(mine)} against ${list(rest.map(join))}`;
  return txt[0].toUpperCase() + txt.slice(1) + (rest.length > 1 ? ', each on their own.' : '.');
}

// Fills in factions for computer teams, spreading them so every faction shows up.
export function assignFactions(chosen, seed) {
  const R = mulberry((seed | 0) + 101), out = chosen.slice();
  const used = new Set(chosen.filter(Boolean));
  let pool = FACTION_IDS.filter(f => !used.has(f));
  for (let i = 0; i < 4; i++) {
    if (out[i]) continue;
    if (!pool.length) pool = FACTION_IDS.slice();
    out[i] = pool.splice(Math.floor(R() * pool.length), 1)[0];
  }
  return out;
}
