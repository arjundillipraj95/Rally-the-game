// F26 Spear strikes face the target: for the poke, the sweep and the thrust, at the frame the blow lands, his face (head),
// and the spear tip (from his hips) point within LIM degrees of the target's direction; the chest's is reported (see judge).
//  1. host (the F25 harness, frame by frame): a man 0.6 rad off his facing; the press turns him to the man.
//  2. a joined phone (two browsers, Arjun hosts, Ravi joins): Ravi's own captain, as his phone draws him, along his facing
//     at the press (his phone's synced state, not a guess); the host's captain as Ravi's phone draws him, along his synced facing.
// Usage: node store/r_F26.mjs  (Q='?crown2=1&roles=1' for roles on; JOIN=0 skips 2). Needs bash game/store/servers.sh
import { chromium } from 'playwright';
const Q = (process.env.Q ?? '?crown2=1').replace(/^\?/, ''), LIM = 15, NAMES = ['poke', 'sweep', 'thrust'];
const fails = []; const ck = (c, m, d) => { console.log((c ? 'ok   ' : 'FAIL ') + m + (d ? '  ' + JSON.stringify(d) : '')); if (!c) fails.push(m); };
// in the page: the directions his head, chest and spear tip point (deg, off `tgt`), for captain p as drawn this frame
const METRIC = () => {
  window.__f26m = (p, tgt) => {
    const T = window.__f8.THREE, h = window.__f8.live.get(p); if (!h || !h.R.blade) return null;
    const R = h.R; (h.U || R.root).updateMatrixWorld(true);
    const fwd = b => new T.Vector3(0, 0, 1).applyQuaternion(R.rest[R.list.indexOf(b)].wq.clone().invert()).applyQuaternion(b.getWorldQuaternion(new T.Quaternion()));
    const off = v => { const a = Math.atan2(v.x, v.z) - tgt; return +(Math.atan2(Math.sin(a), Math.cos(a)) * 180 / Math.PI).toFixed(1); };
    const hp = R.hips.getWorldPosition(new T.Vector3()), tp = R.blade.tip.getWorldPosition(new T.Vector3());
    return { face: off(fwd(R.mx.Head)), chest: off(fwd(R.mx.Spine2)), tip: off(tp.sub(hp)), clip: h.swClip, t: h.swT == null ? null : +(window.__fb.G.T - h.swT).toFixed(3) };
  };
};
// The chest is reported, not failed: these clips strike with the chest turned well left of the spear (thrust ~55 deg,
// sweep ~88 deg, the right shoulder driven forward), and the arm hangs from the chest, so a chest turned to the target turns
// the spear off it by as much. Within LIM needs other clips (Arjun's call, F26 report).
const judge = (who, n, m) => {
  ck(m && Math.abs(m.face) <= LIM && Math.abs(m.tip) <= LIM, `${who} ${n}: face and spear tip within ${LIM} deg of the target`, m);
  if (m) console.log(`note ${who} ${n}: chest ${m.chest} deg off the target (${Math.abs(m.chest) <= LIM ? 'within' : 'NOT within'} ${LIM}: the clip's own stance)`);
};

// ---- 1. host
if (process.env.HOST !== '0') {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.addInitScript(() => {
    window.__testSheet = true; localStorage.setItem('rally-quality', 'low'); localStorage.setItem('rally-tutorial-done', '1');
    let s = 4242; Math.random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    window.__raf = []; window.__t = 0; window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
  });
  await page.addInitScript(METRIC);
  await page.goto('http://127.0.0.1:8766/?' + Q);
  await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
  await page.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
  await page.waitForTimeout(4000);
  await page.evaluate(async () => { const F = window.__fb; for (let k = 0; k < 600 && !(F.G.state === 'play' && F.G.player && window.__f8.live.get(F.G.player)); k++) { window.__frame(1); if (k % 40 === 0) await new Promise(r => setTimeout(r, 30)); } });
  await page.evaluate(async () => { const { G } = window.__fb; window.__noRender = true; window.__fb.step(Math.max(0, Math.round((16 - G.T) * 30)), 1 / 30, true); window.__noRender = false; window.__fb.weapon('spear'); window.__frame(30); });
  for (let k = 0; k < 3; k++) {
    const r = await page.evaluate(async k => {
      const { G } = window.__fb, p = G.player, sim = await import('/src/core/sim.js');
      const eti = G.teams.findIndex((s, i) => s && s.active && G.ALLY[i] !== G.ALLY[G.myTi]);
      const a = Math.atan2(p.z, p.x), R = window.__fb.W.R * .45, x0 = Math.cos(a) * R, z0 = Math.sin(a) * R, f = Math.atan2(-x0, -z0);
      const place = () => { G.units = G.units.filter(u => u === p || (u.leader && Math.hypot(u.x - x0, u.z - z0) > 30)); p.x = x0; p.z = z0; p.vx = p.vz = 0; p.face = f; p.dashT = 0; };
      place(); p.combo = 0; p.lastSwingT = -9;
      for (let j = 0; j < k; j++) { p.cd = 0; window.__fb.attack(); for (let i = 0; i < 14; i++) window.__frame(1); }
      place(); window.__frame(1); place();
      const s = f + .6, d = k === 2 ? 4 : 2.2, o = sim.mkUnit(eti, x0 + Math.sin(s) * d, z0 + Math.cos(s) * d, 'arch'); o.spd = 0; o.shootCd = 99; o.cd = 99; o.hp = o.max = 9999; G.units.push(o);
      p.cd = 0; window.__fb.attack();
      const blow = p.pending && p.pending.spear; let hit = null;
      for (let i = 0; i < 20 && !hit; i++) {
        const had = !!p.pending, P = { x: p.x, z: p.z }, O = { x: o.x, z: o.z };
        window.__frame(1);
        if (had && !p.pending) hit = window.__f26m(p, Math.atan2(O.x - P.x, O.z - P.z));
      }
      G.units = G.units.filter(u => u !== o);
      return { blow, hit, struck: o.hp < o.max };
    }, k);
    console.log('host', NAMES[k], JSON.stringify(r));
    ck(r.blow === NAMES[k] && r.struck, `host ${NAMES[k]}: the press is a ${NAMES[k]} and strikes the man 0.6 rad off his old facing`);
    judge('host', NAMES[k], r.hit);
  }
  await browser.close();
}

