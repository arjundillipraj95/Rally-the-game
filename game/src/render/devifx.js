// ARCH2 (Arjun 19 Nov) what Devi's specials show, on every phone, from the fx moments in core/sim/deviShots.js, in
// gold with her team's colour (Decidueye's Spirit Shackle and Hollow Hunt were the spirit of it):
// - Piercing shot: a bright beam down the line, a burst on each man it goes through, and a gold ring pinned under
//   each while he's slowed;
// - Evade: a gold afterimage where she was, dust behind her;
// - Tiger's volley: the tiger's ring at her feet and a gust when it starts (the arrows are gold streaks, fanned);
// - Arrow storm: her archers in reach hold a full draw leaning back, loosing to the sky (render/heroes.js, skyShot).
import * as THREE from 'three';
import { bus, G, colorOf } from '../core/state.js';
import { TEAMS } from '../config.js';
import { groundY } from '../core/world.js';
import { scene } from './scene.js';
import { cam } from './camera.js';
import { champOf } from '../champions/index.js';
import { spark, dust, shockwave } from './effects.js';
import { decal, place, drop, starburst, ringTex } from './fxkit.js';

const GOLD = 0xffc23a, now = () => G.T;
const beamGeo = (() => { const g = new THREE.CylinderGeometry(.16, .16, 1, 8, 1, true); g.rotateX(Math.PI / 2); g.translate(0, 0, .5); return g; })();
const ghostGeo = (() => { const g = new THREE.CapsuleGeometry(.26, 1.3, 4, 10); g.translate(0, 1.0, 0); return g; })();
const glow = (c, o) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, depthWrite: false, blending: THREE.AdditiveBlending });
const beams = [], marks = [], ghosts = [], rings = [];
const teamCol = u => new THREE.Color(TEAMS[colorOf(u.ti)] ? TEAMS[colorOf(u.ti)].css : '#ffffff').lerp(new THREE.Color(GOLD), .55).getHex();
const near = (x, z, r) => G.player && Math.hypot(G.player.x - x, G.player.z - z) < r;

bus.on('fxmsg', e => {
  const u = e.u; if (!u) return;
  if (e.k === 'fxpierce') {
    const [ax, az, end, slowT, ids] = String(e.q || '').split(','); const x = +ax, z = +az, len = +end || 18; if (!Number.isFinite(x)) return;
    const y = (u.y || 0) + (u.mounted ? 2.4 : 1.5), m = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: .8, depthWrite: false })), core = new THREE.Mesh(beamGeo, glow(0xfff1c0, 1));
    m.position.set(u.x, y, u.z); m.lookAt(u.x + x, y, u.z + z); m.scale.set(1, 1, len); core.scale.set(.4, .4, 1); m.add(core); scene.add(m);
    beams.push({ m, t0: now(), life: .55 });
    starburst(u.x + x * .8, y, u.z + z * .8, 2.6); // (the loose, at her bow)
    for (const id of String(ids || '').split(':').filter(Boolean)) {
      const o = G.units.find(v => v.id === +id); if (!o) continue;
      starburst(o.x, (o.y || 0) + 1.3, o.z, 2.2); spark(o.x, (o.y || 0) + 1.3, o.z, '#ffd76a', 10);
      const r = decal(ringTex, 2.4, 2.4, { from: .5, color: teamCol(u) }); place(r, o.x, o.z, 0, .1); marks.push({ o, m: r, until: now() + (+slowT || 1.5) });
    }
    if (near(u.x, u.z, 14)) cam.shake = Math.max(cam.shake || 0, .18);
  } else if (e.k === 'fxevade') {
    const [x, z, a] = String(e.q || '').split(',').map(Number); if (!Number.isFinite(x)) return;
    const y = groundY(x, z);
    for (let k = 0; k < 3; k++) { const g = new THREE.Mesh(ghostGeo, new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: .4 - k * .1, depthWrite: false })); g.position.set(x + Math.sin(a) * k * 1.2, y, z + Math.cos(a) * k * 1.2); scene.add(g); ghosts.push({ m: g, t0: now() + k * .05, life: .45 }); }
    for (let k = 0; k < 4; k++) dust(x + Math.sin(a) * k * .8, z + Math.cos(a) * k * .8);
  } else if (e.k === 'fxvolley') {
    const d = champOf(u.ti).ult, r = decal(ringTex, 4.4, 4.4, { from: .5, color: teamCol(u) }); place(r, u.x, u.z, 0, .1);
    rings.push({ u, m: r, until: now() + ((d && d.dur) || 2.5) });
    shockwave(u.x, u.z, 4, '#ffc23a'); spark(u.x, (u.y || 0) + 1.5, u.z, '#ffd76a', 12);
  }
});
// her archers in reach of a raining storm of their side
export function skyShot(u) {
  for (const S of G.storms || []) { const t = G.T - S.T0; if (S.ti === u.ti && t > S.warn - .4 && t < S.warn + S.dur && Math.hypot(u.x - S.x, u.z - S.z) < 45) return true; }
  return false;
}
// every frame (overlay.js)
export function drawDevi() {
  const T = now();
  for (let i = beams.length - 1; i >= 0; i--) { const b = beams[i], k = (T - b.t0) / b.life; if (k >= 1 || k < 0) { scene.remove(b.m); b.m.material.dispose(); b.m.children[0].material.dispose(); beams.splice(i, 1); continue; } b.m.material.opacity = .8 * (1 - k); b.m.children[0].material.opacity = 1 - k; const w = 1 + k * 1.5; b.m.scale.x = b.m.scale.y = w; }
  for (let i = marks.length - 1; i >= 0; i--) { const M = marks[i]; if (T > M.until || M.o.dead) { drop(M.m); marks.splice(i, 1); continue; } place(M.m, M.o.x, M.o.z, T * 3, .1); M.m.material.opacity = Math.min(1, (M.until - T) * 2) * (.7 + .3 * Math.sin(T * 12)); }
  for (let i = ghosts.length - 1; i >= 0; i--) { const g = ghosts[i], k = (T - g.t0) / g.life; if (k >= 1) { scene.remove(g.m); g.m.material.dispose(); ghosts.splice(i, 1); continue; } if (k > 0) { g.m.material.opacity = .4 * (1 - k); g.m.scale.setScalar(1 + k * .25); } }
  for (let i = rings.length - 1; i >= 0; i--) { const R = rings[i]; if (T > R.until || R.u.dead) { drop(R.m); rings.splice(i, 1); continue; } place(R.m, R.u.x, R.u.z, -T * 2, .1); R.m.material.opacity = .75 + .25 * Math.sin(T * 10); }
}
if (import.meta.env.DEV) window.__drawDevi = drawDevi; // (store/look.mjs)
