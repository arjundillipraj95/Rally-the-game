// C3k what the Ram meets (agreed 18 Nov): a raised shield (he bounces, she slides unhurt), another ram head-on (both
// stop, both hurt and dazed), a file of soldiers (the third stops him), a testudo (bounces, nobody hurt), someone in the
// air (a miss), riders (a Vanguard knocked off with the horse unhurt; a Raider pushed; rider against rider pushed), a
// champion knocked into another (half), a castle gate (four of his blows).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const o = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, A = await import('/src/core/sim/abilities.js'), L = await import('/src/core/sim/levels.js'), sim = await import('/src/core/sim.js'), N = await import('/src/core/nav.js');
  G.T = 30; F.step(1); const me = G.myTi, p = G.teams[me].leader, r = {};
  const e = G.teams.findIndex((t, i) => t.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), E = G.teams[e].leader;
  r.lv1 = A.blocked(me, 'sp1');
  const cw = G.layout.cwalls.find(c => c.obs.some(o => o.cwall && o.cgate == null)), wob = cw.obs.find(o => o.cwall && o.cgate == null && !o.gate);
  const ox = (wob.x - cw.x) / Math.hypot(wob.x - cw.x, wob.z - cw.z), oz = (wob.z - cw.z) / Math.hypot(wob.x - cw.x, wob.z - cw.z), out = v => [wob.x + ox * v, wob.z + oz * v], inward = Math.atan2(-ox, -oz);
  const base = () => { [p.x, p.z] = out(14); p.face = inward + Math.PI; };
  L.gainXp(me, 420, 't'); r.lvl = G.teams[me].lvl; const k = 1 + .05 * Math.max(0, r.lvl - 3); r.k = k;
  const ready0 = () => { for (let i = 0; i < 120 && (p.duelId || p.execT > 0 || p.ram || p.eagle); i++) F.step(1); base(); p.hp = p.max; p.cd = 9; p.atkBuf = 0; G.teams[me].cds.sp1 = 0; p.stun = 0; p.iframeT = 0; p.marchT = 0; p.shieldT = 0; p.armour = 0; p.vx = p.vz = 0; };
  const keep = []; const hold = () => { for (const [u, x, z] of keep) { u.x = x; u.z = z; u.vx = u.vz = 0; } };
  const watch = (us, n, each) => { const h = us.map(u => ({ hp: u.hp, x: u.x, z: u.z, first: null })); for (let i = 0; i < n; i++) { F.step(1); if (each) each(); us.forEach((u, j) => { const w = h[j]; if (w.first == null && u.hp < w.hp - .01) w.first = { dmg: +(w.hp - u.hp).toFixed(1), stun: +u.stun.toFixed(2), dx: u.x - w.x, dz: u.z - w.z }; w.hp = u.hp; w.x = u.x; w.z = u.z; }); } return h.map(w => w.first || { dmg: 0, stun: 0, dx: 0, dz: 0 }); };
  const at = (d, s = 0) => [p.x + Math.sin(p.face) * d + Math.cos(p.face) * s, p.z + Math.cos(p.face) * d - Math.sin(p.face) * s];
  const rel = u => { const dx = u.x - p.x, dz = u.z - p.z; return { f: dx * Math.sin(p.face) + dz * Math.cos(p.face), s: dx * Math.cos(p.face) - dz * Math.sin(p.face) }; };
  const away = () => { for (const u of G.units) if (!u.dead && u !== p && u !== E && !u.testMe && Math.hypot(u.x - p.x, u.z - p.z) < 14) { if (u.leader) { u.x += 40; u.z += 40; } else { u.dead = true; u.hp = 0; } } };
  const stage = () => { if (p.mounted) sim.dismount(p, false); away(); E.x += 0; E.shieldT = 0; E.iframeT = 0; E.marchT = 0; E.armour = 0; E.hp = E.max; E.stun = 0; if (E.mounted) sim.dismount(E, false); E.horseCd = 99; };
  const ready = () => { ready0(); p.mounted = false; p.horse = null; p.r = .5 * 0 + p.r; p.ram = null; };
  const RM = await import('/src/core/sim/ram.js'), SC = await import('/src/core/sim/scutum.js'), TD = await import('/src/core/sim/testudo.js'), EG = await import('/src/core/sim/eagle.js'), CH = await import('/src/champions/index.js');
  CH.champOf(e).sp1.wind = .15; // (FEEL2a made the wind-up .3 s; these collision checks keep their old frame counts. r_C3b times the new one)
  const T = CH.champOf(e), cls0 = T.cls, rest = () => { for (let i = 0; i < 30 * 7; i++) { F.step(1); if (E.scutum) SC.dropScutum(E); } };
  const front = (d = 3) => { [E.x, E.z] = at(d); E.face = p.face + Math.PI; };
  const run = n => { const x0 = p.x, z0 = p.z, f = p.face; let far = 0; for (let i = 0; i < n; i++) { F.step(1); const g = (p.x - x0) * Math.sin(f) + (p.z - z0) * Math.cos(f); far = Math.max(far, g); } return { far: +far.toFixed(2), end: +((p.x - x0) * Math.sin(f) + (p.z - z0) * Math.cos(f)).toFixed(2) }; };
  // 1. a raised shield in front: stops dead, he bounces back staggered; she slides back unhurt
  stage(); ready(); front(3); G.teams[e].cds = { sp1: 99, sp2: 99, ult: 99, armyUlt: 99 }; SC.raiseScutum(E, T.sp2); { const h0 = E.hp, ex = E.x, ez = E.z, f = p.face; let st = 0, sl = 0; F.ability(0); const x0 = p.x, z0 = p.z; let far = 0;
    for (let i = 0; i < 25; i++) { F.step(1); if (E.scutum) E.scutum.face = p.face + Math.PI; else r.dropped = r.dropped || i; far = Math.max(far, (p.x - x0) * Math.sin(f) + (p.z - z0) * Math.cos(f)); st = Math.max(st, p.stun); sl = Math.max(sl, (E.x - ex) * Math.sin(f) + (E.z - ez) * Math.cos(f)); }
    r.shield = { far: +far.toFixed(2), end: +((p.x - x0) * Math.sin(f) + (p.z - z0) * Math.cos(f)).toFixed(2), stun: +st.toFixed(2), herHp: +(h0 - E.hp).toFixed(1), slid: +sl.toFixed(2) }; SC.dropScutum(E); }
  // 2. two rams head-on
  rest(); stage(); ready(); front(6); { const h0 = E.hp, hp0 = p.hp; F.ability(0); RM.startRam(E, { x: p.x, z: p.z }, T.sp1); let st = 0, es = 0;
    for (let i = 0; i < 25; i++) { F.step(1); st = Math.max(st, p.stun); es = Math.max(es, E.stun); }
    r.clash = { me: +(hp0 - p.hp).toFixed(1), her: +(h0 - E.hp).toFixed(1), st: +st.toFixed(2), es: +es.toFixed(2), gap: +Math.hypot(p.x - E.x, p.z - E.z).toFixed(2), rams: !!p.ram || !!E.ram }; }
  // 3. four soldiers in a file: each slows him, the third stops him, the fourth is untouched
  rest(); stage(); ready(); E.x = p.x + 60; { const men = [1.2, 2.5, 3.8, 5.6].map(d => { const [x, z] = at(d); const u = sim.mkUnit(e, x, z, 'foot'); u.hp = u.max = 300; u.face = p.face + Math.PI / 2; u.rest = true; u.vx = u.vz = 0; return u; });
    F.ability(0); const m = run(25); r.file = { ...m, hit: men.map(u => u.hp < 300 ? 1 : 0).join('') }; for (const u of men) { u.dead = true; u.hp = 0; } }
  // 4. a testudo ahead: he bounces off, nobody hurt
  rest(); stage(); ready(); { const men = [-1, 0, 1].flatMap(s => [3, 4].map(d => { const [x, z] = at(d, s * .9); const u = sim.mkUnit(e, x, z, 'foot'); u.hp = u.max = 300; u.face = p.face + Math.PI; u.rest = true; return u; }));
    [E.x, E.z] = at(8); const ok = TD.startTestudo(E, { x: p.x, z: p.z }, T.armyUlt); F.step(20); const hp0 = p.hp;
    F.ability(0); const m = run(25); r.testudo = { on: !!ok, ...m, hurt: men.filter(u => u.hp < 300).length }; for (const u of men) { u.dead = true; u.hp = 0; } }
  // 5. she leaps (Eagle's fall) as he rams under her: a miss
  rest(); stage(); ready(); front(2.5); { const [x, z] = at(12); EG.startEagle(E, { x, z }, T.ult); F.step(Math.ceil(T.ult.crouch * 30) + 3); const h0 = E.hp; F.ability(0); F.step(8); r.air = { hurt: +(h0 - E.hp).toFixed(1) }; for (let i = 0; i < 90 && E.eagle; i++) F.step(1); }
  // 6. riders: a Vanguard on a horse is knocked off, the horse unhurt; a Raider is pushed; rider against rider, pushed
  const horse = u => { u.mounted = true; u.horse = { state: 'ridden', x: u.x, z: u.z }; u.horseHp = 200; u.horseCd = 0; };
  rest(); stage(); ready(); front(3); horse(E); { const H = E.horse; F.ability(0); F.step(20); r.unhorse = { mounted: E.mounted, horse: H.state, cd: E.horseCd > 5, hp: E.horseHp }; }
  rest(); stage(); ready(); front(3); horse(E); T.cls = 'raider'; { const ex = E.x, ez = E.z, f = p.face; let bk = 0; F.ability(0); for (let i = 0; i < 20; i++) { F.step(1); bk = Math.max(bk, (E.x - ex) * Math.sin(f) + (E.z - ez) * Math.cos(f)); } r.raider = { mounted: E.mounted, back: +bk.toFixed(2) }; } T.cls = cls0;
  rest(); stage(); ready(); front(3); horse(E); horse(p); { F.ability(0); F.step(25); r.saddle2 = { mounted: E.mounted, me: p.mounted }; }
  // 7. knocked into another champion: he takes half, a short stagger
  rest(); stage(); ready(); if (p.mounted) sim.dismount(p, false); const e2 = G.teams.findIndex((t, i) => t.active && i !== e && G.ALLY[i % 4] === G.ALLY[e % 4]), E2 = e2 >= 0 && G.teams[e2].leader;
  if (E2) { front(2.5); if (E2.mounted) sim.dismount(E2, false); E2.dead = false; [E2.x, E2.z] = at(3.9); E2.hp = E2.max; E2.stun = 0; E2.iframeT = 0; E2.shieldT = 0; E2.armour = 0; E2.hurt = null; E.hurt = null;
    F.ability(0); let s2 = 0; for (let i = 0; i < 20; i++) { F.step(1); s2 = Math.max(s2, E2.stun); }
    r.chain = { e: E.hurt ? +E.hurt.dmg.toFixed(1) : 0, e2: E2.hurt && E2.hurt.by === p.id ? +E2.hurt.dmg.toFixed(1) : 0, st: +s2.toFixed(2) }; }
  // 8. a castle gate ahead: it takes four of his blows
  rest(); stage(); ready(); E.x = p.x + 60; { const cg = G.layout.cwalls.flatMap(c => c.obs.filter(o => o.cgate != null).map(o => ({ c, o })))[0];
    if (cg) { const { c, o: g } = cg, h = G.holds[g.cgate]; h.owner = G.ALLY[e % 4]; const FT = await import('/src/core/sim/forts.js'); G.cgates[g.cgate] = FT.freshGates(1); FT.applyCastleGates(); const st = G.cgates[g.cgate], gi = g.gi | 0;
      const ux = (g.x - c.x) / Math.hypot(g.x - c.x, g.z - c.z), uz = (g.z - c.z) / Math.hypot(g.x - c.x, g.z - c.z); p.x = g.x + ux * (g.r + 3); p.z = g.z + uz * (g.r + 3); p.face = Math.atan2(-ux, -uz);
      const h0 = st.hp[gi]; r.gdbg = { pal: !!g.pal, off: !!g.off, own: h.owner, gi, hp: h0, br: st.broken }; F.ability(0); const gx = p.x, gz = p.z; F.step(25); r.gdbg.ran = +Math.hypot(p.x - gx, p.z - gz).toFixed(2); r.gdbg.gap = +(Math.hypot(p.x - g.x, p.z - g.z) - g.r).toFixed(2); r.gate = { dmg: +(h0 - st.hp[gi]).toFixed(1), blow: +(p.dmg * .48 * 1.9).toFixed(1) }; } }
  return r; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(o));
