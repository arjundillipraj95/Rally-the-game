// Dev check: host handover. Three phones in a battle by code; the host's phone closes mid-battle. The
// lowest seat left should take over hosting, the third phone link back up, and the battle play on.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const bs = [], pages = [];
for (let i = 0; i < 3; i++) {
  const b = await chromium.launch(opts); bs.push(b);
  const ctx = await b.newContext({ viewport: { width: 320, height: 160 } });
  await ctx.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; window.__testSheet = true; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(i, 'ERR', e.message, e.stack.split('\n').slice(1, 4).join(' | '))); pages.push(p);
  await p.goto('http://127.0.0.1:8766/');
}
const [A, B, Cc] = pages; await A.waitForTimeout(800);
await A.click('#mpBtn'); await A.fill('#nick', 'Host'); await A.click('#hostBtn'); await A.waitForTimeout(2500);
if (process.argv[2] === 'crown') await A.evaluate(async () => { const S = await import('/src/net/session.js'); S.session.NET.lobby.mode = 'crown'; S.session.NET.lobby.map = 'valley'; });
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
const aTi = await A.evaluate(() => window.__fb.info.myTi);
for (const [k, P] of [[1, B], [2, Cc]]) {
  await P.click('#mpBtn'); await P.fill('#nick', 'P' + k); await P.fill('#codeIn', code); await P.click('#joinBtn');
  await P.waitForFunction(() => !document.getElementById('ovLobby').hidden, null, { timeout: 30000 }); await P.waitForTimeout(800);
  await P.click('#seats .seatcol:nth-child(' + (((aTi + k) % 4) + 1) + ') .seat'); await P.waitForTimeout(1200);
}
await A.click('#startBtn'); await A.waitForTimeout(+(process.argv[3] || 6) * 1000);
const info = async P => P.evaluate(() => { const G = window.__fb.G, N = window.__fb.info.net; return { ti: G.myTi, role: N && N.role, T: +G.T.toFixed(1), mode: G.mode, units: G.units.filter(u => !u.dead).length, state: G.state, me: G.player ? [+G.player.x.toFixed(1), +G.player.z.toFixed(1)] : null, humans: G.teams.map(s => s.human ? 1 : 0).join('') }; });
console.log('before', JSON.stringify(await info(A)), JSON.stringify(await info(B)), JSON.stringify(await info(Cc)));
await bs[0].close(); // the host's phone goes
await B.waitForTimeout(9000);
console.log('after ', JSON.stringify(await info(B)), JSON.stringify(await info(Cc)));
// C walks: does the new host see it move?
await Cc.evaluate(() => { window.__moveOverride = () => ({ wx: 1, wz: 0, mag: 1 }); });
const c0 = await B.evaluate(ti => { const L = window.__fb.G.teams[ti].leader; return [L.x, L.z]; }, await Cc.evaluate(() => window.__fb.G.myTi));
await Cc.waitForTimeout(2000); await Cc.evaluate(() => { window.__moveOverride = null; });
const c1 = await B.evaluate(ti => { const L = window.__fb.G.teams[ti].leader; return [L.x, L.z]; }, await Cc.evaluate(() => window.__fb.G.myTi));
console.log('C moved on the new host by', Math.hypot(c1[0] - c0[0], c1[1] - c0[1]).toFixed(1), 'm');
await B.waitForTimeout(3000);
console.log('later ', JSON.stringify(await info(B)), JSON.stringify(await info(Cc)));
console.log('B banner/feed:', await B.evaluate(() => document.getElementById('feed').innerText.replace(/\s+/g, ' ')));
for (const b of bs.slice(1)) await b.close();
