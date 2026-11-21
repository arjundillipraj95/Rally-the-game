// C3c on a joined phone: the joined phone's Titus (level 5) raises Shield of Cassius: the host has it up and blocks a
// blow from his front, his own phone shows it and walks him slower; a second tap drops it on both. Needs the servers
// (bash store/servers.sh).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const br1 = await chromium.launch(opts), br2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick, q] of [[br1, 'Arjun', '&champ=titus&botchamp=titus'], [br2, 'Ravi', '']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); p.on('console', m => { if (m.text().includes('EAGLE')) console.log(nick, m.text().slice(0, 600)); }); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1' + q);
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
ok(await B.evaluate(async () => (await import('/src/champions/index.js')).playable('titus')), 'Titus is playable on the joined phone'); // (the old settings list became the Champions screen, MENU4)
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.player, null, { timeout: 60000 }); await sleep(3000);
const ti = await B.evaluate(() => window.__fb.G.myTi);
await A.evaluate(async ti => { const L = await import('/src/core/sim/levels.js'); L.gainXp(ti, 900, 't'); }, ti);
await B.waitForFunction(() => (window.__fb.G.teams[window.__fb.G.myTi].lvl || 1) >= 5, null, { timeout: 20000 });
await B.evaluate(() => { const p = window.__fb.G.player; p.vx = p.vz = 0; window.__fb.ability(1); });
await A.waitForFunction(ti => !!window.__fb.G.teams[ti].leader.scutum, ti, { timeout: 20000 }).catch(() => {});
const a1 = await A.evaluate(async ti => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), M = await import('/src/core/sim/melee.js'), p = G.teams[ti].leader;
  const e = G.teams.findIndex((t, i) => t.active && i !== ti && G.ALLY[i % 4] !== G.ALLY[ti % 4]), f = p.scutum.face;
  const u = sim.mkUnit(e, p.x + Math.sin(f) * 1.5, p.z + Math.cos(f) * 1.5, 'foot'); u.rest = true; const h = p.hp; M.hit(u, p, 1, { fixed: 20, unblockable: true, unparryable: true }); u.dead = true;
  return { up: !!p.scutum, dmg: +(h - p.hp).toFixed(1) }; }, ti);
await sleep(800);
const b1 = await B.evaluate(() => ({ up: !!window.__fb.G.player.scutum, shown: !!window.__fb.G.player.scutumUp }));
await B.evaluate(() => window.__fb.ability(1));
await A.waitForFunction(ti => !window.__fb.G.teams[ti].leader.scutum, ti, { timeout: 20000 }).catch(() => {});
await sleep(800);
const a2 = await A.evaluate(ti => ({ up: !!window.__fb.G.teams[ti].leader.scutum, cd: Math.round(window.__fb.G.teams[ti].cds.sp2 || 0) }), ti);
const b2 = await B.evaluate(() => ({ up: !!window.__fb.G.player.scutum }));
console.log(JSON.stringify({ a1, b1, a2, b2 }));
ok(a1.up && a1.dmg === 0, `the host raises it and blocks a blow from his front (${a1.dmg})`);
ok(b1.up && b1.shown, 'his own phone shows it raised');
ok(!a2.up && !b2.up && a2.cd >= 9, `a second tap drops it on both (recharge ${a2.cd} s)`);
await br1.close(); await br2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
