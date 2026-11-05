// Dev check: captain stamina and duel sides. (1) an evade costs stamina; winded, he can't evade; it comes
// back after a pause. (2) a duel blow shows its side before it lands; Block with the stick toward it
// turns it, the wrong way it lands and staggers; winded, the guard gives way.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(async () => {
  const S = await import('/src/core/sim.js');
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -10, Z = 10, out = {};
  G.diff = 1;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), L = G.teams[foe].leader;
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.upT = 1e9; }
  for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { const c = s.leader; if (c && c !== p && c !== L) { c.x = 150 + Math.random(); c.z = -150; } }
  for (const c of [p, L]) { if (c.summon) { c.summon.state = 'leaving'; c.summon = null; } c.horseCd = 99; }
  p.x = X; p.z = Z; p.face = Math.PI / 2; L.x = X + 6; L.z = Z; L.face = -Math.PI / 2; p.hp = p.max = 1e4; L.hp = L.max = 1e4;
  // (1) stamina
  p.st = 100; p.evadeCd = 0; p.stun = 0; S.captainEvade(p, 'back'); out.afterEvade = Math.round(p.st);
  p.evadeCd = 0; p.st = 10; out.evadeWhenWinded = S.captainEvade(p, 'back');
  p.st = 10; p.stT = G.T; F.step(45, 1 / 30); out.regen1_5s = Math.round(p.st);
  // (2) the duel
  p.x = X; p.z = Z; L.x = X + 6; L.z = Z; p.face = Math.PI / 2; L.face = -Math.PI / 2;
  F.duel(); const d0 = G.duels[0]; out.offered = !!d0; if (d0) d0.aiYes = true;
  let t = 0; while (G.duels[0] && G.duels[0].state === 'offer' && t < 4) { F.step(1, 1 / 30, true); t += 1 / 30; }
  const d = G.duels[0]; out.on = d && d.state; if (!d || d.state !== 'on') return out;
  const blow = (side, guard, st) => {
    p.x = X; p.z = Z; L.x = X + 2.3; L.z = Z; p.face = Math.PI / 2; L.face = -Math.PI / 2; p.vx = p.vz = L.vx = L.vz = 0;
    L.weapon = 'sword'; L.cd = 0; L.stun = 0; L.windup = 0; L.pending = null; L.guardT = 0; L.st = 100; p.stun = 0; p.st = st; p.blocking = true; p.stickSide = guard; p.parryT = -9; p.iframeT = 0;
    S.captainAttack(L); const pd = L.pending; if (!pd) return { none: true, why: [L.cd, L.stun, L.dead, L.carrying, L.guardUp, L.mounted, L.jy, L.execT, L.weapon, L.swing, L.atkBuf, L.human] };
    pd.side = side; L.swingSide = side;
    const tell = +pd.t.toFixed(2), hp0 = p.hp;
    for (let i = 0; i < 14 && L.pending === pd; i++) { p.blocking = true; p.stickSide = guard; F.step(1, 1 / 30); }
    return { tell, dmg: Math.round(hp0 - p.hp), stun: +Math.max(0, p.stun).toFixed(2), st: Math.round(p.st) };
  };
  out.right = blow(1, -1, 100); out.wrong = blow(1, 1, 100); out.overheadOk = blow(0, 0, 100); out.overheadWrong = blow(0, -1, 100); out.windedGuard = blow(1, -1, 0);
  return out;
});
console.log(JSON.stringify(r, null, 1), 'errors:', errs.slice(0, 3));
await browser.close();
