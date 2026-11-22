// BOT1 (Arjun 21 Nov): computer armies pick their champions like players: each team first gets a class it lacks, then
// a champion it doesn't have, at random; the player's own pick stays; every phone sees the same picks (the code).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=devi' });
const o = await page.evaluate(async () => {
  const I = await import('/src/champions/index.js'), S = await import('/src/core/state.js'), G = S.G, r = { both: 0, mine: 0, seen: {}, sameTeamTwice: 0, n: 200 };
  for (let k = 0; k < r.n; k++) {
    const c = I.assignChamps({ 0: 'devi' });
    if (c[0] === 'devi') r.mine++;
    let all = true; for (let t = 0; t < 4; t++) { const team = c.filter((id, i) => S.colorOf(i) === t); if (!(team.includes('titus') && team.includes('devi'))) all = false; if (new Set(team).size < team.length) r.sameTeamTwice++; }
    if (all) r.both++; for (const id of c) r.seen[id] = (r.seen[id] || 0) + 1;
  }
  const c = I.assignChamps({}), code = I.champCode(); I.champsFrom(code); r.wire = JSON.stringify(c) === JSON.stringify(G.champs);
  return r;
});
ok(o.mine === o.n, `the player's own pick stays (${o.mine}/${o.n})`);
ok(o.both === o.n, `every team gets a Vanguard and a Striker (${o.both}/${o.n})`);
ok(o.sameTeamTwice === 0, `(C5) no team holds the same champion twice (${o.sameTeamTwice} of ${o.n * 4} teams)`);
ok(o.seen.titus > 0 && o.seen.devi > 0 && o.seen.sigrun > 0 && !o.seen.legionary, `computers play both: ${JSON.stringify(o.seen)}`);
ok(o.wire, 'the picks travel to joined phones unchanged');
// a whole computer match starts and runs with mixed champions
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const m = await page.evaluate(() => { const F = window.__fb; F.step(60 * 30); return { st: F.G.state, ids: [...new Set(F.G.champs)].sort().join(','), leaders: F.G.teams.filter(s => s.leader && !s.leader.dead).length }; });
ok(m.st === 'play' && m.ids === 'devi,sigrun,titus', `a match runs with both champions among the computers (${m.ids}, ${m.leaders} champions up)`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
