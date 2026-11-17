// FIX2: the game is quieter (master .5, was .9) and a Sound setting (Low, Medium, High) sets it and is kept.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '' });
page.on('pageerror', e => console.log('ERR', e.message));
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const o = await page.evaluate(async () => { const a = await import('/src/ui/audio.js'), c = await import('/src/config.js');
  const r = { def: a.soundLevel(), btns: [...document.querySelectorAll('#segVol button')].map(b => b.dataset.v + (b.getAttribute('aria-pressed') === 'true' ? '*' : '')).join() };
  document.querySelector('#segVol button[data-v="low"]').click(); r.low = [a.soundLevel(), localStorage.getItem('rally-vol'), c.AUDIO.levels.low]; return r; });
ok(o.def === 'mid' && o.btns === 'low,mid*,high', `Sound setting: ${o.btns} (default Medium)`);
ok(o.low[0] === 'low' && o.low[1] === 'low' && o.low[2] < .5, `Low is kept and quieter (${o.low.join(', ')})`);
await page.reload(); const k = await page.evaluate(async () => (await import('/src/ui/audio.js')).soundLevel());
ok(k === 'low', `after a reload: ${k}`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
