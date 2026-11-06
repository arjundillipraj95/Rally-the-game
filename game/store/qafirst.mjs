// QA: a brand-new player's first minute on a phone (nothing stored): the home screen, Play, the first
// hints. Real clock (no frame control), so it plays as it would.
import { chromium } from 'playwright';
const OUT = '/tmp/claude-0/-home-claude/4e17cb5f-998f-589c-8d52-44170dd3d094/scratchpad/store/';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 872, height: 325 }, hasTouch: true, isMobile: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.goto('http://127.0.0.1:8766/');
await page.waitForTimeout(6000); await page.screenshot({ path: OUT + 'first_0home.png', timeout: 120000 });
await page.click('#playBtn', { timeout: 20000 }).catch(e => console.log('no play', e.message.slice(0, 120)));
for (let i = 1; i <= 6; i++) { await page.waitForTimeout(6000); await page.screenshot({ path: OUT + `first_${i}.png`, timeout: 120000 }); }
console.log('errors', errs);
await browser.close();
