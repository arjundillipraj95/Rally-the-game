// C3h shots of the soldiers' upgrade looks (OUT=/tmp/c3/, TAG names them): spearmen tiers 0, 1, 2 and archers tiers
// 0, 1, 2 in a row, front and back. Not a test: pictures for Arjun.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const OUT = process.env.OUT || '/tmp/c3/', TAG = process.env.TAG || 'tiers';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 900, 520, { q: '?crown2=1', quality: 'high' });
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await run(150);
await page.evaluate(async () => {
  const G = window.__fb.G, sim = await import('/src/core/sim.js'), p = G.player, me = G.myTi;
  for (const u of G.units) if (!u.leader && u.ti === me) { u.dead = true; u.hp = 0; }
  const f = p.face, rx = Math.cos(f), rz = -Math.sin(f), fx = Math.sin(f), fz = Math.cos(f);
  window.__row = [['foot', 0], ['foot', 1], ['foot', 2], ['arch', 0], ['arch', 1], ['arch', 2]].map(([k, t], i) => {
    const s = (i - 2.5) * 1.6, x = p.x + fx * 5 + rx * s, z = p.z + fz * 5 + rz * s, u = sim.mkUnit(me, x, z, k); u.tier = t; u.rest = true; u.face = f + Math.PI; return [u, x, z]; });
  const cx = p.x + fx * 5, cz = p.z + fz * 5, cy = p.y; window.__see = d => { window.__camAt = [cx - fx * d * 8, cy + 2.2, cz - fz * d * 8, cx, cy + 1.2, cz]; };
  p.x += rx * 9; p.z += rz * 9; window.__p = [p.x, p.z];
  window.__see(1);
});
for (const [name, side] of [['front', -1], ['back', 1]]) {
  await page.evaluate(side => { for (const [u, x, z] of window.__row) { u.x = x; u.z = z; u.vx = u.vz = 0; } window.__see(side); for (const [u] of window.__row) u.face = side > 0 ? window.__fb.G.player.face + Math.PI : window.__fb.G.player.face; }, side);
  for (let i = 0; i < 4; i++) { await run(1); await page.evaluate(side => { const F = window.__fb.G.player.face; for (const [u, x, z] of window.__row) { u.x = x; u.z = z; u.vx = u.vz = 0; u.stun = 9; u.face = side > 0 ? F : F + Math.PI; u.foe = null; } }, side); }
  await page.screenshot({ path: `${OUT}${TAG}_${name}.png`, timeout: 300000 });
}
console.log('shots', TAG, errs.length ? errs.join('\n') : 'no errors');
await browser.close();
