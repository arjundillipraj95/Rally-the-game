// Dev shot: a 3-castle battle's opening (the HUD and minimap with a castle out).
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { document.querySelector('#segMap button[data-v="valley"]').click(); for (let k = 0; k < 3; k++) document.querySelectorAll('#soloSeats .seatcol')[3].querySelector('.duotog').click(); });
await page.screenshot({ path: OUT + 'out-menu.png', timeout: 120000 });
await page.evaluate(() => document.querySelector('#goBtn').click());
await frames(page, 30);
await page.screenshot({ path: OUT + 'out-play.png', timeout: 120000 });
await browser.close();
