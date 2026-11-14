// F14 in a real (slow, headless) browser: Auto steps the render scale down at 4 fps
// (frames driven with a fake clock), stalls don't count, no errors.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 270, { q: '?crown2=1', quality: 'auto' });
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const px = () => page.evaluate(() => { const c = document.querySelector('canvas'); return { w: c.width, css: innerWidth, auto: localStorage.getItem('rally-quality-auto'), note: document.getElementById('qualityNote').textContent }; });
const run = (n, dt) => page.evaluate(([n, dt]) => { for (let i = 0; i < n; i++) window.__frame(1, dt); }, [n, dt]);
const st = () => page.evaluate(() => window.__fb.G.state);
for (let k = 0; k < 60 && (await st()) !== 'play'; k++) await run(10, 33); // (the opening)
const a = await px(); await run(30, 250); const b = await px(); // (7.5 s at 4 fps)
await run(4, 3000); const c = await px(); // (stalls: windows voided, nothing changes)
console.log(JSON.stringify({ a, b, c, errs: errs.slice(0, 3) }));
const ok = b.w < a.w && c.w === b.w && b.auto === 'low' && !errs.length; console.log(ok ? 'r_F14b: PASS (render scale stepped down while slow)' : 'r_F14b: FAIL');
await browser.close(); process.exit(ok ? 0 : 1);
