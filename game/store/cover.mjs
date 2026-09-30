import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const [w, h, name] = [+process.argv[2], +process.argv[3], process.argv[4]];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, w, h);
await page.evaluate(([k, tn, fl]) => { window.__yawK = k; window.__turn = tn; window.__flank = fl === '1'; }, [process.argv[6] || '.62', process.argv[7] || '0', process.argv[9] || '0']);
await page.click(`#segMap button[data-v="${process.env.MAP || 'valley'}"]`);
await page.click('#goBtn'); await frames(page, 20);
await page.evaluate(({ w, h }) => {
  const F = window.__fb, G = F.G, p = G.player;
  G.factions[1] = 'roman'; G.factions[0] = 'greek';
  document.getElementById('hudWrap').style.display = 'none'; document.getElementById('fx').style.display = 'none';
  // the scene: our captain facing the camera, his men charging in behind him, a red squad in front
  const Y0 = 0, Y = Y0 + +(window.__turn || 0); p.x = -8; p.z = -44; p.face = Y; F.cam.yaw = Y0 + Math.PI * +(window.__yawK || .62); F.cam.pitch = h > w ? .24 : .16;
  const mine = G.units.filter(u => !u.dead && u.ti === p.ti && u !== p), red = G.units.filter(u => !u.dead && u.ti === 1 && !u.leader);
  const cy = F.cam.yaw, away = [Math.sin(cy), Math.cos(cy)];
  // his men: a loose rank behind him (on the far side from the camera), charging in
  if (window.__flank) mine.forEach((u, i) => { if (i >= 6) { u.x = 80; u.z = 80; return; } const side = i % 2 ? 1 : -1, k = Math.floor(i / 2); const rx = Math.cos(Y), rz = -Math.sin(Y); u.x = p.x + rx * side * (2.2 + k * 1.1) - Math.sin(Y) * (k * .9); u.z = p.z + rz * side * (2.2 + k * 1.1) - Math.cos(Y) * (k * .9); u.face = Y; u.fd = 3; u.swing = (i % 3) * .12; u.swingKind = i % 3; });
  else mine.forEach((u, i) => { if (i >= 7) { u.x = 80; u.z = 80; return; } const o = (i - 3) * 1.25; u.x = p.x + away[0] * 4.2 + away[1] * o; u.z = p.z + away[1] * 4.2 - away[0] * o; u.face = Y; u.fd = 3; u.swing = (i % 3) * .12; u.swingKind = i % 3; });
  // the enemy: six men in an arc right in front of him, about to have a very bad day
  red.forEach((u, i) => { if (i >= 6) { u.x = 80; u.z = -80; return; } const a = Y + (i - 2.5) * .24; u.x = p.x + Math.sin(a) * 2.3; u.z = p.z + Math.cos(a) * 2.3; u.face = Y + Math.PI; u.hp = 3; u.stun = 1; u.fd = 2; });
  for (const u of G.units) if (!u.dead && u.ti > 1) { u.x = 80; u.z = 80; }
  // hold everyone's order still
  G.teams.forEach(s => s.order = 'hold');
  window.__red = red;
}, { w, h });
await frames(page, 2);
await page.evaluate(() => window.__fb.jump()); await frames(page, 7);
await page.evaluate(() => window.__fb.attack()); await frames(page, +process.argv[5] || 9);
// the look: warm grade, soft vignette, and the title
if (process.argv[8] === 'raw') { await page.evaluate(() => document.querySelectorAll('.overlay,.veil').forEach(o => o.hidden = true)); await page.waitForTimeout(300); await page.screenshot({ path: OUT + name + '.png' }); console.log('raw', name); await browser.close(); process.exit(0); }
await page.evaluate(({ w, h }) => {
  const c = document.querySelector('canvas'); c.style.filter = 'saturate(1.25) contrast(1.08) brightness(1.04)';
  const v = document.createElement('div'); v.style.cssText = 'position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 45%, rgba(20,12,4,.55) 100%)'; document.body.append(v);
  const t = document.createElement('div'), port = h > w, sq = w === h;
  const size = port ? w * .3 : sq ? w * .26 : h * .24;
  t.style.cssText = `position:fixed;left:0;right:0;${port ? 'top:5%' : sq ? 'top:4%' : 'top:6%'};text-align:center;pointer-events:none;font-family:Bangers;font-size:${size}px;line-height:.9;color:#fff;letter-spacing:.02em;transform:rotate(-4deg);
    -webkit-text-stroke:${size * .045}px #1b1512;paint-order:stroke fill;text-shadow:0 ${size * .06}px 0 #1b1512, 0 ${size * .1}px ${size * .12}px rgba(0,0,0,.45);`;
  t.textContent = 'RALLY!';
  const f = document.createElement('div'); f.style.cssText = `display:flex;justify-content:center;gap:${size * .08}px;margin-top:${size * .08}px;transform:rotate(4deg)`;
  for (const col of ['#3a5cf0', '#e0352b', '#2fbf46', '#f0c419']) { const i = document.createElement('i'); i.style.cssText = `display:block;width:${size * .16}px;height:${size * .22}px;background:${col};clip-path:polygon(0 0,100% 0,100% 100%,50% 78%,0 100%);filter:drop-shadow(0 3px 0 #1b1512)`; f.append(i); }
  t.append(f); document.body.append(t);
  document.querySelectorAll('.overlay,.veil').forEach(o => o.hidden = true);
}, { w, h });
await page.waitForTimeout(300);
await page.screenshot({ path: OUT + name + '.png' });
console.log('ok', name, await page.evaluate(() => window.__red.filter(u => u.dead && u.launch).length));
await browser.close();
