// Dev check: the relay through our own online service (wrangler dev on 8787). The joiner skips the direct
// link (__FORCE_RELAY); the public brokers are unreachable here, so only our relay can carry the battle.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b = await chromium.launch(opts), b2 = await chromium.launch(opts);
const ctx = await b.newContext({ viewport: { width: 320, height: 160 } }), ctx2 = await b2.newContext({ viewport: { width: 320, height: 160 } });
for (const c of [ctx, ctx2]) await c.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; if (window.name !== 'host') window.__FORCE_RELAY = 1; window.__testSheet = true; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
const A = await ctx.newPage(), B = await ctx2.newPage(); await A.addInitScript(() => { window.name = 'host'; });
for (const [n, p] of [['A', A], ['B', B]]) p.on('pageerror', e => console.log(n, 'ERR', e.message));
await A.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787'); await B.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787'); for (const p of [A, B]) await p.evaluate(async () => { const O = await import('/src/net/online.js'); await O.startOnline(); });
await A.waitForTimeout(800);
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
// snapshot spacing seen by B
await B.evaluate(async () => { const N = { C: window.__netC }; window.__gaps = []; let last = N.C.lastSnapAt; const f = () => { if (N.C.lastSnapAt !== last) { window.__gaps.push(N.C.lastSnapAt - last); last = N.C.lastSnapAt; } if (window.__gaps.length < 200) setTimeout(f, 2); }; f(); });
await B.waitForTimeout(4000);
const gaps = await B.evaluate(() => window.__gaps); gaps.sort((a, b) => a - b);
console.log('snapshot gaps ms: n', gaps.length, 'median', gaps[gaps.length >> 1] | 0, 'p90', gaps[(gaps.length * .9) | 0] | 0, 'max', gaps[gaps.length - 1] | 0);
console.log('fps A/B', await A.evaluate(() => window.__fb.info.gfx.fps), await B.evaluate(() => window.__fb.info.gfx.fps));
await b.close(); await b2.close();
