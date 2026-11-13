// F8 "Done when": the captain moves by real clips (Mixamo, on the shared skeleton), headless.
//   a  the captain plays each wired clip when its move happens, blended in, never a T-pose frame
//   b  his upper body attacks while his legs run
//   c  the soldier's body and its clips load on the same skeleton with no errors (and the captain's clips fit it)
//   d  node store/crown2sim.mjs and node store/crown2online.mjs, roles off and on (run them beside this)
//   e  draw calls and triangles on Low do not rise (r_F6perf.mjs against the numbers before F8)
// Real moves use the real keys (W, Space, Shift) and the game's own rules. Moves the keys can't reach in
// a test (a walk, a strafe, a snap turn, a thrust, a boosted blow) are staged by holding the player
// captain's speed, facing or blow for a few frames; moves the game doesn't have yet (kick, crouch, sheath,
// power up, casting) through unit.act, which is how a later ticket will set them off.
// Usage: node store/r_F8.mjs   (Q='?crown2=1&roles=1' for roles on; PERF=0 skips e; SHOTS=1 saves pictures). Needs bash game/store/servers.sh
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { perf } from './r_F6perf.mjs';
const BASE = { calls: 1191, tris: 542711 }; // (roles at 87822dc, before F8: node store/r_F6perf.mjs)
const Q = (process.env.Q ?? '?crown2=1').replace(/^\?/, ''), OUT = '/tmp/f8/'; mkdirSync(OUT, { recursive: true });
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

// in the page: step frames and note, each frame, what the player captain's skeleton is doing
await page.evaluate(() => {
  const F = window.__fb, X = window.__f8, G = F.G;
  window.__pin = {}; // (staging: the player's values held for the frames of one scene)
  const pinOn = (u, k) => { if (Object.getOwnPropertyDescriptor(u, k) && Object.getOwnPropertyDescriptor(u, k).get) return; let v = u[k]; Object.defineProperty(u, k, { configurable: true, enumerable: true, get: () => (k in window.__pin ? window.__pin[k] : v), set: x => { v = x; } }); };
  window.__me = () => { const p = G.player; for (const k of ['vx', 'vz', 'face']) pinOn(p, k); return p; };
  window.__h = () => X.live.get(G.player);
  window.__log = [];
  window.__run = (n, each) => {
    const out = [];
    for (let i = 0; i < n; i++) {
      if (each) each(i);
      window.__frame(1);
      const h = window.__h(); if (!h || !h.R.clip) { out.push(null); continue; }
      const R = h.R, sum = L => L.list.reduce((s, e) => s + e.w, 0), ang = n => { const b = R.mx[n], r = R.rest[R.list.indexOf(b)]; return b.quaternion.angleTo(r.q); };
      let bad = false; for (const b of R.list) { const e = b.matrixWorld.elements; for (let k = 0; k < 16; k++) if (!isFinite(e[k])) bad = true; }
      out.push({ up: R.up.list[0] && R.up.list[0].name, lo: R.lo.list[0] && R.lo.list[0].name, upW: +(R.up.list[0] ? R.up.list[0].w : 0).toFixed(2), nUp: R.up.list.length, sUp: +sum(R.up).toFixed(3), sLo: +sum(R.lo).toFixed(3), cw: +R.cw.toFixed(2),
        arms: +(ang('LeftArm') + ang('RightArm')).toFixed(2), bad, yaw: +(R.root.rotation.y - G.player.face).toFixed(2), hipY: +R.hips.position.y.toFixed(2), sp: +Math.hypot(G.player.vx || 0, G.player.vz || 0).toFixed(1) });
    }
    window.__log.push(...out); return out;
  };
});
const run = (n, pin = null, setup = null) => page.evaluate(([n, pin, setup]) => {
  const p = window.__me(), G = window.__fb.G; window.__pin = {};
  if (setup) new Function('p', 'G', setup)(p, G);
  if (pin) { const f = pin.face != null ? pin.face : p.face; if (pin.face != null) window.__pin.face = f; if (pin.fwd != null || pin.side != null) { const fw = pin.fwd || 0, sd = pin.side || 0; window.__pin.vx = fw * Math.sin(f) + sd * Math.cos(f); window.__pin.vz = fw * Math.cos(f) - sd * Math.sin(f); } }
  const out = window.__run(n); window.__pin = {}; return out;
}, [n, pin, setup]);
const seen = (fr, part) => [...new Set(fr.filter(Boolean).map(f => f[part]))];
const has = (fr, part, name) => fr.some(f => f && f[part] === name);
const shot = async name => { if (process.env.SHOTS) await page.screenshot({ path: OUT + name + '.png', timeout: 120000 }).catch(e => console.log('  (no shot: ' + e.message.split('\n')[0] + ')')); }; // (SHOTS=1: pictures in /tmp/f8)

