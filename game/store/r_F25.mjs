// F25 The spear hits where it looks: for each of the spear's three blows (1 poke, 2 sweep, 3 thrust), headless with
// the clip models drawn, the spear tip's world position at the frame the rules land the blow; then
//  (a) a man in front within the visible reach is struck, and he is inside the rule's hit area round the tip;
//  (b) a man just beyond the visible reach (his edge 0.35 m past the tip) is not struck;
//  (c) the clip's hit moment and the rule's are the same frame (the tip is at its furthest within a frame of it).
// Usage: node store/r_F25.mjs  (Q='?crown2=1&roles=1' for roles on). Needs bash game/store/servers.sh
import { chromium } from 'playwright';
const Q = (process.env.Q ?? '?crown2=1').replace(/^\?/, '');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
page.on('pageerror', e => console.log('PAGEERROR', e.message));
await page.addInitScript(() => {
  window.__testSheet = true; localStorage.setItem('rally-quality', 'low'); localStorage.setItem('rally-tutorial-done', '1');
  let s = 4242; Math.random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  window.__raf = []; window.__t = 0; window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
  window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
});
const fails = []; const ck = (c, m, d) => { console.log((c ? 'ok   ' : 'FAIL ') + m + (d ? '  ' + JSON.stringify(d) : '')); if (!c) fails.push(m); };
await page.goto('http://127.0.0.1:8766/?' + Q);
await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
await page.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
await page.waitForTimeout(4000);
await page.evaluate(async () => { const F = window.__fb; for (let k = 0; k < 600 && !(F.G.state === 'play' && F.G.player && window.__f8.live.get(F.G.player)); k++) { window.__frame(1); if (k % 40 === 0) await new Promise(r => setTimeout(r, 30)); } });
await page.evaluate(async () => { const { G } = window.__fb; window.__noRender = true; window.__fb.step(Math.max(0, Math.round((16 - G.T) * 30)), 1 / 30, true); window.__noRender = false; window.__fb.weapon('spear'); window.__frame(30); });

// one blow of the combo (k: 0 poke, 1 sweep, 2 thrust) with men at [dist, angle off his facing (+ his left)] from where
// he stands; the first is the one he aims at. All positions are taken as the rules see them in the frame the blow lands
// (before that frame moves anyone), the tip as it is drawn in that frame.
const blow = (k, men) => page.evaluate(async ([k, men]) => {
  const { G } = window.__fb, p = G.player, T = window.__f8.THREE, sim = await import('/src/core/sim.js'), SH = await import('/src/core/spearhit.js');
  const eti = G.teams.findIndex((s, i) => s && s.active && G.ALLY[i] !== G.ALLY[G.myTi]);
  const a = Math.atan2(p.z, p.x), R = window.__fb.W.R * .45, x0 = Math.cos(a) * R, z0 = Math.sin(a) * R, f = Math.atan2(-x0, -z0);
  const clear = () => { G.units = G.units.filter(u => u === p || (u.leader && Math.hypot(u.x - x0, u.z - z0) > 30)); };
  const place = () => { clear(); p.x = x0; p.z = z0; p.vx = p.vz = 0; p.face = f; p.dashT = 0; };
  // the combo: the presses before this one, into thin air
  place(); p.combo = 0; p.lastSwingT = -9;
  for (let j = 0; j < k; j++) { p.cd = 0; window.__fb.attack(); for (let i = 0; i < 14; i++) window.__frame(1); }
  place(); window.__frame(1); place();
  const os = men.map(([d, s]) => { const o = sim.mkUnit(eti, x0 + Math.sin(f + s) * d, z0 + Math.cos(f + s) * d, 'arch'); o.spd = 0; o.shootCd = 99; o.cd = 99; o.hp = o.max = 9999; o.face = f + Math.PI; G.units.push(o); return o; });
  p.cd = 0; window.__fb.attack();
  const blowName = p.pending && p.pending.spear, aimed = p.pending && p.pending.target === os[0];
  const tip = new T.Vector3(), rows = []; let hit = null;
  for (let i = 0; i < 20; i++) {
    const had = !!p.pending, P = { x: p.x, z: p.z, face: p.face }, O = os.map(o => ({ x: o.x, z: o.z, r: o.r }));
    window.__frame(1);
    const h = window.__f8.live.get(p); if (h && h.R.blade) { (h.U || h.R.root).updateMatrixWorld(true); h.R.blade.tip.getWorldPosition(tip); } else tip.set(NaN, 0, NaN);
    const fx = Math.sin(P.face), fz = Math.cos(P.face), rx = tip.x - P.x, rz = tip.z - P.z;
    const row = { i, along: +(rx * fx + rz * fz).toFixed(2), lat: +(rx * fz - rz * fx).toFixed(2), reach: +Math.hypot(rx, rz).toFixed(2) };
    rows.push(row);
    if (had && !p.pending && !hit) hit = { ...row, men: O.map(o => ({ d: +Math.hypot(o.x - P.x, o.z - P.z).toFixed(2), lat: +((o.x - P.x) * Math.cos(P.face) - (o.z - P.z) * Math.sin(P.face)).toFixed(2), r: o.r, inArea: SH.inSpear(P, o, blowName) })) };
  }
  if (hit) hit.men.forEach((m, j) => { m.struck = os[j].hp < os[j].max; m.edgePastTip = +(m.d - m.r - hit.reach).toFixed(2); });
  const win = hit ? rows.slice(0, hit.i + 4) : rows, tipMax = Math.max(...win.map(r => r.along));
  G.units = G.units.filter(u => !os.includes(u));
  return { blow: blowName, aimed, hit, tipMax, path: rows.slice(0, 10).map(r => r.along + '/' + r.lat).join(' ') };
}, [k, men]);

