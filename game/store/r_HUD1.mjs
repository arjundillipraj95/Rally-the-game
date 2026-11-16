// HUD1: your side's camp buff shows under the phase with its seconds left (and goes when it ends); a buff camp's mini
// captain has his buff's name over him (checked by eye in /tmp/hud1_boss.png) and every camp has one.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const tag = () => page.evaluate(() => { const e = document.getElementById('buffTag'); return { hidden: e.hidden, txt: e.textContent, cls: e.className }; });
const a = await tag(); ok(a.hidden, 'no buff: no tag');
await page.evaluate(() => { const { G } = window.__fb; G.teams[G.myTi].buff = { kind: 'drum', until: G.T + 60 }; }); await frames(page, 5);
const b = await tag(); ok(!b.hidden && b.cls === 'drum' && /war drum.*damage.*\ds$/i.test(b.txt), `war drum: "${b.txt}"`);
await page.evaluate(() => { const { G } = window.__fb; G.teams[G.myTi].buff = { kind: 'swift', until: G.T + 30 }; }); await frames(page, 5);
const c = await tag(); ok(!c.hidden && c.cls === 'swift' && /swift.*speed/i.test(c.txt), `swift: "${c.txt}"`);
await page.evaluate(() => { const { G } = window.__fb; G.teams[G.myTi].buff.until = G.T - 1; }); await frames(page, 5);
ok((await tag()).hidden, 'buff over: tag gone');
const n = await page.evaluate(() => window.__fb.G.c2.breaks.filter(b => b.buff && b.units.some(u => u.boss && !u.dead)).length);
ok(n === 8, `${n} buff camps each with a mini captain (8)`);
// a look at one: camera beside the mini captain, his post awake so his bar shows
const bx = await page.evaluate(() => { const { G, camera } = window.__fb, b = G.c2.breaks.find(b => b.buff), u = b.units.find(u => u.boss); u.hp = u.max * .7;
  const p = G.units.find(o => o.human && o.leader); p.x = u.x + 6; p.z = u.z + 6; return [u.x, u.z]; });
await frames(page, 30);
await page.screenshot({ path: '/tmp/hud1_boss.png', timeout: 60000 });
ok(!errs.length, `no errors ${errs.slice(0, 2).join(' | ')}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
