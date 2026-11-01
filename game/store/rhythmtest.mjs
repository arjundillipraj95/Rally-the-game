// Dev check: the sword's rhythm. Three blows on a dummy, pressed on the beat (16 frames apart) vs off
// it (25 frames): the third blow's damage, and RHYTHM moments counted.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 320);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="dunes"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (u !== p) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; }
  p.weapon = 'sword'; p.hp = p.max = 1e6;
  const d = F.mkUnit(foe, 0, 1.8, 'foot'); d.hp = d.max = 1e6; d.stun = 99; d.face = Math.PI;
  const combo = gap => { p.x = 0; p.z = 0; p.face = 0; p.lastSwingT = -9; p.combo = 0; p.streak = 0; F.step(30, 1 / 30, true); const hs = [];
    for (let k = 0; k < 3; k++) { d.x = 0; d.z = 1.8; d.stun = 99; p.x = 0; p.z = 0; const h0 = d.hp; F.attack(); F.step(gap, 1 / 30, true); hs.push(Math.round(h0 - d.hp)); } return hs.join('/') + ' rhythm ' + (((G.teams[me].hl || {}).rhythm) || 0) + ' beats ' + p.beats; };
  out.onBeat = combo(16); out.offBeat = combo(24); out.onBeat2 = combo(16);
  out.rhythm = (G.teams[me].hl || {}).rhythm || 0;
  return out;
});
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
