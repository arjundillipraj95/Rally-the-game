// BS1-4 the battle screen: normal, in a duel, with the Upgrade popup open, and standing in a castle you hold
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
await page.evaluate(async () => { const F = window.__fb, { G } = F, L = await import('/src/core/sim/levels.js'), p = G.player; L.gainXp(G.myTi, 3000, 't'); G.T = 40; F.step(1);
  for (let i = 0; i < 120; i++) { p.x += Math.sin(p.face) * .1; p.z += Math.cos(p.face) * .1; } G.teams[G.myTi].rally = 70; G.teams[G.myTi].cds.ult = 20; window.__aim.cam.yaw = p.face; window.__frame(40); });
await page.screenshot({ path: '/tmp/bs_main.png' });
await page.evaluate(() => { const p = window.__fb.G.player; p.duelId = 99; window.__frame(3); }); await page.screenshot({ path: '/tmp/bs_duel.png' });
await page.evaluate(() => { const p = window.__fb.G.player; p.duelId = 0; window.__frame(3); });
await page.click('#upBtn'); await frames(page, 3); await page.screenshot({ path: '/tmp/bs_up.png' }); await page.click('#upBtn');
await page.click('#clock'); await frames(page, 3); await page.screenshot({ path: '/tmp/bs_pts.png' }); await page.click('#clock');
await browser.close();
