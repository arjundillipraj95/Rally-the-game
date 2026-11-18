// LORE1 the champions' page: from the main screen's Champions button, a card each with the lore, class, Melee tag,
// stat bars and difficulty stars; "Play as" picks him.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '', home: true });
await page.click('#champsBtn'); await page.waitForTimeout(200); await page.screenshot({ path: '/tmp/lore1.png' });
const r = await page.evaluate(() => { const c = document.querySelector('.cpCard[data-id="titus"]'); return c && { lore: /Lucius Cassius/.test(c.textContent), melee: /Melee/.test(c.textContent), cls: /Vanguard/.test(c.textContent), bars: c.querySelectorAll('.cpStats u').length, stars: (c.textContent.match(/★/g) || []).length, cards: document.querySelectorAll('.cpCard').length }; });
await page.click('.cpCard[data-id="legionary"] button'); const pick = await page.evaluate(() => localStorage.getItem('rally-champ'));
await page.click('.cpCard[data-id="titus"] button'); const back = await page.evaluate(() => localStorage.getItem('rally-champ'));
await page.click('#cpDone'); const closed = await page.locator('#champPage').isHidden();
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify({ r, pick, back, closed }));
ok(r && r.lore && r.melee && r.cls && r.bars === 6 && r.stars === 2 && r.cards >= 2, 'Titus\'s card: lore, Vanguard, Melee, six bars, two stars');
ok(pick === 'legionary' && back === 'titus' && closed, '"Play as" picks the champion; Done closes');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
