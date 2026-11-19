// C4: Devi, on the host (the joined phone: r_C4-join). Needs the game server. Checks: her page (300 health, 24 at 1.75,
// 14 m, recruits archers and stone throwers, Ranged); Piercing shot goes through a line (champion 50, soldiers 30, all
// slowed), a raised Shield of Cassius takes 30% and stops it; Evade: 5 m in 0.2 s, untouchable, mounted she stays on;
// Tiger's volley: 20 arrows into a champion for 160, about 1 in 4 through a raised shield; Arrow storm: a 2 s mark,
// then her archers' arrows land in the circle; her archer line: Agni Villalar's fire arrows x3 on a stone thrower, Vil
// Veeran 26 m and a fifth harder; a computer Devi uses her specials.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
async function battle(q) {
  const page = await open(browser, 844, 390, { q: '?crown2=1' + q });
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
  return page;
}
const A = await battle('&champ=devi&botchamp=titus');
const o = await A.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), Ab = await import('/src/core/sim/abilities.js'), Sc = await import('/src/core/sim/scutum.js');
  const I = await import('/src/champions/index.js'), Wd = await import('/src/core/world.js');
  G.T = 30; F.step(30);
  const me = G.myTi, s = G.teams[me], p = G.teams[me].leader, foe = (me + 1) % 4, r = {}, D = I.CHAMPS.devi; p.march = 0;
  r.page = { hp: p.max, champ: G.champs[me], recruits: D.recruits.join(), ranged: !!D.ranged };
  s.lvl = 7; s.xp = 1e4; s.cds = { sp1: 0, sp2: 0, ult: 0, armyUlt: 0 };
  const keep = G.units; G.units = [p]; p.x *= .6; p.z *= .6; // (open ground, out of her yard: a foe in it is put out)
  G.arrows = []; Object.assign(p, { mounted: false, vx: 0, vz: 0, stun: 0, cd: 0, y: Wd.groundY(p.x, p.z) });
  const at = (d, side = 0) => [p.x + Math.sin(p.face) * d + Math.cos(p.face) * side, p.z + Math.cos(p.face) * d - Math.sin(p.face) * side];
  const man = (d, side, leader) => { const [x, z] = at(d, side), u = sim.mkUnit(foe, x, z, 'foot'); u.y = Wd.groundY(x, z); if (leader) u.leader = true; u.max = u.hp = 1e5; u.face = p.face + Math.PI; u.windup = 1e9; return u; }; // (windup: his own feet stay put, so a mark between steps is where he stands)
  let pins = []; const pin = () => { for (const [u, x, z] of pins) { u.x = x; u.z = z; u.vx = u.vz = 0; } p.march = 0; }; const hold = (...us) => { pins = us.map(u => [u, u.x, u.z]); };
  const run = n => { for (let k = 0; k < n; k++) { F.step(1); pin(); } };
  const ready = () => { s.cds = { sp1: 0, sp2: 0, ult: 0, armyUlt: 0 }; p.stun = 0; p.cd = 0; };
  // Piercing shot: a champion at 8, soldiers at 4 and 12, all on her line
  const c1 = man(8, 0, true), s1 = man(4, 0), s2 = man(12, 0); hold(c1, s1, s2); ready();
  const aim = { x: c1.x, z: c1.z }; Ab.useAbility(me, 'sp1', aim); run(30);
  r.pierce = { champ: Math.round(c1.max - c1.hp), s1: Math.round(s1.max - s1.hp), s2: Math.round(s2.max - s2.hp), slowed: c1.slowUntil > G.T };
  G.units = [p];
  // ... into a raised Shield of Cassius at 8 (a soldier behind him at 12)
  const t1 = man(8, 0, true), b2 = man(12, 0); t1.face = Math.atan2(p.x - t1.x, p.z - t1.z); hold(t1, b2); Sc.raiseScutum(t1, I.CHAMPS.titus.sp2); ready();
  Ab.useAbility(me, 'sp1', { x: t1.x, z: t1.z }); run(30);
  r.pierceShield = { front: Math.round(t1.max - t1.hp), behind: Math.round(b2.max - b2.hp) }; Sc.dropScutum(t1); t1.dead = true; G.units = [p];
  // Evade: a tap, an enemy champion 3 m in front: she dashes 5 m away, untouchable for the dash
  const e1 = man(3, 0, true); hold(e1); ready(); const x0 = p.x, z0 = p.z; Ab.useAbility(me, 'sp2'); const ifr = p.iframeT;
  run(18); r.evade = { moved: +Math.hypot(p.x - x0, p.z - z0).toFixed(2), away: Math.hypot(p.x - e1.x, p.z - e1.z) > 3, ifr };
  G.units = [p];
  // Evade mounted: she stays on
  p.mounted = true; ready(); Ab.useAbility(me, 'sp2', { x: p.x + 5, z: p.z }); run(15); r.evadeMounted = p.mounted; p.mounted = false; p.vx = p.vz = 0;
  // Tiger's volley at a man 10 m off (pinned; a stand-in champion is moved by the step): 20 arrows of 8
  const v1 = man(10, 0); hold(v1); ready(); p.face = Math.atan2(v1.x - p.x, v1.z - p.z);
  Ab.useAbility(me, 'ult', { x: v1.x, z: v1.z, u: v1 }); run(170); r.volley = Math.round(v1.max - v1.hp);
  G.units = [p];
  // ... into a raised Shield of Cassius: about a quarter
  const v2 = man(10, 0); v2.face = Math.atan2(p.x - v2.x, p.z - v2.z); hold(v2); Sc.raiseScutum(v2, Object.assign({}, I.CHAMPS.titus.sp2, { up: 9 })); ready();
  Ab.useAbility(me, 'ult', { x: v2.x, z: v2.z, u: v2 }); run(170); r.volleyShield = Math.round(v2.max - v2.hp); Sc.dropScutum(v2); v2.dead = true; G.units = [p];
  // Arrow storm: her archers 15 m back, a group at 20 m
  const archers = []; for (let k = 0; k < 4; k++) { const [x, z] = at(-6, -3 + k * 2), a = sim.mkUnit(me, x, z, 'arch'); archers.push(a); }
  const g = []; for (let k = 0; k < 5; k++) g.push(man(20, -2 + k)); hold(...g, ...archers);
  s.rally = 100; ready(); const n0 = G.arrowN; Ab.useAbility(me, 'armyUlt', { x: g[2].x, z: g[2].z });
  run(100); r.stormWarn = { storms: (G.storms || []).length, arrows: G.arrowN - n0 }; run(260);
  r.storm = { arrows: G.arrowN - n0, hurt: g.filter(u => u.hp < u.max).length };
  G.units = [p];
  // her archer line
  const sh = await import('/src/champions/army.js');
  const row0 = sh.unitRow(me, 'arch', 0), row1 = sh.unitRow(me, 'arch', 1), row2 = sh.unitRow(me, 'arch', 2), base2 = (await import('/src/config.js')).ARCH_TIERS[2];
  r.line = { n0: row0.name, n1: row1.name, n2: row2.name, fire: !!row1.fireArrows, range2: row2.range, dmgX: +(row2.dmg / (base2.dmg * .8)).toFixed(2) };
  // fire arrows x3 on a stone thrower
  const thr = sim.mkUnit(foe, ...at(15), 'thrower'); hold(thr); const ar = sim.mkUnit(me, p.x, p.z, 'arch'); ar.fireArrows = true; const M = await import('/src/core/sim/missiles.js');
  const rnd0 = Math.random; Math.random = () => .5; // (the same hit both times)
  const h0 = thr.hp; M.arrowHit({ x0: ar.x, z0: ar.z, shooter: ar, ti: me, jd: 0 }, thr); const fired = h0 - thr.hp; ar.fireArrows = false; const h1 = thr.hp; M.arrowHit({ x0: ar.x, z0: ar.z, shooter: ar, ti: me }, thr); const plain = h1 - thr.hp; Math.random = rnd0;
  r.fireX = plain > 0 ? +(fired / plain).toFixed(1) : 0;
  G.units = keep;
  return r;
});
ok(o.page.hp === 300 && o.page.champ === 'devi' && o.page.recruits === 'arch,thrower' && o.page.ranged, `Devi: ${o.page.hp} health, recruits ${o.page.recruits}, ranged`);
ok(o.pierce.champ === 60 && o.pierce.s1 === 36 && o.pierce.s2 === 36 && o.pierce.slowed, `Piercing shot through a line at level 7 (+20%): champion ${o.pierce.champ}, soldiers ${o.pierce.s1} and ${o.pierce.s2}, slowed ${o.pierce.slowed}`);
ok(o.pierceShield.front > 0 && o.pierceShield.front < 20 && o.pierceShield.behind === 0, `into a raised Shield of Cassius: ${o.pierceShield.front} (30%), the man behind ${o.pierceShield.behind}`);
ok(o.evade.moved >= 4.5 && o.evade.moved <= 6 && o.evade.away && o.evade.ifr > 0, `Evade: ${o.evade.moved} m away from the champion, untouchable ${o.evade.ifr} s`);
ok(o.evadeMounted, `Evade on horseback: still mounted (${o.evadeMounted})`);
ok(o.volley === 184, `Tiger's volley into a man: ${o.volley} (20 x 8, +15% at level 7)`);
ok(o.volleyShield > 0 && o.volleyShield < 90, `Tiger's volley into a raised shield: ${o.volleyShield} (about a quarter through)`);
ok(o.stormWarn.storms === 1 && o.storm.arrows >= 12 && o.storm.hurt >= 2, `Arrow storm: marked (${o.stormWarn.storms}), ${o.storm.arrows} arrows, ${o.storm.hurt} of 5 hurt`);
ok(o.line.n0 === 'Villalar' && o.line.n1 === 'Agni Villalar' && o.line.n2 === 'Vil Veeran' && o.line.fire && o.line.range2 === 26 && o.line.dmgX === 1.2, `her archers: ${o.line.n0}, ${o.line.n1} (fire ${o.line.fire}), ${o.line.n2} ${o.line.range2} m x${o.line.dmgX}`);
ok(o.fireX === 3, `fire arrows on a stone thrower: x${o.fireX}`);
await A.close();
// a computer Devi uses her specials against a champion
const B = await battle('&champ=titus&botchamp=devi');
const b = await B.evaluate(async () => {
  const F = window.__fb, { G } = F; G.T = 30; F.step(30);
  const me = G.myTi, p = G.teams[me].leader, bt = (me + 1) % 4, s = G.teams[bt], q = s.leader;
  s.lvl = 7; s.cds = { sp1: 0, sp2: 0, ult: 0, armyUlt: 0 };
  G.units = [p, q]; q.x = p.x + Math.sin(p.face) * 10; q.z = p.z + Math.cos(p.face) * 10; Object.assign(q, { mounted: false, foe: p, fd: 10, rt: 9 }); p.hp = p.max;
  const used = new Set(); for (let k = 0; k < 60 * 8; k++) { F.step(1); for (const kk of ['sp1', 'sp2', 'ult']) if ((s.cds[kk] || 0) > 0) used.add(kk); p.hp = p.max * .65; }
  return [...used].join(',');
});
ok(b.split(',').filter(Boolean).length >= 2, `a computer Devi used: ${b}`);
await B.close(); await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