const NAMES = ['poke', 'sweep', 'thrust'];
for (let k = 0; k < 3; k++) {
  const n = NAMES[k], D = k === 2 ? 4 : 2.2, r = await blow(k, [[D, 0]]), // (the thrust is a running lunge: from further off)
    h = r.hit, m = h && h.men[0];
  console.log(n, JSON.stringify(r));
  ck(r.blow === n && r.aimed, `${n}: the rules call this press a ${n}, aimed at the man in front`, r.blow);
  ck(m && m.struck, `${n}: a man in front within the visible reach is struck`, m);
  ck(m && m.inArea && m.edgePastTip <= .1, `${n}: at the hit frame he is inside the rule's hit area and the spear you see reaches him`, m && { inArea: m.inArea, edgePastTip: m.edgePastTip, tip: h.reach });
  if (k !== 1) ck(h && h.along >= r.tipMax - .12, `${n}: the tip is at full reach when the rules land the blow`, { atHit: h && h.along, furthest: r.tipMax, frame: h && h.i });
  else ck(h && Math.abs(h.lat) < .5 && h.along > 1.5, `sweep: the arc is dead ahead when the rules land the blow`, h && { along: h.along, lat: h.lat });
  // just beyond the visible reach: his edge ~0.3 m past where the tip gets to (moved out by what the first run measured)
  let d = D + .3 - (m ? m.edgePastTip : 0), o2;
  for (let t = 0; t < 3; t++) { o2 = await blow(k, [[d, 0]]); const e = o2.hit && o2.hit.men[0].edgePastTip; if (e == null || (e >= .2 && e <= .5)) break; d += .3 - e; }
  const m2 = o2.hit && o2.hit.men[0];
  console.log(n, 'beyond', JSON.stringify(m2));
  ck(m2 && m2.edgePastTip >= .2 && !m2.struck && !m2.inArea, `${n}: a man just beyond the visible reach (${m2 && m2.edgePastTip} m past the tip) is not struck`);
}
// the sweep's arc: a second man well off to his left (past where the arc has got to when it lands) is not struck;
// one ahead-right, where the arc has already been, is
{ const r = await blow(1, [[2.0, 0], [1.9, 1.3], [1.9, -.8]]), M = r.hit && r.hit.men;
  console.log('sweep arc', JSON.stringify(M));
  ck(M && !M[1].struck && !M[1].inArea, 'sweep: a man off to the left, past where the arc has reached, is not struck');
  ck(M && M[0].struck, 'sweep: the man in front is struck (the man in front only, F17d)'); }
await browser.close();
console.log(fails.length ? `F25: ${fails.length} FAIL` : 'F25: all ok');
process.exit(fails.length ? 1 : 0);
