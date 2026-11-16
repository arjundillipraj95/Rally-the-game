// SPLIT: sim.js and main.js split by job, behaviour unchanged.
// SAVE=1 node store/r_SPLIT.mjs   records the "before" (export names, __fb keys, page DOM, seeded battle fingerprint)
// node store/r_SPLIT.mjs          compares against it, and checks every file under game/src is under 500 lines.
// Both with roles off and on. Math.random is seeded and the clock frozen, so the same code gives the same battle.
import { chromium } from 'playwright';
import { createHash } from 'crypto';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
const DIR = process.env.DIR || '/tmp/split', SAVE = !!process.env.SAVE, SECS = +(process.env.SECS || 60);
mkdirSync(DIR, { recursive: true });
const h = s => createHash('sha1').update(s).digest('hex').slice(0, 12);
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };

async function run(roles) {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text().slice(0, 200)); });
  await page.addInitScript(() => {
    window.__testSheet = true;
    localStorage.setItem('rally-quality', 'high'); localStorage.setItem('rally-tutorial-done', '1');
    // (MAP11, MAP13) only the battle's own code (src/core/) draws on the battle's stream; everything else (three.js ids,
    // drawing, sounds, menus, a model landing mid-battle) on another, so none of it can move the seeded battle
    let s = 12345, q = 777; const own = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }, other = () => { q = (Math.imul(q, 22695477) + 1) >>> 0; return q / 4294967296; };
    Math.random = () => { const st = new Error().stack || '', at = st.split('\n')[2] || ''; return at.includes('/src/core/') ? own() : other(); };
    window.__raf = []; window.__t = 0;
    performance.now = () => window.__t; const D0 = 1.7e12; Date.now = () => D0 + window.__t;
    window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
    // timers run on the frozen clock too: UI timers (banter, feed, hud) also draw on Math.random, so on the
    // real clock they'd fire a different number of times between steps and shift the battle's random numbers
    const T = []; let tid = 0;
    const add = (fn, ms, args, every) => { const id = ++tid; T.push({ id, at: window.__t + (+ms || 0), fn, args, every }); return id; };
    window.setTimeout = (fn, ms, ...a) => add(fn, ms, a, 0); window.setInterval = (fn, ms, ...a) => add(fn, ms, a, Math.max(1, +ms || 0));
    window.clearTimeout = window.clearInterval = id => { const k = T.findIndex(t => t.id === id); if (k >= 0) T.splice(k, 1); };
    const due = () => { for (;;) { T.sort((a, b) => a.at - b.at || a.id - b.id); const t = T[0]; if (!t || t.at > window.__t) return;
      if (t.every) t.at += t.every; else T.shift(); if (typeof t.fn === 'function') t.fn(...t.args); } };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; due(); const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
  });
  await page.goto('http://127.0.0.1:8766/?crown2=1' + (roles ? '&roles=1' : ''));
  await page.waitForFunction(() => window.__fb && window.__fb.G);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => { window.__noRender = true; window.__frame(3); });
  const surface = await page.evaluate(async () => {
    const sim = await import('/src/core/sim.js');
    return { sim: Object.keys(sim).sort(), fb: Object.keys(window.__fb).sort(),
      dom: document.body.innerHTML.replace(/\s+/g, ' ') };
  });
  await page.click('#segMode button[data-v="crown"]');
  await page.click('#goBtn');
  await page.evaluate(() => window.__frame(2)); await page.waitForLoadState('networkidle'); await page.waitForTimeout(+(process.env.WAIT || 2500)); await page.waitForLoadState('networkidle'); // (MAP6: the bigger mountain's models can still be landing at 500 ms; one landing mid-battle draws on Math.random)
  const prints = [], t0 = Date.now();
  for (let s = 0; s < SECS && (await page.evaluate(() => window.__fb.G.state)) !== 'end'; s++) {
    prints.push(await page.evaluate(() => { window.__fb.step(30); const G = window.__fb.G;
      return JSON.stringify([G.T.toFixed(3), G.units.map(u => [u.id, u.x.toFixed(3), u.z.toFixed(3), Math.round(u.hp * 100), u.dead ? 1 : 0, u.ti]),
        G.holds && G.holds.map(x => x.owner), G.teams.map(t => Math.round(t.points || 0)), G.arrows.length]); }));
  }
  const ms = Date.now() - t0;
  const calls = await page.evaluate(() => { window.__noRender = false; window.__frame(2); return window.__fb.info.gfx.calls; });
  await browser.close();
  return { ...surface, raw: process.env.RAW ? prints : undefined, ms, steps: prints.length, print: h(prints.join('\n')), perSec: prints.map(h), calls, errs };
}

for (const roles of [0, 1]) {
  const tag = roles ? 'roles on ' : 'roles off', f = join(DIR, `base-${roles}.json`);
  const now = await run(roles);
  if (SAVE) { writeFileSync(f, JSON.stringify(now)); console.log(`${tag}: saved (${now.steps} s, print ${now.print}, ${now.sim.length} sim names, calls ${now.calls}, errors ${now.errs.length})`); now.errs.forEach(e => console.log('  ' + e)); continue; }
  const was = JSON.parse(readFileSync(f, 'utf8'));
  const miss = was.sim.filter(n => !now.sim.includes(n)), extra = now.sim.filter(n => !was.sim.includes(n));
  ok(!miss.length && !extra.length, `${tag}: sim.js names same (${now.sim.length})${miss.length ? ' missing ' + miss : ''}${extra.length ? ' extra ' + extra : ''}`);
  ok(JSON.stringify(was.fb) === JSON.stringify(now.fb), `${tag}: __fb keys same (${now.fb.length})`);
  ok(was.dom === now.dom, `${tag}: page built the same (${now.dom.length} chars)`);
  const first = now.perSec.findIndex((p, i) => p !== was.perSec[i]);
  ok(now.print === was.print, `${tag}: seeded battle identical over ${now.steps} s` + (first >= 0 ? ` (first differs at ${first} s)` : ''));
  console.log(`     ${tag}: battle steps took ${now.ms} ms (before ${was.ms ?? '?'} ms; wall clock, noisy)`);
  ok(now.calls <= was.calls, `${tag}: draw calls ${was.calls} -> ${now.calls}`);
  ok(now.errs.length <= was.errs.length, `${tag}: no new errors (${now.errs.length})`); now.errs.forEach(e => console.log('  ' + e));
}
if (!SAVE) {
  const big = [];
  const walk = d => { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n.endsWith('.js')) { const L = readFileSync(p, 'utf8').split('\n').length; if (L > 500) big.push(`${p.replace(/.*game\//, '')} ${L}`); } } };
  for (const d of ['../src/core/sim', '../src/app']) { const p = new URL(d, import.meta.url).pathname; try { statSync(p); walk(p); } catch (e) {} }
  const mainL = Math.max(...['../src/main.js', '../src/core/sim.js'].map(f => readFileSync(new URL(f, import.meta.url), 'utf8').split('\n').length));
  ok(!big.length && mainL <= 500, `files under 500 lines (main.js ${mainL})${big.length ? ': ' + big.join(', ') : ''}`);
  console.log(fails ? `${fails} FAILED` : 'ALL PASS');
}
