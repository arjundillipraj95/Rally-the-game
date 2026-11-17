// CASTLE6: holding a castle: points (middle 5, outer 3), healing in its yard (none with an enemy in it), and its Crown
// shard to the first side to take it (a horn top-up); breaking a nexus moves up to 2 shards.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, st8 = await import('/src/core/state.js'), cfg = await import('/src/config.js');
  const c2 = await import('/src/core/sim/crown2.js'), hd = await import('/src/core/sim/holding.js'), cap = await import('/src/core/sim/capture.js');
  const H = cfg.CASTLE26.hold, me = G.player, c = st8.colorOf(me.ti), myA = G.ALLY[c], K = G.c2, o = { H };
  const foeTi = G.teams.findIndex((s, i) => s && s.leader && G.ALLY[st8.colorOf(i)] !== myA), foeA = G.ALLY[st8.colorOf(foeTi)], foe = G.teams[foeTi].leader;
  const mid = G.holds.find(h => h.kind === 'castle' && h.mid && h.side === c), outer = G.holds.find(h => h.kind === 'castle' && !h.mid && h.side === c);
  const own = (h, a) => { h.owner = a; }; own(mid, -1); own(outer, -1);
  const p0 = c2.c2Points(myA); own(mid, myA); const p1 = c2.c2Points(myA); own(outer, myA); const p2 = c2.c2Points(myA); o.pts = [p1 - p0, p2 - p1];
  // healing: a soldier of mine in the outer castle's yard
  const cw = G.layout.cwalls.find(q => q.hid === outer.id), sold = G.units.find(u => !u.dead && u.ti === me.ti && !u.leader);
  G.units.forEach(u => { if (!u.dead && Math.hypot(u.x - cw.x, u.z - cw.z) < cw.r + 2 && G.ALLY[st8.colorOf(u.ti)] !== myA) { u.x += 300; u.z += 300; } });
  sold.x = cw.x + 5; sold.z = cw.z; sold.hp = 30; outer.healT = 0; hd.holdingTick(H.healEvery); o.heal = sold.hp - 30;
  foe.x = cw.x - 5; foe.z = cw.z; foe.dead = false; sold.hp = 30; outer.healT = 0; hd.holdingTick(H.healEvery); o.healFoe = sold.hp - 30; foe.x += 300;
  // the shard: a neutral castle taken by my side, then by theirs
  const neu = G.holds.find(h => h.kind === 'castle' && h.side !== c && h.side !== st8.colorOf(foeTi)); neu.owner = -1; neu.shardBy = null; G.c2.breaks.filter(b => b.kind === 'guard' && b.hid === neu.id).forEach(b => { b.n = 0; });
  const mine = G.teams.map((s, i) => i).filter(i => G.teams[i] && G.teams[i].active && G.ALLY[st8.colorOf(i)] === myA); mine.forEach(i => { G.teams[i].rally = 0; });
  const s0 = (K.shards && K.shards[myA]) || 0; c2.c2Take(neu, myA, new Map([[me.ti, 1]]));
  o.shard = { by: neu.shardBy === myA, n: K.shards[myA] - s0, rally: mine.map(i => G.teams[i].rally) };
  const f0 = (K.shards && K.shards[foeA]) || 0; neu.shieldT = 0; c2.c2Take(neu, foeA, new Map([[foeTi, 1]])); o.shardLater = { by: neu.shardBy === myA, foeGain: (K.shards[foeA] || 0) - f0 };
  // a nexus broken: 2 shards move
  K.shards[myA] = 3; const f1 = K.shards[foeA] || 0; own(mid, foeA); const nb = K.breaks.find(b => b.kind === 'nexus' && b.c === c); let n = 0; while (nb.hp > 0 && n < 5000) { c2.c2Hit(foe, nb); n++; }
  o.nexus = { mine: K.shards[myA], foe: K.shards[foeA] - f1 };
  return o;
});
const H = r.H;
ok(r.pts[0] === H.pts.mid && r.pts[1] === H.pts.outer, `points held: middle +${r.pts[0]}, outer +${r.pts[1]}`);
ok(r.heal === H.heal && r.healFoe === 0, `healing in the yard: +${r.heal} per ${H.healEvery} s; with an enemy in it: +${r.healFoe}`);
ok(r.shard.by && r.shard.n === 1 && r.shard.rally.every(v => v === H.shardRally), `first to take it: the shard (+${r.shard.n}), horns +${r.shard.rally.join(', ')}`);
ok(r.shardLater.by && r.shardLater.foeGain === 0, 'a later taker gets no shard; the first side keeps it');
ok(r.nexus.mine === 1 && r.nexus.foe === H.nexusShards, `a nexus broken: ${H.nexusShards} shards move (left ${r.nexus.mine})`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
