// STRUCT (C5 build, Arjun 23 Nov): every soldier kind hits gates, walls, towers, the nexus and the chest when no man is
// close, as footmen always did. Checks: 4 swordsmen, 4 riders (cav) and 4 footmen by an enemy castle gate, nobody about,
// each group takes gate damage over 5 s; archers still shoot it (unchanged). Needs the game server.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), Wd = await import('/src/core/world.js'), nav = await import('/src/core/nav.js');
  G.T = 30; F.step(30);
  const me = G.myTi, s = G.teams[me], p = s.leader, r = {};
  let gate = null;
  for (const cw of (G.layout && G.layout.cwalls) || []) for (const ob of nav.nearObstacles(cw.x + Math.cos(cw.gates[0]) * cw.r, cw.z + Math.sin(cw.gates[0]) * cw.r)) if (ob.pal && ob.cgate != null && G.cgates && G.cgates[ob.cgate]) { gate = ob; break; }
  if (!gate) return { none: true };
  const h = G.holds[gate.cgate], st = G.cgates[gate.cgate], gi = gate.gi | 0; h.owner = (me + 1) % 4; st.broken = 0; gate.off = false;
  const out = Math.atan2(gate.x - h.x, gate.z - h.z), at = d => [gate.x + Math.sin(out) * d, gate.z + Math.cos(out) * d];
  const keep = G.units; G.units = [p]; p.dead = false; p.march = 0; [p.x, p.z] = at(40); p.y = Wd.groundY(p.x, p.z);
  const run = n => { for (let k = 0; k < n; k++) F.step(1); };
  for (const kind of ['foot', 'sword', 'cav']) {
    G.units = [p]; const grp = [];
    for (let k = 0; k < 4; k++) { const [x, z] = at(2.6); const u = sim.mkUnit(me, x + (k - 1.5) * 1.2, z, kind); u.face = Math.atan2(gate.x - x, gate.z - z); grp.push(u); G.units.push(u); }
    s.order = 'hold'; s.holdPt = { x: grp[0].x, z: grp[0].z };
    st.hp[gi] = 5000; const h0 = st.hp[gi]; run(150); r[kind] = Math.round(h0 - st.hp[gi]);
    G.units = keep;
  }
  // ordered at the gate from 40 m: swordsmen and riders walk up and hit it (the focus rule, buildfocus.js)
  for (const kind of ['sword', 'cav']) {
    G.units = [p]; const grp = [];
    for (let k = 0; k < 4; k++) { const [x, z] = at(40); const u = sim.mkUnit(me, x + (k - 1.5) * 1.2, z, kind); grp.push(u); G.units.push(u); }
    s.order = 'focus'; s.focus = { x: gate.x, z: gate.z }; st.hp[gi] = 5000; const h0 = st.hp[gi]; run(450);
    r['f_' + kind] = Math.round(h0 - st.hp[gi]); r['d_' + kind] = Math.round(Math.hypot(grp[0].x - gate.x, grp[0].z - gate.z));
    G.units = keep;
  }
  G.units = keep; return r;
});
if (o.none) ok(false, 'no castle gate found');
else {
  ok(o.foot > 0, `footmen take the gate (${o.foot} in 5 s, the baseline)`);
  ok(o.sword > 0, `swordsmen take the gate (${o.sword} in 5 s)`);
  ok(o.cav > 0, `riders take the gate (${o.cav} in 5 s)`);
  ok(o.f_sword > 0 && o.d_sword < 6, `ordered at the gate from 40 m, swordsmen walk to ${o.d_sword} m and hit it (${o.f_sword})`);
  ok(o.f_cav > 0 && o.d_cav < 6, `ordered at the gate from 40 m, riders walk to ${o.d_cav} m and hit it (${o.f_cav})`);
}
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
