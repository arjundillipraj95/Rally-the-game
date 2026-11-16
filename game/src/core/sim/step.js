// Battle rules: one step of the battle (update), driving the player's captain.
import { STAMINA, CROWN2, FEEL, ECON, TEAMS, DIFF, UPGRADES, CHARGE, PARRY, FORT, RIDE, MORALE, STREAK } from '../../config.js';
import { G, bus, isEnemy, colorOf, ARMIES, noCastle, capOf, isC2 } from '../state.js';
import { stance, markBraces } from '../charge.js';
import { groundY, clamp, rnd, angDiff, turn } from '../world.js';
import { syncGates } from '../nav.js';
import { fx, say, sound, spark } from './util.js';
import { c2HomePt, homeAt, inwardOf, marchStep, mkUnit, squadOf, startMarch } from './match.js';
import { auraRange, behind, buyUpgrade, canRecruit, canRespawn, dismount, horseDamage, moraleTick, mountUp, onHold, orderOf, push, recruit, speedOf, upgradeCost } from './army.js';
import { aiDmg, buildGrid, duelFoeOf, eachNear, nearestFoe, resolveSwing, shieldTick, sideToward, staminaTick, startSwing, winded } from './melee.js';
import { duelTick, execMark, execTick } from './duel.js';
import { bushTick } from './bush.js';
import { attackHold, blockPress, braceTick, heavyTick } from './guard.js';
import { arrowsTick, shoot } from './missiles.js';
import { checkTime, die, updateControlPoints } from './score.js';
import { fortLvl, insidePlaza, towerInReach, wallInReach } from './forts.js';
import { holdsTick, updateFlag } from './holds.js';
import { c2BreakInReach, c2Tick } from './crown2.js';
import { neutralFoe, thinkNeutral } from './neutral.js';
import { CC, captainAttack, chargeTimers, javMax, stepJump } from './captain.js';
import { fallStep, integrate, moveToward, setPathBudget } from './move.js';
import { thinkLeader } from './ai.js';
import { aiPick, thinkSoldier } from './soldier.js';
export { archTier, footTier, horseMax, speedOf } from './army.js'; // (for earlier files)
export { nearestFoe } from './melee.js'; // (for earlier files)
export { duelFoe, soak } from './duel.js'; // (for earlier files)
export { parry } from './guard.js'; // (for earlier files)
export { shoot, throwJavelin, volleyCharge } from './missiles.js'; // (for earlier files)
export { breach, destroyCastle, die, lastStand, makeCtrlPoints } from './score.js'; // (for earlier files)
export { applyCastleGates, applyFort, applyPlazaWall, castleHere, fortLvl, freshGates, gateHp, hitTower, hitWall, initForts, villageHere } from './forts.js'; // (for earlier files)
export { allianceOf, dropFlag, makeHolds } from './holds.js'; // (for earlier files)
export { c2Begin, c2BreakInReach, c2Hit, c2Hold, c2Points } from './crown2.js'; // (for earlier files)
export { c2Man, c2Post, c2PostTick, dieNeutral } from './neutral.js'; // (for earlier files)
export { CC, javTarget, softAim } from './captain.js'; // (for earlier files)
export { faceTo, go, integrate, moveToward } from './move.js'; // (for earlier files)

