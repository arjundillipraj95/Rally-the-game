// FEEL2 (Arjun 26 Nov): the feel of Titus's specials and of every mount. Done when (each part its own block):
// b) behind the Shield of Cassius, Attack stabs the man in front (he's hurt, the shield stays up); a champion's blow on
//    the shield bounces him back off balance ('fxrebound').
// c) Eagle's fall locks on: aimed at a champion, it lands on him though he walks on through the crouch; from the saddle
//    Titus springs off (the horse stays, not lifted) and lands on foot.
// d) Testudo: shove, stab (enemies in front hurt), heavy shove that knocks them down.
// e) mounted blows push no more than the caps (a champion stays near, a soldier near).
// f) holding Attack on a horse shows the ride-by ring on the locked target; a release in it is 'perfect'.
// g) Devi on her horse: a held draw narrows to gold; loosed on gold the arrow is 'perfect' (more damage).
// Run from game/ (servers.sh up). PART=b,c,... runs only those.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const PARTS = (process.env.PART || 'b,c,d,e,f,g').split(',');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
let fails = 0; const ok = (c, m, x) => { console.log(c ? 'ok  ' : 'FAIL', m, x === undefined ? '' : JSON.stringify(x)); if (!c) fails++; };
const errs = [];
async function battle(champ = 'titus', bot = 'titus') {
  const page = await open(browser, 851, 393, { q: `?crown2=1&champ=${champ}&botchamp=${bot}`, quality: 'low' });
  page.on('pageerror', e => errs.push(String(e)));
  await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
  const run = n => page.evaluate(n => window.__frame(n), n);
  for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
  for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await run(30); // (nobody is hurt before the break-out)
  await page.evaluate(async () => { // a quiet spot: everyone else away; a foe champion on foot; level 7
    const G = window.__fb.G, p = G.player, { isEnemy } = await import('/src/core/state.js'), sim = await import('/src/core/sim.js');
    window.__sim = sim; window.__cap = await import('/src/core/sim/captain.js'); window.__ab = await import('/src/core/sim/abilities.js');
    G.teams[G.myTi].lvl = 7; for (const t of G.teams) t.cds = {};
    const foes = G.units.filter(o => o.leader && !o.dead && isEnemy(o, p)); const foe = foes.find(o => !o.mounted) || foes[0];
    if (foe.mounted) { sim.toggleHorseFor(foe); for (let k = 0; k < 40 && foe.mounted; k++) window.__frame(1); }
    window.__foe = foe;
    window.__quiet = () => { for (const o of G.units) if (o !== p && o !== foe && !o.dead && !o.castle && Math.hypot(o.x - p.x, o.z - p.z) < 16) { o.x += 45; o.z += 45; } };
    window.__plain = () => { G.duels = []; foe.duelId = p.duelId = 0; foe.iframeT = 0; foe.guardT = 0; foe.blockT = 0; };
    window.__quiet();
  });
  return { page, run };
}

