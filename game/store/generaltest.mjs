// Dev check: the general's tools. The rally horn, an ordered attack on one group, and a rout.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 270);
await page.evaluate(() => { window.__noRender = 1; });
await page.click('#segMap button[data-v="valley"]'); await page.click('#goBtn');
console.log(await page.evaluate(() => {
  const F = window.__fb, G = F.G, me = G.myTi, p = G.player, out = [];
  const foe = [0, 1, 2, 3].find(i => i !== me && G.teams[i].active && G.ALLY[i] !== G.ALLY[me]);
  for (const u of G.units) if (u.ti !== me && u.ti !== foe) { u.dead = true; u.x = 300; }
  for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; }
  const mine = G.units.filter(u => !u.dead && u.ti === me && !u.leader), theirs = G.units.filter(u => !u.dead && u.ti === foe && !u.leader);
  // rally: my men round me, theirs close by
  p.x = 0; p.z = 0; mine.forEach((u, i) => { u.x = (i % 5) * 1.5 - 3; u.z = -3 - Math.floor(i / 5) * 1.5; }); theirs.forEach((u, i) => { u.x = (i % 5) * 1.5 - 3; u.z = 6 + Math.floor(i / 5) * 1.5; });
  G.teams[me].morale = 30; G.teams[foe].morale = 80; G.teams[me].rally = 100;
  F.rally();
  out.push(`RALLY: my morale 30->${Math.round(G.teams[me].morale)}, horn ${G.teams[me].rally}, my men surging ${mine.filter(u => u.rallyT > 0).length}/${mine.length}, enemy morale 80->${Math.round(G.teams[foe].morale)}, enemies flinching ${theirs.filter(u => u.stun > 0).length}`);
  // ordered attack: an enemy group 25 m off to the side
  theirs.forEach((u, i) => { u.x = 25 + (i % 4); u.z = 20 + Math.floor(i / 4); u.stun = 0; }); { const L = G.teams[foe].leader; L.human = true; L.x = 27; L.z = 23; L.hp = L.max = 1e6; window.__L = L; }
  const tgt = theirs[0]; F.order('focus', { x: tgt.x, z: tgt.z, id: tgt.id });
  for (let k = 0; k < 30 * 9; k++) { window.__L.vx = window.__L.vz = 0; F.step(1, 1 / 30, true); }
  const nearT = mine.filter(u => !u.dead && Math.hypot(u.x - 25, u.z - 20) < 22).length, fighting = mine.filter(u => !u.dead && u.foe && theirs.includes(u.foe) && u.fd < 22).length;
  out.push(`ATTACK ORDER: order=${G.teams[me].order}, after 9 s my men within reach of the group: ${nearT}/${mine.filter(u => !u.dead).length}, engaging it ${fighting}, captain at ${Math.round(p.x)},${Math.round(p.z)}, enemy left ${theirs.filter(u => !u.dead).length}`);
  // a rout: their morale collapses away from home
  const alive = theirs.filter(u => !u.dead); alive.forEach((u, i) => { u.x = 10 + i; u.z = 0; });
  G.teams[foe].morale = 5; G.teams[foe].steadyT = 0; G.teams[me].order = 'follow';
  const home = G.teams[foe].leader; F.step(3, 1 / 30, true);
  const d0 = alive.map(u => u.x), routing = alive.filter(u => u.routing).length;
  F.step(60, 1 / 30, true);
  out.push(`ROUT: routT=${G.teams[foe].routT.toFixed(1)}, running ${routing}/${alive.length}, moved ${alive.map((u, i) => Math.hypot(u.x - d0[i], u.z) ).map(v => v.toFixed(0)).join(',')}`);
  F.step(30 * 7, 1 / 30, true);
  out.push(`after: routT=${G.teams[foe].routT.toFixed(1)} morale=${Math.round(G.teams[foe].morale)} still running ${alive.filter(u => !u.dead && u.routing).length}`);
  return out.join('\n');
}));
await browser.close();
