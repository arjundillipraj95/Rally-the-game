// Battle rules: ride-by strikes, parry, block, heavy blows, the brace.
import { wolfRider } from './sigrun.js'; // (C5)
import { STAMINA, TEAMS, PARRY, HEAVY, EXEC, HOLD_ATK, GUARD, RIDE, RALLY } from '../../config.js';
import { G, isEnemy, colorOf } from '../state.js';
import { clamp, angDiff, turn } from '../world.js';
import { fx, sound, spark } from './util.js';
import { hl } from './match.js';
import { dismount, gainRally, horseDamage, loseHeart, push } from './army.js';
import { hit, spendSt, startSweep, startSwing } from './melee.js';
import { rangedOf, rangedHold } from './ranged.js'; // (RANGE1)
import { CC, die, javTarget, softAim, throwJavelin } from './step.js'; // (later files: through the entry, so files still load in the old order)

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
  if (wolfRider(p)) { p.rideTg = null; return; } // (C5b: on the wolf the press struck)
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
  // a beaten captain, marked, taken at full gallop with a perfect release: ridden down
  if (q === 'perfect' && p.human && tg.leader && tg.execReady && !tg.dead && (p.gallop || 0) >= .6 && (tg.duelId || 0) === (p.duelId || 0)) { rideDown(p, tg, ang); return; }
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
function rideDown(p, v, ang) {
  v.execReady = false; v.hp = 0; v.lastHit = G.T;
  p.slowT = Math.max(p.slowT || 0, .7); v.slowT = .7;
  spark(v.x, v.y + 1.4, v.z, TEAMS[colorOf(v.ti)].css, 16); sound('heavy', v.x, v.z); sound('trample', v.x, v.z);
  fx('fxmsg', { k: 'fxridedown', u: v, a: p });
  die(v, p, ang, 1); loseHeart(v.ti, EXEC.morale); gainRally(p, EXEC.rally); hl(p.ti, 'exec'); hl(p.ti, 'ridedown');
  if (p.isMe) { fx('hitstop', .16); fx('shake', .6); }
  if (p.remote) fx('netFlush');
}
// a computer rider: lines up on a target, lowers his weapon (a red "!"), glints just before the blow
// (the moment for a man on foot to parry), and strikes with a timing that depends on the difficulty
export function aiRide(u, foe, fd) {
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
export function parry(b, a, heavy, byAI, perfect) {
  if (perfect && a.leader && !a.mounted) { // a perfect parry: the blade turned so hard it leaves his hand
    a.disarmT = G.T + PARRY.disarm; a.cd = Math.max(a.cd, PARRY.disarm); a.combo = 0;
    fx('fxmsg', { k: 'fxdisarm', u: a, a: b }); gainRally(b, RALLY.parry); hl(b.ti, 'disarm');
  }
  b.parryT = -9; b.lastBlow = null; b.cd = 0; b.stun = 0; if (b.human) hl(b.ti, 'parry');
  if (b.leader) b.st = Math.min(STAMINA.max, (b.st ?? STAMINA.max) + STAMINA.parry); // (a parry gives some breath back)
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
export function startHeavy(u, tg, windup) {
  if (u.cd > 0 || u.stun > 0 || u.windup > 0 || u.mounted || (u.leader && (u.st ?? STAMINA.max) < STAMINA.heavy)) return false;
  spendSt(u, STAMINA.heavy);
  u.windup = windup; u.glint = false; u.heavyTg = tg; u.cd = windup + .55; u.swingKind = 5;
  u.face = Math.atan2(tg.x - u.x, tg.z - u.z);
  return true;
}
export function heavyTick(u, dt) {
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
  if (rangedOf(p) && !p.duelId) { rangedHold(p, held, dt); return; } // (RANGE1: held, a ranged champion keeps shooting)
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
  if (!p || p.dead || p.mounted || p.stun > 0 || p.execT > 0 || p.execA) return; // (mid-execution: the press was the finishing blow)
  if (w === 'sword' && G.T - (p.chargeBrokeT ?? -9) < t) return; // (struck while winding it up: the blow is lost)
  if (w === 'sword' && t >= HOLD_ATK.sword + .12) heavySwing(p, Math.min(1, (t - HOLD_ATK.sword) / (HOLD_ATK.swordFull - HOLD_ATK.sword)));
  if (w === 'jav') { const k = t > HOLD_ATK.jav ? Math.min(1, (t - HOLD_ATK.jav) / (HOLD_ATK.javFull - HOLD_ATK.jav)) : 0; javThrow(p, k); }
}
// the sword's held blow: slower, but smashes guards, knocks men flat and cuts through a wind-up
function heavySwing(p, k) {
  p.cd = Math.min(p.cd, 0);
  const tg = softAim(p, CC.sword.aim + 1.2);
  if (!startSwing(p, tg)) return;
  if (!spendSt(p, STAMINA.heavy - STAMINA.light)) p.pending.tired = true;
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
export function braceTick(p, dt) {
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
