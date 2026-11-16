// MAP4: on the new mountain the screens speak of castles only: no village or keep in the Points panel,
// the battle feed, the end screen and the report; the minimap draws the border rivers, King's Roads and nexus
// (no errors drawing it). A whole battle, headless, then the end screen.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 30);
await page.evaluate(() => document.getElementById('points').click()); await frames(page, 4); await page.waitForTimeout(600); await frames(page, 4);
const panel = await page.evaluate(() => { const e = document.getElementById('capList'); return 'hidden=' + e.hidden + ' ' + e.innerText; }); console.log('     panel: ' + panel.slice(0, 200).replace(/\n/g, ' '));
ok(/castles/i.test(panel) && !/villag|keep/i.test(panel), 'Points panel: castles, no villages or keeps');
ok((panel.match(/castles/gi) || []).length === 1 && (await page.evaluate(() => document.querySelectorAll('#capList .pl').length)) === 12, 'Points panel lists the 12 castles');
const feed = [];
for (let k = 0; k < 44 && (await page.evaluate(() => window.__fb.G.state)) === 'play'; k++) {
  await page.evaluate(() => window.__fb.step(450)); await frames(page, 2);
  feed.push(await page.evaluate(() => document.body.innerText));
}
await frames(page, 60); await page.waitForTimeout(500); await frames(page, 60);
const endText = await page.evaluate(() => document.body.innerText);
const bad = s => (s.match(/[^\n]*\b(villag\w*|keeps?)\b[^\n]*/gi) || []).filter(l => !/keep (it|him|them|your|up|the|enemies|going|on|moving|away)|keeps (it|him|them|your|up|the|going|on)|keep a|keeper|safe|Keep enemies/i.test(l));
const inFeed = [...new Set(feed.flatMap(bad))];
ok(!inFeed.length, `battle screen: no village or keep${inFeed.length ? ' (' + inFeed.slice(0, 3).join(' | ') + ')' : ''}`);
ok(await page.evaluate(() => window.__fb.G.state === 'end'), 'the battle ended');
const inEnd = bad(endText);
ok(!inEnd.length, `end screen and report: no village or keep${inEnd.length ? ' (' + inEnd.slice(0, 3).join(' | ') + ')' : ''}`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await page.screenshot({ path: '/tmp/r_MAP4_end.png' });
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
