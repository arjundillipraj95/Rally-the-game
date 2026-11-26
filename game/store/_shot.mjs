// CAM1 quick look: a computer match stepped to T, one frame from the battle camera. node store/_shot.mjs <T> <out.jpg> [query]
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
import fs from 'fs';
const [T = '60', out = '/tmp/shot.jpg', q = '?crown2=1&champ=titus'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await open(b, 844, 390, { q, quality: 'high' });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 3);
await p.evaluate(() => { const { G } = window.__fb; const s = G.teams[G.myTi]; s.human = false; if (s.leader) s.leader.human = false; window.__noRender = true; });
while ((await p.evaluate(() => window.__fb.G.T)) < +T) await p.evaluate(() => window.__fb.step(60));
if (process.env.PRE) await p.evaluate(process.env.PRE); await p.evaluate(() => { window.__noRender = false; }); await frames(p, 20);
if (process.env.JS) console.log(await p.evaluate(process.env.JS));
const url = await p.evaluate(async () => { const S = await import('/src/render/scene.js'); S.renderer.render(S.scene, S.camera); return S.renderer.domElement.toDataURL('image/jpeg', .85); });
fs.writeFileSync(out, Buffer.from(url.split(',')[1], 'base64')); await b.close();
