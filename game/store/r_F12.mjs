// F12: the +2 captain markers are the same on the host and the joined phone. The joined phone never sees the host's one-off message here (the host cuts captains down after it joined; we also wipe its message list), so only the snapshots carry it.
// F12: the +2 captain markers are the same on the host and the joined phone. The joined phone never sees the host's one-off message here (the host cuts captains down after it joined; we also wipe its message list), so only the snapshots carry it.
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
const T = await A.evaluate(() => Math.round(window.__fb.G.T)); console.log('joined at battle time', T);
// the host cuts down captains (both sides); the joined phone's own message list is wiped so only the snapshot can tell it
await A.evaluate(() => { const { G } = window.__fb, K = G.c2; K.kills[0] = { 2: 2, 3: 1 }; K.kills[1] = { 0: 2 }; K.kills[2] = {}; K.kills[3] = { 1: 2 }; });
await B.evaluate(() => { const { G } = window.__fb; G.c2.kills = {}; });
await sleep(2500);
const view = p => p.evaluate(() => { const { G } = window.__fb, K = G.c2; return JSON.stringify([0, 1, 2, 3].map(a => [0, 1, 2, 3].filter(ti => (K.kills[a] || {})[ti]).map(ti => ti + '=' + K.kills[a][ti]).join('+'))); });
const va = await view(A), vb = await view(B);
console.log('host  ', va, '\njoined', vb);
const bad = va !== vb;
console.log(bad ? 'FAIL: markers differ' : 'PASS: same captains marked on both phones');
await b1.close(); await b2.close();
process.exit(bad ? 1 : 0);
