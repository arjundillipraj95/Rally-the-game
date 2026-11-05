// Dev check: the warm-up's computer captains come out and fight (captains only, Colosseum).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; const G = window.__fb.G; G.squadCap = 0; document.querySelector('#segMode button[data-v="dm"]').click(); document.querySelector('#segMap button[data-v="colosseum"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G; G.warmup = { mode: 'dm' }; const out = [];
  const caps = () => G.teams.filter((s, i) => i !== G.myTi && s.leader).map(s => s.leader);
  const snap = () => caps().map(c => Math.round(Math.hypot(c.x, c.z))).join(',') + ' | hp lost ' + Math.round(caps().reduce((a, c) => a + c.max - Math.max(0, c.hp), 0));
  out.push('start ' + snap());
  for (let k = 0; k < 4; k++) { F.step(150, 1 / 30); out.push(`${5 * (k + 1)} s ` + snap()); }
  out.push('soldiers ' + G.units.filter(u => !u.leader && !u.dead).length);
  return out;
});
console.log(r.join('\n'), '\nerrors:', errs.slice(0, 3));
await browser.close();
