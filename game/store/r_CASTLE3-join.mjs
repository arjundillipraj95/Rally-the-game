// CASTLE3 on a joined phone: a castle shooting the joined player's captain sends him as its target, so his phone draws
// the range ring red with a line to him. Same start as r_NET1 (needs the servers: bash store/servers.sh).
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
const bInfo = await B.evaluate(() => { const G = window.__fb.G; return { a: G.ALLY[G.myTi % 4], id: G.player.id }; });
const hid = await A.evaluate(async b => { const { G } = window.__fb, f = await import('/src/core/sim/forts.js');
  const own = [0, 1, 2, 3].map(c => G.ALLY[c]).find(a => a !== b.a), h = G.holds.find(x => x.kind === 'castle' && !x.mid), cw = G.layout.cwalls.find(c => c.hid === h.id);
  h.owner = own; G.cgates[h.id] = f.freshGates(1); f.applyCastleGates();
  const L = G.units.find(u => u.id === b.id), a = cw.gates[0];
  window.__hold = setInterval(() => { G.units.forEach(u => { if (u !== L && !u.dead && Math.hypot(u.x - cw.x, u.z - cw.z) < 40) { u.x += 300; u.z += 300; } });
    L.hp = L.max; L.shieldT = 0; }, 16);
  return { id: h.id, x: cw.x + Math.cos(a) * 15, z: cw.z + Math.sin(a) * 15 }; }, bInfo);
await B.evaluate(p => { const G = window.__fb.G; window.__hold = setInterval(() => { const L = G.player; if (L) { L.x = p.x; L.z = p.z; L.vx = L.vz = 0; } }, 16); }, hid);
await waitT(4);
const r = await B.evaluate(({ id }) => { const G = window.__fb.G, st = G.cgates[id], me = G.player; return { tg: st.tg, me: me && me.id, lv: st.lv, onMe: st.tg === me.id && G.T - st.tgT < 2, d: Math.hypot(me.x - G.layout.cwalls.find(c => c.hid === id).x, me.z - G.layout.cwalls.find(c => c.hid === id).z) }; }, hid);
await A.evaluate(() => clearInterval(window.__hold)); await B.evaluate(() => clearInterval(window.__hold));
ok(r.lv === 1 && r.tg === r.me && r.onMe, `joined phone: the castle is shooting me (target ${r.tg}, me ${r.me}, ${r.d.toFixed(0)} m): ring red`);
await B.screenshot({ path: '/tmp/r_CASTLE3-join.png' });
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
