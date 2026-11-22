// (C2b) The swordsman and the cavalryman (design "Soldiers and their upgrades", Raider; "Horses and cavalry").
// A cavalryman is a swordsman on a horse: mounting one costs STATS.cav.cost and a place more, and the horse goes to the
// swordsman with the most health. Two health bars, the horse's first; when it dies he fights on as a swordsman (one
// place again) and can be mounted again. Swordsmen: Pursuit (the first hit on a man running slows him; from behind
// harder), then Mail. Cavalry: Lances (a harder charge, the lance back some seconds after one), then Barding.
// Riding: Follow, at the captain's flank; Hold, mounted on the spot, no charging; Charge (and any fight), he charges a
// foe ahead, rides past, wheels and charges again, and keeps off a braced spear line.
import { STATS, CAV, SWORD_TIERS } from '../../config.js';
import { G, isEnemy, capOf } from '../state.js';
import { unitRow } from '../../champions/army.js';
import { champOf } from '../../champions/index.js';
import { fx, sound } from './util.js';
import { armyPlaces, placeOf } from './match.js';
import { canRecruit } from './army.js';
import { inflHp } from '../../champions/influence.js';
import { nearestFoe } from './melee.js';

const lvlOf = (ti, id) => (G.teams[ti] && G.teams[ti].up) ? G.teams[ti].up[id] | 0 : 0;
export const swordTier = ti => Math.min(2, lvlOf(ti, 'sw1') + lvlOf(ti, 'sw2'));
export const cavTier = ti => Math.min(2, lvlOf(ti, 'cav1') + lvlOf(ti, 'cav2'));

// a swordsman's or cavalryman's numbers from his row (his champion's line and shares), health keeping its share
function fit(u, t, keepHp) {
  const nmax = t.hp * inflHp(u.ti), f = keepHp && u.max ? u.hp / u.max : 1;
  u.max = nmax; u.hp = Math.max(1, Math.min(nmax, nmax * f));
  u.dmg = t.dmg; u.reach = t.reach; u.block = t.block || 0; u.spd = t.spd; u.gap = t.cd; u.r = t.r;
  u.pursuit = !!t.pursuit; u.burst = t.burst || null; // (C5: the Úlfheðnar's charge-in burst)
}
// at birth (mkUnit) and on an upgrade
export function setSword(u, keepHp = false) { u.tier = swordTier(u.ti); fit(u, unitRow(u.ti, 'sword', u.tier), keepHp); }
export function setCav(u, keepHp = false) {
  u.tier = cavTier(u.ti); const t = unitRow(u.ti, 'cav', u.tier); fit(u, t, keepHp);
  u.horseMax = t.horse; if (!keepHp || u.horseHp == null) u.horseHp = t.horse;
  u.chargeX = t.chargeX || 1; u.dodge = t.dodge || 0; u.lance = !!t.lance;
}
// a horse under a cavalryman (one of G.horses, ridden: drawn with him)
export function giveHorse(u) {
  const h = { id: ++G.horseN, x: u.x, z: u.z, face: u.face, state: 'ridden', rider: u, t: 0, spd: 0, ti: u.ti, fall: 1, cav: true };
  G.horses.push(h); u.mounted = true; u.horse = h; u.summon = null; u.kind = 'cav'; u.chargeCd = 0; u.chargeHit = null;
  setCav(u); return h;
}
// mount the healthiest swordsman (the recruit button's Cavalry); false when there is none, or no gold or room
export function mountSwordsman(ti) {
  const s = G.teams[ti];
  if (!champOf(ti).recruits.includes('cav') || !canRecruit(ti) || s.gold < STATS.cav.cost) return false;
  if (armyPlaces(ti) + placeOf('cav') - placeOf('sword') > capOf(ti)) return false;
  let best = null;
  for (const u of G.units) if (!u.dead && u.ti === ti && u.kind === 'sword' && !u.neutral && (!best || u.hp / u.max > best.hp / best.max)) best = u;
  if (!best) return false;
  s.gold -= STATS.cav.cost; giveHorse(best);
  if (ti === G.myTi) { G.recruited++; sound('coin'); fx('float', { x: best.x, y: best.y + 3.2, z: best.z, text: 'Mounted', color: '#fff' }); }
  fx('netFlush'); return true;
}
export const swordsmen = ti => G.units.filter(u => !u.dead && u.ti === ti && u.kind === 'sword' && !u.neutral);
// his horse is down: on foot as a swordsman again (army.js dismount calls this for a soldier)
export function horseLost(u) {
  if (u.kind !== 'cav') return;
  u.kind = 'sword'; u.chargeX = 1; u.lance = false; u.dodge = 0; setSword(u, true);
}
// upgrades bought: every swordsman / cavalryman in the field takes the new tier
export function applySwordTier(ti) { for (const u of G.units) if (!u.dead && u.ti === ti && u.kind === 'sword' && !u.neutral) setSword(u, true); }
export function applyCavTier(ti) {
  for (const u of G.units) if (!u.dead && u.ti === ti && u.kind === 'cav' && !u.neutral) {
    const was = u.horseMax || 1, f = u.horseHp / was; setCav(u, true); u.horseHp = Math.max(1, u.horseMax * f);
  }
}
// (melee) a swordsman's Pursuit: his first hit on a man running slows him; any hit from behind bites harder
// (C5) a swordsman with a burst (his champion's top tier) closing on a foe within its reach: a short sprint in
export function burstIn(u, fd) { const b = u.burst; if (b && u.kind === 'sword' && fd < b.near && fd > b.min && !(u.burstCd > G.T)) { u.burstT = G.T + b.t; u.burstCd = G.T + b.cd; } }
export function pursuitHit(a, b, dmg, fromBehind) {
  if (!a || !a.pursuit || a.kind !== 'sword') return dmg;
  if (fromBehind && b.leader) dmg *= SWORD_TIERS[1].behind; // (a soldier hit from behind already takes the flank's share, melee.js)
  if (!b.dead && Math.hypot(b.vx || 0, b.vz || 0) > 3.5 && !(a.pursued && a.pursued.has(b.id))) {
    (a.pursued || (a.pursued = new Set())).add(b.id);
    b.slowUntil = G.T + 2; b.slowK = Math.min(b.slowK && b.slowUntil > G.T ? b.slowK : 1, .6);
  }
  return dmg;
}
// (Barding) a galloping horse is hit less often
export const bardingMiss = r => r.kind === 'cav' && r.dodge > 0 && Math.hypot(r.vx || 0, r.vz || 0) > 7 && Math.random() < r.dodge;

