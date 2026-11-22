// Battle rules: C5f Svinfylkingar, the boar's snout, Sigrun's army ult (card docs/tickets/C5.md). From the full horn:
// her riders within `reach` m form a wedge behind her for `warn` s (the warning, seen by all), then charge `dur` s at
// `spd` m/s the way she aims. Each rider strikes everyone he rides into once for `hit`; a braced spear line doesn't stop
// it; every soldier struck is out of formation `disarray` s (no brace, no shield wall, no guard). Her swordsmen sprint
// in behind (x`sprintX` for `sprint` s). Walls halt the wedge. Numbers on her page (armyUlt). The host runs it; every
// phone sees it from the fxsvin moments (render/sigrunfx.js).
import { G, isEnemy } from '../state.js';
import { groundY } from '../world.js';
import { integrate } from './move.js';
import { hit } from './melee.js';
import { fx } from './util.js';

const live = []; // { u, ti, t, d, men, fx, fz (the snout), dx, dz, face, gone }
export const svinRiders = (u, d) => G.units.filter(o => !o.dead && o.ti === u.ti && o.kind === 'cav' && o.mounted && !o.svin && Math.hypot(o.x - u.x, o.z - u.z) < d.reach);
export function startSvin(u, at, d) {
  const men = svinRiders(u, d); if (!men.length) return false;
  const a = Math.hypot(at.x - u.x, at.z - u.z) > .5 ? Math.atan2(at.x - u.x, at.z - u.z) : u.face, dx = Math.sin(a), dz = Math.cos(a);
  const W = { u, ti: u.ti, t: 0, d, men, fx: u.x - dx * d.gap, fz: u.z - dz * d.gap, dx, dz, face: a, gone: 0, hitBy: new Map() };
  men.forEach((o, i) => { const row = Math.floor(i / 2) + 1, side = i % 2 ? 1 : -1; o.svin = W; o.wSlot = { back: row * d.gap, lat: side * row * d.gap * .8 }; o.foe = null; o.swing = 0; o.charge = 0; });
  for (const o of G.units) if (!o.dead && o.ti === u.ti && o.kind === 'sword' && Math.hypot(o.x - u.x, o.z - u.z) < d.reach) { o.svinRun = W; o.sprintT = G.T + d.warn + d.sprint; } // (her swordsmen: in behind, at a sprint)
  live.push(W);
  fx('fxmsg', { k: 'fxsvin', u, q: [a.toFixed(3), W.fx.toFixed(1), W.fz.toFixed(1), (d.spd * d.dur).toFixed(1), d.warn, d.dur, ...men.map(o => o.id)].join(',') });
  return true;
}
const slotAt = (W, o) => [W.fx - W.dx * o.wSlot.back + W.dz * o.wSlot.lat, W.fz - W.dz * o.wSlot.back - W.dx * o.wSlot.lat];
// where her swordsmen run: just behind the wedge's last row (soldier.js)
export const svinBehind = W => [W.fx - W.dx * (Math.ceil(W.men.length / 2) + 2) * W.d.gap, W.fz - W.dz * (Math.ceil(W.men.length / 2) + 2) * W.d.gap];
// every step: the wedge forms, charges, ends
export function svinTick(dt) {
  for (let i = live.length - 1; i >= 0; i--) {
    const W = live[i], d = W.d; W.t += dt;
    W.men = W.men.filter(o => !o.dead && o.mounted && o.svin === W);
    if (!G.units.includes(W.u)) { live.splice(i, 1); continue; } // (a match ended under it)
    if (!W.men.length || W.t >= d.warn + d.dur) { end(W, i); continue; }
    if (W.t < d.warn) { if (W.u && !W.u.dead) { W.fx = W.u.x - W.dx * d.gap * .5; W.fz = W.u.z - W.dz * d.gap * .5; } } // (forming up behind her)
    else { // the charge: the snout runs on unless a wall stops it
      const step = d.spd * dt, pr = { x: W.fx, z: W.fz, r: .6, ti: W.ti, vx: W.dx * d.spd, vz: W.dz * d.spd, jy: 0 };
      integrate(pr, dt, pr.z); const got = (pr.x - W.fx) * W.dx + (pr.z - W.fz) * W.dz;
      if (got < step * .4) { end(W, i); continue; } W.fx = pr.x; W.fz = pr.z; W.gone += got;
    }
    const k = W.t < d.warn ? Math.min(1, dt * 5) : 1;
    for (const o of W.men) { const [x, z] = slotAt(W, o); o.x += (x - o.x) * k; o.z += (z - o.z) * k; o.y = groundY(o.x, o.z); o.vx = W.t < d.warn ? 0 : W.dx * d.spd; o.vz = W.t < d.warn ? 0 : W.dz * d.spd; o.face = W.face; o.stun = 0; o.swing = 0; }
    if (W.t >= d.warn) for (const o of W.men) strikes(W, o);
  }
}
// a rider meets whoever is in front of him: struck once each, a soldier out of formation (braces don't stop it)
function strikes(W, r) {
  const d = W.d, seen = W.hitBy.get(r.id) || W.hitBy.set(r.id, new Set()).get(r.id);
  for (const o of G.units) {
    if (o.dead || seen.has(o.id) || !isEnemy(r, o) || Math.hypot(o.x - r.x, o.z - r.z) > r.r + (o.r || 0) + .5) continue;
    seen.add(o.id); hit(r, o, 1, { fixed: d.hit, kb: .6, unblockable: true });
    if (!o.leader) { o.unbraceT = G.T + d.disarray; o.disarrayT = G.T + d.disarray; o.shieldwall = false; o.guardUp = false; o.guardT = 0; }
    fx('fxmsg', { k: 'fxsvinhit', u: o, a: r });
  }
}
function end(W, i) {
  live.splice(i, 1);
  for (const o of W.men) if (o.svin === W) { o.svin = null; o.vx *= .4; o.vz *= .4; }
  for (const o of G.units) if (o.svinRun === W) o.svinRun = null;
  if (W.u) fx('fxmsg', { k: 'fxsvinend', u: W.u });
}
export const svinClear = () => { live.length = 0; };
