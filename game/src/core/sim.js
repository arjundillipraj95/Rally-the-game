// Battle rules: units, combat, horses, the banner, AI and win conditions.
// Engine-agnostic: talks to the outside world only through G (state) and bus (events).
import { TEAMS, MODES, STATS, DIFF, HUMAN_CAPTAIN, HORSE_HP, HORSE_CD, DM_TICKETS, CAPS_TO_WIN, CASTLE_R, CASTLE_REACH, RECRUITS, WORLD_LIMIT } from '../config.js';
import { G, bus, isEnemy, isEnemyTi } from './state.js';
import { groundY, inFord, inRiver, onBridge, gatePos, makeLayout, clamp, rnd, angDiff, turn } from './world.js';

// ---------- announcements & effects (presentation listens) ----------
export const say = (k, ...a) => bus.emit('msg', { k, a });
const fx = (type, d) => bus.emit(type, d);
const spark = (x, y, z, c, n) => fx('spark', { x, y, z, c, n });
const sound = (name, x, z) => fx('sfx', { name, x, z });

// ---------- setup ----------
export function newTeams(humans) {
  return TEAMS.map((_, i) => ({ points: 100, tickets: DM_TICKETS, caps: 0, gold: 40, alive: true, plan: null, leaderDeadT: 0, recruitT: rnd(2, 6), thinkT: 0,
    human: !!humans[i], order: 'follow', holdPt: null, towerT: rnd(0, 1.4), leader: null }));
}
export function mkUnit(ti, x, z, kind, human = false) {
  const st = STATS[kind];
  const u = { id: ++G.uid, ti, kind, leader: kind === 'captain', human, isMe: human && ti === G.myTi && G.role !== 'client', remote: human && ti !== G.myTi,
    x, z, y: groundY(x, z), vx: 0, vz: 0, vy: 0, face: Math.atan2(-x, -z), hp: st.hp, max: st.hp,
    dmg: human ? HUMAN_CAPTAIN.dmg : st.dmg, spd: human ? HUMAN_CAPTAIN.spd : st.spd, r: st.r, reach: st.reach,
    cd: rnd(0, .6), shootCd: rnd(0, 1.5), swing: 0, pending: null, stun: 0, blockT: 0, rt: rnd(0, .3), foe: null, fd: 1e9,
    dead: false, deadT: 0, trampleT: 0, lastHit: -9, blocking: false, aim: false,
    mounted: false, horse: null, summon: null, horseHp: HORSE_HP, horseCd: 0, carrying: false,
    kick: { n: 0, vx: 0, vz: 0, st: 0, dirty: false } };
  G.units.push(u); return u;
}
export const squadOf = ti => G.units.filter(u => !u.dead && u.ti === ti && !u.leader);

