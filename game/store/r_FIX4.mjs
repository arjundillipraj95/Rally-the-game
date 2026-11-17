// FIX4: a castle's ballista bolt is seen and felt: drawn as its own big bolt with a streak (not a 0.9 m arrow), a deep
// twang when loosed, and where it lands dust, a slam and a camera jolt near you. A level III castle of yours shoots an
// enemy footman 20 m out; you stand 4 m from him. Screenshot mid-flight: /tmp/fix4.png.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
await page.evaluate(async () => {
  const { G } = window.__fb, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js'), c3 = await import('/src/core/sim/castle3.js'), melee = await import('/src/core/sim/melee.js'), bush = await import('/src/core/sim/bush.js');
  window.__fb.step(30); const me = G.player, myA = G.ALLY[st8.colorOf(me.ti)];
  const foeTi = G.teams.map((s, i) => i).find(i => G.teams[i].leader && G.ALLY[st8.colorOf(i)] !== myA), foe = G.units.find(u => !u.dead && u.ti === foeTi && u.kind === 'foot');
  const h = G.holds.find(x => x.kind === 'castle' && x.side === st8.colorOf(me.ti) && !x.mid), cw = G.layout.cwalls.find(c => c.hid === h.id);
  G.units.forEach(u => { if (u !== foe && u !== me && !u.dead && Math.hypot(u.x - cw.x, u.z - cw.z) < 60) { u.x += 400; u.z += 400; } });
  const a = cw.gates[0]; foe.x = cw.x + Math.cos(a) * 20; foe.z = cw.z + Math.sin(a) * 20; foe.vx = foe.vz = 0; foe.inSafe = false; foe.hp = foe.max = 9999;
  me.x = cw.x + Math.cos(a + .2) * 22; me.z = cw.z + Math.sin(a + .2) * 22; me.face = Math.atan2(cw.x - me.x, cw.z - me.z); me.inSafe = false;
  melee.buildGrid(); bush.bushTick(); h.owner = myA; G.cgates[h.id] = f.freshGates(3); f.applyCastleGates(); G.cgates[h.id].balT = 0; c3.castle3Tick(.01);
  window.__bolt = G.arrows.filter(x => x.bolt).length;
});
await frames(page, 6); await page.screenshot({ path: '/tmp/fix4.png' });
await frames(page, 40);
const o = await page.evaluate(async () => { const b = await import('/src/render/bolts.js'); return { ...b.boltStats, bolts: window.__bolt }; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
ok(o.bolts >= 1 && o.shots >= 1, `the ballista looses a bolt, with its twang (${o.bolts} bolts, ${o.shots} twangs)`);
ok(o.drawn >= 1, `drawn as a bolt (${o.drawn} at once)`);
ok(o.landed >= 1, `its landing: dust, slam, jolt (${o.landed})`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
