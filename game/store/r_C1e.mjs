// C1e: each champion's army: the soldiers he recruits, his influence on them, army size by class. Three test
// champions (window.__champs, dev only): archers only (+15% damage, -10% health), a vanguard with a 15 m shield
// (15% less from the front), a raider whose men are 10% faster. You play the archer one (?champ=).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const base = { stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, sp1: null, sp2: null, ult: null, armyUlt: null };
const champs = [{ ...base, id: 'bows', name: 'Bows', cls: 'striker', recruits: ['arch'], influence: { dmg: .15, hp: -.1 } },
  { ...base, id: 'shield', name: 'Shield', cls: 'vanguard', recruits: ['foot', 'arch'], influence: { r: 15, front: .15 } },
  { ...base, id: 'fast', name: 'Fast', cls: 'raider', recruits: ['foot'], influence: { spd: .1 } }];
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=bows&botchamp=shield', init: `window.__champs = ${JSON.stringify(champs)};` });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), inf = await import('/src/champions/influence.js'), st = await import('/src/core/state.js');
  G.T = 30; F.step(1); const me = G.myTi, r = {};
  r.start = sim.squadOf ? null : null;
  r.mine = G.units.filter(u => !u.dead && !u.leader && u.ti === me).map(u => u.kind).join(',');
  r.tray = [...document.querySelectorAll('#tray button')].map(b => b.dataset.kind + (b.hidden ? '-' : '+')).join(',');
  G.units.find(u => !u.dead && !u.leader && u.ti === me).dead = true; G.teams[me].gold = 999; r.footOk = sim.recruit(me, 'foot'); r.archOk = sim.recruit(me, 'arch');
  const a = G.units.filter(u => !u.dead && !u.leader && u.ti === me && u.kind === 'arch').pop(); r.archHp = +a.max.toFixed(1); r.archDmg = inf.inflDmg(a);
  // the vanguard's shield: one of his footmen beside him, then 40 m away
  const s1 = G.teams.findIndex((t, i) => t.active && i !== me && G.champs[i] === 'shield'), L = G.teams[s1].leader, f = F.mkUnit(s1, L.x + 2, L.z, 'foot');
  r.near = inf.inflTaken(f, true); r.side = inf.inflTaken(f, false); f.x = L.x + 40; r.far = inf.inflTaken(f, true);
  // the raider's pace
  G.champs[s1] = 'fast'; f.x = L.x + 2; const v1 = sim.speedOf(f); G.champs[s1] = 'shield'; const v0 = sim.speedOf(f); r.spd = +(v1 / v0).toFixed(3);
  // army size by class, with castles held: none, then a middle and an outer
  const al = G.ALLY[me % 4], cs = G.holds.filter(h => h.kind === 'castle'), mid = cs.find(h => h.mid), out = cs.find(h => !h.mid);
  for (const h of cs) if (h.owner === al) h.owner = -1;
  const caps = () => [G.champs[me], st.capOf(me)];
  r.cap0 = st.capOf(me); mid.owner = al; out.owner = al; r.cap2 = st.capOf(me);
  G.champs[me] = 'shield'; r.capV = st.capOf(me); G.champs[me] = 'bows';
  return r; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
ok(o.mine === 'arch,arch,arch', `a striker starts with 3 men, all his champion's soldiers (${o.mine})`);
ok(o.tray === 'foot-,arch+', `recruit tray: only archers (${o.tray})`);
ok(!o.footOk && o.archOk, `recruiting a footman refused, an archer taken`);
ok(Math.abs(o.archHp - 60 * .9) < .2 && Math.abs(o.archDmg - 1.15) < 1e-6, `influence: his archers ${o.archHp} health, x${o.archDmg} damage`);
ok(Math.abs(o.near - .85) < 1e-6 && o.side === 1 && o.far === 1, `shield discipline: x${o.near} from the front within 15 m, x${o.side} from the side, x${o.far} 40 m away`);
ok(Math.abs(o.spd - 1.1) < 1e-3, `the raider's men move x${o.spd}`);
ok(o.cap0 === 3 && o.cap2 === 9 && o.capV === 13, `army size: striker 3, +middle +outer = ${o.cap2}; vanguard ${o.capV} (want 3, 9, 13)`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