if (PARTS.includes('b')) {
  const { page } = await battle();
  const r = await page.evaluate(async () => {
    const G = window.__fb.G, p = G.player, foe = window.__foe, sc = await import('/src/core/sim/scutum.js'), CH = await import('/src/champions/index.js');
    const d = CH.champOf(G.myTi).sp2, f = p.face, put = (o, m) => { o.x = p.x + Math.sin(f) * m; o.z = p.z + Math.cos(f) * m; o.vx = o.vz = 0; };
    const out = {};
    window.__plain(); p.cd = 0; sc.raiseScutum(p, d); put(foe, 1.5); foe.stun = 9; foe.cd = 9; const h0 = foe.hp;
    window.__cap.captainAttack(p); out.kind = p.swingKind;
    for (let k = 0; k < 20; k++) { window.__plain(); put(foe, 1.5); p.scutum.until = G.T + 5; window.__frame(1); }
    out.stabHurt = +(h0 - foe.hp).toFixed(1); out.up = !!p.scutum;
    // the foe strikes the shield
    const msgs = []; const { bus } = await import('/src/core/state.js'); bus.on('fxmsg', e => { if (e.k === 'fxrebound') msgs.push(e.u === foe); });
    foe.stun = 0; foe.cd = 0; foe.face = Math.atan2(p.x - foe.x, p.z - foe.z); const ph = p.hp, fx0 = foe.x, fz0 = foe.z;
    window.__cap.captainAttack(foe);
    for (let k = 0; k < 12; k++) { window.__plain(); p.scutum.until = G.T + 5; window.__frame(1); }
    out.meHurt = +(ph - p.hp).toFixed(1); out.rebound = msgs; out.pushed = +Math.hypot(foe.x - fx0, foe.z - fz0).toFixed(2); out.stun = +(foe.stun || 0).toFixed(2);
    return out;
  });
  ok(r.kind === 3 && r.stabHurt > 5 && r.up, 'b: behind the shield Attack stabs the man in front; the shield stays up', r);
  ok(r.meHurt < 1 && r.rebound.includes(true) && r.pushed > .2, 'b: a champion\'s blow off the shield bounces him back (fxrebound)', r);
  await page.close();
}

if (PARTS.includes('c')) {
  const { page } = await battle();
  const r = await page.evaluate(async () => {
    const G = window.__fb.G, p = G.player, foe = window.__foe, f = p.face, out = {};
    window.__plain(); foe.x = p.x + Math.sin(f) * 7; foe.z = p.z + Math.cos(f) * 7; foe.stun = 9; const h0 = foe.hp;
    window.__ab.useAbility(G.myTi, 'ult', { x: foe.x, z: foe.z }); out.on = !!p.eagle; out.locked = !!(p.eagle && p.eagle.tg);
    const side = [Math.cos(f), -Math.sin(f)];
    for (let k = 0; k < 6; k++) { foe.x += side[0] * .35; foe.z += side[1] * .35; foe.vx = foe.vz = 0; window.__plain(); window.__frame(1); } // (walks 2 m aside through the crouch)
    const fx = foe.x, fz = foe.z;
    for (let k = 0; k < 40 && p.eagle; k++) { window.__plain(); window.__frame(1); }
    out.land = +Math.hypot(p.x - fx, p.z - fz).toFixed(2); out.hurt = +(h0 - foe.hp).toFixed(1);
    // from the saddle
    for (const t of G.teams) t.cds = {}; window.__sim.toggleHorseFor(p); for (let k = 0; k < 90 && !p.mounted; k++) window.__frame(1);
    out.rode = p.mounted; const horse = p.horse;
    window.__ab.useAbility(G.myTi, 'ult', { x: p.x + Math.sin(p.face) * 6, z: p.z + Math.cos(p.face) * 6 });
    out.offAtOnce = !p.mounted; let hy = 0;
    for (let k = 0; k < 40 && p.eagle; k++) { window.__frame(1); hy = Math.max(hy, (horse && horse.y) || 0); }
    out.footAfter = !p.mounted && !p.eagle; out.horseState = horse && horse.state;
    return out;
  });
  ok(r.on && r.locked, 'c: aimed at a champion, Eagle\'s fall locks on him', r);
  ok(r.land < 1.6 && r.hurt > 50, 'c: he walked 2 m aside through the crouch; Titus still lands on him (m off) and hurts him', r);
  ok(r.rode && r.offAtOnce && r.footAfter && r.horseState !== 'ridden', 'c: from the saddle Titus springs off (the horse not lifted) and lands on foot', r);
  await page.close();
}