// ---- 2. a joined phone
if (process.env.JOIN !== "0") {
  const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
  const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts), pages = [];
  for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
    const ctx = await b.newContext({ viewport: { width: 480, height: 240 } });
    await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
    await ctx.addInitScript(METRIC);
    const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
    await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&' + Q);
  }
  const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
  await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
  const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
  await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
  await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
  await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
  await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
  await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
  await sleep(3000);
  await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
  await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.player && window.__f8.live.get(window.__fb.G.player), null, { timeout: 90000 }); await sleep(3000);
  await A.evaluate(() => { window.__fb.G.T = Math.max(window.__fb.G.T, 30); });
  // each frame Ravi's phone draws, after it is drawn: his own captain (k: the combo's step), or the host's as he sees it
  const sample = (who, press) => B.evaluate(async ([who, press]) => {
    const { G } = window.__fb, me = G.player, u = who === 'me' ? me : G.units.find(x => x.leader && x.human && x !== me && !x.dead);
    if (!u) return { err: 'no captain' };
    const rows = [], n0 = (window.__f8.live.get(u) || {}).swN;
    const ls0 = u.lastSwingT, pr0 = performance.now() / 1000;
    if (press) for (let i = 0; i < 30 && (window.__f8.live.get(u) || {}).swN === n0; i++) { if (press === 'next') u.lastSwingT = performance.now() / 1000 - .3; window.__fb.attack(); await new Promise(r => setTimeout(r, 40)); } // (pressed again till his cooldown lets it go; 'next': in the combo's window, which two software-drawn browsers here are too slow to keep)
    const t0 = performance.now();
    while (performance.now() - t0 < 2500) {
      await new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)));
      const h = window.__f8.live.get(u); if (!h || h.swN === n0) continue;
      const m = window.__f26m(u, u.face); if (!m || m.t == null) continue; // (along his facing as this phone has it, synced)
      rows.push({ ...m, hd: (window.__f8.ANIM.swing[h.swClip] || {}).hd || .15 });
      if (m.t > rows[rows.length - 1].hd + .05) break; // (the hit frame is all we need: the next press keeps the combo going)
    }
    if (!rows.length) { const h = window.__f8.live.get(u); return { err: 'no blow seen', n0, swN: h && h.swN, sw: u.swing, clip: h && h.swClip, swT: h && h.swT, T: G.T, w: u.weapon, k: u.swingKind, c: u.combo, dead: u.dead, hp: u.hp, mt: u.mounted, inU: G.units.includes(u), stun: u.stun, carry: !!u.carrying, march: u.marchT }; }
    const best = rows.reduce((q, r) => Math.abs(r.t - r.hd) < Math.abs(q.t - q.hd) ? r : q);
    return { combo: u.combo, gap: +(pr0 - ls0).toFixed(2), tries: +(u.lastSwingT - pr0).toFixed(2), best, frames: rows.length };
  }, [who, press]);
  const afoot = () => B.evaluate(async () => { const F = window.__fb; if (!F.G.player.mounted) return true; F.ride(); for (let i = 0; i < 60 && F.G.player.mounted; i++) { await new Promise(r => setTimeout(r, 100)); } return !F.G.player.mounted; }); // (his phone may have him on a horse)
  await B.evaluate(() => window.__fb.weapon('spear')); await sleep(1500); console.log('Ravi on foot', await afoot());
  await A.evaluate(() => { const { G } = window.__fb, L = G.units.find(x => x.leader && x.human && x.remote); if (!L) return; L.horseCd = 999; L.summon = null; G.horses = G.horses.filter(h => h.rider !== L || h.state === 'ridden'); }); // (no horse comes back for him)
  for (let k = 0; k < 3; k++) {
    const r = await sample('me', k ? 'next' : true);
    console.log('joined own', NAMES[k], JSON.stringify(r));
    ck(!r.err && r.best.clip === ['spearThrust', 'slashWide', 'spearLunge'][k], `joined own ${NAMES[k]}: his phone plays the ${NAMES[k]}'s clip`, r.best && r.best.clip);
    ck(!r.err && Math.abs(r.best.t - r.best.hd) < .07, `joined own ${NAMES[k]}: a frame drawn within .07 s of the hit`, r.best && { t: r.best.t, hd: r.best.hd, clip: r.best.clip });
    judge('joined own', NAMES[k], r.best);
  }
  // the host's captain, as Ravi's phone draws him (his poke: the combo's step isn't sent, so a joined phone draws every press as the poke)
  await A.evaluate(() => { const { G } = window.__fb; window.__fb.weapon('spear'); G.player.lastSwingT = -9; });
  await sleep(1500);
  const watch = sample('host', false); await sleep(200);
  await A.evaluate(() => { const p = window.__fb.G.player; p.cd = 0; window.__fb.attack(); });
  const r = await watch;
  console.log('joined sees host', JSON.stringify(r));
  judge('joined sees host', 'poke', r.best);
  await b1.close(); await b2.close();
}
console.log(fails.length ? `F26: ${fails.length} FAIL` : 'F26: all ok');
process.exit(fails.length ? 1 : 0);
