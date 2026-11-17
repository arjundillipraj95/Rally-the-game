// C3a on a joined phone: the host and every bot play Titus; the joined phone takes a bot's seat mid-battle and must see
// Titus for every army, his health, his spearmen (120 health, spear in hand) and his combo ending in the shield bash on
// the host. Needs the servers (bash store/servers.sh).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick, q] of [[b1, 'Arjun', '&champ=titus&botchamp=titus'], [b2, 'Ravi', '']]) {
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
ok(await B.evaluate(() => [...document.querySelectorAll('#segChamp button')].map(b => b.dataset.v).join()) === 'legionary,titus', 'the settings list Titus');
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.player, null, { timeout: 60000 }); await sleep(3000);
const b = await B.evaluate(async () => { const G = window.__fb.G, Ar = await import('/src/champions/army.js'), H = await import('/src/champions/stats.js');
  const f = G.units.filter(u => u.ti === G.myTi && u.kind === 'foot' && !u.dead);
  return { champs: G.champs.join(), ti: G.myTi, max: Math.round(H.champHp(G.myTi)), pmax: Math.round(G.player.max), feet: f.length, fmax: f.map(u => Math.round(u.max)).join(), spear: f.every(u => Ar.spearman(u)) }; });
const a = await A.evaluate(ti => ({ champs: window.__fb.G.champs.join(), max: window.__fb.G.teams[ti].leader.max }), b.ti);
ok(b.champs === a.champs && a.champs.split(',').every(c => c === 'titus'), `every army plays Titus, the same on both phones (${b.champs})`);
ok(b.max === 480 && b.pmax === 480 && a.max === 480, `his health 480 on the joined phone (${b.pmax}) and on the host (${a.max})`);
ok(b.feet > 0 && b.fmax.split(',').every(v => v === '120') && b.spear, `his spearmen on the joined phone: ${b.feet}, health ${b.fmax}, spear in hand ${b.spear}`);
// the joined phone presses Attack three times on his beat, next to an enemy: the host swings slash, slash, shield bash
await A.evaluate(async ti => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), p = G.teams[ti].leader, e = (ti + 1) % 4;
  const f = sim.mkUnit(e, p.x + Math.sin(p.face) * 1.6, p.z + Math.cos(p.face) * 1.6, 'foot'); f.max = f.hp = 1e5; window.__dummy = f; }, b.ti);
const kinds = [];
for (let k = 0; k < 3; k++) {
  await A.evaluate(async ti => { const sim = await import('/src/core/sim.js'), p = window.__fb.G.teams[ti].leader, f = window.__dummy; if (p.mounted) sim.dismount(p, false); f.x = p.x + Math.sin(p.face) * 1.6; f.z = p.z + Math.cos(p.face) * 1.6; f.vx = f.vz = 0; p.stun = 0; p.st = 100; p.horseCd = 99; }, b.ti);
  await A.waitForFunction(ti => window.__fb.G.teams[ti].leader.cd <= 0, b.ti, { timeout: 20000 }); // (the host's clock runs slow with two browsers: press on his beat)
  await B.evaluate(() => window.__fb.attack ? window.__fb.attack() : document.getElementById('atkBtn').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
  await sleep(150); await B.evaluate(() => { const el = document.getElementById('atkBtn'); if (el) el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true })); });
  await A.waitForFunction(ti => window.__fb.G.T - window.__fb.G.teams[ti].leader.lastSwingT < .5, b.ti, { timeout: 20000 }).catch(() => {}); kinds.push(await A.evaluate(ti => window.__fb.G.teams[ti].leader.swingKind, b.ti));
}
ok(kinds.join() === '0,1,6', `joined phone's combo on the host: ${kinds.join(', ')} (slash, slash, shield bash)`);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
