// Lag harness (P0.2): an online battle between two phones, one of them "far away". Every message in both
// directions is delayed (and some dropped) through the test-only window.__lag switch in net/p2p.js. Prints:
//   response: ms from the far phone pressing forward to its own captain moving on its screen
//   positionError: metres between where the host has each unit and where the far phone shows it
//   smoothness: frames where a unit jumps more than 0.5 m on the far phone
// Needs `wrangler dev` in /online on :8787 and the peer server on :9000 (scratchpad up/upall scripts).
// Usage: LAG=250 LOSS=0.05 DUR=60 node store/lagtest.mjs   (LAG is the round trip in ms; LAG=0 LOSS=0 for a baseline)
const LAG = +(process.env.LAG ?? 250), LOSS = +(process.env.LOSS ?? .05), DUR = +(process.env.DUR ?? 60);
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787');
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
const ev = (p, f) => p.evaluate(f);
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
console.log('B code', codeB);
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);

// ---------- start a battle on A, join it from B (same as crown2online) ----------
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(2000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'client', null, { timeout: 60000 });
await sleep(2500);

// ---------- the far-away phone: delay (and drop) every message in both directions ----------
const one = LAG / 2;
for (const p of [A, B]) await p.evaluate(([ms, loss]) => { window.__lag = ms || loss ? { ms, loss } : null; window.__noRender = 1; }, [one, LOSS]); // (no drawing: two headless phones can't draw 3D fast enough to measure)
await sleep(1000);

// B: every frame, how far does each unit move on screen? (a jump = more than 0.5 m in one frame, teleports over 5 m ignored)
await B.evaluate(() => {
  const S = window.__lagS = { frames: 0, jumps: 0, maxJump: 0, last: new Map() };
  const tick = () => {
    const G = window.__fb.G; S.frames++;
    for (const u of G.units) {
      if (u.dead) continue; const o = S.last.get(u.id);
      if (o) { const d = Math.hypot(u.x - o[0], u.z - o[1]); if (d < 5) { if (d > .5) S.jumps++; if (d > S.maxJump) S.maxJump = d; } }
      S.last.set(u.id, [u.x, u.z]);
    }
    if (!S.stop) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

// A walks left and right so its captain is a moving target for B
let walking = true;
const walker = (async () => { let k = 0; while (walking) { const key = k++ % 2 ? 'KeyA' : 'KeyD'; await A.keyboard.down(key); await sleep(1500); await A.keyboard.up(key); } })().catch(() => {});

const errs = [], resp = [];
const pos = p => p.evaluate(() => { const o = {}; for (const u of window.__fb.G.units) if (!u.dead) o[u.id] = [u.x, u.z]; return o; });
const t0 = Date.now();
let nextProbe = Date.now() + 1000;
const shownPing = []; // (P0.3: the ping B's HUD shows, read every loop)
while (Date.now() - t0 < DUR * 1000) {
  // how far behind is B's picture of the battle? (every unit both phones know)
  const [a, b] = await Promise.all([pos(A), pos(B)]);
  for (const id in a) if (b[id]) { const e = Math.hypot(a[id][0] - b[id][0], a[id][1] - b[id][1]); if (e < 10) errs.push(e); }
  { const pv = await B.evaluate(() => { const e = document.getElementById('ping'); return e && !e.hidden && /^\d+ ms$/.test(e.textContent) ? parseInt(e.textContent, 10) : null; }); if (pv != null) shownPing.push(pv); }
  // how long from B pressing forward to B's own captain moving?
  if (Date.now() >= nextProbe) {
    const alive = await B.evaluate(() => { const L = window.__fb.G.player; if (!L || L.dead) return false; window.__probe = { x: L.x, z: L.z, t: performance.now() }; return true; });
    if (!alive) { nextProbe = Date.now() + 1000; await sleep(250); continue; }
    await B.keyboard.down('KeyW');
    const ms = await B.evaluate(() => new Promise(res => {
      const P = window.__probe, G = window.__fb.G;
      const chk = () => { const L = G.player; if (!L) return res(null); const d = Math.hypot(L.x - P.x, L.z - P.z), t = performance.now() - P.t; if (d > .25) res(Math.round(t)); else if (t > 3000) res(null); else requestAnimationFrame(chk); };
      chk();
    }));
    await sleep(400); await B.keyboard.up('KeyW');
    if (ms != null) resp.push(ms);
    nextProbe = Date.now() + 4000;
  }
  await sleep(250);
}
walking = false; await walker;
const S = await B.evaluate(() => { const S = window.__lagS; S.stop = true; return { frames: S.frames, jumps: S.jumps, maxJump: +S.maxJump.toFixed(2) }; });
const q = (a, f) => { const s = [...a].sort((x, y) => x - y); return s.length ? +s[Math.min(s.length - 1, Math.floor(s.length * f))].toFixed(2) : null; };
const mean = a => a.length ? +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(2) : null;
const fps = Math.round(S.frames / DUR);
const shownMed = shownPing.length ? q(shownPing, .5) : null, shownLast = shownPing.length ? shownPing[shownPing.length - 1] : null;
console.log(`displayed ping on B: ${shownMed} ms (median of ${shownPing.length} HUD reads; last ${shownLast} ms)`);
const out = {
  setup: { roundTripMs: LAG, loss: LOSS, seconds: DUR, farPhoneFps: fps },
  displayedPing: { medianMs: shownMed, lastMs: shownLast, reads: shownPing.length },
  response: { probes: resp.length, meanMs: mean(resp), p90Ms: q(resp, .9), maxMs: resp.length ? Math.max(...resp) : null },
  positionError: { samples: errs.length, meanM: mean(errs), p90M: q(errs, .9), maxM: q(errs, 1) },
  smoothness: { frames: S.frames, jumpsOver05m: S.jumps, maxJumpM: S.maxJump },
};
console.log(JSON.stringify(out, null, 1));
await b1.close(); await b2.close();
process.exit(0);
