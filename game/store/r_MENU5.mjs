// MENU5 the Champions screen v2: his 2D story art in the centre (splash; else his portrait; else a silhouette), Stats /
// Army / Lore tabs: Army lists what he recruits with each type's tiers by name, his soldiers' shares and his army ult;
// Lore shows his whole story. Screenshots in /tmp/menu/.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { open, frames } from './stage.mjs';
mkdirSync('/tmp/menu', { recursive: true });
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const fake = { id: 'hrolf', name: 'Hrolf', cls: 'vanguard', origin: 'Viking', lore: 'A test champion.', difficulty: 1, ranged: false, stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['foot', 'arch'], influence: null };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true, init: `window.__champs = [${JSON.stringify(fake)}];` });
for (let i = 0; i < 8; i++) { await frames(page, 5); await page.waitForTimeout(200); }
await page.click('#champsBtn'); await page.waitForTimeout(700);
const centre = await page.evaluate(() => { const i = document.querySelector('.csart .csimg'), r = document.querySelector('.csart').getBoundingClientRect(); return { src: i.getAttribute('src'), loaded: i.complete && i.naturalWidth > 0, w: Math.round(r.width), name: document.querySelector('.csname h3').textContent }; });
ok(/splash\/titus/.test(centre.src) && centre.loaded && centre.w > 150, `Titus's story art in the centre, ${centre.w} px wide`);
ok(/Titus Cassius/.test(centre.name), 'his name over it');
ok(await page.evaluate(() => !document.getElementById('csModel')), 'no 3D window on this screen');
await page.screenshot({ path: '/tmp/menu/r_MENU5_stats.png' });
await page.click('[data-info="army"]');
const army = await page.evaluate(() => document.querySelector('.csbody').textContent);
ok(/Spearmen/.test(army) && /Hastatus.*Princeps.*Triarius/.test(army) && /Archers/.test(army) && /Tiro.*Sagittarius.*Cretan archer/.test(army), 'Army: his spearmen and archers with their tiers by name');
ok(/20% health/.test(army) && /Testudo march/.test(army), 'Army: his soldiers\' shares and his army ult');
await page.screenshot({ path: '/tmp/menu/r_MENU5_army.png' });
await page.click('[data-info="lore"]');
const lore = await page.evaluate(() => { const p = document.querySelector('.cslorebox p'); return { t: p.textContent, fs: parseFloat(getComputedStyle(p).fontSize), clip: p.scrollHeight > p.clientHeight + 2 }; });
ok(/Senate banished his family/.test(lore.t) && lore.t.endsWith('He still loves Rome.') && lore.fs >= 12 && !lore.clip, `Lore: the whole story, ${lore.fs} px, not cut`);
await page.screenshot({ path: '/tmp/menu/r_MENU5_lore.png' });
// a champion with no art of his own: his portrait, else the silhouette
await page.click('.ptile[data-id="hrolf"]'); await page.waitForTimeout(800);
const h = await page.evaluate(() => { const i = document.querySelector('.csart .csimg'); return { hidden: i.hidden, src: i.getAttribute('src') }; });
ok(h.hidden || /portraits\/hrolf/.test(h.src), `no splash: falls back (${h.hidden ? 'silhouette' : h.src})`);
await page.click('[data-info="army"]');
ok(/Footmen/.test(await page.evaluate(() => document.querySelector('.csbody').textContent)), 'Army for a champion without names: the generic tiers');
await page.close(); await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
