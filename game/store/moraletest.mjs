// Dev check: morale in whole battles. Runs a computer-only match fast and counts routs, rally horns,
// and how low morale goes, per army.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const [map = 'valley', mode = 'conquest', secs = 240, diff = 1] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 270);
await page.evaluate(() => { window.__noRender = 1; });
await page.click(`#segMode button[data-v="${mode}"]`).catch(() => {});
await page.click(`#segMap button[data-v="${map}"]`); await page.click(`#segDiff button[data-v="${diff}"]`); await page.click('#goBtn');
console.log(await page.evaluate(secs => {
  const F = window.__fb, G = F.G, p = G.player; p.hp = p.max = 1e6; p.x = -300; // (your captain sits it out)
  const st = G.teams.map(() => ({ routs: 0, horns: 0, minM: 100, wasRout: false, lastRally: 0 }));
  let end = null;
  for (let f = 0; f < secs * 30; f++) {
    F.step(1, 1 / 30, true);
    if (G.state !== 'play') { end = Math.round(f / 30); break; }
    G.teams.forEach((s, i) => { const t = st[i]; if (!s.active) return; if (s.routT > 0 && !t.wasRout) t.routs++; t.wasRout = s.routT > 0; t.minM = Math.min(t.minM, s.morale); if (t.lastRally >= 100 && s.rally < 50) t.horns++; t.lastRally = s.rally; });
  }
  return JSON.stringify({ endedAt: end, armies: G.teams.map((s, i) => s.active ? `${i}:routs=${st[i].routs} horns=${st[i].horns} minMorale=${Math.round(st[i].minM)} pts=${Math.round(s.points)}` : null).filter(Boolean) });
}, +secs));
await browser.close();
