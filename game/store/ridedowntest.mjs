// Dev check: the ride-down. A beaten enemy captain (marked), you galloping at him: a perfect release
// kills him outright (RIDDEN DOWN); a good one is just a blow; not at a gallop, just a blow.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 320);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="dunes"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.thinkT = 1e9; if (s.leader && s.leader !== p && s.ti !== foe) { s.leader.x = 150; } }
  const horse = { id: 99, x: 0, z: 0, face: 0, state: 'ridden', rider: p, t: 0, spd: 9, ti: me }; G.horses.push(horse); p.mounted = true; p.horse = horse; p.weapon = 'sword';
  const tryAt = (d, gallop) => {
    const L = G.teams[foe].leader; if (L.summon) { L.summon.state = 'leaving'; L.summon = null; } L.mounted = false; L.horseCd = 99;
    L.x = 0; L.z = d; L.hp = 30; L.max = 180; L.stun = 0; L.cd = 99; L.dead = false;
    p.x = 0; p.z = 0; p.face = 0; p.vx = 0; p.vz = 10; p.cd = 0; p.stun = 0; p.gallop = gallop;
    F.step(1, 1 / 30, { wx: 0, wz: 1, mag: 1, camYaw: 0 });
    const marked = L.execReady; p.gallop = gallop; p.x = 0; p.z = 0; L.x = 0; L.z = d;
    F.rideRelease(p, 'sword', .8); F.step(3, 1 / 30, { wx: 0, wz: 1, mag: 1, camYaw: 0 });
    const res = { marked, dead: L.dead, hp: Math.round(L.hp) };
    F.step(400, 1 / 30); // (let him come back)
    return res;
  };
  out.perfect = tryAt(2.7, 1); out.good = tryAt(4.8, 1); out.trot = tryAt(2.7, .2);
  out.hl = JSON.stringify(G.teams[me].hl || {});
  return out;
});
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
