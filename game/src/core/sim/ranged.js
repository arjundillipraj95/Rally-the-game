// Battle rules: RANGE1 a ranged champion's basic attack (design doc, Devi card, 18 Nov; numbers in config RANGED and on
// the champion's page). Attack shoots at the nearest enemy within range (or champions first, the player's setting);
// she sticks to a champion she has hit while he stays in range. Arrows home in on their mark: walls and trees still stop
// them, a raised front block (shield wall, testudo, Shield of Cassius) turns them, a plain soldier's shield doesn't.
// Every third shot is two quick arrows (page.ranged.third each). Held, Attack keeps shooting; while she shoots she moves
// at RANGED.pace (she plants her feet to loose). With nobody in range she shoots a gate, palisade, watchtower, the
// chest, a nexus or the glacier in range, as a melee champion hits them. On horseback she shoots at a walk; riding fast,
// one ride-by shot a press. Flat damage: no head or leg roll, and the counter rule is for soldiers' arrows.
import { RANGED } from '../../config.js';
import { G, isEnemy } from '../state.js';
import { groundY } from '../world.js';
import { sound } from './util.js';
import { makeArrow } from './missiles.js';
import { duelFoe } from './duel.js';
import { hiddenFrom } from './bush.js';
import { wallFoe, towerInReach } from './forts.js'; // (forts is loaded before this file)
import { nearObstacles } from '../nav.js';
import { champOf } from '../../champions/index.js';
import { blowGap, champReach } from '../../champions/stats.js';

