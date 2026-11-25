// MATCH1: a whole online Crown match, start to 10:00, with a player leaving part way (needs the game, peer and online
// servers: bash store/servers.sh). Arjun hosts, Ravi and Mira join from their friends lists; Mira closes her game at
// ~1:00. The host's clock is run fast (the rules don't care; the joined phone keeps up through snapshots).
// Checks: the leaver's army plays on under the computer; the match runs to 10:00 on both phones; the Sceptre lands and
// counts; Arjun and Ravi see the same result and the same results table (ratings, kills, assists, objectives).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const bs = [], pages = [];
for (const nick of ['Arjun', 'Ravi', 'Mira']) {
  const b = await chromium.launch(opts); bs.push(b);
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&' + (process.env.Q ?? '?crown2=1').replace(/^\?/, ''));
}
const [A, B, C] = pages;
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 30000 }); await sleep(1500);
const idOf = p => p.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
for (const P of [B, C]) { // (each becomes Arjun's friend)
  const code = await idOf(P);
  await A.click('#friendsBtn'); await A.fill('#fAddCode', code); await A.click('#fAddBtn'); await sleep(800); await A.click('#friendsDone'); await sleep(300);
  await P.click('#friendsBtn'); await P.waitForSelector('[data-acc]'); await P.click('[data-acc]'); await sleep(800); await P.click('#friendsDone'); await sleep(300);
}
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
console.log('waiting for Arjun\'s battle (up to 2 min)...');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 150000 }); await sleep(3000);
for (const P of [B, C]) { await P.click('#friendsBtn'); await sleep(800); await P.waitForSelector('[data-join]'); await P.click('[data-join]'); await P.waitForFunction(() => window.__fb && window.__fb.G.state === 'play', null, { timeout: 60000 }); await sleep(2000); }
const tiOf = p => p.evaluate(() => window.__fb.G.myTi);
const [ta, tb, tc] = [await tiOf(A), await tiOf(B), await tiOf(C)];
const humans = await A.evaluate(() => window.__fb.G.teams.filter(s => s.active && s.human).length);
ok(humans === 3, `three humans in the battle (armies ${ta}, ${tb}, ${tc})`);
const armies = await A.evaluate(() => window.__fb.G.teams.filter(s => s.active).length), side = ti => ti % 4;
ok(armies === 12, `12 captains in the battle (${armies})`);
ok(side(tb) === side(ta) && side(tc) === side(ta), `the friends who joined are on Arjun's side`);
const run = to => A.evaluate(to => { const { G } = window.__fb; if (G.T < to && G.state === 'play') window.__fb.step(Math.min(90, Math.ceil((to - G.T) * 30))); return G.T; }, to);
while ((await run(60)) < 60) await sleep(150);
// Mira leaves: her game closes
await bs[2].close(); console.log('Mira left at', Math.round(await A.evaluate(() => window.__fb.G.T)));
await sleep(6000); while ((await run(90)) < 90) await sleep(150);
const left = await A.evaluate(ti => { const s = window.__fb.G.teams[ti]; return { human: !!s.human, alive: !!(s.leader && !s.leader.dead) || s.leaderDeadT > 0, men: window.__fb.G.units.filter(u => u.ti === ti && !u.dead).length }; }, tc);
ok(!left.human, `Mira's army went to the computer (human ${left.human}, ${left.men} men on)`);
for (let t = 120; t <= 600; t += 30) { while ((await run(t)) < t && (await A.evaluate(() => window.__fb.G.state)) === 'play') await sleep(120); }
await A.waitForFunction(() => window.__fb.G.state === 'end', null, { timeout: 60000 }).catch(() => {});
const scep = await A.evaluate(() => { const K = window.__fb.G.c2; return { chest: K.chest, pts: Object.values(K.chestPts || {}).filter(Boolean) }; });
ok(scep.chest === 2 && scep.pts.join() === '5', `the Sceptre landed and went to one side for 5 points (${JSON.stringify(scep)})`);
await B.waitForFunction(() => window.__fb.G.state === 'end', null, { timeout: 60000 }).catch(() => {});
await sleep(6000);
const end = p => p.evaluate(() => { const G = window.__fb.G, rows = [...document.querySelectorAll('#endCaps .crow')].map(tr => [...tr.querySelectorAll('td')].slice(2).map(td => td.textContent.trim()).join('|'));
  return { state: G.state, T: Math.round(G.T), w: G.endInfo && G.endInfo.w, why: G.endInfo && G.endInfo.why, rows: rows.sort() }; });
const ea = await end(A), eb = await end(B);
ok(ea.state === 'end' && ea.T >= 599, `Arjun's match ran to 10:00 (${ea.state} at ${ea.T} s, ${ea.why})`);
ok(eb.state === 'end', `Ravi's match ended too (${eb.state})`);
ok(ea.w === eb.w, `same winner on both phones (${ea.w} / ${eb.w})`);
ok(ea.rows.length >= 12 && JSON.stringify(ea.rows) === JSON.stringify(eb.rows), `same results table on both phones (${ea.rows.length} rows)`);
if (JSON.stringify(ea.rows) !== JSON.stringify(eb.rows)) for (let i = 0; i < ea.rows.length; i++) if (ea.rows[i] !== eb.rows[i]) console.log('  A', ea.rows[i], '\n  B', eb.rows[i]);
console.log('sample row', ea.rows[0]);
for (const b of bs.slice(0, 2)) await b.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
