// Online battles. The host runs the rules; every other phone sends its captain and button
// presses and draws the host's snapshots (a compact text string, roughly 1-4KB depending on
// how many soldiers are alive — more in a full 12-army Trio match — sent
// about 12 times a second).
import { SHOUTS, CROWN, HUMAN_CAPTAIN, ARMOUR, RHYTHM, BASH, STREAK, EVADE, TEAMS, MAPS, KINDS, STATS, RECRUITS, FACTIONS, factionFromCode, ORDERS, ORDER_NAMES, UPGRADES, WEAPONS, WEAPON_NAMES, CAPTAIN_COMBAT, HOLD_ATK, PARRY } from '../config.js';
import { G, bus, colorOf, isEnemyTi, activeFrom, ARMIES, duoStr, duoParse } from '../core/state.js';
import { makeLayout, groundY, clamp, rnd, turn, angDiff } from '../core/world.js';
import { buildNav, syncGates } from '../core/nav.js';
import { adoptBattle, applyCastleGates, applyPlazaWall, volleyCharge, captainBash, duelAct, duelOffer, duelTarget, initForts, applyFort, fortLvl, captainEvade, evadeKind, makeHolds, execTarget, rallyCry, blockPress, attackHold, attackRelease, rideRelease, newTeams, makeArrow, captainAttack, toggleHorseFor, recruit, integrate, driveCaptain, fallStep, arrowsTick, softAim, setOrder, canRecruit, squadOf, buyUpgrade, upgradeCost, horseMax, orderVolley, makeCtrlPoints, captainJump, captainCharge, chargeTimers, switchWeapon, airborne, aimRange, javTarget, regenJavs } from '../core/sim.js';
import { session, isClient, isHost } from './session.js';
import { makeP2PRoom } from './p2p.js';
import { showMsg } from '../ui/messages.js';
import { lookCode, lookFrom } from '../core/look.js';
import { capOf } from '../core/state.js';
import { sfx, buzz, gateS } from '../ui/audio.js';
import { banner } from '../ui/hud.js';
import { readMove, inp, moveNow } from '../ui/input.js';
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

// fight moments ride along with the announcements, by unit id, to be shown on every phone
bus.on('fxmsg', d => {
  const NET = session.NET;
  if (isHost() && NET.msgs && d.u && !d.fromNet && (d.k !== 'fxopen' || (d.a && d.a.human))) { NET.msgs.push([++NET.msgN, d.k, d.u.id, d.heavy ? 1 : 0, d.a ? d.a.id : -1, d.byAI ? 1 : 0, d.q || '']); if (NET.msgs.length > 8) NET.msgs.shift(); }
});

