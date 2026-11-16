// MAP9: the mountain's rivers are crossed only on bridges. No fords: every point of the rivers is deep water but the
// bridges. Over 3 minutes of battle no man of any army stands in deep water, and men sent across the river ring go by a
// bridge. An archer on one bank shoots a man on the other (the water is narrower than his range).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
const water = await page.evaluate(async () => {
  const { G } = window.__fb, w = await import('/src/core/world.js'), L = G.layout, V = L.river;
  let wet = 0, dry = 0, onBr = 0;
  for (const P of [V.pts, ...V.lines]) for (let i = 0; i < P.length - 1; i++) for (let k = 0; k < 6; k++) { const t = k / 6, x = P[i][0] + (P[i + 1][0] - P[i][0]) * t, z = P[i][1] + (P[i + 1][1] - P[i][1]) * t;
    const br = V.bridges.some(b => Math.hypot(b.x - x, b.z - z) < b.hw + .5); if (br) { onBr++; continue; } if (w.deepWater(x, z)) wet++; else dry++; }
  return { wet, dry, onBr, fords: V.fords.length };
});
ok(water.fords === 0 && water.dry === 0 && water.wet > 300, `no fords: every river point off a bridge is deep (${water.wet} deep, ${water.dry} shallow)`);
// 3 minutes of battle: nobody in deep water
let inWater = 0, samples = 0;
for (let k = 0; k < 36; k++) { await page.evaluate(() => window.__fb.step(150));
  const n = await page.evaluate(async () => { const w = await import('/src/core/world.js'); return window.__fb.G.units.filter(u => !u.dead && w.deepWater(u.x, u.z)).length; }); inWater += n; samples++; }
ok(inWater === 0, `3 minutes of battle: nobody in deep water (${inWater} in ${samples} looks)`);
// men sent across the river ring cross on a bridge
const cross = await page.evaluate(async () => {
  const { G } = window.__fb, L = G.layout, w = await import('/src/core/world.js'), sim = await import('/src/core/sim.js');
  const r0 = L.river.pts[0] ? Math.hypot(...L.river.pts[0]) : 0, a = w.mountHomeA(0) + .22; // (between two bridges)
  const men = sim.squadOf(G.player.ti).slice(0, 3), out = [], gx = Math.cos(a) * (r0 - 10), gz = Math.sin(a) * (r0 - 10);
  for (const u of men) { u.x = Math.cos(a) * (r0 + 9); u.z = Math.sin(a) * (r0 + 9); u.order = null; }
  return { n: men.length, ids: men.map(u => u.id), gx, gz, r0, a };
});
const tracks = []; for (let k = 0; k < 40; k++) { await page.evaluate(([ids, gx, gz]) => { const { G } = window.__fb; for (const u of G.units) if (ids.includes(u.id)) { u.tx = gx; u.tz = gz; u.goal = { x: gx, z: gz }; } window.__fb.step(15); }, [cross.ids, cross.gx, cross.gz]);
  tracks.push(await page.evaluate(async ids => { const w = await import('/src/core/world.js'), { G } = window.__fb; return G.units.filter(u => ids.includes(u.id) && !u.dead).map(u => ({ x: u.x, z: u.z, wet: w.deepWater(u.x, u.z), br: G.layout.river.bridges.some(b => Math.hypot(b.x - u.x, b.z - u.z) < b.len + 1) })); }, cross.ids)); }
const wetSteps = tracks.flat().filter(p => p.wet).length;
ok(wetSteps === 0, `men walked toward the far bank never stood in deep water (${wetSteps})`);
// an archer shoots across
const shot = await page.evaluate(async () => {
  const { G } = window.__fb, L = G.layout, w = await import('/src/core/world.js'), sim = await import('/src/core/sim.js');
  const r0 = Math.hypot(...L.river.pts[0]), a = w.mountHomeA(1) + .55, me = G.player; // (away from the camps and the bridges)
  const st = await import('/src/core/state.js'), myA = G.ALLY[st.colorOf(me.ti)], foeTi = G.teams.findIndex((t, i) => t && G.ALLY[st.colorOf(i)] !== myA);
  const arch = sim.mkUnit(me.ti, Math.cos(a) * (r0 + 6.5), Math.sin(a) * (r0 + 6.5), 'arch'), foe = sim.mkUnit(foeTi, Math.cos(a) * (r0 - 6.5), Math.sin(a) * (r0 - 6.5), 'foot'); arch.id = 990001; foe.id = 990002; G.units.push(arch, foe);
  arch.x = Math.cos(a) * (r0 + 6.5); arch.z = Math.sin(a) * (r0 + 6.5); foe.x = Math.cos(a) * (r0 - 6.5); foe.z = Math.sin(a) * (r0 - 6.5);
  arch.order = 'hold'; foe.order = 'hold'; const hp0 = foe.hp, arrows0 = G.arrows ? G.arrows.length : 0;
  let fired = 0; const seen = new Set(); for (let i = 0; i < 600; i++) { foe.x = Math.cos(a) * (r0 - 6.5); foe.z = Math.sin(a) * (r0 - 6.5); foe.vx = foe.vz = 0; arch.x = Math.cos(a) * (r0 + 6.5); arch.z = Math.sin(a) * (r0 + 6.5); arch.vx = arch.vz = 0; me.x = Math.cos(a + .03) * (r0 + 8); me.z = Math.sin(a + .03) * (r0 + 8); me.vx = me.vz = 0; window.__fb.step(1); for (const r of G.arrows || []) if (r.shooter === arch) seen.add(r.id); } fired = seen.size;
  return { d: Math.hypot(arch.x - foe.x, arch.z - foe.z), range: arch.range, fired, hurt: hp0 - foe.hp, dead: foe.dead };
});
ok(!shot.none && shot.fired > 0 && (shot.hurt > 0 || shot.dead), `an archer shoots across the river (${shot.d && shot.d.toFixed(1)} m, range ${shot.range}; ${shot.fired} arrows, ${Math.round(shot.hurt || 0)} damage${shot.dead ? ', killed' : ''})`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