// Drives a captain from a move vector in world space (the joystick, already turned by the camera).
// You keep moving and steering while swinging; in the air you keep your momentum with light control.
export function driveCaptain(p, input, dt) {
  if (p.execT > 0 || p.execA || p.execV) { p.blocking = false; return; } // (an execution: the moment holds still)
  const air = (p.jy || 0) > .01;
  p.blocking = !!input.block && !p.mounted && !air;
  const dfoe = duelFoeOf(p);
  p.stickSide = sideToward(p, dfoe, input.wx, input.wz, input.mag); // (in a duel: which way his blow or guard goes)
  if (dfoe && p.blocking && !(p.dashT > 0)) { // holding Block in a duel: he stands his ground facing his man, the stick angles the guard
    p.face = turn(p.face, Math.atan2(dfoe.x - p.x, dfoe.z - p.z), dt * 8);
    input = Object.assign({}, input, { mag: 0 });
  }
  const swinging = p.swing > 0 && !p.mounted;
  const spd = speedOf(p) * (swinging ? .85 : 1);
  if (p.charge > 0) { // charging: full tilt, straight on unless steered
    input = Object.assign({}, input, input.mag < .3 ? { wx: Math.sin(p.face), wz: Math.cos(p.face) } : {}, { mag: 1 });
  }
  const dashing = p.dashT > 0;
  if (dashing) p.dashT -= dt; // (mid-lunge or mid-evade: momentum carries him, eyes on his man)
  else if (air) {
    const k = Math.min(1, dt * 2.5);
    p.vx += (input.wx * spd * input.mag - p.vx) * k; p.vz += (input.wz * spd * input.mag - p.vz) * k;
  } else moveToward(p, p.x + input.wx * 3, p.z + input.wz * 3, spd * input.mag, dt, .05);
  const face0 = p.face;
  if (input.mag > .15 && !dashing) p.face = turn(p.face, Math.atan2(input.wx, input.wz), dt * (p.mounted ? 4.5 : p.blocking ? 5 : swinging ? 6 : 12));
  if (p.mounted) { // the gallop: built riding straight on, lost turning hard or reining in
    const tr = Math.abs(angDiff(face0, p.face)) / Math.max(dt, 1e-3), straight = input.mag > .7 && tr < 1;
    p.gallop = clamp((p.gallop || 0) + (p.charge > 0 ? 1 : straight ? dt / RIDE.gallop : -dt * (tr > 2 ? RIDE.turnLoss : input.mag < .3 ? .8 : .3)), 0, 1);
  } else p.gallop = 0;
  if (p.blocking && input.mag < .15 && !dfoe) p.face = turn(p.face, input.camYaw, dt * 6);
  stepJump(p, dt);
}
// Javelin ammo trickles back one at a time.
export function regenJavs(p, dt) {
  const mx = javMax(p.ti);
  if (p.javAmmo >= mx) { p.javAmmo = mx; p.javRegen = 0; return; }
  p.javRegen -= dt; if (p.javRegen <= 0) { p.javAmmo++; p.javRegen = p.javAmmo < mx ? CC.jav.regen : 0; }
}

