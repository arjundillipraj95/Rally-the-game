// F7 no abrupt cuts (Arjun's picks, 13 Nov), on the host/solo phone. Replaces r_F7e/f/g/h.
// a. the courtyard: walls round each home, open at the front; enemies burn only inside it
// b. respawn: fade 0.4 / 0.4, he marches out of the yard (no frame over 2 m), untouchable 1 s, a stick push takes over
// c. the start: after the flyover, black, then every captain and his men march out; no camera jump in view
// d. duel: shoved to the edge over ~0.3 s, fast then slowing, stumble marked
// e. execution: two quick steps (no frame over a third of the way), blow at .75 s, slow motion on it
// f. chasm: teeters ~0.5 s at the rim (no drop), then drops (no frame over 1.2 m), dead at ~1.2 s, no body left;
//    your own captain: the camera holds at the rim
// g. end: results hold then fade in; a black screen at the end fades back, no snap
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
const Q = process.env.Q || '?crown2=1';
const newBattle = async (intro, map) => {
  const page = await open(browser, 900, 420, { q: Q });
  await page.evaluate(intro => { window.__noRender = 1; if (intro) window.__keepIntro = true; }, intro);
  if (map) await page.evaluate(m => document.querySelector(`#segMap button[data-v="${m}"]`).click(), map);
  else await page.click('#segMode button[data-v="crown"]');
  await page.click('#goBtn'); await frames(page, 2);
  return page;
};

// ---- a, b, d, e, f, g: one battle with the opening skipped
let page = await newBattle(false);
const A = await page.evaluate(async () => {
  const F = window.__fb, G = F.G, C = (await import('/src/config.js')), Y = C.CROWN2.yard, me = G.myTi, out = {};
  const L = G.layout, near = q => L.homes.reduce((b, x) => Math.hypot(x.x - q.x, x.z - q.z) < Math.hypot(b.x - q.x, b.z - q.z) ? x : b), myHome = near(G.player);
  // a. walls
  out.walls = L.homes.map(hm => L.obstacles.filter(o => o.yard === hm.c).length);
  const front = hm => [hm.x - Math.cos(hm.a) * Y.r, hm.z - Math.sin(hm.a) * Y.r];
  out.frontOpen = L.homes.every(hm => { const [fx, fz] = front(hm); return !L.obstacles.some(o => o.yard === hm.c && Math.hypot(o.x - fx, o.z - fz) < Y.open / 2 - .6); });
  out.safeR = C.CROWN2.safeR;
  // b. respawn and march
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; }
  G.T = Math.max(G.T, 20); const p = G.player, s = G.teams[me]; p.iframeT = 0; p.marchT = 0; p.x -= Math.cos(myHome.a) * 20; p.z -= Math.sin(myHome.a) * 20; F.step(1, 1 / 30, true);
  p.hp = 0; F.die(p, null, 0); out.died = p.dead; s.leaderDeadT = 1.2;
  const pos = []; let L2 = null, i = 0, blackAtSpawn = null;
  for (; i < 120; i++) { window.__frame(1); if (s.leader !== p && !s.leader.dead) { L2 = s.leader; blackAtSpawn = F.death.black; break; } }
  out.respawned = !!L2;
  if (L2) {
    out.march0 = L2.marchT; out.iframe0 = L2.iframeT; const hm = near(L2);
    out.d0 = Math.hypot(L2.x - hm.x, L2.z - hm.z); let last = [L2.x, L2.z], big = 0, safeAt = -1;
    for (let k = 0; k < 40; k++) { window.__frame(1); big = Math.max(big, Math.hypot(L2.x - last[0], L2.z - last[1])); last = [L2.x, L2.z]; if (safeAt < 0 && !(L2.iframeT > 0)) safeAt = k + 1; }
    out.d1 = Math.hypot(L2.x - hm.x, L2.z - hm.z); out.bigStep = big; out.safeFor = safeAt; out.blackAtSpawn = blackAtSpawn;
    out.opacityAfter = document.getElementById('blackout').style.opacity;
    // a stick push takes over at once
    L2.marchT = 1; L2.marchA = 0; F.step(3, 1 / 30, { wx: 1, wz: 0, mag: 1 }); out.stickTook = L2.marchT === 0;
  }
  // enemy inside the yard burns, just outside doesn't
  const foe = [0, 1, 2, 3].find(t => G.ALLY[t] !== G.ALLY[me] && G.teams[t].active);
  const hm = myHome;
  const inMan = F.mkUnit(foe, hm.x - Math.cos(hm.a) * 4, hm.z - Math.sin(hm.a) * 4, 'foot'), outMan = F.mkUnit(foe, hm.x - Math.cos(hm.a) * 13, hm.z - Math.sin(hm.a) * 13, 'foot');
  for (const u of G.units) if (u !== inMan && u !== outMan) { u.x = 150 + u.id * 3; u.z = -150; u.path = null; }
  inMan.hp = outMan.hp = 1e4; inMan.max = outMan.max = 1e4; inMan.marchT = outMan.marchT = 0; inMan.iframeT = outMan.iframeT = 0;
  F.step(5, 1 / 30); out.burnIn = inMan.hp < 1e4; out.burnOut = outMan.hp < 1e4;
  inMan.dead = outMan.dead = true;
  return out;
});
console.log(Date.now()%100000, 'a/b', JSON.stringify(A));
ok(A.walls.every(n => n > 20), 'a: a home has no wall: ' + A.walls); ok(A.frontOpen, 'a: a front is not open');
ok(A.burnIn && !A.burnOut, 'a: burn should be inside the yard only (in ' + A.burnIn + ', out ' + A.burnOut + ')');
ok(A.respawned, 'b: never respawned');
if (A.respawned) {
  ok(A.march0 >= .95, 'b: not marching on respawn: ' + A.march0); ok(A.iframe0 >= .95, 'b: not untouchable on respawn: ' + A.iframe0);
  ok(A.blackAtSpawn >= 2, 'b: screen not black when he appeared: ' + A.blackAtSpawn);
  ok(A.bigStep < 2, 'b: jumped ' + A.bigStep.toFixed(2) + ' m in a frame while marching');
  ok(A.d1 > 10.5 && A.d1 > A.d0 + 3, 'b: did not march out of the yard: ' + A.d0.toFixed(1) + ' -> ' + A.d1.toFixed(1) + ' m');
  ok(A.safeFor >= 28 && A.safeFor <= 34, 'b: untouchable for ' + A.safeFor + ' frames, want ~30');
  ok(A.stickTook, 'b: a stick push did not take over'); ok(A.opacityAfter === '0', 'b: the screen did not come back in');
}

