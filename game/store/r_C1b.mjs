// C1b: levels 1-10 from XP in the match. A whole Trio battle of computer champions (12 armies; yours handed to the
// computer too), headless: XP from every source, levels 3, 5 and 7 reached, the level each champion ends on (an
// average player 8-9), and each champion's health and blow grown by his level. JOIN=1: the join check (r_C1a's
// harness) is in r_C1b-join.mjs.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' });
page.on('pageerror', e => console.log('ERR', e.message));
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]');
await page.evaluate(() => { for (let k = 0; k < 2; k++) for (let c = 0; c < 4; c++) document.querySelectorAll('.duotog')[c].click(); }); // (Trio)
await page.click('#goBtn'); await frames(page, 2);
await page.evaluate(() => { const { G } = window.__fb; G.teams[G.myTi].human = false; if (G.player) G.player.human = false; });
const levels = () => page.evaluate(() => window.__fb.G.teams.filter(t => t.active).map(t => t.lvl || 1));
const curve = [];
for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.state)) !== 'end'; k++) {
  await page.evaluate(() => window.__fb.step(450)); const T = await page.evaluate(() => Math.round(window.__fb.G.T)); const lv = await levels();
  curve.push([T, (lv.reduce((a, b) => a + b, 0) / lv.length).toFixed(1)]);
}
const out = await page.evaluate(async () => { const { G } = window.__fb, st = await import('/src/champions/stats.js');
  const act = G.teams.map((t, i) => [t, i]).filter(([t]) => t.active);
  const by = {}; for (const [t] of act) for (const [k, v] of Object.entries(t.xpBy || {})) by[k] = Math.round((by[k] || 0) + v);
  const grown = act.every(([t, i]) => { const L = t.leader; return !L || Math.abs(L.max - st.champHp(i)) < .5 && Math.abs(L.dmg - st.champDmg(i)) < .05; });
  return { n: act.length, end: act.map(([t]) => t.lvl), at: act.map(([t]) => [3, 5, 7, 8, 9].map(l => (t.lvlAt || [])[l] ?? '-').join('/')), by, grown, hp10: st.champHp(0, 10), state: G.state, T: Math.round(G.T) }; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log('average level by time:', curve.map(([t, l]) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')} ${l}`).join(', '));
console.log('reached level 3/5/7/8/9 at (s):', out.at.join('  '));
console.log('XP by source:', JSON.stringify(out.by));
ok(out.state === 'end' && out.n === 12, `a whole battle of 12 champions (${out.T} s)`);
for (const k of ['soldier', 'champ', 'camp', 'buffCamp', 'castle', 'sceptre', 'trickle']) ok(out.by[k] > 0, `XP from ${k}: ${out.by[k] || 0}`);
const lv = out.end, avg = lv.reduce((a, b) => a + b, 0) / lv.length;
ok(lv.every(l => l >= 5) && lv.filter(l => l >= 7).length >= 9, `every champion reaches 3 and 5, most 7 (end levels ${lv.join(',')})`);
ok(avg >= 7.5 && avg <= 9.5, `average champion ends at ${avg.toFixed(1)} (design 8-9)`);
ok(out.grown, `every champion's health and blow match his level (level 10: ${Math.round(out.hp10)} health)`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
