// Dev check: how far an army has to walk on a map: path length (by the nav grid) from each castle's
// gate to the middle, to the next castle round, and across, against the straight line.  node store/pathlen.mjs forum
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const map = process.argv[2] || 'forum';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 400, 240);
const out = [];
for (let run = 0; run < 3; run++) {
  await page.evaluate(map => { window.__noRender = 1; document.querySelector('#segMode button[data-v="conquest"]').click(); document.querySelector(`#segMap button[data-v="${map}"]`).click(); document.querySelector('#goBtn').click(); window.__frame(2); }, map);
  out.push(await page.evaluate(() => {
    const F = window.__fb, G = F.G, T = [0, 1, 2, 3].map(c => F.gatePos({ pos: G.layout.obstacles.filter(o => o.castle)[c] ? [G.layout.obstacles.filter(o => o.castle)[c].x, G.layout.obstacles.filter(o => o.castle)[c].z] : [0, 0] }, 0, 2));
    const len = (a, b) => { const p = F.findPath(a[0], a[1], b[0], b[1], 60000); if (!p) return null; let L = Math.hypot(p[0][0] - a[0], p[0][1] - a[1]); for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; };
    const r = { mid: [], next: [], across: [] };
    const cs = T.map((g, i) => ({ g, a: Math.atan2(g[1], g[0]) })).sort((p, q) => p.a - q.a);
    for (let i = 0; i < cs.length; i++) {
      const g = cs[i].g, n = cs[(i + 1) % cs.length].g, x = cs[(i + 2) % cs.length].g;
      const c0 = [g[0] * .1, g[1] * .1]; r.mid.push(len(g, c0) / Math.hypot(g[0] - c0[0], g[1] - c0[1])); r.next.push(len(g, n) / Math.hypot(g[0] - n[0], g[1] - n[1])); r.across.push(len(g, x) / Math.hypot(g[0] - x[0], g[1] - x[1]));
    }
    const avg = a => +(a.reduce((s, v) => s + v, 0) / a.length).toFixed(2), m = a => Math.round(a);
    return { toMiddle: avg(r.mid), toNext: avg(r.next), across: avg(r.across), gate0: T[0].map(m), dMid: m(Math.hypot(T[0][0], T[0][1])) };
  }));
  await page.evaluate(() => { window.__fb.end(); window.__frame(5); const b = [...document.querySelectorAll('button')].find(b => /menu/i.test(b.textContent) && b.offsetParent); if (b) b.click(); window.__frame(3); });
}
console.log(map, 'path / straight line:', JSON.stringify(out));
await browser.close();
