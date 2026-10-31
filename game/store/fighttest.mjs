// Dev check: what a player's attack presses turn into. The captain (unkillable) walks into a pack of
// enemy footmen and taps Attack whenever he can, like a player mashing the button. Tallies presses,
// whiffs (nobody in reach), out-of-reach (target slipped away before the blow), blocked, parried by a
// captain's guard, landed, damage and kills over N seconds of game time.
// node store/fighttest.mjs <sword|spear> <enemyTier 0-2> <men> <secs> [wall|cap]
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const [wpn = 'sword', tier = 0, men = 6, secs = 30, extra = ''] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 320, 180);
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(([wpn, tier, men, secs, extra]) => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10;
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (u !== p && !(extra === 'cap' && u === G.teams[foe].leader)) u.dead = true;
  G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.upT = 1e9; }
  G.teams[foe].up.foot1 = Math.min(1, tier); G.teams[foe].up.foot2 = tier >= 2 ? 1 : 0;
  p.x = X; p.z = Z; p.hp = p.max = 1e7; p.weapon = wpn; G.teams[me].weapon = wpn;
  const L = G.teams[foe].leader;
  if (extra === 'cap') { L.x = X + 6; L.z = Z; L.hp = L.max = 1e7; } else { L.dead = true; L.x = 300; G.teams[foe].leaderDeadT = 1e9; }
  const spawn = () => { const u = F.mkUnit(foe, X + 6 + Math.random() * 3, Z + (Math.random() - .5) * 6, 'foot'); u.face = -Math.PI / 2; return u; };
  if (extra !== 'cap') for (let i = 0; i < men; i++) spawn();
  G.teams[foe].plan = { kind: 'hunt', target: p }; G.teams[foe].thinkT = 1e9;
  if (extra === 'wall') { G.teams[foe].shieldwallT = 1e9; for (const u of G.units) if (u.ti === foe) u.shieldwall = true; }
  G.capStats = { press: 0, noTarget: 0, outOfReach: 0, blows: 0, blocked: 0, parried: 0, landed: 0, dmg: 0, kills: 0 };
  let t0 = G.T, k = 0;
  while (G.T - t0 < secs && G.state === 'play') {
    // keep the pack topped up so there is always someone to fight
    if (extra !== 'cap' && G.units.filter(u => !u.dead && u.ti === foe && !u.leader).length < men) spawn();
    let best = null, bd = 1e9; for (const u of G.units) if (!u.dead && u.ti === foe) { const d = Math.hypot(u.x - p.x, u.z - p.z); if (d < bd) { bd = d; best = u; } }
    const dx = best.x - p.x, dz = best.z - p.z, m = Math.hypot(dx, dz) || 1, close = bd < 2.6;
    F.step(1, 1 / 30, { wx: close ? 0 : dx / m, wz: close ? 0 : dz / m, mag: close ? 0 : 1, camYaw: 0 });
    if (bd < 3.6 && p.cd <= 0 && p.stun <= 0) { F.attack(); F.step(1, 1 / 30, true); }
  }
  const s = G.capStats, n = s.press || 1, pct = v => Math.round(100 * v / n) + '%';
  return { weapon: wpn, tier, extra, presses: s.press, perSec: +(s.press / secs).toFixed(2), whiff: pct(s.noTarget), outOfReach: pct(s.outOfReach), blocked: pct(s.blocked), parried: pct(s.parried), landed: pct(s.landed), blowsPerPress: +(s.blows / n).toFixed(2), dps: Math.round(s.dmg / secs), kills: s.kills };
}, [wpn, +tier, +men, +secs, extra]);
console.log(JSON.stringify(r));
await browser.close();
