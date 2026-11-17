// CASTLE4: the capture circle round the courtyard banner. Closed on a held castle with whole gates, open once one breaks;
// 6 / 4 / 3 s with 1 / 2 / 3 champions, soldiers speed it up (5: +50%), soldiers alone take it in 10 s (5: about 6.7); anyone of another
// side in it pauses it; an empty circle drains; closed while the banner rises; a neutral castle opens when its guards
// are dead; the camera pulls back inside.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js'), cfg = await import('/src/config.js');
  const cap = await import('/src/core/sim/capture.js'), C = cfg.CASTLE26.circle, me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], o = { C };
  const foeTi = G.teams.findIndex((s, i) => s && s.leader && G.ALLY[st8.colorOf(i)] !== myA), foeA = G.ALLY[st8.colorOf(foeTi)];
  const neutralH = G.holds.find(x => x.kind === 'castle' && x.owner < 0 && cap.circleOpen(x) === false);
  o.neutralClosed = !!neutralH;
  const h = G.holds.find(x => x.kind === 'castle' && x.side === st8.colorOf(foeTi) && !x.mid), c = cap.circleAt(h), st = () => G.cgates[h.id];
  const extra = [1, 2].map(() => F.mkUnit(me.ti, c.x + 300, c.z + 300, 'captain'));
  const soldiers = [0, 1, 2, 3, 4].map(() => F.mkUnit(me.ti, c.x + 300, c.z + 300, 'foot'));
  const foeMan = G.units.find(u => !u.dead && u.ti === foeTi && u.kind === 'foot');
  const away = u => { u.x = c.x + 300 + Math.random() * 5; u.z = c.z + 300; };
  const put = (u, k) => { const a = k * 1.3; u.x = c.x + Math.cos(a) * 1.5; u.z = c.z + Math.sin(a) * 1.5; u.dead = false; u.routing = false; };
  const reset = (lv = 1, broken = 1) => { h.owner = foeA; h.prog = 0; h.cap = -1; h.shieldT = 0; G.cgates[h.id] = f.freshGates(lv); st().broken = broken; f.applyCastleGates();
    G.units.forEach(u => { if (!u.dead && Math.hypot(u.x - c.x, u.z - c.z) < 30) away(u); }); };
  const run = (secs) => { let t = 0; while (t < secs && h.owner !== myA) { cap.captureTick(h, .02); t += .02; } return h.owner === myA ? +t.toFixed(2) : null; };
  reset(1, 0); o.closedWhole = !cap.circleOpen(h); st().broken = 1; o.openBroken = cap.circleOpen(h);
  reset(); put(me, 0); o.t1 = run(20);
  reset(); put(me, 0); put(extra[0], 1); o.t2 = run(20);
  reset(); put(me, 0); put(extra[0], 1); put(extra[1], 2); o.t3 = run(20);
  reset(); put(me, 0); soldiers.forEach((s, k) => put(s, k + 1)); o.t1s = run(20);
  reset(); soldiers.forEach((s, k) => put(s, k + 1)); o.soldiersAlone = run(20);
  reset(); put(me, 0); run(3); const p0 = h.prog; put(foeMan, 3); foeMan.dead = false; run(3); o.paused = { before: +p0.toFixed(2), after: +h.prog.toFixed(2), contested: h.contested };
  away(foeMan); away(me); const p1 = h.prog; for (let k = 0; k < 150; k++) cap.captureTick(h, .02); o.drain = { from: +p1.toFixed(2), to: +h.prog.toFixed(3) };
  reset(); h.shieldT = G.T + 30; o.shieldClosed = !cap.circleOpen(h);
  if (neutralH) { const g = G.c2.breaks.find(b => b.kind === 'guard' && b.hid === neutralH.id); const n = g.n; g.n = 0; o.neutralOpen = cap.circleOpen(neutralH); g.n = n; }
  // the camera: outside the circle, then in it (an open one)
  reset(); away(me); [...extra, ...soldiers].forEach(away);
  return o;
});
const C = r.C;
const near = (t, want) => t != null && Math.abs(t - want) < .25;
ok(r.closedWhole && r.openBroken, 'a level I castle with whole gates: closed; one gate broken: open');
ok(near(r.t1, C.fill[1]) && near(r.t2, C.fill[2]) && near(r.t3, C.fill[3]), `1 / 2 / 3 champions: ${r.t1} / ${r.t2} / ${r.t3} s`);
ok(near(r.t1s, C.fill[1] / (1 + C.soldierMax)), `1 champion and 5 soldiers: ${r.t1s} s`);
ok(near(r.soldiersAlone, C.fill[0] / (1 + C.soldierMax)), `5 soldiers alone: ${r.soldiersAlone} s`);
ok(r.paused.after === r.paused.before && r.paused.contested, `an enemy soldier in it: paused at ${r.paused.after}`);
ok(r.drain.to < r.drain.from && Math.abs((r.drain.from - r.drain.to) - 3 / C.drain) < .02, `empty: drains ${r.drain.from} -> ${r.drain.to} in 3 s`);
ok(r.shieldClosed, 'closed while the banner rises');
ok(r.neutralClosed && r.neutralOpen, 'a neutral castle: closed while its guards live, open when they are dead');
// the camera pulls back inside an open circle
const dist = async inside => { await page.evaluate(async inside => { const F = window.__fb, { G } = F, cap = await import('/src/core/sim/capture.js'), st8 = await import('/src/core/state.js');
    const me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], h = G.holds.find(x => x.kind === 'castle' && x.side !== st8.colorOf(me.ti) && x.owner >= 0 && x.owner !== myA && cap.circleOpen(x)) || G.holds.find(x => x.kind === 'castle' && x.side !== st8.colorOf(me.ti));
    const c = cap.circleAt(h); window.__pin = setInterval(() => {}, 1000); me.x = c.x + (inside ? .5 : 14); me.z = c.z; me.vx = me.vz = 0; window.__pinXZ = [me.x, me.z];
  }, inside);
  for (let k = 0; k < 8; k++) { await page.evaluate(() => { const me = window.__fb.G.player; [me.x, me.z] = window.__pinXZ; }); await frames(page, 10); }
  return page.evaluate(async () => { const { G } = window.__fb, me = G.player, cp = (await import('/src/render/scene.js')).camera.position; return Math.hypot(cp.x - me.x, cp.y - me.y, cp.z - me.z); }); };
const dOut = await dist(false), dIn = await dist(true);
ok(dIn / dOut > 1.08, `the camera pulls back in the circle: ${dOut.toFixed(2)} -> ${dIn.toFixed(2)} m`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
