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
await page.evaluate(() => { window.__noRender = true; window.__fb.step(30 * (+(window.__nightT || 470))); window.__noRender = false; });
await page.evaluate(() => { window.__camAt = [0, 60, 70, 0, 4, 0]; window.__frame(2); }); await shot('c2_dusk.png');
await page.evaluate(() => { window.__noRender = true; window.__fb.step(30 * 25); window.__noRender = false; window.__frame(2); }); await shot('c2_night.png');
await page.evaluate(() => { const { G } = window.__fb, p = G.player; window.__camAt = null; window.__frame(3); }); await shot('c2_night_player.png');
await browser.close();
