// Dev check: a host and a joining player in two tabs (local PeerJS server on :9000), measuring how the
// joiner's game feels: snapshot spacing, how long before their own blows register, and their kill count.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b = await chromium.launch(opts), b2 = await chromium.launch(opts);
const ctx = await b.newContext({ viewport: { width: 320, height: 160 } }), ctx2 = await b2.newContext({ viewport: { width: 320, height: 160 } });
for (const c of [ctx, ctx2]) await c.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
const A = await ctx.newPage(), B = await ctx2.newPage();
for (const [n, p] of [['A', A], ['B', B]]) p.on('pageerror', e => console.log(n, 'ERR', e.message));
await A.goto('http://127.0.0.1:8766/'); await B.goto('http://127.0.0.1:8766/'); await A.waitForTimeout(800);
await A.click('#mpBtn'); await A.fill('#nick', 'Host'); await A.click('#hostBtn'); await A.waitForTimeout(2500);
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
const duo = process.argv[2] === 'duo';
const aTi = await A.evaluate(() => window.__fb.info.myTi);
if (duo) { await A.click('.seatcol:nth-child(' + (aTi + 1) + ') .duotog'); await A.waitForTimeout(500); }
await B.click('#mpBtn'); await B.fill('#nick', 'Friend'); await B.fill('#codeIn', code); await B.click('#joinBtn'); await B.waitForTimeout(2500);
if (duo) { await B.click('.seatcol:nth-child(' + (aTi + 1) + ') .seat.slot2'); await B.waitForTimeout(1200); }
else { await B.click('.seatcol:nth-child(' + (((aTi + 1) % 4) + 1) + ') .seat'); await B.waitForTimeout(1200); }
await A.click('#startBtn'); await A.waitForTimeout(3000);
await B.evaluate(async () => { const S = await import('/src/core/state.js'); S.bus.on('hitstop', () => window.__onHs && window.__onHs()); });
console.log('A ti', await A.evaluate(() => window.__fb.info.myTi), 'B ti', await B.evaluate(() => window.__fb.info.myTi), 'B state', await B.evaluate(() => window.__fb.info.state));
// snapshot spacing seen by B
await B.evaluate(async () => { const N = { C: window.__netC }; window.__gaps = []; let last = N.C.lastSnapAt; const f = () => { if (N.C.lastSnapAt !== last) { window.__gaps.push(N.C.lastSnapAt - last); last = N.C.lastSnapAt; } if (window.__gaps.length < 200) setTimeout(f, 2); }; f(); });
await B.waitForTimeout(4000);
const gaps = await B.evaluate(() => window.__gaps); gaps.sort((a, b) => a - b);
console.log('snapshot gaps ms: n', gaps.length, 'median', gaps[gaps.length >> 1] | 0, 'p90', gaps[(gaps.length * .9) | 0] | 0, 'max', gaps[gaps.length - 1] | 0);
console.log('fps A/B', await A.evaluate(() => window.__fb.info.gfx.fps), await B.evaluate(() => window.__fb.info.gfx.fps));
// B's kills: on the host, line enemies up in front of B's captain with 1 hp; B swings
const bTi = await B.evaluate(() => window.__fb.info.myTi);
const lat = [];
for (let k = 0; k < 5; k++) {
  const tid = await A.evaluate(bTi => { const G = window.__fb.G, L = G.teams[bTi].leader; const e = G.units.find(u => !u.dead && u.kind === 'foot' && G.ALLY[u.ti % 4] !== G.ALLY[bTi % 4]); if (!e) return null; for (const u of G.units) if (!u.dead && u !== L && u !== e) { u.x = 80 * Math.sign(u.x || 1); u.z = 80; u.stun = 5; } e.x = L.x + Math.sin(L.face) * 1.6; e.z = L.z + Math.cos(L.face) * 1.6; e.hp = 1; e.stun = 3; e.spd = 0; e.vx = e.vz = 0; e.face = L.face + Math.PI; window.__tid = e.id; return e.id; }, bTi);
  await B.waitForTimeout(500);
  await A.evaluate(([tid, bTi]) => { const G = window.__fb.G, e = G.units.find(u => u.id === tid), L = G.teams[bTi].leader; window.__trace = []; const t0 = performance.now(); const f = () => { window.__trace.push([(performance.now() - t0) | 0, L.x.toFixed(1), L.z.toFixed(1), e.x.toFixed(1), e.z.toFixed(1), L.swing > 0 ? 'S' : '', e.stun.toFixed(1)].join(' ')); if (performance.now() - t0 < 900) setTimeout(f, 60); }; f(); }, [tid, bTi]);
  const t = await B.evaluate(tid => new Promise(res => { const G = window.__fb.G, p = G.player; const e = G.units.find(u => u.id === tid); if (!e || !p) return res('nf'); const hp0 = e.hp, d0 = Math.hypot(e.x - p.x, e.z - p.z).toFixed(1); const t0 = performance.now(); let hs = -1; window.__onHs = () => { if (hs < 0) hs = performance.now() - t0 | 0; }; window.__fb.attack(); const f = () => { if (e.dead || e.hp < hp0 - .5) res('impact ' + hs + 'ms, confirmed ' + (performance.now() - t0 | 0) + 'ms@' + d0); else if (performance.now() - t0 > 2000) res('none@' + d0); else setTimeout(f, 2); }; f(); }), tid);
  const host = await A.evaluate(([tid, bTi]) => { const G = window.__fb.G, e = G.units.find(u => u.id === tid), L = G.teams[bTi].leader; return (e ? (e.dead ? 'dead' : 'hp' + e.hp.toFixed(0)) : 'gone') + ' L.lastSwingT=' + (G.T - L.lastSwingT).toFixed(2) + 'ago stun=' + L.stun.toFixed(2) + ' cd=' + L.cd.toFixed(2) + ' d=' + (e ? Math.hypot(e.x - L.x, e.z - L.z).toFixed(1) : '-') + ' remote=' + L.remote + ' human=' + L.human + ' w=' + L.weapon; }, [tid, bTi]);
  lat.push(t + '/' + host); await B.waitForTimeout(600);
}
console.log('B attack -> hit seen (ms):', lat.join(' '));
await A.evaluate(() => window.__fb.end()); await B.waitForTimeout(2500);
console.log('B kills shown:', await B.evaluate(() => document.getElementById('sKills').textContent), '| host counted:', await A.evaluate(bTi => window.__fb.G.teams[bTi].kills | 0, bTi));
await b.close(); await b2.close();
