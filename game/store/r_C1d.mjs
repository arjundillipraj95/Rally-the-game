// C1d: health as shares of an infantryman and the counter rule. Hits to kill, counted with the rules' own hit() (C1g: a champion hits 30 of a man's 100: footman 4, 3 from behind; champion 14, 9 from behind)
// and arrow code (random spread pinned to the middle), against the design's table; and castle gates still fall as
// fast as before (a blow's damage on a gate, old numbers vs new).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
const out = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), mel = await import('/src/core/sim/melee.js'), cfg = await import('/src/config.js');
  G.T = 30; G.diff = 1; F.step(1);
  for (const u of G.units) { u.x = 300 + u.id; u.z = 300; u.path = null; }
  const real = Math.random; Math.random = () => .5; // (rnd(.8, 1.2) = 1; no block or head rolls)
  const fresh = (ti, kind, x, face) => { const u = F.mkUnit(ti, x, 0, kind); u.face = face; u.iframeT = 0; u.marchT = 0; return u; };
  const reset = (a, b) => { a.x = -1; a.z = 0; b.x = 0; b.z = 0; a.vx = a.vz = b.vx = b.vz = 0; b.stun = 0; b.guardT = 0; b.guardUp = false; b.blockT = 0; a.iframeT = b.iframeT = 0; };
  // a blow by kind ka (team 1) on kind kb (team 2); back: b faces away; mounted: b on a horse (the horse's hits)
  function blows(ka, kb, o = {}) {
    const a = fresh(3, ka, -1, Math.PI / 2), b = fresh(1, kb, 0, o.back ? Math.PI / 2 : -Math.PI / 2);
    if (o.tier) { a.tier = o.tier; a.dmg = cfg.FOOT_TIERS[o.tier].dmg; }
    if (o.mounted) { b.mounted = true; b.horse = { state: 'ridden' }; b.horseHp = sim.horseMax(1); }
    let n = 0; for (; n < 60; n++) { reset(a, b); mel.hit(a, b); if (o.mounted ? !b.mounted || b.horseHp <= 0 : b.hp <= 0 || b.dead) { n++; break; } }
    a.dead = b.dead = true; return n;
  }
  function arrows(kb) {
    const sh = fresh(3, 'arch', -15, Math.PI / 2), b = fresh(2, kb, 0, Math.PI / 2); let n = 0;
    for (; n < 60; n++) { reset(sh, b); sh.x = -15; G.arrows.push(sim.makeArrow({ id: ++G.arrowN, x0: -15, y0: 1, z0: 0, x1: 0, z1: 0, y1: 1, dur: .01, peak: 0, ti: 3, t: 0, shooter: sh }));
      F.step(1); if (b.hp <= 0 || b.dead) { n++; break; } }
    sh.dead = b.dead = true; return n;
  }
  const r = {
    footFoot: blows('foot', 'foot'), champFoot: blows('captain', 'foot'), champFootBack: blows('captain', 'foot', { back: true }),
    footArch: blows('foot', 'arch'), champArch: blows('captain', 'arch'),
    footChamp: blows('foot', 'captain'), champChamp: blows('captain', 'captain'), champChampBack: blows('captain', 'captain', { back: true }),
    footHorse: blows('foot', 'captain', { mounted: true }), spearHorse: blows('foot', 'captain', { mounted: true, tier: 1 }), champHorse: blows('captain', 'captain', { mounted: true }),
    arrowFoot: arrows('foot'), arrowArch: arrows('arch'),
    hp: { foot: cfg.STATS.foot.hp, arch: cfg.STATS.arch.hp, champ: Math.round(sim.horseMax ? F.mkUnit(1, 400, 400, 'captain').max : 0), horse: Math.round(sim.horseMax(1)) },
    gate: { soldier: cfg.STATS.foot.dmg * cfg.FORT.wallDmg, champ: cfg.STATS.captain.dmg * cfg.FORT.wallDmg * cfg.FORT.capWall },
  };
  Math.random = real; return r;
});
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(out.hp));
const want = [['footFoot', 5], ['champFoot', 4], ['champFootBack', 3], ['footArch', 3], ['champArch', 2], ['footChamp', 20], ['champChamp', 14], ['champChampBack', 9], ['footHorse', 10], ['spearHorse', 8], ['champHorse', 7], ['arrowFoot', 9], ['arrowArch', 6]];
for (const [k, n] of want) ok(out[k] === n, `${k}: ${out[k]} hits (design ${n})`);
// before C1d: a footman 13 x .7 on a gate, a player captain 30 x .7 x 1.4
ok(Math.abs(out.gate.soldier / (13 * .7) - 1) < .1, `a soldier's blow on a gate ${out.gate.soldier.toFixed(1)} (was 9.1)`);
ok(Math.abs(out.gate.champ / (30 * .7 * 1.4) - 1) < .1, `a champion's blow on a gate ${out.gate.champ.toFixed(1)} (a player's was 29.4)`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
