// Battle rules: C2 the stone thrower (design doc, Units table; numbers in config STONE and THROWER_TIERS). A slow siege
// engine that takes five army places. It can't hit within STONE.min m; out to its range it lobs a stone in a high arc
// to where its mark stood (a marker on the ground the whole flight), so movers walk out of it and standing lines and
// shield walls take it: the thrower's damage at the centre, a third at the rim, a testudo half. Gates and walls take
// STONE.gate times; the war chest STONE.chest blows; never the glacier. Fire pots (tier 1+): every third stone burns the
// ground a while; anyone of the other sides inside takes STONE.fire.dps a second and a braced line loses its brace.
// Orders: Follow, it trundles STONE.follow m behind its champion; Hold, behind the held spot; Charge, it closes on its
// mark. On every order it throws at the biggest crowd in range (STONE.crowd men), else the nearest gate, else anyone.
import { STONE, FORT } from '../../config.js';
import { G, isEnemy } from '../state.js';
import { groundY } from '../world.js';
import { fx, sound, spark } from './util.js';
import { horseDamage } from './army.js';
import { aiDmg } from './melee.js';
import { soak } from './duel.js';
import { drumDmg } from './buffs.js';
import { champHit } from './turret.js';
import { takenX } from './eagle.js';
import { faceTo, go, moveToward } from './move.js';
import { speedOf } from './army.js';
import { wallInRange } from './ranged.js';
import { die, hitWall, c2Hit } from './step.js'; // (later files: through the entry)

