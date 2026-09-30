// Dev check: host and joiner on a big map. Both must build the same layout (castles, ridges), the
// joiner's own soldiers must hold a line where the joiner places it, and nothing may error.
// node store/mpmap.mjs <map>
import { chromium } from 'playwright';
const map = process.argv[2] || 'valley';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b = await chromium.launch(opts), b2 = await chromium.launch(opts);
const ctx = await b.newContext({ viewport: { width: 320, height: 160 } }), ctx2 = await b2.newContext({ viewport: { width: 320, height: 160 } });
for (const c of [ctx, ctx2]) await c.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
const A = await ctx.newPage(), B = await ctx2.newPage();
for (const [n, p] of [['A', A], ['B', B]]) p.on('pageerror', e => console.log(n, 'ERR', e.message));
await A.goto('http://127.0.0.1:8766/'); await B.goto('http://127.0.0.1:8766/'); await A.waitForTimeout(800);
await A.click('#mpBtn'); await A.fill('#nick', 'Host'); await A.click('#hostBtn'); await A.waitForTimeout(2500);
await A.click(`#lobbyMap button[data-v="${map}"]`); await A.waitForTimeout(400);
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
const aTi = await A.evaluate(() => window.__fb.info.myTi);
await B.click('#mpBtn'); await B.fill('#nick', 'Friend'); await B.fill('#codeIn', code); await B.click('#joinBtn'); await B.waitForTimeout(2500);
await B.click('.seatcol:nth-child(' + (((aTi + 1) % 4) + 1) + ') .seat'); await B.waitForTimeout(1200);
await A.click('#startBtn'); await A.waitForTimeout(3000);
const sig = p => p.evaluate(() => { const G = window.__fb.G, L = G.layout; return JSON.stringify({ map: G.map.id, obs: L.obstacles.length, ridges: L.ridges.length, roads: L.roads.length, c0: G.layout && [Math.round(L.obstacles[L.obstacles.length - 1].x), Math.round(L.obstacles[L.obstacles.length - 1].z)], sum: Math.round(L.obstacles.reduce((s, o) => s + o.x * 3 + o.z, 0)) }); });
const sa = await sig(A), sb = await sig(B);
console.log('host  ', sa); console.log('joiner', sb); console.log('same layout:', sa === sb);
// the joiner places a hold line 8 m in front of their captain
const bTi = await B.evaluate(() => window.__fb.info.myTi);
await B.evaluate(() => { const G = window.__fb.G, p = G.player; window.__holdAt = { x: p.x + Math.sin(p.face) * 8, z: p.z + Math.cos(p.face) * 8, face: p.face }; });
await B.evaluate(() => window.__fb.order('hold', window.__holdAt));
await B.waitForTimeout(6000);
console.log('host sees joiner army:', await A.evaluate(ti => { const G = window.__fb.G, s = G.teams[ti]; return JSON.stringify({ order: s.order, pt: s.holdPt && [s.holdPt.x.toFixed(1), s.holdPt.z.toFixed(1)], holding: G.units.filter(u => !u.dead && u.ti === ti && u.holding).length }); }, bTi));
await b.close(); await b2.close();
