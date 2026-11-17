// FIX5: the lobby clock drops to 10 s only once every seat has a player and all are Done (Arjun 17 Nov). Straight to
// the online service (node WebSockets): a Solo lobby (4 seats) filled by 4 players: 3 Done, the clock runs on; the
// 4th Done, 10 s. A Trio lobby with 2 players, both Done: it runs on. Needs the online service (:8787).
const URL = (process.env.ONLINE || 'http://127.0.0.1:8787').replace(/^http/, 'ws') + '/ws', sleep = ms => new Promise(r => setTimeout(r, ms));
async function player(nick) {
  const ws = new WebSocket(URL), p = { ws, last: null, send: m => ws.send(JSON.stringify(m)) };
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.t === 'lobby') p.last = m; if (m.t === 'me') p.me = m; };
  await new Promise(r => { ws.onopen = r; }); p.send({ t: 'hello', nick }); for (let k = 0; k < 50 && !p.me; k++) await sleep(100); return p;
}
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const left = p => (p.last && p.last.room ? p.last.endsIn / 1000 : -1);
// Solo: 4 seats
const S = []; for (let i = 0; i < 4; i++) S.push(await player('Solo' + i));
for (const p of S) { p.send({ t: 'queue', fmt: 0 }); await sleep(300); }
await sleep(800); const rooms = new Set(S.map(p => p.last && p.last.room)); ok(rooms.size === 1 && !rooms.has(undefined), `4 Solo searchers share one lobby (${[...rooms]})`);
for (const p of S.slice(0, 3)) { p.send({ t: 'lane', lane: 'J' }); p.send({ t: 'ready', ready: true }); } await sleep(800);
ok(left(S[0]) > 15, `3 of 4 Done: the clock runs on (${left(S[0]).toFixed(0)} s)`);
S[3].send({ t: 'lane', lane: 'L' }); S[3].send({ t: 'ready', ready: true }); await sleep(800);
ok(left(S[0]) <= 10.5 && left(S[0]) > 0, `all 4 seated and Done: 10 s (${left(S[0]).toFixed(0)} s)`);
// Trio: 2 players of 12 seats, both Done
const T = [await player('TrioA'), await player('TrioB')];
for (const p of T) { p.send({ t: 'queue', fmt: 2 }); await sleep(300); } await sleep(800);
for (const p of T) { p.send({ t: 'lane', lane: 'R' }); p.send({ t: 'ready', ready: true }); } await sleep(800);
ok(T[0].last && T[0].last.room === T[1].last.room && left(T[0]) > 15, `Trio, 2 of 12 seats, both Done: the clock runs on (${left(T[0]).toFixed(0)} s)`);
for (const p of [...S, ...T]) p.ws.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
