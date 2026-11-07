// Dev check: what the mountain looks like (low quality, for speed): the opening, a captain at home, the overview.
import { chromium } from 'playwright';
const OUT = '/tmp/claude-0/-home-claude/4e17cb5f-998f-589c-8d52-44170dd3d094/scratchpad/store/';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
page.on('pageerror', e => console.log('PAGEERROR', e.message));
await page.addInitScript(() => { window.__testSheet = true; localStorage.setItem('rally-quality', 'low'); localStorage.setItem('rally-tutorial-done', '1');
  window.__raf = []; window.__t = 0; window.requestAnimationFrame = cb => { window.__raf.push(cb); return 1; };
  window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } }; });
await page.goto('http://127.0.0.1:8766/' + (process.env.Q || '?crown2=1'));
await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const shot = async n => { await page.screenshot({ path: OUT + n, timeout: 400000 }); console.log('shot', n); };
await page.evaluate(() => window.__frame(260)); await shot('c2_start.png');
await page.evaluate(() => { window.__camAt = [0, 120, 80, 0, 0, 0]; window.__frame(2); }); await shot('c2_over.png');
await page.evaluate(() => { window.__camAt = [0, 26, 32, 0, 5, 0]; window.__frame(2); }); await shot('c2_summit.png');
await page.evaluate(() => { const { G } = window.__fb; const h = G.layout.homes[0], c = G.holds[0]; window.__camAt = [c.x * 1.25, 22, c.z * 1.25, c.x, 2, c.z]; window.__frame(2); }); await shot('c2_castle.png');
await browser.close();
