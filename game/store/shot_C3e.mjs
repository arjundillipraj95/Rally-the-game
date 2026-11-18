// C3e shots of Testudo march (OUT=/tmp/c3/, TAG names them): his men locking shields and marching to the drum.
// Not a test: pictures for Arjun.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
import { mkdirSync } from 'fs';
const OUT = process.env.OUT || '/tmp/c3/', TAG = process.env.TAG || 'testudo'; mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 900, 520, { q: '?crown2=1&champ=titus&botchamp=titus', quality: 'high' });
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await run(150);
await page.evaluate(async () => {
  const F = window.__fb, G = F.G, L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'), p = G.player, me = G.myTi;
  L.gainXp(me, 1500, 't'); for (let i = 0; i < 8; i++) sim.mkUnit(me, p.x + Math.sin(p.face) * (2 + (i >> 2)) + Math.cos(p.face) * ((i & 3) - 1.5), p.z + Math.cos(p.face) * (2 + (i >> 2)) - Math.sin(p.face) * ((i & 3) - 1.5), i < 6 ? 'foot' : 'arch'); G.teams[me].rally = 100; (await import('/src/core/sim/army.js')).setOrder(me, 'follow'); if (p.mounted) sim.dismount(p, false); p.vx = p.vz = 0; p.marchT = 0;
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader; if (E.mounted) sim.dismount(E, false);
  const at = (d, s) => [p.x + Math.sin(p.face) * d + Math.cos(p.face) * s, p.z + Math.cos(p.face) * d - Math.sin(p.face) * s];
  [E.x, E.z] = at(8, 0); E.vx = E.vz = 0; E.hp = E.max; window.__E = E;
  window.__foes = [[1.6, 1], [-1.4, .4], [.3, -1.8]].map(([s, d]) => { const [x, z] = at(8 + d, s); const f = sim.mkUnit(e, x, z, 'foot'); f.hp = f.max = 500; return f; });
  const mx = (p.x + E.x) / 2, mz = (p.z + E.z) / 2, sx = Math.cos(p.face), sz = -Math.sin(p.face);
  window.__camAt = [p.x + Math.sin(p.face + .9) * 8, p.y + 5, p.z + Math.cos(p.face + .9) * 8, p.x - Math.sin(p.face) * 2, p.y + .5, p.z - Math.cos(p.face) * 2];
});
await run(4);
await page.evaluate(() => { const E = window.__E; window.__hold = [E, ...window.__foes].map(u => [u, u.x, u.z]); window.__fb.rally(); });
const shots = [['a_lock', 20], ['b_march', 45]];
for (const [name, n] of shots) {
  for (let k = 0; k < n; k++) { await run(1); await page.evaluate(() => { for (const [u, x, z] of window.__hold) { u.x = x; u.z = z; u.vx = u.vz = 0; } }); }
  await page.screenshot({ path: `${OUT}${TAG}_${name}.png`, timeout: 300000 });
}
console.log('shots', TAG, errs.length ? errs.join('\n') : 'no errors');
await browser.close();
