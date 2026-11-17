// CASTLE9: computer champions with the new castles: fortify where they stand, make the trip to fortify a low castle near,
// defend a castle that sends an alert, go for an open enemy nexus with soldiers (not without), and keep off fortified
// enemy castles without soldiers; and a bot battle that fortifies and takes castles.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, st8 = await import('/src/core/state.js'), f = await import('/src/core/sim/forts.js'), cap = await import('/src/core/sim/capture.js');
  const ai = await import('/src/core/sim/ai26.js'), holds = await import('/src/core/sim/holds.js'), match = await import('/src/core/sim/match.js'), o = {};
  const me = G.player, myA = G.ALLY[st8.colorOf(me.ti)];
  const bi = G.teams.findIndex((s, i) => s && s.active && s.leader && !s.human && G.ALLY[st8.colorOf(i)] !== myA), bot = G.teams[bi], B = bot.leader, bA = G.ALLY[st8.colorOf(bi)], bc = st8.colorOf(bi);
  const own = G.holds.filter(h => h.kind === 'castle' && h.side === bc), h = own.find(x => !x.mid); own.forEach(x => { x.owner = bA; x.alertT = -99; x.cap = -1; x.contested = false; });
  G.cgates[h.id] = f.freshGates(0); f.applyCastleGates();
  const clear = (x, z) => G.units.forEach(u => { if (!u.dead && !u.neutral && G.ALLY[st8.colorOf(u.ti)] !== bA && Math.hypot(u.x - x, u.z - z) < 40) { u.x += 300; u.z += 300; } });
  clear(h.x, h.z); const c = cap.circleAt(h);
  // standing in it with gold: fortifies
  B.x = c.x; B.z = c.z; bot.gold = 1000; o.fort = { bought: ai.botFortify(bi, bot), lv: G.cgates[h.id].lv };
  // near a low castle of his with gold: the trip
  B.x = h.x + 30; B.z = h.z; bot.gold = 1000; bot.plan = null; const p1 = ai.castlePlan(B, bot); o.trip = p1 && p1.fort === h.id;
  // an alert: his castle is his plan (as a castle in danger)
  bot.gold = 0; h.alertT = G.T; bot.plan = null; let hits = 0; for (let k = 0; k < 20; k++) { const p = holds.holdPlan(B, bot); if (p && p.kind === 'hold' && p.id === h.id) hits++; bot.plan = null; } o.defend = hits; h.alertT = -99;
  // an open enemy nexus near: with soldiers yes, without no
  const fc = [0, 1, 2, 3].find(k => G.ALLY[k] !== bA), foeMid = G.holds.find(x => x.kind === 'castle' && x.mid && x.side === fc); foeMid.owner = bA;
  const nx = G.layout.nexus.find(n => n.c === fc); B.x = nx.x + 20; B.z = nx.z; G.c2.crownPts = {};
  const squad = match.squadOf(bi); o.squad = squad.length;
  const want = () => { bot.plan = null; const p = ai.castlePlan(B, bot); return !!p && p.nexus === fc; };
  o.nexusWith = squad.length >= 3 ? want() : 'too few men';
  const saved = squad.map(u => [u, u.dead]); squad.forEach(u => { u.dead = true; }); o.nexusWithout = want();
  // without soldiers, a fortified enemy castle isn't a target
  const fh = G.holds.find(x => x.kind === 'castle' && !x.mid && x.side === fc); fh.owner = G.ALLY[fc]; G.cgates[fh.id] = f.freshGates(1);
  o.readyFort = ai.castleReady(B, fh); G.cgates[fh.id] = f.freshGates(0); o.readyOpen = ai.castleReady(B, fh);
  saved.forEach(([u, d]) => { u.dead = d; });
  return o;
});
ok(r.fort.bought && r.fort.lv === 1, 'a bot standing in his castle with gold fortifies it');
ok(r.trip, 'near a low castle of his, with gold: the trip to fortify it');
ok(r.defend >= 10, `an attack alert: his castle is his plan (${r.defend}/20 thinks)`);
ok(r.nexusWith === true || r.nexusWith === 'too few men', `an open enemy nexus near, with soldiers (${r.squad}): ${r.nexusWith}`);
ok(r.nexusWithout === false, 'without soldiers: not the nexus');
ok(!r.readyFort && r.readyOpen, 'without soldiers: a fortified enemy castle isn\'t a target, an open one is');
// a 5-minute bot battle (the player's captain idle): castles fortified and taken
const sim = await page.evaluate(async () => { const F = window.__fb, { G } = F, st8 = await import('/src/core/state.js'); let fort = 0, taken = 0;
  st8.bus.on('msg', m => { if (m.k === 'castleFort') fort++; if (m.k === 'holdTaken' && m.a[1] === 'castle') taken++; });
  const T0 = G.T; while (G.T < T0 + 300 && G.state === 'play') F.step(30); return { fort, taken, T: Math.round(G.T - T0) }; });
ok(sim.fort >= 2 && sim.taken >= 4, `bot battle, ${sim.T} s: ${sim.fort} fortifies, ${sim.taken} castles taken`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
