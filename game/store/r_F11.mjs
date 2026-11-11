// F11 check: two friends in one battle see the same results. The joined phone
// misses places changing hands (they change faster than snapshots go out); at the end its Points record must match the host's, captain by captain.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1');
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
const led = p => p.evaluate(() => { window.__fb.tlTick(); return JSON.stringify([0, 1, 2, 3].map(ti => { const L = window.__fb.ledger(ti); return [L.net, L.gave, L.ev.map(e => [Math.round(e.T), e.v, e.k])]; })); });
// places change hands several times between two snapshots: the host's record has every change, Ravi's phone only sees the last
await A.evaluate(() => { const { G, tlTick } = window.__fb, set = (i, a, by) => { const h = G.holds[i]; h.owner = G.ALLY[a]; h.by = by; tlTick(); };
  set(0, 0, 0); set(0, 1, 1); set(3, 0, 0); set(0, 0, 0); set(3, 1, 1); set(3, 0, 0); });
await sleep(4000);
const midA = await led(A), midB = await led(B);
console.log('before the end, the two phones', midA === midB ? 'agree (the test did not make them differ)' : 'differ, as set up');
await A.evaluate(() => window.__fb.end()); await sleep(2000); console.log('A state', await A.evaluate(() => window.__fb.G.state)); await B.waitForFunction(() => window.__fb.G.state === 'end', null, { timeout: 60000 }).catch(() => console.log('B never ended')); await sleep(4000);
const endA = await led(A), endB = await led(B);
console.log('A', endA, '\nB', endB);
const ok = endA === endB && midA !== midB;
console.log(ok ? 'PASS: both phones show the same Points record' : 'FAIL');
await b1.close(); await b2.close(); process.exit(ok ? 0 : 1);
