// BS1-5 the battle screen: on for a champion with specials (body.bs); no Block or Evade buttons; in a duel Special 1
// blocks while held and Special 2 evades; the ult's ring shows its charge; the army ult button fills with the horn and
// a tap sounds it (his testudo forms); Fortify shows only in a castle you hold; the Upgrade popup shows each soldier's
// next tier; the clock opens the points; Settings can aim specials at the nearest foe instead of champions first.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=titus' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 4);
const ev = (f, a) => page.evaluate(f, a), vis = id => page.locator('#' + id).isVisible();
const r = {}; const settle = async () => { await frames(page, 2); await page.waitForTimeout(350); await frames(page, 1); };
await ev(async () => { const F = window.__fb, { G } = F, L = await import('/src/core/sim/levels.js'), p = G.player; L.gainXp(G.myTi, 3000, 't'); G.T = 40; F.step(1);
  for (const u of G.units) if (!u.dead && u !== p && Math.hypot(u.x - p.x, u.z - p.z) < 25 && u.leader) { u.x += 60; u.z += 60; } G.teams[G.myTi].cds.ult = 30; window.__frame(5); });
r.bs = await ev(() => document.body.classList.contains('bs')); r.blk = await vis('blk'); r.jmp = await vis('jmp');
r.chg = await ev(() => +getComputedStyle(document.getElementById('ab3')).getPropertyValue('--chg'));
// a duel: Ram reads Block and blocks while held; Shield reads Evade and evades
await ev(() => { Object.defineProperty(window.__fb.G.player, 'duelId', { get: () => 99, set: () => {}, configurable: true }); window.__frame(3); });
r.l1 = await page.locator('#ab1 .abL').textContent(); r.l2 = await page.locator('#ab2 .abL').textContent();
let b = await page.locator('#ab1').boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); await page.waitForTimeout(50);
r.blocking = await ev(async () => (await import('/src/ui/input.js')).inp.blockHeld); await page.mouse.up();
r.ramInDuel = await ev(() => !!window.__fb.G.player.ram);
await ev(() => { delete window.__fb.G.player.duelId; window.__fb.G.player.duelId = 0; window.__frame(3); }); r.l1after = await page.locator('#ab1 .abL').textContent();
// the army ult: half full: not ready; full: a tap sounds it
await ev(() => { const G = window.__fb.G; G.teams[G.myTi].rally = 50; window.__frame(2); }); await settle(); r.armyBar = await page.locator('#armyBar b').evaluate(e => e.style.width); r.armyReady0 = await ev(() => document.getElementById('armyBtn').classList.contains('ready'));
await ev(async () => { const G = window.__fb.G, sim = await import('/src/core/sim.js'), p = G.player; for (let i = 0; i < 6; i++) sim.mkUnit(G.myTi, p.x + i * .5, p.z - 2, 'foot'); G.teams[G.myTi].rally = 100; window.__frame(2); }); await settle();
r.armyReady = await ev(() => document.getElementById('armyBtn').classList.contains('ready'));
await page.click('#armyBtn'); await frames(page, 2); r.testudo = await ev(() => window.__fb.G.units.some(u => !u.dead && u.testudo && u.ti === window.__fb.G.myTi)); r.rallyAfter = await ev(() => window.__fb.G.teams[window.__fb.G.myTi].rally);
// Fortify: hidden in the field, shown in a castle you hold
r.fort0 = await vis('fortBtn');
await ev(() => { const G = window.__fb.G, p = G.player, cw = G.layout.cwalls[0]; G.holds[cw.hid].owner = G.ALLY[G.myTi % 4]; p.x = cw.x; p.z = cw.z; window.__frame(2); }); await settle();
r.fort1 = await vis('fortBtn'); r.fortT = await page.locator('#fortT').textContent();
// Upgrade: footmen show Arms until bought, then Armor
await page.click('#upBtn'); await frames(page, 1); r.up0 = [await vis('upTray button[data-up="foot1"]'.replace('upTray ', 'upTray ')).catch(() => null)];
r.up0 = await ev(() => ['foot1', 'foot2', 'aura', 'horse', 'fort', 'arm'].map(id => { const b = document.querySelector(`#upTray button[data-up="${id}"]`); return b && b.offsetParent ? 1 : 0; }).join(''));
await ev(() => { const G = window.__fb.G, s = G.teams[G.myTi]; s.up = Object.assign(s.up || {}, { foot1: 1 }); window.__frame(2); }); await settle();
r.up1 = await ev(() => ['foot1', 'foot2'].map(id => { const b = document.querySelector(`#upTray button[data-up="${id}"]`); return b && b.offsetParent ? 1 : 0; }).join('')); await page.click('#upBtn');
// the clock opens the points
await page.click('#clock'); r.pts = await vis('points'); await page.click('#clock'); r.pts2 = await vis('points');
// Settings: nearest
r.aim = await ev(async () => { const B = await import('/src/champions/blocks.js'), G = window.__fb.G, p = G.player, e = G.units.find(u => u.leader && !u.dead && u.ti !== G.myTi && G.ALLY[u.ti % 4] !== G.ALLY[G.myTi % 4]), s = G.units.find(u => !u.dead && !u.leader && G.ALLY[u.ti % 4] !== G.ALLY[G.myTi % 4]);
  e.x = p.x + 6; e.z = p.z; s.x = p.x + 2; s.z = p.z; s.dead = false; const a = B.autoAim(p, 8).u === e; B.setTarget('near'); const b = B.autoAim(p, 8).u === s; B.setTarget('champ'); return [a, b]; });
await browser.close();
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
console.log(JSON.stringify(r));
ok(r.bs && !r.blk && !r.jmp, 'the battle screen is on: no Block or Evade buttons');
ok(r.chg > 0 && r.chg < .9, `the ult's ring shows its charge (${r.chg})`);
ok(r.l1 === 'Block' && r.l2 === 'Evade' && r.blocking && !r.ramInDuel && r.l1after === 'Ram', 'in a duel: Ram is Block (held: blocking), Shield is Evade; after it, Ram again');
ok(r.armyBar === '50%' && !r.armyReady0 && r.armyReady && r.testudo && r.rallyAfter === 0, `the army ult: the horn bar (${r.armyBar}), a tap when full forms the testudo`);
ok(!r.fort0 && r.fort1 && /Fortify|Castle/.test(r.fortT), `Fortify only in a castle you hold (${r.fortT})`);
ok(r.up0 === '100001' && r.up1 === '01', `Upgrade: one button per soldier's next tier and Armour (${r.up0}, then ${r.up1})`);
ok(r.pts && !r.pts2, 'tapping the clock opens and closes the points');
ok(r.aim[0] && r.aim[1], 'specials aim at champions first; Settings: the nearest');
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
