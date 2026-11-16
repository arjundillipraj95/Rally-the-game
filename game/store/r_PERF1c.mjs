// PERF1c: in a staged crowd (4 sides x 3 champions + 40 men, at a border field, as r_PERF1), Low:
// 1. at most QUALITY.full.low men (captains aside) are full models, and they are the nearest ones;
// 2. over the 320-man cap, the men drawn are the nearest (nobody within 40 m of the camera left out);
// 3. the edge doesn't flicker: over 30 frames, few men switch between full and light;
// 4. 10 s more of the crowd fighting with no page errors.
// Speed: run r_PERF1.mjs with OLD= a server of launch26 before PERF1c (see the card).
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await browser.newPage({ viewport: { width: 844, height: 390 } }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.addInitScript(() => {
  localStorage.setItem('rally-quality', 'low'); localStorage.setItem('rally-tutorial-done', '1'); window.__testSheet = true;
  window.__raf = []; window.__t = 0; window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
  window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
});
await page.goto('http://127.0.0.1:8766/?crown2=1'); await page.waitForFunction(() => window.__fb && window.__fb.G);
await page.evaluate(() => { window.__frame(3); document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
for (let k = 0; k < 200 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await page.evaluate(() => window.__frame(10));
await page.evaluate(() => window.__frame(30));
await page.evaluate(() => { // the crowd, as r_PERF1
  const F = window.__fb, G = F.G, f = G.layout.fields[0], ax = Math.cos(f.a || 0), az = Math.sin(f.a || 0);
  const at = [[f.x - ax * 6, f.z - az * 6], [f.x + ax * 6, f.z + az * 6], [f.x - az * 25, f.z + ax * 25], [f.x + az * 25, f.z - ax * 25]];
  for (let i = 0; i < 4; i++) { const [cx, cz] = at[i], L0 = G.teams[i].leader; if (!L0) continue; L0.x = cx; L0.z = cz;
    for (let k = 0; k < 2; k++) F.mkUnit(i, cx + (k ? 2 : -2), cz + 2, 'captain');
    for (let n = 0; n < 40; n++) { const r = 2 + (n >> 3) * 1.4, q = (n & 7) / 8 * Math.PI * 2; F.mkUnit(i, cx + Math.cos(q) * r, cz + Math.sin(q) * r, n % 10 < 7 ? 'foot' : 'arch'); } }
  if (G.player) { G.player.x = f.x; G.player.z = f.z; }
});
await page.evaluate(() => window.__frame(90));
const look = () => page.evaluate(async () => {
  const C = await import('/src/render/crowd.js'), Q = (await import('/src/config.js')).QUALITY, F = window.__fb, G = F.G, t = F.camTarget();
  const d = u => Math.hypot(u.x - t.x, u.z - t.z), live = G.units.filter(u => !u.dead && u.kind !== 'captain');
  const full = live.filter(C.isFull), plan = new Set(C.lastPlan()), cand = G.units.filter(u => !u.hidden && !u.fog);
  const farFull = full.length ? Math.max(...full.map(d)) : 0, nearLight = live.filter(u => !C.isFull(u) && d(u) < 14).map(d);
  const left = cand.filter(u => !plan.has(u));
  return { budget: Q.full.low, full: full.length, farFull, nearLight: nearLight.length ? Math.min(...nearLight) : null, cand: cand.length, drawn: plan.size,
    leftNear: left.length ? Math.min(...left.map(d)) : null, ids: full.map(u => u.id), calls: F.info.gfx.calls };
});
const a = await look();
console.log(JSON.stringify({ ...a, ids: undefined }));
ok(a.full <= a.budget && a.full > 0, `full models ${a.full} (budget ${a.budget}, captains aside)`);
ok(a.nearLight === null || a.nearLight >= a.farFull - 2.01, `the full ones are the nearest: farthest full ${a.farFull.toFixed(1)} m, nearest light ${a.nearLight && a.nearLight.toFixed(1)} m (2 m stickiness)`);
ok(a.cand <= 320 ? a.drawn === a.cand : a.drawn === 320 && a.leftNear > 40, `cap: ${a.cand} to draw, ${a.drawn} drawn, nearest left out at ${a.leftNear && a.leftNear.toFixed(0)} m`);
let flips = 0, prev = new Set(a.ids);
for (let i = 0; i < 30; i++) { await page.evaluate(() => window.__frame(1)); const b = await look(), now = new Set(b.ids); for (const id of now) if (!prev.has(id)) flips++; prev = now; }
ok(flips <= 30, `edge steady: ${flips} men turned full over 30 frames (1 s)`);
await page.evaluate(() => window.__frame(300)); // (10 s more of the crowd)
ok(!errs.length, `10 s more of the crowd, no page errors ${errs.slice(0, 2).join(' | ')}`);
await browser.close();
console.log(fails ? `FAILED ${fails}` : 'ALL PASS'); process.exit(fails ? 1 : 0);
