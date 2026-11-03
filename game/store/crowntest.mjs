// Dev check: a Crown battle run by computer captains, fast-forwarded: places taken over time, army
// sizes growing with them, castles safe before 4:00, the Crown rising at 9:00, and how it ends.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const fmt = +(process.argv[2] || 0);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click(`#segFmt button[data-v="${fmt}"]`);
await page.click('#playBtn'); await frames(page, 5);
await page.evaluate(() => { window.__fb.G && 0; });
await page.evaluate(() => { window.__noRender = 1; const G = window.__fb.G, s0 = G.teams[G.myTi]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; G.player = null; });
const snap = () => page.evaluate(() => { const F = window.__fb, G = F.G;
  const owners = {}; for (const h of G.holds) owners[h.kind] = (owners[h.kind] || '') + (h.owner < 0 ? '.' : h.owner);
  return { T: Math.round(G.T), state: G.state, owners, armies: G.teams.map((t, i) => t.active ? F.G.units.filter(u => !u.dead && u.ti === i && !u.leader).length : null).filter(x => x != null).join(','), gates: G.cgates ? Object.values(G.cgates).map(g => g.broken.toString(2).padStart(3, '0')).join(' ') + ' broke ' + (window.__gb = (window.__gb || 0)) : '', wall: G.plazaWall ? (G.plazaWall.up ? 'up' : 'down') + ' broken ' + G.plazaWall.broken.toString(2) + ' hp ' + G.plazaWall.hp.map(h => Math.round(h)).join('/') : '', flag: G.flag ? G.flag.state + (G.flag.carrier ? ':' + G.flag.carrier.ti : '') + ' casing ' + (G.flag.casing || 0).toFixed(2) : '-', end: G.endInfo ? JSON.stringify(G.endInfo) : '' }; });
const log = [];
for (const until of [14, 150, 239, 300, 360, 420, 480, 539, 600, 640]) {
  await page.evaluate(until => { const F = window.__fb, G = F.G; while (G.state === 'play' && G.T < until) F.step(30, 1 / 30); }, until);
  log.push(await snap());
}
console.log(log.map(l => JSON.stringify(l)).join('\n'));
const safety = await page.evaluate(() => window.__safeBreak || null);
console.log('season line:', await page.evaluate(() => document.getElementById('endSeason').textContent)); console.log('errors:', errs.slice(0, 3));
await browser.close();
