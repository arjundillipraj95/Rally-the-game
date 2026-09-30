// Dev check: a close lineup of every soldier type and faction, for judging the character look.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const name = process.argv[2] || 'lineup';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 1280, 720);
await page.click('#segMap button[data-v="colosseum"]');
await page.click('#goBtn'); await frames(page, 20);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player;
  document.getElementById('hudWrap').style.display = 'none'; document.getElementById('fx').style.display = 'none';
  document.querySelectorAll('.overlay,.veil').forEach(o => o.hidden = true);
  const facs = ['roman', 'greek', 'barbarian', 'roman'];
  G.teams.forEach((t, i) => { G.factions[i] = facs[i]; t.order = 'hold'; });
  p.hidden = true; F.cam.pitch = .1;
  const row = [];
  for (let ti = 0; ti < 3; ti++) {
    const us = G.units.filter(u => !u.dead && u.ti === ti && u !== p);
    const cap = G.teams[ti].leader && G.teams[ti].leader !== p ? G.teams[ti].leader : null;
    const f1 = us.find(u => u.kind === 'foot'), f2 = us.filter(u => u.kind === 'foot')[1], ar = us.find(u => u.kind === 'arch');
    if (f2) f2.tier = 2;
    row.push(...[cap || us.find(u => u.kind === 'captain'), f1, f2, ar].filter(Boolean));
  }
  const keep = new Set(row);
  for (const u of G.units) if (!keep.has(u) && u !== p) { u.x = 85 * Math.sign(u.x || 1); u.z = 80; }
  window.__row = row; window.__keep = keep;
});
const yaw = +(process.argv[3] || 0);
for (let f = 0; f < 40; f++) {
  await page.evaluate(yaw => {
    const F = window.__fb, G = F.G, p = G.player; F.cam.yaw = yaw; F.cam.pitch = .1;
    p.x = 0; p.z = 0; p.face = yaw; p.vx = p.vz = 0;
    for (const u of G.units) if (!window.__keep.has(u) && u !== p) { u.x = 60; u.z = 60 + (u.id % 9); }
    window.__row.forEach((u, i) => { u.x = (i - (window.__row.length - 1) / 2) * 1.3 * Math.cos(yaw); u.z = -(i - (window.__row.length - 1) / 2) * 1.3 * Math.sin(yaw); u.face = yaw + Math.PI; u.vx = u.vz = 0; u.hp = u.max; u.stun = 0; u.swing = 0; });
  }, yaw);
  await frames(page, 1);
}
await page.screenshot({ path: OUT + name + '.png' });
console.log('ok', await page.evaluate(() => window.__row.map(u => u.kind + u.ti).join(' ')));
await browser.close();
