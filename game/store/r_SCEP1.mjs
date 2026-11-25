// SCEP1: the war chest becomes the Sceptre. Checks: the warning comes at 4:30 (30 s ahead), the Sceptre lands at 5:00
// in the arena, the big bar reads "The Sceptre", it is worth 5 points to the side that breaks it free, and a close-up
// of the caged relic half broken (software GL) at /tmp/scep1.png.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
import fs from 'fs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await open(b, 900, 500, { q: '?crown2=1&champ=titus&botchamp=titus' });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 4);
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const run = to => p.evaluate(to => { const { G } = window.__fb; let n = 0; while (G.T < to && n++ < 2000) window.__fb.step(to - G.T > 2 ? 30 : 1); return G.T; }, to);
await p.evaluate(() => { const { G } = window.__fb; const s = G.teams[G.myTi]; s.human = false; if (s.leader) s.leader.human = false; });
await run(268);
ok(!(await p.evaluate(() => window.__fb.G.c2.said.c2chestSoon)), 'no warning before 4:30');
await run(271);
ok(await p.evaluate(() => !!window.__fb.G.c2.said.c2chestSoon), 'warning by 4:31 ("The Sceptre is coming!")');
await run(301);
const st = await p.evaluate(() => { const { G } = window.__fb, ch = G.c2.breaks.find(x => x.kind === 'chest'); return { ch: ch && { hp: ch.hp, max: ch.max, d: Math.hypot(ch.x, ch.z), arena: G.layout.arena.r }, said: !!G.c2.said.c2chestUp }; });
ok(st.ch && st.ch.hp > 0 && st.ch.d < st.ch.arena, `the Sceptre lands at 5:00 in the arena (${st.ch && st.ch.d.toFixed(1)} m from the middle)`);
await frames(p, 12);
const gl = await p.evaluate(() => { const ch = window.__fb.G.c2.breaks.find(x => x.kind === 'chest'); return [(document.getElementById('glacier') || {}).textContent || '', ch && ch.hp, window.__fb.G.T]; });
ok(gl[0].includes('The Sceptre'), `the big bar reads "The Sceptre" (${JSON.stringify(gl)})`);
const pts = await p.evaluate(async () => { const c = await import('/src/config.js'); return c.CROWN2.points.chest; });
ok(pts === 5, `worth ${pts} points (agreed 5)`);
// half broken: 3 of the 6 bars stand; a close-up from 4 m
console.log('shot…', new Date().toISOString().slice(11,19));
const url = await p.evaluate(async () => { const { G } = window.__fb, ch = G.c2.breaks.find(x => x.kind === 'chest');
  for (let k = 0; k < 40; k++) { ch.hp = ch.max; window.__fb.step(30); } ch.hp = ch.max * .5; // (the lake drained; half the cage broken)
  for (const u of G.units) if (!u.dead && Math.hypot(u.x - ch.x, u.z - ch.z) < 7) u.x += 30; // (nobody in the way of the picture)
  await new Promise(r => setTimeout(r, 1500));
  const S = await import('/src/render/scene.js'), W = await import('/src/core/world.js'), R = await import('/src/render/world.js'), gy = W.groundY(ch.x, ch.z); for (let k = 0; k < 90; k++) R.updateWorldView(.05); (await import('/src/render/mountain.js')).updateMount(.016);
  S.camera.position.set(ch.x + 3.6, gy + 2.8, ch.z + 3.2); S.camera.lookAt(ch.x, gy + 1.1, ch.z);
  document.querySelectorAll('.hud, #hud, .sbar, .ctl').forEach(e => e.style.opacity = 0);
  S.renderer.render(S.scene, S.camera); return S.renderer.domElement.toDataURL('image/png'); });
fs.writeFileSync('/tmp/scep1.png', Buffer.from(url.split(',')[1], 'base64'));
// the side that breaks it gets 5 points
const got = await p.evaluate(() => { const { G } = window.__fb, ch = G.c2.breaks.find(x => x.kind === 'chest'); ch.hp = 1; let n = 0; while (G.c2.chest < 2 && n++ < 3000) window.__fb.step(1); return Object.values(G.c2.chestPts || {}).filter(Boolean); });
ok(got.length === 1 && got[0] === 5, `broken free: one side holds ${got.join(',')} points`);
await b.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
