// V1 check: teammates' phones link an audio call and hear each other; a phone on another team is never called.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1');
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
const ev = (p, f) => p.evaluate(f);
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
console.log('B code', codeB);
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
// Arjun starts a Solo battle alone; once it's running, Ravi joins it from his friends list
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
console.log('waiting for Arjun\'s battle to start (60 s)...');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play', null, { timeout: 60000 }); await sleep(3000);
const T = await A.evaluate(() => Math.round(window.__fb.G.T)); console.log('joined at battle time', T);
const vs = p => p.evaluate(() => window.__fb.voiceState());
await sleep(6000);
const [va, vb] = [await vs(A), await vs(B)];
const teamA = await A.evaluate(() => window.__fb.G.myTi), teamB = await B.evaluate(() => window.__fb.G.myTi);
console.log('teams', teamA, teamB, 'A voice', JSON.stringify(va), 'B voice', JSON.stringify(vb));
const sameTeam = teamA === teamB;
// the same side (as a Duo partner or a team-mode ally is): both phones must link a call and receive the other's sound
const al = async p => p.evaluate(() => { const G = window.__fb.G; G.ALLY[1] = G.ALLY[0]; return G.ALLY.join(''); });
console.log('sides now', await al(A), await al(B));
let side = null; for (let i = 0; i < 20 && !(side && side[0].heard && side[1].heard); i++) { await sleep(1000); side = [await vs(A), await vs(B)]; }
console.log('same side', JSON.stringify(side));
const sideOk = side[0].calls.length === 1 && side[1].calls.length === 1 && side[0].heard === 1 && side[1].heard === 1;
// the mute button: off means the track is disabled, not the call dropped
await A.click('#micBtn'); const muted = await A.evaluate(() => { const t = document.getElementById('micBtn'); return t.classList.contains('off'); });
await A.click('#micBtn');
let ok;
ok = sameTeam ? (va.live && vb.live && va.calls.length + vb.calls.length >= 1) : (va.calls.length === 0 && vb.calls.length === 0);
console.log(ok && va.live && vb.live && muted ? 'PASS' : 'FAIL', 'mics live on both phones:', va.live, vb.live, sameTeam ? '(same team: call expected)' : '(other teams: no call, correct)', 'mute button shows off:', muted);
await b1.close(); await b2.close(); console.log(sideOk ? 'PASS same side: each phone hears the other' : 'FAIL same side');
process.exit(va.live && vb.live && muted && ok && sideOk ? 0 : 1);