export function startMatch(humans) {
  G.layout = makeLayout(G.map.id, G.mode === 'ctf', G.seed);
  G.units = []; G.horses = []; G.arrows = [];
  G.T = 0; G.kills = 0; G.recruited = 0; G.bounty = -1; G.uid = 0; G.arrowN = 0; G.endInfo = null;
  G.teams = newTeams(humans);
  G.flag = G.mode === 'ctf' ? { state: 'home', x: 0, z: 0, carrier: null, dropT: 0 } : null;
  TEAMS.forEach((t, i) => {
    const [gx, gz] = gatePos(t, 0, 7);
    G.teams[i].leader = mkUnit(i, gx, gz, 'captain', G.teams[i].human);
    const start = G.squadCap > 12 ? ['foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'spear', 'spear', 'spear', 'spear', 'spear', 'spear', 'arch', 'arch', 'arch', 'arch', 'foot', 'spear', 'arch'].slice(0, G.squadCap) : ['foot', 'foot', 'foot', 'spear', 'spear', 'arch'];
    start.forEach((k, n) => { const [sx, sz] = gatePos(t, ((n % 8) - 3.5) * 1.4, 1.5 + Math.floor(n / 8) * 1.4); mkUnit(i, sx, sz, k); });
  });
  G.player = G.teams[G.myTi].leader;
  G.state = 'play';
  say('start');
}

export function setOrder(ti, o) {
  const s = G.teams[ti]; s.order = o;
  const cap = s.leader;
  if (o === 'hold' && cap) s.holdPt = { x: cap.x, z: cap.z, face: cap.face, isFront: true };
}
export function canRecruit(ti) { const s = G.teams[ti]; return G.mode === 'conquest' ? s.alive : G.mode === 'dm' ? s.tickets > 0 : true; }
export function recruit(ti, kind) {
  const s = G.teams[ti], cost = STATS[kind].cost;
  if (!canRecruit(ti) || s.gold < cost || squadOf(ti).length >= G.squadCap) return false;
  s.gold -= cost;
  const [gx, gz] = gatePos(TEAMS[ti], rnd(-2, 2)); mkUnit(ti, gx, gz, kind);
  if (ti === G.myTi) { G.recruited++; sound('coin'); }
  return true;
}
export function canRespawn(ti) { const s = G.teams[ti]; return G.mode === 'conquest' ? s.alive : G.mode === 'dm' ? s.tickets > 0 : true; }
function push(u, vx, vz, stun) {
  if (u.remote) { u.kick.vx += vx; u.kick.vz += vz; u.kick.st = Math.max(u.kick.st, stun || 0); u.kick.dirty = true; }
  else { u.vx += vx; u.vz += vz; }
  if (stun) u.stun = Math.max(u.stun, stun);
}

// ---------- horses ----------
export function speedOf(u) {
  let s = u.spd;
  if (u.mounted) s *= 1.8;
  if (u.carrying) s *= .7;
  if (inFord(u.x, u.z)) s *= .6;
  if (u.human && u.blocking && !u.mounted) s *= .5;
  return s;
}
function summonHorse(u) {
  if (u.mounted || u.summon || u.horseCd > 0 || u.dead || u.carrying) return false;
  if (G.T - u.lastHit < 2) return false;
  const back = u.face + Math.PI + rnd(-.6, .6);
  const hx = clamp(u.x + Math.sin(back) * 14, -86, 86), hz = clamp(u.z + Math.cos(back) * 14, -86, 86);
  const h = { id: ++G.horseN, x: hx, z: hz, face: Math.atan2(u.x - hx, u.z - hz), state: 'coming', rider: u, t: 0, spd: 0, ti: u.ti, fall: 1 };
  G.horses.push(h); u.summon = h;
  if (u.isMe) sound('neigh');
  return true;
}
function mountUp(u, h) {
  u.summon = null; u.mounted = true; u.horse = h; h.state = 'ridden'; u.r = .95;
  if (u.isMe) fx('float', { x: u.x, y: u.y + 3.4, z: u.z, text: 'Mounted', color: '#fff' });
}
export function dismount(u, thrown) {
  if (!u.mounted) return;
  const h = u.horse; u.mounted = false; u.horse = null; u.r = STATS.captain.r;
  if (thrown) {
    h.state = 'dead'; h.t = 0; h.fall = Math.random() < .5 ? 1 : -1;
    u.horseCd = HORSE_CD; u.horseHp = HORSE_HP;
    push(u, Math.sin(u.face + Math.PI / 2) * 5, Math.cos(u.face + Math.PI / 2) * 5, 1.0);
    if (u.human) say('horseDown', u.ti);
  } else { h.state = 'leaving'; h.t = 0; }
}
function horseDamage(r, dmg) {
  r.horseHp -= dmg;
  spark(r.x, r.y + 1.3, r.z, '#d42a1e', 5); sound('hit', r.x, r.z);
  if (r.horseHp <= 0) dismount(r, true);
}
const spearNear = (u, d) => G.units.some(o => !o.dead && isEnemy(o, u) && o.kind === 'spear' && Math.hypot(o.x - u.x, o.z - u.z) < d);
export const braced = s => s.kind === 'spear' && s.stun <= 0 && Math.hypot(s.vx, s.vz) < 2.2;
export function toggleHorseFor(p) {
  if (!p || p.dead) return;
  if (p.mounted) { dismount(p, false); return; }
  if (p.summon) return;
  if (p.carrying) { say('rideNo', p.ti, 'banner'); return; }
  if (p.horseCd > 0) { say('rideNo', p.ti, 'rest', Math.ceil(p.horseCd)); return; }
  if (G.T - p.lastHit < 2) { say('rideNo', p.ti, 'hot'); return; }
  summonHorse(p);
}

// ---------- combat ----------
export function nearestFoe(u, maxD, filter) {
  let best = null, bd = maxD * maxD;
  for (const o of G.units) { if (o.dead || !isEnemy(o, u) || (filter && !filter(o))) continue; const dx = o.x - u.x, dz = o.z - u.z, d = dx * dx + dz * dz; if (d < bd) { bd = d; best = o; } }
  return [best, Math.sqrt(bd)];
}
export function nearestEnemyCastle(u) {
  if (G.mode !== 'conquest') return [-1, 1e9];
  let best = -1, bd = 1e9;
  G.teams.forEach((s, i) => { if (!isEnemyTi(i, u.ti) || !s.alive) return; const d = Math.hypot(TEAMS[i].pos[0] - u.x, TEAMS[i].pos[1] - u.z); if (d < bd) { bd = d; best = i; } });
  return [best, bd];
}
const aiDmg = ti => G.teams[ti] && G.teams[ti].human ? 1 : DIFF[G.diff].dmg;
function startSwing(u, target) {
  if (u.cd > 0 || u.stun > 0 || u.dead || u.carrying) return false;
  u.swing = .38; u.cd = (u.leader ? (u.mounted ? .8 : .6) : STATS[u.kind].cd) * rnd(.9, 1.15);
  u.pending = { t: .15, target };
  sound('swing', u.x, u.z);
  return true;
}
function startSweep(u) {
  if (u.cd > 0 || u.stun > 0 || u.dead) return;
  u.swing = .38; u.cd = .8; u.pending = { t: .15, sweep: true }; sound('swing', u.x, u.z);
}
function resolveSwing(u) {
  const pend = u.pending, tg = pend.target; u.pending = null;
  if (pend.sweep) {
    const mult = .8 * (1 + Math.hypot(u.vx, u.vz) / 12);
    for (const o of G.units) {
      if (o.dead || !isEnemy(o, u)) continue;
      if (Math.hypot(o.x - u.x, o.z - u.z) > 3.1) continue;
      if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > 1.25) continue;
      hit(u, o, mult);
    }
    return;
  }
  if (tg && tg.castle !== undefined) {
    const s = G.teams[tg.castle];
    if (!s.alive || u.mounted || !isEnemyTi(tg.castle, u.ti)) return;
    if (Math.hypot(TEAMS[tg.castle].pos[0] - u.x, TEAMS[tg.castle].pos[1] - u.z) > CASTLE_REACH + .8) return;
    s.points -= u.human ? 1.3 : u.leader ? .7 : u.kind === 'arch' ? .08 : .2;
    sound('wall', u.x, u.z); spark(u.x + Math.sin(u.face) * 1.2, 1.4, u.z + Math.cos(u.face) * 1.2, '#cfc8b8', 5);
    if (s.points <= 0) destroyCastle(tg.castle, u.ti);
    return;
  }
  if (!tg || tg.dead) return;
  if (Math.hypot(tg.x - u.x, tg.z - u.z) > u.r + tg.r + u.reach + .5) return;
  hit(u, tg, 1);
}
function hit(a, b, mult = 1) {
  if (!isEnemy(a, b)) return;
  let dmg = a.dmg * rnd(.8, 1.2) * mult * aiDmg(a.ti);
  if (a.kind === 'spear' && b.kind === 'foot') dmg *= 1.3;
  if (a.kind === 'spear' && b.leader) dmg *= 1.4;
  if (a.kind === 'foot' && b.kind === 'arch') dmg *= 1.4;
  if (G.map.id === 'frost' && a.y - b.y > .8) dmg *= 1.2;
  b.lastHit = G.T;
  if (b.mounted && (a.kind === 'spear' || Math.random() < .5)) { horseDamage(b, dmg * (a.kind === 'spear' ? 3 : 1)); return; }
  let kb = a.leader ? (a.mounted ? 9 : 7) : 4.5;
  const frontal = Math.abs(angDiff(b.face, Math.atan2(a.x - b.x, a.z - b.z))) < 1.1;
  let blocked = false;
  if (frontal && b.stun <= 0 && !b.mounted && !b.carrying) {
    if (b.human) blocked = b.blocking;
    else if (Math.random() < STATS[b.kind].block) { blocked = true; b.blockT = .45; }
  }
  const hx = (a.x + b.x) / 2, hz = (a.z + b.z) / 2, hy = (a.y + b.y) / 2 + 1.2;
  if (blocked) {
    dmg *= b.human ? .12 : .25; kb *= .4;
    spark(hx, hy, hz, '#fff3b0', 7); sound('clang', hx, hz); b.blockT = Math.max(b.blockT, .2);
    if (b.isMe) fx('buzz', 15);
  } else {
    spark(hx, hy, hz, TEAMS[b.ti].css, 6); sound('hit', hx, hz);
    if (Math.random() < .4) fx('splat', { x: b.x + rnd(-.4, .4), z: b.z + rnd(-.4, .4), s: rnd(.6, 1.1), ti: b.ti });
    if (b.isMe) { fx('shake', .35); fx('buzz', 35); }
  }
  b.hp -= dmg;
  const ang = Math.atan2(b.x - a.x, b.z - a.z);
  push(b, Math.sin(ang) * kb, Math.cos(ang) * kb, blocked ? 0 : .22);
  if (b.hp <= 0) die(b, a, ang);
}
function shoot(u, tg, fromY = 1.6) {
  const lead = .35 + Math.hypot(tg.x - u.x, tg.z - u.z) / 30;
  const tx = tg.x + tg.vx * lead + rnd(-.8, .8), tz = tg.z + tg.vz * lead + rnd(-.8, .8);
  const d = Math.hypot(tx - u.x, tz - u.z), y0 = (u.y || 0) + fromY;
  G.arrows.push(makeArrow({ id: ++G.arrowN, x0: u.x, y0, z0: u.z, x1: tx, z1: tz, y1: groundY(tx, tz) + 1.1, dur: .25 + d / 28, peak: Math.min(6, d * .16), ti: u.ti, t: 0, shooter: u }));
  if (!u.tower) u.swing = .38;
  sound('bow', u.x, u.z);
}
export function makeArrow(a) { a.x = a.x0; a.y = a.y0; a.z = a.z0; a.px = a.x0; a.py = a.y0; a.pz = a.z0; return a; }
function arrowHit(a, b) {
  let dmg = STATS.arch.arrow * rnd(.8, 1.2) * aiDmg(a.ti);
  if (b.kind === 'spear') dmg *= 1.5;
  b.lastHit = G.T;
  if (b.mounted && Math.random() < .6) { horseDamage(b, dmg); return; }
  const frontal = Math.abs(angDiff(b.face, Math.atan2(a.x0 - b.x, a.z0 - b.z))) < 1.1;
  let blocked = false;
  if (frontal && !b.mounted && !b.carrying) {
    if (b.kind === 'foot' && Math.random() < .7) blocked = true;
    if (b.leader && (b.human ? b.blocking : Math.random() < .35)) blocked = true;
  }
  if (blocked) { spark(b.x, b.y + 1.3, b.z, '#e8d9b0', 4); sound('thud', b.x, b.z); b.blockT = Math.max(b.blockT, .2); return; }
  b.hp -= dmg; spark(b.x, b.y + 1.3, b.z, TEAMS[b.ti].css, 4); sound('hit', b.x, b.z);
  push(b, 0, 0, .12);
  if (b.isMe) { fx('shake', .25); fx('buzz', 20); }
  const sh = a.shooter;
  if (b.hp <= 0) die(b, sh && !sh.dead && !sh.tower ? sh : { ti: a.ti, human: false, leader: false }, Math.atan2(b.x - a.x0, b.z - a.z0));
}
function die(u, killer, ang) {
  if (u.dead) return;
  u.dead = true; u.deadT = 0;
  u.vx += Math.sin(ang) * 6; u.vz += Math.cos(ang) * 6; u.vy = rnd(3, 6);
  u.fallDir = Math.random() < .5 ? 1 : -1;
  fx('splat', { x: u.x, z: u.z, s: rnd(1, 1.5), ti: u.ti }); sound('die', u.x, u.z);
  if (u.mounted) dismount(u, false);
  if (u.summon) { u.summon.state = 'leaving'; u.summon.t = 0; u.summon = null; }
  if (u.carrying) dropFlag(u);
  const s = G.teams[u.ti];
  if (G.mode === 'dm') {
    s.tickets = Math.max(0, s.tickets - (u.leader ? 5 : 1));
    if (s.tickets <= 0 && s.alive) { s.alive = false; say('tickets0', u.ti); }
  }
  if (killer) {
    const bounty = G.mode === 'dm' && u.leader && u.ti === G.bounty;
    const reward = u.leader ? (bounty ? 50 : 25) : 8;
    G.teams[killer.ti].gold += reward;
    if (killer.human && killer.ti === G.myTi) G.kills++;
    if (killer.human) say('gold', killer.ti, Math.round(u.x * 10) / 10, Math.round(u.z * 10) / 10, reward);
    if (bounty) say('bountyClaimed', killer.ti);
    if (u.leader) say('capDown', u.ti, killer.ti);
  }
  if (u.leader) {
    s.leaderDeadT = u.human ? 5 : 9;
    if (u.human) say('fell', u.ti, canRespawn(u.ti) ? 1 : 0);
  }
  checkEnd();
}
function destroyCastle(i, by) {
  const s = G.teams[i]; s.alive = false; s.points = 0;
  say('castleDown', i, by);
  checkEnd();
}

