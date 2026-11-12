// F7g: a man over the chasm's edge falls for ~0.6 s (alive, untouchable, height dropping smoothly from the rim),
// then is dead, by 'chasm'. One on the bridge is fine.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 900, 420, { q: '?crown2=1' });
page.on('pageerror', e => console.log('ERR', e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 2);
const r = await page.evaluate(() => {
  const F = window.__fb, { G } = F;
  for (const u of G.units) { u.x = 200 + u.id; u.z = 200; u.path = null; }
  const L = G.layout, a = -Math.PI / 2, ux = Math.cos(a), uz = Math.sin(a), d = L.chasm.r;
  const off = F.mkUnit(2, ux * d - uz * 4.5, uz * d + ux * 4.5, 'foot'), on = F.mkUnit(2, ux * d, uz * d, 'foot');
  const ys = [], o = { deadAt: -1 };
  for (let i = 0; i < 40; i++) {
    F.step(1);
    if (i === 3) o.mid = { dead: off.dead, iframe: off.iframeT > 0, chasmT: off.chasmT };
    ys.push(+off.y.toFixed(2));
    if (off.dead && o.deadAt < 0) { o.deadAt = i + 1; o.cause = G.deaths && G.deaths.men.chasm ? 'chasm' : null; }
  }
  o.ys = ys.slice(0, 22); o.onDead = on.dead;
  let big = 0; for (let i = 1; i < o.deadAt && i < ys.length; i++) big = Math.max(big, Math.abs(ys[i] - ys[i - 1])); o.bigDrop = big;
  o.fell = ys[0] - ys[Math.max(0, o.deadAt - 2)];
  return o;
});
const fails = [];
if (!r.mid || r.mid.dead || !r.mid.iframe || !(r.mid.chasmT > 0)) fails.push('not alive and untouchable while falling: ' + JSON.stringify(r.mid));
if (r.deadAt < 15 || r.deadAt > 23) fails.push('dead after ' + r.deadAt + ' frames (want ~18, 0.6 s)');
if (r.cause !== 'chasm') fails.push('cause ' + r.cause);
if (r.bigDrop > 1.2) fails.push('height jumped ' + r.bigDrop + ' m in a frame');
if (!(r.fell > 1.5)) fails.push('he barely fell: ' + r.fell);
if (r.onDead) fails.push('the man on the bridge died');
console.log('dead after', r.deadAt, 'frames; fell', r.fell && r.fell.toFixed(2), 'm; biggest frame', r.bigDrop);
console.log(fails.length ? 'F7g FAIL: ' + fails.join('; ') : 'F7g PASS');
await browser.close();
process.exit(fails.length ? 1 : 0);
