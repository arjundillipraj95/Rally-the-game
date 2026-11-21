// ARCH2: archers and buildings (every army). On the host, Titus's army. Checks: 4 archers by an enemy castle gate with
// no man about shoot it on their own, at 30% of their blow; with fire arrows, the whole blow; ordered (Attack) at the
// gate from out of bow range, they walk up and shoot it; ordered at a champion among other men, they shoot him; stone
// throwers reach 24 m (Reinforced 30). Needs the game server.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), Wd = await import('/src/core/world.js'), C = await import('/src/config.js'), nav = await import('/src/core/nav.js');
  G.T = 30; F.step(30);
  const me = G.myTi, s = G.teams[me], p = s.leader, r = {};
  let gate = null;
  for (const cw of (G.layout && G.layout.cwalls) || []) { for (const ob of nav.nearObstacles(cw.x + Math.cos(cw.gates[0]) * cw.r, cw.z + Math.sin(cw.gates[0]) * cw.r)) if (ob.pal && ob.cgate != null && G.cgates && G.cgates[ob.cgate]) { gate = ob; break; } if (gate) break; }
  if (!gate) return { none: true };
  const h = G.holds[gate.cgate], st = G.cgates[gate.cgate], gi = gate.gi | 0; h.owner = (me + 1) % 4; st.broken = 0; gate.off = false;
  const out = Math.atan2(gate.x - h.x, gate.z - h.z), at = d => [gate.x + Math.sin(out) * d, gate.z + Math.cos(out) * d];
  const keep = G.units; G.units = [p]; p.dead = false; p.march = 0;
  [p.x, p.z] = at(30); p.y = Wd.groundY(p.x, p.z); // (her captain stands back)
  const arch = []; for (let k = 0; k < 4; k++) { const [x, z] = at(12); const u = sim.mkUnit(me, x + (k - 1.5) * 1.2, z, 'arch'); arch.push(u); }
  const pins = () => { for (const u of arch) u.vx = u.vz = 0; };
  const run = (n) => { for (let k = 0; k < n; k++) { F.step(1); } };
  s.order = 'hold'; s.holdPt = { x: arch[0].x, z: arch[0].z };
  const blow = arch[0].dmg;
  st.hp[gi] = 5000; let h0 = st.hp[gi]; run(150); const n0 = G.arrowN; r.idle = { taken: h0 - st.hp[gi], blow };
  for (const u of arch) u.fireArrows = true;
  h0 = st.hp[gi]; run(150); r.fire = { taken: h0 - st.hp[gi] };
  for (const u of arch) u.fireArrows = false;
  // ordered at the gate from 40 m: they walk up and shoot it
  for (let k = 0; k < 4; k++) { const [x, z] = at(40); arch[k].x = x + (k - 1.5) * 1.2; arch[k].z = z; arch[k].y = Wd.groundY(arch[k].x, arch[k].z); }
  s.order = 'focus'; s.focus = { id: 0, x: gate.x, z: gate.z }; h0 = st.hp[gi]; run(450);
  r.focus = { taken: h0 - st.hp[gi], d: Math.round(Math.hypot(arch[0].x - gate.x, arch[0].z - gate.z)) };
  // ordered at a champion among two men nearer to them (no shields: archers' arrows at men with shields are blocked from the front)
  st.hp[gi] = 5000; const [cx, cz] = at(22), foe = (me + 1) % 4;
  const chp = keep.find(u => u.leader && u.ti === foe && !u.dead) || G.teams[foe].leader; G.units.push(chp); chp.dead = false; chp.x = cx; chp.z = cz; chp.mounted = false; chp.max = chp.hp = 1e5; chp.march = 0; chp.iframeT = 0;
  const men = [-2, 2].map(dx => { const m = sim.mkUnit(foe, cx + dx, cz - 3 * Math.cos(out), 'arch'); m.max = m.hp = 1e5; m.windup = 1e9; return m; });
  for (let k = 0; k < 4; k++) { const [x, z] = at(10); arch[k].x = x + (k - 1.5) * 1.2; arch[k].z = z; }
  s.focus = { id: chp.id, x: chp.x, z: chp.z }; for (const u of [chp, ...men]) u.stun = 1e9; const pinF = [chp, ...men].map(u => [u, u.x, u.z]);
  for (let k = 0; k < 240; k++) { F.step(1); for (const [u, x, z] of pinF) { u.x = x; u.z = z; u.vx = u.vz = 0; } }
  r.champ = { champ: 1e5 - chp.hp, men: men.map(m => 1e5 - m.hp) };
  r.thr = [C.STATS.thrower.range, C.THROWER_TIERS[2].range];
  G.units = keep;
  return r;
});
if (o.none) ok(false, 'no castle gate found');
else {
  ok(o.idle.taken > 20, `on their own, no man about: they shoot the gate (${Math.round(o.idle.taken)} in 5 s; FIX6: ~7 an arrow)`);
  ok(o.fire.taken > o.idle.taken * 1.6, `with fire arrows, x3 an arrow (${Math.round(o.fire.taken)} vs ${Math.round(o.idle.taken)})`);
  ok(o.focus.taken > 0 && o.focus.d < 25, `ordered at the gate from 40 m: they walk to ${o.focus.d} m and shoot it (${Math.round(o.focus.taken)})`);
  ok(o.champ.champ > 0 && o.champ.men.every(v => v === 0), `ordered at a champion: he takes ${Math.round(o.champ.champ)}, the men by him ${o.champ.men.join('/')}`);
}
ok(o.thr[0] === 24 && o.thr[1] === 30, `stone throwers reach ${o.thr[0]} m, Reinforced ${o.thr[1]} m`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
