// Dev check: a map's holdings over the network (Desert): the host's oasis changes hands, and the
// joiner's phone should show the same owner, capture progress and contest.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const mk = async () => { const b = await chromium.launch(opts), c = await b.newContext({ viewport: { width: 320, height: 160 } });
  await c.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; window.__testSheet = true; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
  const p = await c.newPage(); p.on('pageerror', e => console.log('ERR', e.message)); await p.goto('http://127.0.0.1:8766/'); return [p, b]; };
const [A, ab] = await mk(), [B, bb] = await mk();
await A.click('#mpBtn'); await A.click('#hostBtn'); await A.waitForTimeout(2500); await A.click('#lobbyMap button[data-v="desert"]'); await A.waitForTimeout(300);
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
await B.click('#mpBtn'); await B.fill('#codeIn', code); await B.click('#joinBtn');
await B.waitForFunction(() => !document.getElementById('ovLobby').hidden, null, { timeout: 30000 }); await B.waitForTimeout(1500);
await A.click('#startBtn'); await A.waitForTimeout(3000);
const bTi = await B.evaluate(() => window.__fb.info.myTi);
const rows = [];
for (const [owner, prog, cap, cont] of [[2, 0, -1, 0], [2, .4, 1, 0], [1, 0, -1, 1]]) {
  await A.evaluate(([o, p, c, k]) => { const h = window.__fb.G.holds[0]; window.__pin && clearInterval(window.__pin); window.__pin = setInterval(() => { h.owner = o; h.prog = p; h.cap = c; h.contested = !!k; }, 20); }, [owner, prog, cap, cont]);
  await B.waitForTimeout(700);
  rows.push(await B.evaluate(() => { const h = window.__fb.G.holds && window.__fb.G.holds[0]; return h ? `${h.kind} owner ${h.owner} prog ${h.prog} cap ${h.cap} contested ${h.contested}` : 'no holds on joiner'; }));
}
console.log(rows.join('\n'));
await ab.close(); await bb.close();
