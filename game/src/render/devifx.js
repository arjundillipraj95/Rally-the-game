// ARCH2 / FX1 (Arjun 21 Nov: "feel like Unite, occupy space, appear bigger") what Devi's specials show, on every phone,
// from the fx moments in core/sim/deviShots.js, in gold with her team's colour:
// - Piercing shot: while she draws, gold motes gather into her bow and a ring tightens at her feet (a flash at full);
//   the loose: a thick spectral arrow racing down the line, a wide glowing wake and a burnt line on the ground that
//   linger, a big burst on each man it goes through, and a shackle (a ring and a pillar of light) pinning each while
//   he's slowed. A champion it hits reels and his screen flashes red from that side (render/feel.js impact).
// - Evade: three gold afterimages of her (on horseback, of her horse and her: FX2), a gust streak on the ground and dust;
// - Tiger's volley: a roar (two shockwaves, a claw-slash mark ahead of her), the tiger's ring at her feet and a fan of
//   light down her lane while she looses; each arrow's strike sparks and is felt;
// - Arrow storm: a red circle pulsing on the ground with an inner ring closing in (the warning), then a rain of
//   gold streaks over it, dust and sparks where they land.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { bus, G, colorOf } from '../core/state.js';
import { TEAMS } from '../config.js';
import { groundY } from '../core/world.js';
import { body } from '../core/body.js';
import { scene } from './scene.js';
import { cam } from './camera.js';
import { champOf } from '../champions/index.js';
import { spark, dust, shockwave, puff } from './effects.js';
import { decal, place, drop, starburst, ringTex, glowTex, FC, setFc } from './fxkit.js';
import { impact } from './feel.js';
import { quality } from './quality.js';

