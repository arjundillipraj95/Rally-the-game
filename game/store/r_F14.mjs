// F14 Adapts to any phone: the rule fed scripted windows, the first guess fed chips and screens, the memory
// per phone and the fixed choices (pure; no browser). Usage: node store/r_F14.mjs
const store = {};
globalThis.localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
globalThis.matchMedia = () => ({ matches: true }); globalThis.document = { createElement: () => ({ getContext: () => null }) };
const Q = (await import('../src/config.js')).QUALITY;
const { adaptStep, adaptState, guessRung, resOnly, quality, LEVELS } = await import('../src/render/quality.js');
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
const R = Q.rungs, LAST = R.length - 1;
// one window of w.dur s (clock moves on), returns the change
const win = (st, fps, { calm = true, capped = false, dur = Q.win } = {}) => { st.t += dur; return adaptStep(st, { fps, dur, capped, calm }, Q); };
const probe = (st, fps, o = {}) => win(st, fps, { ...o, dur: Q.probe });

// 1. the ladder follows Arjun's order: resolution, shadows, clouds and far scenery, distant soldiers, then resolution
const what = (a, b) => ['pr', 'sh', 'far', 'near', 'ol'].filter(k => R[a][k] !== R[b][k]).join('+');
const seq = []; for (let i = 0; i < LAST; i++) seq.push(what(i, i + 1));
ok(seq.join(' > ') === 'pr > pr > sh > sh > far > near+ol > pr > pr', 'ladder order: ' + seq.join(' > '));
ok(R.every((r, i) => !i || r.pr <= R[i - 1].pr), 'resolution never rises on the way down');

// 2. a slow phone (40 ms frames, 25 fps), calm: the probe jumps, then one rung per decision, in order, to the floor
let s = adaptState(1);
ok(probe(s, 25) === 'down' && s.rung === 1 + Math.ceil((Q.down - 25) / Q.probeStep), `probe at 25 fps: rung 1 -> ${s.rung}`);
let path = [s.rung], guard = 0;
while (s.rung < LAST && guard++ < 100) { const r0 = s.rung; win(s, 25); if (s.rung !== r0) path.push(s.rung); }
ok(path.every((r, i) => !i || r === path[i - 1] + 1), 'then one rung at a time: ' + path.join(','));
win(s, 25); win(s, 25); win(s, 25); win(s, 25);
ok(s.rung === LAST, 'stops at the floor');
let gaps = true; { const st = adaptState(0); st.probed = true; let lastT = -99; for (let i = 0; i < 40; i++) { const r0 = st.rung; win(st, 20); if (st.rung !== r0) { if (st.t - lastT < Q.cool) gaps = false; lastT = st.t; } } }
ok(gaps, `never two changes within ${Q.cool} s`);

// 3. a smooth phone stays put at the top; a smooth phone lower down climbs back after upAfter s
s = adaptState(0); probe(s, 60); for (let i = 0; i < 30; i++) win(s, 60); ok(s.rung === 0, 'smooth at the top: stays');
s = adaptState(3); ok(probe(s, 60) === 'up' && s.rung === 2, 'probe at 60 fps, calm: one up (3 -> 2)');
const tUp = s.t; while (s.rung === 2 && s.t - tUp < 200) win(s, 60);
ok(s.rung === 1 && s.t - tUp >= Q.upAfter, `then up again after ${Q.upAfter}+ s smooth (${(s.t - tUp).toFixed(0)} s)`);
s = adaptState(4); s.probed = true; s.t = 100; for (let i = 0; i < 20; i++) win(s, 50); ok(s.rung === 4, 'middling 50 fps: holds');

// 4. mid-fight: only resolution moves; a visible step waits for calm, the resolution held lower meanwhile
s = adaptState(1); s.probed = true; s.t = 100;
ok(win(s, 25, { calm: false }) === 'down' && s.rung === 2 && s.scale === 1, 'fighting at rung 1: resolution step to 2');
s.t += Q.cool;
let ch = win(s, 25, { calm: false });
ok(ch === 'scale' && s.rung === 2 && s.scale === Q.fightScale && s.want === 3, 'fighting at rung 2 (next is shadows): waits, resolution x' + Q.fightScale);
ok(win(s, 25, { calm: false }) === null && s.rung === 2, 'still fighting: still waiting');
ok(win(s, 25, { calm: true }) === 'down' && s.rung === 3 && s.scale === 1, 'calm: the shadows step lands, resolution back');
ok(!resOnly(2, 3) && resOnly(0, 1) && resOnly(6, 7), 'which steps show (shadows) and which are resolution only');

