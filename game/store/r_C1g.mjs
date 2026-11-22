// C1g: base numbers. Every champion page inside the design's hard limits and budget (champions/limits.js; Titus,
// Devi and Sigrun's agreed numbers pass, an unfair page is refused); infantry 100; a computer champion's blows come
// 1/rate apart; a player's 3-hit sword combo takes 3/rate s, the beat moving with it; his reach is his page's.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const slow = { id: 'slow', name: 'Slow', cls: 'vanguard', stats: { hp: 480, dmg: 30, rate: 1.2, reach: 1.4, spd: 5.9 }, weapons: ['sword'],
  mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['foot', 'arch'], influence: null, sp1: null, sp2: null, ult: null, armyUlt: null };
const init = `window.__champs = [${JSON.stringify(slow)}];`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=slow&botchamp=legionary', init });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, cfg = await import('/src/config.js'), lim = await import('/src/champions/limits.js');
  const reg = await import('/src/champions/index.js'), cap = await import('/src/core/sim/captain.js'), mel = await import('/src/core/sim/melee.js');
  const page = (id, s, m, ranged) => ({ id, ranged, stats: s, mount: { spd: m } });
  const pages = {
    legionary: lim.checkChamp(reg.CHAMPS.legionary), slow: lim.checkChamp(reg.CHAMPS.slow),
    titus: lim.checkChamp(page('titus', { hp: 480, dmg: 30, rate: 1.2, reach: 1.4, spd: 5.9 }, 11.2)),
    devi: lim.checkChamp(page('devi', { hp: 300, dmg: 24, rate: 1.75, reach: 14, spd: 5.9 }, 11.2, true)),
    sigrun: lim.checkChamp(reg.CHAMPS.sigrun), // (C5: her page)
    unfair: lim.checkChamp(page('unfair', { hp: 560, dmg: 40, rate: 1.3, reach: 1.3, spd: 7 }, 12.5)),
  };
  G.T = 30; F.step(30);
  const me = G.teams[G.myTi].leader, bi = G.teams.findIndex((t, i) => t.active && i !== G.myTi), bot = G.teams[bi].leader;
  const real = Math.random; Math.random = () => .4; // (rnd(.9, 1.15) = 1)
  bot.cd = 0; bot.stun = 0; bot.guardUp = false; mel.startSwing(bot, null); const botGap = bot.cd;
  // a player's combo, alone on open ground: three presses, each as soon as the last blow's wait is over
  for (const u of G.units) if (u !== me) { u.x = 900; u.z = 900; }
  me.weapon = 'sword'; me.lastSwingT = -9; me.combo = 0; let total = 0; const gaps = [];
  for (let i = 0; i < 3; i++) { me.cd = 0; me.stun = 0; me.st = 999; me.pending = null; cap.captainAttack(me); gaps.push(+me.cd.toFixed(3)); total += me.cd; me.lastSwingT = G.T; G.T += me.cd; }
  Math.random = real;
  return { pages, inf: cfg.STATS.foot.hp, footHit: cfg.STATS.foot.dmg, botGap, gaps, total, combo: me.combo, reach: me.reach, botReach: bot.reach, myHp: me.max, myDmg: me.dmg };
});
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
for (const k of ['legionary', 'slow', 'titus', 'devi', 'sigrun']) ok(o.pages[k].length === 0, `${k} inside the limits and budget${o.pages[k].length ? ': ' + o.pages[k].join('; ') : ''}`);
ok(o.pages.unfair.length > 0, `an unfair page refused: ${o.pages.unfair.join('; ')}`);
ok(o.inf === 100 && o.footHit === 20, `infantry ${o.inf} health, a footman's hit ${o.footHit}`);
ok(Math.abs(o.botGap - 1 / 1.4) < .005, `a computer champion's blows ${o.botGap.toFixed(3)} s apart (1/1.4 = .714)`);
ok(Math.abs(o.total - 3 / 1.2) < .01 && o.combo === 2, `a player's 3-hit combo ${o.total.toFixed(2)} s (3/1.2 = 2.5): ${o.gaps.join(' / ')}`);
ok(Math.abs(o.reach - 1.4) < 1e-6 && Math.abs(o.botReach - 1.3) < 1e-6, `reach from the page: ${o.reach} and ${o.botReach}`);
ok(Math.round(o.myHp) === 480 && Math.round(o.myDmg) === 30, `his health ${Math.round(o.myHp)}, his hit ${Math.round(o.myDmg)}`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
