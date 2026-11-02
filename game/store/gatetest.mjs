// Dev check: Fortify's gates. Your men walk out through your own gate; an enemy band charging your
// castle is held at it until they hack it down (GATE BROKEN); then mend it from Upgrades.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 320);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMode button[data-v="conquest"]').click(); document.querySelector('#segMap button[data-v="dunes"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, s = G.teams[me], out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const t of G.teams) { t.recruitT = 1e9; t.thinkT = 1e9; if (t.leader && t.leader !== p) { t.leader.x = 0; t.leader.z = 0; t.leader.stun = 1e9; } }
  s.gold = 1000; F.upgrade('fort'); F.upgrade('fort');
  const pal = G.layout.pal[me], gate = pal.gates[0], c = G.layout.obstacles.find(o => o.castle && Math.hypot(o.x - p.x, o.z - p.z) < 40);
  const at = (a, d) => [c.x + Math.cos(a) * d, c.z + Math.sin(a) * d];
  out.level = G.teams[me].up.fort; out.doors = G.layout.obstacles.filter(o => o.door && o.c === me && !o.off).length;
  // your man walks out: captain outside the gate, a footman inside it
  const [ox, oz] = at(gate, 30), [ix, iz] = at(gate, 16); p.x = ox; p.z = oz; p.stun = 1e9;
  const m = F.mkUnit(me, ix, iz, 'foot'); F.step(240, 1 / 30);
  out.ownManOut = +Math.hypot(m.x - c.x, m.z - c.z).toFixed(1);
  // an enemy band charges the castle from outside that gate
  m.dead = true; G.units = G.units.filter(u => !u.dead); p.x = 300; p.z = 300;
  for (const t of G.teams) if (t.leader && t.leader !== p) t.leader.x = 300;
  const band = []; for (let i = 0; i < 8; i++) { const [x, z] = at(gate, 30 + i % 3); band.push(F.mkUnit(foe, x + (i % 4), z + (i >> 2), 'foot')); }
  G.teams[foe].plan = { kind: 'castle', ti: me }; G.teams[foe].order = 'charge';
  let t = 0, inside = 0; const f = G.forts[me];
  for (; t < 90 && !((f.broken >> 12) & 3); t++) { F.step(30, 1 / 30); G.teams[foe].plan = { kind: 'castle', ti: me }; inside = Math.max(inside, band.filter(u => !u.dead && Math.hypot(u.x - c.x, u.z - c.z) < 20).length); }
  out.gateFellAfter = t; out.insideBeforeItFell = inside; out.broken = (f.broken >> 12) & 3;
  const g0 = s.gold; F.upgrade('fort'); out.repair = { paid: g0 - s.gold, broken: (f.broken >> 12) & 3 };
  return out;
});
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
