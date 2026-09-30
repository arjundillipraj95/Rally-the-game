// Online battles. The host runs the rules; every other phone sends its captain and button
// presses and draws the host's snapshots (a compact text string, roughly 1-4KB depending on
// how many soldiers are alive — capped well under that even at a full 8-army Duo match — sent
// about 12 times a second).
import { TEAMS, MAPS, KINDS, STATS, RECRUITS, FACTIONS, factionFromCode, ORDERS, ORDER_NAMES, UPGRADES, WEAPONS, WEAPON_NAMES, CAPTAIN_COMBAT } from '../config.js';
import { G, bus, colorOf, isEnemyTi } from '../core/state.js';
import { makeLayout, groundY, clamp, rnd, turn } from '../core/world.js';
import { buildNav, syncGates } from '../core/nav.js';
import { newTeams, makeArrow, captainAttack, toggleHorseFor, recruit, integrate, driveCaptain, fallStep, arrowsTick, softAim, setOrder, canRecruit, squadOf, buyUpgrade, upgradeCost, horseMax, orderVolley, makeCtrlPoints, captainJump, captainCharge, chargeTimers, switchWeapon, airborne, aimRange, javTarget, regenJavs } from '../core/sim.js';
import { session, isClient, isHost } from './session.js';
import { showMsg } from '../ui/messages.js';
import { sfx, buzz, gateS } from '../ui/audio.js';
import { banner } from '../ui/hud.js';
import { readMove, inp } from '../ui/input.js';
import { floatText } from '../render/effects.js';
import { cam, CAM_PITCH } from '../render/camera.js';

