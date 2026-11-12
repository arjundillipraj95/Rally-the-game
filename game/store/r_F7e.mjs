// F7e: when a duel starts, a man standing inside the ring is shoved to its edge over ~0.3 s: no single frame moves him
// more than a third of the way, and he is at the edge by about 0.4 s.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -10, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), L = G.teams[foe].leader;
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.upT = 1e9; }
  for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { const c = s.leader; if (c && c !== p && c !== L) { c.x = 150; c.z = -150; } }
  for (const c of [p, L]) { if (c.summon) { c.summon.state = 'leaving'; c.summon = null; } c.horseCd = 99; c.vx = c.vz = 0; }
  p.x = X; p.z = Z; p.face = Math.PI / 2; L.x = X + 6; L.z = Z; L.face = -Math.PI / 2; p.hp = p.max = 1e4; L.hp = L.max;
  // a third side's man (at war with neither duellist's ring rules: just "everyone else") standing near the middle
  const third = [0, 1, 2, 3].find(i => i !== me && i !== foe);
  const m = F.mkUnit(third, X + 3, Z + 1, 'foot'); m.hp = m.max = 1e4; m.hold = true;
  F.step(1, 1 / 30, true);
  F.duel(); const d = G.duels[0]; if (!d) return { err: 'no offer' }; d.aiYes = true;
  const out = { steps: [] }; let on = false, last = null;
  for (let i = 0; i < 120 && out.steps.length < 30; i++) {
    F.step(1, 1 / 30, true);
    if (!on && d.state === 'on') { on = true; out.edge = 6 + .3; m.x = d.x + 1; m.z = d.z + 3.5; m.vx = m.vz = 0; m.shoveD = null; d.t0 = G.T; last = Math.hypot(m.x - d.x, m.z - d.z); out.r0 = last; continue; } // (he wandered while it was offered: set him well inside as it closes)
    if (on) { const r = Math.hypot(m.x - d.x, m.z - d.z); out.steps.push(+(r - last).toFixed(3)); last = r; }
  }
  out.on = on; out.rEnd = last;
  return out;
});
const fails = [];
if (r.err || !r.on) fails.push('duel did not start ' + (r.err || ''));
else {
  const gap = r.edge - r.r0, big = Math.max(...r.steps);
  if (gap < 2) fails.push('man was not well inside the ring (gap ' + gap.toFixed(2) + ')');
  if (big > gap * .34) fails.push('one frame moved him ' + big.toFixed(2) + ' of ' + gap.toFixed(2) + ' m');
  const at = r.steps.reduce((a, s, i) => a < 0 && r.r0 + r.steps.slice(0, i + 1).reduce((x, y) => x + y, 0) >= r.edge - .05 ? i + 1 : a, -1);
  if (at < 0 || at > 13) fails.push('not at the edge by 0.43 s (frame ' + at + ')');
  console.log('gap', gap.toFixed(2), 'm; biggest frame', big.toFixed(2), 'm; at edge after', at, 'frames');
}
console.log(fails.length ? 'F7e FAIL: ' + fails.join('; ') : 'F7e PASS');
await browser.close();
process.exit(fails.length ? 1 : 0);
