// Dev check: each mountain keep has a back gate facing the summit (its holder walks keep -> bridge -> arena
// gate -> glacier near-straight); the results open on a Points tab with each side's breakdown.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const S = '/tmp/claude-0/-home-claude/4e17cb5f-998f-589c-8d52-44170dd3d094/scratchpad/';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 900, 420, { q: '?crown2=1' });
page.on('pageerror', e => console.log('ERR', e.message));
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]');
await page.click('#goBtn');
await frames(page, 2);
const r = await page.evaluate(() => { const { G, findPath } = window.__fb, L = G.layout;
  return G.holds.filter(h => h.keep).map(h => { const cw = L.cwalls.find(c => c.hid === h.id), a = Math.atan2(h.z, h.x);
    const sx = h.x - Math.cos(a) * 5, sz = h.z - Math.sin(a) * 5, tx = Math.cos(a) * (L.arena.r + 2), tz = Math.sin(a) * (L.arena.r + 2);
    for (const o of cw.obs) if (o.cgate != null) o.off = true;
    const p = findPath(sx, sz, tx, tz); let len = 0, prev = [sx, sz];
    for (const q of p || []) { const [x, z] = Array.isArray(q) ? q : [q.x, q.z]; len += Math.hypot(x - prev[0], z - prev[1]); prev = [x, z]; }
    for (const o of cw.obs) if (o.cgate != null) o.off = false;
    return { name: h.name, gates: cw.gates.length, straight: +Math.hypot(sx - tx, sz - tz).toFixed(1), path: p ? +len.toFixed(1) : null };
  }); });
console.log(JSON.stringify(r));
if (process.env.QUICK) { await browser.close(); process.exit(0); }
for (let k = 0; k < 24 && (await page.evaluate(() => window.__fb.G.state)) !== 'end'; k++) await page.evaluate(() => window.__fb.step(900));
await page.waitForTimeout(2500);
console.log(await page.evaluate(() => document.getElementById('endPts').innerText));
await page.screenshot({ path: S + 'pts.png' });
await browser.close();