const near = (a, x, z) => Math.hypot(a.x - x, a.z - z);
// its mark: the biggest crowd of enemies in range (counted round each), else the nearest gate, else the chest or a nexus
function pickMark(u, charge) {
  const R = u.range, foes = G.units.filter(o => !o.dead && isEnemy(o, u) && !o.march);
  let best = null, bn = 0;
  for (const o of foes) {
    const d = near(o, u.x, u.z); if (d < STONE.min || d > R) continue;
    let n = 0; for (const q of foes) if (near(q, o.x, o.z) < STONE.area) n++;
    if (n > bn || (n === bn && best && d < near(best, u.x, u.z))) { bn = n; best = o; }
  }
  const gate = wallInRange(u, R, STONE.min);
  if (gate && (charge || bn < STONE.crowd)) return { x: gate.x, z: gate.z, bld: gate };
  if (best) return { x: best.x, z: best.z, u: best };
  if (gate) return { x: gate.x, z: gate.z, bld: gate };
  for (const b of (G.c2 && G.c2.breaks) || []) {
    if (b.post || b.hp <= 0 || (b.kind !== 'chest' && b.kind !== 'nexus')) continue;
    const d = near(b, u.x, u.z); if (d >= STONE.min && d <= R) return { x: b.x, z: b.z, brk: b };
  }
  return null;
}
// each step, for a thrower (from the soldier's step): stand where its order puts it, turn to its mark, throw
export function throwerStep(u, s, L, order, leaderUp, dt) {
  u.markT = (u.markT || 0) - dt;
  if (u.markT <= 0) { u.markT = .5; u.mark = pickMark(u, order === 'charge' || order === 'focus'); }
  const m = u.mark && (u.mark.u ? (u.mark.u.dead ? null : { ...u.mark, x: u.mark.u.x, z: u.mark.u.z }) : u.mark);
  const md = m ? near(m, u.x, u.z) : 1e9, inRange = m && md >= STONE.min && md <= u.range;
  if ((order === 'charge' || order === 'focus') && m && md > u.range * .9) go(u, m.x, m.z, speedOf(u), dt, u.range * .85);
  else if (order === 'hold' && s.holdPt && !inRange) { const H = s.holdPt, f = H.face || 0; go(u, H.x - Math.sin(f) * 6, H.z - Math.cos(f) * 6, speedOf(u), dt, 1); }
  else if (leaderUp && !inRange && order === 'follow') { const f = L.face; go(u, L.x - Math.sin(f) * STONE.follow, L.z - Math.cos(f) * STONE.follow, speedOf(u), dt, 2); }
  else moveToward(u, u.x, u.z, 0, dt);
  if (!inRange) return;
  faceTo(u, m.x, m.z, dt, 1.5);
  const want = Math.atan2(m.x - u.x, m.z - u.z), off = Math.abs(Math.atan2(Math.sin(want - u.face), Math.cos(want - u.face)));
  if (u.shootCd <= 0 && u.stun <= 0 && off < .2) throwStone(u, m);
}
function throwStone(u, m) {
  u.stones = (u.stones | 0) + 1;
  const fire = !!u.fire && u.stones % STONE.fireEvery === 0;
  G.stones.push({ id: ++G.stoneN, x0: u.x, z0: u.z, y0: (u.y || 0) + 2.6, x1: m.x, z1: m.z, t: 0, ti: u.ti, sh: u, dmg: u.dmg, fire, bld: m.bld || null, brk: m.brk || null });
  u.shootCd = u.shootBase; u.throwT = G.T; sound('heavy', u.x, u.z);
}
// each step: the stones in the air (a joined phone flies its copies, the host lands them)
export function stonesTick(dt, authoritative) {
  for (let i = G.stones.length - 1; i >= 0; i--) {
    const st = G.stones[i]; st.t += dt / STONE.flight;
    if (st.t < 1) continue;
    G.stones.splice(i, 1);
    if (authoritative) land(st); else { (G.stoneLanded || (G.stoneLanded = new Set())).add(st.id); sound('wall', st.x1, st.z1); // (a joined phone: landed here, not to come back with a late snapshot)
      spark(st.x1, groundY(st.x1, st.z1) + .4, st.z1, '#8a7a66', 10); }
  }
  if (!authoritative) return;
  for (let i = G.fires.length - 1; i >= 0; i--) {
    const f = G.fires[i]; if (G.T > f.until) { G.fires.splice(i, 1); continue; }
    for (const b of G.units) {
      if (b.dead || !isEnemy(b, f) || near(b, f.x, f.z) > f.r) continue;
      b.unbraceT = G.T + .3; // (a braced line in the fire loses its brace)
      hurt(b, STONE.fire.dps * dt, f.sh, f.ti, 'fire');
    }
  }
}
function land(st) {
  const { x1: x, z1: z } = st; sound('wall', x, z); spark(x, groundY(x, z) + .4, z, '#8a7a66', 12);
  fx('fxmsg', { k: 'fxstone', x, z });
  const proxy = { ti: st.ti, leader: false, x, z, r: .5, dmg: st.dmg * STONE.gate / FORT.wallDmg };
  if (st.bld) hitWall(proxy, st.bld); // (gates and walls: STONE.gate times the stone)
  if (st.brk) { proxy.dmg = st.dmg * STONE.gate; for (let k = 0; k < (st.brk.kind === 'chest' ? STONE.chest : 1); k++) c2Hit(proxy, st.brk); }
  for (const b of G.units) {
    if (b.dead || !isEnemy(b, { ti: st.ti }) || b.march) continue;
    const d = near(b, x, z); if (d > STONE.area + (b.r || .5) * .5) continue;
    const k = 1 - (1 - STONE.edge) * Math.min(1, d / STONE.area);
    hurt(b, st.dmg * k * aiDmg(st.ti) * drumDmg(st.ti), st.sh, st.ti, 'stone');
  }
  if (st.fire) G.fires.push({ id: ++G.stoneN, x, z, r: STONE.fire.r, until: G.T + STONE.fire.life, ti: st.ti, sh: st.sh });
}
// a stone's (or the fire's) damage on one man: the testudo halves it, a mounted champion's horse takes it
// (C4: Devi's shots use it too, with testudo = 1)
export function hurt(b, dmg, sh, ti, cause, testudo = STONE.testudo) {
  if (b.testudo) dmg *= testudo;
  if (b.iframeT > 0 || b.execT > 0) return;
  if (b.mounted) { horseDamage(b, dmg); return; }
  if (b.leader && b.armour > 0) dmg = soak(b, dmg, true);
  if (sh && !sh.dead) champHit(sh, b);
  dmg *= takenX(b);
  b.hp -= dmg; b.lastHit = G.T;
  if (b.hp <= 0) { b.howBy = cause; die(b, sh && !sh.dead ? sh : { ti, human: false, leader: false }, Math.random() * 6.28); }
}
