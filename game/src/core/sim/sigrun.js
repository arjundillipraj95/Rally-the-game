// Battle rules: Sigrun's (C5; card docs/tickets/C5.md). Her basic hits on the wolf (claw, claw, bite), her Pounce,
// Spin and the Hunt; her riders' boar's snout. Numbers are on her page (champions/sigrun.js). Host and solo; every
// phone draws them from the unit's state and the 'fxwolf' / 'fxsig*' moments (render/sigrunfx.js).
import { CAPTAIN_COMBAT as CC } from '../../config.js';
import { G, isEnemy } from '../state.js';
import { groundY, angDiff } from '../world.js';
import { integrate } from './move.js';
import { braced, horseDamage, dismount } from './army.js';
import { dropScutum } from './scutum.js';
import { champOf } from '../../champions/index.js';
import { paceOf, levelOf, moveHit } from '../../champions/stats.js';
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
  const lx = u.remote ? P.x : u.x, lz = u.remote ? P.z : u.z; // (a joined phone's champion: her phone flies her and the host sees her a beat late, so it lands where her leap was going)
  if (!tg || tg.dead || Math.hypot(tg.x - lx, tg.z - lz) > u.r + (tg.r || 0) + 1.2) { fx('fxmsg', { k: 'fxpounceland', u, q: 'miss' }); return; }
  const k = 1 + d.lvlUp * Math.max(0, levelOf(u.ti) - 3);
  hit(u, tg, 1, { fixed: moveHit(u, 'sp1', tg.leader), kb: .5, shown: true }); // (BAL1)
  const kill = tg.dead || tg.hp <= 0;
  if (kill) { const c = G.teams[u.ti] && G.teams[u.ti].cds; if (c && c.sp1 > 0) c.sp1 *= d.killCd; }
  fx('fxmsg', { k: 'fxpounceland', u, a: tg, heavy: !!tg.leader, q: kill ? 'kill' : 'hit' });
}

