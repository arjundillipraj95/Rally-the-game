// Dev check: do armies fight over a map's holdings, and do they change hands? Runs a computer-only
// match fast (the player parked at home) and logs, every 20 s, who holds each, how many men are
// in it, the armies' plans, and every change of hands and village recruit.
// node store/holdstest.mjs <map> <mode> <secs>
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const [map = 'desert', mode = 'conquest', secs = 240] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 480, 270);
if (process.env.TEAMS) await page.evaluate(t => { window.__teams = t; }, process.env.TEAMS);
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.evaluate(([map, mode]) => { window.__noRender = 1; document.querySelector(`#segMode button[data-v="${mode}"]`).click(); if (window.__teams) document.querySelector(`#segTeams button[data-v="${window.__teams}"]`).click(); document.querySelector(`#segMap button[data-v="${map}"]`).click(); document.querySelector('#goBtn').click(); }, [map, mode]);
await page.waitForTimeout(500);
const r = await page.evaluate(async secs => {
  const F = window.__fb, G = F.G, out = [], events = [];
  const bus = window.__bus; // (may be absent)
  const p = G.player; p.hp = p.max = 1e7; p.hidden = true; p.x = p.x * 1.05; p.z = p.z * 1.05;
  let owners = G.holds.map(h => h.owner), villageMen = 0, men0 = G.units.length;
  const uid0 = () => G.uid;
  for (let s = 0; s < secs; s += 2) {
    const uidBefore = G.uid;
    F.step(60, 1 / 30, true);
    if (G.state !== 'play') { out.push('ended ' + s + ' ' + (G.endInfo && G.endInfo.why)); break; }
    G.holds.forEach((h, i) => { if (h.owner !== owners[i]) { events.push(`t${s + 2} ${h.kind}${i} -> side ${h.owner}`); owners[i] = h.owner; } });
    if (s % 20 === 18) {
      const near = h => { const n = {}; for (const u of G.units) if (!u.dead && Math.hypot(u.x - h.x, u.z - h.z) < h.r) { const a = G.ALLY[u.ti % 4]; n[a] = (n[a] || 0) + 1; } return JSON.stringify(n); };
      out.push(`t${s + 2} holds ${G.holds.map(h => `${h.kind[0]}:${h.owner}${h.contested ? '!' : ''} men${near(h)}`).join(' | ')} plans ${G.teams.filter(t => t.active).map(t => t.plan ? t.plan.kind + (t.plan.kind === 'hold' ? t.plan.id : '') : '-').join(',')} gold ${G.teams.filter(t => t.active).map(t => Math.round(t.gold)).join(',')}`);
    }
  }
  return { out, events: events.slice(0, 30) };
}, +secs);
console.log(r.out.join('\n')); console.log('changes of hands:', r.events.length, '\n' + r.events.join('\n')); console.log('errors:', errs.slice(0, 3));
await browser.close();
