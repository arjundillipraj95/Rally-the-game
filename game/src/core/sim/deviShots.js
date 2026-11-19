// Battle rules: C4 Devi's specials (design doc, Devi card, 18 Nov; numbers on her page). Host and solo.
// Piercing shot (sp1): a `draw` s draw, then one arrow straight down a `len` m line, through everything in it: `champ`
// to champions, `soldier` to soldiers (+`lvlUp` a level from 3), all slowed by `slow` for `slowT` s; a galloping horse
// it hits stops dead `stop` s (the rider stays on). A raised front shield (Shield of Cassius, a shield wall, a testudo)
// takes it at `blockX` and stops it there. From the saddle she stays on.
// Evade (sp2): a `dist` m dash in `dur` s the way she drags (a tap: away from the nearest enemy), untouchable meanwhile;
// walls stop it. Mounted: the horse dashes, like a charge with no damage.
// Tiger's volley (ult): she plants her feet and looses `n` arrows over `dur` s down a `len` m line, each `dmg` (+`lvlUp`
// a level from 7) into the first enemy in it; she turns at most `turn` rad a second (the stick; a computer Devi
// toward her mark); a stun or a
// knock-up ends it. A raised front shield lets about 1 in `slip` through, the rest are turned. From the saddle the horse
// halts and she shoots from it.
// Arrow storm (army ult): a `warn` s mark on the ground for everyone, then for `dur` s every archer of hers within
// `reach` m rains arrows into the `r` m circle; her stone throwers put their next stones in it; with fire arrows (her
// archers' second tier) the circle burns when it ends.
import { STONE } from '../../config.js';
import { G, isEnemy } from '../state.js';
import { groundY, angDiff, rnd } from '../world.js';
import { fx, sound } from './util.js';
import { makeArrow, shoot } from './missiles.js';
import { coverOf } from './scutum.js';
import { hurt } from './thrower.js';
import { levelOf } from '../../champions/stats.js';
import { LEVELS } from '../../config.js';

const grow = (u, d, slot) => 1 + (d.lvlUp || 0) * Math.max(0, levelOf(u.ti) - LEVELS.unlock[slot]);
const foesOf = u => G.units.filter(o => !o.dead && !o.rest && isEnemy(o, u) && !(o.execT > 0));
// is b covered from (x, z) by a raised front shield: his own Shield of Cassius or one he stands behind, a shield wall,
// a testudo's front
export function raisedFront(b, x, z) {
  if (coverOf(b, x, z)) return true;
  if ((b.shieldwall || b.testudo) && Math.abs(angDiff(b.face, Math.atan2(x - b.x, z - b.z))) < Math.PI / 3) return true;
  return false;
}
// a straight visual arrow (no harm of its own: the shot's harm is resolved here, on its line)
function streak(u, ax, az, len, spread = 0) {
  if (spread) { const a = Math.atan2(ax, az) + rnd(-spread, spread); ax = Math.sin(a); az = Math.cos(a); } // (ARCH2: a fan, to the eye only: the harm is on the line)
  const x1 = u.x + ax * len, z1 = u.z + az * len, y0 = (u.y || 0) + (u.mounted ? 2.4 : 1.6);
  G.arrows.push(makeArrow({ id: ++G.arrowN, x0: u.x, y0, z0: u.z, x1, z1, y1: groundY(x1, z1) + 1.2, dur: len / 60, peak: .2, ti: u.ti, t: 0, shooter: u, vis: true, champ: true }));
}
// the enemies along a line from u, nearest first: [o, distance along]
function along(u, ax, az, len, w) {
  const out = [];
  for (const o of foesOf(u)) {
    const dx = o.x - u.x, dz = o.z - u.z, f = dx * ax + dz * az, s = Math.abs(dx * az - dz * ax);
    if (f > -.3 && f < len && s < w + (o.r || .5)) out.push([o, f]);
  }
  return out.sort((a, b) => a[1] - b[1]);
}