// ---------- win conditions (by alliance) ----------
export function teamOut(i) {
  const s = G.teams[i];
  if (G.mode === 'conquest') return !s.alive;
  if (G.mode === 'dm') return !s.alive && !G.units.some(u => !u.dead && u.ti === i);
  return false;
}
export const teamScore = i => { const s = G.teams[i]; return G.mode === 'conquest' ? s.points : G.mode === 'dm' ? s.tickets : s.caps; };
export const allianceCaps = a => G.teams.reduce((s, t, i) => s + (G.ALLY[i] === a ? t.caps : 0), 0);
const alliancesIn = () => [...new Set(TEAMS.map((_, i) => i).filter(i => !teamOut(i)).map(i => G.ALLY[i]))];
export function checkEnd() {
  if (G.state !== 'play' || G.role === 'client') return;
  if (G.mode === 'conquest' || G.mode === 'dm') {
    const inA = alliancesIn();
    if (inA.length === 1) return endMatch(inA[0], G.mode === 'conquest' ? 'castles' : 'tickets');
    if (inA.length === 0) return endMatch(-1, 'time');
  }
  if (G.mode === 'ctf') for (const a of new Set(G.ALLY)) if (allianceCaps(a) >= CAPS_TO_WIN) return endMatch(a, 'caps');
}
function checkTime() {
  if (G.state !== 'play' || G.T < MODES[G.mode].time) return;
  const scores = {};
  TEAMS.forEach((_, i) => { if (G.mode === 'conquest' && !G.teams[i].alive) return; scores[G.ALLY[i]] = (scores[G.ALLY[i]] || 0) + teamScore(i); });
  const e = Object.entries(scores).map(([a, v]) => [+a, v]).sort((x, y) => y[1] - x[1]);
  if (!e.length || (e.length > 1 && e[0][1] === e[1][1])) return endMatch(-1, 'time');
  endMatch(e[0][0], 'time');
}
export function endMatch(w, why) {
  if (G.state !== 'play') return;
  G.state = 'end'; G.endInfo = { w, why };
  bus.emit('end', G.endInfo);
}

