// Battle rules: units, combat, horses, the banner, AI and win conditions.
// Engine-agnostic: talks to the outside world only through G (state) and bus (events).
import { ECON, TEAMS, MODES, STATS, DIFF, HUMAN_CAPTAIN, HORSE_HP, HORSE_CD, DM_TICKETS, CAPS_TO_WIN, CASTLE_R, CASTLE_REACH, RECRUITS, WORLD_LIMIT, START_SQUAD, FULL_SQUAD, UPGRADES, FOOT_TIERS, ARCH_TIERS, CAPTAIN_TIERS, JAVELIN, VOLLEY, CTRL, AURA, WEAPONS, CAPTAIN_COMBAT } from '../config.js';
import { G, bus, isEnemy, isEnemyTi, colorOf, activeArmies } from './state.js';
import { groundY, inFord, inRiver, onBridge, gatePos, makeLayout, clamp, rnd, angDiff, turn } from './world.js';
import { buildNav, syncGates, nearObstacles, nearBlockers, gateShut, los, findPath, openGoal, walkable } from './nav.js';

// ---------- announcements & effects (presentation listens) ----------
export const say = (k, ...a) => bus.emit('msg', { k, a });
const fx = (type, d) => bus.emit(type, d);
const spark = (x, y, z, c, n) => fx('spark', { x, y, z, c, n });
const sound = (name, x, z) => fx('sfx', { name, x, z });

// ---------- setup ----------
// Armies 0-3 are each castle's own army; 4-7 are its Duo teammate's, real only when active[i].
// Castle strength (points/alive, conquest only) is only ever read/written on the color's own
// army (0-3): a Duo teammate's army shares its castle rather than owning one.
export function newTeams(humans, active = [1, 1, 1, 1, 0, 0, 0, 0]) {
  return Array.from({ length: 8 }, (_, i) => ({ points: 100, tickets: DM_TICKETS, caps: 0, ctrlScore: 0, gold: ECON.startGold, alive: true, plan: null, leaderDeadT: 0, recruitT: rnd(2, 6), thinkT: 0,
    human: !!humans[i], active: !!active[i], order: 'follow', holdPt: null, towerT: rnd(0, 1.4), leader: null,
    up: { foot1: 0, foot2: 0, arch1: 0, arch2: 0, aura: 0, horse: 0 }, arrowHits: 0, shieldwallT: 0, volleyCd: 0, upT: rnd(20, 40) }));
}
export function mkUnit(ti, x, z, kind, human = false) {
  const st = STATS[kind];
  const tier = kind === 'foot' || kind === 'captain' ? footTier(ti) : kind === 'arch' ? archTier(ti) : 0;
  const base = kind === 'foot' ? FOOT_TIERS[tier] : kind === 'arch' ? ARCH_TIERS[tier] : st;
  const capB = kind === 'captain' ? CAPTAIN_TIERS[tier] : null;
  const u = { id: ++G.uid, ti, kind, leader: kind === 'captain', human, isMe: human && ti === G.myTi && G.role !== 'client', remote: human && ti !== G.myTi,
    x, z, y: groundY(x, z), vx: 0, vz: 0, vy: 0, face: Math.atan2(-x, -z),
    hp: base.hp + (capB ? capB.hpB : 0), max: base.hp + (capB ? capB.hpB : 0),
    dmg: (human ? HUMAN_CAPTAIN.dmg : base.dmg) + (capB ? capB.dmgB : 0), spd: human ? HUMAN_CAPTAIN.spd : base.spd, r: base.r, reach: base.reach + (capB ? capB.reachB : 0),
    block: base.block || 0, range: base.range || 0, shootBase: base.shoot || 0, arrow: base.arrow || 0, jitter: base.jitter || .8,
    javelin: capB ? capB.javelin : !!base.javelin, javCd: 0, tier,
    cd: rnd(0, .6), shootCd: rnd(0, 1.5), swing: 0, pending: null, stun: 0, blockT: 0, rt: rnd(0, .3), foe: null, fd: 1e9,
    dead: false, deadT: 0, trampleT: 0, lastHit: -9, blocking: false, aim: false,
    mounted: false, horse: null, summon: null, horseHp: horseMax(ti), horseCd: 0, carrying: false, aura: false, shieldwall: false,
    kick: { n: 0, vx: 0, vz: 0, st: 0, dirty: false },
    // player captains: current weapon, jump state, javelin ammo, sword combo, buffered attack press
    weapon: kind === 'captain' && human ? ((G.teams[ti] && G.teams[ti].weapon) || 'sword') : undefined,
    jy: 0, jvy: 0, jumpCd: 0, javAmmo: CAPTAIN_COMBAT.jav.ammo + tier, javRegen: 0, combo: 0, lastSwingT: -9, atkBuf: 0 };
  G.units.push(u); return u;
}
export const squadOf = ti => G.units.filter(u => !u.dead && u.ti === ti && !u.leader);

export function startMatch(humans, active = [1, 1, 1, 1, 0, 0, 0, 0]) {
  G.layout = makeLayout(G.map.id, G.mode === 'ctf', G.mode === 'ctrl', G.seed); buildNav(G.layout);
  G.units = []; G.horses = []; G.arrows = [];
  G.T = 0; G.kills = 0; G.recruited = 0; G.bounty = -1; G.uid = 0; G.arrowN = 0; G.endInfo = null; G.awarded = false;
  G.teams = newTeams(humans, active);
  G.duo = [0, 1, 2, 3].map(c => !!active[c + 4]);
  G.flag = G.mode === 'ctf' ? { state: 'home', x: 0, z: 0, carrier: null, dropT: 0 } : null;
  G.ctrlPoints = G.mode === 'ctrl' ? makeCtrlPoints(G.layout) : null;
  for (let i = 0; i < 8; i++) {
    if (!G.teams[i].active) continue;
    const t = TEAMS[colorOf(i)], duo = i >= 4; // a Duo army musters a little further back so it doesn't spawn on top of its teammate
    const [gx, gz] = gatePos(t, duo ? 9 : 0, 7);
    G.teams[i].leader = mkUnit(i, gx, gz, 'captain', G.teams[i].human);
    const start = (G.fullSquads ? FULL_SQUAD : START_SQUAD).slice(0, G.squadCap);
    start.forEach((n0, n) => { const [sx, sz] = gatePos(t, ((n % 7) - 3) * 1.4 + (duo ? 9 : 0), 1.5 + Math.floor(n / 7) * 1.4); mkUnit(i, sx, sz, n0); });
  }
  G.player = G.teams[G.myTi].leader;
  G.state = 'play';
  say('start');
}

