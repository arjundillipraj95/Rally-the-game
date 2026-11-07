// Dev check: a refused challenge turns into "He's mine!" (your men leave that captain to you), and on the
// mountain a captain's killing blow is worth 2, the army's 1, once per enemy captain.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' });
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
const r = await page.evaluate(() => {
  const { G, step, challenge } = window.__fb, p = G.player, me = G.myTi;
  const foeTi = G.teams.findIndex((s, i) => s.active && i !== me && G.ALLY[i % 4] !== G.ALLY[me % 4]), v = G.teams[foeTi].leader;
  // put both captains (and my men) in the open on the lane, a few steps apart
  const x = 88, z = 88; p.x = x; p.z = z; v.x = x + 3; v.z = z; for (const u of G.units) if (u.ti === me && !u.leader) { u.x = x + 1 + Math.random(); u.z = z + 2 + Math.random(); }
  for (const u of G.units) if (u.ti === foeTi && !u.leader) { u.x = x + 30; u.z = z - 30; }
  v.summon = null;
  const why = { enemy: window.__fb.G && (G.ALLY[p.ti % 4] !== G.ALLY[v.ti % 4]), pT: p.duelAskT, d: Math.hypot(v.x - p.x, v.z - p.z), pm: p.mounted, vm: v.mounted, pc: p.carrying, vc: v.carrying, pe: p.execT, ve: v.execT, ps: !!p.swing, vs: !!v.swing, vr: v.routing, pd: p.duelId, vd: v.duelId, pdu: p.dueled, vdu: v.dueled, per: p.execReady, ver: v.execReady, psu: !!p.summon, vsu: !!v.summon, T: G.T, crown: !!G.crown, c2: !!G.c2, can: window.__fb.canChallenge(p, v) };
  const ok = challenge(p, v); const d = G.duels[G.duels.length - 1]; if (d) d.aiYes = false;
  step(30 * 3);
  const mine = G.teams[me].mine; let hits = 0; const hp0 = v.hp;
  for (let k = 0; k < 20; k++) { step(15); for (const u of G.units) if (u.ti === me && !u.leader && u.foe === v) hits++; }
  const spared = { mine: mine && mine.ti === foeTi, menTargetingHim: hits, hpLost: Math.round(hp0 - v.hp) };
  // the 15 s run out; his hit points low: my men finish him (1 point to my side)
  v.hp = 8; step(30 * 14);
  for (let k = 0; k < 40 && !v.dead; k++) { for (const u of G.units) if (u.ti === me && !u.leader) { u.x = v.x + Math.random(); u.z = v.z + 1.5 + Math.random(); } step(15); }
  return { why, ok, spared, dead: v.dead, pts: window.__fb.c2Points(G.ALLY[me % 4]), kills: JSON.stringify(G.c2.kills) };
});
console.log(JSON.stringify(r));
await browser.close();
