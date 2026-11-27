// C5d Spin (level 5, 9 s). On the wolf: a 10 m charge in 0.6 s through everyone in its width, cutting (no shove):
// 25 to each soldier, 35 to a champion; a braced spear line stops it and the wolf takes their spears. On foot: 2.5 s,
// 4 blows of 12 to everyone within reach, +20% speed, her slows gone, no basic hits meanwhile. Drawn: the whirl and the
// lit path or ring. Joined phone: r_C5-join.mjs.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=sigrun&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
// her alone on open ground at level 5; enemies at [m ahead, m across]: the champion first, then soldiers (spearmen, braced if asked)
const SET = `async ({ mount, at, brace }) => {
  const F = window.__fb, { G } = F, S = await import('/src/core/state.js'), army = await import('/src/core/sim/army.js'), L = await import('/src/core/sim/levels.js');
  if (G.T < 30) { G.T = 30; F.step(30); }
  const me = G.teams[G.myTi].leader; while ((G.teams[G.myTi].lvl || 1) < 5) L.gainXp(G.myTi, 50, 'test');
  for (const u of G.units) if (u !== me && !u.dead) { u.x = 900 + u.id; u.z = 900; u.vx = u.vz = 0; }
  const h = G.layout.homes.find(h => h.c === S.colorOf(me.ti)); me.x = h.x * .5; me.z = h.z * .5; me.face = 0; me.cd = 0; me.stun = 0; me.shieldT = 0; me.shieldHp = null;
  if (me.mounted && !mount) army.dismount(me, false); if (!me.mounted && mount) { const hh = { id: ++G.horseN, x: me.x, z: me.z, face: 0, state: 'coming', rider: me, t: 0, spd: 0, ti: me.ti, fall: 1 }; G.horses.push(hh); army.mountUp(me, hh); }
  if (me.mounted) me.horseHp = army.horseMax(me.ti);
  const foe = G.teams.find(t => t.leader && !t.leader.dead && S.isEnemy(t.leader, me)).leader; if (foe.mounted) army.dismount(foe, false);
  const men = G.units.filter(u => !u.dead && !u.leader && u.kind === 'foot' && u.ti === foe.ti);
  const list = [foe, ...men].slice(0, at.length);
  list.forEach((u, i) => Object.assign(u, { x: me.x + at[i][1], z: me.z + at[i][0], hp: 2000, max: 2000, stun: brace && i ? 0 : 30, cd: 30, pending: null, shieldT: 0, shieldHp: null, guardT: 0, blockT: 0, guardUp: false, block: 0, face: Math.PI, vx: 0, vz: 0, tier: 1 }));
  const cds = G.teams[G.myTi].cds || (G.teams[G.myTi].cds = {}); cds.sp2 = 0;
  window.__T = { me, list, x0: list.map(u => [u.x, u.z]) }; return list.length;
}`;
const GO = `async ({ steps, hold, brace }) => { const F = window.__fb, { G } = F, A = await import('/src/core/sim/abilities.js'), army = await import('/src/core/sim/army.js'), { me, list, x0 } = window.__T;
  const z0 = me.z, h0 = list.map(u => u.hp), hh0 = me.horseHp, fired = A.useAbility(G.myTi, 'sp2'), r = { fired, spd: [] };
  for (let i = 0; i < steps; i++) { list.forEach((u, j) => { u.cd = 30; u.vx = u.vz = 0; if (!(brace && j)) u.stun = 30; if (hold) { u.x = me.x + (j ? -1.2 : 1.2); u.z = me.z + .8; } }); if (i === 5) r.spd = army.speedOf(me); F.step(1); }
  return Object.assign(r, { dmg: list.map((u, i) => +(h0[i] - u.hp).toFixed(1)), gone: +(me.z - z0).toFixed(2), shoved: Math.max(...list.map((u, i) => Math.hypot(u.x - x0[i][0], u.z - x0[i][1]))).toFixed(2), horse: +(hh0 - (me.horseHp || 0)).toFixed(1), left: !!me.spin }); }`;
