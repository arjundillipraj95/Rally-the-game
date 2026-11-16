// SPD1: one speed for every captain (the player's and the computer's), on foot and mounted; the Ride button shows it.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 30);
const a = await page.evaluate(() => { const { G } = window.__fb, caps = G.units.filter(u => u.leader && !u.dead);
  return { spds: [...new Set(caps.map(u => u.spd))], n: caps.length, human: caps.some(u => u.human), txt: document.getElementById('mntS').textContent }; });
ok(a.n >= 4 && a.human && a.spds.length === 1, `every captain (${a.n}, yours too) walks at one speed: ${a.spds.join(', ')} m/s`);
ok(/^\d+\.\d m\/s$/.test(a.txt) && parseFloat(a.txt) === a.spds[0], `Ride button shows the speed on foot: "${a.txt}"`);
await page.evaluate(() => { const { G } = window.__fb, p = G.units.find(u => u.human && u.leader); p.mounted = true; });
await frames(page, 10);
const b = await page.evaluate(() => document.getElementById('mntS').textContent);
ok(parseFloat(b) > parseFloat(a.txt) * 1.7, `and mounted: "${b}"`);
ok(!errs.length, `no errors ${errs.slice(0, 2).join(' | ')}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
