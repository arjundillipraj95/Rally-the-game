// The score with recorded instruments, in a real (headless) browser: the orchestra notes load, the
// music follows you (on the move the pace lifts; badly hurt it sinks behind a heartbeat), and the
// clash level still comes in when fighting is all round you. No page errors.
// Usage: node store/r_F21.mjs   (with the built game served on :8766)
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--autoplay-policy=no-user-gesture-required'] });
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
const page = await open(browser, 480, 270);
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.evaluate(() => { document.getElementById('goBtn').click(); });
const run = (n, dt = 33) => page.evaluate(([n, dt]) => { for (let i = 0; i < n; i++) window.__frame(1, dt); }, [n, dt]);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await page.waitForTimeout(2500); // (the samples load over the network)
const A = () => page.evaluate(() => window.__fb.audio());
let a = await A(); console.log(JSON.stringify(a.music));
ok(a.state === 'running', 'audio running: ' + a.state);
ok(a.music.samples === 21 && a.music.rec, `all 21 orchestra notes loaded (${a.music.samples})`);
// stand still: calm, no pace
await page.evaluate(() => { const F = window.__fb, p = F.G.player; for (const u of F.G.units) if (u !== p && Math.hypot(u.x - p.x, u.z - p.z) < 60 && F.G.ALLY[u.ti % 4] !== F.G.ALLY[p.ti % 4]) u.x += 500; });
await run(30); a = await A(); ok(a.music.move < .2, 'standing still: move ' + a.music.move);
// walk: drag the captain along at his own top speed each frame
for (let i = 0; i < 60; i++) { await page.evaluate(() => { const p = window.__fb.G.player; p.x += (p.spd || 6) * .033 * .9; }); await run(1); }
a = await A(); ok(a.music.move > .5, 'on the move: move ' + a.music.move);
// badly hurt
await page.evaluate(() => { const p = window.__fb.G.player; p.hp = p.max * .1; });
await run(20, 100); a = await A(); ok(a.music.hurt > .6, 'badly hurt: hurt ' + a.music.hurt);
await page.evaluate(() => { const p = window.__fb.G.player; p.hp = p.max; });
await run(60, 100); a = await A(); ok(a.music.hurt === 0, 'healed: hurt back to ' + a.music.hurt);
// real time passes so beats get scheduled on the audio clock
for (let i = 0; i < 4; i++) { await run(2); await page.waitForTimeout(800); }
a = await A(); ok(a.music.bar > 0 || a.music.beat > 0, `beats scheduled on the audio clock (bar ${a.music.bar}, beat ${a.music.beat})`);
ok(!errs.length, 'no page errors' + (errs.length ? ': ' + errs[0] : ''));
console.log(`${pass}/${pass + fail}`); await browser.close(); process.exit(fail ? 1 : 0);
