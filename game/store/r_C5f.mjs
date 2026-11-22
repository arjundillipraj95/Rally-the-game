// C5f Svinfylkingar (army ult, from the full horn): her riders wedge up behind her for 1 s (still), then charge 3 s
// the way she aims; each rider strikes whoever he rides into for 30; a braced spear line doesn't stop it; a soldier
// struck is out of formation 3 s (no brace); her swordsmen sprint in behind. No rider: the horn's usual rally cry.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=sigrun&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, S = await import('/src/core/state.js'), army = await import('/src/core/sim/army.js'), cav = await import('/src/core/sim/cavalry.js'), L = await import('/src/core/sim/levels.js');
  G.T = 30; F.step(30);
  const ti = G.myTi, me = G.teams[ti].leader, s = G.teams[ti]; while ((s.lvl || 1) < 7) L.gainXp(ti, 80, 'test');
  const h = G.layout.homes.find(h => h.c === S.colorOf(ti)); me.x = h.x * .5; me.z = h.z * .5; me.face = 0;
  // no riders: the horn's usual cry
  for (const u of G.units) if (u.ti === ti && !u.leader) u.dead = true;
  s.rally = 100; const r = {}; r.plain = army.rallyCry(ti, { x: me.x, z: me.z + 20 }) && !G.units.some(u => u.svin);
  // three riders and two swordsmen
  s.gold = 5000; s.up = Object.assign(s.up || {}, {}); for (let i = 0; i < 5; i++) army.recruit(ti, 'sword'); G.units.filter(u => !u.dead && u.ti === ti && u.kind === 'sword').slice(0, 2).forEach(u => cav.giveHorse(u)); // (two riders, a swordsman: her 3 places)
  const mine = G.units.filter(u => !u.dead && u.ti === ti && !u.leader); mine.forEach((u, i) => { u.x = me.x + (i - 2) * 1.5; u.z = me.z - 3; u.vx = u.vz = 0; });
  r.riders = mine.filter(u => u.kind === 'cav').length; r.swords = mine.filter(u => u.kind === 'sword').length;
  // enemies: a braced spear line 12 m ahead facing her, a champion at 20 m
  for (const u of G.units) if (!u.dead && u.ti !== ti && Math.hypot(u.x - me.x, u.z - me.z) < 60) { const hh = G.layout.homes.find(k => k.c === S.colorOf(u.ti)); u.x = hh.x; u.z = hh.z; }
  const foe = G.teams.find(t => t.leader && !t.leader.dead && S.isEnemy(t.leader, me)).leader, spears = G.units.filter(u => !u.dead && u.kind === 'foot' && u.ti === foe.ti).slice(0, 4);
  spears.forEach((u, i) => Object.assign(u, { x: me.x + (i - 1.5) * 1.2, z: me.z + 12, face: Math.PI, tier: 1, hp: 500, max: 500, vx: 0, vz: 0, stun: 0, cd: 30, shieldT: 0, shieldHp: null }));
  if (foe.mounted) army.dismount(foe, false); Object.assign(foe, { x: me.x, z: me.z + 20, hp: 3000, max: 3000, stun: 30, cd: 30, shieldT: 0, shieldHp: null });
  r.braced0 = spears.filter(army.braced).length;
  s.rally = 100; r.fired = army.rallyCry(ti, { x: me.x, z: me.z + 30 });
  const riders = mine.filter(u => u.kind === 'cav'), sw = mine.find(u => u.kind === 'sword'), z0 = me.z, rz0 = riders.map(u => u.z);
  F.step(15); // half the warning
  r.wedge = riders.every(u => u.z < me.z + .1 && u.svin); r.wz = riders.map(u => [+(u.z - me.z).toFixed(1), +u.vz.toFixed(2), !!u.svin]); r.sprint = sw && !!sw.svinRun && +(army.speedOf(sw) / (sw.spd)).toFixed(2);
  const hp0 = spears.map(u => u.hp), f0 = foe.hp; let disarray = 0;
  for (let i = 0; i < 120; i++) { foe.stun = 30; F.step(1); if (spears.some(u => u.disarrayT > G.T && !army.braced(u))) disarray = 1; }
  r.hit = spears.map((u, i) => +(hp0[i] - u.hp).toFixed(0)); r.champ = +(f0 - foe.hp).toFixed(0); r.went = +Math.max(...riders.map(u => u.z - z0)).toFixed(1); r.disarray = disarray; r.over = !riders.some(u => u.svin);
  return r;
});
ok(o.plain, 'with no rider the horn gives the usual rally cry');
ok(o.fired && o.riders === 2 && o.swords === 1 && o.wedge, `two riders wedge up behind her and wait through the warning (${JSON.stringify(o.wz)})`);
ok(o.sprint >= 1.45, `her swordsmen sprint in behind (x${o.sprint})`);
ok(o.braced0 >= 2 && o.hit.filter(h => h >= 30).length >= 2 && o.went > 20, `through a braced spear line (${o.braced0} braced): struck ${o.hit}, the wedge rode on ${o.went} m`);
ok(o.disarray === 1, 'the struck spearmen are out of formation (no brace)');
ok(o.champ >= 30 && o.over, `the champion behind them struck (${o.champ}); over after 3 s (${o.over})`);
await frames(page, 10); await page.screenshot({ path: '/tmp/c5/f_snout.png' });
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
