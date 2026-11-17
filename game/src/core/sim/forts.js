// Battle rules: forts, castle and plaza gates, walls, towers.
import { CROWN, FORT, CASTLE26 } from '../../config.js';
import { G, isEnemyTi, colorOf, activeArmies, noCastle } from '../state.js';
import { groundY, rnd, angDiff } from '../world.js';
import { nearObstacles, setPalSeg } from '../nav.js';
import { fx, say, sound, spark } from './util.js';
import { aiDmg, nearestFoe } from './melee.js';
import { shoot } from './missiles.js';
import { turretTarget, turretShot, volleyOn } from './turret.js';
import { attacked, siegeOn } from './siege.js';
import { allianceOf, c2BreakInReach, c2Hit } from './step.js'; // (later files: through the entry, so files still load in the old order)

// ---------- Fortify: a castle's palisade and gate towers ----------
// Each castle's state: which sections are broken (a bitmask) and how much each has left. The level
// is the castle army's 'fort' upgrade. Every phone applies the same thing (applyFort) to the
// obstacles, the arrow blockers and the walking grid.
export function initForts() {
  G.forts = [0, 1, 2, 3].map(() => ({ broken: 0, hp: [...new Array(FORT.segs).fill(FORT.segHp), FORT.gateHp, FORT.gateHp], towerT: rnd(0, FORT.towerEvery) }));
  const start = (G.layout && G.layout.fortStart) || 0;
  for (let c = 0; c < 4; c++) { if (G.teams[c]) G.teams[c].up.fort = noCastle(c) ? 0 : start; applyFort(c); }
}
export const fortLvl = c => (G.teams[c] && G.teams[c].up && G.teams[c].up.fort) || 0;
export function applyFort(c) {
  const P = G.layout && G.layout.pal && G.layout.pal[c], f = G.forts && G.forts[c]; if (!P || !f) return;
  const lv = fortLvl(c), on = k => lv >= (k >= FORT.segs ? 2 : 1) && !((f.broken >> k) & 1); // (the gates come with the second level)
  for (const o of P.obs) o.off = !on(o.k);
  for (const b of P.blk) b.off = !on(b.k);
  for (let k = 0; k < FORT.segs; k++) setPalSeg(c + ':' + k, on(k));
}
// The Crown's castle gates: shut against the castle's enemies (its own side walks through, see integrate), open when
// broken, at level 0, or when nobody holds the castle. (CASTLE1) A gate is layers: fortify adds one to every gate,
// damage never heals (no mending), and every layer is CASTLE26.plates plates, each paying the side that knocks it off.
export const plateHp = gi => (gi === 0 || gi === 3 ? CASTLE26.plate.big : CASTLE26.plate.small); // (the lane gate and the middle castle's back gate are the big ones)
export const layerHp = (gi, n = 0) => plateHp(gi) * CASTLE26.layerPlates[Math.min(n, CASTLE26.layerPlates.length - 1)]; // (the layer level n+1 adds)
export const gateHp = (gi, lv = 0) => { let t = 0; for (let n = 0; n < (lv | 0); n++) t += layerHp(gi, n); return t; }; // (a fresh gate at level lv)
export const GATES = [0, 1, 2, 3]; // (GATE1: up to four gates a castle: the middle castle's back gate is the fourth)
// a castle's gates at level lv, untouched: lv layers each, or open (broken) at level 0. paid: plates already paid for, a gate
export const freshGates = (lv = 0) => ({ hp: GATES.map(gi => gateHp(gi, lv)), max: GATES.map(gi => gateHp(gi, lv)), paid: [0, 0, 0, 0], broken: lv ? 0 : 15, lv: lv | 0, towerT: 0 });
// a gate's health, 0 to 1 (GATE1: its bar)
export const gatePct = (st, gi) => (st.max && st.max[gi] > 0 ? Math.max(0, Math.min(1, (st.hp[gi] ?? 0) / st.max[gi])) : 0);
// Fortify: one more level, one more layer on every gate (a broken one shuts again); what was knocked off stays off
export function fortifyGates(st) {
  const n = st.lv | 0; st.lv = n + 1;
  for (const gi of GATES) { const L = layerHp(gi, n); st.hp[gi] = Math.max(0, st.hp[gi] || 0) + L; st.max[gi] = (st.max[gi] || 0) + L; st.broken &= ~(1 << gi); }
  applyCastleGates();
}
// the mountain: the village of his side's a captain stands in (for its palisade)
export function villageHere(ti) {
  const L = (ti === G.myTi && G.player) || (G.teams[ti] && G.teams[ti].leader); if (!L || L.dead) return null;
  const a = G.ALLY[colorOf(ti)]; return (G.holds || []).find(h => h.kind === 'village' && h.owner === a && Math.hypot(L.x - h.x, L.z - h.z) < h.r) || null;
}
// the Crown castle (wall and yard) a captain is standing in, if his side holds it
export function castleHere(ti) {
  const L = (ti === G.myTi && G.player) || (G.teams[ti] && G.teams[ti].leader); if (!L || L.dead || !G.layout || !G.layout.cwalls) return null;
  const a = G.ALLY[colorOf(ti)];
  return G.layout.cwalls.find(cw => G.holds[cw.hid] && G.holds[cw.hid].owner === a && Math.hypot(L.x - cw.x, L.z - cw.z) < cw.r) || null;
}
// Fortify: the castle's wall archers (CASTLE26.archers by level, on its corner towers) shoot as one League turret
// (CASTLE3, turret.js): one target, the same volley from every archer, ramping on a champion who stays in range
export function castleTowersTick(dt) {
  if (G.role === 'client') return;
  for (const cw of G.layout.cwalls || []) {
    const st = G.cgates[cw.hid], h = G.holds[cw.hid]; if (!st || !(st.lv | 0) || !h || h.owner < 0) continue;
    const lv = Math.min(st.lv | 0, CASTLE26.archers.length - 1);
    st.towerT = (st.towerT || 0) - dt; if (st.towerT > 0) continue;
    const ti = activeArmies().find(i => allianceOf(i) === h.owner); if (ti == null) { st.towerT = 1; continue; }
    const e = turretTarget(cw, h, st); if (!e) { st.towerT = .3; st.tg = null; continue; }
    if (e.leader) attacked(h, allianceOf(e.ti)); // (CASTLE5: a champion at the walls)
    st.towerT = CASTLE26.every[lv]; const m = volleyOn(st, e), T = CASTLE26.turret, dmg = (e.leader ? T.champ * m : T.soldier);
    for (let k = 0; k < CASTLE26.archers[lv]; k++) { const b = h.towerA0 + k * Math.PI / 2, x = h.x + Math.cos(b) * 9.5, z = h.z + Math.sin(b) * 9.5;
      turretShot(x, groundY(x, z) + 5, z, ti, e, dmg, false, cw); }
  }
}
export function applyCastleGates() {
  for (const cw of (G.layout && G.layout.cwalls) || []) {
    const st = G.cgates && G.cgates[cw.hid], h = G.holds && G.holds[cw.hid], empty = !h || h.owner < 0;
    const open = gi => empty || !st || ((st.broken >> gi) & 1);
    for (const o of cw.obs) if (o.cgate != null) o.off = open(o.gi);
    for (const b of cw.blk) if (b.cgate != null) b.off = open(b.gi);
  }
}
function hitCastleGate(u, w) {
  const st = G.cgates[w.cgate], h = G.holds[w.cgate], gi = w.gi | 0; if (!st || (st.broken >> gi) & 1 || !h || h.owner < 0 || h.owner === allianceOf(u.ti)) return;
  attacked(h, allianceOf(u.ti)); // (CASTLE5)
  if (u.leader && G.teams[u.ti]) G.teams[u.ti].siegeAt = { x: w.x, z: w.z, T: G.T }; // (CASTLE10: his men come and help)
  st.hitT = G.T; st.hp[gi] -= u.dmg * FORT.wallDmg * (u.leader ? FORT.capWall : 1) * aiDmg(u.ti);
  sound('wall', w.x, w.z); spark(w.x, groundY(w.x, w.z) + 1.4, w.z, '#a3825a', 4);
  platesTick(st, gi, u, w.cgate);
  if (st.hp[gi] <= 0) { st.hp[gi] = 0; st.broken |= 1 << gi; applyCastleGates(); say('castleGate', h.owner, u.ti, w.cgate, gi); fx('fxmsg', { k: 'fxgate', u, ti: -1 }); fx('netFlush'); }
}
// (CASTLE1) every plate knocked off a gate pays each army of the side that broke it, once
function platesTick(st, gi, u, hid) {
  const n = Math.floor((st.max[gi] - Math.max(0, st.hp[gi])) / plateHp(gi) + 1e-6), a = allianceOf(u.ti); if (a < 0) return;
  st.paid = st.paid || [0, 0, 0, 0];
  if ((st.paid[gi] | 0) < n) siegeOn(G.holds[hid], a); // (CASTLE5: a plate down: a siege)
  while ((st.paid[gi] | 0) < n) { st.paid[gi] = (st.paid[gi] | 0) + 1; for (const i of activeArmies()) if (allianceOf(i) === a && G.teams[i]) G.teams[i].gold += CASTLE26.plateGold;
    say('gatePlate', a, u.ti, hid, gi, CASTLE26.plateGold); if (colorOf(u.ti) === colorOf(G.myTi)) sound('coin'); }
}
// The plaza's wall (the Crown, from 9:00): down until it rises; a broken gate lets everyone through.
export function applyPlazaWall() {
  const P = G.layout && G.layout.plazaWall, W = G.plazaWall; if (!P) return;
  const up = !!(W && W.up), on = o => up && !(o.plazaGate != null && (W.broken >> o.plazaGate) & 1);
  for (const o of P.obs) o.off = !on(o);
  for (const b of P.blk) b.off = !on(P.obs.find(o => o.x === b.x && o.z === b.z) || {});
  setPalSeg('pw', up); for (let k = 0; k < 4; k++) setPalSeg('pg' + k, up && !((W.broken >> k) & 1));
}
function hitPlazaGate(u, w) {
  const W = G.plazaWall, k = w.plazaGate; if (G.c2 || !W || !W.up || (W.broken >> k) & 1) return;
  W.hp[k] -= u.dmg * FORT.wallDmg * (u.leader ? FORT.capWall : 1) * aiDmg(u.ti);
  sound('wall', w.x, w.z); spark(w.x, groundY(w.x, w.z) + 1.4, w.z, '#a3825a', 4);
  if (W.hp[k] <= 0) { W.broken |= 1 << k; applyPlazaWall(); say('plazaGate', k, u.ti); fx('fxmsg', { k: 'fxgate', u, ti: -1 }); fx('netFlush'); }
}
// the nearest unbroken plaza gate to a point (for a computer captain outside the wall)
export function plazaGateFor(x, z) {
  const P = G.layout && G.layout.plazaWall, W = G.plazaWall; if (!P || !W || !W.up) return null;
  if (W.broken) return null; // (one's down: the way in is open, the pathfinder takes them there)
  let best = null, bd = 1e9; for (const o of P.obs) if (o.plazaGate != null) { const d = Math.hypot(o.x - x, o.z - z); if (d < bd) { bd = d; best = o; } }
  return best;
}
export const insidePlaza = u => Math.hypot(u.x, u.z) < CROWN.wallR - 1;
// the nearest standing section of an enemy palisade within a man's reach, in front of him
export function wallInReach(u, cone = 1.3) {
  let best = null, bd = 1e9;
  for (const o of nearObstacles(u.x, u.z)) {
    if (!o.pal || o.off || o.plazaWall || (G.c2 && o.plazaGate != null) || (o.cgate != null && G.holds[o.cgate].owner === allianceOf(u.ti)) || (o.plazaGate == null && o.cgate == null && !isEnemyTi(o.c, u.ti))) continue;
    const d = Math.hypot(o.x - u.x, o.z - u.z); if (d > u.r + o.r + u.reach + .4 || d > bd) continue;
    if (Math.abs(angDiff(u.face, Math.atan2(o.x - u.x, o.z - u.z))) > cone) continue;
    bd = d; best = o;
  }
  return best;
}
export function hitWall(u, w) {
  if (w.plazaGate != null) return hitPlazaGate(u, w);
  if (w.cgate != null) return hitCastleGate(u, w);
  const f = G.forts[w.c]; if (!f || fortLvl(w.c) < 1 || ((f.broken >> w.k) & 1)) return;
  f.hp[w.k] -= u.dmg * FORT.wallDmg * (u.leader ? FORT.capWall : 1) * aiDmg(u.ti);
  sound('wall', w.x, w.z); spark(w.x, groundY(w.x, w.z) + 1.4, w.z, '#a3825a', 4);
  if (f.hp[w.k] <= 0) { f.broken |= 1 << w.k; applyFort(w.c); if (w.k >= FORT.segs) { say('gateBroken', w.c, u.ti); fx('fxmsg', { k: 'fxgate', u, ti: w.c }); fx('netFlush'); } else say('breach', w.c, u.ti); }
}

