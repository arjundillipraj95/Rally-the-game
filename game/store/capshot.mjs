// Dev check: the captain close up, from the front, in daylight (helmet, armour, face).
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 360);
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 20);
await page.evaluate(() => { const G = window.__fb.G, p = G.player; for (const s of G.teams) { s.recruitT = 1e9; s.thinkT = 1e9; } for (const u of G.units) if (u !== p) u.hidden = true; p.x = -40; p.z = 10; p.face = 0; window.__camAt = [p.x + .5, p.y + 2.9, p.z + 3.4, p.x, p.y + 2.25, p.z]; document.querySelectorAll('#hud, .hud, #ctl').forEach(e => e.style.display = 'none'); });
await frames(page, 70);
await page.screenshot({ timeout: 150000, path: OUT + (process.argv[2] || 'cap_front') + '.png' });
await browser.close();
