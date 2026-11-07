// Dev check: a hosted battle on the local online service sends its summary and its phone report; read them back at /admin/data.
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
const ctx = await b.newContext({ viewport: { width: 900, height: 420 } });
await ctx.addInitScript(() => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', 'Arjun'); });
const A = await ctx.newPage(); A.on('pageerror', e => console.log('ERR', e.message));
await A.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1');
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await A.waitForTimeout(1500);
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 150000 });
await A.evaluate(() => { window.__noRender = true; });
for (let k = 0; k < 24 && (await A.evaluate(() => window.__fb.G.state)) !== 'end'; k++) await A.evaluate(() => window.__fb.step(900));
await A.waitForTimeout(3000);
console.log(await A.evaluate(() => JSON.stringify({ end: window.__fb.G.endInfo, deaths: window.__fb.G.deaths, clear: window.__fb.G.c2.clearT })));
await b.close();
