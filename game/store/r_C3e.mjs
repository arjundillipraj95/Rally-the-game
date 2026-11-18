// C3e Testudo march on the host: from the full horn at level 7 his soldiers within 15 m (not Titus, not one far off)
// lock into a block in 0.6 s and heal 25%, march about 10 m in 4 s the way he faces, then shout and shove the enemy in
// front 1 m. Meanwhile: a blow from the front is turned, from the flank it lands; arrows do nothing; an ult from the
// front lands at 30%; nothing knocks them about; a rider at speed into the front stalls. A bot sounds it.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'), M = await import('/src/core/sim/melee.js'), Mi = await import('/src/core/sim/missiles.js'), Ar = await import('/src/core/sim/army.js');
  G.T = 30; F.step(1); const me = G.myTi, p = G.teams[me].leader, r = {};
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader;
  L.gainXp(me, 1500, 't'); r.lvl = G.teams[me].lvl;
  const cw = G.layout.cwalls.find(c => c.obs.some(o => o.cwall)), wob = cw.obs.find(o => o.cwall && o.cgate == null);
  const n = Math.hypot(wob.x - cw.x, wob.z - cw.z), ox = (wob.x - cw.x) / n, oz = (wob.z - cw.z) / n;
  if (p.mounted) sim.dismount(p, false); p.x = wob.x + ox * 14; p.z = wob.z + oz * 14; p.face = Math.atan2(ox, oz); p.vx = p.vz = 0; p.marchT = 0;
  for (const u of G.units) if (!u.dead && !u.leader && Math.hypot(u.x - p.x, u.z - p.z) < 30) { u.dead = true; u.hp = 0; }
  E.x = p.x + 80; E.z = p.z;
  const at = (d, s = 0) => [p.x + Math.sin(p.face) * d + Math.cos(p.face) * s, p.z + Math.cos(p.face) * d - Math.sin(p.face) * s];
  const men = [[2, -1.5], [2, 0], [2, 1.5], [3.5, -.8], [3.5, .8], [1, 0]].map(([d, s], i) => { const u = sim.mkUnit(me, ...at(d, s), i < 4 ? 'foot' : 'arch'); u.hp = u.max * .5; return u; });
  const far = sim.mkUnit(me, ...at(-20, 0), 'foot');
  G.teams[me].rally = 100; F.rally(); r.horn = G.teams[me].rally;
  r.in = men.filter(u => u.testudo).length + '/' + men.length; r.far = !!far.testudo; r.titus = !!p.testudo;
  const c0 = [men.reduce((s, u) => s + u.x, 0) / men.length, men.reduce((s, u) => s + u.z, 0) / men.length];
  F.step(21); r.healed = men.every(u => u.hp >= u.max * .74); const B = men[0].testudo;
  const front = men[0]; // (front row, outside)
  const foe = (x, z) => { const u = sim.mkUnit(e, x, z, 'foot'); u.rest = true; return u; };
  const hitOn = (a, b, extra) => { const h = b.hp; M.hit(a, b, 1, Object.assign({ fixed: 20, unblockable: true, unparryable: true }, extra)); return +(h - b.hp).toFixed(1); };
  const fF = foe(front.x + Math.sin(B.face) * 1.4, front.z + Math.cos(B.face) * 1.4), fS = foe(front.x + Math.cos(B.face) * 1.4, front.z - Math.sin(B.face) * 1.4);
  r.front = hitOn(fF, front); r.flank = hitOn(fS, front); r.ult = hitOn(fF, front, { fixed: 100, ult: true }); r.still = !!front.testudo;
  front.hp = front.max; const x0 = front.x; Ar.push(front, 20, 0, 1); F.step(1); r.pushed = +Math.abs(front.x - x0 - (Math.sin(B.face) * B.d.dist / B.d.march / 30)).toFixed(2);
  fF.dead = fS.dead = true;
  const archer = sim.mkUnit(e, front.x + Math.sin(B.face) * 9, front.z + Math.cos(B.face) * 9, 'arch'); archer.rest = true; const ha = men.reduce((s, u) => s + u.hp, 0);
  for (let k = 0; k < 2; k++) { Mi.shoot(archer, front); F.step(15); } r.arrows = +(ha - men.reduce((s, u) => s + u.hp, 0)).toFixed(1); archer.dead = true;
  // a rider at speed into its front
  if (E.mounted) sim.dismount(E, false); E.mounted = true; E.horse = { state: 'ridden', x: E.x, z: E.z }; E.horseHp = 200; E.horseCd = 99;
  const fa = B.face + Math.PI; E.x = B.fx + Math.sin(B.face) * 3; E.z = B.fz + Math.cos(B.face) * 3; E.face = fa; E.charge = 1;
  const hb = men.reduce((s, u) => s + u.hp, 0); let stalled = false;
  for (let k = 0; k < 10 && !stalled; k++) { E.vx = Math.sin(fa) * 11; E.vz = Math.cos(fa) * 11; F.step(1); stalled = E.charge === 0; }
  r.horse = { stalled, dmg: +(hb - men.reduce((s, u) => s + u.hp, 0)).toFixed(1) }; sim.dismount(E, false); E.x = p.x + 80;
  // to the end: the march, and the shout
  F.step(80); const ahead = foe(B.fx + Math.sin(B.face) * 1.2, B.fz + Math.cos(B.face) * 1.2); let ax = 0, az = 0;
  for (let k = 0; k < 60 && men.some(u => u.testudo); k++) { ahead.x = ax = B.fx + Math.sin(B.face) * 1.2; ahead.z = az = B.fz + Math.cos(B.face) * 1.2; ahead.vx = ahead.vz = 0; F.step(1); }
  r.shout = +(((ahead.x - ax) * Math.sin(B.face) + (ahead.z - az) * Math.cos(B.face))).toFixed(2);
  const c1 = [men.reduce((s, u) => s + u.x, 0) / men.length, men.reduce((s, u) => s + u.z, 0) / men.length];
  r.marched = +((c1[0] - c0[0]) * Math.sin(B.face) + (c1[1] - c0[1]) * Math.cos(B.face)).toFixed(1); r.over = men.every(u => !u.testudo);
  // a bot with a full horn and his men round him, a fight close
  L.gainXp(e, 1500, 't'); if (E.mounted) sim.dismount(E, false); E.x = p.x + 30; E.z = p.z; E.stun = 0;
  const bm = [0, 1, 2, 3, 4].map(i => sim.mkUnit(e, E.x + 2, E.z + i - 2, 'foot')); G.teams[e].rally = 100; let used = false;
  for (let k = 0; k < 200 && !used; k++) { E.x = p.x + 6; E.z = p.z; for (const [i, u] of bm.entries()) { u.x = E.x + 2; u.z = E.z + i - 2; } p.hp = p.max; F.step(1); used = bm.some(u => u.testudo) || G.teams[e].rally < 50; }
  r.bot = used;
  return r; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(o));
ok(o.horn === 0 && o.in === '6/6' && !o.far && !o.titus, `the horn sounds it: ${o.in} of his men near him lock in; not the one far off, not Titus`);
ok(o.healed, 'formed up in 0.6 s, healed 25%');
ok(o.front === 0 && o.flank > 15, `a blow from the front turned (${o.front}), from the flank it lands (${o.flank})`);
ok(Math.abs(o.ult - 30) < 1 && o.still, `an ult from the front lands at ${o.ult}, the block holds`);
ok(o.pushed < .2, `nothing knocks them about (${o.pushed} m)`);
ok(o.arrows === 0, `arrows do nothing (${o.arrows})`);
ok(o.horse.stalled && o.horse.dmg === 0, 'a rider at speed into its front stalls');
ok(Math.abs(o.marched - 10) < 1.5 && o.over, `marched ${o.marched} m, then over`);
ok(o.shout > .8 && o.shout < 1.3, `the shout shoves the enemy in front ${o.shout} m`);
ok(o.bot, 'a computer Titus sounds it');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
