// Dev check: missions, the season and the shop. A battle's moments tick missions and earn stars; a
// season tier unlocks its piece; the Gold track and the shop go through the purchase hook (stubbed here).
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await frames(page, 20);
await page.click('#missBtn'); await frames(page, 5);
await page.screenshot({ path: OUT + 'missions.png', timeout: 120000 });
const list = await page.evaluate(() => [...document.querySelectorAll('#missList .mrow')].map(r => r.innerText.replace(/\s+/g, ' ')));
console.log('missions', list);
// a battle: everything in the pool done once, and a win; then a few more to pass tier 4
const res = await page.evaluate(async () => { const S = await import('/src/ui/season.js'); const out = [];
  for (let i = 0; i < 40; i++) out.push(S.afterBattle({ result: 'win', moments: { capkill: 3, hold: 4, castle: 1, exec: 1, duel: 1, crown: 1, parry: 5, bash: 4, chest: 1 } }));
  return out.map(r => JSON.stringify(r) + ' ' + JSON.parse(localStorage.getItem('rally-season')).stars); });
console.log(res.join('\n'));
await page.click('#missDone'); await page.click('#missBtn'); await frames(page, 3);
console.log('track', await page.evaluate(() => document.getElementById('trackList').innerText.replace(/\s+/g, ' ')));
// the pass and the shop: not open (nothing happens), then with a purchase provider
await page.click('#passBtn'); await frames(page, 2); console.log('toast', await page.evaluate(() => document.querySelector('.toast:not([hidden])') && document.querySelector('.toast:not([hidden])').innerText));
await page.evaluate(() => { window.__PURCHASE = (sku, done) => done(true); });
await page.click('#passBtn'); await frames(page, 2); console.log('pass', await page.evaluate(() => document.getElementById('passBtn').textContent), await page.evaluate(() => document.getElementById('trackList').innerText.replace(/\s+/g, ' ')));
await page.click('#missDone'); await page.click('#shopBtn'); await frames(page, 2);
await page.click('[data-buy="armour:3"]'); await frames(page, 2); console.log('shop', await page.evaluate(() => document.getElementById('shopList').innerText.replace(/\s+/g, ' ')));
await page.click('#shopDone'); await page.click('#wardBtn'); await frames(page, 5);
for (const [c, v] of [['helm', 3], ['armour', 3], ['cape', 3]]) if (await page.$(`.wcats [data-c="${c}"]`)) { await page.click(`.wcats [data-c="${c}"]`); await page.click(`.witem[data-i="${v}"]`); }
await page.click('.wcats [data-c="helm"]'); await frames(page, 40);
await page.screenshot({ path: OUT + 'ward-earned.png', timeout: 120000 });
console.log('locked helm items', await page.evaluate(() => [...document.querySelectorAll('.witem.locked')].map(b => b.innerText.replace(/\s+/g, ' '))));
console.log('look', await page.evaluate(() => localStorage.getItem('rally-look')), 'errors:', errs.slice(0, 3));
await browser.close();
