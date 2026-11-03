// Dev check: leaving a battle. (1) a joiner leaves through the battle menu: they're back at the title,
// and on the host their army goes to a computer captain. (2) the host leaves: the joiner is told at
// once and taken out (run with argv 'host').
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
await A.click('#startBtn'); await A.waitForTimeout(3000);
const bTi = await B.evaluate(() => window.__fb.info.myTi);
const who = process.argv[2] === 'host' ? A : B, other = who === A ? B : A;
const t0 = Date.now();
await who.click('#pauseBtn'); await who.waitForTimeout(300);
const note = await who.evaluate(() => document.getElementById('pauseNote').textContent);
await who.click('#quitBtn'); await who.waitForTimeout(500);
const left = await who.evaluate(() => ({ state: window.__fb.G.state, title: !document.getElementById('ovTitle').hidden }));
let seen = null;
for (let k = 0; k < 40 && !seen; k++) {
  await other.waitForTimeout(100);
  seen = await other.evaluate(([bTi, hostLeft]) => { const G = window.__fb.G;
    if (hostLeft) return G.state !== 'play' ? { state: G.state, note: document.getElementById('netNote').textContent } : null;
    return G.teams[bTi] && !G.teams[bTi].human ? { armyNowComputer: true, state: G.state } : null; }, [bTi, who === A]);
}
console.log(JSON.stringify({ leaver: who === A ? 'host' : 'joiner', note, leaverAfter: left, otherSaw: seen, ms: Date.now() - t0 }));
await ab.close(); await bb.close();