// ---------- host ----------
function encodeSnap() {
  const upPack = s => UPGRADES.reduce((n, u, k) => n + (s.up[u.id] | 0) * 4 ** k, 0);
  const teams = G.teams.map(s => [Math.round(s.points * 10), s.tickets, s.caps, Math.floor(s.gold), s.alive ? 1 : 0, Math.max(0, Math.ceil(s.leaderDeadT)), upPack(s), Math.round(s.morale || 0), Math.floor(s.rally || 0), s.routT > 0 ? 1 : 0].join(',')).join(';');
  const us = [];
  for (const u of G.units) {
    if (u.dead) continue;
    const kt = KINDS.indexOf(u.kind) * 16 + u.ti;
    const fl = (u.swing > 0 ? 1 : 0) | (u.mounted ? 2 : 0) | ((u.blockT > 0 || (u.human && u.blocking)) ? 4 : 0) | (u.carrying ? 8 : 0) | (u.stun > 0 ? 16 : 0) | (u.aim ? 32 : 0) | (u.shieldwall ? 64 : 0) | (u.weapon === 'spear' ? 128 : u.weapon === 'jav' ? 256 : u.weapon === 'sword' ? 512 : 0) | (u.charge > 0 ? 1024 : 0)
      | (u.windup > 0 ? 2048 : 0) | (u.glint ? 4096 : 0) | (u.heavyCharge > 0 ? 8192 : 0) | (u.bracing ? 16384 : 0) | (u.javDraw > 0 ? 32768 : 0) | (u.couch || u.rideReady ? 65536 : 0) | (u.routing ? 131072 : 0) | (u.rallyT > 0 ? 262144 : 0) | (u.execReady ? 524288 : 0) | (u.execA ? 1048576 : 0) | (u.execV ? 2097152 : 0) | (u.leader && u.swing > 0 ? (u.swingKind & 7) * 4194304 : 0) | (u.dueled ? 33554432 : 0) | (u.armour > 0 ? Math.max(1, Math.round(u.armour / ARMOUR.hp * 7)) * 67108864 : 0); // (bits 26-28: a captain's armour, in sevenths) // (bits 22-24: which blow a captain is swinging)
    const row = [b36(u.id), kt.toString(16), encX(u.x), encX(u.z), encF(u.face), b36(clamp(u.hp / u.max, 0, 1) * 35), b36(fl)];
    if (u.jy > .05) row.push(b36(u.jy * 10));
    us.push(row.join(','));
  }
  const ars = G.arrows.filter(a => !a.stuck && !a.done).slice(-18).map(a => [b36(a.id), encX(a.x0), encX(a.z0), b36(a.y0 * 10), encX(a.x1), encX(a.z1), b36(a.y1 * 10 + 20), b36(a.dur * 100), b36(a.peak * 10), b36(a.t * 100), a.ti].join(','));
  const hs = G.horses.filter(h => h.state === 'coming').map(h => [encX(h.x), encX(h.z), encF(h.face), h.ti].join(','));
  const f = G.flag;
  const fl = f ? [f.state === 'home' ? 0 : f.state === 'dropped' ? 1 : f.state === 'cased' ? 3 : 2, encX(f.x), encX(f.z), f.carrier ? b36(f.carrier.id) : '', Math.round((f.casing || 0) * 99)].join(',') : '';
  const pl = G.teams.map((s, i) => {
    if (!s.human || i === G.myTi) return ''; const L = s.leader, k = L.kick;
    if (k.dirty) { k.n++; k.dirty = false; k.lvx = k.vx; k.lvz = k.vz; k.lst = k.st; k.vx = 0; k.vz = 0; k.st = 0; }
    return [i, b36(L.id), L.dead ? 1 : 0, Math.round(L.horseHp), Math.ceil(L.horseCd), L.summon ? 1 : 0, k.n, r1(k.lvx || 0), r1(k.lvz || 0), r2(k.lst || 0), Math.round(L.hp), '', L.streak | 0, Math.round(L.armour || 0)].join(','); // (11: unused; 12: the streak)
  }).filter(Boolean).join(';');
  // the map's holdings, and control mode's points: who has each, and how far a capture has got
  const hd = (G.holds || []).map(h => [h.owner, Math.round(h.prog * 100), h.cap, h.contested ? 1 : 0, h.chest | 0, G.cgates && G.cgates[h.id] ? G.cgates[h.id].broken | 0 : 0, G.cgates && G.cgates[h.id] ? G.cgates[h.id].lv | 0 : 0].join(',')).join(';');
  const cp = (G.ctrlPoints || []).map(p => [p.owner, Math.round(p.prog * 100), p.capturer ?? -1].join(',')).join(';');
  const fo = (G.forts || []).map(f => f.broken).join(',') + (G.plazaWall ? ',' + (G.plazaWall.up ? 16 : 0) + G.plazaWall.broken : ''); // (Fortify: each castle's broken palisade sections)
  const du = (G.duels || []).map(d => [d.id, b36(d.a.id), b36(d.b.id), d.state === 'on' ? 1 : 0, encX(d.x), encX(d.z), Math.max(0, Math.ceil(d.t))].join(',')).join(';'); // (duels: called out, or on)
  const wt = (G.wtowers || []).map(w => [w.id, encX(w.x), encX(w.z), w.a, Math.max(0, Math.round(w.hp)), Math.round(w.build * 99), w.ti].join(',')).join(';'); // (the Crown's watchtowers)
  // captains: stamina, and in a duel the side his blow is coming from (sideN counts the blows)
  const cx = G.units.filter(u => u.leader && !u.dead).map(u => [b36(u.id), Math.round(u.st ?? 100), (u.swingSide | 0) + 1, u.sideN | 0].join(',')).join(';');
  return [Math.round(G.T * 10), teams, us.join(';'), ars.join(';'), hs.join(';'), fl, pl, G.bounty, hd, cp, fo, du, wt, cx].join('|');
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
  const pres = { role: 'host', ph: G.state === 'end' ? 'end' : 'play', seed: G.seed, mode: G.mode, map: G.map.id, diff: G.diff, time: G.time, tgt: G.target, al: G.ALLY.join(''), duo: duoStr(G.duo), seats: NET.seats, nick: session.myNick || 'Host', lk: (G.looks || []).map(lookCode).join(','), cr: Array.from({ length: ARMIES }, (_, i) => (G.crests && G.crests[i]) | 0).join(''), n: ++NET.snapN, s: encodeSnap(), m: NET.msgs };
  if (G.state === 'end' && G.endInfo) { pres.res = [G.endInfo.w, G.endInfo.why]; pres.kl = G.teams.map(t => t.kills | 0).join(','); pres.st = G.teams.map(t => [t.capK | 0, t.menK | 0, t.falls | 0, t.lost | 0, t.earned | 0, t.spent | 0, t.dist | 0, t.gold | 0, t.recruits | 0].join(',')).join(';'); pres.hl = G.teams.map(t => t.hl ? Object.entries(t.hl).map(([k, v]) => k + ':' + v).join(',') : '').join(';'); }
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
const IDLE_MS = 30e3; // (a player who does nothing this long is played by the computer until they're back)
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
  // a matchmade Crown battle in its first minute: a friend who joined late takes over the computer army
  // the service gave them (it's played as theirs from the next moment). After a host handover, the
  // other players come back to their own armies the same way.
  const HO = NET.handover, late = NET.match && G.mode === 'crown' && G.T < CROWN.lateJoin;
  if (late || HO) for (const p of peers) {
    if (p.sameTab || NET.seats[p.peer] !== undefined) continue;
    const pr = p.presence || {}, ti = pr.want; if (typeof ti !== 'number' || ti < 0 || ti >= ARMIES || Object.values(NET.seats).includes(ti)) continue;
    const s = G.teams[ti], back = HO && HO.tis.includes(ti) && pr.seed === G.seed; if (!s || !s.active || (s.human && !back) || (!late && !back)) continue;
    NET.seats[p.peer] = ti; s.human = true;
    const L = s.leader; if (L) { L.human = true; L.remote = true; L.dmg = HUMAN_CAPTAIN.dmg; L.spd = HUMAN_CAPTAIN.spd; }
    if (back) NET.inp[ti] = { sh: pr.sh | 0, atk: pr.atk | 0, chg: pr.chg | 0, ride: pr.ride | 0, vly: pr.vly | 0, par: pr.par | 0, ahN: pr.ahN | 0, bsh: pr.bsh | 0, evN: pr.evN | 0, dl: pr.dl | 0, rly: pr.rly | 0, hold: '', rec: (pr.rec || [0, 0, 0]).map(n => n | 0), up: UPGRADES.map((u, k) => (pr.up && pr.up[k]) | 0) }; // (their button counts carry on from where they were)
    else bus.emit('msg', { k: 'joined', a: [ti] });
    netHostSend(true);
  }
  if (HO && performance.now() > HO.until) { // whoever didn't make it back: the computer plays their army
    for (const ti of HO.tis) if (!Object.values(NET.seats).includes(ti) && G.teams[ti].human) {
      G.teams[ti].human = false; const L = G.teams[ti].leader; if (L) { L.human = false; L.remote = false; L.dmg = STATS.captain.dmg; L.spd = STATS.captain.spd; }
      bus.emit('msg', { k: 'left', a: [ti] });
    }
    NET.handover = null;
  }
  for (const p of peers) {
    if (p.sameTab) continue;
    const ti = NET.seats[p.peer]; if (ti === undefined) continue;
    const pr = p.presence || {}; if (pr.seed !== G.seed || pr.ph !== 'play') continue;
    const s = G.teams[ti], L = s.leader;
    { // idle for 30 s: the computer plays their army until they touch the controls again
      const idle = NET.idle || (NET.idle = {}), sig = [Array.isArray(pr.cap) ? Math.round(pr.cap[1] * 2) + ',' + Math.round(pr.cap[2] * 2) : '', pr.atk, pr.par, pr.ahN, pr.ride, pr.chg, pr.vly, pr.ord, pr.evN, pr.blk, pr.ah].join('|');
      const w = idle[ti] || (idle[ti] = { sig, at: performance.now(), out: false });
      if (w.sig !== sig) { w.sig = sig; w.at = performance.now(); if (w.out) { w.out = false; s.human = true; if (L) { L.human = true; L.remote = true; L.dmg = HUMAN_CAPTAIN.dmg; L.spd = HUMAN_CAPTAIN.spd; } bus.emit('msg', { k: 'back', a: [ti] }); } }
      else if (!w.out && s.human && L && !L.dead && performance.now() - w.at > IDLE_MS) { w.out = true; s.human = false; L.human = false; L.remote = false; L.dmg = STATS.captain.dmg; L.spd = STATS.captain.spd; bus.emit('msg', { k: 'idle', a: [ti] }); }
    }
    if (!s.human) continue;
    const last = NET.inp[ti] || (NET.inp[ti] = { atk: 0, chg: 0, ride: 0, vly: 0, par: 0, ahN: 0, hold: '', rec: [0, 0, 0], up: UPGRADES.map(() => 0) }); // (one count per upgrade: a short list once lost the Horse)
    if (L && !L.dead && Array.isArray(pr.cap) && pr.cap[0] === L.id) {
      L.x = +pr.cap[1]; L.z = +pr.cap[2]; L.face = +pr.cap[3]; L.vx = +pr.cap[4]; L.vz = +pr.cap[5];
      L.blocking = !!pr.blk; L.stickSide = (pr.gs | 0) || 0; // (in a duel: which way their stick points, for their guard and their blow) L.jy = Math.max(0, +pr.cap[6] || 0); L.ahHeld = !!pr.ah;
      const w = WEAPONS[pr.cap[7] | 0]; if (w && L.weapon !== w) { L.weapon = w; s.weapon = w; }
    }
    if (typeof pr.par === 'number' && pr.par > last.par) { if (L && !L.dead) blockPress(L); last.par = pr.par; } // Block pressed: a parry window
    if (typeof pr.ahN === 'number' && pr.ahN > last.ahN) { if (L && !L.dead) { if (typeof pr.face === 'number') L.face = pr.face; if (L.mounted) rideRelease(L, L.weapon || 'sword', +pr.ahD || 0); else attackRelease(L, L.weapon || 'sword', +pr.ahD || 0); } last.ahN = pr.ahN; } // Attack let go after a hold
    if (typeof pr.bsh === 'number' && pr.bsh > (last.bsh || 0)) { if (L && !L.dead) { if (typeof pr.face === 'number') L.face = pr.face; if (!captainBash(L)) captainAttack(L); } last.bsh = pr.bsh; } // (Block, then Attack: the shield bash)
    if (typeof pr.atk === 'number' && pr.atk > last.atk) { if (L && !L.dead) { if (typeof pr.face === 'number') L.face = pr.face; L.rbIn = typeof pr.rb === 'number' ? pr.rb : null; /* (the beats their phone counted) */ captainAttack(L); } last.atk = pr.atk; }
    if (typeof pr.ride === 'number' && pr.ride > last.ride) { if (L) toggleHorseFor(L); last.ride = pr.ride; }
    if (typeof pr.chg === 'number' && pr.chg > last.chg) { if (L && !L.dead) captainCharge(L); last.chg = pr.chg; }
    if (typeof pr.evN === 'number' && pr.evN > (last.evN || 0)) { if (L && !L.dead && ['pounce', 'left', 'right', 'back'].includes(pr.evK)) captainEvade(L, pr.evK, true); last.evN = pr.evN; } // (a joiner's evade: their phone moved them; here, the untouchable moment and the follow-up)
    if (typeof pr.dl === 'number' && pr.dl > (last.dl || 0)) { if (L && !L.dead) duelAct(L, pr.dlId == null ? null : pr.dlId | 0); last.dl = pr.dl; } // (⚔: a challenge, or taking one up)
    if (typeof pr.vly === 'number' && pr.vly > last.vly) { orderVolley(ti, Array.isArray(pr.vat) ? { x: +pr.vat[0], z: +pr.vat[1] } : null); last.vly = pr.vly; }
    if (Array.isArray(pr.up)) for (let k = 0; k < UPGRADES.length; k++) while ((pr.up[k] | 0) > last.up[k]) { last.up[k]++; buyUpgrade(ti, UPGRADES[k].id); }
    const holdKey = pr.ord === 'hold' && Array.isArray(pr.hold) ? pr.hold.join(',') : pr.ord === 'focus' && Array.isArray(pr.foc) ? 'f' + pr.foc.join(',') : '';
    if (pr.ord && (ORDERS.includes(pr.ord) || pr.ord === 'focus') && (pr.ord !== s.order || holdKey !== last.hold)) { // (a hold moved to a new spot, or a new group to attack, counts as a new order)
      s.order = pr.ord; last.hold = holdKey; if (pr.ord === 'charge') volleyCharge(ti); // (a charge hard on a volley)
      if (pr.ord === 'hold') setOrder(ti, 'hold', Array.isArray(pr.hold) ? { x: +pr.hold[0], z: +pr.hold[1], face: +pr.hold[2] } : null);
      if (pr.ord === 'focus') setOrder(ti, 'focus', Array.isArray(pr.foc) ? { x: +pr.foc[0], z: +pr.foc[1], id: pr.foc[2] | 0 } : null);
    }
    if (typeof pr.rly === 'number' && pr.rly > (last.rly || 0)) { rallyCry(ti); last.rly = pr.rly; } // the rally horn
    if (typeof pr.sh === 'number' && pr.sh > (last.sh || 0)) { last.sh = pr.sh; if (SHOUTS[pr.shK | 0]) bus.emit('msg', { k: 'callout', a: [ti, pr.shK | 0] }); } // a quick shout
    if (Array.isArray(pr.rec)) for (let k = 0; k < 3; k++) while ((pr.rec[k] | 0) > last.rec[k]) { last.rec[k]++; recruit(ti, RECRUITS[k]); }
  }
}

