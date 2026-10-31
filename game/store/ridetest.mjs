// Dev check: fighting on horseback. Your captain gallops at a standing enemy and lets go of Attack at
// different moments; then a lance pass at an enemy rider; then enemy riders coming at you on foot.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
async function setup(diff = 1) {
  const page = await open(browser, 480, 270);
  await page.evaluate(() => { window.__noRender = 1; });
  await page.click('#segMap button[data-v="valley"]'); await page.click(`#segDiff button[data-v="${diff}"]`); await page.click('#goBtn'); await frames(page, 3);
  await page.evaluate(() => {
    const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
    const foe = [0, 1, 2, 3].find(i => i !== me && G.teams[i].active && G.ALLY[i] !== G.ALLY[me]); window.__foe = foe;
    for (const u of G.units) if (u !== p && u !== G.teams[foe].leader) { u.dead = true; u.x = 300; }
    for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; s.leaderDeadT = 1e9; }
    window.__mount = u => { u.mounted = true; u.r = .95; u.horseHp = 100; u.horse = { state: 'ridden', x: u.x, z: u.z, face: u.face, t: 0, rider: u, spd: 0 }; G.horses.push(u.horse); };
  });
  return page;
}
if (process.env.ONLYRIDERS) { /* skip */ } else {
// 1) passes at a standing dummy: release when the gap to the strike distance is `off` metres
{
  const page = await setup();
  for (const [label, off, gallopFrames, tap] of [['perfect', 0, 60], ['early +4m', 4, 60], ['late -1.4m', -1.4, 60], ['perfect, slow trot', 0, 4], ['tap near him', 0, 60, true]]) {
    const r = await page.evaluate(([off, gf, tap]) => {
      const F = window.__fb, G = F.G, p = G.player, E = G.teams[window.__foe].leader;
      E.human = true; E.dead = false; E.hp = E.max = 9999; E.x = 20; E.z = 10; E.vx = E.vz = 0; E.stun = 0; E.mounted = false; // (a dummy: stands there)
      p.dead = false; p.x = 20; p.z = -30; p.face = 0; p.vx = p.vz = 0; p.cd = 0; p.stun = 0; p.gallop = 0; p.slowT = 0; if (!p.mounted) window.__mount(p);
      const drive = (held) => ({ wx: 0, wz: 1, mag: gf > 10 ? 1 : .35, camYaw: 0, attackHeld: held });
      // ride up to ~16 m away building the gallop, holding Attack once inside 20 m
      let f = 0; while (Math.hypot(E.x - p.x, E.z - p.z) > 20 && f < 400) { E.vx = E.vz = 0; E.x = 20; E.z = 10; F.step(1, 1 / 30, drive(false)); f++; }
      if (gf <= 10) p.gallop = 0;
      const hp0 = E.hp; let q = null, d0 = null, minD = 99, startD = Math.hypot(E.x - p.x, E.z - p.z);
      for (let k = 0; k < 300; k++) {
        const at = (p.weapon === 'spear' ? 3.6 : 2.6) + E.r * .5, d = Math.hypot(E.x - p.x, E.z - p.z);
        minD = Math.min(minD, d); const release = tap ? (d - at < .3) : (d - at <= off);
        if (release) { if (tap) { F.step(1, 1 / 30, drive(true)); } d0 = d - at; F.step(1, 1 / 30, drive(false)); break; }
        E.vx = E.vz = 0; E.x = 20; E.z = 10; F.step(1, 1 / 30, drive(!tap));
      }
      F.step(10, 1 / 30, { wx: 0, wz: 1, mag: .3, camYaw: 0 });
      return { startD: +startD.toFixed(1), minD: +minD.toFixed(1), gapAtRelease: d0 && +d0.toFixed(1), speed: +Math.hypot(p.vx, p.vz).toFixed(1), gallop: +(p.gallop || 0).toFixed(2), dmg: Math.round(hp0 - E.hp) };
    }, [off, gallopFrames, !!tap]);
    console.log(label.padEnd(20), JSON.stringify(r));
  }
  await page.close();
}
// 2) a lance pass at an enemy rider (perfect timing): does he come off?
{
  const page = await setup();
  console.log('lance at a rider:', await page.evaluate(() => {
    const F = window.__fb, G = F.G, p = G.player, E = G.teams[window.__foe].leader;
    F.weapon('spear'); E.human = true; E.x = 0; E.z = 0; E.vx = E.vz = 0; E.hp = E.max = 9999; window.__mount(E);
    p.x = 0; p.z = -40; p.face = 0; window.__mount(p);
    const drive = held => ({ wx: 0, wz: 1, mag: 1, camYaw: 0, attackHeld: held });
    for (let k = 0; k < 300; k++) { const at = 3.6 + E.r * .5, d = Math.hypot(E.x - p.x, E.z - p.z); if (d <= at) { F.step(1, 1 / 30, drive(false)); break; } E.vx = E.vz = 0; E.x = 0; E.z = 0; F.step(1, 1 / 30, drive(d < 20)); }
    F.step(5, 1 / 30, {});
    return 'enemy rider mounted after: ' + E.mounted;
  }));
  await page.close();
}
}
// 3) enemy riders coming at you on foot: tap Block when his weapon glints
for (const diff of process.env.NORIDERS ? [] : [0, 1, 2]) for (const style of ['parry', 'none']) {
  const page = await setup(diff);
  const r = await page.evaluate(style => {
    const F = window.__fb, G = F.G, p = G.player, E = G.teams[window.__foe].leader;
    p.x = 0; p.z = 0; p.hp = p.max = 1e6; E.hp = E.max = 1e6; G.teams[window.__foe].plan = { kind: 'hunt', target: p }; G.teams[window.__foe].thinkT = 99;
    let passes = 0, glints = 0, pg = false, pc = false, press = 0;
    for (let f = 0; f < 30 * 60; f++) {
      if (!E.mounted) { window.__mount(E); }
      if (Math.hypot(E.x - p.x, E.z - p.z) > 30) { E.x = p.x + 25; E.z = p.z; }
      if (E.couch && !pc) passes++; pc = !!E.couch;
      if (E.glint && !pg) { glints++; if (style === 'parry') press = 2; } pg = !!E.glint;
      let block = false; if (press > 0) { block = true; press--; }
      p.face = Math.atan2(E.x - p.x, E.z - p.z);
      F.step(1, 1 / 30, { block, camYaw: 0 });
    }
    return { passes, glints, parried: p.parries || 0, dmgTaken: Math.round(1e6 - p.hp) };
  }, style);
  console.log(`rider vs you on foot, diff ${diff}, ${style}:`, JSON.stringify(r));
  await page.close();
}
await browser.close();
