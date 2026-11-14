// V1d check: one phone's call never comes (the lower id is stopped from calling). The waiting phone must say so, call
// back after 8 s, and sound must arrive both ways. Set up as r_V1.mjs (two touch phones, one battle, same side).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [], ctxs = [];
for (const [b, nick] of [[b1, 'Arjun'], [b2, 'Ravi']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true }); ctxs.push(ctx);
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__voiceDropUntil = Infinity; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
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
// V1d check: the phone with the lower id never gets to call (as when its call is dropped or lost: here the test switch
// stops it for good). Before V1d the other phone said "not calling yet" for ever. Now it says it is waiting for their
// call, then calls itself after 8 s, and sound arrives both ways.
const vs = p => p.evaluate(() => window.__fb.voiceState());
const stat = p => p.evaluate(() => document.getElementById('voiceStat').textContent);
const lv = async (p, ms = 3000) => { const e0 = await p.evaluate(() => window.__fb.voiceLevels()); await sleep(ms); const e1 = await p.evaluate(() => window.__fb.voiceLevels()); let d = 0, playing = true; for (const k in e1) { d += e1[k].energy - ((e0[k] || {}).energy || 0); playing = playing && e1[k].playing; } return { d, playing }; };
for (const p of [A, B]) await p.evaluate(() => { const G = window.__fb.G; G.ALLY[1] = G.ALLY[0]; });
for (let i = 0; i < 20 && !((await vs(A)).live && (await vs(B)).live); i++) await sleep(500);
const res = {}; let waiting = '', t0 = Date.now(), heard = false, sA = '', sB = '';
for (let i = 0; i < 40 && !heard; i++) {
  await sleep(1000); [sA, sB] = [await stat(A), await stat(B)];
  if (/waiting for their call/.test(sA + sB) && !waiting) waiting = (/waiting for their call \d+s/.exec(sA + sB) || [''])[0];
  heard = /hearing them/.test(sA) && /hearing them/.test(sB) && /they hear you/.test(sA) && /they hear you/.test(sB);
}
const took = Math.round((Date.now() - t0) / 1000);
console.log('waiting line seen:', JSON.stringify(waiting), '| linked after', took, 's\nstatus A:', JSON.stringify(sA), '\nstatus B:', JSON.stringify(sB));
res.sawWaiting = !!waiting; res.fallbackLinked = heard; res.showsIds = /\(I call\)/.test(sA + sB) && /\(they call\)/.test(sA + sB) && /Signal: ok/.test(sA);
const [hA, hB] = [await lv(A), await lv(B)];
res.hearEachOther = hA.d > 1e-4 && hB.d > 1e-4; res.playing = hA.playing && hB.playing;
const ok = Object.values(res).every(Boolean); console.log(JSON.stringify(res)); console.log(ok ? 'PASS' : 'FAIL');
await b1.close(); await b2.close(); process.exit(ok ? 0 : 1);
