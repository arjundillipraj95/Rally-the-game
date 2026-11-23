// CASTLE10: the castle numbers, measured. A computer champion with MEN footmen (default 6) attacks an enemy castle with
// (STRUCT, 23 Nov: swordsmen and riders now hit gates too, so a lone laner's gate falls ~0.2 s sooner: the floor is 19 s, the castle still falls at ~26 s.)
// nobody defending it, at level 1, 2 and 3: seconds until a gate breaks and until the castle is taken, men left, and
// whether the champion fell. Targets (Arjun, 16 Nov): a lone laner takes a level 1 castle with real work, about 30 s
// on the gate; level 2 about 1.7x; level 3 needs more: with MEN=12 (about a laner and a jungler's armies) it falls on a
// second push, its damage kept from the first.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const MEN = +(process.env.MEN || 6), out = {};
for (const lv of [1, 2, 3]) {
  out[lv] = await page.evaluate(async ([lv, MEN]) => {
    const F = window.__fb, { G } = F, st8 = await import('/src/core/state.js'), f = await import('/src/core/sim/forts.js'), match = await import('/src/core/sim/match.js');
    const me = G.player, myA = G.ALLY[st8.colorOf(me.ti)];
    const bi = G.teams.findIndex((s, i) => s && s.active && s.leader && !s.human && G.ALLY[st8.colorOf(i)] !== myA), bot = G.teams[bi], bA = G.ALLY[st8.colorOf(bi)];
    const fc = [0, 1, 2, 3].find(k => G.ALLY[k] !== bA && G.ALLY[k] !== myA) ?? [0, 1, 2, 3].find(k => G.ALLY[k] !== bA);
    const h = G.holds.find(x => x.kind === 'castle' && !x.mid && x.side === fc), cw = G.layout.cwalls.find(q => q.hid === h.id);
    h.owner = G.ALLY[fc]; h.prog = 0; h.cap = -1; h.shieldT = 0; G.cgates[h.id] = f.freshGates(lv); f.applyCastleGates();
    const g = cw.gates[0], ox = cw.x + Math.cos(g) * 32, oz = cw.z + Math.sin(g) * 32, waves = lv === 3 ? 2 : 1;
    const keepAway = () => G.units.forEach(u => { if (!u.dead && u.ti !== bi && Math.hypot(u.x - cw.x, u.z - cw.z) < 60) { u.x += 400; u.z += 400; } });
    let tGate = null, tTake = null, capDead = false, men = [], t = 0, plates1 = null;
    for (let w = 0; w < waves && tTake == null; w++) { // (level 3: a second push on what the first left; damage stays)
      let B = bot.leader; if (B.dead) { for (let k = 0; k < 900 && bot.leader.dead; k++) { keepAway(); F.step(1); } B = bot.leader; }
      match.squadOf(bi).forEach(u => { u.dead = true; u.hp = 0; });
      B.x = ox; B.z = oz; B.hp = B.max; B.mounted = false; capDead = false;
      men = []; for (let k = 0; k < MEN; k++) men.push(F.mkUnit(bi, ox + (k % 3) * 1.5 - 1.5, oz + (k / 3 | 0) * 1.5, 'foot'));
      const T0 = G.T;
      while (G.T - T0 < 120 && G.state === 'play') {
        keepAway(); bot.plan = { kind: 'hold', id: h.id }; bot.thinkT = 9; bot.order = 'follow'; F.step(3);
        if (tGate == null && G.cgates[h.id].broken) tGate = +(t + G.T - T0).toFixed(1);
        if (h.owner === bA) { tTake = +(t + G.T - T0).toFixed(1); break; }
        if (B.dead) { capDead = true; break; }
      }
      t += G.T - T0; if (w === 0) plates1 = G.cgates[h.id].paid.reduce((a, b) => a + b, 0);
    }
    return { tGate, tTake, alive: men.filter(u => !u.dead).length, capDead, plates: plates1, waves };
  }, [lv, MEN]);
  console.log(`level ${lv}: ${JSON.stringify(out[lv])}`);
}
ok(out[1].tTake != null && out[1].tGate <= 45 && (MEN > 6 || out[1].tGate >= 19), `level 1, ${MEN} men: gate ${out[1].tGate} s, taken ${out[1].tTake} s, men left ${out[1].alive}`);
ok(out[2].tGate == null || out[2].tGate > out[1].tGate * 1.3, `level 2: gate ${out[2].tGate} s, ${out[2].plates} plates (${out[2].capDead ? 'champion fell' : 'champion up'})`);
ok(MEN < 12 ? out[3].plates >= 1 : out[3].tTake != null, `level 3: ${out[3].plates} plates in the first push; ${out[3].tTake != null ? 'taken on the second at ' + out[3].tTake + ' s of fighting' : 'not taken in two pushes'}`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
