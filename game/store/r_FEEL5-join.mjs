// FEEL5 (Arjun 26 Nov) Devi's own arrows on a joined phone: drawn at once at her pace, felt where they land, the
// host's copies not drawn twice. (The host rules: store/r_FEEL5.mjs.) Needs the servers (bash store/servers.sh).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick, q] of [[b1, 'Arjun', '&champ=titus'], [b2, 'Ravi', '&champ=devi']]) {
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
// 125 ms each way (250 ms round trip)
for (const p of [A, B]) await p.evaluate(() => { window.__lag = { ms: 125, loss: 0 }; window.__noRender = 1; });
await sleep(2000);
await B.waitForFunction(() => window.__fb.G.T > 20, null, { timeout: 60000 }); // (after the opening)
const ti = await B.evaluate(() => window.__fb.G.myTi);
for (const P of [A, B]) await P.evaluate(async ti => { const G = window.__fb.G, S = await import('/src/champions/stats.js'); G.champs[ti] = 'devi'; const L = G.teams[ti].leader || G.player; if (L) { L.mounted = false; S.applyChamp(L); } }, ti); // (the seat she took plays Devi)
await sleep(1000);
await A.evaluate(async ti => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), p = G.teams[ti].leader, e = (ti + 1) % 4; if (p.mounted) sim.dismount(p, false);
  for (let k = 0; k < 3; k++) { const f = sim.mkUnit(e, p.x + Math.sin(p.face) * 8 + k, p.z + Math.cos(p.face) * 8, 'foot'); f.max = f.hp = 5000; f.stun = 99; } }, ti);
await sleep(1500);
await A.evaluate(ti => { const G = window.__fb.G, seen = new Set(); window.__hostShots = seen; window.__hs = setInterval(() => { for (const a of G.arrows) if (a.champ && a.ti === ti && !a.vis) seen.add(a.id); }, 20); }, ti);
const j = await B.evaluate(async () => { const G = window.__fb.G, me = G.player; const seen = new Map(); let local = 0, felt = null; const t0 = performance.now();
  window.__moveOverride = () => ({ wx: 0, wz: 0, mag: 0, attackHeld: true, camYaw: 0 });
  await new Promise(done => { const tick = () => { for (const a of G.arrows) if (a.champ && a.ti === G.myTi && !seen.has(a.id)) { seen.set(a.id, a.local ? 'local' : 'host'); }
    if (felt == null && G.units.some(u => u.predAtMs && u.predAtMs > t0)) felt = Math.round(performance.now() - t0);
    if (performance.now() - t0 > 4000) { window.__moveOverride = null; done(); } else setTimeout(tick, 20); }; tick(); });
  const v = [...seen.values()]; const C = await import('/src/champions/index.js'), R = await import('/src/core/sim/ranged.js'); const tg = R.rangedTarget(me); return { skipped: G.predSkipped | 0, champ: C.champOf(G.myTi).id, tg: tg ? +Math.hypot(tg.x - me.x, tg.z - me.z).toFixed(1) : null, mounted: me.mounted, local: v.filter(x => x === 'local').length, host: v.filter(x => x === 'host').length, felt, lvl: G.teams[G.myTi].lvl };
});
const hostShots = await A.evaluate(() => { clearInterval(window.__hs); return window.__hostShots.size; });
console.log(JSON.stringify(j), 'host shots', hostShots);
ok(j.local >= 3, `the joined phone draws her own arrows at once (${j.local} in 4 s)`);
ok(j.host <= 1, `the host's copies of them aren't drawn again (host shot ${hostShots}: ${j.skipped} skipped, ${j.host} drawn)`);
ok(j.felt != null && j.felt < 900, `where her arrow lands the target takes it at once (${j.felt} ms from the press)`);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
