// Dev check: castle placement over the network. Host and joiner must put every castle, the oasis
// junctions and the mesas in the same places (it all follows the seed and the teams).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const mk = async () => { const b = await chromium.launch(opts), c = await b.newContext({ viewport: { width: 320, height: 160 } });
  await c.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
  const p = await c.newPage(); p.on('pageerror', e => console.log('ERR', e.message)); await p.goto('http://127.0.0.1:8766/'); return [p, b]; };
const [A, ab] = await mk(), [B, bb] = await mk();
await A.click('#mpBtn'); await A.click('#hostBtn'); await A.waitForTimeout(2500); await A.click('#lobbyMap button[data-v="desert"]'); await A.click('#lobbyTeams button[data-v="2v2"]'); await A.waitForTimeout(300);
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
await B.click('#mpBtn'); await B.fill('#codeIn', code); await B.click('#joinBtn');
await B.waitForFunction(() => !document.getElementById('ovLobby').hidden, null, { timeout: 30000 }); await B.waitForTimeout(1500);
await A.click('#startBtn'); await A.waitForTimeout(3000);
const sig = p => p.evaluate(() => { const L = window.__fb.G.layout; return JSON.stringify({ castles: L.obstacles.filter(o => o.castle).map(o => [Math.round(o.x), Math.round(o.z)]), mesas: (L.solids || []).length, firstMesa: L.solids && L.solids[0] && L.solids[0].pts[0].map(Math.round), holds: L.holds.map(h => [Math.round(h.x), Math.round(h.z)]), ally: window.__fb.G.ALLY.join('') }); });
const a = await sig(A), b = await sig(B);
console.log('host  ', a); console.log('joiner', b); console.log(a === b ? 'SAME' : 'DIFFERENT');
await ab.close(); await bb.close();
