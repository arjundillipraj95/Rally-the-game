// Dev check: a joiner who goes quiet for 30 s is played by the computer, and takes his army back the
// moment he moves.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b = await chromium.launch(opts), b2 = await chromium.launch(opts);
const ctx = await b.newContext({ viewport: { width: 320, height: 160 } }), ctx2 = await b2.newContext({ viewport: { width: 320, height: 160 } });
for (const c of [ctx, ctx2]) await c.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; window.__testSheet = true; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
const A = await ctx.newPage(), B = await ctx2.newPage(); await A.addInitScript(() => { window.name = 'host'; });
for (const [n, p] of [['A', A], ['B', B]]) p.on('pageerror', e => console.log(n, 'ERR', e.message));
await A.goto('http://127.0.0.1:8766/'); await B.goto('http://127.0.0.1:8766/'); await A.waitForTimeout(800);
await A.click('#mpBtn'); await A.fill('#nick', 'Host'); await A.click('#hostBtn'); await A.waitForTimeout(2500);
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
const duo = process.argv[2] === 'duo';
const aTi = await A.evaluate(() => window.__fb.info.myTi);
if (duo) { await A.click('#seats .seatcol:nth-child(' + (aTi + 1) + ') .duotog'); await A.waitForTimeout(500); }
await B.click('#mpBtn'); await B.fill('#nick', 'Friend'); await B.fill('#codeIn', code); await B.click('#joinBtn'); await B.waitForFunction(() => !document.getElementById('ovLobby').hidden, null, { timeout: 30000 }); await B.waitForTimeout(800);
if (duo) { await B.click('#seats .seatcol:nth-child(' + (aTi + 1) + ') .seat.slot2'); await B.waitForTimeout(1200); }
else { await B.click('#seats .seatcol:nth-child(' + (((aTi + 1) % 4) + 1) + ') .seat'); await B.waitForTimeout(1200); }
await A.click('#startBtn'); await A.waitForTimeout(3000);
await B.evaluate(async () => { const S = await import('/src/core/state.js'); S.bus.on('hitstop', () => window.__onHs && window.__onHs()); });
console.log('A ti', await A.evaluate(() => window.__fb.info.myTi), 'B ti', await B.evaluate(() => window.__fb.info.myTi), 'B state', await B.evaluate(() => window.__fb.info.state));
const bTi = await B.evaluate(() => window.__fb.G.myTi);
const hum = () => A.evaluate(ti => window.__fb.G.teams[ti].human, bTi);
console.log('at start human', await hum());
await B.waitForTimeout(33000); console.log('after 33 s idle human', await hum());
await B.evaluate(() => { window.__moveOverride = () => ({ wx: 1, wz: 0, mag: 1 }); }); await B.waitForTimeout(1500); await B.evaluate(() => { window.__moveOverride = null; });
console.log('after moving human', await hum());
console.log('B feed', await B.evaluate(() => document.getElementById('feed').innerText.replace(/\s+/g, ' ')));
await b.close(); await b2.close();
