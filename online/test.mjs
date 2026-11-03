// Local check of the online service (run against `wrangler dev`): guests, friends, a party, matchmaking
// into a Duo lobby with a stranger, the battle starting, the relay, and host handover.
import WebSocket from 'ws';
const URL = process.env.URL || 'ws://127.0.0.1:8787/ws';
const sleep = ms => new Promise(r => setTimeout(r, ms));
function client(nick) {
  const ws = new WebSocket(URL), c = { ws, nick, got: [], me: null };
  ws.on('message', d => { const m = JSON.parse(d); c.got.push(m); if (m.t === 'me') c.me = m; });
  c.send = m => ws.send(JSON.stringify(m));
  c.last = t => [...c.got].reverse().find(m => m.t === t);
  c.ready = new Promise(r => ws.on('open', () => { c.send({ t: 'hello', nick }); r(); }));
  return c;
}
const A = client('Arjun'), B = client('Ravi'), C = client('Stranger'), D = client('Solo Sam');
await Promise.all([A.ready, B.ready, C.ready, D.ready]); await sleep(400);
const out = {};
out.codes = [A.me.id, B.me.id].join(' ');
A.send({ t: 'friendAdd', code: B.me.id }); await sleep(300);
out.bSeesRequest = (B.last('friends').reqs || []).map(r => r.nick).join();
B.send({ t: 'friendAccept', id: A.me.id }); await sleep(300);
out.aFriends = A.last('friends').list.map(f => f.nick + (f.online ? '(on)' : '')).join();
A.send({ t: 'invite', id: B.me.id }); await sleep(300);
out.bInvite = B.last('invite') && B.last('invite').nick;
B.send({ t: 'accept', from: A.me.id }); await sleep(300);
out.party = A.last('party').members.map(m => m.nick + (m.leader ? '*' : '')).join();
// a Duo search: the pair takes one side; a stranger joins and gets the other
A.send({ t: 'queue', fmt: 1 }); await sleep(300); C.send({ t: 'queue', fmt: 1 }); D.send({ t: 'queue', fmt: 1 }); await sleep(300);
const L = A.last('lobby'); out.lobby = L.sides.map(sd => sd.map(x => x.nick).join('+') || '-').join(' | ') + ` ends in ${Math.round(L.endsIn / 1000)}s`;
console.log(JSON.stringify(out, null, 1));
console.log('waiting for the lobby timer...'); await sleep(61500);
const S = A.last('start'); out.start = S && { host: S.host === A.me.id ? 'Arjun' : S.host, seats: Object.entries(S.seats).map(([id, ti]) => ({ [A.me.id]: 'Arjun', [B.me.id]: 'Ravi', [C.me.id]: 'Stranger', [D.me.id]: 'Sam' }[id] + ':' + ti)).join(' ') };
B.send({ t: 'relay', to: A.me.id, d: { hello: 1 } }); await sleep(300); out.relay = JSON.stringify(A.last('relay'));
A.ws.close(); await sleep(500); const nh = B.last('newHost'); out.handover = nh && (nh.host === B.me.id ? 'Ravi' : nh.host);
// leaving early: Sam quits twice (the second battle's quit is simulated by the room being started); his next search waits
D.send({ t: 'quit' }); await sleep(200); D.send({ t: 'queue', fmt: 0 }); await sleep(300);
out.quitOnce = (D.last('note') || {}).msg || 'no wait';
console.log(JSON.stringify(out, null, 1));
for (const c of [B, C, D]) c.ws.close();
