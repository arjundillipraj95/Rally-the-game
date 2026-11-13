// F1b the men near the camera in a few draws each (with F1a's map batches): draw calls, triangles and frames,
// before (the old pieces) and after, on Low and High. ?f1=ab keeps the old pieces hidden beside the batches, so each moment is drawn twice, the very
// same frame both ways. Moments: the Crown start, a fight (the captain mid-blow), and every army in three
// wardrobe looks (helmets, armours, shields, capes). Usage: node store/r_F1b.mjs   (LEVELS=low; SHOTS=dir)
import { chromium } from 'playwright';
import fs from 'node:fs';
const SHOTS = process.env.SHOTS || '';
const MOMENTS = [['start', null, 360], ['fight', 200, 60], ['lookA', null, 21], ['lookB', null, 22], ['lookC', null, 23]];
const LOOKS = { 21: { helm: 3, armour: 1, shield: 1, cape: 0 }, 22: { helm: 10, armour: 3, shield: 2, cape: 1 }, 23: { helm: 0, armour: 2, shield: 0, cape: 4 } };
const IX = { helm: 0, armour: 1, shield: 2, cape: 5 }; // (core/look.js SLOT_IX)

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
    out[name] = await page.evaluate(async ([T, n, LOOKS, IX]) => {
      const F = window.__fb, R = F.renderer, G = F.G;
      if (T != null) G.T = T;
      if (LOOKS[n]) for (const L of G.looks || []) if (L) for (const k in LOOKS[n]) L[IX[k]] = LOOKS[n][k];
      if (T === 200) { const me = G.player; me.swing = .3; me.swingKind = 0; }
      for (let k = 0; k < n; k++) { window.__frame(1); if (k % 40 === 0) await new Promise(r => setTimeout(r, 30)); }
      const sc = F.scene; let map = null; for (const c of sc.children) if (!map || c.children.length > map.children.length) map = c;
      const vis = o => { for (let p = o; p; p = p.parent) if (!p.visible) return false; return true; };
      const shot = old => {
        window.__f1old(old); window.__frame(1, 0); // (the same moment, no time passing)
        let mapObjs = 0, men = 0; map.traverse(o => { if ((o.isMesh || o.isSprite || o.isPoints) && vis(o) && !(o.isInstancedMesh && !o.count)) mapObjs++; });
        for (const [, h] of window.__f8.live) (h.U || h.R.root).traverse(o => { if (o.isMesh && vis(o) && o.layers.test(F.camera ? F.camera.layers : o.layers) && o.layers.mask === 1) men++; });
        const calls = R.info.render.calls, tris = R.info.render.triangles;
        const c2 = document.createElement('canvas'); c2.width = R.domElement.width; c2.height = R.domElement.height;
        const x = c2.getContext('2d'); x.drawImage(R.domElement, 0, 0);
        const px = x.getImageData(0, 0, c2.width, c2.height).data;
        let b = ''; for (let i = 0; i < px.length; i += 32768) b += String.fromCharCode.apply(null, px.subarray(i, i + 32768));
        return { calls, tris, mapObjs, men, px: btoa(b), png: c2.toDataURL('image/png'), T: +G.T.toFixed(1) };
      };
      return { before: shot(true), after: shot(false), state: G.state };
    }, [T, n, LOOKS, IX]);
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
    if (SHOTS) for (const [tag, s] of [['before', a], ['after', b]]) fs.writeFileSync(`${SHOTS}/F1b-${level}-${name}-${tag}.png`, Buffer.from(s.png.split(',')[1], 'base64'));
    const row = { calls: [a.calls, b.calls], tris: [a.tris, b.tris], menDraws: [a.men, b.men], trisUp: +((b.tris / a.tris - 1) * 100).toFixed(1) + '%', pixelsDiff: +(d * 100).toFixed(2) + '%', T: [a.T, b.T] };
    res[level + '.' + name] = row;
    const pass = b.men <= Math.max(40, a.men * .3) && (name.startsWith('look') || b.calls <= 160) &&  b.tris <= a.tris * 1.05 && d < .005;
    if (!pass) ok = false;
    console.log(level.padEnd(5), name.padEnd(7), pass ? 'PASS' : 'FAIL', JSON.stringify(row));
  }
}
await browser.close();
console.log(ok ? 'F1b PASS' : 'F1b FAIL');
process.exit(ok ? 0 : 1);
