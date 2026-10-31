// Dev check: the rally horn from the player's seat: the glowing button, then the roar.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 20);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.teams[i].active && G.ALLY[i] !== G.ALLY[me]);
  const mine = G.units.filter(u => !u.dead && u.ti === me && !u.leader), theirs = G.units.filter(u => !u.dead && u.ti === foe && !u.leader);
  p.x = 0; p.z = 0; p.face = 0; F.cam.yaw = 0;
  mine.forEach((u, i) => { u.x = (i % 5) * 1.5 - 3; u.z = 2 + Math.floor(i / 5) * 1.5; u.face = 0; }); theirs.forEach((u, i) => { u.x = (i % 5) * 1.5 - 3; u.z = 9 + Math.floor(i / 5) * 1.5; u.face = Math.PI; });
  G.teams[me].rally = 100; G.teams[me].morale = 34;
  window.__moveOverride = () => ({ wx: 0, wz: 0, mag: 0, camYaw: 0 });
});
await frames(page, 15); await page.screenshot({ path: OUT + 'rally_ready.png' });
await page.evaluate(() => window.__fb.rally()); await frames(page, 6); await page.screenshot({ path: OUT + 'rally_roar.png' });
await browser.close(); console.log('ok');
