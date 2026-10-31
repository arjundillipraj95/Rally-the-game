// Dev check: jump a match ahead, then draw a few frames and report any drawing error.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const [map = 'frost', mode = 'dm', color = '2'] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 320, 180);
const errs = []; page.on('pageerror', e => errs.push('PAGE ' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('CON ' + m.text().slice(0, 600)); });
const tap = sel => page.evaluate(sel => document.querySelector(sel).click(), sel);
await tap(`#segMode button[data-v="${mode}"]`); await tap(`#segColor button[data-v="${color}"]`); await tap(`#segMap button[data-v="${map}"]`);
await tap('#goBtn'); await frames(page, 3);
for (const t of [5, 10, 15, 20, 30]) {
  await page.evaluate(t => { const F = window.__fb; while (F.G.T < t && F.G.state === 'play') F.step(15, 1 / 30, true); }, t);
  await frames(page, 4);
  console.log('t', t, 'errors so far', errs.length);
  if (errs.length) break;
}
console.log([...new Set(errs)].slice(0, 3).join('\n'));
await browser.close();
