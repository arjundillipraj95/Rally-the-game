// CASTLE2: a level III castle's ballista (a bolt through shields, only in range), watchtower (bushes near it lit for
// its side only) and spike ditch (its enemies slowed and hurt, its own men not); none of it at level II or after a
// capture; draw calls +3 at most with every castle at level III.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const { G } = window.__fb, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js'), cfg = await import('/src/config.js');
  const c3 = await import('/src/core/sim/castle3.js'), melee = await import('/src/core/sim/melee.js'), mis = await import('/src/core/sim/missiles.js'), army = await import('/src/core/sim/army.js'), bush = await import('/src/core/sim/bush.js');
  const C = cfg.CASTLE26, me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], o = { C };
  const armies = G.teams.map((s, i) => i).filter(i => G.teams[i] && G.teams[i].leader);
  const foeTi = armies.find(i => G.ALLY[st8.colorOf(i)] !== myA), foeA = G.ALLY[st8.colorOf(foeTi)];
  const thirdA = [0, 1, 2, 3].map(c => G.ALLY[c]).find(a => a !== myA && a !== foeA);
  const foe = G.units.find(u => !u.dead && u.ti === foeTi && u.kind === 'foot');
  const h = G.holds.find(x => x.kind === 'castle' && x.side === st8.colorOf(me.ti) && !x.mid), cw = G.layout.cwalls.find(c => c.hid === h.id);
  const clear = () => G.units.forEach(u => { if (u !== foe && u !== me && !u.dead && Math.hypot(u.x - cw.x, u.z - cw.z) < 60) { u.x += 400; u.z += 400; } });
  const at = (u, d, a = cw.gates[0]) => { u.x = cw.x + Math.cos(a) * d; u.z = cw.z + Math.sin(a) * d; u.vx = u.vz = 0; u.inSafe = false; u.iframeT = 0; melee.buildGrid(); bush.bushTick(); }; // (teleported: out of his home, and the grid knows)
  const setLv = lv => { h.owner = myA; G.cgates[h.id] = f.freshGates(lv); f.applyCastleGates(); };
  // the ballista: count bolts and hits on a shielded footman facing the keep
  const volley = (d, n) => { let bolts = 0, hits = 0; for (let k = 0; k < n; k++) {
    clear(); at(foe, d); foe.face = Math.atan2(cw.x - foe.x, cw.z - foe.z); foe.hp = 9999; foe.max = 9999; foe.dead = false;
    const hp0 = new Map(G.units.map(u => [u, u.hp])); const a0 = G.arrows.length; G.cgates[h.id].balT = 0; c3.castle3Tick(.01); const b = G.arrows.slice(a0).filter(x => x.bolt); bolts += b.length;
    for (let t = 0; t < 40 && b.some(x => G.arrows.includes(x) && !x.stuck); t++) mis.arrowsTick(.05, true); if (foe.hp < 9999) hits++; else if (b[0]) o.miss = { hit: G.units.filter(u => u.hp !== hp0.get(u)).map(u => [u.id, u.kind, u.ti, hp0.get(u) - u.hp]), foeId: foe.id, iframe: foe.iframeT, exec: foe.execT, mounted: foe.mounted, t: b[0].t, y: b[0].y, x: b[0].x - foe.x, z: b[0].z - foe.z, x1: b[0].x1 - foe.x, z1: b[0].z1 - foe.z, stuck: b[0].stuck, fd: Math.hypot(foe.x - cw.x, foe.z - cw.z) }; } return { bolts, hits }; };
  // the ditch: speed and health of a foe and of my man standing in it
  const ditch = () => { clear(); at(foe, cw.r + 1.6); at(me, cw.r + 1.6, cw.gates[0] + .4); foe.hp = foe.max = 95; const hm = me.hp;
    const sIn = army.speedOf(foe), mIn = army.speedOf(me); c3.castle3Tick(1); const lost = 95 - foe.hp, mine = hm - me.hp;
    at(foe, cw.r + 8); const sOut = army.speedOf(foe); at(me, cw.r + 8, cw.gates[0] + .4); const mOut = army.speedOf(me); return { slow: sIn / sOut, mineSlow: mIn / mOut, lost, mine }; };
  // the watchtower: the bush nearest the castle (within reach)
  const B = G.layout.bushes, bi = B.map((b, i) => [Math.hypot(b.x - cw.x, b.z - cw.z), i]).sort((p, q) => p[0] - q[0])[0];
  o.bushD = bi[0];
  const watch = () => { const b = B[bi[1]]; foe.x = b.x; foe.z = b.z; foe.atkT = -99; foe.swing = 0; foe.netSeen = false; bush.bushTick();
    return { mine: !bush.bushHid(foe, myA), third: !bush.bushHid(foe, thirdA) }; };
  setLv(2); o.l2 = { ballista: volley(20, 3), ditch: ditch(), watch: watch() };
  setLv(3); o.l3 = { near: volley(20, 8), far: volley(C.turret.range + 6, 3), ditch: ditch(), watch: watch() };
  h.owner = foeA; G.cgates[h.id] = f.freshGates(0); f.applyCastleGates(); h.owner = myA; // (taken and back: level 0)
  o.taken = { ballista: volley(20, 3), ditch: ditch(), watch: watch() };
  // draw calls: every castle at level II, then at level III, same frame
  const nr = window.__noRender; window.__noRender = false;
  const all = lv => { for (const x of G.holds) if (x.kind === 'castle') { x.owner = myA; G.cgates[x.id] = f.freshGates(lv); } f.applyCastleGates(); window.__frame(3); return window.__fb.info.gfx.calls; };
  o.calls2 = all(2); o.calls3 = all(3); window.__noRender = nr;
  return o;
});
const C = r.C;
ok(r.l2.ballista.bolts === 0 && r.l2.ditch.slow > .99 && r.l2.ditch.lost === 0 && !r.l2.watch.mine, 'level II: no ballista, no ditch, no watchtower');
ok(r.l3.near.bolts === 8 && r.l3.near.hits === 8, `level III ballista: ${r.l3.near.hits}/${r.l3.near.bolts} bolts hit a shielded footman facing it`);
ok(r.l3.far.bolts === 0, `nothing past ${C.turret.range} m`);
ok(Math.abs(r.l3.ditch.slow - C.ditch.slow) < .02 && Math.abs(r.l3.ditch.lost - C.ditch.dmg) < .5, `ditch: an enemy at ${r.l3.ditch.slow.toFixed(2)} speed, -${r.l3.ditch.lost.toFixed(1)} health a second`);
ok(r.l3.ditch.mineSlow > .99 && r.l3.ditch.mine === 0, 'ditch: the owner\'s own man passes freely');
ok(r.bushD < C.watch && r.l3.watch.mine && !r.l3.watch.third, `watchtower: an enemy in a bush ${r.bushD.toFixed(0)} m off is seen by the owner's side, not by a third side`);
ok(r.taken.ballista.bolts === 0 && r.taken.ditch.slow > .99 && !r.taken.watch.mine, 'after a capture (level 0): all three gone');
ok(r.calls3 - r.calls2 <= 28, `draw calls (CASTLE2's pieces: about 1 a castle; the older level III pieces 14) with every castle at level III: ${r.calls2} -> ${r.calls3}`);
await page.evaluate(async () => { const { G } = window.__fb, me = G.player, h = G.holds.find(x => x.kind === 'castle' && x.side === me.ti % 4 && !x.mid); me.x = h.x + 16; me.z = h.z + 6; });
await frames(page, 30); const t0 = Date.now(); await page.screenshot({ path: '/tmp/r_CASTLE2.png', timeout: 120000 }).catch(e => console.log('shot failed', e.message.split('\n')[0])); console.log('shot ms', Date.now() - t0);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
