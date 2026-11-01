// Dev check: the order fan. Tap Order: the fan opens; tap Charge in it: the order is Charge. Shot of it open.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { window.__fanStay = 1; document.querySelector('#goBtn').click(); });
await frames(page, 20);
const b = await page.locator('#cmdBtn').boundingBox();
await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); await page.mouse.up();
await frames(page, 5);
const fan = await page.evaluate(() => { const f = document.getElementById('ordFan'); return { open: !f.hidden, items: [...f.querySelectorAll('button')].map(x => x.textContent + (x.classList.contains('cur') ? '*' : '')) }; });
await page.screenshot({ path: OUT + 'fan.png', timeout: 120000 });
console.log('fan', JSON.stringify(fan), JSON.stringify(await page.evaluate(() => { const f = document.getElementById('ordFan'), cs = getComputedStyle(f), r = f.getBoundingClientRect(); return { r: [r.x, r.y, r.width, r.height], disp: cs.display, pos: cs.position, left: f.style.left, bottom: f.style.bottom, kids: f.children.length }; }))); const c = await page.locator('#ordFan button[data-o="charge"]').boundingBox();
await page.mouse.move(c.x + c.width / 2, c.y + c.height / 2); await page.mouse.down(); await page.mouse.up();
await frames(page, 3);
const after = await page.evaluate(() => ({ order: window.__fb.G.teams[window.__fb.G.myTi].order, fanOpen: !document.getElementById('ordFan').hidden }));
console.log(JSON.stringify(fan), JSON.stringify(after));
await browser.close();
