// F18-F20 polish pass: Screen shake setting, the Crown's beam, team-coloured bursts, the new tone's lines,
// ambient motes and light shafts (none on Low), and no errors in a battle on Medium and Low.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
for (const ql of ['medium', 'low']) {
  const page = await open(browser, 480, 270, { q: '?crown2=1', quality: ql });
  const errs = []; page.on('pageerror', e => errs.push(String(e)));
  if (ql === 'medium') {
    ok(await page.evaluate(() => !!document.querySelector('#segShake button[data-v="off"]')), 'Screen shake setting is in the menu');
    await page.evaluate(() => document.querySelector('#segShake button[data-v="off"]').click());
    ok(await page.evaluate(() => localStorage.getItem('rally-shake') === 'off' && document.querySelector('#segShake button[data-v="off"]').getAttribute('aria-pressed') === 'true'), 'Shake off is saved and shown');
    await page.evaluate(() => document.querySelector('#segShake button[data-v="on"]').click());
  }
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
  const run = n => page.evaluate(n => window.__frame(n), n);
  for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
  await run(30);
  const a = await page.evaluate(() => window.__amb ? window.__amb() : null);
  if (ql === 'medium') ok(a && a.motes && a.motes.n > 0 && a.motes.vis && a.shafts && a.shafts.n > 0, 'Medium: motes and light shafts drawn ' + JSON.stringify(a));
  else ok(!a || (!a.motes && !a.shafts), 'Low: no motes or shafts');
  ok(!errs.length, ql + ': no errors ' + errs.slice(0, 1));
  await page.close();
}
const src = (await import('fs')).readFileSync(new URL('../src/render/banter.js', import.meta.url), 'utf8') + (await import('fs')).readFileSync(new URL('../src/ui/feed.js', import.meta.url), 'utf8');
ok(!/goat|Mummy|Wheee|less well/i.test(src), 'tone: the old gag lines are gone');
console.log(`r_F18: ${pass} pass, ${fail} fail`); await browser.close(); process.exit(fail ? 1 : 0);
