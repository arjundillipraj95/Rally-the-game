// F14 in a real (slow, headless) browser, frames driven with a fake clock:
// 1. Auto on a slow phone: the first 5 s drop it to the floor rung, the canvas gets fewer pixels, the rung is kept.
//    Stalls (3 s frames) void the window: nothing changes.
// 2. The same phone starting from a kept rung with shadows and far scenery on: a slow battle switches shadows and
//    far scenery off live, with no errors, and the frame still draws.
// Usage: node store/r_F14b.mjs
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };

async function battle(kept) { // kept: { k: the phone's key, r: a rung } saved before the page starts
  const page = await open(browser, 480, 270, { q: '?crown2=1', quality: 'auto' });
  const errs = []; page.on('pageerror', e => errs.push(String(e)));
  if (kept) { await page.evaluate(k => localStorage.setItem('rally-quality-auto2', JSON.stringify(k)), kept); await page.reload(); await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3)); }
  await page.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
  const run = (n, dt) => page.evaluate(([n, dt]) => { for (let i = 0; i < n; i++) window.__frame(1, dt); }, [n, dt]);
  for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10, 33);
  const look = () => page.evaluate(() => { const F = window.__fb, c = F.renderer.domElement; return { w: c.width, gfx: F.info.gfx, shadows: F.renderer.shadowMap.enabled, kept: JSON.parse(localStorage.getItem('rally-quality-auto2') || 'null'), note: document.getElementById('qualityNote').textContent }; });
  return { page, errs, run, look };
}

// 1
let b = await battle(null);
const a0 = await b.look(); await b.run(40, 250); const a1 = await b.look(); // (10 s at 4 fps)
await b.run(4, 3000); const a2 = await b.look();
console.log(JSON.stringify({ start: [a0.gfx.rung, a0.w], slow: [a1.gfx.rung, a1.w, a1.gfx.scale], kept: a1.kept && a1.kept.r }));
ok(a0.gfx.setting === 'auto', 'no saved choice: Auto');
ok(a1.gfx.rung > a0.gfx.rung && a1.w < a0.w, `slow: rung ${a0.gfx.rung} -> ${a1.gfx.rung}, canvas ${a0.w} -> ${a1.w} px wide`);
ok(a1.kept && a1.kept.r === a1.gfx.rung, 'the rung is kept for the next battle');
ok(a2.gfx.rung === a1.gfx.rung && a2.w === a1.w, 'stalls (3 s frames): no change');
ok(/Auto lowered/.test(a1.note), 'settings note says Auto lowered the graphics');
ok(!b.errs.length, 'no page errors' + (b.errs.length ? ': ' + b.errs[0] : ''));
await b.page.close();

// 2
b = await battle({ k: a1.kept.k, r: 3 });
const c0 = await b.look(); await b.run(40, 250); const c1 = await b.look();
console.log(JSON.stringify({ start: [c0.gfx.rung, c0.shadows], slow: [c1.gfx.rung, c1.shadows] }));
ok(c0.gfx.rung === 3 && c0.shadows, 'kept rung 3: the battle starts there, shadows on');
ok(c1.gfx.rung >= 5 && !c1.shadows, `slow: shadows and far scenery switched off live (rung ${c1.gfx.rung})`);
await b.run(5, 33);
ok(!b.errs.length && (await b.look()).gfx.calls > 0, 'still drawing, no page errors' + (b.errs.length ? ': ' + b.errs[0] : ''));
await b.page.close();

console.log(`r_F14b: ${pass} pass, ${fail} fail`);
await browser.close(); process.exit(fail ? 1 : 0);