// ---------- client ----------
export function clientStart(hp) {
  G.role = 'client'; G.lms = false; G.warmup = null;
  G.mode = hp.mode; G.map = MAPS[hp.map]; G.diff = hp.diff; G.time = [5, 10, 15].includes(+hp.time) ? +hp.time : 10; G.target = hp.tgt == null ? null : +hp.tgt; G.ALLY = hp.al.split('').map(Number); G.seed = hp.seed;
  G.looks = String(hp.lk || '').split(',').map(lookFrom);
  G.crests = String(hp.cr || '').split('').map(c => Math.min(7, +c || 0));
  G.duo = duoParse(hp.duo);
  G.layout = makeLayout(G.map.id, G.mode === 'ctf', G.mode === 'ctrl', G.seed); buildNav(G.layout);
  G.units = []; G.horses = []; G.arrows = [];
  G.T = 0; G.kills = 0; G.recruited = 0; G.bounty = -1; G.endInfo = null; G.awarded = false; G.seasoned = false;
  const humans = new Array(ARMIES).fill(0); Object.values(hp.seats || {}).forEach(ti => humans[ti] = 1);
  const active = activeFrom(G.duo);
  G.teams = newTeams(humans, active);
  for (let c = 0; c < 4; c++) if (!active[c]) G.teams[c].alive = false; // (a castle out of this battle)
  initForts(); C.fortSig = '';
  G.flag = G.mode === 'ctf' ? { state: 'home', x: 0, z: 0, carrier: null, dropT: 0 } : null;
  G.crown = G.mode === 'crown' ? { said: {}, casing: 0, ot: false } : null;
  G.plazaWall = G.crown ? { up: false, hp: [0, 0, 0, 0], broken: 0 } : null; C.wallSig = null; G.cgates = G.crown ? {} : null; G.wtowers = [];
  G.ctrlPoints = G.mode === 'ctrl' ? makeCtrlPoints(G.layout) : null;
  G.holds = makeHolds(G.layout); G.duels = [];
  Object.assign(C, { byId: new Map(), lastN: -1, lastMsgN: (hp.m && hp.m.length) ? hp.m[hp.m.length - 1][0] : 0, meId: null, meInit: false, kickN: 0, localCd: 0, lastSnapAt: performance.now(),
    inp: { rb: 0, bsh: 0, dl: 0, dlId: null, atk: 0, ride: 0, vly: 0, chg: 0, evN: 0, evK: '', par: 0, ahN: 0, ahD: 0, ah: false, rly: 0, foc: null, vat: null, rec: [0, 0, 0], up: UPGRADES.map(() => 0), ord: 'follow', hold: null, face: 0 }, sendAt: 0, sendNow: false, pred: null, arrowIds: new Set(), coming: [], leaving: [], horseKey: 0, riderKeys: new Map(), hudT: 0 });
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
    if (v.length > 9) { s.morale = v[7]; s.rally = v[8]; s.routT = v[9] ? 1 : 0; }
  });
  G.bounty = +secs[7];
  if (secs[8] && G.holds) secs[8].split(';').forEach((r, i) => { const h = G.holds[i], v = r.split(',').map(Number); if (h) { h.owner = v[0]; h.prog = v[1] / 100; h.cap = v[2]; h.contested = !!v[3]; h.chest = v[4] | 0; if (G.cgates) { if (!G.cgates[i] && G.layout.cwalls && G.layout.cwalls.some(c => c.hid === i)) G.cgates[i] = { hp: [1, 1, 1], broken: 0 }; if (G.cgates[i]) { G.cgates[i].broken = v[5] | 0; G.cgates[i].lv = v[6] | 0; } } } }); if (G.crown) applyCastleGates();
  if (secs[10] != null && G.forts) { // palisades: built (the castle's Fortify level) and broken
    secs[10].split(',').forEach((v, c) => { if (G.forts[c]) G.forts[c].broken = +v || 0; });
    const pv = +secs[10].split(',')[4]; // (the Crown: the plaza's wall, up (16) and its broken gates)
    if (G.plazaWall && !isNaN(pv) && pv !== C.wallSig) { const was = G.plazaWall.up; C.wallSig = pv; G.plazaWall.up = pv >= 16; G.plazaWall.broken = pv & 15; applyPlazaWall(); if (!was && G.plazaWall.up) bus.emit('wallsRise'); }
    const sig = secs[10] + '/' + [0, 1, 2, 3].map(fortLvl).join('');
    if (sig !== C.fortSig) { C.fortSig = sig; for (let c = 0; c < 4; c++) applyFort(c); }
  }
  if (secs[9] && G.ctrlPoints) secs[9].split(';').forEach((r, i) => { const p = G.ctrlPoints[i], v = r.split(',').map(Number); if (p) { p.owner = v[0]; p.prog = v[1] / 100; p.capturer = v[2] < 0 ? null : v[2]; } });
  const mine = secs[6] ? secs[6].split(';').map(r => r.split(',')).find(r => +r[0] === myTi) : null;
  let myId = null;
  if (mine) { myId = p36(mine[1]); C.meInfo = { dead: +mine[2], horseHp: +mine[3], horseCd: +mine[4], summon: +mine[5], kn: +mine[6], kvx: +mine[7], kvz: +mine[8], kst: +mine[9], hp: +mine[10], streak: +mine[12] || 0, armour: +mine[13] || 0 }; }
  const seen = new Set();
  if (secs[2]) for (const row of secs[2].split(';')) {
    const f = row.split(','), id = p36(f[0]), kt = parseInt(f[1], 16);
    const kind = KINDS[kt >> 4], ti = kt & 15;
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
    if ((fl & 1) && u.swing <= 0 && id !== myId) { u.swing = .38; sfx.swing(u.x, u.z); if (kind === 'captain') u.swingKind = (fl >> 22) & 7; }
    u.mounted = !!(fl & 2); u.carrying = !!(fl & 8);
    u.shieldwall = !!(fl & 64);
    u.dueled = !!(fl & 33554432);
    if (id !== myId) u.armour = ((fl / 67108864) & 7) / 7 * ARMOUR.hp; // (others' armour, roughly: for the bar over their heads)
    u.execReady = !!(fl & 524288); u.execA = !!(fl & 1048576); u.execV = !!(fl & 2097152); // (an execution: who's marked, who's doing it, who's kneeling)
    if (id !== myId) {
      u.blockT = (fl & 4) ? .2 : 0; u.stun = (fl & 16) ? .1 : 0; u.aim = !!(fl & 32);
      if (kind === 'captain') u.weapon = (fl & 128) ? 'spear' : (fl & 256) ? 'jav' : (fl & 512) ? 'sword' : undefined;
      u.jyT = f[7] ? p36(f[7]) / 10 : 0;
      u.charge = (fl & 1024) ? 1 : 0;
      u.windup = (fl & 2048) ? 1 : 0; u.glint = !!(fl & 4096);
      u.heavyCharge = (fl & 8192) ? 1 : 0; u.bracing = !!(fl & 16384); u.javDraw = (fl & 32768) ? .7 : 0; u.couch = !!(fl & 65536); u.routing = !!(fl & 131072); u.rallyT = (fl & 262144) ? 1 : 0;
    }
    if (id !== myId) {
      u.tx = x; u.tz = z; u.tface = face;
      if (Math.hypot(u.x - x, u.z - z) > 8) { u.x = x; u.z = z; }
    } else if (!C.meInit || C.meId !== id || u.execA || u.execV) { u.x = x; u.z = z; u.face = face; } // (in an execution the host places you)
  }
  for (const u of [...C.byId.values()]) if (!seen.has(u.id)) clientKill(u);
  if (secs[12] != null && G.mode === 'crown') G.wtowers = secs[12] ? secs[12].split(';').map(r => { const f = r.split(','); return { id: +f[0], x: decX(f[1]), z: decX(f[2]), a: +f[3], hp: +f[4], build: +f[5] / 99, ti: +f[6] }; }) : [];
  if (secs[13]) for (const r of secs[13].split(';')) { // captains: stamina, and a duel blow's side
    const f = r.split(','), u = C.byId.get(p36(f[0])); if (!u) continue;
    u.st = +f[1]; const n = +f[3] | 0;
    if (n !== (u.sideN | 0)) { u.sideN = n; u.swingSide = (+f[2] | 0) - 1; u.sideT = G.T; }
  }
  if (secs[11] != null) { // duels: who's called out whom, and the rings that are up
    for (const u of G.units) u.duelId = 0;
    G.duels = secs[11] ? secs[11].split(';').map(r => { const f = r.split(','); return { id: +f[0], a: C.byId.get(p36(f[1])), b: C.byId.get(p36(f[2])), state: f[3] === '1' ? 'on' : 'offer', x: decX(f[4]), z: decX(f[5]), t: +f[6] }; }).filter(d => d.a && d.b) : [];
    for (const d of G.duels) if (d.state === 'on') d.a.duelId = d.b.duelId = d.id;
  }
  if (myId != null && C.byId.get(myId)) {
    const me = C.byId.get(myId);
    if (C.meId !== myId) { C.meId = myId; C.meInit = true; G.player = me; cam.yaw = me.face; C.kickN = C.meInfo ? C.meInfo.kn : 0; }
    G.player = me;
    me.horseHp = C.meInfo.horseHp; me.horseCd = C.meInfo.horseCd; me.summon = !!C.meInfo.summon; me.hp = C.meInfo.hp; me.streak = C.meInfo.streak; me.armour = C.meInfo.armour;
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
  if (!G.flag && secs[5] && G.mode === 'crown') G.flag = { state: 'cased', x: 0, z: 0, carrier: null, dropT: 0, casing: 0 }; // (the Crown appears at 9:00)
  if (G.flag && secs[5]) {
    const f = secs[5].split(','), flag = G.flag;
    flag.state = ['home', 'dropped', 'carried', 'cased'][+f[0]]; flag.casing = (+f[4] || 0) / 99; flag.x = decX(f[1]); flag.z = decX(f[2]);
    flag.carrier = f[3] ? C.byId.get(p36(f[3])) || null : null;
    if (flag.carrier) flag.carrier.carrying = true;
  }
  for (const m of (hp.m || [])) if (m[0] > C.lastMsgN) {
    C.lastMsgN = m[0];
    if (typeof m[1] === 'string' && m[1].startsWith('fx')) { const u = G.units.find(x => x.id === m[2]), a = G.units.find(x => x.id === m[4]); if (u) bus.emit('fxmsg', { k: m[1], u, a, heavy: !!m[3], byAI: !!m[5], q: m[6], fromNet: true }); }
    else showMsg(m[1], m.slice(2));
  }
}

