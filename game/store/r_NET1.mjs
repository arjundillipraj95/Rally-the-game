// NET1: on a joined phone, an enemy hidden in a bush shows while he strikes (the host sends "just struck") and hides
// again after. Same start as crown2online (needs the servers: bash store/servers.sh). The host holds an enemy footman in
// a bush: first striking (his atkT kept fresh), then quiet; the joined phone's fog for him is read each time.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&' + (process.env.Q ?? '?crown2=1').replace(/^\?/, '')); // (Q='?crown2=1&roles=1' for roles on, as crown2sim)
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
const ev = (p, f) => p.evaluate(f);
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
console.log('B code', codeB);
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
// Arjun starts a Solo battle alone; once it's running, Ravi joins it from his friends list
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
console.log('waiting for Arjun\'s battle to start (60 s)...');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play', null, { timeout: 60000 }); await sleep(3000);
// (the headless phones run the battle slowly: waits are in battle seconds on the host)
const waitT = async dt => { const t0 = await A.evaluate(() => window.__fb.G.T); await A.waitForFunction(t => window.__fb.G.T > t, t0 + dt, { timeout: 180000 }); await sleep(1500); };
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const bAl = await B.evaluate(() => { const G = window.__fb.G; return G.ALLY[G.myTi % 4]; });
const id = await A.evaluate(my => { const { G } = window.__fb, L = G.layout, b = L.bushes[0];
  const u = G.units.find(o => !o.dead && o.kind === 'foot' && !o.neutral && G.ALLY[o.ti % 4] !== my);
  window.__hold = setInterval(() => { u.x = b.x; u.z = b.z; u.vx = u.vz = 0; u.hp = u.max; if (window.__strike) u.atkT = G.T; else { u.cd = 9; u.swing = 0; u.pending = null; } }, 16); window.__strike = true; return u.id; }, bAl);
const fogOf = () => B.evaluate(id => { const u = window.__fb.G.units.find(o => o.id === id); return u ? { fog: !!u.fog, bush: u.bush, seen: !!u.netSeen } : null; }, id);
await waitT(.5); const s1 = await fogOf();
ok(s1 && s1.bush >= 0 && !s1.fog, `striking from a bush: seen on the joined phone ${JSON.stringify(s1)}`);
await A.evaluate(() => { window.__strike = false; }); await waitT(2.5); const s2 = await fogOf();
ok(s2 && s2.bush >= 0 && s2.fog, `quiet in the bush: hidden again ${JSON.stringify(s2)}`);
await A.evaluate(() => clearInterval(window.__hold));
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
