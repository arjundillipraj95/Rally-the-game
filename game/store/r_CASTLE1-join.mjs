// CASTLE1 on a joined phone: a castle's level, each gate's layers and plates (health and full health) and the banner
// shield's countdown arrive from the host. Same start as r_NET1 (needs the servers: bash store/servers.sh).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&' + (process.env.Q ?? '?crown2=1').replace(/^\?/, '')); // (Q='?crown2=1&roles=1' for roles on, as crown2sim)
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
const ev = (p, f) => p.evaluate(f);
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
console.log('B code', codeB);
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
// Arjun starts a Solo battle alone; once it's running, Ravi joins it from his friends list
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
console.log('waiting for Arjun\'s battle to start (60 s)...');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play', null, { timeout: 60000 }); await sleep(3000);
// (the headless phones run the battle slowly: waits are in battle seconds on the host)
const waitT = async dt => { const t0 = await A.evaluate(() => window.__fb.G.T); await A.waitForFunction(t => window.__fb.G.T > t, t0 + dt, { timeout: 180000 }); await sleep(1500); };
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const r0 = await A.evaluate(async () => { const { G } = window.__fb, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js');
  const me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], foe = G.teams.find((s, i) => s && s.leader && G.ALLY[st8.colorOf(i)] !== myA).leader;
  const h = G.holds.find(x => x.kind === 'castle' && x.mid && x.side === st8.colorOf(me.ti)), cw = G.layout.cwalls.find(c => c.hid === h.id);
  h.owner = myA; G.cgates[h.id] = f.freshGates(1); f.fortifyGates(G.cgates[h.id]);
  const w0 = cw.obs.find(w => w.cgate != null && w.gi === 0); while (G.cgates[h.id].hp[0] > 2000) f.hitWall(foe, w0);
  const other = G.holds.find(x => x.kind === 'castle' && x !== h); other.owner = myA; other.shieldT = G.T + 30;
  return { ids: [h.id, other.id], hp: G.cgates[h.id].hp.map(Math.round), max: G.cgates[h.id].max, lv: G.cgates[h.id].lv }; });
await waitT(1.5);
const r1 = await B.evaluate(([a, b]) => { const { G } = window.__fb, st = G.cgates[a]; return { hp: st.hp, max: st.max, lv: st.lv, shut: !G.layout.cwalls.find(c => c.hid === a).obs.find(w => w.cgate != null && w.gi === 0).off, shield: G.holds[b].shieldT - G.T }; }, r0.ids);
ok(r1.lv === 2 && r1.shut, `joined phone: level ${r1.lv}, gate shut`);
ok(r1.max.join() === r0.max.join(), `joined phone: same full health per gate (${r1.max.join('/')})`);
ok(r1.hp.every((v, k) => Math.abs(v - r0.hp[k]) <= 1), `joined phone: same gate health, plates show (${r1.hp.join('/')})`);
ok(r1.shield > 20 && r1.shield <= 30, `joined phone: banner rising, ${r1.shield.toFixed(1)} s left`);
await A.screenshot({ path: '/tmp/r_CASTLE1-host.png' }); await B.screenshot({ path: '/tmp/r_CASTLE1-join.png' });
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