const first = await run(30);
ok('the player captain is on the clip skeleton', first[29] && first[29].up, first[29]);
if (!(first[29] && first[29].up)) { await browser.close(); process.exit(1); }
const info = await page.evaluate(() => { const S = window.__f8.src().cap; return { bones: S.names.length, clips: Object.keys(S.clips), weapon: window.__h().weapon }; });
ok('the captain file: 22 shared bones, 41 clips (30 Mixamo, 11 added by F17)', info.bones === 22 && info.clips.length === 41, info.bones + ' bones, ' + info.clips.length + ' clips');
// the player fights with a sword here (the clips are sword and shield)
await page.evaluate(() => { const p = window.__fb.G.player; if (p.weapon && p.weapon !== 'sword') p.weapon = 'sword'; p.hp = p.max = Math.max(p.max, 500); window.__frame(2); });

console.log('a. each clip plays when its move happens');
let f = await run(40);
ok('standing: idle on legs and body', f.slice(10).every(x => x.up === 'idle' && x.lo === 'idle'), seen(f, 'up'));
await page.keyboard.down('KeyW'); f = await run(60); await shot('run');
ok('W held (the real rules move him): run on legs and body', f.slice(30).every(x => x.lo === 'run' && x.up === 'run'), { clips: seen(f, 'lo'), speed: f[59].sp });
ok('into the run by a blend (two clips shared the legs on the way)', f.some(x => x.sLo > .99 && x.nUp > 1) && f.some(x => x.upW < 1));
await page.keyboard.up('KeyW'); await run(25);
for (const [name, pin, clip] of [['a walk', { fwd: 1.4 }, 'walk'], ['backing off slowly', { fwd: -1.2 }, 'walkBack'], ['backing off fast', { fwd: -4 }, 'runBack'], ['a slow step left', { side: 1.3 }, 'strafeL'], ['a slow step right', { side: -1.3 }, 'strafeR'], ['a fast step left', { side: 4 }, 'strafeRunL'], ['a fast step right', { side: -4 }, 'strafeRunR']]) {
  f = await run(24, pin); ok(`${name} (staged): ${clip}`, f.slice(12).every(x => x.lo === clip && x.up === clip), seen(f, 'lo')); await run(8);
}
await run(20);
f = await run(40, null, 'window.__pin.face = p.face + Math.PI;'); // (the facing snapped right round, held for the scene)
ok('a snap about-face, standing (staged): turn180, his body turned round by the clip\'s end', has(f, 'up', 'turn180') && has(f, 'lo', 'turn180') && Math.abs(Math.abs(f.find(x => x.up === 'turn180').yaw) - Math.PI) < .5 && Math.abs(f[39].yaw) < .05, { yawStart: f.find(x => x.up === 'turn180') && f.find(x => x.up === 'turn180').yaw, yawEnd: f[39].yaw, then: f[39].up });
await run(20);
// the sword's combo, by the real attack button, standing
const combo = [];
for (let k = 0; k < 3; k++) { await page.evaluate(() => { const p = window.__fb.G.player; p.cd = 0; window.__fb.attack(); }); const g = await run(16); combo.push({ k: await page.evaluate(() => window.__fb.G.player.swingKind), up: seen(g, 'up'), lo: seen(g, 'lo') }); if (k === 0) await shot('slash'); }
ok('three presses of attack, standing: slash1, slash2, then the spin finisher (F17), head to toe', ['slash1', 'slash2', 'spin'].every((c, i) => combo[i].up.includes(c) && combo[i].lo.includes(c)), combo.map(c => c.k + ':' + c.up.join('/')));
f = await run(45); ok('and back to idle after the last blow', f[44].up === 'idle' && f[44].lo === 'idle', f[44].up);
f = await run(22, null, 'p.swing = .38; p.swingKind = 3; p.combo = 0;'); ok('a thrust with the sword (staged): attack', has(f, 'up', 'attack'), seen(f, 'up')); await run(30);
f = await run(22, null, 'p.evade = { t: G.T - .5, kind: "back" }; p.swing = .38; p.swingKind = 0;'); ok('a blow straight out of an evade (staged): attackBoost', has(f, 'up', 'attackBoost'), seen(f, 'up')); await run(30);
await page.keyboard.down('ShiftLeft'); f = await run(40); await shot('block');
ok('Shift held: block, then block idle', has(f, 'up', 'block') && f[39].up === 'blockIdle' && f.findIndex(x => x.up === 'block') < f.findIndex(x => x.up === 'blockIdle'), seen(f, 'up'));
f = await run(14, null, 'p.hp -= 6;'); ok('a blow on the shield: blockImpact', has(f, 'up', 'blockImpact'), seen(f, 'up'));
f = await run(20); ok('then block idle again', f[19].up === 'blockIdle', f[19].up);
await page.keyboard.up('ShiftLeft'); await run(25);
f = await run(18, null, 'p.hp -= 6;'); const i1 = seen(f, 'up'); await run(25);
f = await run(18, null, 'p.hp -= 6;'); const i2 = seen(f, 'up'); await run(25);
ok('a light blow taken: an impact clip, the other one the next time', [i1, i2].some(s => s.includes('impact')) && [i1, i2].some(s => s.includes('impact2')), [i1, i2]);
for (const [act, clips, n] of [['kick', ['kick'], 45], ['sheath', ['sheath1', 'sheath2'], 75], ['powerUp', ['powerUp'], 80], ['cast', ['casting'], 100]]) {
  f = await run(n, null, `p.act = { name: '${act}', t: G.T };`); const order = clips.map(c => f.findIndex(x => x.up === c));
  ok(`unit.act '${act}': ${clips.join(', then ')}; once, then back to idle`, order.every((v, i) => v >= 0 && (i === 0 || v > order[i - 1])) && f[n - 1].up === 'idle', seen(f, 'up'));
}
f = await run(50, null, 'G.units = G.units.filter(e => e === p || Math.hypot(e.x - p.x, e.z - p.z) > 30); G.arrows.length = 0; p.act = { name: "crouch", t: G.T, hold: true };'); // (no one near: a blow taken would rightly cut the crouch short) await shot('crouch');
const g2 = await run(40, null, 'p.act = null;');
ok('unit.act \'crouch\', held: crouch, then crouch idle (hips down); let go: crouchUp, then idle', has(f, 'up', 'crouch') && f[49].up === 'crouchIdle' && f[49].lo === 'crouchIdle' && f[49].hipY < -.5 && has(g2, 'up', 'crouchUp') && g2[39].up === 'idle', { down: seen(f, 'up'), hipY: f[49].hipY, up: seen(g2, 'up'), hp: await page.evaluate(() => Math.round(window.__fb.G.player.hp)) });

