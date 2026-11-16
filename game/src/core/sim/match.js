// Battle rules: setting up a match, armies, units, the march out of home.
import { STAMINA, CROWN2, FEEL, CROWN, ECON, TEAMS, STATS, HUMAN_CAPTAIN, START_SQUAD, FULL_SQUAD, FOOT_TIERS, ARCH_TIERS, CAPTAIN_TIERS, CAPTAIN_COMBAT, CHEST } from '../../config.js';
import { G, colorOf, activeArmies, activeFrom, gateOff, ARMIES, rules, matchTime, isC2 } from '../state.js';
import { groundY, gatePos, makeLayout, clamp, rnd } from '../world.js';
import { buildNav } from '../nav.js';
import { fx, say } from './util.js';
import { applyCastleGates, applyPlazaWall, archTier, c2Begin, footTier, freshGates, horseMax, initForts, makeCtrlPoints, makeHolds, moveToward, speedOf } from './step.js'; // (later files: through the entry, so files still load in the old order)

// ---------- setup ----------
// Armies 0-3 are each castle's own army; 4-11 are its Duo/Trio teammates', real only when active[i].
// Castle strength (points/alive, conquest only) is only ever read/written on the color's own
// army (0-3): a teammate's army shares its castle rather than owning one.
export function newTeams(humans, active = activeFrom([0, 0, 0, 0])) {
  return Array.from({ length: ARMIES }, (_, i) => ({ points: 100, tickets: rules().tickets, caps: 0, ctrlScore: 0, gold: isC2() ? CROWN2.startGold : Math.round(ECON.startGold * rules().gold), alive: true, plan: null, leaderDeadT: 0, recruitT: rnd(2, 6), thinkT: 0,
    human: !!humans[i], active: !!active[i], order: 'follow', holdPt: null, morale: 100, rally: 0, routT: 0, focus: null, towerT: rnd(0, 1.4), leader: null,
    up: { foot1: 0, foot2: 0, arch1: 0, arch2: 0, aura: 0, horse: 0, arm: 0, fort: 0 }, armBuys: 0, arrowHits: 0, shieldwallT: 0, volleyCd: 0, upT: rnd(20, 40) }));
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
    jy: 0, jvy: 0, jumpCd: 0, javAmmo: CAPTAIN_COMBAT.jav.ammo + tier, javRegen: 0, combo: 0, lastSwingT: -9, atkBuf: 0, st: STAMINA.max, stT: -9,
    neutral: false, post: null, pk: 0, px: 0, pz: 0, pface: 0, rest: false, tface: 0 }; // (F4: a garrison's man fills these in; every unit has them so they all share one shape)
  G.units.push(u); return u;
}
// (F7) Stepping out: a captain back on his feet (and at the start, with his men), or a soldier just raised, walks out
// of the yard (or the place he was raised at) for a beat, untouchable, then is his own. A stick push takes over at once.
// The first step shows the dust (and, for your own captain, the horn) on every phone; quiet: a joined phone's own copy.
export function startMarch(u, big, quiet = false) {
  const M = FEEL.march; u.marchT = big ? M.cap : M.men; u.marchA = u.face; u.marchBig = !!big; u.marchGo = !!quiet;
  u.iframeT = Math.max(u.iframeT || 0, u.marchT);
}
export function marchStep(u, dt, move = true) {
  if (!u.marchGo) { u.marchGo = true; fx('fxmsg', { k: 'fxmarch', u, heavy: u.marchBig }); }
  u.marchT -= dt; if (!move) return;
  u.face = u.marchA;
  moveToward(u, u.x + Math.sin(u.marchA) * 3, u.z + Math.cos(u.marchA) * 3, speedOf(u) * FEEL.march.pace, dt, 0);
}
// (F7) how far below the rim a man going over the chasm is, from his own clock (a joined phone's copy of the fall)
export function chasmFallY(u) { const C = FEEL.chasm, e = performance.now() / 1000 - u.chasmAt; return e < C.teeter ? u.rimY : u.rimY - .5 * C.g * (e - C.teeter) ** 2; }
export const inwardOf = ti => { const h = G.layout.homes[colorOf(ti)]; return Math.atan2(-Math.cos(h.a), -Math.sin(h.a)); };
// Every army's moments of the match, for the results screen (yours, and your side's): counts (and the best streak).
export function hl(ti, k, v) {
  const s = G.teams[ti]; if (!s || !s.active) return;
  const h = s.hl || (s.hl = {});
  if (k === 'streak') h.streak = Math.max(h.streak || 0, v); else h[k] = (h[k] || 0) + (v ?? 1);
}
export const squadOf = ti => G.units.filter(u => !u.dead && u.ti === ti && !u.leader);
// Where an army comes home to: its castle's gate; in the Crown, the place its side holds nearest its
// captain (a castle or a village), or the plaza when it holds nothing (raiders).
export function homeAt(ti, extra = 0) {
  if (G.mode !== 'crown') return gatePos(TEAMS[colorOf(ti)], gateOff(ti), extra);
  if (isC2()) return c2Home(ti, extra, true);
  const s = G.teams[ti], ref = (s && s.leader) || { x: 0, z: 0 }, a = G.ALLY[colorOf(ti)];
  let best = null, bd = 1e9;
  for (const h of G.holds || []) if (h.owner === a && (h.kind === 'castle' || h.kind === 'village')) { const d = Math.hypot(h.x - ref.x, h.z - ref.z); if (d < bd) { bd = d; best = h; } }
  if (!best) return [rnd(-5, 5), rnd(-5, 5)];
  const ang = Math.atan2(-best.x, -best.z), k = best.r * .55 + extra * .3; // (on the plaza side of it, inside the ring)
  return [best.x + Math.sin(ang) * k + rnd(-1.5, 1.5), best.z + Math.cos(ang) * k + rnd(-1.5, 1.5)];
}
// The mountain: home is the town on the rim; recruits come to the place his side holds nearest him
// (a castle, keep or village he or an ally took), or home when that's nearer or there's none.
export function c2HomePt(ti, extra = 0) {
  const h = G.layout.homes[colorOf(ti)], a = h.a, sl = [0, 3.5, -3.5][ti >> 2], k = 6 + extra * .3;
  return [h.x - Math.cos(a) * k - Math.sin(a) * sl + rnd(-1, 1), h.z - Math.sin(a) * k + Math.cos(a) * sl + rnd(-1, 1)];
}
function c2Home(ti, extra, near) {
  const s = G.teams[ti], ref = (s && s.leader && !s.leader.dead) ? s.leader : null, a = G.ALLY[colorOf(ti)], hm = G.layout.homes[colorOf(ti)];
  if (!near || !ref) return c2HomePt(ti, extra);
  let best = null, bd = Math.hypot(hm.x - ref.x, hm.z - ref.z);
  for (const h of G.holds || []) if (h.owner === a) { const d = Math.hypot(h.x - ref.x, h.z - ref.z); if (d < bd) { bd = d; best = h; } }
  if (!best) return c2HomePt(ti, extra);
  const ang = Math.atan2(-best.x, -best.z), k = best.r * .5 + extra * .3;
  return [best.x + Math.sin(ang) * k + rnd(-1.5, 1.5), best.z + Math.cos(ang) * k + rnd(-1.5, 1.5)];
}

