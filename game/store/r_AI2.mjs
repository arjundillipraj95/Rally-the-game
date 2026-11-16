// AI2: computer captains clear their own side's jungle camps (buff camps first) by day, without being told.
// A battle with computer captains only, 200 s: count camps cleared (first clear of each) and buffs taken, and which
// camps the captains marched for.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
const r = await page.evaluate(() => { const { G } = window.__fb, L = G.layout, cleared = new Set(), went = new Set(), own = []; let buffs = 0;
  const p = G.units.find(u => u.human && u.leader); if (p) { p.human = false; } // (computer captains only)
  while (G.T < 200 && G.state === 'play') { window.__fb.step(6);
    for (const b of G.c2.breaks) if (b.kind === 'camp' && b.back > 0) cleared.add(b.id);
    for (let i = 0; i < G.teams.length; i++) { const t = G.teams[i]; if (!t) continue; if (t.buff && !t._seen) { t._seen = 1; buffs++; }
      if (t.plan && t.plan.camp != null) went.add(t.plan.camp); } }
  return { T: Math.round(G.T), cleared: cleared.size, went: went.size, buffs, firstBuff: [...went].map(id => L.camps[id].kind)[0] }; });
ok(r.went >= 4, `captains marched for ${r.went} camps by ${r.T} s`);
ok(r.firstBuff === 'buff', `a buff camp first (${r.firstBuff})`);
ok(r.cleared >= 3, `${r.cleared} camps cleared`);
ok(r.buffs >= 2, `${r.buffs} buffs taken`);
ok(!errs.length, `no errors ${errs.slice(0, 2).join(' | ')}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
