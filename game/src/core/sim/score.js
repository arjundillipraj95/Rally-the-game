// Battle rules: death, castles falling, scores, the end of a match, control points.
import { respawnTime } from './respawn.js'; // (CASTLE7)
import { CROWN2, LAUNCH, TEAMS, MORALE, RALLY, CAPKILL_SLOW, CTRL, LAST } from '../../config.js';
import { G, bus, isEnemyTi, colorOf, activeArmies, rules, matchTime, isC2 } from '../state.js';
import { rnd } from '../world.js';
import { fx, say, sound } from './util.js';
import { hl } from './match.js';
import { behind, canRespawn, dismount, gainRally, loseHeart } from './army.js';
import { endDuel } from './duel.js';
import { allianceOf, c2Points, dieNeutral, dropFlag } from './step.js'; // (later files: through the entry, so files still load in the old order)
import { xpForKill } from './levels.js';
import { creditKill } from './credit.js'; // (RATE1)

export function die(u, killer, ang, launch = 0) {
  if (killer && killer.neutral) { if (!u.cause) u.cause = 'garrison'; killer = null; } // (F4: cut down by a garrison: nobody's kill)
  if (u.neutral) { if (!(u.shieldT > G.T)) dieNeutral(u, killer, ang, launch); return; }
  // (F5) what he fell to, for the card on his own phone: a captain's weapon, a captain's men, or the mountain
  const how = u.execBy ? 'exec' : u.cause === 'garrison' || u.cause === 'tower' ? u.cause : u.cause === 'enemy home' ? 'home' : u.cause ? 'fall' : u.howBy || (!killer ? 'fall' : killer.leader ? (killer.mounted ? 'horse' : killer.weapon === 'spear' ? 'spear' : 'sword') : killer.kind === 'arch' ? 'arrow' : 'men');
  u.howBy = null;
  if (G.c2 && !u.dead) { const D = G.deaths || (G.deaths = { cap: {}, men: {} }), why = u.cause || (killer ? (killer.leader ? 'captain' : killer.kind === 'arch' ? 'archer' : killer.kind === 'foot' ? 'footman' : 'arrows') : 'other'), b = u.leader ? D.cap : D.men; b[why] = (b[why] || 0) + 1; u.cause = null; } // (the admin numbers: how they fell)
  if (u.dead) return;
  if (G.c2 && u.shieldT > G.T) { u.hp = Math.max(1, u.hp); return; } // (the mountain: at home, or just out of it, nobody dies)
  if (G.c2 && u.leader && killer && isEnemyTi(killer.ti, u.ti)) { const k = G.c2.kills, a = allianceOf(killer.ti); if (!(k[a] = k[a] || {})[u.ti]) { const v = killer.leader ? CROWN2.points.killCaptain : CROWN2.points.killArmy; k[a][u.ti] = v; say('c2capPoint', killer.ti, u.ti, v); fx('netFlush'); } }
  u.dead = true; u.deadT = 0;
  if (launch) { // off they go: high, far, spinning (see the ragdoll in render/soldiers.js)
    const f = rnd(LAUNCH.push[0], LAUNCH.push[1]); u.vx += Math.sin(ang) * f; u.vz += Math.cos(ang) * f; u.vy = rnd(LAUNCH.up[0], LAUNCH.up[1]); u.launch = true;
    sound('scream', u.x, u.z);
  } else { u.vx += Math.sin(ang) * 6; u.vz += Math.cos(ang) * 6; u.vy = rnd(3, 6); }
  u.fallDir = Math.random() < .5 ? 1 : -1;
  fx('splat', { x: u.x, z: u.z, s: rnd(1, 1.5), ti: u.ti }); sound('die', u.x, u.z);
  if (u.mounted) dismount(u, false);
  if (u.summon) { u.summon.state = 'leaving'; u.summon.t = 0; u.summon = null; }
  if (u.carrying) dropFlag(u);
  if (u.leader) creditKill(u, killer && isEnemyTi(killer.ti, u.ti) ? killer : null); // (RATE1: kill assists)
  { // the tally, for the results screen: kills by each captain and by his men, his falls and his men lost
    const vs = G.teams[u.ti]; if (vs) { if (u.leader) vs.falls = (vs.falls | 0) + 1; else vs.lost = (vs.lost | 0) + 1; }
    const ks = killer && G.teams[killer.ti]; if (ks && isEnemyTi(killer.ti, u.ti)) { if (killer.leader) ks.capK = (ks.capK | 0) + 1; else ks.menK = (ks.menK | 0) + 1; xpForKill(killer.ti, u); } // (C1b: XP to his army's champion)
  }
  if (u.leader) { const dl = (G.duels || []).find(d => d.a === u || d.b === u); if (dl) { if (dl.state === 'on' && killer && (killer === dl.a || killer === dl.b)) endDuel(dl, 'win', killer); else endDuel(dl, 'off'); } }
  const s = G.teams[u.ti];
  // the army takes it to heart: more so for a man cut down from the side or behind, most of all its captain
  loseHeart(u.ti, u.leader ? MORALE.captain : MORALE.death + (killer && behind(u, killer) ? MORALE.flankDeath : 0));
  if (killer && killer.leader) gainRally(killer, u.leader ? RALLY.capKill : RALLY.kill);
  if (killer && killer.leader && u.leader) hl(killer.ti, 'capkill');
  if (killer && killer.leader && u.leader && G.teams[killer.ti]) G.teams[killer.ti].morale = Math.min(100, G.teams[killer.ti].morale + 20);
  // a captain cut down by a captain: the moment of the battle. The two of them, in slow motion.
  if (killer && killer.leader && u.leader) { killer.slowT = Math.max(killer.slowT || 0, CAPKILL_SLOW); u.slowT = CAPKILL_SLOW; if (!u.execBy) fx('fxmsg', { k: 'fxcapkill', u, a: killer }); } // (an execution has its own moment)
  if (G.mode === 'dm') {
    s.tickets = Math.max(0, s.tickets - (u.leader ? 5 : 1));
    if (s.tickets <= 0 && s.alive) { s.alive = false; say('tickets0', u.ti); }
  }
  if (killer) {
    const bounty = G.mode === 'dm' && u.leader && u.ti === G.bounty;
    const reward = u.leader ? (bounty ? 50 : 25) : 8;
    G.teams[killer.ti].gold += reward;
    // every player captain's kills are counted on the host; clients get theirs at the final whistle
    if (killer.human) { G.teams[killer.ti].kills = (G.teams[killer.ti].kills | 0) + 1; if (killer.ti === G.myTi) G.kills++; }
    if (killer.human) say('gold', killer.ti, Math.round(u.x * 10) / 10, Math.round(u.z * 10) / 10, reward);
    if (bounty) say('bountyClaimed', killer.ti);
    if (u.leader) say('capDown', u.ti, killer.ti);
  } else if (u.leader) say('capDown', u.ti, -1); // (F5: every captain's fall is a line in the feed)
  if (u.leader) {
    s.leaderDeadT = G.warmup ? (u.human ? 1.5 : 3) : G.c2 ? respawnTime() : u.human ? 5 : 9; // (the warm-up: straight back up; CASTLE7: the mountain, by the clock)
    s.deadAt = [u.x, u.z];
    if (u.human) say('fell', u.ti, canRespawn(u.ti) ? 1 : 0, killer && killer.ti != null && isEnemyTi(killer.ti, u.ti) ? killer.ti : -1, how);
  }
  checkEnd();
}
// The breach: a castle beaten down to its last quarter. Its defenders make their last stand.
export function breach(c, by) {
  const s = G.teams[c]; s.breached = true;
  for (const i of activeArmies()) if (colorOf(i) === c) { const t = G.teams[i]; t.rally = 100; t.morale = Math.max(t.morale, 70); t.routT = 0; }
  const L = G.teams[c].leader, near = G.units.filter(u => !u.dead && colorOf(u.ti) === c).sort((p, q) => Math.hypot(p.x - TEAMS[c].pos[0], p.z - TEAMS[c].pos[1]) - Math.hypot(q.x - TEAMS[c].pos[0], q.z - TEAMS[c].pos[1]))[0];
  say('lastStand', c, by ? by.ti : -1); fx('fxmsg', { k: 'fxbreach', u: near || (L && !L.dead ? L : by), ti: c });
  fx('netFlush');
}
// is this man making his castle's last stand? (its walls breached, and him near them)
export const lastStand = u => { const c = colorOf(u.ti), s = G.teams[c]; return G.mode === 'conquest' && s.breached && s.alive && Math.hypot(TEAMS[c].pos[0] - u.x, TEAMS[c].pos[1] - u.z) < LAST.r; };
export function destroyCastle(i, by) {
  const s = G.teams[i]; s.alive = false; s.points = 0;
  if (by != null) hl(by, 'castle');
  say('castleDown', i, by);
  checkEnd();
}

