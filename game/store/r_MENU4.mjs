// MENU4 Settings > Champion: your main and backup, owned champions only; Titus the main at the start; one owned
// champion = backup None with a note; with a second (a test champion, Hrolf) both can be set, saved, and the home
// stage follows.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const fake = { id: 'hrolf', name: 'Hrolf', cls: 'vanguard', origin: 'Viking', lore: 'A test champion.', difficulty: 1, ranged: false, stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['foot', 'arch'], influence: null };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const read = p => p.evaluate(() => ({ main: [...document.querySelectorAll('#segMain button')].map(b => b.textContent + (b.getAttribute('aria-pressed') === 'true' ? '*' : '')).join(), back: [...document.querySelectorAll('#segBack button')].map(b => b.textContent + (b.getAttribute('aria-pressed') === 'true' ? '*' : '')).join(), note: document.getElementById('backNote').textContent, shown: !document.getElementById('tabSettings').hidden }));
const clear = `localStorage.removeItem('rally-champ'); localStorage.removeItem('rally-backup');`;
let page = await open(browser, 844, 390, { home: true, init: clear }); await frames(page, 4);
await page.click('#setBtn'); let s = await read(page);
ok(s.shown && s.main.startsWith('Titus*') && /Devi/.test(s.main), `fresh start: Titus the main, owned champions listed (${s.main})`);
ok(s.back.startsWith('None*') && !/Titus/.test(s.back) && /Highlighted/.test(s.note), `backup: None or another owned one, never the main (${s.back})`);
await page.close();
page = await open(browser, 844, 390, { home: true, init: `window.__champs = [${JSON.stringify(fake)}]; ${clear}` }); for (let i = 0; i < 8; i++) { await frames(page, 5); await page.waitForTimeout(200); }
await page.click('#setBtn'); s = await read(page);
ok(s.main === 'Titus*,Hrolf,Devi' && s.back === 'None*,Hrolf,Devi', `three owned: ${s.main} / ${s.back}`);
await page.click('#segMain button[data-v="hrolf"]'); s = await read(page);
ok(s.main === 'Titus,Hrolf*,Devi' && s.back === 'None*,Titus,Devi', `main Hrolf: the backup list is the others (${s.back})`);
await page.click('#segBack button[data-v="titus"]'); s = await read(page);
const saved = await page.evaluate(() => [localStorage.getItem('rally-champ'), localStorage.getItem('rally-backup')]);
ok(s.back === 'None,Titus*,Devi' && saved.join() === 'hrolf,titus', `backup Titus, saved (${saved})`);
await page.click('#sheetBack'); await frames(page, 4);
const home = await page.evaluate(() => ({ name: document.getElementById('homeChampName').textContent, stage: window.__fb.G.champs[window.__fb.G.myTi] }));
ok(/Hrolf/.test(home.name) && home.stage === 'hrolf', `the home stage shows the new main (${home.name.trim()}, ${home.stage})`);
await page.click('#setBtn'); await page.click('#segMain button[data-v="titus"]'); s = await read(page);
ok(s.main === 'Titus*,Hrolf,Devi' && s.back === 'None,Hrolf*,Devi', `main back to Titus: the old main becomes the backup (${s.back})`);
await page.screenshot({ path: '/tmp/menu/r_MENU4_settings.png' });
await page.close(); await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
