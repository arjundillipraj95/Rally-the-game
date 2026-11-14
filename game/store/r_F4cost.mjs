// F4 cost probe: draw calls at the Crown start (High and Low, F14's top and bottom rungs' levels), one host
// snapshot's bytes with every post asleep, and host sim time per step. OUT=file writes the numbers as JSON.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
import fs from 'fs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const res = {};
for (const q of ['high', 'low']) {
  const page = await open(browser, 844, 390, { q: '?crown2=1', quality: q });
  await page.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
  for (let k = 0; k < 80 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await page.evaluate(() => window.__frame(10, 33));
  await page.evaluate(() => window.__frame(30, 33));
  const calls = []; for (let k = 0; k < 5; k++) { await page.evaluate(() => window.__frame(1, 33)); calls.push(await page.evaluate(() => window.__fb.info.gfx.calls)); }
  res[q] = { calls: Math.min(...calls) };
  if (q === 'high') {
    res.snap = await page.evaluate(() => window.__encodeSnap().length);
    res.ms = await page.evaluate(() => { const F = window.__fb; window.__noRender = true; F.step(30); const t = performance.now(); F.step(600); return +((performance.now() - t) / 600).toFixed(3); });
    res.ms2 = await page.evaluate(() => { const F = window.__fb; const t = performance.now(); F.step(600); return +((performance.now() - t) / 600).toFixed(3); });
  }
  await page.close();
}
console.log(JSON.stringify(res));
if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify(res));
await browser.close();
