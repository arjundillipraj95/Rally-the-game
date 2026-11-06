// Dev check: distant soldiers and archers. The armies marched a while (sim only), then the player's own
// camera and a high wide shot, with the light new models on (?far=1) or off.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const q = process.argv[2] || '?far=1', tag = q.includes('far=1') ? 'on' : 'off';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 872, 325, { q });
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 10);
const info = await page.evaluate(() => { const F = window.__fb, G = F.G; for (let i = 0; i < 30; i++) F.step(10, 1 / 30, true); const p = G.player; return { units: G.units.filter(u => !u.dead).length, T: G.T.toFixed(0), far: G.units.filter(u => !u.dead && Math.hypot(u.x - p.x, u.z - p.z) > 26).length }; });
console.log(JSON.stringify(info));
await frames(page, 4);
await page.screenshot({ path: OUT + `far_${tag}_player.png` });
await page.evaluate(() => { const G = window.__fb.G, p = G.player; const en = G.units.filter(u => !u.dead && u.ti !== p.ti); let mx = 0, mz = 0; for (const u of en) { mx += u.x; mz += u.z; } mx /= en.length || 1; mz /= en.length || 1; const ar = en.filter(u => u.kind === 'arch').slice(0, 4), ft = en.filter(u => u.kind === 'foot').slice(0, 4); [...ar, ...ft].forEach((u, i) => { u.x = p.x + 40 + i * 1.6; u.z = p.z; u.vx = u.vz = 0; u.face = 0; u.stun = 99; }); window.__line = [...ar, ...ft]; const c = { x: p.x + 46, z: p.z, y: p.y }; window.__camAt = [c.x, c.y + 4, c.z + 11, c.x, c.y + 1.2, c.z]; window.__info2 = ar.length + 'a ' + ft.length + 'f'; });
for (let i = 0; i < 3; i++) { await page.evaluate(() => { const p = window.__fb.G.player; window.__line.forEach((u, i) => { u.x = p.x + 40 + i * 1.6; u.z = p.z; u.vx = u.vz = 0; }); }); await frames(page, 1); }
await page.screenshot({ path: OUT + `far_${tag}_wide.png` }); console.log(await page.evaluate(() => window.__info2));
console.log(await page.evaluate(() => JSON.stringify(window.__farStat || null)));
await browser.close();
