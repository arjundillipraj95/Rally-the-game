// C3a: Titus's page, stats, combo and army, on the host (the joined phone: r_C3a-join). Needs the game server.
// You and every bot play Titus (?champ=titus&botchamp=titus). Checks: his page inside the guardrails and on budget;
// his health, blow, reach, hit rate, pace on foot and riding and his horse in battle; the combo slash, slash, shield
// bash (30 each, staggers at most 1 s) on his beat (1.2 a second); his army: spearmen from the start on a 100-health
// man (20 a blow), archers 60 health and 10 an arrow; neutral soldiers unchanged; the legionary unchanged.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const near = (v, t, e = .01) => Math.abs(v - t) <= e;

async function battle(q) {
  const page = await open(browser, 844, 390, { q: '?crown2=1' + q });
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
  return page;
}
const A = await battle('&champ=titus&botchamp=titus');
const o = await A.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), Wd = await import('/src/core/world.js'), guard = await import('/src/champions/guard.js'), I = await import('/src/champions/index.js'), S = await import('/src/champions/stats.js'), Ar = await import('/src/champions/army.js');
  G.T = 30; F.step(30);
  const me = G.myTi, p = G.teams[me].leader, t = I.CHAMPS.titus;
  const r = { bad: guard.check(t), budget: guard.budgetOf(t), champs: G.champs.join(), max: p.max, dmg: p.dmg, reach: p.reach, spd: p.spd, horse: Math.round(sim.horseMax(me)), cd: S.champCd(me) };
  // pace: a computer's, riding (a player's gallop builds on the straight)
  Object.assign(p, { vx: 0, vz: 0, marchT: 0, boostT: 0, inSafe: true, charge: 0, human: false, rallyT: 0, gallop: 0 }); // (no rally cry, no boost)
  const gs = Wd.groundSlow(p.x, p.z); // (the ground he stands on: a road is quicker)
  r.foot = sim.speedOf(p) / gs; p.mounted = true; r.ride = sim.speedOf(p) / gs; p.mounted = false; p.human = true;
  // his army and the neutral soldiers
  const mine = G.units.filter(u => u.ti === me && !u.dead && !u.leader), neu = G.units.filter(u => u.neutral && !u.dead && u.kind === 'foot');
  const f = mine.find(u => u.kind === 'foot'), a = mine.find(u => u.kind === 'arch');
  r.foot1 = f && { max: f.max, dmg: f.dmg, spear: Ar.spearman(f), braced: f.tier === 0 && sim.braced({ ...f, vx: 0, vz: 0, stun: 0 }) };
  r.arch1 = a && { max: a.max, arrow: a.arrow };
  r.neu = neu[0] && { max: neu[0].max, dmg: neu[0].dmg, spear: Ar.spearman(neu[0]) };
  // the combo on an enemy footman in front of him: three presses on his beat
  const others = G.units.filter(u => u !== p); G.units = [p]; // (just the two of them: nobody else lands a blow)
  const foe = sim.mkUnit((me + 1) % 4, p.x + Math.sin(p.face) * 1.6, p.z + Math.cos(p.face) * 1.6, 'foot');
  foe.max = foe.hp = 1e6; foe.block = 0;
  const blows = []; let last = -1, hp0 = foe.hp;
  for (let k = 0; k < 3; k++) {
    Object.assign(p, { stun: 0, st: 100 }); for (let w = 0; w < 120 && p.cd > 0; w++) F.step(1);
    foe.x = p.x + Math.sin(p.face) * 1.6; foe.z = p.z + Math.cos(p.face) * 1.6; foe.stun = 0; foe.guardUp = false; foe.gT = 9; foe.vx = foe.vz = 0; foe.y = p.y; foe.face = Math.atan2(p.x - foe.x, p.z - foe.z); p.rallyT = 0; // (face to face, level ground: no flank, no downhill)
    const t0 = G.T; sim.captainAttack(p); const kind = p.swingKind, cd = p.cd, bash = !!(p.pending && p.pending.bash);
    let stun = 0; for (let w = 0; w < 12; w++) { F.step(1); stun = Math.max(stun, foe.stun); foe.y = p.y; foe.face = Math.atan2(p.x - foe.x, p.z - foe.z); foe.x = p.x + Math.sin(p.face) * 1.6; foe.z = p.z + Math.cos(p.face) * 1.6; }
    blows.push({ kind, cd: +cd.toFixed(3), bash, dmg: Math.round(hp0 - foe.hp), stun: +stun.toFixed(2), gap: last < 0 ? null : +(t0 - last).toFixed(2) }); last = t0; hp0 = foe.hp;
  }
  r.blows = blows; G.units = others;
  return r;
});
ok(o.bad.length === 0, `page inside every floor and ceiling ${o.bad.length ? '(' + o.bad.join('; ') + ')' : ''}`);
ok(Math.abs(o.budget) <= 5, `budget ${o.budget >= 0 ? '+' : ''}${o.budget.toFixed(1)} (design +1)`);
ok(o.champs.split(',').every(c => c === 'titus'), `you and every bot play Titus (${o.champs})`);
ok(o.max === 480 && o.dmg === 30, `health ${o.max}, a blow ${o.dmg}`);
ok(near(o.reach, 1.4), `reach ${o.reach} m`);
ok(near(1 / o.cd, 1.2), `a computer Titus swings ${(1 / o.cd).toFixed(2)} a second`);
ok(near(o.foot, 5.9, .05) && near(o.ride, 11.2, .05), `on foot ${o.foot.toFixed(2)} m/s, riding ${o.ride.toFixed(2)} m/s`);
ok(o.horse === 200, `his horse: ${o.horse} health`);
const B = o.blows, avg = 3 / B.reduce((s, b) => s + b.cd, 0);
ok(B[0].kind === 0 && B[1].kind === 1 && B[2].kind === 6 && B[2].bash && !B[0].bash, `combo: slash, slash, shield bash (kinds ${B.map(b => b.kind).join(', ')})`);
ok(near(avg, 1.2, .01), `combo beat ${B.map(b => b.cd).join(' / ')} s = ${avg.toFixed(2)} a second`);
ok(B.every(b => b.dmg >= 24 && b.dmg <= 36), `each blow ~30 (${B.map(b => b.dmg).join(', ')})`);
ok(B[2].stun > 0 && B[2].stun <= 1, `the bash staggers ${B[2].stun} s (no more than 1)`);
ok(o.foot1 && o.foot1.max === 100 && o.foot1.dmg === 20 && o.foot1.spear, `his footman: ${o.foot1 && o.foot1.max} health, ${o.foot1 && o.foot1.dmg} a blow, spear from the start ${o.foot1 && o.foot1.spear}`);
ok(o.foot1 && o.foot1.braced, `his spearmen brace standing (Hold)`);
ok(!o.arch1 || (near(o.arch1.max, 60) && near(o.arch1.arrow, 10)), o.arch1 ? `his archer: ${o.arch1.max} health, ${o.arch1.arrow} an arrow` : 'no archer at the start (none to check)');
ok(o.neu && near(o.neu.max, 95) && near(o.neu.dmg, 19) && !o.neu.spear, `neutral soldiers unchanged (${o.neu && o.neu.max} health, ${o.neu && o.neu.dmg} a blow, sword)`);
await A.close();
// the legionary unchanged
const L = await battle('&champ=legionary&botchamp=legionary');
const l = await L.evaluate(async () => { const F = window.__fb, { G } = F, Ar = await import('/src/champions/army.js'); G.T = 30; F.step(30);
  const p = G.teams[G.myTi].leader, f = G.units.find(u => u.ti === G.myTi && u.kind === 'foot' && !u.dead);
  return { max: p.max, dmg: +p.dmg.toFixed(1), reach: p.reach, fmax: f && f.max, spear: f && Ar.spearman(f) }; });
ok(l.max === 380 && l.dmg === 32.3 && near(l.reach, 1.3) && l.fmax === 95 && !l.spear, `legionary unchanged (${l.max}, ${l.dmg} a blow, reach ${l.reach}; footman ${l.fmax}, sword)`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
