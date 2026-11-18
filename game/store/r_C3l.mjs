// C3l drag to aim the specials: press Ram and drag, a slab shows on the ground (shorter in front of a wall), let go and
// he rams the way you dragged (screen up = the camera's forward); slide back onto the button and let go: nothing fires;
// a tap fires the way he faces; dragging Eagle's fall shows a ring where he'll land.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const ev = f => page.evaluate(f);
const prep = () => ev(async () => {
  const F = window.__fb, { G } = F, L = await import('/src/core/sim/levels.js'), cam = window.__aim.cam, me = G.myTi, p = G.player;
  if (G.teams[me].lvl < 7) L.gainXp(me, 3000, 't'); G.teams[me].cds = { sp1: 0, sp2: 0, ult: 0, armyUlt: 0 };
  for (const u of G.units) if (!u.dead && u !== p && Math.hypot(u.x - p.x, u.z - p.z) < 25) { if (u.leader) { u.x += 60; u.z += 60; } else { u.dead = true; u.hp = 0; } }
  p.stun = 0; p.ram = null; p.eagle = null; if (p.mounted) { (await import('/src/core/sim.js')).dismount(p, false); }
  cam.yaw = 0.7; p.face = 2.5; window.__frame(3); return { lvl: G.teams[me].lvl };
});
const box = async id => { const b = await page.locator('#' + id).boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
const shown = () => ev(() => window.__aim.shown());
const ram = () => ev(() => { const p = window.__fb.G.player; return { on: !!p.ram, face: +p.face.toFixed(2), cd: window.__fb.G.teams[window.__fb.G.myTi].cds.sp1 }; });
const r = {};
r.lvl = (await prep()).lvl;
// 1. drag straight up: the slab, then release: the ram goes the camera's way
let b = await box('ab1');
await page.mouse.move(b.x, b.y); await page.mouse.down(); await page.mouse.move(b.x, b.y - 40, { steps: 4 }); await page.mouse.move(b.x, b.y - 90, { steps: 4 }); await frames(page, 2);
r.slab = await shown(); r.yaw = await ev(() => +window.__aim.cam.yaw.toFixed(2)); await page.screenshot({ path: '/tmp/c3l_slab.png' });
await page.mouse.up(); r.fired = await ram();
// 2. drag out and back onto the button: cancelled
await frames(page, 40); await prep(); b = await box('ab1');
await page.mouse.move(b.x, b.y); await page.mouse.down(); await page.mouse.move(b.x - 80, b.y - 60, { steps: 5 }); await frames(page, 1); r.out = await shown();
await page.mouse.move(b.x, b.y, { steps: 5 }); r.cancelCls = await page.locator('#ab1').evaluate(e => e.classList.contains('cancel')); await page.mouse.up(); await frames(page, 2); r.cancel = await ram(); r.afterCancel = await shown();
// 3. a tap: the way he faces
await prep(); b = await box('ab1'); await page.mouse.click(b.x, b.y); await frames(page, 1); r.tap = await ram();
// 4. in front of a wall: the slab is shorter
await frames(page, 40); await prep();
r.wall = await ev(async () => { const G = window.__fb.G, p = G.player, cam = window.__aim.cam;
  const cw = G.layout.cwalls.find(c => c.obs.some(o => o.cwall && o.cgate == null)), w = cw.obs.find(o => o.cwall && o.cgate == null && !o.gate);
  const ox = (w.x - cw.x) / Math.hypot(w.x - cw.x, w.z - cw.z), oz = (w.z - cw.z) / Math.hypot(w.x - cw.x, w.z - cw.z);
  p.x = w.x + ox * (w.r + 2.5); p.z = w.z + oz * (w.r + 2.5); cam.yaw = p.face = Math.atan2(-ox, -oz); window.__frame(2); return +cam.yaw.toFixed(2) + ' ' + p.face.toFixed(2); });
b = await box('ab1'); await page.mouse.move(b.x, b.y); await page.mouse.down(); await page.mouse.move(b.x, b.y - 90, { steps: 6 }); await frames(page, 2); r.wallSlab = await shown(); r.wyaw = await ev(() => +window.__aim.cam.yaw.toFixed(2));
await page.screenshot({ path: '/tmp/c3l_wall.png' }); await page.mouse.move(b.x, b.y, { steps: 4 }); await page.mouse.up();
// 5. Eagle's fall: a ring where he lands
await prep(); b = await box('ab3'); await page.mouse.move(b.x, b.y); await page.mouse.down(); await page.mouse.move(b.x - 30, b.y - 80, { steps: 5 }); await frames(page, 2);
r.ring = await shown(); await page.screenshot({ path: '/tmp/c3l_ring.png' }); await page.mouse.up(); await frames(page, 2); r.leap = await ev(() => !!window.__fb.G.player.eagle);
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(r));
const ad = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
ok(r.slab.slab > 4 && r.slab.slab < 6.5, `dragging Ram shows a ${r.slab.slab} m slab`);
ok(r.fired.on && ad(r.fired.face, r.yaw) < .15, `let go: he rams the way you dragged (${r.fired.face}, camera ${r.yaw})`);
ok(r.out.slab > 0 && r.cancelCls && !r.cancel.on && !r.cancel.cd && !r.afterCancel.slab, 'back onto the button: red, and nothing fires');
ok(r.tap.on && ad(r.tap.face, 2.5) < .15, `a tap rams the way he faces (${r.tap.face})`);
ok(r.wallSlab.slab > 0 && r.wallSlab.slab < 3, `in front of a wall the slab stops at it (${r.wallSlab.slab} m)`);
ok(r.ring.ring && r.leap, 'dragging Eagle\'s fall shows the landing ring, and he leaps');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
