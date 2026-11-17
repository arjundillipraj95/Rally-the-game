// CASTLE7: the respawn wait grows with the match clock; a champion comes back at his side's castle nearest where he fell
// unless it is under attack (then the next one, or his base), marching out of its lane gate.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, st8 = await import('/src/core/state.js'), rs = await import('/src/core/sim/respawn.js'), sc = await import('/src/core/sim/score.js');
  const me = G.player, ti = me.ti, c = st8.colorOf(ti), myA = G.ALLY[c], o = {};
  o.waits = [0, 180, 270, 600].map(t => +rs.respawnTime(t).toFixed(2));
  const foe = G.units.find(u => !u.dead && !u.neutral && !u.leader && G.ALLY[st8.colorOf(u.ti)] !== myA);
  const mine = G.holds.filter(h => h.kind === 'castle' && h.side === c), [hA, hB] = [mine.find(h => !h.mid), mine.find(h => h.mid)];
  mine.forEach(h => { h.owner = myA; h.alertT = -99; h.cap = -1; h.prog = 0; });
  G.holds.filter(h => h.kind === 'castle' && h.side !== c).forEach(h => { if (h.owner === myA) h.owner = -1; });
  const clear = h => G.units.forEach(u => { if (!u.dead && !u.neutral && G.ALLY[st8.colorOf(u.ti)] !== myA && Math.hypot(u.x - h.x, u.z - h.z) < 40) { u.x += 300; u.z += 300; } });
  mine.forEach(clear);
  const fall = (x, z) => { const L = G.teams[ti].leader; L.x = x; L.z = z; L.shieldT = 0; L.iframeT = 0; L.hp = 0; sc.die(L, null, 0); return G.teams[ti].leaderDeadT; }; // (the current captain: each respawn is a new one)
  const back = () => { for (let k = 0; k < 1200 && G.teams[ti].leader.dead; k++) F.step(1); const L = G.teams[ti].leader; return { x: L.x, z: L.z, march: L.marchT > 0 }; };
  const near = (p, h) => Math.hypot(p.x - h.x, p.z - h.z);
  o.wait = fall(hA.x + 20, hA.z); o.waitWant = rs.respawnTime();
  const p1 = back(); o.calm = { dA: near(p1, hA), dB: near(p1, hB), march: p1.march };
  // castle A attacked (its alert kept fresh): the next one (B)
  fall(hA.x + 20, hA.z); window.__e = setInterval(() => {}, 1e6); const pin = () => { foe.x = hA.x + 12; foe.z = hA.z; foe.dead = false; };
  let p2; { for (let k = 0; k < 1200 && G.teams[ti].leader.dead; k++) { hA.alertT = G.T; F.step(1); } const L = G.teams[ti].leader; p2 = { x: L.x, z: L.z }; }
  o.attacked = { dA: near(p2, hA), dB: near(p2, hB) };
  // every castle attacked (alerts): home
  fall(hA.x + 20, hA.z); let p3; { for (let k = 0; k < 1200 && G.teams[ti].leader.dead; k++) { G.holds.forEach(h => { if (h.kind === 'castle' && h.owner === myA) h.alertT = G.T; }); F.step(1); } const L = G.teams[ti].leader; p3 = { x: L.x, z: L.z }; }
  const home = G.layout.homes[c]; o.allAttacked = { dHome: Math.hypot(p3.x - home.x, p3.z - home.z), dA: near(p3, hA) };
  return o;
});
ok(r.waits.join() === '6,8,10.5,20', `waits by the clock (0:00, 3:00, 4:30, 10:00): ${r.waits.join(', ')} s`);
ok(Math.abs(r.wait - r.waitWant) < .01, `a fall sets that wait (${r.wait.toFixed(1)} s)`);
ok(r.calm.dA < 9 && r.calm.march, `calm: back at the nearest castle (${r.calm.dA.toFixed(1)} m from it), marching out`);
ok(r.attacked.dB < 9, `an enemy at it: the next castle (${r.attacked.dB.toFixed(1)} m from the middle one)`);
ok(r.allAttacked.dHome < 25, `every castle attacked: home (${r.allAttacked.dHome.toFixed(1)} m from the base)`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
