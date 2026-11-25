// Battle rules: the Crown on the mountain: holds, points, breakables, phases, the lake and the flood.
import { CROWN2, CROWN26, FEEL, CHEST, CASTLE26 } from '../../config.js';
import { G, colorOf, activeArmies, matchTime } from '../state.js';
import { groundY, clamp, rnd, angDiff, turn, mountHomeA } from '../world.js';
import { setPalSeg } from '../nav.js';
import { fx, say, sound, spark } from './util.js';
import { hl } from './match.js';
import { aiDmg, eachNear, gridOk } from './melee.js';
import { duels, endDuel } from './duel.js';
import { die, endMatch } from './score.js';
import { applyCastleGates, castleTowersTick, freshGates, towersTick } from './forts.js';
import { allianceOf, sideArmies } from './holds.js';
import { creditObjective } from './credit.js'; // (RATE1)
import { castle3Tick } from './castle3.js';
import { captureTick } from './capture.js';
import { siegeTick } from './siege.js';
import { nexusBreaks, nexusOpen, nexusBroken } from './nexus.js';
import { castlePts, holdingTick, shardOnTake } from './holding.js';
import { c2Man, c2Post, c2PostTick } from './step.js'; // (later files: through the entry, so files still load in the old order)
import { xpForCastle, xpForSceptre } from './levels.js';

