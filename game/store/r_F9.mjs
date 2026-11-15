// F9 Horse charges: your captain charges at a few enemy footmen, headless, four ways.
// (a) spearmen on Hold, still, facing: stopped (thrown off), the men set their spears and barely move;
// (b) spearmen standing by their captain (not on Hold), facing: the charge ends but he stays up, the man shoved a little for little damage;
// (c) men on Hold hit from behind, and (d) men running at him: bowled over (big knock, full damage), charge goes on.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const fails = []; const ck = (c, m) => { console.log(c ? 'ok  ' : 'FAIL', m); if (!c) fails.push(m); };
async function run(kase) {
  const page = await open(browser, 640, 360, { q: process.env.Q ?? '?crown2=1' });
  await page.evaluate(() => { window.__noRender = true; });
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
  const r = await page.evaluate(async kase => {
    const sim = await import('/src/core/sim.js'), { G } = window.__fb, p = G.player;
    const eti = G.teams.findIndex((s, i) => s && s.active && i !== G.myTi && G.ALLY[i] !== G.ALLY[G.myTi]);
    // a clear spot out from home: only the leaders and the test men stay
    const a = Math.atan2(p.z, p.x), R = window.__fb.W.R * .45, x0 = Math.cos(a) * R, z0 = Math.sin(a) * R;
    G.units = G.units.filter(u => u.leader);
    for (const u of G.units) if (u !== p && Math.hypot(u.x - x0, u.z - z0) < 40) { u.x += 80; }
    p.x = x0; p.z = z0; p.y = (await import('/src/core/world.js')).groundY(x0, z0);
    const face = Math.atan2(-x0, -z0); p.face = face;
    p.horse = { state: 'ridden', x: p.x, z: p.z, face, t: 0, rider: p, ti: p.ti }; G.horses.push(p.horse); p.mounted = true; p.r = .95; p.horseHp = 200; p.chargeCd = 0;
    const men = [];
    for (let k = -1; k <= 1; k++) {
      const mx = x0 + Math.sin(face) * 14 + Math.cos(face) * k * .9, mz = z0 + Math.cos(face) * 14 - Math.sin(face) * k * .9;
      const u = sim.mkUnit(eti, mx, mz, 'foot'); u.tier = kase === 'stop' || kase === 'slow' ? 1 : 0; u.face = kase === 'flank' ? face : face + Math.PI; G.units.push(u); men.push(u);
    }
    const s = G.teams[eti];
    s.human = true; // (orders as a player gives them: the planner leaves them alone)
    if (kase === 'run') s.order = 'charge';
    else if (kase === 'slow') { s.order = 'follow'; s.leader.x = men[1].x + Math.sin(face) * 3; s.leader.z = men[1].z + Math.cos(face) * 3; } // (spearmen not on Hold, standing by their captain)
    else { s.order = 'hold'; s.holdPt = { x: men[1].x, z: men[1].z, face: men[1].face }; }
    p.x = x0 - Math.sin(face) * 25; p.z = z0 - Math.cos(face) * 25; // (out of the way while the men take their places)
    if (kase !== 'run') window.__fb.step(90, 1 / 30, true);
    p.x = x0; p.z = z0; p.face = face; p.horse.x = p.x; p.horse.z = p.z;
    const hp0 = men.map(u => u.hp);
    let setSeen = false, contact = null, stillMounted = true;
    p.vx = Math.sin(face) * 12; p.vz = Math.cos(face) * 12; sim.captainCharge(p);
    for (let f = 0; f < 60; f++) {
      window.__fb.step(1, 1 / 30, true);
      if (men.some(u => u.bracing)) setSeen = true;
      if (!contact && men.some(u => u.hp < u.max - .5 || u.trampleT > 0) || (!contact && !p.mounted)) contact = { f, charge: p.charge, sp: Math.hypot(p.vx, p.vz), menV: men.map(u => +Math.hypot(u.vx, u.vz).toFixed(1)) };
      if (contact && f > contact.f + 12) break;
    }
    const hit = men.map((u, i) => ({ dmg: +(hp0[i] - u.hp).toFixed(1), kb: +Math.hypot(u.vx, u.vz).toFixed(1), stun: +Math.max(0, u.stun).toFixed(2), dead: u.dead }));
    return { order: sim.orderOf ? sim.orderOf(eti) : '?', setSeen, contact, mounted: p.mounted, charge: +p.charge.toFixed(2), sp: +Math.hypot(p.vx, p.vz).toFixed(1), hit, mVel: men.map(u => +Math.hypot(u.vx, u.vz).toFixed(1)) };
  }, kase);
  await page.close();
  console.log(kase, JSON.stringify(r));
  return r;
}
const top = r => r.hit.reduce((m, h) => h.dmg > m.dmg ? h : m, { dmg: 0, kb: 0 });
{ const r = await run('stop'); ck(!r.mounted, 'stop: spearmen on Hold facing him: the rider is thrown'); ck(r.setSeen, 'stop: the spearmen set their spears (bracing, sent to phones)'); ck(top(r).dmg < 1, `stop: the men take no charge damage (${top(r).dmg})`); }
{ const r = await run('slow'); const h = top(r); ck(r.mounted, 'slow: standing spearmen, not on Hold: he stays mounted'); ck(r.charge <= 0, 'slow: the charge is spent'); ck(h.dmg > 0 && h.dmg < 20, `slow: the man takes a little (${h.dmg}), no stumble`); ck(!r.setSeen, 'slow: no set-spear pose'); }
{ const r = await run('flank'); const h = top(r); ck(h.dmg >= 25, `flank: men on Hold hit from behind are bowled over (${h.dmg} dmg)`); ck(r.mounted, 'flank: rider rides on'); }
{ const r = await run('run'); const h = top(r); ck(h.dmg >= 25, `run: men running at him are bowled over (${h.dmg} dmg)`); ck(r.mounted, 'run: rider rides on'); }
await browser.close();
console.log(fails.length ? `F9: ${fails.length} FAIL` : 'F9: all ok');
process.exit(fails.length ? 1 : 0);
