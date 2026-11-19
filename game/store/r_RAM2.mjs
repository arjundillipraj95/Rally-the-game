// RAM2 Ram of Cassius's feel: the charge (scutum out in front: the blockIdle clip over his running legs, leaning in),
// a gold starburst and chips where the shield meets the champion, who staggers (no knockdown in open ground; into a
// wall he is knocked down for the wall stun: FALL1), and the aim marker half as wide again with a gold rim.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 900, 520, { q: '?crown2=1&champ=titus&botchamp=titus', quality: 'high' });
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await run(150);
await page.evaluate(async () => {
  const F = window.__fb, G = F.G, L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'), p = G.player, me = G.myTi;
  L.gainXp(me, 420, 't'); if (p.mounted) sim.dismount(p, false); p.vx = p.vz = 0; p.marchT = 0;
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader; if (E.mounted) sim.dismount(E, false);
  const at = (d, s) => [p.x + Math.sin(p.face) * d + Math.cos(p.face) * s, p.z + Math.cos(p.face) * d - Math.sin(p.face) * s];
  [E.x, E.z] = at(4.2, 0); E.vx = E.vz = 0; E.hp = E.max; window.__E = E;
  window.__foes = [[.3, -2.6], [-.3, -1.6]].map(([s, d]) => { const [x, z] = at(4.2 + d, s); const f = sim.mkUnit(e, x, z, 'arch'); f.face = p.face + Math.PI; f.hp = f.max = 500; return f; });
  const mx = (p.x + E.x) / 2, mz = (p.z + E.z) / 2, sx = Math.cos(p.face), sz = -Math.sin(p.face);
  window.__camAt = [mx + sx * 7, p.y + 3.5, mz + sz * 7, mx, p.y + 1, mz];
});
await run(4);
await page.evaluate(() => { const E = window.__E; window.__hold = [E, ...window.__foes].map(u => [u, u.x, u.z]); window.__fb.ability(0); });
const seen = { act: 0, lean: 0, burst: 0, kd: 0 };
for (let k = 0; k < 30; k++) { await run(1); const r = await page.evaluate(async () => { for (const [u, x, z] of window.__hold) if (u.hp >= u.max - .01) { u.x = x; u.z = z; u.vx = u.vz = 0; }
  const G = window.__fb.G, p = G.player, h = window.__f8.live.get(p), E = window.__E, he = window.__f8.live.get(E);
  return { act: !!(h && h.an && /^ram/.test(h.an.key) && h.an.steps[0] === 'blockIdle'), lean: h ? h.lean || 0 : 0, burst: window.__bursts ? window.__bursts() : 0, kd: !!(E.act && E.act.name === 'knockdown') || !!(he && he.an && /^knockdown/.test(he.an.key)) }; });
  seen.act = Math.max(seen.act, +r.act); seen.lean = Math.max(seen.lean, r.lean); seen.burst = Math.max(seen.burst, r.burst); seen.kd = Math.max(seen.kd, +r.kd); }
ok(seen.act, 'the charge: scutum out in front (blockIdle) over his running legs');
ok(seen.lean > .12, `leaning into it (${seen.lean.toFixed(2)} rad)`);
ok(seen.burst > 0, 'a starburst where the shield meets him');
ok(!seen.kd, 'open ground: the champion staggers, no knockdown');
// the aim marker while dragging the Ram (a fresh battle: no duel on the buttons)
await page.close();
const pg = await open(browser, 844, 390, { q: '?crown2=1&champ=titus' });
await pg.click('#segMode button[data-v="crown"]'); await pg.click('#goBtn');
const run2 = n => pg.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await pg.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run2(10);
await run2(60);
await pg.evaluate(async () => { const G = window.__fb.G, L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'); L.gainXp(G.myTi, 420, 't'); if (G.player.mounted) sim.dismount(G.player, false); });
await run2(10);
const aimW = await pg.evaluate(async () => { const d = (await import('/src/champions/index.js')).champOf(window.__fb.G.myTi).sp1; return ((d.w || .7) * 2 + .3) * 1.5; });
const r = await pg.evaluate(() => { const e = document.getElementById('ab1').getBoundingClientRect(); return [e.left + e.width / 2, e.top + e.height / 2]; });
await pg.mouse.move(r[0], r[1]); await pg.mouse.down(); await run2(2);
for (let i = 1; i <= 6; i++) { await pg.mouse.move(r[0] - 10 * i, r[1] - 18 * i); await run2(1); }
const slab = await pg.evaluate(() => window.__aim.shown().slab);
const geoW = await pg.evaluate(() => { const { scene } = window.__fb; let w = 0; scene.traverse(o => { const P = o.isMesh && o.geometry && o.geometry.parameters; if (P && P.width && Math.abs(P.height - window.__aim.shown().slab) < .01) w = P.width; }); return w; });
ok(slab > 1 && Math.abs(geoW - aimW) < .01, `the aim marker ${geoW.toFixed(2)} m wide (half as wide again: ${aimW.toFixed(2)})`);
await pg.screenshot({ path: '/tmp/menu/r_RAM2_aim.png' });
await pg.mouse.up();

await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
