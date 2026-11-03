// Dev check: a Crown map seen from straight above, and its places as data (for a labelled plan).
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { open, frames, OUT } from './stage.mjs';
const seed = +(process.argv[2] || 12345);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 1000, 1000, { home: true });
await page.evaluate(seed => { Math.random = (() => { let s = seed; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; })(); }, seed);
await page.click('#playBtn'); await frames(page, 5);
await page.evaluate(() => { document.getElementById('hudWrap').style.display = 'none'; document.getElementById('fx').style.display = 'none'; const G = window.__fb.G; G.T = 548; G.plazaWall.up = true; window.__fb.G.flag = null;
  for (const u of G.units) u.hidden = true; window.__camAt = [0, 215, 0.01, 0, 0, 0]; window.__fb.scene.fog = null; });
await frames(page, 2); await page.evaluate(() => { window.__fb.scene.fog = null; });
await frames(page, 30);
await page.screenshot({ path: OUT + `map_${seed}.png`, timeout: 120000 });
const data = await page.evaluate(() => { const G = window.__fb.G, L = G.layout; return { R: 91, holds: G.holds.map(h => ({ kind: h.kind, name: h.name, x: h.x, z: h.z, r: h.r, rich: !!h.rich })), wall: L.plazaWall ? { r: L.plazaWall.r, gates: L.plazaWall.gates } : null }; });
writeFileSync(OUT + `map_${seed}.json`, JSON.stringify(data));
console.log('ok', data.holds.length);
await browser.close();
