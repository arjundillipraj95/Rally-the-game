// Dev check: the warhorse's gaits. Ridden at a walk, a trot and a charge, filmed side-on: a strip of
// frames through each stride, and the speed it's going.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 300);
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 10);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player;
  for (const u of G.units) if (u !== p) { u.x = 300 + Math.random(); u.z = 300; }
  for (const s of G.teams) { s.recruitT = 1e9; s.thinkT = 1e9; }
  p.x = -60; p.z = 0; p.face = Math.PI / 2;
  p.mounted = true; p.r = .95; p.horseHp = 100; p.horse = { state: 'ridden', x: p.x, z: p.z, face: 0, t: 0, rider: p, spd: 0 }; G.horses.push(p.horse);
  window.__mag = 0;
  window.__moveOverride = () => ({ wx: 1, wz: 0, mag: window.__mag, camYaw: 0 });
  document.querySelectorAll('#hud, .hud, #ctl').forEach(e => e.style.display = 'none');
});
const follow = () => page.evaluate(() => { const p = window.__fb.G.player; window.__camAt = [p.x, p.y + 2.2, p.z + 8, p.x, p.y + 1.6, p.z]; });
for (const [name, mag, charge] of [['walk', .25], ['trot', .6], ['charge', 1, true]]) {
  await page.evaluate(([m, c]) => { const p = window.__fb.G.player; window.__mag = m; if (c) { p.charge = 2.2; p.gallop = 1; } }, [mag, charge]);
  for (let i = 0; i < 40; i++) { await follow(); await frames(page, 1); if (charge) await page.evaluate(() => { window.__fb.G.player.charge = 2; }); }
  const sp = await page.evaluate(() => { const p = window.__fb.G.player; return Math.hypot(p.vx, p.vz).toFixed(1); });
  for (let i = 0; i < 6; i++) { await follow(); await frames(page, 2); await page.screenshot({ path: OUT + `hs_${name}_${i}.png` }); }
  console.log(name, 'speed', sp);
}
await browser.close();
