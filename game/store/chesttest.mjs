// Dev check: the war chest. A computer-only 5-minute battle: the warning, the landing (the middle up
// for grabs), how many armies head there, who takes it, and that they're paid.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const map = process.argv[2] || 'forest';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 400, 240);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { localStorage.setItem('rally-solo-al', '[0,1,2,3]'); }); await page.reload(); await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
await page.evaluate(map => { window.__noRender = 1; document.querySelector('#segMode button[data-v="conquest"]').click(); document.querySelector(`#segMap button[data-v="${map}"]`).click(); document.querySelector('#goBtn').click(); }, map);
await page.evaluate(() => window.__frame(3));
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G; G.diff = 1; G.time = 5; const s0 = G.teams[G.myTi]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; G.player = null;
  const h = G.holds.find(x => x.centre), out = { name: h.name, log: [] };
  const msgs = []; const near = () => [0, 1, 2, 3].map(i => G.units.filter(u => !u.dead && u.ti === i && Math.hypot(u.x - h.x, u.z - h.z) < 25).length).join('/');
  let last = -1;
  for (let t = 0; t < 200 && G.state === 'play'; t++) {
    const gold0 = G.teams.map(s => s.gold);
    F.step(30, 1 / 30);
    if ((h.chest | 0) !== last) { last = h.chest | 0; out.log.push(`t${t + 1} chest=${last} owner=${h.owner} men near centre ${near()}`); }
    if (G.chestDone && !out.taken) { out.taken = { t: t + 1, by: h.owner, rally: G.teams.map(s => Math.round(s.rally)).slice(0, 4).join(','), goldJump: G.teams.slice(0, 4).map((s, i) => Math.round(s.gold - gold0[i])).join(',') }; out.log.push(`t${t + 1} taken; men near centre ${near()}`); break; }
    if (h.chest === 2 && (t % 10 === 0)) out.log.push(`t${t + 1} up: men near centre ${near()} plans ${G.teams.slice(0, 4).map(s => s.plan ? s.plan.kind + (s.plan.id ?? s.plan.ti ?? '') : '-').join(',')}`);
  }
  return out;
});
console.log(JSON.stringify(r, null, 1), 'errors:', errs.slice(0, 3));
await browser.close();
