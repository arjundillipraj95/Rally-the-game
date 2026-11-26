// C3d Eagle's fall on the host: locked until level 7; a 0.2 s crouch, an arc about 3 m high, the slam at 1 s; 100 to an
// enemy champion in the circle, 40 to a soldier who goes down 1 s, allies there shield-up (20% less) for 4 s; in the air
// he takes half and a stun doesn't stop him; a champion who walks out of the circle takes nothing and he lands on the
// spot; 60 s recharge; from the saddle he leaps off; a bot uses it. The joined phone's is r_C3d-join.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, A = await import('/src/core/sim/abilities.js'), L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'), M = await import('/src/core/sim/melee.js');
  G.T = 30; F.step(1); const me = G.myTi, P = () => G.teams[me].leader, r = {};
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader;
  r.lv1 = A.blocked(me, 'ult');
  L.gainXp(me, 2600, 't'); r.lvl = G.teams[me].lvl; r.want = 100 * (1 + .05 * (r.lvl - 7));
  // stage: Titus on open ground, an enemy champion 8 m ahead, an enemy footman and one of his own beside her
  const p = P(); if (p.mounted) sim.dismount(p, false); p.vx = p.vz = 0;
  const put = (u, d, s = 0) => { if (u.mounted) sim.dismount(u, false); u.x = p.x + Math.sin(p.face) * d + Math.cos(p.face) * s; u.z = p.z + Math.cos(p.face) * d - Math.sin(p.face) * s; u.vx = u.vz = 0; u.stun = 0; };
  const hold = [];
  const freeze = () => { for (const [u, x, z] of hold) { u.x = x; u.z = z; u.vx = u.vz = 0; u.hp = Math.max(u.hp, 1); } };
  put(E, 8); E.hp = E.max; E.armour = 0; E.shieldT = p.shieldT = 0; p.armour = 0;
  const f = sim.mkUnit(e, 0, 0, 'foot'); put(f, 8, 1.5); f.hp = f.max = 500;
  const al = sim.mkUnit(me, 0, 0, 'foot'); put(al, 8, -1.5);
  for (const u of [E, f, al]) hold.push([u, u.x, u.z]);
  const x0 = p.x, z0 = p.z, hpE = E.hp, hpF = f.hp;
  r.fire = F.ability(2); r.cd = Math.round(A.cdLeft(me, 'ult'));
  F.step(3); freeze(); r.crouch = { moved: +Math.hypot(p.x - x0, p.z - z0).toFixed(2), jy: +(p.jy || 0).toFixed(2), busy: !!p.eagle && (F.attack(), p.swing || 0) === 0 };
  F.step(15); freeze(); r.mid = { jy: +(p.jy || 0).toFixed(2), d: +Math.hypot(p.x - x0, p.z - z0).toFixed(2) };
  p.iframeT = 0; p.marchT = 0; const h0 = p.hp; M.hit(E, p, 1, { fixed: 40, unblockable: true, unparryable: true }); r.airHit = +(h0 - p.hp).toFixed(1); p.stun = 1.5;
  let peak = 0; for (let k = 0; k < 14; k++) { F.step(1); freeze(); peak = Math.max(peak, p.jy || 0); }
  r.land = { dE: +(hpE - E.hp).toFixed(1), dF: +(hpF - f.hp).toFixed(1), fStun: +f.stun.toFixed(2), guard: !!(al.fxT && al.fxT.eagleGuard > G.T), me: !!(p.fxT && p.fxT.eagleGuard > G.T), atSpot: +Math.hypot(p.x - E.x, p.z - E.z).toFixed(2), eagle: !!p.eagle };
  F.step(6); r.after = { eagle: !!p.eagle, act: p.act ? p.act.name : '', jy: +(p.jy || 0).toFixed(2) };
  const g0 = al.hp; M.hit(f, al, 1, { fixed: 50, unblockable: true, unparryable: true }); r.guardHit = +(g0 - al.hp).toFixed(1);
  r.again = A.blocked(me, 'ult');
  // the second: she walks out of the circle while he is in the air (FEEL2c: the circle follows her through the crouch)
  G.teams[me].cds.ult = 0; hold.length = 0; f.x += 40; f.vx = f.vz = 0; p.stun = 0; put(E, 8); E.hp = E.max; const hpE2 = E.hp; F.ability(2); let spot = p.eagle && { x: p.eagle.x, z: p.eagle.z };
  F.step(14); spot = p.eagle && { x: p.eagle.x, z: p.eagle.z }; put(E, 8, 6); hold.push([E, E.x, E.z]); for (let k = 0; k < 36; k++) { F.step(1); freeze(); } r.dodge = { dE: +(hpE2 - E.hp).toFixed(1), out: +Math.hypot(E.x - spot.x, E.z - spot.z).toFixed(1), onSpot: +Math.hypot(p.x - spot.x, p.z - spot.z).toFixed(2) };
  // from the saddle
  G.teams[me].cds.ult = 0; hold.length = 0; p.stun = 0; p.mounted = true; p.horse = { state: 'ridden', x: p.x, z: p.z }; put(E, 7); const why = A.blocked(me, 'ult'); F.ability(2); r.saddle = { why, mounted: p.mounted, eagle: !!p.eagle }; F.step(40);
  // a bot at level 7, his enemy champion 7 m away
  L.gainXp(e, 2600, 't'); E.stun = 0; E.duelId = null; G.teams[e].cds = { sp1: 0, sp2: 0, ult: 0, armyUlt: 0 }; let used = false;
  for (let k = 0; k < 150 && !used; k++) { if (E.mounted) sim.dismount(E, false); if (!E.eagle) { E.x = p.x + 7; E.z = p.z; } p.hp = p.max; F.step(1); used = !!E.eagle || A.cdLeft(e, 'ult') > 0; }
  r.bot = used; r.botWhy = A.blocked(e, 'ult') + ' ' + G.teams[e].lvl + ' ' + (E.foe ? (E.foe.leader ? 'champ' : E.foe.kind) : 'none');
  return r; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(o));
