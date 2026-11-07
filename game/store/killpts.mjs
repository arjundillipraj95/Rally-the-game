// Dev check (the mountain): an enemy captain is worth 2 to the captain who cuts him down, 1 to the army; once only.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 360, { q: '?crown2=1' });
await page.evaluate(() => { window.__noRender = true; });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
console.log(JSON.stringify(await page.evaluate(() => {
  const { G, die } = window.__fb, me = G.myTi, a = G.ALLY[me % 4], foes = G.teams.map((s, i) => i).filter(i => G.teams[i].active && G.ALLY[i % 4] !== a);
  const myMan = G.units.find(u => u.ti === me && !u.leader), myCap = G.player, kpts = () => Object.values(G.c2.kills[a] || {}).reduce((n, v) => n + v, 0);
  const v1 = G.teams[foes[0]].leader, v2 = G.teams[foes[1]].leader;
  for (const v of [v1, v2]) { v.x = 88; v.z = 88; v.shieldT = 0; v.inSafe = false; }
  die(v1, myCap, 0); const afterCap = kpts();
  die(v2, myMan, 0); const afterArmy = kpts();
  return { afterCap, afterArmy, kills: G.c2.kills[a] };
})));
await browser.close();
