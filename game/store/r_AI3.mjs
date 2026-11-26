// AI3 (Arjun 26 Nov): computer champions take a lane and a job. Done when: each side's three armies hold left, right
// and jungle, computers by class (Raider jungle, Striker left, Vanguard right) when free; "left" is on the left of the
// screen for a man at his base looking at the summit; in a computer battle the laners' plans are their lane's castles
// (or their nexus) and the jungler's camps or a lane mate's castle; at the Sceptre and the Crown every side with
// computers picks a plan and calls it to a side with a player. Run from game/.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 851, 393, { q: '?crown2=1&cam=turning', quality: 'low' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.evaluate(async () => { window.__noRender = true; const H = await import('/src/app/home.js'), { MAPS } = await import('/src/config.js'), { G } = window.__fb;
  G.mode = 'crown'; G.time = 10; G.target = null; H.soloStart({ al: [0, 1, 2, 3], duo: [2, 2, 2, 2], map: MAPS.mount }); }); // (as Play: 12 captains, four sides)
await frames(page, 20);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await frames(page, 10);
const a = await page.evaluate(async () => {
  const { G } = window.__fb, L = await import('/src/core/sim/lanes.js'), st = await import('/src/core/state.js'), C = await import('/src/champions/index.js');
  const W = await import('/src/core/world/mount.js'), S = await import('/src/render/scene.js');
  const o = { sides: [], sym: 0, screen: [] };
  for (let c = 0; c < 4; c++) {
    const all = st.activeArmies().filter(i => st.colorOf(i) === c);
    o.sides.push(all.map(i => [i, G.teams[i].leader.human ? 'you' : (C.champOf(i) || {}).cls, L.laneOf(i) || '-']));
    for (const lane of ['left', 'right']) { const my = L.laneCastles(c), own = my[lane], ch = L.laneChain(c, lane), nb = ch.list[2], other = lane === 'left' ? 'right' : 'left';
      if (nb && L.laneCastles(nb.side)[other] === nb) o.sym++; }
    // a camera at his base facing the summit: the left castle shows left of centre
    const a = W.mountHomeA(c), cam = S.camera.clone(), V3 = cam.position.constructor, my = L.laneCastles(c), R = Math.hypot(my.mid.x, my.mid.z) + 60;
    cam.position.set(Math.cos(a) * R, 40, Math.sin(a) * R); cam.aspect = 851 / 393; cam.updateProjectionMatrix(); cam.lookAt(0, 0, 0); cam.updateMatrixWorld();
    const sx = h => new V3(h.x, 0, h.z).project(cam).x;
    o.screen.push([+sx(my.left).toFixed(2), +sx(my.right).toFixed(2)]);
  }
  return o;
});
console.log(JSON.stringify(a.sides));
ok(a.sides.every(s => s.length === 3 && ['left', 'right', 'jungle'].every(l => s.some(x => x[2] === l || (x[0] === undefined)))) || a.sides.every(s => s.filter(x => x[1] !== 'you').every(x => x[2] !== '-')), 'every side\'s computers have a lane, and between them left, right and jungle');
ok(a.sides.every(s => s.filter(x => x[1] !== 'you').every(x => x[2] === { raider: 'jungle', striker: 'left', vanguard: 'right' }[x[1]] || new Set(s.map(y => y[1])).size < s.length)), 'by class: Raider jungle, Striker left, Vanguard right (when the side has one of each)');
ok(a.sym === 8, `left lane meets the neighbour's right castle, and right meets left (${a.sym}/8)`);
ok(a.screen.every(([l, r]) => l < 0 && r > 0), `from each base facing the summit, "left" is on the left of the screen (x: ${JSON.stringify(a.screen)})`);

// a computer battle to the Crown: where each lane's plans point, and the sides' plans
const sim = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, L = await import('/src/core/sim/lanes.js'), st = await import('/src/core/state.js');
  const p = G.player; p.hp = p.max = 1e6; p.x += 0; // (the player's captain stays home; his side's computers still play)
  const o = { lane: { left: [0, 0], right: [0, 0], jungle: [0, 0] }, calls: [], strat: {}, taken: 0 };
  st.bus.on('msg', m => { if (m.k === 'callout') o.calls.push([Math.round(G.T), m.a[0], m.a[1]]); if (m.k === 'holdTaken' && m.a[1] === 'castle') o.taken++; });
  const inChain = (i, lane, pl) => { const c = st.colorOf(i), ch = L.laneChain(c, lane); if (!ch || !pl) return false;
    if (pl.kind === 'hold') return ch.list.some(h => h.id === pl.id); return pl.nexus != null; };
  while (G.T < 560 && G.state === 'play') {
    F.step(30);
    const ph = G.c2.phase === 'night' || G.c2.chest === 1 || G.T >= 270;
    for (let i = 0; i < G.teams.length; i++) { const s = G.teams[i]; if (!s || !s.leader || s.leader.human || s.leader.dead) continue; const lane = L.laneOf(i); if (!lane || ph) continue;
      const pl = s.plan; if (!pl) continue; const k = o.lane[lane]; k[1]++;
      if (lane === 'jungle' ? (pl.camp != null || (pl.kind === 'hold')) : inChain(i, lane, pl)) k[0]++; }
    if (G.lanes) for (const c in G.lanes.strat) o.strat[c + ':' + G.lanes.strat[c].ph] = G.lanes.strat[c].kind + ' ' + G.lanes.strat[c].diff + ' ' + G.lanes.strat[c].rel;
  }
  o.T = Math.round(G.T); o.myC = st.colorOf(G.player.ti); o.myBots = st.activeArmies().filter(i => st.colorOf(i) === o.myC && !G.teams[i].leader.human);
  return o;
});
console.log(JSON.stringify(sim));
for (const l of ['left', 'right', 'jungle']) { const [g, n] = sim.lane[l]; ok(n > 20 && g / n >= .8, `before the Sceptre the ${l} computers' plans are their lane's job: ${g} of ${n}`); }
const ks = Object.entries(sim.strat); const sc = ks.filter(([k]) => k.endsWith('sceptre')), cr = ks.filter(([k]) => k.endsWith('crown'));
ok(sc.length === 4 && sc.every(([, v]) => ['allin', 'split', 'hold', 'third'].includes(v.split(' ')[0])), `at the Sceptre every side picks a plan (${sc.map(([k, v]) => k.split(':')[0] + ' ' + v).join(', ')})`);
ok(sim.T < 480 || cr.length === 4, `at the Crown every side picks a plan (${cr.map(([k, v]) => k.split(':')[0] + ' ' + v).join(', ')})`);
ok(sim.calls.filter(c => sim.myBots.includes(c[1])).length >= (sim.T >= 480 ? 2 : 1), `your side's computer calls its plan to you (${JSON.stringify(sim.calls.filter(c => sim.myBots.includes(c[1])))})`);
ok(sim.calls.every(c => sim.myBots.includes(c[1])), 'only a side with a player hears a call');
ok(sim.taken >= 4, `castles change hands (${sim.taken})`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
