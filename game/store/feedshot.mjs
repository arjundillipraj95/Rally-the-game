// Dev check: the side feed and herald during a computer-run battle, and that the comic words stay rare.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { document.querySelector('#segMap button[data-v="forum"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
await page.waitForTimeout(1500);
// run the battle ahead with the computer in charge of you, then pause and look
await page.evaluate(() => { const F = window.__fb, G = F.G; G.diff = 2; const s0 = G.teams[G.myTi]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; window.__keep = s0.leader;
  for (let t = 0; t < 140 && G.state === 'play'; t++) F.step(30, 1 / 30); });
await frames(page, 30);
const r = await page.evaluate(() => ({ feed: [...document.querySelectorAll('#feed .fl')].map(e => e.textContent), T: window.__fb.G.T }));
await page.screenshot({ path: OUT + 'feed.png', timeout: 120000 });
console.log(JSON.stringify(r, null, 1), 'errors:', errs.slice(0, 3));
await browser.close();
