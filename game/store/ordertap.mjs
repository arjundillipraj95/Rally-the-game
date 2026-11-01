// Dev check: the Order button. A tap steps to the next order; a quick double tap is Follow me.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#goBtn').click(); });
await frames(page, 10);
const b = await page.locator('#cmdBtn').boundingBox(), x = b.x + b.width / 2, y = b.y + b.height / 2;
const tap = async () => { await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.up(); await frames(page, 1); };
const ord = () => page.evaluate(() => window.__fb.G.teams[window.__fb.G.myTi].order);
const seq = [await ord()];
for (let i = 0; i < 3; i++) { await tap(); seq.push(await ord()); await page.waitForTimeout(450); }
await tap(); await page.waitForTimeout(80); await tap(); seq.push('double:' + await ord());
console.log(seq.join(' > '));
await browser.close();
