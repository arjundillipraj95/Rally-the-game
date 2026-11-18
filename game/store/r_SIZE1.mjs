// SIZE1 bigger bodies on the same map: by default champions are drawn 1.4x their first size and soldiers 1.3x (horses
// with the champion); ?bodyc=&bodys= tries another pair and is kept on the phone; ?bodyc= alone puts the defaults back.
// The testudo's men stand wider apart by the soldier size; reach and collision are unchanged.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const look = async (q, keep) => { const page = keep && keep.page ? keep.page : await open(browser, 844, 390, { q }); if (keep && keep.page) { await page.goto('http://127.0.0.1:8766/' + q); await page.waitForSelector('#goBtn'); }
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 60);
  const r = await page.evaluate(async () => { const H = await import('/src/render/heroes.js'), B = await import('/src/core/body.js'), { STATS } = await import('/src/config.js'), G = window.__fb.G;
    const p = G.player, f = G.units.find(u => u.ti === G.myTi && u.kind === 'foot' && !u.dead);
    return { body: B.body, champ: +H.heroScale(p).toFixed(3), foot: f ? +H.heroScale(f).toFixed(3) : 0, r: STATS.foot.r, reach: STATS.foot.reach }; });
  if (keep !== undefined && keep.hold) return Object.assign(r, { page }); await page.close(); return r; };
const a = await look('?crown2=1&bodyc=&bodys='), b = await look('?crown2=1&bodyc=1.45&bodys=1.25', { hold: true }), c = await look('?crown2=1', { page: b.page, hold: true }), d = await look('?crown2=1&bodyc=', { page: b.page });
for (const x of [b, c]) delete x.page;
await browser.close();
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
console.log(JSON.stringify({ a, b, c, d }));
ok(a.body.champ === 1.4 && a.body.soldier === 1.3 && Math.abs(a.champ - 1.22 * 1.4) < .01 && Math.abs(a.foot - 1.22 * .8 * 1.3) < .01, `defaults: champion drawn ${a.champ}, footman ${a.foot}`);
ok(Math.abs(b.champ - 1.22 * 1.45) < .01 && Math.abs(b.foot - 1.22 * .8 * 1.25) < .01, `?bodyc=1.45&bodys=1.25: ${b.champ}, ${b.foot}`);
ok(c.body.champ === 1.45 && c.body.soldier === 1.25, 'kept on the phone for the next match');
ok(d.body.champ === 1.4 && d.body.soldier === 1.3, '?bodyc= alone puts the defaults back');
ok(a.r === .55 && a.reach === 1.25, 'collision and reach unchanged');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
