// Battle rules: AI3 (Arjun 26 Nov) computer champions on the mountain take a lane and a job.
// Lanes, as seen from the side's base looking at the summit: left, right, jungle. Each side's computers take the lanes
// its players didn't pick (lobby), by class first (Raider jungle, Striker left, Vanguard right), then what's left.
// Left: own middle castle, own left castle, the neighbour's facing castle, their middle, then their nexus.
// Right: own middle castle, own right castle, the neighbour's facing castle, their middle; holds and defends them.
// Jungle: helps a lane taking a castle or fills in for a fallen one, clears own camps (buffs first), steals safe ones.
// At the Sceptre (from its warning) and the Crown each side with computers picks a plan from the score and its
// strength: all in, split (the jungler takes what's left empty), hold (keep castles, jungler steals late) or third
// party (wait near, go in once others are hurt). A computer calls it out to its side (a shout with a ping).
// Called from holds.js holdPlan: a plan, or undefined to fall back to the older rules.
import { CROWN2, CASTLE26 } from '../../config.js';
import { G, colorOf, activeArmies, NEUTRAL_TI } from '../state.js';
import { mountHomeA } from '../world/mount.js';
import { champOf } from '../../champions/index.js';
import { castleThreat, castleReady } from './ai26.js';
import { nexusOpen } from './nexus.js';
import { squadOf } from './match.js';
import { say } from './util.js';
import { c2Points } from './step.js'; // (later files: through the entry)

const LN = () => CASTLE26.lanes;
const CLASS_LANE = { raider: 'jungle', striker: 'left', vanguard: 'right' };
let picks = {}; // army index -> 'left' | 'right' | 'jungle', the players' lobby picks for the next battle (app/friends.js)
export function setLanePicks(byTi) { picks = byTi || {}; }

const dist = (u, p) => Math.hypot(p.x - u.x, p.z - u.z);
const armies = c => activeArmies().filter(i => colorOf(i) === c && G.teams[i] && G.teams[i].leader);
// this battle's lanes, settled once: the players' picks, then the computers'
function lanes() {
  if (G.lanes && G.lanes.key === G.c2) return G.lanes; // (settled once a battle)
  const of = {};
  for (let c = 0; c < 4; c++) {
    const all = armies(c); if (all.length < 2) continue; // (a lone army plays the older rules)
    const humans = all.filter(i => G.teams[i].leader.human), bots = all.filter(i => !G.teams[i].leader.human);
    for (const i of humans) if (picks[i]) of[i] = picks[i];
    const free = ['left', 'right', 'jungle'].filter(l => !humans.some(i => of[i] === l));
    const order = bots.map(i => ({ i, want: CLASS_LANE[(champOf(i) || {}).cls] || 'right' }));
    for (const b of order) { const k = free.indexOf(b.want); if (k >= 0) { of[b.i] = b.want; free.splice(k, 1); b.done = true; } }
    for (const b of order) if (!b.done) of[b.i] = free.length ? free.shift() : b.want;
  }
  picks = {};
  return (G.lanes = { key: G.c2, of, strat: {} });
}
export const laneOf = ti => (G.c2 && G.layout.map26 ? lanes().of[ti] : undefined);

// ---------- the map, by lane ----------
function castles(c) {
  const a = mountHomeA(c), rx = Math.sin(a), rz = -Math.cos(a); // (facing the summit from his base, his right hand: forward x up)
  const mine = G.holds.filter(h => h.kind === 'castle' && h.side === c), mid = mine.find(h => h.mid); if (!mid) return {};
  const side = h => ((h.x - mid.x) * rx + (h.z - mid.z) * rz) > 0 ? 'right' : 'left';
  return { mid, left: mine.find(h => !h.mid && side(h) === 'left'), right: mine.find(h => !h.mid && side(h) === 'right') };
}
function chain(c, lane) {
  const my = castles(c), own = my[lane]; if (!my.mid || !own) return null;
  const nb = G.holds.filter(h => h.kind === 'castle' && h.side !== c).sort((p, q) => dist(own, p) - dist(own, q))[0];
  const theirs = nb ? castles(nb.side) : {};
  return { list: [my.mid, own, nb, theirs.mid].filter(Boolean), foe: nb ? nb.side : -1 };
}
const hold = h => ({ kind: 'hold', id: h.id });
const spot = (p, stop = 1.5, extra) => Object.assign({ kind: 'spot', x: p.x, z: p.z, stop }, extra);