export const C = {}; // client-side state
if (import.meta.env.DEV) window.__netC = C; // dev-only: lets tests watch the client's snapshots
const r1 = v => Math.round(v * 10) / 10, r2 = v => Math.round(v * 100) / 100;
const b36 = n => Math.max(0, Math.round(n)).toString(36);
const p36 = s => parseInt(s, 36);
const encX = x => b36((x + 100) * 10), decX = s => p36(s) / 10 - 100;
const encF = f => b36(((f % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2) * 72 % 72), decF = s => p36(s) / 72 * Math.PI * 2;
export const myPeer = room => { const p = room.peers().find(p => p.sameTab); return p ? p.peer : null; };

let hooks = { onMatchStart() {}, onAbort() {}, onLobby() {} };
export function setNetHooks(h) { hooks = Object.assign(hooks, h); }

// the host keeps the last few announcements in every snapshot
bus.on('msg', m => {
  const NET = session.NET;
  if (isHost() && NET.msgs) { NET.msgs.push([++NET.msgN, m.k, ...m.a]); if (NET.msgs.length > 8) NET.msgs.shift(); }
});

// ---------- host ----------
function encodeSnap() {
  const upPack = s => UPGRADES.reduce((n, u, k) => n + s.up[u.id] * 4 ** k, 0);
  const teams = G.teams.map(s => [Math.round(s.points * 10), s.tickets, s.caps, Math.floor(s.gold), s.alive ? 1 : 0, Math.max(0, Math.ceil(s.leaderDeadT)), upPack(s)].join(',')).join(';');
  const us = [];
  for (const u of G.units) {
    if (u.dead) continue;
    const kt = KINDS.indexOf(u.kind) * 8 + u.ti;
    const fl = (u.swing > 0 ? 1 : 0) | (u.mounted ? 2 : 0) | ((u.blockT > 0 || (u.human && u.blocking)) ? 4 : 0) | (u.carrying ? 8 : 0) | (u.stun > 0 ? 16 : 0) | (u.aim ? 32 : 0) | (u.shieldwall ? 64 : 0) | (u.weapon === 'spear' ? 128 : u.weapon === 'jav' ? 256 : u.weapon === 'sword' ? 512 : 0) | (u.charge > 0 ? 1024 : 0);
    const row = [b36(u.id), kt.toString(16), encX(u.x), encX(u.z), encF(u.face), b36(clamp(u.hp / u.max, 0, 1) * 35), b36(fl)];
    if (u.jy > .05) row.push(b36(u.jy * 10));
    us.push(row.join(','));
  }
  const ars = G.arrows.filter(a => !a.stuck && !a.done).slice(-18).map(a => [b36(a.id), encX(a.x0), encX(a.z0), b36(a.y0 * 10), encX(a.x1), encX(a.z1), b36(a.y1 * 10 + 20), b36(a.dur * 100), b36(a.peak * 10), b36(a.t * 100), a.ti].join(','));
  const hs = G.horses.filter(h => h.state === 'coming').map(h => [encX(h.x), encX(h.z), encF(h.face), h.ti].join(','));
  const f = G.flag;
  const fl = f ? [f.state === 'home' ? 0 : f.state === 'dropped' ? 1 : 2, encX(f.x), encX(f.z), f.carrier ? b36(f.carrier.id) : ''].join(',') : '';
  const pl = G.teams.map((s, i) => {
    if (!s.human || i === G.myTi) return ''; const L = s.leader, k = L.kick;
    if (k.dirty) { k.n++; k.dirty = false; k.lvx = k.vx; k.lvz = k.vz; k.lst = k.st; k.vx = 0; k.vz = 0; k.st = 0; }
    return [i, b36(L.id), L.dead ? 1 : 0, Math.round(L.horseHp), Math.ceil(L.horseCd), L.summon ? 1 : 0, k.n, r1(k.lvx || 0), r1(k.lvz || 0), r2(k.lst || 0), Math.round(L.hp)].join(',');
  }).filter(Boolean).join(';');
  return [Math.round(G.T * 10), teams, us.join(';'), ars.join(';'), hs.join(';'), fl, pl, G.bounty].join('|');
}
// a remote player's blow landing (or landing on them) goes out at once rather than waiting for the
// next regular snapshot, so their hits register as quickly as the network allows
bus.on('netFlush', () => { if (session.NET) session.NET.flush = true; });
export function netHostTick() {
  const since = performance.now() - (session.NET.lastSend || 0);
  if (since < 80 && !(session.NET.flush && since > 25)) return;
  session.NET.flush = false;
  netHostSend(false);
}
export function netHostSend() {
  const NET = session.NET; if (!NET) return;
  NET.lastSend = performance.now();
  const pres = { role: 'host', ph: G.state === 'end' ? 'end' : 'play', seed: G.seed, mode: G.mode, map: G.map.id, diff: G.diff, len: G.len, al: G.ALLY.join(''), duo: G.duo.map(d => d ? 1 : 0).join(''), seats: NET.seats, nick: session.myNick || 'Host', fa: G.factions.map(f => (FACTIONS[f] || FACTIONS.roman).code).join(''), cr: Array.from({ length: 8 }, (_, i) => (G.crests && G.crests[i]) | 0).join(''), n: ++NET.snapN, s: encodeSnap(), m: NET.msgs };
  if (G.state === 'end' && G.endInfo) { pres.res = [G.endInfo.w, G.endInfo.why]; pres.kl = G.teams.map(t => t.kills | 0).join(','); }
  let json = JSON.stringify(pres);
  while (json.length > 3900) { // trim arrows first, then messages
    const parts = pres.s.split('|'), a = parts[3].split(';');
    if (a.length && a[0]) { a.shift(); parts[3] = a.join(';'); pres.s = parts.join('|'); }
    else if (pres.m.length) pres.m = pres.m.slice(1); else break;
    json = JSON.stringify(pres);
  }
  NET.lastSize = json.length;
  NET.room.presence(pres).catch(() => {});
}
export function netHostReadInputs() {
  const NET = session.NET, peers = NET.room.peers();
  const present = new Set(peers.map(p => p.peer));
  for (const [peer, ti] of Object.entries(NET.seats)) { // players who left: hand their army to the computer
    if (ti === G.myTi) continue;
    if (!present.has(peer) && G.teams[ti].human) {
      G.teams[ti].human = false; const L = G.teams[ti].leader;
      if (L) { L.human = false; L.remote = false; L.dmg = STATS.captain.dmg; L.spd = STATS.captain.spd; }
      delete NET.seats[peer]; bus.emit('msg', { k: 'left', a: [ti] });
    }
  }
  for (const p of peers) {
    if (p.sameTab) continue;
    const ti = NET.seats[p.peer]; if (ti === undefined) continue;
    const pr = p.presence || {}; if (pr.seed !== G.seed || pr.ph !== 'play') continue;
    const s = G.teams[ti], L = s.leader; if (!s.human) continue;
    const last = NET.inp[ti] || (NET.inp[ti] = { atk: 0, chg: 0, ride: 0, vly: 0, rec: [0, 0, 0], up: [0, 0, 0, 0, 0] });
    if (L && !L.dead && Array.isArray(pr.cap) && pr.cap[0] === L.id) {
      L.x = +pr.cap[1]; L.z = +pr.cap[2]; L.face = +pr.cap[3]; L.vx = +pr.cap[4]; L.vz = +pr.cap[5];
      L.blocking = !!pr.blk; L.jy = Math.max(0, +pr.cap[6] || 0);
      const w = WEAPONS[pr.cap[7] | 0]; if (w && L.weapon !== w) { L.weapon = w; s.weapon = w; }
    }
    if (typeof pr.atk === 'number' && pr.atk > last.atk) { if (L && !L.dead) { if (typeof pr.face === 'number') L.face = pr.face; captainAttack(L); } last.atk = pr.atk; }
    if (typeof pr.ride === 'number' && pr.ride > last.ride) { if (L) toggleHorseFor(L); last.ride = pr.ride; }
    if (typeof pr.chg === 'number' && pr.chg > last.chg) { if (L && !L.dead) captainCharge(L); last.chg = pr.chg; }
    if (typeof pr.vly === 'number' && pr.vly > last.vly) { orderVolley(ti, Array.isArray(pr.vat) ? { x: +pr.vat[0], z: +pr.vat[1] } : null); last.vly = pr.vly; }
    if (Array.isArray(pr.up)) for (let k = 0; k < UPGRADES.length; k++) while ((pr.up[k] | 0) > last.up[k]) { last.up[k]++; buyUpgrade(ti, UPGRADES[k].id); }
    if (pr.ord && pr.ord !== s.order && ORDERS.includes(pr.ord)) {
      s.order = pr.ord;
      if (pr.ord === 'hold') { const h = Array.isArray(pr.hold) ? pr.hold : [L.x, L.z, L.face]; s.holdPt = { x: +h[0], z: +h[1], face: +h[2], isFront: true }; }
    }
    if (Array.isArray(pr.rec)) for (let k = 0; k < 3; k++) while ((pr.rec[k] | 0) > last.rec[k]) { last.rec[k]++; recruit(ti, RECRUITS[k]); }
  }
}

// ---------- client ----------
export function clientStart(hp) {
  G.role = 'client';
  G.mode = hp.mode; G.map = MAPS[hp.map]; G.diff = hp.diff; G.len = hp.len === 'standard' ? 'standard' : 'quick'; G.ALLY = hp.al.split('').map(Number); G.seed = hp.seed;
  G.factions = String(hp.fa || 'rrrr').split('').map(factionFromCode);
  G.crests = String(hp.cr || '').split('').map(c => Math.min(7, +c || 0));
  G.duo = String(hp.duo || '0000').split('').map(c => c === '1');
  G.layout = makeLayout(G.map.id, G.mode === 'ctf', G.mode === 'ctrl', G.seed); buildNav(G.layout);
  G.units = []; G.horses = []; G.arrows = [];
  G.T = 0; G.kills = 0; G.recruited = 0; G.bounty = -1; G.endInfo = null; G.awarded = false;
  const humans = [0, 0, 0, 0, 0, 0, 0, 0]; Object.values(hp.seats || {}).forEach(ti => humans[ti] = 1);
  const active = [1, 1, 1, 1, ...G.duo.map(d => d ? 1 : 0)];
  G.teams = newTeams(humans, active);
  G.flag = G.mode === 'ctf' ? { state: 'home', x: 0, z: 0, carrier: null, dropT: 0 } : null;
  G.ctrlPoints = G.mode === 'ctrl' ? makeCtrlPoints(G.layout) : null;
  Object.assign(C, { byId: new Map(), lastN: -1, lastMsgN: (hp.m && hp.m.length) ? hp.m[hp.m.length - 1][0] : 0, meId: null, meInit: false, kickN: 0, localCd: 0, lastSnapAt: performance.now(),
    inp: { atk: 0, ride: 0, vly: 0, chg: 0, vat: null, rec: [0, 0, 0], up: [0, 0, 0, 0, 0], ord: 'follow', hold: null, face: 0 }, sendAt: 0, sendNow: false, pred: null, arrowIds: new Set(), coming: [], leaving: [], horseKey: 0, riderKeys: new Map(), hudT: 0 });
  G.player = null;
  cam.yaw = Math.atan2(-TEAMS[colorOf(G.myTi)].pos[0], -TEAMS[colorOf(G.myTi)].pos[1]); cam.pitch = CAM_PITCH;
  G.state = 'play';
  hooks.onMatchStart();
  sfx.horn(); showMsg('start', []);
  clientApply(hp);
}
function clientUnit(id, kind, ti, x, z) {
  const human = kind === 'captain' && G.teams[ti].human;
  const u = { id, kind, ti, leader: kind === 'captain', human, x, z, y: groundY(x, z), tx: x, tz: z, tface: 0, face: 0, vx: 0, vz: 0, vy: 0,
    hp: STATS[kind].hp, max: STATS[kind].hp, r: STATS[kind].r, swing: 0, stun: 0, blockT: 0, dead: false, deadT: 0, mounted: false, carrying: false, aim: false,
    spd: human ? 6.3 : STATS[kind].spd, horseHp: horseMax(ti), horseCd: 0, summon: false, shieldwall: false, blocking: false, lastHit: -9,
    jy: 0, jyT: 0, jvy: 0, jumpCd: 0, weapon: human && ti === G.myTi ? (G.teams[ti].weapon || 'sword') : undefined, javAmmo: CAPTAIN_COMBAT.jav.ammo, javRegen: 0, combo: 0, lastSwingT: -9 };
  G.units.push(u); C.byId.set(id, u); return u;
}
function clientKill(u) {
  if (u.dead) return;
  u.dead = true; u.deadT = 0; u.vy = rnd(3, 6); u.fallDir = Math.random() < .5 ? 1 : -1;
  u.vx *= .5; u.vz *= .5;
  // the host doesn't send how a man died, so a client launches the ones cut down by a big hit
  // (or a charging horse), and now and then one more, to match the feel of the host's battle
  if ((u.bigHitT && performance.now() - u.bigHitT < 500) || Math.random() < .12) {
    const a = Math.random() * Math.PI * 2, f = rnd(10, 14); u.vx += Math.sin(a) * f; u.vz += Math.cos(a) * f; u.vy = rnd(9, 12); u.launch = true; sfx.scream(u.x, u.z);
  }
  bus.emit('splat', { x: u.x, z: u.z, s: rnd(1, 1.5), ti: u.ti }); sfx.die(u.x, u.z);
  C.byId.delete(u.id);
}
function clientApply(hp) {
  if (hp.n === C.lastN) return;
  C.lastN = hp.n; C.lastSnapAt = performance.now();
  const secs = (hp.s || '').split('|');
  if (secs.length < 8) return;
  const myTi = G.myTi;
  G.T = (+secs[0]) / 10;
  secs[1].split(';').forEach((row, i) => {
    const v = row.split(',').map(Number), s = G.teams[i]; if (!s) return;
    s.points = v[0] / 10; s.tickets = v[1]; s.caps = v[2]; if (i !== myTi || performance.now() - (C.goldLocalAt || 0) > 700) s.gold = v[3]; s.alive = !!v[4]; s.leaderDeadT = v[5];
    if (v.length > 6 && (i !== myTi || performance.now() - (C.upLocalAt || 0) > 700)) UPGRADES.forEach((u, k) => { s.up[u.id] = Math.floor(v[6] / 4 ** k) % 4; });
  });
  G.bounty = +secs[7];
  const mine = secs[6] ? secs[6].split(';').map(r => r.split(',')).find(r => +r[0] === myTi) : null;
  let myId = null;
  if (mine) { myId = p36(mine[1]); C.meInfo = { dead: +mine[2], horseHp: +mine[3], horseCd: +mine[4], summon: +mine[5], kn: +mine[6], kvx: +mine[7], kvz: +mine[8], kst: +mine[9], hp: +mine[10], jav: mine[11] === undefined ? null : +mine[11] }; }
  const seen = new Set();
  if (secs[2]) for (const row of secs[2].split(';')) {
    const f = row.split(','), id = p36(f[0]), kt = parseInt(f[1], 16);
    const kind = KINDS[kt >> 3], ti = kt & 7;
    const x = decX(f[2]), z = decX(f[3]), face = decF(f[4]), hpq = p36(f[5]), fl = p36(f[6]);
    seen.add(id);
    let u = C.byId.get(id);
    if (!u) { u = clientUnit(id, kind, ti, x, z); u.face = face; }
    const oldHp = u.hp;
    u.hp = hpq / 35 * u.max;
    if (oldHp - u.hp > u.max * .3) u.bigHitT = performance.now();
    if (u.hp < oldHp - .5 && id !== myId) {
      const shown = performance.now() - (u.predHitAt || 0) < 600; // this client already showed the impact
      u.predHitAt = 0;
      if (!shown) bus.emit('spark', { x: u.x, y: u.y + 1.2, z: u.z, c: (fl & 4) ? '#fff3b0' : TEAMS[colorOf(u.ti)].css, n: 5 });
      if (fl & 4) { if (!shown) sfx.clang(u.x, u.z); }
      else { if (!shown) sfx.hit(u.x, u.z);
        const me = G.player; // a client's own blows landing: the same hit-stop the host gets
        if (!shown && me && performance.now() - (C.lastAtkAt || 0) < 700 && Math.hypot(u.x - me.x, u.z - me.z) < 5) { bus.emit('hitstop', .05); cam.shake = Math.max(cam.shake, .15); }
        if (Math.random() < .35) bus.emit('splat', { x: u.x + rnd(-.4, .4), z: u.z + rnd(-.4, .4), s: rnd(.6, 1.1), ti: u.ti }); }
    }
    if ((fl & 1) && u.swing <= 0 && id !== myId) { u.swing = .38; sfx.swing(u.x, u.z); }
    u.mounted = !!(fl & 2); u.carrying = !!(fl & 8);
    u.shieldwall = !!(fl & 64);
    if (id !== myId) {
      u.blockT = (fl & 4) ? .2 : 0; u.stun = (fl & 16) ? .1 : 0; u.aim = !!(fl & 32);
      if (kind === 'captain') u.weapon = (fl & 128) ? 'spear' : (fl & 256) ? 'jav' : (fl & 512) ? 'sword' : undefined;
      u.jyT = f[7] ? p36(f[7]) / 10 : 0;
      u.charge = (fl & 1024) ? 1 : 0;
    }
    if (id !== myId) {
      u.tx = x; u.tz = z; u.tface = face;
      if (Math.hypot(u.x - x, u.z - z) > 8) { u.x = x; u.z = z; }
    } else if (!C.meInit || C.meId !== id) { u.x = x; u.z = z; u.face = face; }
  }
  for (const u of [...C.byId.values()]) if (!seen.has(u.id)) clientKill(u);
  if (myId != null && C.byId.get(myId)) {
    const me = C.byId.get(myId);
    if (C.meId !== myId) { C.meId = myId; C.meInit = true; G.player = me; cam.yaw = me.face; C.kickN = C.meInfo ? C.meInfo.kn : 0; }
    G.player = me;
    me.horseHp = C.meInfo.horseHp; me.horseCd = C.meInfo.horseCd; me.summon = !!C.meInfo.summon; me.hp = C.meInfo.hp;
    if (C.meInfo.kn !== C.kickN) {
      C.kickN = C.meInfo.kn; me.vx += C.meInfo.kvx; me.vz += C.meInfo.kvz; me.stun = Math.max(me.stun, C.meInfo.kst);
      if (C.meInfo.kvx || C.meInfo.kvz) { cam.shake = .35; buzz(30); bus.emit('spark', { x: me.x, y: me.y + 1.2, z: me.z, c: TEAMS[colorOf(me.ti)].css, n: 5 }); sfx.hit(me.x, me.z); }
    }
  }
  if (G.player && G.player.dead) G.player = null;
  if (secs[3]) for (const row of secs[3].split(';')) {
    const f = row.split(','), id = p36(f[0]); if (C.arrowIds.has(id)) continue; C.arrowIds.add(id);
    const a = makeArrow({ id, x0: decX(f[1]), z0: decX(f[2]), y0: p36(f[3]) / 10, x1: decX(f[4]), z1: decX(f[5]), y1: (p36(f[6]) - 20) / 10, dur: p36(f[7]) / 100, peak: p36(f[8]) / 10, ti: +f[10], t: p36(f[9]) / 100 });
    G.arrows.push(a); sfx.bow(a.x0, a.z0);
  }
  if (C.arrowIds.size > 400) C.arrowIds = new Set([...C.arrowIds].slice(-200));
  const hs = secs[4] ? secs[4].split(';').map(r => r.split(',')) : [];
  C.coming.length = Math.min(C.coming.length, hs.length);
  hs.forEach((f, i) => {
    let h = C.coming[i];
    if (!h) { h = { key: 200000 + (++C.horseKey), ti: +f[3], x: decX(f[0]), z: decX(f[1]), face: 0, spd: 14, state: 'coming', t: 0 }; C.coming.push(h); }
    h.tx = decX(f[0]); h.tz = decX(f[1]); h.face = decF(f[2]);
  });
  if (G.flag && secs[5]) {
    const f = secs[5].split(','), flag = G.flag;
    flag.state = ['home', 'dropped', 'carried'][+f[0]]; flag.x = decX(f[1]); flag.z = decX(f[2]);
    flag.carrier = f[3] ? C.byId.get(p36(f[3])) || null : null;
    if (flag.carrier) flag.carrier.carrying = true;
  }
  for (const m of (hp.m || [])) if (m[0] > C.lastMsgN) { C.lastMsgN = m[0]; showMsg(m[1], m.slice(2)); }
}

// Returns false if the client left the match (host gone, back to lobby).
export function clientTick(dt) {
  const NET = session.NET;
  const hostP = NET.room.peers().find(p => p.peer === NET.hostPeer);
  if (!hostP) {
    if (!NET.hostGoneAt) NET.hostGoneAt = performance.now();
    if (performance.now() - NET.hostGoneAt > 1500) { hooks.onAbort('The host left the battle.'); return false; }
  } else {
    NET.hostGoneAt = 0;
    const hp = hostP.presence || {};
    if (hp.ph === 'lobby') { hooks.onLobby(); return false; }
    if (hp.seed === G.seed && (hp.ph === 'play' || hp.ph === 'end')) clientApply(hp);
    if (hp.ph === 'end' && hp.kl) G.kills = +String(hp.kl).split(',')[G.myTi] || 0; // your captain's kills, as the host counted them
    if (hp.ph === 'end' && G.state === 'play' && Array.isArray(hp.res)) bus.emit('hostEnd', hp.res);
  }
  if (G.state !== 'play' && G.state !== 'end') return false;
  C.localCd -= dt; syncGates();
  const me = G.player;
  if (me && !me.dead && G.state === 'play') {
    me.stun -= dt;
    driveCaptain(me, readMove(dt), dt);
    for (const o of G.units) { // stay out of other soldiers
      if (o === me || o.dead) continue;
      const dx = me.x - o.x, dz = me.z - o.z, min = me.r + o.r; if (Math.abs(dx) > min || Math.abs(dz) > min) continue;
      const d = Math.hypot(dx, dz) || .01; if (d < min) { me.x += dx / d * (min - d) * .7; me.z += dz / d * (min - d) * .7; }
    }
    integrate(me, dt, me.z);
    me.r = me.mounted ? .95 : STATS.captain.r;
    regenJavs(me, dt); chargeTimers(me, dt);
    if (C.atkBuf > 0) C.atkBuf -= dt;
    if (C.pred && performance.now() >= C.pred.at) {
      const { tg: t, reach } = C.pred; C.pred = null;
      if (t && !t.dead && isEnemyTi(t.ti, me.ti) && Math.hypot(t.x - me.x, t.z - me.z) <= me.r + t.r + reach + .5) {
        const hx = (me.x + t.x) / 2, hz = (me.z + t.z) / 2;
        bus.emit('spark', { x: hx, y: (me.y + t.y) / 2 + 1.2, z: hz, c: t.blockT > 0 ? '#fff3b0' : TEAMS[colorOf(t.ti)].css, n: 5 });
        if (t.blockT > 0) sfx.clang(hx, hz); else sfx.hit(hx, hz);
        bus.emit('hitstop', .055); cam.shake = Math.max(cam.shake, .15);
        t.predHitAt = performance.now();
      }
    }
    if ((inp.attackHeld || C.atkBuf > 0) && C.localCd <= 0) actions.attack();
  }
  const k = Math.min(1, dt * 15);
  for (const u of G.units) { // everyone else glides toward the host's positions
    if (u.dead) { fallStep(u, dt); continue; }
    if (u === me) continue;
    const ox = u.x, oz = u.z;
    u.x += (u.tx - u.x) * k; u.z += (u.tz - u.z) * k; u.face = turn(u.face, u.tface, dt * 12);
    u.vx = (u.x - ox) / Math.max(dt, 1e-3); u.vz = (u.z - oz) / Math.max(dt, 1e-3);
    u.jy += ((u.jyT || 0) - u.jy) * Math.min(1, dt * 14); u.y = groundY(u.x, u.z) + u.jy;
    if (u.swing > 0) u.swing -= dt;
  }
  if (me && me.swing > 0) me.swing -= dt;
  G.units = G.units.filter(u => !(u.dead && u.deadT > 12));
  // horses: under riders, on their way, and trotting off
  for (const u of G.units) {
    const key = C.riderKeys.get(u);
    if (u.mounted && !u.dead && !key) C.riderKeys.set(u, 100000 + (++C.horseKey));
    if ((!u.mounted || u.dead) && key) { C.leaving.push({ key, ti: u.ti, x: u.x, z: u.z, face: u.face, spd: 10, state: 'leaving', t: 0 }); C.riderKeys.delete(u); }
  }
  for (const h of C.coming) { h.x += (h.tx - h.x) * k; h.z += (h.tz - h.z) * k; }
  for (const h of C.leaving) { h.t += dt; h.x += Math.sin(h.face) * 10 * dt; h.z += Math.cos(h.face) * 10 * dt; }
  C.leaving = C.leaving.filter(h => h.t < 3);
  arrowsTick(dt, false);
  // send my captain and my buttons
  if ((performance.now() - C.sendAt > 66 || C.sendNow) && G.state === 'play') {
    C.sendAt = performance.now(); C.sendNow = false;
    const pres = { role: 'player', nick: session.myNick || 'Captain', ph: 'play', seed: G.seed, atk: C.inp.atk, ride: C.inp.ride, vly: C.inp.vly, vat: C.inp.vat, chg: C.inp.chg, rec: C.inp.rec, up: C.inp.up, ord: C.inp.ord, hold: C.inp.hold, face: C.inp.face, blk: inp.blockHeld ? 1 : 0 };
    if (me && !me.dead) pres.cap = [me.id, r2(me.x), r2(me.z), r2(me.face), r1(me.vx), r1(me.vz), r2(me.jy || 0), Math.max(0, WEAPONS.indexOf(me.weapon || 'sword'))];
    NET.room.presence(pres).catch(() => {});
  }
  return true;
}
export function clientHorses() {
  const list = [...C.coming, ...C.leaving];
  for (const [u, key] of C.riderKeys) if (!u.dead) list.push({ key, ti: u.ti, x: u.x, z: u.z, face: u.face, spd: Math.hypot(u.vx, u.vz), state: 'ridden', t: 0 });
  return list;
}

// A client's own guess at what its Attack press does (the host decides for real), so the swing,
// the combo rhythm and the javelin count respond instantly instead of a round-trip later.
function predictAttack(p) {
  const CC = CAPTAIN_COMBAT;
  if (p.mounted) {
    if (p.weapon === 'jav' && p.javAmmo >= 1) { p.javAmmo--; C.javLocalAt = performance.now(); C.localCd = CC.jav.cd; }
    else C.localCd = .8;
    return;
  }
  if (airborne(p)) { C.localCd = CC.leap.cd; p.jvy = Math.min(p.jvy, -9); p.vx += Math.sin(p.face) * 3; p.vz += Math.cos(p.face) * 3; p.swingKind = 2; return; }
  if (p.weapon === 'jav') {
    if (p.javAmmo >= 1) {
      const t = javTarget(p); p.face = Math.atan2(t.x - p.x, t.z - p.z);
      p.javAmmo--; C.javLocalAt = performance.now(); C.localCd = CC.jav.cd; p.swingKind = 4; return;
    }
    p.weapon = 'sword'; G.teams[G.myTi].weapon = 'sword'; floatText(p.x, p.y + 3.2, p.z, 'Out of javelins', '#fff'); bus.emit('hud');
  }
  const spear = p.weapon === 'spear', best = softAim(p, aimRange(p));
  if (best) {
    const ang = Math.atan2(best.x - p.x, best.z - p.z), d = Math.hypot(best.x - p.x, best.z - p.z);
    p.face = ang;
    if (d > p.r + best.r + 1.3 + (spear ? CC.spear.reachB : 0) - .2) { p.vx += Math.sin(ang) * 4; p.vz += Math.cos(ang) * 4; }
  }
  // the host lands the blow ~.12s into the swing; show the impact here at the same moment instead of
  // waiting for the host's word (the damage itself still comes from the host)
  if (best) C.pred = { at: performance.now() + 120, tg: best, reach: STATS.captain.reach + (spear ? CC.spear.reachB : 0) };
  if (spear) { C.localCd = CC.spear.cd; p.swingKind = 3; p.combo = 0; }
  else {
    const combo = performance.now() / 1000 - p.lastSwingT < CC.sword.window ? (p.combo + 1) % 3 : 0;
    p.combo = combo; p.swingKind = combo; C.localCd = combo === 2 ? CC.sword.finisherCd : CC.sword.cd;
  }
  p.lastSwingT = performance.now() / 1000;
}

// ---------- player actions (solo, host and client) ----------
const orderName = o => ORDER_NAMES[o] || ORDER_NAMES.follow;
export const actions = {
  attack() {
    const p = G.player; if (!p || p.dead || G.state !== 'play') return;
    if (p.carrying) { if (gateS('carryhint', 1500)) floatText(p.x, p.y + 3.2, p.z, 'Hands full: carry it home', '#fff'); return; }
    if (isClient()) {
      if (C.localCd > 0 || p.stun > 0) { C.atkBuf = .4; return; }
      C.atkBuf = 0; predictAttack(p);
      p.swing = .38; sfx.swing(p.x, p.z);
      C.inp.atk++; C.inp.face = r2(p.face); C.lastAtkAt = performance.now(); C.sendNow = true;
      return;
    }
    captainAttack(p);
  },
  // Jump on foot; on horseback the same button is the charge
  jump() {
    const p = G.player; if (G.state !== 'play' || !p || p.dead) return;
    if (p.mounted) {
      if (!captainCharge(p)) return; // a client runs its own gallop; the host does the bowling over
      cam.shake = Math.max(cam.shake, .35); buzz(40); bus.emit('hud');
      if (isClient()) { C.inp.chg++; C.sendNow = true; }
      return;
    }
    captainJump(p); // clients jump locally; the host reads the height off their captain
  },
  weapon(w) {
    const p = G.player; if (G.state !== 'play' || !p || p.dead) return;
    const nw = switchWeapon(p, w); if (!nw) return;
    sfx.draw(); floatText(p.x, p.y + 3.2, p.z, WEAPON_NAMES[nw], '#fff');
    bus.emit('hud');
  },
  ride() {
    const p = G.player; if (G.state !== 'play' || !p || p.dead) return;
    if (isClient()) {
      if (!p.mounted) {
        if (p.carrying) { showMsg('rideNo', [G.myTi, 'banner']); return; }
        if (p.horseCd > 0) { showMsg('rideNo', [G.myTi, 'rest', Math.ceil(p.horseCd)]); return; }
        sfx.neigh();
      }
      C.inp.ride++; C.sendNow = true; return;
    }
    toggleHorseFor(p);
  },
  // squad-wide "fire at will": every ready archer/javelin-thrower shoots at once, shared cooldown
  // pt: where you aimed it ({x, z}); without one, everyone picks their own nearest target
  volley(pt) {
    const p = G.player; if (G.state !== 'play' || !p || p.dead) return;
    if (pt && pt.ok === false) { floatText(p.x, p.y + 3.2, p.z, 'Too far for your archers', '#fff'); return; } // (the ring was grey)
    if (isClient()) { C.inp.vly++; C.inp.vat = pt ? [r1(pt.x), r1(pt.z)] : null; C.sendNow = true; return; }
    orderVolley(G.myTi, pt || null);
  },
  // no argument: step to the next order; with one: set it
  order(want) {
    const p = G.player; if (G.state !== 'play' || !p || p.dead) return;
    const cur = G.teams[G.myTi].order || 'follow';
    const o = ORDERS.includes(want) ? want : ORDERS[(ORDERS.indexOf(cur) + 1) % ORDERS.length];
    if (o === cur && o !== 'hold') return;
    if (isClient()) { G.teams[G.myTi].order = o; C.inp.ord = o; if (o === 'hold') C.inp.hold = [r1(p.x), r1(p.z), r2(p.face)]; }
    else setOrder(G.myTi, o);
    sfx.order(); bus.emit('shout', { u: p, kind: o }); // your captain bellows it
    bus.emit('hud');
  },
  upgrade(id) {
    if (G.state !== 'play') return;
    const me = G.teams[G.myTi], cost = upgradeCost(G.myTi, id), u = UPGRADES.find(x => x.id === id);
    if (!u) return;
    if (cost == null) { banner(`${u.name} is maxed`, 'Try another upgrade'); return; }
    if (me.gold < cost) { banner('Not enough gold', `${u.name} costs ${cost} gold`, '#ffcf3a'); return; }
    if (isClient()) {
      C.inp.up[UPGRADES.indexOf(u)]++; me.gold -= cost; me.up[id]++; C.goldLocalAt = C.upLocalAt = performance.now();
      sfx.coin(); showMsg('upgrade', [G.myTi, id, me.up[id]]);
    } else buyUpgrade(G.myTi, id);
    bus.emit('hud');
  },
  recruit(kind) {
    if (G.state !== 'play') return;
    const st = STATS[kind], me = G.teams[G.myTi];
    if (!canRecruit(G.myTi)) { banner('No recruits', G.mode === 'dm' ? 'Your team is out of tickets' : 'You need a castle to recruit', '#e0352b'); return; }
    if (squadOf(G.myTi).length >= G.squadCap) { banner('Squad full', `${G.squadCap} soldiers is the limit`); return; }
    if (me.gold < st.cost) { banner('Not enough gold', `A ${st.name.toLowerCase()} costs ${st.cost} gold`, '#ffcf3a'); return; }
    if (isClient()) { C.inp.rec[RECRUITS.indexOf(kind)]++; me.gold -= st.cost; C.goldLocalAt = performance.now(); G.recruited++; sfx.coin(); }
    else recruit(G.myTi, kind);
    const p = G.player; if (p) floatText(p.x, p.y + 3, p.z, `${st.name} on the way`, '#fff');
  },
};
