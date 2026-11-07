// Dev look: night on the summit, your captain at the glacier's face swinging: the ice stands on the ground,
// chips fly, the big bar in the middle drops; your health rides over your head.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const S = '/tmp/claude-0/-home-claude/4e17cb5f-998f-589c-8d52-44170dd3d094/scratchpad/';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 900, 420, { q: '?crown2=1' });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]');
await page.click('#goBtn');
await frames(page, 2);
await page.evaluate(() => { const { G } = window.__fb; G.T = 485; for (const u of G.units) if (u.leader && u.ti !== G.myTi) { u.x = 60 + u.ti; u.z = 60; } });
await page.evaluate(() => window.__fb.step(2));
const st = await page.evaluate(() => { const { G } = window.__fb, p = G.player; p.x = -3.6; p.z = 1; p.path = null; p.face = Math.atan2(0 - p.x, 0 - p.z); p.hp = p.max * .55; return { phase: G.c2.phase, gl: G.c2.breaks.find(b => b.kind === 'glacier').hp }; });
console.log(JSON.stringify(st));
for (let i = 0; i < 14; i++) { await page.evaluate(() => { const { G } = window.__fb, p = G.player; p.face = Math.atan2(0 - p.x, 0 - p.z); window.__fb.attack(); window.__fb.step(16, 1 / 30, true); }); }
await frames(page, 2);
const after = await page.evaluate(() => { const { G } = window.__fb, p = G.player; return { gl: G.c2.breaks.find(b => b.kind === 'glacier').hp, px: +p.x.toFixed(2), pz: +p.z.toFixed(2), bar: !document.getElementById('glacier').hidden, n: document.getElementById('glacierN').textContent }; });
console.log(JSON.stringify(after));
await page.evaluate(() => { const { G } = window.__fb, p = G.player; window.__camAt = [p.x - 6, p.y + 4.5, p.z - 6, 0, p.y + 1.6, 0]; document.getElementById('banner').style.display = 'none'; window.__fb.attack(); window.__fb.step(4, 1 / 30, true); });
await frames(page, 3);
await page.screenshot({ path: S + 'glacier.png' });
await browser.close();