// ---------- the lanes' jobs ----------
function lanePush(u, lane) {
  const a = G.ALLY[colorOf(u.ti)], ch = chain(colorOf(u.ti), lane); if (!ch) return undefined;
  const owned = ch.list.filter(h => h.owner === a);
  const danger = owned.filter(h => castleThreat(h) && (lane === 'right' || dist(u, h) < LN().defendR)).sort((p, q) => dist(u, p) - dist(u, q))[0];
  if (danger) return hold(danger);
  const next = ch.list.find(h => h.owner !== a);
  if (next) return castleReady(u, next) ? hold(next) : owned.length ? hold(owned[owned.length - 1]) : undefined; // (a fortified castle and too few men: wait at the last one)
  if (lane === 'left') { const nx = G.c2.breaks.find(b => b.kind === 'nexus' && b.c === ch.foe && b.hp > 0); if (nx && nexusOpen(nx, u)) return spot(nx, nx.r + 1, { nexus: nx.c }); }
  return hold(owned[owned.length - 1]);
}
function camps(u, c, steal) {
  const up = G.c2.breaks.filter(b => b.kind === 'camp' && b.n > 0 && G.layout.camps[b.id] && (steal ? G.layout.camps[b.id].side !== c : G.layout.camps[b.id].side === c));
  const safe = b => !G.units.some(o => o.leader && !o.dead && G.ALLY[colorOf(o.ti)] !== G.ALLY[c] && o.ti < NEUTRAL_TI && dist(o, b) < LN().stealSafeR);
  return up.filter(b => !steal || (safe(b) && dist(u, b) < LN().stealR)).sort((p, q) => (dist(u, p) - (p.buff ? 1000 : 0)) - (dist(u, q) - (q.buff ? 1000 : 0)))[0];
}
function jungle(u) {
  const c = colorOf(u.ti), a = G.ALLY[c], of = lanes().of;
  for (const i of armies(c)) { // a lane mate: fill in for him while he's down, or help him take his castle
    const l = of[i]; if (i === u.ti || (l !== 'left' && l !== 'right')) continue;
    const ch = chain(c, l); if (!ch) continue; const m = G.teams[i].leader;
    const lost = m.dead && ch.list.find(h => h.owner === a && castleThreat(h)); if (lost && dist(u, lost) < LN().helpR) return hold(lost);
    const tg = ch.list.find(h => h.owner !== a);
    if (!m.dead && tg && dist(m, tg) < LN().pushingR && dist(u, tg) < LN().helpR && castleReady(u, tg)) return hold(tg);
  }
  if (G.c2.phase === 'night') return undefined;
  const own = camps(u, c, false); if (own) return spot(own, 2, { camp: own.id });
  const steal = camps(u, c, true); if (steal) return spot(steal, 2, { camp: steal.id });
  let best = null; // nothing in the jungle: the lane mate's next castle nearest him
  for (const i of armies(c)) { const l = of[i]; if (i === u.ti || G.teams[i].leader.dead || (l !== 'left' && l !== 'right')) continue;
    const tg = (chain(c, l) || { list: [] }).list.find(h => h.owner !== a); if (tg && castleReady(u, tg) && (!best || dist(u, tg) < dist(u, best))) best = tg; }
  return best ? hold(best) : undefined;
}

