// Dev check, on screen: a duel blow's side arrow and your guard mark; a battered captain (dents, a
// cracked shield, dull metal); an enemy heavy blow's red wedge; the stamina bar.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 20);
const setup = await page.evaluate(async () => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -10, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), L = G.teams[foe].leader; window.__L = L;
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.upT = 1e9; }
  for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { const c = s.leader; if (c && c !== p && c !== L) { c.x = 150 + Math.random(); c.z = -150; } }
  for (const c of [p, L]) { if (c.summon) { c.summon.state = 'leaving'; c.summon = null; } c.horseCd = 99; }
  p.x = X; p.z = Z; p.face = Math.PI / 2; L.x = X + 6; L.z = Z; L.face = -Math.PI / 2; p.hp = p.max = 1e4; L.hp = L.max = 1e4; L.weapon = 'sword';
  F.duel(); const d0 = G.duels[0]; if (d0) d0.aiYes = true;
  let t = 0; while (G.duels[0] && G.duels[0].state === 'offer' && t < 4) { F.step(1, 1 / 30, true); t += 1 / 30; }
  return G.duels[0] && G.duels[0].state;
});
console.log('duel', setup);
const pin = side => page.evaluate(async side => { const S = await import('/src/core/sim.js'); const F = window.__fb, G = F.G, p = G.player, L = window.__L;
  p.x = -10; p.z = 10; L.x = -7.6; L.z = 10; p.face = Math.PI / 2; L.face = -Math.PI / 2; F.cam.yaw = p.face; p.st = 55;
  L.cd = 0; L.stun = 0; L.guardT = 0; L.pending = null; S.captainAttack(L); if (L.pending) { L.pending.side = side; L.swingSide = side; L.pending.t = 5; }
  p.blocking = true; p.stickSide = -side; }, side);
for (const side of [1, -1, 0]) {
  await pin(side); await frames(page, 6);
  await page.evaluate(() => { const p = window.__fb.G.player; p.blocking = true; });
  await page.screenshot({ path: OUT + `duel_side${side}.png` });
}
// battered, and a heavy blow coming
await page.evaluate(() => { const F = window.__fb, G = F.G, p = G.player, L = window.__L; G.duels.length = 0; p.duelId = L.duelId = 0; L.pending = null;
  L.hp = L.max * .2; L.x = -7.2; L.z = 10; L.face = -Math.PI / 2; L.windup = 3; L.heavyTg = p; L.swingKind = 5; L.cd = 4; p.blocking = false; F.cam.yaw = p.face; });
await frames(page, 25);
await page.screenshot({ path: OUT + 'windup_wear.png' });
console.log('errors:', errs.slice(0, 3), OUT);
await browser.close();
