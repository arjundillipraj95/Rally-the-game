// DUEL4: Devi after a duel. In a duel she fights close with two arrows as daggers (C4g); when it ends (won, drawn,
// broken) she must be back to her bow: Attack shoots arrows again, the bow in her hand, her bow clips.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=devi&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const rig = () => page.evaluate(async () => { const Rg = await import('/src/render/rig/cliprig.js'), h = window.__live.get(window.__fb.G.player); if (!h) return { err: 'no rig' }; if (!h.cg) return { err: 'no gear', clip: !!h.R && !!h.R.clip, keys: Object.keys(h).join() }; const e = Rg.head(h.R, 'lo'); return { bowHand: !!h.cg.bow.visible, daggers: !!(h.cg.arrow2 && h.cg.arrow2.visible), lo: e ? e.C.name || (e.act.getClip().name) : '' }; });
// one battle: a duel ended by a draw, then by the clock, then won (the foe beaten)
for (const why of ['draw', 'time', 'win']) {
  const o = await page.evaluate(async why => {
    const F = window.__fb, G = F.G, me = G.myTi, p = G.player, r = { why };
    const Du = await import('/src/core/sim/duel.js'), Rg = await import('/src/core/sim/ranged.js');
    const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me] && G.teams[i].active), L = G.teams[foe].leader;
    for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead);
    for (const s of G.teams) { const c = s.leader; if (c && c !== p && c !== L) { c.x = 150; c.z = -150; } }
    for (const c of [p, L]) { c.dead = false; c.marchT = 0; c.iframeT = 0; c.dueled = false; c.duelAskT = 0; c.mounted = false; c.horseCd = 99; c.vx = c.vz = 0; c.hp = c.max = 1e4; c.stun = 0; c.cd = 0; }
    p.x = -10; p.z = 10; p.face = Math.PI / 2; L.x = -4; L.z = 10; L.face = -Math.PI / 2;
    F.step(1, 1 / 30, true); F.duel(); const d = G.duels[0]; if (!d) return { err: 'no offer' }; d.aiYes = true;
    for (let i = 0; i < 90 && d.state !== 'on'; i++) F.step(1, 1 / 30, true);
    r.on = d.state === 'on'; r.inDuel = p.duelId === d.id;
    return r;
  }, why);
  await frames(page, 8);
  const inD = await rig(); // (the daggers' look, while it is on)
  const o2 = await page.evaluate(async why => {
    const F = window.__fb, G = F.G, me = G.myTi, p = G.player, r = {};
    const Du = await import('/src/core/sim/duel.js'), Rg = await import('/src/core/sim/ranged.js');
    const d = G.duels[0]; if (!d) return { err: 'gone' }; const L = d.a === p ? d.b : d.a;
    if (why === 'draw') Du.endDuel(d, 'draw'); else if (why === 'time') d.t = .05; else Du.endDuel(d, 'win', p);
    for (let i = 0; i < 60 && (G.duels || []).includes(d); i++) F.step(1, 1 / 30, true);
    r.ended = !(G.duels || []).includes(d); r.end = d.end; r.duelId = p.duelId;
    // standing still, a foe 10 m off: her shots are arrows
    for (let i = 0; i < 30; i++) F.step(1, 1 / 30, true);
    let n = 0; const h0 = L.hp;
    for (let i = 0; i < 90; i++) { L.x = p.x + 10; L.z = p.z; L.vx = L.vz = 0; L.windup = 1e9; p.vx = p.vz = 0; if (p.cd <= 0 && p.stun <= 0 && Rg.rangedShot(p)) n++; F.step(1, 1 / 30, true); }
    r.shots = n; r.hurt = Math.round(h0 - L.hp); p.vx = p.vz = 0;
    return r;
  }, why);
  await frames(page, 30);
  const out = await rig();
  console.log(why, JSON.stringify(o), JSON.stringify(o2), 'in', JSON.stringify(inD), 'out', JSON.stringify(out));
  ok(!o.err && o.on && o.inDuel, `${why}: the duel came on ${o.err || ''}`);
  ok(inD.daggers && !inD.bowHand, `${why}: in it, the bow on her back and an arrow in each fist (${inD.lo})`);
  ok(o2.ended && !o2.duelId, `${why}: the duel ended (${o2.end})`);
  ok(o2.shots >= 2 && o2.hurt > 0, `${why}: after it she shoots: ${o2.shots} shots, ${o2.hurt} damage`);
  ok(out.bowHand && !out.daggers && /^bow/.test(out.lo), `${why}: after it, the bow in her hand and a bow clip playing, standing still (${out.lo})`);
}
await browser.close();
console.log(fails ? `${fails} FAILED` : 'all ok'); process.exit(fails ? 1 : 0);
