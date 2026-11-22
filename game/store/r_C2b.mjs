// C2b: the swordsman and the cavalryman, on the host (the joined phone: r_C2b-join). Needs the game server. A test
// Raider at the base champion's numbers (so his men are the neutral baseline) who recruits both. Checks: a swordsman
// 100 health; Cavalry with no swordsman: nothing; with one: the healthiest is mounted (two bars: 130 horse, 80 man;
// one place more); Pursuit: his first hit on a runner slows him 2 s, not again; a charge bowls over men in the open;
// a braced, facing spear line stops it: the horse is lost, he fights on as a swordsman (one place); mounted again for
// 50; Mail, Lances and Barding numbers; a computer Raider fields both.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const RAID = `window.__champs = [{ id: 'raid', name: 'Raid', cls: 'raider', stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['sword', 'cav'], influence: null, sp1: null, sp2: null, ult: null, armyUlt: null }];`;
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=raid&botchamp=raid', init: RAID });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), Wd = await import('/src/core/world.js'), st = await import('/src/core/state.js');
  G.T = 30; F.step(30);
  const me = G.myTi, s = G.teams[me], p = s.leader, foe = (me + 1) % 4, r = {};
  G.units = G.units.filter(u => u.ti !== me || u.leader); s.gold = 2000;
  r.noSw = sim.recruit(me, 'cav');
  r.rs = sim.recruit(me, 'sword'); r.rs2 = sim.recruit(me, 'sword');
  const sws = G.units.filter(u => u.ti === me && u.kind === 'sword'); r.swHp = Math.round(sws[0].max); sws[1].hp = 40;
  const pl0 = sim.armyPlaces(me), g0 = s.gold; r.rc = sim.recruit(me, 'cav'); r.plUp = sim.armyPlaces(me) - pl0; r.paid = g0 - s.gold;
  const cv = G.units.find(u => u.ti === me && u.kind === 'cav'); r.cav = cv ? { hp: Math.round(cv.max), horse: Math.round(cv.horseHp), mounted: cv.mounted, healthiest: cv === sws[0] } : null;
  // open ground: from his home toward the middle (x across, z ahead)
  const O = { x: p.x, z: p.z }, A = Math.atan2(-p.x, -p.z), W = (x, z) => [O.x + Math.sin(A) * z + Math.cos(A) * x, O.z + Math.cos(A) * z - Math.sin(A) * x];
  p.x += 300; p.z += 300;
  const man = (x, z, kind = 'foot') => { const [wx, wz] = W(x, z); const u = sim.mkUnit(foe, wx, wz, kind); u.y = Wd.groundY(wx, wz); u.face = A + Math.PI; return u; };
  // Pursuit: his first hit on a runner slows him; not again on the same man
  s.up.sw1 = 0; r.p1 = sim.buyUpgrade(me, 'sw1'); const sw = sws[1]; r.pursuit = sw.pursuit;
  const runner = man(0, 30); runner.max = runner.hp = 1e5; runner.vx = 5; runner.vz = 0;
  const [sx, sz] = W(0, 29); sw.x = sx; sw.z = sz;
  const cavm = await import('/src/core/sim/cavalry.js');
  cavm.pursuitHit(sw, runner, 20, false); r.slow1 = +(runner.slowUntil - G.T).toFixed(2); runner.slowUntil = 0;
  cavm.pursuitHit(sw, runner, 20, false); r.slow2 = runner.slowUntil || 0;
  runner.dead = true;
  // a charge into men in the open: bowled over
  G.units = [p, cv]; G.horses = G.horses.filter(h => h.rider === cv);
  const [cx, cz] = W(0, 0); cv.x = cx; cv.z = cz; cv.face = A; cv.horseHp = 1e4; cv.chargeCd = 0; cv.charge = 0; s.order = 'charge';
  const grp = []; for (let k = 0; k < 5; k++) { const u = man(-1 + (k % 3) * 1, 10 + (k >> 1) * 1.2); u.max = u.hp = 1e5; u.vx = Math.cos(A) * 4; u.vz = -Math.sin(A) * 4; grp.push(u); }
  let charged = false; for (let k = 0; k < 150; k++) { s.routT = 0; F.step(1); if (cv.charge > 0) charged = true; for (const u of grp) { u.stun = Math.max(u.stun, 0); } }
  r.charged = charged; r.bowled = grp.filter(u => u.hp < u.max).length;
  for (const u of grp) u.dead = true;
  // a braced spear line, facing him: the charge stops, the horse is lost, he fights on as a swordsman
  G.units = [p, cv]; cv.x = cx; cv.z = cz; cv.face = A; cv.horseHp = 60; cv.charge = 2.2; cv.chargeHit = new Set(); cv.vx = Math.sin(A) * 18; cv.vz = Math.cos(A) * 18;
  const fs = G.teams[foe]; fs.order = 'hold'; fs.human = true;
  const line = []; for (let k = 0; k < 5; k++) { const u = man(-2 + k, 6); u.tier = 1; u.max = u.hp = 1e5; line.push(u); }
  const [hx, hz] = W(0, 6); fs.holdPt = { x: hx, z: hz, face: A + Math.PI };
  const pl1 = sim.armyPlaces(me);
  for (let k = 0; k < 90 && cv.kind === 'cav'; k++) { s.routT = 0; F.step(1); for (const u of line) { u.vx = u.vz = 0; u.face = A + Math.PI; } }
  r.stopped = { kind: cv.kind, mounted: cv.mounted, places: sim.armyPlaces(me), was: pl1, hp: Math.round(cv.hp) };
  fs.human = false; for (const u of line) u.dead = true; G.units = [p, cv, sws[0] === cv ? sws[1] : sws[0]];
  // mounted again for 50
  const g1 = s.gold; r.re = sim.recruit(me, 'cav'); r.rePaid = g1 - s.gold;
  // Mail, Lances, Barding
  s.gold = 2000; r.mail = sim.buyUpgrade(me, 'sw2'); const foot = G.units.find(u => u.ti === me && u.kind === 'sword');
  r.mailHp = foot ? Math.round(foot.max) : null; r.mailDmg = foot ? Math.round(foot.dmg * 10) / 10 : null;
  const rider = G.units.find(u => u.ti === me && u.kind === 'cav');
  r.l = sim.buyUpgrade(me, 'cav1'); r.lance = rider ? { horse: Math.round(rider.horseMax), x: rider.chargeX } : null;
  r.b = sim.buyUpgrade(me, 'cav2'); r.bard = rider ? { horse: Math.round(rider.horseMax), dodge: rider.dodge } : null;
  // a computer Raider fields both over a match's first minutes
  const bt = [0, 1, 2, 3].find(i => i !== me && G.teams[i] && !G.teams[i].human);
  let bs = 0, bc = 0; G.teams[bt].gold = 3000;
  for (let k = 0; k < 60 * 90; k++) { F.step(1); if (k % 60 === 0) { G.teams[bt].gold = Math.max(G.teams[bt].gold, 400); bs = Math.max(bs, G.units.filter(u => !u.dead && u.ti === bt && u.kind === 'sword').length); bc = Math.max(bc, G.units.filter(u => !u.dead && u.ti === bt && u.kind === 'cav').length); } }
  r.bot = { sw: bs, cav: bc };
  return r;
});
ok(o.noSw === false, `Cavalry with no swordsman: nothing (${o.noSw})`);
ok(o.rs && o.swHp === 100, `a swordsman: ${o.swHp} health`);
ok(o.rc && o.cav && o.cav.mounted && o.cav.healthiest && o.cav.hp === 80 && o.cav.horse === 130 && o.plUp === 1 && o.paid === 50, `mounted: ${JSON.stringify(o.cav)}, places +${o.plUp}, ${o.paid} gold`);
ok(o.p1 && o.pursuit && o.slow1 === 2 && o.slow2 === 0, `Pursuit: a runner slowed ${o.slow1} s, not again (${o.slow2})`);
ok(o.charged && o.bowled >= 3, `a charge into men in the open: charged ${o.charged}, ${o.bowled} of 5 hurt`);
ok(o.stopped.kind === 'sword' && !o.stopped.mounted && o.stopped.places === o.stopped.was - 1, `a braced spear line: ${JSON.stringify(o.stopped)}`);
ok(o.re && o.rePaid === 50, `mounted again: ${o.re}, ${o.rePaid} gold`);
ok(o.mail && o.mailHp === 130 && o.mailDmg === 23, `Mail: ${o.mailHp} health, ${o.mailDmg} a blow`);
ok(o.l && o.lance && o.lance.horse === 140 && o.lance.x === 1.4, `Lances: ${JSON.stringify(o.lance)}`);
ok(o.b && o.bard && o.bard.horse === 210 && o.bard.dodge === .1, `Barding: ${JSON.stringify(o.bard)}`);
ok(o.bot.sw >= 1 && o.bot.cav >= 1, `a computer Raider fields swordsmen (${o.bot.sw}) and cavalry (${o.bot.cav})`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
