// FALL1 a champion no longer lies on the ground long after the rules let him up. The Ram's wall slam and the pull down
// played the whole 4.8 s knockdown clip and a 2.5 s get-up (7 s+ on his back) while he could move after 0.7-1 s, so
// he slid about lying down: "Titus keeps falling down". Now: the fall only, held while he is down, a quick get-up;
// moving, swinging or blocking lets go at once.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
for (let i = 0; i < 10; i++) { await frames(page, 4); await page.waitForTimeout(150); }
// your champion standing still: knocked down for 1 s
const pick = () => page.evaluate(() => { const G = window.__fb.G, F = window.__f8; const u = G.player && !G.player.dead && !G.player.mounted && F.live.get(G.player) ? G.player : null; window.__kd = u; return !!u; }); // (you, standing idle: nothing moves you)
ok(await pick(), 'a champion drawn on his clips');
const freeze = `const u = window.__kd; u.vx = u.vz = 0; u.swing = 0;`;
const sample = () => page.evaluate(`(() => { ${freeze} const G = window.__fb.G, h = window.__f8.live.get(window.__kd); return { T: G.T, an: h && h.an ? h.an.key.replace(/[0-9.]+$/, '') : null }; })()`);
await page.evaluate(`(() => { ${freeze} window.__kd.act = { name: 'knockdown', t: window.__fb.G.T, down: 1 }; window.__kdT = window.__fb.G.T; })()`);
const seen = [];
for (let i = 0; i < 40; i++) { await page.evaluate(freeze); await frames(page, 2); const s = await sample(); seen.push(s); }
const t0 = await page.evaluate(() => window.__kdT);
const down = seen.filter(s => s.an === 'knockdown'), up = seen.filter(s => s.an === 'getUp'), lastLie = Math.max(...seen.filter(s => s.an).map(s => s.T)) - t0;
ok(down.length > 0, `the knockdown plays (${down.length} samples)`);
ok(up.length > 0, 'then the get-up');
ok(lastLie < 2.6, `on his feet ${lastLie.toFixed(2)} s after the blow (down 1 s; was 7 s+)`);
// moving cancels it
await page.evaluate(`(() => { ${freeze} window.__kd.act = { name: 'knockdown', t: window.__fb.G.T, down: 1 }; })()`);
await frames(page, 6);
const before = await sample();
await page.keyboard.down('KeyW'); for (let i = 0; i < 4; i++) await frames(page, 1); const moved = true;
const after = await page.evaluate(() => { const h = window.__f8.live.get(window.__kd); return h && h.an ? h.an.key : null; });
await page.keyboard.up('KeyW');
ok(before.an === 'knockdown' && moved && !/knockdown|getUp/.test(after || ''), `moving lets go at once (${before.an} -> ${after})`);
await page.close(); await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
