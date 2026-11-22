// Battle rules: Sigrun's (C5; card docs/tickets/C5.md). Her basic hits on the wolf (claw, claw, bite), her Pounce,
// Spin and the Hunt; her riders' boar's snout. Numbers are on her page (champions/sigrun.js). Host and solo; every
// phone draws them from the unit's state and the 'fxwolf' / 'fxsig*' moments (render/sigrunfx.js).
import { CAPTAIN_COMBAT as CC } from '../../config.js';
import { G, isEnemy } from '../state.js';
import { groundY } from '../world.js';
import { champOf } from '../../champions/index.js';
import { paceOf, levelOf } from '../../champions/stats.js';
import { startSwing, hit } from './melee.js';
import { softAim } from './captain.js';
import { fx } from './util.js';

// a champion riding a wolf (her page's mount.kind)
export const wolfRider = p => !!(p && p.leader && p.mounted && (champOf(p.ti).mount || {}).kind === 'wolf');
// (C5b) a press on the wolf: claw, claw, bite at her rate, on what is close ahead; the wolf strikes, she leans into it,
// and they ride on at `pace` meanwhile (no dead stop). The bite is the boosted third (x1.5) and slows its mark.
export function wolfStrike(p) {
  if (!p || p.dead || p.cd > 0 || p.stun > 0) return false;
  const W = champOf(p.ti).wolfHits, S = CC.sword, k = paceOf(p.ti);
  const combo = G.T - p.lastSwingT < S.window * k ? (p.combo + 1) % 3 : 0, fin = combo === 2, best = softAim(p, W.aim);
  if (!startSwing(p, best)) return false;
  Object.assign(p.pending, { t: W.t, mult: fin ? S.finisherMult : S.mult, kb: fin ? .6 : .2, slow: fin ? [W.slow, W.slowT] : null });
  if (best) p.face = Math.atan2(best.x - p.x, best.z - p.z);
  p.cd = (fin ? S.finisherCd : S.cd) * k; p.combo = combo; p.swingKind = combo === 2 ? 4 : combo; p.lastSwingT = G.T;
  p.wolfPaceT = G.T + W.paceT; // (army.js speedOf: ridden on at her strike pace)
  const m = fin ? 'bite' : combo ? 'clawL' : 'clawR';
  fx('fxmsg', { k: 'fxwolf', u: p, q: m }); // (every phone: the wolf's strike and its sound)
  return true;
}

// (C5c) Pounce: a `crouch` s crouch, then a low, fast `air` s arc onto one enemy (not an area): within `range` m on foot,
// `rideRange` m on the wolf. Tap: the nearest enemy; drag: the enemy nearest the spot (within `pick` m of it), else the
// spot. It follows him in the air and lands on him: `champ` to a champion, `soldier` to a soldier (+`lvlUp` a level from
// 3); a rider's horse takes it first (the usual rule). A kill halves the recharge. The page's sp1 has the numbers.
const reachOf = (u, d) => (u.mounted && d.rideRange ? d.rideRange : d.range);
const foes = (u, r) => G.units.filter(o => !o.dead && !o.rest && isEnemy(o, u) && !(o.fog && o.bush >= 0) && Math.hypot(o.x - u.x, o.z - u.z) <= r + (o.r || 0));
const near = (list, x, z) => list.reduce((b, o) => (!b || Math.hypot(o.x - x, o.z - z) < Math.hypot(b.x - x, b.z - z) ? o : b), null);
export function pounceTarget(u, at, d, tap) {
  const L = foes(u, reachOf(u, d)); if (!L.length) return null;
  if (tap || !at) return near(L, u.x, u.z);
  const o = near(L, at.x, at.z); return o && Math.hypot(o.x - at.x, o.z - at.z) <= d.pick + (o.r || 0) ? o : null;
}
export function startPounce(u, at, d) {
  const R = reachOf(u, d), tg = pounceTarget(u, at, d, !!(at && at.tap));
  let x = tg ? tg.x : at.x, z = tg ? tg.z : at.z; const dx = x - u.x, dz = z - u.z, dd = Math.hypot(dx, dz) || 1;
  if (dd > R) { x = u.x + dx / dd * R; z = u.z + dz / dd * R; }
  u.pounce = { t: 0, x0: u.x, z0: u.z, x, z, tg, d, ride: !!u.mounted, done: false, R };
  u.vx = u.vz = 0; u.swing = 0; u.pending = null; u.face = Math.atan2(dx, dz);
  if (!u.mounted) u.act = { name: 'pounce', t: G.T };
  fx('fxmsg', { k: 'fxpounce', u, a: tg || null, q: `${x.toFixed(2)},${z.toFixed(2)}` });
}
// a joined phone's own champion flies the same arc (its phone moves it; the host lands it)
export function flyPounce(u, q, d) {
  const [x, z] = String(q).split(',').map(Number); if (!Number.isFinite(x) || !d) return;
  u.pounce = { t: 0, x0: u.x, z0: u.z, x, z, tg: null, d, ride: !!u.mounted, done: true, own: true, R: reachOf(u, d) };
  if (Math.hypot(x - u.x, z - u.z) > .1) u.face = Math.atan2(x - u.x, z - u.z);
}
// each step of it: true when it moved him (the caller skips his usual movement)
export function pounceStep(u, dt) {
  const P = u.pounce, d = P.d, tg = P.tg; P.t += dt;
  u.stun = 0; u.vx = u.vz = 0; u.pending = null;
  if (tg && !tg.dead && P.t < d.crouch + d.air * .85) { // (it follows him: lands at his side, never beyond its reach)
    const a = Math.atan2(tg.x - P.x0, tg.z - P.z0), gap = Math.max(0, Math.hypot(tg.x - P.x0, tg.z - P.z0) - (u.r + (tg.r || 0)) * .8), g = Math.min(gap, P.R + 1);
    P.x = P.x0 + Math.sin(a) * g; P.z = P.z0 + Math.cos(a) * g; u.face = a;
  }
  const s = Math.min(1, Math.max(0, (P.t - d.crouch) / d.air)), h = P.ride ? d.rideH : d.h;
  if (!u.remote) { u.x = P.x0 + (P.x - P.x0) * s; u.z = P.z0 + (P.z - P.z0) * s; u.jy = 4 * h * s * (1 - s); u.y = groundY(u.x, u.z) + u.jy; }
  if (!P.done && P.t >= d.crouch + d.air) { P.done = true; pounceLand(u, P); }
  if (P.t >= d.crouch + d.air + d.after) { u.pounce = null; u.jy = 0; if (u.act && u.act.name === 'pounce') u.act = null; }
  return !u.remote;
}
function pounceLand(u, P) {
  const tg = P.tg, d = P.d;
  if (!tg || tg.dead || Math.hypot(tg.x - u.x, tg.z - u.z) > u.r + (tg.r || 0) + (u.remote ? 3 : 1.2)) { fx('fxmsg', { k: 'fxpounceland', u, q: 'miss' }); return; } // (a joined phone's champion: her phone flies her, the host sees her a beat late)
  const k = 1 + d.lvlUp * Math.max(0, levelOf(u.ti) - 3);
  hit(u, tg, 1, { fixed: (tg.leader ? d.champ : d.soldier) * k, kb: .5, shown: true });
  const kill = tg.dead || tg.hp <= 0;
  if (kill) { const c = G.teams[u.ti] && G.teams[u.ti].cds; if (c && c.sp1 > 0) c.sp1 *= d.killCd; }
  fx('fxmsg', { k: 'fxpounceland', u, a: tg, heavy: !!tg.leader, q: kill ? 'kill' : 'hit' });
}
