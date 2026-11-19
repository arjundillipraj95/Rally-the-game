// MENU1 Bake champion portraits from their 3D models: for each champion (args, or every champion page), the home
// stage's captain alone, lit, on a dark gradient, upper body, written to public/portraits/<id>.webp (256x200 tile)
// and <id>_face.webp (128x128, the minimap). An artist's picture can replace either file (same name).
// Usage, from game/: node store/bake_portraits.mjs [id ...]   (KEEP=1 skips ids that already have a file)
import { chromium } from 'playwright';
import { writeFileSync, existsSync } from 'fs';
import { open, frames } from './stage.mjs';
const OUT = new URL('../public/portraits/', import.meta.url).pathname;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let ids = process.argv.slice(2);
if (!ids.length) { const p = await open(browser, 844, 390, { home: true }); ids = await p.evaluate(async () => Object.keys((await import('/src/champions/index.js')).CHAMPS)); await p.close(); }
for (const id of ids) {
  if (process.env.KEEP && existsSync(OUT + id + '.webp')) { console.log('kept ', id); continue; }
  const page = await open(browser, 844, 390, { home: true, init: `localStorage.setItem('rally-champ', ${JSON.stringify(id)});` });
  for (let i = 0; i < 60; i++) { await frames(page, 5); if (await page.evaluate(() => { const F = window.__f8, u = window.__fb.G.units.find(x => x.kind === 'captain' && x.demo); return !!(F && u && F.live.get(u)); })) break; await page.waitForTimeout(500); }
  await frames(page, 20); // (into his idle pose)
  const shots = await page.evaluate(async () => {
    const { scene, renderer, camera, G } = window.__fb, F = window.__f8, THREE = F.THREE;
    const cap = G.units.find(u => u.kind === 'captain' && u.demo); const h = cap && F.live.get(cap); if (!h) return null;
    const root = h.U || h.R.root, hidden = [];
    scene.traverse(o => { if (o.isMesh || o.isSprite || o.isPoints || o.isLine || o.isInstancedMesh) { let p = o, mine = false; while (p) { if (p === root) { mine = true; break; } p = p.parent; } if (!mine && o.visible) { o.visible = false; hidden.push(o); } } });
    const bg = scene.background, fog = scene.fog; scene.fog = null;
    const g = document.createElement('canvas'); g.width = 4; g.height = 256; const x = g.getContext('2d'), gr = x.createRadialGradient(2, 90, 4, 2, 128, 180);
    gr.addColorStop(0, '#3a2516'); gr.addColorStop(1, '#050403'); x.fillStyle = gr; x.fillRect(0, 0, 4, 256); const tx = new THREE.CanvasTexture(g); tx.colorSpace = THREE.SRGBColorSpace; scene.background = tx;
    const key = new THREE.DirectionalLight(0xfff0d8, 2.2), rim = new THREE.DirectionalLight(0xffc070, 1.6); scene.add(key, rim);
    const b = new THREE.Box3().setFromObject(root), c = b.getCenter(new THREE.Vector3()), top = b.max.y, ht = b.max.y - b.min.y;
    const f = cap.face, fx = Math.sin(f), fz = Math.cos(f);
    const out = {}, cv = renderer.domElement, sz = renderer.getSize(new THREE.Vector2()), keep = { pos: camera.position.clone(), aspect: camera.aspect, fov: camera.fov };
    for (const [name, w, hh, yk, dist] of [['tile', 256, 200, .74, .40], ['face', 128, 128, .87, .22]]) {
      renderer.setSize(w, hh, false); camera.aspect = w / hh; camera.fov = 30; camera.updateProjectionMatrix();
      const ty = b.min.y + ht * yk; camera.position.set(c.x + fx * ht * dist * 3.2 + fz * .25, ty + ht * .04, c.z + fz * ht * dist * 3.2 - fx * .25); camera.lookAt(c.x, ty, c.z);
      key.position.set(camera.position.x + fz * 3, top + 3, camera.position.z - fx * 3); key.target.position.set(c.x, ty, c.z); key.target.updateMatrixWorld();
      rim.position.set(c.x - fx * 4 - fz * 3, top + 2, c.z - fz * 4 + fx * 3); rim.target.position.set(c.x, ty, c.z); rim.target.updateMatrixWorld();
      renderer.render(scene, camera); out[name] = cv.toDataURL('image/webp', .88);
    }
    renderer.setSize(sz.x, sz.y, false); camera.aspect = keep.aspect; camera.fov = keep.fov; camera.position.copy(keep.pos); camera.updateProjectionMatrix();
    scene.remove(key, rim); scene.background = bg; scene.fog = fog; for (const o of hidden) o.visible = true;
    return out;
  });
  await page.close();
  if (!shots) { console.log('FAIL ', id, '(no captain drawn)'); continue; }
  for (const [k, suf] of [['tile', ''], ['face', '_face']]) writeFileSync(OUT + id + suf + '.webp', Buffer.from(shots[k].split(',')[1], 'base64'));
  console.log('baked', id);
}
await browser.close();
