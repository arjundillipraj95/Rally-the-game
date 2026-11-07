// Dev check: the new Crown (?crown2=1) runs headless through a whole match: no errors, places change
// hands, the chest lands and is taken, night opens the arena, the match ends with points.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: process.env.Q ?? '?crown2=1' });
const fmt = +(process.env.FMT || 0);
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]');
if (fmt) await page.evaluate(f => { const b = document.querySelector(`#segFmt button[data-v="${f}"]`) || null; if (b) b.click(); }, fmt);
await page.click('#goBtn');
await frames(page, 260); // (the opening fly-in)
const snap = () => page.evaluate(() => { const { G } = window.__fb; const K = G.c2;
  return { T: +G.T.toFixed(0), state: G.state, map: G.map.id, R: window.__fb.W ? window.__fb.W.R : null, phase: K && K.phase, chest: K && K.chest,
    held: G.holds.map(h => h.owner).join(''), units: G.units.filter(u => !u.dead).length, guards: K && K.breaks.filter(b => b.kind === 'guard' && b.hp > 0).length,
    glacier: K && K.breaks.find(b => b.kind === 'glacier').hp, end: G.endInfo && JSON.stringify(G.endInfo), pts: [0, 1, 2, 3].map(a => window.__fb.c2Points ? window.__fb.c2Points(a) : '?').join(',') }; });
console.log(JSON.stringify(await snap()));
for (let k = 0; k < 24 && (await page.evaluate(() => window.__fb.G.state)) !== 'end'; k++) { await page.evaluate(() => window.__fb.step(900)); console.log(JSON.stringify(await snap())); }
await browser.close();
