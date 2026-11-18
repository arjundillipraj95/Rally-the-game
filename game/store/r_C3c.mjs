// C3c Shield of Cassius on the host: locked until level 5; raised, it blocks blows and arrows from the front (for him and
// an ally in the zone behind), not from the side or back; he can't attack, walks at 70% and backs away still facing
// front; an ult breaks it and lands at 30%; tap again drops it; up to 4 s, then 10 s recharge from the drop; his men on
// Follow move into the zone; from the saddle he stays mounted; a bot raises it. The joined phone's is r_C3c-join.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, A = await import('/src/core/sim/abilities.js'), L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'), M = await import('/src/core/sim/melee.js'), Mi = await import('/src/core/sim/missiles.js');
  G.T = 30; F.step(1); const me = G.myTi, p = G.teams[me].leader, r = {};
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader;
  r.lv1 = A.blocked(me, 'sp2'); L.gainXp(me, 900, 't'); r.lvl = G.teams[me].lvl;
  const cw = G.layout.cwalls.find(c => c.obs.some(o => o.cwall)), wob = cw.obs.find(o => o.cwall && o.cgate == null);
  const n = Math.hypot(wob.x - cw.x, wob.z - cw.z), ox = (wob.x - cw.x) / n, oz = (wob.z - cw.z) / n;
  const Sc = await import('/src/core/sim/scutum.js');
  const reset = () => { if (p.scutum) Sc.dropScutum(p); if (p.mounted) sim.dismount(p, false); p.x = wob.x + ox * 16; p.z = wob.z + oz * 16; p.face = Math.atan2(ox, oz); p.vx = p.vz = 0; p.hp = p.max; p.stun = 0; p.iframeT = 0; p.marchT = 0; p.shieldT = 0; p.armour = 0;
    for (const u of G.units) if (!u.dead && u !== p && !u.leader && Math.hypot(u.x - p.x, u.z - p.z) < 16 && u.ti !== me) { u.dead = true; u.hp = 0; }
    E.x = p.x + 80; E.z = p.z; if (E.mounted) sim.dismount(E, false); G.teams[me].cds.sp2 = 0; };
  const at = (d, s = 0) => [p.x + Math.sin(p.face) * d + Math.cos(p.face) * s, p.z + Math.cos(p.face) * d - Math.sin(p.face) * s];
  const foe = (d, s, kind = 'foot') => { const [x, z] = at(d, s); const u = sim.mkUnit(e, x, z, kind); u.face = Math.atan2(p.x - x, p.z - z); u.rest = true; return u; };
  const blow = (a, b, extra) => { const h = b.hp; M.hit(a, b, 1, Object.assign({ fixed: 20, unparryable: true, unblockable: true }, extra)); return +(h - b.hp).toFixed(1); };
  reset(); F.ability(1); r.up = { on: !!p.scutum, cd: Math.round(A.cdLeft(me, 'sp2')), why: A.blocked(me, 'sp2') };
  const f1 = foe(1.5, 0), f2 = foe(0, 1.5), f3 = foe(-1.5, 0);
  r.front = blow(f1, p); r.side = blow(f2, p); r.back = blow(f3, p);
  const ally = sim.mkUnit(me, ...at(-3, 0), 'foot'), out = sim.mkUnit(me, ...at(-3, 4), 'foot'); ally.rest = out.rest = true;
  const f4 = foe(4, 0); r.allyIn = blow(f4, ally); r.allyOut = blow(f4, out);
  // an arrow from the front, then from the side
  { reset(); const c = foe(0, 9, 'arch'), hc = p.hp; Mi.shoot(c, p); for (let i = 0; i < 40; i++) F.step(1); r.arrowCtl = +(hc - p.hp).toFixed(1); c.dead = true; reset(); F.ability(1); }
  const ar1 = foe(9, 0, 'arch'), h0 = p.hp; for (let k = 0; k < 3; k++) { p.scutum.until = G.T + 3; Mi.shoot(ar1, p); for (let i = 0; i < 40; i++) F.step(1); } r.arrowFront = +(h0 - p.hp).toFixed(1); p.scutum.until = G.T + 3;
  const ar2 = foe(0, 9, 'arch'), h1 = p.hp; for (let k = 0; k < 4 && p.hp >= h1; k++) { p.scutum.until = G.T + 3; Mi.shoot(ar2, p); for (let i = 0; i < 40; i++) F.step(1); } r.arrowSide = +(h1 - p.hp).toFixed(1); // (an arrow can miss: a few)
  for (const u of [f1, f2, f3, f4, ar1, ar2, ally, out]) { u.dead = true; u.hp = 0; }
  // no attacking; 70% pace; backing away facing front
  p.scutum.until = G.T + 3; p.cd = 0; F.attack(); r.attack = (p.swing || 0) > 0 || !!p.pending;
  const face0 = p.face, fx = Math.sin(p.face), fz = Math.cos(p.face), x0 = p.x, z0 = p.z;
  F.step(30, 1 / 30, { wx: -fx, wz: -fz, mag: 1 }); r.backOff = { d: +Math.hypot(p.x - x0, p.z - z0).toFixed(2), turned: +Math.abs(face0 - p.face).toFixed(2) };
  // an ult breaks it and lands at 30%
  const f6 = foe(2, 0); r.ult = blow(f6, p, { fixed: 100, ult: true }); r.broke = { on: !!p.scutum, cd: Math.round(A.cdLeft(me, 'sp2')) }; f6.dead = true;
  // pace: a second's walk without it
  reset(); F.step(10); { const x1 = p.x, z1 = p.z, gx = Math.sin(p.face), gz = Math.cos(p.face); F.step(30, 1 / 30, { wx: gx, wz: gz, mag: 1 }); const free = Math.hypot(p.x - x1, p.z - z1); reset(); F.ability(1); const x2 = p.x, z2 = p.z; F.step(30, 1 / 30, { wx: gx, wz: gz, mag: 1 }); r.pace = +(Math.hypot(p.x - x2, p.z - z2) / free).toFixed(2); }
  // tap again drops it; on its own it lasts 4 s
  reset(); F.ability(1); F.step(15); F.ability(1); r.tap = { on: !!p.scutum, cd: Math.round(A.cdLeft(me, 'sp2')) };
  reset(); F.ability(1); F.step(30 * 3.8); r.at38 = !!p.scutum; F.step(10); r.at42 = { on: !!p.scutum, cd: Math.round(A.cdLeft(me, 'sp2')) };
  // his men on Follow move into the zone behind him
  reset(); const A2 = await import('/src/core/sim/army.js'); A2.setOrder(me, 'follow');
  const mine = [0, 1, 2, 3, 4].map(i => { const [x, z] = at(5, (i - 2) * 1.5); const u = sim.mkUnit(me, x, z, i < 3 ? 'foot' : 'arch'); u.slot = i; return u; });
  F.ability(1); for (let i = 0; i < 75; i++) { p.vx = p.vz = 0; F.step(1); }
  const inZone = u => { const rx = u.x - p.x, rz = u.z - p.z, f = rx * Math.sin(p.face) + rz * Math.cos(p.face), s = rx * Math.cos(p.face) - rz * Math.sin(p.face); return f <= .4 && f >= -6 && Math.abs(s) <= 2.5; };
  r.shelter = mine.filter(inZone).length + '/' + mine.length;
  // from the saddle
  reset(); p.mounted = true; p.horse = { state: 'ridden', x: p.x, z: p.z }; p.horseHp = 200; r.saddleWhy = A.blocked(me, 'sp2'); F.ability(1); r.saddle = { on: !!p.scutum, mounted: p.mounted };
  const f5 = foe(2, 0); r.saddleFront = blow(f5, p); f5.dead = true;
  // a bot raises it with an enemy champion close and hurt
  reset(); L.gainXp(e, 900, 't'); G.teams[e].cds = { sp1: 99, sp2: 0, ult: 99, armyUlt: 0 }; let used = false;
  for (let i = 0; i < 150 && !used; i++) { if (E.mounted) sim.dismount(E, false); E.stun = 0; E.hp = E.max * .5; E.x = p.x + 3; E.z = p.z; p.hp = p.max; F.step(1); used = !!E.scutum; }
  r.bot = used;
  return r; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(o));
