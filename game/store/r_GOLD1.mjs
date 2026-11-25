// GOLD1: gold pace in a whole computer match (?crown2=1, every army a computer). Prints each army's gold earned and
// spent at 2:00, 5:00, 8:00 and 10:00, and its army size at each, so the old and new economy can be compared.
// Checks the agreed income (CROWN2.income 2/s, +1/s a castle held, 150 a capture) is what the config holds.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: process.env.Q ?? '?crown2=1&champ=devi&botchamp=titus' });
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
await page.evaluate(() => { const { G } = window.__fb; const s = G.teams[G.myTi]; s.human = false; if (s.leader) s.leader.human = false; });
const marks = [120, 300, 480, 600], snaps = {};
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'end'; k++) {
  await page.evaluate(() => window.__fb.step(300));
  const t = await page.evaluate(() => window.__fb.G.T);
  for (const m of marks) if (!snaps[m] && t >= m - 3) snaps[m] = await page.evaluate(() => window.__fb.G.teams.map((s, ti) => [s, ti]).filter(([s]) => s.active).map(([s, ti]) => ({
    earned: Math.round(s.earned || 0), spent: Math.round(s.spent || 0), men: window.__fb.G.units.filter(u => u.ti === ti && !u.dead && u !== s.leader).length })));
}
const cfg = await page.evaluate(async () => { const c = await import('/src/config.js'); return { income: c.CROWN2.income, castle: c.CROWN2.gold.castle, bonus: c.CROWN2.bonus.castle }; });
const med = a => { const v = [...a].sort((p, q) => p - q); return v[Math.floor(v.length / 2)]; };
console.log(`config: income ${cfg.income}/s, castle ${cfg.castle}/s, capture ${cfg.bonus}`);
for (const m of marks) { const s = snaps[m]; if (!s) { console.log(`${m / 60}:00 (not reached)`); continue; }
  console.log(`${m / 60}:00  earned median ${med(s.map(x => x.earned))} [${Math.min(...s.map(x => x.earned))}-${Math.max(...s.map(x => x.earned))}]  spent median ${med(s.map(x => x.spent))}  men median ${med(s.map(x => x.men))}`); }
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
if (process.env.EXPECT_NEW) { ok(cfg.income === 2 && cfg.castle === 1 && cfg.bonus === 150, 'agreed numbers in config (2/s, +1/s a castle, 150)'); ok(!!snaps[600], 'the match ran to 10:00'); }
await browser.close(); console.log(fails ? `${fails} FAILED` : 'DONE'); process.exit(fails ? 1 : 0);
