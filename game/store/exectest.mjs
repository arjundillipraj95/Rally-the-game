// Dev check: the new captain moves. (1) a blow from behind vs from the front on an enemy captain;
// (2) the sword combo's third blow spinning through men on every side; (3) an execution: a beaten
// enemy captain alone gets marked, Attack executes him, both untouchable meanwhile.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const shot = process.argv[2] === 'shot';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(shot => { if (!shot) window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); }, shot);
await frames(page, 3);
const r = await page.evaluate(async () => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -40, Z = 10, out = {};
  const foe = [0, 1, 2, 3].find(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  const L = G.teams[foe].leader;
  const clear = () => { for (const u of G.units) if (u !== p && u !== L) u.dead = true; G.units = G.units.filter(u => !u.dead); };
  clear(); for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.thinkT = 1e9; }
  p.hp = p.max = 1e6; p.weapon = 'sword';
  // (1) front vs back: a light blow each, the captain held still and off guard
  const blow = fromBehind => { L.stun = 99; 
    L.x = X; L.z = Z; L.face = 0; L.hp = L.max = 1e6; L.guardT = 0; L.guardCd = 99; L.vx = L.vz = 0;
    p.x = X; p.z = fromBehind ? Z - 1.9 : Z + 1.9; p.face = fromBehind ? 0 : Math.PI; p.cd = 0; p.combo = 0; p.lastSwingT = -9; p.vx = p.vz = 0;
    const h0 = L.hp; F.attack(); F.step(8, 1 / 30, true); return Math.round(h0 - L.hp);
  };
  let fr = 0, bk = 0; for (let i = 0; i < 6; i++) { fr += blow(false); bk += blow(true); }
  out.front = Math.round(fr / 6); out.back = Math.round(bk / 6);
  // (2) the spin: three swings in a row with men on all sides
  L.x = 200; L.z = 200;
  const ring = []; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2, u = F.mkUnit(foe, X + Math.sin(a) * 1.8, Z + Math.cos(a) * 1.8, 'foot'); u.hp = u.max = 1e4; u.face = a + Math.PI; u.stun = 99; ring.push(u); }
  for (const s of G.teams) s.thinkT = 1e9;
  p.x = X; p.z = Z; p.cd = 0; p.lastSwingT = -9; p.combo = 0;
  const hits = []; for (let k = 0; k < 3; k++) { const before = ring.map(u => u.hp); while (p.cd > 0) F.step(1, 1 / 30, true); F.attack(); F.step(6, 1 / 30, true); hits.push(ring.filter((u, i) => u.hp < before[i]).length + ':' + p.swingKind); }
  out.spinHits = hits.join(' ');
  for (const u of ring) u.dead = true; G.units = G.units.filter(u => !u.dead);
  // (3) the execution
  L.x = X + 2; L.z = Z; L.face = -Math.PI / 2; L.max = 180; L.hp = 40; L.stun = 0; L.guardT = 0; L.dead = false; L.vx = L.vz = 0;
  p.x = X; p.z = Z; p.face = Math.PI / 2; p.cd = 0;
  F.step(2, 1 / 30, true);
  out.marked = !!L.execReady;
  const guard = F.mkUnit(foe, X + 3, Z + 1, 'foot'); guard.hp = guard.max = 1e4; F.step(2, 1 / 30, true); out.markedWithHisManNear = !!L.execReady; guard.dead = true; G.units = G.units.filter(u => !u.dead); F.step(2, 1 / 30, true);
  const morale0 = G.teams[foe].morale, rally0 = G.teams[me].rally;
  while (p.cd > 0) F.step(1, 1 / 30, true);
  F.attack();
  out.executing = !!(p.execA && L.execV);
  let t = 0; const hpDuring = []; while (!L.dead && t < 3) { if (t > .3 && t < .5) { const h = L.hp; hpDuring.push(h); } F.step(1, 1 / 30, true); t += 1 / 30; }
  out.killedAt = +t.toFixed(2); out.dead = L.dead; out.moraleDrop = Math.round(morale0 - G.teams[foe].morale); out.rallyGain = Math.round(G.teams[me].rally - rally0);
  F.step(30, 1 / 30, true); out.freeAfter = !p.execA && !(p.execT > 0); out.after = { execA: p.execA, execT: p.execT, cd: p.cd, atkBuf: p.atkBuf };
  return out;
});
if (shot) await page.screenshot({ path: OUT + 'exec.png', timeout: 120000 });
console.log(JSON.stringify(r), 'errors:', errs.slice(0, 3));
await browser.close();
