// Dev check: the evade. (1) the stick picks the move, judged against the enemy captain in front;
// (2) a blow landing in the first moment of an evade passes through; (3) each follow-up; (4) two
// evades in a row wind you; (5) how often a computer captain evades a captain's blows, by difficulty.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 320, 180);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(() => { window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 3);
const r = await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10, out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]), E = G.teams[foe].leader;
  for (const u of G.units) if (u !== p && u !== E) u.dead = true; G.units = G.units.filter(u => !u.dead);
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  const reset = () => { p.x = X; p.z = Z; p.vx = p.vz = 0; p.face = Math.PI / 2; p.cd = 0; p.stun = 0; p.evadeCd = 0; p.lastEvadeT = -9; p.jy = 0; p.jvy = 0; p.dashT = 0; p.hp = p.max = 1e6; p.weapon = 'sword'; p.combo = 0; p.lastSwingT = -9; p.evade = null; p.atkBuf = 0; p.pending = null;
    E.x = X + 2.2; E.z = Z; E.vx = E.vz = 0; E.face = -Math.PI / 2; E.hp = E.max = 1e6; E.stun = 99; E.cd = 99; E.guardT = 0; E.guardCd = 99; E.evadeCd = 99; };
  const stick = (wx, wz, mag = 1) => { window.__moveOverride = () => ({ wx, wz, mag, camYaw: 0 }); };
  // (1) direction: the enemy stands to +x
  const moves = {};
  for (const [name, wx, wz, mag] of [['toward', 1, 0, 1], ['side', 0, 1, 1], ['away', -1, 0, 1], ['none', 0, 0, 0]]) {
    reset(); stick(wx, wz, mag); F.jump(); const k = p.evade && p.evade.kind; F.step(12, 1 / 30, { wx: 0, wz: 0, mag: 0 });
    moves[name] = `${k} moved ${(p.x - X).toFixed(1)},${(p.z - Z).toFixed(1)}`;
  }
  out.moves = moves;
  // (2) untouchable: the enemy's heavy blow lands while the evade's moment is on
  reset(); stick(0, 1); E.stun = 0; E.cd = 0; F.jump(); const h0 = p.hp; const hits = []; F.step(1, 1 / 30, { mag: 0, wx: 0, wz: 0 });
  // hit him directly with a blow at the start of the evade, and again after it
  window.__fb.G.player.iframeT > 0 ? hits.push('iframe on') : hits.push('iframe OFF');
  out.iframe = hits.join(',') + ` (${p.iframeT.toFixed(2)} s)`;
  // (3) follow-ups: damage of a plain blow, then each evade + attack
  const blow = (kind, wx, wz) => { reset(); E.stun = 99; if (kind) { stick(wx, wz); F.jump(); F.step(3, 1 / 30, { mag: 0, wx: 0, wz: 0 }); } const h = E.hp; const pre = { cd: p.cd, st: p.stun, jy: p.jy, ifr: E.iframeT, d: Math.hypot(E.x - p.x, E.z - p.z).toFixed(2) }; F.attack(); const pend = !!p.pending; F.step(14, 1 / 30, { mag: 0, wx: 0, wz: 0 }); const dmg = Math.round(h - E.hp); if (!kind && dmg === 0) window.__zero = JSON.stringify({ ...pre, pend, d2: Math.hypot(E.x - p.x, E.z - p.z).toFixed(2), guard: E.guardT, par: p.parried }); return dmg; };
  const avg = (kind, wx, wz) => { let t = 0; for (let i = 0; i < 12; i++) t += +blow(kind, wx, wz); return Math.round(t / 12); };
  out.plainEach = Array.from({ length: 8 }, () => blow(null)).join(',');
  out.follow = { plain: avg(null), pounce: avg('pounce', 1, 0), side: avg('side', 0, 1), back: avg('back', -1, 0) };
  // a sidestep round behind him, then the flank cut: a backstab
  { let t = 0; for (let i = 0; i < 12; i++) { reset(); E.stun = 99; E.face = Math.PI / 2; // (he faces away: a sidestep that ends behind him)
    const h = E.hp; stick(0, 1); F.jump(); F.step(3, 1 / 30, { mag: 0, wx: 0, wz: 0 }); F.attack(); F.step(14, 1 / 30, { mag: 0, wx: 0, wz: 0 }); t += h - E.hp; } out.follow.sideBehindHim = Math.round(t / 12); }
  // (4) winded
  reset(); stick(0, 1); F.jump(); F.step(15, 1 / 30, { mag: 0, wx: 0, wz: 0 }); const ok2 = F.G.player.evadeCd; F.G.player.evadeCd = 0; F.jump(); out.winded = `after 1: cd ${ok2.toFixed(2)} s; after 2 quick ones: cd ${p.evadeCd.toFixed(2)} s`;
  // (5) computer captains evading the player's blows, per difficulty
  out.aiEvades = [0, 1, 2].map(d => { G.diff = d; let n = 0, tries = 40; for (let i = 0; i < tries; i++) { reset(); E.stun = 0; E.evadeCd = 0; E.evade = null; F.attack(); if (E.evade) n++; F.step(20, 1 / 30, { mag: 0, wx: 0, wz: 0 }); } return `${Math.round(100 * n / tries)}%`; }).join(' / ');
  out.zero = window.__zero;
  return out;
});
console.log(JSON.stringify(r, null, 1)); console.log('errors:', errs.slice(0, 3));
await browser.close();
