// Dev check: the spear combo. A column of men stands in front of the captain; three presses in a row
// should be thrust, thrust, skewer: the skewer lunges forward and runs through up to three of them.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 320, 180);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
console.log(await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10, log = [];
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (u !== p) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  p.hp = p.max = 1e6; p.weapon = 'spear'; G.teams[me].weapon = 'spear'; p.x = X; p.z = Z; p.face = Math.PI / 2;
  const col = [0, 1, 2, 3].map(i => { const u = F.mkUnit(foe, X + 2 + i * .9, Z, 'foot'); u.hp = u.max = 1e4; u.face = -Math.PI / 2; u.stun = 99; return u; });
  for (let k = 0; k < 3; k++) {
    while (p.cd > 0) F.step(1, 1 / 30, true);
    // put the column back in place in front of him each time
    col.forEach((u, i) => { u.x = p.x + 2 + i * .9; u.z = p.z; u.vx = u.vz = 0; });
    const before = col.map(u => u.hp), x0 = p.x;
    F.attack(); const kind = p.swingKind; F.step(10, 1 / 30, true);
    log.push(`press ${k + 1}: kind ${kind}, men hit ${col.filter((u, i) => u.hp < before[i]).length}, damage ${col.map((u, i) => Math.round(before[i] - u.hp)).join('/')}, lunged ${(p.x - x0).toFixed(1)} m`);
  }
  return log.join('\n');
}));
console.log('errors:', errs.slice(0, 3));
await browser.close();