// Returns false if the client left the match (host gone, back to lobby).
export function clientTick(dt) {
  const NET = session.NET;
  const hostP = NET.room.peers().find(p => p.peer === NET.hostPeer);
  if (NET.handing) { /* (the battle is changing hands: hold still a moment) */ }
  else if (!hostP) {
    if (!NET.hostGoneAt) NET.hostGoneAt = performance.now();
    if (performance.now() - NET.hostGoneAt > 1500) {
      if (G.state === 'play' && NET.lastSeats) { NET.handing = true; handover().then(ok => { if (!ok) hooks.onAbort('The host left the battle.'); }); }
      else { hooks.onAbort('The host left the battle.'); return false; }
    }
  } else {
    NET.hostGoneAt = 0;
    const hp = hostP.presence || {};
    if (hp.seats && typeof hp.seats === 'object') NET.lastSeats = hp.seats;
    if (hp.ph === 'gone') { hooks.onAbort('The host ended the battle.'); return false; } // (the host chose to leave)
    if (hp.ph === 'lobby') { hooks.onLobby(); return false; }
    if (hp.seed === G.seed && (hp.ph === 'play' || hp.ph === 'end')) clientApply(hp);
    if (hp.ph === 'end' && hp.kl) G.kills = +String(hp.kl).split(',')[G.myTi] || 0; // your captain's kills, as the host counted them
    if (hp.ph === 'end' && typeof hp.st === 'string') hp.st.split(';').forEach((row, i) => { const s = G.teams[i], v = row.split(',').map(Number); if (s && v.length >= 4) { s.capK = v[0] | 0; s.menK = v[1] | 0; s.falls = v[2] | 0; s.lost = v[3] | 0; s.earned = v[4] | 0; s.spent = v[5] | 0; s.dist = v[6] | 0; s.endGold = v[7] | 0; s.recruits = v[8] | 0; } }); // (the tally)
    if (hp.ph === 'end' && typeof hp.hl === 'string') hp.hl.split(';').forEach((row, i) => { const s = G.teams[i]; if (!s) return; const h = {}; for (const kv of row.split(',')) { const [k, v] = kv.split(':'); if (k && /^[a-z]+$/.test(k)) h[k] = +v || 0; } s.hl = h; }); // (everyone's moments: yours, and your side's)
    if (hp.ph === 'end' && G.state === 'play' && Array.isArray(hp.res)) bus.emit('hostEnd', hp.res);
  }
  if (G.state !== 'play' && G.state !== 'end') return false;
  C.localCd -= dt; syncGates();
  const me = G.player;
  if (me && !me.dead && G.state === 'play') {
    me.stun -= dt;
    const mv = import.meta.env.DEV && window.__moveOverride ? window.__moveOverride() : readMove(dt);
    for (const u of G.units) if (u.slowT > 0) u.slowT -= dt; // (a parry's slow beat, for the two men in it)
    driveCaptain(me, mv, me.slowT > 0 ? dt * PARRY.slow : dt);
    if (mv.block && !C.blkPrev && !me.mounted) { C.inp.par++; C.sendNow = true; C.blkAt = performance.now(); } C.blkPrev = !!mv.block; // (a Block press: the host opens a parry window)
    // holding Attack: shown here at once (sword raised, spear planted, javelin drawn); the host acts on the release
    const held = !!mv.attackHeld;
    if (held) C.ahT = (C.ahT || 0) + dt;
    else if (C.ahT > 0) { C.inp.ahN++; C.inp.ahD = r2(C.ahT); C.inp.face = r2(me.face); C.sendNow = true; predictRelease(me, C.ahT); C.ahT = 0; }
    attackHold(me, held, dt, true);
    if (held !== !!C.inp.ah) { C.inp.ah = held; C.sendNow = true; }
    for (const o of G.units) { // stay out of other soldiers
      if (o === me || o.dead || !isEnemyTi(o.ti, me.ti)) continue; // (your own men make way; the host moves them)
      const dx = me.x - o.x, dz = me.z - o.z, min = me.r + o.r; if (Math.abs(dx) > min || Math.abs(dz) > min) continue;
      const d = Math.hypot(dx, dz) || .01; if (d < min) { me.x += dx / d * (min - d) * .7; me.z += dz / d * (min - d) * .7; }
    }
    integrate(me, dt, me.z);
    me.r = me.mounted ? .95 : STATS.captain.r;
    regenJavs(me, dt); chargeTimers(me, dt);
    if (C.atkBuf > 0) C.atkBuf -= dt;
    if (C.pred && performance.now() >= C.pred.at) {
      const { tg: t, reach, spear } = C.pred; C.pred = null;
      if (t && !t.dead && isEnemyTi(t.ti, me.ti) && Math.hypot(t.x - me.x, t.z - me.z) <= me.r + t.r + reach + .9) {
        const hx = (me.x + t.x) / 2, hz = (me.z + t.z) / 2;
        const shield = t.blockT > 0 && Math.abs(angDiff(t.face, Math.atan2(me.x - t.x, me.z - t.z))) < 1.1; // (a raised shield only stops what comes from the front)
        bus.emit('spark', { x: hx, y: (me.y + t.y) / 2 + 1.2, z: hz, c: shield ? '#fff3b0' : TEAMS[colorOf(t.ti)].css, n: 5 });
        if (shield) sfx.clang(hx, hz); else sfx.hit(hx, hz);
        // (a raised shield shows on every phone, so a clang here is the clang the host rolls too)
        bus.emit('hitstop', shield ? .03 : spear ? .075 : .055); if (!shield) cam.shake = Math.max(cam.shake, spear ? .16 : .1);
        t.predHitAt = performance.now();
      }
    }
    if (C.atkBuf > 0 && C.localCd <= 0 && !me.mounted) actions.attack();
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
    const pres = { role: 'player', gs: (G.player && G.player.stickSide) | 0, sh: C.inp.sh || 0, shK: C.inp.shK || 0, want: G.myTi, nick: session.myNick || 'Captain', ph: 'play', seed: G.seed, evN: C.inp.evN, evK: C.inp.evK, rly: C.inp.rly, rb: C.inp.rb, bsh: C.inp.bsh, dl: C.inp.dl, dlId: C.inp.dlId, foc: C.inp.foc, par: C.inp.par, ahN: C.inp.ahN, ahD: C.inp.ahD, ah: C.inp.ah, atk: C.inp.atk, ride: C.inp.ride, vly: C.inp.vly, vat: C.inp.vat, chg: C.inp.chg, rec: C.inp.rec, up: C.inp.up, ord: C.inp.ord, hold: C.inp.hold, face: C.inp.face, blk: inp.blockHeld ? 1 : 0 };
    if (me && !me.dead) pres.cap = [me.id, r2(me.x), r2(me.z), r2(me.face), r1(me.vx), r1(me.vz), r2(me.jy || 0), Math.max(0, WEAPONS.indexOf(me.weapon || 'sword'))];
    NET.room.presence(pres).catch(() => {});
  }
  return true;
}
// ---------- host handover ----------
// The host's phone left mid-battle. The player in the lowest seat that's left takes over: their phone
// becomes the host (from its last snapshot) and opens the battle again under a new code that every
// phone can work out; everyone else links up to it and is given their own army back. Nobody is sent
// home because one phone dropped.
async function handover() {
  const NET = session.NET, oldRoom = NET.room;
  const left = Object.entries(NET.lastSeats || {}).filter(([p]) => p !== NET.hostPeer).sort((a, b) => a[1] - b[1]);
  if (!left.length) return false;
  const gen = (NET.gen || 0) + 1, base = NET.base || NET.name, code = base + 'H' + gen;
  bus.emit('handing', true);
  if (left[0][1] === G.myTi) { // (it's us)
    let room = null; try { room = await makeP2PRoom(code, true); } catch (e) { return false; }
    if (session.NET !== NET) { room.leave(); return true; }
    try { await oldRoom.leave(); } catch (e) {}
    adoptBattle();
    const gone = (NET.lastSeats || {})[NET.hostPeer]; // (the old host's army: the computer plays it now)
    if (gone != null && G.teams[gone]) { G.teams[gone].human = false; const L = G.teams[gone].leader; if (L) { L.human = false; L.remote = false; L.dmg = STATS.captain.dmg; L.spd = STATS.captain.spd; } }
    const me = myPeer(room) || 'me', tis = left.slice(1).map(x => x[1]);
    session.NET = { role: 'host', room, name: code, base, gen, me, seats: { [me]: G.myTi }, msgs: [], msgN: C.lastMsgN + 50, snapN: C.lastN + 1000, inp: {}, match: NET.match,
      handover: tis.length ? { tis, until: performance.now() + 20e3 } : null,
      lobby: { mode: G.mode, map: G.map.id, diff: G.diff, time: G.time, tgt: G.target, al: [...G.ALLY], duo: G.duo } };
    bus.emit('msg', { k: 'newHost', a: [G.myTi] }); netHostSend(true);
    bus.emit('handing', false);
    return true;
  }
  let room = null;
  for (let k = 0; k < 12 && !room; k++) { // (the new host may still be opening it)
    try { room = await makeP2PRoom(code, false); } catch (e) { await new Promise(r => setTimeout(r, 1500)); }
    if (session.NET !== NET) { if (room) room.leave(); return true; }
  }
  if (!room) return false;
  try { await oldRoom.leave(); } catch (e) {}
  Object.assign(NET, { room, name: code, base, gen, hostPeer: null, hostGoneAt: 0, lastSeats: null });
  room.presence({ role: 'player', want: G.myTi, nick: session.myNick || 'Captain', ph: 'play', seed: G.seed }).catch(() => {});
  const t0 = performance.now(); // (who's hosting now: the phone that says so)
  while (!NET.hostPeer && performance.now() - t0 < 10e3) { const h = room.peers().find(p => p.presence && p.presence.role === 'host'); if (h) NET.hostPeer = h.peer; else await new Promise(r => setTimeout(r, 300)); }
  NET.handing = false; bus.emit('handing', false);
  return !!NET.hostPeer;
}
export function clientHorses() {
  const list = [...C.coming, ...C.leaving];
  for (const [u, key] of C.riderKeys) if (!u.dead) list.push({ key, ti: u.ti, x: u.x, z: u.z, face: u.face, spd: Math.hypot(u.vx, u.vz), state: 'ridden', t: 0 });
  return list;
}

