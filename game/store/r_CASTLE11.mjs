// CASTLE11 (Arjun 26 Nov): a broken gate silences the castle's ballista and the wall archers on the towers beside it;
// at level III, Repair (120 gold) puts one bar back on the most damaged gate, shutting a broken one, and they shoot
// again; nothing to repair: no button; a computer makes the trip to repair. Run from game/.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 851, 393, { q: '?crown2=1', quality: 'low' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await frames(page, 30);
const r = await page.evaluate(async () => {
  const { G } = window.__fb, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js'), cfg = await import('/src/config.js');
  const c3 = await import('/src/core/sim/castle3.js'), melee = await import('/src/core/sim/melee.js'), army = await import('/src/core/sim/army.js'), ai = await import('/src/core/sim/ai26.js');
  const me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], o = {};
  const foeTi = G.teams.map((s, i) => i).find(i => G.teams[i] && G.teams[i].leader && G.ALLY[st8.colorOf(i)] !== myA);
  const sim = await import('/src/core/sim.js'), foe = sim.mkUnit(foeTi, 0, 0, 'foot');
  const h = G.holds.find(x => x.kind === 'castle' && x.side === st8.colorOf(me.ti) && !x.mid), cw = G.layout.cwalls.find(c => c.hid === h.id);
  const clear = () => G.units.forEach(u => { if (u !== foe && u !== me && !u.dead && Math.hypot(u.x - cw.x, u.z - cw.z) < 60) { u.x += 400; u.z += 400; } });
  h.owner = myA; G.cgates[h.id] = f.freshGates(3); f.applyCastleGates(); const st = G.cgates[h.id];
  const stage = () => { clear(); const a = cw.gates[0]; foe.x = cw.x + Math.cos(a) * 14; foe.z = cw.z + Math.sin(a) * 14; foe.hp = foe.max = 9999; foe.dead = false; foe.inSafe = false; me.x = cw.x + 50; me.z = cw.z + 50; melee.buildGrid(); };
  const shots = () => { stage(); const a0 = G.arrows.length; st.balT = 0; st.towerT = 0; c3.castle3Tick(.01); f.castleTowersTick(.01); const n = G.arrows.slice(a0); G.arrows.length = a0; return { bolts: n.filter(x => x.bolt).length, arrows: n.filter(x => !x.bolt).length }; };
  o.whole = shots();
  st.hp[0] = 0; st.broken |= 1; f.applyCastleGates(); o.broken = shots();
  // Repair: standing in the castle with gold
  me.x = cw.x; me.z = cw.z; G.teams[me.ti].gold = 500; o.cost = army.upgradeCost(me.ti, 'fort');
  o.bought = army.buyUpgrade(me.ti, 'fort'); o.gold = G.teams[me.ti].gold; o.hp0 = st.hp[0]; o.plate = f.plateHp(0); o.shut = !(st.broken & 1); o.paid = st.paid[0];
  o.after = shots();
  // a gate only chipped: still repairable; whole: nothing to repair
  for (const g of f.gatesOf(cw)) st.hp[g.gi] = st.max[g.gi]; st.broken = 0; me.x = cw.x; me.z = cw.z; o.costWhole = army.upgradeCost(me.ti, 'fort');
  // a computer of this side with gold near a broken level III castle makes the trip
  const bi = G.teams.map((s, i) => i).find(i => i !== me.ti && G.teams[i] && G.teams[i].leader && !G.teams[i].leader.human && G.ALLY[st8.colorOf(i)] === myA);
  if (bi != null) { const B = G.teams[bi].leader, s = G.teams[bi]; st.hp[1] = 0; st.broken |= 2; f.applyCastleGates(); clear(); foe.x += 400; foe.z += 400; melee.buildGrid(); B.x = cw.x + 25; B.z = cw.z; s.gold = 500; h.alertT = -99; h.cap = -1; h.contested = false; const p = ai.castlePlan(B, s); o.trip = !!p && p.fort === h.id; if (!o.trip) o.why = { p, lv: st.lv, need: f.needsRepair(cw, st), d: Math.hypot(B.x - h.x, B.z - h.z), owner: h.owner, myA, under: (await import('/src/core/sim/respawn.js')).underAttack(h) }; }
  else o.trip = 'no computer on your side';
  return o;
});
console.log(JSON.stringify(r));
ok(r.whole.bolts === 1 && r.whole.arrows === 4, `level III, gates whole: the ballista and 4 tower archers shoot (${r.whole.bolts} bolt, ${r.whole.arrows} arrows)`);
ok(r.broken.bolts === 0, `a gate broken: the ballista stops (${r.broken.bolts})`);
ok(r.broken.arrows === 2, `and the 2 towers beside that gate stop, the other 2 keep shooting (${r.broken.arrows})`);
ok(r.cost === 120 && r.bought && r.gold === 380, `Repair at level III: 120 gold (cost ${r.cost}, gold left ${r.gold})`);
ok(r.hp0 === r.plate && r.shut, `one bar back on the broken gate (${r.hp0} = a bar of ${r.plate}) and it shuts`);
ok(r.after.bolts === 1 && r.after.arrows === 4, `repaired: the ballista and its archers shoot again (${r.after.bolts}, ${r.after.arrows})`);
ok(r.paid >= 6, `the bars still off are counted, so knocking that bar off pays the attackers again (${r.paid} paid)`);
ok(r.costWhole == null, 'all gates whole: nothing to repair');
ok(r.trip === true || r.trip === 'no computer on your side', `a computer with gold near a broken level III castle of his goes to repair it (${r.trip})`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
