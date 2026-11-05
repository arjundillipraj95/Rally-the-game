// Dev check: a Crown castle you hold, fortified to each level, seen from outside the wall.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#playBtn'); await frames(page, 40);
for (const lv of [0, 1, 3]) {
  await page.evaluate(lv => { const F = window.__fb, G = F.G, p = G.player; const cw = G.layout.cwalls[0], h = G.holds[cw.hid];
    h.owner = G.ALLY[G.myTi]; G.cgates[cw.hid].lv = lv; G.cgates[cw.hid].broken = 0;
    const a = cw.gates[0]; p.x = cw.x + Math.cos(a) * 24; p.z = cw.z + Math.sin(a) * 24; p.face = a + Math.PI; F.cam.yaw = p.face; }, lv);
  await frames(page, 30);
  await page.screenshot({ path: OUT + `fort_lv${lv}.png`, timeout: 120000 });
}
console.log('errors:', errs.slice(0, 3), 'out:', OUT);
await browser.close();
