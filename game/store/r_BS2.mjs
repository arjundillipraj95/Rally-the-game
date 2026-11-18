// BS2 pings and the quick-chat wheel: a tap on the minimap pings "Attack here!" at the place under the finger; the
// wheel's ping lines mark a place too; the ping pulses on the minimap; another phone on your side gets it with its place.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const r = {};
await page.evaluate(() => { const F = window.__fb, G = F.G; G.T = 40; F.step(1); window.__frame(10); window.__got = []; });
await page.evaluate(async () => { const { bus } = await import('/src/core/state.js'); bus.on('shownMsg', m => { if (m.k === 'callout') window.__got.push(m.a); }); });
// the minimap's centre is where the camera's... the map's middle: tap it
const b = await page.locator('#mini').boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await frames(page, 2);
r.mini = await page.evaluate(async () => { const P = await import('/src/ui/pings.js'); return { got: window.__got.slice(-1)[0], n: P.pings.length }; });
await page.waitForTimeout(1100);
await page.click('#shoutBtn'); r.wheel = await page.locator('#shoutTray').isVisible(); await page.click('#shoutTray button[data-s="6"]'); await frames(page, 2);
r.help = await page.evaluate(() => { const a = window.__got.slice(-1)[0], p = window.__fb.G.player; return { k: a && a[1], d: a ? Math.hypot(a[2] - p.x, a[3] - p.z) : 99 }; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(r));
ok(r.mini.got && r.mini.got[1] === 4 && Math.hypot(r.mini.got[2], r.mini.got[3]) < 20 && r.mini.n >= 1, 'a tap on the minimap\'s middle pings "Attack here!" near the map\'s middle, and it shows');
ok(r.wheel && r.help.k === 6 && r.help.d < 1, 'the quick-chat wheel opens; "Help!" marks where you stand');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