// ---------- capture the fort ----------
function dropFlag(u) {
  const f = G.flag; u.carrying = false; f.state = 'dropped'; f.carrier = null; f.x = u.x; f.z = u.z; f.dropT = 10;
  say('flagDropped', u.ti);
}
function updateFlag(dt) {
  const f = G.flag; if (!f) return;
  if (f.state === 'carried') {
    const c = f.carrier, t = TEAMS[c.ti];
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

// ---------- captain actions ----------
export function softAim(p) {
  let best = null, bs = 1e9;
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, p)) continue;
    const d = Math.hypot(o.x - p.x, o.z - p.z); if (d > 3.4) continue;
    const score = d + Math.abs(angDiff(p.face, Math.atan2(o.x - p.x, o.z - p.z))) * 1.5;
    if (score < bs) { bs = score; best = o; }
  }
  return best;
}
export function captainAttack(p) {
  if (!p || p.dead || p.carrying) return;
  if (p.mounted) { startSweep(p); return; }
  const best = softAim(p);
  if (best) { if (startSwing(p, best)) p.face = Math.atan2(best.x - p.x, best.z - p.z); return; }
  const [ci, cd] = nearestEnemyCastle(p);
  if (ci >= 0 && cd < CASTLE_REACH + .6) { if (startSwing(p, { castle: ci })) p.face = Math.atan2(TEAMS[ci].pos[0] - p.x, TEAMS[ci].pos[1] - p.z); return; }
  startSwing(p, null);
}

// ---------- navigation ----------
function fortNav(u, gx, gz) {
  const inside = r => r < 5.2, ru = Math.hypot(u.x, u.z), rg = Math.hypot(gx, gz);
  if (inside(ru) === inside(rg)) return null;
  const outer = inside(ru) ? [gx, gz] : [u.x, u.z];
  const gA = Math.round(Math.atan2(outer[1], outer[0]) / (Math.PI / 2)) * (Math.PI / 2);
  const gx2 = Math.cos(gA), gz2 = Math.sin(gA);
  if (inside(ru)) return [gx2 * 8.5, gz2 * 8.5];
  if (Math.abs(-u.x * gz2 + u.z * gx2) > .9) return [gx2 * 8.5, gz2 * 8.5];
  return [gx, gz];
}
function nav(u, gx, gz) {
  if (G.layout.withFort && Math.hypot(u.x, u.z) < 14) { const f = fortNav(u, gx, gz); if (f) return f; }
  if (G.map.id !== 'river') return [gx, gz];
  const side = z => z > 5 ? 1 : z < -5 ? -1 : 0;
  const su = side(u.z), sg = side(gz);
  if (su === sg) return [gx, gz];
  let cx = -32, best = 1e9;
  for (const c of [-32, 0, 32]) { const cost = Math.abs(u.x - c) + Math.abs(gx - c); if (cost < best) { best = cost; cx = c; } }
  const lane = cx === 0 ? 9 : 1.4;
  if (su !== 0) {
    const lx = cx + clamp(u.x - cx, -lane * .6, lane * .6);
    return Math.abs(u.x - cx) > lane ? [lx, su * 6.5] : [lx, -su * 6.5];
  }
  return [clamp(u.x, cx - lane * .8, cx + lane * .8), (sg || 1) * 6.5];
}
export function moveToward(u, gx, gz, spd, dt, stopAt = .3) {
  const dx = gx - u.x, dz = gz - u.z, d = Math.hypot(dx, dz);
  let tvx = 0, tvz = 0;
  if (d > stopAt) { const s = spd * Math.min(1, (d - stopAt) / 1.2 + .2); tvx = dx / d * s; tvz = dz / d * s; }
  const k = u.stun > 0 ? 1.5 : u.mounted ? 4 : 10;
  u.vx += (tvx - u.vx) * Math.min(1, dt * k); u.vz += (tvz - u.vz) * Math.min(1, dt * k);
  return d;
}
const faceTo = (u, x, z, dt, rate = 9) => { u.face = turn(u.face, Math.atan2(x - u.x, z - u.z), dt * rate); };
function go(u, gx, gz, spd, dt, stopAt = .3) {
  const [nx, nz] = nav(u, gx, gz), direct = nx === gx && nz === gz;
  moveToward(u, nx, nz, spd, dt, direct ? stopAt : .2);
  if (Math.hypot(nx - u.x, nz - u.z) > .6) faceTo(u, nx, nz, dt, u.mounted ? 4 : 8);
  return Math.hypot(gx - u.x, gz - u.z);
}

