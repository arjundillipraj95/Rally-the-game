// Dev check: Fortify. (1) buying it through the menu action stands the palisade, then the gate
// towers; a shot of a fortified castle. (2) a captain alone hacking a breach: how long. (3) balance:
// a computer army at full strength besieging a computer castle, unfortified vs fully fortified: how
// much castle is left after 90 s. (4) the Wooden Fort starts fortified.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const errs = [];
const go = async (map, shotIt) => { const page = await open(browser, 844, 390); page.on('pageerror', e => errs.push(e.message)); if (!shotIt) await page.evaluate(() => { window.__noRender = 1; }); await page.evaluate(m => { document.querySelector(`#segMap button[data-v="${m}"]`).click(); document.querySelector('#segMode button[data-v="conquest"]').click(); document.querySelector('#goBtn').click(); }, map); await frames(page, 3); return page; };
if (!process.env.SIEGE) { // (1)
  const page = await go('valley', true);
  const r = await page.evaluate(() => {
    const F = window.__fb, G = F.G, c = G.myTi % 4, pal = G.layout.pal[c], up = () => pal.obs.filter(o => !o.off).length, out = [];
    out.push(`before: level ${G.teams[c].up.fort}, standing ${up()}/${pal.obs.length}`);
    G.teams[G.myTi].gold = 1000; F.upgrade('fort'); out.push(`bought once: level ${G.teams[c].up.fort}, standing ${up()}/${pal.obs.length}, gold left ${Math.round(G.teams[G.myTi].gold)}`);
    F.upgrade('fort'); out.push(`bought twice: level ${G.teams[c].up.fort}`);
    const t = G.layout.obstacles.filter(o => o.castle)[c], a = Math.atan2(t.z, t.x); window.__camAt = [t.x * .55, 30, t.z * .55, t.x, 0, t.z];
    return out.join(' | ');
  });
  await frames(page, 4); await page.screenshot({ path: OUT + 'fort.png', timeout: 120000 });
  console.log('(1)', r); await page.close();
}
if (!process.env.SIEGE) { // (2) a captain alone on an enemy palisade
  const page = await go('valley');
  console.log('(2)', await page.evaluate(() => {
    const F = window.__fb, G = F.G, me = G.myTi, p = G.player, foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
    for (const u of G.units) if (u !== p) u.dead = true; G.units = G.units.filter(u => !u.dead); for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.upT = 1e9; s.thinkT = 1e9; }
    F.fort(foe, 1);
    const o = G.layout.pal[foe].obs[Math.floor(G.layout.pal[foe].obs.length / 3)], cx = G.layout.obstacles.filter(x => x.castle)[foe], a = Math.atan2(o.z - cx.z, o.x - cx.x);
    p.x = o.x + Math.cos(a) * 1.9; p.z = o.z + Math.sin(a) * 1.9; p.hp = p.max = 1e6;
    let t = 0; const k = o.k;
    while (!((G.forts[foe].broken >> k) & 1) && t < 60) { p.face = Math.atan2(o.x - p.x, o.z - p.z); if (p.cd <= 0) F.attack(); F.step(1, 1 / 30, true); t += 1 / 30; }
    return `captain alone breached a section in ${t.toFixed(1)} s; section now ${o.off ? 'down' : 'standing'}`;
  }));
  await page.close();
}
// (3) the siege
for (const lvl of [0, 2]) {
  const left = [];
  for (let run = 0; run < 4; run++) {
    const page = await go('valley');
    left.push(await page.evaluate(lvl => {
      const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
      const att = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), def = [0, 1, 2, 3].find(i => i !== me && i !== att && G.ALLY[i] !== G.ALLY[att]);
      for (const u of G.units) if (u.ti !== att && u.ti !== def) { u.dead = true; u.x = 400; }
      for (const i of [0, 1, 2, 3]) if (i !== att && i !== def) G.teams[i].leaderDeadT = 1e9;
      F.fort(def, lvl);
      for (let k = 0; k < 12; k++) { const L = G.teams[att].leader; F.mkUnit(att, L.x + (k % 4) * 1.2, L.z + Math.floor(k / 4) * 1.2, k % 3 ? 'foot' : 'arch'); }
      for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; s.upT = 1e9; }
      const L = G.teams[att].leader; L.hp = L.max = 1e6; // (the attacking captain keeps at it: this measures the fort, not him)
      for (let t = 0; t < 90; t++) { G.teams[att].plan = { kind: 'castle', ti: def }; G.teams[att].thinkT = 1e9; F.step(30, 1 / 30, true); }
      return Math.round(G.teams[def].points) + (G.forts[def].broken ? ` (breaches ${G.forts[def].broken.toString(2).split('1').length - 1})` : '');
    }, lvl));
    await page.close();
  }
  console.log(`(3) fort level ${lvl}: castle strength left after 90 s of siege: ${left.join(', ')}`);
}
if (!process.env.SIEGE) { // (4)
  const page = await go('wooden');
  console.log('(4)', await page.evaluate(() => { const G = window.__fb.G; return 'Wooden Fort levels: ' + [0, 1, 2, 3].map(c => G.teams[c].up.fort).join(',') + ', standing ' + G.layout.pal.map(p => p.obs.filter(o => !o.off).length).join(','); }));
  await page.close();
}
console.log('errors:', errs.slice(0, 3));
await browser.close();
