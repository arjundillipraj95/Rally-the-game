// Dev check: the captain's run, side-on (a strip through the stride), then a cavalry charge into a line of
// footmen: men knocked flying and lying where they fall, in the new models.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 300);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 20);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player, me = p.ti;
  for (const s of G.teams) { s.recruitT = 1e9; s.thinkT = 1e9; }
  const foes = G.units.filter(u => u.kind === 'foot' && G.ALLY[u.ti % 4] !== G.ALLY[me % 4]).slice(0, 8);
  for (const u of G.units) if (u !== p && !foes.includes(u)) u.hidden = true;
  p.x = -70; p.z = 0; p.face = Math.PI / 2; window.__foes = foes;
  foes.forEach((u, i) => { u.x = -30 + (i % 2) * .9; u.z = -3 + i * .8; u.face = -Math.PI / 2; u.stun = 99; u.hp = 2; });
  window.__moveOverride = () => ({ wx: 1, wz: 0, mag: 1, camYaw: 0 });
  document.querySelectorAll('#hud, .hud, #ctl').forEach(e => e.style.display = 'none');
});
const follow = (d = 6) => page.evaluate(d => { const p = window.__fb.G.player; window.__camAt = [p.x, p.y + 2, p.z + d, p.x, p.y + 1.3, p.z]; }, d);
for (let i = 0; i < 20; i++) { await follow(); await frames(page, 1); }
for (let i = 0; i < 6; i++) { await follow(); await frames(page, 1); await page.screenshot({ path: OUT + `run_${i}.png`, timeout: 150000 }); }
console.log('run speed', await page.evaluate(() => { const p = window.__fb.G.player; return Math.hypot(p.vx, p.vz).toFixed(1); }));
// the charge: mounted, galloping into the line
await page.evaluate(() => { const G = window.__fb.G, p = G.player; p.x = -48; p.mounted = true; p.r = .95; p.horseHp = 100; p.horse = { state: 'ridden', x: p.x, z: p.z, face: 0, t: 0, rider: p, spd: 0 }; G.horses.push(p.horse); p.charge = 2.2; p.gallop = 1; });
let shots = 0;
for (let f = 0; f < 120 && shots < 4; f++) {
  await page.evaluate(() => { const G = window.__fb.G, p = G.player; p.charge = Math.max(p.charge, 1); window.__foes.forEach((u, i) => { if (!u.dead && !u.flung) { if (Math.hypot(u.vx, u.vz) > 3) u.flung = true; else { u.x = -30 + (i % 2) * .9; u.z = p.z - 3 + i * .8; u.vx = u.vz = 0; } } }); window.__camAt = [-30, p.y + 3.5, 11, -30, p.y + 1, 0]; });
  await frames(page, 1);
  const dead = await page.evaluate(() => window.__foes.filter(u => u.dead).length);
  if (dead > 0 && shots < 4) { await page.screenshot({ path: OUT + `charge_${shots}.png`, timeout: 150000 }); shots++; await frames(page, 3); }
}
console.log(await page.evaluate(() => { const p = window.__fb.G.player; return JSON.stringify({ px: p.x.toFixed(1), pz: p.z.toFixed(1), m: p.mounted, f: window.__foes.slice(0, 3).map(u => [u.x.toFixed(1), u.z.toFixed(1), u.hp, u.dead]) }); })); console.log('charge shots', shots, 'dead', await page.evaluate(() => window.__foes.filter(u => u.dead).length), 'errors', errs.slice(0, 3));
await browser.close();
