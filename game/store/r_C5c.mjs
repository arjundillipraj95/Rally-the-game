// C5c Pounce (level 3, 7 s): tap, the nearest enemy; drag, the one nearest the spot. 5 m on foot, 8 m on the wolf; a
// 0.15 s crouch and a 0.3 s low arc onto one target (following him). 45 to a champion, 30 to a soldier, +5% a level from
// 3; a rider's horse takes it first; a kill halves the recharge; nobody past its reach. Drawn: the wolf pounces and
// bites, the ring and the landing marks. Joined phone: r_C5-join.mjs.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=sigrun&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
// her alone on open ground at level `lv`, mounted or not; an enemy champion and a soldier where asked (m ahead, m across)
const SET = `async ({ mount, lv, champAt, manAt, manHp }) => {
  const F = window.__fb, { G } = F, S = await import('/src/core/state.js'), army = await import('/src/core/sim/army.js'), L = await import('/src/core/sim/levels.js'), st = await import('/src/champions/stats.js');
  if (G.T < 30) { G.T = 30; F.step(30); }
  const me = G.teams[G.myTi].leader; while ((G.teams[G.myTi].lvl || 1) < lv) L.gainXp(G.myTi, 50, 'test');
  const foe = G.teams.find(t => t.leader && !t.leader.dead && S.isEnemy(t.leader, me)).leader, man = G.units.find(u => !u.dead && !u.leader && S.isEnemy(u, me) && !u.neutral);
  for (const u of G.units) if (u !== me && !u.dead) { u.x = 900 + u.id; u.z = 900; u.vx = u.vz = 0; }
  const h = G.layout.homes.find(h => h.c === S.colorOf(me.ti)); me.x = h.x * .5; me.z = h.z * .5; me.face = 0; me.cd = 0; me.stun = 0;
  if (me.mounted && !mount) army.dismount(me, false); if (!me.mounted && mount) { const hh = { id: ++G.horseN, x: me.x, z: me.z, face: 0, state: 'coming', rider: me, t: 0, spd: 0, ti: me.ti, fall: 1 }; G.horses.push(hh); army.mountUp(me, hh); }
  if (foe.mounted) army.dismount(foe, false);
  for (const [u, p, hp] of [[foe, champAt, 3000], [man, manAt, manHp || 500]]) if (p) Object.assign(u, { x: me.x + p[1], z: me.z + p[0], hp, max: Math.max(hp, 500), stun: 30, cd: 30, pending: null, shieldT: 0, shieldHp: null, guardT: 0, blockT: 0, guardUp: false, block: 0 });
  for (const u of [me]) { u.shieldT = 0; u.shieldHp = null; }
  const cds = G.teams[G.myTi].cds || (G.teams[G.myTi].cds = {}); cds.sp1 = 0;
  window.__T = { me, foe, man }; return { lv: G.teams[G.myTi].lvl };
}`;
const GO = `async ({ aim, steps = 25 }) => { const F = window.__fb, { G } = F, A = await import('/src/core/sim/abilities.js'), { me, foe, man } = window.__T;
  const f0 = foe.hp, m0 = man.hp, h0 = foe.horse ? foe.horseHp : null, fired = A.useAbility(G.myTi, 'sp1', aim || undefined), P = me.pounce;
  const r = { fired, tg: P && P.tg ? (P.tg === foe ? 'champ' : P.tg === man ? 'man' : 'other') : null, air: 0 };
  for (let i = 0; i < steps; i++) { for (const u of [foe, man]) { u.stun = 30; u.cd = 30; } F.step(1); if (me.jy > .05) r.air++; }
  return Object.assign(r, { champ: +(f0 - foe.hp).toFixed(1), man: +(m0 - man.hp).toFixed(1), cd: +(G.teams[G.myTi].cds.sp1 || 0).toFixed(2), d: +Math.hypot(me.x - foe.x, me.z - foe.z).toFixed(2), manDead: man.dead || man.hp <= 0 }); }`;
