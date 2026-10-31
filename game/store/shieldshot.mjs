// Dev check: what the shield rhythm looks like: the captain squares up to four footmen; shot when
// some have shields up and some down.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 5);
const info = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (u !== p) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; }
  G.teams[foe].leader.dead = true; G.teams[foe].leaderDeadT = 1e9;
  p.x = X; p.z = Z; p.face = Math.PI / 2; p.hp = p.max = 1e7;
  for (let i = 0; i < 4; i++) { const u = F.mkUnit(foe, X + 2.6, Z - 2.4 + i * 1.6, 'foot'); u.face = -Math.PI / 2; }
  G.teams[foe].plan = { kind: 'hunt', target: p }; G.teams[foe].thinkT = 1e9;
  for (let k = 0; k < 200; k++) { F.step(1, 1 / 30, true); const ups = G.units.filter(u => u.ti === foe && !u.dead && u.guardUp).length; if (k > 30 && ups >= 2 && ups <= 3) break; }
  const ens = G.units.filter(u => u.ti === foe && !u.dead), cx = ens.reduce((a, u) => a + u.x, 0) / ens.length, cz = ens.reduce((a, u) => a + u.z, 0) / ens.length;
  const ang = Math.atan2(cx - p.x, cz - p.z), y0 = p.y;
  window.__camAt = [p.x - Math.sin(ang) * 3.4 + Math.cos(ang) * .8, y0 + 3.4, p.z - Math.cos(ang) * 3.4 - Math.sin(ang) * .8, cx, y0 + .9, cz];
  return G.units.filter(u => u.ti === foe && !u.dead).map(u => u.guardUp ? 'UP' : 'down').join(' ');
});
await page.evaluate(() => { window.__fb.G.state = 'play'; }); await frames(page, 2);
await page.screenshot({ path: OUT + 'shields.png', timeout: 120000 }); console.log(await page.evaluate(() => window.__fb.G.units.filter(u => !u.dead && !u.leader).map(u => u.guardUp ? 'UP' : 'down').join(' ')));
console.log(info);
await browser.close();
