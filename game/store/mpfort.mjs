// Dev check: Fortify over the network. The host fortifies its castle, then a section is broken; the
// joiner's phone must stand the same palisade (men and arrows blocked there) and knock out the same section.
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
const view = p => p.evaluate(() => { const G = window.__fb.G, c = G.myTi === undefined ? 0 : 0; return [0, 1, 2, 3].map(c => `${G.teams[c].up.fort}:${G.layout.pal[c].obs.filter(o => !o.off).length}`).join(' '); });
const hc = await A.evaluate(() => window.__fb.G.myTi % 4);
await A.evaluate(() => { const G = window.__fb.G; G.teams[G.myTi].gold = 1000; window.__fb.upgrade('fort'); });
await B.waitForTimeout(900);
console.log('after the host builds:  host', await view(A), '| joiner', await view(B));
await A.evaluate(c => { const G = window.__fb.G; G.forts[c].broken |= 1 << 3; window.__fb.fort(c, G.teams[c].up.fort); }, hc);
await B.waitForTimeout(900);
console.log('after a breach:         host', await view(A), '| joiner', await view(B));
await ab.close(); await bb.close();
