// Dev check: what an execution looks like: the beaten captain marked, then the executioner's weapon
// raised over the kneeling man (shot just before the blow falls), from the player's camera.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 5);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  const L = G.teams[foe].leader;
  for (const u of G.units) if (u !== p && u !== L) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  L.x = X + 2.2; L.z = Z; L.face = -Math.PI / 2; L.max = 180; L.hp = 40; L.stun = 0; L.guardT = 0; L.guardCd = 99; L.cd = 99;
  p.x = X; p.z = Z; p.face = Math.PI / 2; p.cd = 0; F.cam.yaw = Math.PI / 2 + .5;
  F.step(3, 1 / 30, true);
});
await frames(page, 25);
await page.screenshot({ path: OUT + 'exec_mark.png', timeout: 120000 });
await page.evaluate(() => { window.__fb.attack(); });
await frames(page, 18);
console.log(await page.evaluate(() => { const G = window.__fb.G, p = G.player, L = G.units.find(u => u.leader && u !== p && u.execV !== undefined); return JSON.stringify({ execA: p.execA, execT: p.execT, Lv: L && L.execV, d: L && Math.hypot(L.x - p.x, L.z - p.z).toFixed(2), T: G.T.toFixed(2) }); }));
await page.screenshot({ path: OUT + 'exec_raise.png', timeout: 120000 });
console.log(await page.evaluate(() => { const p = window.__fb.G.player, a = window.__anim.get(p); return JSON.stringify({ exT: a.exT, wArmX: a.wArmX, sArmX: a.sArmX, bodyRX: a.bodyRX, execA: p.execA, swing: p.swing, blocking: p.blocking }); }));
if (process.argv[2] === 'side') { await page.evaluate(() => { const G = window.__fb.G, p = G.player, v = p.execOf, mx = (p.x + v.x) / 2, mz = (p.z + v.z) / 2, a = Math.atan2(v.x - p.x, v.z - p.z), nx = Math.cos(a), nz = -Math.sin(a); window.__camAt = [mx + nx * 4.2, p.y + 2.2, mz + nz * 4.2, mx, p.y + 1.6, mz]; }); await frames(page, 1); await page.screenshot({ path: OUT + 'exec_side.png', timeout: 120000 }); await frames(page, 4); await page.screenshot({ path: OUT + 'exec_side2.png', timeout: 120000 }); }
await browser.close();
console.log('ok');
