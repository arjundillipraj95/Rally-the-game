// C3j Titus's lines: his men's bubbles come from his page's army lines for their moment (a charge order, the testudo,
// a castle taken, an upgrade), his own from his ten; the legionary's men keep the shared lines.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&botchamp=legionary' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 30);
const o = await page.evaluate(async () => {
  const B = await import('/src/render/banter.js'), { champOf } = await import('/src/champions/index.js'), G = window.__fb.G, me = G.myTi;
  const L = champOf(me).lines, man = G.units.find(u => !u.dead && !u.leader && u.ti === me), p = G.player;
  const other = G.units.find(u => !u.dead && !u.leader && !u.neutral && u.ti !== me);
  const said = (u, kind) => { B.bubbles.length = 0; B.say(u, kind, true); return B.bubbles[0] && B.bubbles[0].text; };
  const r = { champ: champOf(me).id, other: other && champOf(other.ti).id };
  for (const k of ['charge', 'hold', 'testudo', 'taken', 'upgraded', 'kill']) { const t = said(man, k); r[k] = !!t && Object.values(L.army).some(a => a.includes(t)); }
  r.self = L.self.includes(said(p, 'self'));
  const t = other && said(other, 'charge'); r.legion = !!t && !Object.values(L.army).some(a => a.includes(t));
  return r; });
await browser.close();
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
console.log(JSON.stringify(o));
ok(o.champ === 'titus' && ['charge', 'hold', 'testudo', 'taken', 'upgraded', 'kill'].every(k => o[k]), 'his men speak his army lines for each moment');
ok(o.self, 'he speaks his own lines');
ok(o.other === 'legionary' && o.legion, 'the legionary\'s men keep the shared lines');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
