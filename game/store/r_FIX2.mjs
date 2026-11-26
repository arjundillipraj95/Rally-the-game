// FIX2 (reshaped by AUD1): the game is quieter, and the sound levels are kept. Low/Medium/High became the three bars.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '' });
page.on('pageerror', e => console.log('ERR', e.message));
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const o = await page.evaluate(async () => { const L = await import('/src/ui/levels.js'), s = await import('/src/config/sound.js');
  const r = { def: [L.LV.music, L.LV.fx, L.LV.voice], want: [s.BARS.music.def, s.BARS.fx.def, s.BARS.voice.def] };
  L.setBar('fx', .1); r.saved = localStorage.getItem('rally-bar-fx'); return r; });
ok(o.def.join() === o.want.join(), `bars start at their defaults (${o.def.join()})`);
ok(o.saved === '0.1', `a bar is kept (${o.saved})`);
await page.reload(); const k = await page.evaluate(async () => (await import('/src/ui/levels.js')).LV.fx);
ok(k === .1, `after a reload: ${k}`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
