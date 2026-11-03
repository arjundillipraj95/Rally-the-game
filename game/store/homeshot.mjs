// Dev check: the home stage, the wardrobe (with a changed outfit), and the Battle the computer sheet.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const W = +(process.argv[2] || 844), H = +(process.argv[3] || 390);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, W, H, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await frames(page, 30);
await page.screenshot({ path: OUT + 'home.png', timeout: 120000 });
await page.click('#wardBtn'); await frames(page, 10);
for (const [c, v] of [['helm', 1], ['emblem', 1], ['cape', 1], ['face', 2], ['emblem', 1]]) { await page.click(`.wcats [data-c="${c}"]`); await page.click(`.witem[data-i="${v}"]`); }
await frames(page, 40);
await page.screenshot({ path: OUT + 'ward.png', timeout: 120000 });
await page.click('#wardDone'); await page.click('#cpuBtn'); await frames(page, 30);
await page.screenshot({ path: OUT + 'cpusheet.png', timeout: 120000 });
await page.click('#sheetBack'); await page.click('#setBtn'); await frames(page, 10);
await page.screenshot({ path: OUT + 'setsheet.png', timeout: 120000 });
const look = await page.evaluate(() => localStorage.getItem('rally-look'));
console.log('look', look, 'errors:', errs.slice(0, 3));
await browser.close();
