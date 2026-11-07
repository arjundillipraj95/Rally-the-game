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
await page.click('#segMode button[data-v="crown"]');
const fmt = +(process.env.FMT || 0); if (fmt) await page.evaluate(f => { for (let k = 0; k < f; k++) for (let c = 0; c < 4; c++) document.querySelectorAll('.duotog')[c].click(); }, fmt); // (each colour: Duo, then Trio)
await page.click('#goBtn'); await frames(page, 2);
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
console.log('ledgers vs totals:', await page.evaluate(() => { const { G, ledger, c2Breakdown } = window.__fb; const out = {};
  for (let i = 0; i < G.teams.length; i++) { const t = G.teams[i]; if (!t || !t.active) continue; const a = G.ALLY[i % 4]; out[a] = out[a] || { sum: 0, total: window.__fb.c2Points(a) }; out[a].sum += ledger(i).net; }
  return JSON.stringify(out); }));
// the levels: the top side's team, its first captain, one of his ledger lines; then back up by the breadcrumb
const tag = process.env.FFA ? 'ffa' : 'al';
await page.locator('.ps-row').first().click(); await page.waitForTimeout(250);
await page.screenshot({ path: S + `lv2_${tag}_${w}.png` });
await page.locator('.cap-row').first().click(); await page.waitForTimeout(250);
const n = await page.locator('.lg[data-ev]').count(); if (n) await page.locator('.lg[data-ev]').nth(Math.min(4, n - 1)).click(); await page.waitForTimeout(250);
console.log('captain view:', await page.evaluate(() => document.querySelector('.pv-crumb').innerText + ' | ' + document.querySelector('.tl-at').innerText));
await page.screenshot({ path: S + `lv3_${tag}_${w}.png` });
await page.locator('.pv-crumb a[data-go="1"]').click(); await page.waitForTimeout(250);
await page.locator('[data-go="me"]').click(); await page.waitForTimeout(250);
console.log('you view:', await page.evaluate(() => document.querySelector('.pv-crumb').innerText));
await browser.close();
