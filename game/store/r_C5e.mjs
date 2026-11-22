// C5e The Hunt (ult, level 7, 35 s): only on an enemy champion below 20% health within 6 m on foot, 12 m on the wolf;
// dark and never fired without one (a wolf's head over such a champion when it's ready, and the button glows). It
// strikes in 0.3 s and kills; a raised shield doesn't stop it; an untouchable dash at that moment (Devi's Evade) dodges
// it. Slow motion on both, the death card "Hunted by". Joined phone: r_C5-join.mjs.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=sigrun&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const SET = `async ({ mount, dist, hpK }) => {
  const F = window.__fb, { G } = F, S = await import('/src/core/state.js'), army = await import('/src/core/sim/army.js'), L = await import('/src/core/sim/levels.js');
  if (G.T < 30) { G.T = 30; F.step(30); }
  const me = G.teams[G.myTi].leader; while ((G.teams[G.myTi].lvl || 1) < 7) L.gainXp(G.myTi, 80, 'test');
  for (const t of G.teams) if (t.leader && t.leader.dead && S.isEnemy(t.leader, me)) t.leaderDeadT = 0; F.step(3); // (the hunted come back for the next case)
  for (const u of G.units) if (u !== me && !u.dead && !u.leader) { u.x = 900 + u.id; u.z = 900; u.vx = u.vz = 0; }
  for (const t of G.teams) if (t.leader && t.leader !== me && !t.leader.dead) { const hh = G.layout.homes.find(k => k.c === S.colorOf(t.leader.ti)); t.leader.x = hh.x; t.leader.z = hh.z; } // (the others at home)
  const h = G.layout.homes.find(h => h.c === S.colorOf(me.ti)); me.x = h.x * .5; me.z = h.z * .5; me.face = 0; me.cd = 0; me.stun = 0; me.shieldT = 0; me.shieldHp = null;
  if (me.mounted && !mount) army.dismount(me, false); if (!me.mounted && mount) { const hh = { id: ++G.horseN, x: me.x, z: me.z, face: 0, state: 'coming', rider: me, t: 0, spd: 0, ti: me.ti, fall: 1 }; G.horses.push(hh); army.mountUp(me, hh); }
  let foe = G.teams.find(t => t.leader && S.isEnemy(t.leader, me) && !t.leader.dead); if (!foe) return JSON.stringify(G.teams.map(t => t.leader ? [t.leader.ti, t.leader.dead, Math.round(t.leader.hp)] : null)); foe = foe.leader; if (foe.mounted) army.dismount(foe, false);
  Object.assign(foe, { x: me.x, z: me.z + dist, hp: foe.max * hpK, stun: 30, cd: 30, pending: null, shieldT: 0, shieldHp: null, iframeT: 0, face: Math.PI });
  const cds = G.teams[G.myTi].cds || (G.teams[G.myTi].cds = {}); cds.ult = 0;
  window.__T = { me, foe }; return true;
}`;
const GO = `async ({ steps = 30, pre } = {}) => { const F = window.__fb, { G } = F, A = await import('/src/core/sim/abilities.js'), { me, foe } = window.__T;
  if (pre === 'shield') { const sc = await import('/src/core/sim/scutum.js'); const I = await import('/src/champions/index.js'); sc.raiseScutum(foe, I.champOf(foe.ti).sp2 || { up: 4, arc: 2, zone: 6, zw: 2.5, pace: .7, turn: 2.5, ultX: .3 }); }
  const S = await import('/src/core/state.js'); window.__how = null; if (!window.__howOn) { window.__howOn = 1; S.bus.on('msg', m => { if (m.k === 'fell') window.__how = m.a[3]; }); } foe.human = true; // (so his death card is sent: how he died)
  const why = A.blocked(G.myTi, 'ult'), fired = A.useAbility(G.myTi, 'ult'), r = { why, fired, slow: 0 };
  for (let i = 0; i < steps; i++) { foe.stun = 30; foe.cd = 30; if (pre === 'evade' && me.hunt && me.hunt.t > .2) foe.iframeT = .3; F.step(1); if (me.slowT > 0) r.slow = 1; }
  return Object.assign(r, { dead: foe.dead || foe.hp <= 0, cd: +(G.teams[G.myTi].cds.ult || 0).toFixed(1), how: window.__how }); }`;
const run = async (set, go) => { const st = await page.evaluate(`(${SET})(${JSON.stringify(set)})`); if (st !== true) console.log("SET", st); return page.evaluate(`(${GO})(${JSON.stringify(go || {})})`); };
let r = await run({ mount: false, dist: 3, hpK: .8 });
ok(r.why === 'target' && !r.fired && !r.dead, `a champion at 80%: not usable (${r.why}), not fired`);
r = await run({ mount: false, dist: 8, hpK: .15 });
ok(r.why === 'target' && !r.fired, `on foot, one at 15% but 8 m off: not usable (${r.why})`);
// the mark and the button, with one in reach
const m = await page.evaluate(`(async () => { await (${SET})({ mount: false, dist: 4, hpK: .15 }); window.__frame(40); { const { me, foe } = window.__T; foe.x = me.x; foe.z = me.z + 4; me.vx = me.vz = 0; window.__frame(4); } const X = await import('/src/render/sigrunfx.js'), b = document.getElementById('ab3'); return { marks: X.huntMarks(), ready: b.classList.contains('ready'), dark: b.classList.contains('noTarget') }; })()`);
ok(m.marks === 1 && m.ready && !m.dark, `one at 15% within 6 m: a wolf's head over him (${m.marks}), the button glows (${m.ready})`);
const m2 = await page.evaluate(`(async () => { window.__T.foe.hp = window.__T.foe.max * .9; window.__frame(6); const X = await import('/src/render/sigrunfx.js'), b = document.getElementById('ab3'); return { marks: X.huntMarks(), dark: b.classList.contains('noTarget') }; })()`);
ok(m2.marks === 0 && m2.dark, `healed to 90%: the head goes (${m2.marks}), the button dark (${m2.dark})`);
r = await run({ mount: false, dist: 4, hpK: .15 });
ok(r.fired && r.dead && r.slow && r.how === 'hunt' && r.cd > 33, `on foot, 15% at 4 m: hunted (dead ${r.dead}, slow motion ${!!r.slow}, card "${r.how}"), recharge ${r.cd} s`);
r = await run({ mount: true, dist: 10.5, hpK: .18 });
ok(r.fired && r.dead, `on the wolf, 18% at 10.5 m: hunted (${r.dead})`);
r = await run({ mount: false, dist: 3, hpK: .15 }, { pre: 'shield' });
ok(r.fired && r.dead, `his shield raised against her: still hunted (${r.dead})`);
r = await run({ mount: false, dist: 4, hpK: .15 }, { pre: 'evade' });
ok(r.fired && !r.dead, `an untouchable dash just as it strikes: dodged (alive ${!r.dead})`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
