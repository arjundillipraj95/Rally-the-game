// Dev check for a reported freeze: solo match, given map/mode/color, the real game loop (drawing on),
// captain marching at the enemy. Reports every error and whether game time keeps advancing.
// node store/freeze.mjs <map> <mode> <color> <seconds> [teams]
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const [map = 'frost', mode = 'dm', color = '2', secs = 60, teams = ''] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push('PAGE ' + e.message + ' ' + (e.stack || '').split('\n').slice(1, 4).join(' | ')));
page.on('console', m => { if (m.type() === 'error') errs.push('CON ' + m.text().slice(0, 400)); });
const tap = sel => page.evaluate(sel => document.querySelector(sel).click(), sel);
await tap(`#segMode button[data-v="${mode}"]`); await tap(`#segColor button[data-v="${color}"]`);
if (teams) await tap(`#segTeams button[data-v="${teams}"]`);
await tap(`#segMap button[data-v="${map}"]`);
await page.click('#goBtn'); await frames(page, 10);
await page.evaluate(() => { window.__moveOverride = () => { const p = window.__fb.G.player; return { wx: -Math.sign(p.x) * .7, wz: -Math.sign(p.z) * .7, mag: 1, camYaw: 0 }; }; });
let lastT = -1;
for (let s = 0; s < +secs; s += 5) {
  await frames(page, 150);
  const st = await page.evaluate(() => { const G = window.__fb.G; return { T: +G.T.toFixed(1), state: G.state, hp: G.player && Math.round(G.player.hp), dead: G.player && G.player.dead }; });
  if (st.T === lastT) console.log('TIME STOPPED at', st);
  lastT = st.T;
  if (s % 15 === 0) console.log(JSON.stringify(st));
  if (errs.length) break;
}
console.log('errors:', errs.length, errs.slice(0, 4).join('\n'));
await browser.close();
