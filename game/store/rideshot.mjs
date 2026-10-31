// Dev check: what riding at someone looks like from the saddle (the rings), and an enemy rider's warning.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 10);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.teams[i].active && G.ALLY[i] !== G.ALLY[me]), E = G.teams[foe].leader; window.__E = E;
  for (const u of G.units) if (u !== p && u !== E) { u.x = 300 + Math.random(); u.z = 300; }
  E.human = true; E.hp = E.max = 9999; p.x = 20; p.z = -25; p.face = 0;
  p.mounted = true; p.r = .95; p.horseHp = 100; p.horse = { state: 'ridden', x: p.x, z: p.z, face: 0, t: 0, rider: p, spd: 0 }; G.horses.push(p.horse);
  F.cam.yaw = 0; window.__held = false;
  window.__moveOverride = () => { E.x = 20; E.z = 10; E.vx = E.vz = 0; return { wx: 0, wz: 1, mag: 1, camYaw: 0, attackHeld: window.__held }; };
});
let shots = 0;
for (let f = 0; f < 200 && shots < 2; f++) {
  await frames(page, 1);
  const d = await page.evaluate(() => { const p = window.__fb.G.player, E = window.__E; const d = Math.hypot(E.x - p.x, E.z - p.z); if (d < 18) window.__held = true; return d; });
  if (shots === 0 && d < 10) { await page.screenshot({ path: OUT + 'ride_closing.png' }); shots++; }
  if (shots === 1 && d < 3.6) { await page.screenshot({ path: OUT + 'ride_gold.png' }); shots++; }
}
console.log('shots', shots);
await browser.close();
