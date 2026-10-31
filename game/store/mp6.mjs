// Dev check: a six-player 3v3 (host + five joiners, each its own browser): 2v2 teams with Blue and
// Red each set to Trio, three friends per castle. Everyone must get their seat, start at their own
// castle's gate together, move, and get snapshots. node store/mp6.mjs [map]
import { chromium } from 'playwright';
const map = process.argv[2] || 'valley';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const pages = [], bs = [await chromium.launch(opts), await chromium.launch(opts)];
for (let i = 0; i <= 5; i++) {
  const b = bs[i % 2], ctx = await b.newContext({ viewport: { width: 240, height: 140 } });
  await ctx.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; window.requestAnimationFrame = cb => setTimeout(() => cb(performance.now()), 100); });
  const p = await ctx.newPage(); const n = i ? 'J' + i : 'H';
  p.on('pageerror', e => console.log(n, 'PAGEERROR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log(n, 'console', m.text().slice(0, 200)); });
  await p.goto(process.env.URL || 'http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' }); const t0 = Date.now(); await p.waitForFunction(() => window.__fb, null, { timeout: 60000, polling: 300 }).catch(async () => console.log(n, 'no __fb', await p.evaluate(() => [document.readyState, typeof window.__fb, document.title]).catch(e => e.message))); console.log(n, 'loaded', Date.now() - t0); pages.push([n, p, b]);
}
const [, H] = pages[0];
await H.waitForTimeout(800);
await H.click('#mpBtn'); await H.fill('#nick', 'Host'); await H.click('#hostBtn'); await H.waitForTimeout(2500);
await H.click(`#lobbyMap button[data-v="${map}"]`).catch(() => {});
await H.click('#lobbyTeams button[data-v="2v2"]');
for (const col of [0, 0, 1, 1]) { await H.locator('.seatcol').nth(col).locator('.duotog').click(); await H.waitForTimeout(150); }
console.log('toggles:', await H.$$eval('.duotog', e => e.map(x => x.textContent).join(' ')));
const code = await H.evaluate(() => document.getElementById('codeTxt').textContent);
const want = [null, [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]];
for (let i = 1; i <= 5; i++) {
  const [n, p] = pages[i];
  await p.click('#mpBtn', { noWaitAfter: true }); await p.fill('#nick', n); await p.fill('#codeIn', code); await p.click('#joinBtn', { noWaitAfter: true });
  await p.waitForFunction(() => !document.getElementById('ovLobby').hidden, null, { timeout: 30000, polling: 300 }).catch(async () => console.log(n, 'NO LOBBY', await p.evaluate(() => document.getElementById('netNote').textContent)));
  await p.waitForFunction(c => document.querySelectorAll('.seatcol').length === 4 && document.querySelectorAll('.seatcol')[0].querySelectorAll('.seat').length === 3, null, { timeout: 20000, polling: 300 }).catch(async () => console.log(n, 'seats not drawn', await p.evaluate(() => JSON.stringify({ lobby: !document.getElementById('ovLobby').hidden, note: document.getElementById('netNote').textContent, cols: document.querySelectorAll('.seatcol').length }))));
  await p.evaluate(([c, k]) => document.querySelectorAll('.seatcol')[c].querySelectorAll('.seat')[k].click(), want[i]);
  await p.waitForTimeout(1200);
}
await H.waitForTimeout(1500);
console.log('host seats:', await H.evaluate(() => JSON.stringify(Object.values(window.__fb.info.net.seats).sort((a, b) => a - b))));
console.log('J5 lobby text:', await pages[5][1].evaluate(() => document.getElementById('lobbyNote') ? document.getElementById('lobbyNote').textContent : [...document.querySelectorAll('#ovLobby p')].map(x => x.textContent).join(' / ')));
await H.click('#startBtn'); await H.waitForTimeout(4000);
for (const [n, p] of pages) console.log(n, 'start:', await p.evaluate(() => { const i = window.__fb.info, G = window.__fb.G, me = G.player; return JSON.stringify({ state: i.state, myTi: i.myTi, units: i.units, at: me && [Math.round(me.x), Math.round(me.z)] }); }));
console.log('sides:', await H.evaluate(() => { const G = window.__fb.G; return G.teams.map((t, i) => t.active ? `${i}:${G.ALLY[i % 4]}${t.human ? 'H' : 'c'}` : '').filter(Boolean).join(' '); }));
const before = await H.evaluate(() => window.__fb.G.teams.map(t => t.leader && [t.leader.x, t.leader.z]));
for (const [, p] of pages.slice(1)) await p.evaluate(() => { window.__moveOverride = () => { const p = window.__fb.G.player; return { wx: -Math.sign(p.x), wz: -Math.sign(p.z), mag: 1, camYaw: 0 }; }; });
await H.waitForTimeout(3500);
const after = await H.evaluate(() => window.__fb.G.teams.map(t => t.leader && [t.leader.x, t.leader.z]));
for (const [n, p] of pages.slice(1)) {
  const ti = await p.evaluate(() => window.__fb.info.myTi);
  const moved = Math.hypot(after[ti][0] - before[ti][0], after[ti][1] - before[ti][1]).toFixed(1);
  const age = await p.evaluate(() => Math.round(performance.now() - (window.__netC.lastSnapAt || 0)));
  console.log(n, 'ti', ti, 'moved', moved, 'm; snap age', age, 'ms; sees units', await p.evaluate(() => window.__fb.G.units.filter(u => !u.dead).length));
}
console.log('host bytes/snapshot:', await H.evaluate(() => window.__fb.info.net && window.__fb.info.net.size));
for (const x of bs) await x.close();
