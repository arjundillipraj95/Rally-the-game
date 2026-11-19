// C4 on a joined phone: the host plays Devi. Her Arrow storm's mark shows on the joined phone for its warning (2 s,
// everyone's answer is to walk out), and her Tiger's volley's arrows fly there. Needs the servers.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick, q] of [[b1, 'Arjun', '&champ=devi'], [b2, 'Ravi', '']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1' + q);
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.player, null, { timeout: 60000 }); await sleep(3000);
const me = await A.evaluate(() => window.__fb.G.myTi), champ = await A.evaluate(() => window.__fb.G.champs[window.__fb.G.myTi]);
ok(champ === 'devi', `the host plays Devi (${champ})`);
// her archers 12 m back; the Arrow storm on a spot 20 m ahead of her
await A.evaluate(async () => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), Ab = await import('/src/core/sim/abilities.js'), me = G.myTi, s = G.teams[me], p = s.leader;
  s.lvl = 7; s.xp = 1e4; s.cds = { sp1: 0, sp2: 0, ult: 0, armyUlt: 0 }; s.rally = 100;
  const A = Math.atan2(-p.x, -p.z), at = d => [p.x + Math.sin(A) * d, p.z + Math.cos(A) * d];
  for (let k = 0; k < 4; k++) { const [x, z] = at(-2 - k), u = sim.mkUnit(me, x + k, z, 'arch'); }
  const [x, z] = at(20); window.__st = Ab.useAbility(me, 'armyUlt', { x, z }); window.__stN = (G.storms || []).length; });
const host = await A.evaluate(() => ({ used: window.__st, n: window.__stN }));
const seen = await B.evaluate(async () => { const G = window.__fb.G; let storms = 0, r = 0;
  for (let k = 0; k < 60 && !storms; k++) { storms = (G.storms || []).length; if (storms) r = G.storms[0].r; await new Promise(res => setTimeout(res, 50)); }
  return { storms, r }; });
ok(host.n === 1, `the host marks an Arrow storm (${host.n}, ${host.used})`);
ok(seen.storms === 1 && seen.r === 5, `the joined phone sees its mark (${seen.storms}, ${seen.r} m) during the warning`);
// Tiger's volley at a man 10 m off: her arrows on the joined phone
await A.evaluate(async () => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), Ab = await import('/src/core/sim/abilities.js'), me = G.myTi, s = G.teams[me], p = s.leader;
  s.cds.ult = 0; const m = sim.mkUnit((me + 1) % 4, p.x + Math.sin(p.face) * 10, p.z + Math.cos(p.face) * 10, 'foot'); m.max = m.hp = 1e5; Ab.useAbility(me, 'ult', { x: m.x, z: m.z, u: m }); });
const arrows = await B.evaluate(async () => { const G = window.__fb.G; let n = 0;
  for (let k = 0; k < 40; k++) { n = Math.max(n, G.arrows.length); await new Promise(res => setTimeout(res, 50)); } return n; });
ok(arrows >= 1, `her volley's arrows fly on the joined phone (${arrows} at once)`);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
