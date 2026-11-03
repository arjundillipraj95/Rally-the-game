// Dev check: Last Man Standing (the Crown's test variant) run by computer captains, fast-forwarded:
// no respawns from 9:00, the ring closes, a Champions' Duel if it comes to one on one, and the end.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, {});
const errs = []; page.on('pageerror', e => errs.push(e.message + ' ' + e.stack.split('\n').slice(1, 3).join(' | ')));
await page.click('#segMode button[data-v="lms"]'); await page.click('#goBtn'); await frames(page, 5);
await page.evaluate(() => { window.__noRender = 1; const G = window.__fb.G, s0 = G.teams[G.myTi]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; G.player = null; });
const snap = () => page.evaluate(async () => { const G = window.__fb.G, S = await import('/src/core/sim.js');
  return { T: Math.round(G.T), lms: G.lms, mode: G.mode, state: G.state, ring: Math.round(S.lmsRing()), caps: G.units.filter(u => u.leader && !u.dead).map(u => u.ti).join(''), dead: G.teams.filter(s => s.active && s.leader && s.leader.dead).map(s => s.leaderDeadT.toFixed(0)).join(','), flag: !!G.flag, wall: G.plazaWall && G.plazaWall.up, duel: (G.duels || []).filter(d => d.champ).map(d => d.a.ti + 'v' + d.b.ti + ':' + d.state).join(''), champ: !!G.crown.champ, last: G.lastDuel ? G.lastDuel.end + (G.lastDuel.champ ? '*' : '') : '', end: G.endInfo ? JSON.stringify(G.endInfo) : '' }; });
const log = [];
for (const until of [100, 539, 560, 580, 600, 640, 700]) {
  await page.evaluate(until => { const F = window.__fb, G = F.G; while (G.state === 'play' && G.T < until) F.step(30, 1 / 30); }, until);
  log.push(await snap());
}
console.log(log.map(l => JSON.stringify(l)).join('\n'));
await page.evaluate(() => { window.__noRender = 0; }); await frames(page, 2); await page.screenshot({ path: OUT + '/lms.png' });
console.log('errors:', errs.slice(0, 3));
await browser.close();
