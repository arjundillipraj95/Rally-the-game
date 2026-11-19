// MENU2 the Champions screen: the 9-champion roster grid with its states (owned, not owned with lock and price,
// coming soon, ★ main, B backup), class tabs, the selected champion's art in the centre (MENU5),
// Set as main / Set as backup, Back. Test champions (window.__champs) make Hrolf (free) and the Roman Raider (to buy)
// playable. Screenshots in /tmp/menu/.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { open, frames } from './stage.mjs';
mkdirSync('/tmp/menu', { recursive: true });
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const fake = (id, name, cls) => ({ id, name, cls, origin: 'Viking', lore: 'A test champion.', difficulty: 1, ranged: false, stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['foot', 'arch'], influence: null });
const init = `window.__champs = ${JSON.stringify([fake('hrolf', 'Hrolf', 'vanguard'), fake('romraider', 'Raider', 'raider')])}; localStorage.removeItem('rally-champ'); localStorage.removeItem('rally-backup');`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true, init });
for (let i = 0; i < 12; i++) { await frames(page, 5); await page.waitForTimeout(250); }
await page.click('#champsBtn'); for (let i = 0; i < 8; i++) { await frames(page, 6); await page.waitForTimeout(150); }
const tiles = () => page.evaluate(() => [...document.querySelectorAll('#champScreen .ptile')].map(t => ({ id: t.dataset.id, c: t.className, main: !!t.querySelector('.pmain'), back: !!t.querySelector('.pback'), lock: (t.querySelector('.plock') || {}).textContent || '' })));
let T = await tiles(); const by = id => T.find(t => t.id === id) || {};
ok(!(await page.isHidden('#champScreen')) && await page.isHidden('#home'), 'Champions opens its own screen over the stage');
ok(T.length === 9, `the launch roster: ${T.length} tiles`);
ok(/owned/.test(by('titus').c) && by('titus').main && /sel/.test(by('titus').c), 'Titus: owned, ★ your main, selected on open');
ok(/soon/.test(by('devi').c) && /soon/.test(by('sigrun').c), 'Devi and Sigrun: Coming soon (no page yet)');
ok(/locked/.test(by('romraider').c) && by('romraider').lock.includes('6,000'), `a champion to buy: greyed, lock and ${by('romraider').lock}`);
// (MENU5: the centre shows his 2D art, not the 3D figure)
const art0 = await page.evaluate(() => (document.querySelector('.csart .csimg') || {}).getAttribute?.('src') || '');
ok(/splash\/titus/.test(art0), `Titus's story art in the centre (${art0})`);
await page.screenshot({ path: '/tmp/menu/r_MENU2_titus.png' });
// tabs
await page.click('#champScreen [data-tab="striker"]'); T = await tiles();
ok(T.length === 3 && T.every(t => ['devi', 'romstriker', 'vikstriker'].includes(t.id)), `Striker tab: ${T.map(t => t.id)}`);
await page.click('#champScreen [data-tab="all"]');
// one still to come: his art in the window
await page.click('.ptile[data-id="devi"]'); await frames(page, 4);
const art = await page.evaluate(() => ({ src: document.querySelector('.csart .csimg').getAttribute('src'), soon: document.querySelector('.csart').classList.contains('soon'), txt: document.querySelector('.csinfo').textContent }));
ok(/splash\/devi/.test(art.src) && art.soon && /Coming soon/.test(art.txt), 'Devi selected: her art in the centre (greyed), Coming soon');
await page.screenshot({ path: '/tmp/menu/r_MENU2_devi.png' });
// set Hrolf as main, Titus as backup
await page.click('.ptile[data-id="hrolf"]'); await frames(page, 4);

await page.click('.csinfo [data-act="main"]');
await page.click('.ptile[data-id="titus"]'); await page.click('.csinfo [data-act="backup"]'); T = await tiles();
const saved = await page.evaluate(() => [localStorage.getItem('rally-champ'), localStorage.getItem('rally-backup')]);
ok(saved[0] === 'hrolf' && saved[1] === 'titus', `★ Set as main, Set as backup saved (${saved})`);
ok(by('hrolf').main && by('titus').back, 'grid marks ★ on the main and B on the backup');
const buy = await page.evaluate(() => { document.querySelector('.ptile[data-id="romraider"]').click(); return [...document.querySelectorAll('.csacts button')].map(b => [b.textContent.trim(), b.disabled]); });
ok(buy.length === 1 && buy[0][1] && /6,000/.test(buy[0][0]), `not owned: no Set as main, the price (${buy[0] && buy[0][0]})`);
// back: home again, your main on the stage
await page.click('#champScreen [data-act="close"]'); await frames(page, 4);
const back = await page.evaluate(() => ({ home: !document.getElementById('home').hidden, cs: document.getElementById('champScreen').hidden, ch: window.__fb.G.champs[window.__fb.G.myTi] }));
ok(back.home && back.cs && back.ch === 'hrolf', `Back: home again with the main on the stage (${back.ch})`);
await page.close(); await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
