// FIX12: two thumbs at once on a touch phone. The left thumb holds the move stick; meanwhile the right thumb (a) drags
// the empty right side to turn the camera, (b) presses and drags a special's button to aim it, (c) holds Attack.
import { chromium } from 'playwright';
import { frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const ctx = await browser.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage(); page.on('pageerror', e => console.log('PAGEERROR', e.message));
await page.addInitScript(() => { localStorage.setItem('rally-tutorial-done', '1'); window.__testSheet = true; window.__raf = []; window.__t = 0;
  window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
  window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } }; });
await page.goto('http://127.0.0.1:8766/?crown2=1&champ=devi'); await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
await page.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.querySelector('#goBtn').click(); }); await frames(page, 30);
await page.evaluate(() => { const s = window.__fb.G.teams[window.__fb.G.myTi]; s.lvl = 7; s.cds = {}; });
const cdp = await ctx.newCDPSession(page);
if (process.env.DBG) console.log(await page.evaluate(() => JSON.stringify({ st: window.__fb.G.state, at: [[150, 300], [560, 150]].map(([x, y]) => { const e = document.elementFromPoint(x, y); return e && (e.id || e.className); }) })));
const touch = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts.map(([x, y, id]) => ({ x, y, id, radiusX: 5, radiusY: 5, force: 1 })) });
const center = sel => page.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, r.width > 0]; }, sel);
const st = () => page.evaluate(async () => { const I = await import('/src/ui/input.js'), C = await import('/src/render/camera.js'), A = await import('/src/ui/abilaim.js'); return { joy: I.inp.joy.active, jx: +I.inp.joy.x.toFixed(2), look: I.inp.look.id, yaw: +C.cam.yaw.toFixed(3), aim: A.aim.on, drag: A.aim.drag, atk: I.inp.attackHeld }; });
const L = [150, 300, 1];
// (a) stick held, then the right side dragged
await touch('touchStart', [L]); await touch('touchMove', [[190, 300, 1]]); await frames(page, 2);
let s0 = await st();
await touch('touchStart', [[190, 300, 1], [560, 150, 2]]);
for (let k = 1; k <= 6; k++) await touch('touchMove', [[190, 300, 1], [560 + k * 15, 150, 2]]);
await frames(page, 2); let s1 = await st();
ok(s0.joy && s1.joy && s1.jx > .5, `stick held throughout (x ${s1.jx})`);
ok(Math.abs(s1.yaw - s0.yaw) > .3, `camera turned by the second thumb while the stick is held (${s0.yaw} -> ${s1.yaw})`);
await touch('touchEnd', [[190, 300, 1]]); await touch('touchEnd', []); await frames(page, 2);
// (b) stick held, a special's button pressed and dragged
const [bx, by, vis] = await center('#ab2');
await touch('touchStart', [L]); await touch('touchMove', [[190, 300, 1]]); await frames(page, 1);
await touch('touchStart', [[190, 300, 1], [bx, by, 2]]);
for (let k = 1; k <= 6; k++) await touch('touchMove', [[190 + k, 300, 1], [bx - k * 12, by - k * 10, 2]]);
await frames(page, 1); const s2 = await st();
ok(vis && s2.aim && s2.drag && s2.joy, `special's button aimed by drag while the stick is held (aim ${s2.aim}, drag ${s2.drag}, stick ${s2.joy})`);
await touch('touchEnd', [[190, 300, 1]]); await touch('touchEnd', []); await frames(page, 2);
// (c) stick held, Attack held
const [ax, ay] = await center('#atk');
await touch('touchStart', [L]); await touch('touchMove', [[190, 300, 1]]); await frames(page, 1);
await touch('touchStart', [[190, 300, 1], [ax, ay, 2]]); await frames(page, 3); const s3 = await st();
ok(s3.atk && s3.joy, `Attack held while the stick is held (attack ${s3.atk}, stick ${s3.joy})`);
await touch('touchEnd', [[190, 300, 1]]); await touch('touchEnd', []);
// (d) FIX9: Piercing shot held with the stick held: drawing (slow walk, the line grows), let go: loosed
await page.evaluate(() => { const G = window.__fb.G, s = G.teams[G.myTi]; s.lvl = 7; s.cds = {}; G.player.stun = 0; });
const [px, py] = await center('#ab1');
await touch('touchStart', [L]); await touch('touchMove', [[190, 300, 1]]); await frames(page, 1);
await touch('touchStart', [[190, 300, 1], [px, py, 2]]); await frames(page, 3);
const d0 = await page.evaluate(async () => { const A = await import('/src/ui/abilaim.js'); const p = window.__fb.G.player; return { draw: !!p.pierce && !!p.pdraw, slab: A.aimShown().slab }; });
for (let k = 1; k <= 4; k++) await touch('touchMove', [[190, 300, 1], [px - k * 10, py - k * 12, 2]]);
await frames(page, 30);
const d1 = await page.evaluate(async () => { const A = await import('/src/ui/abilaim.js'); return { slab: A.aimShown().slab }; });
await touch('touchEnd', [[190, 300, 1]]); await frames(page, 6);
const d2 = await page.evaluate(() => { const G = window.__fb.G, p = G.player; return { gone: !p.pierce && !p.pdraw, cd: +((G.teams[G.myTi].cds || {}).sp1 || 0).toFixed(1) }; });
ok(d0.draw && d1.slab > d0.slab + 3, `Pierce held with the stick held: drawing, its line ${d0.slab} -> ${d1.slab} m`);
ok(d2.gone && d2.cd > 5, `let go: loosed (recharge ${d2.cd} s)`);
await touch('touchEnd', []);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
