// F6 + F5 "Done when": hit feel and the death sequence, in a real online battle on the host (Arjun) AND on a
// joined phone (Ravi). Needs the three servers (bash game/store/servers.sh).
//   1 a clash, a block and a captain cutting a soldier down each set off their effects on both phones
//     (hit-stop, push, effect spawned, sound called), once with the host's captain in it and once with the joiner's
//   2 your captain's death: grey screen, the right killer's name, a countdown, and a respawn where the camera
//     never moves more than 2 m in a frame that is on screen (the move home is a cut under full black)
//   3 no soldier is ever taken out of the battle while still standing or in the air
//   4 frame cost on Low at a Crown start: draw calls and triangles within 5% of before F6 (r_F6perf.mjs)
// The scenes are staged on the host by placing real units and starting real blows (unit.pending, as the rules'
// startSwing does); everything after that is the game's own rules, network and presentation.
// 3D drawing is off for the scenes (two headless phones can't draw fast enough to run at phone speed) and on for
// one pass at the end, which checks the new shader draws without errors and saves pictures to /tmp/f6/.
// Usage: node store/r_F6.mjs     (PERF=0 skips the frame-cost part)
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { perf } from './r_F6perf.mjs';
const BASE = { calls: 1218, tris: 547972 }; // (roles at 953c842, before F6: node store/r_F6perf.mjs, twice, same numbers)
const OUT = '/tmp/f6/'; mkdirSync(OUT, { recursive: true });
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [], errors = [];
for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick);
    window.__buzz = []; navigator.vibrate = ms => { window.__buzz.push(ms); return true; }; }, nick); // (a headless browser has no motor: count the pulses asked for)
  const p = await ctx.newPage();
  p.on('pageerror', e => { errors.push(nick + ': ' + e.message); console.log(nick, 'ERR', e.message); });
  p.on('console', m => { const t = m.text(); if (m.type() === 'error' || /shader|WebGLProgram|faultNote/i.test(t)) { if (!/GPU stall|net::|Failed to load resource|WebSocket/i.test(t)) { errors.push(nick + ': ' + t.slice(0, 200)); console.log(nick, 'CONSOLE', t.slice(0, 200)); } } });
  pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1');
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
const res = [];
const ok = (name, pass, detail = '') => { res.push({ name, pass: !!pass }); console.log((pass ? '  ok   ' : '  FAIL ') + name + (detail !== '' ? '  [' + (typeof detail === 'string' ? detail : JSON.stringify(detail)) + ']' : '')); };

// ---------- two phones in one battle (as store/crown2online.mjs) ----------
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
console.log('waiting for the host\'s battle to start...');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(2000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'client' && window.__fb.G.player, null, { timeout: 60000 });
for (const p of [A, B]) await p.evaluate(() => { window.__noRender = 1; });
await sleep(1500);

