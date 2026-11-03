// Dev check: PLAY in Duo starts a free-for-all with two captains a side; the wardrobe shows on your army.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => localStorage.setItem('rally-look', '2222222')); await page.reload(); await page.waitForFunction(() => window.__fb && window.__fb.G);
await page.click('#segFmt button[data-v="1"]');
await page.click('#playBtn'); await frames(page, 20);
const r = await page.evaluate(() => { const G = window.__fb.G; return { state: G.state, mode: G.mode, time: G.time, duo: G.duo.join(','), ally: G.ALLY.join(''), armies: G.teams.filter(t => t.active).length, myLook: G.looks[G.myTi].join(''), others: G.looks.slice(0, 8).map(l => l.join('')) }; });
await page.screenshot({ path: OUT + 'playduo.png' });
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