// ---------- AI ----------
function planLeader(u, s) {
  const t = TEAMS[u.ti], squadN = squadOf(u.ti).length;
  if (G.mode === 'conquest') {
    const threat = G.units.some(o => !o.dead && isEnemy(o, u) && Math.hypot(o.x - t.pos[0], o.z - t.pos[1]) < 22);
    if (s.alive && (threat || squadN < 3)) { s.plan = { kind: 'defend' }; return; }
    let target = s.plan && s.plan.kind === 'castle' && G.teams[s.plan.ti].alive && Math.random() > .08 ? s.plan.ti : null;
    if (target == null) {
      const opts = G.teams.map((x, i) => i).filter(i => isEnemyTi(i, u.ti) && G.teams[i].alive)
        .sort((a, b) => Math.hypot(TEAMS[a].pos[0] - u.x, TEAMS[a].pos[1] - u.z) - Math.hypot(TEAMS[b].pos[0] - u.x, TEAMS[b].pos[1] - u.z));
      if (opts.length) target = opts[Math.random() < .7 ? 0 : Math.min(1, opts.length - 1)];
    }
    s.plan = target == null ? { kind: 'defend' } : { kind: 'castle', ti: target };
  } else if (G.mode === 'dm') {
    if (squadN < 2 && s.tickets > 0 && s.gold >= 40) { s.plan = { kind: 'defend' }; return; }
    const [cap] = nearestFoe(u, 400, o => o.leader), [any] = nearestFoe(u, 400);
    const bl = G.bounty >= 0 && isEnemyTi(G.bounty, u.ti) && Math.random() < .5 ? G.teams[G.bounty].leader : null;
    s.plan = { kind: 'hunt', target: (bl && !bl.dead) ? bl : (cap || any) };
  } else {
    const f = G.flag;
    if (u.carrying) s.plan = { kind: 'home' };
    else if (f.state === 'carried') s.plan = { kind: isEnemy(f.carrier, u) ? 'hunt' : 'escort', target: f.carrier };
    else s.plan = { kind: 'banner' };
  }
}
function planGoal(u, s) {
  const p = s.plan; if (!p) return null;
  const t = TEAMS[u.ti];
  switch (p.kind) {
    case 'defend': { const [gx, gz] = gatePos(t, 0, 1); return { x: gx, z: gz, stop: 1.5 }; }
    case 'castle': return { x: TEAMS[p.ti].pos[0], z: TEAMS[p.ti].pos[1], stop: CASTLE_REACH - .8, castle: p.ti };
    case 'hunt': case 'escort': return p.target && !p.target.dead ? { x: p.target.x, z: p.target.z, stop: p.kind === 'escort' ? 3 : 1.5 } : null;
    case 'home': { const [gx, gz] = gatePos(t); return { x: gx, z: gz, stop: .5 }; }
    case 'banner': return { x: G.flag.x, z: G.flag.z, stop: .2 };
  }
  return null;
}
function aiHorse(u, dist) {
  if (u.carrying) { if (u.mounted) dismount(u, false); return; }
  if (!u.mounted && !u.summon && dist > 30 && !(u.foe && u.fd < 14)) summonHorse(u);
  const pk = G.teams[u.ti].plan && G.teams[u.ti].plan.kind;
  if (u.mounted && (dist < (pk === 'hunt' ? 6 : 12) || spearNear(u, G.diff === 2 ? 11 : 7))) dismount(u, false);
}
function thinkLeader(u, s, dt) {
  s.thinkT -= dt;
  if (s.thinkT <= 0 || !s.plan) { s.thinkT = rnd(1.2, 2.4); planLeader(u, s); }
  const foe = u.foe, fd = u.fd;
  if (foe && fd < (u.mounted ? 12 : 10) && !u.carrying && !(s.plan && s.plan.kind === 'escort' && fd > 5)) {
    if (u.mounted) {
      if (spearNear(u, 7)) dismount(u, false);
      const inv = 1 / Math.max(fd, .1);
      go(u, foe.x + (foe.x - u.x) * inv * 4, foe.z + (foe.z - u.z) * inv * 4, speedOf(u), dt, .1);
      if (fd < 3) startSweep(u);
    } else {
      go(u, foe.x, foe.z, speedOf(u), dt, u.r + foe.r + u.reach * .6); faceTo(u, foe.x, foe.z, dt);
      if (fd < u.r + foe.r + u.reach) startSwing(u, foe);
    }
    return;
  }
  const g = planGoal(u, s);
  if (!g) { moveToward(u, u.x, u.z, 0, dt); s.thinkT = Math.min(s.thinkT, .3); return; }
  aiHorse(u, Math.hypot(g.x - u.x, g.z - u.z));
  const d = go(u, g.x, g.z, speedOf(u), dt, g.stop);
  if (g.castle != null) { if (d < CASTLE_REACH && !u.mounted) { faceTo(u, g.x, g.z, dt, 6); startSwing(u, { castle: g.castle }); } }
  else if (s.plan.kind === 'defend' && d < 2) faceTo(u, 0, 0, dt, 3);
}
function slotPos(anchor, front, idx, isArch, meleeN) {
  const row = Math.floor(idx / 4), lat = (idx % 4 - 1.5) * 1.55;
  const back = isArch ? (front ? 2.0 + row * 1.6 : 1.8 + Math.ceil(meleeN / 4) * 1.6 + row * 1.6) : (front ? -(2.2 + row * 1.6) : 1.8 + row * 1.6);
  const f = anchor.face, fx = Math.sin(f), fz = Math.cos(f), rx = Math.cos(f), rz = -Math.sin(f);
  return [anchor.x - fx * back + rx * lat, anchor.z - fz * back + rz * lat];
}
function thinkSoldier(u, dt) {
  const s = G.teams[u.ti], L = s.leader, leaderUp = L && !L.dead;
  const myOrder = s.human ? (s.order || 'follow') : (leaderUp ? 'follow' : 'charge');
  const st = STATS[u.kind];
  const range = u.kind === 'arch' ? st.range * (G.map.id === 'frost' && u.y > 3 ? 1.3 : 1) : 0;
  u.aim = false;
  if (u.kind === 'spear' && myOrder !== 'charge') {
    const [rider, rd] = nearestFoe(u, 9, o => o.mounted);
    if (rider) { moveToward(u, u.x, u.z, 0, dt); faceTo(u, rider.x, rider.z, dt, 10); if (rd < u.r + rider.r + u.reach) startSwing(u, rider); return; }
  }
  const engage = myOrder === 'charge' ? 45 : u.kind === 'arch' ? range : myOrder === 'hold' ? 8 : 10;
  const foe = u.foe, fd = u.fd;
  const leash = myOrder === 'follow' && leaderUp && foe && Math.hypot(foe.x - L.x, foe.z - L.z) > 18;
  if (foe && fd < engage && !leash) {
    if (u.kind === 'arch') {
      if (fd < u.r + foe.r + u.reach) { startSwing(u, foe); faceTo(u, foe.x, foe.z, dt); moveToward(u, u.x, u.z, 0, dt); }
      else if (fd < 5.5) { moveToward(u, u.x - (foe.x - u.x), u.z - (foe.z - u.z), u.spd, dt); faceTo(u, foe.x, foe.z, dt, 6); }
      else if (fd <= range) {
        u.aim = true; moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 8);
        if (u.shootCd <= 0 && u.stun <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { shoot(u, foe); u.shootCd = st.shoot * rnd(.85, 1.2); }
      } else go(u, foe.x, foe.z, u.spd, dt, range * .8);
    } else {
      go(u, foe.x, foe.z, speedOf(u), dt, u.r + foe.r + u.reach * .7); faceTo(u, foe.x, foe.z, dt);
      if (fd < u.r + foe.r + u.reach) startSwing(u, foe);
    }
    return;
  }
  const [ci, cd] = nearestEnemyCastle(u);
  if (myOrder === 'charge') {
    if (G.mode === 'conquest' && ci >= 0) {
      const tp = TEAMS[ci].pos; go(u, tp[0], tp[1], u.spd, dt, CASTLE_REACH - 1);
      if (cd < CASTLE_REACH) { faceTo(u, tp[0], tp[1], dt, 6); startSwing(u, { castle: ci }); }
    } else if (G.mode === 'ctf') {
      const f = G.flag, tgt = f.state === 'carried' && isEnemy(f.carrier, u) ? f.carrier : f;
      go(u, tgt.x, tgt.z, u.spd, dt, 1);
    } else { const [f2] = nearestFoe(u, 300); if (f2) go(u, f2.x, f2.z, u.spd, dt, 1); else go(u, 0, 0, u.spd, dt, 4); }
    return;
  }
  if (G.mode === 'conquest' && ci >= 0 && cd < CASTLE_REACH && myOrder === 'follow' && leaderUp && !L.mounted && Math.hypot(L.x - TEAMS[ci].pos[0], L.z - TEAMS[ci].pos[1]) < CASTLE_REACH + 6) {
    faceTo(u, TEAMS[ci].pos[0], TEAMS[ci].pos[1], dt, 6); moveToward(u, u.x, u.z, 0, dt); startSwing(u, { castle: ci }); return;
  }
  const anchor = myOrder === 'hold' && s.holdPt ? s.holdPt : leaderUp ? L : null;
  if (anchor) {
    const [gx, gz] = slotPos(anchor, anchor.isFront || !!anchor.human, u.slot || 0, u.kind === 'arch', u.meleeN || 0);
    const d = go(u, gx, gz, u.spd * (Math.hypot(gx - u.x, gz - u.z) > 6 ? 1.15 : 1), dt);
    if (d < 1) u.face = turn(u.face, anchor.face, dt * 6);
  } else { const [gx, gz] = gatePos(TEAMS[u.ti], 0, 2); go(u, gx, gz, u.spd, dt, 3); }
}
function aiPick(ti) {
  const r = Math.random();
  if (G.diff === 2) {
    const foes = TEAMS.map((_, i) => i).filter(i => G.teams[i].human && isEnemyTi(i, ti));
    const sq = foes.flatMap(i => squadOf(i)), c = k => sq.filter(u => u.kind === k).length;
    const f = c('foot'), s = c('spear'), a = c('arch');
    if (foes.some(i => G.teams[i].leader && G.teams[i].leader.mounted) && r < .5) return 'spear';
    if (a >= f && a >= s) return r < .7 ? 'foot' : 'spear';
    if (f >= s) return r < .7 ? 'spear' : 'arch';
    return r < .7 ? 'arch' : 'foot';
  }
  return r < .45 ? 'foot' : r < .75 ? 'spear' : 'arch';
}

