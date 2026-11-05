// Dev check: how often places change hands in a Crown battle run by computer captains. Counts every
// change of owner, and the shortest time a place is held before it flips.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, {});
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]').catch(() => {});
await page.click('#goBtn'); await frames(page, 5);
await page.evaluate(() => { window.__noRender = 1; const G = window.__fb.G, s0 = G.teams[G.myTi]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; G.player = null; });
const r = await page.evaluate(() => { const F = window.__fb, G = F.G; const last = G.holds.map(h => ({ o: h.owner, t: G.T })); const flips = []; const held = [];
  while (G.state === 'play' && G.T < 540) { F.step(30, 1 / 30); G.holds.forEach((h, i) => { if (h.owner !== last[i].o) { if (h.kind !== 'plaza' && last[i].o >= 0) flips.push([h.kind, +(G.T - last[i].t).toFixed(0)]); last[i] = { o: h.owner, t: G.T }; } }); }
  return flips; });
const byKind = {}; for (const [k] of r) byKind[k] = (byKind[k] || 0) + 1;
const short = r.filter(([, t]) => t < 30).length;
console.log('flips', r.length, JSON.stringify(byKind), 'held under 30s:', short, 'errors', errs.slice(0, 2));
await browser.close();
