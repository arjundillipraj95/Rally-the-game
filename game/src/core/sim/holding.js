// Battle rules: CASTLE6 what holding a castle gives on the mountain (besides gold, army size, vision and a respawn point):
// points at the end (middle castle more than outer), healing for its side's men in its yard (none while an enemy is in
// it), and its Crown shard: the first side to take a castle keeps that shard all match. A shard tops up each of the
// side's armies' horn (the army ult, until the champions' army ults come); breaking a nexus takes shards from its side.
import { CASTLE26 } from '../../config.js';
import { G } from '../state.js';
import { say, fx } from './util.js';
import { allianceOf, sideArmies } from './holds.js';

const H = () => CASTLE26.hold;
export const castlePts = h => (h.mid ? H().pts.mid : H().pts.outer);
export function holdingTick(dt) {
  if (!G.layout || !G.layout.cwalls) return;
  const client = G.role === 'client'; // (HEAL1: a joined phone only shows the "+20"s; the host heals)
  for (const cw of G.layout.cwalls) {
    const h = G.holds[cw.hid]; if (!h || h.owner < 0) continue;
    h.healT = (h.healT || 0) + dt; if (h.healT < H().healEvery) continue; h.healT = 0;
    const inYard = u => !u.dead && !u.neutral && Math.hypot(u.x - cw.x, u.z - cw.z) < cw.r;
    if (G.units.some(u => inYard(u) && allianceOf(u.ti) >= 0 && allianceOf(u.ti) !== h.owner)) continue;
    for (const u of G.units) {
      if (!inYard(u) || allianceOf(u.ti) !== h.owner || u.hp >= u.max - .5) continue;
      const n = u.leader ? H().healChamp : H().healMan;
      if (u.leader) fx('float', { x: u.x, y: u.y + 3.6, z: u.z, text: `+${n}`, color: '#6ee86a' });
      if (!client) u.hp = Math.min(u.max, u.hp + n);
    }
  }
}
const gain = (a, n) => { const K = G.c2; K.shards = K.shards || {}; K.shards[a] = (K.shards[a] || 0) + n;
  for (const i of sideArmies(a)) { const s = G.teams[i]; s.rally = Math.min(100, (s.rally || 0) + H().shardRally * n); } };
// (c2Take) the first side to take castle h keeps its shard
export function shardOnTake(h, a) { if (h.shardBy != null || a < 0) return; h.shardBy = a; gain(a, 1); say('shardTaken', a, h.id); }
// (nexusBroken) the breakers take up to H().nexusShards of the fallen side's shards
export function shardsOnNexus(own, a) {
  const K = G.c2; K.shards = K.shards || {}; const n = Math.min(H().nexusShards, K.shards[own] || 0); if (!n) return 0;
  K.shards[own] -= n; gain(a, n); return n;
}
