// Dev check: the home page's Battle tab (teams as colour seats, length, the mode's target), and that a
// solo battle takes its settings: Deathmatch at 100 tickets, 5 minutes, a 2v2 with Trio on Red.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="dm"]');
await page.waitForTimeout(400);
await page.screenshot({ path: OUT + 'menu_battle.png', fullPage: true, timeout: 120000 });
await page.evaluate(() => document.querySelector('#segTime button[data-v="5"]').click());
await page.evaluate(() => document.querySelector('#segTarget button[data-v="100"]').click());
// Red's Duo chip twice -> Trio
await page.evaluate(() => { const t = document.querySelectorAll('#soloSeats .seatcol')[1].querySelector('.duotog'); t.click(); });
await page.evaluate(() => { const t = document.querySelectorAll('#soloSeats .seatcol')[1].querySelector('.duotog'); t.click(); });
await page.evaluate(() => { const g = document.getElementById('soloSeats'); g.scrollIntoView({ block: 'start' }); });
await page.waitForTimeout(300);
await page.screenshot({ path: OUT + 'menu_battle2.png', timeout: 120000 });
await page.evaluate(() => document.getElementById('goBtn').click()); await frames(page, 5);
const r = await page.evaluate(() => { const G = window.__fb.G; return { mode: G.mode, time: G.time, matchSecs: G.time * 60, tickets: G.teams.slice(0, 4).map(t => t.tickets).join(','), ally: G.ALLY.join(''), armies: G.teams.filter(t => t.active).length }; });
console.log(JSON.stringify(r), 'errors:', errs);
await browser.close();
