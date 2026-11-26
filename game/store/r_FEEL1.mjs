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

for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await run(30); // (nobody is hurt before the break-out)
// FEEL1b: felt by the one hit. An enemy champion stood in front of him, soldiers of his beside: the three presses
const felt = await page.evaluate(async () => {
  const G = window.__fb.G, p = G.player, m = await import('/src/core/sim/captain.js'), { bus } = await import('/src/core/state.js'), live = window.__live;
  const { isEnemy } = await import('/src/core/state.js');
  const foes = G.units.filter(o => o.leader && !o.dead && isEnemy(o, p)), foe = foes.find(o => !o.mounted) || foes[0]; if (!foe) return { err: 'no foe' };
  if (foe.mounted) { const sim = await import('/src/core/sim.js'); sim.toggleHorseFor(foe); for (let k = 0; k < 40 && foe.mounted; k++) window.__frame(1); } // (on foot: a rider's horse takes the blows)
  const men = G.units.filter(o => !o.dead && !o.leader && !o.mounted && isEnemy(o, p)).slice(0, 3);
  const put = () => { const f = p.face, sx = Math.sin(f), sz = Math.cos(f);
    foe.x = p.x + sx * 1.6; foe.z = p.z + sz * 1.6; foe.face = f + Math.PI; foe.vx = foe.vz = 0; foe.stun = 9; foe.hp = foe.max; foe.guardT = 0; foe.blockT = 0; foe.cd = 9;
    men.forEach((o, i) => { o.x = p.x + sx * 1.7 + Math.cos(f) * (i - 1) * 1.1; o.z = p.z + sz * 1.7 - Math.sin(f) * (i - 1) * 1.1; o.vx = o.vz = 0; }); };
  const msgs = []; bus.on('fxmsg', d => { if (d.k === 'fxchamp') msgs.push([d.u === foe ? 'foe' : d.u === p ? 'me' : '?', !!d.heavy]); });
  const out = { menMoved: 0 }; let n = 0, seenSlow = false;
  for (let f = 0; f < 110 && n <= 3; f++) {
    if (n < 3 && p.cd <= 0) { put(); if (n === 2) out.men0 = men.map(o => [o.x, o.z]); m.captainAttack(p); n++; }
    else if (n === 3 && p.cd <= 0) n++;
    G.duels = []; foe.duelId = p.duelId = 0; foe.iframeT = 0; foe.guardT = 0; foe.blockT = 0; foe.pending = null; // (no duel, dodge or guard: a plain target)
    if (n >= 1) { const f0 = p.face; foe.x = p.x + Math.sin(f0) * 1.6; foe.z = p.z + Math.cos(f0) * 1.6; foe.vx = foe.vz = 0; }
    window.__frame(1); foe.stun = Math.max(foe.stun, 1); const h = live.get(foe); if (h && h.impR === 1) seenSlow = true;
  }
  if (out.men0) out.menMoved = men.filter((o, i) => Math.hypot(o.x - out.men0[i][0], o.z - out.men0[i][1]) > .3).length;
  out.seenSlow = seenSlow; out.mounted = foe.mounted; out.msgs = msgs;
  // and the other way: the foe strikes me
  foe.stun = 0; foe.cd = 0; foe.face = Math.atan2(p.x - foe.x, p.z - foe.z); const hp0 = p.hp;
  m.captainAttack(foe); for (let f = 0; f < 12; f++) { foe.vx = foe.vz = 0; window.__frame(1); }
  out.meHit = msgs.some(x => x[0] === 'me'); out.meHp = [hp0, p.hp];
  const ed = [...document.querySelectorAll('div')].find(e => /rgba\(210, ?30, ?20/.test(e.style.boxShadow)); out.edge = !!ed;
  return out;
});
ok(!felt.err && !felt.mounted, 'staged (the champion on foot)', felt.err);
ok(felt.msgs && felt.msgs.filter(x => x[0] === 'foe').length >= 3, 'each of his blows on the champion is a moment on every phone (fxchamp)', felt.msgs);
ok(felt.msgs && felt.msgs.some(x => x[0] === 'foe' && x[1]), 'the bash is the heavy one', felt.msgs);
ok(felt.seenSlow, 'the bashed champion staggers (slow hit reaction)');
ok(felt.menMoved >= 1, 'the bash shoves soldiers in front of him back (moved)', felt.menMoved);
ok(felt.meHit && felt.edge, 'hit by a champion: my screen edge goes red', [felt.meHit, felt.edge, felt.meHp]);
ok(!errs.length, 'no page errors', errs.slice(0, 2));
console.log(fails ? `${fails} FAILED` : 'ALL PASS');
await browser.close();
process.exit(fails ? 1 : 0);
