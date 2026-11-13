// F1a the map in batches: draw calls, triangles and frames, before (the old pieces) and after (the batches), on
// Low and High. ?f1=ab keeps the old pieces hidden beside the batches, so each moment is drawn twice, the very
// same frame both ways (two runs of a battle never match to the pixel). Moments: the Crown start, mid-battle and
// night (torches lit), and things that change: castles fortified to level III with the gate broken, the camps
// put out, the holds taken, the captain beside a castle. Usage: node store/r_F1a.mjs   (LEVELS=low; SHOTS=dir also saves the frames as PNGs)
import { chromium } from 'playwright';
import fs from 'node:fs';
const SHOTS = process.env.SHOTS || '';
const MOMENTS = [['start', null, 360], ['battle', 200, 60], ['night', 485, 45], ['changes', 300, 40]];

async function run(browser, level) {
  const page = await browser.newPage({ viewport: { width: 844, height: 390 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.addInitScript(l => {
    window.__testSheet = true; localStorage.setItem('rally-quality', l); localStorage.setItem('rally-tutorial-done', '1');
    let s = 12345; Math.random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    window.__raf = []; window.__t = 0;
    window.requestAnimationFrame = cb => { window.__raf.push(cb); return window.__raf.length; };
    window.__frame = (n = 1, dt = 1000 / 30) => { for (let i = 0; i < n; i++) { window.__t += dt; const q = window.__raf; window.__raf = []; q.forEach(cb => cb(window.__t)); } };
  }, level);
  await page.goto('http://127.0.0.1:8766/?crown2=1&f1=ab');
  await page.waitForFunction(() => window.__fb && window.__fb.G);
  await page.evaluate(() => window.__frame(3));
  await page.evaluate(() => { document.querySelector('#segMode button[data-v="crown"]').click(); document.getElementById('goBtn').click(); });
  await page.waitForTimeout(4000); // (the models load)
  const out = {};
  for (const [name, T, n] of MOMENTS) {
    out[name] = await page.evaluate(async ([T, n]) => {
      const F = window.__fb, R = F.renderer, G = F.G;
      if (T != null) G.T = T;
      if (n === 40) { // (the changes)
        for (const k in G.cgates || {}) { G.cgates[k].lv = 3; G.cgates[k].broken = 1; }
        for (const b of (G.c2 && G.c2.breaks) || []) if (b.kind === 'camp') b.hp = 0;
        (G.holds || []).forEach((h, i) => { h.owner = i % 4; });
        const cw = G.layout.cwalls[0], a = Math.atan2(cw.z, cw.x), me = G.player; me.x = cw.x + Math.cos(a) * (cw.r + 6); me.z = cw.z + Math.sin(a) * (cw.r + 6); me.vx = me.vz = 0; me.path = null;
      }
      for (let k = 0; k < n; k++) { window.__frame(1); if (k % 40 === 0) await new Promise(r => setTimeout(r, 30)); }
      const sc = F.scene; let map = null; for (const c of sc.children) if (!map || c.children.length > map.children.length) map = c;
      const vis = o => { for (let p = o; p; p = p.parent) if (!p.visible) return false; return true; };
      const shot = old => {
        window.__f1old(old); window.__frame(1, 0); // (the same moment, no time passing)
        let mapObjs = 0; map.traverse(o => { if ((o.isMesh || o.isSprite || o.isPoints) && vis(o) && !(o.isInstancedMesh && !o.count)) mapObjs++; });
        const calls = R.info.render.calls, tris = R.info.render.triangles;
        const c2 = document.createElement('canvas'); c2.width = R.domElement.width; c2.height = R.domElement.height;
        const x = c2.getContext('2d'); x.drawImage(R.domElement, 0, 0);
        const px = x.getImageData(0, 0, c2.width, c2.height).data;
        let b = ''; for (let i = 0; i < px.length; i += 32768) b += String.fromCharCode.apply(null, px.subarray(i, i + 32768));
        return { calls, tris, mapObjs, px: btoa(b), png: c2.toDataURL('image/png'), T: +G.T.toFixed(1) };
      };
      return { before: shot(true), after: shot(false), state: G.state };
    }, [T, n]);
  }
  out.level = await page.evaluate(() => window.__fb.info.gfx.level); out.errs = errs;
  await page.close();
  return out;
}

const diff = (a, b) => { // share of pixels whose colour moved by more than 8/255 in any channel
  const A = Buffer.from(a.px, 'base64'), B = Buffer.from(b.px, 'base64'); let bad = 0;
  for (let i = 0; i < A.length; i += 4) if (Math.abs(A[i] - B[i]) > 8 || Math.abs(A[i + 1] - B[i + 1]) > 8 || Math.abs(A[i + 2] - B[i + 2]) > 8) bad++;
  return bad / (A.length / 4);
};

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const res = {}; let ok = true;
for (const level of (process.env.LEVELS || 'low,high').split(',')) {
  const r = await run(browser, level);
  if (r.errs.length) { ok = false; console.log('PAGEERROR', level, r.errs.slice(0, 3)); }
  for (const [name] of MOMENTS) {
    const a = r[name].before, b = r[name].after, d = diff(a, b);
    if (SHOTS) for (const [tag, s] of [['before', a], ['after', b]]) fs.writeFileSync(`${SHOTS}/F1a-${level}-${name}-${tag}.png`, Buffer.from(s.png.split(',')[1], 'base64'));
    const row = { calls: [a.calls, b.calls], tris: [a.tris, b.tris], mapPieces: [a.mapObjs, b.mapObjs], trisUp: +((b.tris / a.tris - 1) * 100).toFixed(1) + '%', pixelsDiff: +(d * 100).toFixed(2) + '%', T: [a.T, b.T] };
    res[level + '.' + name] = row;
    const pass = b.calls < a.calls - 800 && b.mapObjs < (name === 'changes' ? 130 : 100) && // (every castle at level III shows ~3 more pieces each)
       b.tris <= a.tris * 1.05 && d < .005;
    if (!pass) ok = false;
    console.log(level.padEnd(5), name.padEnd(7), pass ? 'PASS' : 'FAIL', JSON.stringify(row));
  }
}
await browser.close();
console.log(ok ? 'F1a PASS' : 'F1a FAIL');
process.exit(ok ? 0 : 1);
