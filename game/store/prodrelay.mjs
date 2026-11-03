// Dev check: the published build (served from the repo root on :8790) joining through the relay.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns'] };
const mk = async host => { const b = await chromium.launch(opts), c = await b.newContext({ viewport: { width: 360, height: 640 } });
  await c.addInitScript(h => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; window.__MQTT_URLS = ['ws://127.0.0.1:8883']; if (!h) window.__FORCE_RELAY = 1; window.__testSheet = true; localStorage.setItem('rally-tutorial-done', '1'); }, host);
  const p = await c.newPage(); p.on('pageerror', e => console.log(host ? 'H' : 'J', 'ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log(host ? 'H' : 'J', 'console', m.text().slice(0, 200)); }); await p.goto(process.env.URL || 'http://127.0.0.1:8790/'); return [p, b]; };
const [A, ab] = await mk(true), [B, bb] = await mk(false);
await A.click('#mpBtn'); await A.click('#hostBtn'); await A.waitForTimeout(3000);
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
await B.click('#mpBtn'); await B.fill('#codeIn', code); await B.click('#joinBtn');
const t0 = Date.now();
const ok = await B.waitForFunction(() => !document.getElementById('ovLobby').hidden, null, { timeout: 40000 }).then(() => true).catch(() => false);
console.log('code', code, 'joined via relay:', ok, 'in', Date.now() - t0, 'ms; note:', await B.evaluate(() => document.getElementById('netNote').textContent));
await ab.close(); await bb.close();