// ---------- the new Crown: the mountain's rules ----------
// Places are taken by the side with the most men in them (a neutral castle's guards must fall first),
// in a time set by the castle's level; whoever's army took it grows by it, and gold comes with it
// (from the bank of the army that held it, or a fixed sum for a neutral one). Every army earns base
// gold, and every army on a side earns for each place the side holds.
const c2Kind = h => h.kind === 'castle' ? 'castle' : 'village';
const c2Lv = h => h.kind === 'castle' ? Math.min(2, ((G.cgates[h.id] && G.cgates[h.id].lv) | 0)) : 0;
const c2TakeT = h => h.kind === 'castle' ? CROWN2.take.castle[c2Lv(h)] : h.fort ? CROWN2.take.villageFort : CROWN2.take.village;
export const c2Guard = h => G.c2.breaks.find(b => b.kind === 'guard' && b.hid === h.id && b.n > 0); // (F4: while one of its guards lives)
export function c2Hold(h, dt) {
  if (h.kind === 'castle') { captureTick(h, dt); if (h.owner >= 0) { const g = CROWN2.gold.castle; for (const i of sideArmies(h.owner)) G.teams[i].gold += g * dt; } return; } // (CASTLE4: the capture circle)
  const n = new Map(), per = new Map(), count = u => { if (u.dead || u.neutral || u.routing || Math.hypot(u.x - h.x, u.z - h.z) > h.r) return; const a = allianceOf(u.ti); n.set(a, (n.get(a) || 0) + 1); per.set(u.ti, (per.get(u.ti) || 0) + 1); };
  if (gridOk()) eachNear(h.x, h.z, h.r, count); else for (const u of G.units) count(u);
  h.contested = n.size > 1;
  const v = [...n.entries()].sort((p, q) => q[1] - p[1]), lead = v.length && !(v[1] && v[1][1] === v[0][1]) ? v[0][0] : null;
  if ((h.owner < 0 && c2Guard(h)) || (h.shieldT > G.T && h.owner >= 0)) { h.prog = 0; h.cap = -1; } // (CASTLE1: a banner rising)
  else if (lead != null && lead !== h.owner) {
    if (h.cap !== lead) { h.cap = lead; h.prog = 0; }
    h.prog += dt / c2TakeT(h);
    if (h.prog >= 1) c2Take(h, lead, per);
  } else if (lead != null) { h.prog = 0; h.cap = -1; }
  else if (n.size === 0 && h.prog > 0) { h.prog = Math.max(0, h.prog - dt / c2TakeT(h) * .5); if (!h.prog) h.cap = -1; }
  if (h.owner >= 0) { const g = CROWN2.gold[c2Kind(h)]; for (const i of sideArmies(h.owner)) G.teams[i].gold += g * dt; }
}
export function c2Take(h, a, per) {
  const by = [...per.entries()].filter(([ti]) => allianceOf(ti) === a).sort((p, q) => q[1] - p[1])[0][0], k = c2Kind(h), was = h.by;
  let gain = CROWN2.bonus[k];
  if (h.owner >= 0 && was != null && G.teams[was]) { const v = G.teams[was], take = Math.max(0, v.gold) * CROWN2.steal[k]; v.gold -= take; gain = Math.max(gain, take); }
  G.teams[by].gold += gain; if (k === 'castle') for (const i of sideArmies(a)) if (i !== by) G.teams[i].gold += CASTLE26.moment.side; // (CASTLE5: gold for the whole side)
  h.siege = null; if (k === 'castle') shardOnTake(h, a); // (CASTLE6)
  h.owner = a; h.by = by; h.prog = 0; h.cap = -1; h.tick = 0; h.fort = 0; // (a palisade doesn't change hands)
  say('holdTaken', a, h.kind, h.id); hl(by, h.kind === 'castle' ? 'castle' : 'hold');
  if (h.kind === 'castle') { xpForCastle(h, a, by, sideArmies); creditObjective(a, h.x, h.z, by); } // (C1b; RATE1)
  for (const s of G.teams) s.homeSpot = null; for (const u of G.units) u.runTo = null;
  if (G.cgates[h.id]) { G.cgates[h.id] = freshGates(0); applyCastleGates(); } // (CASTLE1: taken: level 0, gates open)
  if (h.kind === 'castle') h.shieldT = G.T + CASTLE26.shield; // (CASTLE1: the banner rises; nobody takes it back meanwhile)
  G.teams.forEach(s => { if (!s.human) s.thinkT = Math.min(s.thinkT, rnd(.5, 2)); });
}
// points: places held now, the war chest, the Crown, and each enemy captain the side has cut down once
export function c2Points(a) {
  const K = G.c2; if (!K) return 0; let p = 0;
  for (const h of G.holds || []) if (h.owner === a) p += h.kind === 'castle' ? castlePts(h) : CROWN2.points[c2Kind(h)]; // (CASTLE6: middle 5, outer 3)
  return p + (K.chestPts[a] || 0) + (K.crownPts[a] || 0) + ((K.nexusPts && K.nexusPts[a]) || 0) + Object.values(K.kills[a] || {}).reduce((n, v) => n + v, 0);
}
// where a side's points came from (the results screen): places held at the end, the chest, the Crown, captains cut down
export function c2Breakdown(a) {
  const K = G.c2, P = CROWN2.points, o = { castles: 0, villages: 0, chest: 0, crown: 0, caps: 0, nexus: 0, total: 0 }; if (!K) return o;
  o.castlePts = 0; for (const h of G.holds || []) if (h.owner === a) { if (c2Kind(h) === 'castle') { o.castles++; o.castlePts += castlePts(h); } else o.villages++; }
  o.chest = K.chestPts[a] || 0; o.crown = K.crownPts[a] || 0; o.caps = Object.values(K.kills[a] || {}).reduce((n, v) => n + v, 0);
  o.nexus = (K.nexusPts && K.nexusPts[a]) || 0;
  o.total = o.castlePts + o.villages * P.village + o.chest + o.crown + o.caps + o.nexus;
  return o;
}
// the things on the mountain you break: a neutral castle's guards, a bandit camp, the war chest, the glacier
export function c2Begin(mk = null) {
  const L = G.layout, K = G.c2 = { kills: {}, chestPts: {}, crownPts: {}, breaks: [], phase: 'shut', said: {}, chest: 0 };
  for (const h of G.holds) if (h.kind === 'castle') {
    if (G.cgates[h.id]) G.cgates[h.id] = freshGates(CASTLE26.neutralLv); // (CASTLE1: neutral castles at level 0, their guards the defence)
    const cw = L.cwalls.find(c => c.hid === h.id), g = cw ? cw.gate : 0;
    K.breaks.push(c2Post({ kind: 'guard', hid: h.id, x: h.x + Math.cos(g) * 4.5, z: h.z + Math.sin(g) * 4.5, r: 2.4 }, CROWN2.guards));
  }
  for (const c of L.camps) K.breaks.push(c2Post({ kind: 'camp', id: c.id, x: c.x, z: c.z, r: 2.6, camp: c.kind, buff: c.buff || null }, Object.assign({}, CROWN2.camp, CROWN26.campMen[c.kind] || {}))); // (CAMP1: men by the camp's kind)
  // (F4) every post's men, real soldiers with fixed ids (a joined phone makes the same ones: `mk` is its maker)
  let pi = 0; for (const b of K.breaks) if (b.post) { b.pi = pi++; for (let k = 0; k < b.men; k++) c2Man(b, k, mk); }
  K.breaks.push({ brk: true, kind: 'glacier', x: 0, z: 0, r: 2.6, hp: CROWN2.glacierHits, max: CROWN2.glacierHits });
  K.breaks.push(...nexusBreaks(L)); K.nexusPts = {}; // (CASTLE8)
  applyCastleGates();
  G.plazaWall.up = true; G.plazaWall.broken = 15; // (F7: the arena's gates stand open; the lake keeps everyone out)
}
// (FIX6) a hit on a nexus that can't be hurt yet: a dull spark, and once in a while its why for the hitter's side
function shut(u, b) {
  const a = allianceOf(u.ti); if (a < 0 || a === G.ALLY[b.c]) return;
  spark(b.x, groundY(b.x, b.z) + 1.4, b.z, '#9aa3ad', 3); sound('thud', b.x, b.z);
  const K = G.c2, k = 'shut' + a + ':' + b.c; K.shutT = K.shutT || {}; if (K.shutT[k] > G.T) return; K.shutT[k] = G.T + 20;
  const mid = (G.holds || []).find(h => h.kind === 'castle' && h.mid && h.side === b.c);
  say('nexusShut', a, b.c, mid && mid.owner === G.ALLY[b.c] ? mid.id : -1); fx('netFlush');
}
const c2CanHit = (u, b) => b.kind === 'glacier' ? u.leader && G.c2.phase === 'night' : b.kind === 'chest' ? G.c2.chest === 1 : b.kind === 'nexus' ? nexusOpen(b, u) : true;
// how many of a garrison still stand: [footmen, archers] (F4: its live men)
export function c2Garrison(b) {
  let f = 0, a = 0; for (const u of b.units || []) if (u && !u.dead) { if (u.kind === 'arch') a++; else f++; }
  return [f, a];
}
export function c2BreakInReach(u) {
  for (const b of G.c2.breaks) { if (b.post || b.hp <= 0 || !c2CanHit(u, b)) continue; if (Math.hypot(b.x - u.x, b.z - u.z) < u.r + u.reach + b.r) return b; }
  return null;
}
export function c2Hit(u, b) {
  if (b.hp <= 0) return;
  if (!c2CanHit(u, b)) { if (b.kind === 'nexus') shut(u, b); return; }
  if (u.leader && b.kind === 'nexus' && G.teams[u.ti]) G.teams[u.ti].siegeAt = { x: b.x, z: b.z, T: G.T, r: b.r }; // (CASTLE10: his men come and help)
  b.hp -= b.kind === 'glacier' || b.kind === 'chest' ? 1 : u.dmg * (u.leader ? 1.5 : 1) * aiDmg(u.ti); // (the glacier and the chest count blows) b.by = u.ti; b.hitT = G.T;
  sound('wall', b.x, b.z); spark(b.x, groundY(b.x, b.z) + 1.4, b.z, b.kind === 'glacier' ? '#bfe6f5' : b.kind === 'chest' ? '#ffcf3a' : '#b33a2a', 4);
  if (b.hp > 0) return;
  b.hp = 0; const a = allianceOf(u.ti), K = G.c2;
  if (b.kind === 'chest') { c2ChestTo(a, u.ti); }
  else if (b.kind === 'glacier') { K.crownPts[a] = CROWN2.points.crown; hl(u.ti, 'crown'); creditObjective(a, b.x, b.z, u.ti); say('crownTaken', u.ti); fx('netFlush'); } // (CASTLE8: the Crown no longer ends the battle: 10:00 does)
  else if (b.kind === 'nexus') nexusBroken(b, a, u.ti);
}
function c2ChestTo(a, ti = -1) { // (ti: the captain whose blow broke it, if anyone's)
  const K = G.c2; K.chest = 2; const b = K.breaks.find(x => x.kind === 'chest'); if (b) b.hp = 0;
  if (K.floodAt == null && G.T < CROWN2.night) K.floodAt = G.T; // (F7a: the chest is done; the lake's countdown starts)
  if (a != null) { xpForSceptre(a, sideArmies); K.chestPts[a] = CROWN2.points.chest; if (ti >= 0) hl(ti, 'sceptre'); if (b) creditObjective(a, b.x, b.z, ti); // (C1b: the Sceptre's XP; RATE1: who broke it, and who helped)
 for (const i of sideArmies(a)) { hl(i, 'chest'); const s = G.teams[i]; s.gold += CHEST.gold; s.rally = 100; s.morale = Math.min(100, s.morale + 15); } say('chestTaken', a, CHEST.gold, ti); }
  fx('netFlush');
}
// the arena's phases: shut (under the lake), open to everyone (the war chest), shut again, then the captains' (night).
// (F7: the gates stand open all battle; the lake and, from 8:00, the gate rule for soldiers are what keep men out)
function c2Phase(ph) {
  const K = G.c2; if (K.phase === ph) return; K.phase = ph; fx('netFlush');
}
// F7 the summit's lake (CROWN2.lake): how high it stands (1 full, 0 dry), how far the flood's front has rushed out
// from the glacier (0: not rushing), the countdown's seconds left (-1: none), and whether anyone may cross.
// Every phone works it out the same way from the clock and the time the countdown began (K.floodAt).
export function c2Lake(T = G.T) {
  const C = CROWN2, Lk = C.lake, K = G.c2, ar = G.layout.arena.r, f = K && K.floodAt != null ? K.floodAt : null;
  let level = 0, front = 0, count = -1;
  if (T < C.chest) level = 1;
  else if (T >= C.night) level = Math.max(0, 1 - (T - C.night) / Lk.drain);
  else if (f != null && T >= f + Lk.count) { level = 1; front = Math.min(ar + 1, Lk.pool + (T - f - Lk.count) * Lk.rush); }
  else { level = Math.max(0, 1 - (T - C.chest) / Lk.drain); if (f != null && T >= f) count = f + Lk.count - T; }
  return { level, front, count, block: level > Lk.cross, ar };
}
// the arena gate in line with a point (one faces each keep)
export function c2GateA(x, z) {
  const a0 = Math.atan2(z, x); let best = mountHomeA(0);
  for (let c = 1; c < 4; c++) if (Math.abs(angDiff(a0, mountHomeA(c))) < Math.abs(angDiff(a0, best))) best = mountHomeA(c);
  return best;
}
// One man and the lake. While it's up nobody crosses into the arena; the flood picks up everyone inside and carries
// him out of the nearest gate; from 8:00 a soldier can't pass a gate (F7c), only a captain. own: this phone moves
// him (the host does all but the players on other phones, and each phone its own captain); host: this phone runs
// the battle (it calls off a duel or an execution the water breaks up). True while he's being carried.
export function c2Water(u, dt, own = true, host = true) {
  if (!G.c2 || u.dead || !G.layout.arena) return false;
  const W = c2Lake(), ar = W.ar, r = Math.hypot(u.x, u.z), night = G.T >= CROWN2.night;
  if (u.flood) return floodStep(u, dt, own, ar);
  const out = W.block || (night && !u.leader);
  if (W.front > 0 && W.front < ar && r < ar) { if (r >= W.front) return false; } // (the flood's on its way out to him)
  else if (!(out && r < ar - .3)) { // (not inside where he mustn't be: at most kept on the threshold)
    if (own && out && r < ar + .5) { const m = ar + .5, k = m / (r || 1); u.x = r ? u.x * k : m; u.z = r ? u.z * k : 0; // (at the gate: the water, or the gate, stops him there)
      const vr = (u.vx * u.x + u.vz * u.z) / m; if (vr < 0) { u.vx -= vr * u.x / m; u.vz -= vr * u.z / m; } }
    return false;
  }
  floodStart(u, host); return floodStep(u, dt, own, ar);
}
function floodStart(u, host) {
  const a = c2GateA(u.x, u.z), lat = -Math.sin(a) * u.x + Math.cos(a) * u.z, Lk = CROWN2.lake;
  u.flood = { a, lat: clamp(lat * .4, -Lk.lane, Lk.lane), row: u.id % 3, t: 0 }; u.path = null; u.charge = 0; u.aim = false; u.windup = 0;
  if (!host) return;
  for (const d of duels().filter(d => d.a === u || d.b === u)) endDuel(d, 'off');
  const ex = u.execOf ? u : G.units.find(o => o.execOf === u);
  if (ex) { const v = ex.execOf; ex.execT = 0; ex.execOf = null; ex.execA = false; if (v) { v.execT = 0; v.execV = false; } }
  if (u.execV) { u.execT = 0; u.execV = false; }
}
// the water carries him: to the mouth of his gate (inside the wall: a straight run there never meets it), then out
// along the bridge, easing onto his lane, and sets him down past the chasm's far rim. He can't act or be hurt.
function floodStep(u, dt, own, ar) {
  const F = u.flood, Lk = CROWN2.lake; F.t += dt;
  u.stun = Math.max(u.stun || 0, .25); u.iframeT = Math.max(u.iframeT || 0, .25); u.swing = 0; u.blockT = 0;
  const r = Math.hypot(u.x, u.z);
  if (!own) { if (r > ar + 2 || F.t > 8) u.flood = null; return !!u.flood; } // (his own phone carries him)
  const ca = Math.cos(F.a), sa = Math.sin(F.a), along = ca * u.x + sa * u.z, lat = -sa * u.x + ca * u.z, Ch = G.layout.chasm, rOut = Ch.r + Ch.w + Lk.out + F.row * Lk.row, off = along > Ch.r + Ch.w; // (set down in a few ranks, fanned out once off the bridge: not in one heap)
  if (along >= rOut || F.t > 8) { u.flood = null; u.vx = u.vz = 0; u.stun = Lk.land; u.iframeT = Lk.land; return false; } // (set down)
  const spd = Lk.carry * Math.min(1, .35 + .65 * F.t / Lk.ramp);
  let ta, tl;
  if (along < ar - 1.2 && Math.abs(lat - F.lat) > .4) { ta = ar - 1.2; tl = F.lat; } // (to the gate's mouth)
  else { ta = Math.max(along, ar - 1.2) + 3; tl = lat + (F.lat * (off ? Lk.spread : 1) - lat) * .5; } // (out along the bridge)
  const tx = ca * ta - sa * tl, tz = sa * ta + ca * tl, dx = tx - u.x, dz = tz - u.z, d = Math.hypot(dx, dz) || 1, s = Math.min(d, spd * dt);
  u.x += dx / d * s; u.z += dz / d * s; u.vx = dx / d * spd; u.vz = dz / d * spd;
  u.face = turn(u.face, Math.atan2(dx, dz), dt * 5); u.y = groundY(u.x, u.z);
  return true;
}
export function c2Tick(dt) {
  towersTick(dt); castleTowersTick(dt); castle3Tick(dt); siegeTick(); holdingTick(dt); // (CASTLE1: no gate mends by itself; CASTLE2: level III)
  const K = G.c2, T = G.T, C = CROWN2, once = (k, ...a) => { if (!K.said[k]) { K.said[k] = 1; say(k, ...a); } };
  if (T >= C.chest - C.chestWarn) once('c2chestSoon', C.chestWarn);
  if (T >= C.chest && K.chest === 0) { K.chest = 1; const r = G.layout.arena.r * .5; K.breaks.push({ brk: true, kind: 'chest', x: r, z: 0, r: 1.6, hp: C.chestHp, max: C.chestHp }); once('c2chestUp'); c2Phase('open'); G.teams.forEach(s => { if (!s.human) s.thinkT = Math.min(s.thinkT, rnd(.2, 1.5)); }); }
  if (K.chest === 1 && T >= C.chestShut) { // nobody broke it open: the side with the most men in the arena has it
    const n = new Map(); for (const u of G.units) if (!u.dead && Math.hypot(u.x, u.z) < G.layout.arena.r) { const a = allianceOf(u.ti); n.set(a, (n.get(a) || 0) + 1); }
    const v = [...n.entries()].sort((p, q) => q[1] - p[1]); c2ChestTo(v.length && !(v[1] && v[1][1] === v[0][1]) ? v[0][0] : null);
  }
  if (T >= C.night) { once('c2night'); c2Phase('night'); } else if (K.chest >= 2 || T < C.chest) c2Phase('shut'); else c2Phase('open');
  if (T >= C.night - 20) once('c2nightSoon');
  // F7 the lake: nobody crosses while it's up, the flood carries everyone out, from 8:00 soldiers stay out (c2Water)
  { const W = c2Lake(); for (let k = 0; k < 4; k++) setPalSeg('pg' + k, W.block); // (the pathfinder: no way through the arena under water)
    if (W.count > 0) once('c2flood', Math.round(W.count));
    for (const u of G.units) if (!u.dead && !u.rest) c2Water(u, dt, !u.remote, true); } // (F4: a sleeping garrison's men stand where no water comes)
  // over the edge into the chasm, "300" style (F7): he teeters at the rim in slow motion, flailing and screaming, then
  // drops out of sight; dead at FEEL.chasm.fall, untouchable throughout (and no home's shield saves him: else he'd fall twice); his body falls on and is gone when it lands
  { const H = CROWN2.h, C = G.layout.chasm; for (const u of G.units) {
    if (u.dead || u.flood || u.rest) continue;
    if (u.chasmT > 0) { u.chasmT -= dt; if (u.chasmT <= 0) { u.chasmT = 0; u.cause = 'chasm'; u.shieldT = 0; const vy = u.vy; die(u, null, 0); u.fz = 0; u.vx = u.dvx; u.vz = u.dvz; u.vy = Math.min(vy, -2); u.chasmGone = true; } continue; }
    const d = Math.hypot(u.x, u.z);
    if (u.jy > .3 || d >= C.r + C.w + 1 || groundY(u.x, u.z) >= H.top - 4) continue;
    const rr = d < C.r + C.w / 2 ? C.r - 1.5 : C.r + C.w + 1.5, k = rr / (d || 1); // (the rim he went over: the nearer one)
    u.chasmT = FEEL.chasm.fall; u.y = u.rimY = Math.max(groundY(u.x, u.z), groundY(u.x * k, u.z * k)); u.vy = 0; u.edge = { x: u.x * k, z: u.z * k, y: u.rimY, edge: true }; // (edge: where your camera holds, looking down)
    u.dvx = u.vx * FEEL.chasm.drift; u.dvz = u.vz * FEEL.chasm.drift; u.vx = u.vz = 0; u.iframeT = FEEL.chasm.fall + .2; u.stun = Math.max(u.stun || 0, FEEL.chasm.fall + .2); u.path = null; u.marchT = 0;
    if (u.isMe) fx('shake', .4); sound('scream', u.x, u.z);
  } }
  // the glacier is solid: you stand at its face and hack, not inside it
  { const gl = K.breaks.find(b => b.kind === 'glacier'); if (gl && gl.hp > 0) for (const u of G.units) {
    if (u.dead || u.rest) continue; const d = Math.hypot(u.x - gl.x, u.z - gl.z), m = gl.r - .2 + u.r; if (d >= m) continue;
    const k = m / (d || 1); u.x = d ? gl.x + (u.x - gl.x) * k : gl.x + m; u.z = d ? gl.z + (u.z - gl.z) * k : gl.z; } }
  // home: enemies burn, yours heal and can't be killed, and leave at a run
  for (const u of G.units) {
    if (u.dead || u.neutral) continue; // (F4: no home is a neutral man's)
    const c = colorOf(u.ti); u.inSafe = false;
    for (const h of G.layout.homes) {
      const dx = u.x - h.x, dz = u.z - h.z; if (dx * dx + dz * dz > h.r * h.r) continue;
      if (h.c === c) u.inSafe = true;
      else { u.hp -= C.safe.dmg * dt; u.lastHit = T; if (u.hp <= 0) { u.cause = 'enemy home'; die(u, null, Math.atan2(dx, dz)); } }
    }
    if (u.inSafe) { u.hp = Math.min(u.max, u.hp + C.safe.heal * dt); u.shieldT = T + C.safe.shield; u.boostT = T + C.safe.boostT; }
    if (u.shieldT > T && u.shieldHp != null) u.hp = Math.max(u.hp, Math.min(u.max, u.shieldHp));
    u.shieldHp = u.shieldT > T ? u.hp : null;
  }
  // (F4) the guards and the bandits: real men at their posts, roused by passers-by; the camps fill again in time
  for (const b of K.breaks) if (b.post) c2PostTick(b, dt);
  if (!K.clearT && !K.breaks.some(b => b.kind === 'guard' && b.n > 0)) K.clearT = T; // (every castle's garrison down)
  if (T >= C.crack) once('c2crack');
  if (T >= matchTime()) c2End('time');
}
function c2End(why) {
  if (G.state !== 'play') return;
  const sc = new Map(); for (const i of activeArmies()) { const a = allianceOf(i); if (!sc.has(a)) sc.set(a, c2Points(a)); }
  const v = [...sc.entries()].sort((p, q) => q[1] - p[1]);
  endMatch(!v.length || (v[1] && v[1][1] === v[0][1]) ? -1 : v[0][0], why === 'crown' ? 'crown2' : 'points2');
}