// (C5d) Spin (level 5). On the wolf: a `rideDist` m charge in `rideDur` s the way she aims, the axe spinning, cutting
// through everyone in its `w` m width without shoving them: `soldier` to each, `champ` to a champion; a braced spear
// line facing it stops it and the wolf takes their spears (x`horseX`). On foot: a spin of `dur` s, `ticks` blows of
// `tick` to everyone within `r` m, at +`pace` speed, her slows gone when it starts; no basic hits meanwhile.
// +`lvlUp` a level from 5. The page's sp2 has the numbers.
const k5 = (u, d) => 1 + d.lvlUp * Math.max(0, levelOf(u.ti) - 5);
export function startSpin(u, at, d) {
  u.slowUntil = 0; u.pending = null; u.swing = 0;
  if (u.mounted) {
    const a = Math.hypot(at.x - u.x, at.z - u.z) > .2 ? Math.atan2(at.x - u.x, at.z - u.z) : u.face; u.face = a;
    u.spin = { ride: true, t: 0, x: u.x, z: u.z, dx: Math.sin(a), dz: Math.cos(a), dist: d.rideDist, v: d.rideDist / d.rideDur, gone: 0, hit: new Set(), d };
    u.vx = u.vz = 0; fx('fxmsg', { k: 'fxspin', u, q: `c,${u.x.toFixed(2)},${u.z.toFixed(2)},${a.toFixed(3)}` });
  } else {
    u.spin = { ride: false, t: 0, n: 0, d }; u.act = { name: 'spin', t: G.T };
    fx('fxmsg', { k: 'fxspin', u, q: 'g' });
  }
}
// a joined phone's own champion: the same charge from where she stands, or the spin (its pace) (the host's hits)
export function flySpin(u, q, d) {
  const p = String(q).split(','); if (!d) return;
  if (p[0] === 'g') { u.spin = { ride: false, t: 0, n: 0, d, own: true }; return; }
  const a = +p[3]; if (!Number.isFinite(a)) return; u.face = a;
  u.spin = { ride: true, t: 0, x: u.x, z: u.z, dx: Math.sin(a), dz: Math.cos(a), dist: d.rideDist, v: d.rideDist / d.rideDur, gone: 0, hit: new Set(), d, own: true };
}
export const spinPace = u => (u.spin && !u.spin.ride ? 1 + u.spin.d.pace : 1); // (army.js speedOf)
// each step of it: true when it moved her (the charge; the caller skips her usual movement)
export function spinStep(u, dt) {
  const S = u.spin, d = S.d; S.t += dt;
  if (!S.ride) { // the spin on foot: she moves as usual, blows round her on the beat
    const gap = d.dur / d.ticks;
    while (!S.own && S.n < d.ticks && S.t >= (S.n + .5) * gap) { S.n++; for (const o of G.units) if (!o.dead && isEnemy(u, o) && Math.hypot(o.x - u.x, o.z - u.z) <= d.r + (o.r || 0)) hit(u, o, 1, { fixed: moveHit(u, 'sp2', o.leader, 1 / d.ticks), kb: .05 }); fx('fxmsg', { k: 'fxspintick', u }); }
    if (S.t >= d.dur) endSpin(u, S);
    return false;
  }
  u.vx = u.vz = 0;
  const step = Math.min(S.v * dt, S.dist - S.gone), pr = { x: S.x, z: S.z, r: u.r, ti: u.ti, vx: S.dx * step / dt, vz: S.dz * step / dt, jy: 0 };
  integrate(pr, dt, pr.z);
  const got = (pr.x - S.x) * S.dx + (pr.z - S.z) * S.dz; S.x = pr.x; S.z = pr.z; S.gone += Math.max(0, got);
  let stop = got < step * .5 || S.gone >= S.dist - .01; // (a wall, a rock; or the end of it)
  if (!S.own && !stop) stop = cuts(u, S);
  if (stop) endSpin(u, S);
  if (!u.remote) { u.x = S.x; u.z = S.z; u.y = groundY(u.x, u.z) + (u.jy || 0); }
  return !u.remote;
}
function endSpin(u, S) {
  u.spin = null; if (u.act && u.act.name === 'spin') u.act = null;
  if (!S.own) fx('fxmsg', { k: 'fxspinend', u, q: S.ride ? `${S.x.toFixed(2)},${S.z.toFixed(2)}` : 'g' });
}
// whom the charge cuts this step: true when a braced spear line ends it
function cuts(u, S) {
  const d = S.d, k = k5(u, d);
  const ahead = (o, reach) => { const rx = o.x - S.x, rz = o.z - S.z, f = rx * S.dx + rz * S.dz, s = rx * S.dz - rz * S.dx; return f > -.6 && f < u.r + (o.r || 0) + reach && Math.abs(s) < d.w + (o.r || 0); };
  const faces = o => Math.abs(angDiff(o.face, Math.atan2(S.x - o.x, S.z - o.z))) < 1.1;
  for (const o of G.units) {
    if (o.dead || S.hit.has(o.id) || !isEnemy(u, o) || !ahead(o, .3)) continue;
    if (o.kind === 'foot' && braced(o) && faces(o)) { // a braced spear line: it stops here, the wolf takes their spears
      for (const f of G.units) if (!f.dead && isEnemy(u, f) && f.kind === 'foot' && braced(f) && faces(f) && ahead(f, 1.2)) { S.hit.add(f.id); if (u.mounted) horseDamage(u, f.dmg * d.horseX); }
      fx('fxmsg', { k: 'fxspinbrace', u, a: o }); return true;
    }
    S.hit.add(o.id); hit(u, o, 1, { fixed: moveHit(u, 'sp2', o.leader), kb: .001, unblockable: !o.leader }); // (cuts through: no shove)
    fx('fxmsg', { k: 'fxspincut', u, a: o });
  }
  return false;
}

