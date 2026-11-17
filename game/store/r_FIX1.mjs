// FIX1: two players in one lobby must see each other (Arjun 17 Nov: one phone showed 1/12, the other both). Demi
// searches Trio, picks Jungle, taps Done and reopens the pop-up; Ana comes in. MODE=search (default): she searches
// Trio herself; party: she came in his party; reconnect: as search, then Demi's link drops and comes back (the
// service keeps his seat, picks him up again, and resends the lobby every 2 s). Both pop-ups: 2/12, both names.
// Needs the servers (the online service restarted after editing it). Run each MODE.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const NICKS = ['Demi', 'Ana'], brs = [], pages = [];
for (const nick of NICKS) {
  const b = await chromium.launch(opts); brs.push(b);
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick); }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1');
}
const MODE = process.env.MODE || 'search', [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
for (const p of pages) await p.waitForFunction(() => window.__on && window.__on.ON.up && window.__on.ON.me, null, { timeout: 30000 });
if (MODE !== 'search' && MODE !== 'reconnect') {
  const codeB = await B.evaluate(() => window.__on.ON.me.id);
  await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
  await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
  await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
  // (friends, not a party: B leaves the party a friend request may make)
  if (MODE !== 'party') { await B.evaluate(() => window.__on.online.leaveParty && window.__on.online.leaveParty()); await sleep(800); }
  else { await A.click('#friendsBtn'); await sleep(600); const inv = await A.$('[data-inv]'); if (inv) await inv.click(); await sleep(800); await A.click('#friendsDone'); await B.waitForSelector('#inviteYes:not([hidden])', { timeout: 8000 }).catch(() => {}); await B.evaluate(() => document.getElementById('inviteYes').click()); await sleep(1200); console.log('party', await A.evaluate(() => JSON.stringify(window.__on.ON.party))); }
}
await A.click('#segFmt button[data-v="2"]'); await A.click('#playBtn');
await A.waitForFunction(() => document.querySelector('#mlPop:not([hidden]) .mllane'), null, { timeout: 30000 });
await A.evaluate(() => document.querySelector('#mlPop [data-lane="J"]').click()); await sleep(400); await A.evaluate(() => document.querySelector('#mlPop [data-done]').click()); await sleep(1500);
await A.evaluate(() => { const b = document.getElementById('searchLobby'); b.click(); return b.hidden; }); await sleep(500); // (reopen the pop-up, as Demi did)
const head = p => p.evaluate(() => { const h = document.querySelector('#mlPop .mlhead b'); return (h ? h.textContent : '-') + ' | ' + [...document.querySelectorAll('#mlPop .mlseat:not(.cpu) b')].map(b => b.textContent).join(', ') + ' | room ' + (window.__on.ON.lobby && window.__on.ON.lobby.room); });
if (MODE === 'party') { /* (B came with the party) */ }
else if (MODE === 'search' || MODE === 'reconnect') { await B.click('#segFmt button[data-v="2"]'); await B.click('#playBtn'); }
else { await B.evaluate(() => { window.__msgs = []; window.__on.bus.on('online', e => window.__msgs.push(e.k + ':' + JSON.stringify(e.m).slice(0, 120))); }); await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]'); }
await B.waitForFunction(() => document.querySelector('#mlPop:not([hidden]) .mllane'), null, { timeout: 30000 }); await B.evaluate(() => document.querySelector('#mlPop [data-lane="L"]').click()); await sleep(2500);
if (MODE === 'reconnect') { // (Demi's link drops and comes back: he keeps his seat and sees Ana's lane change)
  await A.evaluate(() => window.__on.ON.ws.close()); await sleep(4000);
  await B.evaluate(() => document.querySelector('#mlPop [data-lane="R"]').click()); await sleep(3000);
  const t = await A.evaluate(() => document.querySelector('#mlPop').textContent); ok(/Right/.test(t), "after Demi's link came back he sees Ana's new lane");
}
const ha = await head(A), hb = await head(B);
ok(/2\/12/.test(ha) && /Ana/.test(ha), `Demi's lobby: ${ha}`);
ok(/2\/12/.test(hb) && /Demi/.test(hb), `Ana's lobby: ${hb}`);
for (const b of brs) await b.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
