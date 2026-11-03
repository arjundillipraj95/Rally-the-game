// Dev check: the share card after a computer-run battle (saved as a PNG to look at).
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
import fs from 'fs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await frames(page, 3);
await page.evaluate(() => { window.__noRender = 1; document.getElementById('playBtn').click(); });
await frames(page, 3);
await page.evaluate(() => { const F = window.__fb, G = F.G; const s0 = G.teams[G.myTi]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; G.player = null;
  for (let t = 0; t < 700 && G.state === 'play'; t++) F.step(30, 1 / 30); if (G.state === 'play') F.end(); });
await frames(page, 5);
await page.evaluate(() => { navigator.share = undefined; window.open = () => null; });
await page.click('#shareBtn'); await page.waitForTimeout(1500);
const b64 = await page.evaluate(async () => { const b = window.__card; if (!b) return null; const buf = new Uint8Array(await b.arrayBuffer()); let s = ''; for (const x of buf) s += String.fromCharCode(x); return btoa(s); });
if (b64) fs.writeFileSync(OUT + 'card.png', Buffer.from(b64, 'base64'));
console.log('card', !!b64, 'errors:', errs.slice(0, 3));
await browser.close();
