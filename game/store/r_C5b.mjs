// C5b Sigrun's basic hits, at her rate (3 blows in 3/1.65 s). On foot: slash 27, slash 27, an overhead chop 40 over a
// 120° arc in front (all in it at full, none behind). On the wolf: claw 27, claw 27, bite 40 that slows 20% for 1 s;
// she rides on at a slowed pace meanwhile (no dead stop); the wolf strikes and the marks show. Joined: r_C5-join.mjs.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=sigrun&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const SETUP = async mounted => {
  const F = window.__fb, { G } = F, cap = await import('/src/core/sim/captain.js'), army = await import('/src/core/sim/army.js');
  if (G.T < 90) { G.T = 90; F.step(30); } // (after the break-out: CROWN.breakout)
  const me = G.teams[G.myTi].leader, S = await import('/src/core/state.js'), foe = G.teams.find(t => t.leader && !t.leader.dead && S.isEnemy(t.leader, me)).leader;
  for (const u of G.units) if (u !== me && u !== foe && !u.dead) { u.x = 900 + u.id; u.z = 900; }
  if (me.mounted && !mounted) army.dismount(me, false);
  if (!me.mounted && mounted) { const h = { id: ++G.horseN, x: me.x, z: me.z, face: 0, state: 'coming', rider: me, t: 0, spd: 0, ti: me.ti, fall: 1 }; G.horses.push(h); army.mountUp(me, h); }
  if (foe.mounted) army.dismount(foe, false);
  { const S2 = await import('/src/core/state.js'), h = G.layout.homes.find(h => h.c === S2.colorOf(me.ti)); me.x = h.x * .5; me.z = h.z * .5; } // (open ground, out of every home and away from the war chest)
  for (const u of [me, foe]) { u.shieldT = 0; u.shieldHp = null; } // (no home shield left on either)
  me.face = 0; foe.x = me.x; foe.z = me.z + 1.9; foe.face = Math.PI; foe.hp = foe.max = 5000; foe.human = false; me.st = 999;
  return { F, G, cap, me, foe };
};
// three presses, each as soon as the last blow's wait is over; the blows each one lands on the champion
const COMBO = `async (mounted) => { const { F, G, cap, me, foe } = await (${SETUP})(mounted); const hits = [], t0 = G.T; me.lastSwingT = -9; me.combo = 0; me.cd = 0; const real = Math.random; Math.random = () => .4; // (rnd(.9, 1.15) = 1)
  for (let i = 0; i < 3; i++) { foe.stun = 99; foe.guardT = 0; foe.blockT = 0; foe.x = me.x; foe.z = me.z + 1.9; foe.vx = foe.vz = 0; const h0 = foe.hp; me.cd = Math.max(0, me.cd); cap.captainAttack(me); const sk = me.swingKind;
    let n = 0; while ((me.cd > 0 || me.pending) && n++ < 200) { foe.x = me.x; foe.z = me.z + 1.9; F.step(1); } hits.push([+(h0 - foe.hp).toFixed(1), sk]); }
  Math.random = real; return { dmg: me.dmg, hits, took: +(G.T - t0).toFixed(2), slowK: foe.slowK, slowLeft: +((foe.slowUntil || 0) - G.T).toFixed(2) }; }`;
const foot = await page.evaluate(`(${COMBO})(false)`);
ok(Math.abs(foot.hits[0][0] / foot.dmg - 1) < .06 && Math.abs(foot.hits[1][0] / foot.dmg - 1) < .06 && Math.abs(foot.hits[2][0] / foot.hits[0][0] - 1.5) < .02, `on foot (her hit ${foot.dmg.toFixed(1)}: 27 at level 1): slash ${foot.hits[0][0]}, slash ${foot.hits[1][0]}, chop ${foot.hits[2][0]} (kinds ${foot.hits.map(h => h[1])})`);
ok(foot.hits[2][1] === 5, `the third is the overhead chop (swingKind ${foot.hits[2][1]})`);
ok(foot.took > 1.4 && foot.took < 2.4, `three blows in ${foot.took} s (3/1.65 = 1.82, the last one's wait included)`);
// the chop's arc: four men in front (spread to 55° each side), two behind and to the side: the front ones all at full
const arc = await page.evaluate(`(async () => { const { F, G, cap, me, foe } = await (${SETUP})(false); foe.x = 900; foe.z = 950;
  const S3 = await import('/src/core/state.js'), men = G.units.filter(u => !u.dead && !u.leader && S3.isEnemy(u, me) && !u.neutral).slice(0, 6), ang = [0, -.9, .9, .45, 2.2, Math.PI];
  men.forEach((m, i) => { m.x = me.x + Math.sin(ang[i]) * 1.9; m.z = me.z + Math.cos(ang[i]) * 1.9; m.hp = m.max = 500; m.stun = 99; m.guardT = 0; m.blockT = 0; m.guardUp = false; m.block = 0; m.shieldT = 0; m.shieldHp = null; m.kind = 'foot'; });
  me.face = 0; me.combo = 1; me.lastSwingT = G.T; me.cd = 0; cap.captainAttack(me);
  let n = 0; while (me.pending && n++ < 60) { men.forEach((m, i) => { m.x = me.x + Math.sin(ang[i]) * 1.9; m.z = me.z + Math.cos(ang[i]) * 1.9; }); F.step(1); }
  return men.map(m => +(500 - m.hp).toFixed(1)); })()`);
