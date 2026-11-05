// Dev check: each helmet on the player's captain, seen from the front (cropped).
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#playBtn'); await frames(page, 40);
for (const h of [0, 5, 6, 7, 8, 9, 10, 11, 12]) {
  await page.evaluate(h => { const F = window.__fb, G = F.G, p = G.player; G.looks[G.myTi] = [h, ...G.looks[G.myTi].slice(1)]; F.cam.yaw = p.face + Math.PI; }, h);
  await frames(page, 12);
  await page.screenshot({ path: OUT + `helm_${h}.png`, clip: { x: 332, y: 120, width: 180, height: 170 }, timeout: 120000 });
}
console.log('errors:', errs.slice(0, 3));
await browser.close();
