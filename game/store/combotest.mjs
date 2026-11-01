// Dev check: (1) the shield bash (Block, then Attack) on a captain on guard: through it, his guard open,
// then its cooldown; (2) after a parry, Block-then-Attack is the riposte, not a bash; (3) the streak:
// eight blows landed, then the whirlwind through a ring of men; (4) a perfect parry disarms, a late one doesn't.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 320);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -10, Z = 10, out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), L = G.teams[foe].leader;
  for (const u of G.units) if (u !== p && u !== L) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  p.hp = p.max = 1e5; p.weapon = 'sword';
  const blockTap = () => { F.step(1, 1 / 30, { block: true }); F.step(1, 1 / 30, true); };
  const setL = () => { if (L.summon) { L.summon.state = 'leaving'; L.summon = null; } L.mounted = false; L.horseCd = 99; L.x = X + 1.9; L.z = Z; L.face = -Math.PI / 2; L.hp = L.max = 1e5; L.vx = L.vz = 0; L.stun = 0; L.cd = 99; L.pending = null; L.windup = 0; p.x = X; p.z = Z; p.face = Math.PI / 2; p.vx = p.vz = 0; p.cd = 0; p.stun = 0; p.ripN = 0; p.bashCd = 0; p.lastBlkPress = -9; };
  // (1) bash vs a guard
  setL(); L.guardT = 5; L.guardCd = 0;
  blockTap(); F.attack(); const kind = p.swingKind; F.step(6, 1 / 30, true);
  out.bash = { swingKind: kind, Lstun: +L.stun.toFixed(2), guardT: +(L.guardT || 0).toFixed(2), dmg: Math.round(1e5 - L.hp) };
  // light attack vs guard (for contrast: the guard turns it)
  setL(); L.guardT = 5; L.guardCd = 0; L.stun = 0; F.step(20, 1 / 30, true); setL(); L.guardT = 5; const h0 = L.hp; p.combo = 0; p.lastSwingT = -9; F.attack(); F.step(6, 1 / 30, true);
  out.lightVsGuard = { dmg: Math.round(h0 - L.hp), pStun: +p.stun.toFixed(2) };
  // cooldown: two bashes in a row
  setL(); L.guardT = 0; blockTap(); F.attack(); F.step(20, 1 / 30, true); p.cd = 0; blockTap(); F.attack(); out.secondBashKind = p.swingKind; F.step(10, 1 / 30, true);
  // (2) after a parry it's the riposte
  setL(); p.ripN = 2; p.riposteT = G.T + 1; blockTap(); F.attack(); out.afterParryKind = p.swingKind; F.step(10, 1 / 30, true);
  // (3) the streak: eight blows on a footman, then the whirlwind
  L.x = 300; const dummy = F.mkUnit(foe, X + 1.6, Z, 'foot'); dummy.hp = dummy.max = 1e5; dummy.stun = 99; dummy.face = -Math.PI / 2;
  p.streak = 0; let n = 0;
  for (let i = 0; i < 30 && (p.streak || 0) < 8; i++) { setL(); L.x = 300; dummy.x = X + 1.6; dummy.z = Z; dummy.stun = 99; dummy.guardUp = false; while (p.cd > 0) F.step(1, 1 / 30, true); p.lastSwingT = -9; F.attack(); F.step(8, 1 / 30, true); n++; }
  out.streakAfter = { presses: n, streak: p.streak };
  dummy.dead = true; G.units = G.units.filter(u => !u.dead);
  const ring = []; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2, u = F.mkUnit(foe, X + Math.sin(a) * 1.8, Z + Math.cos(a) * 1.8, 'foot'); u.hp = u.max = 1e4; u.face = a + Math.PI; u.stun = 0; u.guardUp = true; u.gT = 99; ring.push(u); }
  while (p.cd > 0) F.step(1, 1 / 30, true);
  F.attack(); const fk = p.swingKind; F.step(8, 1 / 30, true);
  out.whirlwind = { kind: fk, hit: ring.filter(u => u.hp < u.max - 20).length, streakNow: p.streak };
  for (const u of ring) u.dead = true; G.units = G.units.filter(u => !u.dead);
  // (4) parry: perfect (pressed a frame before) vs late in the window
  window.__dbgParry = []; const parryAt = frBefore => { setL(); L.cd = 0; L.disarmT = 0; L.swing = .38; L.pending = { t: (frBefore + .5) / 30, target: p }; F.step(0); p.lastBlkPress = -9; F.step(1, 1 / 30, { block: true }); const pt = p.parryT, t1 = G.T, lp = !!L.pending, lt = L.pending && L.pending.t; F.step(frBefore + 2, 1 / 30, true); out['dbg' + frBefore] = { pt: pt - t1, lp, lt }; return { disarmed: (L.disarmT || 0) > G.T, Lcd: +L.cd.toFixed(2), parried: p.ripN > 0, dT: L.disarmT ? +(L.disarmT - G.T).toFixed(2) : null, rip: p.riposteT ? +(p.riposteT - G.T).toFixed(2) : null }; };
  out.perfect = parryAt(1); out.late = parryAt(3);
  return out;
});
await page.evaluate(() => window.__fb.end()); await frames(page, 70);
if (process.argv[2] === 'shot') { await page.waitForTimeout(2200); await frames(page, 5); } if (process.argv[2] === 'shot') await page.screenshot({ path: OUT + 'moments.png', timeout: 120000 });
const moments = await page.evaluate(() => [...document.querySelectorAll('#endMoments li')].map(l => l.textContent));
console.log(JSON.stringify(r), '\nmoments:', JSON.stringify(moments), 'errors:', errs.slice(0, 3));
await browser.close();
