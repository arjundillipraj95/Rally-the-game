// AI1: at night a computer captain at the glacier strikes it with his sword, even if he was carrying javelins (they
// don't count as blows on the glacier: before, a javelin captain stood there throwing for ever). Every other captain
// is kept away so the blows are his. If his blows do nothing for 6 s, he turns guard (hunts the nearest enemy captain).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
const r = await page.evaluate(() => { const { G } = window.__fb;
  while (G.T < 500 && G.state === 'play') window.__fb.step(30);
  const gl = G.c2.breaks.find(b => b.kind === 'glacier'), cap = G.units.find(u => u.leader && !u.human && !u.dead), hp0 = gl.hp;
  cap.weapon = 'jav'; if (G.teams[cap.ti]) G.teams[cap.ti].weapon = 'jav'; cap.javAmmo = null; // (as seen stuck: javelin count null, he throws for ever)
  for (let k = 0; k < 300; k++) { cap.x = gl.x + 3; cap.z = gl.z; cap.vx = cap.vz = 0; cap.mounted = false;
    for (const u of G.units) if (u !== cap && !u.dead && Math.hypot(u.x - gl.x, u.z - gl.z) < 20) { u.x = gl.x + 40; u.z = gl.z + 40; }
    window.__fb.step(1); }
  const hp1 = gl.hp;
  // if his blows do nothing (his swing held back here, as when stuck), after 6 s he turns guard and hunts an enemy captain
  for (let k = 0; k < 240; k++) { if (!(cap.huntT > G.T)) { cap.x = gl.x + 3; cap.z = gl.z; cap.vx = cap.vz = 0; cap.cd = 9; cap.pending = null; for (const u of G.units) if (u !== cap && !u.dead && Math.hypot(u.x - gl.x, u.z - gl.z) < 20) { u.x = gl.x + 40; u.z = gl.z + 40; } } window.__fb.step(1); }
  const plan = G.teams[cap.ti].plan;
  return { phase: G.c2.phase, hp0, hp1, wpn: cap.weapon, guard: cap.huntT > G.T, plan: plan && plan.kind, tgt: plan && plan.target && plan.target.leader }; });
ok(r.phase === 'night', `it's night (${r.phase})`);
ok(r.hp1 < r.hp0, `a javelin captain at the glacier strikes it: ${r.hp0} -> ${r.hp1} in 10 s, now with his ${r.wpn}`);
ok(r.guard && r.plan === 'hunt' && r.tgt, `blows doing nothing for 6 s: he turns guard and hunts an enemy captain (${r.plan})`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
