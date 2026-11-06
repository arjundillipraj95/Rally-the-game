// Dev check: the new 3D captains in a match (?models=1): standing, running, a blow, guarding, a heavy wind-up
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 1280, 590);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => localStorage.setItem('rally.models', '1')); await page.reload();
await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
await page.evaluate(() => { document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 30);
await page.evaluate(() => { const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), L = G.teams[foe].leader; window.__L = L;
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.upT = 1e9; }
  for (const c of [p, L]) { if (c.summon) { c.summon.state = 'leaving'; c.summon = null; } c.horseCd = 99; c.mounted = false; }
  p.x = -10; p.z = 10; p.face = Math.PI / 2; L.x = -7.3; L.z = 12.6; L.face = Math.atan2(-2.7, -2.6); p.hp = p.max = 1e4; L.hp = L.max = 1e4; L.weapon = 'sword'; F.cam.yaw = p.face; });
await frames(page, 40);
const shot = async (n, f) => { await page.evaluate(f); await frames(page, 1); await page.screenshot({ path: OUT + 'hero_' + n + '.png' }); };
await shot('stand', () => {});
const S = 'const S = await import("/src/core/sim.js");';
await page.evaluate(async () => { const S = await import('/src/core/sim.js'); const L = window.__L; L.cd = 0; L.stun = 0; S.captainAttack(L); });
await frames(page, 4); await page.screenshot({ path: OUT + 'hero_swing.png' });
await frames(page, 3); await page.screenshot({ path: OUT + 'hero_swing2.png' });
await frames(page, 20);
await shot('guard', () => { const G = window.__fb.G; G.player.blocking = true; });
await frames(page, 6); await page.screenshot({ path: OUT + 'hero_guard.png' });
await page.evaluate(() => { const G = window.__fb.G, p = G.player, L = window.__L; p.blocking = false; L.windup = 3; L.heavyTg = p; L.swingKind = 5; L.cd = 4; });
await frames(page, 12); await page.screenshot({ path: OUT + 'hero_windup.png' });
console.log('errors:', errs.slice(0, 3), OUT);
await browser.close();
