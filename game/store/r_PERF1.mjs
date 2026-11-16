// PERF1: the new mountain against the old one on a low-end Android profile (card docs/tickets/PERF1.md).
// Old = branch t/SPLIT (same code, before MAP1) served on :8767 (OLD=port); new = this checkout on :8766.
//   git worktree add /tmp/rally-old origin/t/SPLIT; cd /tmp/rally-old/game; npx vite --port 8767
// Profile: 844x390 at pixel ratio 2, Low graphics, CPU throttled THROTTLE x (default 4, Lighthouse's mobile).
// Two scenes per mountain: the start view, and a staged crowd at a border field: 4 sides x (3 champions + 40 men),
// two sides fighting, two marching in, my champion in the middle; camps and guards as the battle has them.
// Draw calls and triangles on fixed frames; CPU ms per frame and rules ms per step (timing below). Headless draws
// with SwiftShader (no GPU), so only the processor side is measured: Arjun's phone test gives the GPU side.
// Usage: node store/r_PERF1.mjs   (NEW=8766 OLD=8767 THROTTLE=4 N=40 ONLY=old,new to skip the fix experiments)
import { chromium } from 'playwright';
import { existsSync, readFileSync, writeFileSync } from 'fs';
const NEW = +(process.env.NEW || 8766), OLD = +(process.env.OLD || 8767), THR = +(process.env.THROTTLE || 4);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--enable-unsafe-swiftshader'] });
let fails = 0;

