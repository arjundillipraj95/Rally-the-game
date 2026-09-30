// Dev check: does a held line hold? Your squad (footmen and archers) stands in the Grass Valley;
// an equal enemy army is dropped 30 m off and sent at them. Run with your men holding a line across
// the way, and again just following you; compare what's left after 25 s. Also shoots the line.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const runs = +(process.argv[2] || 6);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const res = { hold: [0, 0], follow: [0, 0] };
for (let k = 0; k < runs * 2; k++) {
  const mode = k % 2 ? 'follow' : 'hold';
  const page = await open(browser, 640, 360);
  if (k > 0) await page.evaluate(() => { window.__noRender = 1; });
  await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn'); await frames(page, 3);
  const r = await page.evaluate(async ([mode, shot]) => {
    const F = window.__fb, G = F.G, sim = F;
    const me = G.myTi, p = G.player, X = -40, Z = 10;
    // just two armies: mine, and one enemy's, both at 10 men (6 footmen, 4 archers)
    const foe = [0, 1, 2, 3].find(i => i !== me && G.teams[i].active && G.ALLY[i] !== G.ALLY[me]);
    for (const u of G.units) { if (u.ti !== me && u.ti !== foe) { u.x = 200; u.z = 200; u.dead = true; } }
    const mine = G.units.filter(u => !u.dead && u.ti === me && !u.leader), theirs = G.units.filter(u => !u.dead && u.ti === foe && !u.leader);
    const trim = (arr, f, a) => { let nf = 0, na = 0; for (const u of arr) { if (u.kind === 'foot' && nf < f) nf++; else if (u.kind === 'arch' && na < a) na++; else u.dead = true; } };
    trim(mine, 6, 4); trim(theirs, 6, 4);
    p.x = X - 8; p.z = Z; p.face = Math.PI / 2; p.hidden = true;
    mine.forEach((u, i) => { u.x = X + (i % 5) * 1.3; u.z = Z + Math.floor(i / 5) * 1.5 - 2; });
    const L = G.teams[foe].leader; L.x = 150; L.z = 150; L.dead = true; G.teams[foe].leaderDeadT = 1e9; // (no captain: his men charge)
    theirs.forEach((u, i) => { u.x = X + 30 + (i % 5); u.z = Z + Math.floor(i / 5) * 1.5; });
    G.teams[foe].plan = { kind: 'hunt', target: p }; G.teams[foe].thinkT = 99; G.teams[foe].gold = -1e9; G.teams[foe].recruitT = 1e9; G.teams[foe].upT = 1e9;
    if (mode === 'hold') sim.setOrder(me, 'hold', { x: X + 6, z: Z, face: Math.PI / 2 }); else sim.setOrder(me, 'follow');
    p.hp = 1e6; p.max = 1e6; // (the captain stays out of it: he stands behind and can't die)
    F.step(90, 1 / 30, true);
    const holding = G.units.filter(u => !u.dead && u.ti === me && u.holding).length;
    if (shot) { window.__camAt = [X + 2, 16, Z - 16, X + 8, 0, Z]; }
    const seen = new Set(), shots = { [me]: 0, [foe]: 0 }, log = [];
    for (let f = 0; f < 660; f += 3) {
      F.step(3, 1 / 30, true);
      for (const a of G.arrows) if (!seen.has(a.id)) { seen.add(a.id); shots[a.ti] = (shots[a.ti] || 0) + 1; }
      if (f % 90 === 0) { const ef = G.units.filter(u => !u.dead && u.ti === foe && u.kind === 'foot'), ea = G.units.filter(u => !u.dead && u.ti === foe && u.kind === 'arch'); const md = ef.length ? Math.min(...ef.map(u => Math.hypot(u.x - (X + 6), u.z - Z))) : -1; log.push(`t${(f / 30 + 3).toFixed(0)} myF=${G.units.filter(u => !u.dead && u.ti === me && u.kind === 'foot').length} myA=${G.units.filter(u => !u.dead && u.ti === me && u.kind === 'arch').length} eF=${ef.length} eA=${ea.length} eFnear=${md.toFixed(1)} eL=${Math.hypot(L.x - X - 6, L.z - Z).toFixed(1)}${L.dead ? 'D' : ''}`); }
    }
    const alive = t => G.units.filter(u => !u.dead && u.ti === t && !u.leader).length;
    return { mine: alive(me), theirs: alive(foe), holding, shots, log };
  }, [mode, k === 0]);
  if (k === 0) { await frames(page, 2); await page.screenshot({ path: OUT + 'holdline.png' }); }
  res[mode][0] += r.mine; res[mode][1] += r.theirs;
  console.log(mode, JSON.stringify(r));
  await page.close();
}
console.log('totals (mine left, theirs left):', JSON.stringify(res));
await browser.close();
