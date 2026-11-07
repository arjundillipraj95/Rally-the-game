// Dev check: the new Crown's summit at night in a trio: who goes up, who gets there, who hits the glacier.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' });
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]');
await page.evaluate(f => { for (let k = 0; k < f; k++) for (let c = 0; c < 4; c++) document.querySelectorAll('.duotog')[c].click(); }, +(process.env.FMT || 2));
await page.click('#goBtn'); await frames(page, 2);
await page.evaluate(() => window.__fb.step(30 * 482));
await page.evaluate(() => window.__fb.step(30 * 20));
console.log(JSON.stringify(await page.evaluate(() => { const { G } = window.__fb; return G.teams.map((s, i) => { const L = s.leader; if (!s.active || !L || L.dead || Math.hypot(L.x, L.z) > 10) return null; return { i, human: L.human, cd: L.cd, swing: !!L.swing, fd: L.fd, stun: L.stun, mounted: L.mounted, weapon: L.weapon, reach: L.reach, windup: L.windup, exec: L.execT }; }).filter(Boolean); })));
for (let k = 0; k < 6; k++) {
  console.log(JSON.stringify(await page.evaluate(() => { const { G } = window.__fb; const ar = G.layout.arena.r;
    return { T: Math.round(G.T), glacier: G.c2.breaks.find(b => b.kind === 'glacier').hp, caps: G.teams.filter(s => s.active).map(s => { const L = s.leader; if (!L || L.dead) return 'x'; const d = Math.hypot(L.x, L.z); return (s.plan ? s.plan.kind[0] : '-') + Math.round(d) + (d < ar ? '*' : '') + (L.fd < 3.5 ? 'f' : ''); }).join(' ') }; })));
  await page.evaluate(() => window.__fb.step(30 * 12));
}
await browser.close();
