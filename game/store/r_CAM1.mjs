// CAM1 the fixed high camera: never turns (drag or keys), 50° by default with the setting kept, the minimap looks and
// comes back, the shout tray + minimap pings, dead: drag moves the camera, teammates' faces follow them, faction rings,
// and ?cam=old still turns. (CAM2: this is now Settings > Camera > High, so the test opens it with ?cam=high; no see-through hole.)
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const start = async q => { const p = await open(b, 844, 390, { q }); await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn');
  await p.evaluate(() => { window.__fb.G.state = 'play'; }); await frames(p, 30);
  // skip the opening flyover
  await p.evaluate(async () => { const H = await import('/src/app/home.js'); for (let i = 0; i < 400 && H.intro; i++) { H.introTick(.1); } }); await frames(p, 30); return p; };
const S = p => p.evaluate(async () => { const C = await import('/src/render/camera.js'), Sc = await import('/src/render/scene.js'), K = await import('/src/ui/camlook.js');
  const c = Sc.camera.position, d = window.__camDbg; const L = d ? d.L : [0, 0, 0];
  return { yaw: C.cam.yaw, fixedYaw: C.fixedYaw(), angle: C.camMode.angle, pitch: Math.atan2(c.y - L[1], Math.hypot(c.x - L[0], c.z - L[2])) * 180 / Math.PI,
    look: K.lookState(), f: d && d.f, fov: Sc.camera.fov }; });
const drag = async (p, x0, y0, dx, dy) => { await p.mouse.move(x0, y0); await p.mouse.down(); for (let i = 1; i <= 6; i++) { await p.mouse.move(x0 + dx * i / 6, y0 + dy * i / 6); await frames(p, 1); } await p.mouse.up(); };

const p = await start('?crown2=1&champ=titus&cam=high');
let s = await S(p);
ok(Math.abs(s.yaw - s.fixedYaw) < 1e-6, `camera faces from the base to the summit (yaw ${s.yaw.toFixed(2)})`);
ok(s.angle === 50 && Math.abs(s.pitch - 50) < 1.5, `standard angle 50°, looking down at ${s.pitch.toFixed(1)}°`);
ok(s.fov === 45, `narrow view in landscape (fov ${s.fov})`);
await drag(p, 650, 200, 160, 60); await p.keyboard.down('ArrowLeft'); await frames(p, 20); await p.keyboard.up('ArrowLeft'); await frames(p, 5);
const s2 = await S(p); ok(Math.abs(s2.yaw - s.yaw) < 1e-6, 'a drag on the right and the arrow keys do not turn it');
// the minimap looks
const mini = await p.evaluate(() => { const r = document.getElementById('mini').getBoundingClientRect(); return [r.left, r.top, r.width]; });
const me0 = await p.evaluate(() => [window.__fb.G.player.x, window.__fb.G.player.z]);
await p.mouse.move(mini[0] + mini[2] * .5, mini[1] + mini[2] * .5); await p.mouse.down(); await frames(p, 25);
let s3 = await S(p); ok(s3.look.on && s3.look.held && Math.hypot(s3.f[0] - me0[0], s3.f[1] - me0[1]) > 30, `pressing the minimap's middle takes the camera there (${s3.f.map(v => v.toFixed(0))}, him at ${me0.map(v => v.toFixed(0))})`);
await p.mouse.move(mini[0] + mini[2] * .75, mini[1] + mini[2] * .5); await frames(p, 10);
const s3b = await S(p); ok(Math.hypot(s3b.look.x - s3.look.x, s3b.look.z - s3.look.z) > 10, 'dragging on the minimap moves the look');
await p.mouse.up(); await frames(p, 15); ok((await S(p)).look.on, 'let go: it holds a moment');
await frames(p, 90); const s4 = await S(p); const me1 = await p.evaluate(() => [window.__fb.G.player.x, window.__fb.G.player.z]);
ok(!s4.look.on && Math.hypot(s4.f[0] - me1[0], s4.f[1] - me1[1]) < 1, 'then slides back to him');
// shout tray open: the minimap pings
await p.evaluate(() => { document.getElementById('shoutTray').hidden = false; });
const pingsBefore = await p.evaluate(async () => (await import('/src/ui/pings.js')).pings.length);
await p.mouse.click(mini[0] + mini[2] * .3, mini[1] + mini[2] * .3); await frames(p, 10);
const ps = await p.evaluate(async () => ({ n: (await import('/src/ui/pings.js')).pings.length, tray: document.getElementById('shoutTray').hidden, look: (await import('/src/render/camera.js')).camLook.on }));
ok(ps.n > pingsBefore && ps.tray && !ps.look, `with the shout tray open a minimap tap is "Attack here!" (${pingsBefore} -> ${ps.n} pings), no look`);
// faction rings
const rings = await p.evaluate(async () => { const R = await import('/src/render/soldiers.js'), St = await import('/src/core/state.js'); const G = window.__fb.G;
  return G.teams.map(t => t.leader).filter(Boolean).map(u => [u.ti === G.myTi, St.colorOf(u.ti), R.ringFor(u)]); });
