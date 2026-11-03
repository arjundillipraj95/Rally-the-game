// Dev check: the Crown's river at ground level: your captain at a bridge, looking across.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
await page.click('#playBtn'); await frames(page, 5);
const bi = await page.evaluate(() => window.__fb.G.layout.river.bridges.findIndex(b => b.big));
for (const [i, k] of [[bi, 'bridges'], [1 - bi, 'bridges']]) {
  await page.evaluate(([i, k]) => { const F = window.__fb, G = F.G, p = G.player, b = G.layout.river[k][i]; const a = b.a; p.x = b.x - Math.cos(a) * (k === 'bridges' ? 10 : 11); p.z = b.z - Math.sin(a) * (k === 'bridges' ? 10 : 11); p.face = Math.atan2(Math.cos(a), Math.sin(a)); F.cam.yaw = p.face; G.T = 20; }, [i, k]);
  await frames(page, 30);
  await page.screenshot({ path: OUT + `river_${k}${i === bi ? '_big' : ''}.png`, timeout: 120000 });
}
await browser.close(); console.log('ok');