async function open(port) {
  const ctx = await browser.newContext({ viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage(), errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.addInitScript(() => {
    localStorage.setItem('rally-quality', 'low'); localStorage.setItem('rally-tutorial-done', '1'); window.__testSheet = true;
    const real = window.requestAnimationFrame.bind(window); window.__realRaf = real; window.__raf = []; window.__t = 0;
    window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
  });
  await page.goto(`http://127.0.0.1:${port}/?crown2=1`);
  await page.waitForFunction(() => window.__fb && window.__fb.G);
  await page.evaluate(() => window.__frame(3));
  const cdp = await ctx.newCDPSession(page);
  return { page, errs, cdp, ctx };
}
const frames = (page, n) => page.evaluate(n => window.__frame(n), n);

async function startBattle(page) {
  await page.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
  for (let k = 0; k < 200 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await frames(page, 10);
  await frames(page, 30);
}

// what's on screen now (fixed frame): draw calls, triangles, men alive, men the soldier pass would draw (cap 320)
const counts = page => page.evaluate(() => {
  window.__frame(1); const F = window.__fb, G = F.G, g = F.info.gfx, live = G.units.filter(u => !u.dead);
  return { calls: g.calls, tris: g.tris, men: live.length, neutral: live.filter(u => u.neutral).length, champs: live.filter(u => u.kind === 'captain').length,
    toDraw: G.units.filter(u => !u.hidden && !u.fog).length };
});

// CPU throttled: JS ms per frame (rules + drawing, median of N frames on the fake clock, so SwiftShader's raster
// doesn't set the pace), then rules ms per step alone. cpuFps = what the phone's processor allows (its GPU aside).
const N = +(process.env.N || 40);
async function timing(p) {
  await p.cdp.send('Emulation.setCPUThrottlingRate', { rate: THR });
  const r = await p.page.evaluate(n => { const c = []; for (let i = 0; i < n; i++) { const t0 = performance.now(); window.__frame(1); c.push(performance.now() - t0); }
    const t0 = performance.now(); window.__fb.step(n); return { c, sim: (performance.now() - t0) / n }; }, N);
  await p.cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  const c = r.c.sort((a, b) => a - b), med = c[c.length >> 1], p95 = c[Math.floor(c.length * .95)];
  return { cpuFps: +(1000 / med).toFixed(1), slow5: +(1000 / p95).toFixed(1), jsMs: +med.toFixed(1), simMs: +r.sim.toFixed(1), drawMs: +Math.max(0, med - r.sim).toFixed(1) };
}

// the crowd: at the first border field, sides 0 and 1 face off 6 m apart, sides 2 and 3 march in from 25 m
async function stageCrowd(page) {
  return page.evaluate(() => {
    const F = window.__fb, G = F.G, L = G.layout, f = L.fields[0], ax = Math.cos(f.a || 0), az = Math.sin(f.a || 0);
    const at = [[f.x - ax * 6, f.z - az * 6], [f.x + ax * 6, f.z + az * 6], [f.x - az * 25, f.z + ax * 25], [f.x + az * 25, f.z - ax * 25]];
    for (let i = 0; i < 4; i++) {
      const [cx, cz] = at[i], L0 = G.teams[i].leader; if (!L0) continue;
      L0.x = cx; L0.z = cz; L0.y = 0;
      for (let k = 0; k < 2; k++) F.mkUnit(i, cx + (k ? 2 : -2), cz + 2, 'captain');
      for (let n = 0; n < 40; n++) { const r = 2 + (n >> 3) * 1.4, q = (n & 7) / 8 * Math.PI * 2; F.mkUnit(i, cx + Math.cos(q) * r, cz + Math.sin(q) * r, n % 10 < 7 ? 'foot' : 'arch'); }
    }
    try { F.order('charge', { x: f.x, z: f.z }); } catch (e) { /* (an older build may name it otherwise) */ }
    if (G.player) { G.player.x = f.x; G.player.z = f.z; }
    return { field: [Math.round(f.x), Math.round(f.z)] };
  });
}

// What each fix could save at most, on the new crowd, each in a fresh battle staged the same way: men taken out of
// the drawing (u.hidden) right after the crowd forms. trim: every 4th neutral (camps and guards about a quarter
// smaller); far: soldiers over 40 m from me (the most "lighter far soldiers" could save); cap: only the nearest 200; near: of the men within 14 m (full models on Low) only the nearest 24.
const hide = (page, rule) => page.evaluate(rule => { const G = window.__fb.G, me = G.player, d = u => Math.hypot(u.x - me.x, u.z - me.z);
  let k = 0; const live = G.units.filter(u => !u.dead).sort((a, b) => d(a) - d(b));
  live.forEach((u, i) => { u.hidden = rule === 'trim' ? !!u.neutral && (k++ % 4 === 0) : rule === 'far' ? d(u) > 40 && u.kind !== 'captain' : rule === 'cap' ? i >= 200 : rule === 'near' ? d(u) < 14 && i >= 24 && u.kind !== 'captain' : false; });
  return { hidden: live.filter(u => u.hidden).length, near: live.filter(u => d(u) < 14).length }; }, rule);

async function run(port, rule) {
  const p = await open(port);
  await startBattle(p.page);
  const startC = rule === 'base' ? await counts(p.page) : null, startT = rule === 'base' ? await timing(p) : null;
  await stageCrowd(p.page); await frames(p.page, 90); // (3 s: they close and fight; the camera settles)
  const h = await hide(p.page, rule); await frames(p.page, 2);
  const crowdC = await counts(p.page), crowdT = await timing(p);
  if (p.errs.length) { console.log(`FAIL ${port} ${rule}: page errors: ${p.errs.slice(0, 3).join(' | ')}`); fails++; }
  await p.ctx.close();
  return { start: startC && { ...startC, ...startT }, crowd: { ...crowdC, ...crowdT, ...h } };
}
// ONLY=old,new,trim,far,cap runs a part (each ~2-3 min); results gather in OUT, so parts can run one at a time.
const OUT = process.env.OUT || '/tmp/r_PERF1.json', ONLY = (process.env.ONLY || 'old,new,trim,far,cap,near').split(',');
const res = existsSync(OUT) && process.env.ONLY ? JSON.parse(readFileSync(OUT, 'utf8')) : {}; res.exp = res.exp || {};
for (const part of ONLY) {
  if (part === 'old' || part === 'new') res[part] = await run(part === 'old' ? OLD : NEW, 'base');
  else res.exp[part] = (await run(NEW, part)).crowd;
  writeFileSync(OUT, JSON.stringify(res));
}
await browser.close();

const keys = ['cpuFps', 'slow5', 'jsMs', 'simMs', 'drawMs', 'calls', 'tris', 'men', 'neutral', 'champs', 'toDraw', 'near'];
for (const scene of ['start', 'crowd']) {
  console.log(`\n${scene} (CPU ${THR}x, Low, 844x390@2)`);
  console.log('           ' + keys.map(k => k.padStart(8)).join(''));
  for (const m of ['old', 'new']) if (res[m] && res[m][scene]) console.log(m.padEnd(11) + keys.map(k => String(k === 'tris' ? Math.round(res[m][scene][k] / 1000) + 'k' : res[m][scene][k] ?? '').padStart(8)).join(''));
}
if (Object.keys(res.exp).length) { console.log('\nnew crowd, men taken out of the drawing (what a fix could save at most):');
  for (const [k, v] of Object.entries(res.exp)) console.log(`  ${k.padEnd(5)} hidden ${String(v.hidden).padStart(3)}  cpuFps ${v.cpuFps}  js ${v.jsMs} ms (sim ${v.simMs}, draw ${v.drawMs})  calls ${v.calls}  tris ${Math.round(v.tris / 1000)}k  near me ${v.near}`); }
const capHit = res.new && res.new.crowd.toDraw > 320;
console.log(`\nunit cap (render/soldiers.js MAX_UNITS 320): new crowd has ${res.new && res.new.crowd.toDraw} men to draw${capHit ? ' -> OVER: some are not drawn' : ''}`);
console.log(JSON.stringify(res));
console.log(fails ? `FAILED ${fails}` : 'ALL PASS');
process.exit(fails ? 1 : 0);
