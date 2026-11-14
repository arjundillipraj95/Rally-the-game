// F2 One lobby (needs `bash game/store/servers.sh`: game, peer server, wrangler dev). Four phones at 844x390:
// Arjun + Ravi (a party) and Chen search Duo: one lobby, 8 seats in four armies, computers in the rest; lanes
// (your army sees them, enemies don't); Ravi moves to another army: asked to leave the party (No, then Yes);
// Chen leaves: his seat reads Computer, nobody moves; Dev joins: takes Chen's seat; Done = ready, the Lobby
// button reopens it (still ready); all ready: the clock drops to 10 s; the versus screen 10 s on every phone;
// then one battle with the host on a player's phone, everyone in his own army. Fits 667x375 too.
// Roles on: Q='?crown2=1&roles=1' node store/r_F2.mjs
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const Q = (process.env.Q ?? '?crown2=1').replace(/^\?/, '');
const sleep = ms => new Promise(r => setTimeout(r, ms));
let fails = 0; const ok = (c, msg) => { console.log((c ? 'PASS ' : 'FAIL ') + msg); if (!c) fails++; };
const nicks = ['Arjun', 'Ravi', 'Chen', 'Dev'], P = {}, browsers = [];
// (this box has 2 CPUs: at most three phones open at once; Chen's closes once he has left, then Dev's opens)
async function phone(nick) {
  const b = await chromium.launch(opts); browsers.push(b);
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 }, hasTouch: true });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__testLobbyWait = 240e3; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); p.on('console', m => { if (/abort|left the battle|ended the battle|link/i.test(m.text())) console.log(nick, 'LOG', m.text().slice(0, 200)); }); P[nick] = p;
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&' + Q); return b;
}
for (const nick of ['Arjun', 'Ravi', 'Chen']) await phone(nick);
const { Arjun: A, Ravi: B, Chen: C } = P; let D;
const idOf = p => p.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
const ids = {}; for (const n of ['Arjun', 'Ravi', 'Chen']) ids[n] = await idOf(P[n]);
// the party (made over the service, not under test here): Arjun adds Ravi, Ravi accepts, Arjun invites, Ravi joins
const send = (p, m) => p.evaluate(m => window.__on.ON.ws.send(JSON.stringify(m)), m);
await send(A, { t: 'friendAdd', code: ids.Ravi }); await sleep(400); await send(B, { t: 'friendAccept', id: ids.Arjun }); await sleep(400);
await send(A, { t: 'invite', id: ids.Ravi }); await sleep(400); await send(B, { t: 'accept', from: ids.Arjun }); await sleep(800);
for (let i = 0; i < 12 && await A.evaluate(() => (window.__on.ON.party || { members: [] }).members.length) !== 2; i++) await sleep(250);
ok(await A.evaluate(() => (window.__on.ON.party || { members: [] }).members.length) === 2, 'Arjun and Ravi are a party');
const queue = async p => { await p.click('#segFmt button[data-v="1"]'); await p.click('#playBtn'); };
await queue(A); await sleep(600); await queue(C); await sleep(1200);
// what each phone's pop-up shows: per army, per seat: name or Computer, its lane line, ready
const view = p => p.evaluate(() => { const pop = document.getElementById('mlPop'); return { open: !!pop && !pop.hidden, sides: [...document.querySelectorAll('#mlPop .mlside')].map(s => [...s.querySelectorAll('.mlseat')].map(x => x.querySelector('b').textContent.replace(' you', '') + '|' + (x.querySelector('small') || {}).textContent)) }; });
const flat = v => v.sides.flat();
// a tap: the button must be the topmost thing at its centre (nothing covers it), then a DOM click (headless frames
// crawl during the warm-up, so Playwright's own click waits for ever on "stable")
const tap = async (p, sel) => { const r = await p.evaluate(sel => { const b = document.querySelector(sel); if (!b) return 'missing'; const q = b.getBoundingClientRect(), e = document.elementFromPoint(q.x + q.width / 2, q.y + q.height / 2); if (!(e && (e === b || b.contains(e)))) return 'covered by ' + (e && (e.id || e.className)); b.click(); return 'ok'; }, sel); if (r !== 'ok') ok(false, `tap ${sel}: ${r}`); };
let vA = await view(A);
ok(vA.open && flat(vA).length === 8, `one lobby, 8 seats: ${JSON.stringify(vA.sides)}`);
ok(flat(vA).filter(s => s.startsWith('Computer')).length === 5, 'computers in the other 5 seats');
for (const [p, n] of [[B, 'Ravi'], [C, 'Chen']]) { const v = await view(p); ok(v.open && JSON.stringify(v.sides.map(sd => sd.map(x => x.split('|')[0]))) === JSON.stringify(vA.sides.map(sd => sd.map(x => x.split('|')[0]))), `${n} sees the same seats`); }
// lanes
const lane = (p, l) => tap(p, `#mlPop [data-lane="${l}"]`);
await lane(A, 'L'); await lane(B, 'R'); await lane(C, 'J'); await sleep(1000);
const seatOf = (v, n) => flat(v).find(s => s.startsWith(n + '|')) || '';
let vB = await view(B), vC = await view(C); vA = await view(A);
ok(seatOf(vB, 'Arjun').includes('Left') && seatOf(vA, 'Ravi').includes('Right'), 'teammates see each other\'s lanes within 1 s');
ok(!seatOf(vC, 'Arjun').includes('Left') && seatOf(vA, 'Chen').split('|')[1].trim() === '', 'enemies don\'t see your lane');
ok(!flat(vA).some(s => s.startsWith('Computer') && /Left|Right|Jungle/.test(s)), 'computers show no lane');
// Ravi taps a computer seat in another army: asked to leave the party; No first, then Yes
const armyOf = (v, n) => v.sides.findIndex(sd => sd.some(x => x.startsWith(n + '|')));
const empty = vB.sides.findIndex((sd, c) => c !== armyOf(vB, 'Ravi') && c !== armyOf(vB, 'Chen') && sd.every(x => x.startsWith('Computer')));
await tap(B, `#mlPop [data-seat="${empty},0"]`); await sleep(300);
ok(await B.isVisible('#mlPop .mlask'), 'moving to another army asks: leave the party?');
await tap(B, '#mlPop [data-no]'); await sleep(800);
ok(armyOf(await view(B), 'Ravi') === armyOf(vA, 'Ravi') && await B.evaluate(() => !!window.__on.ON.party), 'No: Ravi stays, still in the party');
await tap(B, `#mlPop [data-seat="${empty},0"]`); await sleep(300); await tap(B, '#mlPop [data-yes]'); 
for (let i = 0; i < 20 && armyOf(vA = await view(A), 'Ravi') !== empty; i++) await sleep(250); // (headless phones are slow to repaint)
ok(armyOf(vA, 'Ravi') === empty && await B.evaluate(() => !window.__on.ON.party), `Yes: Ravi moved to another army and left the party (army ${armyOf(vA, 'Ravi')} want ${empty}, party ${await B.evaluate(() => JSON.stringify(window.__on.ON.party))})`);
// Chen leaves: his seat reads Computer on the others at once, nobody else moves
const before = JSON.stringify(vA.sides.map(sd => sd.map(x => x.split('|')[0])));
const chenAt = [armyOf(vA, 'Chen'), vA.sides[armyOf(vA, 'Chen')].findIndex(x => x.startsWith('Chen|'))];
await tap(C, '#mlPop [data-cancel]'); await sleep(1000);
vA = await view(A);
ok(vA.sides[chenAt[0]][chenAt[1]].startsWith('Computer'), 'Chen left: his seat reads Computer within 1 s');
ok(JSON.stringify(vA.sides.map(sd => sd.map(x => x.split('|')[0]))) === before.replace('"Chen"', '"Computer"'), `nobody else moved ${before} -> ${JSON.stringify(vA.sides)}`);
const cB = browsers[2]; await cB.close(); browsers.splice(2, 1); // (Chen has gone)
await phone('Dev'); D = P.Dev; await idOf(D);
await queue(D); for (let i = 0; i < 16 && !(vA = await view(A)).sides[chenAt[0]][chenAt[1]].startsWith('Dev|'); i++) await sleep(250);
ok(vA.sides[chenAt[0]][chenAt[1]].startsWith('Dev|'), 'Dev joins and takes that seat from the computer');
// Done = ready; the Lobby button reopens it; still ready
await lane(D, 'J');
const done = p => tap(p, '#mlPop [data-done]');
await done(A); await sleep(400);
ok(!(await view(A)).open && await A.isVisible('#searchLobby') && /Ready/.test(await A.textContent('#searchT')), 'Done: pop-up closes, the bar shows Ready and a Lobby button');
ok(await A.evaluate(() => window.__fb.G.warmup != null), 'warm-up running behind the lobby');
await tap(A, '#searchLobby'); await sleep(300); ok((await view(A)).open, 'Lobby reopens the pop-up');
await lane(A, 'J'); await sleep(800); ok(seatOf(await view(A), 'Arjun').includes('Jungle') && seatOf(await view(A), 'Arjun').includes('Ready'), 'lane changed, still ready');
await done(A); await done(B); await done(D); await sleep(1500);
const clock = await A.evaluate(() => window.__on.ON.lobby && window.__on.ON.lobby.endsIn);
ok(clock != null && clock <= 10500, `all ready: the clock drops to 10 s (${Math.round(clock / 1000)} s) ${JSON.stringify((await A.evaluate(() => window.__on.ON.lobby.sides)).flat().filter(Boolean).map(x => x.nick + x.ready))}`);
// the pop-up and the bar fit a small phone (667x375): nothing cut off, buttons at least 44 px
await D.setViewportSize({ width: 667, height: 375 }); await tap(D, '#searchLobby'); await sleep(300);
const fit = await D.evaluate(() => { const r = document.querySelector('#mlPop .mlbox').getBoundingClientRect(), bs = [...document.querySelectorAll('#mlPop button')].map(b => b.getBoundingClientRect().height); return { in: r.top >= 0 && r.left >= 0 && r.bottom <= innerHeight && r.right <= innerWidth, scroll: document.querySelector('#mlPop .mlbox').scrollHeight > document.querySelector('#mlPop .mlbox').clientHeight + 1, minB: Math.min(...bs) }; });
ok(fit.in && !fit.scroll && fit.minB >= 44, `pop-up fits 667x375 ${JSON.stringify(fit)}`);
await done(D);
// the versus screen on every phone, 10 s, then the battle
const players = [A, B, D];
for (let i = 0; i < 40 && !(await Promise.all(players.map(p => p.evaluate(() => { const v = document.getElementById('vsScreen'); return !!v && !v.hidden; })))).every(Boolean); i++) await sleep(500);
const t0 = Date.now();
await Promise.all(players.map(p => p.evaluate(() => { const t = +document.getElementById('vsScreen').dataset.shown, L = window.__vsLog = { shown: t, play: null, hid: null }; const iv = setInterval(() => { const G = window.__fb.G; if (L.play == null && G.state === 'play') L.play = performance.now() - t; if (L.hid == null && document.getElementById('vsScreen').hidden) L.hid = performance.now() - t; if (L.play != null && L.hid != null) clearInterval(iv); }, 50); })));
const vs = await A.evaluate(() => [...document.querySelectorAll('#vsScreen .vscol')].map(c => [...c.querySelectorAll('p')].map(p => p.textContent).join('+')));
ok(vs.length === 4 && vs.flat().join().includes('ArjunJungle') && vs.join().includes('RaviRight') && vs.join().includes('DevJungle') && vs.join().split('Computer').length - 1 === 5, `versus: four armies, names, lanes, computers ${JSON.stringify(vs)}`);
{ const f = await D.evaluate(() => { const v = document.querySelector('#vsScreen'), r = v.getBoundingClientRect(), cs = [...v.querySelectorAll('.vscol')].map(c => c.getBoundingClientRect()); return { ok: cs.every(c => c.right <= innerWidth + .5 && c.bottom <= innerHeight + .5 && c.left >= -.5) && Math.abs(r.width - innerWidth) < 1, w: innerWidth, h: innerHeight, r: [r.width, r.height], cs: cs.map(c => [Math.round(c.left), Math.round(c.right), Math.round(c.bottom)]) }; }); ok(f.ok, `versus fits 667x375 ${JSON.stringify(f)}`); }
await sleep(8500);
await sleep(1);
{ let st = []; for (let i = 0; i < 60; i++) { st = await Promise.all(players.map(p => p.evaluate(() => [window.__fb.G.state, window.__fb.G.role, document.getElementById('vsFoot') && document.getElementById('vsFoot').textContent, (document.querySelector('.toast') || {}).textContent || '']))); if (st.every(x => x[0] === 'play')) break; await sleep(1000); }
  if (!st.every(x => x[0] === 'play')) { ok(false, `the battle loads on every phone ${JSON.stringify(st)}`); for (const b of browsers) await b.close(); process.exit(1); } }