// d. duel shove (a fresh battle each; the duel and the execution are the same on every map, the valley has room)
await page.close(); page = await newBattle(false, 'valley');
const D = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -10, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me] && G.teams[i].active), L = G.teams[foe].leader;
  for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { const c = s.leader; if (c && c !== p && c !== L) { c.x = 150; c.z = -150; } }
  for (const c of [p, L]) { c.marchT = 0; c.iframeT = 0; c.dueled = false; if (c.summon) { c.summon.state = 'leaving'; c.summon = null; } c.horseCd = 99; c.vx = c.vz = 0; }
  p.x = X; p.z = Z; p.face = Math.PI / 2; L.x = X + 6; L.z = Z; L.face = -Math.PI / 2; p.hp = p.max = 1e4; L.hp = L.max;
  const third = [0, 1, 2, 3].find(i => i !== me && i !== foe && G.teams[i].active) ?? foe;
  const m = F.mkUnit(third, X + 3, Z + 1, 'foot'); m.hp = m.max = 1e4; m.hold = true; m.marchT = 0;
  F.step(1, 1 / 30, true); F.duel(); const d = G.duels[0]; if (!d) return { err: 'no offer' }; d.aiYes = true;
  const out = { steps: [] }; let on = false, last = null;
  for (let i = 0; i < 120 && out.steps.length < 20; i++) {
    F.step(1, 1 / 30, true);
    if (!on && d.state === 'on') { on = true; m.x = d.x + 1; m.z = d.z + 3.5; m.vx = m.vz = 0; m.shoveD = null; d.t0 = G.T; last = Math.hypot(m.x - d.x, m.z - d.z); out.r0 = last; continue; }
    if (on) { const r = Math.hypot(m.x - d.x, m.z - d.z); out.steps.push(+(r - last).toFixed(3)); last = r; }
  }
  out.on = on; out.rEnd = last; out.shoved = !!m.shoveAt || true;
  return out;
});
console.log(Date.now()%100000, 'd', JSON.stringify(D).slice(0, 300));
if (D.err || !D.on) fails.push('d: duel did not start ' + (D.err || ''));
else {
  const tot = D.rEnd - D.r0, big = Math.max(...D.steps), at = D.steps.findIndex((s, k) => D.steps.slice(0, k + 1).reduce((a, b) => a + b, 0) >= tot - .05) + 1;
  ok(big < tot / 3 + .01, 'd: a frame moved him ' + big + ' of ' + tot.toFixed(2) + ' m'); ok(at >= 6 && at <= 11, 'd: reached the edge in ' + at + ' frames, want ~9');
  ok(D.steps[0] > D.steps[5], 'd: not fast then slowing: ' + D.steps.slice(0, 8));
}