// A client's own guess at what its Attack press does (the host decides for real), so the swing,
// the combo rhythm and the javelin count respond instantly instead of a round-trip later.
// Attack let go after holding it: the sword's heavy blow, or a javelin (drawn back for t seconds)
function predictRelease(p, t) {
  const w = p.weapon || 'sword';
  if (p.execA || p.execV || execTarget(p)) return; // (the press finished a beaten captain: nothing to let go)
  if (p.mounted && w !== 'jav') { if (C.localCd <= 0) { p.swing = .38; p.swingKind = 0; sfx.swing(p.x, p.z); C.localCd = .7; C.lastAtkAt = performance.now(); } return; }
  if (w === 'sword' && t >= HOLD_ATK.sword + .12) { p.swing = .38; p.swingKind = 5; sfx.swing(p.x, p.z); C.localCd = .7; C.lastAtkAt = performance.now(); }
  if (w === 'jav' && p.javAmmo >= 1 && C.localCd <= 0) {
    const k = t > HOLD_ATK.jav ? Math.min(1, (t - HOLD_ATK.jav) / (HOLD_ATK.javFull - HOLD_ATK.jav)) : 0;
    const tg = javTarget(p, CAPTAIN_COMBAT.jav.range + HOLD_ATK.javRange * k); p.face = Math.atan2(tg.x - p.x, tg.z - p.z);
    p.javAmmo--; C.javLocalAt = performance.now(); C.localCd = CAPTAIN_COMBAT.jav.cd; p.swingKind = 4; p.swing = .38; sfx.swing(p.x, p.z);
  }
}
function predictAttack(p) {
  const CC = CAPTAIN_COMBAT;
  if (p.mounted) {
    if (p.weapon === 'jav' && p.javAmmo >= 1) { p.javAmmo--; C.javLocalAt = performance.now(); C.localCd = CC.jav.cd; }
    else C.localCd = .8;
    return;
  }
  // straight out of an evade: its follow-up, as the host will see it
  const ev = p.evade && G.T - p.evade.t < .2 + EVADE.follow ? p.evade.kind : null;
  if (ev) p.evade = null;
  if (ev === 'pounce') { C.localCd = CC.leap.cd; p.jvy = Math.min(p.jvy || 0, -9); p.jy = Math.max(p.jy || 0, .3); p.vx += Math.sin(p.face) * 3; p.vz += Math.cos(p.face) * 3; p.swingKind = 2; return; }
  if (ev === 'back') { p.vx = Math.sin(p.face) * EVADE.counter.lunge; p.vz = Math.cos(p.face) * EVADE.counter.lunge; p.dashT = EVADE.counter.dash; }
  if (airborne(p)) { C.localCd = CC.leap.cd; p.jvy = Math.min(p.jvy, -9); p.vx += Math.sin(p.face) * 3; p.vz += Math.cos(p.face) * 3; p.swingKind = 2; return; }
  if (execTarget(p)) { C.localCd = 1.3; return; } // (a marked captain: the host plays out the execution)
  if (p.weapon === 'jav') {
    if (p.javAmmo >= 1) return; // (on foot the javelin goes when Attack is let go: see predictRelease)
    p.weapon = 'sword'; G.teams[G.myTi].weapon = 'sword'; floatText(p.x, p.y + 3.2, p.z, 'Out of javelins', '#fff'); bus.emit('hud');
  }
  const spear = p.weapon === 'spear', now = performance.now() / 1000, SK = CC.spear.skewer;
  const sCombo = spear ? (now - p.lastSwingT < CC.spear.window && p.swingKind >= 3 ? (p.combo + 1) % 3 : 0) : 0, skewer = sCombo === 2;
  const best = softAim(p, spear && skewer ? SK.aim : aimRange(p));
  if (best) {
    const ang = Math.atan2(best.x - p.x, best.z - p.z), d = Math.hypot(best.x - p.x, best.z - p.z);
    p.face = ang;
    if (d > p.r + best.r + 1.3 + (spear ? CC.spear.reachB : 0) - .2 && !skewer) { p.vx += Math.sin(ang) * 4; p.vz += Math.cos(ang) * 4; }
  }
  // the host lands the blow ~.12s into the swing; show the impact here at the same moment instead of
  // waiting for the host's word (the damage itself still comes from the host)
  if (best) C.pred = { at: performance.now() + (skewer ? SK.t * 1000 : 120), tg: best, reach: STATS.captain.reach + (spear ? (skewer ? SK.reachB : CC.spear.reachB) : 0), spear };
  if (spear && skewer) { C.localCd = SK.cd; p.swingKind = 5; p.combo = 2; p.vx = Math.sin(p.face) * SK.lunge; p.vz = Math.cos(p.face) * SK.lunge; p.dashT = SK.dash; } // (the skewer: a running lunge)
  else if (spear) { C.localCd = sCombo === 1 ? CC.spear.cd2 : CC.spear.cd; p.swingKind = 3; p.combo = sCombo; p.vx += Math.sin(p.face) * CC.spear.lunge; p.vz += Math.cos(p.face) * CC.spear.lunge; }
  else {
    const combo = performance.now() / 1000 - p.lastSwingT < CC.sword.window ? (p.combo + 1) % 3 : 0;
    p.combo = combo; p.swingKind = combo === 2 ? 4 : combo; C.localCd = combo === 2 ? CC.sword.finisherCd : CC.sword.cd;
    if (combo !== 2) { p.vx += Math.sin(p.face) * CC.sword.step; p.vz += Math.cos(p.face) * CC.sword.step; } // (the half-step, as on the host)
  }
  p.lastSwingT = now;
}

