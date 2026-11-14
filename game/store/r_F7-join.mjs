// F7 on a joined phone: the respawn march and the chasm fall. Two browsers, Arjun hosts, Ravi joins (as r_F12).
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

// F7 on the joined phone (Ravi): his captain cut down respawns with the fade and marches out of the yard on his own phone
// (no frame over 2 m), and over the chasm's edge his phone teeters, holds the camera at the rim, and he's dead at ~1.2 s.
const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
await A.evaluate(() => { window.__noRender = 1; }); await B.evaluate(() => { window.__noRender = 1; }); await sleep(1500); // (software drawing in two browsers runs the battle at a few frames a second)
const meB = await B.evaluate(() => window.__fb.G.player.id);
const tA = async () => A.evaluate(() => JSON.stringify({ T: window.__fb.G.T.toFixed(2), hs: window.__fb.hitstop(), sm: window.__fb.slowmo(), vis: document.visibilityState }));
const watch = B.evaluate(async () => {
  const { G, death } = window.__fb, b = document.getElementById('blackout'); let p0 = G.player, me = null, black = null; const t0 = performance.now();
  while (performance.now() - t0 < 12000) { await new Promise(r => setTimeout(r, 30)); const p = G.player; if (p && p !== p0 && !p.dead && p.marchT > 0) { me = p; black = b.style.opacity; break; } if (p && p.dead) p0 = p; }
  if (!me) return { err: 'no respawn seen', p: G.player && { id: G.player.id, m: G.player.marchT, dead: G.player.dead }, c2: !!G.c2, intro: G.introOn };
  const out = { march: me.marchT, black, steps: [] }; let last = [me.x, me.z];
  const hm = G.layout.homes.reduce((q, x) => Math.hypot(x.x - me.x, x.z - me.z) < Math.hypot(q.x - me.x, q.z - me.z) ? x : q); out.d0 = Math.hypot(me.x - hm.x, me.z - hm.z);
  for (let i = 0; i < 50; i++) { await new Promise(r => setTimeout(r, 30)); out.steps.push(Math.hypot(me.x - last[0], me.z - last[1])); last = [me.x, me.z]; }
  out.d1 = Math.hypot(me.x - hm.x, me.z - hm.z); out.big = Math.max(...out.steps); out.back = b.style.opacity; delete out.steps;
  return out;
});
await sleep(300);
console.log('host kill', await A.evaluate(id => { const { G, die } = window.__fb; G.T = Math.max(G.T, 30); const u = G.units.find(x => x.id === id); if (!u) return 'no unit'; u.iframeT = 0; u.marchT = 0; u.hp = 0; die(u, null, 0); G.teams[u.ti].leaderDeadT = 1.5; return u.dead; }, meB));
const R = await watch;
console.log('respawn', JSON.stringify(R));
if (R.err) fails.push(R.err); else {
  ok(R.march > .5, 'joined: not marching on respawn'); ok(R.black === '1', 'joined: not black when he appeared: ' + R.black);
  ok(R.big < 2, 'joined: jumped ' + R.big.toFixed(2) + ' m in a frame'); ok(R.d1 > 10.5 && R.d1 > R.d0 + 3, 'joined: did not march out ' + R.d0.toFixed(1) + ' -> ' + R.d1.toFixed(1));
  ok(R.back === '0', 'joined: the screen did not come back in');
}
// over the chasm's edge (Ravi walks off it on his own phone; the host's rules decide; the host's clock times it,
// since two software-drawn browsers here run it slower than real time)
const hostFall = A.evaluate(async id => { const { G } = window.__fb; let t0 = -1; const s0 = performance.now();
  while (performance.now() - s0 < 8000) { await new Promise(r => setTimeout(r, 15));     const L = G.teams.find(s => s.leader && s.leader.human && s.leader.remote)?.leader; if (!L) continue;
    if (t0 < 0 && L.chasmT > 0) t0 = G.T; if (t0 >= 0 && L.dead) return G.T - t0; } return -1; }, meB);
const C = await B.evaluate(async () => {
  const F = window.__fb, { G } = F, me = G.player, L = G.layout, a = Math.atan2(me.z, me.x), d = L.chasm.r;
  me.marchT = 0; me.x = Math.cos(a) * d - Math.sin(a) * 4.5; me.z = Math.sin(a) * d + Math.cos(a) * 4.5;
  const t0 = performance.now(); let seen = -1, edge = false, deadAt = -1, ys = [];
  while (performance.now() - t0 < 6000) { await new Promise(r => setTimeout(r, 30)); const t = (performance.now() - t0) / 1000;
    if (seen < 0 && me.chasmAt) seen = t; if (me.chasmAt && !me.dead) { ys.push(me.y); const c = F.camTarget(); if (c && c.edge) edge = true; }
    if (seen >= 0 && me.dead && deadAt < 0) { deadAt = t - seen; break; } }
  let big = 0; for (let i = 1; i < ys.length; i++) big = Math.max(big, Math.abs(ys[i] - ys[i - 1]));
  return { seen, edge, deadAt, big, n: ys.length };
});
C.hostDead = await hostFall; console.log('chasm', JSON.stringify(C));
ok(C.seen >= 0, 'joined: the fall never showed'); ok(C.edge, 'joined: the camera did not hold at the rim');
ok(C.deadAt > 0, 'joined: he never died on the joined phone'); ok(C.hostDead > 1.1 && C.hostDead < 1.35, 'joined: the host counted him dead ' + C.hostDead + ' s into the fall, want ~1.2');
console.log(fails.length ? 'F7-join FAIL:\n - ' + fails.join('\n - ') : 'F7-join PASS');
await b1.close(); await b2.close();
process.exit(fails.length ? 1 : 0);
