// C2: armour 2 is "Burnished iron": the closet name, and the captain's armour reads as metal (not matte leather).
// Also shoots the captain in each armour (store/ OUT: c2_armour<i>.png) so it can be checked by eye.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 360);
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 20);
const fails = [];
for (const i of process.env.ONLY ? [2] : [0, 1, 2, 3]) {
  await page.evaluate(i => { const G = window.__fb.G, p = G.player; G.looks[G.myTi] = G.looks[G.myTi].slice(); G.looks[G.myTi][1] = i; for (const s of G.teams) { s.recruitT = 1e9; s.thinkT = 1e9; } for (const u of G.units) if (u !== p) u.hidden = true; p.x = -40; p.z = 10; p.face = 0; window.__camAt = [p.x - 1.6, p.y + 2.2, p.z - 2.6, p.x, p.y + 1.4, p.z]; document.querySelectorAll('#hud, .hud, #ctl').forEach(e => e.style.display = 'none'); }, i);
  await frames(page, 60);
  await page.screenshot({ timeout: 150000, path: OUT + 'c2_armour' + i + '.png' });
}
const r = await page.evaluate(async () => { const L = await import('/src/core/look.js'); return { name: L.SLOTS[L.SLOT_IX.armour].items[2].name, n: L.SLOTS[L.SLOT_IX.armour].items.length }; });
if (r.name !== 'Burnished iron') fails.push('name is ' + r.name);
if (r.n !== 4) fails.push('armour list length changed: ' + r.n);
console.log(fails.length ? 'C2 FAIL: ' + fails.join('; ') : 'C2 PASS (name, list length); shots in ' + OUT);
await browser.close();
process.exit(fails.length ? 1 : 0);
