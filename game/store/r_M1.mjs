// M1 (neutral soldiers look like soldiers): on the mountain, the castle garrisons and jungle camps are drawn with
// the real soldier model in grey steel, under a grey banner. This proves the ticket's "Done when":
//   - 844x390 screenshots at deviceScaleFactor 2 of one castle garrison and one camp (OUT, default /tmp/m1shots/)
//   - the numbers are as before: 3 footmen and 2 archers a garrison and camp, none of them in the battle (G.units)
//   - a 60 s Crown battle (the drawing runs every frame; a few frames are really rendered) has no page errors
//     and no broken poses
// Needs the three test servers (bash game/store/servers.sh). Usage: node store/r_M1.mjs   (SHOTS=1: screenshots only)
import { chromium } from 'playwright';
import fs from 'node:fs';
const OUT = process.env.OUT || '/tmp/m1shots/'; fs.mkdirSync(OUT, { recursive: true });
const SECONDS = +(process.env.SECONDS || 60);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 844, height: 390 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => { errors.push(e.message); console.log('PAGEERROR', e.message); });
page.on('console', m => { if (m.type() === 'error') { errors.push(m.text()); console.log('CONSOLE error', m.text().slice(0, 300)); } });
await page.addInitScript(() => {
  window.__testSheet = true; localStorage.setItem('rally-quality', 'high'); localStorage.setItem('rally-tutorial-done', '1');
  window.__raf = []; window.__t = 0;
  window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
  window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
});
await page.goto('http://127.0.0.1:8766/' + (process.env.Q ?? '?crown2=1'));
await page.waitForFunction(() => window.__fb && window.__fb.G);
await page.evaluate(() => window.__frame(3));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
await page.evaluate(() => { window.__noRender = true; window.__frame(20); }); // (nothing is drawn to the screen except the frames we ask for)
const sleep = ms => new Promise(r => setTimeout(r, ms));
let fails = 0; const check = (ok, what) => { console.log(ok ? 'ok  ' : 'FAIL', what); if (!ok) fails++; };

// ---------- the numbers: unchanged, and not part of the battle ----------
const info = await page.evaluate(() => {
  const { G } = window.__fb, bs = G.c2.breaks.filter(b => b.kind === 'guard' || b.kind === 'camp'), figs = window.__neutralFigs() || [];
  return { guards: bs.filter(b => b.kind === 'guard').length, camps: bs.filter(b => b.kind === 'camp').length, foot: figs.filter(u => u.kind === 'foot').length, arch: figs.filter(u => u.kind === 'arch').length,
    inBattle: G.units.filter(u => u.neutral).length, perBreak: bs.map(b => [b.foot ?? b.men, b.arch ?? 0].join('+')).filter((v, i, a) => a.indexOf(v) === i) };
});
console.log(JSON.stringify(info));
const posts = info.guards + info.camps;
check(posts > 0, `garrisons and camps on the mountain (${info.guards} castles, ${info.camps} camps)`);
check(info.perBreak.length === 1 && info.perBreak[0] === '3+2', `each is 3 footmen + 2 archers (${info.perBreak})`);
check(info.foot === 3 * posts && info.arch === 2 * posts, `drawn: ${info.foot} footmen and ${info.arch} archers`);
check(info.inBattle === 0, 'none of them is in G.units (the battle never sees them)');

