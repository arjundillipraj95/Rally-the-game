// F22: joined phones know every player by name all battle. A, B and C search Trio as one party;
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
// watch the joined phones each half second: does the host drop out of their list, and why
const watch = setInterval(async () => { for (const [k, P] of [[1, B], [2, Cc]]) try { const r = await P.evaluate(async () => { const { session } = await import('/src/net/session.js'); const N = session.NET; if (!N || N.role !== 'client') return N ? 'role ' + N.role + ' ' + N.name : 'no net'; const ps = N.room.peers(); return (ps.find(p => p.peer === N.hostPeer) ? 'host ok' : 'HOST MISSING') + ' peers ' + ps.length + ' gone ' + (N.hostGoneAt ? Math.round(performance.now() - N.hostGoneAt) : 0); }); if (!/host ok/.test(r) && !(window.__said = window.__said || {})[k]) { window.__said[k] = 1; console.log(NICKS[k], Math.round((Date.now() - t0) / 1000), r, '(the test machine stalls pages for seconds at a time; the stall log below shows it)'); } } catch (e) {} }, 500);
for (const P of pages) await inBattle(P);
console.log('all three in the battle after', Math.round((Date.now() - t0) / 1000), 's');
await sleep(12000); // (well past the 6 s a quiet roster used to last)
clearInterval(watch);
const view = p => p.evaluate(() => { const F = window.__fb, G = F.G; return { me: G.myTi, role: G.role, names: G.teams.map((t, i) => F.nick(i)), human: G.teams.map(t => !!(t && t.human)) }; });
for (const [k, P] of pages.entries()) console.log(NICKS[k], 'stalls over 1.5 s [at s, ms]:', JSON.stringify(await P.evaluate(() => window.__long)));
const stir = async () => { for (const P of pages) { await P.keyboard.down('KeyW'); await sleep(400); await P.keyboard.up('KeyW'); } await sleep(1500); }; // (players who stand still 30 s are handed to the computer until they move)
await stir();
const v = [await view(A), await view(B), await view(Cc)];
v.forEach((x, k) => console.log(NICKS[k], JSON.stringify(x)));
for (let k = 0; k < 3; k++) for (let j = 0; j < 3; j++) if (j !== k) {
  const ti = v[j].me;
  ok(v[k].names[ti] === NICKS[j], `${NICKS[k]}'s phone names ${NICKS[j]} (seat ${ti}): ${v[k].names[ti]}`);
  ok(v[k].human[ti], `${NICKS[k]}'s phone counts ${NICKS[j]} as a player`);
}
// a seat the host gives after the battle began (a late link-up): take C's seat away on the host, then give it back
const hostSeat = (on) => A.evaluate(on => { const seats = window.__fb.info.net.seats; if (!on) { window.__cs = Object.entries(seats).find(([k, t]) => t === window.__cti); delete seats[window.__cs[0]]; } else seats[window.__cs[0]] = window.__cs[1]; }, on); // (the host's own seat list, through the test hook)
await A.evaluate(ti => { window.__cti = ti; }, v[2].me);
await hostSeat(false); await sleep(2500);
let b = await view(B); ok(!b.human[v[2].me], `seat taken away on the host: Ravi's phone no longer counts Cara (${b.human[v[2].me]})`);
await hostSeat(true); await stir(); await sleep(1000);
b = await view(B); ok(b.human[v[2].me] && b.names[v[2].me] === 'Cara', `seat given after the start: Ravi's phone counts and names her (${b.names[v[2].me]})`);
console.log(`${pass}/${pass + fail}`); for (const b of brs) await b.close(); process.exit(fail ? 1 : 0);