// ---------- win conditions (by alliance) ----------
export function teamOut(i) {
  const s = G.teams[i];
  if (G.mode === 'conquest') return !G.teams[colorOf(i)].alive;
  if (G.mode === 'dm') return !s.alive && !G.units.some(u => !u.dead && u.ti === i);
  return false;
}
// One color's shown score: castle strength is shared (conquest), tickets and captures are each
// army's own and add up across a Duo pair.
export const armiesOfColor = c => [c, c + 4, c + 8].slice(0, 1 + (G.duo[c] | 0));
const ARMY_SCORE_FIELD = { dm: 'tickets', ctf: 'caps', ctrl: 'ctrlScore' };
export function colorScore(c) {
  if (G.mode === 'conquest') return G.teams[c].points;
  if (isC2()) return c2Points(G.ALLY[c]);
  if (G.mode === 'crown') return placesOf(G.ALLY[c]);
  const field = ARMY_SCORE_FIELD[G.mode];
  return armiesOfColor(c).reduce((s, i) => s + G.teams[i][field], 0);
}
export const colorOut = c => armiesOfColor(c).every(i => teamOut(i));
export const colorHuman = c => armiesOfColor(c).some(i => G.teams[i].human);
export const placesOf = a => (G.holds || []).filter(h => h.owner === a && h.kind !== 'plaza').length;
export const teamScore = i => { const s = G.teams[i]; return isC2() ? c2Points(G.ALLY[colorOf(i)]) : G.mode === 'crown' ? placesOf(G.ALLY[colorOf(i)]) : G.mode === 'conquest' ? G.teams[colorOf(i)].points : s[ARMY_SCORE_FIELD[G.mode]]; };
export const allianceCaps = a => G.teams.reduce((s, t, i) => s + (G.ALLY[colorOf(i)] === a ? t.caps : 0), 0);
export const allianceCtrl = a => G.teams.reduce((s, t, i) => s + (G.ALLY[colorOf(i)] === a ? t.ctrlScore : 0), 0);
const alliancesIn = () => [...new Set(activeArmies().filter(i => !teamOut(i)).map(i => G.ALLY[colorOf(i)]))];
export function checkEnd() {
  if (G.state !== 'play' || G.role === 'client') return;
  if (G.mode === 'conquest' || G.mode === 'dm') {
    const inA = alliancesIn();
    if (inA.length === 1) return endMatch(inA[0], G.mode === 'conquest' ? 'castles' : 'tickets');
    if (inA.length === 0) return endMatch(-1, 'time');
  }
  if (G.mode === 'ctf') for (const a of new Set(G.ALLY)) if (allianceCaps(a) >= rules().caps) return endMatch(a, 'caps');
  if (G.mode === 'ctrl') for (const a of new Set(G.ALLY)) if (allianceCtrl(a) >= rules().win) return endMatch(a, 'control');
}
export function checkTime() {
  if (G.state !== 'play' || G.T < matchTime() || G.crown) return;
  const scores = {};
  if (G.mode === 'conquest') { // the castle's score counts once per color, however many armies defend it
    for (let c = 0; c < 4; c++) { if (!G.teams[c].alive) continue; scores[G.ALLY[c]] = (scores[G.ALLY[c]] || 0) + G.teams[c].points; }
  } else {
    for (const i of activeArmies()) scores[G.ALLY[colorOf(i)]] = (scores[G.ALLY[colorOf(i)]] || 0) + teamScore(i);
  }
  const e = Object.entries(scores).map(([a, v]) => [+a, v]).sort((x, y) => y[1] - x[1]);
  if (!e.length || (e.length > 1 && e[0][1] === e[1][1])) return endMatch(-1, 'time');
  endMatch(e[0][0], 'time');
}
export function endMatch(w, why) {
  if (G.state !== 'play' || G.warmup) return; // (the warm-up never ends by itself)
  G.state = 'end'; G.endInfo = { w, why };
  bus.emit('end', G.endInfo);
}

