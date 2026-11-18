// PULL1 the pull down: an enemy rider galloping past within reach; Attack on the beat pulls him off (the horse bolts
// unhurt, he's hurt and down); pressed early it's just a swing; a Raider stays on for a near-miss but comes off on the
// beat; a walking horse can't be pulled; a computer captain catches it.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, sim = await import('/src/core/sim.js'), CP = await import('/src/core/sim/captain.js'), PD = await import('/src/core/sim/pulldown.js'), CH = await import('/src/champions/index.js');
  G.T = 40; F.step(1); const me = G.myTi, p = G.player, r = {};
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader, T = CH.champOf(e), cls0 = T.cls;
  for (const u of G.units) if (!u.dead && u !== p && u !== E && Math.hypot(u.x - p.x, u.z - p.z) < 30) { if (u.leader) { u.x += 70; u.z += 70; } else { u.dead = true; u.hp = 0; } }
  // she gallops past him on a line 1.4 m to his side, at `spd` m/s; press Attack `at` s before her closest pass
  const pass = (spd, at) => {
    p.cd = 0; p.stun = 0; p.swing = 0; p.pending = null; p.mounted = false; E.dead = false; E.hp = E.max; E.stun = 0; E.iframeT = 0; E.armour = 0; E.shieldT = 0;
    E.mounted = true; E.horse = { state: 'ridden', x: E.x, z: E.z }; E.horseHp = 200; E.horseCd = 0;
    const f = p.face, fx = Math.sin(f), fz = Math.cos(f), sx = Math.cos(f), sz = -Math.sin(f);
    let d = -spd * 1.2; const h0 = E.hp, H = E.horse; let pressed = false;
    for (let i = 0; i < 80; i++) {
      E.x = p.x + fx * d + sx * 1.4; E.z = p.z + fz * d + sz * 1.4; E.vx = fx * spd; E.vz = fz * spd; E.face = f;
      E.cd = 9; E.rideReady = false; if (!pressed && -d / spd <= at + .25 + 1e-6) { pressed = true; CP.captainAttack(p); }
      if (!E.mounted) break;
      p.x0 = p.x; F.step(1); d += spd / 30;
    }
    return { off: !E.mounted, horse: H.state, hurt: +(h0 - E.hp).toFixed(1), stun: +E.stun.toFixed(2), hp: E.horseHp };
  };
  r.beat = pass(9, 0); F.step(40);
  r.early = pass(9, .5); F.step(40);
  T.cls = 'raider'; r.raiderNear = pass(9, .15); F.step(40); r.raiderBeat = pass(9, 0); T.cls = cls0; F.step(40);
  r.slow = pass(2, 0); F.step(40);
  // a computer captain on foot: E2 (her ally? no: his enemy) stands, p rides past him
  const rnd = Math.random; Math.random = () => 0;
  E.mounted = false; E.x = p.x; E.z = p.z + 0; p.x += 40;
  p.mounted = true; p.horse = { state: 'ridden', x: p.x, z: p.z }; p.horseHp = 200; E.cd = 0; E.stun = 0;
  const f = E.face, fx = Math.sin(f), fz = Math.cos(f); let pulled = false;
  for (let i = -30; i < 30 && !pulled; i++) { p.x = E.x + fx * i * .3 + Math.cos(f) * 1.4; p.z = E.z + fz * i * .3 - Math.sin(f) * 1.4; p.vx = fx * 9; p.vz = fz * 9; pulled = PD.aiPull(E) || !p.mounted; }
  Math.random = rnd; r.ai = pulled && !p.mounted;
  return r; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(o));
ok(o.beat.off && o.beat.horse === 'leaving' && o.beat.hp === 200 && o.beat.hurt > 5 && o.beat.stun > .4, `on the beat: pulled down (horse ${o.beat.horse}, unhurt), ${o.beat.hurt} dmg, down ${o.beat.stun} s`);
ok(!o.early.off, 'pressed half a second early: still mounted');
ok(!o.raiderNear.off && o.raiderBeat.off, 'a Raider: stays on for a near-miss, comes off on the beat');
ok(!o.slow.off, 'a walking horse: no pull');
ok(o.ai, 'a computer captain catches it');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
