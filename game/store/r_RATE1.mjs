// RATE1: the skill-only match rating and the new stats, in a whole computer match (?crown2=1, every army a computer).
// Checks: kill assists, cover and objective assists are counted; a champion exactly at the match's average in every part
// rates 6.0; the result (win/lose) changes nothing; ratings stay 1-10 with the median near 6; prints every champion's line.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: process.env.Q ?? '?crown2=1&champ=devi&botchamp=titus' });
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.evaluate(async () => { const A = await import('/src/app/state.js'); A.soloDuo.splice(0, 4, 2, 2, 2, 2); }); await page.click('#goBtn'); // (three champions a side) await frames(page, 2);
await page.evaluate(() => { const { G } = window.__fb; const s = G.teams[G.myTi]; s.human = false; if (s.leader) s.leader.human = false; });
for (let k = 0; k < 80 && (await page.evaluate(() => window.__fb.G.state)) === 'play'; k++) await page.evaluate(() => window.__fb.step(300));
console.log('state', await page.evaluate(() => window.__fb.G.state + ' T ' + Math.round(window.__fb.G.T)));
const r = await page.evaluate(async () => {
  const R = await import('/src/ui/report.js'), { G } = window.__fb, rep = R.buildReport(G.endInfo ? G.endInfo.w : -1);
  const xs = rep.rows, ctx = R.contextOf(xs);
  const avg = { ...xs[0], result: 'lose' }; // (a champion whose every part is the match's average: scale one part at a time)
  const P = R.parts(avg), m = ctx.mean, same = Object.keys(m).every(k => P[k] === P[k]);
  const atMean = R.ratingOf({ ...avg, castle: 0, sceptre: 0, crown: 0, nexus: 0, capkill: 0, objA: 0, capK: 0, assists: 0, menK: 0, recruits: 0, cover: 0, falls: 0, lost: 0 }, { ...ctx, mean: { pts: 0, kda: 0, army: 0, team: 0 } });
  const flip = xs.map(x => [R.ratingOf({ ...x, result: 'win' }, ctx), R.ratingOf({ ...x, result: 'lose' }, ctx)]);
  // exactly average: build one from the means by giving it parts equal to them
  const fake = { ...avg }; const mean1 = R.ratingOf(fake, { ...ctx, mean: R.parts(fake) });
  return { rows: xs.map(x => ({ r: x.rating, res: x.result, k: x.capK, a: x.assists, cov: x.cover, obj: x.castle + x.sceptre + x.crown + x.nexus, objA: x.objA, fell: x.falls, men: x.menK, lost: x.lost })),
    atMean, mean1, flipSame: flip.every(([w, l]) => w === l) };
});
for (const x of r.rows) console.log(JSON.stringify(x));
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const sum = k => r.rows.reduce((n, x) => n + x[k], 0), rs = r.rows.map(x => x.r).sort((a, b) => a - b), med = rs[Math.floor(rs.length / 2)];
ok(sum('a') > 0, `kill assists counted (${sum('a')})`);
ok(sum('cov') > 0, `cover counted (${sum('cov')})`);
ok(sum('objA') > 0, `objective assists counted (${sum('objA')})`);
ok(r.mean1 === 6, `a champion at the match's average in every part rates ${r.mean1} (6.0)`);
ok(r.flipSame, 'winning or losing changes nobody\'s rating');
ok(rs[0] >= 1 && rs[rs.length - 1] <= 10, `ratings ${rs[0]}-${rs[rs.length - 1]} (1-10)`);
ok(med >= 4.5 && med <= 7.5, `median rating ${med} (about 6)`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
