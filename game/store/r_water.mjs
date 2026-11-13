// Water look: shoots the summit lake (full, welling pool round the glacier, flood front) and the river map at two moments each, Low and High,
// to /tmp/water/, and checks the surface actually moves (two frames a second apart differ) and no shader errors.
import { chromium } from 'playwright';
import fs from 'fs';
const OUT = '/tmp/water/'; fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
const fails = [];
async function open(q, url) {
  const page = await browser.newPage({ viewport: { width: 780, height: 360 } });
  page.on('pageerror', e => { console.log('PAGEERROR', e.message); fails.push(e.message); }); page.on('console', m => { if (/shader|WebGL|THREE\.WebGLProgram/i.test(m.text()) && m.type() === 'error') { console.log('GL', m.text().slice(0, 300)); fails.push('gl'); } });
  await page.addInitScript(qq => { window.__testSheet = true; localStorage.setItem('rally-quality', qq); localStorage.setItem('rally-tutorial-done', '1');
    window.__raf = []; window.__t = 0; window.requestAnimationFrame = cb => { window.__raf.push(cb); return 1; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const qu = window.__raf; window.__raf = []; qu.forEach(cb => cb(window.__t)); } }; }, q);
  await page.goto('http://127.0.0.1:8766/' + url);
  await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
  return page;
}
const diff = async (page) => { const a = await page.screenshot({ timeout: 400000 }); await page.evaluate(() => window.__frame(40)); const b = await page.screenshot({ timeout: 400000 }); return a.equals(b) ? 0 : 1; };
for (const q of (process.env.Q || 'low,high').split(',')) {
  // the summit lake: lake full at the start (camera over the arena), the pool at ~4:50 (the countdown), the flood front
  let p = await open(q, '?crown2=1');
  await p.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); window.__frame(20); });
  const look = async (name, T) => { await p.evaluate(s => { window.__noRender = true; window.__fb.step(Math.max(0, Math.round((s - window.__fb.G.T) * 30))); const { G, camera } = window.__fb, pl = G.player;
      if (pl) { const ar = G.layout.arena.r, a = .785; pl.x = Math.cos(a) * (ar + 6); pl.z = Math.sin(a) * (ar + 6); window.__fb.cam.yaw = Math.atan2(-Math.cos(a), -Math.sin(a)); } window.__noRender = false; window.__frame(30); }, T);
    await p.screenshot({ path: `${OUT}${q}_lake_${name}.png`, timeout: 400000 }); console.log('shot', q, name); };
  await look('full', 40); const moved = await diff(p); console.log(q, 'surface moves between frames:', moved); if (!moved) fails.push('static ' + q);
  await look('countdown', 300 + 5); await look('flood', 300 + 16);
  await p.close();
  p = await open(q, '');
  await p.evaluate(() => { document.querySelector('#segMap button[data-v="river"]').click(); document.getElementById('goBtn').click(); window.__frame(20); });
  await p.evaluate(() => { window.__noRender = true; window.__fb.step(60); const pl = window.__fb.G.player; if (pl) { pl.x = 0; pl.z = 0; } window.__noRender = false; window.__frame(30); });
  await p.screenshot({ path: `${OUT}${q}_river.png`, timeout: 400000 }); console.log('shot', q, 'river'); await p.close();
}
await browser.close();
console.log(fails.length ? 'FAILED ' + fails.join(';') : 'DONE'); process.exit(fails.length ? 1 : 0);
