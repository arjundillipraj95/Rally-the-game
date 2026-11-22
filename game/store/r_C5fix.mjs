// C5fix: (1) the death card for arrows / his men / an unknown cause fills in without an error; (2) her swordsmen and
// riders are drawn as the animated models (not frozen / the old figure). (The wolf's joints: tools/models/sigrun/rejoint_wolf.py; looked at in pictures.)
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await open(browser, 640, 400, { q: '?crown2=1&champ=sigrun&botchamp=titus', quality: 'high' });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
const run = n => page.evaluate(n => window.__frame(n), n);
for (let k = 0; k < 60 && (await page.evaluate(() => window.__fb.G.state)) !== 'play'; k++) await run(10);
await run(30);
let fails = 0; const ok = (c, m) => { if (!c) fails++; console.log(c ? 'ok  ' : 'FAIL', m); };
// 1. the death card, each cause
const cards = await page.evaluate(async () => {
  const S = await import('/src/core/state.js'), D = window.__fb.death, G = window.__fb.G, out = {};
  for (const how of ['arrow', 'men', 'sword', 'hunt', 'zzz']) {
    D.on = true; S.bus.emit('shownMsg', { k: 'fell', a: [G.myTi, 1, -1, how] });
    out[how] = [document.getElementById('dBy').textContent, document.getElementById('dName').textContent];
  }
  D.on = false; return out;
});
console.log(JSON.stringify(cards));
ok(cards.arrow[0] === 'Shot down by' && cards.men[0] === 'Cut down by' && cards.hunt[0] === 'Hunted by' && cards.zzz[0] === 'Cut down by', 'death card: arrow, men, hunt and an unknown cause all have their line');
// 2. swordsmen and riders on the animated drawer
const draw = await page.evaluate(async () => {
  const G = window.__fb.G, me = G.player, army = await import('/src/core/sim/army.js');
  const ms = G.units.filter(u => !u.dead && u.ti === me.ti && u.kind === 'sword'), s = ms[0], t = ms[1];
  const h = { id: ++G.horseN, x: t.x, z: t.z, face: 0, state: 'coming', rider: t, t: 0, spd: 0, ti: me.ti, fall: 1, cav: true }; G.horses.push(h); army.mountUp(t, h); t.kind = 'cav';
  window.__f = [s, t]; return ms.length;
});
await run(30);
const bodies = await page.evaluate(async () => { const H = await import('/src/render/heroes.js'); return window.__f.map(u => H.drawHero ? !!H.drawHero(u, { lift: 0, sink: 0 }, 0) : null); });
ok(bodies[0] === true && bodies[1] === true, 'swordsman and rider: the animated model draws them (' + JSON.stringify(bodies) + ')');
ok(errs.length === 0, 'no page errors (' + errs.slice(0, 2).join(' | ') + ')');
await browser.close(); console.log(fails ? fails + ' FAILED' : 'all ok'); process.exit(fails ? 1 : 0);