export function setOrder(ti, o) {
  const s = G.teams[ti]; s.order = o;
  const cap = s.leader;
  if (o === 'hold' && cap) s.holdPt = { x: cap.x, z: cap.z, face: cap.face, isFront: true };
}
export function canRecruit(ti) { const s = G.teams[ti]; return G.mode === 'conquest' ? G.teams[colorOf(ti)].alive : G.mode === 'dm' ? s.tickets > 0 : true; }
export function recruit(ti, kind) {
  const s = G.teams[ti], cost = STATS[kind].cost;
  if (!canRecruit(ti) || s.gold < cost || squadOf(ti).length >= G.squadCap) return false;
  s.gold -= cost;
  const [gx, gz] = gatePos(TEAMS[colorOf(ti)], rnd(-2, 2) + (ti >= 4 ? 9 : 0)); mkUnit(ti, gx, gz, kind);
  if (ti === G.myTi) { G.recruited++; sound('coin'); }
  return true;
}
// ---------- upgrades and the captain's aura ----------
const lvl = (ti, id) => (G.teams[ti] && G.teams[ti].up) ? G.teams[ti].up[id] : 0;
export const horseMax = ti => HORSE_HP + 30 * lvl(ti, 'horse');
export const horseCooldown = ti => HORSE_CD - 4 * lvl(ti, 'horse');
export const auraRange = ti => AURA.range + AURA.perRange * lvl(ti, 'aura');
export const auraBonus = ti => AURA.bonus + AURA.perBonus * lvl(ti, 'aura');
// Tier index (0/1/2) from how many of that line's upgrades are bought so far.
export const footTier = ti => Math.min(2, lvl(ti, 'foot1') + lvl(ti, 'foot2'));
export const archTier = ti => Math.min(2, lvl(ti, 'arch1') + lvl(ti, 'arch2'));
export const upgradeCost = (ti, id) => {
  const def = UPGRADES.find(u => u.id === id);
  if (!def) return null;
  const l = lvl(ti, id);
  return l >= def.cost.length ? null : def.cost[l];
};
// Applying a tier retroactively updates every already-recruited unit of that kind, matching
// how the old dmg/armor/speed upgrades already worked live via lvl() — bought mid-battle, felt
// immediately. HP changes preserve damage already taken rather than fully healing the unit.
function applyFootTier(ti) {
  const tier = footTier(ti), t = FOOT_TIERS[tier], cb = CAPTAIN_TIERS[tier];
  for (const u of G.units) {
    if (u.dead || u.ti !== ti) continue;
    if (u.kind === 'foot') {
      const nmax = t.hp; u.hp = Math.min(nmax, Math.max(1, u.hp + (nmax - u.max))); u.max = nmax;
      u.dmg = t.dmg; u.reach = t.reach; u.block = t.block; u.spd = t.spd; u.javelin = t.javelin; u.tier = tier;
    } else if (u.leader) {
      const nmax = STATS.captain.hp + cb.hpB; u.hp = Math.min(nmax, Math.max(1, u.hp + (nmax - u.max))); u.max = nmax;
      u.dmg = (u.human ? HUMAN_CAPTAIN.dmg : STATS.captain.dmg) + cb.dmgB;
      u.reach = STATS.captain.reach + cb.reachB; u.javelin = cb.javelin; u.tier = tier;
    }
  }
}
function applyArchTier(ti) {
  const tier = archTier(ti), t = ARCH_TIERS[tier];
  for (const u of G.units) {
    if (u.dead || u.ti !== ti || u.kind !== 'arch') continue;
    const nmax = t.hp; u.hp = Math.min(nmax, Math.max(1, u.hp + (nmax - u.max))); u.max = nmax;
    u.dmg = t.dmg; u.spd = t.spd; u.range = t.range; u.shootBase = t.shoot; u.arrow = t.arrow; u.jitter = t.jitter; u.tier = tier;
  }
}
export function buyUpgrade(ti, id) {
  const s = G.teams[ti], cost = upgradeCost(ti, id);
  if (!s || cost == null || s.gold < cost || !UPGRADES.some(u => u.id === id)) return false;
  if (id === 'foot2' && lvl(ti, 'foot1') < 1) return false;
  if (id === 'arch2' && lvl(ti, 'arch1') < 1) return false;
  s.gold -= cost; s.up[id]++;
  if (id === 'foot1' || id === 'foot2') applyFootTier(ti);
  if (id === 'arch1' || id === 'arch2') applyArchTier(ti);
  if (id === 'horse' && s.leader && !s.leader.mounted) s.leader.horseHp = horseMax(ti);
  if (id === 'horse' && s.leader && s.leader.horseCd > horseCooldown(ti)) s.leader.horseCd = horseCooldown(ti);
  if (ti === G.myTi) { sound('coin'); say('upgrade', ti, id, s.up[id]); }
  return true;
}
// What a team's soldiers are doing: the human's order, or the computer's choice.
export const orderOf = ti => { const s = G.teams[ti], L = s.leader, up = L && !L.dead; return s.human ? (s.order || 'follow') : s.shieldwallT > 0 && up ? 'shieldwall' : up ? 'follow' : 'charge'; };
export function canRespawn(ti) { const s = G.teams[ti]; return G.mode === 'conquest' ? G.teams[colorOf(ti)].alive : G.mode === 'dm' ? s.tickets > 0 : true; }
function push(u, vx, vz, stun) {
  if (u.remote) { u.kick.vx += vx; u.kick.vz += vz; u.kick.st = Math.max(u.kick.st, stun || 0); u.kick.dirty = true; }
  else { u.vx += vx; u.vz += vz; }
  if (stun) u.stun = Math.max(u.stun, stun);
}

