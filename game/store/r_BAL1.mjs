// BAL1 (Arjun 26 Nov): each champion grows in his trait (Titus health, Devi attack speed, Sigrun run speed), specials
// hit 2x his blow and ults 5x (soldiers half), his army grows with his level in his trait, his moves in his army's
// colour, the Upgrade popup names his tiers. Run from game/.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const near = (a, b, e = .02) => Math.abs(a - b) <= e * Math.max(1, Math.abs(b));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 851, 393, { q: '?crown2=1&champ=titus', quality: 'low' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await frames(page, 30);
const r = await page.evaluate(async () => {
  const { G } = window.__fb, S = await import('/src/champions/stats.js'), A = await import('/src/champions/army.js'), lv = await import('/src/core/sim/levels.js');
  const ti = G.myTi, o = { champ: {}, army: {} }, was = G.champs[ti], lvl0 = G.teams[ti].lvl;
  for (const id of ['titus', 'devi', 'sigrun']) {
    G.champs[ti] = id; const at = l => ({ hp: S.champHp(ti, l), dmg: S.champDmg(ti, l), rate: S.champRate(ti, l), spd: S.champSpd(ti, l) });
    o.champ[id] = { l1: at(1), l10: at(10) };
    G.teams[ti].lvl = 1; const u = { ti, leader: true }; const sp1 = S.moveHit(u, 'sp1', true), ult = S.moveHit(u, 'ult', true), soldier = S.moveHit(u, 'sp1', false);
    G.teams[ti].lvl = 10; o.champ[id].moves = { sp1, ult, soldier, sp1L10: S.moveHit(u, 'sp1', true), blow1: S.champDmg(ti, 1) };
    const kind = { titus: 'foot', devi: 'arch', sigrun: 'sword' }[id];
    G.teams[ti].lvl = 1; const a1 = A.unitRow(ti, kind, 0); G.teams[ti].lvl = 10; const a10 = A.unitRow(ti, kind, 0);
    o.army[id] = { hp: a10.hp / a1.hp, dmg: a10.dmg / a1.dmg, gap: a1.cd / a10.cd, spd: a10.spd / a1.spd };
  }
  G.champs[ti] = was; G.teams[ti].lvl = lvl0;
  // a level-up reaches the men already in the field (Titus: their health)
  const men = G.units.filter(u => !u.dead && u.ti === ti && u.kind === 'foot'); const m0 = men.map(u => u.max);
  G.teams[ti].lvl = 1; G.teams[ti].xp = 0; lv.gainXp(ti, 1e4); o.lvlNow = G.teams[ti].lvl; o.menGrew = men.length ? men.every((u, i) => u.max > m0[i] * 1.2) : 'no men';
  o.labels = [...document.querySelectorAll('#upTray button[data-up^="foot"] b')].map(b => b.textContent);
  const fx = await import('/src/render/fxkit.js'), { TEAMS } = await import('/src/config.js'), st = await import('/src/core/state.js');
  o.col = fx.fcOf(G.player) === TEAMS[st.colorOf(ti)].css;
  return o;
});
console.log(JSON.stringify(r));
const C = r.champ;
ok(near(C.titus.l1.hp, 480) && near(C.titus.l10.hp, 480 * 1.72), `Titus health 480 -> ${Math.round(C.titus.l10.hp)} (+8% a level)`);
ok(near(C.titus.l1.rate, .9) && near(C.titus.l10.rate, 1.2), `Titus attack ${C.titus.l1.rate} -> ${C.titus.l10.rate}`);
ok(near(C.devi.l1.rate, 1.1) && near(C.devi.l10.rate, 1.8) && near(C.devi.l10.hp, 300 * 1.36), `Devi attack ${C.devi.l1.rate} -> ${C.devi.l10.rate}, health -> ${Math.round(C.devi.l10.hp)}`);
ok(near(C.sigrun.l1.spd, 6.4) && near(C.sigrun.l10.spd, 7.3) && near(C.sigrun.l10.rate, 1.65), `Sigrun run ${C.sigrun.l1.spd} -> ${C.sigrun.l10.spd}, attack ${C.sigrun.l1.rate} -> ${C.sigrun.l10.rate}`);
ok(['titus', 'devi', 'sigrun'].every(id => { const m = C[id].moves; return near(m.sp1, 2 * m.blow1) && near(m.ult, 5 * m.blow1) && near(m.soldier, m.blow1); }), 'specials 2x his blow, ults 5x, soldiers half');
ok(['titus', 'devi', 'sigrun'].every(id => C[id].moves.sp1L10 > C[id].moves.sp1 * 1.3), 'specials grow with his level (his blow does)');
ok(near(r.army.titus.hp, 1.36) && near(r.army.titus.dmg, 1), `Titus's men: health x${r.army.titus.hp.toFixed(2)} at level 10, nothing else`);
ok(near(r.army.devi.gap, 1.45) && near(r.army.devi.hp, 1), `Devi's archers: attack speed x${r.army.devi.gap.toFixed(2)} at level 10`);
ok(near(r.army.sigrun.spd, 1.135) && near(r.army.sigrun.dmg, 1.225), `Sigrun's men: run x${r.army.sigrun.spd.toFixed(3)}, damage x${r.army.sigrun.dmg.toFixed(3)} at level 10`);
ok(r.lvlNow === 10 && (r.menGrew === true || r.menGrew === 'no men'), `a level-up reaches his men already in the field (level ${r.lvlNow}, ${r.menGrew})`);
ok(r.labels.join() === 'Princeps,Triarius', `the Upgrade popup names Titus's tiers (${r.labels.join(', ')})`);
ok(r.col, 'his moves take his army\'s colour');
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
