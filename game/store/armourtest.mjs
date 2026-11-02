// Dev check: captain's armour. Buy it; an enemy captain's blows: most of each goes into the armour
// until it breaks; it doesn't mend; buy it again (dearer); it's gone when you fall.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="dunes"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, s = G.teams[me], out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), L = G.teams[foe].leader;
  for (const u of G.units) if (u !== p && u !== L) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const t of G.teams) { t.recruitT = 1e9; t.thinkT = 1e9; }
  s.gold = 1000; p.x = 0; p.z = 0; p.face = 0;
  const g0 = s.gold; F.upgrade('arm'); out.bought = { armour: p.armour, paid: g0 - s.gold };
  F.upgrade('arm'); out.whileWhole = g0 - s.gold;
  const blow = () => { if (L.summon) { L.summon.state = 'leaving'; L.summon = null; } L.mounted = false; L.horseCd = 99; p.x = 0; p.z = 0; p.face = 0; p.vx = p.vz = 0; p.iframeT = 0; L.x = 0; L.z = 1.9; L.face = Math.PI; L.cd = 0; L.stun = 0; L.pending = { t: 0, target: p }; L.swing = .38; const h = p.hp, a = p.armour; F.step(2, 1 / 30, true); L.stun = 99; L.cd = 99; return [Math.round(h - p.hp), Math.round(a - p.armour), L.dead ? 'Ldead' : '', p.iframeT > 0 ? 'ifr' : '', +Math.hypot(L.x - p.x, L.z - p.z).toFixed(1), L.mounted ? 'M' : ''].join(':'); };
  const log = []; for (let i = 0; i < 8 && p.armour > 0; i++) { p.hp = p.max; log.push(blow()); F.step(20, 1 / 30, true); L.stun = 99; }
  out.blows = log.join(' '); out.after = Math.round(p.armour);
  L.x = 60; L.stun = 99; F.step(300, 1 / 30, true); out.mended = Math.round(p.armour);
  const g1 = s.gold; F.upgrade('arm'); out.rebuy = { armour: p.armour, paid: g1 - s.gold };
  p.hp = 1; p.armour = 0; blow(); blow(); F.step(220, 1 / 30, true);
  out.afterRespawn = Math.round(G.teams[me].leader.armour || 0);
  return out;
});
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
