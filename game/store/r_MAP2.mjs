// MAP2: the new mountain is drawn (?map26=1). A Crown battle starts with no errors; the border rivers are in the
// river's mesh, the four nexus banners stand, the country walls are up; a top view and a view of side 0's country
// go to /tmp/r_MAP2/. Prints draw calls and triangles at the start view, old mountain vs new, Low and High (the new
// mountain's 24 bandit camps put 80 more neutral men on the field: most of the extra triangles are theirs).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
import { mkdirSync } from 'fs';
const OUT = '/tmp/r_MAP2'; mkdirSync(OUT, { recursive: true });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const gfx = {};
for (const quality of ['low', 'high']) for (const q of ['?crown2=1', '?crown2=1&map26=1']) {
  const page = await open(browser, 844, 390, { q, quality }), errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 30);
  const g = await page.evaluate(() => window.__fb.info.gfx); gfx[quality + q] = g;
  if (q.includes('map26') && quality === 'high') {
    const s = await page.evaluate(() => { const { scene, G } = window.__fb, L = G.layout; let water = 0, flags = 0, wallStones = 0;
      scene.traverse(o => { if (!o.isMesh) return; const p = o.geometry.parameters;
        if (p && p.width === 3.6 && p.height === 2.4) flags++;
        if (o.geometry.index && o.geometry.attributes.position.count === 2 * (L.river.pts.length + L.river.lines.reduce((a, l) => a + l.length, 0))) water++; });
      wallStones = L.obstacles.filter(o => o.country != null).length;
      return { water, flags, wallStones, R: window.__fb.W.R, lines: L.river.lines.length }; });
    ok(s.R === 205 && s.lines === 4, `new mountain (R ${s.R}, ${s.lines} border rivers)`);
    ok(s.water === 1, 'one river mesh holds the ring and the 4 border rivers');
    ok(s.flags === 4, `4 nexus banners (${s.flags})`);
    ok(s.wallStones > 200, `country walls laid (${s.wallStones} stones)`);
    await page.screenshot({ path: OUT + '/start.png' });
  }
  ok(!errs.length, `${quality} ${q}: no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
  await page.close();
}
for (const quality of ['low', 'high']) { const a = gfx[quality + '?crown2=1'], b = gfx[quality + '?crown2=1&map26=1'];
  console.log(`     ${quality}: start view draw calls ${a.calls} -> ${b.calls}, triangles ${Math.round(a.tris / 1000)}k -> ${Math.round(b.tris / 1000)}k (old mountain -> new)`); }
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