// ---------- player actions (solo, host and client) ----------
const orderName = o => ORDER_NAMES[o] || ORDER_NAMES.follow;
export const actions = {
  shout(n) { // a quick shout (one every two seconds)
    if (G.state !== 'play' || !SHOUTS[n] || performance.now() - (C.shoutAt || 0) < 2000) return; C.shoutAt = performance.now();
    if (isClient()) { C.inp.sh = (C.inp.sh || 0) + 1; C.inp.shK = n; C.sendNow = true; showMsg('callout', [G.myTi, n]); return; }
    bus.emit('msg', { k: 'callout', a: [G.myTi, n] });
  },
  attack() {
    const p = G.player; if (!p || p.dead || G.state !== 'play') return;
    if (p.mounted) return; // (on horseback the blow comes when Attack is let go)
    if (p.carrying) { if (gateS('carryhint', 1500)) floatText(p.x, p.y + 3.2, p.z, 'Hands full: carry it home', '#fff'); return; }
    // Block tapped just before: the shield bash (the rules decide: a parry just now makes it the riposte)
    const bashing = isClient() ? performance.now() - (C.blkAt || -1e9) <= BASH.window * 1000 : G.T - (p.lastBlkPress ?? -9) <= BASH.window;
    if (isClient()) {
      if (C.localCd > 0 || p.stun > 0) { C.atkBuf = .4; return; }
      C.atkBuf = 0;
      if (bashing) { C.blkAt = -1e9; p.swing = .38; p.swingKind = 6; p.blockT = .3; sfx.thud(p.x, p.z); C.inp.bsh++; }
      else {
        const gap = (performance.now() - (p.pressAt || -1e9)) / 1000; // (the beat, judged here where the press happened)
        C.beats = gap > CAPTAIN_COMBAT.sword.window || (C.beats || 0) >= 2 ? 0 : Math.abs(gap - RHYTHM.at) <= RHYTHM.w ? (C.beats || 0) + 1 : 0; C.inp.rb = C.beats;
        predictAttack(p); p.swing = .38; sfx.swing(p.x, p.z); C.inp.atk++;
      }
      p.pressAt = performance.now();
      C.inp.face = r2(p.face); C.lastAtkAt = performance.now(); C.sendNow = true;
      return;
    }
    if (bashing && captainBash(p)) return;
    p.pressAt = performance.now(); // (for the beat ring)
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
    // on foot, Jump is the evade: which way comes from the stick, against the enemy you face
    const mv = import.meta.env.DEV && window.__moveOverride ? window.__moveOverride() : moveNow();
    const kind = evadeKind(p, mv.wx, mv.wz, mv.mag);
    if (!captainEvade(p, kind)) return;
    buzz(15);
    if (isClient()) { C.inp.evN++; C.inp.evK = kind; C.sendNow = true; }
  },
  weapon(w) {
    const p = G.player; if (G.state !== 'play' || !p || p.dead) return;
    const nw = switchWeapon(p, w); if (!nw) return;
    sfx.draw(); floatText(p.x, p.y + 3.2, p.z, WEAPON_NAMES[nw], '#fff');
    setTimeout(() => bus.emit('fighttip', nw), 1200); // (how to use it, the first couple of times)
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
  // ⚔: call out the enemy captain the tag is over, or take up his challenge
  duel() {
    const p = G.player; if (G.state !== 'play' || !p || p.dead) return;
    const o = duelOffer(p), v = o ? o.a : duelTarget(p); if (!v) return;
    buzz(25);
    if (isClient()) { C.inp.dl++; C.inp.dlId = o ? null : v.id; C.sendNow = true; return; }
    duelAct(p, o ? null : v.id);
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
  // sound the rally horn (when it's full)
  rally() {
    const p = G.player, me = G.teams[G.myTi]; if (G.state !== 'play' || !p || p.dead || !me) return;
    if ((me.rally || 0) < 100) { floatText(p.x, p.y + 3.2, p.z, 'The rally horn fills as you fight well', '#fff'); return; }
    if (isClient()) { C.inp.rly++; C.sendNow = true; me.rally = 0; return; }
    rallyCry(G.myTi);
  },
  // pt (hold only): where to put the line, {x, z, face}; without one it forms in front of the captain.
  // 'focus' (with pt {x, z, id}): attack that enemy group
  order(want, pt) {
    const p = G.player; if (G.state !== 'play' || !p || p.dead) return;
    if (want === 'focus') {
      if (!pt) return;
      if (isClient()) { setOrder(G.myTi, 'focus', pt); C.inp.ord = 'focus'; C.inp.foc = [r1(pt.x), r1(pt.z), pt.id | 0]; C.sendNow = true; }
      else setOrder(G.myTi, 'focus', pt);
      sfx.order(); bus.emit('shout', { u: p, kind: 'focus' }); bus.emit('hud'); return;
    }
    const cur = G.teams[G.myTi].order || 'follow';
    const o = ORDERS.includes(want) ? want : ORDERS[(ORDERS.indexOf(cur) + 1) % ORDERS.length];
    if (o === cur && o !== 'hold') return;
    if (isClient()) {
      const me = G.teams[G.myTi]; me.order = o; C.inp.ord = o;
      if (o === 'hold') { setOrder(G.myTi, 'hold', pt); const h = me.holdPt; C.inp.hold = [r1(h.x), r1(h.z), r2(h.face)]; C.sendNow = true; } // (kept locally too, for the marker)
    } else setOrder(G.myTi, o, pt);
    sfx.order(); bus.emit('shout', { u: p, kind: o }); // your captain bellows it
    if (o === 'shieldwall') setTimeout(() => bus.emit('fighttip', 'push'), 900);
    bus.emit('hud');
  },
  upgrade(id) {
    if (G.state !== 'play') return;
    const me = G.teams[G.myTi], cost = upgradeCost(G.myTi, id), u = UPGRADES.find(x => x.id === id);
    if (!u) return;
    if (cost == null && id === 'tower') { banner('No watchtower now', 'Two per side, and only in the Crown'); return; }
    if (cost == null && id === 'fort' && G.mode === 'crown') { banner('Nothing to fortify here', 'Stand in the yard of a castle your side holds'); return; }
    if (cost == null) { banner(id === 'arm' ? 'Your armour is whole' : `${u.name} is maxed`, id === 'arm' ? 'Buy it again once it\'s been hacked away' : 'Try another upgrade'); return; }
    if (me.gold < cost) { banner('Not enough gold', `${u.name} costs ${cost} gold`, '#ffcf3a'); return; }
    if (isClient()) {
      C.inp.up[UPGRADES.indexOf(u)]++; me.gold -= cost; if (id !== 'fort' && id !== 'arm' && id !== 'tower') me.up[id]++; C.goldLocalAt = C.upLocalAt = performance.now();
      if (id === 'arm') { me.armBuys = (me.armBuys | 0) + 1; if (G.player) G.player.armour = ARMOUR.hp; sfx.draw(); showMsg('armourOn', [G.myTi]); } else if (id === 'tower') sfx.coin(); else { sfx.coin(); showMsg('upgrade', [G.myTi, id, me.up[id]]); }
    } else buyUpgrade(G.myTi, id);
    bus.emit('hud');
  },
  recruit(kind) {
    if (G.state !== 'play') return;
    const st = STATS[kind], me = G.teams[G.myTi];
    if (!canRecruit(G.myTi)) { banner('No recruits', G.mode === 'dm' ? 'Your team is out of tickets' : 'You need a castle to recruit', '#e0352b'); return; }
    if (squadOf(G.myTi).length >= capOf(G.myTi)) { banner('Army full', `${capOf(G.myTi)} soldiers is your limit${G.mode === 'crown' ? ': take castles and villages for more' : ''}`); return; }
    if (me.gold < st.cost) { banner('Not enough gold', `A ${st.name.toLowerCase()} costs ${st.cost} gold`, '#ffcf3a'); return; }
    if (isClient()) { C.inp.rec[RECRUITS.indexOf(kind)]++; me.gold -= st.cost; C.goldLocalAt = performance.now(); G.recruited++; sfx.coin(); }
    else recruit(G.myTi, kind);
    const p = G.player; if (p) floatText(p.x, p.y + 3, p.z, `${st.name} on the way`, '#fff');
  },
};
