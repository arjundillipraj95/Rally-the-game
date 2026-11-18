// C3f Titus the default: with nothing chosen you and every bot play Titus; ?champ=legionary still gives the legionary
// (for tests and comparison); a choice saved in the settings is kept.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const run = async (q, init) => { const page = await open(browser, 844, 390, { q, init });
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
  const r = await page.evaluate(() => ({ champs: window.__fb.G.champs.join(), mine: window.__fb.G.champs[window.__fb.G.myTi] })); await page.close(); return r; };
const a = await run('?crown2=1'), b = await run('?crown2=1&champ=legionary'), c = await run('?crown2=1', `localStorage.setItem('rally-champ', 'legionary');`);
await browser.close();
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
console.log(JSON.stringify({ a, b, c }));
ok(a.champs.split(',').every(x => x === 'titus'), `nothing chosen: everyone plays Titus (${a.champs})`);
ok(b.mine === 'legionary' && b.champs.split(',').slice(1).every(x => x === 'titus'), `?champ=legionary: you the legionary, the bots Titus (${b.champs})`);
ok(c.mine === 'legionary', 'a saved choice is kept');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
