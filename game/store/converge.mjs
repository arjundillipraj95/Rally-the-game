// Dev check: do the armies' fights come together, or do they pair off? Computer-only conquest
// battles (the player's army too), per map: when each pair of castles' armies first clash, and the
// share of fighting (man-seconds) in fights with 1/2/3+ sides in them.
// AL=0123 (free for all, default) or e.g. 0110 for 2v2.  node store/converge.mjs [maps] [secs] [runs]
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const maps = (process.argv[2] || 'forum,colosseum,desert,wooden,valley,dunes,river,forest,frost').split(','), secs = +(process.argv[3] || 240), runs = +(process.argv[4] || 2);
const AL = (process.env.AL || '0123').split('').map(Number);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 400, 240);
await page.evaluate(al => { localStorage.setItem('rally-solo-al', JSON.stringify(al)); }, AL);
await page.reload(); await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
const errs = []; page.on('pageerror', e => errs.push(e.message));
const rows = [];
for (const map of maps) for (let run = 0; run < runs; run++) {
  await page.evaluate(map => { window.__noRender = 1; document.querySelector('#segMode button[data-v="conquest"]').click(); document.querySelector(`#segMap button[data-v="${map}"]`).click(); document.querySelector('#goBtn').click(); }, map);
  await page.evaluate(() => window.__frame(3));
  const r = await page.evaluate(secs => {
    const F = window.__fb, G = F.G; G.diff = 1;
    const me = G.myTi, s0 = G.teams[me]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; G.player = null;
    const first = {}, bySides = [0, 0, 0, 0, 0]; let t = 0;
    const pairKey = (a, b) => a < b ? a + '-' + b : b + '-' + a;
    for (; t < secs && G.state === 'play'; t++) {
      F.step(30, 1 / 30);
      const live = G.units.filter(u => !u.dead), fighters = [];
      for (const u of live) {
        for (const o of live) {
          if (o === u || G.ALLY[o.ti % 4] === G.ALLY[u.ti % 4]) continue;
          const dx = o.x - u.x, dz = o.z - u.z; if (dx * dx + dz * dz > 12.25) continue;
          const k = pairKey(u.ti % 4, o.ti % 4); if (first[k] == null) first[k] = t + 1;
          fighters.push(u); break;
        }
      }
      // fights: fighters within 10 m of each other belong together
      const par = fighters.map((_, i) => i), f = i => par[i] === i ? i : (par[i] = f(par[i]));
      for (let i = 0; i < fighters.length; i++) for (let j = i + 1; j < fighters.length; j++) { const a = fighters[i], b = fighters[j]; if (Math.abs(a.x - b.x) < 10 && Math.abs(a.z - b.z) < 10 && Math.hypot(a.x - b.x, a.z - b.z) < 10) par[f(i)] = f(j); }
      const cl = new Map(); fighters.forEach((u, i) => { const k = f(i); if (!cl.has(k)) cl.set(k, { n: 0, sides: new Set() }); const c = cl.get(k); c.n++; c.sides.add(G.ALLY[u.ti % 4]); });
      for (const c of cl.values()) bySides[Math.min(4, c.sides.size)] += c.n;
    }
    const tot = bySides.reduce((a, b) => a + b, 0) || 1;
    return { T: t, end: G.state, first, share3: Math.round((bySides[3] + bySides[4]) / tot * 100), share2: Math.round(bySides[2] / tot * 100), fightSecs: tot };
  }, secs);
  rows.push({ map, ...r });
  console.log(map.padEnd(10), 'first contact', JSON.stringify(r.first), '| 3+ sides', r.share3 + '%', '| fight man-s', r.fightSecs, r.end === 'play' ? '' : '(ended ' + r.T + ' s)');
  await page.evaluate(() => { window.__fb.end(); });
  await page.evaluate(() => window.__frame(5));
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /menu|home|back/i.test(b.textContent) && b.offsetParent); if (b) b.click(); });
  await page.evaluate(() => window.__frame(3));
}
const pairs = rows.flatMap(r => Object.values(r.first)); const all6 = rows.map(r => Object.keys(r.first).length);
console.log('mean first contact', Math.round(pairs.reduce((a, b) => a + b, 0) / pairs.length), 's; pairs that met (of 6):', all6.join(','), '; mean 3+ share', Math.round(rows.reduce((a, r) => a + r.share3, 0) / rows.length) + '%', 'errors:', errs.slice(0, 3));
await browser.close();
