// Dev check: the captain's fighting moves against an enemy captain (Warlord), alone on the field.
//  parry: tap Block when his blade glints (each heavy blow)   early: tap at the start of each wind-up
//  hold:  hold Block the whole time                            none: do nothing
// plus the held moves: a sword heavy into a blocker, a braced spear against a charging rider, and a
// full-draw javelin at a rider.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
async function setup(diff = 2) {
  const page = await open(browser, 480, 270);
  await page.evaluate(() => { window.__noRender = 1; });
  await page.click('#segMap button[data-v="valley"]'); await page.click(`#segDiff button[data-v="${diff}"]`).catch(() => {}); await page.click('#goBtn'); await frames(page, 3);
  await page.evaluate(() => {
    const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
    const foe = [0, 1, 2, 3].find(i => i !== me && G.teams[i].active && G.ALLY[i] !== G.ALLY[me]); window.__foe = foe;
    for (const u of G.units) if (u !== p && u !== G.teams[foe].leader) { u.dead = true; u.x = 300; }
    for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; s.leaderDeadT = 1e9; }
    p.x = 0; p.z = 0; p.face = 0; p.hp = p.max = 600;
    const L = G.teams[foe].leader; L.x = 0; L.z = 3; L.face = Math.PI; L.hp = L.max = 9999; G.teams[foe].plan = { kind: 'hunt', target: p }; G.teams[foe].thinkT = 99;
  });
  return page;
}
for (const style of process.env.STYLES !== undefined ? process.env.STYLES.split(',').filter(Boolean) : ['parry', 'early', 'hold', 'none']) {
  const page = await setup();
  const r = await page.evaluate(style => {
    const F = window.__fb, G = F.G, p = G.player, L = G.teams[window.__foe].leader;
    let heavies = 0, prevW = false, prevG = false, press = 0, hp0 = p.hp, stunned = 0, swings = 0, prevSw = 0;
    const evs = []; F.G && window.__evs; const ev = d => evs.push(d.k); (window.__busOn || 0);
    const log = [];
    for (let f = 0; f < 30 * 40; f++) { const hpPrev = p.hp;
      const w = L.windup > 0, g = !!L.glint;
      if (w && !prevW) heavies++;
      let block = style === 'hold';
      if (style === 'parry' && g && !prevG) press = 2;
      if (style === 'early' && w && !prevW) press = 2;
      if (press > 0) { block = true; press--; }
      if (prevW && !w) { const d = Math.hypot(L.x - p.x, L.z - p.z); log.push({ d: +d.toFixed(1), hpBefore: Math.round(p.hp), stun: +L.stun.toFixed(2) }); }
      if (L.swing > 0 && prevSw <= 0) swings++; prevSw = L.swing;
      prevW = w; prevG = g;
      if (L.stun > .5) stunned++;
      p.face = Math.atan2(L.x - p.x, L.z - p.z);
      F.step(1, 1 / 30, { block, camYaw: 0 });
      if (L.x * L.x + L.z * L.z > 400) { L.x = 0; L.z = 3; }
    }
    return { heavies, swings, parries: p.parries || 0, dmgTaken: Math.round(hp0 - p.hp), foeStaggeredFrames: stunned, log: log.slice(0, 4) };
  }, style);
  console.log(style.padEnd(6), JSON.stringify(r));
  await page.close();
}
// held moves
{
  const page = await setup();
  console.log('sword heavy vs a blocking captain:', await page.evaluate(() => {
    const F = window.__fb, G = F.G, p = G.player, L = G.teams[window.__foe].leader;
    L.human = true; L.blocking = true; // (a dummy that holds its guard up and never fights back)
    const out = []; for (let k = 0; k < 6; k++) {
      L.x = 0; L.z = 2.2; L.vx = L.vz = 0; L.face = Math.PI; L.stun = 0; L.windup = 0; p.x = 0; p.z = 0; p.vx = p.vz = 0; p.cd = 0; p.face = 0; const hp0 = L.hp;
      F.step(Math.round(30 * .8), 1 / 30, { attackHeld: true, camYaw: 0 }); F.step(12, 1 / 30, { attackHeld: false, camYaw: 0 });
      out.push(Math.round(hp0 - L.hp));
    }
    const light = []; for (let k = 0; k < 6; k++) { L.x = 0; L.z = 2.2; L.vx = L.vz = 0; L.face = Math.PI; L.stun = 0; p.x = 0; p.z = 0; p.vx = p.vz = 0; p.cd = 0; p.face = 0; const hp0 = L.hp; F.attack(); F.step(15, 1 / 30, { camYaw: 0 }); light.push(Math.round(hp0 - L.hp)); }
    L.human = false; L.blocking = false;
    return 'heavy ' + out.join(',') + ' | light ' + light.join(',');
  }));
  console.log('spear brace vs a charging rider:', await page.evaluate(() => {
    const F = window.__fb, G = F.G, p = G.player, L = G.teams[window.__foe].leader;
    F.weapon('spear'); p.face = 0; F.step(12, 1 / 30, { attackHeld: true, camYaw: 0 });
    L.x = 0; L.z = 16; L.face = Math.PI; L.stun = 0; L.mounted = true; L.r = .95; L.horseHp = 100; L.charge = 2; L.chargeHit = new Set(); L.vx = 0; L.vz = -14;
    L.horse = { state: 'ridden', x: L.x, z: L.z, face: L.face, t: 0, rider: L, spd: 0 }; G.horses.push(L.horse);
    let res = 'rider got through';
    for (let f = 0; f < 60; f++) { F.step(1, 1 / 30, { attackHeld: true, camYaw: 0 }); if (!L.mounted) { res = 'unhorsed after ' + f + ' frames, braced=' + p.bracing; break; } }
    F.step(2, 1 / 30, { attackHeld: false, camYaw: 0 });
    return res;
  }));
  await page.close();
}
{
  const page = await setup();
  console.log('full-draw javelin at a rider:', await page.evaluate(() => {
    const F = window.__fb, G = F.G, p = G.player, L = G.teams[window.__foe].leader;
    F.weapon('jav'); p.javAmmo = 5; p.cd = 0; p.face = 0;
    L.dead = false; L.hp = 9999; L.x = 0; L.z = 14; L.mounted = true; L.horseHp = 100; L.charge = 0; L.vx = 0; L.vz = 0; L.stun = 9; G.teams[window.__foe].thinkT = 99;
    L.horse = { state: 'ridden', x: L.x, z: L.z, face: L.face, t: 0, rider: L, spd: 0 }; G.horses.push(L.horse);
    F.step(30, 1 / 30, { attackHeld: true, camYaw: 0 }); const drawn = p.javDraw;
    const n0 = G.arrows.length, cd0 = p.cd, am0 = p.javAmmo;
    F.step(1, 1 / 30, { attackHeld: false, camYaw: 0 });
    const a = G.arrows[G.arrows.length - 1], info = a ? `arrow unhorse=${a.unhorse} to ${a.x1.toFixed(1)},${a.z1.toFixed(1)} dur=${a.dur.toFixed(2)}` : 'no arrow';
    F.step(45, 1 / 30, { camYaw: 0 });
    return `draw=${drawn.toFixed(2)} cd=${cd0.toFixed(2)} ammo=${am0} arrows ${n0}->${G.arrows.length} ${info}; rider at ${L.x.toFixed(1)},${L.z.toFixed(1)} mounted after=${L.mounted} horseHp=${L.horseHp}`;
  }));
  await page.close();
}
await browser.close();