console.log('b. the upper body attacks while the legs run');
await page.keyboard.down('KeyW'); await run(40);
await page.evaluate(() => { const p = window.__fb.G.player; p.cd = 0; p.combo = 0; window.__fb.attack(); }); f = await run(14); await shot('run-attack');
ok('W held and attack: a slash on the upper body, the run on the legs, the same frames', f.filter(x => /^slash/.test(x.up) && x.lo === 'run').length >= 8, { up: seen(f, 'up'), lo: seen(f, 'lo') });
f = await run(40); ok('then the run again, head to toe', f[39].up === 'run' && f[39].lo === 'run', f[39].up);
await page.keyboard.down('ShiftLeft'); f = await run(30); ok('Shift while moving: the block above, the legs still stepping', f.slice(15).every(x => /^block/.test(x.up) && !/^block|idle/.test(x.lo)), { up: seen(f, 'up'), lo: seen(f, 'lo') });
await page.keyboard.up('ShiftLeft'); await page.keyboard.up('KeyW'); await run(30);

console.log('moves with no clip keep the code pose (blended in over the clips)');
f = await run(14, null, 'p.swing = .38; p.swingKind = 4;'); ok('the spin (the combo\'s finisher): the big third slash, no spin clip yet', has(f, 'up', 'slash3') && Math.max(...f.map(x => x.cw)) < .5, seen(f, 'up')); await run(40);
for (const [name, setup, n] of [['the heavy blow', 'p.swing = .38; p.swingKind = 5;', 14], ['the shield bash', 'p.swing = .38; p.swingKind = 6;', 14], ['the war cry', 'p.rallyT = 1;', 20]]) {
  f = await run(n, null, setup); const peak = Math.max(...f.map(x => x.cw)); const g = await run(40);
  ok(`${name}: code pose in, then out`, peak > .85 && g[39].cw === 0, { peak, after: g[39].cw });
}
await page.evaluate(() => { window.__fb.weapon('spear'); window.__frame(3); });
f = await run(14, null, 'p.swing = .38; p.swingKind = 0;'); const spear = await page.evaluate(() => window.__h().weapon);
ok('a spear in his hand: its thrust is the code pose, his standing and moving the clips', spear === 'spear' && Math.max(...f.map(x => x && x.cw || 0)) > .85, { weapon: spear, peak: Math.max(...f.map(x => x && x.cw || 0)) });
await run(30); await page.evaluate(() => { window.__fb.weapon('sword'); window.__frame(3); }); await run(10);