// ---------- watchers, on both phones: every frame ----------
for (const p of [A, B]) await p.evaluate(() => {
  const F = window.__fb, W = window.__w = { rec: false, maxVis: 0, maxAll: 0, blackMax: 0, last: null, removed: 0, bad: [], minDeadT: 99, prev: new Set(), frames: 0, nums: [] };
  const black = document.getElementById('blackout');
  const tick = () => {
    const G = F.G, c = F.camera.position; W.frames++;
    if (F.death.on) { const n = document.getElementById('dNum').textContent; if (W.nums[W.nums.length - 1] !== n) W.nums.push(n); } // (the countdown, as shown)
    if (W.rec) {
      const o = +getComputedStyle(black).opacity; W.blackMax = Math.max(W.blackMax, o);
      if (W.last) { const d = Math.hypot(c.x - W.last[0], c.y - W.last[1], c.z - W.last[2]); W.maxAll = Math.max(W.maxAll, d); if (o < .99) W.maxVis = Math.max(W.maxVis, d); }
      W.last = [c.x, c.y, c.z];
    } else W.last = null;
    // a unit that was in the battle last frame and isn't now: was he down, and had he lain there?
    if (G.state === 'play') {
      const now = new Set(G.units);
      for (const u of W.prev) if (!now.has(u)) { W.removed++; W.minDeadT = Math.min(W.minDeadT, u.deadT || 0); if (!u.dead || !(u.deadT > 2) || Math.abs(u.vy || 0) > 2) W.bad.push({ id: u.id, kind: u.kind, dead: !!u.dead, deadT: +(u.deadT || 0).toFixed(2), vy: +(u.vy || 0).toFixed(1) }); }
      W.prev = now;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

// ---------- the stage: 28 m out of the host's home toward the middle (flat, outside the safe ground) ----------
const setup = await A.evaluate(() => {
  const F = window.__fb, G = F.G, P = G.player;
  G.T = Math.max(G.T, 20); // (past the break-out: blows count)
  const d = Math.hypot(P.x, P.z), ux = -P.x / d, uz = -P.z / d, S = { x: P.x + ux * 28, z: P.z + uz * 28, ux, uz };
  const st = window.__st = { S };
  st.foe = () => G.teams.map(s => s.leader).filter(L => L && !L.dead && !L.human && G.ALLY[L.ti % 4] !== G.ALLY[G.myTi % 4]).sort((a, b) => Math.hypot(a.x - P.x, a.z - P.z) - Math.hypot(b.x - P.x, b.z - P.z))[0];
  st.place = (u, x, z, face) => { u.x = x; u.z = z; u.vx = u.vz = 0; u.face = face; u.stun = 0; u.cd = 0; u.shieldT = 0; u.pending = null; u.swing = 0; u.guardT = 0; u.guardCd = 9; u.blockT = 0; u.iframeT = 0; u.windup = 0; u.hp = u.max; if (u.leader) u.st = 100; };
  st.swing = (u, tg, t) => { u.pending = { t, target: tg }; u.swing = .38; u.lastSwingT = G.T; }; // (as the rules' startSwing)
  st.front = (u, r) => [u.x + Math.sin(u.face) * r, u.z + Math.cos(u.face) * r];
  st.peer = () => G.teams.map(s => s.leader).find(L => L && L.remote && !L.dead);
  st.E = st.foe();
  // the foe's men would wander over and join in: they fall here (and are watched: a proper fall, then taken away)
  let n = 0; for (const u of G.units) if (!u.dead && !u.leader && u.ti === st.E.ti) { u.shieldT = 0; F.die(u, null, Math.random() * 6.28); n++; }
  return { S, myTi: G.myTi, al: G.ALLY.join(''), foeTi: st.E.ti, foeName: F.nick(st.E.ti), foeMenFelled: n, peerTi: st.peer() && st.peer().ti, T: +G.T.toFixed(1) };
});
console.log('stage', JSON.stringify(setup));
// both armies hold at home; both captains walk on stage (the joiner's phone owns its captain's place)
await A.evaluate(() => { const F = window.__fb, G = F.G, S = window.__st.S, P = G.player; F.order('hold', { x: P.x, z: P.z, face: P.face }); window.__st.place(P, S.x, S.z, Math.atan2(S.ux, S.uz)); });
await B.evaluate(S => { const F = window.__fb, G = F.G, P = G.player; F.order('hold', { x: P.x, z: P.z, face: P.face }); P.x = S.x + S.uz * 5; P.z = S.z - S.ux * 5; P.vx = P.vz = 0; P.face = Math.atan2(S.ux, S.uz); }, setup.S);
await sleep(1500);
// (a joiner takes over a computer captain, who may be on his horse: down he gets, the clash and block are on foot)
if (await A.evaluate(() => !!window.__st.peer().mounted)) { await B.evaluate(() => window.__fb.ride()); await sleep(1200); }
ok('the joiner\'s captain is on foot on the host', await A.evaluate(() => !window.__st.peer().mounted));
await sleep(3000); // (the home shield wears off 3 s after stepping out)
const stat = p => p.evaluate(() => { const F = window.__fb; return { ...F.feel, hs: F.hitstop(), bz: window.__buzz.length }; });
const delta = (a, b) => { const o = {}; for (const k of ['clash', 'block', 'cut', 'stop', 'flash', 'sound', 'kick', 'buzz', 'hs', 'bz']) o[k] = b[k] - a[k]; return o; };
const posOf = (p, id) => p.evaluate(id => { const u = window.__fb.G.units.find(x => x.id === id); return u ? { x: u.x, z: u.z, dead: !!u.dead, deadT: u.deadT } : null; }, id);
const dist = (a, b) => a && b ? Math.hypot(a.x - b.x, a.z - b.z) : -1;
const park = () => A.evaluate(() => { const E = window.__st.E; E.stun = 40; E.pending = null; E.hp = E.max; }); // (the enemy captain stands dazed between scenes)
// the joiner's captain: alive, on foot, on stage and out of the home shield
async function bringJoiner() {
  await B.waitForFunction(() => window.__fb.G.player && !window.__fb.G.player.dead, null, { timeout: 20000 });
  const far = await B.evaluate(S => { const P = window.__fb.G.player, x = S.x + S.uz * 5, z = S.z - S.ux * 5; if (Math.hypot(P.x - x, P.z - z) < 4) return false; P.x = x; P.z = z; P.vx = P.vz = 0; P.face = Math.atan2(S.ux, S.uz); return true; }, setup.S);
  if (far) await sleep(4500);
  await A.evaluate(() => { const L = window.__st.peer(); if (L) { L.hp = L.max; L.shieldT = 0; } });
}

// one staged moment: stage(host) -> {ids to follow}; then both phones' counters and where the two men went
async function moment(label, stage, arg) {
  const a0 = await stat(A), b0 = await stat(B);
  const ids = await A.evaluate(stage, arg);
  const pa0 = await posOf(A, ids.u), pb0 = await posOf(A, ids.a);
  await sleep(450);
  const early = dist(await posOf(A, ids.u), await posOf(A, ids.a)), earlyB = dist(await posOf(B, ids.u), await posOf(B, ids.a)); // (half a second on: the push, before anyone steps back in)
  await sleep(850);
  const a1 = await stat(A), b1 = await stat(B);
  const out = { ids, early, earlyB, dA: delta(a0, a1), dB: delta(b0, b1), hostBefore: dist(pa0, pb0), hostAfter: dist(await posOf(A, ids.u), await posOf(A, ids.a)), joinAfter: dist(await posOf(B, ids.u), await posOf(B, ids.a)), u0: pa0, a0: pb0, uA: await posOf(A, ids.u), uB: await posOf(B, ids.u) };
  console.log(label, JSON.stringify({ host: out.dA, joined: out.dB, apartBefore: +out.hostBefore.toFixed(2), apartHalfSecond: +early.toFixed(2), apartAfterHost: +out.hostAfter.toFixed(2), apartAfterJoined: +out.joinAfter.toFixed(2) }));
  await park();
  return out;
}
const fx = d => d.stop >= 1 && d.flash >= 1 && d.sound >= 1;

// ---------- 1a. a clash: the host's captain and an enemy captain swing into each other ----------
console.log('\n1. hit feel');
{
  const m = await moment('clash (host\'s captain)', () => { const st = window.__st, G = window.__fb.G, P = G.player, E = st.E; st.place(P, st.S.x, st.S.z, Math.atan2(st.S.ux, st.S.uz)); const [x, z] = st.front(P, 1.9); st.place(E, x, z, P.face + Math.PI); st.swing(E, P, .1); st.swing(P, E, .14); return { u: P.id, a: E.id }; });
  ok('clash on the host: played, with hit-stop, flash and sound', m.dA.clash >= 1 && fx(m.dA), m.dA);
  ok('clash on the host is its own captain\'s: screen hit-stop, camera kick, vibration', m.dA.hs >= 1 && m.dA.kick >= 1 && m.dA.bz >= 1, { hs: m.dA.hs, kick: m.dA.kick, bz: m.dA.bz });
  ok('clash on the joined phone: played, with hit-stop, flash and sound', m.dB.clash >= 1 && fx(m.dB), m.dB);
  ok('clash: both pushed back a step, not thrown (host)', m.early - m.hostBefore >= .8 && m.early - m.hostBefore <= 3.2, `${m.hostBefore.toFixed(2)} -> ${m.early.toFixed(2)} m apart half a second on`);
  ok('clash: both pushed back a step (as the joined phone shows it)', Math.max(m.earlyB, m.joinAfter) - m.hostBefore >= .5, `${m.earlyB.toFixed(2)} m apart half a second on, ${m.joinAfter.toFixed(2)} m after a second`);
}
// ---------- 1b. a clash with the joiner's captain in it ----------
{
  await bringJoiner();
  const me0 = await B.evaluate(() => { const p = window.__fb.G.player; return { x: p.x, z: p.z }; });
  const m = await moment('clash (joiner\'s captain)', () => { const st = window.__st, E = st.E, L = st.peer(); L.hp = L.max; L.shieldT = 0; L.stun = 0; L.cd = 0; const [x, z] = st.front(L, 1.9); st.place(E, x, z, L.face + Math.PI); st.swing(E, L, .1); st.swing(L, E, .14); return { u: L.id, a: E.id }; });
  const me1 = await B.evaluate(() => { const p = window.__fb.G.player; return { x: p.x, z: p.z }; });
  ok('clash with the joiner\'s captain: played on his phone as his own (screen hit-stop, kick, vibration)', m.dB.clash >= 1 && fx(m.dB) && m.dB.hs >= 1 && m.dB.kick >= 1 && m.dB.bz >= 1, m.dB);
  ok('clash with the joiner\'s captain: he is pushed back on his own phone', dist(me0, me1) >= .4, `${dist(me0, me1).toFixed(2)} m`);
  ok('clash with the joiner\'s captain: played on the host too', m.dA.clash >= 1 && fx(m.dA), m.dA);
}
// ---------- 2a. a block: the host's captain strikes a raised shield ----------
const soldier = `(hp, guard, of) => { const st = window.__st, F = window.__fb, [x, z] = st.front(of, 1.7); const s = F.mkUnit(st.E.ti, x, z, 'foot'); s.face = of.face + Math.PI; s.shieldT = 0; s.guardUp = guard; s.gT = 4; s.stun = 0; if (hp) s.hp = hp; return s; }`;
await A.evaluate(src => { window.__st.soldier = eval(src); }, soldier);
{
  const ids = await A.evaluate(() => { const st = window.__st, P = window.__fb.G.player; st.place(P, st.S.x, st.S.z, Math.atan2(st.S.ux, st.S.uz)); const s = st.soldier(0, true, P); st.tmp = s; return s.id; });
  await sleep(700); // (the new man reaches the joined phone)
  const m = await moment('block (host\'s captain strikes)', () => { const st = window.__st, P = window.__fb.G.player, s = st.tmp; s.guardUp = true; s.gT = 4; s.face = Math.atan2(P.x - s.x, P.z - s.z); P.cd = 0; P.stun = 0; st.swing(P, s, .1); return { u: s.id, a: P.id }; });
  ok('block on the host: played, with hit-stop, shield flash and sound', m.dA.block >= 1 && fx(m.dA), m.dA);
  ok('block on the host: the attacker feels it (vibration)', m.dA.bz >= 1, { bz: m.dA.bz });
  ok('block on the joined phone: played, with hit-stop, shield flash and sound', m.dB.block >= 1 && fx(m.dB), m.dB);
  ok('block: the defender slides back a little', m.early - m.hostBefore >= .1, `${m.hostBefore.toFixed(2)} -> ${m.early.toFixed(2)} m apart half a second on`);
  await A.evaluate(id => { const F = window.__fb, u = F.G.units.find(x => x.id === id); if (u && !u.dead) F.die(u, null, 0); }, ids);
}
// ---------- 2b. a block with the joiner's captain defending (he holds Block) ----------
{
  await bringJoiner();
  await B.keyboard.down('ShiftLeft'); await sleep(900); // (past the parry window: this is a plain block)
  const blk = await A.evaluate(() => { const L = window.__st.peer(); L.hp = L.max; L.st = 100; L.stun = 0; const s = window.__st.soldier(0, false, L); s.dmg = 1; window.__st.tmp = s; return { blocking: !!L.blocking, id: s.id }; });
  await sleep(500);
  const m = await moment('block (joiner\'s captain defends)', () => { const st = window.__st, L = st.peer(), s = st.tmp; const [x, z] = st.front(L, 1.7); s.x = x; s.z = z; s.face = L.face + Math.PI; s.cd = 0; s.stun = 0; st.swing(s, L, .08); return { u: L.id, a: s.id }; });
  await B.keyboard.up('ShiftLeft');
  ok('the joiner\'s Block reached the host', blk.blocking);
  ok('block by the joiner\'s captain: played on his phone as his own (hit-stop, flash, sound, kick, vibration)', m.dB.block >= 1 && fx(m.dB) && m.dB.kick >= 1 && m.dB.bz >= 1, m.dB);
  ok('block by the joiner\'s captain: played on the host too', m.dA.block >= 1 && fx(m.dA), m.dA);
  await A.evaluate(id => { const F = window.__fb, u = F.G.units.find(x => x.id === id); if (u && !u.dead) F.die(u, null, 0); }, blk.id);
}
// ---------- 3a. the host's captain cuts a soldier down ----------
{
  await A.evaluate(() => { const st = window.__st, P = window.__fb.G.player; st.place(P, st.S.x, st.S.z, Math.atan2(st.S.ux, st.S.uz)); st.tmp = st.soldier(1, false, P); });
  await sleep(700);
  const m = await moment('cut (host\'s captain)', () => { const st = window.__st, P = window.__fb.G.player, s = st.tmp; s.guardUp = false; s.gT = 4; s.hp = 1; P.cd = 0; st.swing(P, s, .1); return { u: s.id, a: P.id }; });
  const away = (u, u0, a0) => u && u0 ? ((u.x - u0.x) * (u0.x - a0.x) + (u.z - u0.z) * (u0.z - a0.z)) / (dist(u0, a0) || 1) : -9;
  ok('cut on the host: played, with hit-stop, stars and sound, and as his own (kick, vibration)', m.dA.cut >= 1 && fx(m.dA) && m.dA.hs >= 1 && m.dA.kick >= 1 && m.dA.bz >= 1, m.dA);
  ok('cut on the joined phone: played, with hit-stop, stars and sound', m.dB.cut >= 1 && fx(m.dB), m.dB);
  ok('cut: the soldier is down, still there, and was knocked back away from the blade (host)', m.uA && m.uA.dead && away(m.uA, m.u0, m.a0) >= 1, m.uA && `dead ${m.uA.dead}, ${away(m.uA, m.u0, m.a0).toFixed(2)} m back`);
  ok('cut: the same on the joined phone (down, still there, knocked back the same way)', m.uB && m.uB.dead && away(m.uB, m.u0, m.a0) >= .5, m.uB && `dead ${m.uB.dead}, ${away(m.uB, m.u0, m.a0).toFixed(2)} m back`);
}
// ---------- 3b. the joiner's captain cuts a soldier down ----------
{
  await bringJoiner();
  await A.evaluate(() => { const st = window.__st, L = st.peer(); L.hp = L.max; st.tmp = st.soldier(1, false, L); });
  await sleep(700);
  const m = await moment('cut (joiner\'s captain)', () => { const st = window.__st, L = st.peer(), s = st.tmp; const [x, z] = st.front(L, 1.7); s.x = x; s.z = z; s.guardUp = false; s.gT = 4; s.hp = 1; L.cd = 0; L.stun = 0; st.swing(L, s, .1); return { u: s.id, a: L.id }; });
  ok('cut by the joiner\'s captain: played on his phone as his own (hit-stop, stars, sound, kick, vibration)', m.dB.cut >= 1 && fx(m.dB) && m.dB.hs >= 1 && m.dB.kick >= 1 && m.dB.bz >= 1, m.dB);
  ok('cut by the joiner\'s captain: played on the host too', m.dA.cut >= 1 && fx(m.dA), m.dA);
}

// ---------- 4. your captain's death, on the host and then on the joined phone ----------
async function death(label, P, other, stageKill) {
  console.log('\n' + label);
  await P.evaluate(() => { const W = window.__w; W.rec = true; W.maxVis = W.maxAll = W.blackMax = 0; W.last = null; W.nums = []; });
  const order0 = await P.evaluate(() => window.__fb.G.teams[window.__fb.G.myTi].order);
  const k = await A.evaluate(stageKill), tKill = Date.now();
  await sleep(1300);
  const card = await P.evaluate(() => { const $ = id => document.getElementById(id), F = window.__fb, G = F.G, b = $('dName').querySelector('b'), c = F.camera.position, body = F.death.body;
    return { grey: document.body.classList.contains('dead'), low: document.body.classList.contains('deadLow'), veil: getComputedStyle(document.querySelector('#deathFx .dVig')).backgroundImage.slice(0, 60), filter: getComputedStyle($('gl')).filter,
      shown: !$('deathFx').hidden && +getComputedStyle($('deathFx')).opacity > .5, by: $('dBy').textContent, name: b ? b.textContent : $('dName').textContent, colour: b ? b.style.color : '', how: $('dHow').textContent, num: $('dNum').textContent, wait: $('dWait').textContent,
      on: F.death.on, playerDead: !G.player || G.player.dead, camToBody: body ? +Math.hypot(c.x - body.x, c.z - body.z).toFixed(1) : -1, bodyDead: body && body.dead }; });
  console.log('  card', JSON.stringify(card));
  const feed = await other.evaluate(() => document.getElementById('feed').textContent);
  if (process.env.SHOTS !== '0') { await P.evaluate(() => { window.__noRender = 0; }); await sleep(600); await P.screenshot({ path: OUT + (P === A ? 'death_host.png' : 'death_joined.png') }); await P.evaluate(() => { window.__noRender = 1; }); }
  ok('he is down and the sequence is running', card.on && card.playerDead && card.bodyDead);
  ok('the screen is grey (Low graphics: a grey veil; otherwise the picture is filtered)', card.grey && card.shown && (card.low ? /rgba\(70, 70, 76/.test(card.veil) : /grayscale/.test(card.filter)), { low: card.low, veil: card.veil, filter: card.filter });
  ok(`the card names the right killer: "${k.name}"`, card.name === k.name && !!card.colour, `"${card.by} ${card.name}" ${card.how} (${card.colour})`);
  ok('the camera stays with the fallen captain', card.camToBody >= 0 && card.camToBody < 25, card.camToBody + ' m');
  const t0 = Date.now(); let back = false;
  while (Date.now() - t0 < 15000) { const s = await P.evaluate(() => ({ alive: !!(window.__fb.G.player && !window.__fb.G.player.dead), on: window.__fb.death.on })); if (s.alive && !s.on) { back = true; break; } await sleep(120); }
  const seq = (await P.evaluate(() => window.__w.nums)).map(Number);
  ok('a countdown runs, one second at a time', seq.length >= 4 && seq.every((v, i) => !i || v === seq[i - 1] - 1) && seq[seq.length - 1] === 1, seq.join(' '));
  ok('he respawns', back, ((Date.now() - tKill) / 1000).toFixed(1) + ' s after falling');
  await sleep(1800);
  const end = await P.evaluate(() => { const W = window.__w, $ = id => document.getElementById(id), F = window.__fb, G = F.G; W.rec = false;
    return { maxVis: +W.maxVis.toFixed(2), maxAll: +W.maxAll.toFixed(1), blackMax: W.blackMax, black: +getComputedStyle($('blackout')).opacity, grey: document.body.classList.contains('dead'), card: !$('deathFx').hidden, order: G.teams[G.myTi].order, men: G.units.filter(u => !u.dead && !u.leader && u.ti === G.myTi).length }; });
  console.log('  respawn', JSON.stringify(end));
  ok('the camera never moves more than 2 m in a frame that is on screen', end.maxVis <= 2, `${end.maxVis} m at most in view; the move home was ${end.maxAll} m, in one frame, under full black`);
  ok('the move home is hidden: the screen went fully black, and came back', end.blackMax >= .99 && end.black < .05 && end.maxAll > 2, { blackMax: end.blackMax, blackNow: end.black });
  ok('grey and the card are gone once he is back', !end.grey && !end.card);
  ok('his men carried on with their order', end.order === order0 && end.men > 0, `${order0} -> ${end.order}, ${end.men} men`);
  ok('the other phone got a kill-feed line', /cut down/.test(feed), feed.slice(0, 90));
  if (!/cut down/.test(feed)) console.log('  feed:', JSON.stringify(feed));
  return k;
}
await death('2. death of the host\'s captain', A, B, () => { const st = window.__st, F = window.__fb, G = F.G, P = G.player, E = st.E; st.place(P, st.S.x, st.S.z, Math.atan2(st.S.ux, st.S.uz)); const [x, z] = st.front(P, 1.9); st.place(E, x, z, P.face + Math.PI); P.hp = 1; P.armour = 0; st.swing(E, P, .1); return { ti: E.ti, name: F.nick(E.ti) }; });
await park();
// (the host's captain is back at home; the joiner's is still on stage)
await bringJoiner();
await death('3. death of the joiner\'s captain', B, A, () => { const st = window.__st, F = window.__fb, L = st.peer(), E = st.E; const [x, z] = st.front(L, 1.9); st.place(E, x, z, L.face + Math.PI); L.hp = 1; L.armour = 0; L.shieldT = 0; L.stun = 0; st.swing(E, L, .1); return { ti: E.ti, name: F.nick(E.ti) }; });
await park();

// ---------- 5. nobody is taken away while still standing ----------
console.log('\n4. the fallen');
await sleep(16000); // (the last men cut down have lain their time)
for (const [p, who] of [[A, 'host'], [B, 'joined phone']]) {
  const w = await p.evaluate(() => { const W = window.__w; return { removed: W.removed, bad: W.bad.slice(0, 5), badN: W.bad.length, minDeadT: +W.minDeadT.toFixed(1), frames: W.frames }; });
  ok(`${who}: every man taken out of the battle had fallen and lain there (none standing, none in the air)`, w.removed >= 3 && w.badN === 0, `${w.removed} taken away, the soonest ${w.minDeadT} s after falling; ${w.badN} wrong ${JSON.stringify(w.bad)}`);
}

// ---------- 6. drawn for real: the new flash shader, with pictures ----------
console.log('\n5. drawn');
{
  const e0 = errors.length;
  await A.evaluate(() => { window.__noRender = 0; });
  await A.evaluate(() => { const st = window.__st, G = window.__fb.G, P = G.player, E = st.E; st.place(P, st.S.x, st.S.z, Math.atan2(st.S.ux, st.S.uz)); const [x, z] = st.front(P, 1.9); st.place(E, x, z, P.face + Math.PI); });
  await sleep(4000); // (a few drawn frames: the camera arrives)
  for (const [name, fn] of [['clash', () => { const st = window.__st, P = window.__fb.G.player, E = st.E; const [x, z] = st.front(P, 1.9); st.place(E, x, z, P.face + Math.PI); P.cd = 0; P.stun = 0; st.swing(E, P, .1); st.swing(P, E, .14); }],
    ['cut', () => { const st = window.__st, P = window.__fb.G.player; st.E.stun = 8; const s = st.soldier(1, false, P); s.gT = 4; P.cd = 0; P.stun = 0; st.swing(P, s, .1); }]]) {
    const n0 = await A.evaluate(n => window.__fb.feel[n], name);
    await A.evaluate(fn);
    await A.waitForFunction(([n, v]) => window.__fb.feel[n] > v, [name, n0], { timeout: 30000 }).catch(() => {});
    await sleep(350); // (drawn frames are slow here: let one with the flash in it reach the screen)
    await A.screenshot({ path: OUT + name + '_host.png' });
    await sleep(1500);
  }
  await sleep(1500);
  ok('the flashes draw with 3D on: no shader or page errors', errors.length === e0, errors.slice(e0).join(' | '));
}
ok('no page errors on either phone in the whole run', errors.length === 0, errors.slice(0, 3).join(' | '));
await b1.close(); await b2.close();

// ---------- 7. frame cost ----------
if (process.env.PERF !== '0') {
  console.log('\n6. frame cost: Low graphics, Crown start, fixed random seed');
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const now = await perf(b); await b.close();
  const pc = (a, b0) => ((a - b0) / b0 * 100).toFixed(2) + '%';
  console.log(`  draw calls: before ${BASE.calls}, now ${now.calls} (${pc(now.calls, BASE.calls)})   triangles: before ${BASE.tris}, now ${now.tris} (${pc(now.tris, BASE.tris)})`);
  ok('draw calls and triangles within 5% of before', now.level === 'low' && Math.abs(now.calls - BASE.calls) <= BASE.calls * .05 && Math.abs(now.tris - BASE.tris) <= BASE.tris * .05);
}
const bad = res.filter(r => !r.pass);
console.log(`\n${res.length - bad.length}/${res.length} passed` + (bad.length ? '\nFAILED: ' + bad.map(r => r.name).join('; ') : ''));
process.exit(bad.length ? 1 : 0);
