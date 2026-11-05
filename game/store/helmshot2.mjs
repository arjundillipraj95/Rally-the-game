// Dev check: one helmet from the front, side and back.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const h = +process.argv[2];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
await page.click('#playBtn'); await frames(page, 40);
for (const [n, a] of [['front', Math.PI], ['side', Math.PI / 2], ['back', 0]]) {
  await page.evaluate(([h, a]) => { const F = window.__fb, G = F.G, p = G.player; G.looks[G.myTi] = [h, ...G.looks[G.myTi].slice(1)]; F.cam.yaw = p.face + a; }, [h, a]);
  await frames(page, 14);
  await page.screenshot({ path: OUT + `helm${h}_${n}.png`, clip: { x: 342, y: 150, width: 160, height: 140 }, timeout: 120000 });
}
await browser.close();
