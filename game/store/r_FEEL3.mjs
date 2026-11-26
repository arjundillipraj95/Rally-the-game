// FEEL3 (Arjun 26 Nov): block, parry, blade clash, computers' guard and the finisher only inside a duel.
// Done when: outside a duel a computer captain on guard takes the blow, a player's Block press or held Block turns
// nothing, a champion's arrow block never happens, a beaten captain is never marked for the finisher and a
// computer never raises his guard; inside a duel all of these still work. Run from game/.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 851, 393, { q: '?crown2=1&champ=titus&botchamp=titus', quality: 'low' });
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
for (let k = 0; k < 40 && (await page.evaluate(() => window.__fb.G.T)) < 16; k++) await run(30); // (after the break-out)
let fails = 0; const ok = (c, m, x) => { console.log(c ? 'ok  ' : 'FAIL', m, x === undefined ? '' : JSON.stringify(x)); if (!c) fails++; };

const r = await page.evaluate(async () => {
  const G = window.__fb.G, p = G.player, { isEnemy, bus } = await import('/src/core/state.js');
  const melee = await import('/src/core/sim/melee.js'), guard = await import('/src/core/sim/guard.js'), duel = await import('/src/core/sim/duel.js');
  const foe = G.units.find(o => o.leader && !o.dead && isEnemy(o, p));
  if (!foe) return { err: 'no foe' };
  const msgs = []; bus.on('fxmsg', d => msgs.push(d.k));
  const stage = () => { for (const u of [p, foe]) { u.mounted = false; u.stun = 0; u.hp = u.max; u.iframeT = 0; u.armour = 0; u.st = 100; u.execT = 0; u.execA = u.execV = false; u.pending = null; u.windup = 0; u.cd = 0; }
    foe.x = p.x + Math.sin(p.face) * 1.6; foe.z = p.z + Math.cos(p.face) * 1.6; foe.face = p.face + Math.PI; };
  const inDuel = on => { G.duels = G.duels || []; G.duels.length = 0; p.duelId = foe.duelId = 0;
    if (on) { const d = { id: ++G.duelN, a: p, b: foe, state: 'on', t: 99, graceT: 0, slotT: 0, t0: G.T, x: p.x, z: p.z }; G.duels.push(d); p.duelId = foe.duelId = d.id; } };
  const out = {};
  for (const on of [false, true]) {
    const k = on ? 'in' : 'out'; out[k] = {};
    // 1. a computer captain on guard, struck by your captain: parried / blocked, or the blow lands
    let parried = 0, landed = 0;
    for (let i = 0; i < 20; i++) { inDuel(on); stage(); foe.guardT = 5; foe.blockT = 0; msgs.length = 0; const h0 = foe.hp; melee.hit(p, foe, 1); if (msgs.includes('fxparry') || foe.hp > h0 - p.dmg * .5) parried++; else landed++; }
    out[k].aiGuard = { parried, landed };
    // 2. your Block press opens a parry window
    inDuel(on); stage(); p.parryT = -9; p.lastBlkPress = -9; guard.blockPress(p); out[k].parryWindow = p.parryT === G.T;
    // 3. a blow on you just after the press: parried or lands
    inDuel(on); stage(); p.parryT = G.T; p.blocking = false; msgs.length = 0; let h0 = p.hp; melee.hit(foe, p, 1); out[k].parried = msgs.includes('fxparry') && p.hp >= h0 - .01;
    // 5. the finisher mark on a beaten foe
    inDuel(on); stage(); foe.hp = foe.max * .05; for (const u of G.units) if (!u.leader && !isEnemy(u, foe) && Math.hypot(u.x - foe.x, u.z - foe.z) < 12) { u.x += 40; }
    duel.execMark(); out[k].finisher = !!foe.execReady;
  }
  inDuel(false); foe.hp = foe.max; foe.stun = 0;
  return out;
});
console.log(JSON.stringify(r));
ok(!r.err, 'a foe captain to test on', r.err);
ok(r.out.aiGuard.landed === 20, 'outside a duel a computer on guard never turns your blow (landed of 20)', r.out.aiGuard);
ok(r.in.aiGuard.parried > 0, 'inside a duel his guard still turns blows', r.in.aiGuard);
ok(!r.out.parryWindow, 'outside a duel a Block press opens no parry window');
ok(r.in.parryWindow, 'inside a duel a Block press opens the parry window');
ok(!r.out.parried, 'outside a duel a blow just after a Block press lands');
ok(r.in.parried, 'inside a duel it is parried');
ok(!r.out.finisher, 'outside a duel a beaten captain is never marked for the finisher');
ok(r.in.finisher, 'inside a duel he is');

// 7. computers never raise their guard outside a duel: a computer captain beside yours, 15 s of battle
const g = await page.evaluate(async () => {
  const G = window.__fb.G, p = G.player, { isEnemy } = await import('/src/core/state.js');
  G.duels = []; p.duelId = 0; let guardFrames = 0, near = 0, blocks = 0;
  const foes = G.units.filter(o => o.leader && !o.dead && isEnemy(o, p));
  for (let f = 0; f < 450; f++) {
    for (const o of foes) if (!o.dead && !o.duelId) { if (f % 30 === 0) { o.x = p.x + 3; o.z = p.z + 1; o.mounted = false; } if (o.guardT > 0) guardFrames++; if (Math.hypot(o.x - p.x, o.z - p.z) < 7) near++; }
    p.hp = p.max; G.duels = []; for (const u of G.units) u.duelId = 0;
    window.__frame(1);
  }
  return { guardFrames, near };
});
ok(g.near > 100 && g.guardFrames === 0, 'outside a duel computer captains next to you never guard (frames on guard)', g);
ok(errs.length === 0, 'no page errors', errs.slice(0, 3));
console.log(fails ? `${fails} FAILED` : 'ALL PASS');
await browser.close(); process.exit(fails ? 1 : 0);