ok(o.lv1 === 'level' && o.lvl >= 5 && o.up.on && o.up.why === '', `locked at level 1; at level ${o.lvl} raised (tap again allowed)`);
ok(o.front === 0 && o.side > 15 && o.back > 15, `blows: front ${o.front}, side ${o.side}, back ${o.back}`);
ok(o.allyIn === 0 && o.allyOut > 15, `an ally behind him is covered (${o.allyIn}); one beside the zone isn't (${o.allyOut})`);
ok(o.arrowFront === 0 && o.arrowSide > 0, `arrows: front ${o.arrowFront}, side ${o.arrowSide}`);
ok(!o.attack, 'he can\'t attack');
ok(o.backOff.d > 1 && o.backOff.turned < .05, `backs away ${o.backOff.d} m still facing front`);
ok(Math.abs(o.pace - .7) < .08, `at ${o.pace} of his pace`);
ok(Math.abs(o.ult - 30) < 1 && !o.broke.on && o.broke.cd === 10, `an ult lands at ${o.ult} and breaks it (recharge ${o.broke.cd} s)`);
ok(!o.tap.on && o.tap.cd === 10, `tap again drops it (recharge ${o.tap.cd} s)`);
ok(o.at38 && !o.at42.on && o.at42.cd >= 9, `up to 4 s, then recharging (${o.at42.cd} s)`);
ok(+o.shelter.split('/')[0] >= 4, `his men on Follow in the zone: ${o.shelter}`);
ok(o.saddle.on && o.saddle.mounted && o.saddleFront === 0, 'from the saddle: raised, still mounted, blocks');
ok(o.bot, 'a computer Titus raises it');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
