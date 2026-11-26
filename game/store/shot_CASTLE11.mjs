// CASTLE11 look: a level III castle with its lane gate broken (red cross and smoke over the keep, crosses over the two
// silent towers), phone size 851x393. Shots to /tmp/c11/.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
import fs from 'fs';
fs.mkdirSync('/tmp/c11', { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 851, 393, { q: '?crown2=1', quality: 'low' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await frames(page, 30);
for (const broken of [false, true]) {
  await page.evaluate(async broken => {
    const { G } = window.__fb, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js');
    const me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], h = G.holds.find(x => x.kind === 'castle' && x.side === st8.colorOf(me.ti) && !x.mid), cw = G.layout.cwalls.find(c => c.hid === h.id);
    h.owner = myA; G.cgates[h.id] = f.freshGates(3); if (broken) { G.cgates[h.id].hp[0] = 0; G.cgates[h.id].broken |= 1; } f.applyCastleGates();
    const a = cw.gates[0]; me.x = cw.x + Math.cos(a) * 30; me.z = cw.z + Math.sin(a) * 30; me.face = Math.atan2(cw.x - me.x, cw.z - me.z); me.vx = me.vz = 0; me.hp = me.max = 1e6;
    for (const s of G.teams) if (s) s.thinkT = 1e9;
    const C = await import('/src/render/camera.js'); C.cam.yaw = me.face; C.cam.snap = 5; window.__yaw = C.cam.yaw;
    G.units.forEach(u => { if (u !== me && !u.dead && Math.hypot(u.x - cw.x, u.z - cw.z) < 40) { u.x += 300; u.z += 300; } });
  }, broken);
  for (let k = 0; k < 45; k++) { await page.evaluate(async () => { const C = await import('/src/render/camera.js'); C.cam.yaw = window.__yaw; }); await frames(page, 1); }
  await page.screenshot({ path: `/tmp/c11/${broken ? 'broken' : 'whole'}.png` });
}
await browser.close();
