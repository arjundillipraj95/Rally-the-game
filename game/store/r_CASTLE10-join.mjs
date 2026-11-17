// CASTLE10 on a joined phone: what tonight's castle cards added reaches every phone the same: a nexus's health, a castle
// taken (owner, shard, banner shield), shards, a filling circle, the points, and the capture moment's announcement.
// Same start as r_NET1 (needs the servers).
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
await B.evaluate(async () => { const st8 = await import('/src/core/state.js'); window.__ev = []; st8.bus.on('msgIn', m => window.__ev.push(m.k)); st8.bus.on('camBeat', () => window.__ev.push('beat')); });
const host = await A.evaluate(async () => { const { G } = window.__fb, st8 = await import('/src/core/state.js'), c2 = await import('/src/core/sim/crown2.js'), f = await import('/src/core/sim/forts.js');
  const K = G.c2, me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], fc = [0, 1, 2, 3].find(k => G.ALLY[k] !== myA);
  const nb = K.breaks.find(b => b.kind === 'nexus' && b.c === fc), mid = G.holds.find(h => h.kind === 'castle' && h.mid && h.side === fc); mid.owner = myA;
  for (let k = 0; k < 20; k++) c2.c2Hit(me, nb);
  const h = G.holds.find(x => x.kind === 'castle' && !x.mid && x.side === fc); h.owner = G.ALLY[fc]; h.shardBy = null; c2.c2Take(h, myA, new Map([[me.ti, 1]]));
  const h2 = G.holds.find(x => x.kind === 'castle' && !x.mid && x.side !== fc && x !== h); h2.owner = G.ALLY[fc]; h2.shieldT = 0; G.cgates[h2.id] = f.freshGates(0); f.applyCastleGates(); window.__h2 = setInterval(() => { h2.cap = myA; h2.prog = .42; }, 16); // (an open circle: level 0)
  return { nexus: Math.round(nb.hp), ids: [nb.c, h.id, h2.id] }; });
await waitT(2.5);
const pair = async p => p.evaluate(async ([c, hid, h2id]) => { const { G } = window.__fb, c2 = await import('/src/core/sim/crown2.js'), K = G.c2;
  return { nexus: Math.round(K.breaks.find(b => b.kind === 'nexus' && b.c === c).hp), owner: G.holds[hid].owner, shardBy: G.holds[hid].shardBy ?? -1, shield: G.holds[hid].shieldT > G.T,
    shards: [0, 1, 2, 3].map(a => (K.shards && K.shards[a]) || 0).join('.'), prog: Math.round(G.holds[h2id].prog * 100), pts: [0, 1, 2, 3].map(a => c2.c2Points(a)).join('.'), ev: window.__ev || null }; }, host.ids);
const a = await pair(A), b = await pair(B);
await A.evaluate(() => clearInterval(window.__h2));
ok(b.nexus === a.nexus && a.nexus < 3000, `nexus health the same (${a.nexus} / ${b.nexus})`);
ok(b.owner === a.owner && b.shardBy === a.shardBy && b.shield === a.shield, `castle taken: owner, shard and banner shield the same (${b.owner}, ${b.shardBy}, ${b.shield})`);
ok(b.shards === a.shards, `shards the same (${a.shards} / ${b.shards})`);
ok(Math.abs(b.prog - a.prog) <= 3 && Math.abs(a.prog - 42) <= 3, `circle progress the same (${a.prog} / ${b.prog})`);
ok(b.pts === a.pts, `points the same (${a.pts} / ${b.pts})`);
ok(b.ev && b.ev.includes('holdTaken'), `the capture moment reached the joined phone (${(b.ev || []).filter(k => /hold|shard|castle/.test(k)).join(', ')})`);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
