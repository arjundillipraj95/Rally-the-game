// Battle rules: holds, the chest, the flag.
import { CROWN2, CROWN26, CROWN, TEAMS, CASTLE_R, HOLDS, CHEST } from '../../config.js';
import { G, colorOf, NEUTRAL_TI, activeArmies, matchTime } from '../state.js';
import { rnd, W } from '../world.js';
import { fx, say } from './util.js';
import { hl, mkUnit, squadOf } from './match.js';
import { eachNear, gridOk } from './melee.js';
import { checkEnd, teamOut } from './score.js';
import { applyCastleGates, freshGates } from './forts.js';
import { c2Hold } from './step.js'; // (later files: through the entry, so files still load in the old order)

// ---------- holdings: places on the map worth taking ----------
// Owned by an alliance (G.ALLY value), not an army: allies share them. Taken by standing in one with
// only your side's men there; a fight inside freezes it; empty, a half-taken one slowly reverts.
export const makeHolds = L => (L.holds || []).map((h, i) => ({ ...h, id: i, owner: -1, prog: 0, cap: -1, tick: 0 }));
export const allianceOf = ti => ti >= NEUTRAL_TI ? -1 : G.ALLY[colorOf(ti)]; // (F4: the neutral soldiers are on no side)
// the alliance clearly ahead on castle strength (conquest), or null when it's close
export function leadingSide() {
  const sc = new Map(); for (let c = 0; c < 4; c++) if (G.teams[c].active) sc.set(G.ALLY[c], (sc.get(G.ALLY[c]) || 0) + (G.teams[c].alive ? G.teams[c].points : 0) / G.ALLY.filter(x => x === G.ALLY[c]).length);
  const v = [...sc.entries()].sort((p, q) => q[1] - p[1]); return v.length > 2 && v[0][1] - v[1][1] >= 15 ? v[0][0] : null;
}
export const sideArmies = a => activeArmies().filter(i => allianceOf(i) === a && !teamOut(i));
// The war chest (CHEST): once a match it lands in the middle; the middle goes back up for grabs.
function chestTick() {
  const h = G.holds.find(x => x.centre); if (!h || G.chestDone || !(G.mode === 'conquest' || G.mode === 'dm' || G.mode === 'crown')) return;
  const at = CHEST.at * matchTime();
  if (!h.chest && G.T >= at - CHEST.warn) { h.chest = 1; say('chestSoon', h.id, CHEST.warn); }
  else if (h.chest === 1 && G.T >= at) { h.chest = 2; h.owner = -1; h.prog = 0; h.cap = -1; say('chestUp', h.id); G.teams.forEach(s => { if (!s.human) s.thinkT = Math.min(s.thinkT, rnd(.2, 1.5)); }); }
  else if (h.chest === 2 && G.T >= at + CHEST.last) { // nobody's been able to hold it: it goes to the side with most men on the ground
    const n = new Map(); for (const u of G.units) if (!u.dead && !u.routing && Math.hypot(u.x - h.x, u.z - h.z) < h.r * 1.6) { const a = allianceOf(u.ti); n.set(a, (n.get(a) || 0) + 1); }
    const best = [...n.entries()].sort((p, q) => q[1] - p[1])[0];
    if (best) { h.owner = best[0]; h.prog = 0; h.cap = -1; say('holdTaken', best[0], h.kind, h.id); chestTaken(h, best[0]); } else { h.chest = 0; G.chestDone = true; }
  }
}
function chestTaken(h, a) {
  h.chest = 0; G.chestDone = true;
  for (const i of sideArmies(a)) { hl(i, 'chest'); const s = G.teams[i]; s.gold += CHEST.gold; s.rally = 100; s.morale = Math.min(100, s.morale + 15); }
  say('chestTaken', a, CHEST.gold); fx('netFlush');
}
export function holdsTick(dt) {
  const hs = G.holds; if (!hs || !hs.length) return;
  chestTick();
  for (const h of hs) {
    if (G.c2) { c2Hold(h, dt); continue; }
    h.safe = false;
    const n = new Map(), count = u => { if (u.dead || u.routing || Math.hypot(u.x - h.x, u.z - h.z) > h.r) return; const a = allianceOf(u.ti); n.set(a, (n.get(a) || 0) + 1); };
    if (gridOk()) eachNear(h.x, h.z, h.r, count); else for (const u of G.units) count(u);
    h.contested = n.size > 1;
    if (n.size === 1) {
      const [a] = n.keys();
      if (a === h.owner) { h.prog = 0; h.cap = -1; }
      else {
        if (h.cap !== a) { h.cap = a; h.prog = 0; }
        h.prog += dt / (HOLDS.capture * (h.chest === 2 ? CHEST.hold : 1) * (h.kind === 'castle' ? CROWN.castleTake : h.kind === 'mine' ? 1.3 : 1)) * Math.min(2, .6 + n.get(a) / 5); // (more men take it quicker; the war chest takes holding)
        if (h.prog >= 1) {
          h.owner = a; h.prog = 0; h.cap = -1; h.tick = 0; say('holdTaken', a, h.kind, h.id); for (const i of sideArmies(a)) hl(i, h.kind === 'castle' ? 'castle' : 'hold');
          if (G.crown) { for (const s of G.teams) s.homeSpot = null; for (const u of G.units) u.runTo = null; if (G.cgates[h.id]) G.cgates[h.id] = freshGates(G.cgates[h.id].lv | 0); applyCastleGates(); }
          if (h.chest === 2) chestTaken(h, a);
          G.teams.forEach(s => { if (!s.human) s.thinkT = Math.min(s.thinkT, rnd(.5, 2)); });
        }
      }
    } else if (n.size === 0 && h.prog > 0) { h.prog = Math.max(0, h.prog - dt / HOLDS.capture * .5); if (!h.prog) h.cap = -1; }
    if (h.owner < 0) continue;
    if (h.kind === 'oasis') { // its water heals the men in it; its trade fills every purse on the side
      for (const u of G.units) if (!u.dead && u.hp < u.max && allianceOf(u.ti) === h.owner && Math.hypot(u.x - h.x, u.z - h.z) < h.r) u.hp = Math.min(u.max, u.hp + HOLDS.oasis.heal * dt);
      for (const i of sideArmies(h.owner)) G.teams[i].gold += HOLDS.oasis.gold * dt;
    } else if (h.kind === 'shrine') { // the map's heart: tribute for the side that holds it, and its men's blood up (the horns fill)
      for (const i of sideArmies(h.owner)) { const s = G.teams[i]; s.gold += HOLDS.shrine.gold * dt; s.rally = Math.min(100, (s.rally || 0) + HOLDS.shrine.rally * dt); }
    } else if (h.kind === 'village') { // now and then a lad picks up a spear and walks out to join you
      h.tick += dt;
      if (h.tick >= HOLDS.village.every) {
        h.tick = 0;
        const arms = sideArmies(h.owner).filter(i => G.teams[i].leader && !G.teams[i].leader.dead && squadOf(i).length < G.squadCap);
        const near = i => G.units.filter(u => !u.dead && u.ti === i && Math.hypot(u.x - h.x, u.z - h.z) < h.r).length;
        arms.sort((x, y) => near(y) - near(x));
        if (arms.length) { const i = arms[0], m = mkUnit(i, h.x + rnd(-1.5, 1.5), h.z + rnd(-1.5, 1.5), 'foot'); m.face = Math.atan2(G.teams[i].leader.x - m.x, G.teams[i].leader.z - m.z); say('holdMen', i, h.kind); }
      }
    }
  }
}
// (AI2) the jungle: on the new mountain one computer captain per side clears his side's camps, the buff camps first,
// then the gold (the nearest of each). A side of two or more captains keeps its last computer captain on it; a lone
// captain takes only the buff camps, when none of his castles is under threat, about a third of his plans; off a march only for one close by, never off a siege. Only by day: the night is the glacier's.
function jungleCamp(u, s) {
  if (!G.layout.map26 || G.c2.phase === 'night') return null;
  const c = colorOf(u.ti), mates = activeArmies().filter(i => colorOf(i) === c && G.teams[i] && G.teams[i].leader && !G.teams[i].leader.human);
  const lone = activeArmies().filter(i => colorOf(i) === c).length < 2;
  if (!lone && mates[mates.length - 1] !== u.ti) return null;
  const up = G.c2.breaks.filter(b => b.kind === 'camp' && b.n > 0 && G.layout.camps[b.id] && G.layout.camps[b.id].side === c && (!lone || b.buff));
  if (!up.length) return null;
  const keep = s.plan && s.plan.camp != null && up.find(b => b.id === s.plan.camp);
  if (keep) return keep;
  if (lone) {
    const a = allianceOf(u.ti), J = CROWN26.jungle, du = b => Math.hypot(b.x - u.x, b.z - u.z);
    if (s.plan && s.plan.kind === 'hold') { // (off a march only for a buff camp close by and nearer than the castle; never off a siege)
      const h = G.holds[s.plan.id], b = up.sort((x, y) => du(x) - du(y))[0];
      if (!h || h.cap >= 0 || h.contested || du(b) > J.near || du(b) > du(h)) return null; return b;
    }
    if (G.holds.some(h => h.owner === a && h.side === c && (h.contested || h.cap >= 0) && Math.hypot(h.x - u.x, h.z - u.z) < J.threatR)) return null;
    if (Math.random() > J.solo) return null;
  }
  const d = b => Math.hypot(b.x - u.x, b.z - u.z) + (b.buff ? 0 : 1000);
  return up.sort((x, y) => d(x) - d(y))[0];
}
// A computer captain's eye for the map: a holding his side doesn't have (or one of his side's under
// attack nearby) is worth a march, more so for some captains than others.
export function holdPlan(u, s) {
  const hs = G.holds; if (!hs || !hs.length) return null;
  const a = allianceOf(u.ti);
  if (G.c2) { // the mountain: the war chest while it's in the arena, the glacier at night (some go, some hold)
    const K = G.c2, keep = s.plan && s.plan.kind === 'spot' && Math.random() > .1;
    if (K.chest === 1) { const b = K.breaks.find(x => x.kind === 'chest' && x.hp > 0); if (b && (keep || Math.random() < .6)) return { kind: 'spot', x: b.x, z: b.z, stop: 1 }; }
    { const jc = jungleCamp(u, s); if (jc) return { kind: 'spot', x: jc.x, z: jc.z, stop: 2, camp: jc.id }; } // (AI2)
    if (K.phase === 'night' && K.breaks.some(b => b.kind === 'glacier' && b.hp > 0)) { s.glacierBias = s.glacierBias ?? Math.random(); if (s.glacierBias < .6 || G.T > CROWN2.crack - (G.layout.map26 ? CROWN26.allGo : 20)) return { kind: 'spot', x: 0, z: 0, stop: 1.5 }; }
  }
  if (s.plan && s.plan.kind === 'hold') { const h = hs[s.plan.id]; if (h && (h.owner !== a || h.contested) && !(G.crown && h.safe && h.owner !== a) && (h.chest === 2 || Math.random() > .12)) return s.plan; }
  s.holdBias = s.holdBias ?? rnd(.3, .7);
  const d = h => Math.hypot(h.x - u.x, h.z - u.z);
  // the war chest: everyone wants it (warned: most start that way; landed: nearly all)
  const chest = hs.find(h => h.chest);
  if (chest && chest.owner !== a && Math.random() < (chest.chest === 2 ? .85 : .55)) return { kind: 'hold', id: chest.id };
  const threatened = hs.filter(h => h.owner === a && (h.contested || h.cap >= 0) && d(h) < 70).sort((x, y) => d(x) - d(y))[0];
  if (threatened && Math.random() < .7) return { kind: 'hold', id: threatened.id };
  const pull = h => d(h) - (h.centre ? 40 : 0) - (G.crown ? (h.kind === 'castle' ? 25 : h.kind === 'mine' ? 8 : 0) - (h.owner >= 0 ? 15 : 0) : 0); // (the middle draws them; in the Crown, castles first, empty places before held ones)
  const can = h => !G.crown || ((h.kind !== 'plaza' || h.chest) && !(h.kind === 'castle' && h.owner >= 0 && G.T < CROWN.siege));
  const want = hs.filter(h => h.owner !== a && can(h)).sort((x, y) => pull(x) - pull(y))[0];
  if (want && (G.crown || Math.random() < s.holdBias)) return { kind: 'hold', id: want.id };
  return null;
}

