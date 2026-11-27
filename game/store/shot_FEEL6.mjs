// FEEL6 look, phone size 851x393: Sigrun's overhead chop (third blow), her Pounce in the air on a champion, the Pounce
// aim (a line to whom it picks and a ring on him), and the Hunt's red mark over a wounded enemy champion. To /tmp/f6/.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 851, 393, { q: '?crown2=1&champ=sigrun', quality: 'low' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await frames(page, 30);
const setup = () => page.evaluate(async () => {
  const { G } = window.__fb, sim = await import('/src/core/sim.js'), st = await import('/src/core/state.js'), stats = await import('/src/champions/stats.js'), Cm = await import('/src/render/camera.js');
  const me = G.player, e = [1, 2, 3].map(k => (me.ti + k) % 4).find(t => st.isEnemyTi(me.ti, t));
  me.mounted = false; G.teams[me.ti].lvl = 7; stats.applyChamp(me); me.hp = me.max; for (const s of G.teams) if (s) s.thinkT = 1e9;
  G.units.forEach(u => { if (u !== me && !u.dead && Math.hypot(u.x - me.x, u.z - me.z) < 30) { u.x += 400; u.z += 400; } });
  let foe = window.__foe; if (!foe || foe.dead) { foe = window.__foe = sim.mkUnit(e, 0, 0, 'captain'); }
  foe.max = 1000; foe.hp = 1000; foe.stun = 0; window.__yaw = me.face + .9; Cm.cam.yaw = window.__yaw; return true;
});
const hold = async n => { for (let k = 0; k < n; k++) { await page.evaluate(async () => { const C = await import('/src/render/camera.js'); C.cam.yaw = window.__yaw; }); await frames(page, 1); } };
// 1. the chop
await setup();
await page.evaluate(async () => { const { G } = window.__fb, S = await import('/src/core/sim/sigrun.js'), me = G.player, f = window.__foe;
  f.x = me.x + Math.sin(me.face) * 1.4; f.z = me.z + Math.cos(me.face) * 1.4;
  for (let k = 0; k < 2; k++) { me.cd = 0; S.wolfStrike(me); me.lastSwingT = G.T; }
  me.cd = 0; S.wolfStrike(me); });
await hold(9); await page.screenshot({ path: '/tmp/f6/1-chop.png' });
// 2. the Pounce in the air
await setup(); await hold(20);
await page.evaluate(async () => { const { G } = window.__fb, S = await import('/src/core/sim/sigrun.js'), C = await import('/src/champions/index.js'), me = G.player, f = window.__foe;
  f.x = me.x + Math.sin(me.face) * 4.5; f.z = me.z + Math.cos(me.face) * 4.5; S.startPounce(me, { x: f.x, z: f.z }, C.champOf(me.ti).sp1); });
await hold(9); await page.screenshot({ path: '/tmp/f6/2-pounce.png' });
// 3. the Pounce aim and the Hunt mark on a wounded champion
await setup(); await hold(20);
await page.evaluate(async () => { const { G } = window.__fb, A = await import('/src/ui/abilaim.js'), me = G.player, f = window.__foe;
  f.x = me.x + Math.sin(me.face) * 6; f.z = me.z + Math.cos(me.face) * 6; f.hp = f.max * .12;
  const el = document.querySelector('#ab1') || document.querySelector('[data-slot="sp1"]') || document.body;
  window.__yaw = me.face + .5; A.aimStart(0, el, { clientX: 700, clientY: 330 }); window.__aimEl = el; });
for (let k = 0; k < 8; k++) { await page.evaluate(async () => { const A = await import('/src/ui/abilaim.js'), C = await import('/src/render/camera.js'); C.cam.yaw = window.__yaw; A.aimMove({ clientX: 735, clientY: 240 }); }); await frames(page, 1); }
console.log('aim', JSON.stringify(await page.evaluate(async () => { const A = await import('/src/ui/abilaim.js'), { G } = window.__fb, f = window.__foe, me = G.player; return { ...A.aimShown(), dist: +Math.hypot(f.x - me.x, f.z - me.z).toFixed(1) }; })));
await page.screenshot({ path: '/tmp/f6/3-aim-hunt.png' });
await browser.close();
