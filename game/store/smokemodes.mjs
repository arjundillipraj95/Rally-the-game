// Dev check: every mode starts and runs a minute of battle without a page error, on a spread of maps.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const combos = [['crown', 'valley'], ['conquest', 'valley'], ['conquest', 'desert'], ['dm', 'forum'], ['dm', 'colosseum'], ['ctf', 'river'], ['ctrl', 'frost'], ['conquest', 'forest'], ['dm', 'dunes'], ['ctrl', 'wooden']];
let bad = 0;
for (const [mode, map] of combos) {
  const page = await open(browser, 640, 320);
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.evaluate(([mode, map]) => {
    window.__noRender = 1;
    const m = document.querySelector(`#segMode button[data-v="${mode}"]`); if (m) m.click();
    const p = document.querySelector(`#segMap button[data-v="${map}"]`); if (p) p.click();
    document.querySelector('#goBtn').click();
  }, [mode, map]);
  await frames(page, 3);
  const r = await page.evaluate(() => { const F = window.__fb, G = F.G; for (let i = 0; i < 60; i++) F.step(30, 1 / 30, true); return { mode: G.mode, map: G.map.id, state: G.state, T: Math.round(G.T), units: G.units.length }; });
  const ok = !errs.length && r.state === 'play' && r.T >= 55 && (mode !== 'crown' || r.map === 'mount');
  if (!ok) bad++;
  console.log(ok ? 'ok  ' : 'FAIL', mode.padEnd(9), map.padEnd(10), JSON.stringify(r), errs.slice(0, 2).join(' | '));
  await page.close();
}
await browser.close();
console.log(bad ? `${bad} failed` : 'all modes ok');
process.exit(bad ? 1 : 0);
