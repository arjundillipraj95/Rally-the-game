// Battle rules: arrows, javelins and volleys.
import { takenX } from './eagle.js';
import { shields, coverOf, blockedBy } from './scutum.js';
import { FEEL, NEUTRAL, TEAMS, STATS, JAVELIN, VOLLEY, RALLY, VCHARGE } from '../../config.js';
import { COUNTER } from '../../config.js';
import { G, isEnemyTi, colorOf } from '../state.js';
import { groundY, inFord, rnd, angDiff } from '../world.js';
import { nearBlockers, gateShut } from '../nav.js';
import { fx, say, sound, spark } from './util.js';
import { hl } from './match.js';
import { bowRange, dismount, gainRally, horseDamage, loseHeart, push } from './army.js';
import { aiDmg, nearestFoe } from './melee.js';
import { soak } from './duel.js';
import { die } from './step.js'; // (later files: through the entry, so files still load in the old order)
import { drumDmg } from './buffs.js';
import { champHit } from './turret.js'; // (CASTLE3)
import { inflDmg, inflTaken } from '../../champions/influence.js';

export function shoot(u, tg, fromY = 1.6) {
  if (G.c2 && u.kind === 'arch' && inFord(u.x, u.z)) return; // (the mountain's river: no bow work up to your knees in it)
  u.atkT = G.T; // (MAP5: seen once he shoots)
  const j = u.jitter || .8;
  const lead = .35 + Math.hypot(tg.x - u.x, tg.z - u.z) / 30;
  const tx = tg.x + tg.vx * lead + rnd(-j, j), tz = tg.z + tg.vz * lead + rnd(-j, j);
  const d = Math.hypot(tx - u.x, tz - u.z), y0 = (u.y || 0) + fromY;
  G.arrows.push(makeArrow({ id: ++G.arrowN, x0: u.x, y0, z0: u.z, x1: tx, z1: tz, y1: groundY(tx, tz) + 1.1, dur: .25 + d / 28, peak: Math.min(6, d * .16), ti: u.ti, t: 0, shooter: u, volley: volleying >= 0 }));
  if (u.neutral) G.arrows[G.arrows.length - 1].neutral = true; // (F4: a garrison's arrow: kills read 'garrison')
  if (!u.tower) u.swing = .38;
  sound('bow', u.x, u.z);
}
// A javelin throw: a foot/captain unit with the javelin ability hurls one at a mid-range foe,
// reusing the arrow flight/hit pipeline (flat damage, no headshot roll) rather than a new system.
export function throwJavelin(u, tg, dmg) {
  u.atkT = G.T; // (MAP5: seen once he throws)
  const d = Math.hypot(tg.x - u.x, tg.z - u.z), y0 = (u.y || 0) + 1.5;
  G.arrows.push(makeArrow({ id: ++G.arrowN, x0: u.x, y0, z0: u.z, x1: tg.x, z1: tg.z, y1: groundY(tg.x, tg.z) + 1.1, dur: .18 + d / 22, peak: Math.min(3.5, d * .09), ti: u.ti, t: 0, shooter: u, javelin: true, jd: dmg, volley: volleying >= 0 }));
  u.javCd = JAVELIN.cd; u.swing = .3;
  sound('bow', u.x, u.z);
}
export function makeArrow(a) { a.x = a.x0; a.y = a.y0; a.z = a.z0; a.px = a.x0; a.py = a.y0; a.pz = a.z0; return a; }
function arrowHit(a, b) {
  if (b.execT > 0 || b.iframeT > 0) return;
  const shooter = a.shooter;
  let dmg, loc = 'body';
  if (a.javelin || a.turret) { // (CASTLE3: a castle's shot is flat damage, no head roll)
    dmg = (a.jd || JAVELIN.dmg) * rnd(.85, 1.15) * aiDmg(a.ti) * drumDmg(a.ti); // (CAMP1: the war drum)
  } else {
    // shooter is missing .arrow/.jitter for a castle tower's arrows (a bare {x,z,ti,tower}
    // placeholder, not a real archer unit), so fall back to the base archer stats for those.
    dmg = (shooter && shooter.arrow != null ? shooter.arrow : STATS.arch.arrow) * rnd(.8, 1.2) * aiDmg(a.ti) * drumDmg(a.ti);
    // Skill/tier-based headshots: tighter aim (lower jitter, from the Marksman upgrade) means
    // more of them land on the head for extra damage, or the legs for less.
    const j = shooter && shooter.jitter != null ? shooter.jitter : .8, headChance = .08 + (1 - j) * .22, roll = Math.random();
    if (roll < headChance) { dmg *= 1.8; loc = 'head'; }
    else if (roll > .82) { dmg *= .6; loc = 'legs'; }
  }
  if (G.teams[b.ti]) G.teams[b.ti].arrowHits++;
  if (a.volley) { const s = G.teams[a.ti]; if (s) (s.vHit || (s.vHit = new Set())).add(b.ti); }
  const frontal = Math.abs(angDiff(b.face, Math.atan2(a.x0 - b.x, a.z0 - b.z))) < 1.1;
  dmg *= inflDmg(shooter) * inflTaken(b, frontal); // (C1e: the champions' influence)
  // a shieldwall turns arrows from the front only — locked shields don't cover the sides or back
  if (b.shieldwall && frontal && !a.bolt && !a.turret && (b.kind === 'foot' || Math.random() < .6)) { spark(b.x, b.y + 2.2, b.z, '#e8d9b0', 4); sound('thud', b.x, b.z); return; }
  b.lastHit = G.T;
  if (a.unhorse && b.mounted) { horseDamage(b, dmg); if (b.mounted) dismount(b, true); gainRally(a.shooter, RALLY.unhorse); fx('fxmsg', { k: 'fxunhorse', u: b }); return; } // a full-draw javelin knocks a rider clean off
  if (b.testudo && !a.bolt) { blockedBy(null, b, a.shooter); return; } // (C3e: arrows do nothing on the testudo's roof)
  if (shields.length) { const S = coverOf(b, a.x0 ?? b.x - (a.vx || 0), a.z0 ?? b.z - (a.vz || 0)); if (S) { blockedBy(S, b, a.shooter); return; } } // (C3c: the Shield of Cassius stops it, castle shots too)
  if (!a.javelin && !a.turret && b.kind === 'foot') dmg *= COUNTER.mult; // (C1d the counter rule: arrows on infantry)
  if (b.mounted) { horseDamage(b, dmg); return; } // (C1d: a mounted champion's horse takes every arrow)
  let blocked = false;
  if (frontal && !b.mounted && !b.carrying && loc !== 'head' && !a.bolt && !a.turret) { // (CASTLE2: a ballista bolt goes through a shield)
    if (b.kind === 'foot' && !a.plunge && Math.random() < .7) blocked = true; // (a plain shield; arrows plunging from a tower come in over it)
    if (b.leader && (b.human ? b.blocking : Math.random() < .35)) blocked = true;
  }
  if (blocked) { spark(b.x, b.y + 1.3, b.z, '#e8d9b0', 4); sound('thud', b.x, b.z); b.blockT = Math.max(b.blockT, .2); return; }
  if (b.leader && b.armour > 0) dmg = soak(b, dmg, false);
  champHit(a.shooter, b); // (CASTLE3: turret aggro)
  dmg *= takenX(b); // (C3d)
  b.hp -= dmg; spark(b.x, b.y + 1.3, b.z, b.neutral ? NEUTRAL.css : TEAMS[colorOf(b.ti)].css, 4); sound('hit', b.x, b.z);
  push(b, 0, 0, .12);
  if (b.isMe) { fx('shake', FEEL.hurt.arrowShake); fx('buzz', FEEL.hurt.arrowBuzz); }
  const sh = a.shooter;
  if (b.hp <= 0) b.howBy = a.javelin ? 'jav' : 'arrow';
  if (b.hp <= 0 && (a.neutral || a.plunge || a.bolt)) b.cause = a.neutral ? 'garrison' : a.bolt ? 'ballista' : 'tower';
  if (b.hp <= 0) die(b, a.neutral ? null : sh && !sh.dead && !sh.tower ? sh : { ti: a.ti, human: false, leader: false }, Math.atan2(b.x - a.x0, b.z - a.z0));
}
// Missile volley: every archer with a target in range fires immediately, and every javelin-ready
// footman (tier 1+) throws immediately, together, on a shared team cooldown. Aimed (pt = {x, z}):
// everyone who can reach the mark rains it there, scattered a little around it.
let volleying = -1; // (while a volley is loosed: the army whose arrows these are)
export function orderVolley(ti, pt) {
  const s = G.teams[ti];
  if (!s || !s.active || s.volleyCd > 0) return false;
  let fired = false; volleying = ti;
  try { fired = loose(ti, pt); } finally { volleying = -1; }
  if (fired) { s.volleyCd = VOLLEY.cd; s.vHit = new Set(); s.vLandT = -9; }
  return fired;
}
function loose(ti, pt) {
  let fired = false;
  for (const u of G.units) {
    if (u.dead || u.ti !== ti || u.stun > 0) continue;
    if (pt) {
      const d = Math.hypot(pt.x - u.x, pt.z - u.z), a = rnd(0, Math.PI * 2), r = Math.sqrt(Math.random()) * VOLLEY.spread;
      const mark = { x: pt.x + Math.sin(a) * r, z: pt.z + Math.cos(a) * r, vx: 0, vz: 0 };
      if (u.kind === 'arch' && d <= bowRange(u, pt) * 1.1) {
        u.face = Math.atan2(pt.x - u.x, pt.z - u.z); const j = u.jitter; u.jitter = .3; shoot(u, mark); u.jitter = j;
        u.shootCd = u.shootBase * rnd(.85, 1.2); fired = true;
      } else if (u.kind === 'foot' && u.javelin && u.javCd <= 0 && d <= JAVELIN.range * 1.2) {
        u.face = Math.atan2(pt.x - u.x, pt.z - u.z); throwJavelin(u, mark); fired = true;
      }
      continue;
    }
    if (u.kind === 'arch') {
      const range = bowRange(u, u.foe);
      const [foe] = nearestFoe(u, range);
      if (foe) { u.face = Math.atan2(foe.x - u.x, foe.z - u.z); shoot(u, foe); u.shootCd = u.shootBase * rnd(.85, 1.2); fired = true; }
    } else if (u.kind === 'foot' && u.javelin && u.javCd <= 0) {
      const [foe] = nearestFoe(u, JAVELIN.range, o => !o.mounted);
      if (foe) { u.face = Math.atan2(foe.x - u.x, foe.z - u.z); throwJavelin(u, foe); fired = true; }
    }
  }
  return fired;
}
// Charge ordered hard on a volley that landed: the charge goes in on shaken men
export function volleyCharge(ti) {
  const s = G.teams[ti]; if (!s || !(G.T - (s.vLandT ?? -9) <= VCHARGE.window)) return false;
  s.vcT = G.T + VCHARGE.dur; s.vLandT = -9;
  for (const t of s.vHit || []) loseHeart(t, VCHARGE.morale);
  s.vHit = new Set(); hl(ti, 'vcharge');
  const L = s.leader; if (L && !L.dead) fx('fxmsg', { k: 'fxvcharge', u: L });
  say('volleyCharge', ti); fx('netFlush');
  return true;
}
export function arrowsTick(dt, authoritative) {
  for (const a of G.arrows) {
    if (a.stuck) { a.life -= dt; continue; }
    a.t += dt / a.dur;
    const t = Math.min(1, a.t);
    const x = a.x0 + (a.x1 - a.x0) * t, z = a.z0 + (a.z1 - a.z0) * t, y = a.y0 + (a.y1 - a.y0) * t + a.peak * 4 * t * (1 - t);
    a.px = a.x; a.py = a.y; a.pz = a.z; a.x = x; a.y = y; a.z = z;
    // night on the summit: the arena's walls stop every arrow and javelin, in or out (the Crown is the captains' fight)
    if (G.c2 && G.c2.phase === 'night' && G.layout.arena) { const ar = G.layout.arena.r;
      if ((Math.hypot(a.x0, a.z0) < ar) !== (Math.hypot(x, z) < ar)) { a.stuck = true; a.life = 2; sound('thud', x, z); spark(x, y, z, '#cfc6b2', 4); continue; } }
    if (y < 15 && a.t > .12) { // trees, walls, buildings and ridges stop arrows
      for (const tr of nearBlockers(x, z)) {
        if (tr.off || y > tr.h + groundY(tr.x, tr.z) || (tr.gate && !gateShut(tr))) continue;
        if (a.home && (tr.x - a.home.x) ** 2 + (tr.z - a.home.z) ** 2 < a.home.r2) continue; // (CASTLE3: a castle's shots fly over its own keep and walls)
        if (Math.abs(tr.x - x) < tr.r && Math.abs(tr.z - z) < tr.r && Math.hypot(tr.x - x, tr.z - z) < tr.r) { a.stuck = true; a.life = 2; sound('thud', x, z); spark(x, y, z, '#8a7a62', 3); break; }
      }
      if (a.stuck) continue;
    }
    if (a.t >= 1) {
      if (authoritative) {
        let best = null, bd = 1.0;
        for (const o of G.units) { if (o.dead || !isEnemyTi(o.ti, a.ti) || (o.duelId && !(a.shooter && a.shooter.duelId === o.duelId))) continue; const d = Math.hypot(o.x - a.x1, o.z - a.z1) - (o.mounted ? .5 : 0); if (d < bd) { bd = d; best = o; } }
        if (a.volley) { const s = G.teams[a.ti]; if (s && G.units.some(o => !o.dead && isEnemyTi(o.ti, a.ti) && Math.hypot(o.x - a.x1, o.z - a.z1) < 6)) { if (!(s.vLandT > G.T - .5) && s.human && s.leader && !s.leader.dead) fx('fxmsg', { k: 'fxvland', u: s.leader }); s.vLandT = G.T; } } // (a volley's come down among them)
        if (best) { arrowHit(a, best); a.done = true; } else { a.stuck = true; a.life = 3; }
      } else { a.stuck = true; a.life = 2.5; }
    }
  }
  G.arrows = G.arrows.filter(a => !(a.done || (a.stuck && a.life <= 0)));
}
