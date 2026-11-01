// Dev check: the results screen's "Your side" moments after a computer-run 2v2 (Duo on your colour).
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { localStorage.setItem('rally-solo-al', '[0,1,1,0]'); }); await page.reload(); await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="dunes"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
await page.evaluate(() => { const F = window.__fb, G = F.G; G.diff = 2; const s0 = G.teams[G.myTi]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; G.player = null; for (let t = 0; t < 200 && G.state === 'play'; t++) F.step(30, 1 / 30); window.__hl = G.teams.map(s => s.hl); const ally = [0, 1, 2, 3].find(i => i !== G.myTi && G.ALLY[i] === G.ALLY[G.myTi]); G.teams[ally].hl = Object.assign({ duel: 1, castle: 1, streak: 9 }, G.teams[ally].hl); G.teams[G.myTi].hl = Object.assign({ exec: 1, capkill: 1 }, G.teams[G.myTi].hl); if (G.state === 'play') F.end(); });
await page.waitForTimeout(2200); await page.evaluate(() => { window.__noRender = 0; }); await frames(page, 5);
const r = await page.evaluate(() => ({ mine: [...document.querySelectorAll('#endMoments li')].map(l => l.textContent), side: document.getElementById('endSideWrap').hidden ? null : [...document.querySelectorAll('#endSide li')].map(l => l.textContent), hl: JSON.stringify(window.__hl) }));
await page.screenshot({ path: OUT + 'side.png', timeout: 120000 });
console.log(JSON.stringify(r, null, 1), 'errors:', errs.slice(0, 3));
await browser.close();