// ---------- horses ----------
export function speedOf(u) {
  let s = u.spd;
  if (u.mounted) s *= 1.8 * (1 + .05 * lvl(u.ti, 'horse'));
  if (!u.leader) { if (u.aura) s *= 1 + auraBonus(u.ti) * .5; if (u.shieldwall) s *= .55; }
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
  u.jy = 0; u.jvy = 0;
  u.summon = null; u.mounted = true; u.horse = h; h.state = 'ridden'; u.r = .95;
  if (u.isMe) fx('float', { x: u.x, y: u.y + 3.4, z: u.z, text: 'Mounted', color: '#fff' });
}
export function dismount(u, thrown) {
  if (!u.mounted) return;
  const h = u.horse; u.mounted = false; u.horse = null; u.r = STATS.captain.r;
  if (thrown) {
    h.state = 'dead'; h.t = 0; h.fall = Math.random() < .5 ? 1 : -1;
    u.horseCd = horseCooldown(u.ti); u.horseHp = horseMax(u.ti);
    push(u, Math.sin(u.face + Math.PI / 2) * 5, Math.cos(u.face + Math.PI / 2) * 5, 1.0);
    if (u.human) say('horseDown', u.ti);
  } else { h.state = 'leaving'; h.t = 0; }
}
function horseDamage(r, dmg) {
  r.horseHp -= dmg;
  spark(r.x, r.y + 1.3, r.z, '#d42a1e', 5); sound('hit', r.x, r.z);
  if (r.horseHp <= 0) dismount(r, true);
}
const spearNear = (u, d) => G.units.some(o => !o.dead && isEnemy(o, u) && o.kind === 'foot' && o.tier >= 1 && Math.hypot(o.x - u.x, o.z - u.z) < d);
export const braced = s => s.kind === 'foot' && s.tier >= 1 && s.stun <= 0 && Math.hypot(s.vx, s.vz) < 2.2;
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
  for (let c = 0; c < 4; c++) { if (!isEnemyTi(c, u.ti) || !G.teams[c].alive) continue; const d = Math.hypot(TEAMS[c].pos[0] - u.x, TEAMS[c].pos[1] - u.z); if (d < bd) { bd = d; best = c; } }
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
  const mult = pend.mult || 1;
  if (pend.leap) { resolveLeap(u); return; }
  if (pend.sweep) {
    const m = mult * .8 * (1 + Math.hypot(u.vx, u.vz) / 12);
    for (const o of G.units) {
      if (o.dead || !isEnemy(o, u)) continue;
      if (Math.hypot(o.x - u.x, o.z - u.z) > 3.1 + (pend.reachB || 0)) continue;
      if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > 1.25) continue;
      hit(u, o, m);
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
  const reach = u.reach + (pend.reachB || 0), ex = pend.kb ? { kb: pend.kb } : undefined;
  let landed = false;
  if (tg && !tg.dead && Math.hypot(tg.x - u.x, tg.z - u.z) <= u.r + tg.r + reach + .5) { hit(u, tg, mult, ex); landed = true; }
  // sword finisher: the heavy third hit also catches up to two more men beside the target
  if (pend.cleave) {
    let n = 0;
    for (const o of G.units) {
      if (o === tg || o.dead || !isEnemy(o, u)) continue;
      if (Math.hypot(o.x - u.x, o.z - u.z) > u.r + o.r + reach + .3) continue;
      if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > 1.1) continue;
      hit(u, o, mult * .8, ex); if (++n >= 2) break;
    }
  }
  // spear thrust: runs through to the man standing right behind the target
  if (pend.pierce && landed) {
    for (const o of G.units) {
      if (o === tg || o.dead || !isEnemy(o, u)) continue;
      if (Math.hypot(o.x - u.x, o.z - u.z) > u.r + o.r + reach + 1.3) continue;
      if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > .35) continue;
      hit(u, o, mult * pend.pierce, ex); break;
    }
  }
}
// Leap slam: an attack from mid-air comes down on everyone in a wide arc in front, can't be
// blocked, and staggers whoever it hits. The crowd-breaker; the sword combo is the duelling tool.
function resolveLeap(u) {
  const L = CAPTAIN_COMBAT.leap;
  const fx0 = u.x + Math.sin(u.face) * 1.2, fz0 = u.z + Math.cos(u.face) * 1.2;
  spark(fx0, groundY(fx0, fz0) + .2, fz0, '#c9b28a', 14); sound('trample', fx0, fz0);
  if (u.isMe) { fx('shake', .45); fx('buzz', 40); }
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, u)) continue;
    if (Math.hypot(o.x - u.x, o.z - u.z) > L.range + o.r) continue;
    if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > L.arc) continue;
    hit(u, o, L.mult, { stun: L.stun, kb: 1.3, unblockable: true });
  }
}
function hit(a, b, mult = 1, extra) {
  if (!isEnemy(a, b)) return;
  let dmg = a.dmg * rnd(.8, 1.2) * mult * aiDmg(a.ti);
  if (!a.leader && a.aura) dmg *= 1 + auraBonus(a.ti);
  if (a.y - b.y > .8) dmg *= 1.2; // fighting downhill
  b.lastHit = G.T;
  const spearedHorse = (a.kind === 'foot' && a.tier >= 1) || (a.leader && a.weapon === 'spear');
  if (b.mounted && (spearedHorse || Math.random() < .5)) { horseDamage(b, dmg * (spearedHorse ? 3 : 1)); return; }
  let kb = (a.leader ? (a.mounted ? 9 : 7) : 4.5) * (extra && extra.kb || 1);
  const frontal = Math.abs(angDiff(b.face, Math.atan2(a.x - b.x, a.z - b.z))) < 1.1;
  let blocked = false;
  if (frontal && b.stun <= 0 && !b.mounted && !b.carrying && !(extra && extra.unblockable)) {
    if (b.human) blocked = b.blocking;
    else if (Math.random() < (b.block || 0) + (b.aura ? auraBonus(b.ti) : 0) + (b.shieldwall && b.kind === 'foot' ? .3 : 0)) { blocked = true; b.blockT = .45; }
  }
  const hx = (a.x + b.x) / 2, hz = (a.z + b.z) / 2, hy = (a.y + b.y) / 2 + 1.2;
  if (blocked) {
    dmg *= b.human ? .12 : .25; kb *= .4;
    spark(hx, hy, hz, '#fff3b0', 7); sound('clang', hx, hz); b.blockT = Math.max(b.blockT, .2);
    if (b.isMe) fx('buzz', 15);
  } else {
    spark(hx, hy, hz, TEAMS[colorOf(b.ti)].css, 6); sound('hit', hx, hz);
    if (Math.random() < .4) fx('splat', { x: b.x + rnd(-.4, .4), z: b.z + rnd(-.4, .4), s: rnd(.6, 1.1), ti: b.ti });
    if (b.isMe) { fx('shake', .35); fx('buzz', 35); }
  }
  b.hp -= dmg;
  if (a.isMe) { // your own blows: a beat of hit-stop, longer for heavy hits and kills, and a deeper thud
    const heavy = !blocked && (mult >= 1.35 || b.hp <= 0);
    fx('hitstop', blocked ? .03 : heavy ? .1 : .055);
    if (heavy) sound('heavy', hx, hz);
  }
  const ang = Math.atan2(b.x - a.x, b.z - a.z);
  push(b, Math.sin(ang) * kb, Math.cos(ang) * kb, blocked ? 0 : (extra && extra.stun) || .22);
  if (b.hp <= 0) die(b, a, ang);
}
function shoot(u, tg, fromY = 1.6) {
  const j = u.jitter || .8;
  const lead = .35 + Math.hypot(tg.x - u.x, tg.z - u.z) / 30;
  const tx = tg.x + tg.vx * lead + rnd(-j, j), tz = tg.z + tg.vz * lead + rnd(-j, j);
  const d = Math.hypot(tx - u.x, tz - u.z), y0 = (u.y || 0) + fromY;
  G.arrows.push(makeArrow({ id: ++G.arrowN, x0: u.x, y0, z0: u.z, x1: tx, z1: tz, y1: groundY(tx, tz) + 1.1, dur: .25 + d / 28, peak: Math.min(6, d * .16), ti: u.ti, t: 0, shooter: u }));
  if (!u.tower) u.swing = .38;
  sound('bow', u.x, u.z);
}
// A javelin throw: a foot/captain unit with the javelin ability hurls one at a mid-range foe,
// reusing the arrow flight/hit pipeline (flat damage, no headshot roll) rather than a new system.
function throwJavelin(u, tg, dmg) {
  const d = Math.hypot(tg.x - u.x, tg.z - u.z), y0 = (u.y || 0) + 1.5;
  G.arrows.push(makeArrow({ id: ++G.arrowN, x0: u.x, y0, z0: u.z, x1: tg.x, z1: tg.z, y1: groundY(tg.x, tg.z) + 1.1, dur: .18 + d / 22, peak: Math.min(3.5, d * .09), ti: u.ti, t: 0, shooter: u, javelin: true, jd: dmg }));
  u.javCd = JAVELIN.cd; u.swing = .3;
  sound('bow', u.x, u.z);
}
export function makeArrow(a) { a.x = a.x0; a.y = a.y0; a.z = a.z0; a.px = a.x0; a.py = a.y0; a.pz = a.z0; return a; }
function arrowHit(a, b) {
  const shooter = a.shooter;
  let dmg, loc = 'body';
  if (a.javelin) {
    dmg = (a.jd || JAVELIN.dmg) * rnd(.85, 1.15) * aiDmg(a.ti);
  } else {
    // shooter is missing .arrow/.jitter for a castle tower's arrows (a bare {x,z,ti,tower}
    // placeholder, not a real archer unit), so fall back to the base archer stats for those.
    dmg = (shooter && shooter.arrow != null ? shooter.arrow : STATS.arch.arrow) * rnd(.8, 1.2) * aiDmg(a.ti);
    // Skill/tier-based headshots: tighter aim (lower jitter, from the Marksman upgrade) means
    // more of them land on the head for extra damage, or the legs for less.
    const j = shooter && shooter.jitter != null ? shooter.jitter : .8, headChance = .08 + (1 - j) * .22, roll = Math.random();
    if (roll < headChance) { dmg *= 1.8; loc = 'head'; }
    else if (roll > .82) { dmg *= .6; loc = 'legs'; }
  }
  if (G.teams[b.ti]) G.teams[b.ti].arrowHits++;
  const frontal = Math.abs(angDiff(b.face, Math.atan2(a.x0 - b.x, a.z0 - b.z))) < 1.1;
  // a shieldwall turns arrows from the front only — locked shields don't cover the sides or back
  if (b.shieldwall && frontal && (b.kind === 'foot' || Math.random() < .6)) { spark(b.x, b.y + 2.2, b.z, '#e8d9b0', 4); sound('thud', b.x, b.z); return; }
  b.lastHit = G.T;
  if (b.mounted && Math.random() < .6) { horseDamage(b, dmg); return; }
  let blocked = false;
  if (frontal && !b.mounted && !b.carrying && loc !== 'head') {
    if (b.kind === 'foot' && Math.random() < .7) blocked = true;
    if (b.leader && (b.human ? b.blocking : Math.random() < .35)) blocked = true;
  }
  if (blocked) { spark(b.x, b.y + 1.3, b.z, '#e8d9b0', 4); sound('thud', b.x, b.z); b.blockT = Math.max(b.blockT, .2); return; }
  b.hp -= dmg; spark(b.x, b.y + 1.3, b.z, TEAMS[colorOf(b.ti)].css, 4); sound('hit', b.x, b.z);
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
  if (G.mode === 'conquest') return !G.teams[colorOf(i)].alive;
  if (G.mode === 'dm') return !s.alive && !G.units.some(u => !u.dead && u.ti === i);
  return false;
}
// One color's shown score: castle strength is shared (conquest), tickets and captures are each
// army's own and add up across a Duo pair.
export const armiesOfColor = c => G.duo[c] ? [c, c + 4] : [c];
const ARMY_SCORE_FIELD = { dm: 'tickets', ctf: 'caps', ctrl: 'ctrlScore' };
export function colorScore(c) {
  if (G.mode === 'conquest') return G.teams[c].points;
  const field = ARMY_SCORE_FIELD[G.mode];
  return armiesOfColor(c).reduce((s, i) => s + G.teams[i][field], 0);
}
export const colorOut = c => armiesOfColor(c).every(i => teamOut(i));
export const colorHuman = c => armiesOfColor(c).some(i => G.teams[i].human);
export const teamScore = i => { const s = G.teams[i]; return G.mode === 'conquest' ? G.teams[colorOf(i)].points : s[ARMY_SCORE_FIELD[G.mode]]; };
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
  if (G.mode === 'ctf') for (const a of new Set(G.ALLY)) if (allianceCaps(a) >= CAPS_TO_WIN) return endMatch(a, 'caps');
  if (G.mode === 'ctrl') for (const a of new Set(G.ALLY)) if (allianceCtrl(a) >= CTRL.win) return endMatch(a, 'control');
}
function checkTime() {
  if (G.state !== 'play' || G.T < MODES[G.mode].time) return;
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
  if (G.state !== 'play') return;
  G.state = 'end'; G.endInfo = { w, why };
  bus.emit('end', G.endInfo);
}

