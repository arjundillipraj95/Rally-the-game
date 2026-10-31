// Dev check: what a wind-up, its glint and a parry look like from the player's seat.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.click('#segMap button[data-v="valley"]'); await page.click('#segDiff button[data-v="2"]').catch(() => {}); await page.click('#goBtn'); await frames(page, 10);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.teams[i].active && G.ALLY[i] !== G.ALLY[me]); window.__E = G.teams[foe].leader;
  for (const u of G.units) if (u !== p && u !== window.__E) { u.x = 300 + Math.random(); u.z = 300; }
  p.x = -30; p.z = 0; p.face = Math.PI / 2; p.hp = p.max = 9999; const E = window.__E; E.x = -27.5; E.z = 0; E.face = -Math.PI / 2; E.hp = E.max = 9999;
  F.cam.yaw = Math.PI / 2 - .5; window.__blk = false;
  window.__moveOverride = () => ({ wx: 0, wz: 0, mag: 0, camYaw: F.cam.yaw, block: window.__blk });
});
// wait for a wind-up (frame by frame), shoot it, then the glint, then parry and shoot that
let got = { wind: false, glint: false, parry: false };
for (let f = 0; f < 900 && !got.parry; f++) {
  await frames(page, 1);
  const st = await page.evaluate(() => { const E = window.__E, p = window.__fb.G.player; if (Math.hypot(E.x - p.x, E.z - p.z) > 6) { E.x = p.x + 2.5; E.z = p.z; } return { w: E.windup > 0, g: !!E.glint, par: p.parries || 0 }; });
  if (st.w && !got.wind) { got.wind = true; await frames(page, 6); await page.screenshot({ path: OUT + 'fight_windup.png' }); }
  if (st.g && !got.glint) { got.glint = true; await page.screenshot({ path: OUT + 'fight_glint.png' }); await page.evaluate(() => { window.__blk = true; }); await frames(page, 2); await page.evaluate(() => { window.__blk = false; }); }
  if (st.par > 0 && !got.parry) { got.parry = true; await frames(page, 4); await page.screenshot({ path: OUT + 'fight_parry.png' }); }
}
console.log(JSON.stringify(got));
await browser.close();