// 5. climbing a visible step waits for calm too; a rung it fell from is banned for a while
s = adaptState(3); s.probed = true; s.t = 100;
for (let i = 0; i < 12; i++) win(s, 60, { calm: false });
ok(s.rung === 3, 'smooth but fighting: no visible climb');
ok(win(s, 60) === 'up' && s.rung === 2, 'calm: climbs');
s = adaptState(2); s.probed = true; s.t = 100; win(s, 25); ok(s.rung === 3, 'fell 2 -> 3');
const tF = s.t; while (s.t - tF < Q.ban - Q.win) win(s, 60);
ok(s.rung === 3, `no climb back to 2 within ${Q.ban} s`);
while (s.t - tF < Q.ban + 30 && s.rung === 3) win(s, 60);
ok(s.rung === 2, 'after the ban: back to 2');

// 6. a phone the browser holds at 30 fps (iPhone Low Power Mode) is left alone; stalls are the watchdog's (r_F14b)
s = adaptState(1); probe(s, 30, { capped: true }); for (let i = 0; i < 20; i++) win(s, 30, { capped: true }); ok(s.rung === 1, 'held at 30 by the browser: no change');

// 7. the first guess
const G = (gpu, o = {}) => guessRung({ gpu, touch: true, mem: 8, cores: 8, px: 2.5e6, ...o });
const cases = [
  ['desktop', G('ANGLE (NVIDIA GeForce RTX 3060)', { touch: false }), Q.guess.desktop],
  ['iPhone (Apple GPU)', G('Apple GPU', { ua: 'iPhone', mem: 4 }), Q.guess.apple],
  ['Galaxy S23 (Adreno 740)', G('Adreno (TM) 740'), Q.guess.strong],
  ['Mali-G710', G('Mali-G710'), Q.guess.strong],
  ['Adreno 618', G('Adreno (TM) 618'), Q.guess.mid],
  ['Mali-G52', G('Mali-G52'), Q.guess.weak],
  ['Adreno 530', G('Adreno (TM) 530'), Q.guess.weak],
  ['SwiftShader', G('Google SwiftShader'), Q.guess.weak],
  ['chip hidden, 8 GB', G(''), Q.guess.unknown],
  ['chip hidden, 3 GB 4 cores', G('', { mem: 3, cores: 4 }), Q.guess.weak],
  ['2 GB phone', G('Adreno (TM) 740', { mem: 2 }), Q.guess.weak],
  ['tablet screen (Adreno 740)', G('Adreno (TM) 740', { px: 5e6 }), Q.guess.strong + 1],
];
for (const [n, got, want] of cases) ok(got === want, `guess ${n}: rung ${got} (want ${want})`);

// 8. remembered per phone; a fixed choice never adapts; no setting = Auto
ok(quality.setting === 'auto' && quality.rung === quality.guess, 'no setting: Auto, starts at the guess');
store['rally-quality-auto2'] = JSON.stringify({ k: quality.key, r: 6 });
let q2 = (await import('../src/render/quality.js?kept')).quality;
ok(q2.rung === 6 && q2.level === R[6].lv, 'same phone: the next battle starts at the kept rung (6)');
store['rally-quality-auto2'] = JSON.stringify({ k: 'another phone', r: 6 });
q2 = (await import('../src/render/quality.js?other')).quality;
ok(q2.rung === q2.guess, 'another phone: starts from the guess');
store['rally-quality'] = 'medium';
q2 = (await import('../src/render/quality.js?fixed')).quality;
ok(q2.rung === -1 && q2.level === 'medium' && q2.cfg.shadows === LEVELS.medium.shadows && q2.cfg.pixelRatio === LEVELS.medium.pixelRatio, 'Medium chosen: fixed, no rung');

console.log(`r_F14: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