ok(rings.every(([me, c, r]) => me ? r === 'me' : r === 'c' + c), `every champion has a ring: you gold, the rest in their faction's colour (${rings.length})`);
// dead
await p.evaluate(() => { const G = window.__fb.G, L = G.player; window.__fb.die(L, null, 0); }); await frames(p, 40);
const dd = await p.evaluate(() => { const b = document.getElementById('deadAllies'); return { shown: b && !b.hidden, n: b ? b.querySelectorAll('button').length : 0, dead: window.__fb.G.player.dead }; });
ok(dd.dead && dd.shown && dd.n >= 2, `dead: your face and your teammates' faces show (${dd.n})`);
const f0 = (await S(p)).f; await drag(p, 600, 200, -200, 80); await frames(p, 30); const s5 = await S(p);
ok(s5.look.on && Math.hypot(s5.f[0] - f0[0], s5.f[1] - f0[1]) > 5, `dead: a drag moves the camera round the field (${Math.hypot(s5.f[0] - f0[0], s5.f[1] - f0[1]).toFixed(1)} m)`);
await p.mouse.move(150, 300); await p.mouse.down(); await frames(p, 5); await p.mouse.move(150, 240); await frames(p, 30); await p.mouse.up();
const s5b = await S(p); ok(Math.hypot(s5b.f[0] - s5.f[0], s5b.f[1] - s5.f[1]) > 3, 'dead: the stick moves it too');
const mate = await p.evaluate(() => { const b = document.querySelectorAll('#deadAllies button')[1]; const r = b.getBoundingClientRect(); return { ti: +b.dataset.ti, x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
await p.mouse.click(mate.x, mate.y); await frames(p, 60);
const s6 = await S(p), mp = await p.evaluate(ti => { const u = window.__fb.G.teams[ti].leader; return [u.x, u.z]; }, mate.ti);
ok(!s6.look.on && s6.look.follow === mate.ti && Math.hypot(s6.f[0] - mp[0], s6.f[1] - mp[1]) < 1.5, 'dead: tapping a teammate follows him');
// the setting
await p.evaluate(async () => { (await import('/src/render/camera.js')).setCamAngle(55); }); await frames(p, 30);
const s7 = await S(p); ok(s7.angle === 55 && (await p.evaluate(() => localStorage.getItem('rally-cam'))) === '55', 'Settings > Camera angle Higher: 55°, kept on the phone');
await p.close();
// ?cam=old turns as before
const q = await start('?crown2=1&champ=titus&cam=old'); const y0 = (await S(q)).yaw; await drag(q, 650, 200, 160, 0);
ok(Math.abs((await S(q)).yaw - y0) > .3, '?cam=old: the old camera still turns with a drag');
await b.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