// (C5e) The Hunt (ult, level 7): only on an enemy champion below `below` of his health within `range` m (`rideRange` on
// the wolf); never wasted (the button is dark without one). It locks on and strikes in `strike` s: he dies, whatever
// shield he holds; a dash that makes him untouchable at that moment (Devi's Evade) dodges it. On the wolf: the pounce,
// the jaws on his neck, one shake (`after` s); on foot: a leaping overhead chop. No gore: a white flash, `slow` s of
// slow motion, a bright arc, the howl. The page's ult has the numbers.
export const huntable = (u, o, d) => !!o && !o.dead && o.leader && isEnemy(u, o) && o.hp < o.max * d.below && Math.hypot(o.x - u.x, o.z - u.z) <= reachOf(u, d) + (o.r || 0);
export function huntTarget(u, d, at) {
  const L = G.units.filter(o => huntable(u, o, d)); if (!L.length) return null;
  return at && Number.isFinite(at.x) && !at.tap ? near(L, at.x, at.z) : L.reduce((b, o) => (o.hp / o.max < b.hp / b.max ? o : b));
}
export function startHunt(u, at, d) {
  const tg = huntTarget(u, d, at); if (!tg) return false;
  u.hunt = { t: 0, x0: u.x, z0: u.z, tg, d, ride: !!u.mounted, done: false, x: tg.x, z: tg.z };
  u.vx = u.vz = 0; u.swing = 0; u.pending = null; u.face = Math.atan2(tg.x - u.x, tg.z - u.z);
  if (!u.mounted) u.act = { name: 'pounce', t: G.T };
  fx('fxmsg', { k: 'fxhunt', u, a: tg, q: `${tg.x.toFixed(2)},${tg.z.toFixed(2)}` });
  return true;
}
export function flyHunt(u, q, d) {
  const [x, z] = String(q).split(',').map(Number); if (!Number.isFinite(x) || !d) return;
  u.hunt = { t: 0, x0: u.x, z0: u.z, tg: null, d, ride: !!u.mounted, done: true, own: true, x, z };
}
export function huntStep(u, dt) {
  const H = u.hunt, d = H.d, tg = H.tg; H.t += dt; u.stun = 0; u.vx = u.vz = 0; u.pending = null;
  if (tg && !tg.dead && !H.done) { const a = Math.atan2(tg.x - H.x0, tg.z - H.z0), g = Math.max(0, Math.hypot(tg.x - H.x0, tg.z - H.z0) - (u.r + (tg.r || 0)) * .8); H.x = H.x0 + Math.sin(a) * g; H.z = H.z0 + Math.cos(a) * g; u.face = a; }
  const s = Math.min(1, H.t / d.strike);
  if (!u.remote) { u.x = H.x0 + (H.x - H.x0) * s; u.z = H.z0 + (H.z - H.z0) * s; u.jy = 4 * (H.ride ? .6 : 1.1) * s * (1 - s); u.y = groundY(u.x, u.z) + u.jy; }
  if (!H.done && H.t >= d.strike) { H.done = true; huntStrike(u, H); }
  if (H.t >= d.strike + d.after) { u.hunt = null; u.jy = 0; if (u.act && u.act.name === 'pounce') u.act = null; }
  return !u.remote;
}
function huntStrike(u, H) {
  const tg = H.tg;
  if (!tg || tg.dead) { fx('fxmsg', { k: 'fxhuntend', u, q: 'miss' }); return; }
  if (tg.iframeT > 0) { fx('fxmsg', { k: 'fxhuntend', u, a: tg, q: 'dodged' }); fx('fxmsg', { k: 'fxevade', u: tg, a: u }); return; } // (untouchable just then: it misses)
  if (tg.mounted) dismount(tg, true); // (no horse between them)
  if (tg.scutum) dropScutum(tg, 'ult'); tg.testudo = null; // (shields don't hold it)
  tg.howBy = 'hunt'; u.slowT = Math.max(u.slowT || 0, H.d.slow); tg.slowT = Math.max(tg.slowT || 0, H.d.slow);
  hit(u, tg, 1, { fixed: tg.max * 10, ult: true, unblockable: true, unparryable: true, kb: .3 });
  if (!tg.dead && tg.hp > 0) { tg.hp = 0; } // (whatever else it went through: he falls)
  fx('fxmsg', { k: 'fxhuntend', u, a: tg, q: 'kill', heavy: true });
}
