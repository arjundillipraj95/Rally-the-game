// CAM2 (Arjun 26 Nov): the turning third-person camera is the default again, a drag turns it; Settings > Camera Turning/High
// is kept; the minimap look, the dead teammates' faces and the faction rings work with it; no see-through on castles/rocks.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const start = async (q, page) => { const p = page || await open(b, 844, 390, { q }); await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn');
  await p.evaluate(() => { window.__fb.G.state = 'play'; }); await frames(p, 30);
  await p.evaluate(async () => { const H = await import('/src/app/home.js'); for (let i = 0; i < 400 && H.intro; i++) { H.introTick(.1); } }); await frames(p, 30); return p; };
const S = p => p.evaluate(async () => { const C = await import('/src/render/camera.js'), Sc = await import('/src/render/scene.js'), K = await import('/src/ui/camlook.js');
  const c = Sc.camera.position, P = window.__fb.G.player; return { fixed: C.camMode.fixed, yaw: C.cam.yaw, fov: Sc.camera.fov, look: K.lookState(), away: Math.hypot(c.x - P.x, c.z - P.z) }; });
const drag = async (p, x0, y0, dx, dy) => { await p.mouse.move(x0, y0); await p.mouse.down(); for (let i = 1; i <= 6; i++) { await p.mouse.move(x0 + dx * i / 6, y0 + dy * i / 6); await frames(p, 1); } await p.mouse.up(); };

const p = await start('?crown2=1&champ=titus');
let s = await S(p);
ok(!s.fixed && s.fov === 60, `default: the turning camera (fov ${s.fov})`);
const near = s.away; await drag(p, 650, 200, 160, 0); const s1 = await S(p);
ok(Math.abs(s1.yaw - s.yaw) > .3, 'a drag on the right turns it');
ok(near < 16, `it sits close behind him (${near.toFixed(1)} m)`);
const mini = await p.evaluate(() => { const r = document.getElementById('mini').getBoundingClientRect(); return [r.left, r.top, r.width]; });
await p.mouse.move(mini[0] + mini[2] * .5, mini[1] + mini[2] * .5); await p.mouse.down(); await frames(p, 30);
const s2 = await S(p); ok(s2.look.on && s2.away > 30, `holding the minimap looks there (${s2.away.toFixed(0)} m away)`);
await p.mouse.up(); await frames(p, 120); const s3 = await S(p);
ok(!s3.look.on && s3.away < 16, `let go: it comes back behind him (${s3.away.toFixed(1)} m)`);
const rings = await p.evaluate(async () => { const R = await import('/src/render/soldiers.js'), G = window.__fb.G; return G.units.filter(u => u.kind === 'captain' && u.ti !== G.myTi).map(u => R.ringFor(u)); });
ok(rings.length && rings.every(r => /^c\d$/.test(r)), `faction rings on every champion (${rings.join(',')})`);
await p.evaluate(() => { window.__fb.die(window.__fb.G.player, null, 0); }); await frames(p, 40);
const dd = await p.evaluate(() => { const b = document.getElementById('deadAllies'); return { shown: b && !b.hidden, n: b ? b.querySelectorAll('button').length : 0 }; });
ok(dd.shown && dd.n >= 2, `dead: your face and your teammates' faces show (${dd.n})`);
// the setting
await p.evaluate(async () => { (await import('/src/render/camera.js')).setCamMode(true); }); await frames(p, 5);
const s4 = await S(p); ok(s4.fixed && s4.fov === 45 && (await p.evaluate(() => localStorage.getItem('rally-cammode'))) === 'high', `Settings > Camera High: the high camera (fov ${s4.fov}), kept`);
await p.reload(); await p.waitForFunction(() => window.__fb && window.__fb.G);
const k = await p.evaluate(async () => (await import('/src/render/camera.js')).camMode.fixed); ok(k, 'after a reload: still High');
const ui = await p.evaluate(() => ({ mode: [...document.querySelectorAll('#segCamMode button')].map(b => b.dataset.v + (b.getAttribute('aria-pressed') === 'true' ? '*' : '')).join(), angle: !document.getElementById('grpCamAngle').hidden }));
ok(ui.mode === 'turn,high*' && ui.angle, `Settings shows High picked and its angle row (${ui.mode})`);
await p.evaluate(() => document.querySelector('#segCamMode button[data-v="turn"]').click());
const ui2 = await p.evaluate(async () => ({ fixed: (await import('/src/render/camera.js')).camMode.fixed, angle: !document.getElementById('grpCamAngle').hidden }));
ok(!ui2.fixed && !ui2.angle, 'Turning: back to the turning camera, the angle row hidden');
await b.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