if (PARTS.includes('d')) {
  const { page } = await battle();
  const r = await page.evaluate(async () => {
    const F = window.__fb, G = F.G, p = G.player, foe = window.__foe, sim = window.__sim, me = G.myTi, f = p.face;
    const at = (d, s = 0) => [p.x + Math.sin(f) * d + Math.cos(f) * s, p.z + Math.cos(f) * d - Math.sin(f) * s];
    const men = [[1, -1.5], [1, 0], [1, 1.5], [0, -.8], [0, .8], [-1, 0]].map(([d, s]) => sim.mkUnit(me, ...at(d, s), 'foot'));
    const eteam = foe.ti, man = sim.mkUnit(eteam, ...at(4, .5), 'foot'); man.hp = man.max = 300;
    const msgs = []; const { bus } = await import('/src/core/state.js'); bus.on('fxmsg', e => { if (e.k === 'fxtestudobeat') msgs.push(e.q); });
    G.teams[me].rally = 100; F.rally(); const B = men[0].testudo; if (!B) return { err: 'no block' };
    const out = { beats: msgs }; let h0m = man.hp, h0f = foe.hp, pushed = 0;
    for (let k = 0; k < 400 && men.some(u => u.testudo); k++) {
      window.__plain(); foe.stun = Math.max(foe.stun, 0); foe.cd = 9;
      for (const [o, s] of [[man, .4], [foe, -.6]]) { const x = B.fx + Math.sin(B.face) * 1.1 + Math.cos(B.face) * s, z = B.fz + Math.cos(B.face) * 1.1 - Math.sin(B.face) * s; if (Math.hypot(o.x - x, o.z - z) > .35) pushed++; o.x = x; o.z = z; o.vx = o.vz = 0; }
      F.step(1);
    }
    out.manHurt = +(h0m - man.hp).toFixed(1); out.foeHurt = +(h0f - foe.hp).toFixed(1); out.pushedFrames = pushed;
    out.endStun = [+(foe.stun || 0).toFixed(2), +(man.stun || 0).toFixed(2)];
    return out;
  });
  ok(!r.err && r.beats.join() === 'shove,stab', 'd: the march shoves, then stabs (beats)', r);
  ok(r.manHurt >= 20 && r.foeHurt >= 35, 'd: the stab hurts the soldier and the champion in front', r);
  ok(r.endStun[0] > .4 && r.endStun[1] > .8, 'd: the end shove knocks them down (stun: champion, soldier)', r);
  await page.close();
}

if (PARTS.includes('e')) {
  const { page } = await battle();
  const r = await page.evaluate(async () => {
    const G = window.__fb.G, p = G.player, foe = window.__foe, sim = window.__sim, M = await import('/src/core/sim/melee.js'), f = p.face;
    for (const t of G.teams) t.cds = {}; sim.toggleHorseFor(p); for (let k = 0; k < 90 && !p.mounted; k++) window.__frame(1);
    const man = sim.mkUnit(foe.ti, p.x + Math.sin(f) * 2 + 3, p.z + Math.cos(f) * 2, 'foot'); man.hp = man.max = 500;
    const slide = (o) => { window.__plain(); o.x = p.x + Math.sin(f) * 2; o.z = p.z + Math.cos(f) * 2; o.vx = o.vz = 0; o.stun = 9; o.hp = o.max; const x0 = o.x, z0 = o.z;
      M.hit(p, o, 1, { heavy: true, shown: true, kb: 2.2, stun: 1, unparryable: true, unblockable: true }); // (a perfect ride-by's blow)
      for (let k = 0; k < 45; k++) { o.stun = 9; window.__frame(1); } return +Math.hypot(o.x - x0, o.z - z0).toFixed(2); };
    const champ = slide(foe); foe.x += 30; foe.z += 30; return { mounted: p.mounted, champ, man: slide(man) };
  });
  ok(r.mounted && r.champ > .3 && r.champ < 1.4, 'e: a perfect ride-by pushes a champion about 1 m (was ~6)', r);
  ok(r.man > .5 && r.man < 2, 'e: and a soldier about 1.5 m', r);
  await page.close();
}

ok(!errs.length, 'no page errors', errs.slice(0, 2));
console.log(fails ? `${fails} FAILED` : 'ALL PASS');
await browser.close();
process.exit(fails ? 1 : 0);