console.log('a. death');
f = await run(80, null, 'window.__fb.die(p, null, p.face + Math.PI, 0);'); await shot('death');
const dead = f.filter(Boolean);
ok('cut down where he stands: a death clip head to toe, down on the ground', dead.length > 40 && /^death/.test(dead[dead.length - 1].up) && /^death/.test(dead[dead.length - 1].lo) && dead[dead.length - 1].hipY < -.7, dead.length ? { clip: dead[dead.length - 1].up, hipY: dead[dead.length - 1].hipY, frames: dead.length } : 'not drawn');

const all = await page.evaluate(() => window.__log.filter(Boolean));
const clipF = all.filter(x => x.cw < .5), tp = Math.min(...clipF.map(x => x.arms)), tpCode = Math.min(...all.filter(x => x.cw >= .5).map(x => x.arms)), sums = all.filter(x => Math.abs(x.sUp - 1) > .01 || Math.abs(x.sLo - 1) > .01).length;
const tpAt = clipF.find(x => x.arms === tp); console.log('  (code-pose frames, moves with no clip: arms at least ' + tpCode.toFixed(2) + ' rad from the T-pose)');
ok(`never a T-pose frame on the clips (${clipF.length} frames: the arms are always turned from the T-pose)`, tp > .3, { least: tp, up: tpAt.up, lo: tpAt.lo, cw: tpAt.cw });
ok('the clips on the legs and on the body always add up to the whole (no part left to the T-pose)', sums === 0, sums + ' frames off');
ok('no broken bone in any frame', !all.some(x => x.bad));

