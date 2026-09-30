// Stages a dramatic moment with the game's clock under our control (requestAnimationFrame is
// captured, and we hand the game one frame at a time), then shoots it for the cover art.
import { chromium } from 'playwright';
export const OUT = '/tmp/claude-0/-home-claude-rally-the-game/4e17cb5f-998f-589c-8d52-44170dd3d094/scratchpad/store/';
export async function open(browser, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  page.on('pageerror', e => console.log('PAGEERROR', e.message)); page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('CONSOLE', m.type(), m.text().slice(0, 300)); });
  await page.addInitScript(() => {
    localStorage.setItem('rally-quality', 'high'); localStorage.setItem('rally-tutorial-done', '1');
    window.__raf = []; window.__t = 0;
    window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
  });
  await page.goto('http://127.0.0.1:8766/');
  await page.waitForFunction(() => window.__fb && window.__fb.G);
  await page.evaluate(() => window.__frame(3));
  return page;
}
export async function frames(page, n) { await page.evaluate(n => window.__frame(n), n); }
