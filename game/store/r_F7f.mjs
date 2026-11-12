// F7f: an execution. The executioner slides beside the victim over ~0.25 s (no frame moves him more than a third of
// the way), the blow still lands at the same time, and the camera pushes in a little extra at the start.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(async () => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), L = G.teams[foe].leader;
  for (const u of G.units) if (u !== p && u !== L) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  p.hp = p.max = 1e6; p.weapon = 'sword';
  L.x = X + 2; L.z = Z; L.face = -Math.PI / 2; L.max = 180; L.hp = 40; L.stun = 0; L.guardT = 0; L.dead = false; L.vx = L.vz = 0;
  p.x = X - .7; p.z = Z; p.face = Math.PI / 2; p.cd = 0; // (2.7 m off: inside his reach, .75 m to slide)
  F.step(2, 1 / 30, true);
  if (!L.execReady) return { err: 'not marked' };
  F.attack();
  const out = { steps: [], dead: -1 }; let last = null, i0 = 0;
  for (let i = 0; i < 60; i++) {
    F.step(1, 1 / 30, true);
    if (p.execA && last === null) { last = [p.x, p.z]; out.startDist = 2.7; i0 = i; continue; }
    if (last) { out.steps.push(+Math.hypot(p.x - last[0], p.z - last[1]).toFixed(3)); last = [p.x, p.z]; }
    if (L.dead && out.dead < 0) out.dead = i - i0;
  }
  out.endDist = Math.hypot(L.x - p.x, L.z - p.z);
  return out;
});
const fails = [];
if (r.err) fails.push(r.err);
else {
  const move = r.startDist - 1.95, big = Math.max(...r.steps);
  if (move < .3) fails.push('nothing to slide (' + move.toFixed(2) + ' m)');
  if (move >= .3 && big > move * .34) fails.push('one frame slid ' + big.toFixed(2) + ' of ' + move.toFixed(2) + ' m');
  if (r.dead < 20 || r.dead > 26) fails.push('blow landed at frame ' + r.dead + ' (want ~23: 0.75 s)');
  console.log('slide', move.toFixed(2), 'm; biggest frame', big.toFixed(2), 'm; blow at frame', r.dead);
}
console.log(fails.length ? 'F7f FAIL: ' + fails.join('; ') : 'F7f PASS');
await browser.close(); process.exit(fails.length ? 1 : 0);
