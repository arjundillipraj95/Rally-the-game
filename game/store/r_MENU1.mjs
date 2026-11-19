// MENU1 Champion pictures: portrait, face and splash files load; the minimap's faces load in a battle; the versus
// screen shows a face per seat and your champion's splash behind it; the online service carries each player's main
// (hello, account, versus) so other phones can show it.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' });
const files = await page.evaluate(async () => {
  const P = await import('/src/ui/portraits.js'), load = src => new Promise(r => { const i = new Image(); i.onload = () => r(i.naturalWidth); i.onerror = () => r(0); i.src = src; });
  const o = {}; for (const id of ['titus', 'devi', 'legionary']) o[id] = [await load(P.portraitSrc(id)), await load(P.faceSrc(id)), await load(P.splashSrc(id))];
  o.missing = await load(P.portraitSrc('nobody')); return o;
});
ok(files.titus.every(w => w > 0) && files.devi.every(w => w > 0), `Titus and Devi: portrait, face and splash load (${files.titus} / ${files.devi})`);
ok(files.legionary[0] > 0 && files.legionary[1] > 0, 'the baked legionary portrait and face load (store/bake_portraits.mjs)');
ok(files.missing === 0, 'a missing picture fails cleanly (the silhouette shows)');
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 6);
await page.waitForTimeout(800); await frames(page, 2);
const face = await page.evaluate(async () => { const P = await import('/src/ui/portraits.js'); return !!P.faceImage('titus'); });
ok(face, 'in a battle the minimap has Titus\'s face to draw');
const vs = await page.evaluate(async () => {
  const L = await import('/src/ui/matchlobby.js'); window.__on.ON.me = { id: 'me1' };
  L.showVersus({ fmt: 2, seats: { me1: 0, p2: 4, p3: 1 }, nicks: { me1: 'Demi', p2: 'Ana', p3: 'Chen' }, chs: { p2: 'devi', p3: '' }, lanes: {}, vs: 4000 });
  const v = document.getElementById('vsScreen'), imgs = [...v.querySelectorAll('.chface img')].map(i => i.getAttribute('src'));
  const r = { n: v.querySelectorAll('.chface').length, devi: imgs.filter(s => s.includes('devi')).length, splash: v.style.getPropertyValue('--splash') }; L.hideVersus(); return r;
});
ok(vs.n === 12, `versus: a picture on every seat (${vs.n} of 12)`);
ok(vs.devi === 1, 'versus: Ana shows her own main (Devi)');
ok(/splash\/titus/.test(vs.splash), `versus: your champion's splash behind it (${vs.splash})`);
await page.close(); await browser.close();
// the online service: your main rides on hello, is kept on the account by 'ch', and comes back on the next sign-in
const talk = (msgs, until) => new Promise((res, rej) => { const ws = new WebSocket('ws://127.0.0.1:8787/ws'), got = []; const t = setTimeout(() => { ws.close(); rej(new Error('timeout')); }, 8000);
  ws.onopen = () => msgs.forEach(m => ws.send(JSON.stringify(m))); ws.onmessage = e => { const m = JSON.parse(e.data); got.push(m); if (until(m, got)) { clearTimeout(t); ws.close(); res(got); } }; });
const a = await talk([{ t: 'hello', nick: 'Menu1', ch: 'titus' }], m => m.t === 'me');
const me = a.find(m => m.t === 'me');
await new Promise((res) => { const ws = new WebSocket('ws://127.0.0.1:8787/ws'); ws.onopen = () => { ws.send(JSON.stringify({ t: 'hello', id: me.id, key: me.key, ch: 'titus' })); setTimeout(() => { ws.send(JSON.stringify({ t: 'ch', ch: 'devi', bk: 'titus' })); setTimeout(() => { ws.close(); res(); }, 500); }, 400); }; });
const b = await talk([{ t: 'hello', id: me.id, key: me.key }], m => m.t === 'me');
const me2 = b.find(m => m.t === 'me');
ok(me2.main === 'devi' && me2.backup === 'titus', `service keeps main and backup on the account (${me2.main}, ${me2.backup})`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
