// Dev check: over many seeds, every Crown layout gets a river (2 bridges + a ford) and a pass, places stay dry, and every place can be walked to from the plaza.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 400, 300, { home: true });
await page.click('#playBtn'); await frames(page, 3);
const r = await page.evaluate(async () => {
  const F = window.__fb, G = F.G, out = { n: 0, noPass: 0, wetPlaces: 0, unreachable: 0, bridges: 0, fords: 0 };
  const { makeLayout, deepWater } = await import('/src/core/world.js'); const { buildNav, findPath, walkable } = await import('/src/core/nav.js');
  for (let seed = 1; seed <= 80; seed++) {
    const L = makeLayout('valley', false, false, seed * 7919); buildNav(L); out.n++;
    // flood fill the walkable grid from the plaza
    const C = 1.5, HN = 122, NN = Math.ceil(HN * 2 / C), seen = new Uint8Array(NN * NN), q = [], cell = (x, z) => [Math.floor((x + HN) / C), Math.floor((z + HN) / C)];
    const s0 = cell(0, 0); q.push(s0); seen[s0[1] * NN + s0[0]] = 1;
    while (q.length) { const [i, j] = q.pop(); for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const a = i + di, b = j + dj; if (a < 0 || b < 0 || a >= NN || b >= NN || seen[b * NN + a]) continue; if (!walkable(-HN + (a + .5) * C, -HN + (b + .5) * C)) continue; seen[b * NN + a] = 1; q.push([a, b]); } }
    const reach = (x, z) => { const [i, j] = cell(x, z); return seen[j * NN + i] === 1; };
    if (!L.pass) out.noPass++;
    out.bridges += L.river.bridges.length; out.fords += L.river.fords.length;
    for (const h of L.holds) { let wet = false; for (let a = 0; a < 12; a++) if (deepWater(h.x + Math.cos(a / 12 * 6.28) * h.r * .8, h.z + Math.sin(a / 12 * 6.28) * h.r * .8)) wet = true; if (wet) { out.wetPlaces++; (out.wetKinds = out.wetKinds || {})[h.kind] = ((out.wetKinds || {})[h.kind] || 0) + 1; } if (h.kind !== 'plaza') { let p = false; for (let k = 0; k < 16 && !p; k++) { const a = k / 16 * 6.28, rr = h.r * (k % 2 ? .5 : .8); p = reach(h.x + Math.cos(a) * rr, h.z + Math.sin(a) * rr); } if (!p) { out.unreachable++; (out.unr = out.unr || []).push(seed + ':' + h.kind); } } }
  }
  return out;
});
console.log(JSON.stringify(r));
await browser.close();
