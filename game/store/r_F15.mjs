// F15: always landscape and full screen. Stubs full screen and the orientation lock (headless can't do either) and checks:
// first tap -> full screen + lock; tap after full screen was lost (mic prompt) -> again; portrait mid-battle -> turn screen
// (not on the home screen); landscape -> gone; iPhone -> no full-screen ask, hint shown; Install button appears and prompts.
import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const fails = [];
const ck = (c, m) => { if (!c) { fails.push(m); console.log('FAIL', m); } else console.log('ok  ', m); };
async function phone(ua, w, h) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true, userAgent: ua });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.addInitScript(() => {
    localStorage.setItem('rally-quality', 'low'); localStorage.setItem('rally-tutorial-done', '1');
    window.__raf = []; window.__t = 0;
    window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
    window.__testSheet = true;
    window.__fs = 0; window.__lock = 0; let on = false;
    Object.defineProperty(document, 'fullscreenElement', { get: () => on ? document.documentElement : null, configurable: true });
    Element.prototype.requestFullscreen = () => { window.__fs++; on = true; return Promise.resolve(); };
    window.__loseFs = () => { on = false; };
    try { Object.defineProperty(screen, 'orientation', { value: { lock: () => { window.__lock++; return Promise.resolve(); } }, configurable: true }); } catch (e) {}
  });
  await page.goto('http://127.0.0.1:8766/');
  await page.waitForFunction(() => window.__fb && window.__fb.G);
  await page.evaluate(() => window.__frame(3));
  return page;
}
const ANDROID = 'Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36';
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1';

// Android
let p = await phone(ANDROID, 844, 390);
ck(await p.evaluate(() => window.__fs) === 0, 'no full screen before any tap');
await p.touchscreen.tap(400, 200);
let r = await p.evaluate(() => [window.__fs, window.__lock]);
await new Promise(r => setTimeout(r, 100)); r = await p.evaluate(() => [window.__fs, window.__lock]);
ck(r[0] === 1 && r[1] >= 1, `first tap on any screen: full screen asked (${r[0]}), landscape locked (${r[1]})`);
await p.evaluate(() => window.__loseFs()); // (the mic prompt drops full screen)
await p.touchscreen.tap(400, 200);
ck(await p.evaluate(() => window.__fs) === 2, 'tap after full screen was lost: asked again');
const hidden0 = await p.evaluate(() => document.getElementById('turnPhone').hidden);
ck(hidden0, 'landscape home: no turn screen');
await p.setViewportSize({ width: 390, height: 844 });
await new Promise(r => setTimeout(r, 600));
ck(await p.evaluate(() => document.getElementById('turnPhone').hidden), 'portrait on the home screen: no turn screen (home has its own hint)');
await p.evaluate(() => { document.querySelector('#goBtn').click(); window.__frame(5); });
await new Promise(r => setTimeout(r, 700));
ck(await p.evaluate(() => !document.getElementById('turnPhone').hidden), `portrait mid-battle (state ${await p.evaluate(() => window.__fb.G.state)}): turn screen shown`);
await p.setViewportSize({ width: 844, height: 390 });
await new Promise(r => setTimeout(r, 700));
ck(await p.evaluate(() => document.getElementById('turnPhone').hidden), 'back to landscape: turn screen gone');
ck(await p.evaluate(() => document.getElementById('turnIOS').hidden), 'Android: no Add to Home Screen hint');
// Install
ck(await p.evaluate(() => [...document.querySelectorAll('.installBtn')].every(b => b.hidden)), 'Install hidden until the browser offers it');
await p.evaluate(() => { const e = new Event('beforeinstallprompt'); e.prompt = () => { window.__prompted = 1; return Promise.resolve(); }; e.userChoice = Promise.resolve({}); window.dispatchEvent(e); });
ck(await p.evaluate(() => [...document.querySelectorAll('.installBtn')].some(b => !b.hidden)), 'Install shown once offered');
await p.evaluate(() => [...document.querySelectorAll('.installBtn')].find(b => !b.hidden).click());
await new Promise(r => setTimeout(r, 100));
ck(await p.evaluate(() => window.__prompted === 1), 'Install button opens the browser install prompt');
await p.context().close();

// iPhone
p = await phone(IPHONE, 390, 844);
await p.touchscreen.tap(200, 400);
ck(await p.evaluate(() => window.__fs) === 0, 'iPhone: no full-screen ask (not allowed there)');
await p.evaluate(() => { document.querySelector('#goBtn').click(); window.__frame(5); });
await new Promise(r => setTimeout(r, 700));
ck(await p.evaluate(() => !document.getElementById('turnPhone').hidden && !document.getElementById('turnIOS').hidden), 'iPhone portrait mid-battle: turn screen with Add to Home Screen hint');
await p.screenshot({ path: '/tmp/f15_iphone.png' });
await browser.close();
console.log(fails.length ? 'FAILED ' + fails.length : 'ALL PASS');
process.exit(fails.length ? 1 : 0);
