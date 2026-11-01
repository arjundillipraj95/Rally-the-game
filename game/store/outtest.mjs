// Dev check: 2- and 3-castle battles. Sets colours Out on the solo seats (the Duo chip, tapped three
// times), starts, and checks: the castles left and how far apart, nothing of the missing ones built,
// a computer-only battle runs (first clash, errors), and the result.  node store/outtest.mjs <maps> <outs e.g. 23>
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const maps = (process.argv[2] || 'valley,forum,river,colosseum').split(','), outs = (process.argv[3] || '23').split('').map(Number);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 640, 320);
await page.evaluate(() => { localStorage.setItem('rally-solo-al', '[0,1,2,3]'); }); await page.reload(); await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
const errs = []; page.on('pageerror', e => errs.push(e.message));
for (const map of maps) {
  const r = await page.evaluate(async ([map, outs]) => {
    window.__noRender = 1;
    document.querySelector(`#segMap button[data-v="${map}"]`).click();
    const cols = [...document.querySelectorAll('#soloSeats .seatcol')];
    for (const c of outs) for (let k = 0; k < 3; k++) { const t = document.querySelectorAll('#soloSeats .seatcol')[c].querySelector('.duotog'); t.click(); }
    const seatTxt = [...document.querySelectorAll('#soloSeats .seatcol')].map(c => c.querySelector('.duotog').textContent).join(',');
    const desc = document.getElementById('desc').textContent.split('Teams:')[1];
    document.querySelector('#goBtn').click(); window.__frame(3);
    const F = window.__fb, G = F.G; G.diff = 1; const s0 = G.teams[G.myTi]; s0.human = false; s0.leader.human = false; s0.leader.isMe = false; G.player = null;
    const T = window.__fb.TEAMS || null;
    const castles = G.layout.obstacles.filter(o => o.castle).map(o => [Math.round(o.x), Math.round(o.z)]);
    const dist = castles.length === 2 ? Math.round(Math.hypot(castles[0][0] - castles[1][0], castles[0][1] - castles[1][1])) : null;
    let first = null; const armies = G.teams.map((s, i) => s.active ? i : -1).filter(i => i >= 0);
    for (let t = 0; t < 150 && G.state === 'play'; t++) {
      F.step(30, 1 / 30);
      if (first == null) for (const u of G.units) { if (u.dead) continue; if (G.units.some(o => !o.dead && G.ALLY[o.ti % 4] !== G.ALLY[u.ti % 4] && Math.hypot(o.x - u.x, o.z - u.z) < 3.5)) { first = t + 1; break; } }
    }
    const res = { map, seats: seatTxt, desc, duo: G.duo.join(','), armies: armies.join(','), castles: JSON.stringify(castles), dist, first, pts: G.teams.slice(0, 4).map(s => Math.round(s.points)).join(','), state: G.state, unitsOfOut: G.units.filter(u => G.duo[u.ti % 4] < 0).length };
    window.__fb.end(); window.__frame(5);
    // back to the menu, and the outs back in
    const b = [...document.querySelectorAll('button')].find(b => /menu/i.test(b.textContent) && b.offsetParent); if (b) b.click(); window.__frame(3);
    for (const c of outs) { const t = document.querySelectorAll('#soloSeats .seatcol')[c].querySelector('.duotog'); t.click(); }
    return res;
  }, [map, outs]);
  console.log(JSON.stringify(r));
}
console.log('errors:', errs.slice(0, 3));
await browser.close();
