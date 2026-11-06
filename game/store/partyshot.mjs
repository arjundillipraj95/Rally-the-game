// Dev check: the home stage with friends in your party (one, then two), at phone sizes: their captains
// beside yours, once each, clear of the menu and the Play panel.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [w, h] of [[872, 325], [1280, 589]]) {
  const page = await open(browser, w, h, { home: true });
  for (const n of [1, 2]) {
    await page.evaluate(async n => {
      const O = window.__on, S = window.__on;
      O.ON.me = { id: 'me', nick: 'Arjun' }; O.ON.up = true;
      O.ON.party = { id: 'P', leader: 'me', members: [{ id: 'me', nick: 'Arjun' }, { id: 'a', nick: 'Demi', look: '' }, { id: 'b', nick: 'Ana', look: '' }].slice(0, n + 1) };
      document.querySelector(`#segFmt button[data-v="${n}"]`).click();
      S.bus.emit('online', { k: 'party', m: O.ON.party });
    }, n);
    await frames(page, 40);
    const c = await page.evaluate(() => window.__fb.G.units.filter(u => u.kind === 'captain').length);
    console.log(w, 'party', n + 1, 'captains on stage', c);
    await page.screenshot({ path: OUT + `party_${w}_${n}.png`, timeout: 150000 });
  }
  await page.close();
}
await browser.close();
