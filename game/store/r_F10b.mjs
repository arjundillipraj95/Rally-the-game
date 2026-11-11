// F10b proof: the summit feeling. Prints draw calls + triangles at the start of a Crown battle on Low, for the
// build at BASE (default :8767, commit 4cafda1, before F10) and for this one (:8766). Then, from the real chase
// camera, walks the captain to three edges and shoots them at Low and High, plus one at dusk and one at night,
// to /tmp/f10b/<q>_<edge>.png.   Env: BASE=<url of the before build> (empty to skip), SHOTS=0 to skip shots.
import { chromium } from 'playwright';
import fs from 'fs';
const OUT = '/tmp/f10b/'; fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? 'http://127.0.0.1:8767/', HERE = 'http://127.0.0.1:8766/';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
async function open(url, q) {
  const page = await browser.newPage({ viewport: { width: 780, height: 360 } }); // (a phone's landscape shape)
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.addInitScript(qq => { window.__testSheet = true; localStorage.setItem('rally-quality', qq); localStorage.setItem('rally-tutorial-done', '1');
    window.__raf = []; window.__t = 0; window.requestAnimationFrame = cb => { window.__raf.push(cb); return 1; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const qu = window.__raf; window.__raf = []; qu.forEach(cb => cb(window.__t)); } }; }, q);
  await page.goto(url + '?crown2=1');
  await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
  await page.evaluate(() => window.__frame(20));
  return page;
}
const gfx = async page => page.evaluate(() => window.__fb.info.gfx);
const res = {};
for (const [tag, url] of [['before', BASE], ['after', HERE]]) {
  if (!url) continue;
  const page = await open(url, 'low'); const g = await gfx(page); res[tag] = g;
  console.log(tag, 'low  calls', g.calls, 'tris', g.tris); await page.close();
}
if (res.before && res.after) console.log('delta calls', res.after.calls - res.before.calls, 'tris', ((res.after.tris / res.before.tris - 1) * 100).toFixed(1) + '%', 'budget: <= ~5 calls, <= +5% tris');
// walk the captain out to the rim at angle a (start a little inside it, then the stick pushes him to the edge) and
// turn the chase camera to look out past him
async function edge(page, a) {
  await page.evaluate(a0 => { const { G, W, cam } = window.__fb, p = G.player, R = W.R;
    // a clear spot of rim near a0: no tree, tower or castle within reach of the captain's path or the camera behind him
    const things = [...G.layout.trees, ...G.layout.towers, ...G.layout.homes].filter(t => Math.hypot(t.x, t.z) < R + 2);
    let a = a0, best = -1;
    for (let da = -.25; da <= .25; da += .01) { const b = a0 + da; let m = 99; for (let d = R - 30; d <= R; d += 2) for (const t of things) m = Math.min(m, Math.hypot(t.x - Math.cos(b) * d, t.z - Math.sin(b) * d)); if (m > best + .5) { best = m; a = b; } }
    const cx = Math.cos(a), cz = Math.sin(a);
    p.x = cx * (R - 16); p.z = cz * (R - 16); p.vx = p.vz = 0;
    window.__noRender = true; window.__fb.step(75, 1 / 30, { wx: cx, wz: cz, mag: 1, camYaw: Math.atan2(cx, cz) }); window.__noRender = false;
    cam.yaw = Math.atan2(cx, cz); window.__frame(120); }, a);
  return page.evaluate(() => { const { G, W } = window.__fb, p = G.player; return { r: Math.hypot(p.x, p.z).toFixed(1), R: W.R }; });
}
if (process.env.SHOTS !== '0') {
  const E = [['e1', .785], ['e2', 2.36], ['e3', 3.93]]; // (the diagonals: clear rim between two castles)
  for (const q of ['low', 'high']) {
    const page = await open(HERE, q);
    await page.evaluate(() => { window.__noRender = true; window.__fb.step(30 * 6); window.__noRender = false; }); // (past the opening)
    for (const [n, a] of E) { const w = await edge(page, a); await page.screenshot({ path: `${OUT}${q}_${n}.png`, timeout: 400000 }); console.log('shot', q, n, 'captain r', w.r, 'of', w.R); }
    if (q === 'high') { // dusk, then night, at the first edge
      for (const [n, s] of [['dusk', 440], ['night', 50]]) {
        await page.evaluate(s => { window.__noRender = true; window.__fb.step(30 * s); window.__noRender = false; }, s);
        const w = await edge(page, E[0][1]); await page.screenshot({ path: `${OUT}${q}_${n}.png`, timeout: 400000 }); console.log('shot', q, n, 'captain r', w.r, 'dead', await page.evaluate(() => window.__fb.G.player.dead));
      }
    }
    await page.close();
  }
}
await browser.close();
