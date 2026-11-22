// C5g Sigrun's lines: her ten (the four agreed among them), her men's by the moment (a charge, a shield wall, the
// boar's snout, a castle taken, an upgrade, her kill), shown as speech bubbles; her riders call the wedge when it forms
// and she has a word after the Hunt.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=sigrun&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 30);
const o = await page.evaluate(async () => {
  const B = await import('/src/render/banter.js'), { champOf } = await import('/src/champions/index.js'), S = await import('/src/core/state.js'), G = window.__fb.G, me = G.myTi;
  const L = champOf(me).lines, p = G.player, army = await import('/src/core/sim/army.js'); G.teams[me].gold = 500; army.recruit(me, 'sword');
  const man = G.units.find(u => !u.dead && !u.leader && u.ti === me);
  const said = (u, kind) => { B.bubbles.length = 0; B.say(u, kind, true); return B.bubbles[0] && B.bubbles[0].text; };
  const r = { n: L.self.length, agreed: ['Your gate was more of a suggestion.', 'Fast is a kind of armour.', 'They\'ll sing about this. I\'ll see to it.', 'Ships don\'t wait. Neither do I.'].every(t => L.self.includes(t)) };
  for (const k of ['charge', 'hold', 'shieldwall', 'snout', 'taken', 'upgraded', 'kill', 'capDown', 'back']) { const t = said(man, k); r[k] = !!t && Object.values(L.army).some(a => a.includes(t)); }
  r.self = L.self.includes(said(p, 'self'));
  B.bubbles.length = 0; S.bus.emit('fxmsg', { k: 'fxsvin', u: p, q: '0,0,0,30,1,3' }); r.wedge = B.bubbles.some(b => L.army.snout.includes(b.text));
  B.bubbles.length = 0; S.bus.emit('fxmsg', { k: 'fxhuntend', u: p, q: 'kill' }); await new Promise(res => setTimeout(res, 900)); r.hunt = B.bubbles.some(b => b.u === p && L.self.includes(b.text));
  return r; });
await browser.close();
ok(o.n === 10 && o.agreed, `her ten lines, the four agreed among them (${o.n})`);
ok(['charge', 'hold', 'shieldwall', 'snout', 'taken', 'upgraded', 'kill', 'capDown', 'back'].every(k => o[k]), `her men speak her army lines for each moment ${JSON.stringify(o)}`);
ok(o.self, 'she speaks her own lines');
ok(o.wedge && o.hunt, `her riders call the wedge (${o.wedge}); she has a word after the Hunt (${o.hunt})`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
