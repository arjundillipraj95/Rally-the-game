// Battle rules: units, combat, horses, the banner, AI and win conditions.
// Engine-agnostic: talks to the outside world only through G (state) and bus (events).
import { ECON, TEAMS, MODES, STATS, DIFF, HUMAN_CAPTAIN, HORSE_HP, HORSE_CD, DM_TICKETS, CAPS_TO_WIN, CASTLE_R, CASTLE_REACH, RECRUITS, WORLD_LIMIT, START_SQUAD, FULL_SQUAD, UPGRADES, FOOT_TIERS, ARCH_TIERS, CAPTAIN_TIERS, JAVELIN, VOLLEY, CHARGE, HOLD, PARRY, HEAVY, SHIELD, BACKSTAB, EXEC, HOLDS, EVADE, FORT, HOLD_ATK, GUARD, RIDE, MORALE, RALLY, CAPKILL_SLOW, CTRL, AURA, WEAPONS, CAPTAIN_COMBAT, DUEL } from '../config.js';
import { G, bus, isEnemy, isEnemyTi, colorOf, activeArmies, activeFrom, gateOff, ARMIES, rules, matchTime } from './state.js';
import { groundY, inFord, inRiver, onBridge, gatePos, makeLayout, clamp, rnd, angDiff, turn, W, groundSlow, onIce } from './world.js';
import { buildNav, syncGates, nearObstacles, nearBlockers, gateShut, los, findPath, openGoal, walkable, setPalSeg } from './nav.js';

// ---------- announcements & effects (presentation listens) ----------
export const say = (k, ...a) => bus.emit('msg', { k, a });
const fx = (type, d) => bus.emit(type, d);
const spark = (x, y, z, c, n) => fx('spark', { x, y, z, c, n });
const sound = (name, x, z) => fx('sfx', { name, x, z });

