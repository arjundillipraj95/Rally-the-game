// FEEL6 (Arjun 26 Nov) Sigrun's feel, the host's rules: her third blow a two-handed overhead chop that staggers him a
// step; Pounce a sure hit (follows him wherever he runs, an Evade doesn't dodge it; a kill: ready in 0.5 s); Spin pushes
// enemies out each tick and she spins through soldiers; the Hunt on a champion healed above 20% hits 5x her blow; the
// snout knocks enemies aside out of its path. Look: store/shot_FEEL6.mjs. Run from game/.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 851, 393, { q: '?crown2=1&champ=sigrun', quality: 'low' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await frames(page, 30);
const r = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), S = await import('/src/core/sim/sigrun.js'), V = await import('/src/core/sim/svin.js');
  const C = await import('/src/champions/index.js'), st = await import('/src/core/state.js'), stats = await import('/src/champions/stats.js');
  const me = G.player, d = C.champOf(me.ti), o = {}, e = [1, 2, 3].map(k => (me.ti + k) % 4).find(t => st.isEnemyTi(me.ti, t));
  me.mounted = false; G.teams[me.ti].lvl = 7; stats.applyChamp(me); me.hp = me.max = 1e5; for (const s of G.teams) if (s) s.thinkT = 1e9;
  const clear = () => G.units.forEach(u => { if (u !== me && !u.dead && Math.hypot(u.x - me.x, u.z - me.z) < 40) { u.x += 400; u.z += 400; } });
  const foe = sim.mkUnit(e, 0, 0, 'captain'); foe.max = foe.hp = 5000;
  const put = (u, m, side = 0) => { u.x = me.x + Math.sin(me.face) * m + Math.cos(me.face) * side; u.z = me.z + Math.cos(me.face) * m - Math.sin(me.face) * side; u.vx = u.vz = 0; u.dead = false; };
  // 1. the third blow
  clear(); put(foe, 1.3); foe.stun = 0; const pend = [];
  for (let k = 0; k < 3; k++) { me.cd = 0; me.stun = 0; S.wolfStrike(me); pend.push({ ...me.pending }); me.lastSwingT = G.T; me.pending = null; }
  o.third = { stun: pend[2].stun, kb: pend[2].kb, first: pend[0].stun || 0, clip: (d.look.swings || {})[4] };
  // 2. Pounce: he runs, he evades; it lands
  clear(); put(foe, 4); foe.hp = foe.max; foe.stun = 0; S.startPounce(me, { x: foe.x, z: foe.z }, d.sp1); let tgt = me.pounce.tg === foe;
  const h0 = foe.hp; for (let k = 0; k < 30 && me.pounce; k++) { foe.x += Math.sin(me.face) * .25; foe.z += Math.cos(me.face) * .25; foe.iframeT = .5; F.step(1); }
  o.pounce = { tgt, hurt: Math.round(h0 - foe.hp), gap: +Math.hypot(foe.x - me.x, foe.z - me.z).toFixed(2), want: Math.round(stats.moveHit(me, 'sp1', true)) };
  // a kill: ready again in 0.5 s
  clear(); const man = sim.mkUnit(e, 0, 0, 'foot'); put(man, 3); man.hp = 1; man.max = 100; G.teams[me.ti].cds = G.teams[me.ti].cds || {}; G.teams[me.ti].cds.sp1 = d.sp1.cd;
  S.startPounce(me, { x: man.x, z: man.z }, d.sp1); for (let k = 0; k < 30 && me.pounce; k++) F.step(1); o.killCd = +(G.teams[me.ti].cds.sp1 || 0).toFixed(2);
  // 3. Spin: pushes men out, she moves through soldiers
  clear(); const ring = []; for (let k = 0; k < 4; k++) { const m = sim.mkUnit(e, 0, 0, 'foot'); m.max = m.hp = 5000; put(m, 1.2 * Math.cos(k * 1.57), 1.2 * Math.sin(k * 1.57)); m.stun = 9; ring.push(m); }
  const r0 = ring.map(m => Math.hypot(m.x - me.x, m.z - me.z)), p0 = { x: me.x, z: me.z };
  S.startSpin(me, { x: me.x, z: me.z }, d.sp2); for (let k = 0; k < 90 && me.spin; k++) { me.vx = me.vz = 0; F.step(1); }
  o.spin = { out: ring.map((m, k) => +(Math.hypot(m.x - me.x, m.z - me.z) - r0[k]).toFixed(2)), she: +Math.hypot(me.x - p0.x, me.z - p0.z).toFixed(2) };
  ring.forEach(m => { m.x += 400; });
  // 4. the Hunt on a champion who healed above 20% before she struck
  clear(); put(foe, 3); foe.max = 1000; foe.hp = 150; foe.stun = 0; foe.iframeT = 0; G.teams[me.ti].cds = {};
  S.startHunt(me, { x: foe.x, z: foe.z }, d.ult); foe.hp = 600; const hh = foe.hp; for (let k = 0; k < 60 && me.hunt; k++) F.step(1);
  o.hunt = { hurt: Math.round(hh - foe.hp), dead: foe.dead, want: Math.round(stats.moveHit(me, 'ult', true)) };
  // 5. the snout's point meets a man in its path: hit, and knocked aside out of it (its riders, the same)
  clear(); foe.x += 400; const rider = sim.mkUnit(me.ti, me.x, me.z, 'cav'); rider.mounted = true; const ahead = sim.mkUnit(e, 0, 0, 'foot'); put(ahead, 1); ahead.max = ahead.hp = 5000; ahead.stun = 0;
  const W = { d: d.armyUlt, hitBy: new Map(), dx: Math.sin(me.face), dz: Math.cos(me.face), fx: me.x, fz: me.z, ti: me.ti };
  V.svinStrikes(W, rider, { x: me.x, z: me.z, r: 1 });
  const lat = ahead.vx * Math.cos(me.face) - ahead.vz * Math.sin(me.face);
  o.svin = { hurt: Math.round(5000 - ahead.hp), lat: +Math.abs(lat).toFixed(1) };
  return o;
});
console.log(JSON.stringify(r));
ok(r.third.stun >= .3 && r.third.kb > 1 && !r.third.first && r.third.clip === 'overhead', `the third blow: a two-handed overhead chop that staggers him (stun ${r.third.stun}, kb ${r.third.kb})`);
ok(r.pounce.tgt && r.pounce.hurt > 0 && Math.abs(r.pounce.hurt - r.pounce.want) <= 2, `Pounce lands on him though he runs and evades (${r.pounce.hurt} = 2x her blow ${r.pounce.want}; she lands ${r.pounce.gap} m from him)`);
ok(r.killCd <= .5, `a kill: Pounce ready again in 0.5 s (${r.killCd})`);
ok(r.spin.out.every(v => v > .4 && v < 3), `Spin pushes the men round her out (${r.spin.out.join(', ')} m)`);
ok(r.spin.she < .3, `and they don't shove her about: she spins through them (${r.spin.she} m)`);
ok(!r.hunt.dead && Math.abs(r.hunt.hurt - r.hunt.want) <= 2, `the Hunt on a champion healed above 20%: 5x her blow (${r.hunt.hurt} = ${r.hunt.want}), not the finish`);
ok(r.svin.hurt > 0 && r.svin.lat >= 10, `the snout's point hits a man in its path and knocks him aside (${r.svin.hurt} hurt, ${r.svin.lat} m/s sideways)`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
