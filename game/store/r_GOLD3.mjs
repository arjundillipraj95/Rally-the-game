// GOLD3 (Arjun 25 Nov): every neutral soldier (a castle's guard, a camp's bandit) pays 20 gold; a camp pays nothing more
// when cleared (5 men = 100). The nexus's points show in the in-game Points panel and in the results summary
// (the scoreline's bar and legend, the captain's ledger, the moments line).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await open(b, 900, 500, { q: '?crown2=1&champ=titus' });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 6);
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const r = await p.evaluate(async () => {
  const { G } = window.__fb, N = await import('/src/core/sim/neutral.js'), St = await import('/src/core/state.js'), nx = await import('/src/core/sim/nexus.js'), c2 = await import('/src/core/sim/crown2.js');
  window.__fb.step(20); G.paused = true;
  const me = G.player, gold = () => G.teams[G.myTi].gold, out = {}, K = G.c2;
  const camp = K.breaks.find(x => x.post && x.kind === 'camp' && !x.boss && x.units.some(u => u && !u.dead));
  out.camp = !!camp; let g0 = gold(); const men = camp.units.filter(u => u && !u.dead);
  N.dieNeutral(men[0], me, 0); out.oneMan = gold() - g0;
  g0 = gold(); for (const u of men.slice(1)) N.dieNeutral(u, me, 0); out.rest = gold() - g0; out.n = men.length;
  const guards = K.breaks.find(x => x.post && x.kind !== 'camp' && x.units.some(u => u && !u.dead));
  if (guards) { g0 = gold(); N.dieNeutral(guards.units.find(u => u && !u.dead), me, 0); out.guard = gold() - g0; }
  // break an enemy nexus, by me
  const myA = G.ALLY[St.colorOf(G.myTi)], nb = K.breaks.find(x => x.kind === 'nexus' && G.ALLY[x.c] !== myA && G.teams.some((s, j) => s && s.active && St.colorOf(j) === x.c));
  const t0 = c2.c2Breakdown(myA).total; nx.nexusBroken(nb, myA, G.myTi); nb.hp = 0; out.add = c2.c2Breakdown(myA).total - t0;
  G.paused = false; window.__fb.step(1); G.paused = true;
  document.getElementById('points').click(); await new Promise(r => setTimeout(r, 300));
  window.__frame(30); const cl = document.getElementById('capList'); out.panel = cl.innerText; out.panelH = cl.innerHTML.length;
  // the results summary, drawn into a box
  const tl = await import('/src/ui/timeline.js'), el = document.createElement('div'); document.body.appendChild(el);
  tl.renderPointsV2(el, myA); out.legend = el.querySelector('.ps-leg').innerText; out.moments = el.querySelector('.tl-at').innerText;
  el.querySelector('[data-go="me"]').click(); out.ledger = el.querySelector('.lg-list').innerText;
  const pk = tl.tlPack(); out.packed = JSON.stringify(pk.g[2]);
  return out;
});
ok(r.camp && r.oneMan === 20, `a camp's bandit pays ${r.oneMan} (20)`);
ok(r.rest === (r.n - 1) * 20, `the rest of the camp (${r.n - 1} men, last one included) pays ${r.rest} (${(r.n - 1) * 20}): no extra for clearing it`);
ok(r.guard === 20, `a castle's guard pays ${r.guard} (20)`);
ok(r.add === 5, `breaking a nexus adds ${r.add} to the side's points (5)`);
ok(/nexus/i.test(r.panel) && /your side/i.test(r.panel), `in-game Points panel: ${r.panel.replace(/\s+/g, ' ').slice(r.panel.replace(/\s+/g, ' ').toLowerCase().indexOf('nexus'))}`);
ok(/Nexus/.test(r.legend), `results legend: ${r.legend.replace(/\s+/g, ' ')}`);
ok(/Nexus to your side/.test(r.moments), `results moments: ${r.moments}`);
ok(/nexus/.test(r.ledger) && /\+5/.test(r.ledger), `your ledger: ${r.ledger.replace(/\s+/g, ' ').slice(0, 90)}`);
ok(/\[\[/.test(r.packed), `the banner broken goes to joined phones in the final record ${r.packed}`);
await b.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
