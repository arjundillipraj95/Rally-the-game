// Dev check: the breach. An enemy castle beaten below a quarter: the last stand starts once (its horns
// full, the moment announced), its men by the castle hit harder and hold.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { document.querySelector('#segMode button[data-v="conquest"]').click(); document.querySelector('#segMap button[data-v="dunes"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player, me = G.myTi, out = {};
  const c = [0, 1, 2, 3].find(i => G.ALLY[i] !== G.ALLY[me] && G.teams[i].active), T = G.teams[c];
  for (const u of G.units) if (u !== p && u.ti !== c) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; }
  const cp = [0, 1, 2, 3].map(i => G.layout.obstacles.find(o => o.castle && Math.abs(o.x) > 0)); // (not needed)
  const pos = window.__fb.castlePos ? null : null;
  p.hp = p.max = 1e6; T.points = 26; T.rally = 10; T.morale = 30;
  const cx = G.layout.obstacles.filter(o => o.castle).find(o => { const d = Math.hypot(o.x, o.z); return true && G.units.some(u => u.ti === c && Math.hypot(u.x - o.x, u.z - o.z) < 30); });
  const msgs = []; 
  // walk up to the castle's wall and hit it
  const ang = Math.atan2(-cx.z, -cx.x); p.x = cx.x + Math.cos(ang) * 6.2; p.z = cx.z + Math.sin(ang) * 6.2; p.face = Math.atan2(cx.x - p.x, cx.z - p.z);
  for (const u of G.units) if (u.ti === c) { u.x = cx.x + 200; } // (his men out of the way for the blows)
  let n = 0; while (!T.breached && n < 40) { p.cd = 0; F.attack(); F.step(8, 1 / 30, true); n++; }
  out.breached = { at: Math.round(T.points * 10) / 10, blows: n, rally: Math.round(T.rally), morale: Math.round(T.morale) };
  // a defender by the castle vs one far away: the same blow on a dummy
  const dummy = F.mkUnit(me, cx.x + Math.cos(ang) * 9, cx.z + Math.sin(ang) * 9, 'foot'); dummy.hp = dummy.max = 1e6; dummy.stun = 99;
  const def = F.mkUnit(c, cx.x + Math.cos(ang) * 7.5, cx.z + Math.sin(ang) * 7.5, 'foot');
  const blow = (far) => { const d = far ? 120 : 0; dummy.x = cx.x + Math.cos(ang) * (9 + d); dummy.z = cx.z + Math.sin(ang) * (9 + d); def.x = cx.x + Math.cos(ang) * (7.5 + d); def.z = cx.z + Math.sin(ang) * (7.5 + d); def.face = Math.atan2(dummy.x - def.x, dummy.z - def.z); dummy.face = def.face + Math.PI; let tot = 0; for (let k = 0; k < 20; k++) { const h0 = dummy.hp; def.cd = 0; def.pending = { t: 0, target: dummy }; F.step(1, 1 / 30, true); tot += h0 - dummy.hp; } return Math.round(tot * 10) / 10; };
  out.dmgByCastle = blow(false); out.dmgFar = blow(true);
  out.state = G.state;
  return out;
});
await page.waitForTimeout(300); await frames(page, 10);
await page.screenshot({ path: OUT + 'breach.png', timeout: 120000 });
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
