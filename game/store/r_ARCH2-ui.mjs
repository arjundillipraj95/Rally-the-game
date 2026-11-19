// ARCH2 upgrade panel: Devi's (archers and stone throwers) shows no Footmen column; each column one button (the next
// tier); the "i" on a button shows what it changes and does not buy it. Needs the game server.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=devi' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 6);
await page.evaluate(() => { const G = window.__fb.G; G.teams[G.myTi].gold = 2000; });
await page.click('#upBtn'); await frames(page, 4);
const seen = () => page.evaluate(() => [...document.querySelectorAll('#upTray .ucol')].filter(c => !c.classList.contains('bsHide') && !c.hidden && c.offsetParent).map(c => c.querySelector('h4').textContent + ':' + [...c.querySelectorAll('button')].filter(b => !b.hidden && !b.classList.contains('bsHide')).map(b => b.dataset.up).join('+')).join(' '));
const s0 = await seen();
ok(!/Footmen/.test(s0) && /Archers:arch1( |$)/.test(s0) && /Stone throwers:thr1( |$)/.test(s0), `her panel: ${s0}`);
await page.locator('#upTray button[data-up="arch1"] .uinfo').click(); await frames(page, 2);
const card = await page.evaluate(() => { const b = document.getElementById('upInfo'); return b && !b.hidden ? b.innerText.replace(/\s+/g, ' ') : ''; });
const bought = await page.evaluate(() => !!((window.__fb.G.teams[window.__fb.G.myTi].up || {}).arch1));
ok(/Agni Villalar/i.test(card) && /Now/.test(card) && /Fire arrows/.test(card), `the "i": ${card.slice(0, 160)}`);
ok(!bought, `the "i" buys nothing (${bought})`);
await page.mouse.click(10, 10); await frames(page, 2);
await page.evaluate(() => { const G = window.__fb.G; G.teams[G.myTi].up = { ...(G.teams[G.myTi].up || {}), arch1: 1, thr1: 1 }; }); if (await page.evaluate(() => document.getElementById('upTray').hidden)) await page.click('#upBtn'); await frames(page, 4);
const s1 = await seen();
ok(/Archers:arch2( |$)/.test(s1) && /Stone throwers:thr2( |$)/.test(s1), `bought the first: the next shows (${s1})`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