// Host handover: the host's phone left mid-battle and this phone takes over. It has only what the
// snapshots carried, so it rebuilds full soldiers from them (where they stand, how hurt they are)
// and carries on; men's plans start fresh, horses go back to the stables and duels are called off.
export function adoptBattle() {
  G.role = 'host';
  const old = G.units.filter(u => !u.dead), byId = new Map(); let maxId = 0;
  G.units = []; G.horses = []; G.arrows = []; G.duels = []; G.duelN = 1000;
  for (const s of G.teams) s.leader = null;
  for (const o of old) {
    const human = o.kind === 'captain' && G.teams[o.ti].human;
    const u = mkUnit(o.ti, o.x, o.z, o.kind, human);
    u.id = o.id; u.face = o.face; u.hp = Math.max(1, u.max * clamp(o.hp / (o.max || 1), 0, 1)); u.armour = o.armour || 0;
    if (human && o.weapon) u.weapon = o.weapon;
    byId.set(u.id, u); maxId = Math.max(maxId, u.id);
    if (u.leader) G.teams[u.ti].leader = u;
  }
  G.teams.forEach((s, i) => { // (a captain who was down when the host left: down here too, back when his time's up)
    if (!s.active || s.leader) return;
    const [x, z] = homeAt(i, 7), L = mkUnit(i, x, z, 'captain', s.human); L.dead = true; L.deadT = 99; L.id = ++maxId; s.leader = L; s.leaderDeadT = Math.max(1, s.leaderDeadT || 0);
  });
  G.uid = maxId + 1;
  G.player = G.teams[G.myTi] && G.teams[G.myTi].leader && !G.teams[G.myTi].leader.dead ? G.teams[G.myTi].leader : null;
  if (G.flag) { const c = G.flag.carrier ? byId.get(G.flag.carrier.id) : null; G.flag.carrier = c || null; if (c) c.carrying = true; else if (G.flag.state === 'carried') G.flag.state = 'dropped'; }
  if (G.cgates) { for (const k of Object.keys(G.cgates)) { const g = G.cgates[k], n = freshGates(g.lv | 0); n.broken = g.broken | 0; for (let gi = 0; gi < 3; gi++) if (n.broken & (1 << gi)) n.hp[gi] = 0; G.cgates[k] = n; } applyCastleGates(); }
  if (G.plazaWall) { G.plazaWall.hp = [0, 1, 2, 3].map(i => (G.plazaWall.broken & (1 << i)) ? 0 : CROWN.gateHp); applyPlazaWall(); }
  G.wtN = (G.wtowers || []).reduce((m, w) => Math.max(m, w.id), 0) + 1;
  const h = (G.holds || []).find(x => x.centre), at = CHEST.at * matchTime();
  G.chestDone = !!h && G.T >= at - CHEST.warn && !h.chest;
  G.teams.forEach(s => { s.thinkT = 0; s.plan = null; s.homeSpot = null; });
}

