// Dev check: what a Trio match costs the phone running the battle. Starts a solo match with full
// squads and every castle at Solo / Duo / Trio, lets the armies meet, and times the rules step.
// node store/trioload.mjs
import { chromium } from 'playwright';
import { OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const n of [0, 1, 2]) {
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
  await page.addInitScript(() => { localStorage.setItem('rally-tutorial-done', '1'); window.__noRender = 1; });
  await page.goto('http://127.0.0.1:8766/?stress=1', { waitUntil: 'domcontentloaded' }); await page.waitForFunction(() => window.__fb, null, { polling: 300 });
  await page.waitForTimeout(800);
  await page.click('#segMap button[data-v="valley"]');
  for (let c = 0; c < 4; c++) for (let k = 0; k < n; k++) await page.evaluate(c => document.querySelectorAll('#segDuo button')[c].click(), c);
  await page.click('#goBtn'); await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const F = window.__fb, G = F.G, times = [];
    for (let k = 0; k < 120; k++) { const t = performance.now(); F.step(30, 1 / 30, true); times.push((performance.now() - t) / 30); }
    const late = times.slice(30).sort((a, b) => a - b);
    return { armies: G.teams.filter(t => t.active).length, units: G.units.filter(u => !u.dead).length, avgMs: +(late.reduce((a, b) => a + b, 0) / late.length).toFixed(2), p95Ms: +late[Math.floor(late.length * .95)].toFixed(2), labels: [...document.querySelectorAll('#segDuo button')].map(b => b.textContent).join(',') };
  });
  console.log(['Solo', 'Duo', 'Trio'][n], JSON.stringify(r));
  await page.close();
}
await browser.close();
