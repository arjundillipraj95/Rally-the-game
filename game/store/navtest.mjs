// Dev check: do armies find their way round a map? Runs a match fast with the player's captain
// parked at home (so the computer armies do the moving), and every 5 s of game time counts soldiers
// who are stuck: barely moved, not fighting, yet their leader is far away.
// node store/navtest.mjs <map> <mode> <seconds>
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const [map = 'valley', mode = 'conquest', secs = 180] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 270);
await page.evaluate(() => { window.__noRender = 1; });
await page.click(`#segMode button[data-v="${mode}"]`).catch(() => {});
await page.click(`#segMap button[data-v="${map}"]`);
await page.click('#goBtn');
const res = await page.evaluate(async ([secs]) => {
  const F = window.__fb, G = F.G, out = [];
  const prev = new Map(); let firstFight = null, stuckMax = 0, stuckSum = 0, samples = 0;
  const t0 = performance.now();
  for (let s = 0; s < secs; s += 5) {
    F.step(150, 1 / 30, true);
    if (G.state !== 'play') { out.push('ended at ' + s); break; }
    let stuck = 0, fighting = 0;
    for (const u of G.units) {
      if (u.dead || u.human) continue;
      const L = G.teams[u.ti].leader, p = prev.get(u);
      const busy = u.foe && u.fd < 12;
      if (busy) fighting++;
      if (p && !busy && !u.leader && L && !L.dead && Math.hypot(L.x - u.x, L.z - u.z) > 14 && Math.hypot(u.x - p[0], u.z - p[1]) < 1.5) { stuck++; (window.__stuckAt = window.__stuckAt || []).push([s + 5, Math.round(u.x), Math.round(u.z), Math.round(L.x), Math.round(L.z), u.ti, G.teams[u.ti].order, u.nav && u.nav.pts ? 'path' : 'nopath', u.nav && u.nav.direct ? 'direct' : '']); }
      if (p && !busy && u.leader && Math.hypot(u.x - p[0], u.z - p[1]) < 1.5 && G.teams[u.ti].plan && !['defend'].includes(G.teams[u.ti].plan.kind)) stuck++;
      prev.set(u, [u.x, u.z]);
    }
    if (fighting > 4 && firstFight == null) firstFight = s + 5;
    stuckMax = Math.max(stuckMax, stuck); stuckSum += stuck; samples++;
    if (s % 30 === 25) out.push(`t=${s + 5}s units=${G.units.filter(u => !u.dead).length} fighting=${fighting} stuck=${stuck} plans=${G.teams.filter(t => t.active).map(t => t.plan && t.plan.kind).join(',')} pts=${G.teams.map(t => Math.round(t.points)).join(',')}`);
  }
  return { stuckAt: (window.__stuckAt || []).slice(0, 30).map(a => a.join(' ')), out, firstFight, stuckMax, stuckAvg: +(stuckSum / Math.max(1, samples)).toFixed(1), ms: Math.round(performance.now() - t0) };
}, [+secs]);
console.log(JSON.stringify(res, null, 1));
await browser.close();
