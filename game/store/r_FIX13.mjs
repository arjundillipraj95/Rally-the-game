// FIX13: the picture keeps the screen's shape after a rotate (not stretched), and on a touch phone Fortify can be pressed
// (the sound bars' style had turned the battle button bar into a grid that put Recruit over it).
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 393, height: 851 }, hasTouch: true, isMobile: true });
const page = await ctx.newPage(); page.on('pageerror', e => console.log('ERR', e.message));
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
await page.addInitScript(() => { localStorage.setItem('rally-tutorial-done', '1'); window.__testSheet = true;
  window.__raf = []; window.__t = 0; window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
  window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } }; });
await page.goto('http://127.0.0.1:8766/?crown2=1');
await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
await page.setViewportSize({ width: 851, height: 393 }); await page.evaluate(() => { dispatchEvent(new Event('resize')); window.__frame(3); });
const asp = await page.evaluate(async () => { const { camera } = await import('/src/render/scene.js'); const e = camera.projectionMatrix.elements; return { want: innerWidth / innerHeight, got: e[5] / e[0] }; });
ok(Math.abs(asp.got - asp.want) < .01, `after turning the phone the picture has the screen's shape (${asp.got.toFixed(2)} vs ${asp.want.toFixed(2)})`);
await page.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); window.__frame(60); });
const r = await page.evaluate(() => { const b = document.getElementById('fortBtn'); b.hidden = false; const q = b.getBoundingClientRect(), t = document.elementFromPoint(q.x + q.width / 2, q.y + q.height / 2);
  const row = [...document.querySelectorAll('body.bs .sbar > .sbtn, body.bs .sbar > button')].filter(x => x.getBoundingClientRect().width > 0).map(x => Math.round(x.getBoundingClientRect().top)); return { hit: t && t.closest("button") && t.closest("button").id, rows: new Set(row).size, ids: [...document.querySelectorAll("body.bs .sbar > .sbtn, body.bs .sbar > button")].map(x => x.id + ":" + Math.round(x.getBoundingClientRect().top)).join(" ") }; });
ok(r.hit === 'fortBtn', `a tap on Fortify reaches Fortify (${r.hit})`);
ok(r.rows === 1, `the battle buttons are one row (${r.ids})`);
const sb = await page.evaluate(() => getComputedStyle(document.querySelector('[data-sound-bars] .vbar')).display);
ok(sb === 'grid', `the sound bars keep their own layout (${sb})`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
