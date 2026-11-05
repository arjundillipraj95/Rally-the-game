// Dev check: your captain unhurt, then battered (dents, a cracked shield, dull metal), from the front.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
await page.click('#playBtn'); await frames(page, 40);
for (const k of [1, .2]) {
  await page.evaluate(k => { const F = window.__fb, p = F.G.player; p.hp = p.max * k; p.regenT = 1e9; F.cam.yaw = p.face + Math.PI; }, k);
  await frames(page, 8);
  await page.screenshot({ path: OUT + `wear_${k}.png`, clip: { x: 352, y: 150, width: 140, height: 140 } });
}
await browser.close();
