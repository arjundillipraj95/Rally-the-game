// V2 check: party voice, as on three real phones (touch screens). Arjun and Ravi form a party on the main screen and
// hear each other before any search (the lower id is kept from calling at first, so the call-back after 8 s is
// proved too). Meera joins the party: all three pairs hear. Mute and per-friend mute. They search Trio, the lobby
// and the battle start: no call is closed or replaced and sound keeps arriving. Meera leaves the party: her calls
// end, Arjun and Ravi still hear each other, and nobody calls her again.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--autoplay-policy=no-user-gesture-required'] };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browsers = [], pages = [];
for (const nick of ['Arjun', 'Ravi', 'Meera']) {
  const b = await chromium.launch(opts); browsers.push(b);
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; window.__voiceDropUntil = performance.now() + 40000; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&' + (process.env.Q ?? '?crown2=1').replace(/^\?/, ''));
}
const [A, B, C] = pages, res = {};
const end = async ok => { console.log(JSON.stringify(res)); console.log(ok ? 'PASS' : 'FAIL'); for (const b of browsers) await b.close(); process.exit(ok ? 0 : 1); };
const code = p => p.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
const [ida, idb, idc] = [await code(A), await code(B), await code(C)]; console.log('codes', ida, idb, idc);
// friends: Arjun adds both, they accept
await A.evaluate(([b, c]) => { window.__on.online.addFriend(b); window.__on.online.addFriend(c); }, [idb, idc]); await sleep(1200);
for (const p of [B, C]) await p.evaluate(a => window.__on.online.accept(a), ida); await sleep(1200);
const invite = async (P, id) => { await A.evaluate(x => window.__on.online.invite(x), id);
  const ok = await P.waitForFunction(() => { const y = document.getElementById('inviteYes'); if (y && !y.hidden && !document.getElementById('inviteToast').hidden) { y.click(); return true; } return false; }, null, { timeout: 15000, polling: 200 });
  await P.waitForFunction(() => window.__on.ON.party && window.__on.ON.party.members.length > 1, null, { timeout: 10000 }); };
const vs = p => p.evaluate(() => window.__fb.voiceState());
const lv = async (p, ms = 3000) => { const e0 = await p.evaluate(() => window.__fb.voiceLevels()); await sleep(ms); const e1 = await p.evaluate(() => window.__fb.voiceLevels()); const o = {}; for (const k in e1) o[k] = { d: e1[k].energy - ((e0[k] || {}).energy || 0), playing: e1[k].playing, muted: e1[k].muted }; return o; };
const stat = p => p.evaluate(() => (document.getElementById('pvStat') || document.getElementById('voiceStat') || {}).textContent || '');
const hears = (o, id) => o[id] && o[id].d > 1e-4 && o[id].playing;
// 1) Arjun + Ravi: the party bar offers Join voice; both tap it
await invite(B, idb);
await A.waitForSelector('#pvJoin', { timeout: 10000 }); await B.waitForSelector('#pvJoin', { timeout: 10000 });
res.joinChip = true;
await A.tap('#pvJoin'); await B.tap('#pvJoin');
let waiting = false, st = [];
for (let i = 0; i < 40; i++) { await sleep(1000); st = [await stat(A), await stat(B)]; if (/waiting for their call \d+s/.test(st.join())) waiting = true; if (st.every(s => /hearing them · they hear you/.test(s))) break; }
console.log('home A:', JSON.stringify(st[0]), '\nhome B:', JSON.stringify(st[1]));
res.callBack = waiting;
let [la, lb] = [await lv(A), await lv(B)];
res.homeHear = hears(la, idb) && hears(lb, ida); await A.screenshot({ path: '/tmp/v2home.png' }); // (the party bar, to judge by eye)
// 2) mute: Arjun mutes himself, Ravi gets nothing more from him; unmute; Ravi mutes Arjun on his side
await A.tap('#pvMic'); await sleep(800); const m1 = await lv(B); await A.tap('#pvMic'); await sleep(800); const m2 = await lv(B);
res.muteSelf = m1[ida].d < lb[ida].d / 20 && m2[ida].d > lb[ida].d / 3;
await B.tap(`[data-pvf="${ida}"]`); await sleep(500); res.muteFriend = (await lv(B, 500))[ida].muted; await B.tap(`[data-pvf="${ida}"]`); await sleep(300);
// 3) Meera joins the party: all three pairs hear (the drop switch is over: the lower id calls at once)
await A.evaluate(() => { window.__voiceDropUntil = 0; }); await B.evaluate(() => { window.__voiceDropUntil = 0; }); await C.evaluate(() => { window.__voiceDropUntil = 0; });
await invite(C, idc); await C.waitForSelector('#pvJoin', { timeout: 10000 }); await C.tap('#pvJoin');
for (let i = 0; i < 30; i++) { await sleep(1000); const v = [await vs(A), await vs(B), await vs(C)]; if (v.every(x => x.heard === 2)) break; }
[la, lb] = [await lv(A), await lv(B)]; const lc = await lv(C);
res.threeHear = hears(la, idb) && hears(la, idc) && hears(lb, ida) && hears(lb, idc) && hears(lc, ida) && hears(lc, idb);
console.log('three:', JSON.stringify(await stat(C)));
// 4) they search Trio: lobby, then the battle. The same calls carry on
for (const p of pages) await p.evaluate(() => { window.__calls0 = window.__fb.voiceCalls(); });
await A.tap('#segFmt button[data-v="2"]'); await A.tap('#playBtn');
console.log('waiting for the Trio battle (up to 120 s)...');
for (const p of pages) await p.waitForFunction(() => window.__fb && window.__fb.G.state === 'play', null, { timeout: 150000 });
await sleep(4000);
const same = p => p.evaluate(() => { const now = window.__fb.voiceCalls(); return window.__calls0.size === 2 && [...window.__calls0].every(([k, c]) => now.get(k) === c); });
res.callsKept = (await same(A)) && (await same(B)) && (await same(C));
[la, lb] = [await lv(A), await lv(B)];
res.battleHear = hears(la, idb) && hears(la, idc) && hears(lb, ida);
res.battleBox = await A.evaluate(() => !document.getElementById('micBtn').hidden && /hearing them/.test(document.getElementById('voiceStat').textContent));
console.log('battle A:', JSON.stringify(await A.evaluate(() => document.getElementById('voiceStat').textContent)));
// 5) Meera leaves the party: her calls end on every phone; Arjun and Ravi still hear each other; nobody calls her again
await C.evaluate(() => window.__on.online.leaveParty()); await sleep(5000);
const [va, vb, vc] = [await vs(A), await vs(B), await vs(C)];
[la, lb] = [await lv(A), await lv(B)];
res.leaveDrops = !va.calls.includes(idc) && !vb.calls.includes(idc) && vc.calls.length === 0 && !vc.live;
res.pairStays = hears(la, idb) && hears(lb, ida);
await sleep(6000); res.notCalledAgain = (await vs(C)).calls.length === 0 && !(await vs(A)).calls.includes(idc);
await end(Object.values(res).every(Boolean));