// ---------- control points ----------
// Ownership flips to whichever army has strict majority presence within the point's radius,
// after holding that lead uncontested for CTRL.captureTime seconds; any dead-heat or gap in
// presence resets the progress rather than letting it decay gradually (simple, readable rule).
export function makeCtrlPoints(L) { return L.ctrlSpots.map(s => ({ ...s, owner: -1, prog: 0 })); }
function updateControlPoints(dt) {
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

// ---------- capture the fort ----------
function dropFlag(u) {
  const f = G.flag; u.carrying = false; f.state = 'dropped'; f.carrier = null; f.x = u.x; f.z = u.z; f.dropT = 10;
  say('flagDropped', u.ti);
}
function updateFlag(dt) {
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

// ---------- captain actions ----------
export function softAim(p, range = 3.4) {
  let best = null, bs = 1e9;
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, p)) continue;
    const d = Math.hypot(o.x - p.x, o.z - p.z); if (d > range) continue;
    const score = d + Math.abs(angDiff(p.face, Math.atan2(o.x - p.x, o.z - p.z))) * 1.5;
    if (score < bs) { bs = score; best = o; }
  }
  return best;
}
const CC = CAPTAIN_COMBAT;
export const javMax = ti => CC.jav.ammo + footTier(ti);
export const airborne = p => (p.jy || 0) > .25;
export const aimRange = p => (p.weapon === 'spear' ? CC.spear.aim : CC.sword.aim);
export function captainJump(p) {
  if (!p || p.dead || p.mounted || p.stun > 0 || p.jy > 0 || p.jvy > 0 || p.jumpCd > 0 || p.carrying) return false;
  p.jvy = CC.jump.v; p.jy = .001; sound('swing', p.x, p.z);
  return true;
}
// Advances a captain's jump wherever that captain is driven (solo/host, or a client's own phone).
export function stepJump(p, dt) {
  if (p.jumpCd > 0) p.jumpCd -= dt;
  if (!(p.jy > 0) && !(p.jvy > 0)) return;
  p.jvy -= CC.jump.g * dt; p.jy += p.jvy * dt;
  if (p.jy <= 0) { p.jy = 0; p.jvy = 0; p.jumpCd = CC.jump.cd; spark(p.x, groundY(p.x, p.z) + .1, p.z, '#c9b28a', 4); }
}
// No argument: cycle sword -> spear -> javelins. The choice sticks through respawns.
export function switchWeapon(p, w) {
  if (!p || p.dead) return null;
  const next = WEAPONS.includes(w) ? w : WEAPONS[(WEAPONS.indexOf(p.weapon || 'sword') + 1) % WEAPONS.length];
  p.weapon = next; p.combo = 0; p.cd = Math.max(p.cd, .12);
  if (G.teams[p.ti]) G.teams[p.ti].weapon = next;
  return next;
}
// Where a captain's javelin goes: the best enemy in a cone ahead (led a little), else straight ahead.
export function javTarget(p) {
  let best = null, bs = 1e9;
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, p)) continue;
    const d = Math.hypot(o.x - p.x, o.z - p.z); if (d > CC.jav.range || d < 1.2) continue;
    const ad = Math.abs(angDiff(p.face, Math.atan2(o.x - p.x, o.z - p.z))); if (ad > .6) continue;
    const sc = d + ad * 10; if (sc < bs) { bs = sc; best = o; }
  }
  if (!best) return { x: p.x + Math.sin(p.face) * 12, z: p.z + Math.cos(p.face) * 12, foe: null };
  const lead = (.18 + Math.hypot(best.x - p.x, best.z - p.z) / 22) * .8;
  return { x: best.x + best.vx * lead, z: best.z + best.vz * lead, foe: best };
}
function throwCaptainJav(p) {
  if ((p.javAmmo || 0) < 1) return false;
  const t = javTarget(p);
  p.face = Math.atan2(t.x - p.x, t.z - p.z);
  throwJavelin(p, t, CC.jav.dmg);
  p.javAmmo--; if (p.javRegen <= 0) p.javRegen = CC.jav.regen;
  p.cd = CC.jav.cd; p.swing = .38; p.swingKind = 4;
  return true;
}
function leapSlam(p) {
  p.leaps = (p.leaps || 0) + 1;
  p.swing = .38; p.cd = CC.leap.cd; p.pending = { t: .1, leap: true }; p.swingKind = 2;
  p.jvy = Math.min(p.jvy, -9);
  p.vx += Math.sin(p.face) * 3; p.vz += Math.cos(p.face) * 3;
  sound('swing', p.x, p.z);
}
// The player captain's Attack: what it does depends on the weapon in hand and whether you're in the
// air. Presses that land during a cooldown are buffered briefly instead of being dropped.
export function captainAttack(p) {
  if (!p || p.dead || p.carrying) return;
  if (p.cd > 0 || p.stun > 0) { p.atkBuf = .4; return; }
  p.atkBuf = 0;
  const wpn = p.weapon || 'sword';
  if (p.mounted) {
    if (wpn === 'jav' && throwCaptainJav(p)) return;
    startSweep(p);
    if (p.pending && wpn === 'spear') { p.pending.mult = 1.3; p.pending.reachB = .8; }
    return;
  }
  if (airborne(p)) { leapSlam(p); return; }
  if (wpn === 'jav') {
    if (throwCaptainJav(p)) return;
    p.weapon = 'sword'; if (G.teams[p.ti]) G.teams[p.ti].weapon = 'sword';
    if (p.isMe) fx('float', { x: p.x, y: p.y + 3.2, z: p.z, text: 'Out of javelins', color: '#fff' });
  }
  const spear = p.weapon === 'spear', S = CC.sword;
  const best = softAim(p, spear ? CC.spear.aim : S.aim);
  let target = best;
  if (!best) {
    const [ci, cd] = nearestEnemyCastle(p);
    if (ci >= 0 && cd < CASTLE_REACH + .6) { target = { castle: ci }; p.face = Math.atan2(TEAMS[ci].pos[0] - p.x, TEAMS[ci].pos[1] - p.z); }
  }
  if (!startSwing(p, target)) return;
  p.pending.t = .12;
  if (best) {
    const ang = Math.atan2(best.x - p.x, best.z - p.z), d = Math.hypot(best.x - p.x, best.z - p.z);
    p.face = ang;
    // step into a target at the edge of reach, so a press always connects
    const edge = p.r + best.r + p.reach + (spear ? CC.spear.reachB : 0) - .2;
    if (d > edge) { p.vx += Math.sin(ang) * 4; p.vz += Math.cos(ang) * 4; }
  }
  if (spear) {
    Object.assign(p.pending, { mult: CC.spear.mult, reachB: CC.spear.reachB, pierce: CC.spear.pierce, kb: .8 });
    p.cd = CC.spear.cd; p.combo = 0; p.swingKind = 3;
  } else {
    const combo = G.T - p.lastSwingT < S.window ? (p.combo + 1) % 3 : 0, fin = combo === 2;
    Object.assign(p.pending, { mult: fin ? S.finisherMult : S.mult, cleave: fin, kb: fin ? 1.25 : .4 }); // light hits keep him in reach, the finisher launches
    p.cd = fin ? S.finisherCd : S.cd; p.combo = combo; p.swingKind = combo;
  }
  p.lastSwingT = G.T;
}
// Missile volley: every archer with a target in range fires immediately, and every javelin-ready
// footman (tier 1+) throws immediately, together, on a shared team cooldown.
export function orderVolley(ti) {
  const s = G.teams[ti];
  if (!s || !s.active || s.volleyCd > 0) return false;
  let fired = false;
  for (const u of G.units) {
    if (u.dead || u.ti !== ti || u.stun > 0) continue;
    if (u.kind === 'arch') {
      const range = u.range * (u.y > 2.2 ? 1.3 : 1);
      const [foe] = nearestFoe(u, range);
      if (foe) { u.face = Math.atan2(foe.x - u.x, foe.z - u.z); shoot(u, foe); u.shootCd = u.shootBase * rnd(.85, 1.2); fired = true; }
    } else if (u.kind === 'foot' && u.javelin && u.javCd <= 0) {
      const [foe] = nearestFoe(u, JAVELIN.range, o => !o.mounted);
      if (foe) { u.face = Math.atan2(foe.x - u.x, foe.z - u.z); throwJavelin(u, foe); fired = true; }
    }
  }
  if (fired) s.volleyCd = VOLLEY.cd;
  return fired;
}

