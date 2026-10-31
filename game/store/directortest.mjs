// Dev check: the director. Music levels through a battle, the camera widening in a big fight and
// closing in for a duel, men giving two captains room, and a captain kill's slow beat.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 10);
// set up: my captain with my army; an enemy army 40 m off, then on top of us
await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.teams[i].active && G.ALLY[i] !== G.ALLY[me]); window.__foe = foe;
  for (const u of G.units) if (u.ti !== me && u.ti !== foe) { u.x = 300 + Math.random(); u.z = 300; }
  for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; }
  p.x = 0; p.z = 0; p.hp = p.max = 1e6; F.cam.yaw = 0;
  G.units.filter(u => u.ti === me && !u.leader).forEach((u, i) => { u.x = (i % 5) * 1.5 - 3; u.z = 2 + Math.floor(i / 5) * 1.5; });
  G.units.filter(u => u.ti === foe).forEach((u, i) => { u.x = (i % 6) * 1.5 - 4; u.z = 40 + Math.floor(i / 6) * 1.5; u.hp = u.max = 1e5; });
  window.__moveOverride = () => ({ wx: 0, wz: 0, mag: 0, camYaw: 0 });
});
for (let k = 0; k < 5; k++) await frames(page, 30);
await page.evaluate(() => { const G = window.__fb.G; G.units.filter(u => u.ti === window.__foe).forEach((u, i) => { u.x = (i % 6) * 1.5 - 4; u.z = 6 + Math.floor(i / 6) * 1.5; }); });
for (let k = 0; k < 8; k++) await frames(page, 30);
await page.screenshot({ path: OUT + 'dir_clash.png', timeout: 120000 });
// a duel: everyone else away, my captain and theirs face to face, some of their men round us
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, E = G.teams[window.__foe].leader;
  G.units.filter(u => u.ti === me && !u.leader).forEach(u => { u.x = 200; u.z = 200; });
  const men = G.units.filter(u => u.ti === window.__foe && !u.leader);
  men.forEach((u, i) => { if (i < 4) { u.x = Math.cos(i * 1.6) * 2.5; u.z = 1.5 + Math.sin(i * 1.6) * 2.5; } else { u.x = 200; u.z = 210; } });
  E.x = 0; E.z = 2.2; E.hp = E.max = 1e6; p.x = 0; p.z = 0;
  F.step(60, 1 / 30, true);
  return men.slice(0, 4).map(u => Math.hypot(u.x - 0, u.z - 1.1).toFixed(1)).join(',') + ' | duel flags ' + !!p.duel + ',' + !!E.duel;
});
console.log('men round a duel, distance from it after 2 s:', r);
for (let k = 0; k < 4; k++) await frames(page, 30);
await page.screenshot({ path: OUT + 'dir_duel.png', timeout: 120000 });
// a captain kill: slow beat for the two
console.log('captain kill:', await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player, E = G.teams[window.__foe].leader; E.hp = 5; E.stun = 1; p.face = Math.atan2(E.x - p.x, E.z - p.z); p.cd = 0;
  F.attack(); F.step(8, 1 / 30, true);
  return `dead=${E.dead} slow killer=${(p.slowT || 0).toFixed(2)} victim=${(E.slowT || 0).toFixed(2)}`;
}));
console.log('errors:', errs.length ? errs : 'none');
await browser.close();