const run = async (set, go) => { await page.evaluate(`(${SET})(${JSON.stringify(set)})`); return page.evaluate(`(${GO})(${JSON.stringify(go || {})})`); };
let r = await run({ mount: false, lv: 3, champAt: [4.5, 0], manAt: [3.2, 1] });
ok(r.fired && r.tg === 'man' && Math.abs(r.man - 30) < .6 && r.air > 3 && r.air < 14, `on foot, tap: the nearest enemy (${r.tg}), ${r.man} to the soldier, ${r.air} steps in the air`);
// drag: the spot by the champion (the soldier is nearer her)
r = await page.evaluate(`(async () => { await (${SET})({ mount: false, lv: 3, champAt: [4.5, 0], manAt: [3.2, 1.5] }); const { foe } = window.__T; return (${GO})({ aim: { x: foe.x + .5, z: foe.z } }); })()`);
ok(r.tg === 'champ' && Math.abs(r.champ - 59.4) < .6 && r.d < 3, `(BAL1: 2x her blow at level 3) drag onto the champion past a nearer soldier: ${r.champ} to him, landed ${r.d} m from him`);
ok(Math.abs(r.cd - (7 - 25 / 30)) < .1, `recharge 7 s (${r.cd} s left after the leap)`);
r = await run({ mount: false, lv: 3, champAt: [6.5, 0] });
ok(r.tg === null && r.champ === 0, `on foot, nobody within 5 m: no target (a champion 6.5 m off untouched: ${r.champ})`);
r = await run({ mount: true, lv: 3, champAt: [7.5, 0] });
ok(r.tg === 'champ' && Math.abs(r.champ - 59.4) < .6, `on the wolf, tap: a champion 7.5 m off, ${r.champ} to him`);
r = await run({ mount: true, lv: 5, champAt: [6, 0] });
ok(Math.abs(r.champ - 64.8) < .6, `(BAL1) it grows with her blow: ${r.champ} at level 5 (64.8)`);
r = await run({ mount: false, lv: 3, manAt: [3, 0], manHp: 20 });
ok(r.manDead && r.cd <= .5, `(FEEL6) a kill: ready again in 0.5 s (${r.cd} s left)`);
// a rider: his horse first
r = await page.evaluate(`(async () => { await (${SET})({ mount: false, lv: 3, champAt: [4, 0] }); const { G } = window.__fb, army = await import('/src/core/sim/army.js'), { foe } = window.__T;
  const hh = { id: ++G.horseN, x: foe.x, z: foe.z, face: 0, state: 'coming', rider: foe, t: 0, spd: 0, ti: foe.ti, fall: 1 }; G.horses.push(hh); army.mountUp(foe, hh); foe.horseHp = army.horseMax(foe.ti); const h0 = foe.horseHp;
  const r = await (${GO})({}); r.horse = +(h0 - foe.horseHp).toFixed(1); return r; })()`);
ok(r.horse >= 44 && r.champ === 0, `on a rider: his horse takes it (${r.horse}), he doesn't (${r.champ})`);
// drawn: the wolf pounces, then bites; the ring and the marks
const d = await page.evaluate(`(async () => { await (${SET})({ mount: true, lv: 3, champAt: [7, 0] }); window.__frame(40); const { G } = window.__fb, A = await import('/src/core/sim/abilities.js'), H = await import('/src/render/heroes.js'), X = await import('/src/render/sigrunfx.js'), { me } = window.__T;
  A.useAbility(G.myTi, 'sp1'); window.__frame(3); const W = H.wolfOf(me), a = W && W.mv && W.mv.name; window.__frame(12); const b = W && W.mv && W.mv.name; return { a, b, marks: X.sigrunMarks() }; })()`);
ok(d.a === 'pounce' && d.b === 'bite' && d.marks >= 2, `drawn: the wolf ${d.a}s, then ${d.b}s; ${d.marks} marks`);
await page.screenshot({ path: '/tmp/c5/c_pounce.png' });
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