// ---------- setup ----------
// Armies 0-3 are each castle's own army; 4-11 are its Duo/Trio teammates', real only when active[i].
// Castle strength (points/alive, conquest only) is only ever read/written on the color's own
// army (0-3): a teammate's army shares its castle rather than owning one.
export function newTeams(humans, active = activeFrom([0, 0, 0, 0])) {
  return Array.from({ length: ARMIES }, (_, i) => ({ points: 100, tickets: rules().tickets, caps: 0, ctrlScore: 0, gold: Math.round(ECON.startGold * rules().gold), alive: true, plan: null, leaderDeadT: 0, recruitT: rnd(2, 6), thinkT: 0,
    human: !!humans[i], active: !!active[i], order: 'follow', holdPt: null, morale: 100, rally: 0, routT: 0, focus: null, towerT: rnd(0, 1.4), leader: null,
    up: { foot1: 0, foot2: 0, arch1: 0, arch2: 0, aura: 0, horse: 0, fort: 0 }, arrowHits: 0, shieldwallT: 0, volleyCd: 0, upT: rnd(20, 40) }));
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

export function startMatch(humans, active = activeFrom([0, 0, 0, 0])) {
  G.layout = makeLayout(G.map.id, G.mode === 'ctf', G.mode === 'ctrl', G.seed); buildNav(G.layout);
  G.units = []; G.horses = []; G.arrows = [];
  G.T = 0; G.kills = 0; G.recruited = 0; G.bounty = -1; G.uid = 0; G.arrowN = 0; G.endInfo = null; G.awarded = false;
  G.teams = newTeams(humans, active);
  G.duo = [0, 1, 2, 3].map(c => active[c + 8] ? 2 : active[c + 4] ? 1 : 0);
  G.flag = G.mode === 'ctf' ? { state: 'home', x: 0, z: 0, carrier: null, dropT: 0 } : null;
  G.ctrlPoints = G.mode === 'ctrl' ? makeCtrlPoints(G.layout) : null;
  G.holds = makeHolds(G.layout);
  G.duels = []; G.duelN = 0;
  initForts();
  for (let i = 0; i < ARMIES; i++) {
    if (!G.teams[i].active) continue;
    const t = TEAMS[colorOf(i)], off = gateOff(i); // a castle's captains muster side by side along its gate
    const [gx, gz] = gatePos(t, off, 7);
    G.teams[i].leader = mkUnit(i, gx, gz, 'captain', G.teams[i].human);
    const start = (G.fullSquads ? FULL_SQUAD : START_SQUAD).slice(0, G.squadCap);
    start.forEach((n0, n) => { const [sx, sz] = gatePos(t, ((n % 7) - 3) * 1.4 + off, 1.5 + Math.floor(n / 7) * 1.4); mkUnit(i, sx, sz, n0); });
  }
  G.player = G.teams[G.myTi].leader;
  G.state = 'play';
  say('start');
}

// Hold: pt is where the front rank stands and which way it faces ({x, z, face}); without one, the
// line forms a couple of paces in front of the captain, facing where he faces.
export function setOrder(ti, o, pt) {
  const s = G.teams[ti]; s.order = o;
  const cap = s.leader;
  if (o === 'hold') s.holdPt = pt ? { x: +pt.x, z: +pt.z, face: +pt.face } : cap ? { x: cap.x + Math.sin(cap.face) * 2.5, z: cap.z + Math.cos(cap.face) * 2.5, face: cap.face } : null;
  if (o === 'focus') { if (pt) s.focus = { id: pt.id | 0, x: +pt.x, z: +pt.z }; else s.order = 'follow'; }
}
// ---------- morale, routs and the rally horn ----------
export const routing = ti => G.teams[ti] && G.teams[ti].routT > 0;
const behind = (victim, from) => Math.abs(angDiff(victim.face, Math.atan2(from.x - victim.x, from.z - victim.z))) > MORALE.flankAng;
function loseHeart(ti, amt) { const s = G.teams[ti]; if (s) s.morale = Math.max(0, s.morale - amt); }
export function gainRally(u, amt) { if (!u || !u.leader) return; const s = G.teams[u.ti]; if (s) s.rally = Math.min(100, (s.rally || 0) + amt); }
function moraleTick(dt) {
  G.teams.forEach((s, ti) => {
    if (!s.active) return;
    const L = s.leader, up = L && !L.dead;
    if (s.routT > 0) { s.routT -= dt; if (s.routT <= 0) { s.routT = 0; s.morale = Math.max(s.morale, MORALE.regroup); s.steadyT = MORALE.steady; } return; }
    if (s.steadyT > 0) s.steadyT -= dt;
    const men = squadOf(ti), home = gatePos(TEAMS[colorOf(ti)], gateOff(ti), 0);
    const atHome = men.filter(u => Math.hypot(u.x - home[0], u.z - home[1]) < MORALE.homeR).length > men.length / 2;
    if (s.morale <= MORALE.rout && men.length >= 3 && !(s.steadyT > 0) && !atHome) { s.routT = MORALE.routT; say('rout', ti); fx('fxmsg', { k: 'fxrout', u: L || squadOf(ti)[0], ti }); return; }
    if (up && !nearestFoe(L, MORALE.calmR)[0]) s.morale = Math.min(100, s.morale + MORALE.regen * dt);
    else if (up) s.morale = Math.min(100, s.morale + MORALE.regen * .25 * dt); // (a captain on his feet steadies them, even in the thick of it)
    // a computer captain sounds his horn when it's full and his men are wavering or in a big fight
    if (!s.human && up && s.rally >= 100 && (s.morale < 50 || G.units.filter(o => !o.dead && isEnemy(o, L) && Math.hypot(o.x - L.x, o.z - L.z) < 10).length >= 5)) rallyCry(ti);
  });
}
export function rallyCry(ti) {
  const s = G.teams[ti], L = s && s.leader; if (!L || L.dead || (s.rally || 0) < 100) return false;
  s.rally = 0; s.morale = Math.min(100, s.morale + RALLY.morale); s.routT = 0;
  for (const u of G.units) if (!u.dead && u.ti === ti && !u.leader && Math.hypot(u.x - L.x, u.z - L.z) < RALLY.r) { u.rallyT = RALLY.buffT; u.stun = Math.min(u.stun, 0); }
  const shaken = new Set();
  for (const o of G.units) if (!o.dead && isEnemy(o, L) && Math.hypot(o.x - L.x, o.z - L.z) < RALLY.enemyR) { if (!o.leader) o.stun = Math.max(o.stun, .5); shaken.add(o.ti); }
  for (const t of shaken) loseHeart(t, RALLY.enemyMorale);
  sound('horn'); fx('fxmsg', { k: 'fxrally', u: L });
  if (L.remote || L.human) fx('netFlush');
  return true;
}
export function canRecruit(ti) { const s = G.teams[ti]; return G.mode === 'conquest' ? G.teams[colorOf(ti)].alive : G.mode === 'dm' ? s.tickets > 0 : true; }
export function recruit(ti, kind) {
  const s = G.teams[ti], cost = STATS[kind].cost;
  if (!canRecruit(ti) || s.gold < cost || squadOf(ti).length >= G.squadCap) return false;
  s.gold -= cost;
  const [gx, gz] = gatePos(TEAMS[colorOf(ti)], rnd(-2, 2) + (gateOff(ti))); mkUnit(ti, gx, gz, kind);
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
  const l = lvl(id === 'fort' ? colorOf(ti) : ti, id); // (Fortify is the castle's, shared by everyone in it)
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
  s.gold -= cost;
  if (id === 'fort') { G.teams[colorOf(ti)].up.fort++; applyFort(colorOf(ti)); say('fortUp', colorOf(ti), G.teams[colorOf(ti)].up.fort); return true; }
  s.up[id]++;
  if (id === 'foot1' || id === 'foot2') applyFootTier(ti);
  if (id === 'arch1' || id === 'arch2') applyArchTier(ti);
  if (id === 'horse' && s.leader && !s.leader.mounted) s.leader.horseHp = horseMax(ti);
  if (id === 'horse' && s.leader && s.leader.horseCd > horseCooldown(ti)) s.leader.horseCd = horseCooldown(ti);
  if (ti === G.myTi) { sound('coin'); say('upgrade', ti, id, s.up[id]); }
  return true;
}
// What a team's soldiers are doing: the human's order, or the computer's choice.
export const orderOf = ti => { const s = G.teams[ti], L = s.leader, up = L && !L.dead; return s.human ? (s.order || 'follow') : s.shieldwallT > 0 && up ? 'shieldwall' : s.aiHold && s.holdPt && up ? 'hold' : up ? 'follow' : 'charge'; };
export function canRespawn(ti) { const s = G.teams[ti]; return G.mode === 'conquest' ? G.teams[colorOf(ti)].alive : G.mode === 'dm' ? s.tickets > 0 : true; }
function push(u, vx, vz, stun) {
  if (u.remote) { u.kick.vx += vx; u.kick.vz += vz; u.kick.st = Math.max(u.kick.st, stun || 0); u.kick.dirty = true; }
  else { u.vx += vx; u.vz += vz; }
  if (stun) u.stun = Math.max(u.stun, stun);
}

// ---------- horses ----------
export function speedOf(u) {
  let s = u.spd;
  if (u.mounted) s *= 1.8 * (1 + .05 * lvl(u.ti, 'horse')) * (u.charge > 0 ? CHARGE.spd : 1) * (u.human ? .8 + .35 * (u.gallop || 0) : 1); // (a human rider's gallop builds on the straight)
  if (!u.leader) { if (u.aura) s *= 1 + auraBonus(u.ti) * .5; if (u.shieldwall) s *= .55; }
  if (u.carrying) s *= .7;
  s *= groundSlow(u.x, u.z); // (a ford, a wheat field, an oasis)
  if (u.human && u.blocking && !u.mounted) s *= .5;
  if (u.windup > 0) s *= .3;
  if (u.execReady) s *= EXEC.beatenSpd; // (beaten: he reels, slow on his feet)
  if (u.rallyT > 0) s *= RALLY.spd;
  if (u.routing) s *= 1.1;
  if (u.heavyCharge > 0) s *= .55;
  if (u.bracing) s *= HOLD_ATK.braceSlow;
  return s;
}
function summonHorse(u) {
  if (u.mounted || u.summon || u.horseCd > 0 || u.dead || u.carrying) return false;
  if (G.T - u.lastHit < 2) return false;
  const back = u.face + Math.PI + rnd(-.6, .6);
  const hx = clamp(u.x + Math.sin(back) * 14, -W.R + 5, W.R - 5), hz = clamp(u.z + Math.cos(back) * 14, -W.R + 5, W.R - 5);
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
  const h = u.horse; u.mounted = false; u.horse = null; u.r = STATS.captain.r; u.charge = 0;
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
  if (p.duelId) { say('rideNo', p.ti, 'duel'); return; }
  if (p.horseCd > 0) { say('rideNo', p.ti, 'rest', Math.ceil(p.horseCd)); return; }
  if (G.T - p.lastHit < 2) { say('rideNo', p.ti, 'hot'); return; }
  summonHorse(p);
}

// ---------- combat ----------
export function nearestFoe(u, maxD, filter) {
  let best = null, bd = maxD * maxD;
  const ds = G.duels && G.duels.length > 0;
  for (const o of G.units) { if (o.dead || !isEnemy(o, u) || (filter && !filter(o)) || (ds && !duelFoe(u, o))) continue; const dx = o.x - u.x, dz = o.z - u.z, d = dx * dx + dz * dz; if (d < bd) { bd = d; best = o; } }
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
  if (u.cd > 0 || u.stun > 0 || u.dead || u.carrying || u.guardUp) return false;
  u.swing = .38; u.cd = (u.leader ? (u.mounted ? .8 : .6) : STATS[u.kind].cd) * rnd(.9, 1.15) * (u.execReady ? EXEC.beatenCd : 1); // (a beaten captain swings slowly)
  u.pending = { t: .15, target };
  sound('swing', u.x, u.z);
  return true;
}
function startSweep(u) {
  if (u.cd > 0 || u.stun > 0 || u.dead) return;
  u.swing = .38; u.cd = .8; u.pending = { t: .15, sweep: true }; sound('swing', u.x, u.z);
}
// A footman facing a captain: shield up for part of each cycle, down (and swinging) for the rest.
// The raised shield shows on every phone (it's the block pose), so what you see is what you get.
function shieldTick(u, dt) {
  if (u.leader || u.kind !== 'foot' || u.mounted) { u.guardUp = false; return; }
  let cap = false;
  for (const s of G.teams) { const L = s.leader; if (L && !L.dead && isEnemy(L, u) && Math.hypot(L.x - u.x, L.z - u.z) < SHIELD.r) { cap = true; break; } }
  if (!cap || u.stun > 0) { u.guardUp = false; if (!cap) u.gT = rnd(0, .8); return; }
  u.gT = (u.gT || 0) - dt;
  if (u.gT <= 0) {
    const P = rnd(...SHIELD.cycle), share = Math.min(.85, SHIELD.share[u.tier | 0] + (u.shieldwall ? SHIELD.wall : 0) + (u.holding ? SHIELD.held : 0));
    u.guardUp = !u.guardUp; u.gT = P * (u.guardUp ? share : 1 - share);
  }
  if (u.guardUp) u.blockT = Math.max(u.blockT, .1);
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
  if (tg && tg.wall) { hitWall(u, tg.wall); return; }
  if (tg && tg.castle !== undefined) {
    const s = G.teams[tg.castle];
    if (!s.alive || u.mounted || !isEnemyTi(tg.castle, u.ti)) return;
    if (Math.hypot(TEAMS[tg.castle].pos[0] - u.x, TEAMS[tg.castle].pos[1] - u.z) > CASTLE_REACH + .8) return;
    s.points -= (u.human ? 1.3 : u.leader ? .7 : u.kind === 'arch' ? .08 : .2) * rules().castle;
    sound('wall', u.x, u.z); spark(u.x + Math.sin(u.face) * 1.2, 1.4, u.z + Math.cos(u.face) * 1.2, '#cfc8b8', 5);
    if (s.points <= 0) destroyCastle(tg.castle, u.ti);
    return;
  }
  const reach = u.reach + (pend.reachB || 0), ex = pend.kb || pend.heavy || pend.stun ? { kb: pend.kb || 1, heavy: !!pend.heavy, stun: pend.stun, shove: pend.shove } : undefined;
  let landed = false;
  const slack = u.human ? .9 : .5; // (a player's blow at a man who has just stepped back still connects)
  if (tg && !tg.dead && Math.hypot(tg.x - u.x, tg.z - u.z) <= u.r + tg.r + reach + slack) { hit(u, tg, mult, ex); landed = true; }
  else if (u.isMe && G.capStats && tg && tg.castle === undefined) G.capStats.outOfReach++;
  // sword finisher: the heavy third hit also catches up to two more men beside the target
  if (pend.cleave) {
    let n = 0;
    for (const o of G.units) {
      if (o === tg || o.dead || !isEnemy(o, u)) continue;
      if (Math.hypot(o.x - u.x, o.z - u.z) > u.r + o.r + reach + .3) continue;
      if (!pend.spin && Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > 1.1) continue; // (the spin cuts all the way round)
      hit(u, o, mult * .8, ex); if (++n >= (pend.spin ? CC.sword.spinN : 2)) break;
    }
  }
  // spear thrust: runs through to the man standing right behind the target
  let pn = 0;
  if (pend.pierce && landed) {
    for (const o of G.units) {
      if (o === tg || o.dead || !isEnemy(o, u)) continue;
      if (Math.hypot(o.x - u.x, o.z - u.z) > u.r + o.r + reach + (pend.line ? 1.2 : 2.4)) continue;
      if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > (pend.line || .4)) continue;
      hit(u, o, mult * pend.pierce, ex); if (++pn >= (pend.pierceN || 1)) break;
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
    hit(u, o, L.mult * (u.leapStrike ? 1.2 : 1), { stun: L.stun + (u.leapStrike ? .25 : 0), kb: u.leapStrike ? 1.8 : 1.3, unblockable: true });
  }
  u.leapStrike = false;
}
function hit(a, b, mult = 1, extra) {
  if (!isEnemy(a, b) || b.execT > 0 || a.execT > 0) return; // (an execution plays out untouched)
  if ((a.duelId || b.duelId) && a.duelId !== b.duelId) return; // (a duel: the two of them, and nobody else)
  if (b.iframeT > 0) { // (evaded: the blow passes through where he was)
    if (b.leader && a.leader && !b.evadedAt) { b.evadedAt = G.T; gainRally(b, EVADE.rally); fx('fxmsg', { k: 'fxevade', u: b, a }); }
    return;
  }
  // a riposte: the couple of blows after a parry land harder and can't be blocked
  if (a.ripN > 0 && a.riposteT > G.T) { a.ripN--; mult *= PARRY.riposteMult; extra = Object.assign({}, extra, { unblockable: true }); }
  let heavy = !!(extra && extra.heavy);
  // a captain's blow from behind: harder, and he reels (enemy captains too: circle him)
  const back = a.leader && !a.mounted && behind(b, a);
  if (back) { mult *= BACKSTAB.mult; extra = Object.assign({}, extra, { stun: Math.max((extra && extra.stun) || 0, BACKSTAB.stun), unparryable: true }); if (a.human || b.human) fx('fxmsg', { k: 'fxback', u: b, a }); }
  // a captain's Block tapped just before the blow lands turns it aside
  if (a.isMe && G.capStats) G.capStats.blows++;
  if (b.human && !b.mounted && b.stun <= 0 && !b.carrying && G.T - (b.parryT ?? -9) <= (heavy || (extra && extra.shown) ? PARRY.window : PARRY.light) + (b.remote ? PARRY.remote : 0)
    && Math.abs(angDiff(b.face, Math.atan2(a.x - b.x, a.z - b.z))) < 1.5 && !(extra && extra.unparryable)) { parry(b, a, heavy); return; }
  // a computer captain on guard turns most light blows from another captain aside
  const onGuard = !b.human && b.guardT > 0 && b.stun <= 0 && !b.mounted && Math.abs(angDiff(b.face, Math.atan2(a.x - b.x, a.z - b.z))) < 1.2;
  if (onGuard && a.leader && !heavy && !(extra && (extra.unblockable || extra.unparryable)) && Math.random() < GUARD.parry) { if (a.isMe && G.capStats) G.capStats.parried++; parry(b, a, false, true); return; }
  if (b.heavyCharge > 0 || b.ahT > 0) b.chargeBrokeT = G.T; // (hit while winding up a heavy blow: it's lost)
  let dmg = a.dmg * rnd(.8, 1.2) * mult * aiDmg(a.ti);
  if (!a.leader && a.aura) dmg *= 1 + auraBonus(a.ti);
  if (a.y - b.y > .8) dmg *= 1.2; // fighting downhill
  if (!b.leader && (behind(b, a) || routing(b.ti))) dmg *= MORALE.flankX; // caught from the side or behind, or running
  if (a.rallyT > 0) dmg *= RALLY.dmg;
  b.lastHit = G.T;
  const spearedHorse = (a.kind === 'foot' && a.tier >= 1) || (a.leader && a.weapon === 'spear');
  if (b.mounted && (spearedHorse || Math.random() < .5)) { horseDamage(b, dmg * (spearedHorse ? 3 : 1)); return; }
  let kb = (a.leader ? (a.mounted ? 10 : 8) : 5) * (extra && extra.kb || 1);
  const frontal = Math.abs(angDiff(b.face, Math.atan2(a.x - b.x, a.z - b.z))) < 1.1;
  const held = frontal && b.holding && !b.human; // a footman standing his place in a held line
  let blocked = onGuard;
  if (frontal && b.stun <= 0 && !b.mounted && !b.carrying && !(extra && extra.unblockable)) {
    if (b.human) blocked = b.blocking;
    else if (a.leader && b.kind === 'foot') blocked = !!b.guardUp; // (against a captain: exactly when his shield is up)
    else if (a.leader && b.leader) blocked = onGuard; // (a captain against a captain: only his guard, which shows, stops a blow)
    else if (Math.random() < (b.block || 0) + (b.aura ? auraBonus(b.ti) : 0) + (b.shieldwall && b.kind === 'foot' ? .3 : 0) + (held ? .15 : 0)) { blocked = true; b.blockT = .45; }
  }
  if (held) { dmg *= HOLD.dmg; kb *= HOLD.kb; }
  // a heavy blow smashes through a guard: no block, and the blocker is knocked off balance
  let broke = false;
  if (heavy && frontal && (blocked || (b.human && b.blocking))) { blocked = false; broke = true; dmg *= HEAVY.guardDmg; }
  // a heavy blow (or any big hit) knocks a man out of his own wind-up
  if (b.windup > 0 && (heavy || mult >= 1.35 || (extra && extra.unblockable))) { b.windup = 0; b.glint = false; b.stun = Math.max(b.stun, .5); fx('fxmsg', { k: 'fxint', u: b }); }
  const hx = (a.x + b.x) / 2, hz = (a.z + b.z) / 2, hy = (a.y + b.y) / 2 + 1.2;
  const shove = !!(extra && extra.shove);
  if (blocked) {
    dmg *= b.human ? .12 : shove ? CC.spear.shieldDmg : .25; kb *= shove ? 1 : .4; // (a spear thrust into a shield still drives him back)
    // a captain's sword on a raised shield knocks it aside: he's open for a moment, the next blow lands
    if (a.leader && b.guardUp && !shove && !b.human) { b.guardUp = false; b.gT = SHIELD.open; b.stun = Math.max(b.stun, SHIELD.openStun); b.blockT = 0; fx('fxmsg', { k: 'fxopen', u: b, a }); }
    spark(hx, hy, hz, '#fff3b0', 7); sound('clang', hx, hz); b.blockT = Math.max(b.blockT, .2);
    if (b.isMe) fx('buzz', 15);
  } else {
    spark(hx, hy, hz, TEAMS[colorOf(b.ti)].css, 6); sound('hit', hx, hz);
    if (Math.random() < .4) fx('splat', { x: b.x + rnd(-.4, .4), z: b.z + rnd(-.4, .4), s: rnd(.6, 1.1), ti: b.ti });
    if (b.isMe) { fx('shake', .35); fx('buzz', 35); }
  }
  b.hp -= dmg;
  if (a.isMe && G.capStats) { G.capStats[blocked ? 'blocked' : 'landed']++; G.capStats.dmg += dmg; if (b.hp <= 0 && !b.dead) G.capStats.kills++; }
  if (b.human && b.remote && !blocked) b.lastBlow = { a, dmg, heavy, t: G.T }; // (their parry press may still be on its way)
  if (broke) { gainRally(a, RALLY.guardBreak); b.stun = Math.max(b.stun, onGuard ? GUARD.broken : HEAVY.guardBreak); if (onGuard) { b.guardT = 0; b.guardCd = 2; } fx('fxmsg', { k: 'fxbreak', u: b }); }
  if (a.remote || b.remote) fx('netFlush');
  if (a.isMe) { // your own blows: a beat of hit-stop, longer for heavy hits and kills, and a deeper thud
    const heavy = !blocked && (mult >= 1.35 || b.hp <= 0);
    fx('hitstop', blocked ? .03 : heavy ? .1 : shove ? .075 : .055);
    if (!blocked) fx('shake', heavy ? .22 : shove ? .16 : .1);
    if (heavy) sound('heavy', hx, hz);
  }
  const ang = Math.atan2(b.x - a.x, b.z - a.z);
  push(b, Math.sin(ang) * kb, Math.cos(ang) * kb, blocked ? (shove ? .25 : 0) : broke ? HEAVY.guardBreak : (extra && extra.stun) || .22);
  // heavy blows, slams and captains' finishers launch the body; now and then any captain's kill does
  if (b.hp <= 0) die(b, a, ang, mult >= 1.35 || (extra && extra.unblockable) || (a.leader && Math.random() < .18) ? 1 : 0);
}
// ---------- the duel ----------
// A captain calls out an enemy captain close by; if he takes it up, both armies' men near them form
// a ring round the two and hold off everyone else while they fight it out. See DUEL in config.js.
// G.duels: { id, a (who called it), b, state 'offer' | 'on', t (time left), x, z (the ring), v0 (where
// b stood when called out), aiT, aiYes (a computer captain's answer), graceT, slotT }
const duels = () => G.duels || (G.duels = []);
export const duelOf = u => u && u.duelId ? duels().find(d => d.id === u.duelId) : null;
export const duelOffer = p => duels().find(d => d.state === 'offer' && d.b === p) || null;
export const duelAsked = p => duels().find(d => d.state === 'offer' && d.a === p) || null;
// who o may fight while duels are on: a duellist only his man; nobody else a duellist; a man of the
// ring not the other duellist's men
function duelFoe(u, o) {
  if ((u.duelId || o.duelId) && u.duelId !== o.duelId) return false;
  const g = u.guardOf; if (g && (o.ti === g.a.ti || o.ti === g.b.ti)) return false;
  return true;
}
const busy = u => u.mounted || u.carrying || u.dueled || u.duelId || u.execReady || u.execT > 0 || u.execA || u.execV || u.summon;
export function canChallenge(p, v) {
  if (!p || !v || p === v || !p.leader || !v.leader || p.dead || v.dead || !isEnemy(p, v) || busy(p) || busy(v)) return false;
  if ((p.duelAskT || 0) > G.T) return false;
  if (duels().some(d => d.a === p || d.b === p || d.a === v || d.b === v)) return false;
  return Math.hypot(v.x - p.x, v.z - p.z) <= DUEL.offerR;
}
// the enemy captain the ⚔ tag hangs over: the nearest one you could call out
export function duelTarget(p) {
  let best = null, bd = 1e9;
  for (const v of G.units) { if (!v.leader || !canChallenge(p, v)) continue; const d = Math.hypot(v.x - p.x, v.z - p.z); if (d < bd) { bd = d; best = v; } }
  return best;
}
// One press for a player: take up a challenge made to you, else call out the captain the tag is over.
export function duelAct(p, id) {
  if (!p || p.dead || G.state !== 'play') return false;
  const o = duelOffer(p); if (o) { startDuel(o); return true; }
  const v = id != null ? G.units.find(u => u.id === id && !u.dead) : duelTarget(p);
  return challenge(p, v);
}
export function challenge(p, v) {
  const back = v && duels().find(d => d.state === 'offer' && d.a === v && d.b === p); // (he already called you out: calling him out is a yes)
  if (back) { startDuel(back); return true; }
  if (!canChallenge(p, v)) return false;
  const d = { id: ++G.duelN, a: p, b: v, state: 'offer', t: DUEL.offerT, x: v.x, z: v.z, v0: { x: v.x, z: v.z }, aiT: rnd(.9, 1.7) };
  if (!v.human) { const hurt = v.hp / v.max < p.hp / p.max - .25; d.aiYes = Math.random() < DUEL.accept[G.diff] * (hurt ? .4 : 1); }
  duels().push(d); p.duelAskT = G.T + 15;
  if (!p.human) { p.face = Math.atan2(v.x - p.x, v.z - p.z); p.vx = p.vz = 0; }
  say('duelAsk', p.ti, v.ti); fx('fxmsg', { k: 'fxduelask', u: v, a: p });
  if (p.remote || v.remote) fx('netFlush');
  return true;
}
function startDuel(d) {
  const { a, b } = d;
  if (!canFight(a) || !canFight(b)) { endDuel(d, 'off'); return; }
  d.state = 'on'; d.t = DUEL.time; d.graceT = 1.2; d.slotT = 0;
  d.x = (a.x + b.x) / 2; d.z = (a.z + b.z) / 2;
  a.duelId = b.duelId = d.id; a.dueled = b.dueled = true;
  a.foe = b; b.foe = a; a.fd = b.fd = Math.hypot(a.x - b.x, a.z - b.z);
  for (const u of [a, b]) { u.guardT = 0; u.windup = 0; u.heavyCharge = 0; u.pending = null; }
  say('duelOn', a.ti, b.ti); fx('fxmsg', { k: 'fxduel', u: b, a });
  fx('netFlush');
}
const canFight = u => u && !u.dead && !u.mounted && !u.carrying && !(u.execT > 0) && !u.execV;
function endDuel(d, why, w, by) {
  const { a, b } = d;
  G.duels = duels().filter(x => x !== d); d.end = why; G.lastDuel = d;
  if (a.duelId === d.id) a.duelId = 0; if (b.duelId === d.id) b.duelId = 0;
  for (const u of G.units) if (u.guardOf === d) { u.guardOf = null; u.rt = 0; }
  if (d.state !== 'on' || why === 'off') return;
  if (why === 'win') { // the winner's men roar; the loser's break and run
    const l = w === a ? b : a, sw = G.teams[w.ti], sl = G.teams[l.ti];
    sw.rally = 100; sw.morale = Math.min(100, sw.morale + DUEL.winMorale);
    if (squadOf(l.ti).length) { sl.morale = 0; sl.routT = MORALE.routT; fx('fxmsg', { k: 'fxrout', u: squadOf(l.ti)[0], ti: l.ti }); }
    say('duelWon', w.ti, l.ti); fx('fxmsg', { k: 'fxduelwin', u: w, a: l });
  } else if (why === 'draw') {
    for (const u of [a, b]) { const s = G.teams[u.ti]; s.morale = Math.min(100, s.morale + DUEL.draw); }
    say('duelDraw', a.ti, b.ti); fx('fxmsg', { k: 'fxdueldraw', u: a, a: b });
  } else if (why === 'broken') { // somebody forced his way in: his own men think the less of him, and theirs take heart
    loseHeart(by.ti, DUEL.broken); gainRally(a, DUEL.brokenRally); gainRally(b, DUEL.brokenRally);
    say('duelBroken', by.ti, a.ti, b.ti); fx('fxmsg', { k: 'fxduelbreak', u: by, a });
  }
  fx('netFlush');
}
function refuse(d) {
  G.duels = duels().filter(x => x !== d);
  loseHeart(d.b.ti, DUEL.decline);
  say('duelNo', d.b.ti, d.a.ti); fx('fxmsg', { k: 'fxduelno', u: d.b, a: d.a });
}
function duelTick(dt) {
  const ds = duels();
  // computer captains call out a captain close by now and then: a player more than one of their own
  ds.aiT = (ds.aiT || 0) - dt;
  if (ds.aiT <= 0) {
    ds.aiT = 1;
    for (const s of G.teams) {
      const u = s.leader; if (!s.active || s.human || !u || u.dead || u.hp < u.max * .55 || routing(u.ti)) continue;
      const v = duelTarget(u); if (!v) continue;
      if (Math.random() < (v.human ? DUEL.aiChallenge[G.diff] : DUEL.aiVsAi)) challenge(u, v);
    }
  }
  for (const d of [...ds]) {
    const { a, b } = d, dist = Math.hypot(a.x - b.x, a.z - b.z);
    if (d.state === 'offer') {
      d.t -= dt;
      if (!canFight(a) || !canFight(b) || a.duelId || b.duelId || !isEnemy(a, b)) { endDuel(d, 'off'); continue; }
      if (!a.human) { a.vx *= .5; a.vz *= .5; } // (a computer captain who's called you out waits for your answer)
      if (!b.human) { d.aiT -= dt; if (d.aiT <= 0) { if (d.aiYes) startDuel(d); else refuse(d); } continue; }
      // a player answers by stepping up to him (or the ⚔ tag), and refuses by turning away or letting it pass
      const dx = a.x - d.v0.x, dz = a.z - d.v0.z, L = Math.hypot(dx, dz) || 1, prog = ((b.x - d.v0.x) * dx + (b.z - d.v0.z) * dz) / L;
      if (prog > 2.2) startDuel(d);
      else if (d.t <= 0 || prog < -3 || dist > DUEL.offerR + 6) { if (prog < -3 || d.t <= 0) refuse(d); else endDuel(d, 'off'); }
      continue;
    }
    d.t -= dt; if (d.graceT > 0) d.graceT -= dt;
    if (d.t <= 0) { endDuel(d, 'draw'); continue; }
    if (a.dead || b.dead || a.mounted || b.mounted) { endDuel(d, 'off'); continue; } // (an execution between them plays out: die() settles it)
    // the ring: both armies' men close by (not running) keep it, spaced evenly round it
    d.slotT -= dt;
    const gs = [];
    for (const u of G.units) {
      if (u.dead || u.leader || (u.ti !== a.ti && u.ti !== b.ti)) continue;
      if (routing(u.ti)) { u.guardOf = null; continue; }
      if (u.guardOf !== d && Math.hypot(u.x - d.x, u.z - d.z) < DUEL.guardR) { u.guardOf = d; u.rt = 0; d.slotT = 0; }
      if (u.guardOf === d) gs.push(u);
    }
    if (d.slotT <= 0 && gs.length) {
      d.slotT = .6;
      for (const g of gs) g.ringA0 = Math.atan2(g.x - d.x, g.z - d.z);
      gs.sort((p, q) => p.ringA0 - q.ringA0);
      let sx = 0, sz = 0; gs.forEach((g, i) => { const o = g.ringA0 - i / gs.length * Math.PI * 2; sx += Math.sin(o); sz += Math.cos(o); });
      const off = Math.atan2(sx, sz); gs.forEach((g, i) => { g.ringA = off + i / gs.length * Math.PI * 2; });
    }
    // anyone at war with both who forces his way well inside breaks it (only a player's captain can:
    // everyone else is held at the edge, see duelBounds)
    for (const u of G.units) {
      if (u.dead || u === a || u === b || !u.human || !u.leader || !(d.graceT <= 0)) continue;
      if (!isEnemy(u, a) || !isEnemy(u, b)) { if (Math.hypot(u.x - d.x, u.z - d.z) < DUEL.ring + .6 && (u.sacredT || 0) < G.T) { u.sacredT = G.T + 6; say('duelSacred', u.ti); } continue; }
      if (Math.hypot(u.x - d.x, u.z - d.z) < DUEL.ring * .65) { endDuel(d, 'broken', null, u); break; }
    }
  }
}
// Where the ring keeps people: the two inside it, everyone else out at its edge, except a player's
// captain at war with both, who can force his way in (and break it). Runs wherever a unit is moved.
export function duelBounds(u) {
  if (u.dead) return;
  for (const d of G.duels) {
    if (d.state !== 'on') continue;
    const dx = u.x - d.x, dz = u.z - d.z, dd = Math.hypot(dx, dz) || .01;
    if (u === d.a || u === d.b) { const m = DUEL.ring - .9; if (dd > m) { u.x = d.x + dx / dd * m; u.z = d.z + dz / dd * m; } continue; }
    const m = DUEL.ring + .3; if (dd >= m) continue;
    if (u.human && u.leader && isEnemy(u, d.a) && isEnemy(u, d.b) && !(d.graceT > 0)) continue;
    u.x = d.x + dx / dd * m; u.z = d.z + dz / dd * m;
  }
}
// A man keeping the ring: watching the fight from his place, turning out to fight off anyone who comes at it.
function guardRing(u, d, dt) {
  u.holding = false; u.aim = false;
  const R = DUEL.ring + (u.kind === 'arch' ? 2.4 : .9), A = u.ringA ?? Math.atan2(u.x - d.x, u.z - d.z);
  const gx = d.x + Math.sin(A) * R, gz = d.z + Math.cos(A) * R;
  const foe = u.foe, fd = u.fd;
  if (foe && !foe.dead && Math.hypot(foe.x - d.x, foe.z - d.z) < R + 8) {
    const reach = u.r + foe.r + u.reach;
    if (u.kind === 'arch' && fd > reach) {
      u.aim = true; go(u, gx, gz, speedOf(u), dt, .3); faceTo(u, foe.x, foe.z, dt, 8);
      if (fd <= u.range && u.shootCd <= 0 && u.stun <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { shoot(u, foe); u.shootCd = u.shootBase * rnd(.85, 1.2); }
      return;
    }
    go(u, foe.x, foe.z, speedOf(u), dt, reach * .7); faceTo(u, foe.x, foe.z, dt);
    if (fd < reach) startSwing(u, foe);
    return;
  }
  const dd = go(u, gx, gz, speedOf(u) * (Math.hypot(gx - u.x, gz - u.z) > 5 ? 1.15 : 1), dt, .2);
  if (dd < 1.2) faceTo(u, d.x, d.z, dt, 5); // (eyes on the fight)
}
// ---------- the execution ----------
// An enemy captain beaten down, with none of his men near him, can be finished: marked (execReady,
// shown on every phone), and a captain's Attack within reach does it. He drops to his knees, the blow
// comes down a moment later; nobody can touch either of them while it plays.
export function execMark() {
  for (const s of G.teams) {
    const v = s.leader; if (!v) continue;
    v.execReady = false;
    if (v.dead || v.mounted || v.execT > 0 || v.carrying) continue;
    if (v.hp > v.max * (v.stun > 0 ? EXEC.hpStunned : EXEC.hp)) continue;
    let hunter = false, guarded = false;
    for (const o of G.units) {
      if (o.dead || o === v) continue;
      const d = Math.hypot(o.x - v.x, o.z - v.z);
      if (!isEnemy(o, v)) { if (!o.leader && d < EXEC.clearR && !v.duelId) { guarded = true; break; } } // (in a duel his men keep the ring: nobody steps in to save him)
      else if (o.leader && o.human && !o.mounted && d < EXEC.markR && (o.duelId || 0) === (v.duelId || 0)) hunter = true;
    }
    v.execReady = hunter && !guarded;
  }
}
export function execTarget(p) {
  if (!p || p.dead || p.mounted || p.carrying) return null;
  let best = null, bd = EXEC.reach;
  for (const v of G.units) { if (v.leader && v.execReady && !v.dead && isEnemy(v, p)) { const d = Math.hypot(v.x - p.x, v.z - p.z); if (d < bd) { bd = d; best = v; } } } // (by unit, not team: a joiner's phone has no team leaders)
  return best;
}
function startExec(p, v) {
  p.execT = v.execT = EXEC.dur; p.execOf = v; v.execBy = p; p.execHit = false; v.execReady = false; p.execA = true; v.execV = true;
  p.cd = EXEC.dur; v.stun = Math.max(v.stun, EXEC.dur); p.pending = null; v.pending = null; v.windup = 0; v.heavyCharge = 0; v.guardT = 0;
  p.vx = p.vz = v.vx = v.vz = 0; p.charge = 0;
  const ang = Math.atan2(v.x - p.x, v.z - p.z); p.face = ang; v.face = ang + Math.PI;
  sound('swing', p.x, p.z); fx('fxmsg', { k: 'fxexecgo', u: v, a: p });
  if (p.remote || v.remote) fx('netFlush');
}
function execTick(u, dt) {
  if (!(u.execT > 0)) return;
  u.execT -= dt; u.vx = u.vz = 0;
  const v = u.execOf;
  if (v) { // the executioner: square to him at arm's length, and bring it down at strikeAt
    if (!v.dead) { const ang = Math.atan2(v.x - u.x, v.z - u.z); u.face = ang; u.x = v.x - Math.sin(ang) * EXEC.gap; u.z = v.z - Math.cos(ang) * EXEC.gap; }
    if (!u.execHit && EXEC.dur - u.execT >= EXEC.strikeAt) {
      u.execHit = true;
      if (!v.dead) {
        const ang = Math.atan2(v.x - u.x, v.z - u.z);
        v.execT = 0; v.execV = false; v.hp = 0; v.lastHit = G.T;
        spark(v.x, v.y + 1.4, v.z, TEAMS[colorOf(v.ti)].css, 14); sound('heavy', v.x, v.z); sound('hit', v.x, v.z);
        fx('fxmsg', { k: 'fxexec', u: v, a: u });
        die(v, u, ang, 1);
        loseHeart(v.ti, EXEC.morale); gainRally(u, EXEC.rally);
        if (u.isMe) { fx('hitstop', .16); fx('shake', .6); }
        if (u.remote) fx('netFlush');
      }
    }
    if (u.execT <= 0) { u.execT = 0; u.execOf = null; u.execA = false; u.cd = 0; }
  } else if (u.execT <= 0) { u.execT = 0; u.execV = false; } // (the condemned: he kneels until the blow)
}
// ---------- fighting on horseback ----------
const rideW = u => (u.weapon === 'spear' ? 'spear' : 'sword');
export const strikeAt = (u, tg) => RIDE[rideW(u)].at + (tg ? tg.r * .5 : 0);
const inLock = (p, o) => { const d = Math.hypot(o.x - p.x, o.z - p.z); return d <= RIDE.lockR && Math.abs(angDiff(p.face, Math.atan2(o.x - p.x, o.z - p.z))) <= RIDE.lockCone * (d < 4 ? 1.6 : 1); };
// whoever is ahead to ride at: the nearest enemy roughly in front
export function rideLock(p) {
  let best = null, bs = 1e9;
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, p) || !inLock(p, o)) continue;
    const d = Math.hypot(o.x - p.x, o.z - p.z), sc = d + Math.abs(angDiff(p.face, Math.atan2(o.x - p.x, o.z - p.z))) * 8 + (o.leader ? -3 : 0);
    if (sc < bs) { bs = sc; best = o; }
  }
  return best;
}
// how well a release at this moment is timed: 'perfect' / 'good' near the strike distance, 'miss' too far
// out, 'graze' too close (or already passing)
export function rideQuality(p, tg) {
  if (!tg || tg.dead) return 'miss';
  const d = Math.hypot(tg.x - p.x, tg.z - p.z), ahead = Math.abs(angDiff(p.face, Math.atan2(tg.x - p.x, tg.z - p.z)));
  if (ahead > 1.4) return d < 4 ? 'graze' : 'miss';
  const slack = p.remote ? RIDE.remote : 0, err = d - strikeAt(p, tg) + (p.remote ? Math.hypot(p.vx, p.vz) * .06 : 0); // (a joining player's release arrives a beat late: count from a little further out)
  return Math.abs(err) <= RIDE.perfect + slack ? 'perfect' : Math.abs(err) <= RIDE.good + slack ? 'good' : err > 0 ? 'miss' : 'graze';
}
// letting go of Attack on horseback
export function rideRelease(p, w, t) {
  p.rideReady = false;
  if (!p || p.dead || !p.mounted || p.cd > 0 || p.stun > 0) { p.rideTg = null; return; }
  if (w === 'jav') { javThrow(p, t > HOLD_ATK.jav ? Math.min(1, (t - HOLD_ATK.jav) / (HOLD_ATK.javFull - HOLD_ATK.jav)) : 0); return; }
  if (t < RIDE.tap) { startSweep(p); if (p.pending) p.pending.mult = RIDE.tapMult; p.rideTg = null; return; } // a tap: a weak swipe at whatever's close
  const tg = p.rideTg && !p.rideTg.dead ? p.rideTg : rideLock(p); p.rideTg = null;
  rideStrike(p, tg, rideQuality(p, tg));
}
// the ride-by blow: its worth set by the timing and how fast the horse is going
function rideStrike(p, tg, q) {
  const w = rideW(p), sf = clamp(Math.hypot(p.vx, p.vz) / 10, .4, 1.3);
  p.swing = .38; p.swingKind = 0; p.cd = .7; p.lastSwingT = G.T; sound('swing', p.x, p.z);
  if (p.human) fx('fxmsg', { k: 'fxride', u: tg || p, a: p, q });
  if (!tg || q === 'miss') return;
  const ang = Math.atan2(tg.x - p.x, tg.z - p.z); p.face = turn(p.face, ang, .5);
  const mult = RIDE[w].mult * (q === 'perfect' ? RIDE.perfectX : q === 'good' ? RIDE.goodX : RIDE.grazeX) * (.5 + .6 * sf);
  if (q === 'perfect' && w === 'spear' && tg.mounted) { horseDamage(tg, 999); if (tg.mounted) dismount(tg, true); gainRally(p, RALLY.unhorse); fx('fxmsg', { k: 'fxjoust', u: tg, a: p }); } // a lance square on another rider: off he goes
  hit(p, tg, mult, { heavy: q !== 'graze', shown: true, kb: q === 'perfect' ? 2.2 : 1.2, stun: q === 'perfect' ? 1 : .4 }); // (shown: a rider's blow is always announced, so always parryable on the glint)
  if (q === 'perfect') {
    gainRally(p, RALLY.ride);
    p.slowT = Math.max(p.slowT || 0, .3); tg.slowT = Math.max(tg.slowT || 0, .3); // (the moment has weight: the two of them, in slow motion)
    if (w === 'sword') { let n = 0; for (const o of G.units) { // a sabre pass cuts through to the men beside him
      if (o === tg || o.dead || !isEnemy(o, p) || o.mounted) continue;
      if (Math.hypot(o.x - tg.x, o.z - tg.z) > 2.4) continue; hit(p, o, mult * .55, { kb: 1.4 }); if (++n >= 2) break;
    } }
    if (p.isMe) { fx('hitstop', .08); fx('shake', .4); }
  }
}
// a computer rider: lines up on a target, lowers his weapon (a red "!"), glints just before the blow
// (the moment for a man on foot to parry), and strikes with a timing that depends on the difficulty
function aiRide(u, foe, fd) {
  const ahead = Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .8, at = strikeAt(u, foe);
  if (!ahead || u.cd > 0 || u.stun > 0 || fd > 11) { if (fd > 11 || u.stun > 0) { u.couch = false; u.glint = false; } return; }
  if (!u.couch) {
    u.couch = true; const r = Math.random(), P = RIDE.ai.perfect[G.diff], Gd = RIDE.ai.good[G.diff];
    u.rideAt = r < P ? at : r < P + Gd ? at - (RIDE.perfect + .6) * (Math.random() < .5 ? 1 : -1) : at - RIDE.good - .8;
  }
  // the glint comes about a parry-window before the blow, judged by how fast he's actually closing on you
  const closing = ((foe.x - u.x) * u.vx + (foe.z - u.z) * u.vz) / Math.max(fd, .1) - ((foe.x - u.x) * foe.vx + (foe.z - u.z) * foe.vz) / Math.max(fd, .1);
  if (!u.glint && fd - u.rideAt < Math.max(1.5, closing) * PARRY.window * .85) u.glint = true; // (seen and heard via the renderer, on every phone)
  if (fd <= u.rideAt || fd < 1.6) { const q = Math.abs(fd - at) <= RIDE.perfect ? 'perfect' : Math.abs(fd - at) <= RIDE.good ? 'good' : 'graze'; u.couch = false; u.glint = false; rideStrike(u, foe, q); }
}

