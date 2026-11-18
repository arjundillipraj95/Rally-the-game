// C3d shots of Eagle's fall from the side (OUT=/tmp/c3/, TAG names them): the crouch with the gold circle, the arc with
// the eagle's shadow, the slam and its dust ring. Not a test: pictures for Arjun.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
import { mkdirSync } from 'fs';
const OUT = process.env.OUT || '/tmp/c3/', TAG = process.env.TAG || 'eagle'; mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 900, 520, { q: '?crown2=1&champ=titus&botchamp=titus', quality: 'high' });
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await run(150);
await page.evaluate(async () => {
  const F = window.__fb, G = F.G, L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'), p = G.player, me = G.myTi;
  L.gainXp(me, 1500, 't'); if (p.mounted) sim.dismount(p, false); p.vx = p.vz = 0; p.marchT = 0;
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader; if (E.mounted) sim.dismount(E, false);
  const at = (d, s) => [p.x + Math.sin(p.face) * d + Math.cos(p.face) * s, p.z + Math.cos(p.face) * d - Math.sin(p.face) * s];
  [E.x, E.z] = at(8, 0); E.vx = E.vz = 0; E.hp = E.max; window.__E = E;
  window.__foes = [[1.6, 1], [-1.4, .4], [.3, -1.8]].map(([s, d]) => { const [x, z] = at(8 + d, s); const f = sim.mkUnit(e, x, z, 'foot'); f.hp = f.max = 500; return f; });
  const mx = (p.x + E.x) / 2, mz = (p.z + E.z) / 2, sx = Math.cos(p.face), sz = -Math.sin(p.face);
  window.__camAt = [mx + sx * 10, p.y + 4.5, mz + sz * 10, mx, p.y + 1.5, mz];
});
await run(4);
await page.evaluate(() => { const E = window.__E; window.__hold = [E, ...window.__foes].map(u => [u, u.x, u.z]); window.__fb.ability(2); });
const shots = [['a_crouch', 3], ['b_rise', 9], ['c_peak', 6], ['d_fall', 8], ['e_slam', 4], ['f_dust', 6]];
for (const [name, n] of shots) {
  for (let k = 0; k < n; k++) { await run(1); await page.evaluate(() => { for (const [u, x, z] of window.__hold) { u.x = x; u.z = z; u.vx = u.vz = 0; } }); }
  await page.screenshot({ path: `${OUT}${TAG}_${name}.png`, timeout: 300000 });
}
console.log('shots', TAG, errs.length ? errs.join('\n') : 'no errors');
await browser.close();
