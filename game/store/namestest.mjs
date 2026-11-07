// Dev check: computer captains have names, and the feed and banners use them ("Demi cut down Monk").
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' });
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
for (let k = 0; k < 12; k++) { await page.evaluate(() => window.__fb.step(30 * 15)); await frames(page, 1); }
console.log(JSON.stringify(await page.evaluate(() => ({ seed: window.__fb.G.seed, feed: [...document.querySelectorAll('#feed .fl')].map(e => e.textContent).slice(0, 8), banner: document.getElementById('msg') && document.getElementById('msg').textContent }))));
await browser.close();