// ---------- navigation ----------
// Where to walk next on the way to (gx,gz): straight there when the way is clear,
// otherwise along an A* path around walls, rivers and buildings. Paths are cached per unit
// and the number of new searches per frame is capped so big armies stay cheap.
let pathBudget = 0;
function nav(u, gx, gz) {
  const P = u.nav || (u.nav = { next: 0, direct: true, pts: null, i: 0, gx: 1e9, gz: 1e9, repath: 0, skipT: 0 });
  if (G.T >= P.next) { P.next = G.T + .25 + Math.random() * .15; const [ox, oz] = openGoal(gx, gz, u.x, u.z); P.direct = los(u.x, u.z, ox, oz); P.ox = ox; P.oz = oz; }
  if (P.direct) { P.pts = null; return [gx, gz]; }
  const ox = P.ox, oz = P.oz;
  if ((G.T > P.repath || Math.hypot(ox - P.gx, oz - P.gz) > 4) && pathBudget > 0) {
    pathBudget--;
    // pressed into a wall: step out to the path's first open cell before heading on
    P.pts = findPath(u.x, u.z, ox, oz); P.i = walkable(u.x, u.z) ? 1 : 0; P.gx = ox; P.gz = oz;
    P.repath = G.T + (P.pts ? 2 + Math.random() : 1.5 + Math.random()); // a failed search waits before trying again
  }
  if (!P.pts || P.pts.length < 2) return [gx, gz];
  const pts = P.pts;
  while (P.i < pts.length - 1 && Math.hypot(pts[P.i][0] - u.x, pts[P.i][1] - u.z) < (P.i ? 1.3 : .5)) P.i++;
  if (P.i < pts.length - 1 && G.T >= P.skipT) { P.skipT = G.T + .3; if (los(u.x, u.z, pts[P.i + 1][0], pts[P.i + 1][1])) P.i++; }
  const p = pts[Math.min(P.i, pts.length - 1)];
  return P.i >= pts.length - 1 ? [gx, gz] : [p[0], p[1]];
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
  const t = TEAMS[colorOf(u.ti)], squadN = squadOf(u.ti).length;
  if (G.mode === 'conquest') {
    const threat = G.units.some(o => !o.dead && isEnemy(o, u) && Math.hypot(o.x - t.pos[0], o.z - t.pos[1]) < 22);
    // gather a real army at home before marching out (keeps the big clashes big)
    const gather = s.plan && s.plan.kind === 'castle' ? 4 : 11;
    if (G.teams[colorOf(u.ti)].alive && (threat || squadN < gather)) { s.plan = { kind: 'defend' }; return; }
    let target = s.plan && s.plan.kind === 'castle' && G.teams[s.plan.ti].alive && Math.random() > .08 ? s.plan.ti : null;
    if (target == null) {
      const opts = [0, 1, 2, 3].filter(c => isEnemyTi(c, u.ti) && G.teams[c].alive)
        .sort((a, b) => Math.hypot(TEAMS[a].pos[0] - u.x, TEAMS[a].pos[1] - u.z) - Math.hypot(TEAMS[b].pos[0] - u.x, TEAMS[b].pos[1] - u.z));
      if (opts.length) target = opts[Math.random() < .7 ? 0 : Math.min(1, opts.length - 1)];
    }
    s.plan = target == null ? { kind: 'defend' } : { kind: 'castle', ti: target };
  } else if (G.mode === 'dm') {
    const gather = s.plan && s.plan.kind === 'hunt' ? 3 : 9;
    if (squadN < gather && s.tickets > 0) { s.plan = { kind: 'defend' }; return; }
    const [cap] = nearestFoe(u, 400, o => o.leader), [any] = nearestFoe(u, 400);
    const bl = G.bounty >= 0 && isEnemyTi(G.bounty, u.ti) && Math.random() < .5 ? G.teams[G.bounty].leader : null;
    s.plan = { kind: 'hunt', target: (bl && !bl.dead) ? bl : (cap || any) };
  } else if (G.mode === 'ctrl') {
    const gather = s.plan && s.plan.kind === 'point' ? 4 : 9;
    if (squadN < gather) { s.plan = { kind: 'defend' }; return; }
    const mine = s.plan && s.plan.kind === 'point' ? G.ctrlPoints[s.plan.id] : null;
    // stick with the point already being pushed unless it's ours now or someone else has since taken it over
    if (mine && mine.owner !== u.ti && Math.random() > .1) return;
    const opts = G.ctrlPoints.filter(p => p.owner !== u.ti).sort((a, b) => Math.hypot(a.x - u.x, a.z - u.z) - Math.hypot(b.x - u.x, b.z - u.z));
    s.plan = opts.length ? { kind: 'point', id: opts[0].id } : { kind: 'defend' };
  } else {
    const f = G.flag;
    if (u.carrying) s.plan = { kind: 'home' };
    else if (f.state === 'carried') s.plan = { kind: isEnemy(f.carrier, u) ? 'hunt' : 'escort', target: f.carrier };
    else s.plan = { kind: 'banner' };
  }
}
function planGoal(u, s) {
  const p = s.plan; if (!p) return null;
  const t = TEAMS[colorOf(u.ti)], duo = u.ti >= 4;
  switch (p.kind) {
    case 'defend': { const [gx, gz] = gatePos(t, duo ? 9 : 0, 1); return { x: gx, z: gz, stop: 1.5 }; }
    case 'castle': return { x: TEAMS[p.ti].pos[0], z: TEAMS[p.ti].pos[1], stop: CASTLE_REACH - .8, castle: p.ti };
    case 'hunt': case 'escort': return p.target && !p.target.dead ? { x: p.target.x, z: p.target.z, stop: p.kind === 'escort' ? 3 : 1.5 } : null;
    case 'home': { const [gx, gz] = gatePos(t); return { x: gx, z: gz, stop: .5 }; }
    case 'banner': return { x: G.flag.x, z: G.flag.z, stop: .2 };
    case 'point': { const pt = G.ctrlPoints && G.ctrlPoints[p.id]; return pt ? { x: pt.x, z: pt.z, stop: CTRL.radius * .6 } : null; }
  }
  return null;
}
function aiHorse(u, dist) {
  if (u.carrying) { if (u.mounted) dismount(u, false); return; }
  if (!u.mounted && !u.summon && dist > 30 && !(u.foe && u.fd < 14)) summonHorse(u);
  const pk = G.teams[u.ti].plan && G.teams[u.ti].plan.kind;
  if (u.mounted && (dist < (pk === 'hunt' ? 6 : 12) || spearNear(u, G.diff === 2 ? 11 : 7))) dismount(u, false);
}
// Computer captains fight with the player's moveset, more of it the higher the difficulty:
// Recruit keeps the plain swing; Soldier switches weapons and throws javelins, with a slower
// rhythm and the odd leap; Warlord chains full-speed combos and leaps into any cluster of men.
function aiCaptainFight(u, foe, fd, dt) {
  const war = G.diff >= 2;
  if (!u.weapon) u.weapon = 'sword';
  u.wpnT = (u.wpnT || 0) - dt; u.leapT = (u.leapT || 0) - dt;
  if (u.wpnT <= 0) { // re-think the weapon now and then, like a person would
    u.wpnT = war ? rnd(.8, 1.4) : rnd(1.6, 2.6);
    const riders = foe.mounted || G.units.some(o => !o.dead && o.mounted && isEnemy(o, u) && Math.hypot(o.x - u.x, o.z - u.z) < 12);
    const w = riders ? 'spear' : fd > 4.5 && u.javAmmo >= 1 ? 'jav' : war || Math.random() < .5 ? 'sword' : 'spear';
    if (w !== u.weapon) { u.weapon = w; u.combo = 0; u.cd = Math.max(u.cd, .25); }
  }
  if (u.weapon === 'jav') {
    if (u.javAmmo < 1 || fd < 3) { u.weapon = 'sword'; u.wpnT = rnd(.6, 1.2); }
    else {
      moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 10);
      if (u.cd <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { captainAttack(u); if (!war) u.cd += .5; }
      return;
    }
  }
  const reach = u.r + foe.r + u.reach + (u.weapon === 'spear' ? CAPTAIN_COMBAT.spear.reachB : 0);
  go(u, foe.x, foe.z, speedOf(u), dt, reach * .7); faceTo(u, foe.x, foe.z, dt);
  // leap slam: into a group of men in front of him
  if (u.jy > 0) { if (u.jvy < 2 && u.cd <= 0) captainAttack(u); return; }
  if (u.leapT <= 0 && fd < 3.4 && u.jumpCd <= 0 && u.stun <= 0) {
    u.leapT = war ? rnd(2.5, 4) : rnd(7, 11);
    const n = G.units.filter(o => !o.dead && isEnemy(o, u) && Math.hypot(o.x - u.x, o.z - u.z) < 3.6 && Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) < 1.2).length;
    if (n >= 2 && (war || Math.random() < .5) && captainJump(u)) return;
  }
  if (fd < reach && u.cd <= 0 && u.stun <= 0) { captainAttack(u); if (!war) u.cd += .2; }
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
    } else if (G.diff >= 1) aiCaptainFight(u, foe, fd, dt);
    else {
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
  const W = 5, row = Math.floor(idx / W), lat = (idx % W - 2) * 1.45;
  const back = isArch ? (front ? 2.0 + row * 1.5 : 1.8 + Math.ceil(meleeN / W) * 1.5 + row * 1.5) : (front ? -(2.2 + row * 1.5) : 1.8 + row * 1.5);
  const f = anchor.face, fx = Math.sin(f), fz = Math.cos(f), rx = Math.cos(f), rz = -Math.sin(f);
  return [anchor.x - fx * back + rx * lat, anchor.z - fz * back + rz * lat];
}
// Shieldwall: a tight forward-facing line (9 wide) just ahead of a human captain (behind a
// computer one), rather than a deep huddled block — footmen up front, archers a rank behind.
function shieldwallPos(anchor, front, idx) {
  const perRow = 9, row = Math.floor(idx / perRow), lat = (idx % perRow - (perRow - 1) / 2) * .95;
  const back = front ? -(1.6 + row * 1.1) : 1.6 + row * 1.1;
  const f = anchor.face, fx = Math.sin(f), fz = Math.cos(f), rx = Math.cos(f), rz = -Math.sin(f);
  return [anchor.x - fx * back + rx * lat, anchor.z - fz * back + rz * lat];
}
function thinkSoldier(u, dt) {
  const s = G.teams[u.ti], L = s.leader, leaderUp = L && !L.dead;
  const myOrder = orderOf(u.ti);
  if (myOrder === 'shieldwall' && leaderUp) {
    u.aim = false;
    const foe = u.foe;
    if (foe && u.fd < u.r + foe.r + u.reach) { faceTo(u, foe.x, foe.z, dt); startSwing(u, foe); }
    const [gx, gz] = shieldwallPos(L, !!L.human, u.tslot || 0);
    const d = go(u, gx, gz, speedOf(u) * (Math.hypot(gx - u.x, gz - u.z) > 5 ? 1.5 : 1), dt, .15);
    if (d < 1 && !(foe && u.fd < 3)) u.face = turn(u.face, L.face, dt * 6);
    return;
  }
  const range = u.kind === 'arch' ? u.range * (u.y > 2.2 ? 1.3 : 1) : 0; // archers on high ground shoot farther
  u.aim = false;
  if (u.kind === 'foot' && u.tier >= 1 && myOrder !== 'charge') {
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
        if (u.shootCd <= 0 && u.stun <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { shoot(u, foe); u.shootCd = u.shootBase * rnd(.85, 1.2); }
      } else go(u, foe.x, foe.z, speedOf(u), dt, range * .8);
    } else if (u.javelin && u.javCd <= 0 && fd > u.r + foe.r + u.reach + .3 && fd < JAVELIN.range && !foe.mounted) {
      moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 8);
      if (Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) throwJavelin(u, foe);
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
    const d = go(u, gx, gz, speedOf(u) * (Math.hypot(gx - u.x, gz - u.z) > 6 ? 1.15 : 1), dt);
    if (d < 1) u.face = turn(u.face, anchor.face, dt * 6);
  } else { const [gx, gz] = gatePos(TEAMS[colorOf(u.ti)], u.ti >= 4 ? 9 : 0, 2); go(u, gx, gz, u.spd, dt, 3); }
}
function aiPick(ti) {
  const r = Math.random();
  if (G.diff === 2) {
    const foes = activeArmies().filter(i => G.teams[i].human && isEnemyTi(i, ti));
    const sq = foes.flatMap(i => squadOf(i)), c = k => sq.filter(u => u.kind === k).length;
    const f = c('foot'), a = c('arch');
    return a >= f ? (r < .7 ? 'foot' : 'arch') : (r < .35 ? 'arch' : 'foot');
  }
  return r < .65 ? 'foot' : 'arch';
}