const GOLD = 0xffc23a, now = () => G.T, low = () => quality.level === 'low';
const beamGeo = (() => { const g = new THREE.CylinderGeometry(1, 1, 1, 10, 1, true); g.rotateX(Math.PI / 2); g.translate(0, 0, .5); return g; })();
const pillarGeo = (() => { const g = new THREE.CylinderGeometry(.55, .75, 2.6, 14, 1, true); g.translate(0, 1.3, 0); return g; })();
const ghostGeo = (() => { const g = new THREE.CapsuleGeometry(.3, 1.4, 4, 10); g.translate(0, 1.0, 0); return g; })();
// (FX2) on horseback her afterimage is horse and rider: a body, neck and head, four legs, and her on top (facing +z)
const riderGhostGeo = (() => {
  const at = (g, x, y, z, rx = 0) => { g.rotateX(rx); g.translate(x, y, z); return g; };
  const parts = [at(new THREE.CapsuleGeometry(.42, 1.5, 4, 10), 0, 1.35, 0, Math.PI / 2), at(new THREE.CapsuleGeometry(.2, .75, 4, 8), 0, 1.95, 1.05, -.7),
    at(new THREE.CapsuleGeometry(.16, .42, 4, 8), 0, 2.2, 1.5, Math.PI / 2 - .4), at(new THREE.CapsuleGeometry(.24, .75, 4, 8), 0, 2.35, -.1)];
  for (const [x, z] of [[-.24, .75], [.24, .75], [-.24, -.75], [.24, -.75]]) parts.push(at(new THREE.CylinderGeometry(.08, .06, 1.1, 6), x, .55, z));
  return mergeGeometries(parts.map(g => g.toNonIndexed ? (g.index ? g.toNonIndexed() : g) : g));
})();
const glow = (c, o) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
const teamCol = u => new THREE.Color(TEAMS[colorOf(u.ti)] ? TEAMS[colorOf(u.ti)].css : '#ffffff').lerp(new THREE.Color(GOLD), .1).getHex(); // (BAL1: her army's colour, not gold)
const near = (x, z, r) => G.player && Math.hypot(G.player.x - x, G.player.z - z) < r;
function tex(w, h, paint) { const c = document.createElement('canvas'); c.width = w; c.height = h; paint(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
// a glowing strip along the texture's length: a hot middle, soft edges
const wakeTex = tex(64, 256, (g, w, h) => { const gr = g.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, 'rgba(255,200,90,0)'); gr.addColorStop(.35, 'rgba(255,210,110,.55)'); gr.addColorStop(.5, 'rgba(255,248,220,1)'); gr.addColorStop(.65, 'rgba(255,210,110,.55)'); gr.addColorStop(1, 'rgba(255,200,90,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); const f = g.createLinearGradient(0, 0, 0, h); f.addColorStop(0, 'rgba(0,0,0,1)'); f.addColorStop(.15, 'rgba(0,0,0,0)'); g.globalCompositeOperation = 'destination-out'; g.fillStyle = f; g.fillRect(0, 0, w, h); });
// three claw slashes, the tiger's mark
const clawTex = tex(256, 256, g => { g.lineCap = 'round'; for (let i = 0; i < 3; i++) { const x = 70 + i * 58; g.strokeStyle = 'rgba(255,214,110,.35)'; g.lineWidth = 34; g.beginPath(); g.moveTo(x - 30, 230); g.quadraticCurveTo(x + 18, 128, x - 6, 24); g.stroke(); g.strokeStyle = 'rgba(255,248,220,1)'; g.lineWidth = 12; g.beginPath(); g.moveTo(x - 30, 230); g.quadraticCurveTo(x + 18, 128, x - 6, 24); g.stroke(); } });
// a fan opening from her (its near point at the bottom middle)
const fanTex = tex(256, 256, (g, w, h) => { const gr = g.createLinearGradient(0, h, 0, 0); gr.addColorStop(0, 'rgba(255,214,110,.55)'); gr.addColorStop(1, 'rgba(255,214,110,0)'); g.fillStyle = gr; g.beginPath(); g.moveTo(w / 2, h); g.lineTo(w * .2, 0); g.lineTo(w * .8, 0); g.closePath(); g.fill(); g.strokeStyle = 'rgba(255,240,190,.8)'; g.lineWidth = 4; g.beginPath(); g.moveTo(w * .2, 0); g.lineTo(w / 2, h); g.lineTo(w * .8, 0); g.stroke(); });
// a filled warning circle
const zoneTex = tex(256, 256, (g, w) => { const r = w / 2, gr = g.createRadialGradient(r, r, 0, r, r, r); gr.addColorStop(0, 'rgba(255,90,60,.18)'); gr.addColorStop(.86, 'rgba(255,90,60,.32)'); gr.addColorStop(.94, 'rgba(255,190,150,1)'); gr.addColorStop(1, 'rgba(255,190,150,0)'); g.fillStyle = gr; g.beginPath(); g.arc(r, r, r, 0, Math.PI * 2); g.fill(); });

// (FX1) the storm's falling arrows: one pool of glowing lines
const RAIN = 90, rainPos = new Float32Array(RAIN * 6), drops = [];
const rainGeo = new THREE.BufferGeometry(); rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
const rain = new THREE.LineSegments(rainGeo, new THREE.LineBasicMaterial({ color: 0xffe7a3, transparent: true, opacity: .95, depthWrite: false, blending: THREE.AdditiveBlending }));
rain.frustumCulled = false; rain.renderOrder = 5; scene.add(rain);
function drawRain(T) {
  let n = 0; const FALL = .35, H = 7;
  for (let i = drops.length - 1; i >= 0; i--) { const d = drops[i], k = (T - d.t0) / FALL;
    if (k >= 1 || k < 0 || n >= RAIN) { if (k >= 1 && Math.random() < .3) spark(d.x, d.gy + .2, d.z, FC, 2); drops.splice(i, 1); continue; }
    const y = d.gy + H * (1 - k), o = n * 6; rainPos[o] = d.x + 1.2 * (1 - k); rainPos[o + 1] = y; rainPos[o + 2] = d.z; rainPos[o + 3] = d.x + 1.2 * (1 - k) + .35; rainPos[o + 4] = y + 2.2; rainPos[o + 5] = d.z; n++; }
  rainGeo.setDrawRange(0, n * 2); rainGeo.attributes.position.needsUpdate = true; rain.visible = n > 0;
}
const beams = [], marks = [], ghosts = [], rings = [], flats = [], draws = new Map(), storms = new Map();
const flat = (m, life, op = 1, grow = 0) => flats.push({ m, t0: now(), life, op, grow, s0: m.scale.x });
function sprite(c, o) { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: c, transparent: true, opacity: o, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending })); m.renderOrder = 5; scene.add(m); return m; }
const bowAt = u => { const f = u.face || 0, y = (u.y || 0) + (u.mounted ? 2.4 : 1.45 * body.champ); return [u.x + Math.sin(f) * .7, y, u.z + Math.cos(f) * .7]; };
function endDraw(id) { const D = draws.get(id); if (!D) return; drop(D.ring); scene.remove(D.orb); D.orb.material.dispose(); draws.delete(id); }

bus.on('fxmsg', e => { if (e && e.u) setFc(e.u); // (BAL1)
  const u = e.u; if (!u) return;
  if (e.k === 'fxpdraw') { // the draw: an orb growing at her bow, a ring tightening at her feet
    endDraw(u.id); const c = teamCol(u), ring = decal(ringTex, 6, 6, { from: .5, color: c }); place(ring, u.x, u.z, 0, .1);
    draws.set(u.id, { u, t0: now(), charge: +e.q || 1.5, ring, orb: sprite(0xfff1c2, 0), full: false, c });
  } else if (e.k === 'fxpdrawend') endDraw(u.id);
  else if (e.k === 'fxpierce') {
    endDraw(u.id);
    const [ax, az, end, slowT, ids, cs] = String(e.q || '').split(','); const x = +ax, z = +az, len = +end || 18, c = Number.isFinite(+cs) ? +cs : 1; if (!Number.isFinite(x)) return;
    const y = (u.y || 0) + (u.mounted ? 2.4 : 1.5), col = teamCol(u), a = Math.atan2(x, z), w = .5 + .5 * c;
    const outer = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: 0x0b0b0d, transparent: true, opacity: .75, depthWrite: false, side: THREE.DoubleSide })), core = new THREE.Mesh(beamGeo, glow(col, .9)); // (FEEL5: a black tail like Decidueye's, her army's colour at its heart)
    outer.position.set(u.x, y, u.z); outer.lookAt(u.x + x, y, u.z + z); outer.scale.set(.55 * w, .55 * w, len); core.scale.set(.32, .32, 1); outer.add(core); scene.add(outer);
    beams.push({ m: outer, t0: now(), life: .7, w, head: sprite(0xfff6dc, 1), x0: u.x, y, z0: u.z, x, z, len, hs: 2.4 + 1.6 * c });
    const wake = decal(wakeTex, 1.4 * w + .4, len, { from: 0, color: 0x000000, add: false }); place(wake, u.x, u.z, a, .12); flat(wake, 1.1, .6); // (FEEL5: a dark smear on the ground, not a gold one)
    shockwave(u.x + x * .6, u.z + z * .6, 1.2 + c * .6, FC); for (let k = 0; k < (low() ? 4 : 9); k++) { const f = k / 9; puff({ x: u.x + x * len * f, y, z: u.z + z * len * f, vx: 0, vy: .5, vz: 0, life: .9, c: '#1a1a1c', s: 1.1 }); } // (FEEL5: smoke along the tail, not a gold burst)
    for (const id of String(ids || '').split(':').filter(Boolean)) {
      const o = G.units.find(v => v.id === +id); if (!o) continue;
      const oy = (o.y || 0) + 1.3; starburst(o.x, oy, o.z, 2.8 + 1.4 * c); spark(o.x, oy, o.z, FC, low() ? 8 : 16);
      const r = decal(ringTex, 2.8, 2.8, { from: .5, color: col }); place(r, o.x, o.z, 0, .1);
      const p = new THREE.Mesh(pillarGeo, glow(col, .35)); scene.add(p);
      marks.push({ o, m: r, p, until: now() + (+slowT || 1.5) });
      impact(o, u, o.leader ? .7 + .6 * c : .35 + .3 * c);
    }
    if (near(u.x, u.z, 16)) cam.shake = Math.max(cam.shake || 0, .14 + .14 * c);
  } else if (e.k === 'fxevade') {
    const [x, z, a] = String(e.q || '').split(',').map(Number); if (!Number.isFinite(x)) return;
    const y = groundY(x, z), col = teamCol(u);
    const rid = !!u.mounted, gap = rid ? 2.2 : 1.4; // (FX2: on horseback, horse-and-rider shapes, further apart, facing her dash)
    for (let k = 0; k < 3; k++) { const g = new THREE.Mesh(rid ? riderGhostGeo : ghostGeo, glow(k ? col : 0xfff1c2, .5 - k * .12)); g.position.set(x + Math.sin(a) * k * gap, y, z + Math.cos(a) * k * gap); g.rotation.y = rid ? (u.face || a) : 0; g.scale.setScalar(rid ? 1 : body.champ); scene.add(g); ghosts.push({ m: g, t0: now() + k * .05, life: .55, s: rid ? 1 : body.champ }); }
    const gust = decal(wakeTex, 2.2, 6, { from: 0, color: col }); place(gust, x, z, a, .1); flat(gust, .6, .9);
    for (let k = 0; k < 6; k++) dust(x + Math.sin(a) * k * .8, z + Math.cos(a) * k * .8);
    spark(x, y + 1.2, z, '#ffe7a3', 8);
  } else if (e.k === 'fxvolley') {
    const d = champOf(u.ti).ult, col = teamCol(u), f = u.face || 0;
    const r = decal(ringTex, 5.5, 5.5, { from: .5, color: col }); place(r, u.x, u.z, 0, .1);
    const fan = decal(fanTex, (d && d.len || 18) * .7, (d && d.len) || 18, { from: 0, color: col }); place(fan, u.x, u.z, f, .1);
    rings.push({ u, m: r, fan, until: now() + ((d && d.dur) || 2.5) });
    const claw = decal(clawTex, 7, 7, { from: 0, color: 0xffffff }); place(claw, u.x + Math.sin(f) * 2, u.z + Math.cos(f) * 2, f, .13); flat(claw, 1.1, 1, .25);
    shockwave(u.x, u.z, 5, FC); shockwave(u.x, u.z, 8, '#fff1c2'); starburst(u.x, (u.y || 0) + 1.6, u.z, 4.5); spark(u.x, (u.y || 0) + 1.5, u.z, FC, 18);
    if (near(u.x, u.z, 18)) cam.shake = Math.max(cam.shake || 0, .3);
  } else if (e.k === 'fxboost') { // (FEEL5) her boosted arrow after an Evade: a flare at her bow in her army's colour
    const y = (u.y || 0) + 1.5; spark(u.x, y, u.z, FC, low() ? 8 : 16); shockwave(u.x, u.z, 1.8, FC);
  } else if (e.k === 'fxvhit') { // a volley arrow strikes
    const o = u, oy = (o.y || 0) + 1.3; spark(o.x, oy, o.z, FC, low() ? 4 : 8); if (o.leader) starburst(o.x, oy, o.z, 1.8);
    impact(o, e.a, o.leader ? .45 : .25);
  }
});
// her archers in reach of a raining storm of their side
export function skyShot(u) {
  for (const S of G.storms || []) { const t = G.T - S.T0; if (S.ti === u.ti && t > S.warn - .4 && t < S.warn + S.dur && Math.hypot(u.x - S.x, u.z - S.z) < 45) return true; }
  return false;
}
function drawStorms(T) {
  const on = new Set();
  for (const S of G.storms || []) {
    const t = T - S.T0; on.add(S.id); let L = storms.get(S.id);
    if (!L) { L = { zone: decal(zoneTex, S.r * 2.2, S.r * 2.2, { from: .5, color: 0xffffff }), inner: decal(ringTex, S.r * 2, S.r * 2, { from: .5, color: 0xff8a60 }) }; place(L.zone, S.x, S.z, 0, .1); place(L.inner, S.x, S.z, 0, .11); storms.set(S.id, L); }
    if (t < S.warn) { const k = t / S.warn; L.zone.material.opacity = .55 + .45 * Math.sin(T * 14); L.inner.scale.setScalar(Math.max(.05, 1 - k)); L.inner.material.opacity = 1; }
    else { L.inner.material.opacity = 0; L.zone.material.opacity = .45 + .1 * Math.sin(T * 9); // the rain: streaks falling (a pool of lines), dust where they land
      for (let i = 0; i < (low() ? 1 : 3); i++) { const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * S.r, x = S.x + Math.sin(a) * r, z = S.z + Math.cos(a) * r; drops.push({ x, z, gy: groundY(x, z), t0: T }); }
      if (Math.random() < .5) { const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * S.r; dust(S.x + Math.sin(a) * r, S.z + Math.cos(a) * r); } }
  }
  for (const [id, L] of storms) if (!on.has(id)) { drop(L.zone); drop(L.inner); storms.delete(id); }
}
// every frame (overlay.js)
export function drawDevi() {
  const T = now();
  for (const [id, D] of draws) { // her draw
    const u = D.u, k = Math.min(1, (T - D.t0) / D.charge);
    if (u.dead || T - D.t0 > D.charge + 1.6) { endDraw(id); continue; }
    const [bx, by, bz] = bowAt(u); D.orb.position.set(bx, by, bz); D.orb.scale.setScalar(.4 + 1.3 * k + (k >= 1 ? .25 * Math.sin(T * 20) : 0)); D.orb.material.opacity = .5 + .5 * k;
    place(D.ring, u.x, u.z, T * 2, .1); D.ring.scale.setScalar(1.15 - .6 * k); D.ring.material.opacity = .5 + .5 * k;
    if (!low() || Math.random() < .5) { const a = Math.random() * Math.PI * 2, r = 1.6 - k * .6; puff({ x: bx + Math.sin(a) * r, y: by + (Math.random() - .3) * 1.2, z: bz + Math.cos(a) * r, vx: -Math.sin(a) * r * 3, vy: 0, vz: -Math.cos(a) * r * 3, life: .3, c: '#ffe7a3', s: 5 }); }
    if (k >= 1 && !D.full) { D.full = true; starburst(bx, by, bz, 2.6); shockwave(u.x, u.z, 2.2, '#fff1c2'); }
  }
  for (let i = beams.length - 1; i >= 0; i--) { const b = beams[i], k = (T - b.t0) / b.life;
    if (k >= 1 || k < 0) { scene.remove(b.m); b.m.material.dispose(); b.m.children[0].material.dispose(); scene.remove(b.head); b.head.material.dispose(); beams.splice(i, 1); continue; }
    b.m.material.opacity = .55 * (1 - k); b.m.children[0].material.opacity = 1 - k; const s = .55 * b.w * (1 + k * 1.2); b.m.scale.x = b.m.scale.y = s;
    const hk = Math.min(1, k / .2); b.head.position.set(b.x0 + b.x * b.len * hk, b.y, b.z0 + b.z * b.len * hk); b.head.scale.setScalar(b.hs * (1 - k * .5)); b.head.material.opacity = hk < 1 ? 1 : Math.max(0, 1 - (k - .2) * 3);
    if (hk < 1) spark(b.head.position.x, b.y, b.head.position.z, '#ffe7a3', 2); }
  for (let i = flats.length - 1; i >= 0; i--) { const f = flats[i], k = (T - f.t0) / f.life; if (k >= 1 || k < 0) { drop(f.m); flats.splice(i, 1); continue; } f.m.material.opacity = f.op * (k < .15 ? k / .15 : 1 - (k - .15) / .85); if (f.grow) f.m.scale.setScalar(f.s0 * (1 + f.grow * k)); }
  for (let i = marks.length - 1; i >= 0; i--) { const M = marks[i];
    if (T > M.until || M.o.dead) { drop(M.m); scene.remove(M.p); M.p.material.dispose(); marks.splice(i, 1); continue; }
    const f = Math.min(1, (M.until - T) * 2); place(M.m, M.o.x, M.o.z, T * 3, .1); M.m.material.opacity = f * (.7 + .3 * Math.sin(T * 12));
    M.p.position.set(M.o.x, groundY(M.o.x, M.o.z), M.o.z); M.p.rotation.y = -T * 2; M.p.material.opacity = .3 * f; }
  for (let i = ghosts.length - 1; i >= 0; i--) { const g = ghosts[i], k = (T - g.t0) / g.life; if (k >= 1) { scene.remove(g.m); g.m.material.dispose(); ghosts.splice(i, 1); continue; } if (k > 0) { g.m.material.opacity = .45 * (1 - k); g.m.scale.setScalar(g.s * (1 + k * .3)); } }
  for (let i = rings.length - 1; i >= 0; i--) { const R = rings[i];
    if (T > R.until || R.u.dead || !R.u.tvolley && T > R.until - ((champOf(R.u.ti).ult || {}).dur || 2.5) + .3) { drop(R.m); drop(R.fan); rings.splice(i, 1); continue; }
    place(R.m, R.u.x, R.u.z, -T * 2, .1); R.m.material.opacity = .75 + .25 * Math.sin(T * 10);
    place(R.fan, R.u.x, R.u.z, R.u.face || 0, .1); R.fan.material.opacity = .55 + .2 * Math.sin(T * 16); }
  drawStorms(T); drawRain(T);
}
if (import.meta.env.DEV) { window.__drawDevi = drawDevi; window.__deviLive = () => beams.length + marks.length + ghosts.length + rings.length + flats.length + draws.size + storms.size; } // (store/look.mjs, r_FX1)
