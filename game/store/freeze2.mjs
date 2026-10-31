// Dev check: jump a match ahead, then draw a few frames and report any drawing error.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const [map = 'frost', mode = 'dm', color = '2'] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 320, 180);
const errs = []; page.on('pageerror', e => errs.push('PAGE ' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('CON ' + m.text().slice(0, 600)); });
const tap = sel => page.evaluate(sel => document.querySelector(sel).click(), sel);
await tap(`#segMode button[data-v="${mode}"]`); await tap(`#segColor button[data-v="${color}"]`); await tap(`#segMap button[data-v="${map}"]`);
await tap('#goBtn'); await frames(page, 3);
for (const t of (process.env.TS || '5,10,15,20,30').split(',').map(Number)) {
  await page.evaluate(t => {
    const F = window.__fb, G = F.G;
    // the captain plays: heads for the nearest enemy, swings, blocks now and then, rides when he can
    let k = 0;
    while (G.T < t && G.state === 'play') {
      const p = G.player; if (p.dead) { F.step(15, 1 / 30, true); continue; }
      let best = null, bd = 1e9; for (const u of G.units) if (!u.dead && G.ALLY[u.ti % 4] !== G.ALLY[p.ti % 4]) { const d = Math.hypot(u.x - p.x, u.z - p.z); if (d < bd) { bd = d; best = u; } }
      const dx = best ? best.x - p.x : -p.x, dz = best ? best.z - p.z : -p.z, m = Math.hypot(dx, dz) || 1; k++;
      F.step(3, 1 / 30, { wx: dx / m, wz: dz / m, mag: 1, attackHeld: bd < 4 && k % 4 !== 0, block: k % 9 === 0, camYaw: 0 });
      if (k % 40 === 0 && window.__fb.actions && window.__fb.actions.ride) try { window.__fb.actions.ride(); } catch (e) {}
    }
  }, t);
  await frames(page, 4);
  console.log('t', t, 'errors so far', errs.length);
  if (errs.length) break;
}
console.log([...new Set(errs)].slice(0, 3).join('\n'));
await browser.close();