// ---------- parries, heavy blows and held attacks ----------
function parry(b, a, heavy, byAI) {
  b.parryT = -9; b.lastBlow = null; b.cd = 0; b.stun = 0;
  b.riposteT = G.T + PARRY.riposteT; b.ripN = PARRY.riposteN; b.parries = (b.parries || 0) + 1; gainRally(b, RALLY.parry);
  if (byAI) { b.guardT = 0; b.guardCd = 1.5; } // (he turned your blow: now he comes at you)
  a.windup = 0; a.glint = false; a.pending = null; a.stun = Math.max(a.stun, byAI ? GUARD.stun : heavy ? PARRY.heavyStun : PARRY.stun);
  a.ahT = 0; a.heavyCharge = 0;
  // the moment has weight for the two men in it: they move in slow motion for a beat, the battle around them doesn't
  a.slowT = b.slowT = PARRY.slowT * (heavy ? 1.2 : 1);
  const ang = Math.atan2(a.x - b.x, a.z - b.z); push(a, Math.sin(ang) * 6, Math.cos(ang) * 6, a.stun);
  b.face = ang;
  const hx = (a.x + b.x) / 2, hz = (a.z + b.z) / 2;
  spark(hx, (a.y + b.y) / 2 + 1.5, hz, '#ffffff', 14); sound('parry', hx, hz);
  fx('fxmsg', { k: 'fxparry', u: b, a, heavy, byAI: !!byAI });
  if (a.remote || b.remote) fx('netFlush');
}
// Block pressed (the start of a press, not holding it): opens a short parry window. A press that
// comes hard on the heels of the last one doesn't, so it can't be mashed. For a joining player
// whose press arrives just after a blow landed, the blow is parried after all.
export function blockPress(p) {
  if (!p || p.dead || p.mounted) return;
  const last = p.lastBlkPress ?? -9; p.lastBlkPress = G.T;
  if (G.T - last < PARRY.lock) return;
  p.parryT = G.T;
  const lb = p.lastBlow;
  if (p.remote && lb && G.T - lb.t <= PARRY.remote && lb.a && !lb.a.dead && p.hp > 0) { p.hp = Math.min(p.max, p.hp + lb.dmg); p.lastBlow = null; parry(p, lb.a, lb.heavy); }
}
// a telegraphed heavy blow: the weapon goes up, then comes down `windup` seconds later
function startHeavy(u, tg, windup) {
  if (u.cd > 0 || u.stun > 0 || u.windup > 0 || u.mounted) return false;
  u.windup = windup; u.glint = false; u.heavyTg = tg; u.cd = windup + .55; u.swingKind = 5;
  u.face = Math.atan2(tg.x - u.x, tg.z - u.z);
  return true;
}
function heavyTick(u, dt) {
  if (!(u.windup > 0)) return;
  if (u.stun > 0 || u.dead) { u.windup = 0; u.glint = false; return; }
  const tg = u.heavyTg;
  if (tg && !tg.dead) u.face = turn(u.face, Math.atan2(tg.x - u.x, tg.z - u.z), dt * 3); // (it tracks you, but slowly: step aside late and it still finds you)
  u.windup -= dt;
  if (!u.glint && u.windup <= PARRY.window) u.glint = true; // (seen and heard via the renderer, on every phone)
  if (u.windup > 0) return;
  u.glint = false; u.swing = .38;
  if (tg && !tg.dead && Math.hypot(tg.x - u.x, tg.z - u.z) <= u.r + tg.r + u.reach + HEAVY.reach && Math.abs(angDiff(u.face, Math.atan2(tg.x - u.x, tg.z - u.z))) < 1.1) {
    hit(u, tg, HEAVY.mult, { heavy: true, kb: HEAVY.kb, stun: .5 });
    if (!tg.dead) sound('heavy', tg.x, tg.z);
  } else sound('swing', u.x, u.z); // (dodged: a whiff)
}
// Holding Attack, per weapon. Called every frame for each human captain with whether Attack is held;
// on release the held time decides what happens (also given directly for a joining player, whose
// release arrives as one event with the time they held it).
export function attackHold(p, held, dt, remote) {
  if (!p || p.dead || p.carrying) { p.ahT = 0; p.heavyCharge = 0; p.bracing = false; p.javDraw = 0; p.rideReady = false; return; }
  const w = p.weapon || 'sword';
  if (p.mounted) { // on horseback: lock on and time the pass (sword, spear), or draw a javelin
    p.heavyCharge = 0; p.bracing = false;
    if (held) p.ahT = (p.ahT || 0) + dt;
    const t = held ? p.ahT : 0;
    p.javDraw = w === 'jav' && t > HOLD_ATK.jav ? Math.min(1, (t - HOLD_ATK.jav) / (HOLD_ATK.javFull - HOLD_ATK.jav)) : 0;
    p.rideReady = w !== 'jav' && t > RIDE.tap;
    if (p.rideReady) { if (!p.rideTg || p.rideTg.dead || !inLock(p, p.rideTg)) p.rideTg = rideLock(p); } else p.rideTg = null;
    if (!held && p.ahT > 0) { const ht = p.ahT; p.ahT = 0; p.rideReady = false; if (!remote) rideRelease(p, w, ht); }
    return;
  }
  p.rideReady = false; p.rideTg = null;
  if (held && p.stun > 0 && w === 'sword') p.ahT = 0; // (knocked about: the wind-up starts over)
  else if (held) p.ahT = (p.ahT || 0) + dt;
  const t = held ? p.ahT : 0;
  p.heavyCharge = w === 'sword' && t > HOLD_ATK.sword ? Math.min(1, (t - HOLD_ATK.sword) / (HOLD_ATK.swordFull - HOLD_ATK.sword)) : 0;
  p.bracing = w === 'spear' && t > HOLD_ATK.brace;
  p.javDraw = w === 'jav' && t > HOLD_ATK.jav ? Math.min(1, (t - HOLD_ATK.jav) / (HOLD_ATK.javFull - HOLD_ATK.jav)) : 0;
  if (p.heavyCharge >= 1 && !p.heavyReady) { p.heavyReady = true; if (p.isMe) sound('glint', p.x, p.z); }
  if (!held && p.ahT > 0) { const ht = p.ahT; p.ahT = 0; if (!remote) attackRelease(p, w, ht); } // (a joining player's release arrives as its own event)
}
export function attackRelease(p, w, t) {
  p.heavyCharge = 0; p.bracing = false; p.javDraw = 0; p.heavyReady = false;
  if (!p || p.dead || p.mounted || p.stun > 0) return;
  if (w === 'sword' && G.T - (p.chargeBrokeT ?? -9) < t) return; // (struck while winding it up: the blow is lost)
  if (w === 'sword' && t >= HOLD_ATK.sword + .12) heavySwing(p, Math.min(1, (t - HOLD_ATK.sword) / (HOLD_ATK.swordFull - HOLD_ATK.sword)));
  if (w === 'jav') { const k = t > HOLD_ATK.jav ? Math.min(1, (t - HOLD_ATK.jav) / (HOLD_ATK.javFull - HOLD_ATK.jav)) : 0; javThrow(p, k); }
}
// the sword's held blow: slower, but smashes guards, knocks men flat and cuts through a wind-up
function heavySwing(p, k) {
  p.cd = Math.min(p.cd, 0);
  const tg = softAim(p, CC.sword.aim + 1.2);
  if (!startSwing(p, tg)) return;
  if (tg) { const ang = Math.atan2(tg.x - p.x, tg.z - p.z); p.face = ang; p.vx += Math.sin(ang) * 6; p.vz += Math.cos(ang) * 6; }
  Object.assign(p.pending, { t: .1, mult: 1.35 + .5 * k, heavy: true, cleave: true, kb: 1.4 + .6 * k, unblockable: false });
  p.cd = .7; p.combo = 0; p.swingKind = 5; p.lastSwingT = G.T;
}
// a javelin, drawn back for k (0..1): harder, flatter and farther the longer it was drawn
function javThrow(p, k) {
  if ((p.javAmmo || 0) < 1 || p.cd > 0 || p.stun > 0) return false;
  const reach = CC.jav.range + HOLD_ATK.javRange * k;
  const t = javTarget(p, reach);
  p.face = Math.atan2(t.x - p.x, t.z - p.z);
  throwJavelin(p, t, CC.jav.dmg * (1 + HOLD_ATK.javMult * k));
  const a = G.arrows[G.arrows.length - 1]; if (a && k >= HOLD_ATK.unhorse) { a.unhorse = true; a.dur *= .75; a.peak *= .6; }
  p.javAmmo--; if (p.javRegen <= 0) p.javRegen = CC.jav.regen;
  p.cd = CC.jav.cd; p.swing = .38; p.swingKind = 4;
  return true;
}
// a planted spear: whoever comes onto its point in front is struck, and a rider is thrown
function braceTick(p, dt) {
  p.braceCd = (p.braceCd || 0) - dt;
  if (!p.bracing || p.braceCd > 0 || p.stun > 0) return;
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, p)) continue;
    const dx = o.x - p.x, dz = o.z - p.z; if (Math.abs(dx) > 5 || Math.abs(dz) > 5) continue;
    const d = Math.hypot(dx, dz), reach = p.r + o.r + p.reach + CC.spear.reachB + .4;
    if (d > reach || Math.abs(angDiff(p.face, Math.atan2(dx, dz))) > .7) continue;
    p.braceCd = HOLD_ATK.braceCd; p.swing = .38; p.swingKind = 3;
    if (o.mounted) {
      horseDamage(o, 60); if (o.mounted) dismount(o, true); gainRally(p, RALLY.unhorse); hit(p, o, 1.6, { unparryable: true, kb: 1.5 });
      fx('fxmsg', { k: 'fximpale', u: o }); if (p.isMe) { fx('hitstop', .12); fx('shake', .45); }
    } else hit(p, o, 1.45, { kb: 1.6, stun: .5 });
    break;
  }
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
  if (b.execT > 0 || b.iframeT > 0) return;
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
  if (a.unhorse && b.mounted) { horseDamage(b, dmg); if (b.mounted) dismount(b, true); gainRally(a.shooter, RALLY.unhorse); fx('fxmsg', { k: 'fxunhorse', u: b }); return; } // a full-draw javelin knocks a rider clean off
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
function die(u, killer, ang, launch = 0) {
  if (u.dead) return;
  u.dead = true; u.deadT = 0;
  if (launch) { // off they go: high, far, spinning (see the ragdoll in render/soldiers.js)
    const f = rnd(8.5, 12); u.vx += Math.sin(ang) * f; u.vz += Math.cos(ang) * f; u.vy = rnd(9, 12); u.launch = true;
    sound('scream', u.x, u.z);
  } else { u.vx += Math.sin(ang) * 6; u.vz += Math.cos(ang) * 6; u.vy = rnd(3, 6); }
  u.fallDir = Math.random() < .5 ? 1 : -1;
  fx('splat', { x: u.x, z: u.z, s: rnd(1, 1.5), ti: u.ti }); sound('die', u.x, u.z);
  if (u.mounted) dismount(u, false);
  if (u.summon) { u.summon.state = 'leaving'; u.summon.t = 0; u.summon = null; }
  if (u.carrying) dropFlag(u);
  if (u.leader) { const dl = (G.duels || []).find(d => d.a === u || d.b === u); if (dl) { if (dl.state === 'on' && killer && (killer === dl.a || killer === dl.b)) endDuel(dl, 'win', killer); else endDuel(dl, 'off'); } }
  const s = G.teams[u.ti];
  // the army takes it to heart: more so for a man cut down from the side or behind, most of all its captain
  loseHeart(u.ti, u.leader ? MORALE.captain : MORALE.death + (killer && behind(u, killer) ? MORALE.flankDeath : 0));
  if (killer && killer.leader) gainRally(killer, u.leader ? RALLY.capKill : RALLY.kill);
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
export const armiesOfColor = c => [c, c + 4, c + 8].slice(0, 1 + (G.duo[c] | 0));
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
  if (G.mode === 'ctf') for (const a of new Set(G.ALLY)) if (allianceCaps(a) >= rules().caps) return endMatch(a, 'caps');
  if (G.mode === 'ctrl') for (const a of new Set(G.ALLY)) if (allianceCtrl(a) >= rules().win) return endMatch(a, 'control');
}
function checkTime() {
  if (G.state !== 'play' || G.T < matchTime()) return;
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

// ---------- Fortify: a castle's palisade and gate towers ----------
// Each castle's state: which sections are broken (a bitmask) and how much each has left. The level
// is the castle army's 'fort' upgrade. Every phone applies the same thing (applyFort) to the
// obstacles, the arrow blockers and the walking grid.
export function initForts() {
  G.forts = [0, 1, 2, 3].map(() => ({ broken: 0, hp: new Array(FORT.segs).fill(FORT.segHp), towerT: rnd(0, FORT.towerEvery) }));
  const start = (G.layout && G.layout.fortStart) || 0;
  for (let c = 0; c < 4; c++) { if (G.teams[c]) G.teams[c].up.fort = start; applyFort(c); }
}
export const fortLvl = c => (G.teams[c] && G.teams[c].up && G.teams[c].up.fort) || 0;
export function applyFort(c) {
  const P = G.layout && G.layout.pal && G.layout.pal[c], f = G.forts && G.forts[c]; if (!P || !f) return;
  const lv = fortLvl(c), on = k => lv >= 1 && !((f.broken >> k) & 1);
  for (const o of P.obs) o.off = !on(o.k);
  for (const b of P.blk) b.off = !on(b.k);
  for (let k = 0; k < FORT.segs; k++) setPalSeg(c + ':' + k, on(k));
}
// the nearest standing section of an enemy palisade within a man's reach, in front of him
function wallInReach(u, cone = 1.3) {
  let best = null, bd = 1e9;
  for (const o of nearObstacles(u.x, u.z)) {
    if (!o.pal || o.off || !isEnemyTi(o.c, u.ti)) continue;
    const d = Math.hypot(o.x - u.x, o.z - u.z); if (d > u.r + o.r + u.reach + .4 || d > bd) continue;
    if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > cone) continue;
    bd = d; best = o;
  }
  return best;
}
function hitWall(u, w) {
  const f = G.forts[w.c]; if (!f || fortLvl(w.c) < 1 || ((f.broken >> w.k) & 1)) return;
  f.hp[w.k] -= u.dmg * FORT.wallDmg * (u.leader ? FORT.capWall : 1) * aiDmg(u.ti);
  sound('wall', w.x, w.z); spark(w.x, groundY(w.x, w.z) + 1.4, w.z, '#a3825a', 4);
  if (f.hp[w.k] <= 0) { f.broken |= 1 << w.k; applyFort(w.c); say('breach', w.c, u.ti); }
}

