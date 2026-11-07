// Dev check: what the mountain looks like: overview from high above, and a captain's-eye view at the start.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 760, 430, { q: '?crown2=1' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
await frames(page, 60);
await page.screenshot({ path: OUT + 'c2_intro.png', timeout: 150000 });
await frames(page, 230);
await page.screenshot({ path: OUT + 'c2_start.png', timeout: 150000 });
await page.evaluate(() => { window.__camAt = [0, 150, 95, 0, 0, 0]; });
await frames(page, 2);
await page.screenshot({ path: OUT + 'c2_over.png', timeout: 150000 });
await browser.close();