// ---------- the Crown: the ten minutes' phases, and the Crown itself ----------
// At 9:00 it appears in the plaza in a stone casing: men standing in the plaza wear the casing down
// (any side's). Once it's free, a captain on foot picks it up by touching it; it's dropped where he
// falls. Whoever's side carries it at 10:00 wins; while enemies are close to the carrier the battle
// runs on (overtime), up to a minute. Nobody carrying it at the end: the side holding most places.
export function towersTick(dt) {
  for (let i = G.wtowers.length - 1; i >= 0; i--) {
    const w = G.wtowers[i]; if (w.build < 1) w.build = Math.min(1, w.build + dt / CROWN.tower.build);
    // built: a volley at the nearest enemy in bow range (enough to see off a lone soldier, not an army)
    if (w.build >= 1 && w.hp > 0 && G.role !== 'client') { w.shootCd = (w.shootCd ?? rnd(.5, 2)) - dt;
      if (w.shootCd <= 0) { const T0 = CROWN.tower, [e] = nearestFoe({ x: w.x, z: w.z, ti: w.ti }, T0.range); w.shootCd = e ? T0.every : .5;
        if (e) for (let k = 0; k < T0.volley; k++) { shoot({ x: w.x + rnd(-.3, .3), z: w.z + rnd(-.3, .3), y: groundY(w.x, w.z), vx: 0, vz: 0, ti: w.ti, tower: true, arrow: T0.arrow, jitter: T0.jitter }, e, 5.5); G.arrows[G.arrows.length - 1].plunge = true; } } }
    if (w.hp <= 0) { G.wtowers.splice(i, 1); say('towerDown', w.ti, w.by ?? -1); fx('fxmsg', { k: 'fxgate', u: { x: w.x, y: groundY(w.x, w.z), z: w.z }, ti: -1 }); fx('netFlush'); }
  }
}
export function hitTower(u, w) { if (w && w.brk) return c2Hit(u, w); if (!w || w.hp <= 0 || G.ALLY[colorOf(u.ti)] === w.a) return; w.hp -= u.dmg * FORT.wallDmg * 2 * (u.leader ? FORT.capWall : 1); w.by = u.ti; sound('wall', w.x, w.z); spark(w.x, groundY(w.x, w.z) + 2, w.z, '#a3825a', 4); }
export const towerInReach = u => (G.wtowers || []).find(w => w.a !== G.ALLY[colorOf(u.ti)] && Math.hypot(w.x - u.x, w.z - u.z) < u.r + u.reach + CROWN.tower.reach * .6) || (G.c2 ? c2BreakInReach(u) : null);
// (ORD1) is there still a gate (unbroken, of a held castle) or a breakable (the chest, a nexus, the glacier) at this spot?
export function structureStands(x, z) {
  for (const cw of (G.layout && G.layout.cwalls) || []) { const st = G.cgates && G.cgates[cw.hid], h = G.holds && G.holds[cw.hid]; if (!st || !h || h.owner < 0) continue;
    for (let gi = 0; gi < cw.gates.length; gi++) if (!((st.broken >> gi) & 1) && Math.hypot(cw.x + Math.cos(cw.gates[gi]) * cw.r - x, cw.z + Math.sin(cw.gates[gi]) * cw.r - z) < 3) return true; }
  return ((G.c2 && G.c2.breaks) || []).some(b => !b.post && b.hp > 0 && Math.hypot(b.x - x, b.z - z) < b.r + 2);
}
