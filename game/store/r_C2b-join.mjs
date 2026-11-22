// C2b on a joined phone: every army plays a test Raider who recruits swordsmen and cavalry (window.__champs on both
// phones). The joined phone recruits a swordsman, then mounts him (Cavalry); on it he is seen mounted, and when his
// horse is killed on the host he is a swordsman on foot there too. Needs the servers.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
const BOW = `window.__champs = [{ id: 'raid', name: 'Raid', cls: 'raider', stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 }, weapons: ['sword'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['sword', 'cav'], influence: null, sp1: null, sp2: null, ult: null, armyUlt: null }];`;
for (const [b, nick, q] of [[b1, 'Arjun', '&champ=raid&botchamp=raid'], [b2, 'Ravi', '']]) {
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
const tap = k => B.evaluate(k => { const b = document.querySelector(`#tray button[data-kind="${k}"]`); if (b) b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })), b.dispatchEvent(new PointerEvent('pointerup', { bubbles: true })), b.click(); }, k);
// the joined phone recruits a swordsman, then mounts him
await A.evaluate(ti => { const G = window.__fb.G; for (const u of G.units) if (u.ti === ti && !u.leader) u.dead = true; G.teams[ti].gold = 600; }, ti);
await sleep(800); await tap('sword'); await sleep(1500);
const r1 = await A.evaluate(ti => window.__fb.G.units.filter(u => !u.dead && u.ti === ti && u.kind === 'sword').length, ti);
ok(r1 === 1, `the joined phone recruits a swordsman: ${r1} on the host`);
await tap('cav'); await sleep(1500);
const r2 = await A.evaluate(async ti => { const sim = await import('/src/core/sim.js'), G = window.__fb.G, c = G.units.find(u => !u.dead && u.ti === ti && u.kind === 'cav'); return { cav: !!c, mounted: !!(c && c.mounted), places: sim.armyPlaces(ti), id: c && c.id }; }, ti);
ok(r2.cav && r2.mounted && r2.places === 2, `mounted on the host: ${JSON.stringify(r2)}`);
const s1 = await B.evaluate(async id => { for (let k = 0; k < 60; k++) { const u = window.__fb.G.units.find(u => u.id === id); if (u && u.kind === 'cav' && u.mounted) return true; await new Promise(r => setTimeout(r, 50)); } return false; }, r2.id);
ok(s1, `the joined phone sees him mounted (${s1})`);
// his horse killed on the host: a swordsman on foot on both phones
await A.evaluate(async id => { const sim = await import('/src/core/sim/army.js'), u = window.__fb.G.units.find(u => u.id === id); sim.horseDamage(u, 1e4); }, r2.id);
const s2 = await B.evaluate(async id => { for (let k = 0; k < 60; k++) { const u = window.__fb.G.units.find(u => u.id === id); if (u && u.kind === 'sword' && !u.mounted) return true; await new Promise(r => setTimeout(r, 50)); } return false; }, r2.id);
ok(s2, `his horse lost: a swordsman on foot on the joined phone (${s2})`);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
