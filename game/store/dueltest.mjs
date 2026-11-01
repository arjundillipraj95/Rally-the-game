// Dev check: the duel. (1) the ⚔ tag offers a challenge; a computer captain takes it up (Warlord);
// the ring forms (both armies' men round it, not fighting each other); outsiders can't hurt the two;
// the winner's army gets the horn, the loser's routs. (2) a computer captain calls you out; you walk
// up to accept. (3) refusal costs morale. (4) time runs out: a draw. (5) a third army's soldiers are
// held at the edge; a player's captain at war with both breaks it.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const shot = process.argv[2] === 'shot';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(shot => { if (!shot) window.__noRender = 1; document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); }, shot);
await frames(page, 3);
const r = await page.evaluate(async shot => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, X = -10, Z = 10, out = {};
  G.diff = 2;
  const foes = [0, 1, 2, 3].filter(i => i !== me && G.ALLY[i] !== G.ALLY[me]);
  const foe = foes[0], L = G.teams[foe].leader;
  for (const s of G.teams) { s.recruitT = 1e9; s.gold = -1e9; s.upT = 1e9; }
  const wipe = () => { for (const u of G.units) if (!u.leader) u.dead = true; G.units = G.units.filter(u => !u.dead); };
  const park = () => { for (const s of G.teams) { const c = s.leader; if (c && c !== p && c !== L) { c.x = 150 + Math.random(); c.z = -150; } } };
  wipe(); park();
  const men = (ti, n, cx, cz) => { const a = []; for (let i = 0; i < n; i++) { const u = F.mkUnit(ti, cx + (i % 4) * 1.4, cz + Math.floor(i / 4) * 1.4, 'foot'); u.hp = u.max = 1e4; a.push(u); } return a; };
  const place = () => { for (const c of [p, L]) { if (c.summon) { c.summon.state = 'leaving'; c.summon = null; } c.horseCd = 99; } p.x = X; p.z = Z; p.face = Math.PI / 2; L.x = X + 6; L.z = Z; L.face = -Math.PI / 2; p.hp = p.max = 1e4; L.hp = L.max; p.dueled = L.dueled = false; p.duelAskT = L.duelAskT = 0; p.vx = p.vz = L.vx = L.vz = 0; };
  // (1)
  place();
  const mine = men(me, 8, X - 4, Z + 6), theirs = men(foe, 8, X + 10, Z + 6);
  F.step(2, 1 / 30, true);
  out.tagTarget = F.duelTarget ? null : null;
  const ask = { G: G.duels.length };
  // force the computer's yes, to test the ring deterministically
  F.duel(); const d0 = G.duels[0]; out.offered = !!d0 && d0.state; if (d0) d0.aiYes = true;
  let t = 0; while (G.duels[0] && G.duels[0].state === 'offer' && t < 4) { F.step(1, 1 / 30, true); t += 1 / 30; }
  out.onAfter = +t.toFixed(1); const d = G.duels[0]; out.on = d && d.state;
  if (!d) { out.why = { busyP: [p.mounted, p.carrying, p.dueled, p.duelId, p.execReady, !!p.summon], busyL: [L.mounted, L.carrying, L.dueled, L.duelId, L.execReady, !!L.summon, L.dead], dist: Math.hypot(L.x - p.x, L.z - p.z), enemy: G.ALLY.join('') }; return out; }
  F.step(90, 1 / 30, true); // 3 s: the ring forms
  const ringD = u => +Math.hypot(u.x - d.x, u.z - d.z).toFixed(1);
  out.guards = { mine: mine.filter(u => u.guardOf === d).length, theirs: theirs.filter(u => u.guardOf === d).length, dists: [...mine, ...theirs].map(ringD).sort((a, b) => a - b).slice(0, 4).join(','),
    hpLost: Math.round([...mine, ...theirs].reduce((s, u) => s + u.max - u.hp, 0)) };
  if (shot) { F.step(30, 1 / 30, true); return out; }
  // an outsider can't hurt the duellists: a third army's archer shooting, a footman swinging
  const third = foes[1] ?? [0, 1, 2, 3].find(i => i !== me && i !== foe);
  const thirdMen = men(third, 4, d.x, d.z + DUELR());
  function DUELR() { return 6.3; }
  F.step(60, 1 / 30, true);
  out.thirdHeldOut = thirdMen.filter(u => !u.dead).map(u => +Math.hypot(u.x - d.x, u.z - d.z).toFixed(1)).every(x => x >= 6.2);
  out.duelistsUntouchedByOthers = L.hp === L.max || 'L hp ' + Math.round(L.hp);
  out.afterThird = { duels: G.duels.length, end: G.lastDuel && G.lastDuel.end, L: [L.dead, L.mounted, L.execV, Math.round(L.hp)] };
  for (const u of thirdMen) u.dead = true;
  // the player wins: hits the captain until he falls
  const rally0 = G.teams[me].rally; let n = 0;
  L.stun = 0; L.hp = 30;
  while (!L.dead && n < 300) { p.face = Math.atan2(L.x - p.x, L.z - p.z); if (Math.hypot(L.x - p.x, L.z - p.z) > 2.2) { p.x = L.x - Math.sin(p.face) * 2; p.z = L.z - Math.cos(p.face) * 2; } L.guardT = 0; L.guardCd = 9; F.attack(); F.step(4, 1 / 30, true); n++; }
  out.won = { dead: L.dead, duels: G.duels.length, rally: Math.round(G.teams[me].rally), foeRout: G.teams[foe].routT > 0, guardsLeft: mine.filter(u => u.guardOf).length, execA: !!p.execA };
  F.step(60, 1 / 30, true);
  wipe();
  // (2) a computer captain calls you out
  F.step(330, 1 / 30, true); // he's back on his feet
  const L2 = G.teams[foe].leader; out.respawned = !L2.dead && L2 !== L;
  p.dueled = false; p.duelAskT = 0; L2.duelAskT = 0; p.x = X; p.z = Z; L2.x = X + 7; L2.z = Z; p.hp = p.max = 1e4; L2.horseCd = 99; if (L2.summon) { L2.summon.state = 'leaving'; L2.summon = null; } if (L2.mounted) L2.mounted = false;
  const ch = F.challenge(L2, p); out.aiCalled = ch && G.duels[0] && G.duels[0].state;
  // walk up to him
  t = 0; while (G.duels[0] && G.duels[0].state === 'offer' && t < 3) { F.step(1, 1 / 30, { wx: 1, wz: 0, mag: 1 }); t += 1 / 30; }
  out.walkAccept = G.duels[0] && G.duels[0].state; out.walkT = +t.toFixed(1);
  // (4) time runs out: a draw
  const dd = G.duels[0]; if (dd) dd.t = 1; const m0 = G.teams[me].morale;
  F.step(40, 1 / 30, true); out.draw = { left: G.duels.length, moraleUp: Math.round(G.teams[me].morale - m0) };
  // (3) refusal: called out, and you turn away
  p.dueled = false; L2.dueled = false; L2.duelAskT = 0; p.x = X; p.z = Z; L2.x = X + 7; L2.z = Z;
  G.teams[me].morale = 80; F.challenge(L2, p);
  t = 0; while (G.duels[0] && t < 3) { F.step(1, 1 / 30, { wx: -1, wz: 0, mag: 1 }); t += 1 / 30; }
  out.refused = { left: G.duels.length, morale: Math.round(G.teams[me].morale), t: +t.toFixed(1) };
  return out;
}, shot);
if (shot) { await frames(page, 20); await page.screenshot({ path: OUT + 'duel.png', timeout: 120000 }); }
console.log(JSON.stringify(r, null, 1), 'errors:', errs.slice(0, 3));
await browser.close();
