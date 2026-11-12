// F7-water (F7b, F7a, F7c): the summit's lake. Host / solo checks:
//  b1 before 5:00 the lake keeps everyone out (a captain driving in, soldiers ordered to a spot inside);
//  b2 at 5:00 it drains and the captain walks in; the last blow on the war chest takes it (+4) and starts the countdown;
//  a  10 s countdown (nobody moved), then the flood carries everyone inside out of the nearest gate: no jump over 2 m a
//     frame, nobody hurt or dead, no points change, all set down past the chasm in line with a gate; nobody gets back in;
//     a duel inside is called off;
//  c  from 8:00 the lake drains; the captain walks to the glacier, his soldiers never pass a gate and wait over the bridge.
// The joined phone: JOIN=1 runs the two-phone part (needs `bash store/servers.sh`): the joined player's own captain,
// inside at the flood, is carried out by his own phone the same way.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 900, 420, { q: process.env.Q || '?crown2=1' });
page.on('pageerror', e => fails.push('page error ' + e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
const r = await page.evaluate(() => {
  const F = window.__fb, { G } = F, K = G.c2, L = G.layout, ar = L.arena.r, Ch = L.chasm, o = {};
  const me = G.player, myA = G.ALLY[G.myTi % 4] ?? 0, gA = Math.atan2(me.z, me.x);
  const park = keep => { for (const u of G.units) if (!keep.includes(u) && !u.dead) { u.x = 200 + u.id % 40; u.z = 200 + Math.floor(u.id / 40); u.vx = u.vz = 0; u.path = null; } };
  const toward = (u, x, z) => { const dx = x - u.x, dz = z - u.z, d = Math.hypot(dx, dz) || 1; return { wx: dx / d, wz: dz / d, mag: d > .6 ? 1 : 0 }; };
  // the gate in line with my home: the first one, and a point outside it on the bridge
  const gate = (() => { // (the arena gate nearest my captain's side)
    const P = L.plazaWall; return P.gates.slice().sort((a, b) => Math.abs(Math.atan2(Math.sin(a - gA), Math.cos(a - gA))) - Math.abs(Math.atan2(Math.sin(b - gA), Math.cos(b - gA))))[0]; })();
  const at = (u, r, lat = 0) => { u.x = Math.cos(gate) * r - Math.sin(gate) * lat; u.z = Math.sin(gate) * r + Math.cos(gate) * lat; u.vx = u.vz = 0; u.path = null; };
  const mine = () => G.units.filter(u => u.ti === G.myTi && !u.leader && !u.dead);
  // ---- b1: the lake keeps everyone out ----
  G.T = 100; at(me, ar + 3); mine().forEach((u, i) => at(u, ar + 5 + i * .6, (i % 3 - 1) * 1.2)); park([me, ...mine()]);
  F.setOrder(G.myTi, 'hold', { x: Math.cos(gate) * 6, z: Math.sin(gate) * 6, face: gate });
  let minMe = 99, minMen = 99;
  for (let i = 0; i < 120; i++) { park([me, ...mine()]); F.step(1, 1 / 30, toward(me, 0, 0)); minMe = Math.min(minMe, Math.hypot(me.x, me.z)); for (const u of mine()) minMen = Math.min(minMen, Math.hypot(u.x, u.z)); }
  o.b1 = { minMe: +minMe.toFixed(2), minMen: +minMen.toFixed(2), ar: +ar.toFixed(2) };
  F.setOrder(G.myTi, 'follow');
  // ---- b2: 5:00, the lake drains, in we go, the last blow takes the chest ----
  G.T = 299; at(me, ar + 2);
  for (let i = 0; i < 30 * 8; i++) { park([me, ...mine()]); F.step(1, 1 / 30, toward(me, Math.cos(gate) * 10, Math.sin(gate) * 10)); }
  o.b2 = { meR: +Math.hypot(me.x, me.z).toFixed(1), chest: K.chest };
  const ch = K.breaks.find(b => b.kind === 'chest'); ch.hp = 1; const pts0 = F.c2Points(myA);
  me.x = ch.x - Math.cos(0) * 2.4; me.z = ch.z; me.face = Math.atan2(ch.x - me.x, ch.z - me.z); me.cd = 0; me.stun = 0;
  for (let i = 0; i < 40 && K.chest === 1; i++) { park([me]); if (i % 10 === 0) { me.cd = 0; F.attack(); } F.step(1, 1 / 30, { wx: 0, wz: 0, mag: 0 }); }
  o.b2.taken = K.chest === 2; o.b2.pts = F.c2Points(myA) - pts0; o.b2.floodAt = K.floodAt != null ? +(G.T - K.floodAt).toFixed(1) : null;
  // ---- a: the flood ----
  // a crowd inside: my captain by the chest, my men about, other sides' captains and men all over the arena
  const crowd = [me];
  mine().forEach((u, i) => { const a = i * 1.3, d = 4 + (i % 4) * 3; u.x = Math.cos(a) * d; u.z = Math.sin(a) * d; crowd.push(u); });
  for (let ti = 0; ti < G.teams.length; ti++) { if (ti === G.myTi || !G.teams[ti].active) continue; const L2 = G.teams[ti].leader; if (L2 && !L2.dead) { const a = ti * 1.9 + .3, d = 7 + ti; L2.x = Math.cos(a) * d; L2.z = Math.sin(a) * d; crowd.push(L2); }
    G.units.filter(u => u.ti === ti && !u.leader && !u.dead).slice(0, 4).forEach((u, k) => { const a = ti * 1.9 + k * .7, d = 5 + k * 2.5; u.x = Math.cos(a) * d; u.z = Math.sin(a) * d; crowd.push(u); }); }
  for (const u of crowd) { u.vx = u.vz = 0; u.path = null; u.hp = u.max = 1e6; } // (no one falls to anyone's blade meanwhile: only the water is under test)
  // two captains in a duel ring inside
  const foe = crowd.find(u => u.leader && u !== me); let duel = null;
  if (foe) { G.duels = G.duels || []; duel = { id: 991, a: me, b: foe, state: 'on', x: 0, z: 6, t: 30 }; G.duels.push(duel); me.duelId = foe.duelId = 991; }
  const pts = [0, 1, 2, 3].map(a => F.c2Points(a)), deaths = JSON.stringify(G.deaths || {});
  const left = K.floodAt + 10 - G.T; let movedInCount = 0, prev = crowd.map(u => [u.x, u.z]);
  const keep = () => park(crowd);
  const pin = crowd.map(u => [u.x, u.z]); // (held where they stand through the countdown: only the water moves them)
  for (let i = 0; i < Math.floor(left * 30) - 2; i++) { keep(); crowd.forEach((u, k) => { u.x = pin[k][0]; u.z = pin[k][1]; u.vx = u.vz = 0; }); F.step(1, 1 / 30, { wx: 0, wz: 0, mag: 0 }); crowd.forEach((u, k) => { if (u.flood) movedInCount++; }); }
  o.a = { countdownSaid: !!K.said.c2flood, carriedInCountdown: movedInCount, inside0: crowd.filter(u => Math.hypot(u.x, u.z) < ar).length, n: crowd.length };
  let maxJump = 0, carried = new Set(), hurt = 0, hp0 = crowd.map(u => u.hp), dropped = 0, ys = 0;
  prev = crowd.map(u => [u.x, u.z]);
  for (let i = 0; i < 30 * 6; i++) {
    keep(); F.step(1, 1 / 30, { wx: 0, wz: 0, mag: 0 });
    crowd.forEach((u, k) => { if (u.flood) { carried.add(u); u.wasF = 1; if (!(u.iframeT > 0) || !(u.stun > 0)) hurt++; } else if (u.wasF === 1) { u.wasF = 2; u.landA = Math.atan2(u.z, u.x); u.landR = Math.hypot(u.x, u.z); u.landI = i; }
      const j = Math.hypot(u.x - prev[k][0], u.z - prev[k][1]); if (!u.dead && (u.flood || (u.landI != null && i - u.landI < 15))) { if (j > 1 && !o.jumpAt) o.jumpAt = { i, j: +j.toFixed(2), r: +Math.hypot(u.x, u.z).toFixed(1), f: !!u.flood, lead: !!u.leader, me: u === me }; maxJump = Math.max(maxJump, j); } prev[k] = [u.x, u.z]; });
  }
  const rOut = Ch.r + Ch.w + 2.5;
  o.a.carried = carried.size; o.a.maxJump = +maxJump.toFixed(2); o.a.notSafe = hurt;
  o.a.dead = crowd.filter(u => u.dead).length; o.a.ptsSame = JSON.stringify([0, 1, 2, 3].map(a => F.c2Points(a))) === JSON.stringify(pts);
  o.a.outside = crowd.filter(u => !u.dead && u.landR >= rOut - .5).length; // (where the water set him down)
  o.a.onGateLine = crowd.filter(u => { const a = u.landA; return L.plazaWall.gates.some(g => Math.abs(Math.atan2(Math.sin(a - g), Math.cos(a - g))) < .12); }).length;
  o.a.duelOff = !G.duels.includes(duel) && !me.duelId;
  o.a.deathsSame = JSON.stringify(G.deaths || {}) === deaths; if (!o.a.deathsSame) o.a.deaths = JSON.stringify(G.deaths);
  // nobody back in while the lake is up: let them all walk where they like for 5 s
  for (const u of crowd) if (u.leader && !u.human) G.teams[u.ti].plan = { kind: 'spot', x: 0, z: 5, stop: 1 };
  let backIn = 0; for (let i = 0; i < 150; i++) { keep(); F.step(1, 1 / 30, toward(me, 0, 0)); backIn += crowd.filter(u => !u.dead && Math.hypot(u.x, u.z) < ar - .2).length; }
  o.a.backIn = backIn;
  // ---- c: 8:00 ----
  G.T = 479; for (const u of G.units) { u.flood = null; } at(me, ar + 8); mine().forEach((u, i) => at(u, ar + 10 + (i >> 1), (i % 2 ? 1 : -1))); const men = mine(); park([me, ...men]);
  prev = men.map(u => [u.x, u.z]); let cJump = 0, cIn = 0, minR = 99;
  for (let i = 0; i < 30 * 14; i++) { park([me, ...men]); F.step(1, 1 / 30, toward(me, Math.cos(gate) * 3.2, Math.sin(gate) * 3.2)); men.forEach((u, k) => { const j = Math.hypot(u.x - prev[k][0], u.z - prev[k][1]); cJump = Math.max(cJump, j); prev[k] = [u.x, u.z]; const r = Math.hypot(u.x, u.z); minR = Math.min(minR, r); if (r < ar) cIn++; }); }
  const wp = Ch.r + Ch.w + 3, wx = Math.cos(gate) * wp, wz = Math.sin(gate) * wp;
  o.c = { meR: +Math.hypot(me.x, me.z).toFixed(1), menIn: cIn, menJump: +cJump.toFixed(2), menMinR: +minR.toFixed(1), nearWait: men.filter(u => !u.dead && Math.hypot(u.x - wx, u.z - wz) < 7).length, men: men.length };
  return o;
});
console.log(JSON.stringify(r));
ok(r.b1.minMe >= r.b1.ar + .2, 'b1: captain got into the lake (' + r.b1.minMe + ')');
ok(r.b1.minMen >= r.b1.ar + .2, 'b1: soldiers got into the lake (' + r.b1.minMen + ')');
ok(r.b2.meR < r.b1.ar - 4 && r.b2.chest === 1, 'b2: captain did not get in after 5:00 (' + r.b2.meR + ')');
ok(r.b2.taken && r.b2.pts === 4 && r.b2.floodAt != null, 'b2: last blow did not take the chest ' + JSON.stringify(r.b2));
ok(r.a.countdownSaid && r.a.carriedInCountdown === 0 && r.a.inside0 === r.a.n, 'a: countdown wrong ' + JSON.stringify(r.a));
ok(r.a.carried === r.a.n, 'a: not everyone carried (' + r.a.carried + '/' + r.a.n + ')');
ok(r.a.maxJump <= 2, 'a: a jump of ' + r.a.maxJump + ' m');
ok(r.a.notSafe === 0 && r.a.dead === 0 && r.a.ptsSame && r.a.deathsSame, 'a: someone hurt or points moved ' + JSON.stringify(r.a));
ok(r.a.outside === r.a.n && r.a.onGateLine === r.a.n, 'a: not all set down outside a gate ' + JSON.stringify(r.a));
ok(r.a.duelOff, 'a: the duel went on');
ok(r.a.backIn === 0, 'a: men got back in under the lake (' + r.a.backIn + ')');
ok(r.c.meR < 5, 'c: captain did not reach the glacier (' + r.c.meR + ')');
ok(r.c.menIn === 0 && r.c.menJump <= 2, 'c: soldiers in, or jumping ' + JSON.stringify(r.c));
ok(r.c.nearWait === r.c.men, 'c: soldiers not waiting over the bridge ' + JSON.stringify(r.c));
console.log(fails.length ? 'F7-water FAIL: ' + fails.join('; ') : 'F7-water PASS (host)');
await browser.close();
process.exit(fails.length ? 1 : 0);
