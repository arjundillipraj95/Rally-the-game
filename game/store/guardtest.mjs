// Dev check: enemy captains' guard, per difficulty. Your captain keeps up light blows at an enemy
// captain for 60 s; count how much of the time he was guarded, how many of your blows he turned
// aside, and how many heavies (thrown only while he's guarded) smashed the guard.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const diff of [0, 1, 2]) {
  const page = await open(browser, 480, 270);
  await page.evaluate(() => { window.__noRender = 1; });
  await page.click('#segMap button[data-v="valley"]'); await page.click(`#segDiff button[data-v="${diff}"]`); await page.click('#goBtn'); await frames(page, 3);
  const r = await page.evaluate(([diff, HEAVY]) => {
    const F = window.__fb, G = F.G, me = G.myTi, p = G.player;
    const foe = [0, 1, 2, 3].find(i => i !== me && G.teams[i].active && G.ALLY[i] !== G.ALLY[me]), E = G.teams[foe].leader;
    for (const u of G.units) if (u !== p && u !== E) { u.dead = true; u.x = 300; }
    for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; s.leaderDeadT = 1e9; }
    p.x = 0; p.z = 0; p.hp = p.max = 1e6; E.x = 0; E.z = 2.4; E.hp = E.max = 1e6; G.teams[foe].plan = { kind: 'hunt', target: p }; G.teams[foe].thinkT = 99;
    let starts = 0, prevG = false, hitsInGuard = 0, guardF = 0, frames = 0, heavyAttempts = 0, breaks = 0, holding = 0, wasStun = false, punished = 0;
    const breaksBefore = () => E.stun;
    for (let f = 0; f < 30 * 60; f++) {
      if (Math.hypot(E.x - p.x, E.z - p.z) > 8) { E.x = p.x; E.z = p.z + 2.4; }
      p.face = Math.atan2(E.x - p.x, E.z - p.z);
      if (E.guardT > 0) guardF++; frames++; if (E.guardT > 0 && !prevG) starts++; prevG = E.guardT > 0;
      let drive = { camYaw: 0 };
      if (holding > 0) { holding--; drive.attackHeld = holding > 0; if (holding === 0) heavyAttempts++; }
      else if (HEAVY && E.guardT > .9 && p.cd <= 0) holding = 22;
      else if (f % 15 === 0) F.attack();
      if (holding > 0) drive.attackHeld = true;
      const st0 = E.stun;
      F.step(1, 1 / 30, drive);
      if (E.stun > .9 && st0 <= .1) breaks++;
    }
    return { starts, diff, guardedPct: Math.round(guardF / frames * 100), enemyParries: E.parries || 0, heavyAttempts, guardBreaks: breaks };
  }, [diff, !!process.env.HEAVY]);
  console.log(JSON.stringify(r));
  await page.close();
}
await browser.close();
