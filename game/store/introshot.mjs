// Dev check: the crown-match opening (Valley solo): the camera rises over the map, the 3-2-1 count, then GO and the battle.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 240, 300);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn');
const read = () => page.evaluate(() => ({ state: window.__fb.G.state, txt: document.getElementById('introT').textContent, hidden: document.getElementById('introT').hidden, hud: document.getElementById('hudWrap').style.visibility, T: +window.__fb.G.T.toFixed(2) }));
let last = '';
for (let i = 0; i < 300; i++) {
  await frames(page, 1);
  const s = await read(); const key = JSON.stringify(s);
  if (key !== last) { console.log(i, key); last = key; } if (i % 40 === 0) console.log("f", i, Date.now() % 100000);
  if (s.state === 'play' && i > 10) { await frames(page, 30); break; }
  if (s.txt === 'RUN FOR YOUR LIFE, YOU FOOLS!' && i % 6 === 0) await page.screenshot({ path: OUT + 'intro_go.png', timeout: 150000 });
  if (s.txt === '3' && !s.shot) await page.screenshot({ path: OUT + 'intro_3.png', timeout: 150000 });
  if (s.state === 'intro' && i === 20) await page.screenshot({ path: OUT + 'intro_rise.png', timeout: 150000 });
}
await page.screenshot({ path: OUT + 'intro_play.png', timeout: 150000 });
console.log('errors', errs);
await browser.close();
