// FEEL5/BAL1 look, phone size 851x393: Devi's Piercing shot (black tail, her army's colour at its heart) and Titus's
// Eagle's fall circle in his army's colour. Shots to /tmp/bal/.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
for (const id of ['devi', 'titus']) {
  const page = await open(browser, 851, 393, { q: `?crown2=1&champ=${id}`, quality: 'low' });
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
  for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await frames(page, 30);
  await page.evaluate(async id => {
    const { G } = window.__fb, me = G.player, C = await import('/src/champions/index.js'), d = C.champOf(me.ti), Cm = await import('/src/render/camera.js');
    me.mounted = false; G.teams[me.ti].lvl = 7; for (const s of G.teams) if (s) s.thinkT = 1e9;
    const ax = Math.sin(me.face), az = Math.cos(me.face); window.__yaw = me.face + (id === 'devi' ? 1.1 : 0); Cm.cam.yaw = window.__yaw;
    if (id === 'devi') { const D = await import('/src/core/sim/deviShots.js'); D.startPierce(me, { x: me.x + ax * 20, z: me.z + az * 20 }, d.sp1); me.pierce.held = false; me.pierce.T0 -= 1.5; }
    else { const E = await import('/src/core/sim/eagle.js'); E.startEagle(me, { x: me.x + ax * 7, z: me.z + az * 7 }, d.ult); }
  }, id);
  for (let k = 0; k < (id === 'devi' ? 3 : 10); k++) { await page.evaluate(async () => { const C = await import('/src/render/camera.js'); C.cam.yaw = window.__yaw; }); await frames(page, 1); }
  await page.screenshot({ path: `/tmp/bal/${id}.png` }); await page.close();
}
await browser.close();
