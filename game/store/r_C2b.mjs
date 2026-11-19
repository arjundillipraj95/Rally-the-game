// C2b: a stone thrower's crew and sounds. Two crewmen drawn per thrower (team batch); the throw plays the slam once
// (from the drawing, so every phone hears it), the wind-down creaks, a burning pot crackles.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const p = await open(b, 900, 700, { q: '?crown2=1&champ=devi' });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 20);
const o = await p.evaluate(async () => {
  const G = window.__fb.G, sim = await import('/src/core/sim.js'), T = await import('/src/render/throwers.js'), A = await import('/src/ui/audio.js');
  const n = { throwRelease: 0, creak: 0, crackle: 0 }; for (const k in n) { const f = A.sfx[k]; A.sfx[k] = (x, z) => { n[k]++; f(x, z); }; }
  const L = G.player; G.T = 30; const t = sim.mkUnit(L.ti, L.x + 5, L.z, 'thrower'); t.throwT = G.T - 5;
  const draw = k => { for (let i = 0; i < k; i++) { G.T += 1 / 30; T.drawThrowers(); } };
  draw(3); t.throwT = G.T; draw(60); G.fires = [{ id: 1, x: L.x, z: L.z, r: 3, until: G.T + 9 }]; draw(90); G.fires = [];
  const crewN = T.crewDrawn();
  return { n, crewN };
});
ok(o.crewN === 2, `two crewmen at the thrower (${o.crewN} drawn)`);
ok(o.n.throwRelease === 1, `the throw: one slam and whoosh (${o.n.throwRelease})`);
ok(o.n.creak >= 2, `winding down: creaks (${o.n.creak})`);
ok(o.n.crackle >= 2, `a fire pot crackles (${o.n.crackle} in 3 s)`);
await b.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
