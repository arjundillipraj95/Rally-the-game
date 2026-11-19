// C1a: champions are one page each, chosen by setting or ?champ=, the same on every phone. Needs the servers.
// A test champion (window.__champs, dev only) with the spear alone plays every bot seat on the host (?botchamp=);
// the joined phone takes a bot's seat mid-battle: it must see the host's champion for every army, and its own captain
// carries only the spear (no weapon switch). The host's own captain stays the default (legionary, 3 weapons).
// The default battle being unchanged is r_SPLIT (seeded battle identical; only the settings page grew).
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const b1 = await chromium.launch(opts), b2 = await chromium.launch(opts);
const pages = [];
for (const [b, nick, q] of [[b1, 'Arjun', '&botchamp=tester'], [b2, 'Ravi', '']]) {
  const ctx = await b.newContext({ viewport: { width: 844, height: 390 } });
  await ctx.addInitScript(nick => { window.__testSheet = null; window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); localStorage.setItem('fb-nick', nick);
    window.__champs = [{ id: 'tester', name: 'Tester', cls: 'striker', stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 }, weapons: ['spear'], mount: { kind: 'horse', hp: 200, spd: 11.2 }, recruits: ['foot', 'arch'], influence: null, sp1: { name: 'Lunge', short: 'Lunge', cd: 6, range: 8, run(u) { u.n1 = (u.n1 || 0) + 1; } }, sp2: null, ult: null, armyUlt: null }]; }, nick);
  const p = await ctx.newPage(); p.on('pageerror', e => console.log(nick, 'ERR', e.message)); pages.push(p);
  await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1' + q);
}
const [A, B] = pages, sleep = ms => new Promise(r => setTimeout(r, ms));
await A.waitForFunction(() => document.getElementById('friendsSub').textContent !== 'Connecting…', null, { timeout: 20000 }); await sleep(1500);
const codeB = await B.evaluate(async () => { const ON = window.__on.ON; for (let k = 0; k < 60 && !(ON.me && ON.me.id); k++) await new Promise(r => setTimeout(r, 500)); return ON.me && ON.me.id; });
await A.click('#friendsBtn'); await A.fill('#fAddCode', codeB); await A.click('#fAddBtn'); await sleep(800);
await B.click('#friendsBtn'); await B.waitForSelector('[data-acc]'); await B.click('[data-acc]'); await sleep(800);
await A.click('#friendsDone'); await B.click('#friendsDone'); await sleep(500);
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
{ const c = await B.evaluate(async () => { const I = await import('/src/champions/index.js'); return { all: Object.keys(I.CHAMPS).join(), main: [...document.querySelectorAll('#segMain button')].map(b => b.dataset.v || b.textContent).join() }; }); ok(/titus/.test(c.all) && /devi/.test(c.all) && /titus/i.test(c.main), `the joined phone knows every champion (${c.all}); Settings > Main lists Titus (${c.main})`); } // (MENU4 replaced segChamp)
await A.click('#segFmt button[data-v="0"]'); await A.click('#playBtn');
await A.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.role === 'host', null, { timeout: 120000 });
await sleep(3000);
await B.click('#friendsBtn'); await sleep(800); await B.waitForSelector('[data-join]'); await B.click('[data-join]');
await B.waitForFunction(() => window.__fb && window.__fb.G.state === 'play' && window.__fb.G.player, null, { timeout: 60000 }); await sleep(3000);
const a = await A.evaluate(() => { const G = window.__fb.G; return { champs: G.champs.join(), my: G.champs[G.myTi], w: G.player && G.player.weapon }; });
const b = await B.evaluate(() => { const G = window.__fb.G; return { champs: G.champs.join(), my: G.champs[G.myTi], ti: G.myTi, wpnHidden: document.getElementById('wpn').hidden }; });
ok(a.my === 'titus', `host plays the default champion (${a.my}, ${a.w}; Titus since C3f)`);
ok(a.champs.split(',').filter(c => c === 'tester').length >= 3, `bots play ?botchamp= (${a.champs})`);
ok(a.champs === b.champs, `joined phone sees every army's champion as the host does`);
ok(b.my === 'tester' && b.wpnHidden, `joined phone took a bot's seat: ${b.my}, weapon switch hidden ${b.wpnHidden}`);
// the joined phone asks for javelins: the host keeps him on the spear
const bw = await B.evaluate(() => { window.__fb.weapon('jav'); const p = window.__fb.G.player, w = p.weapon; p.weapon = 'jav'; return w; }); await sleep(2500); // (a switch that won't take, then a forged one on the wire)
ok(bw === 'spear', `joined phone's own switch stays on the spear (${bw})`);
const hw = await A.evaluate(ti => window.__fb.G.teams[ti].leader.weapon, b.ti);
ok(hw === 'spear', `host keeps his captain on the spear (${hw})`);
// (C1b) levels on the joined phone: the host gives the joined player's army 520 XP (level 4)
await A.evaluate(async ti => { const L = await import('/src/core/sim/levels.js'); L.gainXp(ti, 520, 'test'); }, b.ti); await sleep(2500);
const la = await A.evaluate(() => window.__fb.G.teams.map(t => t.lvl || 1).join()), lb = await B.evaluate(() => window.__fb.G.teams.map(t => t.lvl || 1).join());
const mine = await B.evaluate(() => { const G = window.__fb.G; return [G.teams[G.myTi].lvl, Math.round(G.teams[G.myTi].xp)]; });
ok(la === lb && mine[0] === 4, `levels the same on the joined phone (${lb}); his own: level ${mine[0]}, ${mine[1]} XP`);
// (C1c) the joined phone presses special attack 1 (open at level 4): the host fires it for his champion
await B.evaluate(() => window.__fb.ability(0)); await sleep(2500);
const n1 = await A.evaluate(ti => window.__fb.G.teams[ti].leader.n1 | 0, b.ti), cdB = await B.evaluate(() => { const G = window.__fb.G; return G.teams[G.myTi].cds && G.teams[G.myTi].cds.sp1; });
ok(n1 === 1 && cdB > 0, `joined phone's special attack fired on the host (${n1}), recharge shown on his phone (${cdB} s)`);
await b1.close(); await b2.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
