// C1: the three Roman helmets are free (no locks) and their metal takes the armour finish. Shoots the captain's
// head in each armour (c1_<helm>_<armour>.png) for the eye.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 360);
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 20);
const fails = [];
const free = await page.evaluate(async () => { const L = await import('/src/core/look.js'); return L.SLOTS[L.SLOT_IX.helm].items.filter(i => !i.gone).map(i => i.name + (i.lock ? ' LOCKED' : '')); });
if (free.length !== 3 || free.some(n => /LOCKED/.test(n))) fails.push('helmets: ' + free.join(', '));
for (const [h, a] of [[0, 0], [0, 1], [3, 2], [10, 3]]) {
  await page.evaluate(([h, a]) => { const G = window.__fb.G, p = G.player; G.looks[G.myTi] = G.looks[G.myTi].slice(); G.looks[G.myTi][0] = h; G.looks[G.myTi][1] = a; for (const s of G.teams) { s.recruitT = 1e9; s.thinkT = 1e9; } for (const u of G.units) if (u !== p) u.hidden = true; p.x = -40; p.z = 10; p.face = 0; window.__camAt = [p.x + .6, p.y + 2.9, p.z + 2.2, p.x, p.y + 2.3, p.z]; document.querySelectorAll('#hud, .hud, #ctl').forEach(e => e.style.display = 'none'); }, [h, a]);
  await frames(page, 60);
  await page.screenshot({ timeout: 150000, path: OUT + `c1_${h}_${a}.png` });
}
console.log(fails.length ? 'C1 FAIL: ' + fails.join('; ') : 'C1 PASS (3 free helmets); shots in ' + OUT);
await browser.close(); process.exit(fails.length ? 1 : 0);