// where a cavalryman rides this step: [x, z] to head for, or null to fight on foot rules (the soldier code). His
// charge: a foe `near`-`far` m ahead (not behind a braced line), the charge on its recharge; then past him, a wheel,
// and again. Hold: no charging. Follow with no fight near: at the captain's flank.
export function cavRide(u, order, L, leaderUp, dt) {
  u.chargeCd = Math.max(0, (u.chargeCd || 0) - dt); if (u.charge > 0) u.charge = Math.max(0, u.charge - dt);
  if (u.wheel) { // riding past, then round
    const w = u.wheel; w.t -= dt;
    if (w.t <= 0 || Math.hypot(u.x - w.x, u.z - w.z) < 1.5) u.wheel = null; else return [w.x, w.z];
  }
  if (order === 'hold') return null;
  const [foe, fd] = nearestFoe(u, CAV.far + 4);
  if (!foe) {
    if (order === 'follow' && leaderUp && L) { const side = (u.id % 2 ? 1 : -1) * 3.2; return [L.x + Math.cos(L.face) * side - Math.sin(L.face) * 1.5, L.z - Math.sin(L.face) * side - Math.cos(L.face) * 1.5]; }
    return null;
  }
  const braceNear = G.units.some(o => !o.dead && isEnemy(o, u) && o.bracing && Math.hypot(o.x - u.x, o.z - u.z) < CAV.avoid + 3 && Math.abs(Math.atan2(o.x - u.x, o.z - u.z) - Math.atan2(foe.x - u.x, foe.z - u.z)) < .6);
  if (braceNear) { const a = Math.atan2(foe.x - u.x, foe.z - u.z) + Math.PI / 2; return [u.x + Math.sin(a) * 6, u.z + Math.cos(a) * 6]; } // (round a braced line, never into it)
  if (u.charge <= 0 && u.chargeCd <= 0 && fd > CAV.near && fd < CAV.far) {
    u.charge = 2.2; u.chargeCd = u.lance && u.lanceSpent ? CAV.lance : CAV.cd; u.chargeHit = new Set(); u.lanceSpent = u.lance;
  }
  if (u.charge > 0) { // through him and out the other side
    const a = Math.atan2(foe.x - u.x, foe.z - u.z), x = foe.x + Math.sin(a) * CAV.past, z = foe.z + Math.cos(a) * CAV.past;
    if (fd < 1.6) u.wheel = { x, z, t: 1.6 };
    return [x, z];
  }
  if (fd < CAV.near && u.chargeCd > 1) { const a = Math.atan2(u.x - foe.x, u.z - foe.z) + .8; u.wheel = { x: foe.x + Math.sin(a) * (CAV.far - 3), z: foe.z + Math.cos(a) * (CAV.far - 3), t: 2.5 }; return [u.wheel.x, u.wheel.z]; } // (break off and wheel for room)
  return null;
}
