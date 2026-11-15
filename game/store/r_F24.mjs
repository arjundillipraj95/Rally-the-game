// F24: a frozen host doesn't split the battle. A, B and C search Trio as one party; A hosts. A freezes 10 s: the
// battle holds together (nobody takes over, nobody loses their army). A freezes 40 s: B or C takes over hosting,
// and when A's phone comes back it rejoins that battle as a player in its own army: one battle, three players.
// (from the F22 test:)
// after the host's roster has gone quiet (>6 s), every phone shows the other
// players by their nicknames (never a computer captain's name or a bare colour) and counts them as players.
// Needs bash store/servers.sh. Usage (from game/): node store/r_F22.mjs
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', '--autoplay-policy=no-user-gesture-required'] };
const NICKS = ['Arjun', 'Ravi', 'Cara'];
const brs = [], pages = [];
for (const nick of NICKS) {
  const b = await chromium.launch(opts); brs.push(b);
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); window.__long = []; try { new PerformanceObserver(l => { for (const e of l.getEntries()) if (e.duration > 1500) window.__long.push([Math.round(e.startTime / 1000), Math.round(e.duration)]); }).observe({ entryTypes: ['longtask'] }); } catch (e) {} }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&' + (process.env.Q ?? '?crown2=1').replace(/^\?/, ''));
}
const [A, B, Cc] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
const inBattle = p => p.waitForFunction(() => { const F = window.__fb; return F && F.G.state === 'play' && !F.G.warmup && (F.G.role === 'host' || F.G.role === 'client'); }, null, { timeout: 150000 });
const idOf = p => p.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 30000 }); await sleep(1500);
const codes = [];
for (const P of [B, Cc]) { // A befriends each of them
  const code = await idOf(P); codes.push(code);
  await A.click('#friendsBtn'); await A.fill('#fAddCode', code); await A.click('#fAddBtn'); await sleep(800); await A.click('#friendsDone');
  await P.click('#friendsBtn'); await P.waitForSelector('[data-acc]'); await P.click('[data-acc]'); await sleep(800); await P.click('#friendsDone'); await sleep(400);
}
// all three as one party, Trio: they start together on one side
for (const [k, P] of [B, Cc].entries()) {
  await A.click('#friendsBtn'); await sleep(800); await A.waitForSelector(`[data-inv="${codes[k]}"]`); await A.click(`[data-inv="${codes[k]}"]`); await sleep(800); await A.click('#friendsDone');
  await P.waitForFunction(() => !document.getElementById('inviteToast').hidden, null, { timeout: 30000 }); await P.evaluate(() => document.getElementById('inviteYes').click()); await sleep(1200);
}
const t0 = Date.now(); await A.click('#segFmt button[data-v="2"]'); await A.click('#playBtn');
await inBattle(A);
for (const P of pages) await inBattle(P);
console.log('all three in the battle after', Math.round((Date.now() - t0) / 1000), 's');
await sleep(5000);
const net = p => p.evaluate(() => { const F = window.__fb, G = F.G, N = F.info.net; return { role: N && N.role, name: N && N.name, seated: N && N.seats ? Object.values(N.seats) : [], me: G.myTi, state: G.state, human: G.teams.map(t => !!(t && t.human)), names: G.teams.map((t, i) => F.nick(i)) }; });
const cdpA = await A.context().newCDPSession(A);
const freeze = async (p, ms) => { await cdpA.send('Page.setWebLifecycleState', { state: 'frozen' }); await cdpA.send('Debugger.enable'); await cdpA.send('Debugger.pause').catch(() => {}); await sleep(ms); await cdpA.send('Debugger.resume').catch(() => {}); await cdpA.send('Page.setWebLifecycleState', { state: 'active' }); }; // (the host's page frozen the way a phone freezes a page in the background: no script runs, nothing is sent)
const all = async () => [await net(A), await net(B), await net(Cc)];
let v = await all(); const seats = v.map(x => x.me), code0 = v[0].name; console.log('before', JSON.stringify(v.map(x => [x.role, x.name, x.me])));
// 1. a 10 s freeze
await freeze(A, 10000); await sleep(6000);
v = await all(); console.log('after 10 s', JSON.stringify(v.map(x => [x.role, x.name])));
ok(v[0].role === 'host' && v[1].role === 'client' && v[2].role === 'client' && v.every(x => x.name === code0), '10 s freeze: same host, same battle');
ok(seats.every(ti => v[0].human[ti]), 'host still counts all three as players');
ok(v[1].names[seats[2]] === 'Cara' && v[2].names[seats[1]] === 'Ravi', 'and the joined phones still name each other');
// 2. a 40 s freeze
const fz = freeze(A, 40000);
await fz;
let one = false;
for (let k = 0; k < 40 && !one; k++) { await sleep(1000); v = await all();  one = v.filter(x => x.role === 'host').length === 1 && v.every(x => x.name === v[0].name) && v[0].name !== code0; }
console.log('after 40 s', JSON.stringify(v.map(x => [x.role, x.name, x.me])));
ok(one, 'after a 40 s freeze: one battle again, under the next code, with one host');
ok(v[0].role === 'client' && v[0].me === seats[0], `the old host rejoined as a player in his own army (${v[0].role}, seat ${v[0].me})`);
await sleep(3000); v = await all();
for (let k = 0; k < 3; k++) { const has = ti => v[k].role === 'host' ? v[k].seated.includes(ti) : v[k].human[ti]; ok(seats.every(has), `${NICKS[k]}'s phone has all three as players (${seats.map(ti => has(ti) ? 1 : 0).join('')})`); } // (the host by its seats: test captains stand still, and 30 s idle hands an army to the computer until its player moves)
ok(v[1].names[seats[0]] === 'Arjun' || v[2].names[seats[0]] === 'Arjun', 'Arjun has his name back, not a computer\'s');
console.log(`${pass}/${pass + fail}`); for (const b of brs) await b.close(); process.exit(fail ? 1 : 0);
