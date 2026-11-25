// GOLD2 + HEAL1 + BAR1 (Arjun 25 Nov). Kill gold: a champion 50, a soldier killed by a champion 20 (by a soldier 8), a
// champion's mount 20 (Sigrun's wolf too). Castle healing: every second, champions +20, soldiers +10, a "+20" floats.
// Bars: a close-up of a mounted enemy champion with armour, hurt, over the gate-style bar (software GL), /tmp/bar1.png.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
import fs from 'fs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await open(b, 900, 500, { q: '?crown2=1&champ=titus&botchamp=sigrun' });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 6);
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const r = await p.evaluate(async () => {
  const { G } = window.__fb, S = await import('/src/core/sim/score.js'), A = await import('/src/core/sim/army.js'), St = await import('/src/core/state.js');
  window.__fb.step(30); G.paused = true;
  const me = G.player, foeTi = G.teams.findIndex((t, i) => t.active && t.leader && St.isEnemyTi(i, G.myTi)), foe = G.teams[foeTi].leader;
  const gold = () => G.teams[G.myTi].gold, out = {};
  const man = G.units.find(u => !u.dead && !u.leader && St.isEnemyTi(u.ti, G.myTi) && !u.neutral);
  man.shieldT = 0; let g0 = gold(); S.die(man, me, 0); out.manByChamp = gold() - g0;
  const man2 = G.units.find(u => !u.dead && !u.leader && St.isEnemyTi(u.ti, G.myTi) && !u.neutral), mine = G.units.find(u => !u.dead && !u.leader && u.ti === G.myTi);
  man2.shieldT = 0; g0 = gold(); S.die(man2, mine, 0); out.manByMan = gold() - g0;
  const ride = u => { const h = { id: ++G.horseN, x: u.x, z: u.z, face: 0, state: 'ridden', rider: u, t: 0, spd: 0, ti: u.ti, fall: 1 }; G.horses.push(h); u.horseHp = A.horseMax(u.ti); A.mountUp(u, h); };
  ride(foe); g0 = gold(); A.horseDamage(foe, 9999, me); out.mount = gold() - g0; out.unhorsed = !foe.mounted; out.wolf = foe.champ;
  foe.shieldT = 0; g0 = gold(); S.die(foe, me, 0); out.champ = gold() - g0;
  // castle healing: my champion and one of my men, hurt, in a castle my side holds, nobody else in it
  const cw = G.layout.cwalls.find(c => G.holds[c.hid] && G.holds[c.hid].kind === 'castle'), h = G.holds[cw.hid], ally = G.ALLY[St.colorOf(G.myTi)];
  h.owner = ally; for (const u of G.units) if (!u.dead && Math.hypot(u.x - cw.x, u.z - cw.z) < cw.r + 2) { u.x += 200; }
  const m2 = G.units.find(u => !u.dead && !u.leader && u.ti === G.myTi && u !== mine);
  for (const [u, k] of [[me, 0], [m2, 1]]) { u.x = cw.x + k * 2; u.z = cw.z; u.hp = u.max * .4; u.ord = 'hold'; }
  const floats = []; const off = St.bus.on ? null : null; window.__floats = floats;
  const hp0 = [me.hp, m2.hp]; h.healT = 0; G.paused = false;
  for (let k = 0; k < 2; k++) { for (const [u, kk] of [[me, 0], [m2, 1]]) { u.x = cw.x + kk * 2; u.z = cw.z; u.vx = u.vz = 0; } (await import('/src/core/sim/holding.js')).holdingTick(1.0); }
  out.healChamp = Math.round(me.hp - hp0[0]); out.healMan = Math.round(m2.hp - hp0[1]);
  return out;
});
ok(r.manByChamp === 20, `a soldier killed by your champion pays ${r.manByChamp} (20)`);
ok(r.manByMan === 8, `a soldier killed by your soldier pays ${r.manByMan} (8)`);
ok(r.unhorsed && r.mount === 20, `killing an enemy champion's mount (${r.wolf}'s) pays ${r.mount} (20)`);
ok(r.champ === 50, `a champion kill pays ${r.champ} (50)`);
ok(r.healChamp === 40 && r.healMan === 20, `2 s in a held castle: champion +${r.healChamp} (40), soldier +${r.healMan} (20)`);
// the picture (a fresh battle): an enemy champion beside you, mounted, with armour, at 60% health; you with armour too
const q = await open(b, 900, 500, { q: '?crown2=1&champ=titus&botchamp=sigrun' });
await q.click('#segMode button[data-v="crown"]'); await q.click('#goBtn'); await frames(q, 6);
await q.evaluate(async () => {
  const { G } = window.__fb, A = await import('/src/core/sim/army.js'), St = await import('/src/core/state.js'), W = await import('/src/core/world.js');
  window.__fb.step(20); G.paused = true; const me = G.player, foe = G.teams.map(t => t.leader).find(L => L && !L.dead && St.isEnemyTi(L.ti, G.myTi));
  const f = me.face || 0; foe.x = me.x + Math.sin(f) * 5 + Math.cos(f) * 2.5; foe.z = me.z + Math.cos(f) * 5 - Math.sin(f) * 2.5; foe.y = W.groundY(foe.x, foe.z);
  const h = { id: ++G.horseN, x: foe.x, z: foe.z, face: 0, state: 'ridden', rider: foe, t: 0, spd: 0, ti: foe.ti, fall: 1 }; G.horses.push(h); A.mountUp(foe, h);
  foe.horseHp = A.horseMax(foe.ti) * .7; foe.hp = foe.max * .6; foe.armour = 60; me.armour = 40; me.hp = me.max * .8;
  document.querySelectorAll('.banner, #banner, .feed, #feed, .toast, #bigMsg, .bigmsg').forEach(e => e.style.display = 'none');
});
await frames(q, 10);
await q.screenshot({ path: '/tmp/bar1.png' });
await b.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