export const rangedOf = u => (u && u.leader ? champOf(u.ti).ranged || null : null);
export const rangeOf = u => champReach(u.ti);
const champBlow = u => champOf(u.ti).stats.dmg; // (her blow at level 1, in shown numbers)
const inRange = (u, o, R) => Math.hypot(o.x - u.x, o.z - u.z) <= R + (o.r || .5);
const canShoot = (u, o) => !o.dead && isEnemy(o, u) && duelFoe(u, o) && !(o.execT > 0) && !hiddenFrom(o, u);
// what she shoots: the champion she's on, else the nearest enemy (champions first if she has asked), else a structure
export function rangedTarget(u) {
  const R = rangeOf(u), st = u.rTg;
  if (st && canShoot(u, st) && inRange(u, st, R)) return st;
  u.rTg = null;
  let best = null, bd = 1e9, champ = null, cd = 1e9;
  for (const o of G.units) {
    if (!canShoot(u, o) || !inRange(u, o, R)) continue;
    const d = Math.hypot(o.x - u.x, o.z - u.z);
    if (d < bd) { bd = d; best = o; }
    if (o.leader && d < cd) { cd = d; champ = o; }
  }
  if (u.aimChamp && champ) return champ;
  if (best) return best;
  return structureInRange(u, R);
}
// the nearest enemy gate or palisade within R (and, for a stone thrower, at least `min` off): the obstacle buckets round
// her, out to R (C2 uses it too)
export function wallInRange(u, R, min = 0) {
  let w = null, bd = 1e9; const seen = new Set();
  for (let dx = -R; dx <= R; dx += 4) for (let dz = -R; dz <= R; dz += 4) for (const o of nearObstacles(u.x + dx, u.z + dz)) {
    if (seen.has(o)) continue; seen.add(o);
    const d = Math.hypot(o.x - u.x, o.z - u.z) - (o.r || 0); if (d > R || d < min || d >= bd || !wallFoe(u, o)) continue;
    bd = d; w = o;
  }
  return w;
}
// a structure in bow range, as a melee champion would hit it: the nearest enemy gate or palisade (the obstacle buckets
// round her, out to her range), else a watchtower, the chest, a nexus or the glacier (his reach stretched to her range)
export function structureInRange(u, R) {
  let w = wallInRange(u, R);
  if (!w) { const r0 = u.reach; u.reach = R; try { w = towerInReach(u); } finally { u.reach = r0; } }
  return w ? { bld: w, x: w.x, z: w.z, r: w.r || 1 } : null;
}
// one arrow at the mark, `mult` of her blow
function loose(u, tg, mult) {
  const tx = tg.x, tz = tg.z, d = Math.hypot(tx - u.x, tz - u.z), y0 = (u.y || 0) + (u.mounted ? 2.4 : 1.6);
  const a = makeArrow({ id: ++G.arrowN, x0: u.x, y0, z0: u.z, x1: tx, z1: tz, y1: groundY(tx, tz) + (tg.bld ? 1.4 : 1.1), dur: Math.max(.06, d / RANGED.speed),
    peak: Math.min(1.2, d * .04), ti: u.ti, t: 0, shooter: u, champ: true, jd: u.dmg * mult });
  if (tg.bld) a.bld = tg.bld; else a.tg = tg;
  G.arrows.push(a); u.atkT = G.T; sound('bow', u.x, u.z);
}
// a shot (when the bow is ready): face the mark, loose; every third, two arrows. False: nothing to shoot at.
export function rangedShot(u) {
  if (!u || u.dead || u.cd > 0 || u.stun > 0 || u.carrying || u.tvolley || u.pierce) return false; // (C4: not while a special shoots)
  const P = rangedOf(u); if (!P) return false;
  const tg = rangedTarget(u); if (!tg) return false;
  u.face = Math.atan2(tg.x - u.x, tg.z - u.z);
  u.rN = ((u.rN | 0) + 1) % 3; const third = u.rN === 0;
  loose(u, tg, third ? P.third / champBlow(u) : 1); // (the third: two arrows of `third` each, grown with her level as her blow is)
  if (third) u.rSecond = { T: G.T + RANGED.thirdGap, tg };
  u.cd = blowGap(u.ti); u.swing = .38; u.swingKind = third ? 7 : 8; u.lastSwingT = G.T; // (7: the double shot, 8: a shot; the clip rig picks the bow clips)
  u.firingT = G.T + u.cd + RANGED.hold;
  return true;
}
// each step: the third shot's second arrow
export function rangedTick(u) {
  const s = u.rSecond; if (!s || G.T < s.T) return;
  u.rSecond = null; if (u.dead || u.stun > 0) return;
  const P = rangedOf(u), tg = s.tg && (s.tg.bld || canShoot(u, s.tg)) ? s.tg : rangedTarget(u);
  if (P && tg) loose(u, tg, P.third / champBlow(u));
}
// Attack held (a human, on any phone's input): keep shooting; riding fast, only the press shoots
export function rangedHold(p, held, dt) {
  p.heavyCharge = 0; p.bracing = false; p.javDraw = 0; p.rideReady = false;
  p.ahT = held ? (p.ahT || 0) + dt : 0;
  if (G.role === 'client') { rangedPaceLocal(p, held); return; } // (a joined phone: the host shoots; here only her pace)
  if (!held || p.cd > 0 || p.stun > 0) return;
  if (p.mounted && Math.hypot(p.vx, p.vz) > RANGED.gallop) return;
  rangedShot(p);
}
// (her own phone, joined to a host) the pace while she shoots: Attack held with something in range
export function rangedPaceLocal(p, held) {
  if (!rangedOf(p) || !held || p.mounted) return;
  if (rangedTarget(p)) p.firingT = G.T + RANGED.hold;
}
// the player's Targeting setting (Settings: Nearest, the default, or Champions first), on this phone
let aimC = null;
export function aimChampPref() {
  if (aimC === null) { try { aimC = localStorage.getItem('rally-aim') === 'champ'; } catch (e) { aimC = false; } }
  return aimC;
}
export function setAimChamp(on) { aimC = !!on; try { localStorage.setItem('rally-aim', on ? 'champ' : 'near'); } catch (e) { /* none */ } }
