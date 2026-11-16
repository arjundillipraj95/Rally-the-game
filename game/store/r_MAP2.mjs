// MAP2: the mountain is drawn. A Crown battle starts with no errors; the border rivers are in the
// river's mesh, the four nexus banners stand, the country walls are up; a top view and a view of side 0's country
// go to /tmp/r_MAP2/. Prints draw calls and triangles at the start view, Low and High (the old mountain's, measured
// in MAP2, in the line; the 24 bandit camps put 80 more neutral men on the field: most of the extra triangles are theirs).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
import { mkdirSync } from 'fs';
const OUT = '/tmp/r_MAP2'; mkdirSync(OUT, { recursive: true });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const gfx = {};
for (const quality of ['low', 'high']) for (const q of ['?crown2=1']) {
  const page = await open(browser, 844, 390, { q, quality }), errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 30);
  const g = await page.evaluate(() => window.__fb.info.gfx); gfx[quality + q] = g;
  if (quality === 'high') {
    const s = await page.evaluate(() => { const { scene, G } = window.__fb, L = G.layout; let water = 0, flags = 0, wallStones = 0;
      scene.traverse(o => { if (!o.isMesh) return; const p = o.geometry.parameters;
        if (o.geometry.type === 'OctahedronGeometry' && p && p.radius === 1.25) flags++;
        if (o.geometry.index && o.geometry.attributes.position.count === 2 * (L.river.pts.length + L.river.lines.reduce((a, l) => a + l.length, 0)) + (L.river.pools || []).length * 21) water++; });
      let pave = 0; scene.traverse(o => { if (o.isMesh && o.material && o.material.name === 'peakBrick') pave++; });
      return { water, flags, pave, peaks: (L.peaks || []).length, R: window.__fb.W.R, lines: L.river.lines.length }; });
    ok(s.R === 170 && s.lines === 4, `the mountain (R ${s.R}, ${s.lines} border rivers)`);
    ok(s.water === 1, 'one river mesh holds the ring, the 4 border rivers and their spring pools');
    ok(s.flags === 4, `4 nexus crystals (${s.flags})`);
    ok(s.peaks === 4, `4 peaks (paving checked in the screenshots: the scene's batching merges it)`);
    await page.screenshot({ path: OUT + '/start.png' });
  }
  ok(!errs.length, `${quality} ${q}: no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
  await page.close();
}
for (const quality of ['low', 'high']) { const b = gfx[quality + '?crown2=1'];
  console.log(`     ${quality}: start view draw calls ${b.calls}, triangles ${Math.round(b.tris / 1000)}k (MAP2 measured the old mountain at Low 150 / 585k, High 160 / 683k)`); }
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
