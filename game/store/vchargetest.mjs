// Dev check: volley, then charge. Your archers loose an aimed volley at an enemy group; once it lands,
// Charge: the bonus starts and the enemy army loses heart. Charge too late (or with no volley): nothing.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 320);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="dunes"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  for (const c of G.teams) if (c.leader && c.leader !== p) { c.leader.x = 150; c.leader.z = 150; }
  p.x = 0; p.z = 0;
  for (let i = 0; i < 6; i++) { const a = F.mkUnit(me, -2 + i * .8, -2, 'arch'); a.face = 0; }
  const tg = []; for (let i = 0; i < 6; i++) { const u = F.mkUnit(foe, -2 + i * .8, 16, 'foot'); u.hp = u.max = 1e4; u.stun = 99; tg.push(u); }
  const s = G.teams[me];
  const run = (wait, volley) => { G.teams[foe].morale = 90; s.volleyCd = 0; s.order = 'follow'; s.vcT = 0;
    if (volley) out['fired' + wait] = [F.orderVolley(me, { x: 0, z: 16 }), G.arrows.filter(a => a.volley).length, G.units.filter(u => u.kind === 'arch' && !u.dead).length];
    let t = 0; while (!(s.vLandT > G.T - 1) && t < 90) { F.step(1, 1 / 30, true); t++; }
    const landedAfter = t; F.step(Math.round(wait * 30), 1 / 30, true);
    const m0 = G.teams[foe].morale; F.setOrder(me, 'charge');
    return { landedAfterFrames: landedAfter, bonus: s.vcT > G.T, moraleDrop: Math.round(m0 - G.teams[foe].morale) };
  };
  out.onTime = run(1, true); out.late = run(6, true); out.noVolley = run(0, false);
  return out;
});
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