// ---------- Piercing shot ----------
export function startPierce(u, at, d) {
  const a = Math.atan2(at.x - u.x, at.z - u.z); u.face = a;
  u.pierce = { T: G.T + d.draw, ax: Math.sin(a), az: Math.cos(a), d };
  u.swing = .38; u.swingKind = 9; u.lastSwingT = G.T; // (9: the overdraw, render maps it to its clip)
  sound('draw', u.x, u.z);
}
function loosePierce(u) {
  const P = u.pierce, d = P.d; u.pierce = null; if (u.dead || u.stun > 0) return;
  u.face = Math.atan2(P.ax, P.az); streak(u, P.ax, P.az, d.len); sound('bow', u.x, u.z);
  const k = grow(u, d, 'sp1');
  const hit = []; let end = d.len;
  for (const [o, f] of along(u, P.ax, P.az, d.len, d.w)) {
    if (raisedFront(o, u.x, u.z)) { hurt(o, (o.leader ? d.champ : d.soldier) * k * d.blockX, u, u.ti, 'arrow', 1); sound('thud', o.x, o.z); end = f; hit.push(o.id); break; } // (a raised shield: a little through, and it stops there)
    hit.push(o.id);
    hurt(o, (o.leader ? d.champ : d.soldier) * k, u, u.ti, 'arrow', 1);
    o.slowUntil = G.T + d.slowT; o.slowK = 1 - d.slow;
    if (o.mounted && Math.hypot(o.vx, o.vz) > 8) { o.vx = o.vz = 0; o.haltUntil = G.T + d.stop; } // (a galloping horse stops dead; the rider stays on)
  }
  fx('fxmsg', { k: 'fxpierce', u, q: [P.ax.toFixed(3), P.az.toFixed(3), end.toFixed(1), d.slowT, hit.join(':')].join(',') }); // (ARCH2: the shot's light, on every phone: render/devifx.js)
}

// ---------- Evade ----------
export function startEvade(u, at, d) {
  const a = Math.atan2(at.x - u.x, at.z - u.z), v = d.dist / d.dur;
  u.vx = Math.sin(a) * v; u.vz = Math.cos(a) * v; u.dashT = d.dur; u.iframeT = d.dur;
  if (!u.mounted) u.face = a; // (on foot she turns with it; the horse simply goes)
  u.evade = { kind: 'dash', t: G.T, a }; u.lastEvadeT = G.T; u.dashStop = G.T + d.dur; // (stopped when the dash ends: 5 m, not a slide)
  sound('swing', u.x, u.z);
  fx('fxmsg', { k: 'fxevade', u, q: [u.x.toFixed(2), u.z.toFixed(2), a.toFixed(3)].join(',') }); // (ARCH2: her afterimage)
}
// a tap's aim: away from the nearest enemy (or back the way she faces)
export function awayAim(u, dist) {
  let best = null, bd = 1e9;
  for (const o of foesOf(u)) { const dd = Math.hypot(o.x - u.x, o.z - u.z); if (dd < bd) { bd = dd; best = o; } }
  const a = best && bd < 20 ? Math.atan2(u.x - best.x, u.z - best.z) : u.face + Math.PI;
  return { x: u.x + Math.sin(a) * dist, z: u.z + Math.cos(a) * dist };
}

