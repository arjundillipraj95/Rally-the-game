// RANGE1 on a joined phone: every army plays a test champion with Devi's numbers (window.__champs on both phones). The
// joined phone takes a bot's seat; holding Attack there with an enemy in range, the host shoots for it, again and again;
// its arrows fly to their mark on the joined phone too (they carry whom they home in on); she moves at 65% there while
// shooting; her Targeting setting (Champions first) reaches the host. Needs the servers (bash store/servers.sh).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
const BOW = `window.__champs = [{ id: 'bowman', name: 'Bowman', cls: 'striker', ranged: { third: 18 }, stats: { hp: 300, dmg: 24, rate: 1.75, reach: 14, spd: 5.9 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['arch'], influence: null, sp1: null, sp2: null, ult: null, armyUlt: null }];`;
for (const [b, nick, q] of [[b1, 'Arjun', '&champ=titus&botchamp=bowman'], [b2, 'Ravi', '']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  await ctx.addInitScript(BOW); await ctx.addInitScript(() => localStorage.setItem('rally-aim', 'champ'));
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
const champs = await B.evaluate(() => window.__fb.G.champs[window.__fb.G.myTi]);
ok(champs === 'bowman', `the joined phone plays the ranged test champion (${champs})`);
// an enemy footman 10 m in front of her, pinned, a lot of health; she holds Attack on her phone
await A.evaluate(async ti => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), p = G.teams[ti].leader, e = (ti + 1) % 4;
  if (p.mounted) sim.dismount(p, false);
  const f = sim.mkUnit(e, p.x + Math.sin(p.face) * 10, p.z + Math.cos(p.face) * 10, 'foot'); f.max = f.hp = 1e5; window.__dummy = f;
  window.__pin = setInterval(() => { const q = G.teams[ti].leader; f.x = q.x + Math.sin(q.face) * 10; f.z = q.z + Math.cos(q.face) * 10; f.vx = f.vz = 0; }, 30);
  window.__n0 = G.arrows.length; window.__hp0 = f.hp; window.__shots = 0; window.__a0 = G.arrowN; }, ti);
await B.evaluate(() => { const el = document.getElementById('atk'); el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
await sleep(400);
const homing = await B.evaluate(async () => { const G = window.__fb.G; let n = 0, t = 0;
  for (let k = 0; k < 40; k++) { const seen = G.arrows.filter(a => a.ti === G.myTi); n = Math.max(n, seen.length); t = Math.max(t, seen.filter(a => a.tg).length); if (t) break; await new Promise(r => setTimeout(r, 50)); }
  return { n, t }; });
const pace = await B.evaluate(async () => { const sim = await import('/src/core/sim.js'), p = window.__fb.G.player; const w = (await import('/src/core/world.js')).groundSlow(p.x, p.z);
  return { on: p.firingT > window.__fb.G.T, ratio: p.firingT > window.__fb.G.T ? .65 : 1, spd: sim.speedOf(p) / w }; });
await sleep(2600);
await B.evaluate(() => { const el = document.getElementById('atk'); el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true })); });
await sleep(500);
const h = await A.evaluate(ti => { clearInterval(window.__pin); const G = window.__fb.G, L = G.teams[ti].leader;
  return { shots: G.arrowN - window.__a0, taken: Math.round(window.__hp0 - window.__dummy.hp), aim: !!L.aimChamp }; }, ti);
ok(h.shots >= 3 && h.taken >= 40, `holding Attack on the joined phone: the host shot ${h.shots} arrows, ${h.taken} damage (40+: two landed; the last may still be in the air)`);
ok(homing.t > 0, `her arrows home in on the joined phone too (${homing.t} of ${homing.n} seen carry their mark)`);
ok(pace.on && Math.abs(pace.spd - 5.9 * .65) < .1, `she moves at ${pace.spd.toFixed(2)} m/s on her phone while shooting`);
ok(h.aim, `her Targeting setting (Champions first) reached the host`);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
