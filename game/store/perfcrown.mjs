// Dev check: the worst case for the Crown: Trio (12 captains), every army at a big size, all fighting in
// and round the plaza. Measures the rules' cost per step (the host's phone does this every frame).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
await page.click('#segFmt button[data-v="2"]'); await page.click('#playBtn'); await frames(page, 5);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, s0 = G.teams[G.myTi]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; G.player = null; window.__noRender = 1;
  // 22 men per army (264 in all), packed round the plaza
  for (const [i, s] of G.teams.entries()) { if (!s.active) continue; const a = (i % 4) / 4 * Math.PI * 2 + (i >> 2) * .3; while (F.G.units.filter(u => !u.dead && u.ti === i && !u.leader).length < 22) { const r = 14 + Math.random() * 10, b = a + (Math.random() - .5) * .8; F.mkUnit(i, Math.cos(b) * r, Math.sin(b) * r, Math.random() < .3 ? 'arch' : 'foot'); } }
  G.T = 300; const n = G.units.filter(u => !u.dead).length;
  const times = []; for (let k = 0; k < 240; k++) { const t = performance.now(); F.step(1, 1 / 30); times.push(performance.now() - t); }
  times.sort((a, b) => a - b);
  return { units: n, alive: G.units.filter(u => !u.dead).length, med: +times[120].toFixed(2), p95: +times[228].toFixed(2), max: +times[239].toFixed(2) };
});
console.log(JSON.stringify(r));
await browser.close();
