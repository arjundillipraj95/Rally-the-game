// F23: the party leader removes a party member (from the friends panel, and from the lobby pop-up while
// searching), and anyone can leave the party from the friends panel. Needs bash store/servers.sh.
// Usage (from game/): node store/r_F23.mjs
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const NICKS = ['Arjun', 'Ravi'], brs = [], pages = [];
for (const nick of NICKS) {
  const b = await chromium.launch(opts); brs.push(b);
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1');
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
const st = p => p.evaluate(() => { const ON = window.__on.ON; return { party: ON.party ? ON.party.members.length : 0, lobby: !!ON.lobby }; });
const toastSeen = [];
B.on('console', () => {});
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 30000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me.id; });
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800); await B.click('#friendsDone');
const party = async () => {
  await A.waitForSelector(`[data-inv="${codeB}"]`); await A.click(`[data-inv="${codeB}"]`); await sleep(800);
  await B.waitForFunction(() => !document.getElementById('inviteToast').hidden, null, { timeout: 20000 }); await B.evaluate(() => document.getElementById('inviteYes').click()); await sleep(1500);
};
const watchRemoved = () => B.evaluate(() => { window.__removed = null; window.__on.bus.on('online', ({ k, m }) => { if (k === 'removed') window.__removed = m.by; }); });
await watchRemoved();
// 1. from the friends panel
await party();
let a = await st(A), b = await st(B); ok(a.party === 2 && b.party === 2, `party of two (${a.party}, ${b.party})`);
ok(!!(await A.$(`#fParty [data-kick="${codeB}"]`)), 'the leader sees Remove next to Ravi');
ok(!(await B.$('#fParty [data-kick]')) && !!(await B.$('#fParty [data-pleave]')), 'Ravi (not the leader) sees Leave party but no Remove');
await A.click(`#fParty [data-kick="${codeB}"]`); await sleep(1500);
a = await st(A); b = await st(B);
ok(a.party <= 1 && b.party === 0, `removed: Arjun's party is just him, Ravi has none (${a.party}, ${b.party})`);
ok((await B.evaluate(() => window.__removed)) === 'Arjun', 'Ravi is told Arjun removed him');
// 2. from the lobby pop-up, while searching
await party(); await A.click('#friendsDone'); await sleep(500);
await A.click('#segFmt button[data-v="1"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__on.ON.lobby, null, { timeout: 30000 }); await B.waitForFunction(() => window.__on.ON.lobby, null, { timeout: 30000 });
await A.evaluate(async () => { const { mlOpen } = await import('/src/ui/matchlobby.js'); mlOpen(); }); await sleep(800);
const kb = await A.$(`#mlPop [data-kick="${codeB}"]`); ok(!!kb, 'the lobby pop-up shows Remove on Ravi\'s seat');
if (kb) { await A.evaluate(c => document.querySelector(`#mlPop [data-kick="${c}"]`).click(), codeB); await sleep(2000); }
a = await st(A); b = await st(B);
ok(b.party === 0 && !b.lobby, `Ravi is out of the party and the lobby (${JSON.stringify(b)})`);
ok(a.lobby, 'Arjun is still searching');
const seatOfB = await A.evaluate(c => (window.__on.ON.lobby.sides || []).flat().some(x => x && x.id === c), codeB); ok(!seatOfB, 'Ravi\'s seat went back to the computer');
await A.evaluate(() => window.__on.online.cancel()); await A.waitForFunction(() => !window.__on.ON.lobby, null, { timeout: 15000 }); await sleep(1500);
await A.waitForSelector('#friendsBtn', { state: 'visible', timeout: 15000 });
// 3. leaving the party yourself
await A.click('#friendsBtn'); await sleep(500); await party();
await B.click('#friendsBtn'); await sleep(600); await B.click('#fParty [data-pleave]'); await sleep(1500);
a = await st(A); b = await st(B); ok(a.party <= 1 && b.party === 0, `Ravi left: Arjun's party is just him, Ravi has none (${a.party}, ${b.party})`);
console.log(`${pass}/${pass + fail}`); for (const x of brs) await x.close(); process.exit(fail ? 1 : 0);