// ---------- the main step (solo and host) ----------
export function update(dt, input) {
  buildGrid();
  G.T += dt;
  bushTick(); // (MAP5: who stands in which bush; nothing without bushes)
  syncGates();
  execMark();
  staminaTick(dt);
  // Duo battles can field twice the soldiers of a solo one; searching fewer new paths per frame
  // as the field gets crowded keeps worst-case frame cost bounded instead of growing with it.
  setPathBudget(Math.max(2, Math.round(4 * 80 / Math.max(80, G.units.length))));
  G.teams.forEach((s, i) => {
    if (!s.active) return;
    if (s.volleyCd > 0) s.volleyCd -= dt;
    if (canRecruit(i)) s.gold += dt * (isC2() ? CROWN2.income * (s.human ? 1 : DIFF[G.diff].income / 10) : s.human ? ECON.humanIncome : DIFF[G.diff].income);
    // the ledger, for the results screen: gold that came in, gold that went out, ground the captain covered
    const dg = s.gold - (s.g0 ?? s.gold); if (dg > 0) s.earned = (s.earned || 0) + dg; else s.spent = (s.spent || 0) - dg; s.g0 = s.gold;
    const L = s.leader; if (L && !L.dead) { if (L.px0 != null) s.dist = (s.dist || 0) + Math.min(3, Math.hypot(L.x - L.px0, L.z - L.pz0)); L.px0 = L.x; L.pz0 = L.z; } else if (L) L.px0 = null;
    if (!s.human && canRecruit(i)) { s.recruitT -= dt; if (s.recruitT <= 0) { s.recruitT = rnd(...ECON.aiRecruitEvery); recruit(i, aiPick(i)); } }
    if (!s.human) {
      // spend spare gold on upgrades once the squad is nearly full
      s.upT -= dt;
      if (s.upT <= 0) {
        s.upT = rnd(6, 12);
        // the Crown: a watchtower by a castle of ours now and then, to see what's coming
        if (G.crown && G.T > 100 && s.leader && !s.leader.dead && upgradeCost(i, 'tower') != null && s.gold >= 140 && Math.random() < .25
          && G.holds.some(h => h.kind === 'castle' && h.owner === G.ALLY[colorOf(i)] && Math.hypot(h.x - s.leader.x, h.z - s.leader.z) < h.r + 6)) buyUpgrade(i, 'tower');
        if (squadOf(i).length >= capOf(i) - 3 || !canRecruit(i)) {
          const opts = UPGRADES.map(u => u.id).filter(id => id !== 'tower' && upgradeCost(i, id) != null && s.gold >= upgradeCost(i, id) + 30 && (id !== 'fort' || G.mode === 'crown' || (i < 4 && G.mode !== 'ctrl')) && (id !== 'arm' || G.diff >= 2));
          if (opts.length) buyUpgrade(i, opts[Math.floor(Math.random() * opts.length)]);
        }
      }
      // form a shieldwall when arrows keep landing and no one is close enough to fight
      s.arrowHits = Math.max(0, s.arrowHits - dt * .6); s.shieldwallT -= dt;
      if (s.arrowHits >= 4 && s.shieldwallT <= 0 && s.leader && !s.leader.dead) {
        const [f, fd] = nearestFoe(s.leader, 9, o => o.kind !== 'arch');
        if (!f) { s.shieldwallT = 7; s.arrowHits = 0; }
      }
      if (s.shieldwallT > 0 && s.leader && !s.leader.dead) { const [f] = nearestFoe(s.leader, 5, o => o.kind !== 'arch'); if (f) s.shieldwallT = 0; }
    }
    if (s.leader.dead && canRespawn(i)) {
      s.leaderDeadT -= dt;
      if (s.leaderDeadT <= 0) {
        const [gx, gz] = isC2() ? c2HomePt(i, 0) : homeAt(i, 7);
        const L = mkUnit(i, gx, gz, 'captain', s.human); s.leader = L; s.plan = null;
        if (isC2()) { L.face = inwardOf(i); startMarch(L, true); } // (F7: he marches out of the yard)
        if (i === G.myTi) { G.player = L; bus.emit('respawnMe', L); }
        if (s.human) say('respawn', i);
      }
    }
  });
  if (G.mode === 'dm') {
    const sorted = G.teams.map((s, i) => [s.tickets, i]).filter(x => G.teams[x[1]].active && G.teams[x[1]].alive).sort((a, b) => b[0] - a[0]);
    const nb = sorted.length > 1 && sorted[0][0] - sorted[1][0] >= 10 ? sorted[0][1] : -1;
    if (nb !== G.bounty) { G.bounty = nb; if (nb >= 0) say('bounty', nb); }
  }
  const p = G.player;
  if (p && !p.dead && input && !p.flood) { // (F7a: carried by the flood, he can't do a thing)
    const pdt = p.slowT > 0 ? dt * PARRY.slow : dt;
    if (p.marchT > 0 && !(input.mag > .3) && !input.attackHeld && !input.block) marchStep(p, pdt); // (F7: stepping out, until the stick says otherwise)
    else { p.marchT = 0; driveCaptain(p, input, pdt); }
    if (input.block && !p.blkPrev) blockPress(p); p.blkPrev = !!input.block;
    attackHold(p, !!input.attackHeld, pdt);
    if (p.atkBuf > 0 && p.cd <= 0 && p.stun <= 0 && !p.mounted) captainAttack(p);
  }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && !L.dead && L.remote) attackHold(L, !!L.ahHeld, dt, true); }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && L.streak && G.T - (L.streakT ?? -9) > STREAK.gap) L.streak = 0; }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && !L.dead) { if (L.atkBuf > 0) { L.atkBuf -= dt; if (L.remote && L.cd <= 0 && L.stun <= 0) captainAttack(L); } regenJavs(L, dt); } }
  for (const s of G.teams) { const L = s.leader; if (L && L.human && !L.dead) { const [f] = nearestFoe(L, 12); if (!f && L.hp < L.max) L.hp = Math.min(L.max, L.hp + dt * 6); } }

  const zeros = () => new Array(ARMIES).fill(0), slotIdx = zeros(), archIdx = zeros(), meleeN = zeros(), archN = zeros(), tIdx = zeros();
  const ords = G.teams.map((_, i) => orderOf(i)), rng = G.teams.map((_, i) => auraRange(i) ** 2);
  for (const u of G.units) {
    if (u.dead || u.leader || u.neutral) continue;
    if (u.kind !== 'arch') meleeN[u.ti]++; else archN[u.ti]++;
    const L = G.teams[u.ti].leader, dx = L ? L.x - u.x : 0, dz = L ? L.z - u.z : 0;
    u.aura = !!L && !L.dead && dx * dx + dz * dz < rng[u.ti];
    u.shieldwall = ords[u.ti] === 'shieldwall';
    // shieldwall ranks: footmen in the front rank, archers at the back.
    // Slot 0 sits nearest the captain, who is behind a human's block and in front of a computer's.
    const k = u.kind === 'foot' ? 0 : 1;
    u.tkey = G.teams[u.ti].human ? 1 - k : k;
  }
  for (const k of [0, 1]) for (const u of G.units) if (!u.dead && !u.leader && !u.neutral && u.tkey === k) u.tslot = tIdx[u.ti]++;
  moraleTick(dt); duelTick(dt);
  // captains locked in single combat on foot: the men round them give them room
  for (const u of G.units) u.duel = null;
  const caps = G.units.filter(u => u.leader && !u.dead && !u.mounted);
  for (let i = 0; i < caps.length; i++) for (let j = i + 1; j < caps.length; j++) {
    const a = caps[i], b = caps[j]; if (!isEnemy(a, b) || Math.hypot(a.x - b.x, a.z - b.z) > 3.5) continue;
    const d = { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 }; a.duel = d; b.duel = d;
  }
  // an ordered attack follows its group: onto the marked man, or the next man near where he fell; none left, and they fall back in
  G.teams.forEach(s => {
    if (s.order !== 'focus' || !s.focus) return;
    const t = G.units.find(o => o.id === s.focus.id && !o.dead);
    if (t) { s.focus.x = t.x; s.focus.z = t.z; return; }
    const L = s.leader, n = L && G.units.filter(o => !o.dead && isEnemy(o, L)).sort((a, b) => Math.hypot(a.x - s.focus.x, a.z - s.focus.z) - Math.hypot(b.x - s.focus.x, b.z - s.focus.z))[0];
    if (n && Math.hypot(n.x - s.focus.x, n.z - s.focus.z) < 9) { s.focus.id = n.id; s.focus.x = n.x; s.focus.z = n.z; } else { s.order = 'follow'; s.focus = null; if (s.human) say('focusDone', G.teams.indexOf(s)); }
  });
  const DT = dt;
  for (const u of G.units) {
    if (u.dead || u.rest) continue; // (F4: a sleeping garrison's man at his spot: nothing to do)
    // (the two men in a parry live a beat in slow motion; everyone else carries on)
    let dt = DT; if (u.slowT > 0) { u.slowT -= DT; dt = DT * PARRY.slow; }
    u.cd -= u.leader && winded(u) ? dt * STAMINA.cdSlow : dt; u.shootCd -= dt; u.javCd -= dt; u.stun -= dt; u.blockT -= dt; u.rt -= dt; u.trampleT -= dt;
    if (u.guardT > 0) u.guardT -= dt; if (u.guardCd > 0) u.guardCd -= dt; if (u.rallyT > 0) u.rallyT -= dt;
    if (u.iframeT > 0) { u.iframeT -= dt; if (u.iframeT <= 0) u.evadedAt = 0; } if (u.evadeCd > 0) u.evadeCd -= dt; if (u.vaultT > 0) u.vaultT -= dt;
    if (u.horseCd > 0) u.horseCd -= dt;
    if (u.leader) chargeTimers(u, dt);
    heavyTick(u, dt); if (u.human) braceTick(u, dt); if (!u.leader) shieldTick(u, dt); else execTick(u, dt);
    if (u.swing > 0) u.swing -= dt;
    if (u.pending) { u.pending.t -= dt; if (u.pending.t <= 0) resolveSwing(u); }
    if (u.rt <= 0) { u.rt = rnd(.25, .4); [u.foe, u.fd] = u.neutral ? neutralFoe(u) : nearestFoe(u, 50); }
    if (u.foe && u.foe.dead) { u.foe = null; u.fd = 1e9; }
    if (u.foe) u.fd = Math.hypot(u.foe.x - u.x, u.foe.z - u.z);
    if (u.flood) continue; // (F7a: the flood has him)
    if (u.marchT > 0 && u.remote) marchStep(u, dt, false); // (F7: a joined phone walks its own captain out; here, the dust and the count)
    if (u.marchT > 0 && !u.human) { marchStep(u, dt); continue; } // (F7: stepping out of the yard, no thinking)
    if (u.human || u.dead) continue;
    if (u.execT > 0) continue; // (in an execution, one way or the other: no thinking)
    if (u.dashT > 0) { u.dashT -= dt; stepJump(u, dt); continue; } // (mid-evade: momentum carries him)
    if (u.evadeFollowT > 0) { u.evadeFollowT -= dt; if (u.evadeFollowT <= 0 && u.foe && u.fd < 4 && u.cd <= 0) { u.face = Math.atan2(u.foe.x - u.x, u.foe.z - u.z); captainAttack(u); } }
    if (u.neutral) { if (u.stun > 0) moveToward(u, u.x, u.z, 0, dt); else thinkNeutral(u, dt); continue; } // (F4: a garrison's man)
    if (u.stun > 0 && !u.mounted) { moveToward(u, u.x, u.z, 0, dt); continue; } // (reeling: he can't turn to face you, so a stagger is the moment to get round him)
    if (u.leader) { stepJump(u, dt); regenJavs(u, dt); thinkLeader(u, G.teams[u.ti], dt);
      if (!u.human && G.plazaWall && G.plazaWall.up && u.cd <= 0 && !(u.fd < 3.5) && !u.mounted && !insidePlaza(u)) { const w = wallInReach(u, 1.9); if (w && w.plazaGate != null) startSwing(u, { wall: w }); }
      if (!u.human && G.crown && u.cd <= 0 && !(u.fd < 3.5) && !u.mounted) { const w = wallInReach(u, 1.9); if (w && w.cgate != null) startSwing(u, { wall: w }); }
      if (!u.human && G.c2 && u.cd <= 0 && !(u.fd < 3.5) && !u.mounted) { const w = c2BreakInReach(u); if (w) { u.face = Math.atan2(w.x - u.x, w.z - u.z); captainAttack(u); } } }
    else {
      u.slot = u.kind === 'arch' ? archIdx[u.ti]++ : slotIdx[u.ti]++; u.meleeN = meleeN[u.ti]; u.archN = archN[u.ti]; thinkSoldier(u, dt);
      // besiegers up against the palisade of the castle they're after (nobody to fight close by) hack at it
      if (((G.wtowers && G.wtowers.length) || G.c2) && u.kind === 'foot' && u.cd <= 0 && !(u.fd < 3.5)) { const w = towerInReach(u); if (w) { u.face = Math.atan2(w.x - u.x, w.z - u.z); startSwing(u, { tower: w }); } }
      if (G.plazaWall && G.plazaWall.up && u.kind === 'foot' && u.cd <= 0 && !(u.fd < 3.5) && !insidePlaza(u)) { const w = wallInReach(u, 1.9); if (w && w.plazaGate != null) startSwing(u, { wall: w }); }
      if (G.crown && u.kind === 'foot' && u.cd <= 0 && !(u.fd < 3.5)) { const w = wallInReach(u, 1.9); if (w && w.cgate != null) startSwing(u, { wall: w }); }
      if (u.kind === 'foot' && u.cd <= 0 && !(u.fd < 3.5)) { const pl = G.teams[u.ti].plan; if (pl && pl.kind === 'castle') { const w = wallInReach(u, 1.7); if (w && w.c === colorOf(pl.ti)) startSwing(u, { wall: w }); } }
    }
  }

  for (const h of G.horses) {
    h.t += dt;
    if (h.state === 'coming') {
      const r = h.rider;
      if (r.dead || r.summon !== h) { h.state = 'leaving'; h.t = 0; continue; }
      const dx = r.x - h.x, dz = r.z - h.z, d = Math.hypot(dx, dz) || .01;
      h.face = Math.atan2(dx, dz); const s = Math.min(16, d * 4);
      h.x += dx / d * s * dt; h.z += dz / d * s * dt; h.spd = s;
      if (d < 1.3) mountUp(r, h);
    } else if (h.state === 'ridden') { const r = h.rider; h.x = r.x; h.z = r.z; h.face = r.face; h.spd = Math.hypot(r.vx, r.vz); }
    else if (h.state === 'leaving') { h.x += Math.sin(h.face) * 10 * dt; h.z += Math.cos(h.face) * 10 * dt; h.spd = 10; }
  }
  G.horses = G.horses.filter(h => !((h.state === 'leaving' && h.t > 3) || (h.state === 'dead' && h.t > 8)));

  markBraces(G.units, onHold, isEnemy); // (F9: spearmen on Hold set their spears at a rider coming)
  for (const r of G.units) {
    if (r.dead || !r.mounted) continue;
    const sp = Math.hypot(r.vx, r.vz);
    const nearR = []; eachNear(r.x, r.z, 4, o => nearR.push(o));
    for (const o of nearR) {
      if (o.dead || !isEnemy(o, r) || o.mounted || o.execT > 0 || o.duelId) continue;
      const dx = o.x - r.x, dz = o.z - r.z; if (Math.abs(dx) > 4 || Math.abs(dz) > 4) continue;
      const d = Math.hypot(dx, dz);
      const toO = Math.atan2(dx, dz), ahead = Math.abs(angDiff(r.face, toO)) < 1.2, st = ahead && sp > 4 ? stance(o, r, onHold(o)) : 'bowl';
      // F9 spearmen on Hold, still and facing him: any rider at speed is stopped on the spears and thrown
      if (st === 'stop' && d < o.r + r.r + 1.6) {
        r.charge = 0; if (r.remote) r.kick.halt = 1; horseDamage(r, CHARGE.stopHorse); push(r, -Math.sin(r.face) * 6, -Math.cos(r.face) * 6, .5); if (r.mounted) dismount(r, true);
        spark(o.x, o.y + 1.5, o.z, '#fff3b0', 8); sound('clang', o.x, o.z);
        fx('float', { x: o.x, y: o.y + 2.8, z: o.z, text: 'Spear wall!', color: TEAMS[colorOf(o.ti)].css });
        if (r.isMe) { fx('shake', .4); fx('buzz', 40); }
        if (r.remote || o.remote) fx('netFlush');
        break;
      }
      if (r.charge > 0 && sp > 7 && ahead && d < o.r + r.r + 1.1 && !(r.chargeHit && r.chargeHit.has(o))) {
        if (r.chargeHit) r.chargeHit.add(o);
        o.trampleT = 1; o.lastHit = G.T;
        // F9 a man standing still and facing him soaks it up: the charge is spent, the horse checked, he's shoved a step
        if (st !== 'bowl') {
          r.charge = 0; if (r.remote) r.kick.halt = 1; push(r, -r.vx * CHARGE.slowBrake, -r.vz * CHARGE.slowBrake, CHARGE.slowStun);
          push(o, Math.sin(toO) * CHARGE.kb * CHARGE.slowKb, Math.cos(toO) * CHARGE.kb * CHARGE.slowKb, .3);
          o.hp -= CHARGE.dmg * CHARGE.slowDmg * aiDmg(r.ti);
          spark(o.x, o.y + 1.2, o.z, '#fff3b0', 6); sound('clang', o.x, o.z); sound('trample', o.x, o.z);
          if (r.isMe) { fx('shake', .25); fx('buzz', 25); }
          if (r.remote || o.remote) fx('netFlush');
          if (o.hp <= 0) die(o, r, toO, 1);
          break;
        }
        // moving, off balance or flanked: bowled over (once each), the charge goes on
        const side = angDiff(r.face, toO) > 0 ? 1 : -1, out = r.face + side * .9; // thrown forward and out to the side
        push(o, Math.sin(out) * CHARGE.kb + r.vx * .3, Math.cos(out) * CHARGE.kb + r.vz * .3, .9);
        o.hp -= CHARGE.dmg * aiDmg(r.ti) * (!o.leader && behind(o, r) ? MORALE.flankX : 1); // (a flank or the back: the charge bites harder)
        spark(o.x, o.y + 1.2, o.z, TEAMS[colorOf(o.ti)].css, 8); sound('trample', o.x, o.z); sound('hit', o.x, o.z);
        if (r.isMe) { fx('hitstop', .045); fx('shake', .3); }
        if (r.remote || o.remote) fx('netFlush');
        if (o.hp <= 0) die(o, r, out, 1);
        continue;
      }
      if (sp > 6 && d < o.r + r.r + .3 && o.trampleT <= 0) {
        o.trampleT = .8; o.lastHit = G.T;
        const ang = Math.atan2(dx, dz);
        push(o, Math.sin(ang) * 10 + r.vx * .5, Math.cos(ang) * 10 + r.vz * .5, .7);
        o.hp -= 12 * aiDmg(r.ti);
        spark(o.x, o.y + 1, o.z, '#c9b28a', 6); sound('trample', o.x, o.z);
        if (o.hp <= 0) die(o, r, ang, 1); // trampled: sent flying
      }
    }
    if (Math.random() < dt * sp * .9) sound('hoof', r.x, r.z);
  }

  // separation: a simple push apart so crowds never overlap
  const live = G.units.filter(u => !u.dead && !u.rest), SC = 2.5, sg = new Map(), nMove = live.length; // (F4: a sleeping garrison's men stand apart at their spots; anyone close enough to bump them has woken them)
  live.forEach((u, i) => { u.sepI = i; const k = (Math.floor(u.x / SC) + 128) * 512 + (Math.floor(u.z / SC) + 128); let a = sg.get(k); if (!a) sg.set(k, a = []); a.push(u); });
  for (let i = 0; i < nMove; i++) {
    const a = live[i], ci = Math.floor(a.x / SC) + 128, cj = Math.floor(a.z / SC) + 128;
    for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) { const cell = sg.get((ci + di) * 512 + cj + dj); if (!cell) continue;
    for (let q = 0; q < cell.length; q++) {
      const b = cell[q]; if (b.sepI <= i || a.flood || b.flood) continue; // (the flood carries men through each other)
      const dx = b.x - a.x, dz = b.z - a.z, min = a.r + b.r;
      if (dx > min || dx < -min || dz > min || dz < -min) continue;
      const d = Math.hypot(dx, dz) || .01; if (d >= min) continue;
      const ov = (min - d) / 2, nx = dx / d, nz = dz / d;
      let wa = a.remote ? 0 : a.human || a.mounted ? .4 : 1, wb = b.remote ? 0 : b.human || b.mounted ? .4 : 1;
      // a captain's own side never slows him down: his men step aside as he rides or runs through them
      if (a.leader !== b.leader && !isEnemy(a, b)) { if (a.leader) wa = 0; else wb = 0; }
      if (wa === 0) wb = 2; if (wb === 0) wa = 2;
      a.x -= nx * ov * wa; a.z -= nz * ov * wa; b.x += nx * ov * wb; b.z += nz * ov * wb;
    } }
  }
  for (const u of G.units) {
    if (u.dead) { fallStep(u, dt); continue; }
    if (u.chasmT > 0) { const Ch = FEEL.chasm; if (Ch.fall - u.chasmT > Ch.teeter) { u.x += u.dvx * dt; u.z += u.dvz * dt; u.vy -= Ch.g * dt; u.y += u.vy * dt; } continue; } // (F7: teetering at the rim, then the drop)
    if (u.flood && !u.remote) continue; // (F7a: the flood moves him, in c2Water)
    if (u.remote) { u.y = groundY(u.x, u.z) + (u.jy || 0); continue; } // moved by their own phone
    if (u.rest) continue; // (F4: standing still at his spot)
    integrate(u, u.slowT > 0 ? dt * PARRY.slow : dt, u.z);
  }
  G.units = G.units.filter(u => !(u.dead && u.deadT > FEEL.death.body && !(u.y > groundY(u.x, u.z) + .3))); // (F5: the fallen are taken away once they've lain and sunk, never out of the air)

  // castle towers shoot at enemies near their walls
  TEAMS.forEach((t, i) => {
    const s = G.teams[i];
    if ((G.mode === 'conquest' && !s.alive) || !s.active) return; // (and no castle at all: out of this battle)
    s.towerT -= dt; if (s.towerT > 0) return;
    s.towerT = 1.4;
    const [f] = nearestFoe({ x: t.pos[0], z: t.pos[1], ti: i }, 24);
    if (f) shoot({ x: t.pos[0], z: t.pos[1], y: 0, vx: 0, vz: 0, ti: i, tower: true }, f, 5.5);
  });
  // Fortify's gate towers: each covers the ground outside its gate
  if (G.forts) for (let c = 0; c < 4; c++) {
    if (fortLvl(c) < 2 || (G.mode === 'conquest' && !G.teams[c].alive) || noCastle(c)) continue;
    const f = G.forts[c]; f.towerT -= dt; if (f.towerT > 0) continue; f.towerT = FORT.towerEvery;
    for (const tw of G.layout.pal[c].towers) { const [e] = nearestFoe({ x: tw.x, z: tw.z, ti: c }, FORT.towerRange); if (e) shoot({ x: tw.x, z: tw.z, y: 0, vx: 0, vz: 0, ti: c, tower: true, arrow: FORT.towerDmg }, e, 5.2); }
  }

  arrowsTick(dt, true);
  if (G.c2) c2Tick(dt); else updateFlag(dt);
  updateControlPoints(dt); holdsTick(dt);
  checkTime();
}
