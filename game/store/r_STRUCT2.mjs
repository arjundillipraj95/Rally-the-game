// STRUCT2 (C5 build): soldiers (swordsmen, riders, footmen) hit the nexus and the chest in reach, as they hit gates.
// Checks the nexus takes a sword blow when soldiers stand by it at night (when it can be hit at all). Needs the game server.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), C2 = await import('/src/core/sim/crown2.js');
  G.T = 30; F.step(30);
  const me = G.myTi, s = G.teams[me], p = s.leader, r = {};
  G.c2.phase = 'night'; const NX = await import('/src/core/sim/nexus.js');
  const nex = G.c2.breaks.find(b => b.kind === 'nexus' && !b.post && b.hp > 0 && NX.nexusOpen(b, p));
  if (!nex) return { none: true }; const keep = G.units; G.units = [p]; p.dead = false; p.march = 0; [p.x, p.z] = [nex.x + 40, nex.z];
  const run = n => { for (let k = 0; k < n; k++) F.step(1); };
  for (const kind of ['foot', 'sword', 'cav']) {
    G.units = [p]; const grp = [];
    for (let k = 0; k < 4; k++) { const u = sim.mkUnit(me, nex.x + (k - 1.5) * 1.2, nex.z + (nex.r || 1) + 1.6, kind); u.face = Math.atan2(nex.x - u.x, nex.z - u.z); grp.push(u); G.units.push(u); }
    s.order = 'hold'; s.holdPt = { x: grp[0].x, z: grp[0].z }; nex.hp = 5000; const h0 = nex.hp; run(150); r[kind] = Math.round(h0 - nex.hp);
    G.units = keep;
  }
  G.units = keep; return r;
});
if (o.none) ok(false, 'no nexus found');
else {
  ok(o.foot > 0, `footmen hit the nexus (${o.foot} in 5 s, the baseline)`);
  ok(o.sword > 0, `swordsmen hit the nexus (${o.sword} in 5 s)`);
  ok(o.cav > 0, `riders hit the nexus (${o.cav} in 5 s)`);
}
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
