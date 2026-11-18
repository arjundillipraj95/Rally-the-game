// C3 shots of Titus close up, for judging his pieces (OUT=/tmp/c3/, TAG names them): standing, shield up (Block
// held), a side view, and mounted. Not a test: pictures for Arjun.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
import { mkdirSync } from 'fs';
const OUT = process.env.OUT || '/tmp/c3/', TAG = process.env.TAG || 'shield'; mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 900, 520, { q: '?crown2=1&champ=titus&botchamp=titus', quality: 'high' });
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await run(90);
// park him on open ground, facing the camera's side, nobody near
const cam = async (name, dist, side, up = 1.4, look = 1.1, prep = '') => {
  await page.evaluate(([dist, side, up, look, prep]) => {
    const G = window.__fb.G, p = G.player; p.vx = p.vz = 0; p.marchT = 0; if (prep) new Function('p', 'G', prep)(p, G);
    const f = p.face, cx = p.x + Math.sin(f + side) * dist, cz = p.z + Math.cos(f + side) * dist;
    window.__camAt = [cx, p.y + up, cz, p.x, p.y + look, p.z];
  }, [dist, side, up, look, prep]);
  await run(8); await page.screenshot({ path: `${OUT}${TAG}_${name}.png`, timeout: 300000 });
};
await cam('front', 3.6, .6);
await cam('face', 2.2, -.5, 1.6, 1.45);
await cam('right', 3.6, -.9, 1.5, 1.0);
await cam('block', 3.6, .3, 1.4, 1.1, 'p.blocking = true; p.human = true;');
await cam('side', 3.6, -Math.PI / 2, 1.4, 1.1, 'p.blocking = false;');
await cam('back', 3.8, Math.PI, 1.6, 1.1);
// one of his footmen up close, and a group of them further off (the far figures)
for (const [name, dist, up, kind] of [['soldier', 2.6, 1.2, 'foot'], ['archer', 2.6, 1.2, 'arch'], ['crowd', 14, 5, 'foot']]) {
  await page.evaluate(([dist, up, kind]) => { const G = window.__fb.G, f = G.units.find(u => u.ti === G.myTi && u.kind === kind && !u.dead) || G.player;
    window.__camAt = [f.x + Math.sin(f.face + .5) * dist, f.y + up, f.z + Math.cos(f.face + .5) * dist, f.x, f.y + .9, f.z]; }, [dist, up, kind]);
  await run(6); await page.screenshot({ path: `${OUT}${TAG}_${name}.png`, timeout: 300000 });
}
await page.evaluate(async () => { const sim = await import('/src/core/sim.js'), p = window.__fb.G.player; p.lastHit = -9; p.horseCd = 0; sim.toggleHorseFor(p); });
for (let k = 0; k < 40 && !(await page.evaluate(() => window.__fb.G.player.mounted)); k++) await run(15);
await cam('mounted', 5.5, .8, 2.4, 1.6);
await page.keyboard.down('KeyW'); await run(45);
for (let i = 0; i < 3; i++) { await cam('gallop' + i, 6, -Math.PI / 2, 2.2, 1.4); await run(3); }
await page.keyboard.up('KeyW');
console.log('shots', TAG, errs.length ? errs.slice(0, 2) : 'no errors', await page.evaluate(() => window.__fb.G.player.mounted));
await browser.close();
