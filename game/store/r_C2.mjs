// C2: the stone thrower, on the host (the joined phone: r_C2-join). Needs the game server. A test champion at the base
// champion's numbers (so his soldiers are the neutral baseline) who recruits stone throwers. Checks: 300 health, five
// places (recruiting it needs the room); nothing within 10 m; a stone on a standing six-man line hits several; a man
// running across is missed (it lands where he was); four stones break a 700 castle gate; a testudo takes half; fire
// pots: the third stone burns the ground and a man standing in it is hurt; reinforced: 450 health, 50 m.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const SIEGE = `window.__champs = [{ id: 'siege', name: 'Siege', cls: 'vanguard', stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['foot', 'arch', 'thrower'], influence: null, sp1: null, sp2: null, ult: null, armyUlt: null }];`;
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=siege&botchamp=siege', init: SIEGE });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), Wd = await import('/src/core/world.js'), st = await import('/src/core/state.js');
  G.T = 30; F.step(30);
  const me = G.myTi, s = G.teams[me], p = s.leader, foe = (me + 1) % 4, r = {};
  // places
  const keep = G.units.filter(u => u.ti !== me || u.leader); G.units = keep.slice(); s.gold = 1000;
  const cap = st.capOf(me); r.cap = cap;
  for (let k = 0; k < cap - 4; k++) sim.mkUnit(me, p.x, p.z, 'foot');
  r.full = sim.armyPlaces(me); r.noRoom = sim.recruit ? sim.recruit(me, 'thrower') : null;
  for (const u of G.units.filter(u => u.ti === me && !u.leader).slice(0, 1)) u.dead = true;
  r.room = sim.recruit ? sim.recruit(me, 'thrower') : null; r.after = sim.armyPlaces(me);
  // one thrower on its own, against men put round it
  G.units = [p]; G.arrows = []; G.stones = []; G.fires = [];
  // (open ground: from his home toward the middle, clear of the glacier; x across, z ahead in that frame)
  const O = { x: p.x, z: p.z }, A = Math.atan2(-p.x, -p.z), W = (x, z) => [O.x + Math.sin(A) * z + Math.cos(A) * x, O.z + Math.cos(A) * z - Math.sin(A) * x];
  p.x += 300; p.z += 300; // (the champion out of the way)
  const [tx0, tz0] = W(0, 12), t = sim.mkUnit(me, tx0, tz0, 'thrower'); t.y = Wd.groundY(tx0, tz0); t.face = A; r.hp = Math.round(t.max); r.range = t.range;
  s.order = 'hold'; s.holdPt = { x: tx0, z: tz0, face: A };
  const man = (x, z) => { const [wx, wz] = W(x, z + 12); const u = sim.mkUnit(foe, wx, wz, 'foot'); u.y = Wd.groundY(wx, wz); u.max = u.hp = 1e5; u.face = A + Math.PI; return u; };
  let pins = []; const pin = () => { s.routT = 0; s.morale = 100; for (const [u, x, z] of pins) { u.x = x; u.z = z; u.vx = u.vz = 0; u.march = 0; } }; // (no rout: his champion is far off)
  const run = (n, f) => { for (let k = 0; k < n; k++) { F.step(1); pin(); f && f(k); } };
  const reset = () => { t.shootCd = 0; t.markT = 0; t.stun = 0; t.x = tx0; t.z = tz0; t.face = A; };
  // within 10 m: nothing
  const a = man(0, 7); pins = [[a, a.x, a.z]]; reset(); const n0 = G.stoneN; run(60); r.close = G.stoneN - n0;
  a.dead = true; G.units = [p, t];
  // a standing line of six at 25 m
  const line = []; for (let k = 0; k < 6; k++) line.push(man(-1.5 + k * .6, 25));
  pins = line.map(u => [u, u.x, u.z]); reset(); run(240);
  r.lineHit = line.filter(u => u.hp < u.max).length; r.lineDmg = Math.round(line.reduce((n, u) => n + u.max - u.hp, 0));
  for (const u of line) u.dead = true; G.units = [p, t]; G.stones = [];
  // one man running across at 20 m
  const rn = man(-6, 20); pins = []; reset(); let thrown = false;
  const [rx0, rz0] = [rn.x, rn.z]; run(200, k => { rn.x = rx0 + Math.cos(A) * k / 60 * 6.5; rn.z = rz0 - Math.sin(A) * k / 60 * 6.5; rn.vx = Math.cos(A) * 6.5; rn.vz = -Math.sin(A) * 6.5; if (G.stones.length) thrown = true; });
  r.runThrown = thrown; r.runTaken = Math.round(rn.max - rn.hp);
  rn.dead = true; G.units = [p, t]; G.stones = [];
  // a testudo: half
  const tu = man(0, 22); tu.testudo = { a: 1 }; pins = [[tu, tu.x, tu.z]];
  reset(); run(200); r.testudo = Math.round(tu.max - tu.hp);
  tu.dead = true; G.units = [p, t]; G.stones = [];
  // a castle gate: 700, four stones
  const nav = await import('/src/core/nav.js'); let gate = null;
  for (const ob of (G.layout && G.layout.obstacles) || []) if (ob.pal && ob.cgate != null && G.cgates && G.cgates[ob.cgate]) { gate = ob; break; }
  if (gate) {
    const h = G.holds[gate.cgate], cg = G.cgates[gate.cgate], gi = gate.gi | 0; h.owner = foe; cg.broken = 0; cg.hp[gi] = cg.max[gi] = 700; gate.off = false;
    const out = Math.atan2(gate.x - h.x, gate.z - h.z); t.x = gate.x + Math.sin(out) * 25; t.z = gate.z + Math.cos(out) * 25; t.y = Wd.groundY(t.x, t.z); t.face = out + Math.PI;
    s.holdPt = { x: t.x, z: t.z, face: t.face }; s.order = 'charge';
    const at = new Set();
    for (let k = 0; k < 60 * 60 && !((cg.broken >> gi) & 1); k++) { s.routT = 0; F.step(1); for (const x of G.stones) if (x.bld === gate) at.add(x.id); }
    r.gate = { stones: at.size, broken: !!((cg.broken >> gi) & 1), hp: cg.hp[gi], dmg: t.dmg, wd: (await import('/src/config.js')).FORT.wallDmg };
    s.order = 'hold';
  }
  G.units = [p, t]; G.stones = []; t.x = tx0; t.z = tz0; s.holdPt = { x: tx0, z: tz0, face: A };
  // fire pots: the third stone burns; a man standing in it is hurt
  s.up.thr1 = 0; s.gold = 1000; r.fp = sim.buyUpgrade(me, 'thr1'); r.fire = t.fire;
  const f1 = man(0, 24); pins = [[f1, f1.x, f1.z]]; let fires = 0, burnt = 0;
  for (let k = 0; k < 3; k++) { reset(); t.stones = k; const h0 = f1.hp; run(200, () => { fires = Math.max(fires, G.fires.length); }); burnt = h0 - f1.hp; }
  r.fires = fires; r.lastStone = Math.round(burnt);
  // reinforced
  r.re = sim.buyUpgrade(me, 'thr2'); r.hp2 = Math.round(t.max); r.range2 = t.range;
  return r;
});
ok(o.hp === 300 && o.range === 40, `a stone thrower: ${o.hp} health, ${o.range} m`);
ok(o.noRoom === false && o.room === true && o.after === o.full - 1 + 5, `places: ${o.full} of ${o.cap} used, no room for five (${o.noRoom}); with five free it comes (${o.room}): ${o.after} used`);
ok(o.close === 0, `nothing thrown at a man within 10 m (${o.close})`);
ok(o.lineHit >= 4, `a standing line of six: ${o.lineHit} hurt, ${o.lineDmg} damage`);
ok(o.runThrown && o.runTaken === 0, `a man running across: stone thrown ${o.runThrown}, he took ${o.runTaken}`);
ok(o.testudo > 0 && o.testudo <= 23, `a testudo takes half a stone: ${o.testudo} (a stone: 45 at its centre)`);
ok(o.gate && o.gate.broken && o.gate.stones === 4, o.gate ? `a 700 castle gate: broken ${o.gate.broken} in ${o.gate.stones} stones` : 'no castle gate found');
ok(o.fp && o.fire && o.fires >= 1 && o.lastStone > 45, `fire pots (${o.fp}): ${o.fires} fire on the third stone; the man in it took ${o.lastStone} from that stone and its flames`);
ok(o.re && o.hp2 === 450 && o.range2 === 50, `reinforced (${o.re}): ${o.hp2} health, ${o.range2} m`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
