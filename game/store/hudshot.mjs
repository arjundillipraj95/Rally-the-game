// Dev check: the in-match HUD on a phone-sized screen, optionally with a panel open (argv: name, w, h, js-to-run)
import { chromium } from 'playwright';
import { OUT } from './stage.mjs';
const [name = 'hud', w = 844, h = 390, js = ''] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: +w, height: +h }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
p.on('pageerror', e => console.log('ERR', e.message));
await p.addInitScript(() => { localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); });
await p.goto('http://127.0.0.1:8766/'); await p.waitForTimeout(800);
await p.click('#goBtn'); await p.waitForTimeout(2500);
await p.evaluate(() => { const G = window.__fb.G; G.teams[G.myTi].gold = 200; });
await p.waitForTimeout(300);
if (js) await p.evaluate(js);
await p.waitForTimeout(400);
await p.screenshot({ path: OUT + name + '.png' });
await b.close();