console.log(`battle loaded ${((Date.now() - t0) / 1000).toFixed(1)} s after the versus screen`);
await sleep(2000);
const st = await Promise.all(players.map(p => p.evaluate(() => { const G = window.__fb.G, S = window.__on.ON.start; return { role: G.role, state: G.state, net: window.__fb.session ? 1 : 0, myTi: G.myTi, seat: S.seats[window.__on.ON.me.id], vs: !document.getElementById('vsScreen').hidden, roles: new URLSearchParams(location.search).get('roles') === '1' }; })));
ok(st.filter(s => s.role === 'host').length === 1, `one host, on a player's phone ${JSON.stringify(st)}`);
{ const L = await Promise.all(players.map(p => p.evaluate(() => window.__vsLog))); ok(L.every(x => x.play != null && x.play >= 9500 && x.hid >= 9500), `versus held 10 s on every phone, then the battle (ms) ${JSON.stringify(L.map(x => [Math.round(x.play), Math.round(x.hid)]))}`); }
ok(st.every(s => s.myTi === s.seat), `everyone in his own army ${JSON.stringify(st)}`)
if (!st.every(s => s.myTi === s.seat)) console.log('notes', JSON.stringify(await Promise.all(players.map(p => p.evaluate(() => [document.getElementById('netNote').textContent, (document.querySelector('.toast') || {}).textContent])))));
ok(st.every(s => !s.vs), 'versus gone once the battle shows');
console.log('roles', st[0].roles ? 'on' : 'off', JSON.stringify(await Promise.all(players.map(p => p.evaluate(() => { const S = window.__on.ON.start; return [S.room, S.host, S.late]; })))));
console.log(fails ? `F2: ${fails} FAILED` : 'F2: ALL PASS');
for (const b of browsers) await b.close();
process.exit(fails ? 1 : 0);
