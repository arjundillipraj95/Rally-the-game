// F7h: the battle's start and end. (1) start: the camera flies in from the overview to the captain with no jump
// (largest frame-to-frame move of the camera, and of its aim, through the hand-over to the follow camera); the
// clock waits for it. (2) end: the results come after FEEL.end.hold s and fade in over FEEL.end.fade s (not a hard cut).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390);
await page.evaluate(() => { window.__keepIntro = true; window.__noRender = 1; });
await page.evaluate(() => { document.querySelector('#segMap button[data-v="valley"]').click(); document.querySelector('#goBtn').click(); });
await frames(page, 2);
const r = await page.evaluate(async () => {
  const F = window.__fb, { camera } = F, G = F.G, out = { pos: [], dir: [], T: [] };
  let last = null, lastD = null;
  for (let i = 0; i < 260; i++) {
    window.__frame(1);
    const p = camera.position.clone(), d = new camera.position.constructor(0, 0, -1).applyQuaternion(camera.quaternion);
    if (last) { out.pos.push(p.distanceTo(last)); out.dir.push(Math.acos(Math.min(1, d.dot(lastD)))); }
    out.T.push(G.state); last = p; lastD = d;
  }
  out.state = G.state; out.T0 = G.T; out.hand = out.T.indexOf('play');
  return out;
});
const fails = [];
const bigP = Math.max(...r.pos), bigD = Math.max(...r.dir), hp = r.pos.slice(Math.max(0, r.hand - 3), r.hand + 3), hd = r.dir.slice(Math.max(0, r.hand - 3), r.hand + 3), handP = Math.max(...hp), handD = Math.max(...hd);
if (r.state !== 'play') fails.push('still in state ' + r.state);
if (r.hand < 0) fails.push('never reached play'); if (handP > .6) fails.push('camera jumped ' + handP.toFixed(2) + ' m at the hand-over');
if (bigP > 3) fails.push('camera moved ' + bigP.toFixed(2) + ' m in one frame during the fly-in');
if (handD > .06) fails.push('camera aim jumped ' + handD.toFixed(3) + ' rad at the hand-over');
console.log('start: biggest fly-in step', bigP.toFixed(2), 'm; at hand-over', handP.toFixed(2), 'm /', handD.toFixed(3), 'rad (frame', r.hand + ')');
// the end
const e = await page.evaluate(async () => {
  const F = window.__fb; F.end();
  const el = document.getElementById('ovEnd'), seen = []; let shown = -1;
  const t0 = performance.now(); // (the results are on a real-time timer, so this waits real time)
  for (let i = 0; i < 80; i++) { window.__frame(1); await new Promise(r => setTimeout(r, 25)); const t = (performance.now() - t0) / 1000; if (!el.hidden) { if (shown < 0) shown = t; seen.push(+getComputedStyle(el).opacity); } }
  return { shown, first: seen[0], last: seen[seen.length - 1], n: seen.length };
});
const hold = (await page.evaluate(async () => (await import('/src/config.js')).FEEL.end));
console.log('end: shown at', e.shown, 's; opacity', e.first, '->', e.last);
if (!hold) fails.push('FEEL.end missing');
else {
  if (e.shown < 0) fails.push('results never shown');
  else { if (Math.abs(e.shown - hold.hold) > .2) fails.push('results at ' + e.shown + ' s, want ' + hold.hold); if (!(e.first < .6)) fails.push('results appeared at opacity ' + e.first + ' (a hard cut)'); }
}
console.log(fails.length ? 'F7h FAIL: ' + fails.join('; ') : 'F7h PASS');
await browser.close(); process.exit(fails.length ? 1 : 0);
