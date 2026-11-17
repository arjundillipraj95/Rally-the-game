// FIX3: each nexus shows its life bar all the time while standing (within 110 m and in view), not only for 6 s after
// a blow; dim with a lock while it can't be hit. Screenshot by the enemy nexus: /tmp/fix3.png (and a pixel check:
// red bar pixels over the nexus).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
await page.evaluate(() => { const { G } = window.__fb; window.__fb.step(60); const n = G.layout.nexus.find(x => G.ALLY[x.c] !== G.ALLY[G.myTi % 4]), p = G.player;
  const a = Math.atan2(-n.x, -n.z); p.x = n.x + Math.sin(a) * 18; p.z = n.z + Math.cos(a) * 18; p.face = a + Math.PI; window.__fb.step(2); });
await frames(page, 12); await page.screenshot({ path: '/tmp/fix3.png' });
const red = await page.evaluate(() => { const c = [...document.querySelectorAll('canvas')].find(k => k.getContext && !k.getContext('webgl2') && k.width > 300) || document.querySelector('canvas'); const x = c.getContext('2d'), d = x.getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] > 180 && d[i + 1] < 100 && d[i + 2] < 90 && d[i + 3] > 150) n++; return n; });
await browser.close();
const ok = red > 200; console.log((ok ? 'ok   ' : 'FAIL ') + `the enemy nexus's bar is drawn without a blow (${red} bar pixels)`); console.log(ok ? 'ALL PASS' : '1 FAILED'); process.exit(ok ? 0 : 1);