// ---------- physics ----------
export function integrate(u, dt, pz) {
  u.x += u.vx * dt; u.z += u.vz * dt;
  for (const o of G.layout.obstacles) {
    const dx = u.x - o.x, dz = u.z - o.z, min = o.r + u.r;
    if (Math.abs(dx) > min || Math.abs(dz) > min) continue;
    const d = Math.hypot(dx, dz);
    if (d < min && d > 0) { u.x = o.x + dx / d * min; u.z = o.z + dz / d * min; }
  }
  if (G.map.id === 'river') {
    if (inRiver(u.x, u.z) && !onBridge(u.x) && Math.abs(u.x) >= 14) u.z = (pz >= 0 ? 1 : -1) * 5.05;
    if (Math.abs(u.z) < 5 && onBridge(u.x) && Math.abs(u.x) > 20) { const bx = u.x < 0 ? -32 : 32; u.x = clamp(u.x, bx - 2.1, bx + 2.1); }
  }
  u.x = clamp(u.x, -WORLD_LIMIT, WORLD_LIMIT); u.z = clamp(u.z, -WORLD_LIMIT, WORLD_LIMIT);
  u.y = groundY(u.x, u.z);
}
// Drives a captain from a move vector in world space (the joystick, already turned by the camera).
export function driveCaptain(p, input, dt) {
  p.blocking = !!input.block && !p.mounted;
  const spd = speedOf(p) * (p.swing > 0 && !p.mounted ? .6 : 1);
  moveToward(p, p.x + input.wx * 3, p.z + input.wz * 3, spd * input.mag, dt, .05);
  if (input.mag > .15 && (p.swing <= 0 || p.mounted)) p.face = turn(p.face, Math.atan2(input.wx, input.wz), dt * (p.mounted ? 4.5 : p.blocking ? 5 : 12));
  if (p.blocking && input.mag < .15) p.face = turn(p.face, input.camYaw, dt * 6);
}

