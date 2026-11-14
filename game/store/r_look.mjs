// Polish pass (F18-F20): shots of the mountain in play, for judging the look. OUT=/tmp/look/, TAG names them.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const OUT = '/tmp/look/', TAG = process.env.TAG || 'now', Qy = process.env.QL || 'medium';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 800, 450, { q: '?crown2=1', quality: Qy });
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await run(60); await page.screenshot({ path: `${OUT}${TAG}_${Qy}_play.png`, timeout: 300000 });
await page.evaluate(() => { window.__camAt = [0, 26, 32, 0, 5, 0]; }); await run(2); await page.screenshot({ path: `${OUT}${TAG}_${Qy}_summit.png`, timeout: 300000 });
console.log(JSON.stringify(await page.evaluate(() => window.__amb && window.__amb())), JSON.stringify(await page.evaluate(() => { const T = window.__fb.G.player; return T && [T.x, T.y, T.z].map(v => +v.toFixed(1)); })));
console.log('look', TAG, Qy, errs.length ? errs.slice(0, 2) : 'no errors');
await browser.close();
