// C3b Ram of Cassius on the host: locked until level 3; tap rushes the way he faces, 0.15 s wind-up then 5 m; soldiers
// in the path take 20 (+5% a level from 3), stumble 0.3 s and are shoved aside, not forward; the first enemy champion
// takes 35, knocked back 2 m, stunned 0.5 s, and the rush ends on him; into a rock 70 and 1 s; a rock stops the rush
// itself; a braced spear line stops it and its front takes the damage (he takes none); from the saddle 8 m, still
// mounted, and braced spears hit the horse; 6 s recharge; a bot uses it. The joined phone's is r_C3b-join.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, A = await import('/src/core/sim/abilities.js'), L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'), N = await import('/src/core/nav.js');
  G.T = 30; F.step(1); const me = G.myTi, p = G.teams[me].leader, r = {};
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader;
  r.lv1 = A.blocked(me, 'sp1');
  const cw = G.layout.cwalls.find(c => c.obs.some(o => o.cwall && o.cgate == null)), wob = cw.obs.find(o => o.cwall && o.cgate == null && !o.gate);
  const ox = (wob.x - cw.x) / Math.hypot(wob.x - cw.x, wob.z - cw.z), oz = (wob.z - cw.z) / Math.hypot(wob.x - cw.x, wob.z - cw.z), out = v => [wob.x + ox * v, wob.z + oz * v], inward = Math.atan2(-ox, -oz);
  const base = () => { [p.x, p.z] = out(14); p.face = inward + Math.PI; };
  L.gainXp(me, 420, 't'); r.lvl = G.teams[me].lvl; const k = 1 + .05 * Math.max(0, r.lvl - 3); r.k = k;
  const ready = () => { for (let i = 0; i < 120 && (p.duelId || p.execT > 0 || p.ram || p.eagle); i++) F.step(1); base(); p.hp = p.max; p.cd = 9; p.atkBuf = 0; G.teams[me].cds.sp1 = 0; p.stun = 0; p.iframeT = 0; p.marchT = 0; p.shieldT = 0; p.armour = 0; p.vx = p.vz = 0; };
  const keep = []; const hold = () => { for (const [u, x, z] of keep) { u.x = x; u.z = z; u.vx = u.vz = 0; } };
  const watch = (us, n, each) => { const h = us.map(u => ({ hp: u.hp, x: u.x, z: u.z, first: null })); for (let i = 0; i < n; i++) { F.step(1); if (each) each(); us.forEach((u, j) => { const w = h[j]; if (w.first == null && u.hp < w.hp - .01) w.first = { dmg: +(w.hp - u.hp).toFixed(1), stun: +u.stun.toFixed(2), dx: u.x - w.x, dz: u.z - w.z }; w.hp = u.hp; w.x = u.x; w.z = u.z; }); } return h.map(w => w.first || { dmg: 0, stun: 0, dx: 0, dz: 0 }); };
  const at = (d, s = 0) => [p.x + Math.sin(p.face) * d + Math.cos(p.face) * s, p.z + Math.cos(p.face) * d - Math.sin(p.face) * s];
  const rel = u => { const dx = u.x - p.x, dz = u.z - p.z; return { f: dx * Math.sin(p.face) + dz * Math.cos(p.face), s: dx * Math.cos(p.face) - dz * Math.sin(p.face) }; };
  const away = () => { for (const u of G.units) if (!u.dead && u !== p && u !== E && !u.testMe && Math.hypot(u.x - p.x, u.z - p.z) < 14) { if (u.leader) { u.x += 40; u.z += 40; } else { u.dead = true; u.hp = 0; } } };
  const stage = () => { if (p.mounted) sim.dismount(p, false); away(); E.x += 0; E.shieldT = 0; E.iframeT = 0; E.marchT = 0; E.armour = 0; E.hp = E.max; E.stun = 0; if (E.mounted) sim.dismount(E, false); E.horseCd = 99; };
  // 1. two archers in his path, nothing else: the rush runs its 5 m
  stage(); ready(); E.x = p.x + 60; E.z = p.z; keep.length = 0;
  const archers = [[2, .25], [3.5, -.25]].map(([d, s]) => { const [x, z] = at(d, s); const u = sim.mkUnit(e, x, z, 'arch'); u.hp = u.max = 300; u.face = p.face + Math.PI; return u; });
  const a0 = archers.map(u => ({ hp: u.hp, ...rel(u) })), x0 = p.x, z0 = p.z;
  F.ability(0); r.cd = Math.round(A.cdLeft(me, 'sp1'));
  F.step(3); r.wind = +Math.hypot(p.x - x0, p.z - z0).toFixed(2);
  const f0 = p.face, got = watch(archers, 15); r.ran = +Math.hypot(p.x - x0, p.z - z0).toFixed(2); r.ramOn = !!p.ram;
  r.arch = archers.map((u, i) => { const q = rel(u); return { dmg: got[i].dmg, side: +(Math.abs(q.s) - Math.abs(a0[i].s)).toFixed(2), fwd: +(got[i].dx * Math.sin(f0) + got[i].dz * Math.cos(f0)).toFixed(2), stun: got[i].stun }; });
  r.again = A.blocked(me, 'sp1');
  for (const u of archers) { u.dead = true; u.hp = 0; }
  // 2. the enemy champion 3 m ahead: 35, knocked back 2 m, stunned, the rush ends on her
  F.step(30 * 7); stage(); ready(); [E.x, E.z] = at(3); E.face = p.face + Math.PI; const e0 = { hp: E.hp, x: E.x, z: E.z }, x1 = p.x, z1 = p.z, f1 = p.face;
  E.hurt = null; F.ability(0); let ran = 0, first = null; const [g] = watch([E], 18, () => { if (!p.ram && !ran) ran = Math.hypot(p.x - x1, p.z - z1); if (!first && E.hurt && E.hurt.by === p.id && E.hurt.T === G.T && !p.ram) first = E.hurt; if (!first) E.iframeT = 0; p.cd = 9; });
  r.champ = { dmg: first ? +first.dmg.toFixed(1) : 0, back: +(g.dx * Math.sin(f1) + g.dz * Math.cos(f1)).toFixed(2), stun: g.stun, ran: +ran.toFixed(2) };
  // 3. a castle wall: stand her 1 m before it and him 3 m before her
  r.rock = true;
  { F.step(30 * 7); stage(); ready(); [E.x, E.z] = out(wob.r + (E.r || .5) + 1); [p.x, p.z] = out(wob.r + (E.r || .5) + 4.2); p.face = inward; E.face = inward + Math.PI;
    const ex = E.x, ez = E.z, eh = E.hp; F.ability(0); E.hurt = null; let g2 = null; for (let i = 0; i < 20 && !g2; i++) { F.step(1); if (E.hurt && E.hurt.by === p.id) g2 = { dmg: +E.hurt.dmg.toFixed(1), stun: +E.stun.toFixed(2) }; else { E.x = ex; E.z = ez; E.vx = E.vz = 0; E.iframeT = 0; E.swing = 0; } } r.wall = g2 || { dmg: 0, stun: 0 }; // (his blow: castle arrows land on her too)
    F.step(30 * 7); stage(); ready(); E.x = p.x + 60; [p.x, p.z] = out(wob.r + 3); p.face = inward; F.ability(0); F.step(20);
    r.stopRock = { gap: +(Math.hypot(p.x - wob.x, p.z - wob.z) - wob.r).toFixed(2), ram: !!p.ram }; }
  // 4. a braced spear line 3 m ahead, facing him
  F.step(30 * 7); stage(); ready(); E.x = p.x + 60; keep.length = 0; const x2b = p.x, z2b = p.z;
  const A2 = await import('/src/core/sim/army.js');
  const line = [0, 1, 2].map(i => { const [x, z] = at(3, (i - 1) * .7); const u = sim.mkUnit(e, x, z, 'foot'); u.hp = u.max = 300; u.face = p.face + Math.PI; u.vx = u.vz = 0; u.rest = true; return u; }); // (standing at their posts)
  const l0 = line.map(u => u.hp), hp0 = p.hp, x2 = p.x, z2 = p.z; r.lineAt = 3; r.braced = line.map(u => A2.braced(u) ? 1 : 0).join('');
  F.ability(0); let bran = 0; const lg = watch(line, 20, () => { if (!p.ram && !bran) bran = Math.hypot(p.x - x2, p.z - z2); });
  r.brace = { ran: +bran.toFixed(2), dmg: lg.map(g => g.dmg).join('/'), stun: lg.map(g => g.stun).join('/'), me: +(hp0 - p.hp).toFixed(1) };
  for (const u of line) { u.dead = true; u.hp = 0; }
  // 5. from the saddle: 8 m and still mounted; then into a braced line, the horse takes it
  F.step(30 * 7); stage(); ready(); E.x = p.x + 60; p.mounted = true; p.horse = { state: 'ridden', x: p.x, z: p.z }; p.horseHp = 200; const x3 = p.x, z3 = p.z;
  F.ability(0); F.step(24); r.saddle = { ran: +Math.hypot(p.x - x3, p.z - z3).toFixed(2), mounted: p.mounted };
  F.step(30 * 7); ready(); p.mounted = true; p.horse = { state: 'ridden', x: p.x, z: p.z }; p.horseHp = 200; keep.length = 0;
  const line2 = [0, 1, 2].map(i => { const [x, z] = at(3, (i - 1) * .7); const u = sim.mkUnit(e, x, z, 'foot'); u.face = p.face + Math.PI; u.vx = u.vz = 0; u.rest = true; return u; });
  F.ability(0); F.step(20); r.horse = { hp: +p.horseHp.toFixed(1), mounted: p.mounted, dmg: line2[0].dmg };
  for (const u of line2) { u.dead = true; u.hp = 0; }
  // 6. a bot at level 3, his enemy champion 3 m ahead
  if (p.mounted) sim.dismount(p, false);
  L.gainXp(e, 420, 't'); G.teams[e].cds = { sp1: 0, sp2: 0, ult: 0, armyUlt: 0 }; let used = false;
  for (let i = 0; i < 150 && !used; i++) { if (E.mounted) sim.dismount(E, false); E.stun = 0; if (!E.ram) { E.x = p.x + 3; E.z = p.z; } p.hp = p.max; F.step(1); used = !!E.ram || A.cdLeft(e, 'sp1') > 0; }
  r.bot = used;
  return r; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(o));
