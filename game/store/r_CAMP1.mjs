// CAMP1: each side's 6 jungle camps: per half 2 gold camps of 3 men (2 footmen, an archer) and a buff camp of 5 men
// (3 footmen, 2 archers) and a mini captain (more HP and damage) in its middle. Cutting the mini captain down gives
// his killer's side the camp's buff for 90 s: war drum on the left half (+15% damage, blows and arrows), swift on the
// right (+15% speed, 15% quicker evade, charge, javelin and leap). A cleared camp comes back with its mini captain.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
const r = await page.evaluate(async () => {
  const { G } = window.__fb, sim = await import('/src/core/sim.js'), nt = await import('/src/core/sim/neutral.js'), bf = await import('/src/core/sim/buffs.js'), cfg = await import('/src/config.js');
  const camps = G.c2.breaks.filter(b => b.kind === 'camp'), men = b => G.units.filter(u => u.neutral && u.post === b && !u.dead);
  const out = { n: camps.length, gold: camps.filter(b => b.camp === 'gold'), buff: camps.filter(b => b.camp === 'buff') };
  out.goldOk = out.gold.length === 16 && out.gold.every(b => men(b).length === 3 && men(b).filter(u => u.kind === 'arch').length === 1 && !men(b).some(u => u.boss));
  out.buffOk = out.buff.length === 8 && out.buff.every(b => men(b).length === 6 && men(b).filter(u => u.boss).length === 1);
  const bossU = men(out.buff[0]).find(u => u.boss); out.bossHp = bossU.max; out.bossDmg = bossU.dmg;
  out.kinds = out.buff.map(b => b.buff).sort().join(',');
  // cut down a drum camp's mini captain with the player's man
  const me = G.player, drum = out.buff.find(b => b.buff === 'drum'), swift = out.buff.find(b => b.buff === 'swift');
  const before = { d: bf.drumDmg(me.ti), s: sim.speedOf ? null : null };
  nt.dieNeutral(men(drum).find(u => u.boss), me, 0, false);
  out.drumAfter = bf.drumDmg(me.ti); out.drumBefore = before.d; out.buffKind = G.teams[me.ti].buff && G.teams[me.ti].buff.kind;
  out.left = Math.round(G.teams[me.ti].buff.until - G.T);
  out.otherSide = [0, 1, 2, 3].filter(t => t !== me.ti).every(t => bf.drumDmg(t) === 1);
  // swift: speed and cooldowns
  const army = await import('/src/core/sim/army.js'), s0 = army.speedOf(me);
  nt.dieNeutral(men(swift).find(u => u.boss), me, 0, false);
  out.spdX = army.speedOf(me) / s0; out.cdX = bf.swiftCd(me.ti); out.kindNow = G.teams[me.ti].buff.kind;
  // the buff wears off
  G.teams[me.ti].buff.until = G.T - .1; out.gone = bf.swiftCd(me.ti) === 1 && army.speedOf(me) / s0 === 1;
  // a cleared buff camp comes back with its mini captain
  for (const u of men(drum)) nt.dieNeutral(u, me, 0, false);
  out.cleared = men(drum).length === 0; out.back = drum.back - G.T;
  return out; });
ok(r.n === 24, `24 camps (${r.n})`);
ok(r.goldOk, '16 gold camps of 3 men (2 footmen, an archer), no mini captain');
ok(r.buffOk, '8 buff camps of 5 men and a mini captain');
ok(r.bossHp === 520 && r.bossDmg === 20, `mini captain: ${r.bossHp} HP, ${r.bossDmg} damage`);
ok(r.kinds === 'drum,drum,drum,drum,swift,swift,swift,swift', 'buffs: 4 war drums (left halves), 4 swift (right)');
ok(r.drumBefore === 1 && r.buffKind === 'drum' && Math.abs(r.drumAfter - 1.15) < 1e-9 && r.left === 90, `mini captain cut down: his killer's side has the war drum, x${r.drumAfter} damage, ${r.left} s`);
ok(r.otherSide, 'the other sides get nothing');
ok(r.kindNow === 'swift' && Math.abs(r.spdX - 1.15) < 1e-6 && Math.abs(r.cdX - .85) < 1e-9, `swift: speed x${r.spdX.toFixed(2)}, cooldowns x${r.cdX}`);
ok(r.gone, 'after its time, the buff is gone');
ok(r.cleared && r.back > 80, `a cleared camp comes back in ${Math.round(r.back)} s`);
await page.evaluate(() => window.__fb.step(Math.ceil(95 * 30)));
const back = await page.evaluate(() => { const { G } = window.__fb, b = G.c2.breaks.filter(b => b.kind === 'camp' && b.camp === 'buff').find(b => b.buff === 'drum');
  const m = G.units.filter(u => u.neutral && u.post === b && !u.dead); return { n: m.length, boss: m.filter(u => u.boss).length }; });
ok(back.n === 6 && back.boss === 1, `back with its 5 men and the mini captain (${back.n})`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
