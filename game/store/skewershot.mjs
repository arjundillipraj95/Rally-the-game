// Dev check: what the spear's skewer looks like from the game camera, mid-lunge into a column of men.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 5);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (u !== p) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  p.hp = p.max = 1e6; F.weapon('spear'); p.x = X; p.z = Z; p.face = Math.PI / 2; F.cam.yaw = Math.PI / 2 + .45;
  window.__col = [0, 1, 2].map(i => { const u = F.mkUnit(foe, X + 2.6 + i * .95, Z, 'foot'); u.hp = u.max = 1e4; u.face = -Math.PI / 2; u.stun = 99; return u; });
  p.combo = 1; p.swingKind = 3; p.lastSwingT = G.T; p.cd = 0; // (two thrusts already in: the next press is the skewer)
});
await frames(page, 20);
await page.evaluate(() => { const p = window.__fb.G.player; p.lastSwingT = window.__fb.G.T; p.cd = 0; window.__fb.attack(); });
await frames(page, 6);
await page.screenshot({ path: OUT + 'skewer.png', timeout: 120000 });
await browser.close(); console.log('ok');
