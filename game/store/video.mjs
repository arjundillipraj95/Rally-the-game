import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
import fs from 'fs';
const [w, h, name, N] = [+process.argv[2], +process.argv[3], process.argv[4], +process.argv[5]];
const dir = OUT + name + '/'; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, w, h);
await page.click('#segMap button[data-v="' + (process.env.MAP || 'dunes') + '"]');
await page.click('#goBtn'); await frames(page, 10);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player;
  G.factions[1] = 'roman'; G.factions[0] = 'greek';
  document.getElementById('hudWrap').style.display = 'none';
  document.querySelectorAll('.coach,.banner').forEach(e => e.style.display = 'none');
  // red's army waits a short march ahead; ours is behind the captain
  const Y = p.face; F.cam.yaw = Y; F.cam.pitch = .3;
  const red = G.units.filter(u => !u.dead && u.ti === 1 && !u.leader);
  red.forEach((u, i) => { u.x = p.x + Math.sin(Y) * (8 + (i % 3)) + Math.cos(Y) * ((i % 7) - 3) * 1.2; u.z = p.z + Math.cos(Y) * (8 + (i % 3)) - Math.sin(Y) * ((i % 7) - 3) * 1.2; });
  for (const u of G.units) if (!u.dead && u.ti > 1) { u.x = 85; u.z = 85; }
  G.teams[2].order = 'hold'; G.teams[3].order = 'hold';
  for (const u of G.units) if (!u.dead && u.ti === 1 && u.leader) { u.dead = true; u.deadT = 99; u.x = 85; u.z = -85; } G.teams[1].leaderDeadT = 1e9;
  G.units.filter(u => !u.dead && u.ti === p.ti && !u.leader).forEach((u, i) => { if (i >= 4) { u.x = -85; u.z = 85; } else { const sd = (i % 2 ? 1 : -1) * (3 + (i >> 1) * 1.4); u.x = p.x + Math.cos(Y) * sd; u.z = p.z - Math.sin(Y) * sd; } });
  p.hp = p.max = 2000; G.teams.forEach(t => { t.recruitT = 1e9; });
  G.teams[p.ti].order = 'charge';
  // the scripted player: march in, then fight; jump-slam every so often, switch to spear once
  let k = 0; const Y0 = Y;
  // the scripted player: march toward the nearest red soldier, fight him, jump-slam into crowds
  let atk = false;
  window.__moveOverride = () => {
    const foes = G.units.filter(u => !u.dead && (u.ti === 1 || u.ti === 2) && Math.hypot(u.x - p.x, u.z - p.z) < 30);
    let f = null, fd = 1e9; for (const u of foes) { const d = Math.hypot(u.x - p.x, u.z - p.z); if (d < fd) { fd = d; f = u; } }
    const dx = f ? f.x - p.x : Math.sin(Y0), dz = f ? f.z - p.z : Math.cos(Y0), L = Math.hypot(dx, dz) || 1;
    return { wx: dx / L, wz: dz / L, mag: fd > 2.2 ? 1 : .15, block: false, attackHeld: atk && fd < 4, camYaw: F.cam.yaw };
  };
  window.__drive = () => {
    k++;
    if (k === 20) atk = true;
    p.stun = Math.min(p.stun, .05); if (p.hp < 500) p.hp = 2000;
    if (k === 90 || k === 250 || k === 330 || k === 420) F.jump();
    if (k === 97 || k === 257 || k === 337 || k === 427) F.attack();
    if (k === 170) F.weapon('spear');
    if (k === 330) F.weapon('sword');
    // camera: settle in behind the captain, looking where he's going
    if (Math.hypot(p.vx, p.vz) > 1) { let d = Math.atan2(p.vx, p.vz) - F.cam.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); F.cam.yaw += d * .035; }
    // second wave: when red is nearly beaten, green's squad charges in from ahead
    if (!window.__wave2 && G.units.filter(u => !u.dead && u.ti === 1).length < 4) {
      window.__wave2 = true; const cy = F.cam.yaw;
      G.units.filter(u => !u.dead && u.ti === 2 && !u.leader).forEach((u, i) => { u.x = p.x + Math.sin(cy) * (9 + (i % 3)) + Math.cos(cy) * ((i % 7) - 3) * 1.2; u.z = p.z + Math.cos(cy) * (9 + (i % 3)) - Math.sin(cy) * ((i % 7) - 3) * 1.2; });
      G.teams[2].leaderDeadT = 1e9; for (const u of G.units) if (!u.dead && u.ti === 2 && u.leader) { u.dead = true; u.deadT = 99; }
    }
    // keep the fight fed: far-off red soldiers rejoin the melee
    if (k % 60 === 0) for (const u of G.units) if (!u.dead && (u.ti === 1 || (window.__wave2 && u.ti === 2)) && Math.hypot(u.x - p.x, u.z - p.z) > 20) { u.x = p.x + (Math.random() - .5) * 8 + Math.sin(F.cam.yaw) * 9; u.z = p.z + (Math.random() - .5) * 8 + Math.cos(F.cam.yaw) * 9; }
  };
});
const t0 = Date.now();
for (let i = 0; i < N; i++) {
  await page.evaluate(() => { window.__drive(); window.__frame(1, 40); });
  await page.screenshot({ path: `${dir}f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 90 });
  if (i === 9) console.log('ms/frame ~', (Date.now() - t0) / 10);
}
console.log('done', N, 'frames in', ((Date.now() - t0) / 1000).toFixed(0), 's');
await browser.close();
