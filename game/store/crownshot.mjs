// Dev check: the Crown on screen: the break-out in the plaza, a castle keep, and the Crown in its casing at 9:00.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#playBtn'); await frames(page, 40);
await page.screenshot({ path: OUT + 'crown_start.png', timeout: 120000 });
// walk to the nearest castle
await page.evaluate(() => { const G = window.__fb.G, p = G.player, h = G.holds.filter(h => h.kind === 'castle').sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z))[0]; const a = Math.atan2(-h.x, -h.z); p.x = h.x + Math.sin(a) * 13; p.z = h.z + Math.cos(a) * 13; p.face = a + Math.PI; window.__fb.cam.yaw = p.face; });
await frames(page, 40);
await page.screenshot({ path: OUT + 'crown_castle.png', timeout: 120000 });
await page.evaluate(() => { window.__noRender = 1; const F = window.__fb, G = F.G; const p = G.player; p.human = false; p.isMe = false; while (G.state === 'play' && G.T < 543) F.step(30, 1 / 30); p.human = true; p.isMe = true; if (p.dead) { const L = G.teams[G.myTi].leader; G.player = L; } const q = G.player; q.x = 0; q.z = 9; q.face = Math.PI; F.cam.yaw = Math.PI; window.__noRender = 0; });
await frames(page, 40);
await page.screenshot({ path: OUT + 'crown_rise.png', timeout: 120000 });
console.log('errors:', errs.slice(0, 3));
await browser.close();
