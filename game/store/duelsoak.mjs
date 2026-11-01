// Dev check: computer captains and duels over a long Warlord battle — how many get called, taken up,
// won/drawn/broken; any errors. The player's captain stands near an enemy captain now and then.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 320);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(async () => {
  const F = window.__fb, G = F.G; G.diff = 2;
  const seen = new Map(), ends = {}; let asked = 0, maxGuards = 0;
  for (let s = 0; s < 300 && G.state === 'play'; s++) { // 300 s
    F.step(30, 1 / 30);
    for (const d of G.duels) { if (!seen.has(d.id)) { seen.set(d.id, d); asked++; } if (d.state === 'on') maxGuards = Math.max(maxGuards, G.units.filter(u => u.guardOf === d).length); }
    for (const [id, d] of seen) if (d.end && !d.counted) { d.counted = 1; ends[d.end + (d.state === 'on' ? '' : '-offer')] = (ends[d.end + (d.state === 'on' ? '' : '-offer')] || 0) + 1; }
  }
  const refused = [...seen.values()].filter(d => !d.end && !G.duels.includes(d)).length;
  return { T: Math.round(G.T), asked, ends, refusedOrDropped: refused, maxGuards, state: G.state };
});
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
