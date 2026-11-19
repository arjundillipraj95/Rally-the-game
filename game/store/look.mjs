// close shots of a figure with software GL (swiftshader renders here; plain headless is black): node store/look.mjs <q> <out.png> <leader|arch> <angle deg> [dist] [setup js: u, G]; WAIT=<frames>
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const [q, out, who, ang, dist, setup] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await open(b, 900, 700, { q });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 20);
await p.evaluate(({ who, ang, dist, setup }) => { const G = window.__fb.G; G.T = 30; window.__fb.step(30);
  const L = G.teams[G.myTi].leader, u = who === 'arch' ? G.units.find(o => o.ti === G.myTi && o.kind === 'arch' && !o.dead) : L;
  window.__look = { u, ang: +ang * Math.PI / 180, dist: +(dist || 3.2) }; if (setup) { try { const r = new Function('u', 'G', 'return ' + setup)(u, G); if (r && r.catch) r.catch(e => { window.__lookErr = String(e); }); } catch (e) { window.__lookErr = String(e); } }
  const tick = () => { const k = window.__look, u = k.u; u.vx = u.vz = 0; const a = u.face + k.ang, y = (u.y || 0);
    window.__camAt = [u.x + Math.sin(a) * k.dist, y + 1.5, u.z + Math.cos(a) * k.dist, u.x, y + 1.1, u.z]; requestAnimationFrame(tick); }; tick();
  document.querySelectorAll('.hud, #hud, .sbar, .ctl').forEach(e => e.style.opacity = 0);
}, { who, ang, dist, setup });
await frames(p, +(process.env.WAIT || 30));
// (the frame as it is now: drawn and read at once; a page screenshot under software GL can lag behind)
const url = await p.evaluate(async () => { const S = await import('/src/render/scene.js'), c = window.__camAt; if (window.__beforeShot) window.__beforeShot(); if (c) { S.camera.position.set(c[0], c[1], c[2]); S.camera.lookAt(c[3], c[4], c[5]); }
  S.renderer.render(S.scene, S.camera); return S.renderer.domElement.toDataURL('image/png'); });
if (process.env.DBG) console.log(await p.evaluate(() => { const G = window.__fb.G, u = window.__look.u, h = window.__live.get(u); return JSON.stringify({ arrows: G.arrows.length, an: h && h.an && h.an.key, fT: u.firingT - G.T, T: G.T, units: G.units.length, err: window.__lookErr, drawn: window.__as && window.__as.drawn, fake: (window.__fakeA || []).map(a => [a.x - u.x, a.y - (u.y || 0), a.z - u.z, a.t, !!a.done, !!a.stuck].map(v => typeof v === 'number' ? +v.toFixed(2) : v)) }); }));
const fs = await import('fs'); fs.writeFileSync(out, Buffer.from(url.split(',')[1], 'base64')); await b.close();
