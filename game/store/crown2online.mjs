// Dev check: the new Crown online (?crown2=1). Late join (needs `wrangler dev` in /online on :8787 and the peer server on :9000): two players become
// friends, form a party, search Duo together, the lobby starts, the host's phone opens the battle and the
// friend links up: both in one Crown battle, on the same side.
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
const info = async p => p.evaluate(() => { const G = window.__fb.G, K = G.c2; return { role: G.role, map: G.map.id, T: Math.round(G.T), c2: !!K, phase: K && K.phase, guards: K && K.breaks.filter(b => b.kind === 'guard').map(b => Math.round(b.hp)).join('.'),
  held: G.holds.map(h => h.owner).join(''), by: G.holds.map(h => h.by ?? '-').join(''), pts: [0, 1, 2, 3].map(a => window.__fb.c2Points(a)).join(','), cap: window.__fb.G.teams[G.myTi] && G.myTi, units: G.units.filter(u => !u.dead).length }; });
await A.evaluate(() => { const { G } = window.__fb, K = G.c2; K.breaks[0].hp = 50; K.breaks[12].hp = 0; G.holds[0].owner = G.ALLY[0]; G.holds[0].by = 0; G.holds[3].owner = G.ALLY[1]; G.holds[3].by = 1; K.chestPts[G.ALLY[0]] = 4; K.kills[G.ALLY[1]] = { 2: 1, 3: 1 }; K.phase = 'open'; G.plazaWall.broken = 15; });
await sleep(4000);
for (let k = 0; k < 1; k++) { console.log('A', JSON.stringify(await info(A)), '\nB', JSON.stringify(await info(B))); await sleep(15000); }
await b1.close(); await b2.close();