ok(o.lv1 === 'level' && o.lvl >= 7 && o.cd > 0, `locked at level 1, fires at level ${o.lvl}`);
ok(o.cd === 60, `recharge ${o.cd} s`);
ok(o.crouch.moved < .05 && o.crouch.jy < .05 && o.crouch.busy, `crouch: in place (${o.crouch.moved} m), no sword swing meanwhile`);
ok(o.mid.jy > 2.6 && o.mid.d > 3, `mid-air: ${o.mid.jy} m up, ${o.mid.d} m along`);
ok(o.airHit > 18 && o.airHit < 22, `a 40 blow in the air takes ${o.airHit}`);
ok(Math.abs(o.land.dE - o.want) < 1.5, `landing: the enemy champion takes ${o.land.dE} (100 +5% a level from 7: ${o.want})`);
ok(o.land.dF > 38 && o.land.dF < 42 && o.land.fStun > .85, `a soldier takes ${o.land.dF} and is down ${o.land.fStun} s`);
ok(o.land.guard && o.land.me && o.guardHit > 38 && o.guardHit < 42, `allies shield-up: a 50 blow takes ${o.guardHit}`);
ok(o.land.atSpot < 1.2, `a stun in the air doesn't stop him: he lands on her (${o.land.atSpot} m)`);
ok(!o.after.eagle && o.after.act === '' && o.after.jy === 0, 'on his feet again at 1.2 s');
ok(o.again === 'cd', `then recharging (${o.again})`);
ok(o.dodge.dE === 0 && o.dodge.out > 4 && o.dodge.onSpot < .1, `she walks out (${o.dodge.out} m): nothing, and he lands on the spot (${o.dodge.onSpot} m)`);
ok(!o.saddle.mounted && o.saddle.eagle, 'from the saddle: a leap off the horse');
ok(o.bot, `a computer Titus uses it on a champion (${o.botWhy})`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
