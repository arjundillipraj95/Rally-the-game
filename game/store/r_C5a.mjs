// C5a Sigrun's page: inside the limits and budget; her numbers in battle (300 health, 27 a hit, 6.8 m/s, reach 1.6 on
// the wolf); her wolf (170 health, 12.2 m/s, drawn as the wolf with its own gait, head and tail; a hit makes it flinch
// and yelp, snarl on a heavy one); she recruits swordsmen and cavalry only (3 places to start) named her way, the top
// swordsmen bursting in; ?botchamp=sigrun; the lobby and Settings list her. The joined phone: r_C5-join.mjs.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=sigrun&botchamp=sigrun' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, lim = await import('/src/champions/limits.js'), reg = await import('/src/champions/index.js');
  const army = await import('/src/core/sim/army.js'), st = await import('/src/champions/stats.js'), A = await import('/src/champions/army.js'), match = await import('/src/core/sim/match.js');
  const d = reg.CHAMPS.sigrun, r = { bad: lim.checkChamp(d), budget: +(lim.budgetOf(d).total * 100).toFixed(1), ids: reg.CHAMP_IDS.join(), all: [...new Set(G.champs)].join() };
  G.T = 30; F.step(30);
  const me = G.teams[G.myTi].leader; r.hp = me.max; r.dmg = me.dmg; r.spd = me.spd; r.reachFoot = st.rideReach(me);
  r.horseMax = army.horseMax(G.myTi);
  // on the wolf
  const h = { id: ++G.horseN, x: me.x, z: me.z, face: 0, state: 'coming', rider: me, t: 0, spd: 0, ti: me.ti, fall: 1 }; G.horses.push(h); army.mountUp(me, h);
  r.reachRide = st.rideReach(me); r.ride = +(me.spd * army.mountMul(me)).toFixed(2);
  r.sword = A.unitRow(G.myTi, 'sword', 0).name; r.top = A.unitRow(G.myTi, 'sword', 2).name; r.burst = !!A.unitRow(G.myTi, 'sword', 2).burst; r.cav = A.unitRow(G.myTi, 'cav', 1).name;
  r.recruits = d.recruits.join(); r.foot = army.canRecruit ? 'n/a' : ''; r.start = match.armyPlaces ? null : null;
  return r;
});
ok(o.bad.length === 0, `her page inside the limits (budget ${o.budget}%) ${o.bad.join('; ')}`);
ok(/sigrun/.test(o.ids) && o.all === 'sigrun', `?botchamp=sigrun: every army plays her (${o.all})`);
ok(Math.round(o.hp) === 300 && Math.round(o.dmg) === 27 && Math.abs(o.spd - 6.8) < .01, `in battle: ${o.hp} health, ${o.dmg} a hit, ${o.spd} m/s`);
ok(o.horseMax === 170 && Math.abs(o.ride - 12.2) < .05, `her wolf: ${o.horseMax} health, ${o.ride} m/s`);
ok(o.reachFoot === 1.3 && o.reachRide === 1.6, `reach ${o.reachFoot} on foot, ${o.reachRide} on the wolf`);
ok(o.sword === 'Drengr' && o.top === 'Úlfheðnar' && o.burst && o.cav === 'Spear riders', `her men: ${o.sword} .. ${o.top} (burst ${o.burst}), ${o.cav}`);
// drawn as the wolf: its pivots, its gait, a hit
await frames(page, 20);
const w = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, H = await import('/src/render/heroes.js'), me = G.teams[G.myTi].leader, W = H.wolfOf(me);
  if (!W) return { wolf: false };
  const P = await import('/src/render/wolf.js'), legs = { gp: 0, hip: {}, knee: {} }; P.wolfPose(W, legs, 0, .03); const h0 = W.head.rotation.x;
  for (let k = 0; k < 30; k++) { legs.gp = (legs.gp + .05) % 1; P.wolfPose(W, legs, 11, .03); }
  const gal = W.head.rotation.x, tail = W.tail.rotation.x;
  const light = H.horseHit(me, me.face + 1, .7), heavy = H.horseHit(me, me.face, 1.5);
  return { wolf: true, h0, gal, tail, light, heavy };
});
ok(w.wolf, 'her mount is drawn as the wolf (head and tail pivots)');
ok(w.gal > w.h0 + .1 && w.tail > .2, `at a gallop its head drops (${w.h0 && w.h0.toFixed(2)} → ${w.gal && w.gal.toFixed(2)}) and its tail streams (${w.tail && w.tail.toFixed(2)})`);
ok(w.light === 'wolfYelp' && w.heavy === 'wolfSnarl', `hit, it yelps (${w.light}); hard, it snarls (${w.heavy})`);
// the Úlfheðnar burst in; she recruits swordsmen and cavalry, not spearmen or archers
const b = await page.evaluate(async () => {
  let r0; const F = window.__fb, { G } = F, army = await import('/src/core/sim/army.js'), cav = await import('/src/core/sim/cavalry.js'), s = G.teams[G.myTi];
  s.up = Object.assign(s.up || {}, { sw1: 1, sw2: 1 }); s.gold = 2000; for (const u of G.units) if (u.ti === G.myTi && !u.leader) u.dead = true;
  r0 = (await import('/src/core/state.js')).capOf(G.myTi);
  const tryR = k => { const n = G.units.filter(u => !u.dead && u.ti === G.myTi && u.kind === k).length; army.recruit && army.recruit(G.myTi, k); return G.units.filter(u => !u.dead && u.ti === G.myTi && u.kind === k).length - n; };
  const r = { foot: tryR('foot'), arch: tryR('arch'), sword: tryR('sword'), cap: r0 };
  const u = G.units.find(u => !u.dead && u.ti === G.myTi && u.kind === 'sword'); if (!u) return r;
  cav.setSword(u); r.burstOn = !!u.burst; const s0 = army.speedOf(u); cav.burstIn(u, 5); r.x = +(army.speedOf(u) / s0).toFixed(2);
  return r;
});
ok(b.foot === 0 && b.arch === 0 && b.sword === 1 && b.cap === 3, `recruits: swordsman ${b.sword}, spearman ${b.foot}, archer ${b.arch}; places ${b.cap}`);
ok(b.burstOn && b.x === 1.5, `an Úlfheðnar closing on a foe 5 m off bursts in at x${b.x}`);
// the lobby's grid and Settings list her
const l = await page.evaluate(async () => { const I = await import('/src/champions/index.js'); return { playable: I.playable('sigrun'), owned: I.owned('sigrun') }; });
ok(l.playable && l.owned, `playable and owned (free): ${JSON.stringify(l)}`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
