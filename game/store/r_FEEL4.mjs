// FEEL4 (Arjun 25 Nov): a joined phone shows its own blow's hit on the target at once; the host only checks it.
// Done when: at 250 ms round trip, the joined phone's target flinches within ~250 ms of the press (the blow lands
// ~120 ms into the swing) while the host's damage arrives later. Needs the servers (bash store/servers.sh).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick, q] of [[b1, 'Arjun', '&champ=titus&botchamp=titus'], [b2, 'Ravi', '']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1' + q);
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.player, null, { timeout: 60000 }); await sleep(3000);

let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
// 125 ms each way (250 ms round trip), like a far phone
for (const p of [A, B]) await p.evaluate(() => { window.__lag = { ms: 125, loss: 0 }; window.__noRender = 1; });
await sleep(2000);
const ti = await B.evaluate(() => window.__fb.G.myTi);
// an enemy soldier that can't die stands in front of the joined phone's captain on the host
await A.evaluate(async ti => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), p = G.teams[ti].leader, e = (ti + 1) % 4;
  const f = sim.mkUnit(e, p.x + Math.sin(p.face) * 1.6, p.z + Math.cos(p.face) * 1.6, 'foot'); f.max = f.hp = 150; window.__dummy = f; }, ti);
const res = [];
for (let k = 0; k < 4; k++) {
  await A.evaluate(async ti => { const sim = await import('/src/core/sim.js'), p = window.__fb.G.teams[ti].leader, f = window.__dummy; if (p.mounted) sim.dismount(p, false);
    f.x = p.x + Math.sin(p.face) * 1.6; f.z = p.z + Math.cos(p.face) * 1.6; f.vx = f.vz = 0; f.face = p.face + Math.PI; f.stun = 5; f.hp = f.max; f.dead = false; f.blockT = 0; f.guardUp = false; f.block = 0; }, ti);
  await sleep(1500); // (the dummy's place reaches the joined phone)
  const r = await B.evaluate(async () => { const NG = await import('/src/net/netgame.js'), SO = await import('/src/render/soldiers.js'); return await new Promise(done => {
    const G = window.__fb.G, me = G.player;
    const near = G.units.filter(u => !u.dead && u !== me && u.ti !== me.ti && Math.hypot(u.x - me.x, u.z - me.z) < 3.5).sort((a, b) => Math.hypot(a.x - me.x, a.z - me.z) - Math.hypot(b.x - me.x, b.z - me.z))[0];
    if (!near) return done({ err: 'no target near on the joined phone' });
    const t0 = performance.now(), hp0 = near.hp; let pred = null, host = null, fr = 0, f0 = G.frameN;
    const ft = []; let lt = performance.now(); const raf = () => { const n = performance.now(); ft.push(n - lt); lt = n; if (ft.length < 40) requestAnimationFrame(raf); }; requestAnimationFrame(raf);
    me.vx = me.vz = 0; me.face = Math.atan2(near.x - me.x, near.z - me.z); NG.actions.attack(); const sw0 = me.swing;
    const tick = () => { const dt = performance.now() - t0;
      if (pred == null && near.predAtMs && near.predAtMs >= t0) pred = Math.round(near.predAtMs - t0);
      if (host == null && near.hp < hp0 - .5) host = Math.round(dt);
      if ((pred != null && host != null && performance.now() - t0 > host + 100) || dt > 3000) { done({ once: pred != null && host != null && host < pred + 700 ? SO.stateOf(near).predT === 0 : null, sw0, k: near.kind, d: +Math.hypot(near.x - me.x, near.z - me.z).toFixed(2), sw: me.swingKind, hpN: near.hp, hp0, pred, host, frame: Math.round(ft.reduce((a, b) => a + b, 0) / Math.max(1, ft.length)) }); }
      else setTimeout(tick, 10); };
    tick();
  }); });
  res.push(r); await sleep(900);
}
console.log(JSON.stringify(res));
const good = res.filter(r => r.pred != null && r.host != null);
ok(good.length >= 3, `the target took the hit on the host and the joined phone showed it (${good.length} of 4)`);
ok(good.every(r => r.pred <= 120 + 2.5 * r.frame), `the joined phone shows its own hit when the blow lands, ~120 ms into the swing (ms: ${good.map(r => r.pred).join(', ')}; a frame here ${good.map(r => r.frame).join(', ')} ms)`);
ok(good.filter(r => r.host > r.pred).length >= 3, `the host's word comes later (ms: ${good.map(r => r.host).join(', ')})`);
const once = good.filter(r => r.once != null);
ok(once.length > 0 && once.every(r => r.once), `when it comes it isn't played a second time (${once.length} checked)`);
const errs = await B.evaluate(() => window.__errs || []);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
