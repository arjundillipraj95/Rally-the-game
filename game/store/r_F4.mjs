// F4: the mountain's garrisons and camps are real soldiers. Host (headless, clock in our hands):
//  a. a post per castle and camp (20), 5 men each, in the battle at their spots, grey (ti 12), asleep; everyone's enemy, not their own.
//  b. each man fights and dies on his own (hit points apart; the post fights on with the rest).
//  c. ambush: a man walking up wakes the post within 1 s and is attacked; footmen never pass the leash; with nobody
//     near they walk back, whole, asleep.
//  d. a castle isn't taken while one guard lives, is once all are down; a camp's last kill pays its gold, the men come back.
// Joined phone (two browsers, peer server, online service):
//  e. same live men per post as the host, awake men where the host has them, sleeping men on their spots.
// Cost (store/r_F4cost.mjs against /tmp/f4/base.json, measured before F4 on the same machine):
//  f. draw calls on High and Low within +2, a snapshot with every post asleep within +5%, the whole battle's sim under
//     2.5 ms a step, and 100 sleeping men costing under 0.3 ms a step (1% of a frame) (armies kept at home, with and without the men).
// Usage (from game/): node store/r_F4.mjs  (SKIP=e,f to leave parts out)
import { chromium } from 'playwright';
import { open } from './stage.mjs';
import { execFileSync } from 'child_process';
import fs from 'fs';
const skip = new Set((process.env.SKIP || '').split(','));
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- host: a-d ----------
{
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await open(browser, 640, 360, { q: process.env.Q ?? '?crown2=1' });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.evaluate(() => { window.__noRender = true; document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
  for (let k = 0; k < 80 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await page.evaluate(() => window.__frame(10, 33));
  const r = await page.evaluate(() => {
    const F = window.__fb, { G } = F, K = G.c2, o = {}, N = 12;
    const posts = K.breaks.filter(b => b.post), men = G.units.filter(u => u.neutral && !u.dead);
    const atSpot = u => Math.hypot(u.x - u.px, u.z - u.pz) < .7;
    o.a = { posts: posts.length, men: men.length, ti: men.every(u => u.ti === N), spots: men.every(atSpot), asleep: posts.every(b => !b.awake),
      ids: new Set(men.map(u => u.id)).size, want: G.holds.filter(h => h.kind === 'castle').length + G.layout.camps.length, kinds: men.filter(u => u.kind === 'foot').length + '/' + men.filter(u => u.kind === 'arch').length };
    // everyone else out of the way: armies parked far off (test men stay where we put them)
    const park = () => { for (const u of G.units) if (!u.neutral && !u.test) { u.x = 260 + (u.id % 40) * 3; u.z = 260; u.vx = u.vz = 0; u.path = null; } };
    const step = n => { for (let i = 0; i < n; i++) { park(); F.step(1); } };
    const man = (ti, x, z, kind = 'foot', hp) => { const m = F.mkUnit(ti, x, z, kind); m.test = true; if (hp) m.hp = m.max = hp; return m; };
    const hold = (m, x, z) => { m.x = x; m.z = z; m.vx = m.vz = 0; m.path = null; };
    step(30);
    o.a.stillAsleep = posts.every(b => !b.awake);
    // b. four of Red's footmen at a camp: each neutral man has his own hit points; the first to fall falls alone
    const cb = posts.find(b => b.kind === 'camp'), raiders = [0, 1, 2, 3].map(k => man(1, cb.x + Math.cos(k * 1.6) * 3.5, cb.z + Math.sin(k * 1.6) * 3.5, 'foot', 400));
    const capR = G.teams[1].leader; capR.test = true; capR.hp = capR.max = 99999; // (their captain stands by, so they fight rather than fall back to him)
    const spotR = k => [cb.x + Math.cos(k * 1.6) * 3.5, cb.z + Math.sin(k * 1.6) * 3.5];
    let first = null, t = 0; for (; t < 30 * 40 && !first; t++) { hold(capR, cb.x + 12, cb.z); raiders.forEach((m, k) => { const [x, z] = spotR(k); if (Math.hypot(m.x - x, m.z - z) > 1.5) hold(m, x, z); }); step(1); first = cb.units.find(u => u.dead); }
    const rest = cb.units.filter(u => !u.dead);
    o.b = { awake: cb.awake, secs: +(t / 30).toFixed(1), firstDead: !!first, firstFalls: first && (first.vy !== 0 || first.deadT > 0), rest: rest.length, n: cb.n,
      hps: rest.map(u => Math.round(u.hp)).join(','), apart: new Set(rest.map(u => Math.round(u.hp))).size > 1 || rest.some(u => u.hp === u.max), raidersHurt: raiders.some(m => m.hp < m.max) };
    for (const m of raiders) { m.test = false; F.die(m, null, 0); } capR.test = false;
    // c. ambush at another camp: a hard-to-kill Red footman 20 m off (asleep), then 7 m (wakes, attacked), then off and away
    const ab = posts.filter(b => b.kind === 'camp')[3], Q = { ambush: 9, leash: 14 }, w = man(1, ab.x + 20, ab.z, 'foot', 99999);
    for (let i = 0; i < 30; i++) { hold(w, ab.x + 20, ab.z); step(1); }
    o.c = { asleepAt20: !ab.awake };
    let wokeT = -1; for (let i = 0; i < 60; i++) { hold(w, ab.x + 7, ab.z); step(1); if (ab.awake && wokeT < 0) wokeT = i / 30; }
    let hits = 0; const h0 = w.hp; for (let i = 0; i < 60; i++) { hold(w, ab.x + 7, ab.z); step(1); } hits = h0 - w.hp;
    let far = 0; for (let i = 0; i < 90; i++) { const d = 7 + i / 90 * 23; hold(w, ab.x + d, ab.z); step(1); for (const u of ab.units) if (u && !u.dead && u.kind === 'foot') far = Math.max(far, Math.hypot(u.x - ab.x, u.z - ab.z)); }
    let back = -1; for (let i = 0; i < 30 * 15 && back < 0; i++) { hold(w, ab.x + 45, ab.z); step(1); if (!ab.awake && ab.units.every(u => u.dead || (atSpot(u) && u.hp >= u.max))) back = i / 30; }
    o.c = Object.assign(o.c, { wokeIn: wokeT, attacked: Math.round(hits), farthest: +far.toFixed(1), leash: Q.leash, backIn: back, asleep: !ab.awake, whole: ab.units.every(u => u.dead || u.hp >= u.max) });
    w.test = false; F.die(w, null, 0);
    // d. a castle: Red men stand in it; one guard alive holds it; all down, it's taken. A camp: last kill pays, men return.
    const gb = posts.find(b => b.kind === 'guard'), h = G.holds.find(x => x.id === gb.hid);
    const inside = [0, 1, 2, 3, 4, 5].map(k => man(1, h.x + Math.cos(k) * 2, h.z + Math.sin(k) * 2, 'foot', 99999));
    const keep = () => inside.forEach((m, k) => hold(m, h.x + Math.cos(k) * 2, h.z + Math.sin(k) * 2));
    for (const u of gb.units.slice(1)) F.die(u, null, 0);
    gb.units[0].hp = gb.units[0].max = 99999;
    for (let i = 0; i < 30 * 22; i++) { keep(); step(1); }
    o.d = { oneGuardLeft: gb.n, ownerWithGuard: h.owner };
    F.die(gb.units[0], inside[0], 0);
    let taken = -1; for (let i = 0; i < 30 * 22 && taken < 0; i++) { keep(); step(1); if (h.owner >= 0) taken = i / 30; }
    o.d.takenIn = taken; o.d.owner = h.owner; o.d.redSide = G.ALLY[1];
    for (const m of inside) { m.test = false; F.die(m, null, 0); }
    const kb = posts.filter(b => b.kind === 'camp')[5], killer = man(2, kb.x + 30, kb.z, 'foot', 999), g0 = G.teams[2].gold;
    for (const u of kb.units.slice(0, 4)) F.die(u, null, 0);
    F.die(kb.units[4], killer, 0); step(1);
    o.d.campGold = Math.round(G.teams[2].gold - g0); o.d.back = +(kb.back - G.T).toFixed(1);
    const ids0 = kb.units.map(u => u.id).join(',');
    kb.back = G.T + 1; step(45);
    o.d.campBack = kb.units.filter(u => !u.dead && atSpot(u)).length; o.d.sameIds = kb.units.map(u => u.id).join(',') === ids0;
    o.d.inBattle = kb.units.every(u => G.units.includes(u));
    killer.test = false;
    return o;
  });
  console.log(JSON.stringify(r));
  ok(r.a.posts === r.a.want && r.a.men === r.a.want * 5 && r.a.ids === r.a.men && r.a.kinds === r.a.want * 3 + '/' + r.a.want * 2, `a. a post for every castle and camp (${r.a.posts}), 5 men each (${r.a.kinds} footmen/archers), own ids`);
  ok(r.a.ti && r.a.spots && r.a.asleep && r.a.stillAsleep, 'a. grey (ti 12), at their spots, asleep (and still after 1 s)');
  ok(r.b.firstDead && r.b.firstFalls && r.b.rest === 4 && r.b.n === 4, `b. one man falls alone (${r.b.secs} s), the post fights on with ${r.b.rest}`);
  ok(r.b.apart, `b. the rest keep their own hit points (${r.b.hps})`);
  ok(r.c.asleepAt20 && r.c.wokeIn >= 0 && r.c.wokeIn <= 1, `c. asleep at 20 m, awake ${r.c.wokeIn} s after he comes within 9 m`);
  ok(r.c.attacked > 0, `c. he's attacked (${r.c.attacked} damage in 2 s)`);
  ok(r.c.farthest <= r.c.leash + 1.6, `c. footmen never past the leash: farthest ${r.c.farthest} m (leash ${r.c.leash})`);
  ok(r.c.backIn >= 0 && r.c.asleep && r.c.whole, `c. nobody near: back at their spots, whole, asleep after ${r.c.backIn} s`);
  ok(r.d.oneGuardLeft === 1 && r.d.ownerWithGuard < 0, `d. castle held by its last guard for 22 s (owner ${r.d.ownerWithGuard})`);
  ok(r.d.takenIn >= 0 && r.d.owner === r.d.redSide, `d. guards all down: Red's side takes it in ${r.d.takenIn} s`);
  ok(r.d.campGold === 50 && r.d.back > 85, `d. camp's last kill pays ${r.d.campGold} gold; men back in ${r.d.back} s`);
  ok(r.d.campBack === 5 && r.d.sameIds && r.d.inBattle, `d. the camp's 5 men are back at their spots (same ids)`);
  ok(!errs.length, 'no page errors' + (errs.length ? ': ' + errs[0] : ''));
  await browser.close();
}

// ---------- joined phone: e ----------
if (!skip.has('e')) {
  const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
  const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts), pages = [], errs = [];
  for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
    const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
    await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('rally-nick', nick); }, nick);
    const p = await ctx.newPage(); if (process.env.DEBUG) p.on('console', m => console.log('C', nick, m.text().slice(0, 200))); p.on('pageerror', e => { errs.push(nick + ': ' + e.message); if (errs.length < 3) console.log('ERR', nick, e.message, (e.stack || '').split('\n').slice(1, 3).join(' | ')); }); pages.push(p);
    await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&' + (process.env.Q ?? '?crown2=1').replace(/^\?/, ''));
  }
  const [A, B] = pages;
  await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
  const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
  await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
  await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
  await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
  await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
  await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
  await sleep(3000);
  await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
  await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play', null, { timeout: 60000 }).catch(async e => { console.log('joined phone never got into the battle:', JSON.stringify(await B.evaluate(() => ({ info: window.__fb.info.net, state: window.__fb.G.state, text: document.body.innerText.replace(/\s+/g, ' ').slice(0, 400) })))); throw e; }); await sleep(3000);
  // the host: two men of one camp cut down, a whole castle garrison cut down, and a Red footman (hard to kill)
  // kept at another camp's edge so it's awake and fighting
  await A.evaluate(() => { const F = window.__fb, { G } = F, P = G.c2.breaks.filter(b => b.post);
    const c0 = P.find(b => b.kind === 'camp'), g0 = P.find(b => b.kind === 'guard'), c1 = P.filter(b => b.kind === 'camp')[2];
    F.die(c0.units[0], null, 0); F.die(c0.units[3], null, 0); for (const u of g0.units) F.die(u, null, 0);
    const m = F.mkUnit(1, c1.x + 6, c1.z, 'foot'); m.hp = m.max = 99999; m.test = true;
    window.__f4m = m; window.__f4c = c1; window.__f4hold = setInterval(() => { m.x = c1.x + 6; m.z = c1.z; m.vx = m.vz = 0; m.path = null; }, 20); });
  await A.waitForFunction(() => { const c = window.__f4c; return c.awake && c.units.some(u => u && !u.dead && Math.hypot(u.x - u.px, u.z - u.pz) > 1); }, null, { timeout: 15000 }).catch(() => {}); // (the fight on)
  await sleep(1500);
  if (process.env.DEBUG2) console.log('dbg', await A.evaluate(() => { const m = window.__f4m, c = window.__f4c, G = window.__fb.G; return JSON.stringify({ T: G.T, awake: c.awake, dead: m.dead, d: Math.hypot(m.x - c.x, m.z - c.z), inUnits: G.units.includes(m), inSafe: m.inSafe, state: G.state, n: c.n }); }));
  const view = p => p.evaluate(() => { const { G } = window.__fb, P = G.c2.breaks.filter(b => b.post);
    return { alive: P.map(b => b.units.filter(u => u && !u.dead).length).join(''), awake: P.map(b => b.awake ? 1 : 0).join(''),
      men: Object.fromEntries(G.units.filter(u => u.neutral && !u.dead).map(u => [u.id, [+u.x.toFixed(1), +u.z.toFixed(1), Math.hypot(u.x - u.px, u.z - u.pz) < .7 ? 1 : 0]])) }; });
  const [va, vb] = await Promise.all([view(A), view(B)]);
  const awakeIds = Object.keys(va.men).filter(id => !va.men[id][2]);
  let worst = 0; for (const id of awakeIds) if (vb.men[id]) worst = Math.max(worst, Math.hypot(va.men[id][0] - vb.men[id][0], va.men[id][1] - vb.men[id][1]));
  const sleepIds = Object.keys(va.men).filter(id => va.men[id][2] && va.awake[Math.floor((+id - 900000) / 8)] === '0');
  const offSpot = sleepIds.filter(id => !vb.men[id] || !vb.men[id][2]).length;
  console.log('host  ', va.alive, va.awake, '\njoined', vb.alive, '| off their spot on the host:', awakeIds.length, 'worst gap', worst.toFixed(2), 'm');
  ok(va.alive === vb.alive && va.alive.startsWith('0'), `e. same live men per post on both phones (${vb.alive})`);
  ok(awakeIds.length > 0 && awakeIds.every(id => vb.men[id]) && worst < 1.5, `e. awake men off their spots: ${awakeIds.length}, joined phone within ${worst.toFixed(2)} m`);
  ok(offSpot === 0, `e. sleeping men on their spots on the joined phone (${sleepIds.length} checked)`);
  ok(!errs.length, 'e. no page errors' + (errs.length ? ': ' + errs[0] : ''));
  await A.evaluate(() => clearInterval(window.__f4hold));
  await b1.close(); await b2.close();
}

