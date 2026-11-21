// C3e on a joined phone: the joined phone's Titus (level 7) sounds a full horn: on the host his men near him lock into
// the testudo and march; his own phone shows their shields up. Needs the servers (bash store/servers.sh).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const br1 = await chromium.launch(opts), br2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick, q] of [[br1, 'Arjun', '&champ=titus&botchamp=titus'], [br2, 'Ravi', '']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); p.on('console', m => { if (m.text().includes('EAGLE')) console.log(nick, m.text().slice(0, 600)); }); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1' + q);
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
ok(await B.evaluate(async () => (await import('/src/champions/index.js')).playable('titus')), 'Titus is playable on the joined phone'); // (the old settings list became the Champions screen, MENU4)
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.player, null, { timeout: 60000 }); await sleep(3000);
const ti = await B.evaluate(() => window.__fb.G.myTi);
await A.evaluate(async ti => { const G = window.__fb.G, L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'), p = G.teams[ti].leader; L.gainXp(ti, 1500, 't');
  window.__men = [0, 1, 2, 3].map(i => sim.mkUnit(ti, p.x + Math.sin(p.face) * 2 + (i - 1.5), p.z + Math.cos(p.face) * 2, 'foot')).map(u => u.id); G.teams[ti].rally = 100; }, ti);
await B.waitForFunction(() => (window.__fb.G.teams[window.__fb.G.myTi].lvl || 1) >= 7 && (window.__fb.G.teams[window.__fb.G.myTi].rally || 0) >= 100, null, { timeout: 20000 }).catch(() => {});
await B.evaluate(() => window.__fb.rally());
await A.waitForFunction(() => window.__fb.G.units.some(u => u.testudo), null, { timeout: 20000 }).catch(() => {});
const a = await A.evaluate(ti => { const G = window.__fb.G, men = G.units.filter(u => u.testudo && u.ti === ti); return { n: men.length, ids: men.map(u => u.id) }; }, ti);
await sleep(1500);
const b = await B.evaluate(ids => ids.filter(id => { const u = window.__fb.G.units.find(o => o.id === id); return u && u.scutumUp; }).length, a.ids);
console.log(JSON.stringify({ a, b }));
ok(a.n >= 4, `the host locks his men into the testudo (${a.n})`);
ok(b >= 4, `his own phone shows their shields up (${b})`);
await br1.close(); await br2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
