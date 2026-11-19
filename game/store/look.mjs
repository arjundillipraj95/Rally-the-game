// close shots of a figure with software GL (swiftshader renders here; plain headless is black): node store/look.mjs <q> <out.png> <leader|arch> <angle deg> [dist] [setup js: u, G]; WAIT=<frames>
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const [q, out, who, ang, dist, setup] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await open(b, 900, 700, { q });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 20);
await p.evaluate(({ who, ang, dist, setup }) => { const G = window.__fb.G; G.T = 30; window.__fb.step(30);
  const L = G.teams[G.myTi].leader, u = who === 'arch' ? G.units.find(o => o.ti === G.myTi && o.kind === 'arch' && !o.dead) : L;
  window.__look = { u, ang: +ang * Math.PI / 180, dist: +(dist || 3.2) }; if (setup) new Function('u', 'G', setup)(u, G);
  const tick = () => { const k = window.__look, u = k.u; u.vx = u.vz = 0; const a = u.face + k.ang, y = (u.y || 0);
    window.__camAt = [u.x + Math.sin(a) * k.dist, y + 1.5, u.z + Math.cos(a) * k.dist, u.x, y + 1.1, u.z]; requestAnimationFrame(tick); }; tick();
  document.querySelectorAll('.hud, #hud, .sbar, .ctl').forEach(e => e.style.opacity = 0);
}, { who, ang, dist, setup });
await frames(p, +(process.env.WAIT || 30));
await p.screenshot({ path: out }); await b.close();
