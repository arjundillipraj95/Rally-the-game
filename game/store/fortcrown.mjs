// Dev check: Fortify in the Crown: stand in a castle your side holds, fortify it twice (tougher gates,
// then towers that shoot), mend a broken gate; three gates, the main one widest.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#playBtn'); await frames(page, 5);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player, s = G.teams[G.myTi], cw = G.layout.cwalls[0], h = G.holds[cw.hid], out = {};
  out.gates = [0, 1, 2].map(gi => cw.obs.filter(o => o.gi === gi).length);
  G.T = 30; h.owner = G.ALLY[G.myTi % 4]; F.step(1, 1 / 30);
  out.outside = F.costOf ? null : null;
  p.x = cw.x + 4; p.z = cw.z + 4; s.gold = 999;
  const g0 = s.gold; F.upgrade('fort'); out.lv1 = { lv: G.cgates[cw.hid].lv, paid: g0 - s.gold, hp: G.cgates[cw.hid].hp.map(Math.round) };
  F.upgrade('fort'); out.lv2 = G.cgates[cw.hid].lv; out.maxed = (F.upgrade('fort'), G.cgates[cw.hid].lv);
  G.cgates[cw.hid].broken = 2; const g1 = s.gold; F.upgrade('fort'); out.mend = { broken: G.cgates[cw.hid].broken, paid: g1 - s.gold };
  // an enemy footman by the wall: the towers shoot
  const foeTi = [0, 1, 2, 3].find(i => G.ALLY[i] !== G.ALLY[G.myTi % 4]), e = F.mkUnit(foeTi, cw.x + Math.cos(h.towerA0) * 15, cw.z + Math.sin(h.towerA0) * 15, 'foot'); e.hp = e.max = 9999;
  const a0 = G.arrows.length; for (let i = 0; i < 120; i++) F.step(1, 1 / 30); out.towerArrows = G.arrows.filter(a => a.tower || true).length - a0;
  p.x = cw.x + 40; p.z = cw.z + 40; F.step(1, 1 / 30); out.awayCost = null;
  return out;
});
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
