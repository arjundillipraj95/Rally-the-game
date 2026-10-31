// Dev check: a full four-player battle (host + three joiners, each its own browser) over the local
// PeerJS server. Everyone must get a seat, start, receive snapshots and be able to move and fight.
// node store/mp4.mjs <map> [joiners]
import { chromium } from 'playwright';
const map = process.argv[2] || 'valley', nJ = +(process.argv[3] || 3);
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const pages = [];
for (let i = 0; i <= nJ; i++) {
  const b = await chromium.launch(opts), ctx = await b.newContext({ viewport: { width: 320, height: 160 } });
  await ctx.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
  const p = await ctx.newPage(); const n = i ? 'J' + i : 'H';
  p.on('pageerror', e => console.log(n, 'PAGEERROR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log(n, 'console', m.text().slice(0, 200)); });
  await p.goto('http://127.0.0.1:8766/'); pages.push([n, p, b]);
}
const [, H] = pages[0];
await H.waitForTimeout(800);
await H.click('#mpBtn'); await H.fill('#nick', 'Host'); await H.click('#hostBtn'); await H.waitForTimeout(2500);
await H.click(`#lobbyMap button[data-v="${map}"]`).catch(() => {}); await H.waitForTimeout(300);
const code = await H.evaluate(() => document.getElementById('codeTxt').textContent);
console.log('code', code);
for (let i = 1; i <= nJ; i++) {
  const [n, p] = pages[i];
  await p.click('#mpBtn'); await p.fill('#nick', n); await p.fill('#codeIn', code); await p.click('#joinBtn');
  const t0 = Date.now(); await p.waitForFunction(() => !document.getElementById('ovLobby').hidden || /Could not|No battle/.test(document.getElementById('netNote').textContent), null, { timeout: 30000 }).catch(() => {});
  console.log(n, 'join took', Date.now() - t0, 'ms');
  console.log(n, 'note:', await p.evaluate(() => document.getElementById('netNote').textContent), 'lobby shown:', await p.evaluate(() => !document.getElementById('ovLobby').hidden));
  // take the first free army seat
  const took = 'auto';
  await p.waitForTimeout(1200);
  console.log(n, 'seat col', took);
}
await H.waitForTimeout(1500);
console.log('host seats:', await H.evaluate(() => JSON.stringify(Object.values(window.__fb && window.__fb.info.net ? window.__fb.info.net.seats || {} : {}))));
await H.click('#startBtn'); await H.waitForTimeout(4000);
for (const [n, p] of pages) console.log(n, 'start:', await p.evaluate(() => { const i = window.__fb.info; return JSON.stringify({ state: i.state, myTi: i.myTi, units: i.units, size: i.net && i.net.size }); }));
// each joiner walks forward for 3 s; the host should see their captain move
const before = await H.evaluate(() => window.__fb.G.teams.map(t => t.leader && [t.leader.x, t.leader.z]));
for (const [n, p] of pages.slice(1)) await p.evaluate(() => { window.__moveOverride = () => { const p = window.__fb.G.player; return { wx: -Math.sign(p.x), wz: -Math.sign(p.z), mag: 1, camYaw: 0 }; }; });
await H.waitForTimeout(3500);
const after = await H.evaluate(() => window.__fb.G.teams.map(t => t.leader && [t.leader.x, t.leader.z]));
for (const [n, p] of pages.slice(1)) {
  const ti = await p.evaluate(() => window.__fb.info.myTi);
  const moved = before[ti] && after[ti] ? Math.hypot(after[ti][0] - before[ti][0], after[ti][1] - before[ti][1]).toFixed(1) : 'n/a';
  const snaps = await p.evaluate(() => window.__netC ? JSON.stringify({ last: Math.round(performance.now() - (window.__netC.lastSnapAt || 0)) }) : 'no __netC');
  console.log(n, 'ti', ti, 'moved on host by', moved, 'm; snapshot age', snaps);
}
console.log('host bytes/snapshot:', await H.evaluate(() => window.__fb.info.net && window.__fb.info.net.size));
for (const [, , b] of pages) await b.close();