// ---------- the main step (solo and host) ----------
export function update(dt, input) {
  G.T += dt;
  G.teams.forEach((s, i) => {
    if (canRecruit(i)) s.gold += dt * (s.human ? 3 : DIFF[G.diff].income);
    if (!s.human && canRecruit(i)) { s.recruitT -= dt; if (s.recruitT <= 0) { s.recruitT = rnd(3, 6); recruit(i, aiPick(i)); } }
    if (s.leader.dead && canRespawn(i)) {
      s.leaderDeadT -= dt;
      if (s.leaderDeadT <= 0) {
        const [gx, gz] = gatePos(TEAMS[i], 0, 7);
        const L = mkUnit(i, gx, gz, 'captain', s.human); s.leader = L; s.plan = null;
        if (i === G.myTi) { G.player = L; bus.emit('respawnMe', L); }
        if (s.human) say('respawn', i);
      }
    }
  });
  if (G.mode === 'dm') {
    const sorted = G.teams.map((s, i) => [s.tickets, i]).filter(x => G.teams[x[1]].alive).sort((a, b) => b[0] - a[0]);
    const nb = sorted.length > 1 && sorted[0][0] - sorted[1][0] >= 10 ? sorted[0][1] : -1;
    if (nb !== G.bounty) { G.bounty = nb; if (nb >= 0) say('bounty', nb); }
  }
  const p = G.player;
  if (p && !p.dead && input) { driveCaptain(p, input, dt); if (input.attackHeld && p.cd <= 0) captainAttack(p); }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && !L.dead) { const [f] = nearestFoe(L, 12); if (!f && L.hp < L.max) L.hp = Math.min(L.max, L.hp + dt * 6); } }

  const slotIdx = [0, 0, 0, 0], archIdx = [0, 0, 0, 0], meleeN = [0, 0, 0, 0];
  for (const u of G.units) if (!u.dead && !u.leader && u.kind !== 'arch') meleeN[u.ti]++;
  for (const u of G.units) {
    if (u.dead) continue;
    u.cd -= dt; u.shootCd -= dt; u.stun -= dt; u.blockT -= dt; u.rt -= dt; u.trampleT -= dt;
    if (u.horseCd > 0) u.horseCd -= dt;
    if (u.swing > 0) u.swing -= dt;
    if (u.pending) { u.pending.t -= dt; if (u.pending.t <= 0) resolveSwing(u); }
    if (u.rt <= 0) { u.rt = rnd(.25, .4); [u.foe, u.fd] = nearestFoe(u, 50); }
    if (u.foe && u.foe.dead) { u.foe = null; u.fd = 1e9; }
    if (u.foe) u.fd = Math.hypot(u.foe.x - u.x, u.foe.z - u.z);
    if (u.human || u.dead) continue;
    if (u.leader) thinkLeader(u, G.teams[u.ti], dt);
    else { u.slot = u.kind === 'arch' ? archIdx[u.ti]++ : slotIdx[u.ti]++; u.meleeN = meleeN[u.ti]; thinkSoldier(u, dt); }
  }

  for (const h of G.horses) {
    h.t += dt;
    if (h.state === 'coming') {
      const r = h.rider;
      if (r.dead || r.summon !== h) { h.state = 'leaving'; h.t = 0; continue; }
      const dx = r.x - h.x, dz = r.z - h.z, d = Math.hypot(dx, dz) || .01;
      h.face = Math.atan2(dx, dz); const s = Math.min(16, d * 4);
      h.x += dx / d * s * dt; h.z += dz / d * s * dt; h.spd = s;
      if (d < 1.3) mountUp(r, h);
    } else if (h.state === 'ridden') { const r = h.rider; h.x = r.x; h.z = r.z; h.face = r.face; h.spd = Math.hypot(r.vx, r.vz); }
    else if (h.state === 'leaving') { h.x += Math.sin(h.face) * 10 * dt; h.z += Math.cos(h.face) * 10 * dt; h.spd = 10; }
  }
  G.horses = G.horses.filter(h => !((h.state === 'leaving' && h.t > 3) || (h.state === 'dead' && h.t > 8)));

  for (const r of G.units) {
    if (r.dead || !r.mounted) continue;
    const sp = Math.hypot(r.vx, r.vz);
    for (const o of G.units) {
      if (o.dead || !isEnemy(o, r) || o.mounted) continue;
      const dx = o.x - r.x, dz = o.z - r.z; if (Math.abs(dx) > 4 || Math.abs(dz) > 4) continue;
      const d = Math.hypot(dx, dz);
      if (o.kind === 'spear' && d < o.r + r.r + 1.6 && braced(o) && sp > 4 && Math.abs(angDiff(o.face, Math.atan2(r.x - o.x, r.z - o.z))) < 1.0) {
        horseDamage(r, 55); if (r.mounted) dismount(r, true);
        spark(o.x, o.y + 1.5, o.z, '#fff3b0', 8); sound('clang', o.x, o.z);
        fx('float', { x: o.x, y: o.y + 2.8, z: o.z, text: 'Spear wall!', color: TEAMS[o.ti].css });
        break;
      }
      if (sp > 6 && d < o.r + r.r + .3 && o.trampleT <= 0) {
        o.trampleT = .8; o.lastHit = G.T;
        const ang = Math.atan2(dx, dz);
        push(o, Math.sin(ang) * 10 + r.vx * .5, Math.cos(ang) * 10 + r.vz * .5, .7);
        o.hp -= 12 * aiDmg(r.ti);
        spark(o.x, o.y + 1, o.z, '#c9b28a', 6); sound('trample', o.x, o.z);
        if (o.hp <= 0) die(o, r, ang);
      }
    }
    if (Math.random() < dt * sp * .9) sound('hoof', r.x, r.z);
  }

  // separation: a simple push apart so crowds never overlap
  const live = G.units.filter(u => !u.dead);
  for (let i = 0; i < live.length; i++) {
    const a = live[i];
    for (let j = i + 1; j < live.length; j++) {
      const b = live[j], dx = b.x - a.x, dz = b.z - a.z, min = a.r + b.r;
      if (dx > min || dx < -min || dz > min || dz < -min) continue;
      const d = Math.hypot(dx, dz) || .01; if (d >= min) continue;
      const ov = (min - d) / 2, nx = dx / d, nz = dz / d;
      let wa = a.remote ? 0 : a.human || a.mounted ? .4 : 1, wb = b.remote ? 0 : b.human || b.mounted ? .4 : 1;
      if (wa === 0) wb = 2; if (wb === 0) wa = 2;
      a.x -= nx * ov * wa; a.z -= nz * ov * wa; b.x += nx * ov * wb; b.z += nz * ov * wb;
    }
  }
  for (const u of G.units) {
    if (u.dead) { fallStep(u, dt); continue; }
    if (u.remote) { u.y = groundY(u.x, u.z); continue; } // moved by their own phone
    integrate(u, dt, u.z);
  }
  G.units = G.units.filter(u => !(u.dead && u.deadT > 14));

  // castle towers shoot at enemies near their walls
  TEAMS.forEach((t, i) => {
    const s = G.teams[i];
    if (G.mode === 'conquest' && !s.alive) return;
    s.towerT -= dt; if (s.towerT > 0) return;
    s.towerT = 1.4;
    const [f] = nearestFoe({ x: t.pos[0], z: t.pos[1], ti: i }, 24);
    if (f) shoot({ x: t.pos[0], z: t.pos[1], y: 0, vx: 0, vz: 0, ti: i, tower: true }, f, 5.5);
  });

  arrowsTick(dt, true);
  updateFlag(dt);
  checkTime();
}
export function fallStep(u, dt) {
  u.deadT += dt;
  u.x += u.vx * dt; u.z += u.vz * dt; u.vy -= 18 * dt;
  const gy = groundY(u.x, u.z); u.y = Math.max(gy, u.y + u.vy * dt);
  const f = Math.pow(u.y > gy ? .6 : .03, dt); u.vx *= f; u.vz *= f;
}
export function arrowsTick(dt, authoritative) {
  for (const a of G.arrows) {
    if (a.stuck) { a.life -= dt; continue; }
    a.t += dt / a.dur;
    const t = Math.min(1, a.t);
    const x = a.x0 + (a.x1 - a.x0) * t, z = a.z0 + (a.z1 - a.z0) * t, y = a.y0 + (a.y1 - a.y0) * t + a.peak * 4 * t * (1 - t);
    a.px = a.x; a.py = a.y; a.pz = a.z; a.x = x; a.y = y; a.z = z;
    if (G.map.id === 'forest' && y < 7) {
      for (const tr of G.layout.treeColliders) if (Math.abs(tr.x - x) < tr.r && Math.abs(tr.z - z) < tr.r && Math.hypot(tr.x - x, tr.z - z) < tr.r) { a.stuck = true; a.life = 2; sound('thud', x, z); spark(x, y, z, '#6b4a2e', 3); break; }
      if (a.stuck) continue;
    }
    if (a.t >= 1) {
      if (authoritative) {
        let best = null, bd = 1.0;
        for (const o of G.units) { if (o.dead || !isEnemyTi(o.ti, a.ti)) continue; const d = Math.hypot(o.x - a.x1, o.z - a.z1) - (o.mounted ? .5 : 0); if (d < bd) { bd = d; best = o; } }
        if (best) { arrowHit(a, best); a.done = true; } else { a.stuck = true; a.life = 3; }
      } else { a.stuck = true; a.life = 2.5; }
    }
  }
  G.arrows = G.arrows.filter(a => !(a.done || (a.stuck && a.life <= 0)));
}
