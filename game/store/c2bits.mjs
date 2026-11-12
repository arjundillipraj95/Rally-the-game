// Dev check, the mountain: garrisons fight back with real arrows; a built watchtower's volleys see off a lone
// soldier; a man shoved into the chasm falls and dies (one on the bridge doesn't); the Points panel
// opens on the enemy captains, and the results list who cut whom down.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const S = '/tmp/claude-0/-home-claude/4e17cb5f-998f-589c-8d52-44170dd3d094/scratchpad/';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 900, 420, { q: '?crown2=1' });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
const out = await page.evaluate(() => { const F = window.__fb, { G } = F, o = {};
  // keep everyone else out of it
  for (const u of G.units) { u.x = 200 + u.id; u.z = 200; u.path = null; }
  const park = () => { for (const u of G.units) if (!u.test) { u.x = 200 + u.id; u.z = 200; u.vx = u.vz = 0; u.path = null; } };
  // 1. a lone footman walks up to a castle garrison
  const g = G.c2.breaks.find(b => b.kind === 'guard'), m = F.mkUnit(1, g.x + 7, g.z, 'foot'); m.test = true;
  let neutral = 0; for (let i = 0; i < 300 && !m.dead; i++) { park(); m.x = g.x + 7; m.z = g.z; m.vx = m.vz = 0; F.step(1); neutral += G.arrows.filter(a => a.neutral).length ? 1 : 0; }
  o.garrison = { foot: Math.round(m.hp), dead: m.dead, arrowsSeen: neutral > 0 };
  // 2. a watchtower (Blue's, built) and a lone Red footman 15 m off
  const tw = { id: 99, x: 20, z: -60, a: G.ALLY[0], ti: 0, hp: 260, build: 1 }; G.wtowers.push(tw);
  const v = F.mkUnit(1, tw.x + 15, tw.z, 'foot'); v.test = true; let t = 0;
  for (; t < 60 * 30 && !v.dead; t++) { park(); v.x = tw.x + 15; v.z = tw.z; v.vx = v.vz = 0; F.step(1); }
  o.tower = { dead: v.dead, secs: +(t / 30).toFixed(1) };
  // 3. the chasm: one shoved off beside the bridge, one on the bridge
  const L = G.layout, a = -Math.PI / 2, ux = Math.cos(a), uz = Math.sin(a), d = L.chasm.r;
  const off = F.mkUnit(2, ux * d - uz * 4.5, uz * d + ux * 4.5, 'foot'), on = F.mkUnit(2, ux * d, uz * d, 'foot'); off.test = on.test = true;
  F.step(24); o.chasm = { off: off.dead, on: on.dead }; // (F7g: he falls for 0.6 s first)
  // 4. Blue's captain cuts down Red's; Green's is got by Blue's men
  const me = G.player, red = G.teams[1].leader, grn = G.teams[2].leader;
  F.die(red, me, 0); const man = G.units.find(u => u.ti === G.myTi && !u.leader && !u.dead); F.die(grn, man, 0);
  o.kills = JSON.stringify(G.c2.kills);
  return o; });
console.log(JSON.stringify(out));
await page.evaluate(() => { const { G } = window.__fb; G.T = 300.5; window.__fb.step(2); const c = G.c2.breaks.find(b => b.kind === 'chest'); if (c) c.hp = 20; for (const h of G.holds.slice(0, 7)) h.owner = h.id % 2; });
await page.click('#points'); await frames(page, 3);
console.log(await page.evaluate(() => document.getElementById('capList').innerText.replace(/\n/g, ' | ')));
await page.screenshot({ path: S + 'caplist.png' });
await page.evaluate(() => window.__fb.end()); await page.waitForTimeout(2500);
console.log(await page.evaluate(() => document.getElementById('endPts').innerText));
await browser.close();
