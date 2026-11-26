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

ok(!errs.length, 'no page errors', errs.slice(0, 2));
console.log(fails ? `${fails} FAILED` : 'ALL PASS');
await browser.close();
process.exit(fails ? 1 : 0);
