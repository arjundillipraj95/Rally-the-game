// Battle rules: captain duels and executions.
import { TEAMS, EXEC, MORALE, DUEL, ARMOUR } from '../../config.js';
import { G, isEnemy, colorOf } from '../state.js';
import { rnd, angDiff } from '../world.js';
import { fx, say, sound, spark } from './util.js';
import { hl, squadOf } from './match.js';
import { gainRally, loseHeart, routing, speedOf } from './army.js';
import { startSwing } from './melee.js';
import { die, faceTo, go, shoot } from './step.js'; // (later files: through the entry, so files still load in the old order)

// ---------- the duel ----------
// A captain calls out an enemy captain close by; if he takes it up, both armies' men near them form
// a ring round the two and hold off everyone else while they fight it out. See DUEL in config.js.
// G.duels: { id, a (who called it), b, state 'offer' | 'on', t (time left), x, z (the ring), v0 (where
// b stood when called out), aiT, aiYes (a computer captain's answer), graceT, slotT }
export const duels = () => G.duels || (G.duels = []);
export const duelOffer = p => duels().find(d => d.state === 'offer' && d.b === p) || null;
// who o may fight while duels are on: a duellist only his man; nobody else a duellist; a man of the
// ring not the other duellist's men
export function duelFoe(u, o) {
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
  d.state = 'on'; d.t = DUEL.time; d.graceT = 1.2; d.slotT = 0; d.t0 = G.T;
  d.x = (a.x + b.x) / 2; d.z = (a.z + b.z) / 2;
  a.duelId = b.duelId = d.id; a.dueled = b.dueled = true;
  a.foe = b; b.foe = a; a.fd = b.fd = Math.hypot(a.x - b.x, a.z - b.z);
  for (const u of [a, b]) { u.guardT = 0; u.windup = 0; u.heavyCharge = 0; u.pending = null; }
  say('duelOn', a.ti, b.ti); fx('fxmsg', { k: 'fxduel', u: b, a });
  fx('netFlush');
}
const canFight = u => u && !u.dead && !u.mounted && !u.carrying && !(u.execT > 0) && !u.execV;
export function endDuel(d, why, w, by) {
  const { a, b } = d;
  G.duels = duels().filter(x => x !== d); d.end = why; G.lastDuel = d;
  if (a.duelId === d.id) a.duelId = 0; if (b.duelId === d.id) b.duelId = 0;
  for (const u of G.units) if (u.guardOf === d) { u.guardOf = null; u.rt = 0; }
  if (d.state !== 'on' || why === 'off') return;
  if (why === 'win') { // the winner's men roar; the loser's break and run
    const l = w === a ? b : a, sw = G.teams[w.ti], sl = G.teams[l.ti];
    sw.rally = 100; sw.morale = Math.min(100, sw.morale + DUEL.winMorale);
    if (squadOf(l.ti).length) { sl.morale = 0; sl.routT = MORALE.routT; fx('fxmsg', { k: 'fxrout', u: squadOf(l.ti)[0], ti: l.ti }); }
    say('duelWon', w.ti, l.ti); hl(w.ti, 'duel'); fx('fxmsg', { k: 'fxduelwin', u: w, a: l });
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
  // no duel, then: "He's mine!" The challenger's men leave that captain to him for a while (they still
  // fight everyone round him; his own men may still help him)
  if (!d.a.dead && !d.b.dead) { G.teams[d.a.ti].mine = { ti: d.b.ti, id: d.b.id, until: G.T + DUEL.mineT }; say('mineOn', d.a.ti, d.b.ti); fx('netFlush'); }
}
export function duelTick(dt) {
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
    // (F7e) in the ring's first shoveT seconds, whoever stood inside is eased out to the edge (an ease-out from
    // where he stood when it closed), not set there in one frame; after that the edge simply holds him
    const k = d.t0 != null ? (G.T - d.t0) / DUEL.shoveT : 1;
    if (k < 1) {
      if (u.shoveD !== d.id) { u.shoveD = d.id; u.shoveR0 = dd; }
      const e = 1 - (1 - Math.max(0, k)) ** 2, r = Math.min(m, u.shoveR0 + (m - u.shoveR0) * e);
      if (dd < r) { u.x = d.x + dx / dd * r; u.z = d.z + dz / dd * r; }
      continue;
    }
    u.x = d.x + dx / dd * m; u.z = d.z + dz / dd * m;
  }
}
// A man keeping the ring: watching the fight from his place, turning out to fight off anyone who comes at it.
export function guardRing(u, d, dt) {
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
// A captain's armour takes its share of a blow (less of a crushing one); when it's gone, he hears it go.
export function soak(b, dmg, crushing) {
  const a = Math.min(b.armour, dmg * (crushing ? ARMOUR.pierce : ARMOUR.soak));
  b.armour -= a; if (b.armour <= .01) { b.armour = 0; fx('fxmsg', { k: 'fxarmour', u: b }); if (b.remote) fx('netFlush'); }
  return dmg - a;
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
      else if (o.leader && o.human && d < (o.mounted ? EXEC.markR * 2 : EXEC.markR) && (o.duelId || 0) === (v.duelId || 0)) hunter = true; // (a rider marks him from further off: he'll be on him in a moment)
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
export function startExec(p, v) {
  p.execT = v.execT = EXEC.dur; p.execOf = v; v.execBy = p; p.execHit = false; v.execReady = false; p.execA = true; v.execV = true;
  p.cd = EXEC.dur; v.stun = Math.max(v.stun, EXEC.dur); p.pending = null; v.pending = null; v.windup = 0; v.heavyCharge = 0; v.guardT = 0;
  p.vx = p.vz = v.vx = v.vz = 0; p.charge = 0;
  const ang = Math.atan2(v.x - p.x, v.z - p.z); p.face = ang; v.face = ang + Math.PI;
  sound('swing', p.x, p.z); fx('fxmsg', { k: 'fxexecgo', u: v, a: p });
  if (p.remote || v.remote) fx('netFlush');
}
export function execTick(u, dt) {
  if (!(u.execT > 0)) return;
  u.execT -= dt; u.vx = u.vz = 0;
  const v = u.execOf;
  if (v) { // the executioner: square to him at arm's length, and bring it down at strikeAt
    if (!v.dead) { // (F7f: he slides to his spot beside the victim over EXEC.slide s, not in one frame; once there he stays on it)
      const ang = Math.atan2(v.x - u.x, v.z - u.z), tx = v.x - Math.sin(ang) * EXEC.gap, tz = v.z - Math.cos(ang) * EXEC.gap, left = EXEC.slide - (EXEC.dur - u.execT - dt), k = left > dt ? dt / left : 1;
      u.face = ang; u.x += (tx - u.x) * k; u.z += (tz - u.z) * k;
    }
    if (!u.execHit && EXEC.dur - u.execT >= EXEC.strikeAt) {
      u.execHit = true;
      if (!v.dead) {
        const ang = Math.atan2(v.x - u.x, v.z - u.z);
        v.execT = 0; v.execV = false; v.hp = 0; v.lastHit = G.T;
        spark(v.x, v.y + 1.4, v.z, TEAMS[colorOf(v.ti)].css, 14); sound('heavy', v.x, v.z); sound('hit', v.x, v.z);
        const w = u.weapon || 'sword'; // (each weapon finishes him its own way: the sword's chop, the spear run through him, the javelin driven down)
        fx('fxmsg', { k: 'fxexec', u: v, a: u, q: w });
        die(v, u, ang, w === 'jav' ? 0 : 1); hl(u.ti, 'exec');
        if (w === 'spear') { v.vx *= 1.5; v.vz *= 1.5; v.vy *= .55; } // (run through: thrown back flat, not up)
        if (w === 'jav') { v.vx *= .2; v.vz *= .2; v.vy = 1; } // (pinned where he knelt)
        loseHeart(v.ti, EXEC.morale); gainRally(u, EXEC.rally);
        if (u.isMe) fx('shake', .6); // (F7: the blow's slow motion is drawn on every phone, main.js; no freeze of the rules)
        if (u.remote) fx('netFlush');
      }
    }
    if (u.execT <= 0) { u.execT = 0; u.execOf = null; u.execA = false; u.cd = 0; }
  } else if (u.execT <= 0) { u.execT = 0; u.execV = false; } // (the condemned: he kneels until the blow)
}
