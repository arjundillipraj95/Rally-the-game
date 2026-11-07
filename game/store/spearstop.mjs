// Dev check: a rider galloping onto a braced spearman is stopped and hurt, not thrown off; a second hit
// (or a lame horse) still brings him down.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 320);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (u !== p) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  const mount = u => { u.mounted = true; u.r = .95; u.horseHp = 120; u.horse = { state: 'ridden', x: u.x, z: u.z, face: u.face, t: 0, rider: u, spd: 0 }; G.horses.push(u.horse); };
  const run = () => {
    const s = F.mkUnit(foe, 20, 10, 'foot'); s.tier = 1; s.hp = s.max = 1e4; s.face = Math.PI; s.vx = s.vz = 0; s.stun = 0; s.thinkT = 1e9;
    p.hp = p.max = 1e5; p.x = 20; p.z = -20; p.gallop = 0; p.slowT = 0; p.face = 0; p.vx = p.vz = 0; p.stun = 0; p.spearCd = 0; if (!p.mounted) mount(p);
    let hit = null;
    for (let i = 0; i < 150; i++) { s.vx = s.vz = 0; s.x = 20; s.z = 10; s.face = Math.PI; F.step(1, 1 / 30, { wx: 0, wz: 1, mag: 1, camYaw: 0 }); if (p.horseHp < 120 && !hit) hit = i; if (!p.mounted) break; }
    const o = { minSpeedNear: +Math.hypot(p.vx, p.vz).toFixed(1), z: +p.z.toFixed(1), stillMounted: p.mounted, horseHp: p.horseHp, charge: p.charge, hitFrame: hit };
    s.dead = true; G.units = G.units.filter(u => !u.dead); return o;
  };
  const first = run();
  const second = run(); // same horse, second spear: 120 -> 65 -> 10 -> still up; third brings it down
  const third = run();
  return { first, second, third };
});
console.log(JSON.stringify(r, null, 1)); console.log('errors:', errs.length ? errs : 'none');
await browser.close();
