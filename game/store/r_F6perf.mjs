// F6 frame cost: draw calls and triangles at a Crown start on Low quality, with a fixed random seed so two
// builds can be compared. Usage: node store/r_F6perf.mjs  (prints one JSON line)
import { chromium } from 'playwright';
export async function perf(browser) {
  const page = await browser.newPage({ viewport: { width: 844, height: 390 } });
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.addInitScript(() => {
    window.__testSheet = true; localStorage.setItem('rally-quality', 'low'); localStorage.setItem('rally-tutorial-done', '1');
    let s = 12345; Math.random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    window.__raf = []; window.__t = 0;
    window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
  });
  await page.goto('http://127.0.0.1:8766/?crown2=1');
  await page.waitForFunction(() => window.__fb && window.__fb.G);
  await page.evaluate(() => window.__frame(3));
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
  await page.waitForTimeout(4000); // (the models load)
  const r = await page.evaluate(async () => {
    const F = window.__fb, R = F.renderer; let calls = 0, tris = 0, n = 0;
    for (let k = 0; k < 400; k++) { window.__frame(1); if (k % 40 === 0) await new Promise(r => setTimeout(r, 50)); if (F.G.state === 'play' && k >= 340) { calls += R.info.render.calls; tris += R.info.render.triangles; n++; } }
    return { state: F.G.state, T: +F.G.T.toFixed(1), level: F.info.gfx.level, frames: n, calls: Math.round(calls / n), tris: Math.round(tris / n) };
  });
  await page.close();
  return r;
}
if (process.argv[1].endsWith('r_F6perf.mjs')) {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  console.log(JSON.stringify(await perf(browser)));
  await browser.close();
}
