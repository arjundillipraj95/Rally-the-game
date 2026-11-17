// C1c: the ability slots. A test champion (window.__champs, dev only) whose four slots only count their uses (and
// the first dashes and strikes, through the shared blocks). You play it (?champ=tester), so do the bots.
// Locked until levels 3, 5 and 7; fires from its button; recharges; the army ult from a full rally horn; from the
// saddle it drops him to his feet; locked in a duel; a bot fires its slots. The joined phone's press is r_C1a.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const init = `window.__champs = [{ id: 'tester', name: 'Tester', cls: 'vanguard', stats: { hp: 4, hit: .34, spd: 6.2 }, weapons: ['sword'], mount: { kind: 'horse', hp: 2, spd: 1 }, recruits: ['foot', 'arch'], influence: null,
  sp1: { name: 'Lunge', short: 'Lunge', cd: 6, range: 8, run(u, at, B) { u.n1 = (u.n1 || 0) + 1; B.dash(u, 5, .25); for (const o of B.line(u, 5, 1)) B.strike(u, o, .5); } },
  sp2: { name: 'Guard', short: 'Guard', cd: 10, run(u, at, B) { u.n2 = (u.n2 || 0) + 1; B.buff(u, 'guard', 4); } },
  ult: { name: 'Quake', short: 'Ult', cd: 30, range: 10, run(u, at, B) { u.n3 = (u.n3 || 0) + 1; u.hitN = B.circle(u, at.x, at.z, 4).length; } },
  armyUlt: { name: 'Hold Fast', run(u, at, B) { u.n4 = (u.n4 || 0) + 1; for (const m of B.ownMen(u, 20)) B.buff(m, 'held', 4); } } }];`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=tester&botchamp=tester', init });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, A = await import('/src/core/sim/abilities.js'), L = await import('/src/core/sim/levels.js'), army = await import('/src/core/sim/army.js');
  G.T = 30; F.step(1); const me = G.myTi, r = {}, P = () => G.teams[me].leader, uis = () => [1, 2, 3].map(k => { const b = document.getElementById('ab' + k); return (b.hidden ? 'hidden' : b.querySelector('.abC').textContent) || 'ready'; }).join('|');
  F.step(2); window.__frame(2);
  r.lv1 = { why: A.SLOTS.map(s => A.blocked(me, s)).join(), ui: uis() };
  F.ability(0); r.lv1.n1 = P().n1 | 0;
  L.gainXp(me, 420, 't'); window.__frame(2); r.lv3 = { lvl: G.teams[me].lvl, ui: uis() };
  F.ability(0); r.lv3.n1 = P().n1 | 0; r.lv3.cd = Math.round(A.cdLeft(me, 'sp1')); F.ability(0); r.lv3.again = P().n1 | 0;
  F.step(6.2 * 30); F.ability(0); r.lv3.after = P().n1 | 0;
  L.gainXp(me, 2000, 't'); window.__frame(12); r.lv7 = { lvl: G.teams[me].lvl, ui: uis() };
  F.ability(1); F.ability(2); r.lv7.n2 = P().n2 | 0; r.lv7.n3 = P().n3 | 0;
  G.teams[me].rally = 100; F.rally(); r.lv7.n4 = P().n4 | 0; r.lv7.rally = G.teams[me].rally;
  // from the saddle
  const p = P(); F.step(12 * 30); p.mounted = true; p.horse = { state: 'ridden', x: p.x, z: p.z }; F.ability(0); r.saddle = { n1: p.n1, mounted: p.mounted };
  // in a duel
  p.duelId = 99; F.step(7 * 30); r.duel = A.blocked(me, 'sp1'); p.duelId = null;
  // a bot at level 7 next to an enemy champion fires its slots
  const bi = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), b = G.teams[bi].leader;
  L.gainXp(bi, 2500, 't'); b.x = p.x + 3; b.z = p.z; b.mounted = false;
  r.botWhy = A.SLOTS.map(s => A.blocked(bi, s)).join();
  for (let k = 0; k < 90; k++) { b.x = p.x + 3; b.z = p.z; p.hp = p.max; F.step(1); }
  r.botFoe = b.foe ? (b.foe.leader ? 'champ' : b.foe.kind) + ' ' + b.fd.toFixed(1) : 'none';
  r.bot = { lvl: G.teams[bi].lvl, n: (b.n1 | 0) + (b.n2 | 0) + (b.n3 | 0) };
  return r; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(o));
ok(o.lv1.why === 'level,level,level,level' && o.lv1.ui === 'Lv 3|Lv 5|Lv 7' && o.lv1.n1 === 0, `level 1: all four locked, buttons say when (${o.lv1.ui})`);
ok(o.lv3.lvl === 4 && o.lv3.n1 === 1 && o.lv3.cd === 6, `special attack 1 opens (level ${o.lv3.lvl}), fires, recharges ${o.lv3.cd} s`);
ok(o.lv3.again === 1 && o.lv3.after === 2, `refused while recharging, fires again after`);
ok(/^\d+\|ready\|ready$/.test(o.lv7.ui), `buttons: special 1 recharging, the others ready (${o.lv7.ui})`);
ok(o.lv7.lvl >= 7 && o.lv7.n2 === 1 && o.lv7.n3 === 1, `level ${o.lv7.lvl}: special 2 and the ult fire`);
ok(o.lv7.n4 === 1 && o.lv7.rally === 0, `a full rally horn sounds his army ult`);
ok(o.saddle.n1 === 3 && !o.saddle.mounted, `from the saddle: on his feet and it fires`);
ok(o.duel === 'busy', `locked in a duel (${o.duel})`);
ok(o.bot.n > 0, `a computer champion at level ${o.bot.lvl} fires his slots (${o.bot.n} times in 3 s)`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
