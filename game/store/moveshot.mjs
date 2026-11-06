// Dev check: the new captain's moves, one picture each (side-on, close): guard, a blocked hit, the three
// evades, the per-weapon executions and the beaten man kneeling, the spear's stabs, the javelin's throw.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 560, 400);
await page.evaluate(() => { document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 30);
await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), L = G.teams[foe].leader;
  for (const u of G.units) if (u !== p && u !== L) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  window.__L = L; window.__X = X; window.__Z = Z;
  window.__reset = () => { p.x = X; p.z = Z; p.vx = p.vz = 0; p.face = Math.PI / 2; p.y = groundYAt(); L.x = X + 2.4; L.z = Z; L.face = -Math.PI / 2; L.stun = 99; L.cd = 99; L.hp = L.max = 1e6; p.hp = p.max = 1e6; };
  const groundYAt = () => p.y; window.__reset();
  window.__camAt = [X + 1.2, p.y + 2.4, Z + 7.5, X + 1.2, p.y + 1.25, Z]; document.querySelectorAll("#hud, .hud, #ctl").forEach(e => e.style.display = "none");
});
const shots = [
  ['guard', 'p.blocking = true; p.blockT = 1;', 12],
  ['blockhit', 'p.blocking = true; p.blockT = 1; p.hp -= 5;', 2],
  ['ev_side', 'p.evade = { kind: "side", t: G.T }; p.vz = 6;', 5],
  ['ev_pounce', 'p.evade = { kind: "pounce", t: G.T };', 4],
  ['ev_back', 'p.evade = { kind: "back", t: G.T };', 4],
  ['spear_low', 'p.weapon = "spear"; p.swing = .38 * .7; p.swingKind = 0;', 0, 8],
  ['spear_high', 'p.weapon = "spear"; p.swing = .38 * .7; p.swingKind = 1;', 0, 8],
  ['spear_lunge', 'p.weapon = "spear"; p.swing = .38 * .65; p.swingKind = 5;', 0, 8],
  ['jav_throw', 'p.weapon = "jav"; p.swing = .38 * .7; p.swingKind = 0;', 0, 8],
  ['sword_bash', 'p.weapon = "sword"; p.swing = .38 * .55; p.swingKind = 6;', 0, 8],
];
for (const [name, set, n, pre] of shots) {
  if (pre) await page.evaluate(s => { const G = window.__fb.G, p = G.player; window.__reset(); eval(s.replace(/p\.swing = [^;]+;/, '')); }, set), await frames(page, pre);
  await page.evaluate(s => { const G = window.__fb.G, p = G.player; window.__reset(); eval(s); }, set);
  if (n) await frames(page, n); else await frames(page, 1);
  await page.screenshot({ path: OUT + 'mv_' + name + '.png' });
  await page.evaluate(() => { const p = window.__fb.G.player; p.blocking = false; p.blockT = 0; p.evade = null; p.swing = 0; });
  await frames(page, 6);
}
// executions: drive the flags by hand, shot at the raise and at the blow
for (const w of ['sword', 'spear', 'jav']) {
  await page.evaluate(w => { const p = window.__fb.G.player, L = window.__L; window.__reset(); p.weapon = w; }, w); await frames(page, 6);
  await page.evaluate(() => { const p = window.__fb.G.player, L = window.__L; p.execA = true; L.execV = true; }); await frames(page, 16);
  await page.screenshot({ path: OUT + `mv_exec_${w}_raise.png` });
  await frames(page, 9); await page.screenshot({ path: OUT + `mv_exec_${w}_blow.png` });
  await page.evaluate(() => { const p = window.__fb.G.player, L = window.__L; p.execA = false; L.execV = false; }); await frames(page, 8);
}
await browser.close(); console.log('ok');
