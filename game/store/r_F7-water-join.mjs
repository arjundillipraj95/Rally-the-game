// F7-water, the joined phone (needs `bash store/servers.sh`): Ravi joins Arjun's battle; at 5:30 Ravi's own captain stands
// inside the arena when the flood comes. His own phone carries him out (no jump over 2 m a frame, set down past the
// chasm in line with a gate, alive), the host sees him carried (untouchable) and outside. Then, with the lake up, he
// can't walk back in. (Set up as crown2online.mjs.)
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
const T = await A.evaluate(() => Math.round(window.__fb.G.T)); console.log('joined at battle time', T);

const ar = await A.evaluate(() => window.__fb.G.layout.arena.r);
// the host: half past five, the chest done, the countdown 4 s from its end
await A.evaluate(() => { const { G } = window.__fb, K = G.c2; G.T = 330; K.chest = 2; const c = K.breaks.find(b => b.kind === 'chest'); if (c) c.hp = 0; K.floodAt = G.T - 6; });
await sleep(1200);
// Ravi stands inside, 9 m out from the glacier
await B.evaluate(() => { const p = window.__fb.G.player; p.x = 6.4; p.z = 6.4; p.vx = p.vz = 0; window.__trk = { n: 0, max: 0, flood: 0, prev: null, ends: [] };
  const tick = () => { const q = window.__fb.G.player, t = window.__trk; if (q && !q.dead) { const now = performance.now(); if (t.prev) { const j = Math.hypot(q.x - t.prev[0], q.z - t.prev[1]), dt = (now - t.pt) / 1000; if (q.flood) t.lastF = now; else if (t.lastF && !t.land) t.land = [Math.hypot(q.x, q.z), Math.atan2(q.z, q.x)]; /* (where the water set him down) */ const wet = q.flood || (t.lastF && now - t.lastF < 500); /* (the water's doing: while carried and just after; later the host takes over an idle player, as always) */
    if (wet && j > t.max) { t.max = j; t.at = { j: +j.toFixed(2), dt: +dt.toFixed(3), f: !!q.flood, r: +Math.hypot(q.x, q.z).toFixed(1), T: +window.__fb.G.T.toFixed(1) }; } if (wet) t.spd = Math.max(t.spd || 0, j / Math.max(dt, 1 / 60)); t.dts = Math.max(t.dts || 0, dt); } t.prev = [q.x, q.z]; t.pt = now; if (q.flood) t.flood++; t.n++; t.last = [q.x, q.z, !!q.flood]; } requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
let hostSaw = 0; for (let k = 0; k < 400; k++) { await sleep(400); if (await B.evaluate(() => { const G = window.__fb.G; return G.T > G.c2.floodAt + 17; })) break; hostSaw += await A.evaluate(id => { const u = window.__fb.G.units.find(o => o.human && o.remote && !o.dead); return u && u.flood && u.iframeT > 0 ? 1 : 0; }); }
const tb = await B.evaluate(() => { const t = window.__trk, G = window.__fb.G, p = G.player; return { n: t.n, max: +t.max.toFixed(2), at: t.at, spd: +(t.spd || 0).toFixed(1), worstFrame: +(t.dts || 0).toFixed(3), flood: t.flood, r: t.land ? +t.land[0].toFixed(1) : -1, a: t.land ? t.land[1] : 9, dead: !p || p.dead, floodAt: G.c2.floodAt, T: G.T, gates: G.layout.plazaWall.gates, rOut: G.layout.chasm.r + G.layout.chasm.w + 2.4 }; });
const ha = await A.evaluate(() => { const u = window.__fb.G.units.find(o => o.human && o.remote && !o.dead); return u ? +Math.hypot(u.x, u.z).toFixed(1) : -1; });
// now he tries to walk back in, with the lake up
await B.evaluate(() => { window.__moveOverride = () => { const p = window.__fb.G.player, d = Math.hypot(p.x, p.z) || 1; return { wx: -p.x / d, wz: -p.z / d, mag: 1, block: false, attackHeld: false }; }; });
const T0 = await B.evaluate(() => window.__fb.G.T); let minR = 99; for (let k = 0; k < 200; k++) { await sleep(300); if (await B.evaluate(t => window.__fb.G.T > t + 4, T0)) break; minR = Math.min(minR, await B.evaluate(() => { const p = window.__fb.G.player; return p ? Math.hypot(p.x, p.z) : 99; })); }
await B.evaluate(() => { window.__moveOverride = null; });
console.log(JSON.stringify({ tb: { ...tb, gates: undefined }, hostSaw, hostR: ha, minR: +minR.toFixed(2), ar }));
const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
ok(tb.flood > 10, 'joined phone: never carried');
ok(tb.max <= 2, 'joined phone: jump of ' + tb.max + ' m');
ok(!tb.dead && tb.r >= tb.rOut - .6, 'joined phone: not set down past the chasm (' + tb.r + ')');
ok(tb.gates.some(g => Math.abs(Math.atan2(Math.sin(tb.a - g), Math.cos(tb.a - g))) < .2), 'joined phone: not in line with a gate');
ok(hostSaw > 0, 'host never saw him carried and untouchable');
ok(ha >= ar + 2, 'host: he is not outside (' + ha + ')');
ok(minR >= ar + .2, 'joined phone: walked back in under the lake (' + minR + ')');
console.log(fails.length ? 'F7-water joined FAIL: ' + fails.join('; ') : 'F7-water joined PASS');
await b1.close(); await b2.close();
process.exit(fails.length ? 1 : 0);