const w = (v, a, t = 1.5) => Math.abs(v - a) < t;
ok(o.lv1 === 'level' && o.lvl >= 3 && o.cd === 6, `locked at level 1; at level ${o.lvl} it fires, recharge ${o.cd} s`);
ok(o.wind < .05 && w(o.ran, 5, .3) && !o.ramOn, `wind-up in place (${o.wind} m), then ${o.ran} m`);
ok(o.arch.every(a => w(a.dmg, 20 * o.k) && a.stun > .2 && a.side > .3 && a.fwd < .6), `soldiers in the path: ${o.arch.map(a => a.dmg + ' dmg, ' + a.side + ' m aside, ' + a.fwd + ' m on').join('; ')}, stumbling`);
ok(o.again === 'cd', `then recharging (${o.again})`);
ok(w(o.champ.dmg, 35 * o.k) && w(o.champ.back, 2, .6) && o.champ.stun > .4 && o.champ.ran < 4.5, `the champion: ${o.champ.dmg}, back ${o.champ.back} m, stunned ${o.champ.stun} s, the rush ends at ${o.champ.ran} m`);
ok(o.rock && w(o.wall.dmg, 70 * o.k) && o.wall.stun > .9, `into a castle wall: ${o.rock && o.wall.dmg}, stunned ${o.rock && o.wall.stun} s`);
ok(o.rock && o.stopRock.gap < 1.2 && !o.stopRock.ram, `a wall stops the rush (${o.rock && o.stopRock.gap} m from it)`);
ok(o.brace.ran < o.lineAt && o.brace.dmg.split('/').filter(v => w(+v, 20 * o.k)).length >= 2 && o.brace.me === 0, `a braced line (${o.braced}, at ${o.lineAt} m) stops it at ${o.brace.ran} m; its front takes ${o.brace.dmg}; he takes ${o.brace.me}`);
ok(w(o.saddle.ran, 8, .4) && o.saddle.mounted, `from the saddle: ${o.saddle.ran} m, still mounted`);
ok(o.horse.hp < 200 - o.horse.dmg * 1.2 * 2 + 1, `braced spears hit the horse (${o.horse.hp} of 200 left)`);
ok(o.bot, 'a computer Titus uses it');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
