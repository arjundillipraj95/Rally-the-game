// Plays a whole computer match at phone landscape size, my champion on autopilot; shots every 20 s plus
// 12-frame bursts when my champion fights another champion. node play.mjs <champ> <outdir>
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
import fs from 'fs';
const [champ = 'titus', out = '/home/claude/play/out'] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await open(b, 844, 390, { q: `?crown2=1&champ=${champ}`, quality: 'high' });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 3);
await p.evaluate(() => { const { G } = window.__fb; const s = G.teams[G.myTi]; s.human = false; if (s.leader) s.leader.human = false; });
const grab = async () => p.evaluate(async () => { const S = await import('/src/render/scene.js'); S.renderer.render(S.scene, S.camera); return S.renderer.domElement.toDataURL('image/jpeg', .8); });
const save = (f, u) => fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64'));
const R = on => p.evaluate(v => { window.__noRender = !v; }, on);
const shot = async name => { await R(true); await frames(p, 2); save(`${out}/${name}.jpg`, await grab()); await R(false); };
let lastShot = -99, bursts = 0, log = [];
for (let i = 0; i < 20000; i++) {
  const st = await p.evaluate(async () => { const { isEnemyTi } = await import('/src/core/state.js'); const G = window.__fb.G; const L = G.teams[G.myTi].leader; let near = 99, foe = null;
    for (const s of G.teams) { const o = s.leader; if (!o || o === L || o.dead || !isEnemyTi(s.leader.ti, G.myTi)) continue; const d = Math.hypot(o.x - L.x, o.z - L.z); if (d < near) { near = d; foe = o.champ || o.kind; } }
    return { T: G.T, state: G.state, dead: !!L.dead, hp: L.hp, near, foe, lvl: G.teams[G.myTi].lvl }; });
  if (st.state === 'end' || st.T > 600) { await shot('zz_end'); break; }
  if (!st.dead && st.near < 7 && bursts < 6 && st.T - lastShot > 25) {
    bursts++; lastShot = st.T; log.push(`burst${bursts} T=${st.T.toFixed(0)} vs ${st.foe} hp=${st.hp}`);
    await R(true); await frames(p, 2);
    for (let k = 0; k < 12; k++) { await frames(p, 2); save(`${out}/b${bursts}_${String(k).padStart(2, '0')}.jpg`, await grab()); }
    await R(false); continue;
  }
  if (st.T - lastShot > 40) { lastShot = st.T; await shot(`t${String(Math.round(st.T)).padStart(3, '0')}`); log.push(`shot T=${st.T.toFixed(0)} lvl${st.lvl} hp=${st.hp} dead=${st.dead}`); }
  await frames(p, 30); if (i % 20 === 0) console.error("T", st.T.toFixed(1), st.state, "near", st.near.toFixed(1), "dead", st.dead);
}
fs.writeFileSync(`${out}/log.txt`, log.join('\n')); console.log(log.join('\n'));
await b.close();
