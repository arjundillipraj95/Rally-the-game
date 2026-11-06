// QA play-through at phone size: a Solo battle on each map played by a scripted player (march to the
// nearest enemy, sword combo, block, evade every way, switch to spear and javelin, mount and charge,
// upgrades, the horn), shooting the player's view at each step and logging errors and draw cost.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const map = process.argv[2] || 'valley', W = +(process.argv[3] || 872), H = +(process.argv[4] || 325);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, W, H, { home: true, q: process.env.Q || '' });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await frames(page, 20); await page.screenshot({ timeout: 150000, path: OUT + `qa_${map}_00home.png` });
await page.evaluate(m => { const b = document.querySelector(`#segMap button[data-v="${m}"]`); if (b) b.click(); document.querySelector('#goBtn').click(); }, map);
await frames(page, 30); await page.screenshot({ timeout: 150000, path: OUT + `qa_${map}_01start.png` });
const log = [];
const drive = (k) => page.evaluate(k => {
  const F = window.__fb, G = F.G, p = G.player; if (!p || p.dead || G.state !== 'play') return 'state ' + G.state + (p && p.dead ? ' dead' : '');
  let best = null, bd = 1e9; for (const u of G.units) { if (u.dead || G.ALLY[u.ti % 4] === G.ALLY[p.ti % 4]) continue; const d = Math.hypot(u.x - p.x, u.z - p.z); if (d < bd) { bd = d; best = u; } }
  if (!best) return 'no enemy';
  const dx = best.x - p.x, dz = best.z - p.z, L = Math.hypot(dx, dz) || 1, toward = { wx: dx / L, wz: dz / L, mag: 1 };
  p.hp = Math.max(p.hp, p.max * .6); // (kept alive: we're testing the moves, not winning)
  const act = {
    march: () => F.step(90, 1 / 30, toward),
    combo: () => { for (let i = 0; i < 3; i++) { F.attack(); F.step(9, 1 / 30, bd > 2 ? toward : true); } },
    block: () => F.step(12, 1 / 30, { block: true }),
    evade: () => { const sides = [toward, { wx: -dz / L, wz: dx / L, mag: 1 }, { wx: -dx / L, wz: -dz / L, mag: 1 }]; const s = sides[(G.T * 7 | 0) % 3]; window.__moveOverride = () => ({ ...s, camYaw: 0 }); F.jump(); window.__moveOverride = null; F.step(4, 1 / 30, true); },
    spear: () => { F.weapon('spear'); F.step(4, 1 / 30, true); F.attack(); F.step(6, 1 / 30, true); },
    jav: () => { F.weapon('jav'); F.step(4, 1 / 30, true); F.attack(); F.step(6, 1 / 30, true); },
    sword: () => { F.weapon('sword'); F.step(4, 1 / 30, true); },
    ride: () => { F.ride(); F.step(60, 1 / 30, true); },
    gallop: () => F.step(45, 1 / 30, toward),
    upgrade: () => { G.teams[p.ti].gold += 1500; for (const id of ['foot1', 'foot2', 'arch1', 'arch2']) F.upgrade(id); F.step(30, 1 / 30, true); },
    rally: () => { p.rally = 100; F.rally(); F.step(6, 1 / 30, true); },
  }[k];
  act && act();
  return `${k}: T${G.T.toFixed(0)} d${bd.toFixed(1)} w${p.weapon || 'sword'} m${p.mounted ? 1 : 0} hp${Math.round(p.hp)}`;
}, k);
const steps = ['march', 'march', 'combo', 'block', 'evade', 'evade', 'evade', 'spear', 'spear', 'jav', 'sword', 'combo', 'upgrade', 'rally', 'march', 'ride', 'gallop', 'combo', 'gallop', 'march'];
let i = 2;
for (const k of steps) {
  const r = await drive(k); await frames(page, 2);
  const gfx = await page.evaluate(() => window.__fb.info.gfx);
  log.push(`${r} | calls ${gfx.calls} tris ${(gfx.tris / 1000).toFixed(0)}k`);
  await page.screenshot({ timeout: 150000, path: OUT + `qa_${map}_${String(i++).padStart(2, '0')}${k}.png` });
}
console.log(log.join('\n'));
console.log('ERRORS', errs.length, errs.slice(0, 5).join(' | '));
await browser.close();