// ---------- holdings: places on the map worth taking ----------
// Owned by an alliance (G.ALLY value), not an army: allies share them. Taken by standing in one with
// only your side's men there; a fight inside freezes it; empty, a half-taken one slowly reverts.
export const makeHolds = L => (L.holds || []).map((h, i) => ({ ...h, id: i, owner: -1, prog: 0, cap: -1, tick: 0 }));
const allianceOf = ti => G.ALLY[colorOf(ti)];
const sideArmies = a => activeArmies().filter(i => allianceOf(i) === a && !teamOut(i));
function holdsTick(dt) {
  const hs = G.holds; if (!hs || !hs.length) return;
  for (const h of hs) {
    const n = new Map();
    for (const u of G.units) { if (u.dead || u.routing || Math.hypot(u.x - h.x, u.z - h.z) > h.r) continue; const a = allianceOf(u.ti); n.set(a, (n.get(a) || 0) + 1); }
    h.contested = n.size > 1;
    if (n.size === 1) {
      const [a] = n.keys();
      if (a === h.owner) { h.prog = 0; h.cap = -1; }
      else {
        if (h.cap !== a) { h.cap = a; h.prog = 0; }
        h.prog += dt / HOLDS.capture * Math.min(2, .6 + n.get(a) / 5); // (more men take it quicker)
        if (h.prog >= 1) { h.owner = a; h.prog = 0; h.cap = -1; h.tick = 0; say('holdTaken', a, h.kind); G.teams.forEach(s => { if (!s.human) s.thinkT = Math.min(s.thinkT, rnd(.5, 2)); }); }
      }
    } else if (n.size === 0 && h.prog > 0) { h.prog = Math.max(0, h.prog - dt / HOLDS.capture * .5); if (!h.prog) h.cap = -1; }
    if (h.owner < 0) continue;
    if (h.kind === 'oasis') { // its water heals the men in it; its trade fills every purse on the side
      for (const u of G.units) if (!u.dead && u.hp < u.max && allianceOf(u.ti) === h.owner && Math.hypot(u.x - h.x, u.z - h.z) < h.r) u.hp = Math.min(u.max, u.hp + HOLDS.oasis.heal * dt);
      for (const i of sideArmies(h.owner)) G.teams[i].gold += HOLDS.oasis.gold * dt;
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
// A computer captain's eye for the map: a holding his side doesn't have (or one of his side's under
// attack nearby) is worth a march, more so for some captains than others.
function holdPlan(u, s) {
  const hs = G.holds; if (!hs || !hs.length) return null;
  const a = allianceOf(u.ti);
  if (s.plan && s.plan.kind === 'hold') { const h = hs[s.plan.id]; if (h && (h.owner !== a || h.contested) && Math.random() > .12) return s.plan; }
  s.holdBias = s.holdBias ?? rnd(.3, .7);
  const d = h => Math.hypot(h.x - u.x, h.z - u.z);
  const threatened = hs.filter(h => h.owner === a && (h.contested || h.cap >= 0) && d(h) < 70).sort((x, y) => d(x) - d(y))[0];
  if (threatened && Math.random() < .7) return { kind: 'hold', id: threatened.id };
  const want = hs.filter(h => h.owner !== a).sort((x, y) => d(x) - d(y))[0];
  if (want && Math.random() < s.holdBias) return { kind: 'hold', id: want.id };
  return null;
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
    if (o.dead || !isEnemy(o, p) || !duelFoe(p, o)) continue;
    const d = Math.hypot(o.x - p.x, o.z - p.z); if (d > range) continue;
    const front = Math.abs(angDiff(o.face, Math.atan2(p.x - o.x, p.z - o.z))) < 1.1;
    const score = d + Math.abs(angDiff(p.face, Math.atan2(o.x - p.x, o.z - p.z))) * 1.5 + (o.blockT > 0 && front && !o.leader ? 1.6 : 0); // (a man with his shield down is the better target)
    if (score < bs) { bs = score; best = o; }
  }
  return best;
}
const CC = CAPTAIN_COMBAT;
export const javMax = ti => CC.jav.ammo + footTier(ti);
export const airborne = p => (p.jy || 0) > .25;
export const aimRange = p => (p.weapon === 'spear' ? CC.spear.aim : CC.sword.aim);
// The horse charge: a couple of seconds at full gallop that sends everyone in front flying.
export function captainCharge(p) {
  if (!p || p.dead || !p.mounted || p.carrying || (p.chargeCd || 0) > 0) return false;
  p.charge = CHARGE.dur; p.chargeCd = CHARGE.cd; p.chargeHit = new Set(); p.gallop = 1;
  sound('charge', p.x, p.z); fx('shout', { u: p, kind: 'charge' });
  if (p.isMe) fx('shake', .35);
  return true;
}
export function chargeTimers(u, dt) {
  if (u.charge > 0) { u.charge -= dt; if (!u.mounted) u.charge = 0; }
  if (u.chargeCd > 0) u.chargeCd -= dt;
}
export function captainJump(p) {
  if (!p || p.dead || p.mounted || p.stun > 0 || p.jy > 0 || p.jvy > 0 || p.jumpCd > 0 || p.carrying) return false;
  p.jvy = CC.jump.v; p.jy = .001; sound('jump', p.x, p.z);
  return true;
}
// Advances a captain's jump wherever that captain is driven (solo/host, or a client's own phone).
export function stepJump(p, dt) {
  if (p.jumpCd > 0) p.jumpCd -= dt;
  if (!(p.jy > 0) && !(p.jvy > 0)) return;
  p.jvy -= CC.jump.g * dt; p.jy += p.jvy * dt;
  if (p.jy <= 0) { p.jy = 0; p.jvy = 0; p.jumpCd = CC.jump.cd; sound('land', p.x, p.z); spark(p.x, groundY(p.x, p.z) + .1, p.z, '#c9b28a', 4); }
}
// ---------- the evade ----------
// The way to judge the stick: the enemy you're squaring up to (else the way you face).
function evadeRef(p) { const f = softAim(p, 8); return f ? Math.atan2(f.x - p.x, f.z - p.z) : p.face; }
export function evadeKind(p, wx, wz, mag) {
  if (!(mag > .3)) return 'back';
  const d = angDiff(evadeRef(p), Math.atan2(wx, wz));
  return Math.abs(d) < Math.PI / 4 ? 'pounce' : Math.abs(d) > Math.PI * 3 / 4 ? 'back' : d > 0 ? 'left' : 'right';
}
// Starts an evade of the given kind ('pounce', 'left', 'right', 'back'): the burst of movement, the
// hop, the untouchable moment, the cooldown. Run where the captain is driven (solo/host, or a
// joiner's own phone); remote: the host marking a joiner's evade (no movement: their phone moves them).
export function captainEvade(p, kind, remote = false) {
  if (!p || p.dead || p.mounted || p.carrying || p.execT > 0 || p.execA || p.execV) return false;
  if (!remote && (p.stun > 0 || (p.evadeCd || 0) > 0)) return false;
  const ref = evadeRef(p), side = kind === 'left' ? 1 : kind === 'right' ? -1 : 0, E = EVADE[side ? 'side' : kind];
  if (!E) return false;
  p.evade = { kind: side ? 'side' : kind, t: G.T };
  p.iframeT = EVADE.iframe + (remote ? EVADE.remote : 0);
  p.evadeN = G.T - (p.lastEvadeT ?? -9) < EVADE.chain ? (p.evadeN || 0) + 1 : 1; p.lastEvadeT = G.T;
  p.evadeCd = p.evadeN >= 2 ? EVADE.tired : EVADE.cd; // (twice in quick succession and he's winded)
  p.pending = null; p.heavyCharge = 0; p.windup = 0; p.blocking = false;
  if (kind === 'pounce') p.vaultT = E.dash + .2; // (clears a low wall or a hedge)
  if (!remote) {
    const a = kind === 'pounce' ? ref : kind === 'back' ? ref + Math.PI : ref + side * Math.PI / 2;
    p.vx = Math.sin(a) * E.v; p.vz = Math.cos(a) * E.v; p.dashT = E.dash; p.face = ref;
    p.jvy = E.hop; p.jy = Math.max(p.jy || 0, .001);
  }
  sound('jump', p.x, p.z); spark(p.x, groundY(p.x, p.z) + .1, p.z, '#c9b28a', 6);
  return true;
}
// a computer captain sees a captain's blow coming his way: now and then he gets out of it, and a
// hardened one comes straight back with the follow-up
function aiEvade(u, from) {
  if (!u || u.human || u.dead || u.mounted || u.stun > 0 || (u.evadeCd || 0) > 0 || u.execT > 0 || u.execReady) return;
  if (Math.random() > EVADE.ai[G.diff]) return;
  const kinds = ['left', 'right', 'back'], k = kinds[Math.floor(Math.random() * 3)];
  u.dashT = 0; if (!captainEvade(u, k)) return;
  if (G.diff >= 1 && Math.random() < (G.diff === 2 ? .8 : .45)) u.evadeFollowT = .2 + Math.random() * .12;
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
export function javTarget(p, range = CC.jav.range) {
  let best = null, bs = 1e9;
  for (const o of G.units) {
    if (o.dead || !isEnemy(o, p)) continue;
    const d = Math.hypot(o.x - p.x, o.z - p.z); if (d > range || d < 1.2) continue;
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
    if (p.human) return; // (a captain on horseback strikes when Attack is let go: a tap swipes, a hold times a ride-by)
    if (wpn === 'jav' && throwCaptainJav(p)) return;
    startSweep(p);
    if (p.pending && wpn === 'spear') { p.pending.mult = 1.3; p.pending.reachB = .8; }
    return;
  }
  if (airborne(p)) { leapSlam(p); return; }
  if (wpn === 'jav') {
    if (p.human && (p.javAmmo || 0) >= 1) return; // (a captain on foot throws when Attack is let go: a tap throws, a hold draws it back)
    if (throwCaptainJav(p)) return;
    p.weapon = 'sword'; if (G.teams[p.ti]) G.teams[p.ti].weapon = 'sword';
    if (p.isMe) fx('float', { x: p.x, y: p.y + 3.2, z: p.z, text: 'Out of javelins', color: '#fff' });
  }
  if (p.human) { const v = execTarget(p); if (v) { startExec(p, v); return; } } // (a beaten captain: finish him)
  // straight out of an evade: its follow-up
  const ev = p.evade && G.T - p.evade.t < (EVADE[p.evade.kind] ? EVADE[p.evade.kind].dash : .2) + EVADE.follow ? p.evade.kind : null;
  if (ev) p.evade = null;
  if (ev === 'pounce') { leapSlam(p); p.leapStrike = true; return; } // (the pounce: down on him from the air)
  const spear = p.weapon === 'spear', S = CC.sword;
  const sCombo = spear ? (G.T - p.lastSwingT < CC.spear.window && p.swingKind >= 3 ? (p.combo + 1) % 3 : 0) : 0, skewer = sCombo === 2, SK = CC.spear.skewer;
  const best = softAim(p, spear ? (skewer ? SK.aim : CC.spear.aim) : S.aim);
  if (p.isMe && G.capStats) { G.capStats.press++; if (!best) G.capStats.noTarget++; }
  let target = best;
  if (!best) { const w = wallInReach(p, 1.5); if (w) { target = { wall: w }; p.face = Math.atan2(w.x - p.x, w.z - p.z); } } // (an enemy palisade: hack at it)
  if (!best && !target) {
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
    if (d > edge && !skewer) { p.vx += Math.sin(ang) * 4; p.vz += Math.cos(ang) * 4; }
  }
  if (spear && skewer) { // the third thrust: a running lunge, the spear level, through everyone in the line
    Object.assign(p.pending, { t: SK.t, mult: SK.mult, reachB: SK.reachB, pierce: SK.pierce, pierceN: SK.pierceN, line: SK.line, kb: SK.kb, stun: SK.stun, shove: true });
    p.vx = Math.sin(p.face) * SK.lunge; p.vz = Math.cos(p.face) * SK.lunge; p.dashT = SK.dash; // (a moment where his feet don't brake: the lunge carries)
    p.cd = SK.cd; p.combo = 2; p.swingKind = 5;
  } else if (spear) {
    Object.assign(p.pending, { mult: CC.spear.mult, reachB: CC.spear.reachB, pierce: CC.spear.pierce, pierceN: CC.spear.pierceN, kb: CC.spear.kb, stun: CC.spear.stun, shove: true });
    p.vx += Math.sin(p.face) * CC.spear.lunge; p.vz += Math.cos(p.face) * CC.spear.lunge; // (the whole body goes into the thrust)
    p.cd = sCombo === 1 ? CC.spear.cd2 : CC.spear.cd; p.combo = sCombo; p.swingKind = 3;
  } else {
    const combo = G.T - p.lastSwingT < S.window ? (p.combo + 1) % 3 : 0, fin = combo === 2;
    Object.assign(p.pending, { mult: fin ? S.finisherMult : S.mult, cleave: fin, spin: fin, kb: fin ? 1.25 : .25 }); // light hits keep him in reach, the finisher spins and launches
    if (!fin) { p.vx += Math.sin(p.face) * S.step; p.vz += Math.cos(p.face) * S.step; } // (a half-step into each blow)
    p.cd = fin ? S.finisherCd : S.cd; p.combo = combo; p.swingKind = fin ? 4 : combo; // (4: the spin)
  }
  if ((ev === 'side' || ev === 'back') && p.pending) {
    if (ev === 'side') { Object.assign(p.pending, { mult: (p.pending.mult || 1) * EVADE.flank.mult, stun: Math.max(p.pending.stun || 0, EVADE.flank.stun) }); p.swingKind = spear ? 3 : 1; } // the flank cut: hard enough to break a wind-up; from behind, a backstab too
    else { Object.assign(p.pending, { mult: (p.pending.mult || 1) * EVADE.counter.mult, reachB: (p.pending.reachB || 0) + EVADE.counter.reachB }); if (!spear) p.swingKind = 0; } // the counter-lunge: point first
    p.combo = 0;
    // either way he drives back in to arm's length, so the answer to an evade always lands
    if (best) { const d = Math.hypot(best.x - p.x, best.z - p.z), gap = Math.max(0, d - (p.r + best.r + p.reach - .2)), v = Math.min(16, gap / EVADE.counter.dash + 2);
      p.vx = Math.sin(p.face) * v; p.vz = Math.cos(p.face) * v; p.dashT = EVADE.counter.dash; }
  }
  if (best && best.leader && !best.human && p.pending) aiEvade(best, p); // (he may see it coming)
  p.lastSwingT = G.T;
}
// Missile volley: every archer with a target in range fires immediately, and every javelin-ready
// footman (tier 1+) throws immediately, together, on a shared team cooldown. Aimed (pt = {x, z}):
// everyone who can reach the mark rains it there, scattered a little around it.
export function orderVolley(ti, pt) {
  const s = G.teams[ti];
  if (!s || !s.active || s.volleyCd > 0) return false;
  let fired = false;
  for (const u of G.units) {
    if (u.dead || u.ti !== ti || u.stun > 0) continue;
    if (pt) {
      const d = Math.hypot(pt.x - u.x, pt.z - u.z), a = rnd(0, Math.PI * 2), r = Math.sqrt(Math.random()) * VOLLEY.spread;
      const mark = { x: pt.x + Math.sin(a) * r, z: pt.z + Math.cos(a) * r, vx: 0, vz: 0 };
      if (u.kind === 'arch' && d <= u.range * (u.y > 2.2 ? 1.3 : 1) * 1.1) {
        u.face = Math.atan2(pt.x - u.x, pt.z - u.z); const j = u.jitter; u.jitter = .3; shoot(u, mark); u.jitter = j;
        u.shootCd = u.shootBase * rnd(.85, 1.2); fired = true;
      } else if (u.kind === 'foot' && u.javelin && u.javCd <= 0 && d <= JAVELIN.range * 1.2) {
        u.face = Math.atan2(pt.x - u.x, pt.z - u.z); throwJavelin(u, mark); fired = true;
      }
      continue;
    }
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
  const k = (u.stun > 0 ? 1.5 : u.charge > 0 ? 7 : u.mounted ? 4 : 10) * (onIce(u.x, u.z) ? .18 : 1); // (on ice you slide)
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
    const gather = Math.round((s.plan && s.plan.kind === 'castle' ? 4 : 11) * rules().gather);
    if (G.teams[colorOf(u.ti)].alive && (threat || squadN < gather)) { s.plan = { kind: 'defend' }; return; }
    { const hp = holdPlan(u, s); if (hp) { s.plan = hp; return; } } // (the map's prize, if it has one)
    let target = s.plan && s.plan.kind === 'castle' && G.teams[s.plan.ti].alive && Math.random() > .08 ? s.plan.ti : null;
    if (target == null) {
      const opts = [0, 1, 2, 3].filter(c => isEnemyTi(c, u.ti) && G.teams[c].alive)
        .sort((a, b) => Math.hypot(TEAMS[a].pos[0] - u.x, TEAMS[a].pos[1] - u.z) - Math.hypot(TEAMS[b].pos[0] - u.x, TEAMS[b].pos[1] - u.z));
      if (opts.length) target = opts[Math.random() < .7 ? 0 : Math.min(1, opts.length - 1)];
    }
    s.plan = target == null ? { kind: 'defend' } : { kind: 'castle', ti: target };
  } else if (G.mode === 'dm') {
    const gather = Math.round((s.plan && s.plan.kind === 'hunt' ? 3 : 9) * rules().gather);
    if (squadN < gather && s.tickets > 0) { s.plan = { kind: 'defend' }; return; }
    { const hp = holdPlan(u, s); if (hp) { s.plan = hp; return; } }
    const [cap] = nearestFoe(u, 400, o => o.leader), [any] = nearestFoe(u, 400);
    const bl = G.bounty >= 0 && isEnemyTi(G.bounty, u.ti) && Math.random() < .5 ? G.teams[G.bounty].leader : null;
    s.plan = { kind: 'hunt', target: (bl && !bl.dead) ? bl : (cap || any) };
  } else if (G.mode === 'ctrl') {
    const gather = Math.round((s.plan && s.plan.kind === 'point' ? 4 : 9) * rules().gather);
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
  const t = TEAMS[colorOf(u.ti)];
  switch (p.kind) {
    case 'defend': { const [gx, gz] = gatePos(t, gateOff(u.ti), 1); return { x: gx, z: gz, stop: 1.5 }; }
    case 'castle': return { x: TEAMS[p.ti].pos[0], z: TEAMS[p.ti].pos[1], stop: CASTLE_REACH - .8, castle: p.ti };
    case 'hunt': case 'escort': return p.target && !p.target.dead ? { x: p.target.x, z: p.target.z, stop: p.kind === 'escort' ? 3 : 1.5 } : null;
    case 'home': { const [gx, gz] = gatePos(t); return { x: gx, z: gz, stop: .5 }; }
    case 'banner': return { x: G.flag.x, z: G.flag.z, stop: .2 };
    case 'point': { const pt = G.ctrlPoints && G.ctrlPoints[p.id]; return pt ? { x: pt.x, z: pt.z, stop: CTRL.radius * .6 } : null; }
    case 'hold': { const h = G.holds && G.holds[p.id]; return h ? { x: h.x, z: h.z, stop: h.r * .35 } : null; }
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
// A computer captain's guard: in spells, shield raised, pressing in without attacking. Decided every
// GUARD.dur seconds while fighting another captain, so it takes up about GUARD.share of the fight.
function aiGuard(u, foe, fd, dt) {
  if (!(u.guardT > 0) && !(u.guardCd > 0)) { u.guardCd = GUARD.dur; if (foe.leader && !foe.mounted && fd < 7 && Math.random() < GUARD.share[G.diff]) u.guardT = GUARD.dur * (.8 + Math.random() * .5); }
  if (!(u.guardT > 0)) return false;
  if (foe.stun > .2 || foe.dead || foe.mounted) { u.guardT = 0; return false; } // (an opening: take it)
  u.blockT = Math.max(u.blockT, .15); faceTo(u, foe.x, foe.z, dt, 8);
  go(u, foe.x, foe.z, speedOf(u) * .45, dt, u.r + foe.r + u.reach * .7);
  return true;
}
// wind up a heavy blow in a captain's face and he may cut in before it lands
function aiPunish(u, foe, fd) {
  if (!(foe.heavyCharge > 0) && !(foe.ahT > .25 && (foe.weapon || 'sword') === 'sword')) { u.punishRoll = null; return false; }
  if (u.punishRoll == null) u.punishRoll = Math.random() < GUARD.punish[G.diff];
  if (!u.punishRoll || u.cd > 0 || u.stun > 0 || fd > u.r + foe.r + u.reach + .5) return false;
  u.guardT = 0; captainAttack(u); return true;
}
function aiCaptainFight(u, foe, fd, dt) {
  const war = G.diff >= 2;
  if (u.windup > 0) { moveToward(u, u.x, u.z, 0, dt); return; }
  if (aiPunish(u, foe, fd)) return;
  if (aiGuard(u, foe, fd, dt)) return;
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
  if (fd < reach + .4 && u.cd <= 0 && u.stun <= 0 && !foe.mounted && Math.random() < HEAVY.chance[G.diff] && startHeavy(u, foe, HEAVY.windup[G.diff])) return;
  if (fd < reach && u.cd <= 0 && u.stun <= 0) { captainAttack(u); if (!war) u.cd += .2; }
}
// Computer captains hold a line too: across the front of the gate when defending with enemies
// close, and on a control point they own when an enemy army comes for it. (Not on Recruit.)
function aiHold(u, s) {
  s.aiHold = false;
  if (G.diff < 1 || squadOf(u.ti).length < 5) return;
  const p = s.plan; let spot = null;
  if (p && p.kind === 'defend') spot = gatePos(TEAMS[colorOf(u.ti)], gateOff(u.ti), 3);
  else if (p && p.kind === 'point') { const pt = G.ctrlPoints && G.ctrlPoints[p.id]; if (pt && pt.owner === u.ti) spot = [pt.x, pt.z]; }
  else if (p && p.kind === 'hold') { const h = G.holds && G.holds[p.id]; if (h && h.owner === allianceOf(u.ti)) spot = [h.x, h.z]; }
  if (!spot || Math.hypot(u.x - spot[0], u.z - spot[1]) > 10) return;
  const [f] = nearestFoe({ x: spot[0], z: spot[1], ti: u.ti }, 34, o => !o.dead);
  if (!f) return;
  const face = Math.atan2(f.x - spot[0], f.z - spot[1]);
  s.aiHold = true; s.holdPt = { x: spot[0] + Math.sin(face) * 2, z: spot[1] + Math.cos(face) * 2, face };
}
function thinkLeader(u, s, dt) {
  s.thinkT -= dt;
  if (s.thinkT <= 0 || !s.plan) { s.thinkT = rnd(1.2, 2.4); planLeader(u, s); aiHold(u, s); }
  const foe = u.foe, fd = u.fd;
  if (foe && (u.duelId || (fd < (u.mounted ? 12 : 10) && !u.carrying && !(s.plan && s.plan.kind === 'escort' && fd > 5)))) {
    if (u.mounted) {
      if (spearNear(u, 7)) dismount(u, false);
      const inv = 1 / Math.max(fd, .1);
      go(u, foe.x + (foe.x - u.x) * inv * 4, foe.z + (foe.z - u.z) * inv * 4, speedOf(u), dt, .1);
      aiRide(u, foe, fd);
    } else if (G.diff >= 1) aiCaptainFight(u, foe, fd, dt);
    else if (u.windup > 0) moveToward(u, u.x, u.z, 0, dt);
    else if (aiGuard(u, foe, fd, dt)) {}
    else {
      go(u, foe.x, foe.z, speedOf(u), dt, u.r + foe.r + u.reach * .6); faceTo(u, foe.x, foe.z, dt);
      if (fd < u.r + foe.r + u.reach + .4 && u.cd <= 0 && !foe.mounted && Math.random() < HEAVY.chance[0] && startHeavy(u, foe, HEAVY.windup[0])) return;
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
// A held line: footmen shoulder to shoulder across the spot, seven to a rank, archers two paces behind.
export const HOLD_W = 7;
export function holdPos(a, idx, isArch, meleeN, archN = HOLD_W) {
  const rows = Math.ceil(meleeN / HOLD_W), row = Math.floor(idx / HOLD_W), inRow = Math.max(1, Math.min(HOLD_W, (isArch ? archN : meleeN) - row * HOLD_W));
  const lat = (idx % HOLD_W - (inRow - 1) / 2) * 1.3, back = isArch ? rows * 1.35 + 1.6 + row * 1.5 : row * 1.35;
  const f = a.face, fx = Math.sin(f), fz = Math.cos(f), rx = Math.cos(f), rz = -Math.sin(f);
  return [a.x - fx * back + rx * lat, a.z - fz * back + rz * lat];
}
// Shieldwall: a tight forward-facing line (9 wide) just ahead of a human captain (behind a
// computer one), rather than a deep huddled block — footmen up front, archers a rank behind.
function shieldwallPos(anchor, front, idx) {
  const perRow = 9, row = Math.floor(idx / perRow), lat = (idx % perRow - (perRow - 1) / 2) * .95;
  const back = front ? -(1.6 + row * 1.1) : 1.6 + row * 1.1;
  const f = anchor.face, fx = Math.sin(f), fz = Math.cos(f), rx = Math.cos(f), rz = -Math.sin(f);
  return [anchor.x - fx * back + rx * lat, anchor.z - fz * back + rz * lat];
}
// Holding a line: nobody chases. Footmen strike whatever reaches them, stepping at most a pace out
// of their place; archers shoot from theirs. A footman standing in his place braces (see hit()).
function holdPlace(u, H, dt, range) {
  const [gx, gz] = holdPos(H, u.slot || 0, u.kind === 'arch', u.meleeN || 0, u.archN || 0), off = Math.hypot(gx - u.x, gz - u.z);
  const foe = u.foe, fd = u.fd, reach = foe ? u.r + foe.r + u.reach : 0;
  if (u.kind === 'arch') {
    if (foe && fd < reach) { startSwing(u, foe); faceTo(u, foe.x, foe.z, dt); moveToward(u, u.x, u.z, 0, dt); return; }
    if (foe && fd <= range && off < 2.5) {
      u.aim = true; moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 8);
      if (u.shootCd <= 0 && u.stun <= 0 && Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) { shoot(u, foe); u.shootCd = u.shootBase * rnd(.85, 1.2); }
      return;
    }
  } else if (foe && fd < reach + 1.4 && Math.hypot(foe.x - gx, foe.z - gz) < 4.5) {
    if (off < 1.3 && fd > reach * .8) moveToward(u, foe.x, foe.z, speedOf(u) * .6, dt, reach * .7); else moveToward(u, gx, gz, speedOf(u), dt, .15);
    faceTo(u, foe.x, foe.z, dt); if (fd < reach) startSwing(u, foe);
    u.holding = off < 1.6; return;
  } else if (u.javelin && u.javCd <= 0 && foe && fd < JAVELIN.range && fd > reach + .3 && !foe.mounted && off < 1.2) {
    moveToward(u, u.x, u.z, 0, dt); faceTo(u, foe.x, foe.z, dt, 8);
    if (Math.abs(angDiff(u.face, Math.atan2(foe.x - u.x, foe.z - u.z))) < .3) throwJavelin(u, foe);
    u.holding = true; return;
  }
  const d = go(u, gx, gz, speedOf(u) * (off > 6 ? 1.15 : 1), dt, .15);
  if (d < 1) u.face = turn(u.face, H.face, dt * 6);
  u.holding = u.kind === 'foot' && d < 1.6;
}
function thinkSoldier(u, dt) {
  if (u.windup > 0) { moveToward(u, u.x, u.z, 0, dt); return; }
  const s = G.teams[u.ti], L = s.leader, leaderUp = L && !L.dead;
  // a broken army runs for home, weapons forgotten
  u.routing = s.routT > 0;
  if (u.routing) { u.aim = false; u.holding = false; const [gx, gz] = gatePos(TEAMS[colorOf(u.ti)], gateOff(u.ti), 6); go(u, gx, gz, speedOf(u), dt, 2); return; }
  if (u.guardOf) { guardRing(u, u.guardOf, dt); return; }
  // ordered at one enemy group: go for the men around it
  if (orderOf(u.ti) === 'focus' && s.focus) {
    let best = null, bd = 1e9;
    for (const o of G.units) { if (o.dead || !isEnemy(o, u) || Math.hypot(o.x - s.focus.x, o.z - s.focus.z) > 9) continue; const d = Math.hypot(o.x - u.x, o.z - u.z); if (d < bd) { bd = d; best = o; } }
    if (best) { u.foe = best; u.fd = bd; } else if (Math.hypot(s.focus.x - u.x, s.focus.z - u.z) > 3) { go(u, s.focus.x, s.focus.z, speedOf(u), dt, 2); return; }
  }
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
  u.aim = false; u.holding = false;
  if (u.kind === 'foot' && u.tier >= 1 && myOrder !== 'charge') {
    const [rider, rd] = nearestFoe(u, 9, o => o.mounted);
    if (rider) { moveToward(u, u.x, u.z, 0, dt); faceTo(u, rider.x, rider.z, dt, 10); if (rd < u.r + rider.r + u.reach) startSwing(u, rider); u.holding = myOrder === 'hold'; return; }
  }
  if (myOrder === 'hold' && s.holdPt) { holdPlace(u, s.holdPt, dt, range); return; }
  const engage = myOrder === 'charge' || myOrder === 'focus' ? 45 : u.kind === 'arch' ? range : myOrder === 'hold' ? 8 : 10;
  // a duel between captains: leave it to them. Pick another man, or stand back and watch.
  if (u.foe && u.foe.duel && u.kind !== 'arch') {
    const [alt, ad] = nearestFoe(u, 10, o => !o.duel);
    if (alt) { u.foe = alt; u.fd = ad; }
    else { const D = u.foe.duel, dd = Math.hypot(u.x - D.x, u.z - D.z); if (dd < 5.5) { const k = 5.5 / Math.max(dd, .1); go(u, D.x + (u.x - D.x) * k, D.z + (u.z - D.z) * k, speedOf(u), dt, .3); } else moveToward(u, u.x, u.z, 0, dt); faceTo(u, D.x, D.z, dt, 4); return; }
  }
  const foe = u.foe, fd = u.fd;
  const leash = myOrder === 'follow' && leaderUp && foe && Math.hypot(foe.x - L.x, foe.z - L.z) > 18;
  if (myOrder === 'focus' && u.kind === 'arch' && foe && fd > range) { go(u, foe.x, foe.z, speedOf(u), dt, range * .8); return; } // (archers close to bow range of the group)
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
      // a veteran facing an enemy captain on foot sometimes winds up a heavy blow instead
      if (foe.human && !foe.mounted && u.tier >= 2 && u.cd <= 0 && fd < u.r + foe.r + u.reach + .4 && Math.random() < HEAVY.vetChance && startHeavy(u, foe, HEAVY.windup[1] + .1)) return;
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
  } else { const [gx, gz] = gatePos(TEAMS[colorOf(u.ti)], gateOff(u.ti), 2); go(u, gx, gz, u.spd, dt, 3); }
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
    if (o.fence && u.vaultT > 0) continue; // (a pounce goes over a low wall or a hedge)
    if (o.off) continue; // (a palisade section not built yet, or broken down)
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
  // every battlefield is round: just inside where the ground starts rising into the hills at the edge
  { const d = Math.hypot(u.x, u.z), m = (G.layout.round || W.R) - u.r; if (d > m) { u.x *= m / d; u.z *= m / d; } }
  if (G.map.id === 'river') {
    if (inRiver(u.x, u.z) && !onBridge(u.x) && Math.abs(u.x) >= 14) u.z = (pz >= 0 ? 1 : -1) * 5.05;
    if (Math.abs(u.z) < 5 && onBridge(u.x) && Math.abs(u.x) > 20) { const bx = u.x < 0 ? -32 : 32; u.x = clamp(u.x, bx - 2.1, bx + 2.1); }
  }
  if (G.duels && G.duels.length) duelBounds(u);
  u.x = clamp(u.x, -W.R + 3, W.R - 3); u.z = clamp(u.z, -W.R + 3, W.R - 3);
  u.y = groundY(u.x, u.z) + (u.jy || 0);
}
// Drives a captain from a move vector in world space (the joystick, already turned by the camera).
// You keep moving and steering while swinging; in the air you keep your momentum with light control.
export function driveCaptain(p, input, dt) {
  if (p.execT > 0 || p.execA || p.execV) { p.blocking = false; return; } // (an execution: the moment holds still)
  const air = (p.jy || 0) > .01;
  p.blocking = !!input.block && !p.mounted && !air;
  const swinging = p.swing > 0 && !p.mounted;
  const spd = speedOf(p) * (swinging ? .85 : 1);
  if (p.charge > 0) { // charging: full tilt, straight on unless steered
    input = Object.assign({}, input, input.mag < .3 ? { wx: Math.sin(p.face), wz: Math.cos(p.face) } : {}, { mag: 1 });
  }
  const dashing = p.dashT > 0;
  if (dashing) p.dashT -= dt; // (mid-lunge or mid-evade: momentum carries him, eyes on his man)
  else if (air) {
    const k = Math.min(1, dt * 2.5);
    p.vx += (input.wx * spd * input.mag - p.vx) * k; p.vz += (input.wz * spd * input.mag - p.vz) * k;
  } else moveToward(p, p.x + input.wx * 3, p.z + input.wz * 3, spd * input.mag, dt, .05);
  const face0 = p.face;
  if (input.mag > .15 && !dashing) p.face = turn(p.face, Math.atan2(input.wx, input.wz), dt * (p.mounted ? 4.5 : p.blocking ? 5 : swinging ? 6 : 12));
  if (p.mounted) { // the gallop: built riding straight on, lost turning hard or reining in
    const tr = Math.abs(angDiff(face0, p.face)) / Math.max(dt, 1e-3), straight = input.mag > .7 && tr < 1;
    p.gallop = clamp((p.gallop || 0) + (p.charge > 0 ? 1 : straight ? dt / RIDE.gallop : -dt * (tr > 2 ? RIDE.turnLoss : input.mag < .3 ? .8 : .3)), 0, 1);
  } else p.gallop = 0;
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
  execMark();
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
          const opts = UPGRADES.map(u => u.id).filter(id => upgradeCost(i, id) != null && s.gold >= upgradeCost(i, id) + 30 && (id !== 'fort' || (i < 4 && G.mode !== 'ctrl')));
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
        const [gx, gz] = gatePos(TEAMS[colorOf(i)], gateOff(i), 7);
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
  if (p && !p.dead && input) {
    const pdt = p.slowT > 0 ? dt * PARRY.slow : dt;
    driveCaptain(p, input, pdt);
    if (input.block && !p.blkPrev) blockPress(p); p.blkPrev = !!input.block;
    attackHold(p, !!input.attackHeld, pdt);
    if (p.atkBuf > 0 && p.cd <= 0 && p.stun <= 0 && !p.mounted) captainAttack(p);
  }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && !L.dead && L.remote) attackHold(L, !!L.ahHeld, dt, true); }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && !L.dead) { if (L.atkBuf > 0) { L.atkBuf -= dt; if (L.remote && L.cd <= 0 && L.stun <= 0) captainAttack(L); } regenJavs(L, dt); } }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && !L.dead) { const [f] = nearestFoe(L, 12); if (!f && L.hp < L.max) L.hp = Math.min(L.max, L.hp + dt * 6); } }

  const zeros = () => new Array(ARMIES).fill(0), slotIdx = zeros(), archIdx = zeros(), meleeN = zeros(), archN = zeros(), tIdx = zeros();
  const ords = G.teams.map((_, i) => orderOf(i)), rng = G.teams.map((_, i) => auraRange(i) ** 2);
  for (const u of G.units) {
    if (u.dead || u.leader) continue;
    if (u.kind !== 'arch') meleeN[u.ti]++; else archN[u.ti]++;
    const L = G.teams[u.ti].leader, dx = L ? L.x - u.x : 0, dz = L ? L.z - u.z : 0;
    u.aura = !!L && !L.dead && dx * dx + dz * dz < rng[u.ti];
    u.shieldwall = ords[u.ti] === 'shieldwall';
    // shieldwall ranks: footmen in the front rank, archers at the back.
    // Slot 0 sits nearest the captain, who is behind a human's block and in front of a computer's.
    const k = u.kind === 'foot' ? 0 : 1;
    u.tkey = G.teams[u.ti].human ? 1 - k : k;
  }
  for (const k of [0, 1]) for (const u of G.units) if (!u.dead && !u.leader && u.tkey === k) u.tslot = tIdx[u.ti]++;
  moraleTick(dt); duelTick(dt);
  // captains locked in single combat on foot: the men round them give them room
  for (const u of G.units) u.duel = null;
  const caps = G.units.filter(u => u.leader && !u.dead && !u.mounted);
  for (let i = 0; i < caps.length; i++) for (let j = i + 1; j < caps.length; j++) {
    const a = caps[i], b = caps[j]; if (!isEnemy(a, b) || Math.hypot(a.x - b.x, a.z - b.z) > 3.5) continue;
    const d = { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 }; a.duel = d; b.duel = d;
  }
  // an ordered attack follows its group: onto the marked man, or the next man near where he fell; none left, and they fall back in
  G.teams.forEach(s => {
    if (s.order !== 'focus' || !s.focus) return;
    const t = G.units.find(o => o.id === s.focus.id && !o.dead);
    if (t) { s.focus.x = t.x; s.focus.z = t.z; return; }
    const L = s.leader, n = L && G.units.filter(o => !o.dead && isEnemy(o, L)).sort((a, b) => Math.hypot(a.x - s.focus.x, a.z - s.focus.z) - Math.hypot(b.x - s.focus.x, b.z - s.focus.z))[0];
    if (n && Math.hypot(n.x - s.focus.x, n.z - s.focus.z) < 9) { s.focus.id = n.id; s.focus.x = n.x; s.focus.z = n.z; } else { s.order = 'follow'; s.focus = null; if (s.human) say('focusDone', G.teams.indexOf(s)); }
  });
  const DT = dt;
  for (const u of G.units) {
    if (u.dead) continue;
    // (the two men in a parry live a beat in slow motion; everyone else carries on)
    let dt = DT; if (u.slowT > 0) { u.slowT -= DT; dt = DT * PARRY.slow; }
    u.cd -= dt; u.shootCd -= dt; u.javCd -= dt; u.stun -= dt; u.blockT -= dt; u.rt -= dt; u.trampleT -= dt;
    if (u.guardT > 0) u.guardT -= dt; if (u.guardCd > 0) u.guardCd -= dt; if (u.rallyT > 0) u.rallyT -= dt;
    if (u.iframeT > 0) { u.iframeT -= dt; if (u.iframeT <= 0) u.evadedAt = 0; } if (u.evadeCd > 0) u.evadeCd -= dt; if (u.vaultT > 0) u.vaultT -= dt;
    if (u.horseCd > 0) u.horseCd -= dt;
    if (u.leader) chargeTimers(u, dt);
    heavyTick(u, dt); if (u.human) braceTick(u, dt); if (!u.leader) shieldTick(u, dt); else execTick(u, dt);
    if (u.swing > 0) u.swing -= dt;
    if (u.pending) { u.pending.t -= dt; if (u.pending.t <= 0) resolveSwing(u); }
    if (u.rt <= 0) { u.rt = rnd(.25, .4); [u.foe, u.fd] = nearestFoe(u, 50); }
    if (u.foe && u.foe.dead) { u.foe = null; u.fd = 1e9; }
    if (u.foe) u.fd = Math.hypot(u.foe.x - u.x, u.foe.z - u.z);
    if (u.human || u.dead) continue;
    if (u.execT > 0) continue; // (in an execution, one way or the other: no thinking)
    if (u.dashT > 0) { u.dashT -= dt; stepJump(u, dt); continue; } // (mid-evade: momentum carries him)
    if (u.evadeFollowT > 0) { u.evadeFollowT -= dt; if (u.evadeFollowT <= 0 && u.foe && u.fd < 4 && u.cd <= 0) { u.face = Math.atan2(u.foe.x - u.x, u.foe.z - u.z); captainAttack(u); } }
    if (u.stun > 0 && !u.mounted) { moveToward(u, u.x, u.z, 0, dt); continue; } // (reeling: he can't turn to face you, so a stagger is the moment to get round him)
    if (u.leader) { stepJump(u, dt); regenJavs(u, dt); thinkLeader(u, G.teams[u.ti], dt); }
    else {
      u.slot = u.kind === 'arch' ? archIdx[u.ti]++ : slotIdx[u.ti]++; u.meleeN = meleeN[u.ti]; u.archN = archN[u.ti]; thinkSoldier(u, dt);
      // besiegers up against the palisade of the castle they're after (nobody to fight close by) hack at it
      if (u.kind === 'foot' && u.cd <= 0 && !(u.fd < 3.5)) { const pl = G.teams[u.ti].plan; if (pl && pl.kind === 'castle') { const w = wallInReach(u, 1.7); if (w && w.c === colorOf(pl.ti)) startSwing(u, { wall: w }); } }
    }
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
      if (o.dead || !isEnemy(o, r) || o.mounted || o.execT > 0 || o.duelId) continue;
      const dx = o.x - r.x, dz = o.z - r.z; if (Math.abs(dx) > 4 || Math.abs(dz) > 4) continue;
      const d = Math.hypot(dx, dz);
      if (o.kind === 'foot' && o.tier >= 1 && d < o.r + r.r + 1.6 && braced(o) && sp > 4 && Math.abs(angDiff(o.face, Math.atan2(r.x - o.x, r.z - o.z))) < 1.0) {
        horseDamage(r, 55); if (r.mounted) dismount(r, true);
        spark(o.x, o.y + 1.5, o.z, '#fff3b0', 8); sound('clang', o.x, o.z);
        fx('float', { x: o.x, y: o.y + 2.8, z: o.z, text: 'Spear wall!', color: TEAMS[colorOf(o.ti)].css });
        break;
      }
      // a charge into a held line stalls on it: the horse is hurt and pulls up, the line stands
      if (r.charge > 0 && o.holding && d < o.r + r.r + 1.1 && Math.abs(angDiff(o.face, Math.atan2(r.x - o.x, r.z - o.z))) < 1.1) {
        r.charge = 0; horseDamage(r, HOLD.horse); push(r, -Math.sin(r.face) * 6, -Math.cos(r.face) * 6, .5);
        spark(o.x, o.y + 1.5, o.z, '#fff3b0', 8); sound('clang', o.x, o.z);
        fx('float', { x: o.x, y: o.y + 2.8, z: o.z, text: 'The line holds!', color: TEAMS[colorOf(o.ti)].css });
        if (r.isMe) { fx('shake', .4); fx('buzz', 40); }
        if (r.remote || o.remote) fx('netFlush');
        break;
      }
      // charging: everyone in front of the horse is bowled over (once each)
      if (r.charge > 0 && sp > 7 && d < o.r + r.r + 1.1 && Math.abs(angDiff(r.face, Math.atan2(dx, dz))) < 1.2 && !(r.chargeHit && r.chargeHit.has(o))) {
        if (r.chargeHit) r.chargeHit.add(o);
        o.trampleT = 1; o.lastHit = G.T;
        const ang = Math.atan2(dx, dz), side = angDiff(r.face, ang) > 0 ? 1 : -1, out = r.face + side * .9; // thrown forward and out to the side
        push(o, Math.sin(out) * CHARGE.kb + r.vx * .3, Math.cos(out) * CHARGE.kb + r.vz * .3, .9);
        o.hp -= CHARGE.dmg * aiDmg(r.ti);
        spark(o.x, o.y + 1.2, o.z, TEAMS[colorOf(o.ti)].css, 8); sound('trample', o.x, o.z); sound('hit', o.x, o.z);
        if (r.isMe) { fx('hitstop', .045); fx('shake', .3); }
        if (r.remote || o.remote) fx('netFlush');
        if (o.hp <= 0) die(o, r, out, 1);
        continue;
      }
      if (sp > 6 && d < o.r + r.r + .3 && o.trampleT <= 0) {
        o.trampleT = .8; o.lastHit = G.T;
        const ang = Math.atan2(dx, dz);
        push(o, Math.sin(ang) * 10 + r.vx * .5, Math.cos(ang) * 10 + r.vz * .5, .7);
        o.hp -= 12 * aiDmg(r.ti);
        spark(o.x, o.y + 1, o.z, '#c9b28a', 6); sound('trample', o.x, o.z);
        if (o.hp <= 0) die(o, r, ang, 1); // trampled: sent flying
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
      // a captain's own side never slows him down: his men step aside as he rides or runs through them
      if (a.leader !== b.leader && !isEnemy(a, b)) { if (a.leader) wa = 0; else wb = 0; }
      if (wa === 0) wb = 2; if (wb === 0) wa = 2;
      a.x -= nx * ov * wa; a.z -= nz * ov * wa; b.x += nx * ov * wb; b.z += nz * ov * wb;
    }
  }
  for (const u of G.units) {
    if (u.dead) { fallStep(u, dt); continue; }
    if (u.remote) { u.y = groundY(u.x, u.z) + (u.jy || 0); continue; } // moved by their own phone
    integrate(u, u.slowT > 0 ? dt * PARRY.slow : dt, u.z);
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
  // Fortify's gate towers: each covers the ground outside its gate
  if (G.forts) for (let c = 0; c < 4; c++) {
    if (fortLvl(c) < 2 || (G.mode === 'conquest' && !G.teams[c].alive)) continue;
    const f = G.forts[c]; f.towerT -= dt; if (f.towerT > 0) continue; f.towerT = FORT.towerEvery;
    for (const tw of G.layout.pal[c].towers) { const [e] = nearestFoe({ x: tw.x, z: tw.z, ti: c }, FORT.towerRange); if (e) shoot({ x: tw.x, z: tw.z, y: 0, vx: 0, vz: 0, ti: c, tower: true, arrow: FORT.towerDmg }, e, 5.2); }
  }

  arrowsTick(dt, true);
  updateFlag(dt);
  updateControlPoints(dt); holdsTick(dt);
  checkTime();
}
// After the whistle: the winners stay put (the renderer has them celebrating) and everyone else
// legs it away from the nearest winner. Runs on the solo/host game; clients follow its snapshots.
export function endStep(dt) {
  const w = G.endInfo ? G.endInfo.w : -1;
  for (const u of G.units) {
    if (u.dead) { fallStep(u, dt); continue; }
    if (u.remote) continue;
    const lose = w >= 0 && G.ALLY[colorOf(u.ti)] !== w;
    if (lose) {
      let best = null, bd = 1e9;
      for (const o of G.units) { if (o.dead || G.ALLY[colorOf(o.ti)] !== w) continue; const d = Math.hypot(o.x - u.x, o.z - u.z); if (d < bd) { bd = d; best = o; } }
      const dx = best ? u.x - best.x : u.x, dz = best ? u.z - best.z : u.z, d = Math.hypot(dx, dz) || 1;
      moveToward(u, u.x + dx / d * 4, u.z + dz / d * 4, u.spd * 1.15, dt); faceTo(u, u.x + dx, u.z + dz, dt, 8);
    } else moveToward(u, u.x, u.z, 0, dt);
    integrate(u, dt, u.z);
  }
}
export function fallStep(u, dt) {
  u.deadT += dt;
  u.x += u.vx * dt; u.z += u.vz * dt; u.vy -= 18 * dt;
  const gy = groundY(u.x, u.z), ny = u.y + u.vy * dt;
  if (ny <= gy && u.vy < -5) { u.vy = -u.vy * .38; u.y = gy; u.bounces = (u.bounces || 0) + 1; if (u.launch) bus.emit('sfx', { name: 'thump', x: u.x, z: u.z }); }
  else u.y = Math.max(gy, ny);
  const air = u.y > gy + .05, f = Math.pow(air ? .7 : .03, dt); u.vx *= f; u.vz *= f;
}
export function arrowsTick(dt, authoritative) {
  for (const a of G.arrows) {
    if (a.stuck) { a.life -= dt; continue; }
    a.t += dt / a.dur;
    const t = Math.min(1, a.t);
    const x = a.x0 + (a.x1 - a.x0) * t, z = a.z0 + (a.z1 - a.z0) * t, y = a.y0 + (a.y1 - a.y0) * t + a.peak * 4 * t * (1 - t);
    a.px = a.x; a.py = a.y; a.pz = a.z; a.x = x; a.y = y; a.z = z;
    if (y < 15 && a.t > .12) { // trees, walls, buildings and ridges stop arrows
      for (const tr of nearBlockers(x, z)) {
        if (tr.off || y > tr.h + groundY(tr.x, tr.z) || (tr.gate && !gateShut(tr))) continue;
        if (Math.abs(tr.x - x) < tr.r && Math.abs(tr.z - z) < tr.r && Math.hypot(tr.x - x, tr.z - z) < tr.r) { a.stuck = true; a.life = 2; sound('thud', x, z); spark(x, y, z, '#8a7a62', 3); break; }
      }
      if (a.stuck) continue;
    }
    if (a.t >= 1) {
      if (authoritative) {
        let best = null, bd = 1.0;
        for (const o of G.units) { if (o.dead || !isEnemyTi(o.ti, a.ti) || (o.duelId && !(a.shooter && a.shooter.duelId === o.duelId))) continue; const d = Math.hypot(o.x - a.x1, o.z - a.z1) - (o.mounted ? .5 : 0); if (d < bd) { bd = d; best = o; } }
        if (best) { arrowHit(a, best); a.done = true; } else { a.stuck = true; a.life = 3; }
      } else { a.stuck = true; a.life = 2.5; }
    }
  }
  G.arrows = G.arrows.filter(a => !(a.done || (a.stuck && a.life <= 0)));
}
