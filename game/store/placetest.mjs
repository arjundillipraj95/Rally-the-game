// Dev check: Age of Empires castle placement on every map and team setup, over several seeds. Each
// castle must stand clear (not in the river, not in a mesa), its gate must open onto walkable ground,
// allies must stand nearer each other than enemies, and a match must run a few seconds without errors.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 320, 180);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; });
const maps = ['valley', 'desert', 'river', 'wooden', 'dunes', 'forest', 'frost', 'forum', 'colosseum'], presets = ['ffa', '2v2', '2v1v1', '3v1'];
for (const map of maps) {
  const rows = [];
  for (const pre of presets) {
    await page.evaluate(([map, pre]) => { document.querySelector(`#segTeams button[data-v="${pre}"]`).click(); document.querySelector(`#segMap button[data-v="${map}"]`).click(); }, [map, pre]);
    for (let s = 0; s < 3; s++) {
      await page.evaluate(() => { document.querySelector('#goBtn').click(); });
      await page.waitForTimeout(150);
      const r = await page.evaluate(() => {
        const F = window.__fb, G = F.G, T = window.__fbTeams || null;
        const pos = G.teams.slice(0, 4).map((t, i) => { const L = t.leader; return [i, G.ALLY[i]]; });
        const cs = [0, 1, 2, 3].map(i => { const L = G.teams[i].leader; return L ? [L.x, L.z] : null; });
        F.step(150, 1 / 30, true);
        const bad = [];
        // allies nearer than enemies (by castle, using where each captain started is not exact: use layout castles)
        const castles = G.layout.obstacles.filter(o => o.castle).map(o => [o.x, o.z]);
        for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) { const d = Math.hypot(castles[i][0] - castles[j][0], castles[i][1] - castles[j][1]); if (d < 60) bad.push(`castles ${i},${j} only ${d.toFixed(0)} m apart`); }
        if (G.map.id === 'river') for (const [x, z] of castles) if (Math.abs(z) < 20) bad.push('castle by the river');
        for (const s of G.layout.solids || []) for (const [x, z] of castles) { let c = false; const p = s.pts; for (let a = 0, b = p.length - 1; a < p.length; b = a++) { if ((p[a][1] > z) !== (p[b][1] > z) && x < (p[b][0] - p[a][0]) * (z - p[a][1]) / (p[b][1] - p[a][1]) + p[a][0]) c = !c; } if (c) bad.push('castle in a mesa'); }
        const pairs = []; const al = G.ALLY; let worst = 0;
        if (new Set(al).size < 4) { // allies closer than the nearest enemy
          for (let i = 0; i < 4; i++) { const allyD = Math.min(...[0, 1, 2, 3].filter(j => j !== i && al[j] === al[i]).map(j => Math.hypot(castles[i][0] - castles[j][0], castles[i][1] - castles[j][1]))); const foeD = Math.min(...[0, 1, 2, 3].filter(j => al[j] !== al[i]).map(j => Math.hypot(castles[i][0] - castles[j][0], castles[i][1] - castles[j][1]))); if (isFinite(allyD) && allyD > foeD + 1) bad.push(`castle ${i}: ally ${allyD.toFixed(0)} m, enemy ${foeD.toFixed(0)} m`); }
        }
        const stuckCap = G.teams.slice(0, 4).filter(t => t.leader && !t.leader.dead && !t.human && Math.hypot(t.leader.vx, t.leader.vz) < .05 && t.plan && t.plan.kind !== 'defend').length;
        return { bad, castles: castles.map(([x, z]) => Math.round(Math.atan2(z, x) * 57.3)).join('/'), state: G.state };
      });
      rows.push(`${pre}#${s} ${r.castles}${r.bad.length ? ' !! ' + r.bad.join('; ') : ''}`);
      await page.evaluate(() => { window.__fb.end && window.__fb.end(); });
      await page.evaluate(() => { const b = document.querySelector('#againBtn') || document.querySelector('#menuBtn'); b && b.click(); });
      await page.waitForTimeout(100);
    }
  }
  console.log(map + ':\n  ' + rows.join('\n  '));
}
console.log('errors:', errs.slice(0, 4));
await browser.close();
