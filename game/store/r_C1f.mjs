// C1f: every champion has a mount from his page, used as today (Ride): his pace on foot and his horse's pace and
// health come from the page. A test champion (window.__champs, dev only) 15% quicker on foot and on horseback with a
// sturdier horse, against the default (legionary). Both call their horse and ride.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const init = `window.__champs = [{ id: 'swift', name: 'Swift', cls: 'raider', stats: { hp: 3.6, hit: .34, spd: 6.2 * 1.15 }, weapons: ['sword'], mount: { kind: 'horse', hp: 2.3, spd: 1.15 }, recruits: ['foot'], influence: null, sp1: null, sp2: null, ult: null, armyUlt: null }];`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=legionary&botchamp=swift', init });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js');
  G.T = 30; F.step(60); const me = G.myTi, bi = G.teams.findIndex((t, i) => t.active && i !== me), a = G.teams[me].leader, b = G.teams[bi].leader;
  // both call their horse, and ride (a computer may step down again at once: any moment on horseback counts)
  for (const u of [a, b]) { u.lastHit = -9; u.horseCd = 0; sim.toggleHorseFor(u); }
  const rode = [false, false]; let t = 0;
  for (; t < 30 * 15 && !(rode[0] && rode[1]); t++) { for (const u of [a, b]) { u.lastHit = -9; u.foe = null; } F.step(1); rode[0] ||= a.mounted; rode[1] ||= b.mounted; }
  for (const u of [a, b]) if (u.mounted) sim.dismount(u, false);
  // paces, side by side on open ground (a player's gallop builds on the straight: both measured as computers)
  for (const u of [a, b]) { u.vx = u.vz = 0; u.marchT = 0; u.boostT = 0; u.inSafe = true; u.charge = 0; u.human = false; }
  const foot = [sim.speedOf(a), sim.speedOf(b)], hp = [Math.round(sim.horseMax(me)), Math.round(sim.horseMax(bi))];
  for (const u of [a, b]) u.mounted = true;
  const ride = [sim.speedOf(a), sim.speedOf(b)];
  for (const u of [a, b]) u.mounted = false; a.human = true;
  return { foot, ride, hp, mounted: rode, secs: (t / 30).toFixed(1) }; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const r = (x, y) => +(y / x).toFixed(3);
ok(Math.abs(r(...o.foot) - 1.15) < .01, `on foot: ${o.foot.map(v => v.toFixed(2)).join(' vs ')} m/s (x${r(...o.foot)})`);
ok(Math.abs(r(...o.ride) - 1.15 * 1.15) < .02, `riding: ${o.ride.map(v => v.toFixed(2)).join(' vs ')} m/s (x${r(...o.ride)}: his pace and his horse's)`);
ok(o.hp[0] === 190 && o.hp[1] === Math.round(95 * 2.3), `horse health ${o.hp.join(' vs ')}`);
ok(o.mounted[0] && o.mounted[1], `both called their horse and rode (${o.secs} s)`);
// base to the Crown is 207 m (r_MAP1): on foot about 30 s, riding about 207 / ride speed
console.log(`     base to the Crown (207 m): riding ${(207 / o.ride[0]).toFixed(0)} s (legionary), ${(207 / o.ride[1]).toFixed(0)} s (swift); on foot ~30 s (r_MAP1)`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
