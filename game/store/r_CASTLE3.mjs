// CASTLE3: castles shoot like League turrets: soldiers first, an enemy champion who hits one of the castle's champions
// takes it, it sticks, champions only when no soldiers; the ramp on one champion; shots through shields; no shots at
// neutral or bush-hidden men; a lone champion at level I dies in about 8 s. (Joined phones: r_CASTLE3-join.mjs.)
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const { G } = window.__fb, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js'), cfg = await import('/src/config.js');
  const tu = await import('/src/core/sim/turret.js'), mis = await import('/src/core/sim/missiles.js'), melee = await import('/src/core/sim/melee.js'), bush = await import('/src/core/sim/bush.js');
  const T = cfg.CASTLE26.turret, me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], o = { T };
  const foeTi = G.teams.findIndex((s, i) => s && s.leader && G.ALLY[st8.colorOf(i)] !== myA), foeA = G.ALLY[st8.colorOf(foeTi)];
  const champ = G.teams[foeTi].leader, sold = G.units.find(u => !u.dead && u.ti === foeTi && u.kind === 'foot');
  const neu = G.units.find(u => !u.dead && u.neutral);
  const h = G.holds.find(x => x.kind === 'castle' && x.side === st8.colorOf(me.ti) && !x.mid), cw = G.layout.cwalls.find(c => c.hid === h.id);
  h.owner = myA; G.cgates[h.id] = f.freshGates(1); f.applyCastleGates(); const st = () => G.cgates[h.id];
  const park = u => { u.x = cw.x + 300; u.z = cw.z + 300; };
  const at = (u, d, da = 0) => { const a = cw.gates[0] + da; u.x = cw.x + Math.cos(a) * d; u.z = cw.z + Math.sin(a) * d; u.vx = u.vz = 0; u.inSafe = false; u.iframeT = 0; u.shieldT = 0; u.dead = false; u.atkT = -99; u.swing = 0; };
  const reset = () => { G.units.forEach(u => { if (u !== me && !u.dead && Math.hypot(u.x - cw.x, u.z - cw.z) < 70) park(u); }); park(me); st().tg = null; st().rampN = 0; bush.bushTick(); melee.buildGrid(); };
  const pick = () => { bush.bushTick(); melee.buildGrid(); const e = tu.turretTarget(cw, h, st()); return e ? (e === champ ? 'champ' : e === sold ? 'soldier' : e === me ? 'me' : e === neu ? 'neutral' : 'other') : null; };
  reset(); at(champ, 12); at(sold, 18, .3); o.soldierFirst = pick();
  st().tg = sold.id; at(me, 14, -.3); tu.champHit(champ, me); o.aggro = pick();
  st().tg = sold.id; champ.champHitT = -99; o.sticks = pick();
  park(sold); st().tg = null; o.onlyChamp = pick();
  // the ramp: volley after volley on the champion
  reset(); at(champ, 15); o.ramp = []; for (let k = 0; k < 5; k++) o.ramp.push(+tu.volleyOn(st(), champ).toFixed(2));
  // through a shield: a footman facing the walls, 10 archer shots
  reset(); at(sold, 16); sold.face = Math.atan2(cw.x - sold.x, cw.z - sold.z); sold.hp = sold.max = 9999; let hits = 0;
  for (let k = 0; k < 10; k++) { const a0 = G.arrows.length; tu.turretShot(h.x + Math.cos(h.towerA0) * 9.5, 6, h.z + Math.sin(h.towerA0) * 9.5, me.ti, sold, T.soldier, false, cw); const a = G.arrows[a0], hp = sold.hp;
    for (let t = 0; t < 60 && G.arrows.includes(a) && !a.stuck; t++) mis.arrowsTick(.05, true); if (sold.hp < hp) hits++; }
  o.shieldHits = hits;
  // neutral and bush-hidden men: not shot
  reset(); if (neu) { at(neu, 14); o.neutral = pick(); park(neu); }
  { const a = cw.gates[0] + .8, bx = cw.x + Math.cos(a) * 17, bz = cw.z + Math.sin(a) * 17; G.layout.bushes.push({ x: bx, z: bz, r: 3 }); // (a bush put in range for this check)
    const R = G.layout.bushR; G.layout.bushR = [0, 1e9]; champ.x = bx; champ.z = bz; champ.inSafe = false; champ.atkT = -99; champ.swing = 0; o.bush = pick(); G.layout.bushes.pop(); G.layout.bushR = R; }
  // a lone champion standing at the walls of a level I castle: seconds to die
  reset(); at(champ, 14); champ.hp = champ.max; champ.armour = 0; champ.mounted = false; champ.blocking = false; let t = 0;
  while (!champ.dead && t < 40) { f.castleTowersTick(.05); mis.arrowsTick(.05, true); t += .05; if (!champ.dead) { champ.x = cw.x + Math.cos(cw.gates[0]) * 14; champ.z = cw.z + Math.sin(cw.gates[0]) * 14; champ.vx = champ.vz = 0; champ.iframeT = 0; champ.inSafe = false; champ.shieldT = 0; } }
  o.dieT = t; o.champMax = champ.max;
  return o;
});
ok(r.soldierFirst === 'soldier', `soldiers first, though the champion is nearer (${r.soldierFirst})`);
ok(r.aggro === 'champ', `the champion who hit mine takes the turret (${r.aggro})`);
ok(r.sticks === 'soldier', `aggro over: it keeps shooting its soldier (${r.sticks})`);
ok(r.onlyChamp === 'champ', `no soldiers in range: the champion (${r.onlyChamp})`);
ok(r.ramp.join() === '1,1.4,1.8,2.2,2.2', `the ramp on one champion: ${r.ramp.join(', ')}`);
ok(r.shieldHits === 10, `turret arrows through a shield: ${r.shieldHits}/10`);
ok(r.neutral === null || r.neutral === undefined, `a neutral man: not shot (${r.neutral})`);
ok(r.bush === null, `a champion hidden in a bush in range: not shot (${r.bush})`);
ok(r.dieT >= 6 && r.dieT <= 12, `a lone champion (${r.champMax} health) at a level I castle dies in ${r.dieT.toFixed(1)} s`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
