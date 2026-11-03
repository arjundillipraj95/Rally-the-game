// Dev check (needs `wrangler dev` in /online on :8787 and the peer server on :9000): two players become
// friends, form a party, search Duo together, the lobby starts, the host's phone opens the battle and the
// friend links up: both in one Crown battle, on the same side.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787');
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
const ev = (p, f) => p.evaluate(f);
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { await new Promise(r => setTimeout(r, 1000)); const { ON } = await import('/src/net/online.js'); return ON.me && ON.me.id; });
console.log('B code', codeB);
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.waitForSelector('[data-inv]'); await A.click('[data-inv]'); await sleep(800);
await B.waitForSelector('#inviteYes:not([hidden])'); await B.click('#inviteYes'); await sleep(1200);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
console.log('A pedestal:', await A.$eval('#pedL', e => e.textContent.trim() + ' ' + e.className), '| A play:', await A.$eval('#playSub', e => e.textContent));
await A.click('#segFmt button[data-v="1"]'); await A.click('#playBtn'); await sleep(1500);
console.log('A searching:', await A.$eval('#searchSides', e => e.innerText.replace(/\n/g, ' / ')));
console.log('waiting for the lobby to start (60 s)...');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play', null, { timeout: 120000 });
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play', null, { timeout: 60000 });
await sleep(2000);
const info = async p => p.evaluate(() => { const G = window.__fb.G; return { state: G.state, mode: G.mode, myTi: G.myTi, ally: G.ALLY.join(''), duo: G.duo.join(''), humans: G.teams.filter(t => t.human).length, role: G.role }; });
console.log('A', JSON.stringify(await info(A)), '\nB', JSON.stringify(await info(B)));
await b1.close(); await b2.close();
