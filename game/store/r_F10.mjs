// F10 proof: the mountain's edge. Env TAG=before|after. Prints draw calls + triangles at the start of a Crown
// battle on Low, and shoots three edges at low and high quality to /tmp/f10/<tag>_<q>_<edge>.png
import { chromium } from 'playwright';
import fs from 'fs';
const TAG = process.env.TAG || 'after', OUT = '/tmp/f10/'; fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
for (const q of ['low', 'high']) {
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.addInitScript(qq => { window.__testSheet = true; localStorage.setItem('rally-quality', qq); localStorage.setItem('rally-tutorial-done', '1');
    window.__raf = []; window.__t = 0; window.requestAnimationFrame = cb => { window.__raf.push(cb); return 1; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const qu = window.__raf; window.__raf = []; qu.forEach(cb => cb(window.__t)); } }; }, q);
  await page.goto('http://127.0.0.1:8766/?crown2=1');
  await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
  await page.evaluate(() => window.__frame(20));
  const g = await page.evaluate(() => window.__fb.info.gfx); console.log(TAG, q, 'level', g.level, 'calls', g.calls, 'tris', g.tris);
  // three edges: camera on the outer lane looking out over the rim (angles chosen between homes)
  for (const [name, a, ly] of [['e1', 0.3, 12], ['e2', 2.2, 12], ['e3', 4.4, -14]]) {
    await page.evaluate(([a, ly]) => { const h0 = window.__fb.G.layout.homes[0], R = Math.hypot(h0.x, h0.z) / .92; const cx = Math.cos(a), cz = Math.sin(a); window.__camAt = [cx * R * .98, 11, cz * R * .98, cx * R * 1.6, ly, cz * R * 1.6]; window.__frame(3); }, [a, ly]);
    await page.screenshot({ path: `${OUT}${TAG}_${q}_${name}.png`, timeout: 400000 });
  }
  await page.close();
}
await browser.close();
