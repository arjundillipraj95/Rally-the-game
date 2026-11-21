// FAC1 (Arjun 21 Nov): the four factions (Tideseat, Emberseat, Stoneseat, Windseat) name the teams, the top bar's
// letters (T E S W) and each side's three castles, which carry its element.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 6);
const o = await page.evaluate(async () => { const { G } = window.__fb, { TEAMS } = await import('/src/config.js');
  const cs = G.holds.filter(h => h.kind === 'castle');
  return { pips: [...document.querySelectorAll('#pips .pip')].map(e => e.textContent).join(''), names: TEAMS.map(t => t.name),
    sides: [0, 1, 2, 3].map(c => cs.filter(h => h.side === c).map(h => h.name.replace('Castle ', '')).join('/')) }; });
ok(o.names.join() === 'Tideseat,Emberseat,Stoneseat,Windseat', `factions: ${o.names}`);
ok(o.pips === 'TESW', `top bar letters ${o.pips}`);
ok(o.sides.join() === 'Greywater/Frostgate/Mistmere,Ashford/Emberfell/Cinderhold,Thornwall/Stonebridge/Oakhelm,Highmoor/Windspire/Galecrest', `castles by faction (side = colour, as the nexus): ${o.sides.join(' | ')}`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
