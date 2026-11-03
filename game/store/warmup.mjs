// Dev check: the warm-up camp. Queue online alone: a Colosseum free-for-all runs while searching; dying
// brings you straight back; when the service's 60 s lobby closes the real battle starts.
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns'] });
const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
await ctx.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', 'Solo'); });
const p = await ctx.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787');
await p.waitForFunction(async () => (await import('/src/net/online.js')).ON.up, null, { timeout: 15000 });
await p.click('#playBtn'); await p.waitForTimeout(2500);
const st = () => p.evaluate(() => { const G = window.__fb.G; return { state: G.state, mode: G.mode, map: G.map && G.map.id, warm: !!G.warmup, T: +G.T.toFixed(1), box: !document.getElementById('searchBox').hidden && document.getElementById('searchBox').className, net: window.__fb.info.net && window.__fb.info.net.role }; });
console.log('searching', JSON.stringify(await st()));
await p.screenshot({ path: process.env.S + '/warm.png' });
await p.evaluate(() => { const L = window.__fb.G.player; L.hp = 1; L.armour = 0; }); // (then a blow)
await p.evaluate(async () => { const S = await import('/src/core/sim.js'); const G = window.__fb.G, L = G.player, e = G.units.find(u => !u.dead && u.ti !== L.ti); L.hp = 0; S.die(L, e, 0); });
await p.waitForTimeout(400); const d = await p.evaluate(() => !window.__fb.G.player || window.__fb.G.player.dead);
await p.waitForTimeout(8000); console.log('dbg', await p.evaluate(() => { const G = window.__fb.G, s = G.teams[G.myTi]; return JSON.stringify({ T: G.T, dt: s.leaderDeadT, alive: s.alive, tickets: s.tickets, ld: s.leader && s.leader.dead, st: G.state, menu: document.getElementById('ovTitle').hidden }); }));
console.log('fell', d, 'back up', await p.evaluate(() => !!window.__fb.G.player && !window.__fb.G.player.dead));
await p.waitForFunction(() => window.__fb.G.mode === 'crown' && window.__fb.G.state === 'play', null, { timeout: 90000 });
console.log('battle', JSON.stringify(await st()));
await b.close();