// ---------- Tiger's volley ----------
export function startVolley(u, at, d) {
  const a = Math.atan2(at.x - u.x, at.z - u.z); u.face = a;
  u.tvolley = { T0: G.T, next: G.T, n: 0, aim: at.u || { x: at.x, z: at.z }, d };
  u.vx = u.vz = 0; sound('draw', u.x, u.z);
  fx('fxmsg', { k: 'fxvolley', u }); // (ARCH2: the tiger's mark at her feet)
}
function volleyStep(u, dt) {
  const V = u.tvolley, d = V.d;
  if (u.dead || u.stun > 0 || u.launch || V.n >= d.n) { u.tvolley = null; return; }
  u.vx = u.vz = 0; // (her feet planted; the horse halted)
  const m = !u.human && V.aim && !V.aim.dead ? V.aim : null; // (a computer Devi follows her mark; a player steers with the stick, step.js)
  if (m) { const want = Math.atan2(m.x - u.x, m.z - u.z), df = Math.atan2(Math.sin(want - u.face), Math.cos(want - u.face)); u.face += Math.sign(df) * Math.min(Math.abs(df), d.turn * dt); }
  while (G.T >= V.next && V.n < d.n) {
    V.n++; V.next += d.dur / d.n;
    const ax = Math.sin(u.face), az = Math.cos(u.face); streak(u, ax, az, d.len, .1); u.swing = .2; u.swingKind = 8; u.lastSwingT = G.T;
    if (V.n % 3 === 1) sound('bow', u.x, u.z);
    const first = along(u, ax, az, d.len, d.w)[0];
    if (!first) continue;
    const o = first[0];
    if (raisedFront(o, u.x, u.z) && Math.random() >= 1 / d.slip) { sound('thud', o.x, o.z); continue; } // (turned; now and then one finds its place)
    hurt(o, d.dmg * grow(u, d, 'ult'), u, u.ti, 'arrow', 1);
  }
}

// ---------- Arrow storm ----------
export function startStorm(u, at, d) {
  (G.storms || (G.storms = [])).push({ id: ++G.stoneN, ti: u.ti, x: at.x, z: at.z, r: d.r, T0: G.T, warn: d.warn, dur: d.dur, d, next: 0 });
  fx('fxmsg', { k: 'fxstorm', u, x: at.x, z: at.z });
  for (const t of G.units) if (!t.dead && t.ti === u.ti && t.kind === 'thrower') { t.mark = { x: at.x, z: at.z }; t.markT = d.warn + d.dur; } // (her throwers' next stones in it)
}
function stormStep(S) {
  const t = G.T - S.T0, d = S.d;
  if (t < S.warn || G.T < S.next) return t > S.warn + S.dur;
  S.next = G.T + d.every;
  for (const a of G.units) {
    if (a.dead || a.ti !== S.ti || a.kind !== 'arch' || a.stun > 0 || Math.hypot(a.x - S.x, a.z - S.z) > d.reach) continue;
    const ang = rnd(0, Math.PI * 2), r = Math.sqrt(Math.random()) * S.r, mark = { x: S.x + Math.sin(ang) * r, z: S.z + Math.cos(ang) * r, vx: 0, vz: 0 };
    a.face = Math.atan2(S.x - a.x, S.z - a.z); const j = a.jitter; a.jitter = .2; shoot(a, mark); a.jitter = j;
    const last = G.arrows[G.arrows.length - 1]; if (last && last.shooter === a) { last.plunge = true; last.peak = 14; last.dur += .5; } // (down from the sky: over a plain shield, as a tower's; ARCH2: high, as loosed to the sky)
  }
  return t > S.warn + S.dur;
}
function stormEnd(S) {
  const fire = G.units.some(a => !a.dead && a.ti === S.ti && a.kind === 'arch' && a.fireArrows);
  if (fire) (G.fires || (G.fires = [])).push({ id: ++G.stoneN, x: S.x, z: S.z, r: S.r, until: G.T + STONE.fire.life, ti: S.ti, sh: G.teams[S.ti] && G.teams[S.ti].leader });
}

// each step (host): a drawn Piercing shot looses; Tiger's volleys fire; arrow storms rain
export function deviTick(dt) {
  for (const u of G.units) {
    if (!u.leader) continue;
    if (u.dashStop && G.T >= u.dashStop) { u.vx = u.vz = 0; u.dashStop = 0; }
    if (u.pierce && G.T >= u.pierce.T) loosePierce(u);
    if (u.tvolley) volleyStep(u, dt);
  }
  const L = G.storms; if (!L) return;
  for (let i = L.length - 1; i >= 0; i--) if (stormStep(L[i])) { stormEnd(L[i]); L.splice(i, 1); }
}
