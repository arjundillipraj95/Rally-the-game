// Dev check: how soon a computer captain calls out a player standing near him, per difficulty.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 320);
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, p = G.player, me = G.myTi, out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; }
  for (const diff of [2, 1, 0]) { G.T = 0;
    G.diff = diff; const ts = [];
    for (let k = 0; k < 12; k++) {
      for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead); G.duels.length = 0;
      const L = G.teams[foe].leader; if (L.dead) { F.step(400, 1 / 30); }
      const E = G.teams[foe].leader; p.hp = p.max = 1e5; E.hp = E.max; E.duelAskT = 0; p.dueled = E.dueled = false; E.horseCd = 99; if (E.summon) { E.summon.state = 'leaving'; E.summon = null; }
      let t = 0; while (!G.duels.length && t < 60) { p.x = -20; p.z = 20; E.x = -12; E.z = 20; E.mounted = false; E.summon = null; E.horseCd = 99; F.step(15, 1 / 30); t += .5; }
      ts.push(G.duels.length ? t : 99); if (!G.duels.length && k < 2) out['why' + diff + k] = [F.canChallenge(E, p), Math.round(E.hp), E.max, E.dead, G.teams[foe].routT, E.duelAskT, G.T|0, E === G.teams[foe].leader, Math.hypot(E.x - p.x, E.z - p.z)|0].join(' ');
    }
    ts.sort((a, b) => a - b); out[['recruit', 'soldier', 'warlord'][diff]] = { median: ts[6], within30: ts.filter(t => t <= 30).length + '/12' };
  }
  return out;
});
console.log(JSON.stringify(r));
await browser.close();
