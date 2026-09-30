// Dev check: every map starts, renders and runs a few seconds without page errors.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const maps = (process.argv[2] || 'forum,valley,desert,frost,colosseum,wooden,dunes,river,forest').split(',');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const m of maps) {
  const page = await open(browser, 640, 360); let errs = 0;
  page.on('pageerror', () => errs++); page.on('console', x => { if (x.type() === 'error') errs++; });
  await page.evaluate(() => { document.querySelector('#moreMaps')?.click?.(); });
  const ok = await page.click(`#segMap button[data-v="${m}"]`, { timeout: 3000 }).then(() => true).catch(() => false);
  if (!ok) await page.evaluate(m => { const b = document.querySelector(`button[data-v="${m}"]`); b && b.click(); }, m);
  await page.click('#goBtn'); await frames(page, 20);
  const info = await page.evaluate(() => { window.__fb.step(300, 1 / 30, true); const i = window.__fb.info; return `${i.map} state=${i.state} units=${i.units}`; });
  await frames(page, 5);
  console.log(m, '->', info, 'errors=' + errs); await page.close();
}
await browser.close();