ok(arc.slice(0, 4).every(d => d > 30) && arc[4] === 0 && arc[5] === 0, `the chop: the 4 in its 120° arc take ${arc.slice(0, 4)}; beside and behind: ${arc.slice(4)}`);
// on the wolf
const wolf = await page.evaluate(`(${COMBO})(true)`);
ok(Math.abs(wolf.hits[0][0] / wolf.dmg - 1) < .06 && Math.abs(wolf.hits[1][0] / wolf.dmg - 1) < .06 && Math.abs(wolf.hits[2][0] / wolf.hits[0][0] - 1.5) < .02, `on the wolf: claw ${wolf.hits[0][0]}, claw ${wolf.hits[1][0]}, bite ${wolf.hits[2][0]}`);
ok(Math.abs(wolf.slowK - .8) < .01 && wolf.slowLeft > 0, `the bite slows him 20% (x${wolf.slowK}, ${wolf.slowLeft} s left)`);
ok(wolf.took > 1.4 && wolf.took < 2.4, `three strikes in ${wolf.took} s`);
const pace = await page.evaluate(`(async () => { const { F, G, cap, me, foe } = await (${SETUP})(true); const army = await import('/src/core/sim/army.js'); me.cd = 0; const s0 = army.speedOf(me); cap.captainAttack(me); const s1 = army.speedOf(me); F.step(20); return { s0, s1, s2: army.speedOf(me) }; })()`);
ok(pace.s1 > 0 && Math.abs(pace.s1 / pace.s0 - .7) < .02 && Math.abs(pace.s2 - pace.s0) < .01, `riding on while it strikes: ${pace.s0.toFixed(1)} → ${pace.s1.toFixed(1)} m/s, back to ${pace.s2.toFixed(1)}`);
// a real press on the wolf (the button: actions.attack), not only the rules' entry
const pr = await page.evaluate(async () => { const { G } = window.__fb, me = G.teams[G.myTi].leader; me.cd = 0; me.stun = 0; const n0 = me.lastSwingT; window.__fb.attack(); return { mounted: me.mounted, struck: me.lastSwingT !== n0 }; });
ok(pr.mounted && pr.struck, `the Attack button on the wolf strikes at once (${pr.struck})`);
// drawn: the wolf strikes, she leans, the marks light
const d = await page.evaluate(async () => { const { G } = window.__fb, cap = await import('/src/core/sim/captain.js'), H = await import('/src/render/heroes.js'), W = await import('/src/render/wolf.js'), X = await import('/src/render/sigrunfx.js');
  const me = G.teams[G.myTi].leader; window.__frame(40); // (the camera catches up with her new spot)
  me.cd = 0; me.combo = 1; me.lastSwingT = G.T; const w0 = H.wolfOf(me), ok0 = cap.captainAttack(me); const mv0 = w0 && w0.mv && w0.mv.name; window.__frame(4); const w = H.wolfOf(me); window.__dbg = { w0: !!w0, mv0, mounted: me.mounted, same: w0 === w, cd: me.cd, sk: me.swingKind };
  const r = { mv: w && w.mv && w.mv.name, lean: W.wolfLean(w) }; window.__frame(8); r.marks = X.sigrunMarks(); r.dbg = window.__dbg; return r; });
ok(d.mv === 'bite' && d.lean > .1 && d.marks > 0, `drawn: the wolf ${d.mv}s, she leans ${d.lean && d.lean.toFixed(2)}, ${d.marks} mark(s) lit`);
await page.screenshot({ path: '/tmp/c5/b_wolf.png' });
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
