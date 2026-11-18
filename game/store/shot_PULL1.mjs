// PULL1 the ring closing on a rider coming past, and the pull itself
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const shot = async (lead, name, press) => { await page.evaluate(async ([lead, press]) => {
  const F = window.__fb, { G } = F, CP = await import('/src/core/sim/captain.js'), me = G.myTi, p = G.player;
  if (!window.__pullSet) { window.__pullSet = 1; G.T = 40; G.T = 40; F.step(1); for (let i = 0; i < 120; i++) { p.x += Math.sin(p.face) * .1; p.z += Math.cos(p.face) * .1; } window.__aim.cam.yaw = p.face; window.__frame(40); }
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader;
  E.dead = false; E.hp = E.max; E.mounted = true; E.horse = { state: 'ridden', x: E.x, z: E.z }; E.horseHp = 200; E.stun = 0;
  window.__aim.cam.yaw = p.face; const f = p.face, spd = 9, sx = Math.cos(f), sz = -Math.sin(f);
  // she comes at him from in front, passing 1.4 m to his right: lead s before the beat
  const d = spd * (lead + .25); E.x = p.x + Math.sin(f) * d + sx * 1.4; E.z = p.z + Math.cos(f) * d + sz * 1.4; E.vx = -Math.sin(f) * spd; E.vz = -Math.cos(f) * spd; E.face = f + Math.PI; E.cd = 9;
  if (press) { p.cd = 0; p.stun = 0; CP.captainAttack(p); }
  window.__frame(press ? 4 : 1); }, [lead, press]); await page.screenshot({ path: `/tmp/pull_${name}.png` }); };
await shot(.6, 'far'); await shot(.05, 'beat'); await shot(0, 'pulled', true);
await browser.close();
