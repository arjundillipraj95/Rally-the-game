// MENU3 the home: no Captain button; Champions, Friends, Missions, Shop on the left; logo, rank/XP, Silver, settings
// on top; your main stands on the stage with his name, and a tap opens his card; Solo/Duo/Trio follow your party;
// the "2 × Titus" note only when a party member shares your main; friends stand in their own mains.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true, init: `localStorage.removeItem('rally-champ'); localStorage.removeItem('rally-fmt');` });
for (let i = 0; i < 12; i++) { await frames(page, 5); await page.waitForTimeout(250); }
const ui = await page.evaluate(() => ({ ward: !!document.getElementById('wardBtn'), left: [...document.querySelectorAll('.hleft .hbtn b')].map(b => b.textContent),
  top: ['hRank', 'hSilver', 'setBtn'].every(id => { const e = document.getElementById(id); return e && e.offsetParent; }), silver: document.getElementById('hSilver').textContent,
  name: document.getElementById('homeChampName').textContent, champ: !document.getElementById('homeChamp').hidden, sub: document.getElementById('champsSub').textContent, own: document.querySelectorAll('#champScreen .ptile.owned').length }));
ok(!ui.ward, 'the Captain button is gone');
ok(ui.left.join() === 'Champions,Friends,Missions,Shop', `left: ${ui.left}`);
ok(ui.top && ui.silver === '0', 'top: rank/XP, Silver 0, settings');
ok(ui.champ && /Titus/.test(ui.name), `your main on the stage, named (${ui.name.trim()})`);
ok(/^9 · \d+ owned$/.test(ui.sub), `Champions shows the roster count (${ui.sub})`);
// the tap lands on him: the button covers his figure
const over = await page.evaluate(() => { const { camera, G } = window.__fb, THREE = window.__f8.THREE, c = G.units.find(u => u.kind === 'captain' && u.demo), v = new THREE.Vector3(c.x, c.y + 1.3, c.z).project(camera), x = (v.x + 1) / 2 * innerWidth, y = (1 - v.y) / 2 * innerHeight, r = document.getElementById('homeChamp').getBoundingClientRect(); return x > r.left && x < r.right && y > r.top && y < r.bottom; });
ok(over, 'the tap area covers your champion');
await page.click('#homeChamp'); await frames(page, 4);
const cs = await page.evaluate(() => ({ open: !document.getElementById('champScreen').hidden, sel: (document.querySelector('.ptile.sel') || {}).dataset?.id }));
ok(cs.open && cs.sel === 'titus', 'a tap on him opens the Champions screen on him');
await page.click('#champScreen [data-act="close"]'); await frames(page, 2);
// a party: Solo/Duo/Trio follow it; the note when a friend shares your main; friends in their mains
const party = async members => page.evaluate(ms => { const { ON, bus } = window.__on; ON.me = { id: 'me1' }; ON.up = true; ON.party = ms ? { id: 'P', leader: 'me1', members: [{ id: 'me1', nick: 'Demi', ch: 'titus' }, ...ms] } : null; bus.emit('online', { k: 'party', m: ON.party || {} }); }, members);
const state = () => page.evaluate(() => ({ fmt: [...document.querySelectorAll('#segFmt button')].find(b => b.getAttribute('aria-pressed') === 'true').textContent, note: document.getElementById('twoNote').hidden ? '' : document.getElementById('twoNote').textContent, champs: [4, 8].map(k => (window.__fb.G.champs || [])[window.__fb.G.myTi + k]) }));
await party([{ id: 'p2', nick: 'Ana', ch: 'titus' }]); await frames(page, 3); let s = await state();
ok(s.fmt === 'Duo', `a friend joins: Duo (${s.fmt})`);
ok(/2 × Titus/.test(s.note), `same main: "${s.note}"`);
await party([{ id: 'p2', nick: 'Ana', ch: 'legionary' }, { id: 'p3', nick: 'Chen', ch: 'titus' }]); await frames(page, 3); s = await state();
ok(s.fmt === 'Trio' && /2 × Titus/.test(s.note) && s.champs[0] === 'legionary', `two friends: Trio, Ana in her own main (${s.fmt}, ${s.champs})`);
await party([{ id: 'p2', nick: 'Ana', ch: 'legionary' }]); await frames(page, 3); s = await state();
ok(s.fmt === 'Duo' && !s.note, 'different mains: no note');
await party(null); await frames(page, 3); s = await state();
ok(s.fmt === 'Solo', 'party gone: Solo');
await page.screenshot({ path: '/tmp/menu/r_MENU3_home.png' });
await page.close(); await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
