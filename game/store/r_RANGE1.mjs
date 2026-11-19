// RANGE1: a ranged champion's basic attack, on the host (the joined phone: r_RANGE1-join). Needs the game server.
// A test champion with Devi's numbers (window.__champs, dev only: 300 health, arrows of 24 at 1.75/s, 14 m, 5.9 m/s,
// third shot two arrows of 18). Checks: she shoots the nearest at 14 m and not at 15; sticks to a champion she has hit
// while a soldier walks closer; Champions first picks the champion; a neutral footman dies to 5 arrows (no counter, no
// plain shield); a raised Shield of Cassius turns her arrows from the front only; the third shot is two arrows; she moves
// at 65% while she keeps shooting; a castle gate in range takes her arrows; a computer one keeps her range from a melee
// champion and shoots; Strikers start with 4 army places.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const BOW = `window.__champs = [{ id: 'bowman', name: 'Bowman', cls: 'striker', ranged: { third: 18 }, stats: { hp: 300, dmg: 24, rate: 1.75, reach: 14, spd: 5.9 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['arch'], influence: null, sp1: null, sp2: null, ult: null, armyUlt: null }];`;
async function battle(q) {
  const page = await open(browser, 844, 390, { q: '?crown2=1' + q, init: BOW });
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
  return page;
}
const A = await battle('&champ=bowman&botchamp=titus');
const o = await A.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), R = await import('/src/core/sim/ranged.js'), Sc = await import('/src/core/sim/scutum.js');
  const I = await import('/src/champions/index.js'), Wd = await import('/src/core/world.js'), C = await import('/src/config.js');
  G.T = 30; F.step(30);
  const me = G.myTi, p = G.teams[me].leader, foeTi = (me + 1) % 4, r = {};
  r.army = C.ARMY.striker.start;
  const keep = G.units; G.units = [p]; G.arrows = [];
  Object.assign(p, { mounted: false, vx: 0, vz: 0, stun: 0, cd: 0, rTg: null, rN: 0, aimChamp: false, y: Wd.groundY(p.x, p.z) });
  const put = (u, d, ang = 0) => { const a = p.face + ang; u.x = p.x + Math.sin(a) * d; u.z = p.z + Math.cos(a) * d; u.y = Wd.groundY(u.x, u.z); u.vx = u.vz = 0; };
  const man = (kind, d, ang) => { const u = sim.mkUnit(foeTi, p.x, p.z, kind); put(u, d, ang); u.neutral = false; return u; };
  let pinned = [];   // (the men she shoots at stay where they're put)
  const pin = () => { for (const [u, x, z] of pinned) { u.x = x; u.z = z; u.vx = u.vz = 0; } };
  const hold = (...us) => { pinned = us.map(u => [u, u.x, u.z]); };
  const flyAll = () => { for (let k = 0; k < 40 && G.arrows.some(a => !a.done && !a.stuck); k++) { F.step(1); pin(); } };
  const ready = () => { p.cd = 0; p.stun = 0; };
  // range
  const f1 = man('foot', 13.4); r.at14 = (ready(), R.rangedShot(p)); flyAll();
  put(f1, 15.6); ready(); r.at15 = R.rangedShot(p);
  // sticky: hit a champion at 12 m, then a footman walks to 5 m
  const ch = sim.mkUnit(foeTi, p.x, p.z, 'foot'); Object.assign(ch, { leader: true, max: 1e5, hp: 1e5 }); put(ch, 12, .3);
  put(f1, 20); ready(); p.rTg = null; R.rangedShot(p); flyAll(); r.stuckOn = p.rTg === ch;
  put(f1, 5, -.3); r.sticky = R.rangedTarget(p) === ch;
  p.rTg = null; r.nearest = R.rangedTarget(p) === f1; p.aimChamp = true; r.champFirst = R.rangedTarget(p) === ch; p.aimChamp = false;
  G.units = [p];
  // a footman of 100 health (a neutral's), a plain shield up front: 5 arrows
  const n = man('foot', 10); Object.assign(n, { hp: 100, max: 100, block: .9, guardUp: true, blockT: 9, face: p.face + Math.PI });
  hold(n); p.rN = 0; let arrows = 0, shots = 0;
  for (; shots < 8 && !n.dead && n.hp > 0; shots++) { ready(); const before = G.arrowN; R.rangedShot(p); for (let w = 0; w < 4; w++) { F.step(1); pin(); } flyAll(); arrows += G.arrowN - before; n.guardUp = true; n.blockT = 9; }
  r.footArrows = arrows; r.footShots = shots;
  G.units = [p]; G.arrows = [];
  // the third shot
  const t = man('foot', 9); t.max = t.hp = 1e5; hold(t); p.rN = 0; const made = [];
  for (let k = 0; k < 3; k++) { ready(); const b0 = G.arrowN; R.rangedShot(p); for (let w = 0; w < 5; w++) { F.step(1); pin(); } made.push({ n: G.arrowN - b0, jd: G.arrows.filter(a => a.id > b0).map(a => Math.round(a.jd)).join('+') }); flyAll(); }
  r.third = made;
  // Shield of Cassius, front and back
  const tit = sim.mkUnit(foeTi, p.x, p.z, 'foot'); Object.assign(tit, { leader: true, max: 1e5, hp: 1e5 }); put(tit, 9); G.units = [p, tit];
  tit.face = Math.atan2(p.x - tit.x, p.z - tit.z); hold(tit); const tf = tit.face; Sc.raiseScutum(tit, I.CHAMPS.titus.sp2);
  let h0 = tit.hp; for (let k = 0; k < 2; k++) { ready(); R.rangedShot(p); flyAll(); } r.frontTaken = h0 - tit.hp;
  r.raised = !!tit.scutum; Sc.dropScutum(tit); tit.face = tf + Math.PI; Sc.raiseScutum(tit, I.CHAMPS.titus.sp2); h0 = tit.hp; for (let k = 0; k < 2; k++) { ready(); R.rangedShot(p); flyAll(); } r.backTaken = h0 - tit.hp;
  Sc.dropScutum(tit); G.units = [p];
  // pace while shooting
  const gs = Wd.groundSlow(p.x, p.z); Object.assign(p, { boostT: 0, inSafe: true, rallyT: 0, firingT: 0 });
  r.walk = sim.speedOf(p) / gs; p.firingT = G.T + 1; r.shooting = sim.speedOf(p) / gs; p.firingT = 0;
  // a castle gate in range
  const nav = await import('/src/core/nav.js'); let gate = null;
  for (const ob of (G.layout && G.layout.obstacles) || []) if (ob.pal && ob.cgate != null && G.cgates && G.cgates[ob.cgate]) { gate = ob; break; }
  if (!gate) for (const cw of (G.layout && G.layout.cwalls) || []) { for (const ob of nav.nearObstacles(cw.x, cw.z)) if (ob.pal && ob.cgate != null && G.cgates && G.cgates[ob.cgate]) { gate = ob; break; } if (gate) break; }
  if (gate) {
    const h = G.holds[gate.cgate], st = G.cgates[gate.cgate], gi = gate.gi | 0; h.owner = (me + 1) % 4; st.broken = 0; st.hp[gi] = 600; gate.off = false; // (a held enemy castle, its gate standing)
    const out = Math.atan2(gate.x - h.x, gate.z - h.z); p.x = gate.x + Math.sin(out) * 10; p.z = gate.z + Math.cos(out) * 10; p.y = Wd.groundY(p.x, p.z); p.face = out + Math.PI;
    const hp0 = st.hp[gi]; for (let k = 0; k < 3; k++) { ready(); R.rangedShot(p); flyAll(); } r.gate = { hp0: Math.round(hp0), hp1: Math.round(st.hp[gi]) };
  }
  G.units = keep;
  return r;
});
ok(o.army === 4, `Strikers start with ${o.army} army places`);
ok(o.at14 === true && o.at15 === false, `shoots a man at 13.4 m (${o.at14}), not at 15.6 m (${o.at15})`);
ok(o.stuckOn && o.sticky, `stays on the champion she hit while a footman walks to 5 m (${o.stuckOn}, ${o.sticky})`);
ok(o.nearest && o.champFirst, `fresh: the nearest (${o.nearest}); Champions first: the champion (${o.champFirst})`);
ok(o.footArrows === 5, `a neutral footman, shield up, dies to ${o.footArrows} arrows in ${o.footShots} shots (5: 24, 24, 18+18, 24)`);
ok(o.third[0].n === 1 && o.third[1].n === 1 && o.third[2].n === 2 && o.third[2].jd === '18+18', `third shot two arrows (${o.third.map(t => t.n + ':' + t.jd).join(', ')})`);
ok(o.frontTaken === 0 && o.backTaken > 40, `Shield of Cassius: from the front ${Math.round(o.frontTaken)}, from behind ${Math.round(o.backTaken)}`);
ok(Math.abs(o.walk - 5.9) < .05 && o.shooting >= 3.6 && o.shooting <= 4.0, `on foot ${o.walk.toFixed(2)} m/s, shooting ${o.shooting.toFixed(2)} m/s`);
ok(o.gate && o.gate.hp1 < o.gate.hp0, o.gate ? `a castle gate in range: ${o.gate.hp0} -> ${o.gate.hp1}` : 'no castle gate found');
await A.close();
// a computer ranged champion against a melee champion walking in
const B = await battle('&champ=titus&botchamp=bowman');
const b = await B.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), Wd = await import('/src/core/world.js');
  G.T = 30; F.step(30);
  const me = G.myTi, p = G.teams[me].leader, bt = (me + 1) % 4, q = G.teams[bt].leader;
  G.units = [p, q]; G.arrows = [];
  q.x = p.x + Math.sin(p.face) * 6; q.z = p.z + Math.cos(p.face) * 6; q.y = Wd.groundY(q.x, q.z); Object.assign(q, { mounted: false, cd: 0, stun: 0, foe: p, fd: 6, rt: 9, hp: q.max });
  p.max = p.hp = 1e5; const n0 = G.arrowN; let minD = 99, maxD = 0;
  for (let k = 0; k < 90; k++) { p.vx = p.vz = 0; F.step(1); const d = Math.hypot(q.x - p.x, q.z - p.z); minD = Math.min(minD, d); maxD = Math.max(maxD, d); }
  return { shots: G.arrowN - n0, d: Math.hypot(q.x - p.x, q.z - p.z), maxD, minD, dead: q.dead };
});
ok(b.shots >= 3 && b.d > 7.5, `a computer one backs off to ${b.d.toFixed(1)} m (from 6) and shoots ${b.shots} arrows in 3 s`);
await B.close();
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
