import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' });
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 260);
await page.evaluate(() => window.__fb.step(30 * 485));
for (let k = 0; k < 6; k++) {
  console.log(JSON.stringify(await page.evaluate(() => { const { G } = window.__fb; return { T: Math.round(G.T), caps: G.teams.filter(s => s.active).map(s => ({ plan: s.plan && s.plan.kind, d: s.leader && Math.round(Math.hypot(s.leader.x, s.leader.z)), xz: s.leader && [Math.round(s.leader.x), Math.round(s.leader.z)], dead: s.leader && s.leader.dead, fd: s.leader && Math.round(s.leader.fd), cd: s.leader && +s.leader.cd.toFixed(2), sw: s.leader && !!s.leader.swing })),
    glacier: G.c2.breaks.find(b => b.kind === 'glacier').hp, path: (() => { const p = window.__fb.findPath ? window.__fb.findPath(80, 0, 0, 0) : null; return p ? p.length : p; })() }; })));
  await page.evaluate(() => window.__fb.step(30 * 8));
}
await browser.close();
