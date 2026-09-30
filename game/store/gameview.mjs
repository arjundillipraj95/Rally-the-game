// Dev check: what a player actually sees on a phone. Starts a match, marches the captain toward the
// middle with his squad, and shoots the view mid-march and after he stops.
// node store/gameview.mjs <name> <w> <h> <map>
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const [name = 'view', w = 844, h = 390, map = 'valley'] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, +w, +h);
await page.click(`#segMap button[data-v="${map}"]`).catch(() => page.evaluate(m => { document.querySelector('#moreMaps')?.click(); }, map));
await page.click('#goBtn'); await frames(page, 30);
await page.evaluate(() => {
  const F = window.__fb, p = F.G.player;
  const yaw = Math.atan2(-p.x, -p.z); F.cam.yaw = yaw;
  window.__march = true;
  window.__moveOverride = () => window.__march ? { wx: Math.sin(yaw), wz: Math.cos(yaw), mag: 1, camYaw: yaw } : { wx: 0, wz: 0, mag: 0, camYaw: yaw };
});
for (let k = 0; k < 5; k++) await frames(page, 30);
await page.screenshot({ path: `${OUT}${name}_march.png`, timeout: 90000 });
await page.evaluate(() => { window.__march = false; });
for (let k = 0; k < 3; k++) await frames(page, 30);
await page.screenshot({ path: `${OUT}${name}_stop.png`, timeout: 90000 });
await browser.close();
console.log('ok');