export function startMatch(humans, active = activeFrom([0, 0, 0, 0])) {
  G.duo = [0, 1, 2, 3].map(c => !active[c] ? -1 : active[c + 8] ? 2 : active[c + 4] ? 1 : 0); // (before the layout: where the castles stand depends on who's in)
  G.layout = makeLayout(G.map.id, G.mode === 'ctf', G.mode === 'ctrl', G.seed); buildNav(G.layout);
  G.units = []; G.horses = []; G.arrows = [];
  G.T = 0; G.kills = 0; G.recruited = 0; G.bounty = -1; G.uid = 0; G.arrowN = 0; G.endInfo = null; G.awarded = false; G.seasoned = false;
  G.teams = newTeams(humans, active);
  for (let c = 0; c < 4; c++) if (!active[c]) { G.teams[c].alive = false; G.teams[c].points = 0; G.teams[c].tickets = 0; } // (a castle out of this battle)
  G.flag = G.mode === 'ctf' ? { state: 'home', x: 0, z: 0, carrier: null, dropT: 0 } : null;
  G.ctrlPoints = G.mode === 'ctrl' ? makeCtrlPoints(G.layout) : null;
  G.holds = makeHolds(G.layout);
  G.duels = []; G.duelN = 0; G.chestDone = false;
  G.crown = G.mode === 'crown' ? { said: {}, casing: 0, ot: false } : null;
  G.wtowers = []; G.wtN = 0; G.deaths = null;
  G.cgates = {}; for (const cw of (G.layout.cwalls || [])) G.cgates[cw.hid] = freshGates(); applyCastleGates();
  G.plazaWall = G.crown ? { up: false, hp: [0, 1, 2, 3].map(() => CROWN.gateHp), broken: 0 } : null;
  G.c2 = null; if (isC2()) c2Begin(); applyPlazaWall();
  initForts();
  if (G.c2) for (const i of activeArmies()) { // the mountain: every captain at his home with five men
    const [x, z] = c2HomePt(i, 0), L = G.teams[i].leader = mkUnit(i, x, z, 'captain', G.teams[i].human); L.face = inwardOf(i); startMarch(L, true);
    // (F7) his men in a column of twos behind him in the yard; they all step out together when the battle begins
    const fx0 = Math.sin(L.face), fz0 = Math.cos(L.face);
    CROWN2.startSquad.forEach((k, n) => { const row = (n >> 1) + 1, side = n & 1 ? 1.1 : -1.1, m = mkUnit(i, x - fx0 * 1.5 * row + fz0 * side, z - fz0 * 1.5 * row - fx0 * side, k); m.face = L.face; startMarch(m, false); m.marchT = FEEL.march.cap; });
  }
  for (let i = 0; i < ARMIES; i++) {
    if (!G.teams[i].active || G.crown) continue;
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
