// CASTLE1: castle levels 0-3, gates in layers of plates. Damage never heals; Fortify adds a layer to every gate and
// never refills what was knocked off; each plate pays the side that broke it, once; a captured castle drops to
// level 0 and its banner rises for CASTLE26.shield s, when nobody can take it. (Joined phones: r_CASTLE1-join.mjs.)
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const { G } = window.__fb, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js'), cfg = await import('/src/config.js');
  const army = await import('/src/core/sim/army.js'), c2 = await import('/src/core/sim/crown2.js'), C = cfg.CASTLE26;
  const me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], foeTi = G.teams.findIndex((s, i) => s && s.leader && G.ALLY[st8.colorOf(i)] !== myA);
  const foe = G.teams[foeTi].leader, foeA = G.ALLY[st8.colorOf(foeTi)], o = {};
  const castles = G.holds.filter(h => h.kind === 'castle');
  o.startLv = castles.map(h => G.cgates[h.id].lv); o.startOpen = castles.every(h => G.cgates[h.id].broken === 15);
  // one of my side's castles, at level 1 (Fortify bought by me, standing in it)
  const h = castles.find(x => x.side === st8.colorOf(me.ti) && x.mid), cw = G.layout.cwalls.find(c => c.hid === h.id), st = () => G.cgates[h.id];
  h.owner = myA; G.cgates[h.id] = f.freshGates(0); f.applyCastleGates();
  me.x = h.x + 2; me.z = h.z; G.teams[me.ti].gold = 2000;
  o.cost0 = army.upgradeCost(me.ti, 'fort'); o.bought1 = army.buyUpgrade(me.ti, 'fort');
  const gate = gi => cw.obs.find(w => w.cgate != null && w.gi === gi), w0 = gate(0);
  o.lv1 = st().lv; o.shut1 = !w0.off; o.max1 = st().max[0]; o.L = [0, 1, 2].map(n => f.layerHp(0, n));
  // the foe hacks the lane gate to about half
  const goldOf = () => G.teams.map((s, i) => s && s.active && G.ALLY[st8.colorOf(i)] === foeA ? s.gold : null);
  const g0 = goldOf();
  while (st().hp[0] > st().max[0] * .5) f.hitWall(foe, w0);
  const g1 = goldOf(); o.paidHalf = st().paid[0]; o.goldGain = g1.map((v, i) => v == null ? null : v - g0[i]).filter(v => v != null);
  const hpHalf = st().hp[0], maxHalf = st().max[0];
  // I fortify it: the damage stays, one layer more
  o.cost1 = army.upgradeCost(me.ti, 'fort'); army.buyUpgrade(me.ti, 'fort');
  o.afterFort = { hp: st().hp[0] - hpHalf, max: st().max[0] - maxHalf, lv: st().lv, paid: st().paid[0] };
  // no plate pays twice: hit once more and count
  const g2 = goldOf(); f.hitWall(foe, w0); o.oneHitGain = goldOf().map((v, i) => v == null ? null : v - g2[i]).filter(v => v != null);
  // break it fully; then my men stand in the yard for 70 s of rules: it stays broken
  let n = 0; while (!((st().broken >> 0) & 1) && n < 2000) { f.hitWall(foe, w0); n++; }
  o.broken = !!(st().broken & 1); o.openWhenBroken = !!w0.off; o.platesAll = st().paid[0];
  const maxBroken = st().max[0];
  for (let k = 0; k < 140; k++) c2.c2Tick(.5);
  o.stillBroken = !!(st().broken & 1) && st().hp[0] === 0;
  // fortify on the broken gate: it shuts with one fresh layer
  army.buyUpgrade(me.ti, 'fort');
  o.reshut = { shut: !w0.off, hp: st().hp[0], layer: f.layerHp(0, 2), max: st().max[0] - maxBroken, lv: st().lv };
  o.cost3 = army.upgradeCost(me.ti, 'fort');
  // the foe takes it: level 0, gates open, the banner rises
  const away = u => { if (u !== foe && !u.dead && Math.hypot(u.x - h.x, u.z - h.z) < h.r + 6) { u.x += 300; u.z += 300; } };
  const cap = await import('/src/core/sim/capture.js'), cc = cap.circleAt(h); st().broken |= 2; f.applyCastleGates(); // (CASTLE4: a gate down opens the circle)
  G.units.forEach(away); foe.x = cc.x + .5; foe.z = cc.z; foe.hp = foe.max;
  for (let k = 0; k < 400 && h.owner !== foeA; k++) c2.c2Hold(h, .1);
  o.taken = h.owner === foeA; o.takenLv = st().lv; o.takenOpen = st().broken === 15; o.shield = h.shieldT - G.T;
  // I stand in it alone for 30 s: nothing (the banner is rising)
  foe.x += 300; me.x = cc.x + .5; me.z = cc.z; G.units.forEach(u => { if (u !== me) away(u); });
  for (let k = 0; k < 300; k++) c2.c2Hold(h, .1);
  o.shieldHeld = h.owner === foeA && !h.prog;
  // after the shield: it can be taken
  h.shieldT = G.T - 1; for (let k = 0; k < 400 && h.owner !== myA; k++) c2.c2Hold(h, .1);
  o.retake = h.owner === myA;
  o.C = C; return o;
});
const C = r.C;
ok(r.startLv.every(v => v === 0) && r.startOpen, `every castle starts at level 0, gates open (${r.startLv.join('')})`);
ok(r.cost0 === C.fortCost[0] && r.bought1 && r.lv1 === 1 && r.shut1, `Fortify ${r.cost0}g: level 1, gates shut`);
ok(r.max1 === r.L[0], `level 1 lane gate: ${r.max1}`);
ok(r.paidHalf === 1 && r.goldGain.every(v => v === C.plateGold), `half the gate gone: 1 plate, +${C.plateGold} gold to each foe army (${r.goldGain.join(', ')})`);
ok(r.cost1 === C.fortCost[1] && r.afterFort.lv === 2 && Math.abs(r.afterFort.hp - r.L[1]) < 1e-6 && r.afterFort.max === r.L[1] && r.afterFort.paid === 1,
  `Fortify mid-attack: +1 layer on top (hp +${r.afterFort.hp}, max +${r.afterFort.max}); the damage stays`);
ok(r.oneHitGain.every(v => v === 0), 'one more blow: no plate paid twice');
ok(r.broken && r.openWhenBroken && r.platesAll === 5, `broken: open, every plate paid (${r.platesAll} of 5)`);
ok(r.stillBroken, 'my men in the yard for 70 s: it does not mend');
ok(r.reshut.shut && r.reshut.hp === r.reshut.layer && r.reshut.max === r.reshut.layer && r.reshut.lv === 3, `Fortify a broken gate: shut with one fresh layer (${r.reshut.hp})`);
ok(r.cost3 == null, 'level 3: nothing more to buy');
ok(r.taken && r.takenLv === 0 && r.takenOpen, 'taken: level 0, gates open');
ok(Math.abs(r.shield - C.shield) < .5, `banner rising for ${r.shield.toFixed(1)} s`);
ok(r.shieldHeld, 'standing in it alone while the banner rises: no progress');
ok(r.retake, 'after the banner is up: it can be taken');
await frames(page, 10); await page.screenshot({ path: '/tmp/r_CASTLE1.png' });
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
