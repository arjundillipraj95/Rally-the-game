// Dev check: the matchmaking lobby as a player sees it while searching (Duo: 8 seats, 5 taken).
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [w, h] of [[872, 325], [390, 844]]) {
  const page = await open(browser, w, h, { home: true });
  await page.evaluate(() => {
    const O = window.__on; O.ON.me = { id: 'me', nick: 'Arjun' }; O.ON.url = 'x';
    const sides = [[{ id: 'me', nick: 'Arjun' }, { id: 'a', nick: 'Demi' }], [{ id: 'b', nick: 'Ana' }], [{ id: 'c', nick: 'Ravi' }, { id: 'd', nick: 'Priya' }], []];
    document.querySelector('#segFmt button[data-v="1"]').click();
    const m = { room: 'R', fmt: 1, sides, endsIn: 40000, me: 'me' }; O.ON.lobby = m; O.bus.emit('online', { k: 'lobby', m });
  });
  await frames(page, 30);
  await page.evaluate(() => { const O = window.__on, m = O.ON.lobby; m.sides[1].push({ id: 'e', nick: 'Kiran' }); O.bus.emit('online', { k: 'lobby', m }); });
  await frames(page, 4);
  await page.screenshot({ path: OUT + `lobby_${w}.png`, timeout: 150000 });
  await page.close();
}
await browser.close();
