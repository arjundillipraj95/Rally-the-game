// F17 "Done when": the captain plays the added clips (Cosindra, put on the shared skeleton by tools/models/extra.py), headless.
//   the captain file holds the 11 new clips beside the 30 Mixamo ones, the soldier file too
//   sword: the combo's spin finisher, the leap, the held heavy blow and the shield bash have their clips
//   spear: held forward while he stands (upper body), the thrust, the sweep; javelins: the throw
//   unit.act 'knockdown' and 'getUp' play head to toe; never a broken (non-finite) bone, no page errors
// Usage: node store/r_F17.mjs   (Q='?crown2=1&roles=1' for roles on; SHOTS=1 saves pictures in /tmp/f17). Needs bash game/store/servers.sh
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const Q = (process.env.Q ?? '?crown2=1').replace(/^\?/, ''), OUT = '/tmp/f17/'; mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 844, height: 390 } }), errors = [];
page.on('pageerror', e => { errors.push(e.message); console.log('PAGEERROR', e.message); });
page.on('console', m => { const t = m.text(); if ((m.type() === 'error' || /shader|WebGLProgram|failed to load/i.test(t)) && !/GPU stall|net::|Failed to load resource|WebSocket/i.test(t)) { errors.push(t.slice(0, 200)); console.log('CONSOLE', t.slice(0, 200)); } });
await page.addInitScript(() => {
  window.__testSheet = true; localStorage.setItem('rally-quality', 'low'); localStorage.setItem('rally-tutorial-done', '1');
  let s = 4242; Math.random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  window.__raf = []; window.__t = 0;
  window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
  window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
});
const res = [];
const ok = (name, pass, detail = '') => { res.push({ name, pass: !!pass }); console.log((pass ? '  ok   ' : '  FAIL ') + name + (detail !== '' ? '  [' + (typeof detail === 'string' ? detail : JSON.stringify(detail)) + ']' : '')); };
await page.goto('http://127.0.0.1:8766/?' + Q);
await page.waitForFunction(() => window.__fb && window.__fb.G);
await page.evaluate(() => window.__frame(3));
await page.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
await page.waitForTimeout(4000); // (the models load)
await page.evaluate(async () => { const F = window.__fb; for (let k = 0; k < 600 && !(F.G.state === 'play' && F.G.player && window.__f8.live.get(F.G.player)); k++) { window.__frame(1); if (k % 40 === 0) await new Promise(r => setTimeout(r, 30)); } });
// each frame: what the player captain's upper body and legs play, and whether any bone went non-finite
const run = (n, setup = null) => page.evaluate(([n, setup]) => {
  const G = window.__fb.G, p = G.player; if (setup) new Function('p', 'G', setup)(p, G);
  const out = [];
  for (let i = 0; i < n; i++) {
    window.__frame(1); const h = window.__f8.live.get(G.player); if (!h || !h.R.clip) { out.push(null); continue; }
    const R = h.R; let bad = false; for (const b of R.list) for (const e of b.matrixWorld.elements) if (!isFinite(e)) bad = true;
    out.push({ up: R.up.list[0] && R.up.list[0].name, lo: R.lo.list[0] && R.lo.list[0].name, bad, w: h.weapon });
  }
  return out;
}, [n, setup]);
const seen = (f, part) => [...new Set(f.filter(Boolean).map(x => x[part]))];
const has = (f, part, name) => f.some(x => x && x[part] === name);
const shot = async name => { if (process.env.SHOTS) await page.screenshot({ path: OUT + name + '.png', timeout: 120000 }).catch(e => console.log('  (no shot: ' + e.message.split('\n')[0] + ')')); };
const ADDED = ['spin', 'leapSmash', 'slashWide', 'slashBack', 'overhead', 'spearThrust', 'spearIdle', 'javThrow', 'shieldBash', 'knockdown', 'getUp'];
const all = [];

let f = await run(30); all.push(...f);
ok('the player captain is on the clip skeleton', f[29] && f[29].up, f[29]);
if (!(f[29] && f[29].up)) { await browser.close(); process.exit(1); }
const files = await page.evaluate(async () => { const c = window.__f8.src().cap.clips, s = await window.__f8.loadClipBody('models/soldier_anim.glb'); return { cap: Object.keys(c), sold: Object.keys(s.clips), bones: s.names.length }; });
ok('the captain file: the 11 added clips beside the 30 before (41)', files.cap.length === 41 && ADDED.every(n => files.cap.includes(n)), files.cap.length);
ok('the soldier file: the same 41 on the same 22 bones', files.sold.length === 41 && ADDED.every(n => files.sold.includes(n)) && files.bones === 22, files.sold.length + ' clips, ' + files.bones + ' bones');
await page.evaluate(() => { const p = window.__fb.G.player; p.weapon = 'sword'; p.hp = p.max = Math.max(p.max, 500); window.__frame(2); });
f = await run(30); all.push(...f);

