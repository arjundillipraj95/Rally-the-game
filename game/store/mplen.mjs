// Dev check: the lobby's length and target. The host picks Deathmatch, 15 minutes, 200 tickets; the
// joiner's lobby must show it, and the battle must run with it on both phones.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const mk = async () => { const b = await chromium.launch(opts), c = await b.newContext({ viewport: { width: 320, height: 160 } });
  await c.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; window.__testSheet = true; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
  const p = await c.newPage(); p.on('pageerror', e => console.log('ERR', e.message)); await p.goto('http://127.0.0.1:8766/'); return [p, b]; };
const [A, ab] = await mk(), [B, bb] = await mk();
await A.click('#mpBtn'); await A.click('#hostBtn'); await A.waitForTimeout(2500);
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
await B.click('#mpBtn'); await B.fill('#codeIn', code); await B.click('#joinBtn');
await B.waitForFunction(() => !document.getElementById('ovLobby').hidden, null, { timeout: 30000 }); await B.waitForTimeout(1500);
await A.click('#lobbyMode button[data-v="dm"]'); await A.waitForTimeout(300);
await A.click('#lobbyTime button[data-v="15"]'); await A.waitForTimeout(300);
await A.click('#lobbyTarget button[data-v="200"]'); await A.waitForTimeout(900);
console.log('joiner lobby shows:', await B.evaluate(() => ({ time: document.querySelector('#lobbyTime [aria-pressed="true"]')?.textContent, target: document.querySelector('#lobbyTarget [aria-pressed="true"]')?.textContent, label: document.getElementById('lobbyTargetLabel').textContent })));
await A.screenshot({ path: '/tmp/claude-0/-home-claude/4e17cb5f-998f-589c-8d52-44170dd3d094/scratchpad/store/lobby_len.png' });
await A.click('#startBtn'); await A.waitForTimeout(3000);
const sig = p => p.evaluate(() => { const G = window.__fb.G; return JSON.stringify({ mode: G.mode, time: G.time, target: G.target, tickets: G.teams.slice(0, 4).map(t => t.tickets).join(',') }); });
console.log('host  ', await sig(A)); console.log('joiner', await sig(B));
await ab.close(); await bb.close();
