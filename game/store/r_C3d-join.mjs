// C3d on a joined phone: the joined phone's Titus (level 7) presses Eagle's fall with an enemy champion 7 m ahead. His
// own phone flies him up (about 3 m), the host sees him in the air and lands it: the champion takes 100 (+5% a level
// from 7). Needs the servers (bash store/servers.sh).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick, q] of [[b1, 'Arjun', '&champ=titus&botchamp=titus'], [b2, 'Ravi', '']]) {
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
const brk = await A.evaluate(async () => (await import('/src/config.js')).CROWN.breakout); await A.waitForFunction(b => window.__fb.G.T > b + 1, brk, { timeout: 180000 }); // (nobody is hurt before the trumpet)
await A.evaluate(async ti => { const L = await import('/src/core/sim/levels.js'); L.gainXp(ti, 1500, 't'); }, ti);
await B.waitForFunction(() => (window.__fb.G.teams[window.__fb.G.myTi].lvl || 1) >= 7, null, { timeout: 20000 });
const lvl = await A.evaluate(ti => window.__fb.G.teams[ti].lvl, ti);
// on the host: an enemy champion 7 m ahead of him, held there with her guards off
await A.evaluate(async ti => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), p = G.teams[ti].leader;
  const e = G.teams.findIndex((t, i) => t.active && i !== ti && G.ALLY[i % 4] !== G.ALLY[ti % 4]), E = G.teams[e].leader; if (E.mounted) sim.dismount(E, false);
  window.__E = E; window.__peak = 0; window.__hp0 = E.hp = E.max;
  window.__hold = setInterval(() => { if (!p.eagle && !window.__eg) { const f = p.face; E.x = p.x + Math.sin(f) * 7; E.z = p.z + Math.cos(f) * 7; } if (E.mounted) sim.dismount(E, false); E.horseCd = 99; E.vx = E.vz = 0; E.armour = 0; E.shieldT = 0; E.iframeT = 0; E.marchT = 0; E.stun = 5; window.__peak = Math.max(window.__peak, p.jy || 0); if (p.eagle && !p.eagle.landed) window.__pre = E.hp; if (p.eagle && p.eagle.landed && window.__post == null) window.__post = E.hp; if (p.eagle) window.__eg = { x: +p.eagle.x.toFixed(1), z: +p.eagle.z.toFixed(1), t: +p.eagle.t.toFixed(2), px: +p.x.toFixed(1), pz: +p.z.toFixed(1), ex: +E.x.toFixed(1), ez: +E.z.toFixed(1), rem: !!p.remote, landed: p.eagle.landed, own: !!p.eagle.own, n: (window.__n = (window.__n || 0) + 1) }; }, 16); }, ti);
await B.evaluate(() => { const p = window.__fb.G.player; if (p.mounted) window.__fb.ride && window.__fb.ride(); window.__peak = 0; window.__msgs = []; window.__fb.G && 0; window.__iv = setInterval(() => { window.__eagle = window.__eagle || !!window.__fb.G.player.eagle; window.__peak = Math.max(window.__peak, window.__fb.G.player.jy || 0); }, 16); });
await sleep(600); await A.evaluate(() => { window.__hp0 = window.__E.hp = window.__E.max; });
await B.evaluate(() => window.__fb.ability(2));
await A.waitForFunction(() => window.__eg && !window.__E.leader === false && window.__fb.G.teams.some(t => t.leader && t.leader.eagle) === false, null, { timeout: 30000 }).catch(() => {}); await sleep(500); // (the host's clock runs slow with two browsers)
const b = await B.evaluate(() => ({ seen: window.__eagle, peak: +window.__peak.toFixed(2), cd: Math.round((window.__fb.G.teams[window.__fb.G.myTi].cds || {}).ult || 0) }));
const a = await A.evaluate(ti => ({ peak: +window.__peak.toFixed(2), dE: +(window.__pre - window.__post).toFixed(1), eg: window.__eg, cd: Math.round(window.__fb.G.teams[ti].cds.ult) }), ti);
const want = 100 * (1 + .05 * (lvl - 7));
console.log(JSON.stringify({ lvl, a, b }));
ok(b.peak > 2.4, `his own phone flies him up (${b.peak} m)`);
ok(a.peak > 1.5, `the host sees him in the air (${a.peak} m)`);
ok(Math.abs(a.dE - want) < 2, `the host lands it: the champion takes ${a.dE} (${want} at level ${lvl})`);
ok(a.cd > 50 && b.cd > 50, `recharging on both phones (${a.cd} s, ${b.cd} s)`);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
