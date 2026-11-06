// Dev check: a captain taking blows (front, flank): the reel and the flash, shot a few frames after each.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 360);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 20);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), L = G.teams[foe].leader; window.__L = L;
  for (const s of G.teams) { s.recruitT = 1e9; s.thinkT = 1e9; }
  for (const u of G.units) if (u !== p && u !== L) u.hidden = true;
  p.x = -40; p.z = 10; p.face = Math.PI / 2; L.x = -37.8; L.z = 10; L.face = -Math.PI / 2; L.hp = L.max = 1e5; L.stun = 0; L.guardT = 0; L.guardCd = 99; L.cd = 99; L.evadeCd = 99; p.cd = 0;
  window.__camAt = [-38.9, p.y + 2.4, 15.5, -38.9, p.y + 1.3, 10];
  document.querySelectorAll('#hud, .hud, #ctl').forEach(e => e.style.display = 'none');
});
await frames(page, 10);
for (let i = 0; i < 4; i++) {
  await page.evaluate(() => { const G = window.__fb.G, p = G.player, L = window.__L; p.cd = 0; L.x = p.x + 2.2; L.z = p.z; L.blockT = 0; L.guardT = 0; window.__fb.attack(); });
  await frames(page, 9 + (i % 2)); await page.screenshot({ path: OUT + `hit_${i}.png`, timeout: 150000 });
  console.log(await page.evaluate(() => { const a = window.__anim.get(window.__L); return JSON.stringify({ hp: Math.round(window.__L.hp), stag: (a.stag || 0).toFixed(2), flash: (a.flash || 0).toFixed(2) }); }));
  await frames(page, 6);
}
console.log('errors', errs.slice(0, 3));
await browser.close();