// ---------- the Sceptre and the Crown: a side's plan ----------
function phase() {
  const K = G.c2, T = G.T;
  if (K.phase === 'night' && K.breaks.some(b => b.kind === 'glacier' && b.hp > 0)) return 'crown';
  if (K.chest === 1 || (K.chest === 0 && T >= CROWN2.chest - CROWN2.chestWarn)) return 'sceptre';
  return null;
}
function prize(ph) {
  if (ph === 'crown') return G.c2.breaks.find(b => b.kind === 'glacier') || { x: 0, z: 0, hp: 1, max: 1 };
  return G.c2.breaks.find(b => b.kind === 'chest' && b.hp > 0) || { x: G.layout.arena.r * .5, z: 0, hp: 1, max: 1, notYet: true };
}
const points = c => c2Points(G.ALLY[c]) || 0;
function strength(c) { let n = 0; for (const i of armies(c)) { const L = G.teams[i].leader; if (!L.dead) n += (G.teams[i].lvl || 1) + squadOf(i).length * LN().manW; } return n; }
function choose(c, ph) {
  const S = LN().strat, score = [0, 1, 2, 3].map(x => points(x));
  const diff = score[c] - Math.max(...score.filter((_, x) => x !== c && G.ALLY[x] !== G.ALLY[c]));
  const st = [0, 1, 2, 3].map(strength), rel = st[c] / Math.max(1e-6, st.reduce((s, v) => s + v, 0) / 4);
  const kind = ph === 'crown' && diff < 0 ? (rel >= S.strong ? 'allin' : 'split') : diff >= S.lead ? 'hold'
    : diff >= -S.close ? (rel >= S.bold ? 'allin' : 'third') : rel >= 1 ? 'allin' : 'split';
  return { kind, diff, rel: +rel.toFixed(2) };
}
const CALL = { allin: 4, third: 4, split: 4, hold: 1 }; // (SHOUTS: 'Attack here!' at the prize, 'Defend!')
function stratOf(c, ph) {
  const L = lanes(), cur = L.strat[c];
  if (cur && cur.ph === ph) return cur;
  const s = (L.strat[c] = Object.assign({ ph, t: G.T }, choose(c, ph))), kind = s.kind;
  const bots = armies(c).filter(i => !G.teams[i].leader.human);
  if (bots.length && armies(c).some(i => G.teams[i].leader.human)) { const p = prize(ph); say('callout', bots[0], CALL[kind], Math.round(p.x * 10) / 10, Math.round(p.z * 10) / 10); }
  return s;
}
function lurk(u, p) { const d = Math.hypot(u.x - p.x, u.z - p.z) || 1, r = LN().lurkR; return spot({ x: p.x + (u.x - p.x) / d * r, z: p.z + (u.z - p.z) / d * r }, 3); }
function hurtNear(c, p) { // other sides' champions at the prize, and how hurt
  const at = G.units.filter(o => o.leader && !o.dead && o.ti < NEUTRAL_TI && G.ALLY[colorOf(o.ti)] !== G.ALLY[c] && dist(o, p) < LN().prizeR);
  const sides = new Set(at.map(o => colorOf(o.ti)));
  return { sides: sides.size, hurt: at.length ? at.reduce((s, o) => s + o.hp / o.max, 0) / at.length : 1 };
}
function backdoor(u) {
  const a = G.ALLY[colorOf(u.ti)];
  const nx = G.c2.breaks.filter(b => b.kind === 'nexus' && b.hp > 0 && nexusOpen(b, u)).sort((p, q) => dist(u, p) - dist(u, q))[0];
  if (nx) return spot(nx, nx.r + 1, { nexus: nx.c });
  const empty = h => !G.units.some(o => o.leader && !o.dead && o.ti < NEUTRAL_TI && G.ALLY[colorOf(o.ti)] === h.owner && dist(o, h) < LN().emptyR);
  const h = G.holds.filter(h => h.kind === 'castle' && h.owner >= 0 && h.owner !== a && empty(h) && castleReady(u, h)).sort((p, q) => dist(u, p) - dist(u, q))[0];
  return h ? hold(h) : undefined;
}
function stratPlan(u, lane, ph) {
  const c = colorOf(u.ti), s = stratOf(c, ph), p = prize(ph), go = spot(p, 1);
  const low = !p.notYet && p.hp / (p.max || 1) < LN().stealAt;
  if (s.kind === 'allin') return p.notYet ? lurk(u, p) : go;
  if (s.kind === 'split') return lane === 'jungle' ? backdoor(u) ?? (p.notYet ? lurk(u, p) : go) : p.notYet ? lurk(u, p) : go;
  if (s.kind === 'hold') return lane === 'jungle' ? (low ? go : lurk(u, p)) : lanePush(u, lane === 'left' || lane === 'right' ? lane : 'right');
  const h = hurtNear(c, p); // third party
  return !p.notYet && (low || (h.sides >= 2 && h.hurt < LN().hurtAt) || G.T - s.t > LN().waitT) ? go : lurk(u, p);
}

// holds.js holdPlan: this captain's plan from his lane, or undefined (the older rules)
export function lanePlan(u) {
  if (!G.c2 || !G.layout.map26 || u.human) return undefined;
  const lane = laneOf(u.ti); if (!lane) return undefined;
  const ph = phase(); if (ph) { const p = stratPlan(u, lane, ph); if (p !== undefined) return p; }
  return lane === 'jungle' ? jungle(u) : lanePush(u, lane);
}
export { castles as laneCastles, chain as laneChain }; // (tests)
