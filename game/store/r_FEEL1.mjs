// FEEL1 (Arjun 25 Nov): Titus's slash, slash, shield bash. Done when: three Attack presses play slash1, slash3 and the
// bash (drawn on the block clip, the shield in front); each blow is held to the next press (no idle between them); the
// bash steps him in further than standing; the bash leans his body in; no page errors. Run from game/.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 851, 393, { q: '?crown2=1&champ=titus&botchamp=titus', quality: 'low' });
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await run(90);
let fails = 0; const ok = (c, m, x) => { console.log(c ? 'ok  ' : 'FAIL', m, x === undefined ? '' : JSON.stringify(x)); if (!c) fails++; };
const rec = await page.evaluate(async () => {
  const G = window.__fb.G, p = G.player, m = await import('/src/core/sim/captain.js'), live = window.__live;
  p.vx = p.vz = 0; const out = { clips: [], idleBetween: 0, moved: [], lean: 0 };
  let n = 0, x0 = p.x, z0 = p.z, spine0 = null;
  for (let f = 0; f < 120 && n <= 3; f++) {
    if (n < 3 && p.cd <= 0) { if (n) out.moved.push(Math.hypot(p.x - x0, p.z - z0)); x0 = p.x; z0 = p.z; m.captainAttack(p); n++; }
    else if (n === 3 && p.cd <= 0) { out.moved.push(Math.hypot(p.x - x0, p.z - z0)); n++; }
    window.__frame(1);
    const h = live.get(p), an = h && h.an, clip = an ? an.steps[an.i] : 'idle';
    if (n >= 1 && n <= 3 && h && G.T - h.swT < (n < 3 ? p.cd + G.T - h.swT - .05 : h.swEnd - .05) && clip === 'idle') out.idleBetween++; // (to the next press; the bash to its hold's end)
    if (n === 3 && h) out.bashHeld = h.swEnd;
    if (h && h.swClip && !out.clips.includes(h.swN + ':' + h.swClip + '/' + clip)) out.clips.push(h.swN + ':' + h.swClip + '/' + clip);
    const sp = h && h.R.mx && h.R.mx.Spine; if (sp && n === 3) { if (G.T - h.swT < h.swEnd) out.lean = Math.max(out.lean, sp.rotation.x); else spine0 = sp.rotation.x; }
  }
  out.lean -= spine0 ?? 0; return out;
});
const names = [...new Set(rec.clips.map(s => s.split('/')[0].split(':')[1]))];
ok(names.join() === 'slash1,slash3,shieldBash', 'three presses: slash1, slash3, shield bash', names);
ok(rec.clips.some(s => s.endsWith('shieldBash/block')), 'the bash is drawn on the block clip (shield in front)', rec.clips.filter(s => s.includes('shieldBash')));
ok(rec.clips.some(s => s.endsWith('shieldBash/blockIdle')), 'then holds it up (blockIdle)');
ok(rec.idleBetween === 0, 'each blow is held to the next press (frames of idle between)', rec.idleBetween);
ok(rec.moved.length === 3 && rec.moved[2] > rec.moved[0] * 1.2, 'the bash steps him in further than a slash (m)', rec.moved.map(v => +v.toFixed(2)));
ok(rec.bashHeld >= .7, 'after the bash the shield is held up to near his next blow (s)', rec.bashHeld);
ok(rec.lean > .2, 'the bash leans his body in (rad)', +rec.lean.toFixed(2));
ok(!errs.length, 'no page errors', errs.slice(0, 2));
console.log(fails ? `${fails} FAILED` : 'ALL PASS');
await browser.close();
process.exit(fails ? 1 : 0);
