// Battle rules: orders, morale and rally, recruiting, upgrades, speed, horses.
import { CROWN2, CROWN, STATS, HUMAN_CAPTAIN, HORSE_HP, HORSE_CD, UPGRADES, FOOT_TIERS, ARCH_TIERS, CAPTAIN_TIERS, CHARGE, EXEC, FORT, HOLD_ATK, MORALE, RALLY, AURA, LAST, ARMOUR } from '../../config.js';
import { G, isEnemy, colorOf, capOf, isC2 } from '../state.js';
import { groundY, clamp, rnd, angDiff, W, groundSlow } from '../world.js';
import { fx, say, sound, spark } from './util.js';
import { homeAt, mkUnit, squadOf, startMarch } from './match.js';
import { applyCastleGates, applyFort, castleHere, fortLvl, gateHp, lastStand, nearestFoe, villageHere, volleyCharge } from './step.js'; // (later files: through the entry, so files still load in the old order)
import { swiftSpd } from './buffs.js';

// Hold: pt is where the front rank stands and which way it faces ({x, z, face}); without one, the
// line forms a couple of paces in front of the captain, facing where he faces.
export function setOrder(ti, o, pt) {
  const s = G.teams[ti]; s.order = o;
  if (o === 'charge') volleyCharge(ti);
  const cap = s.leader;
  if (o === 'hold') s.holdPt = pt ? { x: +pt.x, z: +pt.z, face: +pt.face } : cap ? { x: cap.x + Math.sin(cap.face) * 2.5, z: cap.z + Math.cos(cap.face) * 2.5, face: cap.face } : null;
  if (o === 'focus') { if (pt) s.focus = { id: pt.id | 0, x: +pt.x, z: +pt.z }; else s.order = 'follow'; }
}
// ---------- morale, routs and the rally horn ----------
export const routing = ti => G.teams[ti] && G.teams[ti].routT > 0;
// F9: is his army on Hold (spearmen on Hold, still and facing, stop a charge: core/charge.js)
export const onHold = u => !!G.teams[u.ti] && orderOf(u.ti) === 'hold';
export const behind = (victim, from) => Math.abs(angDiff(victim.face, Math.atan2(from.x - victim.x, from.z - victim.z))) > MORALE.flankAng;
export function loseHeart(ti, amt) { const s = G.teams[ti]; if (s) s.morale = Math.max(0, s.morale - amt); }
export function gainRally(u, amt) { if (!u || !u.leader) return; const s = G.teams[u.ti]; if (s) s.rally = Math.min(100, (s.rally || 0) + amt); }
export function moraleTick(dt) {
  G.teams.forEach((s, ti) => {
    if (!s.active) return;
    const L = s.leader, up = L && !L.dead;
    if (s.routT > 0) { s.routT -= dt; if (s.routT <= 0) { s.routT = 0; s.morale = Math.max(s.morale, MORALE.regroup); s.steadyT = MORALE.steady; } return; }
    if (s.steadyT > 0) s.steadyT -= dt;
    const men = squadOf(ti), home = homeAt(ti, 0);
    const atHome = men.filter(u => Math.hypot(u.x - home[0], u.z - home[1]) < MORALE.homeR).length > men.length / 2;
    if (G.mode === 'conquest' && G.teams[colorOf(ti)].breached && G.teams[colorOf(ti)].alive && L && !L.dead && lastStand(L)) s.morale = Math.max(s.morale, LAST.moraleFloor); // (a last stand: nobody runs)
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
export function canRecruit(ti) { const s = G.teams[ti]; return G.mode === 'crown' ? true : G.mode === 'conquest' ? G.teams[colorOf(ti)].alive : G.mode === 'dm' ? s.tickets > 0 : true; }
export function recruit(ti, kind) {
  const s = G.teams[ti], n = squadOf(ti).length, cost = STATS[kind].cost;
  if (!canRecruit(ti) || s.gold < cost || n >= capOf(ti)) return false;
  s.gold -= cost;
  { const [gx, gz] = homeAt(ti), m = mkUnit(ti, gx, gz, kind); if (isC2()) { m.face = Math.atan2(-gx, -gz); startMarch(m, false); } } // (from the place you hold nearest you; F7: he steps out of it)
  s.recruits = (s.recruits | 0) + 1; // (this army's recruits, for the results table)
  if (ti === G.myTi) { G.recruited++; sound('coin'); }
  return true;
}
// ---------- upgrades and the captain's aura ----------
const lvl = (ti, id) => (G.teams[ti] && G.teams[ti].up) ? G.teams[ti].up[id] | 0 : 0;
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
  if (id === 'tower') { const L = (ti === G.myTi && G.player) || (G.teams[ti] && G.teams[ti].leader), a = G.ALLY[colorOf(ti)];
    return G.mode !== 'crown' || !L || L.dead || G.T < CROWN.breakout || (G.wtowers || []).filter(w => w.a === a).length >= CROWN.tower.max ? null : def.cost[0]; }
  if (id === 'fort' && G.mode === 'crown') { // the castle your captain stands in: fortify it, or mend its gates
    if (isC2() && !castleHere(ti)) { const v = villageHere(ti); return v && !v.fort ? CROWN2.villageFort : null; } // (the mountain: a palisade round a village)
    const cw = castleHere(ti), st = cw && G.cgates[cw.hid]; if (!st) return null;
    if (st.broken) return FORT.repair;
    return (st.lv | 0) < CROWN.fortCost.length ? CROWN.fortCost[st.lv | 0] : null;
  }
  if (id === 'arm') { const s = G.teams[ti], L = (ti === G.myTi && G.player) || (s && s.leader); // (a joiner's phone knows its own captain, not the team's)
    return !L || L.dead || (L.armour || 0) >= ARMOUR.hp - .5 ? null : Math.min(ARMOUR.maxCost, ARMOUR.cost + ARMOUR.step * (s.armBuys | 0)); } // (armour: whenever it's not whole, again and again)
  const l = lvl(id === 'fort' ? colorOf(ti) : ti, id); // (Fortify is the castle's, shared by everyone in it)
  if (id === 'fort' && l >= def.cost.length) { const f = G.forts && G.forts[colorOf(ti)]; return f && (f.broken >> FORT.segs) & 3 ? FORT.repair : null; } // (built: then mending a broken gate)
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
  if (id === 'tower') { // built where the captain stands, a step ahead
    const L = s.leader, x = L.x + Math.sin(L.face) * 2.2, z = L.z + Math.cos(L.face) * 2.2;
    G.wtowers.push({ id: ++G.wtN, x, z, a: G.ALLY[colorOf(ti)], ti, hp: CROWN.tower.hp, build: 0 });
    sound('wall', x, z); say('towerUp', ti); fx('netFlush'); return true;
  }
  if (id === 'arm') { s.armBuys = (s.armBuys | 0) + 1; s.leader.armour = ARMOUR.hp; sound('clang', s.leader.x, s.leader.z); if (ti === G.myTi || s.human) say('armourOn', ti); if (s.leader.remote) fx('netFlush'); return true; }
  if (id === 'fort' && G.mode === 'crown') {
    if (isC2() && !castleHere(ti)) { const v = villageHere(ti); v.fort = 1; sound('wall', v.x, v.z); say('villageFort', ti, v.id); fx('netFlush'); return true; }
    const cw = castleHere(ti), st = G.cgates[cw.hid];
    if (st.broken) { st.broken = 0; st.hp = [0, 1, 2].map(gi => gateHp(gi, st.lv)); st.mendT = [0, 0, 0]; applyCastleGates(); say('gateRepaired', ti, cw.hid); }
    else { st.lv = (st.lv | 0) + 1; st.hp = [0, 1, 2].map(gi => gateHp(gi, st.lv)); say('castleFort', ti, cw.hid, st.lv); }
    sound('wall', cw.x, cw.z); fx('netFlush'); return true;
  }
  if (id === 'fort' && fortLvl(colorOf(ti)) >= UPGRADES.find(u => u.id === 'fort').cost.length) { // mend the broken gates
    const c = colorOf(ti), f = G.forts[c]; f.broken &= ~(3 << FORT.segs); f.hp[FORT.segs] = f.hp[FORT.segs + 1] = FORT.gateHp; applyFort(c); say('gateRepaired', c); return true;
  }
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
export function canRespawn(ti) { const s = G.teams[ti]; return G.warmup ? true : G.mode === 'crown' ? true : G.mode === 'conquest' ? G.teams[colorOf(ti)].alive : G.mode === 'dm' ? s.tickets > 0 : true; }
export function push(u, vx, vz, stun) {
  if (u.remote) { u.kick.vx += vx; u.kick.vz += vz; u.kick.st = Math.max(u.kick.st, stun || 0); u.kick.dirty = true; }
  else { u.vx += vx; u.vz += vz; }
  if (stun) u.stun = Math.max(u.stun, stun);
}

// ---------- horses ----------
// an archer's reach: on the mountain, by how far above (or below) his mark he stands; elsewhere high ground adds 30%
export const bowRange = (u, t) => { if (!G.c2) return u.range * (u.y > 2.2 ? 1.3 : 1); const dy = u.y - (t ? t.y ?? groundY(t.x, t.z) : u.y); return u.range * (1 + clamp(dy * .075, -.15, .25)); };
export function speedOf(u) {
  let s = u.spd;
  if (u.mounted) s *= 1.8 * (1 + .05 * lvl(u.ti, 'horse')) * (u.charge > 0 ? CHARGE.spd : 1) * (u.human ? .8 + .35 * (u.gallop || 0) : 1); // (a human rider's gallop builds on the straight)
  if (!u.leader) { if (u.aura) s *= 1 + auraBonus(u.ti) * .5; if (u.shieldwall) s *= .55; }
  if (u.carrying) s *= G.crown ? CROWN.carrierSlow : .7;
  s *= groundSlow(u.x, u.z); // (a ford, a wheat field, an oasis)
  if (u.boostT > G.T && !u.inSafe) s *= CROWN2.safe.boost; // (the mountain: out of your home at a run)
  if (u.human && u.blocking && !u.mounted) s *= .5;
  if (u.windup > 0) s *= .3;
  if (u.execReady) s *= EXEC.beatenSpd; // (beaten: he reels, slow on his feet)
  if (u.rallyT > 0) s *= RALLY.spd;
  s *= swiftSpd(u.ti); // (CAMP1: swift)
  if (u.routing) s *= 1.1;
  if (u.heavyCharge > 0) s *= .55;
  if (u.bracing) s *= HOLD_ATK.braceSlow;
  return s;
}
export function summonHorse(u) {
  if (u.mounted || u.summon || u.horseCd > 0 || u.dead || u.carrying) return false;
  if (G.T - u.lastHit < 2) return false;
  const back = u.face + Math.PI + rnd(-.6, .6);
  const hx = clamp(u.x + Math.sin(back) * 14, -W.R + 5, W.R - 5), hz = clamp(u.z + Math.cos(back) * 14, -W.R + 5, W.R - 5);
  const h = { id: ++G.horseN, x: hx, z: hz, face: Math.atan2(u.x - hx, u.z - hz), state: 'coming', rider: u, t: 0, spd: 0, ti: u.ti, fall: 1 };
  G.horses.push(h); u.summon = h;
  if (u.isMe) sound('neigh');
  return true;
}
export function mountUp(u, h) {
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
export function horseDamage(r, dmg) {
  r.horseHp -= dmg;
  spark(r.x, r.y + 1.3, r.z, '#d42a1e', 5); sound('hit', r.x, r.z);
  if (r.horseHp <= 0) dismount(r, true);
}
export const spearNear = (u, d) => G.units.some(o => !o.dead && !o.rest && isEnemy(o, u) && o.kind === 'foot' && o.tier >= 1 && Math.hypot(o.x - u.x, o.z - u.z) < d);
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
