// Dev check: fog of war and watchtowers in the Crown. Enemies out of your side's sight aren't drawn;
// computer captains build towers; you build one and it lifts the fog around it.
import { chromium } from 'playwright';
import { open, frames, OUT } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#playBtn'); await frames(page, 5);
const fog = () => page.evaluate(() => { const G = window.__fb.G, me = G.ALLY[G.myTi % 4]; const en = G.units.filter(u => !u.dead && G.ALLY[u.ti % 4] !== me); return { T: Math.round(G.T), enemies: en.length, hidden: en.filter(u => u.fog).length, towers: (G.wtowers || []).map(w => w.a + ':' + Math.round(w.build * 100) + '%/' + Math.round(w.hp)).join(' ') }; });
const out = [];
out.push(await fog());
await page.evaluate(() => { window.__noRender = 1; const F = window.__fb, G = F.G; while (G.T < 200) F.step(30, 1 / 30); window.__noRender = 0; });
await frames(page, 3); out.push(await fog());
// you build a tower where you stand
const built = await page.evaluate(() => { const F = window.__fb, G = F.G, s = G.teams[G.myTi]; s.gold = 999; F.upgrade('tower'); return (G.wtowers || []).length; });
await page.evaluate(() => { window.__noRender = 1; const F = window.__fb, G = F.G; for (let i = 0; i < 180; i++) F.step(1, 1 / 30); window.__noRender = 0; });
await frames(page, 30); out.push(await fog());
await page.screenshot({ path: OUT + 'fog.png', timeout: 120000 });
await page.evaluate(() => { window.__noRender = 1; const F = window.__fb, G = F.G; while (G.state === 'play' && G.T < 480) F.step(30, 1 / 30); window.__noRender = 0; });
await frames(page, 3); out.push(await fog());
console.log(out.map(o => JSON.stringify(o)).join('\n'), '\nyou built:', built, 'errors:', errs.slice(0, 3));
await browser.close();
