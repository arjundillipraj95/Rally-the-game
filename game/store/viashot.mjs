// Dev shot: the Forum's Via, looking from a castle gate down the street to the forum square.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { document.querySelector('#segMode button[data-v="conquest"]').click(); document.querySelector('#segMap button[data-v="forum"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
await page.evaluate(() => { const F = window.__fb, G = F.G, p = G.player; const a = Math.atan2(p.z, p.x); p.x = Math.cos(a) * 60; p.z = Math.sin(a) * 60; p.face = Math.atan2(-p.x, -p.z); F.cam.yaw = p.face; F.cam.pitch = .45; for (const s of G.teams) s.thinkT = 1e9; });
await frames(page, 40);
await page.screenshot({ path: OUT + 'via.png', timeout: 120000 });
await browser.close();
