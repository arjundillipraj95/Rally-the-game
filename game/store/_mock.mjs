// CAM1 mock-up: one computer match, at a few moments the same frame is shot from today's camera and the 45/50/55 presets.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
import fs from 'fs';
const out = process.argv[2] || '/home/claude/play/mock'; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await open(b, 844, 390, { q: '?crown2=1&champ=titus', quality: 'high' });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 3);
await p.evaluate(() => { const { G } = window.__fb; const s = G.teams[G.myTi]; s.human = false; if (s.leader) s.leader.human = false; window.__noRender = true; });
const view = async (name, mode) => {
  await p.evaluate(async m => { window.__noRender = false; const C = await import('/src/render/camera.js'), S = await import('/src/render/scene.js'), V = await import('/src/config/cam.js');
    C.camMode.fixed = m !== 'old'; if (m !== 'old') C.camMode.preset = V.CAMVIEW.presets[m]; else { C.cam.yaw = window.__fb.G.player.face; C.cam.pitch = C.CAM_PITCH; }
    S.camera.fov = m === 'old' ? 60 : V.CAMVIEW.fov; S.camera.updateProjectionMatrix(); C.cam.snap = 3; window.__fb.G.paused = true; }, mode);
  await frames(p, 4);
  const url = await p.evaluate(async () => { const S = await import('/src/render/scene.js'); S.renderer.render(S.scene, S.camera); return S.renderer.domElement.toDataURL('image/jpeg', .85); });
  fs.writeFileSync(`${out}/${name}.jpg`, Buffer.from(url.split(',')[1], 'base64'));
};
const near = () => p.evaluate(async () => { const { isEnemyTi } = await import('/src/core/state.js'); const G = window.__fb.G, L = G.player; let d = 99;
  for (const u of G.units) if (!u.dead && isEnemyTi(u.ti, G.myTi) && (u.leader || u.kind !== 'arch')) d = Math.min(d, Math.hypot(u.x - L.x, u.z - L.z)); return { T: G.T, d, dead: L.dead }; });
const shots = []; let n = 0;
for (let i = 0; i < 2000 && n < 3; i++) {
  await p.evaluate(() => window.__fb.step(15)); const s = await near();
  if (s.T > 600) break;
  if (!s.dead && s.d < 4 && (!shots.length || s.T - shots[shots.length - 1] > 70)) {
    n++; shots.push(s.T);
    // freeze time while the four views are taken (the sim steps only through step(); frames() also tick it, so hold it)
    for (const m of ['old', '45', '50', '55']) await view(`m${n}_${m}`, m);
    await p.evaluate(() => { window.__fb.G.paused = false; window.__noRender = true; });
    console.error('moment', n, 'T', s.T.toFixed(0));
  }
}
await b.close();
