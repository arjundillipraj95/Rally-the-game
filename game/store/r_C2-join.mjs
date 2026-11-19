// C2 on a joined phone: every army plays a test champion who recruits stone throwers (window.__champs on both phones).
// The joined phone recruits one (it takes five places there too); the host's thrower is a thrower on the joined phone,
// its stones fly there with their landing marks, and the fire pots' flames show there. Needs the servers.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
const BOW = `window.__champs = [{ id: 'siege', name: 'Siege', cls: 'vanguard', stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['foot', 'arch', 'thrower'], influence: null, sp1: null, sp2: null, ult: null, armyUlt: null }];`;
for (const [b, nick, q] of [[b1, 'Arjun', '&champ=siege&botchamp=siege'], [b2, 'Ravi', '']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  await ctx.addInitScript(BOW);
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
// the joined phone recruits a stone thrower (its army emptied first, gold given by the host)
await A.evaluate(ti => { const G = window.__fb.G; for (const u of G.units) if (u.ti === ti && !u.leader) u.dead = true; G.teams[ti].gold = 600; }, ti);
await sleep(800);
await B.evaluate(() => { const b = document.querySelector('#tray button[data-kind="thrower"]'); if (b) b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })), b.dispatchEvent(new PointerEvent('pointerup', { bubbles: true })), b.click(); });
await sleep(1500);
const rec = await A.evaluate(async ti => { const sim = await import('/src/core/sim.js'); return { n: window.__fb.G.units.filter(u => !u.dead && u.ti === ti && u.kind === 'thrower').length, places: sim.armyPlaces(ti) }; }, ti);
ok(rec.n === 1 && rec.places === 5, `the joined phone recruits a stone thrower: ${rec.n} on the host, ${rec.places} places`);
// a host thrower (its own army's) with fire pots, a standing enemy group in range: stones and fire, seen on the joined phone
await A.evaluate(async () => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), Wd = await import('/src/core/world.js'), me = G.myTi, s = G.teams[me], p = s.leader;
  s.gold = 1000; s.up.thr1 = 0; sim.buyUpgrade(me, 'thr1');
  const A = Math.atan2(-p.x, -p.z), at = d => [p.x + Math.sin(A) * d, p.z + Math.cos(A) * d];
  const [tx, tz] = at(10), t = sim.mkUnit(me, tx, tz, 'thrower'); t.face = A; t.stones = 2; t.shootCd = 0; window.__thr = t;
  s.order = 'hold'; s.holdPt = { x: tx, z: tz, face: A };
  const foe = (me + 1) % 4, men = []; for (let k = 0; k < 4; k++) { const [x, z] = at(34 + k * .5), m = sim.mkUnit(foe, x + k * .5, z, 'foot'); m.max = m.hp = 1e5; men.push([m, m.x, m.z]); }
  window.__pinT = setInterval(() => { s.routT = 0; for (const [m, x, z] of men) { m.x = x; m.z = z; m.vx = m.vz = 0; } }, 30); });
const seen = await B.evaluate(async () => { const G = window.__fb.G; let thr = 0, stones = 0, fires = 0, swung = false;
  for (let k = 0; k < 120; k++) { thr = Math.max(thr, G.units.filter(u => !u.dead && u.kind === 'thrower').length); stones = Math.max(stones, G.stones.length); fires = Math.max(fires, G.fires.length);
    if (G.units.some(u => u.kind === 'thrower' && u.throwT > 0 && G.T - u.throwT < 3)) swung = true; if (fires && swung) break; await new Promise(r => setTimeout(r, 50)); }
  return { thr, stones, fires, swung }; });
await A.evaluate(() => clearInterval(window.__pinT));
ok(seen.thr >= 2, `the joined phone sees the throwers as throwers (${seen.thr})`);
ok(seen.stones >= 1 && seen.swung, `a stone in the air on the joined phone (${seen.stones}), its thrower's arm swung (${seen.swung})`);
ok(seen.fires >= 1, `the fire pot's flames on the joined phone (${seen.fires})`);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
