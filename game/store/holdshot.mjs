// Dev check: the hold gesture from the player's view: drag from the order button, then the line formed.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 20);
await page.evaluate(() => { const F = window.__fb, p = F.G.player; F.cam.yaw = Math.atan2(-p.x, -p.z); });
for (let k = 0; k < 3; k++) await frames(page, 20);
const b = await page.locator('#cmdBtn').boundingBox();
await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down();
await page.mouse.move(b.x + b.width / 2 - 20, b.y - 60, { steps: 4 }); await page.mouse.move(470, 190, { steps: 6 });
await frames(page, 4); await page.screenshot({ path: OUT + 'hold_drag.png' });
await page.mouse.up();
for (let k = 0; k < 4; k++) await frames(page, 30);
await page.screenshot({ path: OUT + 'hold_formed.png' });
console.log(await page.evaluate(() => { const G = window.__fb.G, me = G.teams[G.myTi]; return JSON.stringify({ order: me.order, pt: me.holdPt && [me.holdPt.x.toFixed(1), me.holdPt.z.toFixed(1), me.holdPt.face.toFixed(2)], holding: G.units.filter(u => !u.dead && u.ti === G.myTi && u.holding).length }); }));
await browser.close();