console.log('sword');
const combo = [];
for (let k = 0; k < 3; k++) { await page.evaluate(() => { const p = window.__fb.G.player; p.cd = 0; window.__fb.attack(); }); const g = await run(16); all.push(...g); combo.push({ k: await page.evaluate(() => window.__fb.G.player.swingKind), up: seen(g, 'up'), lo: seen(g, 'lo') }); if (k === 2) await shot('spin'); }
ok('three presses of attack: slash1, slash2, then the spin finisher, head to toe', combo[2].up.includes('spin') && combo[2].lo.includes('spin'), combo.map(c => c.k + ':' + c.up.join('/')));
f = await run(45); all.push(...f);
for (const [what, kind, clip, legs] of [['the leap', 2, 'leapSmash', true], ['the held heavy blow', 5, 'overhead', false], ['the shield bash', 6, 'shieldBash', false]]) {
  f = await run(20, `p.swing = .38; p.swingKind = ${kind}; p.combo = 0;`); all.push(...f); await shot(clip);
  ok(`${what} (swingKind ${kind}, staged): ${clip}${legs ? ', head to toe' : ''}`, has(f, 'up', clip) && (!legs || has(f, 'lo', clip)), { up: seen(f, 'up'), lo: seen(f, 'lo') });
  f = await run(40); all.push(...f);
}

console.log('spear');
f = await run(40, 'p.weapon = "spear";'); all.push(...f); await shot('spearIdle');
ok('a spear: held forward while he stands (spearIdle on the upper body, idle on the legs)', f[39].w === 'spear' && f[39].up === 'spearIdle' && f[39].lo === 'idle', f[39]);
f = await run(20, 'p.swing = .38; p.swingKind = 3; p.combo = 0;'); all.push(...f); await shot('spearThrust');
ok('the spear thrust (swingKind 3, staged): spearThrust', has(f, 'up', 'spearThrust'), seen(f, 'up'));
f = await run(40); all.push(...f);
f = await run(20, 'p.swing = .38; p.swingKind = 4; p.combo = 0;'); all.push(...f);
ok('the spear\'s wide blow (swingKind 4, staged): slashWide', has(f, 'up', 'slashWide'), seen(f, 'up'));
f = await run(40); all.push(...f);
ok('and back to the spear held forward', f[39].up === 'spearIdle', f[39].up);

console.log('javelins');
f = await run(30, 'p.weapon = "jav";'); all.push(...f);
f = await run(30, 'p.swing = .38; p.swingKind = 4; p.combo = 0;'); all.push(...f); await shot('javThrow');
ok('a javelin thrown (swingKind 4, staged): javThrow', f[0] && f[0].w === 'jav' && has(f, 'up', 'javThrow'), seen(f, 'up'));
f = await run(40, 'p.weapon = "sword";'); all.push(...f);

console.log('knocked down');
f = await run(175, 'G.units = G.units.filter(e => e === p || Math.hypot(e.x - p.x, e.z - p.z) > 30); G.arrows.length = 0; p.act = { name: "knockdown", t: G.T };'); all.push(...f);
await shot('knockdown');
ok('unit.act \'knockdown\': knockdown head to toe, then back to idle', has(f, 'up', 'knockdown') && has(f, 'lo', 'knockdown') && f[174].up === 'idle', seen(f, 'up'));
f = await run(85, 'p.act = { name: "getUp", t: G.T };'); all.push(...f);
ok('unit.act \'getUp\': getUp head to toe', has(f, 'up', 'getUp') && has(f, 'lo', 'getUp'), seen(f, 'up'));

ok('no bone ever went non-finite', all.every(x => !x || !x.bad));
ok('no page errors', errors.length === 0, errors.slice(0, 3));
const failed = res.filter(r => !r.pass).length;
console.log(failed ? `${failed} FAILED of ${res.length}` : `ALL PASS (${res.length})`);
await browser.close(); process.exit(failed ? 1 : 0);
