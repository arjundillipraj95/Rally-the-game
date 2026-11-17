// CASTLE8: the nexus breaks only once its side's middle castle isn't theirs, never by its own side, never while its side
// holds the Crown; breaking it scores 5 once and drops its owners' morale; the Crown no longer ends the battle and keeps
// its side's morale at 50 or more.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, st8 = await import('/src/core/state.js'), cfg = await import('/src/config.js');
  const nx = await import('/src/core/sim/nexus.js'), c2 = await import('/src/core/sim/crown2.js'), army = await import('/src/core/sim/army.js');
  const N = cfg.CASTLE26.nexus, me = G.player, c = st8.colorOf(me.ti), myA = G.ALLY[c], K = G.c2, o = { N };
  const foeTi = G.teams.findIndex((s, i) => s && s.leader && G.ALLY[st8.colorOf(i)] !== myA), foeA = G.ALLY[st8.colorOf(foeTi)], foe = G.teams[foeTi].leader;
  const b = K.breaks.find(x => x.kind === 'nexus' && x.c === c), mid = G.holds.find(h => h.kind === 'castle' && h.mid && h.side === c);
  o.count = K.breaks.filter(x => x.kind === 'nexus').length;
  mid.owner = myA; o.closedMid = !nx.nexusOpen(b, foe);
  mid.owner = foeA; o.openFoe = nx.nexusOpen(b, foe); o.closedOwn = !nx.nexusOpen(b, me);
  K.crownPts = { [myA]: 8 }; o.closedCrown = !nx.nexusOpen(b, foe); K.crownPts = {};
  const mine = G.teams.map((s, i) => i).filter(i => G.teams[i] && G.teams[i].active && G.ALLY[st8.colorOf(i)] === myA);
  mine.forEach(i => { G.teams[i].morale = 90; });
  const p0 = c2.c2Points(foeA); let n = 0; while (b.hp > 0 && n < 5000) { c2.c2Hit(foe, b); n++; }
  o.blows = n; o.pts = c2.c2Points(foeA) - p0; o.morale = mine.map(i => G.teams[i].morale);
  for (let k = 0; k < 5; k++) c2.c2Hit(foe, b); o.ptsAfter = c2.c2Points(foeA) - p0;
  mine.forEach(i => { G.teams[i].morale = 90; }); army.moraleTick(.1); o.capped = mine.map(i => G.teams[i].morale);
  o.breakdown = c2.c2Breakdown(foeA).nexus;
  // the Crown: taken by my side at night; the battle goes on; morale floor
  const gl = K.breaks.find(x => x.kind === 'glacier'); K.phase = 'night'; let g = 0; while (gl.hp > 0 && g < 500) { c2.c2Hit(me, gl); g++; }
  o.crown = { state: G.state, pts: K.crownPts[myA], side: nx.crownSide() === myA };
  mine.forEach(i => { G.teams[i].morale = 10; G.teams[i].lowT = 0; G.teams[i].routT = 0; }); army.moraleTick(.1); o.floor = mine.map(i => G.teams[i].morale);
  return o;
});
const N = r.N;
ok(r.count === 4, `a nexus for each of the 4 sides (${r.count})`);
ok(r.closedMid && r.openFoe && r.closedOwn, 'closed while its middle castle is theirs; open to another side once it isn\'t; never to its own side');
ok(r.closedCrown, 'closed while its side holds the Crown');
ok(r.pts === N.pts && r.ptsAfter === N.pts && r.breakdown === N.pts, `broken in ${r.blows} blows: +${r.pts} points once (results: ${r.breakdown})`);
ok(r.morale.every(m => m <= 90 - N.morale) && r.capped.every(m => m <= N.low), `owners' morale ${r.morale.join(', ')}, then capped at ${r.capped.join(', ')}`);
ok(r.crown.state === 'play' && r.crown.pts === 8 && r.crown.side, 'the Crown taken: 8 points, the battle goes on');
ok(r.floor.every(m => m >= N.crownFloor), `the Crown's side's morale floor: ${r.floor.join(', ')}`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
