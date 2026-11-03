// Dev check: a long Trio match runs clean. Blue and Red are Trio (computer-run), 2v2; plays N minutes
// of game time and reports errors, routs, and how far apart each castle's captains stay early on.
import { chromium } from 'playwright';
const mins = +(process.argv[2] || 6);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 480, height: 270 } });
let errs = []; page.on('pageerror', e => errs.push(e.message));
await page.addInitScript(() => { window.__testSheet = true; localStorage.setItem('rally-tutorial-done', '1'); window.__noRender = 1; });
await page.goto('http://127.0.0.1:8766/', { waitUntil: 'domcontentloaded' }); await page.waitForFunction(() => window.__fb, null, { polling: 300 });
await page.click('#segMap button[data-v="valley"]'); await page.click('#segTeams button[data-v="2v2"]').catch(() => {});
for (const c of [0, 0, 1, 1]) await page.evaluate(c => document.querySelectorAll('#segDuo button')[c].click(), c);
await page.click('#goBtn'); await page.waitForTimeout(500);
const r = await page.evaluate(async mins => {
  const F = window.__fb, G = F.G; let routs = 0, rallies = 0, spread = [];
  F.G.player.hp = 1e6; F.G.player.max = 1e6;
  for (let s = 0; s < mins * 60; s += 2) {
    F.step(60, 1 / 30, true);
    if (G.state !== 'play') return { ended: s, why: G.endInfo && G.endInfo.why };
    for (const t of G.teams) if (t.active && t.routT > 0) routs++;
    if (s === 20) for (const c of [0, 1]) { const L = [c, c + 4, c + 8].map(i => G.teams[i].leader); spread.push(Math.round(Math.max(...L.map(a => Math.max(...L.map(b => Math.hypot(a.x - b.x, a.z - b.z))))))); }
  }
  return { state: G.state, armies: G.teams.filter(t => t.active).length, alive: G.units.filter(u => !u.dead).length, routSamples: routs, captainSpreadAt20s: spread };
}, mins);
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
