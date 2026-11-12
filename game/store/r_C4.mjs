// C4: the captain's cape on the new body. None (default for a new outfit), Long, Short; the retired mantle and ermine
// are hidden. Checks the cape exists on the hero rig per choice, and shoots him from behind (c4_<i>.png).
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 360);
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 20);
const fails = [];
const cat = await page.evaluate(async () => { const L = await import('/src/core/look.js'), c = L.SLOTS[L.SLOT_IX.cape]; return { shown: c.items.filter(i => !i.gone).map(i => i.name), def: L.DEFAULT_LOOK[L.SLOT_IX.cape], n: c.items.length }; });
if (cat.shown.join() !== 'Long cape,Short cape,No cape') fails.push('closet capes: ' + cat.shown);
if (cat.def !== 4 || cat.n !== 5) fails.push('default/len ' + cat.def + '/' + cat.n);
for (const [i, want] of [[4, 0], [0, 1], [1, 1]]) {
  const has = await page.evaluate(i => { const G = window.__fb.G, p = G.player; G.looks[G.myTi] = G.looks[G.myTi].slice(); G.looks[G.myTi][5] = i; for (const s of G.teams) { s.recruitT = 1e9; s.thinkT = 1e9; } for (const u of G.units) if (u !== p) u.hidden = true; p.x = -40; p.z = 10; p.face = 0; window.__camAt = [p.x - .4, p.y + 2.4, p.z - 3.2, p.x, p.y + 1.5, p.z]; document.querySelectorAll('#hud, .hud, #ctl').forEach(e => e.style.display = 'none'); return 1; }, i);
  await frames(page, 60);
  const got = await page.evaluate(() => { const G = window.__fb.G, h = window.__f8.live.get(G.player); return !!(h && h.R.cape); });
  if (got !== !!want) fails.push(`cape ${i}: on rig = ${got}, want ${!!want}`);
  await page.screenshot({ timeout: 150000, path: OUT + `c4_${i}.png` });
}
console.log(fails.length ? 'C4 FAIL: ' + fails.join('; ') : 'C4 PASS; shots in ' + OUT);
await browser.close(); process.exit(fails.length ? 1 : 0);