// ---------- capture the fort ----------
export function dropFlag(u) {
  const f = G.flag; u.carrying = false; f.state = 'dropped'; f.carrier = null; f.x = u.x; f.z = u.z; f.dropT = 10;
  if (G.crown) { const d = Math.hypot(f.x, f.z), m = W.R - 6; if (d > m) { f.x *= m / d; f.z *= m / d; } G.teams.forEach(s => { s.thinkT = 0; s.homeSpot = null; }); say('crownDropped', u.ti); return; }
  say('flagDropped', u.ti);
}
export function updateFlag(dt) {
  const f = G.flag; if (!f) return;
  if (f.state === 'carried') {
    const c = f.carrier, t = TEAMS[colorOf(c.ti)];
    if (Math.hypot(c.x - t.pos[0], c.z - t.pos[1]) < CASTLE_R + 3.5) {
      G.teams[c.ti].caps++; G.teams[c.ti].gold += 50;
      c.carrying = false; f.state = 'home'; f.carrier = null; f.x = 0; f.z = 0;
      say('capture', c.ti);
      G.teams.forEach(s => s.thinkT = 0);
      checkEnd();
    }
    return;
  }
  if (f.state === 'dropped') { f.dropT -= dt; if (f.dropT <= 0) { f.state = 'home'; f.x = 0; f.z = 0; say('flagHome'); } }
  for (const u of G.units) {
    if (u.dead || !u.leader || Math.hypot(u.x - f.x, u.z - f.z) >= 1.9) continue;
    if (u.mounted) { if (u.isMe) fx('hint', 'Get off your horse to take it'); continue; }
    if (u.summon) { u.summon.state = 'leaving'; u.summon.t = 0; u.summon = null; }
    u.carrying = true; f.state = 'carried'; f.carrier = u;
    G.teams.forEach(s => s.thinkT = 0);
    say('flagTaken', u.ti);
    break;
  }
}
