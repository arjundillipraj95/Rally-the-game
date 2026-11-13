// V1 check, as on two real phones (touch screens): Arjun's phone allows the mic; Ravi's phone refuses it at first
// (as Android's Chrome can when the ask didn't come from a tap), then he allows it and taps the mic. Both on one
// side: each must receive the other's sound (measured, not just a call object), muting must silence it at the other
// end, and unmuting bring it back. A phone on another side is never called.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch({ ...opts, args: opts.args.filter(a => a !== '--use-fake-ui-for-media-stream') }); // (Ravi: no automatic yes to the mic)
const pages = [], ctxs = [];
for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true }); ctxs.push(ctx);
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  if (process.env.NOLINK) await ctx.addInitScript(() => { window.__PEER_OPTS.config = { iceServers: [], iceTransportPolicy: 'relay' }; window.__vm = []; }); // (NOLINK=1: no road between the phones, as between some real networks)
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
const lv = async (p, ms = 3000) => { const e0 = await p.evaluate(() => window.__fb.voiceLevels()); await sleep(ms); const e1 = await p.evaluate(() => window.__fb.voiceLevels()); let d = 0, playing = true; for (const k in e1) { d += e1[k].energy - ((e0[k] || {}).energy || 0); playing = playing && e1[k].playing; } return { d, playing }; }; // (sound energy that arrived in those seconds, and whether it is being played)
const res = {};
await sleep(3000);
// 1) another side: nobody is called
const [va, vb] = [await vs(A), await vs(B)];
res.otherSide = va.calls.length === 0 && vb.calls.length === 0;
// 2) Ravi's mic was refused: the button asks for a tap
res.refused = vb.failed === 'denied' && await B.evaluate(() => document.getElementById('micBtn').classList.contains('ask'));
console.log('Arjun', JSON.stringify(va), '| Ravi', JSON.stringify(vb));
// 3) one side (a Duo partner or a team-mode ally): Ravi allows the mic and taps it
for (const p of [A, B]) await p.evaluate(() => { const G = window.__fb.G; G.ALLY[1] = G.ALLY[0]; });
await ctxs[1].grantPermissions(['microphone'], { origin: 'http://127.0.0.1:8766' });
await B.tap('#micBtn');
for (let i = 0; i < 12 && !(await vs(B)).live; i++) await sleep(250);
res.tapLive = (await vs(B)).live;
if (process.env.NOLINK) {
  let m = ''; for (let i = 0; i < 30 && !/get through|can't reach/.test(m); i++) { await sleep(1000); m = await A.evaluate(() => [...document.querySelectorAll('.toast,#toast,[class*=toast]')].map(e => e.textContent).join(' | ')); }
  console.log('NOLINK message on Arjun\'s phone:', JSON.stringify(m.slice(0, 200)), JSON.stringify(await vs(A)));
  const ok = /get through|can't reach/.test(m); console.log(ok ? 'PASS (no link: the phone says so)' : 'FAIL'); await b1.close(); await b2.close(); process.exit(ok ? 0 : 1);
}
let st = null; for (let i = 0; i < 25 && !(st && st[0].heard && st[1].heard); i++) { await sleep(1000); st = [await vs(A), await vs(B)]; }
console.log('one side', JSON.stringify(st)); 
const stat = async P => P.evaluate(() => document.getElementById('voiceStat').textContent); await sleep(2500);
const [sA, sB] = [await stat(A), await stat(B)]; console.log('status A:', JSON.stringify(sA), '\nstatus B:', JSON.stringify(sB));
const [hA, hB] = [await lv(A), await lv(B)];
res.statusShows = /hearing them/.test(sA) && /they hear you/.test(sA) && /hearing them/.test(sB) && /they hear you/.test(sB); res.hearEachOther = hA.d > 1e-4 && hB.d > 1e-4; res.playing = hA.playing && hB.playing;
// 4) Arjun mutes: nothing more arrives at Ravi's end; unmute: sound again
await A.tap('#micBtn'); await sleep(800); const mutedB = await lv(B);
await A.tap('#micBtn'); await sleep(800); const backB = await lv(B);
res.muteSilences = mutedB.d < hB.d / 20; res.unmuteBack = backB.d > hB.d / 3;
console.log('energy in 3 s: Arjun receives', hA.d.toExponential(2), 'Ravi receives', hB.d.toExponential(2), '| Ravi while Arjun muted', mutedB.d.toExponential(2), 'after unmute', backB.d.toExponential(2), '| playing', hA.playing, hB.playing);
const ok = Object.values(res).every(Boolean);
console.log(JSON.stringify(res)); console.log(ok ? 'PASS' : 'FAIL');
await b1.close(); await b2.close(); process.exit(ok ? 0 : 1);
