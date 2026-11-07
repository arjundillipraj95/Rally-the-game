// Dev look: the mountain's results, Points tab: scoreline, timeline (tapped), your places, captains.
// Runs a whole battle in 10 s steps (the HUD's recorder samples between them), then views it as Red.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const S = '/tmp/claude-0/-home-claude/4e17cb5f-998f-589c-8d52-44170dd3d094/scratchpad/';
const [w, h] = (process.env.SIZE || '900x420').split('x').map(Number);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, w, h, { q: '?crown2=1' });
page.on('pageerror', e => console.log('ERR', e.message));
if (process.env.FFA) { await page.evaluate(() => localStorage.setItem('rally-solo-al', '[0,1,2,3]')); await page.reload(); await page.waitForFunction(() => window.__fb && window.__fb.G); } // (four sides, each on its own)
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
await page.evaluate(() => { window.__noRender = true; });
for (let k = 0; k < 64 && (await page.evaluate(() => window.__fb.G.state)) !== 'end'; k++) {
  await page.evaluate(() => { const G = window.__fb.G; if (G.T > 585 && G.myTi !== 1 && !window.__keepMe) G.myTi = 1; for (let i = 0; i < 10; i++) { window.__fb.step(30); window.__fb.tlTick(); } });
  await page.waitForTimeout(60);
}
await page.evaluate(() => { window.__noRender = false; });
await page.waitForTimeout(2500);
const box = await page.locator('#endPts svg.tl').boundingBox();
if (box) await page.mouse.click(box.x + box.width * .62, box.y + box.height / 2);
await page.waitForTimeout(300);
console.log(await page.evaluate(() => document.querySelector('.tl-at').innerText));
await page.screenshot({ path: S + 'pointsview_' + w + '.png' });
await browser.close();
