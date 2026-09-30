// Dev check: your captain swinging into a few enemies, shot frame by frame, for judging hit feel.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 960, 540);
await page.click('#segMap button[data-v="colosseum"]');
await page.click('#goBtn'); await frames(page, 20);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player;
  document.querySelectorAll('.overlay,.veil').forEach(o => o.hidden = true);
  G.teams.forEach(t => t.order = 'hold');
  p.x = 0; p.z = 0; p.face = 0; F.cam.yaw = 0;
  const red = G.units.filter(u => !u.dead && u.ti === 1 && u.kind === 'foot');
  red.forEach((u, i) => { if (i >= 3) { u.x = 60; u.z = 60; return; } const a = (i - 1) * .45; u.x = Math.sin(a) * 1.6; u.z = Math.cos(a) * 1.6; u.face = Math.PI; u.hp = i === 1 ? 20 : u.max; });
  for (const u of G.units) if (!u.dead && u !== p && !red.slice(0, 3).includes(u)) { u.x = 70; u.z = -70 + (u.id % 9); }
});
await frames(page, 2);
const shots = (process.argv[2] || '3,5,7,9,12,16').split(',').map(Number);
let f = 0;
await page.evaluate(() => window.__fb.attack());
for (const s of shots) { await frames(page, s - f); f = s; await page.screenshot({ path: OUT + 'fx' + s + '.png' }); }
await page.evaluate(() => { window.__fb.attack(); }); await frames(page, 14); await page.screenshot({ path: OUT + 'fx2nd.png' });
await page.evaluate(() => { window.__fb.attack(); }); await frames(page, 6); await page.screenshot({ path: OUT + 'fx3rd.png' });
console.log('ok');
await browser.close();
