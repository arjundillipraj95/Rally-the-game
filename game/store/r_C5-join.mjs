// C5 Sigrun on a joined phone (each card adds its checks here). Every computer army plays her (?botchamp=sigrun); the
// joined phone takes one of their seats. C5a: she is Sigrun there too, her wolf drawn as the wolf when she rides.
// Needs the servers. Usage: node store/r_C5-join.mjs
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts), pages = [];
for (const [b, nick, q] of [[b1, 'Arjun', '&botchamp=sigrun'], [b2, 'Ravi', '']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1' + q);
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.player, null, { timeout: 60000 }); await sleep(3000);
const ti = await B.evaluate(() => window.__fb.G.myTi);
// ---- C5a: she is Sigrun on the joined phone; her wolf drawn there when she rides
{
  const c = await B.evaluate(() => { const G = window.__fb.G; return { my: G.champs[G.myTi], same: G.champs.join() }; }), ca = await A.evaluate(() => window.__fb.G.champs.join());
  ok(c.my === 'sigrun' && c.same === ca, `joined phone plays Sigrun (${c.my}); champions the same as the host's`);
  await A.evaluate(async ti => { const army = await import('/src/core/sim/army.js'), G = window.__fb.G, me = G.teams[ti].leader; if (!me.mounted) { const h = { id: ++G.horseN, x: me.x, z: me.z, face: 0, state: 'coming', rider: me, t: 0, spd: 0, ti, fall: 1 }; G.horses.push(h); army.mountUp(me, h); } }, ti);
  const w = await B.evaluate(async () => { const H = await import('/src/render/heroes.js'); for (let k = 0; k < 80; k++) { const p = window.__fb.G.player; if (p && p.mounted && H.wolfOf(p)) return true; await new Promise(r => setTimeout(r, 50)); } return false; });
  ok(w, `the joined phone draws her wolf under her (${w})`);
}
// ---- C5b: the joined phone's presses: slash, slash, chop on foot; claw, claw, bite on the wolf (the wolf seen striking there)
const PLACE = `async (ti, mount) => { const G = window.__fb.G, S = await import('/src/core/state.js'), army = await import('/src/core/sim/army.js'), me = G.teams[ti].leader;
  const foe = G.teams.find(t => t.leader && !t.leader.dead && S.isEnemy(t.leader, me)).leader, h = G.layout.homes.find(h => h.c === S.colorOf(ti));
  if (me.mounted && !mount) army.dismount(me, false); if (!me.mounted && mount) { const hh = { id: ++G.horseN, x: me.x, z: me.z, face: 0, state: 'coming', rider: me, t: 0, spd: 0, ti, fall: 1 }; G.horses.push(hh); army.mountUp(me, hh); }
  if (foe.mounted) army.dismount(foe, false); me.x = h.x * .5; me.z = h.z * .5; me.face = 0; me.shieldT = 0; me.shieldHp = null; me.st = 999; me.cd = 0;
  Object.assign(foe, { x: me.x, z: me.z + 1.9, hp: 3000, max: 3000, stun: 30, cd: 30, pending: null, shieldT: 0, shieldHp: null, slowUntil: 0 }); window.__foe = foe; window.__kinds = []; return foe.id; }`;
const HOLD = `() => { const f = window.__foe, G = window.__fb.G; f.stun = 30; f.cd = 30; const me = G.units.find(u => u.leader && u.ti === window.__ti); f.x = me.x; f.z = me.z + 1.9; }`;
await A.waitForFunction(() => window.__fb.G.T > 17, null, { timeout: 180000, polling: 500 }); // (after the break-out: nobody is hurt before it)
for (const mount of [false, true]) {
  await A.evaluate(ti => { window.__ti = ti; }, ti); await A.evaluate(`(${PLACE})(${ti}, ${mount})`); await sleep(1500);
  const iv = await A.evaluate(`(() => { const f = ${HOLD}; window.__hold = setInterval(f, 30); return 1; })()`);
  for (let i = 0; i < 3; i++) { // (each press once the host's clock has let the last blow finish: the host runs slower than real time here)
    await A.waitForFunction(ti => { const me = window.__fb.G.teams[ti].leader; return me.cd <= 0 && !me.pending; }, ti, { timeout: 20000, polling: 20 });
    const t0 = await A.evaluate(ti => window.__fb.G.teams[ti].leader.lastSwingT, ti); await B.evaluate(() => window.__fb.attack());
    await A.waitForFunction(([ti, t0]) => window.__fb.G.teams[ti].leader.lastSwingT !== t0, [ti, t0], { timeout: 20000, polling: 20 });
    await A.evaluate(ti => { const me = window.__fb.G.teams[ti].leader; window.__kinds.push(me.swingKind + ':0'); }, ti); }
  await sleep(500);
  const r = await A.evaluate(() => { clearInterval(window.__hold); const f = window.__foe; return { lost: +(3000 - f.hp).toFixed(1), slowed: f.slowUntil > window.__fb.G.T - 2 && f.slowK < 1, kinds: window.__kinds.map(k => k.split(':')[0]).join('') }; });
  if (!mount) ok(r.lost > 80 && /5/.test(r.kinds), `on foot, the joined phone's 3 presses: ${r.lost} off him, blows ${r.kinds} (5: the chop)`);
  else {
    const seen = await B.evaluate(async () => { const H = await import('/src/render/heroes.js'), W = H.wolfOf(window.__fb.G.player); return !!W; });
    ok(r.lost > 80 && r.slowed, `on the wolf, the joined phone's 3 presses: ${r.lost} off him, the bite slowed him (${r.slowed}); wolf drawn there ${seen}`);
  }
}

await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
