// FIX6-8 (Arjun 19 Nov): archers on buildings do real damage (~7 an arrow on a gate, x3 with fire); a shut banner (nexus)
// says why; the stone thrower obeys Attack (the gate you point at, even with men about), Follow (keeps up) and backs out
// when too close; Pierce and Volley have icons.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=devi&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), Wd = await import('/src/core/world.js'), nav = await import('/src/core/nav.js'), bus = (await import('/src/core/state.js')).bus;
  G.T = 30; F.step(30);
  const me = G.myTi, s = G.teams[me], p = s.leader, foe = (me + 1) % 4, r = {}; s.lvl = 1;
  const msgs = []; bus.on('msg', m => msgs.push(m.k));
  r.icons = [1, 2, 3].map(k => !!document.querySelector('#ab' + k + ' .abI'));
  let gate = null;
  for (const cw of (G.layout && G.layout.cwalls) || []) { for (const ob of nav.nearObstacles(cw.x + Math.cos(cw.gates[0]) * cw.r, cw.z + Math.sin(cw.gates[0]) * cw.r)) if (ob.pal && ob.cgate != null && G.cgates && G.cgates[ob.cgate]) { gate = ob; break; } if (gate) break; }
  const h = G.holds[gate.cgate], st = G.cgates[gate.cgate], gi = gate.gi | 0; h.owner = G.ALLY[sim.colorOf ? sim.colorOf(foe) : foe] ?? foe; st.broken = 0; gate.off = false;
  h.owner = (await import('/src/core/sim/holds.js')).allianceOf(foe);
  const out = Math.atan2(gate.x - h.x, gate.z - h.z), at = (d, side = 0) => [gate.x + Math.sin(out) * d + Math.cos(out) * side, gate.z + Math.cos(out) * d - Math.sin(out) * side];
  const keep = G.units; G.units = [p]; p.march = 0; [p.x, p.z] = at(40); p.y = Wd.groundY(p.x, p.z);
  const run = (n, f) => { for (let k = 0; k < n; k++) { F.step(1); s.routT = 0; f && f(); } };
  // archers: 4 shoot the gate on their own for 10 s
  const arch = []; for (let k = 0; k < 4; k++) { const [x, z] = at(12, (k - 1.5) * 1.2); arch.push(sim.mkUnit(me, x, z, 'arch')); }
  s.order = 'hold'; s.holdPt = { x: arch[0].x, z: arch[0].z, face: out + Math.PI };
  st.hp[gi] = 5000; let n0 = G.arrowN; run(300); r.arch = { taken: 5000 - st.hp[gi], shots: G.arrowN - n0 };
  for (const u of arch) u.dead = true; G.units = [p];
  // thrower: Attack on the gate while men stand nearer (it picks the gate you pointed at)
  const [tx, tz] = at(20), t = sim.mkUnit(me, tx, tz, 'thrower'); t.face = out + Math.PI;
  const crowd = []; for (let k = 0; k < 5; k++) { const [x, z] = at(12, -8 + k * .5); const m = sim.mkUnit(foe, x, z, 'foot'); m.max = m.hp = 1e5; m.windup = 1e9; crowd.push(m); }
  const pinC = () => { for (const m of crowd) { m.vx = m.vz = 0; } };
  s.order = 'focus'; s.focus = { id: 0, x: gate.x, z: gate.z }; st.hp[gi] = 5000; const stones = new Set();
  run(60 * 12, () => { pinC(); for (const x of G.stones) if (x.bld === gate) stones.add(x.id); });
  r.attack = { atGate: stones.size, men: Math.round(crowd.reduce((n, m) => n + m.max - m.hp, 0)) };
  for (const m of crowd) m.dead = true; G.units = [p, t];
  // too close: Attack on the gate from 4 m: it backs out and throws
  [t.x, t.z] = at(4); stones.clear(); st.hp[gi] = 5000; t.shootCd = 0; t.markT = 0;
  run(60 * 10, () => { for (const x of G.stones) if (x.bld === gate) stones.add(x.id); });
  r.close = { d: +Math.hypot(t.x - gate.x, t.z - gate.z).toFixed(1), stones: stones.size };
  // Follow: its champion stands 35 m off; it keeps up (8 m behind him)
  s.order = 'follow'; s.focus = null; const [fx, fz] = at(45); p.x = fx; p.z = fz; p.face = out;
  run(60 * 40, () => { p.x = fx; p.z = fz; p.vx = p.vz = 0; }); r.follow = +Math.hypot(t.x - p.x, t.z - p.z).toFixed(1);
  // a shut banner: hit by her, says why (once)
  const nx = G.c2.breaks.find(b => b.kind === 'nexus' && G.ALLY[b.c] === h.owner) || G.c2.breaks.find(b => b.kind === 'nexus' && G.ALLY[b.c] !== G.ALLY[colorOfMe()]);
  function colorOfMe() { return me; }
  const C2 = await import('/src/core/sim/crown2.js'); const hp0 = nx.hp; msgs.length = 0;
  const mid = G.holds.find(q => q.kind === 'castle' && q.mid && q.side === nx.c); if (mid) mid.owner = G.ALLY[nx.c];
  C2.c2Hit(p, nx); C2.c2Hit(p, nx); F.step(1);
  r.shut = { hp: nx.hp === hp0, said: msgs.filter(k => k === 'nexusShut').length };
  G.units = keep;
  return r;
});
ok(o.icons.every(Boolean), `icons on all three buttons: ${o.icons}`);
ok(o.arch.taken / o.arch.shots > 4 && o.arch.taken / o.arch.shots < 10, `archers on a gate: ${(o.arch.taken / o.arch.shots).toFixed(1)} an arrow (~7), ${o.arch.shots} arrows`);
ok(o.attack.atGate >= 2, `stone thrower ordered at the gate with men nearer: ${o.attack.atGate} stones on the gate (men took ${o.attack.men})`);
ok(o.close.d >= 10 && o.close.stones >= 1, `too close to the gate: backed out to ${o.close.d} m and threw ${o.close.stones}`);
ok(o.follow < 12, `on Follow it keeps up: ${o.follow} m from its champion`);
ok(o.shut.hp && o.shut.said === 1, `a shut banner: no harm, the reason said once (${o.shut.said})`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