// ---------- cost: f ----------
if (!skip.has('f')) {
  if (!fs.existsSync('/tmp/f4/base.json')) ok(false, 'f. no baseline at /tmp/f4/base.json (run store/r_F4cost.mjs on the commit before F4)');
  else {
    const base = JSON.parse(fs.readFileSync('/tmp/f4/base.json', 'utf8'));
    const runs = [0, 1].map(() => JSON.parse(execFileSync('node', ['store/r_F4cost.mjs'], { encoding: 'utf8' }).trim().split('\n').pop()));
    const now = { high: Math.min(...runs.map(r => r.high.calls)), low: Math.min(...runs.map(r => r.low.calls)), snap: runs[0].snap, ms: Math.min(...runs.map(r => r.ms)), ms2: Math.min(...runs.map(r => r.ms2)) };
    console.log('before', JSON.stringify(base), '\nafter ', JSON.stringify(now));
    ok(now.high <= base.high.calls + 2 && now.low <= base.low.calls + 2, `f. draw calls High ${base.high.calls} -> ${now.high}, Low ${base.low.calls} -> ${now.low}`);
    ok(now.snap <= base.snap * 1.05, `f. snapshot with every post asleep ${base.snap} -> ${now.snap} bytes`);
    ok(now.ms < 2.5 && now.ms2 < 2.5, `f. host sim per step, whole battle: ${base.ms} -> ${now.ms} ms early, ${base.ms2} -> ${now.ms2} ms later (garrisons now fight like soldiers; a frame is 33 ms)`);
    // the price of 100 men standing at their posts: the same battle with every army kept away from them, with and without the men
    const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
    const page = await open(browser, 640, 360, { q: '?crown2=1' });
    await page.evaluate(() => { window.__noRender = true; document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
    for (let k = 0; k < 80 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await page.evaluate(() => window.__frame(10, 33));
    const idle = await page.evaluate(() => { const F = window.__fb, { G } = F, out = [];
      const run = n => { const t = performance.now(); for (let i = 0; i < n; i++) { for (const u of G.units) if (!u.neutral) { const h = G.layout.homes[u.ti % 4]; u.x = h.x + 4 * Math.cos(u.id); u.z = h.z + 4 * Math.sin(u.id); u.vx = u.vz = 0; u.path = null; } F.step(1); } return (performance.now() - t) / n; };
      run(150); const awake = G.c2.breaks.filter(b => b.awake).length, without = [];
      const men = G.units.filter(u => u.neutral), posts = G.c2.breaks.filter(b => b.post).map(b => [b, b.units]);
      for (let k = 0; k < 4; k++) { // (turn and turn about, so the page's own ups and downs fall on both)
        out.push(run(250));
        G.units = G.units.filter(u => !u.neutral); for (const [b] of posts) b.units = [];
        without.push(run(250));
        G.units.push(...men); for (const [b, us] of posts) b.units = us;
      }
      return { with: Math.min(...out), without: Math.min(...without), awake }; });
    await browser.close();
    ok(idle.awake === 0 && idle.with - idle.without < .3, `f. 100 men asleep at their posts cost ${(idle.with - idle.without).toFixed(3)} ms a step, under 0.3 (${idle.without.toFixed(3)} -> ${idle.with.toFixed(3)}; a frame is 33 ms)`);
  }
}
console.log(`r_F4: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
