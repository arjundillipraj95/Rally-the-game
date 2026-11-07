import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' });
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 260);
for (let k = 0; k < 4; k++) {
  console.log(JSON.stringify(await page.evaluate(() => { const { G } = window.__fb; return G.teams.filter(s => s.active).map((s, i) => ({ plan: s.plan && JSON.stringify(s.plan), L: s.leader && [Math.round(s.leader.x), Math.round(s.leader.z), s.leader.dead ? 'dead' : ''], g: Math.round(s.gold), path: s.leader && s.leader.path ? s.leader.path.length : null })); })));
  await page.evaluate(() => window.__fb.step(150));
}
console.log(JSON.stringify(await page.evaluate(() => window.__fb.G.holds.map(h => [h.name, Math.round(h.x), Math.round(h.z)]))));
await browser.close();
