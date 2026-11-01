// Dev shot: a map's middle prize with its name, and the war chest warning over it.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const map = process.argv[2] || 'forum';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(map => { document.querySelector('#segMode button[data-v="conquest"]').click(); document.querySelector(`#segMap button[data-v="${map}"]`).click(); document.querySelector('#goBtn').click(); }, map);
await frames(page, 3);
await page.evaluate(() => { const G = window.__fb.G, p = G.player, h = G.holds.find(x => x.centre); p.x = h.x - 14; p.z = h.z - 4; p.face = Math.atan2(h.x - p.x, h.z - p.z); window.__fb.cam.yaw = p.face; h.chest = 1; for (const s of G.teams) s.thinkT = 1e9; });
await frames(page, 40);
await page.screenshot({ path: OUT + 'centre-' + map + '.png', timeout: 120000 });
await browser.close();
