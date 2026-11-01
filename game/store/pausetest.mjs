// Dev check: the battle menu. Solo: the button opens it and the battle stops; Back resumes; Leave
// returns to the title. Shots of the button in the HUD and of the open panel.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#goBtn'); await frames(page, 20);
await page.screenshot({ path: OUT + 'pause_hud.png', timeout: 120000 });
await page.click('#pauseBtn'); await frames(page, 2);
const t0 = await page.evaluate(() => window.__fb.G.T); await frames(page, 30); const t1 = await page.evaluate(() => window.__fb.G.T);
await page.waitForTimeout(1200); await page.screenshot({ path: OUT + 'pause_open.png', timeout: 120000 });
const note = await page.evaluate(() => document.getElementById('pauseNote').textContent);
await page.click('#resumeBtn'); await frames(page, 30); const t2 = await page.evaluate(() => window.__fb.G.T);
await page.click('#pauseBtn'); await frames(page, 2); await page.click('#quitBtn'); await frames(page, 5);
const after = await page.evaluate(() => ({ state: window.__fb.G.state, title: !document.getElementById('ovTitle').hidden, hud: !document.getElementById('hudWrap').hidden }));
console.log(JSON.stringify({ pausedFor30Frames: +(t1 - t0).toFixed(2), resumed: +(t2 - t1).toFixed(2), note, after }), 'errors:', errs);
await browser.close();
