// Dev check: fixed camera shots of a map's scenery (argv: map, name). Soldiers are left out.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const [map = 'valley', name = map, extra] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 1280, 720);
await page.click(`#segMap button[data-v="${map}"]`);
await page.click('#goBtn'); await frames(page, 10);
await page.evaluate(() => { document.getElementById('hudWrap').style.display = 'none'; document.getElementById('fx').style.display = 'none'; document.querySelectorAll('.overlay,.veil,.banner').forEach(o => o.hidden = true); for (const u of window.__fb.G.units) u.hidden = true; });
const shots = extra ? JSON.parse(extra) : { over: [0, 95, 118, 0, 0, 0], low: [-38, 7, -48, 10, 3, 5], side: [70, 12, -10, 0, 2, 0], mid: [22, 4, 30, -15, 3, -5] };
for (const [k, c] of Object.entries(shots)) { await page.evaluate(c => { window.__camAt = c; }, c); await frames(page, 3); await page.screenshot({ path: `${OUT}${name}_${k}.png` }); }
console.log('ok');
await browser.close();