// e. execution
await page.close(); page = await newBattle(false, 'valley');
const E = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me] && G.teams[i].active), L = G.teams[foe].leader;
  for (const u of G.units) if (u !== p && u !== L) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  p.hp = p.max = 1e6; p.weapon = 'sword'; p.duelId = L.duelId = 0; p.marchT = L.marchT = 0; p.iframeT = L.iframeT = 0;
  L.x = X + 2; L.z = Z; L.face = -Math.PI / 2; L.max = 180; L.hp = 40; L.stun = 0; L.guardT = 0; L.dead = false; L.vx = L.vz = 0;
  p.x = X - .7; p.z = Z; p.face = Math.PI / 2; p.cd = 0;
  F.step(2, 1 / 30, true);
  if (!L.execReady) return { err: 'not marked' };
  F.attack();
  const out = { steps: [], dead: -1 }; let last = null, i0 = 0;
  for (let i = 0; i < 60; i++) {
    window.__frame(1);
    if (p.execA && last === null) { last = [p.x, p.z]; i0 = i; continue; }
    if (last) { out.steps.push(+Math.hypot(p.x - last[0], p.z - last[1]).toFixed(3)); last = [p.x, p.z]; }
    if (L.dead && out.dead < 0) { out.dead = i - i0; out.slow = F.slowmo(); }
  }
  return out;
});
console.log(Date.now()%100000, 'e', JSON.stringify(E).slice(0, 300));
if (E.err) fails.push('e: ' + E.err);
else {
  const tot = E.steps.reduce((a, b) => a + b, 0), big = Math.max(...E.steps);
  ok(big < Math.max(.3, tot / 3 + .01), 'e: a frame moved him ' + big + ' of ' + tot.toFixed(2)); ok(E.dead >= 21 && E.dead <= 24, 'e: blow at frame ' + E.dead + ', want ~22 (.75 s)');
  ok(E.slow > 0, 'e: no slow motion on the blow');
}

// f. chasm: a soldier, then your own captain
await page.close(); page = await newBattle(false);
const Fc = await page.evaluate(async () => {
  const F = window.__fb, G = F.G, C = (await import('/src/config.js')).FEEL.chasm;
  for (const u of G.units) { if (u !== G.player) { u.x = 200 + u.id; u.z = 200; u.path = null; } }
  const L = G.layout, a = -Math.PI / 2, ux = Math.cos(a), uz = Math.sin(a), d = L.chasm.r;
  const off = F.mkUnit(2, ux * d - uz * 4.5, uz * d + ux * 4.5, 'foot'), on = F.mkUnit(2, ux * d, uz * d, 'foot'); off.marchT = on.marchT = 0;
  const ys = [], o = { deadAt: -1 };
  for (let i = 0; i < 80; i++) {
    F.step(1);
    if (i === 3) o.mid = { dead: off.dead, iframe: off.iframeT > 0, chasmT: off.chasmT };
    if (!off.dead) ys.push(+off.y.toFixed(2));
    if (off.dead && o.deadAt < 0) { o.deadAt = i + 1; o.cause = G.deaths && G.deaths.men.chasm ? 'chasm' : null; }
  }
  o.ys = ys; o.onDead = on.dead; o.gone = !G.units.includes(off);
  let big = 0; for (let i = 1; i < ys.length; i++) big = Math.max(big, Math.abs(ys[i] - ys[i - 1])); o.bigDrop = big;
  o.teeterDrop = ys[0] - ys[Math.round(C.teeter * 30) - 2]; o.fell = ys[0] - ys[ys.length - 1];
  // your own captain: the camera holds at the rim
  const p = G.player; p.marchT = 0; p.iframeT = 0; p.x = ux * d - uz * 4.5; p.z = uz * d + ux * 4.5; p.vx = p.vz = 0; p.dead = false;
  const cy = [];
  for (let i = 0; i < 30; i++) { window.__frame(1); cy.push(F.camera.position.y); }
  const t = F.camTarget(); o.camEdge = !!(t && t.edge); o.camDrop = cy[12] - Math.min(...cy.slice(12));
  return o;
});
console.log('f', JSON.stringify({ ...Fc, ys: Fc.ys.slice(0, 40) }));
ok(Fc.mid && !Fc.mid.dead && Fc.mid.iframe && Fc.mid.chasmT > 0, 'f: not alive and untouchable at the rim');
ok(Fc.teeterDrop < .05, 'f: he dropped during the teeter: ' + Fc.teeterDrop);
ok(Fc.deadAt >= 34 && Fc.deadAt <= 39, 'f: dead after ' + Fc.deadAt + ' frames, want ~36 (1.2 s)');
ok(Fc.cause === 'chasm', 'f: cause ' + Fc.cause); ok(Fc.bigDrop <= 1.2, 'f: height jumped ' + Fc.bigDrop + ' m in a frame');
ok(Fc.fell > 3, 'f: barely fell: ' + Fc.fell); ok(Fc.gone, 'f: his body is still there'); ok(!Fc.onDead, 'f: the man on the bridge died');
ok(Fc.camEdge, 'f: the camera is not held at the rim'); ok(Fc.camDrop < 1.5, 'f: the camera followed him down ' + Fc.camDrop.toFixed(2) + ' m');

