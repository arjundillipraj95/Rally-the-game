// F13: a day in one battle. (1) Crown shows no length selector on home or lobby, other modes do; a 15-min pick elsewhere
// doesn't change the Crown's 10:00. (2) the sun follows the DAY table: numbers at 0:05..8:30 (height, light, tint),
// 7:30 and 8:00 equal today's dusk/night look; screenshots from the chase camera at 0:05, 2:30, 5:00, 6:30, 7:30, 8:30
// (Low and High) to /tmp/f13/. (3) draw calls at the Crown start unchanged by the light.
import { chromium } from 'playwright';
import fs from 'fs';
const OUT = '/tmp/f13/'; fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
const fails = []; const ck = (c, m) => { console.log(c ? 'ok  ' : 'FAIL', m); if (!c) fails.push(m); };
async function open(q) {
  const page = await browser.newPage({ viewport: { width: 780, height: 360 } });
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.addInitScript(qq => { window.__testSheet = true; localStorage.setItem('rally-quality', qq); localStorage.setItem('rally-tutorial-done', '1');
    window.__raf = []; window.__t = 0; window.requestAnimationFrame = cb => { window.__raf.push(cb); return 1; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const qu = window.__raf; window.__raf = []; qu.forEach(cb => cb(window.__t)); } }; }, q);
  await page.goto('http://127.0.0.1:8766/?crown2=1');
  await page.waitForFunction(() => window.__fb && window.__fb.G); await page.evaluate(() => window.__frame(3));
  return page;
}
// (1) selectors
{
  const p = await open('low');
  const vis = () => p.evaluate(() => { const g = document.getElementById('segTime').closest('.grp'); return !g.hidden; });
  await p.evaluate(() => document.querySelector('#segMode button[data-v="conquest"]').click()); ck(await vis(), 'home: other mode shows the length selector');
  await p.evaluate(() => document.querySelector('#segTime button[data-v="15"]').click());
  await p.evaluate(() => document.querySelector('#segMode button[data-v="crown"]').click()); ck(!(await vis()), 'home: the Crown hides it');
  const desc = () => p.evaluate(() => [document.getElementById('desc').textContent.match(/about (\d+) min/), window.__fb.G.time]);
  { const d = await desc(); ck(d[0] && +d[0][1] === 10, `a 15-min pick elsewhere (G.time ${d[1]}) leaves the Crown at 10:00 (home says about ${d[0] && d[0][1]} min)`); }
  await p.evaluate(() => document.querySelector('#segMode button[data-v="dm"]').click());
  { const d = await desc(); ck(d[0] && +d[0][1] === 15, `another mode still honours 15 min (home says about ${d[0] && d[0][1]} min)`); }
  ck(await vis(), 'home: back to another mode shows the selector again');
  await p.close();
}
// (2)+(3) the sun
const rows = [];
for (const q of ['low', 'high']) {
  const p = await open(q);
  await p.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); window.__frame(20); });
  if (q === 'low') console.log('draw calls at the start:', await p.evaluate(() => { window.__frame(2); return window.__fb.renderer.info.render.calls; }), '(F1b: ~151 on Low)');
  let at = 0;
  for (const [name, T] of [['0005', 5], ['0230', 150], ['0500', 300], ['0630', 390], ['0730', 450], ['0800', 480], ['0830', 510]]) {
    await p.evaluate(s => { window.__noRender = true; window.__fb.step(Math.max(0, Math.round((s - window.__fb.G.T) * 30))); window.__noRender = false; }, T - 1.4); at = T; // (the 40 frames below add 1.3 s)
    await p.evaluate(() => { const { G, W, cam } = window.__fb, pl = G.player, R = W.R; if (pl && !pl.dead) { const a = .785; pl.x = Math.cos(a) * (R - 16); pl.z = Math.sin(a) * (R - 16); cam.yaw = Math.atan2(Math.cos(a), Math.sin(a)); } window.__frame(40); });
    const r = await p.evaluate(() => { const { G, scene } = window.__fb; let s; scene.traverse(o => { if (o.isDirectionalLight) s = o; }); const d = s.position.clone().sub(s.target.position).normalize();
      return { T: +G.T.toFixed(1), el: Math.asin(d.y) * 180 / Math.PI, az: Math.atan2(d.z, d.x) * 180 / Math.PI, I: s.intensity, col: s.color.getHexString(), fogFar: scene.fog.far }; });
    rows.push({ q, name, ...r });
    await p.screenshot({ path: `${OUT}${q}_${name}.png`, timeout: 400000 });
    console.log(q, name, `T ${r.T}`, `el ${r.el.toFixed(1)}`, `az ${r.az.toFixed(0)}`, `I ${r.I.toFixed(2)}`, `col ${r.col}`, `fogFar ${r.fogFar.toFixed(0)}`);
  }
  await p.close();
}
const L = rows.filter(r => r.q === 'low'), by = n => L.find(r => r.name === n);
ck(by('0005').el < 15 && by('0005').I < by('0500').I * .7, 'sunrise: sun low and dim');
ck(by('0500').el > by('0230').el && by('0500').el > by('0630').el, 'noon: sun highest');
ck(by('0500').I > by('0230').I && by('0500').I >= by('0630').I, 'noon: brightest');
ck(by('0005').fogFar < by('0500').fogFar * .7, 'sunrise: low mist (haze closer)');
const base = { el: Math.asin(.62 / Math.hypot(.52, .62, .38)) * 180 / Math.PI, I: 3.1 };
ck(Math.abs(by('0730').el - base.el) < .6 && Math.abs(by('0730').I - base.I) < .05, `7:30 is the map's own light (el ${by('0730').el.toFixed(1)} vs ${base.el.toFixed(1)}, I ${by('0730').I.toFixed(2)})`);
ck(Math.abs(by('0800').el - base.el) < .6, '8:00 keeps dusk/night direction as today');
ck(by('0630').col !== 'fff3dc', '6:30: sun tinted gold');
await browser.close();
console.log(fails.length ? 'FAILED ' + fails.length : 'ALL PASS'); process.exit(fails.length ? 1 : 0);