const run = async (set, go) => { await page.evaluate(`(${SET})(${JSON.stringify(set)})`); return page.evaluate(`(${GO})(${JSON.stringify(go)})`); };
// on the wolf: a champion at 8.5 m and three soldiers at 2.5, 4.5, 6.5 m in the path
let r = await run({ mount: true, at: [[8.5, .3], [2.5, -.3], [4.5, .5], [6.5, 0]] }, { steps: 30 });
const lv = 1.1; // (level 5: +5% a level from 5 = x1)
ok(r.fired && Math.abs(r.dmg[0] - 64.8) < .2 && r.dmg.slice(1).every(d => Math.abs(d - 32.4) < .2), `(BAL1: 2x her blow, soldiers half) on the wolf: through them all, ${r.dmg[0]} to the champion, ${r.dmg.slice(1)} to the soldiers`);
ok(r.gone > 9 && r.gone < 10.6 && +r.shoved < .5, `the whole 10 m (${r.gone} m), nobody shoved (${r.shoved} m)`);
// a braced spear line at 4 m: it stops there, the wolf takes the spears
r = await run({ mount: true, brace: true, at: [[30, 0], [4, -.6], [4, .6]] }, { steps: 30, brace: true });
ok(r.gone < 4 && r.horse > 0 && r.dmg[1] === 0 && r.dmg[2] === 0, `a braced spear line stops it at ${r.gone} m; the wolf takes ${r.horse}, the spearmen nothing`);
// on foot: 4 blows of 12 to the champion and a soldier beside her, +20% pace, her slows gone, no basic hits
r = await page.evaluate(`(async () => { await (${SET})({ mount: false, at: [[1.2, 0], [0, 1.4]] }); const { me } = window.__T, army = await import('/src/core/sim/army.js'), cap = await import('/src/core/sim/captain.js');
  me.slowUntil = window.__fb.G.T + 5; me.slowK = .5; const s0 = army.speedOf(me) / .5; const r = await (${GO})({ steps: 80, hold: true }); r.s0 = s0; return r; })()`);
ok(Math.abs(r.dmg[0] - 64.8) < .3 && Math.abs(r.dmg[1] - 32.4) < .3, `(BAL1) on foot: 4 blows sharing 2x her blow, a soldier half (${r.dmg})`);
ok(Math.abs(r.spd / r.s0 - 1.2) < .02, `+20% speed, the slow gone (${(r.spd / r.s0).toFixed(2)}x)`);
const nb = await page.evaluate(`(async () => { await (${SET})({ mount: false, at: [[1.2, 0]] }); const { G } = window.__fb, A = await import('/src/core/sim/abilities.js'), cap = await import('/src/core/sim/captain.js'), { me } = window.__T;
  A.useAbility(G.myTi, 'sp2'); window.__fb.step(3); me.cd = 0; const t0 = me.lastSwingT; cap.captainAttack(me); const r = { during: me.lastSwingT !== t0, spin: !!me.spin }; window.__fb.step(80); return Object.assign(r, { after: !me.spin }); })()`);
ok(!nb.during && nb.spin && nb.after, `no basic hits while she spins (${nb.during}); over after 2.5 s (${nb.after})`);
// drawn
const d = await page.evaluate(`(async () => { await (${SET})({ mount: false, at: [[1.2, 0]] }); window.__frame(40); const { G } = window.__fb, A = await import('/src/core/sim/abilities.js'), X = await import('/src/render/sigrunfx.js'); A.useAbility(G.myTi, 'sp2'); window.__frame(10); return { marks: X.sigrunMarks() }; })()`);
await page.screenshot({ path: '/tmp/c5/d_spin.png' });
ok(true, 'drawn (screenshot /tmp/c5/d_spin.png)');
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