// ---------- control points ----------
// Ownership flips to whichever army has strict majority presence within the point's radius,
// after holding that lead uncontested for CTRL.captureTime seconds; any dead-heat or gap in
// presence resets the progress rather than letting it decay gradually (simple, readable rule).
export function makeCtrlPoints(L) { return L.ctrlSpots.map(s => ({ ...s, owner: -1, prog: 0 })); }
export function updateControlPoints(dt) {
  const pts = G.ctrlPoints; if (!pts) return;
  for (const p of pts) {
    const counts = {};
    for (const u of G.units) {
      if (u.dead || u.mounted) continue;
      if (Math.hypot(u.x - p.x, u.z - p.z) > CTRL.radius) continue;
      counts[u.ti] = (counts[u.ti] || 0) + 1;
    }
    const entries = Object.entries(counts).map(([ti, n]) => [+ti, n]).sort((a, b) => b[1] - a[1]);
    const top = entries[0], tie = entries[1] && entries[1][1] === top[1];
    const leadTi = top && !tie ? top[0] : null;
    if (leadTi == null || leadTi === p.owner) { p.prog = 0; continue; }
    p.capturer = leadTi;
    p.prog += dt / CTRL.captureTime;
    if (p.prog >= 1) { p.owner = leadTi; p.prog = 0; say('pointCaptured', leadTi, p.letter); }
  }
  for (const p of pts) if (p.owner >= 0 && G.teams[p.owner] && G.teams[p.owner].active) G.teams[p.owner].ctrlScore += CTRL.rate * dt;
  checkEnd();
}
