// FIX10: XP pace in a whole computer match (?crown2=1, every army a computer). Prints when each champion reached each
// level and where his XP came from; checks the agreed pace (median: level 3 by 1:30, 5 by 4:00, 7 by 6:30, 8-9 at 10:00; the slowest at 3 by 2:30).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: process.env.Q ?? '?crown2=1&champ=devi&botchamp=titus' });
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
await page.evaluate(() => { const { G } = window.__fb; const s = G.teams[G.myTi]; s.human = false; if (s.leader) s.leader.human = false; }); // (mine plays itself too)
for (let k = 0; k < 24 && (await page.evaluate(() => window.__fb.G.state)) !== 'end'; k++) await page.evaluate(() => window.__fb.step(900));
const r = await page.evaluate(() => window.__fb.G.teams.filter(s => s.active).map(s => ({ lvl: s.lvl, at: (s.lvlAt || []).map((t, i) => t != null ? i + '@' + Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0') : null).filter(Boolean).join(' '), at3: (s.lvlAt || [])[3], at5: (s.lvlAt || [])[5], at7: (s.lvlAt || [])[7], by: Object.fromEntries(Object.entries(s.xpBy || {}).map(([k, v]) => [k, Math.round(v)])) })));
for (const t of r) console.log(`L${t.lvl}  ${t.at}  ${JSON.stringify(t.by)}`);
const med = a => { const v = a.map(x => x ?? 9e9).sort((p, q) => p - q); return v[Math.floor(v.length / 2)]; };
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
ok(med(r.map(t => t.at3)) <= 100, `median level 3 at ${med(r.map(t => t.at3))} s (by ~90)`);
ok(med(r.map(t => t.at5)) <= 260, `median level 5 at ${med(r.map(t => t.at5))} s (by ~240)`);
ok(med(r.map(t => t.at7)) <= 410, `median level 7 at ${med(r.map(t => t.at7))} s (by ~390)`);
ok(med(r.map(t => -t.lvl)) <= -8 && med(r.map(t => -t.lvl)) >= -9, `median end level ${-med(r.map(t => -t.lvl))} (8 or 9; 10 exceptional)`);
const slow3 = Math.max(...r.map(t => t.at3 ?? 9e9)); ok(slow3 <= 150, `the slowest champion reaches level 3 at ${slow3} s (no one stuck early)`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