ok(o.shield.far < 2.6 && o.shield.end < o.shield.far - .5 && o.shield.stun > .3 && o.shield.herHp === 0 && o.shield.slid > -.1, `a raised shield: stops at ${o.shield.far} m, bounces back to ${o.shield.end}, staggered ${o.shield.stun} s; she takes ${o.shield.herHp}, slides ${o.shield.slid} m`);
ok(o.clash.me > 10 && o.clash.her > 10 && o.clash.st > .25 && o.clash.es > .25 && !o.clash.rams, `head-on: both stop, ${o.clash.me}/${o.clash.her} each, dazed ${o.clash.st}/${o.clash.es} s, ${o.clash.gap} m apart`);
ok(o.file.hit.startsWith('111') && o.file.far > 4.5, `FEEL2a: soldiers never stop him: ran ${o.file.far} m through them (hit ${o.file.hit})`);
ok(o.testudo.on && o.testudo.far < 3 && o.testudo.end < o.testudo.far && o.testudo.hurt === 0, `a testudo: he bounces off at ${o.testudo.far} m, nobody hurt`);
ok(o.air.hurt === 0, `she's in the air: he passes under (${o.air.hurt})`);
ok(!o.unhorse.mounted && o.unhorse.horse === 'leaving' && o.unhorse.cd && o.unhorse.hp === 200, `a Vanguard on a horse: knocked off, the horse ${o.unhorse.horse}, unhurt`);
ok(o.raider.mounted && o.raider.back > .3, `a Raider: still mounted, pushed ${o.raider.back} m`);
ok(o.saddle2.mounted && o.saddle2.me, 'rider against rider: both stay mounted');
ok(o.chain && o.chain.e2 > 0 && Math.abs(o.chain.e2 - o.chain.e / 2) < 3 && o.chain.st > .15, `into another champion: ${o.chain && o.chain.e} and ${o.chain && o.chain.e2}, stagger ${o.chain && o.chain.st} s`);
ok(o.gate && Math.abs(o.gate.dmg - o.gate.blow * 4) < 2, `a gate takes ${o.gate && o.gate.dmg} (four blows of ${o.gate && o.gate.blow})`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