// ---------- the screenshots ----------
// The captain steps next to the post (the full 3D soldier model is drawn within about 26 m of the captain; farther off
// they are the low-detail model), and the camera looks at the whole squad and its banner from outside.
// The mountain is different every match (towers, walls and trees stand in different places), so the camera spot is
// chosen each time: of a ring of spots round the post, the one that sees the most of the five soldiers (a ray from
// the camera to each, blocked by anything solid in between), and isn't inside a tower or under a roof.
const toPost = kind => page.evaluate(async kind => {
  const { G, scene } = window.__fb, b = G.c2.breaks.filter(b => b.kind === kind && b.hp > 0)[0], figs = window.__neutralFigs().filter(u => Math.hypot(u.x - b.x, u.z - b.z) < 4);
  const gy = figs[0].y, h = Math.hypot(b.x, b.z) || 1, ux = b.x / h, uz = b.z / h, p = G.player;
  p.x = b.x + ux * 14; p.z = b.z + uz * 14; p.y = gy; p.hp = p.max; // (near, but well clear of the garrison's reach)
  window.__noRender = true; window.__frame(4);
  const T = await import(performance.getEntriesByType('resource').map(e => e.name).find(n => /deps\/three\.js/.test(n))); // (the game's own three.js)
  const solid = []; scene.traverse(o => { if (o.isMesh && !o.isInstancedMesh && !o.isSkinnedMesh && o.visible) solid.push(o); });
  const rc = new T.Raycaster(), aim = figs.map(u => new T.Vector3(u.x, u.y + 1.2, u.z)), cam = new T.Vector3(), d = new T.Vector3(), down = new T.Vector3(0, -1, 0);
  let best = null;
  for (const D of [6.5, 8.5, 10.5]) for (const H of [4, 6, 8]) for (let k = 0; k < 24; k++) {
    const a = k / 24 * Math.PI * 2; cam.set(b.x + Math.cos(a) * D, gy + H, b.z + Math.sin(a) * D);
    rc.set(new T.Vector3(cam.x, cam.y + 40, cam.z), down); rc.far = 80; const roof = rc.intersectObjects(solid, false)[0];
    if (roof && roof.point.y > cam.y - .6) continue; // (under a roof or inside a tower)
    let seen = 0; for (const t of aim) { d.copy(t).sub(cam); const len = d.length(); rc.set(cam, d.normalize()); rc.far = len - .3; if (!rc.intersectObjects(solid, false).length) seen++; }
    const score = seen * 100 - Math.abs(D - 8.5) * 2 - Math.abs(H - 6); if (!best || score > best.score) best = { score, seen, x: cam.x, y: cam.y, z: cam.z };
  }
  window.__camAt = [best.x, best.y, best.z, b.x, gy + 1.6, b.z];
  document.getElementById('hudWrap').style.visibility = 'hidden'; document.getElementById('touch').style.visibility = 'hidden';
  window.__noRender = true; window.__frame(6); window.__noRender = false; window.__frame(2); return { post: [+b.x.toFixed(1), +b.z.toFixed(1)], inView: best.seen };
}, kind);
await toPost('guard'); await sleep(4000); // (the 3D models load in the background)
const shot = async (name, kind) => {
  const v = await toPost(kind); await page.screenshot({ path: OUT + name }); await page.evaluate(() => { window.__noRender = true; });
  console.log('shot', OUT + name, JSON.stringify(v)); check(v.inView >= 4, `${name}: ${v.inView} of the 5 soldiers in clear view`);
};
await shot('m1_castle_garrison.png', 'guard');
await shot('m1_camp.png', 'camp');
if (process.env.SHOTS) { await browser.close(); console.log(fails ? `${fails} FAILED` : 'all ok'); process.exit(fails ? 1 : 0); }

// ---------- a 60 s battle ----------
await page.evaluate(() => { delete window.__camAt; document.getElementById('hudWrap').style.visibility = ''; document.getElementById('touch').style.visibility = ''; });
const t0 = Date.now(); let steps = 0, rendered = 0;
const T0 = await page.evaluate(() => window.__fb.G.T);
while ((await page.evaluate(() => window.__fb.G.T)) - T0 < SECONDS && (await page.evaluate(() => window.__fb.G.state)) === 'play') {
  await page.evaluate(() => window.__frame(30)); steps += 30;
  if (steps % 300 === 0) { await page.evaluate(() => { window.__noRender = false; window.__frame(2); window.__noRender = true; }); rendered += 2; } // (a few frames really drawn, so a GL error would show)
}
const ran = await page.evaluate(T0 => +(window.__fb.G.T - T0).toFixed(1), T0);
console.log(`ran ${ran} s of battle (${steps} frames, ${rendered} rendered) in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
check(ran >= SECONDS - 1 || (await page.evaluate(() => window.__fb.G.state)) !== 'play', `a ${SECONDS} s battle ran`);
check(errors.length === 0, `no page errors (${errors.length})`);
const bad = await page.evaluate(() => { const figs = window.__neutralFigs() || [], out = []; for (const u of figs) { const a = window.__anim.get(u); if (!a) continue; for (const k in a) { const v = a[k]; if (typeof v === 'number' && !Number.isFinite(v)) out.push(k); if (Array.isArray(v) && v.some(x => typeof x === 'number' && !Number.isFinite(x))) out.push(k); } } return { n: figs.length, bad: [...new Set(out)] }; });
check(bad.bad.length === 0, `poses are all finite (${bad.n} soldiers still standing${bad.bad.length ? '; bad: ' + bad.bad : ''})`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'all ok');
process.exit(fails ? 1 : 0);