console.log('c. the soldier\'s body and clips on the same skeleton');
const sold = await page.evaluate(async () => {
  const X = window.__f8, S = await window.__soldierBody(), cap = X.src().cap, out = { bones: S.names.length, same: S.names.join() === cap.names.join(), clips: Object.keys(S.clips).length, sameClips: Object.keys(S.clips).join() === Object.keys(cap.clips).join(), bad: [], tpose: [] };
  for (const [from, C] of [['soldier', S.clips], ['captain', cap.clips]]) {
    const SS = { ...S, clips: C }, R = X.rigClip(SS, { team: 0xe0352b });
    for (const name of Object.keys(C)) for (const t of [0, .5, 1]) {
      for (const part of ['lo', 'up']) X.play(R, part, name, name + t + part, { fade: 0, at: C[name].dur * t * .98 });
      X.tick(R, 0, { code: false }); R.root.updateMatrixWorld(true);
      for (const b of R.list) for (const v of b.matrixWorld.elements) if (!isFinite(v)) out.bad.push(from + ':' + name);
      const ang = n => { const b = R.mx[n]; return b.quaternion.angleTo(R.rest[R.list.indexOf(b)].q); }; if (ang('LeftArm') + ang('RightArm') < .3) out.tpose.push(from + ':' + name + '@' + t);
    }
  }
  // the soldier stands as he was modelled when the skeleton is put back in the pose he was bound in: his feet on the ground under the clips
  const R = X.rigClip(S, {}); for (const part of ['lo', 'up']) X.play(R, part, 'idle', 'i' + part, { fade: 0 }); X.tick(R, 0, { code: false }); R.root.updateMatrixWorld(true);
  const v = new X.THREE.Vector3(); out.footY = +Math.min(R.mx.LeftToeBase.getWorldPosition(v).y, R.mx.RightToeBase.getWorldPosition(v).y).toFixed(2); out.headY = +R.mx.Head.getWorldPosition(v).y.toFixed(2);
  return out;
});
ok('the soldier file loads: the same 22 bones, the same 30 clips by name', sold.same && sold.bones === 22 && sold.clips === 30 && sold.sameClips, sold.bones + ' bones, ' + sold.clips + ' clips');
ok('every soldier clip and every captain clip plays on the soldier\'s body: no broken bone, no T-pose', !sold.bad.length && !sold.tpose.length, { bad: sold.bad.slice(0, 4), tpose: sold.tpose.slice(0, 4) });
ok('the soldier stands on the ground in his idle (toes near y = -1, head up)', sold.footY < -.85 && sold.footY > -1.1 && sold.headY > .1, { footY: sold.footY, headY: sold.headY });
ok('no page or shader errors', !errors.length, errors.slice(0, 3));
await page.close();

if (process.env.PERF !== '0') {
  console.log('e. frame cost on Low at a Crown start');
  // (the same build with the code-posed captain (?clips=0) against the clip captain: the same match frame by frame. A
  // build from before F8 isn't comparable: the seeded random also names every loaded object, so its match plays out differently)
  const old = await perf(browser, '&clips=0'), now = await perf(browser), pc = (a, b) => (a >= b ? '+' : '') + ((a - b) / b * 100).toFixed(1) + '%';
  console.log(`  draw calls: code captain ${old.calls}, clip captain ${now.calls} (${pc(now.calls, old.calls)})   triangles: ${old.tris}, ${now.tris} (${pc(now.tris, old.tris)})   (before F8, another match: ${BASE.calls}, ${BASE.tris})`);
  ok('draw calls and triangles on Low do not rise', now.level === 'low' && now.calls <= old.calls && now.tris <= old.tris * 1.005, now); // (triangles: within 0.5%, the pose changes what is culled)
}
await browser.close();
const failed = res.filter(r => !r.pass);
console.log(`\n${res.length - failed.length}/${res.length} passed` + (failed.length ? '  FAILED: ' + failed.map(r => r.name).join(' | ') : ''));
process.exit(failed.length ? 1 : 0);
