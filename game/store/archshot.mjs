// Dev check: archers beside a footman and the captain, close and from further off: plain, Training, Marksman.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 560, 400);
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 30);
const n = await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player, X = -40, Z = 10;
  for (const s of G.teams) { s.recruitT = 1e9; s.thinkT = 1e9; }
  const mine = G.units.filter(u => u.ti === p.ti && !u.dead), arch = mine.filter(u => u.kind === 'arch'), foot = mine.filter(u => u.kind === 'foot');
  const keep = [...arch.slice(0, 3), foot[0]].filter(Boolean);
  for (const u of G.units) if (u !== p && !keep.includes(u)) u.dead = true; G.units = G.units.filter(u => !u.dead);
  p.x = X; p.z = Z; p.face = 0;
  keep.forEach((u, i) => { u.x = X + 1.6 * (i + 1); u.z = Z; u.face = 0; u.vx = u.vz = 0; u.tier = u.kind === 'arch' ? i : 0; u.think = 1e9; u.stun = 99; });
  window.__keep = keep;
  window.__camAt = [X + 3.5, p.y + 2.4, Z + 6.5, X + 3.5, p.y + 1.3, Z];
  document.querySelectorAll('#hud, .hud, #ctl').forEach(e => e.style.display = 'none');
  return keep.map(u => u.kind + u.tier).join(',');
});
console.log(n);
await page.evaluate(() => { const F = window.__fb; window.__hold = setInterval(() => {}, 1000); });
for (let i = 0; i < 6; i++) { await page.evaluate(() => { const G = window.__fb.G, p = G.player; window.__keep.forEach((u, i) => { u.x = p.x + 1.6 * (i + 1); u.z = p.z; u.face = 0; u.vx = u.vz = 0; }); }); await frames(page, 2); }
await page.screenshot({ path: OUT + 'arch_close.png' });
await page.evaluate(() => { const G = window.__fb.G, p = G.player; window.__camAt = [p.x + 3.5, p.y + 9, p.z + 24, p.x + 3.5, p.y + 1, p.z]; });
await frames(page, 2); await page.screenshot({ path: OUT + 'arch_far.png' });
await browser.close();