// ---------- physics ----------
export function integrate(u, dt, pz) {
  u.x += u.vx * dt; u.z += u.vz * dt;
  for (const o of nearObstacles(u.x, u.z)) {
    if (o.gate && !gateShut(o)) continue;
    const dx = u.x - o.x, dz = u.z - o.z;
    if (o.box) {
      const c = Math.cos(o.rot), s = Math.sin(o.rot), lx = dx * c - dz * s, lz = dx * s + dz * c;
      const px = o.hw + u.r - Math.abs(lx), pz = o.hd + u.r - Math.abs(lz);
      if (px <= 0 || pz <= 0) continue;
      let nx = lx, nz = lz; if (px < pz) nx = Math.sign(lx || 1) * (o.hw + u.r); else nz = Math.sign(lz || 1) * (o.hd + u.r);
      u.x = o.x + nx * c + nz * s; u.z = o.z - nx * s + nz * c;
      continue;
    }
    const min = o.r + u.r;
    if (Math.abs(dx) > min || Math.abs(dz) > min) continue;
    const d = Math.hypot(dx, dz);
    if (d < min && d > 0) { u.x = o.x + dx / d * min; u.z = o.z + dz / d * min; }
  }
  if (G.layout.round) { const d = Math.hypot(u.x, u.z), m = G.layout.round - u.r; if (d > m) { u.x *= m / d; u.z *= m / d; } }
  if (G.map.id === 'river') {
    if (inRiver(u.x, u.z) && !onBridge(u.x) && Math.abs(u.x) >= 14) u.z = (pz >= 0 ? 1 : -1) * 5.05;
    if (Math.abs(u.z) < 5 && onBridge(u.x) && Math.abs(u.x) > 20) { const bx = u.x < 0 ? -32 : 32; u.x = clamp(u.x, bx - 2.1, bx + 2.1); }
  }
  u.x = clamp(u.x, -WORLD_LIMIT, WORLD_LIMIT); u.z = clamp(u.z, -WORLD_LIMIT, WORLD_LIMIT);
  u.y = groundY(u.x, u.z) + (u.jy || 0);
}
// Drives a captain from a move vector in world space (the joystick, already turned by the camera).
// You keep moving and steering while swinging; in the air you keep your momentum with light control.
export function driveCaptain(p, input, dt) {
  const air = (p.jy || 0) > .01;
  p.blocking = !!input.block && !p.mounted && !air;
  const swinging = p.swing > 0 && !p.mounted;
  const spd = speedOf(p) * (swinging ? .85 : 1);
  if (air) {
    const k = Math.min(1, dt * 2.5);
    p.vx += (input.wx * spd * input.mag - p.vx) * k; p.vz += (input.wz * spd * input.mag - p.vz) * k;
  } else moveToward(p, p.x + input.wx * 3, p.z + input.wz * 3, spd * input.mag, dt, .05);
  if (input.mag > .15) p.face = turn(p.face, Math.atan2(input.wx, input.wz), dt * (p.mounted ? 4.5 : p.blocking ? 5 : swinging ? 6 : 12));
  if (p.blocking && input.mag < .15) p.face = turn(p.face, input.camYaw, dt * 6);
  stepJump(p, dt);
}
// Javelin ammo trickles back one at a time.
export function regenJavs(p, dt) {
  const mx = javMax(p.ti);
  if (p.javAmmo >= mx) { p.javAmmo = mx; p.javRegen = 0; return; }
  p.javRegen -= dt; if (p.javRegen <= 0) { p.javAmmo++; p.javRegen = p.javAmmo < mx ? CC.jav.regen : 0; }
}