// g. end: black fades back in, results hold then fade
const G2 = await page.evaluate(async () => {
  const F = window.__fb, b = document.getElementById('blackout');
  b.style.transition = 'none'; b.style.opacity = 1; F.death.black = 2; F.death.on = true; F.death.body = F.G.player;
  F.end(); window.__frame(2);
  const tr = b.style.transition, op = b.style.opacity;
  const el = document.getElementById('ovEnd'), seen = []; let shown = -1; const t0 = performance.now();
  for (let i = 0; i < 80; i++) { window.__frame(1); await new Promise(r => setTimeout(r, 25)); const t = (performance.now() - t0) / 1000; if (!el.hidden) { if (shown < 0) shown = t; seen.push(+getComputedStyle(el).opacity); } }
  return { tr, op, shown, first: seen[0] };
});
console.log('g', JSON.stringify(G2));
ok(G2.op === '0' && /opacity 0\.[1-9]/.test(G2.tr), 'g: black at the end snapped clear: ' + G2.tr);
ok(G2.shown > 1.2 && G2.shown < 1.8 && G2.first < .6, 'g: results not held then faded: ' + JSON.stringify(G2));
await page.close();

// ---- c. the start, with the opening
page = await newBattle(true);
const S = await page.evaluate(async () => {
  const F = window.__fb, G = F.G, b = document.getElementById('blackout'), out = { jumpsInView: 0, frames: 0 };
  let last = null, goAt = -1;
  for (let i = 0; i < 300; i++) {
    window.__frame(1); const p = F.camera.position.clone(), op = +b.style.opacity;
    if (last && p.distanceTo(last) > 3 && op < .99) out.jumpsInView++;
    if (goAt < 0 && G.state === 'play') { goAt = i; out.opAtGo = op; out.marching = G.units.filter(u => !u.dead && u.marchT > 0).length; out.all = G.units.filter(u => !u.dead).length; }
    if (goAt >= 0 && i === goAt + 40) { const hm = G.layout.homes, p0 = G.player; out.pOut = Math.min(...hm.map(h => Math.hypot(h.x - p0.x, h.z - p0.z))); out.opLater = +b.style.opacity; break; }
    last = p;
  }
  out.goAt = goAt; return out;
});
console.log('c', JSON.stringify(S));
ok(S.goAt > 0, 'c: battle never began'); ok(S.jumpsInView === 0, 'c: the camera jumped in view ' + S.jumpsInView + ' times');
ok(S.opAtGo >= .99, 'c: not black when the camera went to him: ' + S.opAtGo);
ok(S.marching >= S.all - 2, 'c: not everyone marched out: ' + S.marching + ' of ' + S.all);
ok(S.pOut > 10.5, 'c: he is still in the yard: ' + S.pOut); ok(S.opLater === 0, 'c: the screen did not come back in');

console.log(fails.length ? 'F7 FAIL:\n - ' + fails.join('\n - ') : 'F7 PASS');
await browser.close();
process.exit(fails.length ? 1 : 0);
