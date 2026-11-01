// Dev check: the shield wall's push. Your men in shieldwall face an enemy line; Attack (nobody in your
// own reach): the wall heaves, the men in front are shoved back and lose their shields; again at once: nothing (cooldown).
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const shot = process.argv[2] === 'shot';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(shot => { if (!shot) window.__noRender = 1; else window.__shotNow = 1; document.querySelector('#segMap button[data-v="dunes"]').click(); document.querySelector('#goBtn').click(); }, shot);
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; if (s.leader && s.leader !== p) { s.leader.x = 150; s.leader.z = 150; } }
  p.x = 0; p.z = 0; p.face = 0; p.hp = p.max = 1e5;
  for (let i = 0; i < 9; i++) F.mkUnit(me, -3.6 + i * .9, 1.6, 'foot');
  F.setOrder(me, 'shieldwall'); F.step(60, 1 / 30, true);
  const foes = []; for (let i = 0; i < 6; i++) { const u = F.mkUnit(foe, -2.5 + i, 3.3, 'foot'); u.face = Math.PI; u.hp = u.max = 1e4; u.stun = 0; foes.push(u); }
  for (const s of G.teams) s.thinkT = 1e9;
  F.step(3, 1 / 30, true);
  const z0 = foes.map(u => u.z), h0 = foes.map(u => u.hp);
  F.cam.yaw = 0.6; F.attack(); out.kind = p.swingKind; F.step(6, 1 / 30, true); if (window.__shotNow) return out;
  out.pushed = foes.map((u, i) => +(u.z - z0[i]).toFixed(1)).join(','); out.dmg = foes.map((u, i) => Math.round(h0[i] - u.hp)).join(','); out.stunned = foes.filter(u => u.stun > 0).length;
  const z1 = foes.map(u => u.z); p.cd = 0; F.attack(); F.step(10, 1 / 30, true);
  out.again = foes.map((u, i) => +(u.z - z1[i]).toFixed(1)).join(',');
  return out;
});
if (shot) await page.screenshot({ path: OUT + 'push.png', timeout: 120000 });
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