// ---------- the main step (solo and host) ----------
export function update(dt, input) {
  G.T += dt;
  syncGates();
  // Duo battles can field twice the soldiers of a solo one; searching fewer new paths per frame
  // as the field gets crowded keeps worst-case frame cost bounded instead of growing with it.
  pathBudget = Math.max(2, Math.round(4 * 80 / Math.max(80, G.units.length)));
  G.teams.forEach((s, i) => {
    if (!s.active) return;
    if (s.volleyCd > 0) s.volleyCd -= dt;
    if (canRecruit(i)) s.gold += dt * (s.human ? ECON.humanIncome : DIFF[G.diff].income);
    if (!s.human && canRecruit(i)) { s.recruitT -= dt; if (s.recruitT <= 0) { s.recruitT = rnd(...ECON.aiRecruitEvery); recruit(i, aiPick(i)); } }
    if (!s.human) {
      // spend spare gold on upgrades once the squad is nearly full
      s.upT -= dt;
      if (s.upT <= 0) {
        s.upT = rnd(6, 12);
        if (squadOf(i).length >= G.squadCap - 3 || !canRecruit(i)) {
          const opts = UPGRADES.map(u => u.id).filter(id => upgradeCost(i, id) != null && s.gold >= upgradeCost(i, id) + 30);
          if (opts.length) buyUpgrade(i, opts[Math.floor(Math.random() * opts.length)]);
        }
      }
      // form a shieldwall when arrows keep landing and no one is close enough to fight
      s.arrowHits = Math.max(0, s.arrowHits - dt * .6); s.shieldwallT -= dt;
      if (s.arrowHits >= 4 && s.shieldwallT <= 0 && s.leader && !s.leader.dead) {
        const [f, fd] = nearestFoe(s.leader, 9, o => o.kind !== 'arch');
        if (!f) { s.shieldwallT = 7; s.arrowHits = 0; }
      }
      if (s.shieldwallT > 0 && s.leader && !s.leader.dead) { const [f] = nearestFoe(s.leader, 5, o => o.kind !== 'arch'); if (f) s.shieldwallT = 0; }
    }
    if (s.leader.dead && canRespawn(i)) {
      s.leaderDeadT -= dt;
      if (s.leaderDeadT <= 0) {
        const [gx, gz] = gatePos(TEAMS[colorOf(i)], i >= 4 ? 9 : 0, 7);
        const L = mkUnit(i, gx, gz, 'captain', s.human); s.leader = L; s.plan = null;
        if (i === G.myTi) { G.player = L; bus.emit('respawnMe', L); }
        if (s.human) say('respawn', i);
      }
    }
  });
  if (G.mode === 'dm') {
    const sorted = G.teams.map((s, i) => [s.tickets, i]).filter(x => G.teams[x[1]].active && G.teams[x[1]].alive).sort((a, b) => b[0] - a[0]);
    const nb = sorted.length > 1 && sorted[0][0] - sorted[1][0] >= 10 ? sorted[0][1] : -1;
    if (nb !== G.bounty) { G.bounty = nb; if (nb >= 0) say('bounty', nb); }
  }
  const p = G.player;
  if (p && !p.dead && input) { driveCaptain(p, input, dt); if ((input.attackHeld || p.atkBuf > 0) && p.cd <= 0 && p.stun <= 0) captainAttack(p); }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && !L.dead) { if (L.atkBuf > 0) { L.atkBuf -= dt; if (L.remote && L.cd <= 0 && L.stun <= 0) captainAttack(L); } regenJavs(L, dt); } }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && !L.dead) { const [f] = nearestFoe(L, 12); if (!f && L.hp < L.max) L.hp = Math.min(L.max, L.hp + dt * 6); } }

  const slotIdx = [0, 0, 0, 0, 0, 0, 0, 0], archIdx = [0, 0, 0, 0, 0, 0, 0, 0], meleeN = [0, 0, 0, 0, 0, 0, 0, 0], tIdx = [0, 0, 0, 0, 0, 0, 0, 0];
  const ords = G.teams.map((_, i) => orderOf(i)), rng = G.teams.map((_, i) => auraRange(i) ** 2);
  for (const u of G.units) {
    if (u.dead || u.leader) continue;
    if (u.kind !== 'arch') meleeN[u.ti]++;
    const L = G.teams[u.ti].leader, dx = L ? L.x - u.x : 0, dz = L ? L.z - u.z : 0;
    u.aura = !!L && !L.dead && dx * dx + dz * dz < rng[u.ti];
    u.shieldwall = ords[u.ti] === 'shieldwall';
    // shieldwall ranks: footmen in the front rank, archers at the back.
    // Slot 0 sits nearest the captain, who is behind a human's block and in front of a computer's.
    const k = u.kind === 'foot' ? 0 : 1;
    u.tkey = G.teams[u.ti].human ? 1 - k : k;
  }
  for (const k of [0, 1]) for (const u of G.units) if (!u.dead && !u.leader && u.tkey === k) u.tslot = tIdx[u.ti]++;
  for (const u of G.units) {
    if (u.dead) continue;
    u.cd -= dt; u.shootCd -= dt; u.javCd -= dt; u.stun -= dt; u.blockT -= dt; u.rt -= dt; u.trampleT -= dt;
    if (u.horseCd > 0) u.horseCd -= dt;
    if (u.swing > 0) u.swing -= dt;
    if (u.pending) { u.pending.t -= dt; if (u.pending.t <= 0) resolveSwing(u); }
    if (u.rt <= 0) { u.rt = rnd(.25, .4); [u.foe, u.fd] = nearestFoe(u, 50); }
    if (u.foe && u.foe.dead) { u.foe = null; u.fd = 1e9; }
    if (u.foe) u.fd = Math.hypot(u.foe.x - u.x, u.foe.z - u.z);
    if (u.human || u.dead) continue;
    if (u.leader) { stepJump(u, dt); regenJavs(u, dt); thinkLeader(u, G.teams[u.ti], dt); }
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
      if (o.kind === 'foot' && o.tier >= 1 && d < o.r + r.r + 1.6 && braced(o) && sp > 4 && Math.abs(angDiff(o.face, Math.atan2(r.x - o.x, r.z - o.z))) < 1.0) {
        horseDamage(r, 55); if (r.mounted) dismount(r, true);
        spark(o.x, o.y + 1.5, o.z, '#fff3b0', 8); sound('clang', o.x, o.z);
        fx('float', { x: o.x, y: o.y + 2.8, z: o.z, text: 'Spear wall!', color: TEAMS[colorOf(o.ti)].css });
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
    if (u.remote) { u.y = groundY(u.x, u.z) + (u.jy || 0); continue; } // moved by their own phone
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
  updateControlPoints(dt);
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
    if (y < 8 && a.t > .12) { // trees, walls and buildings stop arrows
      for (const tr of nearBlockers(x, z)) {
        if (y > tr.h + groundY(tr.x, tr.z) || (tr.gate && !gateShut(tr))) continue;
        if (Math.abs(tr.x - x) < tr.r && Math.abs(tr.z - z) < tr.r && Math.hypot(tr.x - x, tr.z - z) < tr.r) { a.stuck = true; a.life = 2; sound('thud', x, z); spark(x, y, z, '#8a7a62', 3); break; }
      }
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
