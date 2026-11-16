// GATE1: every castle gate can be broken, the middle castle's back gate (its fourth) too: before, that gate had no
// health and took blows forever. A gate that is hit shows its health bar (fading 6 s after the last blow); the bar
// goes down blow by blow; the gate breaks and opens. Joined phones get each gate's health in the snapshot.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const { G } = window.__fb, f = await import('/src/core/sim/forts.js'), st8 = await import('/src/core/state.js');
  const me = G.player, myA = G.ALLY[st8.colorOf(me.ti)], foeA = [0, 1, 2, 3].map(c => G.ALLY[c]).find(a => a !== myA);
  const mid = G.holds.findIndex(h => h.mid && h.side === 1), cw = G.layout.cwalls.find(c => c.hid === mid);
  G.holds[mid].owner = foeA; G.cgates[mid] = f.freshGates(); f.applyCastleGates();
  const out = { gates: cw.gates.length, blows: [], pctAfter1: [], opened: [] };
  for (let gi = 0; gi < cw.gates.length; gi++) {
    const w = cw.obs.find(o => o.cgate != null && o.gi === gi); let n = 0;
    while (!((G.cgates[mid].broken >> gi) & 1) && n < 400) { f.hitWall(me, w); n++; if (n === 1) out.pctAfter1.push(f.gatePct(G.cgates[mid], gi)); }
    out.blows.push(n); out.opened.push(!!w.off);
  }
  // one blow on a fresh gate: the bar shows
  G.cgates[mid] = f.freshGates(); f.applyCastleGates(); const w0 = cw.obs.find(o => o.cgate != null && o.gi === 3); f.hitWall(me, w0);
  out.hitT = G.T - G.cgates[mid].hitT; out.pct3 = f.gatePct(G.cgates[mid], 3);
  me.x = cw.x + Math.cos(cw.gates[3]) * (cw.r + 8); me.z = cw.z + Math.sin(cw.gates[3]) * (cw.r + 8);
  return out; });
ok(r.gates === 4, `the middle castle has 4 gates (${r.gates})`);
ok(r.blows.every(n => n > 1 && n < 400), `every gate breaks: ${r.blows.join(', ')} blows (the back gate before: never)`);
ok(r.pctAfter1.every(p => p < 1 && p > 0), `one blow takes health off each gate (${r.pctAfter1.map(p => p.toFixed(2)).join(', ')})`);
ok(r.opened.every(Boolean), 'a broken gate opens');
ok(r.hitT < .1 && r.pct3 < 1, `a hit gate is marked (bar shows): back gate at ${Math.round(r.pct3 * 100)}%`);
await frames(page, 10); await page.screenshot({ path: '/tmp/r_GATE1.png' });
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
