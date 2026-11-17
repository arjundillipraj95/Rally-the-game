// CASTLE5: the capture moment (announcement, torn banner and gate dust, horn and sting, a call from the taker's men,
// a camera beat when near, gold for the whole side), Held! after a beaten-off siege (gold each defending army), and
// the under-attack alert once in a while.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js'), cfg = await import('/src/config.js');
  const cap = await import('/src/core/sim/capture.js'), siege = await import('/src/core/sim/siege.js'), banter = await import('/src/render/banter.js');
  const M = cfg.CASTLE26.moment, me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], o = { M }, ev = [];
  st8.bus.on('msg', m => ev.push(['msg', m.k, ...m.a])); st8.bus.on('sfx', d => ev.push(['sfx', d.name])); st8.bus.on('spark', () => ev.push(['spark'])); st8.bus.on('camBeat', () => ev.push(['beat']));
  const foeTi = G.teams.findIndex((s, i) => s && s.leader && G.ALLY[st8.colorOf(i)] !== myA), foeA = G.ALLY[st8.colorOf(foeTi)], foe = G.teams[foeTi].leader;
  const mine = G.teams.map((s, i) => i).filter(i => G.teams[i] && G.teams[i].active && G.ALLY[st8.colorOf(i)] === myA);
  const h = G.holds.find(x => x.kind === 'castle' && x.side === st8.colorOf(foeTi) && !x.mid), c = cap.circleAt(h);
  const away = u => { u.x = c.x + 300; u.z = c.z + 300; };
  G.units.forEach(u => { if (!u.dead && Math.hypot(u.x - h.x, u.z - h.z) < 40 && u !== me) away(u); });
  // a soldier of mine near, to call it
  const sold = G.units.find(u => !u.dead && u.ti === me.ti && !u.leader); sold.x = c.x + 6; sold.z = c.z;
  h.owner = foeA; h.prog = 0; h.cap = -1; h.shieldT = 0; G.cgates[h.id] = f.freshGates(0); f.applyCastleGates();
  me.x = c.x + .5; me.z = c.z; banter.clearBanter();
  const g0 = G.teams.map(s => s && s.gold); ev.length = 0;
  for (let k = 0; k < 400 && h.owner !== myA; k++) cap.captureTick(h, .02);
  const gain = G.teams.map((s, i) => s ? s.gold - g0[i] : 0);
  o.taken = h.owner === myA; o.ev = ev.slice(0, 40).map(e => e.join(':'));
  o.others = mine.filter(i => i !== me.ti).map(i => gain[i]); o.armies = mine.length;
  o.bubble = banter.bubbles.some(b => b.u && b.u.ti === me.ti);
  // Held!: my castle at level I, the foe knocks a plate off and goes; after heldAfter s of calm: Held
  const hm = G.holds.find(x => x.kind === 'castle' && x.side === st8.colorOf(me.ti) && !x.mid), cw = G.layout.cwalls.find(q => q.hid === hm.id);
  hm.owner = myA; G.cgates[hm.id] = f.freshGates(1); f.applyCastleGates(); hm.siege = null; hm.alertT = -99;
  G.units.forEach(u => { if (!u.dead && !u.neutral && Math.hypot(u.x - hm.x, u.z - hm.z) < 40 && G.ALLY[st8.colorOf(u.ti)] !== myA) away(u); });
  foe.x = cw.x + Math.cos(cw.gates[0]) * (cw.r + 1); foe.z = cw.z + Math.sin(cw.gates[0]) * (cw.r + 1);
  ev.length = 0; const w0 = cw.obs.find(w => w.cgate != null && w.gi === 0);
  while (!G.cgates[hm.id].paid[0]) f.hitWall(foe, w0);
  o.alerts = ev.filter(e => e[1] === 'castleAttacked').length; o.siege = hm.siege != null;
  for (let k = 0; k < 20; k++) f.hitWall(foe, w0); o.alerts2 = ev.filter(e => e[1] === 'castleAttacked').length; // (rate-limited)
  away(foe); const g1 = G.teams.map(s => s && s.gold); siege.siegeTick(); const T0 = G.T;
  G.T += M.heldAfter - 1; siege.siegeTick(); o.heldEarly = ev.some(e => e[1] === 'castleHeld');
  G.T += 2; siege.siegeTick(); G.T = T0;
  o.held = ev.some(e => e[1] === 'castleHeld'); o.heldGold = mine.map(i => G.teams[i].gold - g1[i]);
  return o;
});
const M = r.M, has = (k) => r.ev.some(e => e.startsWith(k));
ok(r.taken && has('msg:holdTaken') , 'taken: announced');
ok(r.ev.filter(e => e === 'spark').length >= 3, `sparks: banner and gates (${r.ev.filter(e => e === 'spark').length})`);
ok(has('sfx:horn') && has('sfx:capture'), 'horn and sting');
ok(r.bubble, 'one of the taker\'s men calls it');
ok(has('beat'), 'a camera beat (taker near)');
ok(r.armies < 2 || r.others.every(v => v >= M.side), `gold for the whole side: other armies +${r.others.join(', ') || '(only one army on the side)'}`);
ok(r.siege && r.alerts === 1 && r.alerts2 === 1, `a plate down: siege, owners warned once (${r.alerts}, then ${r.alerts2} after 20 more blows)`);
ok(!r.heldEarly && r.held && r.heldGold.every(v => v === M.held), `Held! after ${M.heldAfter} s calm, +${r.heldGold.join(', ')} gold`);
await frames(page, 5); await page.screenshot({ path: '/tmp/r_CASTLE5.png', timeout: 120000 }).catch(() => {});
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
