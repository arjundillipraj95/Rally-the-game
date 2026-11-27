// FEEL5 (Arjun 26 Nov) Devi's feel, the host's rules: Tiger's volley 32 arrows over 4 s; Arrow storm hits everyone
// inside each beat; her first arrow after an Evade is double; her double (third) shot and the boosted arrow push the
// target back a step. Her own arrows on a joined phone: store/r_FEEL5-join.mjs. Run from game/.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 851, 393, { q: '?crown2=1&champ=devi', quality: 'low' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await frames(page, 30);
const r = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), D = await import('/src/core/sim/deviShots.js'), R = await import('/src/core/sim/ranged.js');
  const M = await import('/src/core/sim/missiles.js'), C = await import('/src/champions/index.js'), st = await import('/src/core/state.js');
  const me = G.player, o = {}, d = C.champOf(me.ti), e = [1, 2, 3].map(k => (me.ti + k) % 4).find(t => st.isEnemyTi(me.ti, t));
  o.volley = { n: d.ult.n, dur: d.ult.dur };
  const far = u => { u.x += 500; u.z += 500; };
  G.units.forEach(u => { if (u !== me && !u.dead && Math.hypot(u.x - me.x, u.z - me.z) < 60) far(u); });
  // the storm: 6 of her archers near, 5 enemies inside the circle
  const at = { x: me.x, z: me.z }, men = []; me.x -= 12; // (open ground where she stood)
  for (let k = 0; k < 6; k++) { const a = sim.mkUnit(me.ti, me.x - 2 + k, me.z - 3, 'arch'); a.stun = 0; }
  for (let k = 0; k < 5; k++) { const f = sim.mkUnit(e, at.x + Math.cos(k) * 3, at.z + Math.sin(k) * 3, 'foot'); f.max = f.hp = 5000; f.stun = 99; f.shieldwall = false; men.push(f); }
  D.startStorm(me, at, d.armyUlt);
  const t0 = G.T; while (G.T < t0 + d.armyUlt.warn + d.armyUlt.dur + 1.2) { men.forEach((f, k) => { f.x = at.x + Math.cos(k) * 3; f.z = at.z + Math.sin(k) * 3; f.vx = f.vz = 0; f.stun = 99; }); F.step(1); }
  o.storm = men.map(f => Math.round(f.max - f.hp));
  men.forEach(far); G.units.filter(u => u.kind === 'arch' && u.ti === me.ti).forEach(far);
  // the boosted arrow after an Evade, and the push of the double shot
  const tg = sim.mkUnit(e, me.x + 6, me.z, 'foot'); tg.max = tg.hp = 5000; tg.stun = 99; me.cd = 0; me.rN = 0; me.boostShot = false;
  G.arrows.length = 0; R.rangedShot(me); o.plain = G.arrows[G.arrows.length - 1].jd;
  D.startEvade(me, { x: me.x - 3, z: me.z }, d.sp2); me.dashStop = 0; me.x = tg.x - 6; me.z = tg.z; me.cd = 0; me.rN = 0; G.arrows.length = 0; R.rangedShot(me);
  const b = G.arrows[G.arrows.length - 1]; o.boost = { jd: b.jd, flag: !!b.boost }; o.boostOnce = !me.boostShot;
  const kick = a => { tg.vx = tg.vz = 0; tg.kick = { n: 0, vx: 0, vz: 0, st: 0, dirty: false }; tg.x = me.x + 6; tg.z = me.z; M.arrowHit(Object.assign({ x0: me.x, z0: me.z, shooter: me, ti: me.ti, champ: true, jd: 10, t: 1 }, a), tg); return Math.hypot(tg.vx, tg.vz); };
  o.push = { plain: kick({}), third: kick({ third: true }), boost: kick({ boost: true }) };
  return o;
});
console.log(JSON.stringify(r));
ok(r.volley.n === 32 && r.volley.dur === 4, `Tiger's volley: ${r.volley.n} arrows over ${r.volley.dur} s`);
ok(r.storm.every(h => h > 0), `Arrow storm: everyone inside is hit (${r.storm.join(', ')})`);
ok(Math.max(...r.storm) / Math.max(1, Math.min(...r.storm)) < 2, 'and evenly, not by luck');
ok(Math.abs(r.boost.jd / r.plain - 2) < .01 && r.boost.flag && r.boostOnce, `her first arrow after an Evade is double (${r.plain.toFixed(1)} -> ${r.boost.jd.toFixed(1)}), once`);
ok(r.push.third > r.push.plain + 1 && r.push.boost > r.push.third, `her double shot and boosted arrow push him back (${r.push.plain.toFixed(1)}, ${r.push.third.toFixed(1)}, ${r.push.boost.toFixed(1)})`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
