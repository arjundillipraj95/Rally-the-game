// C5 shots of Sigrun close up, for judging her pieces (OUT=/tmp/c5/): standing, her face, back, on the wolf, the
// wolf from the side, and her swordsmen. Not a test: pictures for Arjun.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
import { mkdirSync } from 'fs';
const OUT = process.env.OUT || '/tmp/c5/'; mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 900, 520, { q: '?crown2=1&champ=sigrun&botchamp=sigrun', quality: 'high' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await run(90);
const cam = async (name, dist, side, up = 1.4, look = 1.1, prep = '') => {
  await page.evaluate(([dist, side, up, look, prep]) => {
    const G = window.__fb.G, p = G.player; p.vx = p.vz = 0; p.marchT = 0; if (prep) new Function('p', 'G', prep)(p, G);
    const f = p.face, cx = p.x + Math.sin(f + side) * dist, cz = p.z + Math.cos(f + side) * dist;
    window.__camAt = [cx, p.y + up, cz, p.x, p.y + look, p.z];
  }, [dist, side, up, look, prep]);
  await run(8); await page.screenshot({ path: `${OUT}art_${name}.png`, timeout: 300000 });
};
await cam('front', 3.6, .6);
await cam('face', 2.2, -.5, 1.7, 1.55);
await cam('back', 3.8, Math.PI, 1.6, 1.1);
await page.evaluate(async () => { const army = await import('/src/core/sim/army.js'), G = window.__fb.G, me = G.player; const h = { id: ++G.horseN, x: me.x, z: me.z, face: 0, state: 'coming', rider: me, t: 0, spd: 0, ti: me.ti, fall: 1 }; G.horses.push(h); army.mountUp(me, h); });
await run(10);
await cam('wolf', 5.5, .9, 2.2, 1.3);
await cam('wolfside', 6, -Math.PI / 2, 1.8, 1.2);
await browser.close();
